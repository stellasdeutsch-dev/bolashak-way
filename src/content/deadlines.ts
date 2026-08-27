import type { DeadlineRule } from './types'

/**
 * Official terms that start ticking from a date only the applicant knows.
 * Every rule cites the document it comes from; nothing here is an app estimate.
 */
export const DEADLINE_RULES: DeadlineRule[] = [
  {
    id: 'contract',
    stage: 'contract',
    anchor: 'award_date',
    days: 90,
    appliesTo: { not: { track: ['science_internship'] } },
    label: {
      ru: 'Заключить договор на обучение / прохождение стажировки и договор залога или гарантии',
      kk: 'Оқуға / тағылымдамадан өтуге шарт және кепіл не кепілдік шартын жасау',
      en: 'Sign the study / internship contract and the pledge or guarantee agreement',
    },
    source: 'pp573',
  },
  {
    id: 'contract_ns',
    stage: 'contract',
    anchor: 'award_date',
    days: 60,
    appliesTo: { track: ['science_internship'] },
    label: {
      ru: 'Заключить договор о прохождении научной стажировки',
      kk: 'Ғылыми тағылымдамадан өту туралы шарт жасау',
      en: 'Sign the scientific internship contract',
    },
    source: 'pp791',
  },
  {
    id: 'study_plan',
    stage: 'studying',
    anchor: 'study_start',
    days: 60,
    appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
    label: {
      ru: 'Предоставить куратору учебный план по академическому календарю вуза',
      kk: 'Кураторға ЖОО академиялық күнтізбесі бойынша оқу жоспарын ұсыну',
      en: 'Give your curator the study plan built on the university academic calendar',
    },
    source: 'stipendiat_master',
  },
  {
    id: 'return_home',
    stage: 'return',
    anchor: 'study_end',
    days: 30,
    appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
    label: {
      ru: 'Вернуться в Казахстан для начала трудовой отработки',
      kk: 'Еңбекпен өтеуді бастау үшін Қазақстанға оралу',
      en: 'Return to Kazakhstan to start the work-back period',
    },
    source: 'stipendiat_master',
  },
  {
    id: 'ns_final_report',
    stage: 'return',
    anchor: 'return_date',
    months: 1,
    appliesTo: { track: ['science_internship'] },
    label: {
      ru: 'Сдать администратору итоговый отчёт о научной стажировке, утверждённый работодателем',
      kk: 'Әкімшіге жұмыс беруші бекіткен ғылыми тағылымдама туралы қорытынды есепті тапсыру',
      en: 'Submit the employer-approved final internship report to the administrator',
    },
    source: 'pp791',
  },
  {
    id: 'workback_cert',
    stage: 'workback',
    anchor: 'work_start',
    months: 6,
    recurring: true,
    label: {
      ru: 'Предоставить сведения о трудоустройстве (справку с места работы) — каждые 6 месяцев',
      kk: 'Жұмысқа орналасу туралы мәліметтерді (жұмыс орнынан анықтама) ұсыну — әр 6 ай сайын',
      en: 'Submit employment confirmation (a certificate from your employer) — every 6 months',
    },
    source: 'stipendiat_master',
  },
]

export const deadlinesForStage = (stage: string): DeadlineRule[] => DEADLINE_RULES.filter((r) => r.stage === stage)
