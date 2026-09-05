import type { SupabaseClient } from '@supabase/supabase-js'
import type { AdminStats, AdminUserRow, ProgressSummary } from './types'
import type { ProgressRow } from './sync'

export type AdminClient = Pick<SupabaseClient, 'from' | 'rpc'>

const PAGE = 500
const PROGRESS_COLUMNS = 'track,category,current_stage,ratio,done_stages,total_stages,updated_at,client_updated_at'

/** PostgREST returns a one-to-one embed as an object, older versions as a one-element array. */
function normaliseProgress(v: unknown): ProgressSummary | null {
  const p = Array.isArray(v) ? v[0] : v
  if (!p || typeof p !== 'object') return null
  const row = p as ProgressSummary
  return { ...row, ratio: Number(row.ratio) }
}

export async function fetchStats(client: AdminClient): Promise<AdminStats> {
  const { data, error } = await client.rpc('admin_stats')
  if (error) throw new Error(error.message)
  return data as AdminStats
}

/** Every account with its progress summary, newest first; pages until a short page. */
export async function fetchAllUsers(client: AdminClient): Promise<AdminUserRow[]> {
  const out: AdminUserRow[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await client
      .from('profiles')
      .select(`id,email,role,created_at,progress(${PROGRESS_COLUMNS})`)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1)
    if (error) throw new Error(error.message)
    const rows = (data ?? []) as unknown as (Omit<AdminUserRow, 'progress'> & { progress: unknown })[]
    for (const r of rows) out.push({ ...r, progress: normaliseProgress(r.progress) })
    if (rows.length < PAGE) break
  }
  return out
}

export async function fetchUser(client: AdminClient, id: string): Promise<{ profile: Omit<AdminUserRow, 'progress'>; row: ProgressRow | null }> {
  const { data: profile, error } = await client.from('profiles').select('id,email,role,created_at').eq('id', id).single()
  if (error) throw new Error(error.message)
  const { data: row, error: e2 } = await client.from('progress').select('*').eq('user_id', id).maybeSingle()
  if (e2) throw new Error(e2.message)
  return { profile: profile as Omit<AdminUserRow, 'progress'>, row: (row as ProgressRow | null) ?? null }
}

export async function setRole(client: AdminClient, target: string, role: 'user' | 'admin'): Promise<void> {
  const { error } = await client.rpc('set_role', { target, new_role: role })
  if (error) throw new Error(error.message)
}
