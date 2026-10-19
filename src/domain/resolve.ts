import type { Stage, StageId, Track } from '@/content/types'
import { STAGE_BY_ID } from '@/content/stages'
import { STAGE_PATCHES } from '@/content/platforms'
import { sourceFits } from '@/content/sources'

/**
 * A stage as one platform tells it: the shared skeleton with that platform's wording laid
 * over it. Everything downstream — the roadmap, the stage page, search, the calendar —
 * reads stages through here, so no screen can show another programme's text by accident.
 */
export function resolveStage(stage: Stage, track: Track): Stage {
  const patch = STAGE_PATCHES[track][stage.id] ?? {}
  const texts = patch.checklist ?? {}
  const links = patch.links ?? {}
  // A link to another programme's page is swapped for this platform's own, or dropped.
  const linkFor = (id: string, link?: string) =>
    id in links ? (links[id] ?? undefined) : sourceFits(link, track) ? link : undefined
  return {
    ...stage,
    icon: patch.icon ?? stage.icon,
    kicker: patch.kicker ?? stage.kicker,
    title: patch.title ?? stage.title,
    summary: patch.summary ?? stage.summary,
    why: patch.why ?? stage.why,
    inShort: patch.inShort ?? stage.inShort,
    mistakes: patch.mistakes ?? stage.mistakes,
    sources: (patch.sources ?? stage.sources).filter((src) => sourceFits(src, track)),
    checklist: stage.checklist.map((item) => ({ ...item, text: texts[item.id] ?? item.text, link: linkFor(item.id, item.link) })),
    notes: stage.notes?.map((n) => (sourceFits(n.source, track) ? n : { ...n, source: undefined })),
    deadlines: stage.deadlines?.filter((d) => sourceFits(d.source, track)),
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
