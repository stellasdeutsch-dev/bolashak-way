import { describe, expect, it } from 'vitest'
import { EXCERPTS, excerptsForStage } from '@/content/excerpts'
import { STAGES } from '@/content/stages'
import { ABOUT_BLOCKS, ABOUT_INTRO } from '@/content/about'
import { getSource } from '@/content/sources'
import { evaluate } from '@/domain/applicability'
import type { Profile } from '@/content/types'

const medic: Profile = {
  track: 'master',
  category: 'master_medical',
  workerGroup: null,
  invitation: 'none',
  foreignCert: null,
  kazakhCert: true,
  experience: { years: 2, continuousMonths: 18 },
}
const scientist: Profile = { ...medic, track: 'science_internship', category: 'science_internship' }

describe('document excerpts', () => {
  it('points every quote at a stage and a source that exist', () => {
    const stageIds = new Set(STAGES.map((s) => s.id))
    for (const e of EXCERPTS) {
      expect(stageIds.has(e.stage), `${e.id} → unknown stage ${e.stage}`).toBe(true)
      expect(getSource(e.source), `${e.id} → unknown source ${e.source}`).toBeDefined()
      expect(e.text.length, `${e.id} is suspiciously short`).toBeGreaterThan(80)
      expect(e.clause).toMatch(/пункт/)
    }
  })

  it('shows the work-back terms to an academic track and the internship rule to a scientist', () => {
    const forMedic = excerptsForStage('workback').filter((e) => evaluate(e.appliesTo, medic))
    const forScientist = excerptsForStage('workback').filter((e) => evaluate(e.appliesTo, scientist))
    expect(forMedic.map((e) => e.id)).toEqual(['x-workback-terms', 'x-workback-minus'])
    expect(forScientist.map((e) => e.id)).toEqual(['x-workback-ns'])
  })

  it('gives each track its own contract deadline quote', () => {
    const pick = (p: Profile) => excerptsForStage('contract').filter((e) => evaluate(e.appliesTo, p)).map((e) => e.id)
    expect(pick(medic)).toEqual(['x-contract-90'])
    expect(pick(scientist)).toEqual(['x-contract-60'])
  })

  it('leaves no stage with quotes that nobody can see', () => {
    for (const stage of STAGES) {
      const defined = excerptsForStage(stage.id)
      if (defined.length === 0) continue
      const anyoneSees = [medic, scientist].some((p) => defined.some((e) => evaluate(e.appliesTo, p)))
      expect(anyoneSees, `no profile can see the quotes on ${stage.id}`).toBe(true)
    }
  })
})

describe('plain-language intros', () => {
  it('gives every stage an "in short" block in all three languages', () => {
    for (const stage of STAGES) {
      expect(stage.inShort, `${stage.id} has no inShort`).toBeDefined()
      for (const key of ['what', 'you', 'result'] as const) {
        const v = stage.inShort![key]
        expect(v.ru.length, `${stage.id}.${key}.ru`).toBeGreaterThan(30)
        expect(v.kk, `${stage.id}.${key}.kk`).toBeTruthy()
        expect(v.en, `${stage.id}.${key}.en`).toBeTruthy()
      }
    }
  })

  it('keeps the intro distinct from the summary, so the screen does not repeat itself', () => {
    for (const stage of STAGES) {
      expect(stage.inShort!.what.ru, `${stage.id} repeats its summary`).not.toBe(stage.summary.ru)
      expect(stage.inShort!.what.ru, `${stage.id} repeats its why`).not.toBe(stage.why.ru)
    }
  })
})

describe('about page', () => {
  it('points every block at sources that exist and keeps all three languages', () => {
    expect(ABOUT_BLOCKS.length).toBeGreaterThan(5)
    expect(ABOUT_INTRO.kk && ABOUT_INTRO.en).toBeTruthy()
    for (const b of ABOUT_BLOCKS) {
      expect(b.title.kk && b.title.en, `${b.num} title`).toBeTruthy()
      expect(b.body.kk && b.body.en, `${b.num} body`).toBeTruthy()
      for (const p of b.points ?? []) expect(p.kk && p.en, `${b.num} point`).toBeTruthy()
      for (const src of b.sources ?? []) expect(getSource(src), `${b.num} → ${src}`).toBeDefined()
    }
  })
})
