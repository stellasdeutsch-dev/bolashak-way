import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { AUTH_STORAGE_KEY } from './config'

const url = import.meta.env.VITE_SUPABASE_URL ?? ''
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''

/**
 * False when the build carries no project credentials. Every cloud component checks
 * this and renders nothing, so a keyless build is exactly the classic local-only app.
 */
export const cloudEnabled = url.length > 0 && anonKey.length > 0

let client: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!cloudEnabled) return null
  if (!client) {
    client = createClient(url, anonKey, {
      auth: {
        // PKCE puts the callback code in the query string. The default implicit flow
        // puts tokens in the URL fragment, which is exactly where HashRouter keeps
        // the route — the two would trample each other.
        flowType: 'pkce',
        detectSessionInUrl: false,
        persistSession: true,
        autoRefreshToken: true,
        storageKey: AUTH_STORAGE_KEY,
      },
    })
    if (import.meta.env.DEV) {
      // For the RLS checks in the README: `await __sb.from('progress').select('*')`.
      ;(window as unknown as { __sb: SupabaseClient }).__sb = client
    }
  }
  return client
}
