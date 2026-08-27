import type { ChapterId, ChecklistItem, Profile, Stage, StageId } from '@/content/types'
import { CHAPTER_ORDER, STAGES } from '@/content/stages'
import { evaluate } from './applicability'

export type StageStatus = 'locked' | 'available' | 'in-progress' | 'done'

export interface StageProgress {
  stage: Stage
  index: number
  status: StageStatus
  /** Closed by the onboarding answers rather than by clicking. */
  autoDone: boolean
  items: { item: ChecklistItem; done: boolean; auto: boolean }[]
  requiredTotal: number
  requiredDone: number
  total: number
  doneCount: number
}

export interface RoadmapProgress {
  stages: StageProgress[]
  byId: Map<StageId, StageProgress>
  /** 0..1 across every required checklist item of applicable stages. */
  ratio: number
  doneStages: number
  totalStages: number
  current: StageProgress | null
  /** First unfinished required step of the current stage — the one concrete thing to do next. */
  nextItem: { stage: StageProgress; item: ChecklistItem } | null
  /** Months left until the application is submitted, app estimate. */
  estimateMonths: [number, number] | null
}

export interface ProgressInput {
  profile: Profile
  checked: string[]
  stagesDone: StageId[]
}

export const applicableStages = (profile: Profile): Stage[] => STAGES.filter((s) => evaluate(s.appliesTo, profile))

export const applicableItems = (stage: Stage, profile: Profile): ChecklistItem[] =>
  stage.checklist.filter((i) => evaluate(i.appliesTo, profile))

const CHAPTER_INDEX = new Map<ChapterId, number>(CHAPTER_ORDER.map((c, i) => [c, i]))

export function computeProgress({ profile, checked, stagesDone }: ProgressInput): RoadmapProgress {
  const checkedSet = new Set(checked)
  const doneSet = new Set(stagesDone)
  const stages = applicableStages(profile)

  // First pass: resolve item state and "content-complete" without the chapter lock.
  const draft = stages.map((stage, index) => {
    const autoDone = evaluate(stage.autoCompleteWhen, profile) && stage.autoCompleteWhen !== undefined
    const items = applicableItems(stage, profile).map((item) => {
      const auto = item.autoCompleteWhen !== undefined && evaluate(item.autoCompleteWhen, profile)
      return { item, auto, done: auto || autoDone || checkedSet.has(`${stage.id}:${item.id}`) }
    })
    const required = items.filter((i) => i.item.required !== false)
    const requiredDone = required.filter((i) => i.done).length
    const manualDone = doneSet.has(stage.id)
    const contentDone = required.length > 0 && requiredDone === required.length
    return {
      stage,
      index,
      autoDone,
      items,
      requiredTotal: required.length,
      requiredDone,
      total: items.length,
      doneCount: items.filter((i) => i.done).length,
      done: autoDone || manualDone || contentDone,
    }
  })

  // A chapter unlocks once every applicable stage of all previous chapters is done.
  const chapterDone = new Map<ChapterId, boolean>()
  for (const chapter of CHAPTER_ORDER) {
    const inChapter = draft.filter((d) => d.stage.chapter === chapter)
    chapterDone.set(chapter, inChapter.length === 0 || inChapter.every((d) => d.done))
  }
  const unlockedChapters = new Set<ChapterId>()
  for (const chapter of CHAPTER_ORDER) {
    const idx = CHAPTER_INDEX.get(chapter)!
    const previousDone = CHAPTER_ORDER.slice(0, idx).every((c) => chapterDone.get(c))
    if (previousDone) unlockedChapters.add(chapter)
  }

  const result: StageProgress[] = draft.map((d) => {
    let status: StageStatus
    if (d.done) status = 'done'
    else if (!unlockedChapters.has(d.stage.chapter)) status = 'locked'
    else if (d.doneCount > 0) status = 'in-progress'
    else status = 'available'
    return {
      stage: d.stage,
      index: d.index,
      status,
      autoDone: d.autoDone,
      items: d.items,
      requiredTotal: d.requiredTotal,
      requiredDone: d.requiredDone,
      total: d.total,
      doneCount: d.doneCount,
    }
  })

  const requiredTotal = result.reduce((a, s) => a + s.requiredTotal, 0)
  const requiredDone = result.reduce((a, s) => a + s.requiredDone, 0)
  const doneStages = result.filter((s) => s.status === 'done').length
  const current = result.find((s) => s.status !== 'done' && s.status !== 'locked') ?? result.find((s) => s.status !== 'done') ?? null
  const nextEntry = current ? (current.items.find((i) => !i.done && i.item.required !== false) ?? current.items.find((i) => !i.done) ?? null) : null
  const nextItem = current && nextEntry ? { stage: current, item: nextEntry.item } : null

  // Estimate covers everything up to and including the application chapter.
  const untilApply = result.filter((s) => s.status !== 'done' && (s.stage.chapter === 'prepare' || s.stage.chapter === 'apply'))
  let estimateMonths: [number, number] | null = null
  if (untilApply.length > 0) {
    const min = untilApply.reduce((a, s) => a + (s.stage.estimateWeeks?.[0] ?? 0), 0)
    const max = untilApply.reduce((a, s) => a + (s.stage.estimateWeeks?.[1] ?? 0), 0)
    // Preparation steps overlap in practice (language, university search, documents run in parallel).
    const OVERLAP = 0.6
    estimateMonths = [Math.max(1, Math.round((min * OVERLAP) / 4.345)), Math.max(1, Math.round((max * OVERLAP) / 4.345))]
  }

  return {
    stages: result,
    byId: new Map(result.map((s) => [s.stage.id, s])),
    ratio: requiredTotal === 0 ? 0 : requiredDone / requiredTotal,
    doneStages,
    totalStages: result.length,
    current,
    nextItem,
    estimateMonths,
  }
}
