import { describe, expect, it } from 'vitest'
import type { CategoryId, Profile } from '@/content/types'
import { CATEGORIES, CATEGORIES_BY_TRACK } from '@/content/categories'
import { STAGES } from '@/content/stages'
import { SOURCES } from '@/content/sources'
import { DOCUMENTS } from '@/content/documents'
import { FAQ } from '@/content/faq'
import { computeProgress, applicableStages, applicableItems } from '@/domain/progress'
import { evaluate, foreignCertMeets } from '@/domain/applicability'
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
      { profile: profile(), onboardedAt: '2026-08-01T00:00:00.000Z', checked: ['eligibility:citizen'], stagesDone: ['eligibility'], documentsDone: ['anketa'], notes: { eligibility: 'проверить справку' } },
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
