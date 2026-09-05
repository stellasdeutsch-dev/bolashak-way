import type { Role } from './useAuth'

export interface ProgressSummary {
  track: string | null
  category: string | null
  current_stage: string | null
  ratio: number
  done_stages: number
  total_stages: number
  updated_at: string
  client_updated_at: string
}

export interface AdminUserRow {
  id: string
  email: string
  role: Role
  created_at: string
  progress: ProgressSummary | null
}

export interface AdminStats {
  users_total: number
  admins: number
  with_progress: number
  onboarded: number
  active_7d: number
  active_30d: number
  by_track: Record<string, number>
  by_category: Record<string, number>
  by_current_stage: Record<string, number>
  ratio_buckets: Record<string, number>
  signups_by_week: { week: string; n: number }[]
  active_by_day: { day: string; n: number }[]
  generated_at: string
}
