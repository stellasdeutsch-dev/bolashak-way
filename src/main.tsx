import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/base.css'
import { cloudEnabled, getSupabase } from '@/cloud/supabase'
import { handleAuthRedirect } from '@/cloud/authRedirect'
import { initAuth } from '@/cloud/useAuth'
import { startSync } from '@/cloud/sync'
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

async function boot() {
  const client = cloudEnabled ? getSupabase() : null
  if (client) {
    // A magic link or confirmation mail lands here with ?code=…; trade it for a session
    // before the router mounts, so HashRouter never sees the query string.
    await handleAuthRedirect(client)
    startSync(client, initAuth(client))
  }
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

void boot()
