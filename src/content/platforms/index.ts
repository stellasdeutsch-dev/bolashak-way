import type { L, PlatformHome, PlatformSlug, StagePatch, StagePatches, Track } from '../types'
import { ACADEMIC_STAGES } from './shared'
import { BACHELOR_HOME, BACHELOR_STAGES } from './bachelor'
import { MASTER_HOME, MASTER_STAGES } from './master'
import { DOCTORATE_HOME, DOCTORATE_STAGES } from './doctorate'
import { INTERNSHIP_HOME, INTERNSHIP_STAGES } from './internship'
import { SCIENCE_HOME, SCIENCE_STAGES } from './science'

/**
 * The five programmes, each a platform of its own: its own address, colour, front page and
 * wording. Two programmes administered by the same Center sit behind them — the Bolashak
 * scholarship (ПП 573: the first four) and scientific internships (ПП 791).
 */
export interface PlatformMeta {
  slug: PlatformSlug
  track: Track
  /** Name from the app's own icon set, resolved by StageIcon. */
  icon: string
  name: L
  /** Which programme the platform belongs to. */
  programme: 'bolashak' | 'science'
  /** One line on who it is for, used on the chooser cards. */
  tagline: L
}

const BOLASHAK = 'bolashak' as const

export const PLATFORMS: PlatformMeta[] = [
  {
    slug: 'bachelor',
    track: 'bachelor',
    icon: 'School',
    programme: BOLASHAK,
    name: { ru: 'Бакалавриат', kk: 'Бакалавриат', en: "Bachelor's" },
    tagline: {
      ru: 'Для призёров международных олимпиад и конкурсов, поступивших в ведущий вуз',
      kk: 'Жетекші ЖОО-ға түскен халықаралық олимпиада мен конкурс жүлдегерлеріне',
      en: 'For international olympiad and contest medallists admitted to a leading university',
    },
  },
  {
    slug: 'master',
    track: 'master',
    icon: 'GraduationCap',
    programme: BOLASHAK,
    name: { ru: 'Магистратура', kk: 'Магистратура', en: "Master's" },
    tagline: {
      ru: 'Самостоятельно поступившим и пяти льготным категориям: село, ИТР, медики, госслужащие, атомщики',
      kk: 'Өз бетінше түскендерге және бес жеңілдікті санатқа: ауыл, ИТҚ, медиктер, мемқызметшілер, атомшылар',
      en: 'For self-admitted applicants and five preferential categories: rural, engineers, medics, civil servants, nuclear',
    },
  },
  {
    slug: 'doctorate',
    track: 'phd_residency',
    icon: 'Landmark',
    programme: BOLASHAK,
    name: { ru: 'Докторантура и резидентура', kk: 'Докторантура және резидентура', en: 'Doctorate and residency' },
    tagline: {
      ru: 'PhD, доктор по профилю или резидентура — с приглашением из вуза Списка',
      kk: 'PhD, бейіні бойынша доктор не резидентура — Тізімдегі ЖОО шақыруымен',
      en: 'PhD, professional doctorate or residency — with an offer from a listed university',
    },
  },
  {
    slug: 'internship',
    track: 'internship',
    icon: 'Briefcase',
    programme: BOLASHAK,
    name: { ru: 'Стажировка', kk: 'Тағылымдама', en: 'Internship' },
    tagline: {
      ru: 'До 12 месяцев за рубежом для работников девяти категорий со стажем',
      kk: 'Өтілі бар тоғыз санаттағы қызметкерлерге шетелде 12 айға дейін',
      en: 'Up to 12 months abroad for experienced workers in nine categories',
    },
  },
  {
    slug: 'science',
    track: 'science_internship',
    icon: 'FlaskConical',
    programme: 'science',
    name: { ru: 'Научная стажировка', kk: 'Ғылыми тағылымдама', en: 'Scientific internship' },
    tagline: {
      ru: 'От 3 до 12 месяцев в зарубежном научном центре или вузе — для учёных со степенью',
      kk: 'Дәрежесі бар ғалымдарға шетелдік ғылыми орталықта не ЖОО-да 3-тен 12 айға дейін',
      en: 'Three to twelve months at a foreign research centre or university — for researchers with a degree',
    },
  },
]

export const PLATFORM_SLUGS = PLATFORMS.map((p) => p.slug)

export const isPlatformSlug = (s: string | undefined): s is PlatformSlug => !!s && (PLATFORM_SLUGS as string[]).includes(s)

export const getPlatform = (slug: PlatformSlug): PlatformMeta => PLATFORMS.find((p) => p.slug === slug)!

export const platformForTrack = (track: Track): PlatformMeta => PLATFORMS.find((p) => p.track === track)!

/** Shared wording first, the platform's own on top; checklist texts merge item by item. */
function merge(base: StagePatches, own: StagePatches): StagePatches {
  const out: StagePatches = { ...base }
  for (const [id, patch] of Object.entries(own) as [keyof StagePatches, StagePatch][]) {
    const under = out[id]
    out[id] = under ? { ...under, ...patch, checklist: { ...under.checklist, ...patch.checklist } } : patch
  }
  return out
}

export const STAGE_PATCHES: Record<Track, StagePatches> = {
  bachelor: merge(ACADEMIC_STAGES, BACHELOR_STAGES),
  master: merge(ACADEMIC_STAGES, MASTER_STAGES),
  phd_residency: merge(ACADEMIC_STAGES, DOCTORATE_STAGES),
  internship: INTERNSHIP_STAGES,
  science_internship: SCIENCE_STAGES,
}

export const PLATFORM_HOMES: Record<PlatformSlug, PlatformHome> = {
  bachelor: BACHELOR_HOME,
  master: MASTER_HOME,
  doctorate: DOCTORATE_HOME,
  internship: INTERNSHIP_HOME,
  science: SCIENCE_HOME,
}
