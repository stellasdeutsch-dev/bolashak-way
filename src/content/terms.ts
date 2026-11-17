import type { SourceId } from './types'

/**
 * Figures of the rules that the logic counts with. Each is written once, here, with the act
 * it comes from; the code reads it from here, and terms.test.ts checks that every sentence
 * stating it – in Russian, Kazakh and English – says the same number. When a decree changes
 * a figure: change it here, and the test lists every sentence still saying the old one.
 */
export interface RuleTerm {
  value: number
  unit: 'days' | 'months'
  /** Registry ids of the acts the figure comes from. */
  sources: readonly SourceId[]
  /** Where in those acts, as the code has cited it. */
  clause: string
}

export const TERMS = {
  /** Calendar days from the commission's decision to sign the contract and its security. */
  contractWindowDays: {
    value: 90,
    unit: 'days',
    sources: ['pp573', 'ns_rules422'],
    clause: 'ПП 573 п. 24; Правила, утв. приказом МНВО № 422, п. 21',
  },
  /**
   * Unbroken months in the field that AI-system users and nuclear-industry workers need for a
   * Bolashak internship, instead of the category's twelve.
   */
  internshipShortContinuousMonths: {
    value: 6,
    unit: 'months',
    sources: ['pravila', 'pp573'],
    clause: 'ПП 573 п. 4 пп. 6; bolashak.gov.kz/ru/pretendentu/pravila',
  },
} as const satisfies Record<string, RuleTerm>
