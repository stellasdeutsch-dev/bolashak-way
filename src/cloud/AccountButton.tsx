import { Link } from 'react-router'
import { useI18n } from '@/i18n'
import { cloudEnabled } from './supabase'
import { useAuthStore } from './useAuth'
import { SyncBadge } from './SyncBadge'
import { IconUser } from './icons'
import s from './cloud.module.css'

/** Header control: "Sign in" for a visitor, an initial-letter avatar with the sync dot for a user. */
export function AccountButton() {
  const { t } = useI18n()
  const status = useAuthStore((a) => a.status)
  const email = useAuthStore((a) => a.user?.email ?? '')
  if (!cloudEnabled) return null

  if (status === 'signed-in') {
    return (
      <Link to="/account" className={s.avatarBtn} aria-label={`${t('account.title')}: ${email}`} title={email}>
        <span className={s.avatar}>{(email[0] ?? '?').toUpperCase()}</span>
        <SyncBadge />
      </Link>
    )
  }
  return (
    <Link to="/account" className={s.signInBtn} aria-label={t('account.signIn')} title={t('account.signIn')}>
      <IconUser size={17} />
      <span className={s.signInText}>{t('account.signIn')}</span>
    </Link>
  )
}
