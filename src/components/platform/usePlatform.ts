import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { getPlatform, isPlatformSlug, platformForTrack, type PlatformMeta } from '@/content/platforms'
import type { PlatformSlug, Profile } from '@/content/types'
import { pathsForTrack, type PlatformPaths } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'

/** The platform named in the address, if any – "/master/roadmap" → "master". */
export function useRoutePlatform(): PlatformSlug | null {
  const { pathname } = useLocation()
  const first = pathname.split('/')[1]
  return isPlatformSlug(first) ? first : null
}

/** The platform the reader is looking at: the one in the address, else their own. */
export function useActivePlatform(): PlatformMeta | null {
  const fromRoute = useRoutePlatform()
  const track = useAppStore((st) => st.profile?.track)
  if (fromRoute) return getPlatform(fromRoute)
  return track ? platformForTrack(track) : null
}

/**
 * The reader's plan, on a page that only exists with one: everything behind
 * <PlatformRoute gate> (roadmap, stage, documents, calendar). The gate sends a reader
 * without a plan to the questions before such a page renders.
 */
export function usePlanProfile(): Profile {
  const profile = useAppStore((st) => st.profile)
  if (!profile) throw new Error('A plan page rendered without a plan: it belongs behind <PlatformRoute gate>.')
  return profile
}

/** Addresses inside the reader's own platform – the one their roadmap belongs to. */
export function useMyPaths(): PlatformPaths | null {
  const track = useAppStore((st) => st.profile?.track)
  return track ? pathsForTrack(track) : null
}

/** Paints the whole app in the active platform's colour while it is open. */
export function usePlatformColour(slug: PlatformSlug | null) {
  useEffect(() => {
    const root = document.documentElement
    if (slug) root.setAttribute('data-platform', slug)
    else root.removeAttribute('data-platform')
  }, [slug])
}
