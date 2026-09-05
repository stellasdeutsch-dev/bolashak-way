import { useEffect, useState, type ReactNode } from 'react'
import { cloudEnabled } from './supabase'
import { useAuthStore } from './useAuth'
import { useSyncStore } from './syncStore'
import { useAppStore } from '@/store/useAppStore'

/**
 * Holds the router back for a moment on a cold start while the session is restored,
 * so a returning user with an empty device is not bounced to onboarding before the
 * cloud copy arrives. Capped, so a slow network never shows an empty page for long.
 */
export function CloudBoot({ children }: { children: ReactNode }) {
  const status = useAuthStore((a) => a.status)
  const linked = useSyncStore((st) => st.linkedUserId)
  const hasProfile = useAppStore((st) => st.profile !== null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => setExpired(true), 4000)
    return () => clearTimeout(id)
  }, [])

  if (!cloudEnabled || expired) return <>{children}</>
  // Only wait when there is something to wait for: a session being restored on a device
  // that has no profile yet but was linked to an account before.
  const waiting = status === 'loading' && !hasProfile && linked !== null
  if (waiting) return null
  return <>{children}</>
}
