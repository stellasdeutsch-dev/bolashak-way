import { useEffect, type ReactNode } from 'react'
import { Info, TriangleAlert, ExternalLink } from 'lucide-react'
import { getSource } from '@/content/sources'
import type { SourceId } from '@/content/types'
import { useI18n } from '@/i18n'
import s from './ui.module.css'

type ButtonProps = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
  ariaLabel?: string
}

export function Button({ children, onClick, variant = 'primary', size = 'md', full, disabled, type = 'button', ariaLabel }: ButtonProps) {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={[s.btn, s[variant], s[size], full ? s.full : ''].join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function Card({ children, dark, className, id }: { children: ReactNode; dark?: boolean; className?: string; id?: string }) {
  return (
    <div id={id} className={[dark ? s.cardDark : s.card, dark ? 'on-dark' : '', className ?? ''].join(' ')}>
      {children}
    </div>
  )
}

export function Pill({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' | 'success' | 'warn' | 'dark' }) {
  const map = { default: '', accent: s.pillAccent, success: s.pillSuccess, warn: s.pillWarn, dark: s.pillDark }
  return <span className={[s.pill, map[tone]].join(' ')}>{children}</span>
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  label,
  dark,
}: {
  value: number
  size?: number
  stroke?: number
  label?: ReactNode
  dark?: boolean
}) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const clamped = Math.max(0, Math.min(1, value))
  return (
    <div className={[s.ring, dark ? s.ringDark : ''].join(' ')} style={{ width: size, height: size }}>
      <svg className={s.ringSvg} width={size} height={size} aria-hidden="true">
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <circle className={s.ringTrack} cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} />
        <circle
          className={s.ringValue}
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - clamped)}
        />
      </svg>
      <span className={s.ringLabel} style={{ fontSize: size / 3.6 }}>
        {label ?? `${Math.round(clamped * 100)}%`}
      </span>
    </div>
  )
}

export function Callout({ children, tone = 'info', source }: { children: ReactNode; tone?: 'info' | 'warn' | 'plain'; source?: SourceId }) {
  const { t } = useI18n()
  const Icon = tone === 'warn' ? TriangleAlert : Info
  const cls = tone === 'warn' ? s.calloutWarn : tone === 'info' ? s.calloutInfo : ''
  return (
    <div className={[s.callout, cls].join(' ')}>
      {tone !== 'plain' && <Icon size={18} className={s.calloutIcon} aria-hidden="true" />}
      <div className={s.calloutBody}>
        {children}
        {source && <SourceLink id={source} label={t('common.source')} />}
      </div>
    </div>
  )
}

export function SourceLink({ id, label }: { id: SourceId; label?: string }) {
  const { c } = useI18n()
  const src = getSource(id)
  return (
    <a className={s.calloutSource} href={src.url} target="_blank" rel="noopener noreferrer">
      <ExternalLink size={13} aria-hidden="true" />
      {label ?? c(src.title)}
      <span style={{ opacity: 0.6 }}>· {src.org}</span>
    </a>
  )
}

export function FallbackBadge() {
  const { t } = useI18n()
  return <span className={s.fallbackBadge}>{t('common.inRussian')}</span>
}

export function ConfirmDialog({
  open,
  title,
  text,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  open: boolean
  title: string
  text: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
}) {
  const { t } = useI18n()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={title} onClick={onCancel}>
      <div className={s.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.dialogTitle}>{title}</h2>
        <p className={s.dialogText}>{text}</p>
        <div className={s.dialogActions}>
          <Button variant="quiet" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
