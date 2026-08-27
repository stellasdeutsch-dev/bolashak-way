import type { CategoryId, ExamId, Invitation, Profile, Track, WorkerGroup } from '@/content/types'
import { CATEGORIES_BY_TRACK } from '@/content/categories'

export interface OnboardingDraft {
  track: Track | null
  category: CategoryId | null
  workerGroup: WorkerGroup | null
  invitation: Invitation | null
  hasForeignCert: boolean | null
  exam: ExamId
  score: string
  kazakhCert: boolean | null
  hasExperience: boolean | null
  years: string
  continuousMonths: string
}

export const emptyDraft = (): OnboardingDraft => ({
  track: null,
  category: null,
  workerGroup: null,
  invitation: null,
  hasForeignCert: null,
  exam: 'ielts',
  score: '',
  kazakhCert: null,
  hasExperience: null,
  years: '',
  continuousMonths: '',
})

export const draftFromProfile = (p: Profile): OnboardingDraft => ({
  track: p.track,
  category: p.category,
  workerGroup: p.workerGroup,
  invitation: p.invitation,
  hasForeignCert: p.foreignCert !== null,
  exam: p.foreignCert?.exam ?? 'ielts',
  score: p.foreignCert ? String(p.foreignCert.score) : '',
  kazakhCert: p.kazakhCert,
  hasExperience: p.experience !== null,
  years: p.experience ? String(p.experience.years) : '',
  continuousMonths: p.experience ? String(p.experience.continuousMonths) : '',
})

/** A track always has a default category so the draft is never in an impossible state. */
export const defaultCategoryFor = (track: Track): CategoryId => CATEGORIES_BY_TRACK[track][0]

export function isStepComplete(draft: OnboardingDraft, step: number): boolean {
  switch (step) {
    case 0:
      return draft.track !== null && draft.category !== null && (draft.track !== 'internship' || draft.workerGroup !== null)
    case 1:
      return draft.invitation !== null
    case 2:
      return draft.kazakhCert !== null && draft.hasForeignCert !== null && (!draft.hasForeignCert || Number(draft.score) > 0)
    case 3:
      return draft.hasExperience !== null && (!draft.hasExperience || Number(draft.years) >= 0)
    default:
      return false
  }
}

export function toProfile(draft: OnboardingDraft): Profile {
  const track = draft.track ?? 'master'
  const category = draft.category ?? defaultCategoryFor(track)
  return {
    track,
    category,
    workerGroup: draft.workerGroup,
    invitation: draft.invitation ?? 'none',
    foreignCert: draft.hasForeignCert && Number(draft.score) > 0 ? { exam: draft.exam, score: Number(draft.score) } : null,
    kazakhCert: draft.kazakhCert ?? false,
    experience: draft.hasExperience
      ? { years: Number(draft.years) || 0, continuousMonths: Number(draft.continuousMonths) || 0 }
      : null,
  }
}
