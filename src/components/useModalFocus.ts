import { useEffect, useRef, type RefObject } from 'react'

// Only what Tab can reach: a result list moved by arrow keys gives its rows tabIndex=-1,
// and counting those as the ends of the dialog let Tab slip out to the page beneath.
const FOCUSABLE = ['a[href]', 'button:not([disabled])', 'input:not([disabled])', 'textarea:not([disabled])', 'select:not([disabled])', 'iframe']
  .map((sel) => `${sel}:not([tabindex="-1"])`)
  .join(', ')

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
      const inside = box.current.contains(document.activeElement)
      if (e.shiftKey && (document.activeElement === head || !inside)) {
        e.preventDefault()
        tail.focus()
      } else if (!e.shiftKey && (document.activeElement === tail || !inside)) {
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
