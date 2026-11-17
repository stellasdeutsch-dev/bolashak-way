import { getCategory } from '@/content/categories'
import { experienceRequirement } from '@/domain/applicability'
import { useAppStore } from '@/store/useAppStore'
import { useI18n, formatMonths, formatYears } from '@/i18n'
import { Card, FallbackBadge, Pill, SourceLink } from '@/components/ui'
import s from '../Stage.module.css'

/** The category's own admission requirements, with the experience it asks for on top. */
export function CategoryRequirements() {
  const { t, cf, locale } = useI18n()
  const profile = useAppStore((st) => st.profile)!
  const category = getCategory(profile.category)
  const req = experienceRequirement(profile)
  const reqSources = [...new Set(category.requirements.map((r) => r.source))]
  const parts: string[] = []
  if (req?.years != null) parts.push(`${formatYears(req.years, locale)} ${t('stage.yearsTotal')}`)
  if (req?.continuousMonths != null) parts.push(`${formatMonths(req.continuousMonths, locale)} ${t('stage.monthsContinuous')}`)

  return (
    <Card>
      <div className={s.section}>
        <h2 className={s.sectionTitle}>{t('stage.categoryRequirements')}</h2>
        {req && (
          <div className={s.scoreRow}>
            <Pill tone="accent">
              {t('stage.expRequired')}: {parts.join(' · ')}
            </Pill>
          </div>
        )}

        {category.requirements.map((r, i) => {
          const text = cf(r.text)
          return (
            <p key={i} className={s.reqRow}>
              <span>
                {text.text}
                {text.fallback && <FallbackBadge />}
              </span>
              {reqSources.length > 1 && <SourceLink id={r.source} />}
            </p>
          )
        })}
        {reqSources.length === 1 && (
          <div className={s.blockSource}>
            <SourceLink id={reqSources[0]} />
          </div>
        )}
      </div>
    </Card>
  )
}
