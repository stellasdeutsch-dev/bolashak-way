import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { NotFound } from '@/pages/NotFound'
import { cloudEnabled } from './supabase'
import { useAuthStore } from './useAuth'

/**
 * UX only: the data behind these screens is protected by Row Level Security, so a
 * non-admin who reaches the route by hand simply gets empty responses.
 */
export function AdminGuard({ children }: { children: ReactNode }) {
  const status = useAuthStore((a) => a.status)
  const role = useAuthStore((a) => a.role)
  if (!cloudEnabled) return <NotFound />
  if (status === 'loading') return null
  if (status === 'anon') return <Navigate to="/account?next=/admin" replace />
  if (role === null) return null
  if (role !== 'admin') return <Navigate to="/" replace />
  return <>{children}</>
}
