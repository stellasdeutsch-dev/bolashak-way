import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import '@fontsource-variable/inter/wght.css'
import './styles/base.css'
import { registerSW } from 'virtual:pwa-register'

// The site works offline, so a returning visitor first sees the cached copy. When a new
// version is published the page switches to it by itself — except while the reader is
// answering the onboarding questions, whose answers live only in memory: then it waits
// for the next page change. An open tab also checks for updates every hour.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    const busy = () => /\/start(\?|$)/.test(location.hash)
    if (!busy()) return void updateSW(true)
    const onLeave = () => {
      if (busy()) return
      window.removeEventListener('hashchange', onLeave)
      void updateSW(true)
    }
    window.addEventListener('hashchange', onLeave)
  },
  onRegisteredSW(_url, registration) {
    if (registration) setInterval(() => void registration.update(), 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
