import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router'
import { Onboarding } from '@/pages/Onboarding/Onboarding'
import { Roadmap } from '@/pages/Roadmap'
import { Settings } from '@/pages/Settings'
import { StagePage } from '@/pages/Stage'
import { Layout } from '@/components/Layout'
import { useAppStore } from '@/store/useAppStore'
import { applicableStages } from '@/domain/progress'
import type { Profile } from '@/content/types'

const medic: Profile = {
  track: 'master',
  category: 'master_medical',
  workerGroup: null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: true,
  experience: { years: 2, continuousMonths: 18 },
}

const renderAt = (ui: React.ReactNode) => render(<HashRouter>{ui}</HashRouter>)

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru' })
})

const startAt = (platform: string) =>
  render(
    <MemoryRouter initialEntries={[`/${platform}/start`]}>
      <Routes>
        <Route path="/:platform/start" element={<Onboarding />} />
        <Route path="/:platform/roadmap" element={<p>roadmap</p>} />
        <Route path="/:platform" element={<p>home</p>} />
      </Routes>
    </MemoryRouter>,
  )

describe('onboarding flow', () => {
  it('asks only for the direction and stores a usable profile', () => {
    startAt('master')
    // no welcome screen, no language, experience or invitation questions
    expect(screen.queryByRole('button', { name: /Начать/i })).toBeNull()
    expect(screen.queryByText(/Вопрос \d из/)).toBeNull()
    expect(screen.queryByRole('button', { name: /Сертификата нет/ })).toBeNull()
    fireEvent.click(screen.getByRole('button', { name: /^Медицинский работник$/ }))
    fireEvent.click(screen.getByRole('button', { name: /Собрать мой план/ }))

    const stored = useAppStore.getState().profile
    expect(stored).toMatchObject({ track: 'master', category: 'master_medical', invitation: 'none', foreignCert: null, kazakhCert: false, experience: null })
    expect(screen.getByText('roadmap')).toBeInTheDocument()
  })

  it('opens the plan straight away when the programme has one direction', () => {
    startAt('bachelor')
    expect(useAppStore.getState().profile).toMatchObject({ track: 'bachelor', category: 'bachelor' })
    expect(screen.getByText('roadmap')).toBeInTheDocument()
  })

  it('asks an intern for the worker group before building the plan', () => {
    startAt('internship')
    const build = screen.getByRole('button', { name: /Собрать мой план/ })
    expect(build).toBeDisabled()
    fireEvent.click(screen.getAllByRole('button', { pressed: false })[0])
    expect(screen.getByRole('button', { name: /Собрать мой план/ })).toBeEnabled()
  })

  it('keeps the other programme when switching to a one-direction programme', () => {
    useAppStore.setState({ profile: medic, onboardedAt: new Date().toISOString(), checked: ['eligibility:citizen'] })
    startAt('science')
    expect(useAppStore.getState().profile?.track).toBe('science_internship')
    expect(useAppStore.getState().archive.master?.checked).toEqual(['eligibility:citizen'])
  })
})

describe('progress per programme', () => {
  it('files the current programme away and brings it back on return', () => {
    const internship = { ...medic, track: 'internship' as const, category: 'internship' as const, workerGroup: 'medical' as const }
    useAppStore.setState({ profile: medic, onboardedAt: '2026-09-01T00:00:00.000Z', checked: ['eligibility:citizen'], stagesDone: [], archive: {} })
    useAppStore.getState().setProfile(internship)
    expect(useAppStore.getState().checked).toEqual([])
    useAppStore.getState().setProfile(medic)
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
  })
})

describe('roadmap', () => {
  beforeEach(() => {
    useAppStore.setState({ profile: medic, onboardedAt: new Date().toISOString() })
  })

  it('renders every applicable stage as a node and names the next action', () => {
    renderAt(<Roadmap />)
    const expected = applicableStages(medic).length
    expect(document.querySelectorAll('[id^="node-"]')).toHaveLength(expected)
    expect(screen.getByText('Следующее действие')).toBeInTheDocument()
  })

  it('closes the Kazakh certificate stage from the onboarding answers alone', () => {
    renderAt(<Roadmap />)
    const node = document.getElementById('node-kazakh')!
    expect(within(node).getByText(/закрыто по вашим ответам/)).toBeInTheDocument()
  })

  it('shows language courses for a preferential category', () => {
    renderAt(<Roadmap />)
    expect(document.getElementById('node-language_courses')).not.toBeNull()
  })
})

describe('settings', () => {
  beforeEach(() => {
    useAppStore.setState({ profile: medic, onboardedAt: new Date().toISOString(), checked: ['eligibility:citizen'] })
  })

  it('asks for confirmation before wiping progress', () => {
    renderAt(<Settings />)
    fireEvent.click(screen.getByRole('button', { name: /Сбросить прогресс/ }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    // Still intact while the dialog is open.
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
    fireEvent.click(screen.getByRole('button', { name: /Отмена/ }))
    expect(useAppStore.getState().checked).toEqual(['eligibility:citizen'])
  })
})

describe('search overlay', () => {
  beforeEach(() => {
    useAppStore.setState({ profile: medic, onboardedAt: new Date().toISOString() })
  })

  it('opens from the header and finds interview slot answers', () => {
    renderAt(
      <Layout>
        <div />
      </Layout>,
    )
    fireEvent.click(screen.getByRole('button', { name: /Поиск/ }))
    const dialog = screen.getByRole('dialog')
    fireEvent.change(within(dialog).getByRole('searchbox'), { target: { value: 'слоты' } })
    expect(within(dialog).getAllByText(/слоты/i).length).toBeGreaterThan(0)
  })
})

describe('every stage renders for every category', () => {
  const sample: Profile[] = [
    medic,
    { track: 'master', category: 'master_self', workerGroup: null, invitation: 'unconditional', foreignCert: { exam: 'ielts', score: 7 }, kazakhCert: true, experience: null },
    { track: 'internship', category: 'internship', workerGroup: 'ai_user', invitation: 'applied', foreignCert: { exam: 'toefl_ibt', score: 60 }, kazakhCert: false, experience: { years: 3, continuousMonths: 6 } },
    { track: 'science_internship', category: 'science_internship', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: false, experience: { years: 5, continuousMonths: 24 } },
    { track: 'bachelor', category: 'bachelor', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: false, experience: null },
  ]

  it.each(sample.map((p) => [p.category, p] as const))('renders all stages of %s without crashing', (_name, profile) => {
    for (const stage of applicableStages(profile)) {
      useAppStore.setState({
        profile,
        onboardedAt: new Date().toISOString(),
        // Anchor dates so the deadline panel renders its computed rows too.
        dates: { award_date: '2026-09-01', study_start: '2026-10-01', study_end: '2027-06-30', return_date: '2027-07-10', work_start: '2027-08-01' },
      })
      const view = render(
        <MemoryRouter initialEntries={[`/stage/${stage.id}`]}>
          <Routes>
            <Route path="/stage/:id" element={<StagePage />} />
          </Routes>
        </MemoryRouter>,
      )
      expect(document.querySelector('h1')).not.toBeNull()
      view.unmount()
    }
  })
})
