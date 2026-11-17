import type { ComponentType } from 'react'
import type { StageId } from '@/content/types'
import type { StageExtraProps } from './types'
import { CategoryRequirements } from './CategoryRequirements'
import { ForeignLanguage, KazakhRequirement } from './Language'
import { Workback } from './Workback'
import { AwardClock, ContestFlowCard } from './Diagrams'
import { ListSearchCard } from './ListSearchCard'

/**
 * The block a stage shows beyond the common sections, after its notes. A stage without an
 * entry has none. The blocks read what differs between programmes from PlatformMeta.
 */
export const STAGE_EXTRAS: Partial<Record<StageId, ComponentType<StageExtraProps>>> = {
  category: CategoryRequirements,
  foreign: ForeignLanguage,
  kazakh: KazakhRequirement,
  workback: Workback,
  testing: ContestFlowCard,
  interview: ContestFlowCard,
  commission: ContestFlowCard,
  contract: AwardClock,
  specialty: ListSearchCard,
  university: ListSearchCard,
}
