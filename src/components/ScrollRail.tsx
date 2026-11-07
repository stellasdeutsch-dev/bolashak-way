import { useEffect } from 'react'
import { useLocation } from 'react-router'
import s from './ScrollRail.module.css'

const NS = 'http://www.w3.org/2000/svg'
const RAIL_W = 20

/** One damped spring step, normalised to 60 frames a second. */
const spring = (x: number, v: number, target: number, k: number, c: number, dt: number): [number, number] => {
  const nv = v + (k * (target - x) - c * v) * dt
  return [x + nv * dt, nv]
}

/**
 * The thumb drawn as a drop of liquid: two ends with different radii joined by a waist that
 * thins as the drop stretches. `top`/`bottom` are the ends, `rTop`/`rBottom` their radii.
 */
function dropPath(cx: number, top: number, bottom: number, rTop: number, rBottom: number, neck: number): string {
  const a = top + rTop
  const b = bottom - rBottom
  const mid = (a + b) / 2
  const l1 = Math.max(0, (mid - a) * 0.55)
  const l2 = Math.max(0, (b - mid) * 0.55)
  const f = (n: number) => n.toFixed(2)
  return [
    `M${f(cx - rTop)} ${f(a)}`,
    `A${f(rTop)} ${f(rTop)} 0 0 1 ${f(cx + rTop)} ${f(a)}`,
    `C${f(cx + rTop)} ${f(a + l1)} ${f(cx + neck)} ${f(mid - l1)} ${f(cx + neck)} ${f(mid)}`,
    `C${f(cx + neck)} ${f(mid + l2)} ${f(cx + rBottom)} ${f(b - l2)} ${f(cx + rBottom)} ${f(b)}`,
    `A${f(rBottom)} ${f(rBottom)} 0 0 1 ${f(cx - rBottom)} ${f(b)}`,
    `C${f(cx - rBottom)} ${f(b - l2)} ${f(cx - neck)} ${f(mid + l2)} ${f(cx - neck)} ${f(mid)}`,
    `C${f(cx - neck)} ${f(mid - l1)} ${f(cx - rTop)} ${f(a + l1)} ${f(cx - rTop)} ${f(a)}`,
    'Z',
  ].join('')
}

/**
 * Page scroll rail for mouse and trackpad, the same one the Bolashak site uses. Touch screens keep
 * their own overlay scrollbar. The thumb behaves like a drop of liquid: its leading end sits exactly
 * where the page is, the other end follows on a spring, so a fast scroll stretches the drop, thins its
 * waist and its tail; a long stretch lets a small droplet fall off and run back in; at rest the drop
 * wobbles once; hitting the top or the bottom of the page squashes it. Section headings in <main>
 * become dots on the track; hovering the track names the section at that point, a click jumps there,
 * the thumb can be dragged. Wheel and keyboard scrolling stay the browser's own. With reduced motion
 * the drop simply follows the page.
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
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('class', s.drop)
    const body = document.createElementNS(NS, 'path')
    const drip = document.createElementNS(NS, 'circle')
    drip.setAttribute('r', '0')
    // the droplet sits behind the drop, so where they overlap they read as one body of liquid
    svg.append(drip, body)
    // the thumb itself is only the hit area for dragging; the drop is drawn in the svg
    const thumb = document.createElement('div')
    thumb.className = s.thumb
    const tip = document.createElement('div')
    tip.className = s.tip
    sb.append(marksBox, svg, thumb, tip)
    document.body.append(sb)
    root.classList.add(s.hasRail)
    const PAD = 4
    let raf = 0, idle = 0, debounce = 0, last = 0
    let drag: { y: number; top: number } | null = null
    let hover = false
    let heads: { el: HTMLElement; top: number; mark: HTMLElement }[] = []
    let lastHere: HTMLElement | null = null
    // the drop: its two ends, their speeds, its width, a squash after hitting an edge, and a droplet
    let top = -1, bottom = -1, pos = 0, vPos = 0, vel = 0, stretchS = 0, vStretch = 0, width = 4, vWidth = 0, squash = 0, vSquash = 0
    let lastTarget = 0, dir = 0, prevY = scrollY
    let dropY = 0, vDrop = 0, dropAlive = false, dropAge = 0
    // which end is the tail: eases between -1 (moving up) and 1 (moving down), so the shape never flips at once
    let bias = 0, vBias = 0
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
    const paint = (now: number) => {
      raf = 0
      const g = geo()
      sb.hidden = !g.scrollable
      if (!g.scrollable) return
      const dt = last ? Math.min(3, (now - last) / 16.67) : 1
      last = now
      const y = scrollY
      const tTop = posOf(y, g)
      const tBottom = tTop + g.h
      const moved = tTop - lastTarget
      if (Math.abs(moved) > 0.3) dir = Math.sign(moved)
      lastTarget = tTop
      const wTarget = drag || hover ? 10 : sb.classList.contains(s.on) ? 7 : 4
      // hitting the top or the bottom of the page with speed squashes the drop
      const speed = Math.abs(y - prevY) / dt
      if (!still && speed > 6 && (y <= 0 || y >= g.max - 1) && Math.abs(prevY - y) > 0) vSquash += Math.min(0.05, speed / 700)
      prevY = y

      if (still || drag || top < 0) {
        pos = tTop; vPos = 0; vel = 0; stretchS = 0; vStretch = 0; bias = vBias = 0
        width = wTarget; vWidth = 0; squash = vSquash = 0; dropAlive = false
      } else {
        // the drop follows the page on a smooth spring; how far its tail trails depends on a smoothed speed,
        // so the separate steps of a mouse wheel don't make it pulse
        ;[pos, vPos] = spring(pos, vPos, tTop, 0.3, 1.1, dt)
        vel += (moved / dt - vel) * Math.min(1, 0.06 * dt)
        ;[stretchS, vStretch] = spring(stretchS, vStretch, Math.min(220, Math.abs(vel) * 12), 0.05, 0.45, dt)
        ;[bias, vBias] = spring(bias, vBias, dir, 0.12, 0.7, dt)
        ;[width, vWidth] = spring(width, vWidth, wTarget, 0.12, 0.69, dt)
        ;[squash, vSquash] = spring(squash, vSquash, 0, 0.16, 0.56, dt)
        if (Math.abs(pos - tTop) < 0.05 && Math.abs(vPos) < 0.02) { pos = tTop; vPos = 0 }
        if (Math.abs(vel) < 0.02) vel = 0
        if (vel === 0 && Math.abs(stretchS) < 0.05 && Math.abs(vStretch) < 0.02) { stretchS = 0; vStretch = 0 }
        if (Math.abs(width - wTarget) < 0.02 && Math.abs(vWidth) < 0.01) { width = wTarget; vWidth = 0 }
        if (Math.abs(squash) < 0.002 && Math.abs(vSquash) < 0.002) { squash = vSquash = 0 }
      }
      // the tail trails behind the direction of travel
      top = pos - Math.max(0, stretchS) * Math.max(0, bias)
      bottom = pos + g.h + Math.max(0, stretchS) * Math.max(0, -bias)
      const stretch = Math.max(0, bottom - top - g.h)
      const w = width * (1 + squash * 2.2)
      const r = w / 2
      // the trailing end thins as the drop stretches; the leading one stays round and full
      const thin = Math.max(0.3, 1 - stretch / 80)
      const rTop = r * (1 - (1 - thin) * Math.max(0, bias))
      const rBottom = r * (1 - (1 - thin) * Math.max(0, -bias))
      const neck = Math.max(Math.min(rTop, rBottom) * 0.5, r * (1 - stretch / 110))
      const right = 5 - (width - 4) / 6
      const cx = RAIL_W - right - r
      // a squash also shortens the drop against the edge it hit
      const sq = squash * g.h * 0.35
      const pTop = y <= 0 ? top : top + sq
      const pBottom = y >= g.max - 1 ? bottom : bottom - sq
      body.setAttribute('d', dropPath(cx, pTop, pBottom, Math.min(rTop, (pBottom - pTop) / 2), Math.min(rBottom, (pBottom - pTop) / 2), neck))

      // a long, fast stretch lets a droplet fall off the tail; it lags behind and runs back in
      const tailY = dir > 0 ? pTop + rTop : pBottom - rBottom
      if (!still && !drag && !dropAlive && stretch > 110 && dir !== 0) {
        dropAlive = true; dropAge = 0; dropY = tailY - dir * 6; vDrop = vPos * 0.4
      }
      if (dropAlive) {
        dropAge += dt
        ;[dropY, vDrop] = spring(dropY, vDrop, tailY, 0.035, 0.3, dt)
        // it is absorbed as soon as it reaches the tail; it never travels on inside the drop
        const merged = dropAge > 8 && (dir >= 0 ? dropY >= tailY - 0.5 : dropY <= tailY + 0.5)
        if (merged || dropAge > 150) dropAlive = false
        const dr = dropAlive ? r * 0.62 * Math.min(1, dropAge / 6) : 0
        drip.setAttribute('cx', cx.toFixed(2))
        drip.setAttribute('cy', dropY.toFixed(2))
        drip.setAttribute('r', dr.toFixed(2))
      } else drip.setAttribute('r', '0')

      // the invisible hit area covers the drop for dragging
      thumb.style.height = `${Math.max(16, pBottom - pTop)}px`
      thumb.style.transform = `translateY(${pTop}px)`

      const here = sectionAt(y)
      for (const x of heads) x.mark.classList.toggle(s.here, x === here)
      // entering a new section rings its dot once
      if (here && here.mark !== lastHere) { if (lastHere && !still) { here.mark.classList.remove(s.ping); void here.mark.offsetWidth; here.mark.classList.add(s.ping) } lastHere = here.mark }

      const moving = top !== tTop || bottom !== tBottom || width !== wTarget || squash !== 0 || vSquash !== 0 || dropAlive
      if (moving) raf = requestAnimationFrame(paint)
      else { last = 0; dir = 0; bias = vBias = 0 }
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
      svg.setAttribute('width', String(RAIL_W))
      svg.setAttribute('height', String(sb.clientHeight))
      svg.setAttribute('viewBox', `0 0 ${RAIL_W} ${sb.clientHeight}`)
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
      idle = window.setTimeout(() => { sb.classList.remove(s.on); kick() }, 1100)
      kick()
    }
    const onResize = () => { cancelAnimationFrame(debounce); debounce = requestAnimationFrame(measure) }
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onResize)
    const ro = new ResizeObserver(onResize)
    ro.observe(document.body)

    sb.addEventListener('pointerenter', () => { hover = true; kick() })
    sb.addEventListener('pointerleave', () => { hover = false; kick(); if (!drag) showTip(undefined, 0) })
    thumb.addEventListener('pointerdown', (e) => {
      e.preventDefault()
      thumb.setPointerCapture(e.pointerId)
      drag = { y: e.clientY, top: scrollY }
      sb.classList.add(s.drag)
      kick()
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
    marksBox.addEventListener('animationend', (e) => (e.target as HTMLElement).classList.remove(s.ping))
    thumb.addEventListener('pointercancel', endDrag)
    sb.addEventListener('pointermove', (e) => {
      if (drag) return
      const mark = (e.target as HTMLElement).closest(`.${s.mark}`)
      const hit = mark && heads.find((x) => x.mark === mark)
      showTip(hit ? label(hit.el) : where(e.target === thumb ? scrollY : yAt(e.clientY)), e.clientY)
    })
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
