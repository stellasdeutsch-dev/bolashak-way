import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation, useParams } from 'react-router'
import { Layout } from '@/components/Layout'
import { Landing } from '@/pages/Landing'
import { PlatformHome } from '@/pages/PlatformHome'
import { PlatformRoute } from '@/components/platform/PlatformRoute'
import { pathsForTrack, type PlatformPaths } from '@/domain/paths'
import type { StageId } from '@/content/types'
import { NotFound } from '@/pages/NotFound'
import { useAppStore } from '@/store/useAppStore'

const Calendar = lazy(() => import('@/pages/Calendar').then((m) => ({ default: m.Calendar })))
const Settings = lazy(() => import('@/pages/Settings').then((m) => ({ default: m.Settings })))
const Documents = lazy(() => import('@/pages/Documents').then((m) => ({ default: m.Documents })))
const StagePage = lazy(() => import('@/pages/Stage').then((m) => ({ default: m.StagePage })))
const Roadmap = lazy(() => import('@/pages/Roadmap').then((m) => ({ default: m.Roadmap })))
const Onboarding = lazy(() => import('@/pages/Onboarding/Onboarding').then((m) => ({ default: m.Onboarding })))

/** Applies the stored theme preference to the document element. */
function useTheme() {
  const theme = useAppStore((s) => s.theme)
  // The dark palette lives under [data-theme='dark'], so "system" has to resolve to a
  // concrete value — and follow the OS when it switches at sunset.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      const pref = useAppStore.getState().theme
      const resolved = pref === 'system' ? (mq.matches ? 'dark' : 'light') : pref
      document.documentElement.setAttribute('data-theme', resolved)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [theme])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

/**
 * Addresses from before the five platforms (/, /stage/x, /documents, /calendar,
 * /onboarding, /about) still work: they lead into the reader's own platform, or to the
 * programme chooser when there is no roadmap yet.
 */
function Legacy({ to }: { to: (p: PlatformPaths) => string }) {
  const profile = useAppStore((st) => st.profile)
  const { id } = useParams()
  if (!profile) return <Navigate to="/" replace />
  const paths = pathsForTrack(profile.track)
  return <Navigate to={id ? paths.stage(id as StageId) : to(paths)} replace />
}

export default function App() {
  useTheme()
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        {/* Pages past the first screen load on demand; the worker has them cached for offline use. */}
        <Suspense fallback={<div aria-busy="true" style={{ minHeight: '60vh' }} />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="/about" element={<Navigate to="/" replace />} />
          <Route path="/onboarding" element={<Legacy to={(p) => p.start} />} />
          <Route path="/documents" element={<Legacy to={(p) => p.documents} />} />
          <Route path="/calendar" element={<Legacy to={(p) => p.calendar} />} />
          <Route path="/roadmap" element={<Legacy to={(p) => p.roadmap} />} />
          <Route path="/stage/:id" element={<Legacy to={(p) => p.roadmap} />} />

          <Route path="/:platform" element={<PlatformRoute><PlatformHome /></PlatformRoute>} />
          <Route path="/:platform/start" element={<PlatformRoute><Onboarding /></PlatformRoute>} />
          <Route path="/:platform/roadmap" element={<PlatformRoute gate><Roadmap /></PlatformRoute>} />
          <Route path="/:platform/stage/:id" element={<PlatformRoute gate><StagePage /></PlatformRoute>} />
          <Route path="/:platform/documents" element={<PlatformRoute gate><Documents /></PlatformRoute>} />
          <Route path="/:platform/calendar" element={<PlatformRoute gate><Calendar /></PlatformRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  )
}
