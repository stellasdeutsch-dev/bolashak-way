import { useEffect, useRef, useState } from 'react'

/**
 * True while the reader is scrolling down, so a sticky bar can get out of the way.
 * Scrolling back up brings it straight back, which is how phone browsers hide their
 * own chrome — the progress stays one flick away instead of eating a third of a
 * small screen the whole time.
 */
export function useHideOnScroll(threshold = 90): boolean {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    let ticking = false

    const evaluate = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - lastY.current
      // A few pixels of jitter — or the rubber band at either end — must not toggle it.
      if (Math.abs(delta) < 6) return
      if (y < threshold) setHidden(false)
      else setHidden(delta > 0)
      lastY.current = y
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(evaluate)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return hidden
}
