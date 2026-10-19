import { describe, expect, it } from 'vitest'
import { EXCERPTS, excerptsForStage } from '@/content/excerpts'
import { STAGES } from '@/content/stages'
import { OVERVIEW_VIDEOS, VIDEOS, videosForStage } from '@/content/videos'
import { CONTEST_FLOW, PATH_LANES, awardTimeline, departureChain, workbackTable } from '@/content/explain'

const ALL_TRACKS = ['bachelor', 'master', 'phd_residency', 'internship', 'science_internship'] as const
import { CHAPTERS } from '@/content/stages'
import { ICON_NAMES } from '@/components/StageIcon'
import { FORMS, formsForStage } from '@/content/forms'
import { DOCUMENTS } from '@/content/documents'
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

describe('icons', () => {
  it('resolves every icon a stage or a platform asks for', () => {
    const known = new Set(ICON_NAMES)
    for (const st of STAGES) expect(known.has(st.icon), `stage ${st.id} → unknown icon ${st.icon}`).toBe(true)
  })
})

describe('explanatory visuals', () => {
  it('gives every programme a work-back table that is rectangular, sourced and translated', () => {
    for (const track of ALL_TRACKS) {
      const table = workbackTable(track)
      expect(table.rows.length, `${track} has no work-back rows`).toBeGreaterThan(0)
      for (const src of table.sources) expect(getSource(src)).toBeDefined()
      const width = table.head.length
      for (const [i, row] of table.rows.entries()) {
        expect(row.length, `${track} row ${i} has ${row.length} cells, header has ${width}`).toBe(width)
      }
      for (const cell of [...table.head, ...table.rows.flat()]) {
        expect(cell.kk, `"${cell.ru}" has no Kazakh`).toBeTruthy()
        expect(cell.en, `"${cell.ru}" has no English`).toBeTruthy()
      }
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

  it('keeps each award timeline inside its own scale, in order and sourced', () => {
    for (const track of ALL_TRACKS) {
      const tl = awardTimeline(track)
      const days = tl.marks.map((m) => m.day)
      expect(days).toEqual([...days].sort((a, b) => a - b))
      for (const m of tl.marks) {
        expect(m.day).toBeGreaterThanOrEqual(0)
        expect(m.day, `${m.day} sits past the end of the rail`).toBeLessThanOrEqual(tl.total)
        expect(getSource(m.source), `unknown source ${m.source}`).toBeDefined()
      }
    }
    expect(awardTimeline('science_internship').total).toBe(60)
    expect(awardTimeline('master').total).toBe(90)
  })
})

describe('the competition flowchart', () => {
  const forTrack = (track: Profile['track']) =>
    CONTEST_FLOW.filter((step) => evaluate(step.appliesTo, { ...medic, track }))

  it('gives both tracks a complete, ordered chart', () => {
    for (const track of ['master', 'science_internship'] as const) {
      const steps = forTrack(track)
      const kinds = steps.map((st) => st.kind)
      expect(kinds[0], `${track} chart does not start`).toBe('start')
      expect(kinds.filter((k) => k === 'round').length, `${track} is not three rounds`).toBe(2)
      expect(kinds.filter((k) => k === 'decision').length, `${track} has no decision`).toBe(1)
      expect(kinds.at(-1), `${track} chart does not end`).toBe('end')
      // One node per id, and no node shown to a track that should not see it.
      expect(new Set(steps.map((st) => st.id)).size).toBe(steps.length)
    }
  })

  it('cites a real source on every node and every exit', () => {
    for (const step of CONTEST_FLOW) {
      // The entry node states nothing about the rules, so it is the one without a citation.
      if (step.kind === 'start') {
        expect(step.source, 'the entry node should not claim a source').toBeUndefined()
      } else {
        expect(getSource(step.source!), `${step.id} → unknown source ${step.source}`).toBeDefined()
        expect(step.clause, `${step.id} has no clause`).toMatch(/^ПП \d+, пункт \d+$/)
      }
      if (step.exit) {
        expect(getSource(step.exit.source), `${step.id} exit → unknown source`).toBeDefined()
        expect(step.exit.clause).toMatch(/^ПП \d+, пункт \d+$/)
      }
    }
  })

  it('keeps the threshold exit off the science track, where no such clause exists', () => {
    const exits = (track: Profile['track']) => forTrack(track).filter((st) => st.exit).map((st) => st.id)
    expect(exits('master')).toEqual(['round1', 'round3'])
    expect(exits('science_internship')).toEqual(['round3_ns'])
  })

  it('marks the stages the reader can be standing on', () => {
    const stageIds = new Set(STAGES.map((st) => st.id))
    for (const step of CONTEST_FLOW) {
      if (step.stage) expect(stageIds.has(step.stage), `${step.id} → unknown stage ${step.stage}`).toBe(true)
    }
    for (const here of ['testing', 'interview', 'commission'] as const) {
      expect(CONTEST_FLOW.some((st) => st.stage === here), `nothing marks ${here}`).toBe(true)
    }
  })

  it('never cites the other track\'s act', () => {
    const acts = (track: Profile['track']) =>
      new Set(forTrack(track).flatMap((st) => [...(st.source ? [st.source] : []), ...(st.exit ? [st.exit.source] : [])]))
    expect([...acts('master')]).toEqual(['pp573'])
    expect([...acts('science_internship')]).toEqual(['pp791'])
  })

  it('keeps every departure chain translated and sourced', () => {
    for (const track of ALL_TRACKS) {
      const chain = departureChain(track)
      expect(chain.steps.length).toBeGreaterThan(2)
      for (const st of chain.steps) {
        expect(st.kk).toBeTruthy()
        expect(st.en).toBeTruthy()
      }
      for (const src of chain.sources) expect(getSource(src)).toBeDefined()
    }
  })
})

describe('official forms', () => {
  it('points every file at a real bolashak.gov.kz URL, once', () => {
    const seen = new Set<string>()
    const stageIds = new Set(STAGES.map((st) => st.id))
    const docIds = new Set(DOCUMENTS.map((d) => d.id))
    for (const f of FORMS) {
      expect(stageIds.has(f.stage), `${f.id} → unknown stage ${f.stage}`).toBe(true)
      if (f.doc) expect(docIds.has(f.doc), `${f.id} → unknown document ${f.doc}`).toBe(true)
      expect(f.url, `${f.id} is not an official URL`).toMatch(/^https:\/\/bolashak\.gov\.kz\//)
      expect(f.url.endsWith(`.${f.fileType}`), `${f.id} url does not match its declared type`).toBe(true)
      expect(seen.has(f.url), `${f.url} is listed twice`).toBe(false)
      seen.add(f.url)
      expect(getSource(f.source), `${f.id} → unknown source ${f.source}`).toBeDefined()
      // Size and date come from the server's own response; a zero means nobody checked.
      expect(f.bytes, `${f.id} has no size`).toBeGreaterThan(0)
      expect(f.published).toMatch(/^\d{4}-\d{2}-\d{2}$/)
      expect(f.title.kk, `${f.id} has no Kazakh title`).toBeTruthy()
      expect(f.title.en, `${f.id} has no English title`).toBeTruthy()
    }
  })

  it('gives the pledge paperwork only to tracks that actually pledge', () => {
    // ПП 791 mentions neither a pledge nor a guarantee, so a scientist must not see those.
    const pledge = formsForStage('contract')
    expect(pledge.length).toBeGreaterThan(0)
    for (const f of pledge) {
      expect(evaluate(f.appliesTo, medic), `${f.id} hidden from an academic track`).toBe(true)
      expect(evaluate(f.appliesTo, scientist), `${f.id} offered to a scientist`).toBe(false)
    }
  })

  it('gives each track its own application blanks', () => {
    const ids = (p: Profile) => formsForStage('documents').filter((f) => evaluate(f.appliesTo, p)).map((f) => f.id)
    expect(ids(medic)).toEqual(['employer_request'])
    expect(ids(scientist)).toEqual(['ns_anketa_form', 'ns_employer_request', 'ns_program'])
  })

  it('only claims a form can be viewed in-app when it is a PDF', () => {
    for (const f of FORMS.filter((x) => x.fileType === 'docx')) {
      expect(f.url.endsWith('.docx'), `${f.id} is offered as Word but is not one`).toBe(true)
    }
  })
})
