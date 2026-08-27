import type { CategoryId, ExamId, Profile, Rule } from '@/content/types'
import { CATEGORIES } from '@/content/categories'
import { LANGUAGE_GROUP_BY_CATEGORY, requiredScore } from '@/content/language'

/** True when the profile's foreign certificate meets the level-III threshold of its category. */
export function foreignCertMeets(profile: Profile): boolean {
  if (!profile.foreignCert) return false
  const group = LANGUAGE_GROUP_BY_CATEGORY[profile.category]
  const need = requiredScore(group, profile.foreignCert.exam)
  if (need === null) return false
  return profile.foreignCert.score >= need
}

/** Threshold the profile is measured against, or null when the app cannot determine it. */
export function foreignThreshold(profile: Profile): { exam: ExamId; need: number } | null {
  if (!profile.foreignCert) return null
  const group = LANGUAGE_GROUP_BY_CATEGORY[profile.category]
  const need = requiredScore(group, profile.foreignCert.exam)
  return need === null ? null : { exam: profile.foreignCert.exam, need }
}

export interface ExperienceRequirement {
  years: number | null
  continuousMonths: number | null
}

/** Experience the category demands, or null when it has no experience requirement. */
export function experienceRequirement(profile: Profile): ExperienceRequirement | null {
  const cat = CATEGORIES[profile.category as CategoryId]
  if (!cat.experience) return null
  let months = cat.experience.continuousMonths ?? null
  // AI-system users and nuclear-industry interns need 6 continuous months instead of 12 (pp573 п.4 пп.6).
  if (profile.category === 'internship' && (profile.workerGroup === 'ai_user' || profile.workerGroup === 'nuclear')) months = 6
  return { years: cat.experience.years ?? null, continuousMonths: months }
}

/** True only when the category has an experience requirement and the profile satisfies every part of it. */
export function meetsExperience(profile: Profile): boolean {
  const req = experienceRequirement(profile)
  if (!req || !profile.experience) return false
  if (req.years !== null && profile.experience.years < req.years) return false
  if (req.continuousMonths !== null && profile.experience.continuousMonths < req.continuousMonths) return false
  return true
}

export function evaluate(rule: Rule | undefined, profile: Profile): boolean {
  if (!rule) return true
  if ('always' in rule) return true
  if ('all' in rule) return rule.all.every((r) => evaluate(r, profile))
  if ('any' in rule) return rule.any.some((r) => evaluate(r, profile))
  if ('not' in rule) return !evaluate(rule.not, profile)
  if ('track' in rule) return rule.track.includes(profile.track)
  if ('category' in rule) return rule.category.includes(profile.category)
  if ('workerGroup' in rule) return profile.workerGroup !== null && rule.workerGroup.includes(profile.workerGroup)
  if ('invitation' in rule) return rule.invitation.includes(profile.invitation)
  if ('hasForeignCert' in rule) return (profile.foreignCert !== null) === rule.hasForeignCert
  if ('foreignMeets' in rule) return foreignCertMeets(profile) === rule.foreignMeets
  if ('kazakhCert' in rule) return profile.kazakhCert === rule.kazakhCert
  if ('experienceYears' in rule) return (profile.experience?.years ?? 0) >= rule.experienceYears.min
  if ('continuousMonths' in rule) return (profile.experience?.continuousMonths ?? 0) >= rule.continuousMonths.min
  if ('meetsExperience' in rule) return meetsExperience(profile) === rule.meetsExperience
  return true
}
