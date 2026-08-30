import type { ChapterId, L, Rule, SourceId, StageId } from './types'

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

/* ─────────────  the competition, as a flowchart  ───────────── */

const NOT_SCIENCE: Rule = { not: { track: ['science_internship'] } }
const SCIENCE: Rule = { track: ['science_internship'] }

export interface FlowStep {
  id: string
  kind: 'start' | 'round' | 'admin' | 'decision' | 'end'
  label: L
  detail?: L
  /** Omitted only on the entry node, which states nothing about the rules. */
  source?: SourceId
  /** Clause the node restates, shown next to it so nothing here is taken on trust. */
  clause?: string
  /** A branch that leaves the main line here — the way out of the competition. */
  exit?: { label: L; source: SourceId; clause: string }
  /** Stage this node corresponds to, used to mark "you are here". */
  stage?: StageId
  appliesTo?: Rule
}

/**
 * Three rounds with the exits drawn in. Prose could say "three rounds" but never made
 * plain where you fall out and what happens then — which is the only part that scares
 * people. Both tracks are here; the rules genuinely differ, so each node cites its own
 * clause: ПП 573 for the scholarship, ПП 791 for scientific internships.
 */
export const CONTEST_FLOW: FlowStep[] = [
  {
    id: 'applied',
    kind: 'start',
    stage: 'apply',
    label: { ru: 'Заявка принята', kk: 'Өтінім қабылданды', en: 'Application accepted' },
  },
  {
    id: 'notice',
    kind: 'admin',
    appliesTo: NOT_SCIENCE,
    label: {
      ru: 'О месте и времени первых двух туров извещают не позднее чем за 10 календарных дней',
      kk: 'Алғашқы екі тур орны мен уақыты туралы 10 күнтізбелік күннен кешіктірмей хабарлайды',
      en: 'You are told the place and time of the first two rounds at least 10 calendar days ahead',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 17',
  },
  {
    id: 'notice_ns',
    kind: 'admin',
    appliesTo: SCIENCE,
    label: {
      ru: 'О месте и времени первых двух туров извещают не позднее чем за 5 календарных дней',
      kk: 'Алғашқы екі тур орны мен уақыты туралы 5 күнтізбелік күннен кешіктірмей хабарлайды',
      en: 'You are told the place and time of the first two rounds at least 5 calendar days ahead',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 16',
  },
  {
    id: 'round1',
    kind: 'round',
    stage: 'testing',
    appliesTo: NOT_SCIENCE,
    label: { ru: 'I тур · Комплексное тестирование', kk: 'I тур · Кешенді тестілеу', en: 'Round I · Comprehensive testing' },
    detail: {
      ru: 'Отборочный тур с допуском на следующий.',
      kk: 'Келесіге жіберетін іріктеу туры.',
      en: 'A qualifying round that decides who goes on.',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 18',
    exit: {
      label: {
        ru: 'Не набрали пороговый балл — ко второму туру не допускают',
        kk: 'Шекті балды жинамасаңыз — екінші турға жібермейді',
        en: 'Below the cut-off score you are not admitted to the second round',
      },
      source: 'pp573',
      clause: 'ПП 573, пункт 18',
    },
  },
  {
    id: 'round1_ns',
    kind: 'round',
    stage: 'testing',
    appliesTo: SCIENCE,
    label: { ru: 'I тур · Комплексное тестирование', kk: 'I тур · Кешенді тестілеу', en: 'Round I · Comprehensive testing' },
    detail: {
      ru: 'Интеллектуальные способности, личностно-деловые компетенции, готовность к стажировке за рубежом.',
      kk: 'Зияткерлік қабілет, тұлғалық-іскерлік құзыреттер, шетелде тағылымдамадан өтуге дайындық.',
      en: 'Intellectual ability, personal and business competencies, readiness for an internship abroad.',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 15',
  },
  {
    id: 'round2',
    kind: 'round',
    stage: 'interview',
    appliesTo: NOT_SCIENCE,
    label: {
      ru: 'II тур · Анонимное персональное собеседование',
      kk: 'II тур · Анонимді жеке әңгімелесу',
      en: 'Round II · Anonymous personal interview',
    },
    detail: {
      ru: 'С независимой экспертной комиссией. Определяют уровень профессиональной подготовки, теоретических знаний и компетенций по вашей специализации.',
      kk: 'Тәуелсіз сараптама комиссиясымен. Кәсіби дайындық, теориялық білім және мамандығыңыз бойынша құзырет деңгейін анықтайды.',
      en: 'With the independent expert commission. It assesses your professional training, theory and competencies in your field.',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 19',
  },
  {
    id: 'round2_ns',
    kind: 'round',
    stage: 'interview',
    appliesTo: SCIENCE,
    label: {
      ru: 'II тур · Анонимное персональное собеседование',
      kk: 'II тур · Анонимді жеке әңгімелесу',
      en: 'Round II · Anonymous personal interview',
    },
    detail: {
      ru: 'С экспертной комиссией. Определяют уровень научно-исследовательской подготовки, теоретических знаний и обоснованность выбора исследования и зарубежной организации.',
      kk: 'Сараптама комиссиясымен. Ғылыми-зерттеу дайындығы, теориялық білім және зерттеу мен шетелдік ұйымды таңдау негізділігі анықталады.',
      en: 'With the expert commission. It assesses your research background, theory and how well you justify the study and the host organisation.',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 16',
  },
  {
    id: 'recommendation',
    kind: 'admin',
    appliesTo: NOT_SCIENCE,
    label: {
      ru: 'Экспертная комиссия даёт рекомендацию по каждому претенденту',
      kk: 'Сараптама комиссиясы әр үміткер бойынша ұсыным береді',
      en: 'The expert commission issues a recommendation on each applicant',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 20',
  },
  {
    id: 'recommendation_ns',
    kind: 'admin',
    appliesTo: SCIENCE,
    label: {
      ru: 'Рекомендация с учётом результатов первого и второго туров',
      kk: 'Бірінші және екінші тур нәтижелерін ескере отырып ұсыным',
      en: 'A recommendation that takes both rounds into account',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 17',
  },
  {
    id: 'to_round3',
    kind: 'admin',
    appliesTo: NOT_SCIENCE,
    label: {
      ru: 'Материалы вносят на третий тур: результаты тестирования, рекомендации и ранжирование',
      kk: 'Материалдар үшінші турға енгізіледі: тест нәтижелері, ұсынымдар және ранжирлеу',
      en: 'The papers go to round three: test results, recommendations and the ranking',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 21',
  },
  {
    id: 'to_round3_ns',
    kind: 'admin',
    appliesTo: SCIENCE,
    label: {
      ru: 'Материалы вносят на третий тур: результаты тестирования и рекомендации',
      kk: 'Материалдар үшінші турға енгізіледі: тест нәтижелері мен ұсынымдар',
      en: 'The papers go to round three: test results and recommendations',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 18',
  },
  {
    id: 'round3',
    kind: 'decision',
    stage: 'commission',
    appliesTo: NOT_SCIENCE,
    label: { ru: 'III тур · Республиканская комиссия', kk: 'III тур · Республикалық комиссия', en: 'Round III · Republican Commission' },
    detail: {
      ru: 'Рассматривает результаты первого и второго туров и принимает окончательное решение.',
      kk: 'Бірінші және екінші тур нәтижелерін қарап, түпкілікті шешім қабылдайды.',
      en: 'Reviews both rounds and takes the final decision.',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 22',
    exit: {
      label: { ru: 'Отказ в присуждении стипендии', kk: 'Стипендия тағайындаудан бас тарту', en: 'The scholarship is refused' },
      source: 'pp573',
      clause: 'ПП 573, пункт 22',
    },
  },
  {
    id: 'round3_ns',
    kind: 'decision',
    stage: 'commission',
    appliesTo: SCIENCE,
    label: { ru: 'III тур · Республиканская комиссия', kk: 'III тур · Республикалық комиссия', en: 'Round III · Republican Commission' },
    detail: {
      ru: 'Принимает окончательное решение о присуждении либо отказе.',
      kk: 'Тағайындау не бас тарту туралы түпкілікті шешім қабылдайды.',
      en: 'Takes the final decision to award or refuse.',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 19',
    exit: {
      label: {
        ru: 'Отказ. К повторному участию в конкурсе текущего года не допускают',
        kk: 'Бас тарту. Ағымдағы жыл конкурсына қайта қатысуға жібермейді',
        en: 'Refused — and not admitted to this year\'s competition again',
      },
      source: 'pp791',
      clause: 'ПП 791, пункт 20',
    },
  },
  {
    id: 'award',
    kind: 'end',
    appliesTo: NOT_SCIENCE,
    label: { ru: 'Стипендия присуждена', kk: 'Стипендия тағайындалды', en: 'The scholarship is awarded' },
    detail: {
      ru: 'Решение публикуют на официальном сайте администратора в течение 3 рабочих дней. Личного письма не будет.',
      kk: 'Шешім әкімшінің ресми сайтында 3 жұмыс күні ішінде жарияланады. Жеке хат келмейді.',
      en: 'The decision is published on the administrator\'s site within 3 working days. There is no personal letter.',
    },
    source: 'pp573',
    clause: 'ПП 573, пункт 22',
  },
  {
    id: 'award_ns',
    kind: 'end',
    appliesTo: SCIENCE,
    label: { ru: 'Научная стажировка присуждена', kk: 'Ғылыми тағылымдама тағайындалды', en: 'The internship is awarded' },
    detail: {
      ru: 'О присуждении извещают публикацией на официальном сайте администратора.',
      kk: 'Тағайындау туралы әкімшінің ресми сайтындағы жарияланыммен хабарлайды.',
      en: 'You are notified by a post on the administrator\'s official site.',
    },
    source: 'pp791',
    clause: 'ПП 791, пункт 19',
  },
  {
    id: 'contract_90',
    kind: 'end',
    stage: 'contract',
    appliesTo: NOT_SCIENCE,
    label: { ru: '90 календарных дней на договор', kk: 'Шартқа 90 күнтізбелік күн', en: '90 calendar days for the contract' },
    source: 'pp573',
    clause: 'ПП 573, пункт 24',
  },
  {
    id: 'contract_60',
    kind: 'end',
    stage: 'contract',
    appliesTo: SCIENCE,
    label: { ru: '60 календарных дней на договор', kk: 'Шартқа 60 күнтізбелік күн', en: '60 calendar days for the contract' },
    source: 'pp791',
    clause: 'ПП 791, пункт 21',
  },
]

/* ─────────────  the run-up to departure  ───────────── */

/** Seven things in a fixed order — the order is the whole point, so it is drawn as a chain. */
export const DEPARTURE_CHAIN: { steps: L[]; note: L; sources: SourceId[] } = {
  steps: [
    { ru: 'Куратор', kk: 'Куратор', en: 'Curator' },
    { ru: 'Письмо о финансовой гарантии', kk: 'Қаржылық кепілдік хаты', en: 'Financial guarantee letter' },
    { ru: 'Визовые документы от вуза', kk: 'ЖОО-дан виза құжаттары', en: 'Visa papers from the university' },
    { ru: 'Банковская карта', kk: 'Банк картасы', en: 'Bank card' },
    { ru: 'Виза', kk: 'Виза', en: 'Visa' },
    { ru: 'Скан визы куратору', kk: 'Виза сканы кураторға', en: 'Visa scan to the curator' },
    { ru: 'Авиабилет', kk: 'Авиабилет', en: 'Flight ticket' },
  ],
  note: {
    ru: 'Порядок именно такой: каждый следующий шаг опирается на документ из предыдущего. Карту оформляют за месяц до отъезда.',
    kk: 'Рет дәл осылай: әр келесі қадам алдыңғысының құжатына сүйенеді. Картаны кетерден бір ай бұрын рәсімдейді.',
    en: 'The order matters: each step needs the document from the one before it. The card is arranged a month before departure.',
  },
  sources: ['stipendiat_master', 'stipendiat_internship', 'viza'],
}
