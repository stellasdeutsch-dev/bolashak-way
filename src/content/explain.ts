import type { ChapterId, L, Rule, SourceId, StageId, Track } from './types'

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

/** One row of the work-back table, with the programmes it is true for. */
export interface WorkbackRow {
  cells: [L, L, L]
  tracks: Track[]
}

const ACADEMIC: Track[] = ['bachelor', 'master', 'phd_residency']

/** Who owes how much, side by side. Each platform shows only its own rows. */
export const WORKBACK_HEAD: L[] = [
  { ru: 'Кто', kk: 'Кім', en: 'Who' },
  { ru: 'Сколько', kk: 'Қанша', en: 'How long' },
  { ru: 'Где', kk: 'Қайда', en: 'Where' },
]

export const WORKBACK_ROWS: WorkbackRow[] = [
  {
    tracks: ACADEMIC,
    cells: [
      { ru: 'Работаете в столице или городе республиканского значения', kk: 'Астанада не республикалық маңызы бар қалада жұмыс істейсіз', en: 'You work in the capital or a city of national status' },
      { ru: '5 лет', kk: '5 жыл', en: '5 years' },
      { ru: 'Астана, Алматы или Шымкент', kk: 'Астана, Алматы не Шымкент', en: 'Astana, Almaty or Shymkent' },
    ],
  },
  {
    tracks: ACADEMIC,
    cells: [
      { ru: 'Работаете в регионе', kk: 'Өңірде жұмыс істейсіз', en: 'You work in the regions' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'Областные центры, города и районы областей', kk: 'Облыс орталықтары, облыстың қалалары мен аудандары', en: 'Regional centres, towns and districts' },
    ],
  },
  {
    tracks: ['master'],
    cells: [
      { ru: 'Госслужащий', kk: 'Мемлекеттік қызметші', en: 'Civil servant' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'Госслужба; первый год — в органе, который вас направил', kk: 'Мемлекеттік қызмет; бірінші жыл — жіберген органда', en: 'Public service; the first year at the body that sent you' },
    ],
  },
  {
    tracks: ['master', 'phd_residency'],
    cells: [
      { ru: 'Работник атомной отрасли', kk: 'Атом саласының қызметкері', en: 'Nuclear-industry worker' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'У работодателя, в его филиале или по его направлению', kk: 'Жұмыс берушіде, оның филиалында не оның жолдамасымен', en: 'With the employer, at its branch, or where it sends you' },
    ],
  },
  {
    tracks: ['internship'],
    cells: [
      { ru: 'Стажёр', kk: 'Тағылымдамашы', en: 'Intern' },
      { ru: '3 года', kk: '3 жыл', en: '3 years' },
      { ru: 'В организации, которая направила; в другой — с согласия работодателя', kk: 'Жіберген ұйымда; басқасында — жұмыс беруші келісімімен', en: 'At the organisation that sent you; elsewhere with its consent' },
    ],
  },
  {
    tracks: ['science_internship'],
    cells: [
      { ru: 'Учёный после научной стажировки', kk: 'Ғылыми тағылымдамадан кейінгі ғалым', en: 'Researcher after the internship' },
      { ru: '3 года подряд', kk: 'Қатарынан 3 жыл', en: '3 years in a row' },
      { ru: 'У работодателя, который направил; сменить — при его ликвидации или реорганизации либо по решению Комиссии с согласия работодателя, сохранив направление исследования', kk: 'Жіберген жұмыс берушіде; ауыстыру — ол таратылса не қайта ұйымдастырылса, не жұмыс берушінің келісімімен Комиссия шешімі бойынша, зерттеу бағытын сақтап', en: 'With the employer who sent you; a change on its liquidation or reorganisation, or by the Commission\'s decision with the employer\'s consent, keeping your research direction' },
    ],
  },
  {
    tracks: ACADEMIC,
    cells: [
      { ru: 'Всё обучение было бесплатным, успеваемость по договору выдержана', kk: 'Бүкіл оқу тегін болды, шарттағы үлгерім сақталды', en: 'The whole programme was free and the contractual grades were kept' },
      { ru: '−1 год', kk: '−1 жыл', en: '−1 year' },
      { ru: 'Снимают год от срока выше', kk: 'Жоғарыдағы мерзімнен бір жыл алынады', en: 'One year comes off the term above' },
    ],
  },
]

export function workbackTable(track: Track): ExplainTable {
  return {
    head: WORKBACK_HEAD,
    rows: WORKBACK_ROWS.filter((r) => r.tracks.includes(track)).map((r) => r.cells),
    accentColumn: 1,
    sources: track === 'science_internship' ? ['ns_rules422', 'ns_alumni'] : ['pp573'],
  }
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

/**
 * The clock after the award: 90 calendar days for both programmes — ПП 573 п. 24 for the
 * scholarship, приказ МНВО № 422 п. 21 for scientific internships.
 */
export function awardTimeline(track: Track): { total: number; marks: TimelineMark[]; note: L } {
  const science = track === 'science_internship'
  return {
    total: 90,
    note: science
      ? {
          ru: 'Отсчёт идёт в календарных днях и начинается в день решения комиссии, а не в день, когда вы о нём узнали. Если не успеваете из-за болезни, командировки или других обстоятельств, до истечения срока можно один раз попросить продление — до 90 дней с решения Комиссии по рассмотрению обращений.',
          kk: 'Санақ күнтізбелік күнмен жүреді және сіз білген күннен емес, комиссия шешім қабылдаған күннен басталады. Ауру, іссапар не басқа жағдай себебінен үлгермесеңіз, мерзім өткенге дейін бір рет ұзартуды сұрауға болады — Өтініштерді қарау комиссиясының шешімінен бастап 90 күнге дейін.',
          en: 'The count runs in calendar days from the day of the decision, not the day you found out about it. If illness, a work trip or other circumstances get in the way, you can ask once, before the term runs out, for an extension of up to 90 days from the appeals commission\'s decision.',
        }
      : {
          ru: 'Отсчёт идёт в календарных днях и начинается в день решения комиссии, а не в день, когда вы о нём узнали.',
          kk: 'Санақ күнтізбелік күнмен жүреді және сіз білген күннен емес, комиссия шешім қабылдаған күннен басталады.',
          en: 'The count runs in calendar days from the day of the decision, not the day you found out about it.',
        },
    marks: [
      { day: 0, tone: 'start', label: { ru: 'Решение комиссии', kk: 'Комиссия шешімі', en: 'Commission decision' }, source: science ? 'ns_rules422' : 'pp573' },
      science
        ? { day: 90, tone: 'ns', label: { ru: '90 дней — договор и два гаранта', kk: '90 күн — шарт және екі кепілгер', en: '90 days — the contract and two guarantors' }, source: 'ns_rules422' }
        : { day: 90, tone: 'main', label: { ru: '90 дней — договор и залог или гарантия', kk: '90 күн — шарт және кепіл не кепілдік', en: '90 days — contract and pledge or guarantee' }, source: 'pp573' },
    ],
  }
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
 * clause: ПП 573 for the scholarship, приказ МНВО № 422 for scientific internships.
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
      ru: 'О месте, дате и времени первых двух туров извещают по почте или телефону не позднее чем за 10 календарных дней',
      kk: 'Алғашқы екі турдың орны, күні мен уақыты туралы пошта не телефон арқылы 10 күнтізбелік күннен кешіктірмей хабарлайды',
      en: 'You are told the place, date and time of the first two rounds by email or phone at least 10 calendar days ahead',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 16',
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
      ru: 'Отборочный тур с допуском на следующий: интеллектуальные способности, личностно-деловые компетенции, психологическая готовность.',
      kk: 'Келесіге жіберетін іріктеу туры: зияткерлік қабілет, тұлғалық-іскерлік құзыреттер, психологиялық дайындық.',
      en: 'A qualifying round that decides who goes on: intellectual ability, personal and business competencies, psychological readiness.',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 15',
    exit: {
      label: {
        ru: 'Не набрали пороговый балл — ко второму туру не допускают',
        kk: 'Шекті балды жинамасаңыз — екінші турға жібермейді',
        en: 'Below the cut-off score you are not admitted to the second round',
      },
      source: 'ns_rules422',
      clause: 'Приказ № 422, пункт 15',
    },
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
      ru: 'II тур · Персональное собеседование',
      kk: 'II тур · Жеке әңгімелесу',
      en: 'Round II · Personal interview',
    },
    detail: {
      ru: 'С членами экспертной комиссии. Определяют уровень профессиональной подготовки, теоретических знаний и профессиональных компетенций в выбранной области специализации.',
      kk: 'Сараптама комиссиясының мүшелерімен. Таңдалған мамандану саласындағы кәсіби дайындық, теориялық білім және кәсіби құзырет деңгейі анықталады.',
      en: 'With members of the expert commission. It assesses your professional training, theory and professional competencies in your chosen field.',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 15',
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
      ru: 'Экспертная комиссия даёт рекомендацию по каждому претенденту',
      kk: 'Сараптама комиссиясы әр үміткер бойынша ұсыным береді',
      en: 'The expert commission issues a recommendation on each applicant',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 17',
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
      ru: 'Материалы вносят на третий тур: результаты тестирования, рекомендации и ранжирование',
      kk: 'Материалдар үшінші турға енгізіледі: тест нәтижелері, ұсынымдар және ранжирлеу',
      en: 'The papers go to round three: test results, recommendations and the ranking',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 18',
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
      ru: 'Рассматривает результаты первого и второго туров и принимает окончательное решение о присуждении либо отказе.',
      kk: 'Бірінші және екінші тур нәтижелерін қарап, тағайындау не бас тарту туралы түпкілікті шешім қабылдайды.',
      en: 'Reviews both rounds and takes the final decision to award or refuse.',
    },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 19',
    exit: {
      label: {
        ru: 'Отказ. Подать снова можно в этом же году, пока идёт приём, — с выездом в следующем календарном году',
        kk: 'Бас тарту. Сол жылы қабылдау жүріп жатқанда қайта тапсыруға болады — келесі күнтізбелік жылы шығу шартымен',
        en: 'Refused. You may apply again this year while the intake is open — to leave in the next calendar year',
      },
      source: 'ns_rules422',
      clause: 'Приказ № 422, пункт 20',
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
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 19',
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
    id: 'contract_90_ns',
    kind: 'end',
    stage: 'contract',
    appliesTo: SCIENCE,
    label: { ru: '90 календарных дней на договор', kk: 'Шартқа 90 күнтізбелік күн', en: '90 calendar days for the contract' },
    source: 'ns_rules422',
    clause: 'Приказ № 422, пункт 21',
  },
]

/* ─────────────  the run-up to departure  ───────────── */

/** Steps in a fixed order — the order is the whole point, so it is drawn as a chain. */
export interface DepartureChain {
  steps: L[]
  note: L
  sources: SourceId[]
}

export function departureChain(track: Track): DepartureChain {
  if (track === 'internship')
    return {
      steps: [
        { ru: 'Договор', kk: 'Шарт', en: 'Contract' },
        { ru: 'Куратор', kk: 'Куратор', en: 'Curator' },
        { ru: 'Письмо о финансовой гарантии', kk: 'Қаржылық кепілдік хаты', en: 'Financial guarantee letter' },
        { ru: 'Скан письма — в принимающую организацию', kk: 'Хат сканы — қабылдаушы ұйымға', en: 'Letter scan to the host' },
        { ru: 'Банковская карта', kk: 'Банк картасы', en: 'Bank card' },
        { ru: 'Консульский сбор и виза', kk: 'Консулдық алым және виза', en: 'Consular fee and visa' },
        { ru: 'Скан визы куратору', kk: 'Виза сканы кураторға', en: 'Visa scan to the curator' },
        { ru: 'Заявление на авиабилет', kk: 'Авиабилетке өтініш', en: 'Ticket request' },
      ],
      note: {
        ru: 'Карту оформляют за месяц до отъезда, а данные карт-счёта отправляют в Управление финансового обеспечения.',
        kk: 'Картаны кетуге бір ай қалғанда рәсімдеп, карт-шот деректерін қаржы қамтамасыз ету басқармасына жібереді.',
        en: 'The card is opened a month before departure and its details go to the finance department.',
      },
      sources: ['stipendiat_internship', 'viza'],
    }
  if (track === 'science_internship')
    return {
      steps: [
        { ru: 'Договор и два гаранта', kk: 'Шарт және екі кепілгер', en: 'Contract and two guarantors' },
        { ru: 'Сведения по карт-счёту', kk: 'Карт-шот мәліметтері', en: 'Card-account details' },
        { ru: 'Заявление на аванс', kk: 'Авансқа өтініш', en: 'Advance request' },
        { ru: 'Виза', kk: 'Виза', en: 'Visa' },
        { ru: 'Выезд на стажировку', kk: 'Тағылымдамаға шығу', en: 'Departure' },
      ],
      note: {
        ru: 'Договор — основание для оплаты расходов: деньги перечисляют после того, как он заключён.',
        kk: 'Шарт — шығысты төлеу негізі: ақша ол жасалғаннан кейін аударылады.',
        en: 'The contract is the basis for paying costs: money is transferred once it is signed.',
      },
      sources: ['ns_finance', 'ns_rules422'],
    }
  return {
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
      kk: 'Рет дәл осындай: әр келесі қадам алдыңғысының құжатына сүйенеді. Картаны кетуге бір ай қалғанда рәсімдейді.',
      en: 'The order matters: each step needs the document from the one before it. The card is arranged a month before departure.',
    },
    sources: ['stipendiat_master', 'viza'],
  }
}
