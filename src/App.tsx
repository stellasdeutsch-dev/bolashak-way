import { useEffect } from 'react'
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router'
import { Layout } from '@/components/Layout'
import { Onboarding } from '@/pages/Onboarding/Onboarding'
import { Roadmap } from '@/pages/Roadmap'
import { StagePage } from '@/pages/Stage'
import { Documents } from '@/pages/Documents'
import { Settings } from '@/pages/Settings'
import { About } from '@/pages/About'
import { Calendar } from '@/pages/Calendar'
import { NotFound } from '@/pages/NotFound'
import { useAppStore } from '@/store/useAppStore'

/** Applies the stored theme preference to the document element. */
function useTheme() {
  const theme = useAppStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'system') root.removeAttribute('data-theme')
    else root.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => {
      if (useAppStore.getState().theme !== 'system') return
      document.documentElement.removeAttribute('data-theme')
    }
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function Guarded({ children }: { children: React.ReactNode }) {
  const profile = useAppStore((s) => s.profile)
  if (!profile) return <Navigate to="/onboarding" replace />
  return <>{children}</>
}

export default function App() {
  useTheme()
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/"
            element={
              <Guarded>
                <Roadmap />
              </Guarded>
            }
          />
          <Route
            path="/stage/:id"
            element={
              <Guarded>
                <StagePage />
              </Guarded>
            }
          />
          <Route
            path="/documents"
            element={
              <Guarded>
                <Documents />
              </Guarded>
            }
          />
          <Route path="/about" element={<About />} />
        <Route path="/calendar" element={<Calendar />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
