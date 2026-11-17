import { describe, expect, it } from 'vitest'
import { TERMS } from '@/content/terms'
import { SOURCES } from '@/content/sources'
import { DEADLINE_RULES } from '@/content/deadlines'
import { awardTimeline } from '@/content/explain'
import { WORKER_GROUPS } from '@/content/categories'
import { PLATFORMS } from '@/content/platforms'
import { chaptersFor } from '@/content/platforms/chapters'
import { experienceRequirement } from '@/domain/applicability'
import { LOCALE_IDS, type L } from '@/content/types'

/** Every localised text in the content, with where it sits. */
function allTexts(): { where: string; text: L }[] {
  const modules = import.meta.glob(['../content/**/*.ts', '!../content/lists*.ts'], { eager: true }) as Record<string, Record<string, unknown>>
  const out: { where: string; text: L }[] = []
  const seen = new Set<unknown>()
  const walk = (v: unknown, where: string) => {
    if (!v || typeof v !== 'object' || seen.has(v)) return
    seen.add(v)
    const o = v as Record<string, unknown>
    if (typeof o.ru === 'string') return void out.push({ where, text: o as L })
    for (const [k, x] of Object.entries(o)) walk(x, `${where}.${k}`)
  }
  for (const [file, exports] of Object.entries(modules)) for (const [name, value] of Object.entries(exports)) walk(value, `${file.replace('../content/', '')}:${name}`)
  // built per programme, out of the walker's reach
  for (const p of PLATFORMS) {
    walk(awardTimeline(p.track), `awardTimeline(${p.track})`)
    walk(chaptersFor(p.track), `chaptersFor(${p.track})`)
  }
  return out
}

/** Sentences that say the figure must say the same number in all three languages. */
function expectSaid(texts: { where: string; text: L }[], value: number) {
  const n = new RegExp(`(^|\\D)${value}(\\D|$)`)
  const wrong: string[] = []
  for (const { where, text } of texts) for (const l of LOCALE_IDS) if (!n.test(text[l] ?? '')) wrong.push(`${where} [${l}]: ${(text[l] ?? '–').slice(0, 90)}`)
  expect(wrong).toEqual([])
}

describe('rule figures (content/terms.ts)', () => {
  it('cite sources that exist', () => {
    for (const [name, term] of Object.entries(TERMS)) for (const src of term.sources) expect(SOURCES, name).toHaveProperty(src)
  })

  it('the contract window: the code counts with it', () => {
    const days = TERMS.contractWindowDays.value
    for (const id of ['contract', 'contract_ns']) expect(DEADLINE_RULES.find((r) => r.id === id)?.days, id).toBe(days)
    for (const p of PLATFORMS) {
      const timeline = awardTimeline(p.track)
      expect(timeline.total, p.slug).toBe(days)
      expect(Math.max(...timeline.marks.map((m) => m.day)), p.slug).toBe(days)
    }
  })

  it('the contract window: every sentence about it says the same number in ru, kk and en', () => {
    // "N (calendar) days" together with the contract, pledge or guarantors.
    const days = /(\d+)\s+(?:календарн\S*\s+)?(?:дн|дней)/
    const texts = allTexts().filter(({ text }) => days.test(text.ru) && /договор|залог|гарант/i.test(text.ru))
    expect(texts.length).toBeGreaterThanOrEqual(10)
    for (const { where, text } of texts) expect(Number(days.exec(text.ru)![1]), where).toBe(TERMS.contractWindowDays.value)
    expectSaid(texts, TERMS.contractWindowDays.value)
  })

  it('the short continuous term of an internship: the code counts with it', () => {
    const months = TERMS.internshipShortContinuousMonths.value
    for (const id of ['ai_user', 'nuclear'] as const) {
      expect(WORKER_GROUPS.find((g) => g.id === id)?.shortMonths, id).toBe(months)
      expect(experienceRequirement({ track: 'internship', category: 'internship', workerGroup: id })?.continuousMonths, id).toBe(months)
    }
  })

  it('the short continuous term of an internship: every sentence about it says the number in ru, kk and en', () => {
    // The internship texts that name the AI-system users' exception.
    const texts = allTexts().filter(({ where, text }) => /internship/i.test(where) && /интеллект|(^|[^А-Яа-яЁё])ИИ([^А-Яа-яЁё]|$)/.test(text.ru) && /мес/.test(text.ru))
    expect(texts.length).toBeGreaterThanOrEqual(2)
    expectSaid(texts, TERMS.internshipShortContinuousMonths.value)
  })
})
