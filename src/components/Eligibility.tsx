import { Link } from 'react-router'
import { CATEGORIES } from '@/content/categories'
import { experienceRequirement, meetsExperience } from '@/domain/applicability'
import { pathsForTrack } from '@/domain/paths'
import { useAppStore } from '@/store/useAppStore'
import { useI18n, formatMonths, formatYears } from '@/i18n'
import { Callout } from './ui'

/**
 * Says plainly when the answers show the reader does not meet a hard condition yet —
 * before they spend months collecting documents for an application that cannot pass.
 */
export function EligibilityBanner() {
  const { t, c, locale } = useI18n()
  const profile = useAppStore((st) => st.profile)
  if (!profile) return null
  const req = experienceRequirement(profile)
  if (!req || meetsExperience(profile)) return null

  const category = CATEGORIES[profile.category]
  const need: string[] = []
  if (req.years != null) need.push(`${formatYears(req.years, locale)} ${t('stage.yearsTotal')}`)
  if (req.continuousMonths != null) need.push(`${formatMonths(req.continuousMonths, locale)} ${t('stage.monthsContinuous')}`)
  const have = profile.experience
    ? `${formatYears(profile.experience.years, locale)} ${t('stage.yearsTotal')} · ${formatMonths(profile.experience.continuousMonths, locale)} ${t('stage.monthsContinuous')}`
    : t('eligibility.expNone')

  return (
    <Callout tone="warn" source={category.requirements[0]?.source}>
      <strong>{t('eligibility.expTitle')}</strong>
      <br />
      {t('eligibility.expText', { category: c(category.title), need: need.join(' · '), have })}{' '}
      <Link to={`${pathsForTrack(profile.track).stage('category')}`}>{t('eligibility.expLink')}</Link>
    </Callout>
  )
}
