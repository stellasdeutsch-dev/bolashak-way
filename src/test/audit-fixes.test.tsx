import { describe, expect, it, beforeEach, vi } from 'vitest'
import { act, render, screen, fireEvent, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { kkPossessive, useI18n } from '@/i18n'
import { safeLocalStorage, useSaveStatus } from '@/store/safeStorage'
import { useAppStore } from '@/store/useAppStore'
import { StagePage } from '@/pages/Stage'
import { NotFound } from '@/pages/NotFound'
import { Layout } from '@/components/Layout'
import { useAnnouncer } from '@/components/announce'
import type { Profile } from '@/content/types'

const self: Profile = { track: 'master', category: 'master_self', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: false, experience: null }

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru' })
})

describe('Kazakh possessive endings after a number', () => {
  it.each([
    [1, 'і'], [2, 'сі'], [3, 'і'], [4, 'і'], [5, 'і'], [6, 'сы'], [7, 'сі'], [8, 'і'], [9, 'ы'],
    [10, 'ы'], [17, 'сі'], [18, 'і'], [20, 'сы'], [30, 'ы'], [40, 'ы'], [50, 'і'], [60, 'ы'], [70, 'і'],
    [80, 'і'], [90, 'ы'], [100, 'і'], [1000, 'ы'], [0, 'і'],
  ])('%i takes -%s', (n, ending) => {
    expect(kkPossessive(n)).toBe(ending)
  })

  it('is filled into the Kazakh strings', () => {
    useAppStore.setState({ locale: 'kk' })
    let text = ''
    function Probe() {
      text = useI18n().t('roadmap.items', { done: 2, total: 4 })
      return null
    }
    render(<Probe />)
    expect(text).toBe('4 қадамның 2-сі')
  })
})

describe('storage that runs out of room', () => {
  it('reports a failed write instead of throwing, and clears the flag after a good one', () => {
    let full = true
    const fake = { getItem: () => null, setItem: vi.fn(() => { if (full) throw new DOMException('quota', 'QuotaExceededError') }), removeItem: () => {} } as unknown as Storage
    const storage = safeLocalStorage(() => fake)
    expect(() => storage.setItem('bolashak-way', '{}')).not.toThrow()
    expect(useSaveStatus.getState().failed).toBe(true)
    full = false
    storage.setItem('bolashak-way', '{}')
    expect(useSaveStatus.getState().failed).toBe(false)
  })

  it('shows the reader a warning with the way to save a copy', () => {
    useSaveStatus.setState({ failed: true })
    render(
      <MemoryRouter>
        <Layout>
          <div />
        </Layout>
      </MemoryRouter>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent(/не сохранились/)
    expect(within(screen.getByRole('alert')).getByRole('link', { name: /Скачать копию/ })).toBeInTheDocument()
    act(() => useSaveStatus.setState({ failed: false }))
  })
})

const stageAt = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/master/stage/${id}`]}>
      <Routes>
        <Route path="/:platform/stage/:id" element={<StagePage />} />
      </Routes>
    </MemoryRouter>,
  )

describe('stage page', () => {
  beforeEach(() => {
    useAppStore.setState({ profile: self, onboardedAt: new Date().toISOString() })
  })

  it('names its sections as headings, with the checklist first', () => {
    stageAt('eligibility')
    const h2 = [...document.querySelectorAll('h2')].map((h) => h.textContent)
    expect(h2[0]).toBe('Что сделать')
    expect(h2).toContain('Об этапе')
  })

  it('asks before closing a stage with steps left open', () => {
    stageAt('eligibility')
    fireEvent.click(screen.getByRole('button', { name: /Отметить этап пройденным/ }))
    expect(screen.getByRole('dialog')).toHaveTextContent(/Отмечено 0 из \d+ шагов/)
    expect(useAppStore.getState().stagesDone).toEqual([])
    fireEvent.click(screen.getByRole('button', { name: /Отметить все и закрыть/ }))
    expect(useAppStore.getState().stagesDone).toEqual(['eligibility'])
    expect(useAppStore.getState().checked.length).toBeGreaterThan(0)
  })

  it('announces the new count after a tick', () => {
    stageAt('eligibility')
    const box = screen.getAllByRole('checkbox')[0]
    fireEvent.click(box)
    expect(useAnnouncer.getState().message).toMatch(/^Отмечено\. Шагов: 1 из \d+/)
  })

  it('explains why the boxes of a locked stage do not respond and links on', () => {
    stageAt('documents')
    const note = document.getElementById('locked-note')!
    expect(note).toHaveTextContent(/Галочки здесь пока неактивны/)
    expect(within(note).getByRole('link')).toHaveAttribute('href', '/master/stage/eligibility')
    const box = screen.getAllByRole('checkbox')[0]
    expect(box).toHaveAttribute('aria-disabled', 'true')
    expect(box).toHaveAttribute('aria-describedby', 'locked-note')
  })
})

describe('404', () => {
  it('explains itself and leads back to the reader’s own plan', () => {
    useAppStore.setState({ profile: self, onboardedAt: new Date().toISOString() })
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    )
    expect(screen.getByText(/ссылка устарела/)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Мой план' })).toHaveAttribute('href', '/master/roadmap')
    expect(document.title).toMatch(/^Страница не найдена/)
  })
})
