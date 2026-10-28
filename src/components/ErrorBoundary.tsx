import { Component, type ErrorInfo, type ReactNode } from 'react'

import { STORE_KEY } from '@/cloud/config'

/** Plain-language text in all three languages: a crash may come from the i18n layer itself. */
const TEXT = [
  { lang: 'ru', title: 'Что-то пошло не так', body: 'Обновите страницу. Если не поможет — сбросьте сохранённые данные: анкету придётся пройти заново.', reload: 'Обновить', reset: 'Сбросить данные' },
  { lang: 'kk', title: 'Бірдеңе дұрыс болмады', body: 'Бетті жаңартыңыз. Көмектеспесе — сақталған деректерді тазалаңыз: сауалнаманы қайта толтыру керек болады.', reload: 'Жаңарту', reset: 'Деректерді тазалау' },
  { lang: 'en', title: 'Something went wrong', body: 'Reload the page. If that does not help, reset the saved data — you will answer the questions again.', reload: 'Reload', reset: 'Reset data' },
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

interface Props {
  children: ReactNode
  /** Shown inside the page frame (header and tabs stay usable) rather than full-screen. */
  inline?: boolean
}

/**
 * Last line of defence: instead of a white screen, say what happened and offer a way
 * out that works even when the saved progress itself is what breaks the render.
 */
export class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Bolashak Way crashed', error, info.componentStack)
  }

  render() {
    if (!this.state.failed) return this.props.children
    const t = pickText()
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
