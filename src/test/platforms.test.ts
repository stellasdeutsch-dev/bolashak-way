import { describe, expect, it } from 'vitest'
import { STAGES } from '@/content/stages'
import { DOCUMENTS, docForTrack } from '@/content/documents'
import { FAQ } from '@/content/faq'
import { FORMS } from '@/content/forms'
import { DEADLINE_RULES } from '@/content/deadlines'
import { CATEGORIES_BY_TRACK } from '@/content/categories'
import { PLATFORMS, PLATFORM_HOMES, STAGE_PATCHES } from '@/content/platforms'
import { evaluate } from '@/domain/applicability'
import { resolveStage } from '@/domain/resolve'
import { ICON_NAMES } from '@/components/StageIcon'
import { chaptersFor } from '@/content/platforms/chapters'
import { EXCERPTS } from '@/content/excerpts'
import { SOURCE_TRACKS, sourceFits } from '@/content/sources'
import { CONTEST_FLOW } from '@/content/explain'
import type { CategoryId, L, PlatformSlug, Profile, Track } from '@/content/types'

/**
 * Each platform tells only its own programme. These are the words that give another
 * programme away; none of them may appear in what a platform shows its reader.
 */
const MARKERS: Record<'ru' | 'kk' | 'en', Record<PlatformSlug, RegExp>> = {
  ru: {
    bachelor: /бакалавриат|олимпиад|аттестат/i,
    master: /магистратур|льготн|языков\S* курс/i,
    doctorate: /докторантур|резидентур|индивидуальн\S* учебн/i,
    internship: /стажировк|стажёр|стажир/i,
    science: /научн\S* стажир|ПП 791|№ 791|Web of Science|Scopus|аккредит/i,
  },
  kk: {
    bachelor: /бакалавриат|олимпиада|аттестат/i,
    master: /магистратура|жеңілдікті|тіл курс/i,
    doctorate: /докторантура|резидентура|жеке оқу жоспар/i,
    internship: /тағылымдама/i,
    science: /ғылыми тағылымдама|№ 791|Web of Science|Scopus|аккредит/i,
  },
  en: {
    bachelor: /bachelor's (?:track|degree|scholarship|level)|olympiad|school certificate/i,
    master: /master's (?:track|degree|scholarship|level)|preferential|language course/i,
    doctorate: /doctoral|doctorate|residency|individual study plan/i,
    internship: /\bintern(?:ship|s)?\b/i,
    science: /scientific intern|research placement|No\. 791|Web of Science|Scopus|accredit/i,
  },
}

/** Science shows the internship marker by nature ("научная стажировка"); judge it by its own words. */
const SKIP: Partial<Record<PlatformSlug, PlatformSlug[]>> = {
  science: ['internship'],
}

/**
 * Deliberate cross-references, each a rule rather than a leak: the deferral list names
 * doctoral study and industrial placements as grounds for any graduate; a science applicant
 * with unfinished Bolashak-internship work-back is barred (ПП 791 п. 8).
 */
const ALLOWED: string[] = [
  'workback.note:Отсрочку исполнения обязательств',
  'eligibility.check.no_debt:За вами нет невыполненной отработки после прошлой научной стажировки',
]

const profileFor = (track: Track, category: CategoryId): Profile => ({
  track,
  category,
  workerGroup: track === 'internship' ? 'teacher' : null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: false,
  experience: null,
})

function visibleTexts(track: Track, locale: 'ru' | 'kk' | 'en'): [string, string][] {
  const out: [string, string][] = []
  const add = (where: string, l?: L) => l && out.push([where, l[locale] ?? l.ru])
  for (const category of CATEGORIES_BY_TRACK[track]) {
    const p = profileFor(track, category)
    for (const raw of STAGES.filter((s) => evaluate(s.appliesTo, p))) {
      const st = resolveStage(raw, track)
      add(`${st.id}.title`, st.title)
      add(`${st.id}.kicker`, st.kicker)
      add(`${st.id}.summary`, st.summary)
      add(`${st.id}.why`, st.why)
      if (st.inShort) for (const k of ['what', 'you', 'result'] as const) add(`${st.id}.${k}`, st.inShort[k])
      st.mistakes.forEach((m, i) => add(`${st.id}.mistake${i}`, m))
      st.checklist.filter((c) => evaluate(c.appliesTo, p)).forEach((c) => add(`${st.id}.check.${c.id}`, c.text))
      ;(st.notes ?? []).filter((n) => evaluate(n.appliesTo, p)).forEach((n) => add(`${st.id}.note`, n.text))
      ;(st.deadlines ?? []).filter((d) => evaluate(d.appliesTo, p)).forEach((d, i) => add(`${st.id}.deadline${i}`, d.text))
      FAQ.filter((f) => f.stage === st.id && (!f.tracks || f.tracks.includes(track))).forEach((f) => {
        add(`faq.${f.id}.q`, f.q)
        add(`faq.${f.id}.a`, f.a)
      })
    }
    DOCUMENTS.filter((d) => evaluate(d.appliesTo, p)).forEach((d) => {
      add(`doc.${d.id}`, d.title)
      add(`doc.${d.id}.note`, d.note)
    })
    DEADLINE_RULES.filter((d) => evaluate(d.appliesTo, p)).forEach((d) => add(`deadline.${d.id}`, d.label))
    FORMS.filter((f) => evaluate(f.appliesTo, p)).forEach((f) => add(`form.${f.id}`, f.title))
  }
  chaptersFor(track).forEach((ch) => {
    add(`chapter.${ch.id}.title`, ch.title)
    add(`chapter.${ch.id}.subtitle`, ch.subtitle)
  })
  return out
}

describe('five platforms, five stories', () => {
  for (const platform of PLATFORMS) {
    for (const locale of ['ru', 'kk', 'en'] as const) {
      it(`${platform.slug} names no other programme (${locale})`, () => {
        const texts = visibleTexts(platform.track, locale)
        expect(texts.length).toBeGreaterThan(100)
        // The allow-list is written against the Russian text; match the same entries by position.
        const ru = visibleTexts(platform.track, 'ru')
        const leaks: string[] = []
        texts.forEach(([where, text], i) => {
          const ruText = ru[i]?.[1] ?? ''
          if (ALLOWED.some((a) => { const [w, t] = a.split(':'); return (where === w || where.startsWith(w)) && ruText.startsWith(t) })) return
          for (const other of PLATFORMS) {
            if (other.slug === platform.slug || SKIP[platform.slug]?.includes(other.slug)) continue
            if (MARKERS[locale][other.slug].test(text)) leaks.push(`[${other.slug}] ${where}: ${text.slice(0, 110)}`)
          }
        })
        expect([...new Set(leaks)]).toEqual([])
      })
    }
  }

  for (const platform of PLATFORMS) {
    it(`${platform.slug} cites only its own programme's sources`, () => {
      const track = platform.track
      const wrong: string[] = []
      const check = (where: string, id?: string) => {
        if (id && !sourceFits(id, track)) wrong.push(`${where} → ${id}`)
      }
      for (const category of CATEGORIES_BY_TRACK[track]) {
        const p = profileFor(track, category)
        for (const raw of STAGES.filter((st) => evaluate(st.appliesTo, p))) {
          // Raw data first: a mismatch is a content bug even if the resolver hides it.
          const patch = STAGE_PATCHES[track][raw.id]
          ;(patch?.sources ?? raw.sources).forEach((src) => {
            if (!sourceFits(src, track) && !SOURCE_TRACKS[src]?.length) return
          })
          raw.checklist
            .filter((c) => evaluate(c.appliesTo, p))
            .forEach((c) => check(`${raw.id}.check.${c.id}.link`, patch?.links && c.id in patch.links ? (patch.links[c.id] ?? undefined) : c.link))
          ;(raw.notes ?? []).filter((n) => evaluate(n.appliesTo, p)).forEach((n, i) => check(`${raw.id}.note${i}`, n.source))
          ;(raw.deadlines ?? []).filter((d) => evaluate(d.appliesTo, p)).forEach((d, i) => check(`${raw.id}.deadline${i}`, d.source))
        }
        DOCUMENTS.filter((d) => evaluate(d.appliesTo, p))
          .map((d) => docForTrack(d, track))
          .forEach((d) => {
            check(`doc.${d.id}.source`, d.source)
            check(`doc.${d.id}.form`, d.form)
          })
        DEADLINE_RULES.filter((d) => evaluate(d.appliesTo, p)).forEach((d) => check(`deadline.${d.id}`, d.source))
        const stageIds = new Set(STAGES.filter((st) => evaluate(st.appliesTo, p)).map((st) => st.id))
        EXCERPTS.filter((e) => stageIds.has(e.stage) && evaluate(e.appliesTo, p)).forEach((e) => check(`excerpt.${e.id}`, e.source))
        CONTEST_FLOW.filter((f) => evaluate(f.appliesTo, p)).forEach((f) => {
          check(`flow.${f.id}`, f.source)
          check(`flow.${f.id}.exit`, f.exit?.source)
        })
      }
      FAQ.filter((f) => !f.tracks || f.tracks.includes(track)).forEach((f) => check(`faq.${f.id}`, f.source))
      expect([...new Set(wrong)]).toEqual([])
    })
  }

  it('every platform has a complete front page', () => {
    for (const p of PLATFORMS) {
      const home = PLATFORM_HOMES[p.slug]
      expect(home.facts.length).toBeGreaterThanOrEqual(3)
      expect(home.fitYes.length).toBeGreaterThan(0)
      expect(home.fitNo.every((n) => n.go !== p.slug)).toBe(true)
      expect(home.coverage.length).toBeGreaterThan(3)
    }
  })

  it('patches only name stages, checklist items and icons that exist', () => {
    for (const [track, patches] of Object.entries(STAGE_PATCHES)) {
      for (const [id, patch] of Object.entries(patches)) {
        const stage = STAGES.find((s) => s.id === id)
        expect(stage, `${track}: no stage ${id}`).toBeDefined()
        for (const item of Object.keys(patch!.checklist ?? {})) {
          expect(stage!.checklist.some((c) => c.id === item), `${track}: ${id} has no item ${item}`).toBe(true)
        }
        if (patch!.icon) expect(ICON_NAMES).toContain(patch!.icon)
      }
    }
    for (const p of PLATFORMS) expect(ICON_NAMES).toContain(p.icon)
  })

  it('patches carry all three languages', () => {
    const missing: string[] = []
    const check = (where: string, l: L) => {
      if (!l.kk || !l.en) missing.push(where)
    }
    for (const [track, patches] of Object.entries(STAGE_PATCHES)) {
      for (const [id, p] of Object.entries(patches)) {
        for (const k of ['kicker', 'title', 'summary', 'why'] as const) if (p![k]) check(`${track}.${id}.${k}`, p![k]!)
        if (p!.inShort) for (const [k, v] of Object.entries(p!.inShort)) check(`${track}.${id}.${k}`, v)
        p!.mistakes?.forEach((m, i) => check(`${track}.${id}.mistake${i}`, m))
        for (const [k, v] of Object.entries(p!.checklist ?? {})) check(`${track}.${id}.${k}`, v)
      }
    }
    expect(missing).toEqual([])
  })
})
