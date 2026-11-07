import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, iframe'

/**
 * Focus handling every dialog here shares: move focus in when it opens, keep Tab inside
 * it, close on Escape and give focus back to whatever opened it.
 */
export function useModalFocus(box: RefObject<HTMLElement | null>, open: boolean, onClose: () => void, initial?: () => HTMLElement | null | undefined) {
  // The latest callbacks, without re-running the effect (and re-focusing) on each render.
  const close = useRef(onClose)
  const first = useRef(initial)
  close.current = onClose
  first.current = initial

  useEffect(() => {
    if (!open) return
    const restoreTo = document.activeElement as HTMLElement | null
    ;(first.current?.() ?? box.current?.querySelector<HTMLElement>('button'))?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close.current()
      if (e.key !== 'Tab' || !box.current) return
      const items = box.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      if (items.length === 0) return
      const head = items[0]
      const tail = items[items.length - 1]
      if (e.shiftKey && document.activeElement === head) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && document.activeElement === tail) {
        e.preventDefault()
        head.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      restoreTo?.focus?.()
    }
  }, [open, box])
}
