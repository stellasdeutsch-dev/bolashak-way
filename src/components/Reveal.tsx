import { useEffect, useRef, useState, type ReactNode } from 'react'

/** True when the reader has asked the system to keep motion down. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  )
  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

/**
 * Fires once when the element first scrolls into view. Under reduced motion — and in
 * environments without IntersectionObserver — it reports "in view" immediately, so the
 * visual is simply there rather than waiting for an event that never comes.
 */
export function useInView<T extends Element>(): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const reduced = useReducedMotion()
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const el = ref.current
    if (!el) return

    let delivered = false
    const io = new IntersectionObserver(
      (entries) => {
        delivered = true
        // `isIntersecting` alone loses anything the reader jumped over — a hash link,
        // restored scroll position or a fast flick can leave a block above the fold
        // having never been observed inside it, and it would then stay invisible for
        // good. Anything whose top edge is already past the fold counts as seen.
        const shown = entries.some((e) => e.isIntersecting || e.boundingClientRect.top < window.innerHeight)
        if (shown) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)

    // A healthy observer reports on the very first frame, intersecting or not. If nothing
    // arrives at all, the callbacks are not being delivered here — show the content rather
    // than leave the reader with an empty page.
    const failsafe = window.setTimeout(() => {
      if (!delivered) setSeen(true)
    }, 1000)

    return () => {
      window.clearTimeout(failsafe)
      io.disconnect()
    }
  }, [reduced])

  return [ref, seen]
}

/** Counts up to `value` once the number is on screen. Static under reduced motion. */
export function useCountUp(value: number, active: boolean, ms = 900): number {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced || !active) {
      setShown(value)
      return
    }
    let raf = 0
    let start: number | null = null
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min(1, (ts - start) / ms)
      // Ease out, so the number settles instead of stopping dead.
      setShown(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, active, ms, reduced])

  return shown
}

/** Wraps children in a block that rises into place the first time it is scrolled to. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={[className ?? '', 'reveal', seen ? 'revealIn' : ''].join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
