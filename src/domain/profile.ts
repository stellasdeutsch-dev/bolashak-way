import type { CategoryId, Profile, Track, WorkerGroup } from '@/content/types'
import { CATEGORIES_BY_TRACK } from '@/content/categories'

/**
 * The questions ask only for the direction: the category, and the worker group for an
 * internship. Invitation, certificates and experience are not asked, so no step of the
 * plan closes by itself and the roadmap shows the full path.
 */
export interface OnboardingDraft {
  track: Track | null
  category: CategoryId | null
  workerGroup: WorkerGroup | null
}

export const emptyDraft = (): OnboardingDraft => ({ track: null, category: null, workerGroup: null })

export const draftFromProfile = (p: Profile): OnboardingDraft => ({ track: p.track, category: p.category, workerGroup: p.workerGroup })

/** A track always has a default category so the draft is never in an impossible state. */
export const defaultCategoryFor = (track: Track): CategoryId => CATEGORIES_BY_TRACK[track][0]

/** Ready to build a plan: a direction is chosen, and an intern has named a worker group. */
export function isDraftComplete(draft: OnboardingDraft): boolean {
  return draft.track !== null && draft.category !== null && (draft.track !== 'internship' || draft.workerGroup !== null)
}

export function toProfile(draft: OnboardingDraft): Profile {
  const track = draft.track ?? 'master'
  const category = draft.category ?? defaultCategoryFor(track)
  return { track, category, workerGroup: draft.workerGroup }
}
