/**
 * Content model. Everything the app shows about the Bolashak procedure lives in
 * `src/content/*` as typed data. No facts are hard-coded in components.
 */

/*
 * Every closed list of ids is written once, as a const array; its type is derived from it.
 * Saved plans are checked against these arrays when they load, so a programme, language or
 * date added here is accepted everywhere at once – and one left out is a compile error in
 * any Record keyed by it, not a plan that silently disappears on reload.
 */

export const LOCALE_IDS = ['ru', 'kk', 'en'] as const
export type Locale = (typeof LOCALE_IDS)[number]
export const isLocale = (v: unknown): v is Locale => (LOCALE_IDS as readonly unknown[]).includes(v)

/** Localised string. `ru` is the canonical source, other locales fall back to it. */
export type L = { ru: string; kk?: string; en?: string }

export const TRACKS = ['bachelor', 'master', 'phd_residency', 'internship', 'science_internship'] as const
export type Track = (typeof TRACKS)[number]

/** In the order the categories are listed (content/categories.ts keeps the same order). */
export const CATEGORY_IDS = [
  'bachelor',
  'master_self',
  'master_rural',
  'master_engineer',
  'master_medical',
  'master_civil',
  'master_nuclear',
  'phd_self',
  'phd_nuclear',
  'residency',
  'internship',
  'science_internship',
] as const
export type CategoryId = (typeof CATEGORY_IDS)[number]

/** Worker categories admitted to Bolashak internships (bolashak.gov.kz/ru/pretendentu/pravila). */
export const WORKER_GROUP_IDS = ['engineer_agro', 'teacher', 'medical', 'civil', 'media', 'culture', 'judge', 'ai_user', 'nuclear'] as const
export type WorkerGroup = (typeof WORKER_GROUP_IDS)[number]

export const EXAM_IDS = ['ielts', 'toefl_ibt', 'toefl_pbt', 'det', 'other'] as const
export type ExamId = (typeof EXAM_IDS)[number]

/** Which column of the language threshold table applies to a category. */
export const LANGUAGE_GROUPS = ['preferential', 'self', 'internship', 'science', 'none'] as const
export type LanguageGroup = (typeof LANGUAGE_GROUPS)[number]

/**
 * What the questions ask: the programme and the direction (with the worker group for an
 * internship). Plans saved before also carry invitation, certificate and experience
 * answers; the app stopped asking those, and reads such plans without them.
 */
export interface Profile {
  track: Track
  category: CategoryId
  workerGroup: WorkerGroup | null
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
export const DATE_KEYS = ['award_date', 'study_start', 'study_end', 'return_date', 'work_start'] as const
export type DateKey = (typeof DATE_KEYS)[number]

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
  appliesTo?: Rule
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
  /**
   * Plain-language orientation shown at the very top of the stage, before anything else:
   * what this stage actually is, what it wants from you, and what you walk away with.
   */
  inShort?: { what: L; you: L; result: L }
  checklist: ChecklistItem[]
  mistakes: L[]
  deadlines?: Deadline[]
  sources: SourceId[]
  /** App's own rough estimate of calendar time, weeks. Never an official term. */
  estimateWeeks?: [number, number]
  appliesTo?: Rule
  /** Extra explanatory blocks shown only for matching profiles. */
  notes?: { appliesTo?: Rule; tone?: 'info' | 'warn'; text: L; source?: SourceId }[]
}

/** One official upload of a video, in the language it is spoken in. */
export interface VideoClip {
  lang: 'ru' | 'kk'
  /** Video id on the Center for International Programmes' own YouTube channel. */
  youtubeId: string
  /** Title exactly as published on the channel. Never translated or paraphrased. */
  title: string
  /** Upload date on the channel (ISO), shown so the viewer can judge how current it is. */
  published: string
  durationSec: number
}

/**
 * An official video. The same recording is often published twice – once in Russian,
 * once in Kazakh – so one item holds every language variant of it.
 */
export interface VideoItem {
  id: string
  /** Stage it belongs to. Items without a stage are overview videos shown on the About page. */
  stage?: StageId
  clips: VideoClip[]
  appliesTo?: Rule
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
  source?: SourceId
  /** Downloadable official form, if any. */
  form?: SourceId
  /** Where a programme's own page says the same thing, cite that one instead. */
  sourceFor?: Partial<Record<Track, SourceId>>
  formFor?: Partial<Record<Track, SourceId>>
}

export type FaqStatus = 'official' | 'confirmed' | 'partial' | 'unverified'

export interface FaqItem {
  id: string
  stage: StageId
  /** Programmes the answer is true for. Omitted only when it holds for all five. */
  tracks?: Track[]
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
  languageGroup: LanguageGroup
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
  /** Human-readable scale, e.g. "из 9.0". */
  scale: string
  /** The same ceiling as a number, so a score can be drawn on the scale. */
  max: number
}

/* ─────────────  platforms  ───────────── */

/** URL slug of a programme platform: /#/master, /#/science … */
export const PLATFORM_SLUG_IDS = ['bachelor', 'master', 'doctorate', 'internship', 'science'] as const
export type PlatformSlug = (typeof PLATFORM_SLUG_IDS)[number]

/**
 * What one platform says differently about a shared stage. The stage skeleton (ids,
 * checklist ids, rules) stays shared so progress keeps working; the words a reader of
 * that programme sees come from here. A field left out falls back to the stage's own,
 * which is written to be true for every programme and names none of them.
 */
export interface StagePatch {
  icon?: string
  kicker?: L
  title?: L
  summary?: L
  why?: L
  inShort?: { what: L; you: L; result: L }
  /** Replaces the stage's mistakes entirely. */
  mistakes?: L[]
  /** Replaces the text of checklist items by id. */
  checklist?: Record<string, L>
  /** Replaces the source link of checklist items by id, where the shared one is another programme's. */
  links?: Record<string, SourceId | null>
  sources?: SourceId[]
}

export type StagePatches = Partial<Record<StageId, StagePatch>>

/** A figure worth seeing before any paragraph, with the act it comes from. */
export interface PlatformFact {
  value: string
  caption: L
  source: SourceId
}

/** The programme's own front page: what it is, who it is for, what it pays, what it asks. */
export interface PlatformHome {
  /** One paragraph for someone who has never heard of the programme. */
  intro: L
  facts: PlatformFact[]
  /** "This is your programme if …" */
  fitYes: L[]
  /** "… and it is not if" – each pointing at the platform that fits instead. */
  fitNo: { text: L; go: PlatformSlug }[]
  fitSources: SourceId[]
  /** What the programme pays for, in plain words. */
  coverage: L[]
  coverageSource: SourceId
  coverageNote?: L
  /** Where the note comes from, when that is not the coverage source. */
  coverageNoteSource?: SourceId
}
