import { useI18n } from '@/i18n'
import { Card } from '@/components/ui'
import { AwardTimeline, ContestFlow } from '@/components/Explain'
import type { StageExtraProps } from './types'
import s from '../Stage.module.css'

/** The competition stages: the three rounds with the exits drawn in, and this stage marked on them. */
export function ContestFlowCard({ stage, profile }: StageExtraProps) {
  const { t } = useI18n()
  return (
    <Card>
      <div className={s.section}>
        <h2 className={s.sectionTitle}>{t('flow.contestTitle')}</h2>
        <ContestFlow track={profile.track} hereStage={stage.id} />
      </div>
    </Card>
  )
}

/** The contract stage: the clock from the award. Dims the term that is not yours, so nobody counts the wrong deadline. */
export function AwardClock({ profile }: StageExtraProps) {
  const { t } = useI18n()
  return (
    <Card>
      <div className={s.section}>
        <h2 className={s.sectionTitle}>{t('stage.awardClock')}</h2>
        <AwardTimeline track={profile.track} />
      </div>
    </Card>
  )
}
