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

describe('onboarding flow', () => {
  it('walks four questions and stores a usable profile', () => {
    renderAt(<Onboarding />)
    fireEvent.click(screen.getByRole('button', { name: /Начать/i }))

    fireEvent.click(screen.getByRole('button', { name: /Магистратура/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Медицинский работник$/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Далее/ }))

    fireEvent.click(screen.getByRole('button', { name: /Пока нет/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Далее/ }))

    // Two groups on this screen: the foreign certificate first, the Kazakh one second.
    fireEvent.click(screen.getAllByRole('button', { name: /Сертификата нет/ })[0])
    fireEvent.click(screen.getAllByRole('button', { name: /Есть действующий сертификат/ })[1])
    fireEvent.click(screen.getByRole('button', { name: /^Далее/ }))

    fireEvent.click(screen.getByRole('button', { name: /Есть стаж/ }))
    fireEvent.click(screen.getByRole('button', { name: /Собрать роадмап/ }))

    const stored = useAppStore.getState().profile
    expect(stored).not.toBeNull()
    expect(stored!.category).toBe('master_medical')
    expect(stored!.kazakhCert).toBe(true)
    expect(useAppStore.getState().onboardedAt).not.toBeNull()
  })

  it('lets the user step back without losing the earlier answer', () => {
    renderAt(<Onboarding />)
    fireEvent.click(screen.getByRole('button', { name: /Начать/i }))
    fireEvent.click(screen.getByRole('button', { name: /Научная стажировка/ }))
    fireEvent.click(screen.getByRole('button', { name: /^Далее/ }))
    fireEvent.click(screen.getByRole('button', { name: /Назад/ }))
    expect(screen.getByRole('button', { name: /Научная стажировка/ })).toHaveAttribute('aria-pressed', 'true')
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
