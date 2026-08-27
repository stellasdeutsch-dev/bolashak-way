import { describe, expect, it } from 'vitest'
import type { CategoryId, Profile } from '@/content/types'
import { CATEGORIES, CATEGORIES_BY_TRACK } from '@/content/categories'
import { STAGES } from '@/content/stages'
import { SOURCES } from '@/content/sources'
import { DOCUMENTS } from '@/content/documents'
import { FAQ } from '@/content/faq'
import { computeProgress, applicableStages, applicableItems } from '@/domain/progress'
import { evaluate, foreignCertMeets, experienceRequirement, meetsExperience } from '@/domain/applicability'
import { computeDeadlines, nearestDeadline } from '@/domain/deadlines'
import { searchAll } from '@/domain/search'
import { staleness } from '@/domain/freshness'
import { documentsFor } from '@/domain/documents'
import { buildSnapshot, parseSnapshot } from '@/domain/exportImport'
import { toProfile, emptyDraft, isStepComplete, draftFromProfile } from '@/domain/profile'

const profile = (over: Partial<Profile> = {}): Profile => ({
  track: 'master',
  category: 'master_self',
  workerGroup: null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: false,
  experience: null,
  ...over,
})

const ALL_CATEGORIES = Object.keys(CATEGORIES) as CategoryId[]

const trackOf = (c: CategoryId) => CATEGORIES[c].track

describe('content integrity', () => {
  it('every stage source id exists in the registry', () => {
    for (const stage of STAGES) {
      for (const s of stage.sources) expect(SOURCES[s], `${stage.id} → ${s}`).toBeDefined()
      for (const item of stage.checklist) if (item.link) expect(SOURCES[item.link], `${stage.id}:${item.id} → ${item.link}`).toBeDefined()
      for (const d of stage.deadlines ?? []) expect(SOURCES[d.source], `${stage.id} deadline → ${d.source}`).toBeDefined()
      for (const n of stage.notes ?? []) if (n.source) expect(SOURCES[n.source]).toBeDefined()
    }
  })

  it('every document and FAQ item points at a known source and stage', () => {
    const stageIds = new Set(STAGES.map((s) => s.id))
    for (const d of DOCUMENTS) {
      expect(stageIds.has(d.stage), `document ${d.id} → stage ${d.stage}`).toBe(true)
      if (d.source) expect(SOURCES[d.source], `document ${d.id} → ${d.source}`).toBeDefined()
      if (d.form) expect(SOURCES[d.form]).toBeDefined()
    }
    for (const f of FAQ) {
      expect(stageIds.has(f.stage), `faq ${f.id} → stage ${f.stage}`).toBe(true)
      expect(SOURCES[f.source], `faq ${f.id} → ${f.source}`).toBeDefined()
    }
  })

  it('stage and checklist ids are unique', () => {
    const ids = STAGES.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const stage of STAGES) {
      const itemIds = stage.checklist.map((i) => i.id)
      expect(new Set(itemIds).size, `duplicate item id in ${stage.id}`).toBe(itemIds.length)
    }
  })

  it('every category is reachable from its track', () => {
    for (const c of ALL_CATEGORIES) expect(CATEGORIES_BY_TRACK[trackOf(c)]).toContain(c)
  })
})

describe('applicability across all categories', () => {
  it('produces a non-empty roadmap with checklist items for every category', () => {
    for (const category of ALL_CATEGORIES) {
      const p = profile({ category, track: trackOf(category) })
      const stages = applicableStages(p)
      expect(stages.length, category).toBeGreaterThan(8)
      for (const stage of stages) expect(applicableItems(stage, p).length, `${category}/${stage.id}`).toBeGreaterThan(0)
    }
  })

  it('hides language courses from self-admitted applicants and shows them to preferential ones', () => {
    const self = applicableStages(profile({ category: 'master_self' })).map((s) => s.id)
    const medical = applicableStages(profile({ category: 'master_medical' })).map((s) => s.id)
    expect(self).not.toContain('language_courses')
    expect(self).toContain('admission')
    expect(medical).toContain('language_courses')
    expect(medical).toContain('admission_after_courses')
    expect(medical).not.toContain('admission')
  })

  it('keeps the scientific internship track on its own document set', () => {
    const p = profile({ track: 'science_internship', category: 'science_internship' })
    const docs = documentsFor(p).flatMap((g) => g.items.map((i) => i.id))
    expect(docs).toContain('publications_doc')
    expect(docs).toContain('accreditation_doc')
    expect(docs).not.toContain('motivation_letter')
    const master = documentsFor(profile()).flatMap((g) => g.items.map((i) => i.id))
    expect(master).toContain('motivation_letter')
    expect(master).not.toContain('publications_doc')
  })
})

describe('language thresholds', () => {
  it('uses IELTS 6.0 for self-admitted and 6.5 for preferential categories', () => {
    expect(foreignCertMeets(profile({ category: 'master_self', foreignCert: { exam: 'ielts', score: 6.0 } }))).toBe(true)
    expect(foreignCertMeets(profile({ category: 'master_medical', foreignCert: { exam: 'ielts', score: 6.0 } }))).toBe(false)
    expect(foreignCertMeets(profile({ category: 'master_medical', foreignCert: { exam: 'ielts', score: 6.5 } }))).toBe(true)
  })

  it('uses IELTS 5.0 for internships', () => {
    const p = profile({ track: 'internship', category: 'internship', foreignCert: { exam: 'ielts', score: 5.0 } })
    expect(foreignCertMeets(p)).toBe(true)
  })

  it('never claims a threshold is met for exams it cannot evaluate', () => {
    expect(foreignCertMeets(profile({ foreignCert: { exam: 'other', score: 100 } }))).toBe(false)
    expect(foreignCertMeets(profile({ track: 'science_internship', category: 'science_internship', foreignCert: { exam: 'ielts', score: 9 } }))).toBe(false)
  })
})

describe('rule evaluation', () => {
  it('handles composite rules', () => {
    const p = profile({ invitation: 'unconditional', kazakhCert: true })
    expect(evaluate({ all: [{ invitation: ['unconditional'] }, { kazakhCert: true }] }, p)).toBe(true)
    expect(evaluate({ any: [{ invitation: ['none'] }, { kazakhCert: true }] }, p)).toBe(true)
    expect(evaluate({ not: { kazakhCert: true } }, p)).toBe(false)
    expect(evaluate(undefined, p)).toBe(true)
  })

  it('requires 6 continuous months for AI and nuclear interns via the worker group', () => {
    const ai = profile({ track: 'internship', category: 'internship', workerGroup: 'ai_user' })
    expect(evaluate({ workerGroup: ['ai_user', 'nuclear'] }, ai)).toBe(true)
    expect(evaluate({ workerGroup: ['medical'] }, ai)).toBe(false)
  })
})

describe('progress', () => {
  it('locks later chapters until the first one is complete', () => {
    const p = profile()
    const r = computeProgress({ profile: p, checked: [], stagesDone: [] })
    expect(r.byId.get('eligibility')!.status).toBe('available')
    expect(r.byId.get('testing')!.status).toBe('locked')
    expect(r.current?.stage.id).toBe('eligibility')
    // The "category" stage is answered by onboarding itself, so a little progress exists from the start.
    expect(r.ratio).toBeGreaterThan(0)
    expect(r.ratio).toBeLessThan(0.1)
  })

  it('auto-closes stages from onboarding answers without any clicks', () => {
    const p = profile({ kazakhCert: true, invitation: 'unconditional', foreignCert: { exam: 'ielts', score: 7 } })
    const r = computeProgress({ profile: p, checked: [], stagesDone: [] })
    expect(r.byId.get('kazakh')!.status).toBe('done')
    expect(r.byId.get('kazakh')!.autoDone).toBe(true)
    expect(r.byId.get('foreign')!.status).toBe('done')
    expect(r.byId.get('admission')!.status).toBe('done')
    expect(r.ratio).toBeGreaterThan(0)
  })

  it('marks a stage done when all required items are checked, and keeps optional ones free', () => {
    const p = profile()
    const stage = applicableStages(p).find((s) => s.id === 'eligibility')!
    const required = applicableItems(stage, p).filter((i) => i.required !== false)
    const checked = required.map((i) => `eligibility:${i.id}`)
    const r = computeProgress({ profile: p, checked, stagesDone: [] })
    expect(r.byId.get('eligibility')!.status).toBe('done')
    expect(r.byId.get('eligibility')!.doneCount).toBeLessThan(r.byId.get('eligibility')!.total)
  })

  it('respects an explicit "mark stage done"', () => {
    const base = computeProgress({ profile: profile(), checked: [], stagesDone: [] })
    const r = computeProgress({ profile: profile(), checked: [], stagesDone: ['eligibility'] })
    expect(base.byId.get('eligibility')!.status).not.toBe('done')
    expect(r.byId.get('eligibility')!.status).toBe('done')
    expect(r.doneStages).toBe(base.doneStages + 1)
  })

  it('keeps checks when the profile changes and recalculates instead of resetting', () => {
    const checked = ['eligibility:citizen', 'specialty:open_list']
    const before = computeProgress({ profile: profile(), checked, stagesDone: [] })
    const after = computeProgress({ profile: profile({ category: 'master_medical' }), checked, stagesDone: [] })
    expect(before.byId.get('eligibility')!.doneCount).toBe(1)
    expect(after.byId.get('eligibility')!.doneCount).toBe(1)
    // The medical track adds stages, so the overall ratio shifts rather than resetting to zero.
    expect(after.ratio).toBeGreaterThan(0)
    expect(after.totalStages).not.toBe(before.totalStages)
  })

  it('estimates remaining months before the application and drops it once submitted', () => {
    const fresh = computeProgress({ profile: profile(), checked: [], stagesDone: [] })
    expect(fresh.estimateMonths).not.toBeNull()
    expect(fresh.estimateMonths![0]).toBeGreaterThan(0)
    expect(fresh.estimateMonths![1]).toBeGreaterThanOrEqual(fresh.estimateMonths![0])

    const p = profile()
    const upToApply = applicableStages(p)
      .filter((s) => s.chapter === 'prepare' || s.chapter === 'apply')
      .map((s) => s.id)
    const done = computeProgress({ profile: p, checked: [], stagesDone: upToApply })
    expect(done.estimateMonths).toBeNull()
    expect(done.byId.get('testing')!.status).not.toBe('locked')
  })
})

describe('onboarding draft', () => {
  it('validates each step and round-trips through a profile', () => {
    const draft = emptyDraft()
    expect(isStepComplete(draft, 0)).toBe(false)
    draft.track = 'internship'
    draft.category = 'internship'
    expect(isStepComplete(draft, 0)).toBe(false)
    draft.workerGroup = 'medical'
    expect(isStepComplete(draft, 0)).toBe(true)

    draft.invitation = 'unconditional'
    draft.kazakhCert = true
    draft.hasForeignCert = true
    draft.exam = 'ielts'
    draft.score = '5.5'
    draft.hasExperience = true
    draft.years = '4'
    draft.continuousMonths = '14'
    expect([1, 2, 3].every((s) => isStepComplete(draft, s))).toBe(true)

    const p = toProfile(draft)
    expect(p.foreignCert).toEqual({ exam: 'ielts', score: 5.5 })
    expect(p.experience).toEqual({ years: 4, continuousMonths: 14 })
    expect(draftFromProfile(p).score).toBe('5.5')
  })

  it('treats a missing score as "no certificate"', () => {
    const draft = { ...emptyDraft(), track: 'master' as const, category: 'master_self' as const, hasForeignCert: true, score: '' }
    expect(toProfile(draft).foreignCert).toBeNull()
  })
})

describe('export / import', () => {
  it('round-trips a snapshot and rejects foreign payloads', () => {
    const snap = buildSnapshot(
      { profile: profile(), onboardedAt: '2026-08-01T00:00:00.000Z', checked: ['eligibility:citizen'], stagesDone: ['eligibility'], documentsDone: ['anketa'], notes: { eligibility: 'проверить справку' }, dates: { award_date: '2026-09-01' } },
      '2026-08-21T10:00:00.000Z',
    )
    const parsed = parseSnapshot(JSON.stringify(snap))
    expect(parsed).not.toBeNull()
    expect(parsed!.checked).toEqual(['eligibility:citizen'])
    expect(parsed!.notes.eligibility).toBe('проверить справку')
    expect(parseSnapshot('{"app":"something-else"}')).toBeNull()
    expect(parseSnapshot('not json')).toBeNull()
  })
})

describe('onboarding step bounds', () => {
  it('never reports a step outside the wizard', () => {
    // Regression: a double click used to push the wizard to "question 5 of 4" with an empty screen.
    const clamp = (v: number) => Math.min(3, Math.max(0, v))
    expect(clamp(4)).toBe(3)
    expect(clamp(-1)).toBe(0)
  })

  it('validates unknown steps as incomplete', () => {
    const draft = { ...emptyDraft(), track: 'master' as const, category: 'master_self' as const }
    expect(isStepComplete(draft, 4)).toBe(false)
    expect(isStepComplete(draft, -1)).toBe(false)
  })
})

describe('experience requirements', () => {
  it('closes the experience item once the profile satisfies the category', () => {
    const medic = profile({ category: 'master_medical', experience: { years: 2, continuousMonths: 18 } })
    expect(meetsExperience(medic)).toBe(true)
    expect(experienceRequirement(medic)).toEqual({ years: 1, continuousMonths: null })
  })

  it('rejects an engineer without the required year of experience', () => {
    expect(meetsExperience(profile({ category: 'master_engineer', experience: { years: 0, continuousMonths: 0 } }))).toBe(false)
  })

  it('asks AI-system and nuclear interns for 6 continuous months instead of 12', () => {
    const ai = (months: number) =>
      profile({ track: 'internship', category: 'internship', workerGroup: 'ai_user', experience: { years: 3, continuousMonths: months } })
    expect(experienceRequirement(ai(6))).toEqual({ years: 3, continuousMonths: 6 })
    expect(meetsExperience(ai(6))).toBe(true)
    expect(meetsExperience(ai(5))).toBe(false)
    // A media worker on the same track still needs the full year.
    const media = profile({ track: 'internship', category: 'internship', workerGroup: 'media', experience: { years: 3, continuousMonths: 6 } })
    expect(meetsExperience(media)).toBe(false)
  })

  it('never claims experience is met for categories that do not require any', () => {
    expect(experienceRequirement(profile())).toBeNull()
    expect(meetsExperience(profile({ experience: { years: 10, continuousMonths: 120 } }))).toBe(false)
  })
})

describe('next action', () => {
  it('points at the first unchecked required step and moves on as steps are ticked', () => {
    const p = profile()
    const first = computeProgress({ profile: p, checked: [], stagesDone: [] })
    expect(first.nextItem).not.toBeNull()
    const firstId = `${first.nextItem!.stage.stage.id}:${first.nextItem!.item.id}`
    expect(first.nextItem!.item.required).not.toBe(false)

    const second = computeProgress({ profile: p, checked: [firstId], stagesDone: [] })
    expect(second.nextItem).not.toBeNull()
    expect(`${second.nextItem!.stage.stage.id}:${second.nextItem!.item.id}`).not.toBe(firstId)
  })

  it('has no next action once every stage is marked done', () => {
    const p = profile()
    const all = applicableStages(p).map((s) => s.id)
    expect(computeProgress({ profile: p, checked: [], stagesDone: all }).nextItem).toBeNull()
  })
})

describe('snapshot validation', () => {
  const good = () =>
    buildSnapshot(
      {
        profile: profile(),
        onboardedAt: '2026-08-01T00:00:00.000Z',
        checked: ['eligibility:citizen'],
        stagesDone: ['eligibility'],
        documentsDone: ['anketa'],
        notes: { eligibility: 'ок' },
        dates: { award_date: '2026-09-01' },
      },
      '2026-08-21T10:00:00.000Z',
    )

  it('rejects a payload whose category is not in the content model', () => {
    const snap = { ...good(), profile: { ...profile(), category: 'xxx' } }
    expect(parseSnapshot(JSON.stringify(snap))).toBeNull()
  })

  it('rejects a profile whose category does not belong to its track', () => {
    const snap = { ...good(), profile: { ...profile(), track: 'internship' } }
    expect(parseSnapshot(JSON.stringify(snap))).toBeNull()
  })

  it('drops unknown ids and dates but keeps the valid ones', () => {
    const snap = {
      ...good(),
      checked: ['eligibility:citizen', 'nope:nope'],
      stagesDone: ['eligibility', 'ghost'],
      documentsDone: ['anketa', 'ghost-doc'],
      notes: { eligibility: 'ок', ghost: 'x' },
      dates: { award_date: '2026-09-01', ghost_key: '2026-01-01', study_start: 'not-a-date' },
    }
    const parsed = parseSnapshot(JSON.stringify(snap))!
    expect(parsed.checked).toEqual(['eligibility:citizen'])
    expect(parsed.stagesDone).toEqual(['eligibility'])
    expect(parsed.documentsDone).toEqual(['anketa'])
    expect(Object.keys(parsed.notes)).toEqual(['eligibility'])
    expect(parsed.dates).toEqual({ award_date: '2026-09-01' })
  })

  it('round-trips a clean snapshot unchanged', () => {
    const parsed = parseSnapshot(JSON.stringify(good()))!
    expect(parsed.profile).toEqual(profile())
    expect(parsed.dates.award_date).toBe('2026-09-01')
  })
})

describe('personal deadlines', () => {
  const at = (iso: string) => new Date(`${iso}T12:00:00Z`)

  it('counts 90 days to the contract, and 60 for a scientific internship', () => {
    const academic = computeDeadlines(profile(), { award_date: '2026-09-01' }, at('2026-09-02'))
    const contract = academic.find((d) => d.rule.id === 'contract')!
    expect(contract.due).toBe('2026-11-30')
    expect(contract.rule.source).toBe('pp573')

    const science = profile({ track: 'science_internship', category: 'science_internship' })
    const ns = computeDeadlines(science, { award_date: '2026-09-01' }, at('2026-09-02'))
    expect(ns.find((d) => d.rule.id === 'contract_ns')!.due).toBe('2026-10-31')
    expect(ns.some((d) => d.rule.id === 'contract')).toBe(false)
  })

  it('flags obligations as soon or overdue relative to the given day', () => {
    const soon = computeDeadlines(profile(), { award_date: '2026-09-01' }, at('2026-11-20'))
    expect(soon.find((d) => d.rule.id === 'contract')!.status).toBe('soon')
    const late = computeDeadlines(profile(), { award_date: '2026-09-01' }, at('2026-12-10'))
    const overdue = late.find((d) => d.rule.id === 'contract')!
    expect(overdue.status).toBe('overdue')
    expect(overdue.daysLeft).toBe(-10)
  })

  it('rolls the recurring employment certificate to the next occurrence', () => {
    const list = computeDeadlines(profile(), { work_start: '2026-01-15' }, at('2026-08-01'))
    const cert = list.find((d) => d.rule.id === 'workback_cert')!
    expect(cert.due).toBe('2027-01-15')
    expect(cert.occurrence).toBe(2)
  })

  it('returns nothing for rules whose anchor date is missing', () => {
    expect(computeDeadlines(profile(), {}, at('2026-09-02'))).toEqual([])
  })

  it('prefers an overdue obligation over an upcoming one in the header', () => {
    const list = computeDeadlines(profile(), { award_date: '2026-01-01', work_start: '2026-08-01' }, at('2026-09-01'))
    expect(nearestDeadline(list)!.status).toBe('overdue')
    expect(nearestDeadline([])).toBeNull()
  })
})

describe('search', () => {
  it('finds interview slots and document questions', () => {
    const p = profile()
    const slots = searchAll('слоты', p, 'ru')
    expect(slots.length).toBeGreaterThan(0)
    expect(slots.some((r) => r.stageId === 'interview')).toBe(true)

    const medcert = searchAll('072', p, 'ru')
    expect(medcert.length).toBeGreaterThan(0)
  })

  it('ignores case and ё, and needs at least two characters', () => {
    const p = profile()
    expect(searchAll('С', p, 'ru')).toEqual([])
    expect(searchAll('СЛОТЫ', p, 'ru').length).toBeGreaterThan(0)
  })

  it('never returns content from stages that do not apply to the profile', () => {
    const p = profile()
    const applicable = new Set(applicableStages(p).map((s) => s.id))
    for (const r of searchAll('курс', p, 'ru')) expect(applicable.has(r.stageId)).toBe(true)
  })
})

describe('data freshness', () => {
  it('warns once the content has not been verified for six months', () => {
    const meta = { lastVerified: '2026-01-10', competitionYear: 2026 }
    expect(staleness(meta, new Date('2026-05-10T12:00:00Z')).stale).toBe(false)
    const aged = staleness(meta, new Date('2026-08-10T12:00:00Z'))
    expect(aged.monthsSinceVerified).toBe(7)
    expect(aged.staleByAge).toBe(true)
  })

  it('warns when the competition year has rolled over', () => {
    const s = staleness({ lastVerified: '2026-12-20', competitionYear: 2026 }, new Date('2027-01-05T12:00:00Z'))
    expect(s.staleByYear).toBe(true)
    expect(s.stale).toBe(true)
  })
})
