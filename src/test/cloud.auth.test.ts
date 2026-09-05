import { describe, expect, it, vi } from 'vitest'
import { handleAuthRedirect, parseAuthCallback, stripAuthParams } from '@/cloud/authRedirect'
import { createAuthStore, type AuthClient } from '@/cloud/useAuth'
import { useAppStore } from '@/store/useAppStore'

const BASE = 'https://stellasdeutsch-dev.github.io/bolashak-way/cloud/'

describe('auth callback parsing', () => {
  it('ignores ordinary loads, hash routes and unrelated queries', () => {
    expect(parseAuthCallback(BASE)).toBeNull()
    expect(parseAuthCallback(`${BASE}#/settings`)).toBeNull()
    expect(parseAuthCallback(`${BASE}?x=1#/`)).toBeNull()
    expect(parseAuthCallback('not a url')).toBeNull()
  })

  it('extracts the PKCE code and the error variants', () => {
    expect(parseAuthCallback(`${BASE}?code=abc-123#/account`)).toEqual({ kind: 'code', code: 'abc-123' })
    expect(parseAuthCallback(`${BASE}?error=access_denied&error_description=Link+expired`)).toEqual({
      kind: 'error',
      error: 'access_denied',
      description: 'Link expired',
    })
    expect(parseAuthCallback(`${BASE}?error_code=otp_expired`)).toEqual({ kind: 'error', error: 'otp_expired', description: '' })
  })

  it('strips the auth parameters and keeps the route', () => {
    expect(stripAuthParams(`${BASE}?code=abc#/account`)).toBe(`${BASE}#/account`)
    expect(stripAuthParams(`${BASE}?x=1&code=abc&error_description=e#/`)).toBe(`${BASE}?x=1#/`)
    expect(stripAuthParams(BASE)).toBe(BASE)
  })

  it('exchanges the code once and rewrites the URL', async () => {
    const exchange = vi.fn().mockResolvedValue({ error: null })
    // jsdom refuses to move history to another origin; the call itself is what matters.
    const replace = vi.spyOn(history, 'replaceState').mockImplementation(() => {})
    const client = { auth: { exchangeCodeForSession: exchange } } as unknown as Parameters<typeof handleAuthRedirect>[0]
    expect(await handleAuthRedirect(client, `${BASE}?code=xyz#/account`)).toEqual({ result: 'exchanged' })
    expect(exchange).toHaveBeenCalledWith('xyz')
    expect(replace).toHaveBeenCalledWith(null, '', `${BASE}#/account`)
    expect(await handleAuthRedirect(client, BASE)).toEqual({ result: 'none' })
    expect(exchange).toHaveBeenCalledTimes(1)
    replace.mockRestore()
  })
})

/** Just enough of the Supabase client for the store: session, events, one profile query. */
function fakeClient(opts: { session: { user: { id: string; email: string } } | null; role?: 'user' | 'admin'; signInError?: { code: string; message: string } }) {
  let listener: ((event: string, session: unknown) => void) | null = null
  const client = {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: opts.session } }),
      onAuthStateChange: vi.fn((cb: (event: string, session: unknown) => void) => {
        listener = cb
        return { data: { subscription: { unsubscribe() {} } } }
      }),
      signInWithPassword: vi.fn().mockResolvedValue(opts.signInError ? { error: opts.signInError } : { data: {}, error: null }),
      signUp: vi.fn(),
      signInWithOtp: vi.fn(),
      signOut: vi.fn().mockResolvedValue({ error: null }),
      updateUser: vi.fn(),
      exchangeCodeForSession: vi.fn(),
    },
    from: vi.fn(() => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: { role: opts.role ?? 'user' }, error: null }) }) }),
    })),
    rpc: vi.fn(),
  }
  return { client: client as unknown as AuthClient, fire: (event: string, session: unknown) => listener?.(event, session) }
}

const flush = () => new Promise((r) => setTimeout(r, 0))

describe('auth store', () => {
  it('starts loading and settles on anon without a session', async () => {
    const { client } = fakeClient({ session: null })
    const store = createAuthStore(client)
    expect(store.getState().status).toBe('loading')
    await flush()
    expect(store.getState().status).toBe('anon')
    expect(store.getState().user).toBeNull()
  })

  it('restores a session and fetches the role', async () => {
    const { client } = fakeClient({ session: { user: { id: 'u1', email: 'a@b.kz' } }, role: 'admin' })
    const store = createAuthStore(client)
    await flush()
    await flush()
    expect(store.getState().status).toBe('signed-in')
    expect(store.getState().user).toEqual({ id: 'u1', email: 'a@b.kz' })
    expect(store.getState().role).toBe('admin')
  })

  it('reacts to a later SIGNED_IN event', async () => {
    const { client, fire } = fakeClient({ session: null })
    const store = createAuthStore(client)
    await flush()
    fire('SIGNED_IN', { user: { id: 'u2', email: 'c@d.kz' } })
    await flush()
    await flush()
    expect(store.getState().status).toBe('signed-in')
    expect(store.getState().role).toBe('user')
  })

  it('keeps the error code for the UI to translate', async () => {
    const { client } = fakeClient({ session: null, signInError: { code: 'invalid_credentials', message: 'Invalid login credentials' } })
    const store = createAuthStore(client)
    expect(await store.getState().signIn('a@b.kz', 'wrong')).toBe(false)
    expect(store.getState().lastError).toBe('invalid_credentials')
    store.getState().clearError()
    expect(store.getState().lastError).toBeNull()
  })

  it('signs out locally and leaves the roadmap on the device', async () => {
    const { client } = fakeClient({ session: { user: { id: 'u1', email: 'a@b.kz' } } })
    const store = createAuthStore(client)
    await flush()
    useAppStore.getState().toggleCheck('eligibility', 'citizen')
    await store.getState().signOut()
    expect((client.auth.signOut as ReturnType<typeof vi.fn>).mock.calls[0][0]).toEqual({ scope: 'local' })
    expect(store.getState().status).toBe('anon')
    expect(useAppStore.getState().checked).toContain('eligibility:citizen')
  })
})
