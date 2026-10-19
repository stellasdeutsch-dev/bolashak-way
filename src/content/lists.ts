import type { SourceId } from './types'

/**
 * The two official lists the app can search: priority specialties and recommended
 * universities. The data is a verbatim snapshot of the PDFs on bolashak.gov.kz, imported
 * by scripts/import-lists.mjs — nothing here is written by hand, and every screen that
 * shows it also shows the source link and the day the snapshot was taken.
 */

export interface SpecialtyLevel {
  /** Бакалавриат | Магистратура | Докторантура, as printed. */
  level: string
  /** The list's own code for that level, e.g. "1.1М". */
  code: string
}

export interface PrioritySpecialty {
  /** Number in the list. */
  n: number
  direction: string
  group: string
  ru: string
  levels: SpecialtyLevel[]
  /** The English programme names the list gives as equivalents, separated by "; ". */
  en: string
}

export interface RecommendedUniversity {
  n: number
  name: string
  country: string
  url: string
}

/** A specialty from the separate list for Bolashak internships. */
export interface InternshipSpecialty {
  n: number
  direction: string
  group: string
  name: string
  /** The list's code, e.g. "34Т". */
  code: string
}

/** A top-level area of the research-priorities list ("1. Экология …"). */
export interface ScienceArea {
  code: string
  name: string
}

/** A research direction from the same list, e.g. "3.9 Искусственный интеллект". */
export interface ScienceDirection {
  code: string
  name: string
}

/**
 * A host recommended for scientific internships. Universities name the directions they
 * take; research centres and other organisations take every direction (codes is empty).
 */
export interface ScienceOrg {
  kind: 'university' | 'centre'
  n: number
  name: string
  country: string
  codes: string[]
}

/** Where each list came from, for the source line under the search box. */
export const LIST_SOURCES: { specialties: SourceId; universities: SourceId } = {
  specialties: 'pps2026',
  universities: 'vuzy2026',
}

const norm = (s: string) => s.toLowerCase().replace(/ё/g, 'е').replace(/[^\p{L}\p{N}]+/gu, ' ').trim()

/** Every word of the query has to appear somewhere in the entry, in any order. */
export function matches(haystack: string, query: string): boolean {
  const hay = norm(haystack)
  return norm(query)
    .split(' ')
    .filter(Boolean)
    .every((w) => hay.includes(w))
}

/** The equivalents that actually contain the query, so a hit can show why it matched. */
export function matchingEquivalents(en: string, query: string, limit = 6): string[] {
  const words = norm(query).split(' ').filter(Boolean)
  if (words.length === 0) return []
  return en
    .split(';')
    .map((p) => p.trim())
    .filter((p) => p && words.every((w) => norm(p).includes(w)))
    .slice(0, limit)
}
