import { type ReactNode, useRef } from 'react'
import { Link } from 'react-router'
import { IconInfo as Info, IconAlertTriangle as TriangleAlert, IconExternal as ExternalLink } from '@/components/icons'
import { getSource } from '@/content/sources'
import type { SourceId } from '@/content/types'
import { useI18n } from '@/i18n'
import { useModalFocus } from './useModalFocus'
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

/**
 * A link that looks like a button. A <button> inside an <a> is invalid HTML and breaks
 * keyboard focus in Safari and Firefox, so navigation gets its own element.
 */
export function ButtonLink({
  to,
  state,
  children,
  variant = 'primary',
  size = 'md',
  full,
}: Omit<ButtonProps, 'onClick' | 'type' | 'disabled' | 'ariaLabel'> & { to: string; state?: unknown }) {
  return (
    <Link to={to} state={state} className={[s.btn, s[variant], s[size], full ? s.full : '', s.btnLink].join(' ')}>
      {children}
    </Link>
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
  const { c, t } = useI18n()
  const src = getSource(id)
  // A source without a public page (answers given in closed applicant chats) is named,
  // not linked: a mail link would look like a document and open an e-mail instead.
  if (!/^https?:/.test(src.url)) {
    return (
      <span className={[s.calloutSource, s.sourcePlain].join(' ')}>
        {label ?? c(src.title)}
        <span className={s.sourceOrg}> · {t('common.noPublicSource')}</span>
      </span>
    )
  }
  return (
    <a className={s.calloutSource} href={src.url} target="_blank" rel="noopener noreferrer">
      <ExternalLink size={13} aria-hidden="true" />
      {label ?? c(src.title)}
      <span className={s.sourceOrg}> · {src.org}</span>
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
  confirmVariant = 'danger',
  extra,
}: {
  open: boolean
  title: string
  text: string
  confirmLabel: string
  onConfirm: () => void
  onCancel: () => void
  /** 'danger' for destructive actions; 'primary' when confirming is the safe choice. */
  confirmVariant?: 'danger' | 'primary'
  /** A second way out, shown between Cancel and the main action. */
  extra?: { label: string; onClick: () => void }
}) {
  const { t } = useI18n()
  const dialogRef = useRef<HTMLDivElement>(null)
  useModalFocus(dialogRef, open, onCancel)

  if (!open) return null
  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={title} onClick={onCancel}>
      <div className={s.dialog} ref={dialogRef} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.dialogTitle}>{title}</h2>
        <p className={s.dialogText}>{text}</p>
        <div className={s.dialogActions}>
          <Button variant="quiet" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
          {extra && (
            <Button variant="ghost" onClick={extra.onClick}>
              {extra.label}
            </Button>
          )}
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
