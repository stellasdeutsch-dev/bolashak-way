import { FAQ } from '@/content/faq'
import type { Locale, Profile, StageId } from '@/content/types'
import { pick } from '@/i18n'
import { applicableItems, applicableStages } from './progress'
import { documentsFor } from './documents'

export type ResultKind = 'stage' | 'checklist' | 'mistake' | 'document' | 'faq'

export interface SearchResult {
  id: string
  kind: ResultKind
  stageId: StageId
  /** Where the click leads. */
  href: string
  title: string
  snippet: string
  score: number
}

export const MIN_QUERY = 2

/** Case- and ё-insensitive, so "слоты" matches "Слоты" and "ёмкость" matches "емкость". */
const norm = (v: string) => v.toLowerCase().replace(/ё/g, 'е').trim()

/** Cuts a readable window around the first match instead of dumping the whole paragraph. */
function snippetAround(text: string, q: string, len = 130): string {
  const i = norm(text).indexOf(q)
  if (i < 0) return text.length > len ? `${text.slice(0, len)}…` : text
  const start = Math.max(0, i - 40)
  const end = Math.min(text.length, start + len)
  return `${start > 0 ? '…' : ''}${text.slice(start, end)}${end < text.length ? '…' : ''}`
}

export function searchAll(query: string, profile: Profile, locale: Locale, limit = 30): SearchResult[] {
  const q = norm(query)
  if (q.length < MIN_QUERY) return []

  const results: SearchResult[] = []
  const stages = applicableStages(profile)
  const stageIds = new Set<StageId>(stages.map((s) => s.id))

  for (const stage of stages) {
    const title = pick(stage.title, locale).text
    const summary = pick(stage.summary, locale).text
    const why = pick(stage.why, locale).text
    const inTitle = norm(title).includes(q)
    const inBody = norm(summary).includes(q) || norm(why).includes(q)
    if (inTitle || inBody) {
      results.push({
        id: `stage:${stage.id}`,
        kind: 'stage',
        stageId: stage.id,
        href: `/stage/${stage.id}`,
        title,
        snippet: snippetAround(norm(summary).includes(q) ? summary : why, q),
        score: inTitle ? 100 : 60,
      })
    }

    for (const item of applicableItems(stage, profile)) {
      const text = pick(item.text, locale).text
      if (norm(text).includes(q)) {
        results.push({ id: `check:${stage.id}:${item.id}`, kind: 'checklist', stageId: stage.id, href: `/stage/${stage.id}`, title, snippet: snippetAround(text, q), score: 50 })
      }
    }

    for (const [i, m] of stage.mistakes.entries()) {
      const text = pick(m, locale).text
      if (norm(text).includes(q)) {
        results.push({ id: `mistake:${stage.id}:${i}`, kind: 'mistake', stageId: stage.id, href: `/stage/${stage.id}`, title, snippet: snippetAround(text, q), score: 40 })
      }
    }
  }

  for (const group of documentsFor(profile)) {
    for (const doc of group.items) {
      const title = pick(doc.title, locale).text
      const note = doc.note ? pick(doc.note, locale).text : ''
      const inTitle = norm(title).includes(q)
      if (inTitle || (note && norm(note).includes(q))) {
        results.push({ id: `doc:${doc.id}`, kind: 'document', stageId: doc.stage, href: '/documents', title, snippet: snippetAround(note || title, q), score: inTitle ? 70 : 45 })
      }
    }
  }

  for (const f of FAQ) {
    if (!stageIds.has(f.stage)) continue
    const q1 = pick(f.q, locale).text
    const a1 = pick(f.a, locale).text
    const inQ = norm(q1).includes(q)
    if (inQ || norm(a1).includes(q)) {
      results.push({ id: `faq:${f.id}`, kind: 'faq', stageId: f.stage, href: `/stage/${f.stage}`, title: q1, snippet: snippetAround(a1, q), score: inQ ? 65 : 35 })
    }
  }

  return results.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit)
}
