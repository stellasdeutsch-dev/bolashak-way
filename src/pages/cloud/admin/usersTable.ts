import type { AdminUserRow } from '@/cloud/types'
import type { ChapterId } from '@/content/types'
import { chapterOf } from './labels'

export interface UserFilters {
  query: string
  track: string
  category: string
  chapter: ChapterId | '' | 'none'
  role: '' | 'user' | 'admin'
}

export type SortKey = 'email' | 'category' | 'ratio' | 'activity' | 'created'

export const EMPTY_FILTERS: UserFilters = { query: '', track: '', category: '', chapter: '', role: '' }

/** Pure so the table logic is testable without Supabase or React. */
export function filterUsers(rows: AdminUserRow[], f: UserFilters): AdminUserRow[] {
  const q = f.query.trim().toLowerCase()
  return rows.filter((r) => {
    if (q && !r.email.toLowerCase().includes(q)) return false
    if (f.role && r.role !== f.role) return false
    if (f.track && r.progress?.track !== f.track) return false
    if (f.category && r.progress?.category !== f.category) return false
    if (f.chapter === 'none') return !r.progress?.category
    if (f.chapter) return chapterOf(r.progress?.current_stage ?? null) === f.chapter
    return true
  })
}

export function sortUsers(rows: AdminUserRow[], key: SortKey, dir: 'asc' | 'desc'): AdminUserRow[] {
  const sign = dir === 'asc' ? 1 : -1
  const val = (r: AdminUserRow): string | number => {
    switch (key) {
      case 'email':
        return r.email.toLowerCase()
      case 'category':
        return r.progress?.category ?? ''
      case 'ratio':
        return r.progress?.ratio ?? -1
      case 'activity':
        return r.progress?.updated_at ?? ''
      case 'created':
        return r.created_at
    }
  }
  return [...rows].sort((a, b) => {
    const x = val(a)
    const y = val(b)
    return (x < y ? -1 : x > y ? 1 : 0) * sign
  })
}
