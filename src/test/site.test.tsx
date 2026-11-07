import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { Layout } from '@/components/Layout'
import { PageFootnote } from '@/components/PageFootnote'
import { localeFromUrl, normaliseSiteUrl, SITE_URL, siteHome, siteLang } from '@/domain/site'
import { useAppStore } from '@/store/useAppStore'

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru' })
})

describe('site address', () => {
  it('defaults to the preview of the redesign and always ends with a slash', () => {
    expect(SITE_URL).toBe('https://stellasdeutsch-dev.github.io/bolashak-site/')
    expect(normaliseSiteUrl('https://bolashak.gov.kz')).toBe('https://bolashak.gov.kz/')
    expect(normaliseSiteUrl('https://example.kz/cip?x=1#top')).toBe('https://example.kz/cip/')
    expect(normaliseSiteUrl('  ')).toBe(SITE_URL)
    expect(normaliseSiteUrl('javascript:alert(1)')).toBe(SITE_URL)
    expect(normaliseSiteUrl('not a url')).toBe(SITE_URL)
  })

  it('uses the site language paths: Kazakh lives under /kz/', () => {
    expect(siteLang('kk')).toBe('kz')
    expect(siteHome('ru', 'https://s.kz/')).toBe('https://s.kz/ru/')
    expect(siteHome('kk', 'https://s.kz/')).toBe('https://s.kz/kz/')
    expect(siteHome('en', 'https://s.kz/')).toBe('https://s.kz/en/')
  })
})

describe('?lang= from the site', () => {
  it('reads the query string and the query of the hash route', () => {
    expect(localeFromUrl({ search: '?lang=kz', hash: '' })).toBe('kk')
    expect(localeFromUrl({ search: '?lang=KK', hash: '' })).toBe('kk')
    expect(localeFromUrl({ search: '?lang=en', hash: '' })).toBe('en')
    expect(localeFromUrl({ search: '', hash: '#/master/calendar?lang=ru' })).toBe('ru')
    expect(localeFromUrl({ search: '?lang=de', hash: '' })).toBeNull()
    expect(localeFromUrl({ search: '', hash: '#/master' })).toBeNull()
  })
})

describe('way back to the site', () => {
  it('links the header to the site home in the reader’s language', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>page</p>
        </Layout>
      </MemoryRouter>,
    )
    const link = screen.getByRole('link', { name: 'Центр международных программ' })
    expect(link).toHaveAttribute('href', `${SITE_URL}ru/`)
    act(() => useAppStore.setState({ locale: 'kk' }))
    expect(screen.getByRole('link', { name: 'Халықаралық бағдарламалар орталығы' })).toHaveAttribute('href', `${SITE_URL}kz/`)
  })

  it('links the footer to the site', () => {
    useAppStore.setState({ locale: 'en' })
    render(
      <MemoryRouter>
        <PageFootnote />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /To the Center for International Programs site/ })).toHaveAttribute('href', `${SITE_URL}en/`)
  })
})
