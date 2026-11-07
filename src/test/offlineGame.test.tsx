import { afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { CITIES, EDGES, GOALS, NEIGHBOURS, START, distance, search } from '@/domain/routeGame'
import { ErrorBoundary, isOfflineLoadError } from '@/components/ErrorBoundary'
import { formatThousands, OfflineScreen } from '@/components/offline/OfflineGame'
import { useAppStore } from '@/store/useAppStore'

const idOf = (en: string) => CITIES.findIndex((c) => c.key === en)

afterEach(() => {
  vi.restoreAllMocks()
  sessionStorage.clear()
})

describe('route puzzle', () => {
  it('uses real straight-line distances in thousands of km', () => {
    expect(distance(idOf('Astana'), idOf('Berlin'))).toBe(3.9)
    expect(distance(idOf('London'), idOf('Paris'))).toBe(0.3)
    expect(CITIES).toHaveLength(15)
    // every city can be reached from Astana
    for (const g of GOALS) expect(search(START, g).path[0]).toBe(START)
  })

  it('finds the shortest route, settling the nearest city first', () => {
    const goal = idOf('London')
    const { d, order, path } = search(START, goal)
    // order is by distance
    for (let k = 1; k < order.length; k++) expect(d[order[k]]).toBeGreaterThanOrEqual(d[order[k - 1]])
    // no direct flight is shorter than the found route
    const sum = path.slice(1).reduce((s, v, k) => s + NEIGHBOURS[path[k]].find(([u]) => u === v)![1], 0)
    expect(Math.round(sum * 10) / 10).toBe(d[goal])
    expect(EDGES.length).toBe(24)
  })
})

describe('distances on screen', () => {
  it('shows thousands of km with one decimal, the local way', () => {
    expect(formatThousands(3.9, 'ru')).toBe('3,9')
    expect(formatThousands(0.3, 'kk')).toBe('0,3')
    expect(formatThousands(12.4, 'en')).toBe('12.4')
  })
})

describe('offline screen', () => {
  it('recognises a page that could not load offline, not other crashes', () => {
    expect(isOfflineLoadError(new TypeError('Failed to fetch dynamically imported module: x.js'), false)).toBe(true)
    expect(isOfflineLoadError(new TypeError('Importing a module script failed.'), false)).toBe(true)
    expect(isOfflineLoadError(new Error('Unable to preload CSS for /assets/Settings.css'), false)).toBe(true)
    expect(isOfflineLoadError(new TypeError('Failed to fetch dynamically imported module: x.js'), true)).toBe(false)
    expect(isOfflineLoadError(new Error('Cannot read properties of undefined'), false)).toBe(false)
  })

  it('shows the puzzle instead of the crash text when a page cannot load offline', () => {
    useAppStore.setState({ locale: 'ru' })
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    vi.spyOn(console, 'error').mockImplementation(() => {})
    const Broken = () => {
      throw new TypeError('Failed to fetch dynamically imported module: Settings.js')
    }
    render(
      <ErrorBoundary inline>
        <Broken />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('heading', { name: 'Нет соединения' })).toBeInTheDocument()
    expect(screen.queryByText('Что-то пошло не так')).toBeNull()
    expect(screen.getByRole('group', { name: 'Карта городов' })).toBeInTheDocument()
  })

  it('plays with the keyboard and keeps the game when retrying offline', () => {
    vi.useFakeTimers()
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
    vi.spyOn(Math, 'random').mockReturnValue(0.4) // a fixed goal
    render(<OfflineScreen locale="ru" />)
    const berlin = screen.getByRole('button', { name: /^Берлин, можно лететь/ })
    fireEvent.keyDown(berlin, { key: 'Enter' })
    expect(screen.getByRole('button', { name: /^Берлин, вы здесь/ })).toBeInTheDocument()
    expect(screen.getByText(/Ваш путь: 3,9 тыс\. км/)).toBeInTheDocument()
    // a city without a direct flight cannot be picked
    fireEvent.click(screen.getByRole('button', { name: /^Сидней/ }))
    expect(screen.getByText(/Ваш путь: 3,9 тыс\. км/)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Открыть страницу снова' }))
    expect(screen.getByRole('button', { name: 'Интернета пока нет' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^Берлин, вы здесь/ })).toBeInTheDocument()
    act(() => {
      vi.advanceTimersByTime(2100)
    })
    expect(screen.getByRole('button', { name: 'Открыть страницу снова' })).toBeInTheDocument()
    vi.useRealTimers()
  })

  it('speaks Kazakh and English', () => {
    const { unmount } = render(<OfflineScreen locale="kk" />)
    expect(screen.getByRole('heading', { name: 'Байланыс жоқ' })).toBeInTheDocument()
    unmount()
    render(<OfflineScreen locale="en" />)
    expect(screen.getByRole('heading', { name: 'No connection' })).toBeInTheDocument()
  })
})
