import { PLATFORM_SLUG_IDS, type L, type PlatformHome, type PlatformSlug, type SourceId, type StagePatch, type StagePatches, type Track } from '../types'
import type { DegreeLevel } from '../lists'
import { ACADEMIC_STAGES } from './shared'
import { KAZAKH_REQUIREMENT } from '../language'
import { BACHELOR_HOME, BACHELOR_STAGES } from './bachelor'
import { MASTER_HOME, MASTER_STAGES } from './master'
import { DOCTORATE_HOME, DOCTORATE_STAGES } from './doctorate'
import { INTERNSHIP_HOME, INTERNSHIP_STAGES } from './internship'
import { SCIENCE_HOME, SCIENCE_STAGES } from './science'

/**
 * The five programmes, each a platform of its own: its own address, colour, front page and
 * wording. Two programmes administered by the same Center sit behind them – the Bolashak
 * scholarship (ПП 573: the first four) and scientific internships (приказ МНВО № 422).
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
  /**
   * The official lists it searches: degree specialties at its own level together with the
   * university list, the internship specialty list (no university list exists for
   * internships), or research directions with the hosts that take them.
   */
  lists: { kind: 'degree'; level: DegreeLevel } | { kind: 'internship' } | { kind: 'science' }
  /** The act its rules come from – cited under the work-back terms. */
  rulesSource: SourceId
  /** Where its Kazakh-language minimum is set. */
  kazakhSource: SourceId
  /** Its categories split into two lanes (self-admitted, preferential) worth drawing. */
  lanes?: boolean
}

const BOLASHAK = 'bolashak' as const

export const PLATFORMS: PlatformMeta[] = [
  {
    slug: 'bachelor',
    track: 'bachelor',
    icon: 'School',
    programme: BOLASHAK,
    lists: { kind: 'degree', level: 'Бакалавриат' },
    rulesSource: 'pp573',
    kazakhSource: KAZAKH_REQUIREMENT.source,
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
    lists: { kind: 'degree', level: 'Магистратура' },
    rulesSource: 'pp573',
    kazakhSource: KAZAKH_REQUIREMENT.source,
    lanes: true,
    name: { ru: 'Магистратура', kk: 'Магистратура', en: "Master's" },
    tagline: {
      ru: 'Самостоятельно поступившим и пяти льготным категориям: село, ИТР, медики, госслужащие, атомная отрасль',
      kk: 'Өз бетінше түскендерге және бес жеңілдікті санатқа: ауыл, ИТҚ, медиктер, мемқызметшілер, атом саласы',
      en: 'For self-admitted applicants and five preferential categories: rural, engineers, medics, civil servants, nuclear industry',
    },
  },
  {
    slug: 'doctorate',
    track: 'phd_residency',
    icon: 'Landmark',
    programme: BOLASHAK,
    lists: { kind: 'degree', level: 'Докторантура' },
    rulesSource: 'pp573',
    kazakhSource: KAZAKH_REQUIREMENT.source,
    name: { ru: 'Докторантура и резидентура', kk: 'Докторантура және резидентура', en: 'Doctorate and residency' },
    tagline: {
      ru: 'PhD, доктор по профилю или резидентура – с приглашением из вуза Списка',
      kk: 'PhD, бейіні бойынша доктор не резидентура – Тізімдегі ЖОО шақыруымен',
      en: 'PhD, professional doctorate or residency – with an offer from a listed university',
    },
  },
  {
    slug: 'internship',
    track: 'internship',
    icon: 'Briefcase',
    programme: BOLASHAK,
    lists: { kind: 'internship' },
    rulesSource: 'pp573',
    kazakhSource: KAZAKH_REQUIREMENT.source,
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
    lists: { kind: 'science' },
    rulesSource: 'ns_rules422',
    kazakhSource: 'ns_minscore',
    name: { ru: 'Научная стажировка', kk: 'Ғылыми тағылымдама', en: 'Scientific internship' },
    tagline: {
      ru: 'От 3 до 12 месяцев в зарубежном научном центре или вузе – для учёных со степенью',
      kk: 'Дәрежесі бар ғалымдарға шетелдік ғылыми орталықта не ЖОО-да 3-тен 12 айға дейін',
      en: 'Three to twelve months at a foreign research centre or university – for researchers with a degree',
    },
  },
]

export const isPlatformSlug = (s: string | undefined): s is PlatformSlug => !!s && (PLATFORM_SLUG_IDS as readonly string[]).includes(s)

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
