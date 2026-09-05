import { CATEGORIES } from '@/content/categories'
import { CHAPTERS, getStage } from '@/content/stages'
import type { CategoryId, ChapterId, Locale, StageId } from '@/content/types'
import { pick } from '@/i18n'

/** Human labels for the ids stored in the progress rows; unknown ids fall back to the id itself. */
export function categoryLabel(id: string | null, locale: Locale): string {
  if (!id) return '—'
  const cat = CATEGORIES[id as CategoryId]
  return cat ? pick(cat.short, locale).text : id
}

export function stageLabel(id: string | null, locale: Locale, done: string): string {
  if (!id) return done
  const st = getStage(id as StageId)
  return st ? pick(st.title, locale).text : id
}

export function chapterOf(stageId: string | null): ChapterId | null {
  if (!stageId) return null
  return getStage(stageId as StageId)?.chapter ?? null
}

export function chapterLabel(id: ChapterId, locale: Locale): string {
  const ch = CHAPTERS.find((c) => c.id === id)
  return ch ? pick(ch.title, locale).text : id
}

export function fmtDate(iso: string | null | undefined, locale: Locale, withTime = false): string {
  if (!iso) return '—'
  const tag = locale === 'en' ? 'en-GB' : locale === 'kk' ? 'kk-KZ' : 'ru-RU'
  return new Date(iso).toLocaleString(tag, withTime ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' })
}
