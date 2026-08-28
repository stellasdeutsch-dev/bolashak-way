/**
 * Content model. Everything the app shows about the Bolashak procedure lives in
 * `src/content/*` as typed data. No facts are hard-coded in components.
 */

export type Locale = 'ru' | 'kk' | 'en'

/** Localised string. `ru` is the canonical source, other locales fall back to it. */
export type L = { ru: string; kk?: string; en?: string }

export type Track = 'bachelor' | 'master' | 'phd_residency' | 'internship' | 'science_internship'

export type CategoryId =
  | 'bachelor'
  | 'master_self'
  | 'master_rural'
  | 'master_engineer'
  | 'master_medical'
  | 'master_civil'
  | 'master_nuclear'
  | 'phd_self'
  | 'phd_nuclear'
  | 'residency'
  | 'internship'
  | 'science_internship'

/** Worker categories admitted to Bolashak internships (bolashak.gov.kz/ru/pretendentu/pravila). */
export type WorkerGroup =
  | 'engineer_agro'
  | 'teacher'
  | 'medical'
  | 'civil'
  | 'media'
  | 'culture'
  | 'judge'
  | 'ai_user'
  | 'nuclear'

export type ExamId = 'ielts' | 'toefl_ibt' | 'toefl_pbt' | 'det' | 'other'

export type Invitation = 'none' | 'applied' | 'unconditional'

export interface Profile {
  track: Track
  category: CategoryId
  workerGroup: WorkerGroup | null
  invitation: Invitation
  foreignCert: { exam: ExamId; score: number } | null
  kazakhCert: boolean
  experience: { years: number; continuousMonths: number } | null
}

/** Declarative predicate over a Profile, evaluated by domain/applicability.ts. */
export type Rule =
  | { always: true }
  | { all: Rule[] }
  | { any: Rule[] }
  | { not: Rule }
  | { track: Track[] }
  | { category: CategoryId[] }
  | { workerGroup: WorkerGroup[] }
  | { invitation: Invitation[] }
  | { hasForeignCert: boolean }
  /** Foreign certificate meets the threshold required for the profile's category. */
  | { foreignMeets: boolean }
  | { kazakhCert: boolean }
  | { experienceYears: { min: number } }
  | { continuousMonths: { min: number } }
  /** Profile experience satisfies the category's own requirement (years and/or continuous months). */
  | { meetsExperience: boolean }

export type ChapterId = 'prepare' | 'apply' | 'contest' | 'awarded' | 'abroad'

export type StageId =
  | 'eligibility'
  | 'category'
  | 'specialty'
  | 'university'
  | 'kazakh'
  | 'foreign'
  | 'admission'
  | 'documents'
  | 'apply'
  | 'testing'
  | 'interview'
  | 'commission'
  | 'contract'
  | 'language_courses'
  | 'admission_after_courses'
  | 'departure'
  | 'studying'
  | 'return'
  | 'workback'

export type SourceId = string
export type DocId = string

/** User-entered anchor dates that personal deadlines are computed from. */
export type DateKey = 'award_date' | 'study_start' | 'study_end' | 'return_date' | 'work_start'

export interface DeadlineRule {
  id: string
  stage: StageId
  anchor: DateKey
  /** Offset from the anchor; exactly one of days/months is set. */
  days?: number
  months?: number
  /** Recurring every `months` from the anchor (e.g. employment certificates). */
  recurring?: boolean
  label: L
  appliesTo?: Rule
  source: SourceId
}

export interface Source {
  id: SourceId
  title: L
  url: string
  /** Short origin label, e.g. "bolashak.gov.kz" or "adilet.zan.kz". */
  org: string
}

export interface ChecklistItem {
  id: string
  text: L
  /** Required items gate stage completion. Default true. */
  required?: boolean
  link?: SourceId
  appliesTo?: Rule
  /** When the rule matches the profile the item counts as done without a click. */
  autoCompleteWhen?: Rule
}

export interface Deadline {
  text: L
  source: SourceId
}

export interface Stage {
  id: StageId
  chapter: ChapterId
  /** Icon name from the app's own set, resolved in components/StageIcon.tsx */
  icon: string
  /** Light first line of the two-tone heading. */
  kicker: L
  title: L
  /** One-sentence summary for the roadmap card. */
  summary: L
  why: L
  checklist: ChecklistItem[]
  mistakes: L[]
  deadlines?: Deadline[]
  sources: SourceId[]
  /** App's own rough estimate of calendar time, weeks. Never an official term. */
  estimateWeeks?: [number, number]
  appliesTo?: Rule
  autoCompleteWhen?: Rule
  /** Extra explanatory blocks shown only for matching profiles. */
  notes?: { appliesTo?: Rule; tone?: 'info' | 'warn'; text: L; source?: SourceId }[]
}

export interface Chapter {
  id: ChapterId
  title: L
  subtitle: L
}

export interface DocItem {
  id: DocId
  stage: StageId
  title: L
  note?: L
  appliesTo?: Rule
  /** Counts as collected when the onboarding answers already imply it. */
  autoCompleteWhen?: Rule
  source?: SourceId
  /** Downloadable official form, if any. */
  form?: SourceId
}

export type FaqStatus = 'official' | 'confirmed' | 'partial' | 'unverified'

export interface FaqItem {
  id: string
  stage: StageId
  category?: string
  frequency?: number
  status: FaqStatus
  q: L
  a: L
  source: SourceId
}

export interface Category {
  id: CategoryId
  track: Track
  title: L
  short: L
  desc: L
  /** Categories whose admission happens after the award (via language courses). */
  preferential: boolean
  requiresInvitationAtApplication: boolean
  requiresForeignCert: boolean
  /** Which column of the language threshold table applies. */
  languageGroup: 'preferential' | 'self' | 'internship' | 'science' | 'none'
  requirements: { text: L; source: SourceId }[]
  experience?: { years?: number; continuousMonths?: number }
  workBack: L
  sources: SourceId[]
}

export interface LanguageThreshold {
  exam: ExamId
  label: string
  /** Minimum score per threshold level; null when the level does not exist. */
  first: number | null
  second: number | null
  third: number | null
  scale: string
}
