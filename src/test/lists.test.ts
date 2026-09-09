import { describe, expect, it } from 'vitest'
import { matches, matchingEquivalents } from '@/content/lists'
import { SPECIALTIES, UNIVERSITIES, LISTS_TAKEN_ON } from '@/content/lists.generated'

describe('matches', () => {
  it('ignores case, ё and punctuation', () => {
    expect(matches('Ядерная физика', 'ЯДЕРНАЯ')).toBe(true)
    expect(matches('Учёт и аудит', 'учет')).toBe(true)
    expect(matches('Computer Science; Data Science', 'computer, science')).toBe(true)
  })

  it('needs every word, but in any order', () => {
    expect(matches('Искусственный интеллект', 'интеллект искусственный')).toBe(true)
    expect(matches('Искусственный интеллект', 'интеллект машинный')).toBe(false)
  })

  it('is empty-query safe: an empty query is not a filter', () => {
    expect(matches('anything', '   ')).toBe(true)
  })
})

describe('matchingEquivalents', () => {
  it('returns only the equivalents that contain the query', () => {
    const en = 'Nuclear Physics; Applied Physics; Chemistry'
    expect(matchingEquivalents(en, 'physics')).toEqual(['Nuclear Physics', 'Applied Physics'])
  })

  it('says nothing when there is no query', () => {
    expect(matchingEquivalents('Nuclear Physics', '')).toEqual([])
  })

  it('honours the limit', () => {
    const en = Array.from({ length: 10 }, (_, i) => `Science ${i}`).join('; ')
    expect(matchingEquivalents(en, 'science', 3)).toHaveLength(3)
  })
})

/**
 * The two lists are generated from official PDFs by scripts/import-lists.mjs. These guard the
 * shape the search relies on — a parser regression must fail here, not in front of a user.
 */
describe('the generated lists', () => {
  it('carry enough rows to be the real lists', () => {
    expect(SPECIALTIES.length).toBeGreaterThan(50)
    expect(UNIVERSITIES.length).toBeGreaterThan(300)
  })

  it('gives every specialty a name and at least one level with a code', () => {
    for (const sp of SPECIALTIES) {
      expect(sp.ru.length).toBeGreaterThan(2)
      expect(sp.levels.length).toBeGreaterThan(0)
      for (const l of sp.levels) expect(l.code).toMatch(/^\d/)
    }
  })

  it('gives every university a name, a country and an http(s) site', () => {
    for (const u of UNIVERSITIES) {
      expect(u.name.length).toBeGreaterThan(2)
      expect(u.country.length).toBeGreaterThan(1)
      expect(u.url).toMatch(/^https?:\/\//)
    }
  })

  it('records the date the lists were taken', () => {
    expect(LISTS_TAKEN_ON).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })
})
