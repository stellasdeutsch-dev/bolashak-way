import { useEffect } from 'react'
import { useLocation } from 'react-router'
import s from './ScrollRail.module.css'

/**
 * Page scroll rail for mouse and trackpad, the same one the Bolashak site uses. Touch screens keep
 * their own overlay scrollbar. The thumb's leading edge sits exactly where the page is and its tail
 * eases after it, so a fast scroll stretches the thumb and it settles back. Section headings in
 * <main> become dots on the track; hovering the track names the section at that point, a click jumps
 * there, the thumb can be dragged. Wheel and keyboard scrolling stay the browser's own.
 */
export function ScrollRail() {
  const { pathname } = useLocation()
  useEffect(() => {
    // jsdom and very old browsers have neither matchMedia nor ResizeObserver: keep the native scrollbar there
    if (typeof matchMedia !== 'function' || typeof ResizeObserver !== 'function' || !matchMedia('(pointer: fine)').matches) return
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = document.documentElement
    const sb = document.createElement('div')
    sb.className = s.rail
    sb.setAttribute('aria-hidden', 'true')
    const marksBox = document.createElement('div')
    const thumb = document.createElement('div')
    thumb.className = s.thumb
    const tip = document.createElement('div')
    tip.className = s.tip
    sb.append(marksBox, thumb, tip)
    document.body.append(sb)
    root.classList.add(s.hasRail)
    const PAD = 4
    let tail = scrollY, raf = 0, idle = 0, debounce = 0
    let drag: { y: number; top: number } | null = null
    let heads: { el: HTMLElement; top: number; mark: HTMLElement }[] = []
    let stretch = 0, lastHere: HTMLElement | null = null
    const geo = () => {
      const H = root.scrollHeight, V = innerHeight, track = sb.clientHeight - PAD * 2
      const h = Math.max(36, Math.round((track * V) / Math.max(H, 1)))
      return { max: Math.max(1, H - V), track, h, scrollable: H > V + 2 }
    }
    const posOf = (y: number, g = geo()) => PAD + (g.track - g.h) * Math.min(1, Math.max(0, y / g.max))
    const yAt = (px: number, g = geo()) => ((px - PAD - g.h / 2) / Math.max(1, g.track - g.h)) * g.max
    const offset = () => (document.querySelector('header') as HTMLElement | null)?.offsetHeight || 64
    const sectionAt = (y: number) => {
      let hit: (typeof heads)[number] | undefined
      for (const x of heads) if (x.top - offset() - 8 <= y) hit = x
      return hit
    }
    const label = (el: HTMLElement) => (el.textContent || '').replace(/\s+/g, ' ').trim()
    const where = (y: number) => {
      const hit = sectionAt(y)
      const g = geo()
      return hit ? label(hit.el) : `${Math.round((Math.min(Math.max(y, 0), g.max) / g.max) * 100)}%`
    }
    const paint = () => {
      raf = 0
      const g = geo()
      sb.hidden = !g.scrollable
      if (!g.scrollable) return
      const y = scrollY
      tail = still || drag ? y : tail + (y - tail) * 0.22
      if (Math.abs(y - tail) < 0.5) tail = y
      const a = posOf(y, g), b = posOf(tail, g)
      thumb.style.height = `${g.h + Math.abs(a - b)}px`
      thumb.style.transform = `translateY(${Math.min(a, b)}px)`
      // a long stretch ends with a small wobble as the tail catches up
      stretch = Math.max(stretch, Math.abs(a - b))
      if (tail === y && stretch > 14 && !still) { thumb.classList.remove(s.settle); void thumb.offsetWidth; thumb.classList.add(s.settle) }
      if (tail === y) stretch = 0
      const here = sectionAt(y)
      for (const x of heads) x.mark.classList.toggle(s.here, x === here)
      // entering a new section rings its dot once
      if (here && here.mark !== lastHere) { if (lastHere && !still) { here.mark.classList.remove(s.ping); void here.mark.offsetWidth; here.mark.classList.add(s.ping) } lastHere = here.mark }
      if (tail !== y) raf = requestAnimationFrame(paint)
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(paint) }
    const showTip = (text: string | undefined, top: number) => {
      tip.classList.toggle(s.tipOn, !!text)
      if (text) {
        tip.textContent = text
        tip.style.top = `${Math.min(sb.clientHeight - 20, Math.max(20, top))}px`
      }
    }
    const measure = () => {
      marksBox.textContent = ''
      lastHere = null
      const main = document.querySelector('main')
      let list = main ? [...main.querySelectorAll<HTMLElement>('h2')] : []
      if (list.length < 3 && main) list = [...main.querySelectorAll<HTMLElement>('h2, h3')]
      list = list.filter((el) => el.offsetParent && label(el)).slice(0, 40)
      const g = geo()
      heads = list.map((el) => {
        const top = el.getBoundingClientRect().top + scrollY
        const mark = document.createElement('div')
        mark.className = s.mark
        mark.style.setProperty('--i', String(marksBox.childElementCount))
        mark.style.top = `${posOf(top - offset() - 8, g) + g.h / 2}px`
        marksBox.append(mark)
        return { el, top, mark }
      })
      kick()
    }
    const onScroll = () => {
      sb.classList.add(s.on)
      clearTimeout(idle)
      idle = window.setTimeout(() => sb.classList.remove(s.on), 1100)
      kick()
    }
    const onResize = () => { cancelAnimationFrame(debounce); debounce = requestAnimationFrame(measure) }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)

    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      thumb.setPointerCapture(e.pointerId)
      drag = { y: e.clientY, top: scrollY }
      sb.classList.add(s.drag)
    })
    thumb.addEventListener('pointermove', (e) => {
      if (!drag) return
      const g = geo()
      scrollTo({ top: drag.top + ((e.clientY - drag.y) * g.max) / Math.max(1, g.track - g.h), behavior: 'instant' as ScrollBehavior })
      showTip(where(scrollY), e.clientY)
    })
    const endDrag = () => {
      if (!drag) return
      drag = null
      sb.classList.remove(s.drag)
      showTip(undefined, 0)
      kick()
    }
    thumb.addEventListener('pointerup', endDrag)
    thumb.addEventListener('animationend', () => thumb.classList.remove(s.settle))
    marksBox.addEventListener('animationend', (e) => (e.target as HTMLElement).classList.remove(s.ping))
    thumb.addEventListener('pointercancel', endDrag)
    sb.addEventListener('pointermove', (e) => {
      if (drag) return
      const mark = (e.target as HTMLElement).closest(`.${s.mark}`)
      const hit = mark && heads.find((x) => x.mark === mark)
      showTip(hit ? label(hit.el) : where(e.target === thumb ? scrollY : yAt(e.clientY)), e.clientY)
    })
    sb.addEventListener('pointerleave', () => { if (!drag) showTip(undefined, 0) })
    sb.addEventListener('click', (e) => {
      if (e.target === thumb) return
      const mark = (e.target as HTMLElement).closest(`.${s.mark}`)
      const hit = mark && heads.find((x) => x.mark === mark)
      scrollTo({ top: hit ? hit.top - offset() - 8 : yAt(e.clientY), behavior: still ? 'auto' : 'smooth' })
    })
    // pages load on demand, so measure again once the new route has painted
    const late = window.setTimeout(measure, 400)
    measure()
    return () => {
      clearTimeout(late); clearTimeout(idle); cancelAnimationFrame(raf); cancelAnimationFrame(debounce)
      removeEventListener('scroll', onScroll)
      removeEventListener('resize', onResize)
      ro.disconnect()
      sb.remove()
      root.classList.remove(s.hasRail)
    }
  }, [pathname])
  return null
}
