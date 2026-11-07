import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import fixture from './fixtures/centre-calendar.ru.json'
import {
  centreDateId,
  centreFeedUrl,
  fetchCentreDates,
  overlaps,
  parseCentreDates,
  readCachedCentreDates,
  refreshCentreDates,
  writeCachedCentreDates,
} from '@/domain/centreDates'
import { buildIcs } from '@/domain/ics'
import { buildCsp, siteOrigin } from '@/domain/csp'
import { Calendar } from '@/pages/Calendar'
import { useAppStore } from '@/store/useAppStore'
import type { Profile } from '@/content/types'

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } }))

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru' })
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

describe('parsing the Center’s calendar.json', () => {
  it('keeps well-formed entries, sorted, with the sentence untouched', () => {
    const out = parseCentreDates(fixture)!
    expect(out).toHaveLength(3)
    expect(out[0]).toEqual(fixture[0])
    expect(out.map((e) => e.date)).toEqual(['2026-11-16', '2026-11-20', '2026-12-03'])
  })

  it('drops bad entries one by one instead of the whole feed', () => {
    const good = { date: '2026-03-01', text: 'Срок – 1 марта.', title: 'Новость', url: 'https://s.kz/ru/news/1/' }
    const out = parseCentreDates([
      good,
      { ...good, date: '2026-02-30' }, // no such day
      { ...good, date: '01.03.2026' },
      { ...good, text: '   ' },
      { ...good, title: 42 },
      { ...good, url: 'javascript:alert(1)' },
      { ...good, url: '/ru/news/1/' }, // must be absolute
      { ...good, text: 'x'.repeat(2001) }, // too long to quote, never cut
      null,
      'text',
      good, // duplicate
    ])!
    expect(out).toEqual([good])
  })

  it('ignores an end before the start and a malformed published date, keeps the entry', () => {
    const [e] = parseCentreDates([
      { date: '2026-03-10', end: '2026-03-01', published: 'yesterday', text: 'a', title: 'b', url: 'https://s.kz/x' },
    ])!
    expect(e.end).toBeUndefined()
    expect(e.published).toBeUndefined()
  })

  it('refuses a feed that is not a list', () => {
    expect(parseCentreDates({ items: [] })).toBeNull()
    expect(parseCentreDates(null)).toBeNull()
    expect(parseCentreDates([])).toEqual([])
  })

  it('reads the Kazakh feed from /kz/', () => {
    expect(centreFeedUrl('kk', 'https://s.kz/')).toBe('https://s.kz/kz/calendar.json')
    expect(centreFeedUrl('ru', 'https://s.kz/')).toBe('https://s.kz/ru/calendar.json')
    expect(centreFeedUrl('en', 'https://s.kz/')).toBe('https://s.kz/en/calendar.json')
  })

  it('tells overlapping periods and gives stable ids', () => {
    const e = { date: '2026-10-25', end: '2026-11-05', text: 't', title: 'x', url: 'https://s.kz/' }
    expect(overlaps(e, '2026-11-01', '2026-11-30')).toBe(true)
    expect(overlaps(e, '2026-12-01', '2026-12-31')).toBe(false)
    expect(centreDateId(e)).toBe(centreDateId({ ...e }))
    expect(centreDateId(e)).not.toBe(centreDateId({ ...e, date: '2026-10-26' }))
  })
})

describe('loading and the offline copy', () => {
  it('treats 404 as “no feed yet” and a server error, a timeout or junk as a failure', async () => {
    expect(await fetchCentreDates('u', { fetchImpl: () => json('nope', 404) })).toEqual({ status: 'missing' })
    expect(await fetchCentreDates('u', { fetchImpl: () => json('err', 500) })).toEqual({ status: 'failed' })
    expect(await fetchCentreDates('u', { fetchImpl: () => Promise.reject(new TypeError('offline')) })).toEqual({ status: 'failed' })
    expect(await fetchCentreDates('u', { fetchImpl: () => Promise.resolve(new Response('<html>')) })).toEqual({ status: 'failed' })
    expect(await fetchCentreDates('u', { fetchImpl: () => json({ not: 'a list' }) })).toEqual({ status: 'failed' })
    const r = await fetchCentreDates('u', { fetchImpl: () => json(fixture) })
    expect(r.status === 'ok' && r.entries).toHaveLength(3)
  })

  it('gives up after the timeout', async () => {
    const hanging = (_: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_, reject) => init?.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError'))))
    expect(await fetchCentreDates('u', { fetchImpl: hanging as typeof fetch, timeoutMs: 20 })).toEqual({ status: 'failed' })
  })

  it('saves a good copy, keeps it through a failure, drops it when the feed is gone', async () => {
    const ok = await refreshCentreDates('ru', { fetchImpl: () => json(fixture) })
    expect(ok).toMatchObject({ failed: false })
    expect(readCachedCentreDates('ru')).toHaveLength(3)
    // the Kazakh copy is separate
    expect(readCachedCentreDates('kk')).toBeNull()

    const offline = await refreshCentreDates('ru', { fetchImpl: () => Promise.reject(new TypeError('offline')) })
    expect(offline.failed).toBe(true)
    expect(offline.entries).toHaveLength(3)

    const gone = await refreshCentreDates('ru', { fetchImpl: () => json('', 404) })
    expect(gone).toEqual({ entries: [], failed: false })
    expect(readCachedCentreDates('ru')).toBeNull()
  })

  it('survives a damaged saved copy', () => {
    localStorage.setItem('bolashak-way:centre-dates:ru', '{oops')
    expect(readCachedCentreDates('ru')).toBeNull()
    writeCachedCentreDates('ru', parseCentreDates(fixture)!)
    expect(readCachedCentreDates('ru')).toHaveLength(3)
  })
})

describe('.ics with the Center’s dates', () => {
  it('writes each one as its own event with its period and the news address', () => {
    const [period, day] = parseCentreDates(fixture)!
    const ics = buildIcs(
      [
        { id: 'contract', date: '2026-11-18', summary: 'Договор' },
        { id: centreDateId(period), date: period.date, end: period.end, summary: period.title, description: period.text, url: period.url },
        { id: centreDateId(day), date: day.date, summary: day.title, url: day.url },
      ],
      'Сроки',
      new Date('2026-11-07T10:00:00Z'),
    )
    const unfolded = ics.replace(/\r\n /g, '')
    expect(unfolded.match(/BEGIN:VEVENT/g)).toHaveLength(3)
    // a period ends the day after its last day (DTEND is exclusive)
    expect(unfolded).toContain('DTSTART;VALUE=DATE:20261116\r\nDTEND;VALUE=DATE:20261201')
    expect(unfolded).toContain('DTSTART;VALUE=DATE:20261120\r\nDTEND;VALUE=DATE:20261121')
    expect(unfolded).toContain(`URL:${period.url}`)
    expect(unfolded).toContain(`UID:${centreDateId(period)}-20261116@bolashak-way`)
    // the sentence goes in as it is, only escaped
    expect(unfolded).toContain('DESCRIPTION:Тестовая запись: приём документов проводится с 16 по 30 ноября 2026 года.')
    // the personal deadline has no URL
    const contract = unfolded.split('BEGIN:VEVENT')[1]
    expect(contract).not.toContain('URL:')
  })
})

describe('CSP', () => {
  it('lets the app read the Center’s site and nothing else new', () => {
    expect(siteOrigin(undefined)).toBe('https://stellasdeutsch-dev.github.io')
    expect(siteOrigin('https://bolashak.gov.kz/')).toBe('https://bolashak.gov.kz')
    expect(siteOrigin('ftp://x')).toBe('https://stellasdeutsch-dev.github.io')
    expect(buildCsp('https://bolashak.gov.kz')).toContain("connect-src 'self' https://bolashak.gov.kz;")
  })
})

describe('calendar page', () => {
  const profile: Profile = {
    track: 'master',
    category: 'master_self',
    workerGroup: null,
    invitation: 'none',
    foreignCert: null,
    kazakhCert: true,
    experience: null,
  }
  const open = () =>
    render(
      <MemoryRouter initialEntries={['/master/calendar']}>
        <Routes>
          <Route path="/:platform/calendar" element={<Calendar />} />
        </Routes>
      </MemoryRouter>,
    )

  it('shows the Center’s dates apart from personal ones, with the source and the sentence', async () => {
    vi.useFakeTimers({ toFake: ['Date'] })
    vi.setSystemTime(new Date('2026-11-07T10:00:00'))
    const fetchMock = vi.fn(() => json(fixture))
    vi.stubGlobal('fetch', fetchMock)
    useAppStore.setState({ profile, dates: {} })
    open()
    const card = (await screen.findByRole('heading', { name: 'Даты из объявлений Центра' })).parentElement!
    expect(fetchMock).toHaveBeenCalledWith('https://stellasdeutsch-dev.github.io/bolashak-site/ru/calendar.json', expect.anything())
    expect(within(card).getByText(fixture[0].text)).toBeInTheDocument()
    const sources = within(card).getAllByRole('link', { name: /^Объявление Центра/ })
    expect(sources[0]).toHaveAttribute('href', fixture[0].url)
    // December's entry is not in November's list
    expect(within(card).queryByText(fixture[2].text)).toBeNull()
    // personal dates are untouched
    expect(useAppStore.getState().dates).toEqual({})
    // the grid marks the period's first and last day
    expect(screen.getAllByRole('button', { name: `${fixture[0].title}, Объявление Центра` })).toHaveLength(2)
    // export is possible with the Center's dates alone
    expect(screen.getByRole('button', { name: /Скачать .ics/ })).toBeEnabled()
  })

  it('shows nothing extra while the feed does not exist', async () => {
    const fetchMock = vi.fn(() => json('', 404))
    vi.stubGlobal('fetch', fetchMock)
    useAppStore.setState({ profile, dates: {} })
    open()
    await waitFor(() => expect(fetchMock).toHaveBeenCalled())
    await Promise.resolve()
    expect(screen.queryByText('Даты из объявлений Центра')).toBeNull()
    expect(screen.queryByText(/Не удалось обновить/)).toBeNull()
  })

  it('keeps the saved copy offline and says quietly that it could not update', async () => {
    writeCachedCentreDates('ru', parseCentreDates(fixture)!)
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('offline'))))
    useAppStore.setState({ profile, dates: {} })
    open()
    expect(await screen.findByText('Не удалось обновить даты из объявлений.')).toBeInTheDocument()
    const chips = screen.getAllByRole('button', { name: /Объявление Центра$/ })
    expect(chips.length).toBeGreaterThan(0)
    fireEvent.click(chips[0])
    expect(screen.getAllByText(fixture[0].text).length).toBeGreaterThan(0)
  })
})
