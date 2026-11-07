import { Component, type ErrorInfo, type ReactNode } from 'react'
import type { Locale } from '@/content/types'
import { useAppStore } from '@/store/useAppStore'
import { OfflineScreen } from './offline/OfflineGame'

const STORE_KEY = 'bolashak-way'

/** Plain-language text in all three languages: a crash may come from the i18n layer itself. */
const TEXT = [
  { lang: 'ru', title: 'Что-то пошло не так', body: 'Обновите страницу. Если не поможет – сбросьте сохранённые данные: анкету придётся пройти заново.', reload: 'Обновить', reset: 'Сбросить данные' },
  { lang: 'kk', title: 'Бірдеңе дұрыс болмады', body: 'Бетті жаңартыңыз. Көмектеспесе – сақталған деректерді тазалаңыз: сауалнаманы қайта толтыру керек болады.', reload: 'Жаңарту', reset: 'Деректерді тазалау' },
  { lang: 'en', title: 'Something went wrong', body: 'Reload the page. If that does not help, reset the saved data – you will answer the questions again.', reload: 'Reload', reset: 'Reset data' },
]

function pickText() {
  try {
    const raw = localStorage.getItem(STORE_KEY)
    const locale = raw ? (JSON.parse(raw) as { state?: { locale?: string } }).state?.locale : undefined
    return TEXT.find((t) => t.lang === locale) ?? TEXT[0]
  } catch {
    return TEXT[0]
  }
}

/**
 * A page whose code could not be fetched because the device is offline. Browsers word
 * it differently: Chrome "Failed to fetch dynamically imported module", Safari
 * "Importing a module script failed", Firefox "error loading dynamically imported module";
 * Vite's own preloader "Unable to preload CSS for …".
 */
export function isOfflineLoadError(error: unknown, online = typeof navigator === 'undefined' ? true : navigator.onLine): boolean {
  const message = error instanceof Error ? `${error.name} ${error.message}` : String(error ?? '')
  return !online && /dynamically imported module|importing a module script failed|unable to preload|failed to fetch|loading (css )?chunk|networkerror/i.test(message)
}

/** The language on screen right now, even before anything was saved. */
function currentLocale(): Locale | null {
  try {
    const l = useAppStore.getState().locale
    return l === 'ru' || l === 'kk' || l === 'en' ? l : null
  } catch {
    return null
  }
}

interface Props {
  children: ReactNode
  /** Shown inside the page frame (header and tabs stay usable) rather than full-screen. */
  inline?: boolean
}

/**
 * Last line of defence: instead of a white screen, say what happened and offer a way
 * out that works even when the saved progress itself is what breaks the render.
 */
export class ErrorBoundary extends Component<Props, { failed: boolean; offline: boolean }> {
  state = { failed: false, offline: false }

  static getDerivedStateFromError(error: unknown) {
    return { failed: true, offline: isOfflineLoadError(error) }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // No connection is not a crash: the offline screen explains it and reloads when back.
    if (isOfflineLoadError(error)) return
    console.error('Bolashak Way crashed', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    const t = pickText()
    if (this.state.offline) return <OfflineScreen locale={currentLocale() ?? (t.lang as Locale)} />
    const reset = () => {
      try {
        localStorage.removeItem(STORE_KEY)
      } catch {
        /* storage blocked: a reload is all we can do */
      }
      location.hash = '#/'
      location.reload()
    }
    return (
      <div role="alert" style={{ maxWidth: 520, margin: this.props.inline ? '48px auto' : '15vh auto', padding: '0 20px', fontFamily: 'var(--font, system-ui)', color: 'var(--text, #111827)' }}>
        <h1 style={{ fontSize: 28, lineHeight: 1.2, margin: '0 0 12px' }}>{t.title}</h1>
        <p style={{ fontSize: 16, lineHeight: 1.55, margin: '0 0 24px', color: 'var(--text-2, #4b5565)' }}>{t.body}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => location.reload()} style={btn(true)}>{t.reload}</button>
          <button type="button" onClick={reset} style={btn(false)}>{t.reset}</button>
        </div>
      </div>
    )
  }
}

const btn = (primary: boolean) => ({
  minHeight: 48,
  padding: '0 22px',
  borderRadius: 999,
  border: primary ? 0 : '1px solid var(--line-strong, rgba(17,24,39,.16))',
  background: primary ? 'var(--accent-deep, #1f5fd6)' : 'var(--surface, #fff)',
  color: primary ? '#fff' : 'var(--text, #111827)',
  font: '600 16px/1 var(--font, system-ui)',
  cursor: 'pointer',
})
