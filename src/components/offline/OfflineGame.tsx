import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import type { Locale } from '@/content/types'
import { arc, CITIES, EDGES, GOALS, hop, NEIGHBOURS, search, START, WEIGHTS, type Side } from '@/domain/routeGame'
import s from './OfflineGame.module.css'

/**
 * Shown when a page cannot load because there is no connection. It lives in the main
 * bundle (precached by the service worker), so it is there exactly when nothing else
 * can be fetched. Its own strings: it must not depend on anything that failed to load.
 */
const TEXT = {
  ru: {
    title: 'Нет соединения',
    lead: 'Страница откроется сама, когда интернет вернётся.',
    hours: 'Пн–пт 8:30–18:00, обед 13:00–14:30',
    retry: 'Открыть страницу снова',
    still: 'Интернета пока нет',
    hint: 'Пока ждёте: долетите из Астаны в жёлтый город самым коротким путём. Нажимайте города, соединённые линией. Числа на линиях – тысячи километров.',
    yours: 'Ваш путь',
    unit: 'тыс. км',
    best: 'Это самый короткий путь.',
    longer: 'Есть путь короче',
    how: 'Как ищет компьютер',
    explain:
      'Компьютер не угадывает. Он идёт от Астаны во все стороны и всегда сначала проверяет ближайший город. Число у города – самый короткий путь до него. Когда очередь доходит до цели, ответ готов. Так ищут дорогу навигаторы.',
    again: 'Начать заново',
    skip: 'Другой маршрут',
    score: 'Самых коротких путей',
    map: 'Карта городов',
    stHere: 'вы здесь',
    stGoal: 'цель',
    stCan: 'можно лететь',
    stOn: 'на вашем маршруте',
    stNo: 'нет прямого перелёта',
  },
  kk: {
    title: 'Байланыс жоқ',
    lead: 'Интернет қайта қосылғанда бет өзі ашылады.',
    hours: 'Дс–жм 8:30–18:00, түскі ас 13:00–14:30',
    retry: 'Бетті қайта ашу',
    still: 'Интернет әлі жоқ',
    hint: 'Күте тұрып: Астанадан сары қалаға ең қысқа жолмен ұшып жетіңіз. Сызықпен жалғанған қалаларды басыңыз. Сызықтағы сандар – мың шақырым.',
    yours: 'Сіздің жолыңыз',
    unit: 'мың км',
    best: 'Бұл ең қысқа жол.',
    longer: 'Бұдан қысқа жол бар',
    how: 'Компьютер қалай іздейді',
    explain:
      'Компьютер болжамайды. Ол Астанадан барлық бағытқа тарайды және әрқашан алдымен ең жақын қаланы тексереді. Қала жанындағы сан – оған дейінгі ең қысқа жол. Кезек мақсатқа жеткенде жауап дайын. Навигаторлар жолды осылай іздейді.',
    again: 'Қайта бастау',
    skip: 'Басқа бағыт',
    score: 'Ең қысқа жолдар',
    map: 'Қалалар картасы',
    stHere: 'сіз осындасыз',
    stGoal: 'мақсат',
    stCan: 'ұшуға болады',
    stOn: 'маршрутыңызда',
    stNo: 'тікелей рейс жоқ',
  },
  en: {
    title: 'No connection',
    lead: 'The page will open by itself once you are back online.',
    hours: 'Mon–Fri 8:30–18:00, lunch 13:00–14:30',
    retry: 'Open the page again',
    still: 'Still no internet',
    hint: 'While you wait: fly from Astana to the yellow city by the shortest route. Tap cities joined by a line. Numbers on the lines are thousands of kilometres.',
    yours: 'Your route',
    unit: 'thousand km',
    best: 'That is the shortest route.',
    longer: 'There is a shorter route',
    how: 'How a computer searches',
    explain:
      'A computer does not guess. It spreads out from Astana in every direction and always checks the nearest city first. The number by each city is the shortest way to it. Once the goal comes up, the answer is ready. Navigation apps find routes this way.',
    again: 'Start over',
    skip: 'Another route',
    score: 'Shortest routes found',
    map: 'Map of cities',
    stHere: 'you are here',
    stGoal: 'destination',
    stCan: 'you can fly here',
    stOn: 'on your route',
    stNo: 'no direct flight',
  },
} satisfies Record<Locale, Record<string, string>>

const WINS_KEY = 'bolashak-way:shortest-routes'
const PIN = 'M0 0C-6 -8 -9 -13 -9 -18A9 9 0 1 1 9 -18C9 -13 6 -8 0 0Z'
const PLANE = 'M0 -9L2 -2L9 2V4L2 2.5L1.5 7L3.5 8.6V9.8L0 8.8L-3.5 9.8V8.6L-1.5 7L-2 2.5L-9 4V2L-2 -2Z'
const LABEL: Record<Side, [number, number, 'middle' | 'end' | 'start']> = {
  t: [0, -15, 'middle'],
  b: [0, 24, 'middle'],
  l: [-14, 5, 'end'],
  r: [14, 5, 'start'],
  br: [11, 21, 'start'],
}
/** Search tags sit on the side opposite the city's name. */
const TAG: Record<Side, [number, number]> = { t: [0, 22], b: [0, -22], l: [30, 0], r: [-30, 0], br: [-30, 0] }

export const formatThousands = (v: number, locale: Locale) => (locale === 'en' ? v.toFixed(1) : v.toFixed(1).replace('.', ','))

const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

function readWins(): number {
  try {
    return Number(sessionStorage.getItem(WINS_KEY)) || 0
  } catch {
    return 0
  }
}

function usePhone() {
  const query = '(max-width: 600px)'
  const [phone, setPhone] = useState(() => typeof matchMedia === 'function' && matchMedia(query).matches)
  useEffect(() => {
    if (typeof matchMedia !== 'function') return
    const mq = matchMedia(query)
    const on = () => setPhone(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return phone
}

const randomGoal = (except: number) => {
  const pool = GOALS.filter((g) => g !== except)
  return pool[Math.floor(Math.random() * pool.length)]
}

export function OfflineScreen({ locale }: { locale: Locale }) {
  const T = TEXT[locale] ?? TEXT.ru
  const [retryText, setRetryText] = useState(T.retry)

  // Back online: the page the reader wanted can load now.
  useEffect(() => {
    const back = () => location.reload()
    window.addEventListener('online', back)
    return () => window.removeEventListener('online', back)
  }, [])

  // Without a connection a reload would only lose the game, so say so instead.
  const retry = () => {
    if (navigator.onLine) return location.reload()
    setRetryText(T.still)
    setTimeout(() => setRetryText(T.retry), 2000)
  }

  return (
    <div className={s.screen} lang={locale}>
      <section className={`${s.head} on-dark`}>
        <h1 className={s.title}>{T.title}</h1>
        <p className={s.lead}>{T.lead}</p>
        <button type="button" className={s.retry} onClick={retry} aria-live="polite">
          {retryText}
        </button>
      </section>
      <RouteGame locale={locale} />
      <p className={s.call}>
        <a href="tel:+77172769076">+7 (717) 276-90-76</a> · {T.hours}
      </p>
    </div>
  )
}

export function RouteGame({ locale }: { locale: Locale }) {
  const T = TEXT[locale] ?? TEXT.ru
  const phone = usePhone()
  // Thousands of km to one decimal: «3,9», «3.9» in English.
  const fmt = useCallback((v: number) => formatThousands(v, locale), [locale])
  const name = (i: number) => CITIES[i].name[locale] ?? CITIES[i].name.ru

  const [goal, setGoal] = useState(() => randomGoal(-1))
  const [path, setPath] = useState<number[]>([START])
  const [finished, setFinished] = useState(false)
  const [wins, setWins] = useState(readWins)
  /** How many steps of the search are shown; -1 while the explanation is closed. */
  const [shown, setShown] = useState(-1)

  const here = path[path.length - 1]
  const dist = useMemo(() => Math.round(path.slice(1).reduce((sum, v, k) => sum + (hop(path[k], v) ?? 0), 0) * 10) / 10, [path])
  const best = useMemo(() => search(START, goal), [goal])
  const can = finished ? [] : NEIGHBOURS[here].map(([v]) => v)

  const at = (i: number) => (phone ? CITIES[i].tall : CITIES[i].wide)
  const xy = (i: number): [number, number] => [at(i)[0], at(i)[1]]

  const cityRefs = useRef<(SVGGElement | null)[]>([])
  const legRefs = useRef<(SVGPathElement | null)[]>([])
  const planeRef = useRef<SVGGElement>(null)
  const explainRef = useRef<HTMLParagraphElement>(null)
  // The button turns into the explanation: focus follows, instead of falling to the page.
  useEffect(() => {
    if (shown === 0) explainRef.current?.focus()
  }, [shown])
  const flown = useRef(1)

  // A small plane flies along each new leg (skipped with reduced motion).
  useEffect(() => {
    const grew = path.length > flown.current
    flown.current = path.length
    const leg = legRefs.current[path.length - 2]
    const plane = planeRef.current
    if (!grew || !leg || !plane || reducedMotion() || typeof leg.getTotalLength !== 'function') return
    const total = leg.getTotalLength()
    const t0 = performance.now()
    let id = 0
    plane.style.display = ''
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / 600)
      const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2
      const p = leg.getPointAtLength(e * total)
      const q = leg.getPointAtLength(Math.min(total, e * total + 1))
      const ang = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + 90
      plane.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(1)})`)
      if (k < 1) id = requestAnimationFrame(step)
      else plane.style.display = 'none'
    }
    id = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(id)
      plane.style.display = 'none'
    }
  }, [path])

  // The explanation shows the search settling city after city.
  useEffect(() => {
    if (shown < 0 || shown >= best.order.length) return
    if (reducedMotion()) return setShown(best.order.length)
    const id = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 0 : 550)
    return () => clearTimeout(id)
  }, [shown, best.order.length])

  const restart = () => {
    flown.current = 1
    setPath([START])
    setFinished(false)
    setShown(-1)
  }
  const fresh = () => {
    setGoal((g) => randomGoal(g))
    restart()
  }

  const pick = (i: number) => {
    if (finished) return
    const back = path.indexOf(i)
    if (back >= 0) {
      // a city already on the route: go back to it
      if (back < path.length - 1) {
        flown.current = back + 1
        setPath(path.slice(0, back + 1))
      }
      return
    }
    const w = hop(here, i)
    if (w === null) {
      if (!reducedMotion()) cityRefs.current[i]?.animate?.([{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(0)' }], 300)
      return
    }
    const next = [...path, i]
    setPath(next)
    if (i === goal) {
      setFinished(true)
      const total = Math.round((dist + w) * 10) / 10
      if (Math.abs(total - best.d[goal]) < 0.05) {
        const n = wins + 1
        setWins(n)
        try {
          sessionStorage.setItem(WINS_KEY, String(n))
        } catch {
          /* the count is only for this visit anyway */
        }
      }
    }
  }

  const onKey = (i: number) => (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      pick(i)
    }
  }

  const ok = finished && Math.abs(dist - best.d[goal]) < 0.05
  const explaining = shown >= 0
  const settled = explaining ? best.order.slice(0, shown) : []
  const searchDone = explaining && shown >= best.order.length

  const label = (i: number): { x: number; y: number; anchor: 'middle' | 'end' | 'start' } => {
    const [x, y, side] = at(i)
    // the goal's pin would cover a name above it, so that name moves aside
    if (i === goal && side === 't') {
      const left = x > (phone ? 300 : 700)
      return { x: x + (left ? -16 : 16), y: y + 5, anchor: left ? 'end' : 'start' }
    }
    const [dx, dy, anchor] = LABEL[side]
    return { x: x + dx, y: y + dy, anchor }
  }

  return (
    <section className={s.game} aria-labelledby="route-task">
      <h2 className={s.task} id="route-task">
        <span className={s.pill}>{name(START)}</span>
        <span aria-hidden="true" className={s.arrow}>
          →
        </span>
        <span className={`${s.pill} ${s.pillGoal}`}>{name(goal)}</span>
      </h2>
      <p className={s.hint}>{T.hint}</p>

      <div className={s.map}>
        <svg viewBox={phone ? '0 0 410 550' : '0 0 920 490'} role="group" aria-label={T.map} className={s.svg}>
          <defs>
            <pattern id="route-dots" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" className={s.dotGround} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#route-dots)" />

          <g>
            {EDGES.map(([a, b], k) => (
              <path key={k} className={[s.road, !finished && (a === here || b === here) ? s.roadCan : ''].join(' ')} d={arc(xy(a), xy(b)).d} />
            ))}
          </g>

          <g className={explaining ? s.dimmed : ''}>
            {path.slice(1).map((v, k) => (
              <path
                key={`${path[k]}-${v}-${k}`}
                ref={(node) => {
                  legRefs.current[k] = node
                }}
                className={s.mine}
                d={arc(xy(path[k]), xy(v)).d}
                pathLength={1}
              />
            ))}
          </g>
          <g>
            {settled.map((u) => (best.prev[u] >= 0 ? <path key={u} className={s.seen} d={arc(xy(best.prev[u]), xy(u)).d} /> : null))}
            {searchDone && best.path.slice(1).map((v, k) => <path key={v} className={s.best} d={arc(xy(best.path[k]), xy(v)).d} pathLength={1} />)}
          </g>

          <g aria-hidden="true">
            {EDGES.map(([a, b], k) => {
              const r = arc(xy(a), xy(b))
              return (
                <text key={k} className={[s.km, !finished && (a === here || b === here) ? s.kmCan : ''].join(' ')} x={r.mx.toFixed(1)} y={(r.my + 4).toFixed(1)}>
                  {fmt(WEIGHTS[k])}
                </text>
              )
            })}
          </g>

          <g>
            {CITIES.map((_, i) => {
              const [x, y] = xy(i)
              const l = label(i)
              const isHere = i === here
              const on = path.includes(i)
              const status = [isHere ? T.stHere : on ? T.stOn : '', i === goal ? T.stGoal : '', can.includes(i) ? T.stCan : !isHere && !finished ? T.stNo : ''].filter(Boolean)
              return (
                <g
                  key={i}
                  ref={(node) => {
                    cityRefs.current[i] = node
                  }}
                  className={[s.city, on ? s.on : '', isHere ? s.here : '', can.includes(i) ? s.can : '', i === goal || isHere ? s.strong : ''].join(' ')}
                  role="button"
                  tabIndex={0}
                  aria-label={[name(i), ...status].join(', ')}
                  aria-disabled={!can.includes(i)}
                  aria-current={isHere ? 'location' : undefined}
                  onClick={() => pick(i)}
                  onKeyDown={onKey(i)}
                >
                  <circle className={s.hit} cx={x} cy={y} r={22} />
                  <circle className={s.halo} cx={x} cy={y} r={15} />
                  <circle className={s.ring} cx={x} cy={y} r={11} />
                  <circle className={s.dot} cx={x} cy={y} r={6} />
                  <text x={l.x} y={l.y} textAnchor={l.anchor}>
                    {name(i)}
                  </text>
                </g>
              )
            })}
            <g className={s.pin} transform={`translate(${xy(goal)[0]} ${xy(goal)[1] - 5})`} aria-hidden="true">
              <path d={PIN} />
              <circle cy={-18} r={3.2} />
            </g>
          </g>

          <g aria-hidden="true">
            {settled.map((u) => {
              const [x0, y0, side] = at(u)
              const [ox, oy] = TAG[side]
              // the tag is as wide as its number
              const tw = 10 + fmt(best.d[u]).length * 6.4
              return (
                <g key={u} className={s.tag}>
                  <rect x={x0 + ox - tw / 2} y={y0 + oy - 9} width={tw} height={18} rx={9} />
                  <text x={x0 + ox} y={y0 + oy + 4}>
                    {fmt(best.d[u])}
                  </text>
                </g>
              )
            })}
          </g>
          <g ref={planeRef} className={s.plane} style={{ display: 'none' }} aria-hidden="true">
            <path d={PLANE} />
          </g>
        </svg>
      </div>

      {/* the route so far as a chain: city · distance · city … */}
      <p className={s.trip} aria-live="polite">
        {path.map((v, k) => (
          <span key={`${v}-${k}`} className={s.tripStep}>
            {k > 0 && <span className={s.leg}>{fmt(hop(path[k - 1], v) ?? 0)}</span>}
            <span className={[s.stop, v === goal ? s.stopGoal : ''].join(' ')}>{name(v)}</span>
          </span>
        ))}
        <span className={s.sum}>
          {T.yours}: {fmt(dist)} {T.unit}
        </span>
      </p>

      <div className={s.result} aria-live="polite" hidden={!finished}>
        {finished && (
          <>
            <p className={s.verdict}>{ok ? T.best : `${T.longer}: ${fmt(best.d[goal])} ${T.unit}`}</p>
            {explaining ? (
              <p className={s.explain} ref={explainRef} tabIndex={-1}>
                {T.explain}
              </p>
            ) : (
              <button type="button" className={s.ghost} onClick={() => setShown(0)}>
                {T.how}
              </button>
            )}
          </>
        )}
      </div>

      <div className={s.row}>
        <span className={s.score}>
          {T.score}: {wins}
        </span>
        <span className={s.btns}>
          <button type="button" className={s.ghost} onClick={restart}>
            {T.again}
          </button>
          <button type="button" className={s.ghost} onClick={fresh}>
            {T.skip}
          </button>
        </span>
      </div>
    </section>
  )
}
