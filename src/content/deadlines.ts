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
      ru: 'Заключить договор и договор залога или гарантии',
      kk: 'Шарт пен кепіл не кепілдік шартын жасау',
      en: 'Sign the contract and the pledge or guarantee agreement',
    },
    source: 'pp573',
  },
  {
    id: 'contract_ns',
    stage: 'contract',
    anchor: 'award_date',
    days: 90,
    appliesTo: { track: ['science_internship'] },
    label: {
      ru: 'Заключить договор о прохождении научной стажировки',
      kk: 'Ғылыми тағылымдамадан өту туралы шарт жасау',
      en: 'Sign the scientific internship contract',
    },
    source: 'ns_rules422',
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
    id: 'interim_report_science',
    stage: 'studying',
    anchor: 'study_start',
    months: 6,
    appliesTo: { track: ['science_internship'] },
    label: {
      ru: 'Если стажировка дольше 6 месяцев — сдать администратору промежуточный отчёт',
      kk: 'Тағылымдама 6 айдан ұзақ болса — әкімшіге аралық есеп тапсыру',
      en: 'If the internship runs longer than 6 months, submit an interim report to the administrator',
    },
    source: 'ns_rules422',
  },
  {
    id: 'interim_report_internship',
    stage: 'studying',
    anchor: 'study_start',
    months: 6,
    appliesTo: { track: ['internship'] },
    label: {
      ru: 'Если стажировка дольше 6 месяцев — представить промежуточный отчёт и отзыв руководителя',
      kk: 'Тағылымдама 6 айдан ұзақ болса — аралық есеп пен жетекшінің пікірін ұсыну',
      en: 'If the internship runs longer than 6 months, submit an interim report and your supervisor’s feedback',
    },
    source: 'stipendiat_internship',
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
    id: 'ns_return_home',
    stage: 'return',
    anchor: 'study_end',
    days: 30,
    appliesTo: { track: ['science_internship'] },
    label: {
      ru: 'Вернуться в Казахстан и сдать администратору копию паспорта с отметкой о въезде, заявление о завершении и переводы документа об окончании стажировки',
      kk: 'Қазақстанға оралып, әкімшіге кіру белгісі бар паспорт көшірмесін, аяқтау туралы өтінішті және тағылымдаманы аяқтау құжатының аудармаларын тапсыру',
      en: 'Return to Kazakhstan and give the administrator a passport copy with the entry stamp, the completion application and translations of the completion document',
    },
    source: 'ns_rules422',
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
    source: 'ns_rules422',
  },
  {
    id: 'workback_cert',
    stage: 'workback',
    anchor: 'work_start',
    months: 6,
    recurring: true,
    // The duty to report every six months is stated on the scholarship-holder pages for
    // academic study and Bolashak internships. For scientific internships приказ МНВО № 422
    // (п. 36) leaves monitoring to the contract terms and sets no six-monthly duty, so that
    // track is excluded here.
    appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
    label: {
      ru: 'Предоставить сведения о трудоустройстве в Управление по работе с выпускниками — каждые 6 месяцев',
      kk: 'Түлектермен жұмыс басқармасына жұмысқа орналасу туралы мәліметтерді ұсыну — әр 6 ай сайын',
      en: 'Report your employment to the alumni department — every 6 months',
    },
    source: 'stipendiat_master',
  },
  {
    id: 'workback_cert_internship',
    stage: 'workback',
    anchor: 'work_start',
    months: 6,
    recurring: true,
    appliesTo: { track: ['internship'] },
    label: {
      ru: 'Представить справку от работодателя в Департамент по работе с выпускниками — каждые полгода',
      kk: 'Жұмыс берушінің анықтамасын Түлектермен жұмыс департаментіне ұсыну — әр жарты жыл сайын',
      en: 'Submit an employer certificate to the alumni department — every six months',
    },
    source: 'stipendiat_internship',
  },
]

export const deadlinesForStage = (stage: string): DeadlineRule[] => DEADLINE_RULES.filter((r) => r.stage === stage)
