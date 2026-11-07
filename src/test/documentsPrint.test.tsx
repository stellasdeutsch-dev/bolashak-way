import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { Documents } from '@/pages/Documents'
import { useAppStore } from '@/store/useAppStore'
import { documentsFor, isDocAuto } from '@/domain/documents'
import type { Profile } from '@/content/types'

const profile: Profile = {
  track: 'master',
  category: 'master_self',
  workerGroup: null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: true,
  experience: null,
}

const open = () =>
  render(
    <MemoryRouter initialEntries={['/master/documents']}>
      <Routes>
        <Route path="/:platform/documents" element={<Documents />} />
      </Routes>
    </MemoryRouter>,
  )

beforeEach(() => {
  localStorage.clear()
  useAppStore.getState().reset()
  useAppStore.setState({ locale: 'ru', profile })
  delete document.documentElement.dataset.print
})

describe('documents → PDF', () => {
  it('prints programme and direction, «Нет» before «Есть», the date and the address', () => {
    const docs = documentsFor(profile).flatMap((g) => g.items).filter((d) => !isDocAuto(d, profile))
    const ticked = docs[0]
    useAppStore.setState({ documentsDone: [ticked.id] })
    open()
    const sheet = screen.getByTestId('documents-print')
    expect(within(sheet).getByRole('heading', { level: 1, name: 'Список документов' })).toBeInTheDocument()
    expect(within(sheet).getByText('Магистратура')).toBeInTheDocument()
    expect(within(sheet).getByText('Самостоятельно поступаю')).toBeInTheDocument()
    const parts = within(sheet).getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(parts[0]).toMatch(/^Нет · \d+$/)
    expect(parts[1]).toMatch(/^Есть · \d+$/)
    const [missing, have] = within(sheet).getAllByRole('list')
    expect(within(have).getByText(ticked.title.ru)).toBeInTheDocument()
    expect(within(missing).queryByText(ticked.title.ru)).toBeNull()
    expect(within(missing).getAllByRole('listitem')).toHaveLength(Number(parts[0]!.split('· ')[1]))
    expect(sheet.textContent).toMatch(/Дата.*\d{4}/)
    expect(sheet.textContent).toContain('Адрес: http')
  })

  it('prints the sheet alone only from the button; Ctrl+P is left as it is', () => {
    const print = vi.fn()
    vi.stubGlobal('print', print)
    open()
    expect(document.documentElement.dataset.print).toBeUndefined()
    fireEvent.click(screen.getByRole('button', { name: /Сохранить список \(PDF\)/ }))
    expect(print).toHaveBeenCalledOnce()
    expect(document.documentElement.dataset.print).toBe('documents')
    window.dispatchEvent(new Event('afterprint'))
    expect(document.documentElement.dataset.print).toBeUndefined()
    vi.unstubAllGlobals()
  })
})
