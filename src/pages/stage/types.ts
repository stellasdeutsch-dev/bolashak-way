import type { Profile, Stage } from '@/content/types'
import type { PlatformMeta } from '@/content/platforms'

/** What a stage's own block gets: the stage as its platform tells it, the plan, the platform. */
export interface StageExtraProps {
  stage: Stage
  profile: Profile
  platform: PlatformMeta
}
