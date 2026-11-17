import { beforeEach, describe, expect, it } from 'vitest'
import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { HashRouter, MemoryRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { PlatformHome } from '@/pages/PlatformHome'
import { Landing } from '@/pages/Landing'
import { Documents } from '@/pages/Documents'
import { useAppStore } from '@/store/useAppStore'
import type { Profile } from '@/content/types'

/** Keyboard and screen-reader paths a mouse user never notices are broken. */

const master: Profile = { track: 'master', category: 'master_self', workerGroup: null, invitation: 'none', foreignCert: null, kazakhCert: false, experience: null }

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru' })
})

const tab = (shift = false) => fireEvent.keyDown(document, { key: 'Tab', shiftKey: shift })

describe('the search dialog', () => {
  it('keeps Tab inside, even with result rows that arrows move through', () => {
    useAppStore.setState({ profile: master, onboardedAt: '2026-09-01T00:00:00.000Z' })
    render(
      <HashRouter>
        <Layout>
          <div />
        </Layout>
      </HashRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /Поиск/ }))
    const dialog = screen.getByRole('dialog')
    const input = within(dialog).getByRole('combobox')
    fireEvent.change(input, { target: { value: 'слоты' } })
    expect(within(dialog).getAllByRole('option').length).toBeGreaterThan(0)
    // the last control Tab can reach in the dialog
    const reachable = [...dialog.querySelectorAll<HTMLElement>('a[href], button, input')].filter((el) => el.tabIndex !== -1)
    const last = reachable[reachable.length - 1]
    last.focus()
    tab()
    expect(document.activeElement).toBe(reachable[0])
    tab(true)
    expect(document.activeElement).toBe(last)
  })
})

describe('the requirements matrix', () => {
  it('says "yes" and "no" in words a screen reader reads', async () => {
    const view = render(
      <MemoryRouter initialEntries={['/master']}>
        <Routes>
          <Route path="/:platform" element={<PlatformHome />} />
        </Routes>
      </MemoryRouter>,
    )
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Требования/ }))
    })
    const table = view.container.querySelector('table')!
    expect(within(table).getAllByText('Да').length).toBeGreaterThan(0)
    expect(within(table).getAllByText('Нет').length).toBeGreaterThan(0)
    // no label on an element that has no role to carry it
    expect(table.querySelectorAll('span[aria-label]')).toHaveLength(0)
  })
})

describe('the platform switcher', () => {
  it('points aria-controls only at a list that exists', () => {
    render(
      <HashRouter>
        <Layout>
          <div />
        </Layout>
      </HashRouter>,
    )
    const btn = document.querySelector<HTMLButtonElement>('button[aria-expanded]')!
    expect(btn.getAttribute('aria-expanded')).toBe('false')
    expect(btn.hasAttribute('aria-controls')).toBe(false)
    fireEvent.click(btn)
    const id = btn.getAttribute('aria-controls')!
    expect(document.getElementById(id)).not.toBeNull()
  })
})

describe('buttons that disappear when pressed', () => {
  it('the finder moves the focus to the next question, then to the answer', () => {
    render(
      <MemoryRouter>
        <Landing />
      </MemoryRouter>,
    )
    const finder = document.getElementById('finder')!
    const first = within(finder).getAllByRole('button')[0]
    first.focus()
    fireEvent.click(first)
    expect(finder.contains(document.activeElement)).toBe(true)
    expect(document.activeElement).not.toBe(document.body)
    // answer until a programme comes out
    for (let i = 0; i < 4 && !within(finder).queryByRole('link'); i++) {
      const option = finder.querySelector<HTMLButtonElement>('[data-finder-option]')
      if (!option) break
      option.focus()
      fireEvent.click(option)
      expect(finder.contains(document.activeElement)).toBe(true)
    }
    expect(within(finder).getByRole('link')).toBeInTheDocument()
    expect(document.activeElement?.closest('[data-finder-result]')).not.toBeNull()
  })

  it('the documents list keeps the focus on the next row when a ticked one leaves', () => {
    useAppStore.setState({ profile: master, onboardedAt: '2026-09-01T00:00:00.000Z' })
    render(
      <MemoryRouter>
        <Documents />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole('button', { name: /Осталось/ }))
    const rows = () => [...document.querySelectorAll<HTMLButtonElement>('button[role="checkbox"]:not([aria-disabled="true"])')]
    const [a, b] = rows()
    a.focus()
    fireEvent.click(a)
    expect(rows()).not.toContain(a)
    expect(document.activeElement).toBe(b)
  })
})
