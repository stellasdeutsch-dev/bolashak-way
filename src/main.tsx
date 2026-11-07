import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import '@fontsource-variable/inter/wght.css'
import './styles/base.css'
import { registerSW } from 'virtual:pwa-register'
import { useUpdate } from './components/update'

// The site works offline, so a returning visitor first sees the cached copy. When a new
// version is published the page does not reload under the reader: the Layout offers
// "a new version is available – update" and switches only on that click. An open tab
// also checks for updates every hour.
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    useUpdate.setState({ apply: () => void updateSW(true) })
  },
  onRegisteredSW(_url, registration) {
    if (registration) setInterval(() => void registration.update(), 60 * 60 * 1000)
  },
})

// For whoever opens the developer tools: the logo's ornament from the top of the page source, drawn
// in the console in the app's accent colour. No words. The Bolashak site does the same.
const ornament = [...document.childNodes].find((n) => n.nodeType === Node.COMMENT_NODE)?.textContent?.replace(/^\n+|\s+$/g, '')
if (ornament && !import.meta.env.TEST) console.log(`%c${ornament}`, 'font:12px/1 ui-monospace,Menlo,monospace;color:#2a6ef0')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
