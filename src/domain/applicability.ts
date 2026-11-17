import type { CategoryId, Profile, Rule } from '@/content/types'
import { CATEGORIES } from '@/content/categories'

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
