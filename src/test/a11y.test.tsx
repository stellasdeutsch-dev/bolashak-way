import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { HashRouter } from 'react-router'
import { Layout } from '@/components/Layout'
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

