import { create, type StoreApi, type UseBoundStore } from 'zustand'
import type { AuthError, SupabaseClient } from '@supabase/supabase-js'
import { authRedirectTarget } from './config'

export type Role = 'user' | 'admin'
export type AuthStatus = 'loading' | 'anon' | 'signed-in'

export interface AuthUser {
  id: string
  email: string
}

export interface AuthState {
  status: AuthStatus
  user: AuthUser | null
  role: Role | null
  /** Machine-readable code of the last failure, mapped to a string by the UI. */
  lastError: string | null
  signIn: (email: string, password: string) => Promise<boolean>
  signUp: (email: string, password: string) => Promise<'confirm' | 'signed-in' | false>
  signInWithMagicLink: (email: string) => Promise<boolean>
  signOut: () => Promise<void>
  changePassword: (password: string) => Promise<boolean>
  deleteAccount: () => Promise<boolean>
  refreshRole: () => Promise<void>
  clearError: () => void
}

/**
 * Narrow the client surface the store needs, so tests inject a hand-rolled fake and
 * production passes the real SupabaseClient unchanged.
 */
export type AuthClient = Pick<SupabaseClient, 'auth' | 'from' | 'rpc'>

function errorCode(e: AuthError | { message?: string; code?: string } | null | undefined): string {
  if (!e) return 'unknown'
  const code = (e as { code?: string }).code
  if (code) return code
  const msg = (e.message ?? '').toLowerCase()
  if (msg.includes('failed to fetch') || msg.includes('network')) return 'network'
  return 'unknown'
}

export function createAuthStore(client: AuthClient): UseBoundStore<StoreApi<AuthState>> {
  const store = create<AuthState>()((set, get) => {
    const loadRole = async (userId: string): Promise<Role | null> => {
      const { data, error } = await client.from('profiles').select('role').eq('id', userId).single()
      if (error || !data) return 'user'
      return (data as { role: Role }).role === 'admin' ? 'admin' : 'user'
    }

    const applySession = async (session: { user: { id: string; email?: string | null } } | null) => {
      if (!session) {
        set({ status: 'anon', user: null, role: null })
        return
      }
      const user = { id: session.user.id, email: session.user.email ?? '' }
      set({ status: 'signed-in', user })
      set({ role: await loadRole(user.id) })
    }

    // Initial session, then every change. Supabase fires INITIAL_SESSION first, which
    // makes the explicit getSession() below redundant on new SDK versions — kept because
    // it resolves faster than the event on a cold start.
    void client.auth.getSession().then(({ data }) => applySession(data.session))
    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') set({ status: 'anon', user: null, role: null })
      else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        void applySession(session)
      }
    })

    return {
      status: 'loading',
      user: null,
      role: null,
      lastError: null,

      clearError: () => set({ lastError: null }),

      signIn: async (email, password) => {
        set({ lastError: null })
        const { error } = await client.auth.signInWithPassword({ email: email.trim(), password })
        if (error) {
          set({ lastError: errorCode(error) })
          return false
        }
        return true
      },

      signUp: async (email, password) => {
        set({ lastError: null })
        const { data, error } = await client.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: authRedirectTarget() },
        })
        if (error) {
          set({ lastError: errorCode(error) })
          return false
        }
        // With confirmations on, Supabase returns a user but no session until the mail is clicked.
        return data.session ? 'signed-in' : 'confirm'
      },

      signInWithMagicLink: async (email) => {
        set({ lastError: null })
        const { error } = await client.auth.signInWithOtp({
          email: email.trim(),
          options: { emailRedirectTo: authRedirectTarget() },
        })
        if (error) {
          set({ lastError: errorCode(error) })
          return false
        }
        return true
      },

      // Local scope: this device only. Other devices keep their sessions, and the
      // local roadmap copy stays — the account screen says so.
      signOut: async () => {
        await client.auth.signOut({ scope: 'local' })
        set({ status: 'anon', user: null, role: null, lastError: null })
      },

      changePassword: async (password) => {
        set({ lastError: null })
        const { error } = await client.auth.updateUser({ password })
        if (error) {
          set({ lastError: errorCode(error) })
          return false
        }
        return true
      },

      deleteAccount: async () => {
        set({ lastError: null })
        const { error } = await client.rpc('delete_own_account')
        if (error) {
          set({ lastError: error.message.includes('last admin') ? 'last_admin' : errorCode(error) })
          return false
        }
        await client.auth.signOut({ scope: 'local' })
        set({ status: 'anon', user: null, role: null })
        return true
      },

      refreshRole: async () => {
        const u = get().user
        if (u) set({ role: await loadRole(u.id) })
      },
    }
  })
  return store
}

/**
 * The live store. Created lazily by initAuth() so a keyless build never constructs a
 * client; components must guard on `cloudEnabled` before calling this.
 */
let live: UseBoundStore<StoreApi<AuthState>> | null = null

export function initAuth(client: AuthClient): UseBoundStore<StoreApi<AuthState>> {
  if (!live) live = createAuthStore(client)
  return live
}

/** A store that stays `anon` forever, for builds without credentials. */
const disabled = create<AuthState>()(() => ({
  status: 'anon',
  user: null,
  role: null,
  lastError: null,
  clearError: () => {},
  signIn: async () => false,
  signUp: async () => false,
  signInWithMagicLink: async () => false,
  signOut: async () => {},
  changePassword: async () => false,
  deleteAccount: async () => false,
  refreshRole: async () => {},
}))

export function useAuthStore<T>(selector: (s: AuthState) => T): T {
  return (live ?? disabled)(selector)
}

export function getAuthStore(): UseBoundStore<StoreApi<AuthState>> {
  return live ?? disabled
}
