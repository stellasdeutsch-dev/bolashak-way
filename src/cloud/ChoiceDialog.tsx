import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui'
import s from './cloud.module.css'

/** ConfirmDialog's shape with two positive answers; Escape defers the choice. */
export function ChoiceDialog({
  open,
  title,
  text,
  primary,
  secondary,
  onPrimary,
  onSecondary,
  onDismiss,
}: {
  open: boolean
  title: string
  text: string
  primary: string
  secondary: string
  onPrimary: () => void
  onSecondary: () => void
  onDismiss: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const restoreTo = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    restoreTo.current = document.activeElement as HTMLElement
    ref.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onDismiss()
      if (e.key === 'Tab' && ref.current) {
        const f = ref.current.querySelectorAll<HTMLElement>('button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      restoreTo.current?.focus?.()
    }
  }, [open, onDismiss])

  if (!open) return null
  return (
    <div className={s.overlay} role="dialog" aria-modal="true" aria-label={title} onClick={onDismiss}>
      <div className={s.dialog} ref={ref} onClick={(e) => e.stopPropagation()}>
        <h2 className={s.dialogTitle}>{title}</h2>
        <p className={s.dialogText}>{text}</p>
        <div className={s.dialogActions}>
          <Button variant="secondary" onClick={onSecondary}>
            {secondary}
          </Button>
          <Button onClick={onPrimary}>{primary}</Button>
        </div>
      </div>
    </div>
  )
}
