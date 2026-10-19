import type { PlatformSlug, StageId, Track } from '@/content/types'
import { platformForTrack } from '@/content/platforms'

/** Every address inside one platform. Pages build links only through this. */
export interface PlatformPaths {
  slug: PlatformSlug
  home: string
  start: string
  roadmap: string
  documents: string
  calendar: string
  stage: (id: StageId) => string
}

export const platformPaths = (slug: PlatformSlug): PlatformPaths => ({
  slug,
  home: `/${slug}`,
  start: `/${slug}/start`,
  roadmap: `/${slug}/roadmap`,
  documents: `/${slug}/documents`,
  calendar: `/${slug}/calendar`,
  stage: (id) => `/${slug}/stage/${id}`,
})

export const pathsForTrack = (track: Track): PlatformPaths => platformPaths(platformForTrack(track).slug)

/** The i18n key for an anchor date, in the platform's own words ("обучения" or "стажировки"). */
export const dateLabelKey = (key: string, track: Track): string =>
  (track === 'internship' || track === 'science_internship') && (key === 'study_start' || key === 'study_end')
    ? `deadlines.${key}_intern`
    : `deadlines.${key}`
