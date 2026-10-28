import type { Category, CategoryId, L, SourceId } from './types'

/**
 * The requirement matrix shown on the master's and doctorate platforms: categories side by
 * side, one requirement per row. Every row says which act it restates, so the table is
 * checked against the same sources as the stages, not kept as a second copy in a component.
 */

export type MatrixCell = { kind: 'yes' } | { kind: 'no' } | { kind: 'text'; text: L }

export interface MatrixRow {
  id: string
  label: L
  cell: (c: Category) => MatrixCell
  /** Where the row's rule comes from. */
  source: SourceId
}

const yes = (v: boolean): MatrixCell => (v ? { kind: 'yes' } : { kind: 'no' })

/** ПП 573 п. 10 пп. 2 (master's: civil servants, nuclear workers) and п. 12 пп. 9 (doctorate: nuclear workers). */
export const EMPLOYER_REQUEST_CATEGORIES: CategoryId[] = ['master_civil', 'master_nuclear', 'phd_nuclear']

/** ПП 573 п. 12 пп. 8: PhD, professional doctorate and residency alike. */
export const STUDY_PLAN_CATEGORIES: CategoryId[] = ['phd_self', 'phd_nuclear', 'residency']

export const REQUIREMENT_MATRIX: MatrixRow[] = [
  {
    id: 'invitation',
    label: { ru: 'Приглашение при подаче', kk: 'Тапсыру кезінде шақыру', en: 'Offer when applying' },
    cell: (c) => yes(c.requiresInvitationAtApplication),
    source: 'pp573',
  },
  {
    id: 'experience',
    label: { ru: 'Стаж', kk: 'Өтіл', en: 'Experience' },
    cell: (c) => {
      if (!c.experience) return { kind: 'no' }
      const y = c.experience.years
      const m = c.experience.continuousMonths
      return {
        kind: 'text',
        text: {
          ru: [y ? `${y} г.` : '', m ? `${m} мес. подряд` : ''].filter(Boolean).join(', '),
          kk: [y ? `${y} жыл` : '', m ? `қатарынан ${m} ай` : ''].filter(Boolean).join(', '),
          en: [y ? `${y} yr` : '', m ? `${m} mo in a row` : ''].filter(Boolean).join(', '),
        },
      }
    },
    source: 'pp573',
  },
  {
    // ПП 573 п. 9 пп. 4: GPA 3.0 (of 4.0/4.33) for п. 4 пп. 2)–5), 7) — the preferential categories.
    id: 'gpa',
    label: { ru: 'GPA не ниже 3.00', kk: 'GPA 3.00-ден төмен емес', en: 'GPA of 3.00 or more' },
    cell: (c) => yes(c.preferential),
    source: 'pp573',
  },
  {
    // ПП 573 п. 9 пп. 5: same categories.
    id: 'related',
    label: { ru: 'Родственная специальность', kk: 'Туыстас мамандық', en: 'Related specialty' },
    cell: (c) => yes(c.preferential),
    source: 'pp573',
  },
  {
    id: 'employer',
    label: { ru: 'Заявка работодателя', kk: 'Жұмыс беруші өтінімі', en: 'Employer request' },
    cell: (c) => yes(EMPLOYER_REQUEST_CATEGORIES.includes(c.id)),
    source: 'pp573',
  },
  {
    id: 'study_plan',
    label: { ru: 'Индивидуальный учебный план', kk: 'Жеке оқу жоспары', en: 'Individual study plan' },
    cell: (c) => yes(STUDY_PLAN_CATEGORIES.includes(c.id)),
    source: 'pp573',
  },
  {
    // ПП 573 п. 9 пп. 3 asks a foreign-language level only of the preferential categories
    // (level I of Order 318 lets them in, with courses); п. 11–12 ask none of doctoral and
    // residency applicants. Self-admitted applicants prove the language to the university.
    id: 'foreign',
    label: { ru: 'Порог иностранного языка', kk: 'Шет тілі шегі', en: 'Foreign-language threshold' },
    cell: (c) =>
      c.languageGroup === 'preferential'
        ? { kind: 'text', text: { ru: 'I — и курсы', kk: 'I — және курстар', en: 'I — plus courses' } }
        : c.languageGroup === 'self'
          ? { kind: 'text', text: { ru: 'Не условие — по требованию вуза', kk: 'Шарт емес — ЖОО талабы бойынша', en: 'Not a condition — as the university requires' } }
          : { kind: 'no' },
    source: 'prikaz318',
  },
]

/** Sources printed under the matrix. */
export const REQUIREMENT_MATRIX_SOURCES: SourceId[] = ['pravila', 'pp573', 'prikaz318']

/**
 * The two lanes of the master's platform (ПП 573 п. 4, 9, 23): one sample category each,
 * used to draw the path for a reader who has not picked a category yet.
 */
export const MASTER_LANES: { id: 'self' | 'pref'; category: CategoryId; label: L }[] = [
  { id: 'self', category: 'master_self', label: { ru: 'Поступаю сам', kk: 'Өзім түсемін', en: 'Getting in myself' } },
  { id: 'pref', category: 'master_rural', label: { ru: 'Льготная категория', kk: 'Жеңілдікті санат', en: 'Preferential category' } },
]
