import { useEffect, useState, type ReactNode }  from 'react'
import { NavLink, Link } from 'react-router'
import { Map as MapIcon, FolderCheck, Settings as SettingsIcon, Search } from 'lucide-react'
import { SearchOverlay } from './SearchOverlay'
import { LOCALES, useI18n } from '@/i18n'
import { useAppStore } from '@/store/useAppStore'
import s from './Layout.module.css'

const NAV = [
  { to: '/', key: 'nav.roadmap', Icon: MapIcon },
  { to: '/documents', key: 'nav.documents', Icon: FolderCheck },
  { to: '/settings', key: 'nav.settings', Icon: SettingsIcon },
]

export function LangSwitch() {
  const locale = useAppStore((st) => st.locale)
  const setLocale = useAppStore((st) => st.setLocale)
  return (
    <div className={s.langSwitch} role="group" aria-label="Language">
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
      <header className={s.header}>
        <div className={s.headerInner}>
          <Link to="/" className={s.brand}>
            <span className={s.mark} aria-hidden="true">
              <svg width="17" height="17" viewBox="0 0 64 64" fill="none">
                <path d="M18 42C24 26 40 24 46 34c-8-2-14 2-18 12" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                <circle cx="46" cy="34" r="5" fill="currentColor" />
              </svg>
            </span>
            Bolashak&nbsp;Way
          </Link>
          <nav className={s.deskNav}>
            {NAV.map(({ to, key, Icon }) => (
              <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => [s.deskLink, isActive ? s.deskLinkActive : ''].join(' ')}>
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
          <LangSwitch />
        </div>
      </header>

      <main className={s.main}>{children}</main>

      <nav className={s.tabbar} aria-label={t('nav.roadmap')}>
        {NAV.map(({ to, key, Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => [s.tab, isActive ? s.tabActive : ''].join(' ')}>
            <Icon size={20} aria-hidden="true" />
            {t(key)}
          </NavLink>
        ))}
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
