import { describe, expect, it } from 'vitest'
import { EXCERPTS, excerptsForStage } from '@/content/excerpts'
import { STAGES } from '@/content/stages'
import { ABOUT_BLOCKS, ABOUT_INTRO } from '@/content/about'
import { OVERVIEW_VIDEOS, VIDEOS, videosForStage } from '@/content/videos'
import { ABOUT_STATS } from '@/content/about'
import { AWARD_TIMELINE, PATH_LANES, WORKBACK_TABLE } from '@/content/explain'
import { CHAPTERS } from '@/content/stages'
import { ICON_NAMES } from '@/components/StageIcon'
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

describe('official videos', () => {
  it('keeps every clip a real, unique upload with a date and a length', () => {
    const stageIds = new Set(STAGES.map((st) => st.id))
    const seen = new Set<string>()
    for (const v of VIDEOS) {
      if (v.stage) expect(stageIds.has(v.stage), `${v.id} → unknown stage ${v.stage}`).toBe(true)
      expect(v.clips.length, `${v.id} has no clips`).toBeGreaterThan(0)
      const langs = v.clips.map((cl) => cl.lang)
      expect(new Set(langs).size, `${v.id} has two clips in the same language`).toBe(langs.length)
      for (const cl of v.clips) {
        expect(cl.youtubeId, `${v.id} → bad YouTube id`).toMatch(/^[\w-]{11}$/)
        expect(seen.has(cl.youtubeId), `${cl.youtubeId} is listed twice`).toBe(false)
        seen.add(cl.youtubeId)
        expect(cl.published).toMatch(/^\d{4}-\d{2}-\d{2}$/)
        expect(cl.durationSec).toBeGreaterThan(0)
        expect(cl.title.trim().length).toBeGreaterThan(5)
      }
    }
  })

  it('separates overview videos from stage videos', () => {
    expect(OVERVIEW_VIDEOS.length).toBeGreaterThan(0)
    for (const v of OVERVIEW_VIDEOS) expect(v.stage).toBeUndefined()
    for (const v of VIDEOS.filter((x) => x.stage)) expect(OVERVIEW_VIDEOS).not.toContain(v)
  })

  it('shows the eGov walkthrough to an academic track and the "500 scientists" one to a scientist', () => {
    const ids = (p: Profile) => videosForStage('apply').filter((v) => evaluate(v.appliesTo, p)).map((v) => v.id)
    expect(ids(medic)).toEqual(['apply_egov', 'apply_walkthrough'])
    expect(ids(scientist)).toEqual(['apply_ns'])
  })
})

describe('structured about blocks', () => {
  it('resolves every icon a stage or an About block asks for', () => {
    const known = new Set(ICON_NAMES)
    for (const st of STAGES) expect(known.has(st.icon), `stage ${st.id} → unknown icon ${st.icon}`).toBe(true)
    for (const b of ABOUT_BLOCKS) {
      for (const f of b.features ?? []) expect(known.has(f.icon), `${b.num} → unknown icon ${f.icon}`).toBe(true)
      for (const step of b.steps ?? []) expect(known.has(step.icon), `${b.num} → unknown icon ${step.icon}`).toBe(true)
    }
  })

  it('sources every headline figure and keeps all three languages', () => {
    expect(ABOUT_STATS.length).toBeGreaterThan(0)
    for (const st of ABOUT_STATS) {
      expect(getSource(st.source), `${st.value} → unknown source ${st.source}`).toBeDefined()
      expect(st.value).toMatch(/^[\d\s/]+$/)
      expect(st.caption.kk, `${st.value} has no Kazakh caption`).toBeTruthy()
      expect(st.caption.en, `${st.value} has no English caption`).toBeTruthy()
    }
  })

  it('keeps a restructured block from repeating its own tiles in the body', () => {
    for (const b of ABOUT_BLOCKS.filter((x) => x.features || x.steps)) {
      // The body introduces the block; the tiles carry the detail. A long body means both.
      expect(b.body.ru.length, `${b.num} body is long enough to duplicate its tiles`).toBeLessThan(180)
    }
  })
})

describe('explanatory visuals', () => {
  it('keeps the work-back table rectangular, sourced and translated', () => {
    for (const src of WORKBACK_TABLE.sources) expect(getSource(src)).toBeDefined()
    const width = WORKBACK_TABLE.head.length
    for (const [i, row] of WORKBACK_TABLE.rows.entries()) {
      expect(row.length, `row ${i} has ${row.length} cells, header has ${width}`).toBe(width)
    }
    for (const cell of [...WORKBACK_TABLE.head, ...WORKBACK_TABLE.rows.flat()]) {
      expect(cell.kk, `"${cell.ru}" has no Kazakh`).toBeTruthy()
      expect(cell.en, `"${cell.ru}" has no English`).toBeTruthy()
    }
  })

  it('puts each path lane in a chapter that exists', () => {
    const chapters = new Set(CHAPTERS.map((ch) => ch.id))
    expect(PATH_LANES.length).toBe(2)
    for (const lane of PATH_LANES) {
      expect(chapters.has(lane.admissionAt), `${lane.id} → unknown chapter ${lane.admissionAt}`).toBe(true)
    }
    // The whole point of the diagram is that the two lanes differ.
    expect(PATH_LANES[0].admissionAt).not.toBe(PATH_LANES[1].admissionAt)
  })

  it('keeps the award timeline inside its own scale, in order and sourced', () => {
    const days = AWARD_TIMELINE.marks.map((m) => m.day)
    expect(days).toEqual([...days].sort((a, b) => a - b))
    for (const m of AWARD_TIMELINE.marks) {
      expect(m.day).toBeGreaterThanOrEqual(0)
      expect(m.day, `${m.day} sits past the end of the rail`).toBeLessThanOrEqual(AWARD_TIMELINE.total)
      expect(getSource(m.source), `unknown source ${m.source}`).toBeDefined()
    }
    // One mark per tone, so nothing is drawn twice on the same rail.
    const tones = AWARD_TIMELINE.marks.map((m) => m.tone)
    expect(new Set(tones).size).toBe(tones.length)
  })
})
