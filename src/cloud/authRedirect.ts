import type { SupabaseClient } from '@supabase/supabase-js'

export type AuthCallback =
  | { kind: 'code'; code: string }
  | { kind: 'error'; error: string; description: string }
  | null

/**
 * Reads what Supabase appended to the URL after a magic link, confirmation mail or
 * password reset. Returns null on every ordinary page load, so nothing else pays for it.
 */
export function parseAuthCallback(href: string): AuthCallback {
  let u: URL
  try {
    u = new URL(href)
  } catch {
    return null
  }
  const q = u.searchParams
  const code = q.get('code')
  if (code) return { kind: 'code', code }
  const error = q.get('error') ?? q.get('error_code')
  if (error) return { kind: 'error', error, description: q.get('error_description') ?? '' }
  return null
}

/** The same URL with the auth parameters removed and the hash route kept intact. */
export function stripAuthParams(href: string): string {
  const u = new URL(href)
  for (const k of ['code', 'error', 'error_code', 'error_description', 'type']) u.searchParams.delete(k)
  const query = u.searchParams.toString()
  return `${u.origin}${u.pathname}${query ? `?${query}` : ''}${u.hash}`
}

/**
 * Exchanges the PKCE code for a session before the router mounts, then rewrites the
 * URL so a reload does not try to exchange the same code again.
 */
export async function handleAuthRedirect(
  client: SupabaseClient,
  href: string = location.href,
): Promise<{ result: 'exchanged' | 'error' | 'none'; message?: string }> {
  const cb = parseAuthCallback(href)
  if (!cb) return { result: 'none' }
  const clean = stripAuthParams(href)
  if (cb.kind === 'error') {
    history.replaceState(null, '', clean)
    return { result: 'error', message: cb.description || cb.error }
  }
  const { error } = await client.auth.exchangeCodeForSession(cb.code)
  history.replaceState(null, '', clean)
  if (error) return { result: 'error', message: error.message }
  return { result: 'exchanged' }
}
