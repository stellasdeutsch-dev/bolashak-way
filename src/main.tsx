import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/base.css'
import { registerSW } from 'virtual:pwa-register'

// The site works offline, so a returning visitor first sees the cached copy. When a new
// version is published, the worker takes over and the page reloads itself once — instead
// of showing yesterday's site until the next visit. An open tab also checks every hour.
registerSW({
  immediate: true,
  onRegisteredSW(_url, registration) {
    if (registration) setInterval(() => void registration.update(), 60 * 60 * 1000)
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
