import type { ChapterId, L, SourceId } from './types'

/**
 * Content for the explanatory visuals: a table, a two-lane path diagram and a timeline.
 * Nothing new is asserted here — every row and marker restates a fact that already
 * lives in the stage content and carries the same source.
 */

export interface ExplainTable {
  head: L[]
  rows: L[][]
  /** Column index whose cells read as the headline figure and get emphasis. */
  accentColumn?: number
  sources: SourceId[]
}

/** Who owes how much, side by side. Prose made this list hard to compare. */
export const WORKBACK_TABLE: ExplainTable = {
  head: [
    { ru: 'Кто и как учился', kk: 'Кім және қалай оқыды', en: 'Who studied, and how' },
    { ru: 'Сколько', kk: 'Қанша', en: 'How long' },
    { ru: 'Где', kk: 'Қайда', en: 'Where' },
  ],
  accentColumn: 1,
  rows: [
    [
      { ru: 'Учились на степень', kk: 'Дәрежеге оқыдыңыз', en: 'You studied for a degree' },
      { ru: '5 лет', kk: '5 жыл', en: '5 years' },
      { ru: 'Астана, Алматы или Шымкент', kk: 'Астана, Алматы не Шымкент', en: 'Astana, Almaty or Shymkent' },
    ],
    [
      { ru: 'Учились на степень', kk: 'Дәрежеге оқыдыңыз', en: 'You studied for a degree' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'Любой регион, кроме этих трёх городов', kk: 'Осы үш қаладан басқа кез келген өңір', en: 'Any region outside those three cities' },
    ],
    [
      { ru: 'Госслужащий', kk: 'Мемлекеттік қызметші', en: 'Civil servant' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'Госслужба; первый год — в органе, который вас направил', kk: 'Мемлекеттік қызмет; бірінші жыл — жіберген органда', en: 'Public service; the first year at the body that sent you' },
    ],
    [
      { ru: 'Стажировка или научная стажировка', kk: 'Тағылымдама не ғылыми тағылымдама', en: 'Internship or scientific internship' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'У своего работодателя', kk: 'Өз жұмыс берушіңізде', en: 'With your own employer' },
    ],
    [
      { ru: 'Всё обучение было бесплатным, успеваемость по договору выдержана', kk: 'Бүкіл оқу тегін болды, шарттағы үлгерім сақталды', en: 'The whole programme was free and you kept the required grades' },
      { ru: '−1 год', kk: '−1 жыл', en: '−1 year' },
      { ru: 'Снимают год от срока выше', kk: 'Жоғарыдағы мерзімнен бір жыл алынады', en: 'One year comes off the term above' },
    ],
  ],
  sources: ['pp573', 'pp791'],
}

/**
 * The path is the same five chapters for everyone; only the university offer moves.
 * Two lanes make that visible in a way the paragraph never did.
 */
export interface PathLane {
  id: 'self' | 'preferential'
  title: L
  note: L
  /** Chapter where this lane secures the university place. */
  admissionAt: ChapterId
  admissionLabel: L
}

export const PATH_LANES: PathLane[] = [
  {
    id: 'self',
    title: { ru: 'Поступаете сами', kk: 'Өз бетіңізше түсесіз', en: 'You get in on your own' },
    note: {
      ru: 'Приглашение от вуза нужно уже при подаче документов.',
      kk: 'ЖОО шақыруы құжат тапсыру кезінде керек.',
      en: 'You need the university offer already when you apply.',
    },
    admissionAt: 'prepare',
    admissionLabel: { ru: 'Приглашение от вуза', kk: 'ЖОО шақыруы', en: 'University offer' },
  },
  {
    id: 'preferential',
    title: { ru: 'Льготная категория', kk: 'Жеңілдікті санат', en: 'Preferential category' },
    note: {
      ru: 'Сначала конкурс и языковые курсы, вуз ищете после присуждения.',
      kk: 'Алдымен конкурс пен тіл курстары, ЖОО-ны тағайындалғаннан кейін іздейсіз.',
      en: 'The competition and language courses come first; you look for a university after the award.',
    },
    admissionAt: 'awarded',
    admissionLabel: { ru: 'Курсы, затем поступление', kk: 'Курстар, содан кейін түсу', en: 'Courses, then admission' },
  },
]

export const PATH_LANES_SOURCE: SourceId = 'pp573'

/** What the clock does the moment the Republican Commission names you. */
export interface TimelineMark {
  /** Days from the anchor. */
  day: number
  label: L
  /** Which applicants this mark is for; undefined means everyone. */
  tone: 'start' | 'ns' | 'main'
  source: SourceId
}

export const AWARD_TIMELINE: { title: L; note: L; total: number; marks: TimelineMark[] } = {
  title: { ru: 'Отсчёт после присуждения', kk: 'Тағайындалғаннан кейінгі санақ', en: 'The clock after the award' },
  note: {
    ru: 'Отсчёт идёт в календарных днях и начинается в день решения комиссии, а не в день, когда вы о нём узнали.',
    kk: 'Санақ күнтізбелік күнмен жүреді және комиссия шешімі күні басталады, сіз білген күні емес.',
    en: 'The count runs in calendar days from the day of the decision, not the day you found out about it.',
  },
  total: 90,
  marks: [
    {
      day: 0,
      tone: 'start',
      label: { ru: 'Решение комиссии', kk: 'Комиссия шешімі', en: 'Commission decision' },
      source: 'pp573',
    },
    {
      day: 60,
      tone: 'ns',
      label: { ru: '60 дней — договор по научной стажировке', kk: '60 күн — ғылыми тағылымдама шарты', en: '60 days — scientific internship contract' },
      source: 'pp791',
    },
    {
      day: 90,
      tone: 'main',
      label: { ru: '90 дней — договор и залог или гарантия', kk: '90 күн — шарт және кепіл не кепілдік', en: '90 days — contract and pledge or guarantee' },
      source: 'pp573',
    },
  ],
}
