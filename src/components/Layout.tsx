import { useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink, Link, useLocation } from 'react-router'
import {
  IconMap as MapIcon, IconFolderCheck as FolderCheck, IconSettings as SettingsIcon,
  IconSearch as Search, IconBookOpen as BookOpen, IconCalendar as CalendarIcon,
} from '@/components/icons'
import { SearchOverlay } from './SearchOverlay'
import { AccountButton } from '@/cloud/AccountButton'
import { LegacyImport } from '@/cloud/LegacyImport'
import { ErrorBoundary } from './ErrorBoundary'
import { PlatformSwitcher } from './platform/PlatformSwitcher'
import { useActivePlatform, usePlatformColour } from './platform/usePlatform'
import { platformPaths } from '@/domain/paths'
import { LOCALES, useI18n } from '@/i18n'
import { useAppStore } from '@/store/useAppStore'
import s from './Layout.module.css'

type NavItem = { to: string; key: string; Icon: typeof MapIcon; end?: boolean }

/** Inside a platform the nav is that platform's; on the chooser it is just the way in. */
function useNav(): NavItem[] {
  const platform = useActivePlatform()
  if (!platform) return []
  const p = platformPaths(platform.slug)
  return [
    { to: p.home, key: 'nav.overview', Icon: BookOpen, end: true },
    { to: p.roadmap, key: 'nav.roadmap', Icon: MapIcon },
    { to: p.calendar, key: 'nav.calendar', Icon: CalendarIcon },
    { to: p.documents, key: 'nav.documents', Icon: FolderCheck },
    { to: '/settings', key: 'nav.settings', Icon: SettingsIcon },
  ]
}

export function LangSwitch() {
  const locale = useAppStore((st) => st.locale)
  const setLocale = useAppStore((st) => st.setLocale)
  return (
    <div className={s.langSwitch} role="group" aria-label="Язык · Тіл · Language">
      {LOCALES.map((l) => (
        <button
          key={l.id}
          className={[s.langBtn, locale === l.id ? s.langBtnActive : ''].join(' ')}
          onClick={() => setLocale(l.id)}
          aria-pressed={locale === l.id}
          title={l.native}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { t } = useI18n()
  const hasProfile = useAppStore((st) => st.profile !== null)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const nav = useNav()
  const platform = useActivePlatform()
  usePlatformColour(platform?.slug ?? null)
  const mainRef = useRef<HTMLElement>(null)
  const firstRender = useRef(true)

  // A new page is announced by moving focus to its heading — otherwise keyboard and
  // screen-reader users stay on the link they pressed, somewhere in the old page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    // Pages load on demand, so give the heading a few frames to appear before settling for <main>.
    let tries = 0
    let id = 0
    const attempt = () => {
      const main = mainRef.current
      if (main?.querySelector('h1') || tries++ > 30) return focusMain(main)
      id = requestAnimationFrame(attempt)
    }
    id = requestAnimationFrame(attempt)
    return () => cancelAnimationFrame(id)
  }, [pathname])

  // "/" is the conventional shortcut for search; ignore it while typing in a field.
  useEffect(() => {
    if (!hasProfile) return
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement
      const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || (el as HTMLElement | null)?.isContentEditable
      if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [hasProfile])

  return (
    <div className={s.shell}>
      <button type="button" className={s.skip} onClick={() => focusMain(mainRef.current)}>
        {t('nav.skip')}
      </button>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link to="/" className={s.brand}>
            <span className={s.mark} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 64 64" fill="none">
                <path d="M18 42C24 26 40 24 46 34c-8-2-14 2-18 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <circle cx="46" cy="34" r="5" fill="currentColor" />
              </svg>
            </span>
            <span className={[s.brandText, platform ? s.brandTextCollapsible : ''].join(' ')}>Bolashak&nbsp;Way</span>
          </Link>
          <PlatformSwitcher />
          <nav className={s.deskNav} aria-label={t('nav.label')}>
            {nav.map(({ to, key, Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={({ isActive }) => [s.deskLink, isActive ? s.deskLinkActive : ''].join(' ')}>
                <Icon size={16} aria-hidden="true" />
                {t(key)}
              </NavLink>
            ))}
          </nav>
          <span className={s.spacer} />
          {hasProfile && (
            <button className={s.iconBtn} onClick={() => setSearchOpen(true)} aria-label={t('search.open')} title={t('search.open')}>
              <Search size={17} aria-hidden="true" />
            </button>
          )}
          <AccountButton />
          {!platform && (
            <Link to="/settings" className={s.iconBtn} aria-label={t('nav.settings')} title={t('nav.settings')}>
              <SettingsIcon size={17} aria-hidden="true" />
            </Link>
          )}
          <LangSwitch />
        </div>
      </header>

      {/* Keyed by route so the content fades in on every navigation. */}
      <main ref={mainRef} tabIndex={-1} className={[s.main, nav.length ? '' : s.mainNoTabs].join(' ')} key={pathname}>
        <ErrorBoundary inline>
          <LegacyImport />
          {children}
        </ErrorBoundary>
      </main>

      {nav.length > 0 && (
        <nav className={s.tabbar} aria-label={t('nav.label')}>
          {nav.map(({ to, key, Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => [s.tab, isActive ? s.tabActive : ''].join(' ')}>
              <Icon size={20} aria-hidden="true" />
              <span className={s.tabLabel}>{t(key.replace('nav.', 'navShort.'))}</span>
            </NavLink>
          ))}
        </nav>
      )}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}

/** Focus the page heading (or the page itself) without jumping the scroll position. */
export function focusMain(main: HTMLElement | null) {
  if (!main) return
  const heading = main.querySelector<HTMLElement>('h1')
  const target = heading ?? main
  if (heading && !heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}
