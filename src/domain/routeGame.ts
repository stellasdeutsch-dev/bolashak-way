/**
 * The shortest-route puzzle shown when a page cannot load offline, ported from the
 * Bolashak site's offline page. Fifteen cities where Bolashak scholars study; distances
 * are real straight lines between their coordinates, in thousands of kilometres.
 */

export type Side = 't' | 'b' | 'l' | 'r' | 'br'

export interface City {
  /** Names: ru, kk, en. */
  name: { ru: string; kk: string; en: string }
  key: string
  lat: number
  lon: number
  /** Wide map, 920 × 490: x, y and where the name sits. */
  wide: [number, number, Side]
  /** Upright phone map, 410 × 550. */
  tall: [number, number, Side]
}

const c = (ru: string, kk: string, en: string, lat: number, lon: number, wide: City['wide'], tall: City['tall']): City => ({
  name: { ru, kk, en },
  key: en,
  lat,
  lon,
  wide,
  tall,
})

export const CITIES: City[] = [
  c('Астана', 'Астана', 'Astana', 51.17, 71.45, [600, 110, 't'], [305, 272, 'r']),
  c('Торонто', 'Торонто', 'Toronto', 43.65, -79.38, [85, 130, 'l'], [40, 62, 't']),
  c('Бостон', 'Бостон', 'Boston', 42.36, -71.06, [190, 205, 'r'], [75, 148, 'b']),
  c('Нью-Йорк', 'Нью-Йорк', 'New York', 40.71, -74.01, [85, 295, 'b'], [40, 228, 'b']),
  c('Эдинбург', 'Эдинбург', 'Edinburgh', 55.95, -3.19, [300, 60, 'r'], [190, 36, 'r']),
  c('Лондон', 'Лондон', 'London', 51.51, -0.13, [315, 170, 'br'], [190, 112, 't']),
  c('Париж', 'Париж', 'Paris', 48.86, 2.35, [290, 305, 'b'], [130, 210, 'b']),
  c('Цюрих', 'Цюрих', 'Zurich', 47.37, 8.54, [430, 335, 'b'], [215, 214, 'b']),
  c('Берлин', 'Берлин', 'Berlin', 52.52, 13.4, [455, 150, 't'], [305, 132, 't']),
  c('Пекин', 'Бейжің', 'Beijing', 39.9, 116.41, [720, 205, 'l'], [250, 362, 'l']),
  c('Сеул', 'Сеул', 'Seoul', 37.57, 126.98, [800, 90, 't'], [355, 322, 'r']),
  c('Токио', 'Токио', 'Tokyo', 35.68, 139.69, [840, 235, 'r'], [330, 410, 'r']),
  c('Сингапур', 'Сингапур', 'Singapore', 1.35, 103.82, [680, 380, 'l'], [130, 420, 'l']),
  c('Сидней', 'Сидней', 'Sydney', -33.87, 151.21, [840, 405, 'r'], [320, 500, 'r']),
  c('Мельбурн', 'Мельбурн', 'Melbourne', -37.81, 144.96, [750, 455, 'l'], [200, 527, 'l']),
]

const ID = Object.fromEntries(CITIES.map((city, i) => [city.key, i])) as Record<string, number>

/** Direct flights. */
export const EDGES: [number, number][] = (
  [
    ['Toronto', 'Boston'], ['Boston', 'New York'], ['Toronto', 'New York'], ['Edinburgh', 'Toronto'], ['London', 'Boston'], ['Paris', 'New York'],
    ['Edinburgh', 'London'], ['London', 'Paris'], ['London', 'Berlin'], ['Paris', 'Zurich'], ['Zurich', 'Berlin'], ['Berlin', 'Astana'], ['Zurich', 'Astana'],
    ['Astana', 'Beijing'], ['Astana', 'Seoul'], ['Astana', 'Singapore'], ['Beijing', 'Seoul'], ['Seoul', 'Tokyo'], ['Beijing', 'Tokyo'], ['Beijing', 'Singapore'],
    ['Singapore', 'Sydney'], ['Singapore', 'Melbourne'], ['Tokyo', 'Sydney'], ['Sydney', 'Melbourne'],
  ] as const
).map(([a, b]) => [ID[a], ID[b]])

export const START = ID.Astana
export const GOALS = ['Toronto', 'Boston', 'New York', 'Edinburgh', 'London', 'Paris', 'Zurich', 'Tokyo', 'Sydney', 'Melbourne'].map((n) => ID[n])

const rad = (d: number) => (d * Math.PI) / 180

/** Great-circle distance in thousands of km, to one decimal. */
export function distance(a: number, b: number): number {
  const p = CITIES[a]
  const q = CITIES[b]
  const h = Math.sin(rad(q.lat - p.lat) / 2) ** 2 + Math.cos(rad(p.lat)) * Math.cos(rad(q.lat)) * Math.sin(rad(q.lon - p.lon) / 2) ** 2
  return Math.round((2 * 6371 * Math.asin(Math.sqrt(h))) / 100) / 10
}

export const WEIGHTS = EDGES.map(([a, b]) => distance(a, b))

/** Neighbours of each city: [city, distance, edge index]. */
export const NEIGHBOURS: [number, number, number][][] = CITIES.map(() => [])
EDGES.forEach(([a, b], k) => {
  NEIGHBOURS[a].push([b, WEIGHTS[k], k])
  NEIGHBOURS[b].push([a, WEIGHTS[k], k])
})

export const hop = (from: number, to: number) => NEIGHBOURS[from].find(([v]) => v === to)?.[1] ?? null

/**
 * Uniform-cost search from `start`: the shortest distance to every city it settles, the
 * order in which it settles them (the step-by-step explanation shows that order) and the
 * best path to `goal`.
 */
export function search(start: number, goal: number) {
  const d = CITIES.map(() => Infinity)
  const prev = CITIES.map(() => -1)
  const done = CITIES.map(() => false)
  const order: number[] = []
  d[start] = 0
  for (;;) {
    let u = -1
    d.forEach((v, i) => {
      if (!done[i] && v < Infinity && (u < 0 || v < d[u])) u = i
    })
    if (u < 0) break
    done[u] = true
    order.push(u)
    if (u === goal) break
    for (const [v, w] of NEIGHBOURS[u]) {
      if (d[u] + w < d[v] - 1e-9) {
        d[v] = Math.round((d[u] + w) * 10) / 10
        prev[v] = u
      }
    }
  }
  const path: number[] = []
  for (let v = goal; v >= 0; v = prev[v]) path.unshift(v)
  return { d, prev, order, path }
}

/** A flight drawn as a gentle arc bowing upward, like a route on an airline map. */
export function arc([x1, y1]: [number, number], [x2, y2]: [number, number]) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  let nx = -dy / len
  let ny = dx / len
  if (ny > 0) {
    nx = -nx
    ny = -ny
  }
  const bow = Math.min(46, len * 0.16)
  const cx = (x1 + x2) / 2 + nx * bow
  const cy = (y1 + y2) / 2 + ny * bow
  return { d: `M${x1} ${y1}Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`, mx: (x1 + 2 * cx + x2) / 4, my: (y1 + 2 * cy + y2) / 4 }
}
