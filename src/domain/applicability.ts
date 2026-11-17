import type { CategoryId, Profile, Rule } from '@/content/types'
import { CATEGORIES, WORKER_GROUPS } from '@/content/categories'

export interface ExperienceRequirement {
  years: number | null
  continuousMonths: number | null
}

/** Experience the category demands, or null when it has no experience requirement. */
export function experienceRequirement(profile: Profile): ExperienceRequirement | null {
  const cat = CATEGORIES[profile.category as CategoryId]
  if (!cat.experience) return null
  // Some internship worker groups need a shorter unbroken term (pp573 п.4 пп.6); the figure
  // lives with the group in the content, so a new decree changes data, not this code.
  const group = profile.track === 'internship' ? WORKER_GROUPS.find((g) => g.id === profile.workerGroup) : undefined
  const months = group?.shortMonths ?? cat.experience.continuousMonths ?? null
  return { years: cat.experience.years ?? null, continuousMonths: months }
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
  return true
}
