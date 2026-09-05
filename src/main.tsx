import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/base.css'
import { cloudEnabled, getSupabase } from '@/cloud/supabase'
import { handleAuthRedirect } from '@/cloud/authRedirect'
import { initAuth } from '@/cloud/useAuth'
import { startSync } from '@/cloud/sync'

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
