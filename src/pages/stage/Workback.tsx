import { getCategory } from '@/content/categories'
import { useI18n } from '@/i18n'
import { Callout, Card } from '@/components/ui'
import { WorkbackTable } from '@/components/Explain'
import type { StageExtraProps } from './types'
import s from '../Stage.module.css'

/** The work-back stage: the reader's own term, then every term of the programme side by side. */
export function Workback({ profile, platform }: StageExtraProps) {
  const { t, c } = useI18n()
  return (
    <>
      <Callout tone="info" source={platform.rulesSource}>
        <strong>{t('stage.workBackTitle')}</strong>
        <br />
        {c(getCategory(profile.category).workBack)}
      </Callout>
      <Card>
        <div className={s.section}>
          <h2 className={s.sectionTitle}>{t('stage.workBackTable')}</h2>
          <WorkbackTable track={profile.track} />
        </div>
      </Card>
    </>
  )
}
