import { useI18n } from '@/i18n'
import { useSyncStore } from './syncStore'
import s from './cloud.module.css'

/** One dot and, optionally, a short label describing where the cloud copy stands. */
export function SyncBadge({ withLabel = false }: { withLabel?: boolean }) {
  const { t } = useI18n()
  const status = useSyncStore((st) => st.status)
  const dirty = useSyncStore((st) => st.dirty)
  const shown = status === 'saved' && dirty ? 'saving' : status
  return (
    <span className={[s.badge, s[`badge_${shown}`]].join(' ')} title={t(`sync.${shown}`)}>
      <span className={s.badgeDot} aria-hidden="true" />
      {withLabel && <span className={s.badgeLabel}>{t(`sync.${shown}`)}</span>}
    </span>
  )
}
