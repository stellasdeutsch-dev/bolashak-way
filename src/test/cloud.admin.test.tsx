import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'

vi.mock('@/cloud/supabase', () => ({ cloudEnabled: true, getSupabase: () => null }))

import { AdminGuard } from '@/cloud/AdminGuard'
import { initAuth, getAuthStore, type AuthClient } from '@/cloud/useAuth'
import { toCsv } from '@/cloud/csv'
import { filterUsers, sortUsers, EMPTY_FILTERS } from '@/pages/cloud/admin/usersTable'
import type { AdminUserRow } from '@/cloud/types'

const idle = {
  auth: {
    getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
    onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe() {} } } })),
  },
  from: vi.fn(),
  rpc: vi.fn(),
} as unknown as AuthClient

function renderGuard() {
  return render(
    <MemoryRouter initialEntries={['/admin']}>
      <Routes>
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <p>admin area</p>
            </AdminGuard>
          }
        />
        <Route path="/account" element={<p>account page</p>} />
        <Route path="/" element={<p>roadmap</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AdminGuard', () => {
  const store = initAuth(idle)

  it('sends a visitor to the account screen', () => {
    store.setState({ status: 'anon', user: null, role: null })
    renderGuard()
    expect(screen.getByText('account page')).toBeInTheDocument()
  })

  it('sends a plain user back to the roadmap', () => {
    store.setState({ status: 'signed-in', user: { id: 'u', email: 'u@x.kz' }, role: 'user' })
    renderGuard()
    expect(screen.getByText('roadmap')).toBeInTheDocument()
  })

  it('renders nothing while the role is still unknown', () => {
    store.setState({ status: 'signed-in', user: { id: 'u', email: 'u@x.kz' }, role: null })
    const { container } = renderGuard()
    expect(container.textContent).toBe('')
  })

  it('lets an admin through', () => {
    store.setState({ status: 'signed-in', user: { id: 'a', email: 'a@x.kz' }, role: 'admin' })
    renderGuard()
    expect(screen.getByText('admin area')).toBeInTheDocument()
    expect(getAuthStore().getState().role).toBe('admin')
  })
})

const row = (id: string, email: string, p: Partial<NonNullable<AdminUserRow['progress']>> | null, role: 'user' | 'admin' = 'user'): AdminUserRow => ({
  id,
  email,
  role,
  created_at: `2026-09-0${id.length}T00:00:00Z`,
  progress: p
    ? { track: 'master', category: 'master_medical', current_stage: 'testing', ratio: 0.5, done_stages: 3, total_stages: 17, updated_at: '2026-09-04T00:00:00Z', client_updated_at: '2026-09-04T00:00:00Z', ...p }
    : null,
})

describe('users table helpers', () => {
  const rows = [
    row('a', 'anna@x.kz', { current_stage: 'eligibility', ratio: 0.1 }),
    row('bb', 'boris@x.kz', { current_stage: 'testing', ratio: 0.6, updated_at: '2026-09-05T00:00:00Z' }),
    row('ccc', 'clara@x.kz', null, 'admin'),
    row('dddd', 'dana@x.kz', { track: 'science_internship', category: 'science_internship', current_stage: 'contract', ratio: 0.9 }),
  ]

  it('filters by email substring, role, track, category and chapter', () => {
    expect(filterUsers(rows, { ...EMPTY_FILTERS, query: 'AN' }).map((r) => r.id)).toEqual(['a', 'dddd'])
    expect(filterUsers(rows, { ...EMPTY_FILTERS, role: 'admin' }).map((r) => r.id)).toEqual(['ccc'])
    expect(filterUsers(rows, { ...EMPTY_FILTERS, track: 'science_internship' }).map((r) => r.id)).toEqual(['dddd'])
    expect(filterUsers(rows, { ...EMPTY_FILTERS, category: 'master_medical' }).map((r) => r.id)).toEqual(['a', 'bb'])
    expect(filterUsers(rows, { ...EMPTY_FILTERS, chapter: 'contest' }).map((r) => r.id)).toEqual(['bb'])
    expect(filterUsers(rows, { ...EMPTY_FILTERS, chapter: 'none' }).map((r) => r.id)).toEqual(['ccc'])
  })

  it('sorts by progress and by activity, with missing progress last', () => {
    expect(sortUsers(rows, 'ratio', 'desc').map((r) => r.id)).toEqual(['dddd', 'bb', 'a', 'ccc'])
    expect(sortUsers(rows, 'activity', 'desc')[0].id).toBe('bb')
    expect(sortUsers(rows, 'email', 'asc').map((r) => r.id)).toEqual(['a', 'bb', 'ccc', 'dddd'])
  })
})

describe('csv', () => {
  it('quotes delimiters and quotes, prefixes a BOM and uses CRLF', () => {
    const text = toCsv(['email', 'note'], [['a@x.kz', 'plain'], ['b@x.kz', 'has, comma'], ['c@x.kz', 'says "hi"']])
    expect(text.charCodeAt(0)).toBe(0xfeff)
    expect(text).toContain('email,note\r\n')
    expect(text).toContain('b@x.kz,"has, comma"\r\n')
    expect(text).toContain('c@x.kz,"says ""hi"""\r\n')
  })
})
