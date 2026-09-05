import { NavLink, Outlet } from 'react-router'
import { Card } from '@/components/ui'
import { useI18n } from '@/i18n'
import { usePageChrome } from '@/i18n/usePageChrome'
import { IconShield } from '@/cloud/icons'
import s from './admin.module.css'

const TABS = [
  { to: '/admin', key: 'admin.overview', end: true },
  { to: '/admin/users', key: 'admin.users', end: false },
  { to: '/admin/roles', key: 'admin.roles', end: true },
]

export function AdminLayout() {
  const { t } = useI18n()
  usePageChrome(t('admin.title'))
  return (
    <div className={s.page}>
      <Card className={s.head}>
        <h1 className={`display ${s.title}`}>
          <IconShield size={22} /> {t('admin.title')}
        </h1>
        <nav className={s.subnav} aria-label={t('admin.title')}>
          {TABS.map((tab) => (
            <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => [s.subLink, isActive ? s.subLinkActive : ''].join(' ')}>
              {t(tab.key)}
            </NavLink>
          ))}
        </nav>
      </Card>
      <Outlet />
    </div>
  )
}
