import type { PlatformMeta } from '@/content/platforms'
import { useI18n, type UiKey } from '@/i18n'
import { Card } from '@/components/ui'
import { InternshipSpecialtySearch, ScienceSearch, SpecialtySearch, UniversitySearch } from '@/components/ListSearch'
import type { StageExtraProps } from './types'
import s from '../Stage.module.css'

type ListStage = 'specialty' | 'university'

/** The heading over each kind of list; a kind without a university list has no entry for it. */
const TITLES: Record<PlatformMeta['lists']['kind'], Partial<Record<ListStage, UiKey>>> = {
  degree: { specialty: 'lists.specialtyTitle', university: 'lists.universityTitle' },
  internship: { specialty: 'lists.internshipTitle' },
  science: { specialty: 'lists.scienceTitle', university: 'lists.scienceHostsTitle' },
}

/**
 * The specialty and university stages: each platform searches its own official list –
 * degree specialties at its level, the internship list, or research directions with the
 * hosts that take them.
 */
export function ListSearchCard({ stage, platform }: StageExtraProps) {
  const { t } = useI18n()
  const id = stage.id as ListStage
  const lists = platform.lists
  const title = TITLES[lists.kind][id]
  if (!title) return null
  return (
    <Card>
      <div className={s.section}>
        <h2 className={s.sectionTitle}>{t(title)}</h2>
        {lists.kind === 'science' ? (
          <ScienceSearch />
        ) : lists.kind === 'internship' ? (
          <InternshipSpecialtySearch />
        ) : id === 'specialty' ? (
          <SpecialtySearch level={lists.level} />
        ) : (
          <UniversitySearch />
        )}
      </div>
    </Card>
  )
}
