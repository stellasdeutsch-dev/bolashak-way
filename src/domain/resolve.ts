import type { Stage, StageId, Track } from '@/content/types'
import { STAGE_BY_ID } from '@/content/stages'
import { STAGE_PATCHES } from '@/content/platforms'

/**
 * A stage as one platform tells it: the shared skeleton with that platform's wording laid
 * over it. Everything downstream — the roadmap, the stage page, search, the calendar —
 * reads stages through here, so no screen can show another programme's text by accident.
 */
export function resolveStage(stage: Stage, track: Track): Stage {
  const patch = STAGE_PATCHES[track][stage.id]
  if (!patch) return stage
  const texts = patch.checklist ?? {}
  return {
    ...stage,
    icon: patch.icon ?? stage.icon,
    kicker: patch.kicker ?? stage.kicker,
    title: patch.title ?? stage.title,
    summary: patch.summary ?? stage.summary,
    why: patch.why ?? stage.why,
    inShort: patch.inShort ?? stage.inShort,
    mistakes: patch.mistakes ?? stage.mistakes,
    sources: patch.sources ?? stage.sources,
    checklist: stage.checklist.map((item) => (texts[item.id] ? { ...item, text: texts[item.id] } : item)),
  }
}

const cache = new Map<string, Stage>()

export function getStageFor(id: StageId, track: Track): Stage | undefined {
  const key = `${track}:${id}`
  const hit = cache.get(key)
  if (hit) return hit
  const base = STAGE_BY_ID.get(id)
  if (!base) return undefined
  const resolved = resolveStage(base, track)
  cache.set(key, resolved)
  return resolved
}
