import type { L, SourceId } from './types'

/**
 * The "how this works" page: the whole programme explained in plain language for
 * someone who has never heard of it. Every figure carries the source it came from.
 */
/** One covered item, shown as an icon tile rather than another line of prose. */
export interface AboutFeature {
  /** Icon name resolved in components/StageIcon.tsx. */
  icon: string
  label: L
  text: L
}

/** One step of a numbered procedure, shown as a card in a left-to-right row. */
export interface AboutStep {
  icon: string
  title: L
  text: L
}

export interface AboutBlock {
  /** Short label above the block, e.g. "01". */
  num: string
  title: L
  body: L
  /** Optional short list under the body. */
  points?: L[]
  /** Icon tiles: use when the block enumerates things rather than explaining one. */
  features?: AboutFeature[]
  /** Ordered cards: use when the block describes a procedure that runs in order. */
  steps?: AboutStep[]
  /** Visuals from components/Explain.tsx that carry the block instead of prose. */
  visuals?: ('workback-table' | 'path-lanes' | 'award-timeline' | 'contest-flow' | 'departure-chain')[]
  sources?: SourceId[]
}

/**
 * The four figures that shape the whole programme, pulled out of the blocks below so
 * a reader gets them before any paragraph. Every one carries the act it comes from.
 */
export interface AboutStat {
  value: string
  caption: L
  source: SourceId
}

export const ABOUT_STATS: AboutStat[] = [
  {
    value: '5',
    caption: {
      ru: 'заявок в зарубежные вузы оформляют и подают за счёт стипендии',
      kk: 'шетелдік ЖОО-ға өтінімді стипендия есебінен рәсімдеп, тапсырады',
      en: 'applications to foreign universities are prepared and filed at the scholarship\'s expense',
    },
    source: 'pp573',
  },
  {
    value: '3',
    caption: {
      ru: 'тура конкурса: тестирование, собеседование, комиссия',
      kk: 'конкурс туры: тестілеу, әңгімелесу, комиссия',
      en: 'rounds of the competition: testing, interview, commission',
    },
    source: 'pp573',
  },
  {
    value: '90',
    caption: {
      ru: 'календарных дней на договор после присуждения — 60 у научной стажировки',
      kk: 'тағайындалғаннан кейін шартқа күнтізбелік күн — ғылыми тағылымдамада 60',
      en: 'calendar days for the contract after the award — 60 for a scientific internship',
    },
    source: 'pp573',
  },
  {
    value: '5 / 3',
    caption: {
      ru: 'года отработки: столицы или регионы, если вы учились на степень',
      kk: 'жыл өтеу: астаналар не өңірлер, дәрежеге оқысаңыз',
      en: 'years of work-back: the big cities or the regions, if you studied for a degree',
    },
    source: 'pp573',
  },
]

export const ABOUT_INTRO: L = {
  ru: 'Болашак — государственная стипендия: Казахстан оплачивает вам учёбу или стажировку за границей, а вы после возвращения несколько лет работаете дома по полученной специальности. Ниже — весь путь в одном тексте, без юридических формулировок.',
  kk: 'Болашақ — мемлекеттік стипендия: Қазақстан шетелдегі оқуыңызды не тағылымдамаңызды төлейді, ал сіз оралғаннан кейін бірнеше жыл елде өз мамандығыңыз бойынша жұмыс істейсіз. Төменде — бүкіл жол бір мәтінде, заң тіліңсіз.',
  en: 'Bolashak is a state scholarship: Kazakhstan pays for your studies or internship abroad, and after you come back you work at home in that field for several years. Below is the whole path in one text, without the legal wording.',
}

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    num: '01',
    title: { ru: 'Что оплачивает стипендия', kk: 'Стипендия нені төлейді', en: 'What the scholarship pays for' },
    body: {
      ru: 'Не только само обучение. Почти всё, что связано с поездкой, государство берёт на себя.',
      kk: 'Тек оқудың өзін емес. Сапарға қатысты дүниенің барлығын дерлік мемлекет өзіне алады.',
      en: 'Not just tuition. Almost everything the trip involves is covered by the state.',
    },
    features: [
      {
        icon: 'School',
        label: { ru: 'До 5 заявок в вузы', kk: 'ЖОО-ға 5 өтінімге дейін', en: 'Up to 5 university applications' },
        text: {
          ru: 'Оформление и подачу оплачивают за вас.',
          kk: 'Рәсімдеу мен тапсыруды сіздің орныңызға төлейді.',
          en: 'Preparing and filing them is paid for you.',
        },
      },
      {
        icon: 'PlaneTakeoff',
        label: { ru: 'Дорога и виза', kk: 'Жол және виза', en: 'Travel and visa' },
        text: {
          ru: 'Проезд туда и обратно, а при учёбе дольше года — ещё и к началу каждого учебного года.',
          kk: 'Барып-қайту жолы, ал оқу бір жылдан ұзақ болса — әр оқу жылының басына да.',
          en: 'Travel there and back, and for programmes over a year, to the start of each academic year too.',
        },
      },
      {
        icon: 'Wallet',
        label: { ru: 'Ежемесячные деньги', kk: 'Ай сайынғы қаражат', en: 'A monthly allowance' },
        text: {
          ru: 'Проживание, питание и учебная литература. Суммы утверждены отдельно по странам.',
          kk: 'Тұру, тамақ және оқу әдебиеті. Сомалар елдер бойынша бөлек бекітілген.',
          en: 'Living, food and study materials. The amounts are set per country.',
        },
      },
      {
        icon: 'ShieldCheck',
        label: { ru: 'Медстраховка и медосмотр', kk: 'Медсақтандыру мен медтексеру', en: 'Insurance and health check' },
        text: {
          ru: 'Обязательное медобследование тоже входит в расходы.',
          kk: 'Міндетті медтексеру де шығынға кіреді.',
          en: 'The mandatory health check is covered as well.',
        },
      },
      {
        icon: 'Languages',
        label: { ru: 'Языковые курсы', kk: 'Тіл курстары', en: 'Language courses' },
        text: {
          ru: 'Если они нужны по вашей категории.',
          kk: 'Санатыңыз бойынша қажет болса.',
          en: 'If your category needs them.',
        },
      },
    ],
    sources: ['pp573', 'finance'],
  },
  {
    num: '02',
    title: { ru: 'Что вы обязаны взамен', kk: 'Сіз орнына не міндеттісіз', en: 'What you owe in return' },
    body: {
      ru: 'Вернуться в Казахстан и отработать. Пока обязательства не закрыты, залог или гарантия остаются в силе.',
      kk: 'Қазақстанға оралып, өтеу. Міндеттеме жабылмайынша кепіл не кепілдік күшінде қалады.',
      en: 'Come back to Kazakhstan and work it off. Until the obligation is closed, the pledge or guarantee stays in force.',
    },
    visuals: ['workback-table'],
  },
  {
    num: '03',
    title: { ru: 'Кто может подать', kk: 'Кім тапсыра алады', en: 'Who can apply' },
    body: {
      ru: 'Гражданин Казахстана с нужным уровнем образования, без долгов и незакрытых обязательств по прошлым программам. Отдельного возрастного потолка нет, но есть условие: курсы, учёба и отработка вместе должны уложиться до пенсионного возраста — и считают это уже на день подачи.',
      kk: 'Қажетті білім деңгейі бар, өткен бағдарламалар бойынша берешегі мен жабылмаған міндеттемесі жоқ Қазақстан азаматы. Жеке жас шегі жоқ, бірақ шарт бар: курс, оқу және өтеу бірге зейнеткерлік жасқа дейін сыюы керек — оны тапсыру күні есептейді.',
      en: 'A citizen of Kazakhstan with the right level of education, no debts and no unfinished obligations from earlier programmes. There is no separate age cap, but courses, study and work-back together must fit before retirement age — counted as of the day you apply.',
    },
    points: [
      {
        ru: 'Категорий много: бакалавриат для олимпиадников, магистратура (самостоятельно или по льготной категории), докторантура, резидентура, стажировки и отдельно — научные стажировки для учёных.',
        kk: 'Санат көп: олимпиадашыларға бакалавриат, магистратура (өз бетінше не жеңілдікті санат бойынша), докторантура, резидентура, тағылымдама және бөлек — ғалымдарға ғылыми тағылымдама.',
        en: 'There are many categories: bachelor for olympiad winners, master (on your own or under a preferential category), doctoral, residency, internships — and separately, scientific internships for researchers.',
      },
      {
        ru: 'От категории зависит всё: требования к стажу и GPA, список документов и даже порядок этапов.',
        kk: 'Санаттан бәрі тәуелді: өтіл мен GPA талаптары, құжаттар тізімі, тіпті кезеңдер реті де.',
        en: 'Your category decides everything: experience and GPA requirements, the document list, even the order of the stages.',
      },
    ],
    sources: ['pp573', 'pravila'],
  },
  {
    num: '04',
    title: { ru: 'Как устроен путь', kk: 'Жол қалай құрылған', en: 'How the path is laid out' },
    body: {
      ru: 'Пять глав, одинаковых для всех. Разница одна: в какой момент у вас появляется место в вузе.',
      kk: 'Бәріне бірдей бес тарау. Айырмашылық біреу: ЖОО-дағы орын қай сәтте пайда болады.',
      en: 'Five chapters, the same for everyone. One thing differs: when you get your university place.',
    },
    visuals: ['path-lanes'],
  },
  {
    num: '05',
    title: { ru: 'Как подавать', kk: 'Қалай тапсыру керек', en: 'How to apply' },
    body: {
      ru: 'Три шага. Никуда ехать и ничего отправлять почтой не нужно — кроме одного случая.',
      kk: 'Үш қадам. Ешқайда баруға және поштамен жіберуге қажет жоқ — бір жағдайдан басқа.',
      en: 'Three steps. You do not have to travel anywhere or post anything — with one exception.',
    },
    steps: [
      {
        icon: 'FolderCheck',
        title: { ru: 'Соберите пакет', kk: 'Топтаманы жинаңыз', en: 'Gather the package' },
        text: {
          ru: 'Список документов зависит от категории. В приложении он собран на экране «Документы».',
          kk: 'Құжаттар тізімі санатқа байланысты. Қолданбада ол «Құжаттар» экранында жиналған.',
          en: 'The document list depends on your category. The app collects it on the Documents screen.',
        },
      },
      {
        icon: 'Upload',
        title: { ru: 'Подайте через egov.kz', kk: 'egov.kz арқылы тапсырыңыз', en: 'File through egov.kz' },
        text: {
          ru: 'Исключение — научные стажировки: там пакет несут лично в Центр международных программ в Астане.',
          kk: 'Ерекшелік — ғылыми тағылымдама: онда топтаманы Астанадағы Халықаралық бағдарламалар орталығына өзі апарады.',
          en: 'The exception is scientific internships: there you bring the package to the Center for International Programmes in Astana yourself.',
        },
      },
      {
        icon: 'Clock',
        title: { ru: 'Успейте в срок приёма', kk: 'Қабылдау мерзіміне үлгеріңіз', en: 'Make the intake window' },
        text: {
          ru: 'Даты объявляют каждый год и публикуют не позднее чем за 10 календарных дней до начала.',
          kk: 'Күндерді жыл сайын жариялап, басталуға 10 күнтізбелік күн қалғанда хабарлайды.',
          en: 'The dates are announced each year, at least 10 calendar days before the intake opens.',
        },
      },
    ],
    points: [
      {
        ru: 'Неполный пакет можно донести — но только пока приём ещё идёт.',
        kk: 'Толық емес топтаманы толықтыруға болады — бірақ қабылдау жүріп жатқанда ғана.',
        en: 'An incomplete package can be topped up — but only while the intake is still open.',
      },
      {
        ru: 'За недостоверные документы исключают из конкурса и не допускают к нему в текущем году.',
        kk: 'Жалған құжат үшін конкурстан шығарады және ағымдағы жылы жібермейді.',
        en: 'False documents get you excluded from the competition and barred from it for the current year.',
      },
    ],
    sources: ['pp573', 'egov_bolashak', 'ns_documents'],
  },
  {
    num: '06',
    title: { ru: 'Как проходит конкурс', kk: 'Конкурс қалай өтеді', en: 'How the competition runs' },
    body: {
      ru: 'Три тура подряд. Где именно можно выбыть — зависит от трека, и на схеме это видно.',
      kk: 'Қатарынан үш тур. Қай жерде шығып қалуға болатыны трекке байланысты — сызбада көрінеді.',
      en: 'Three rounds in a row. Where exactly you can drop out depends on the track, and the chart shows it.',
    },
    visuals: ['contest-flow'],

  },
  {
    num: '07',
    title: { ru: 'Что будет после победы', kk: 'Жеңгеннен кейін не болады', en: 'What happens after you win' },
    body: {
      ru: 'Самый жёсткий срок всей процедуры. Не успели — рабочий орган начинает процедуру лишения стипендии.',
      kk: 'Бүкіл рәсімдегі ең қатаң мерзім. Үлгермесеңіз — жұмыс органы стипендиядан айыру рәсімін бастайды.',
      en: 'The tightest deadline in the whole process. Miss it and the working body starts withdrawing the scholarship.',
    },
    visuals: ['award-timeline', 'departure-chain'],
    points: [
      {
        ru: 'Договор залога подписывают только в Астане, поэтому поездку планируйте заранее.',
        kk: 'Кепіл шартына тек Астанада қол қояды, сондықтан сапарды алдын ала жоспарлаңыз.',
        en: 'The pledge agreement is signed only in Astana, so plan the trip in advance.',
      },
    ],

  },
  {
    num: '08',
    title: { ru: 'Сколько времени это занимает', kk: 'Бұл қанша уақыт алады', en: 'How long it takes' },
    body: {
      ru: 'От первой проверки до подачи документов обычно уходит от нескольких месяцев до года — дольше всего готовят язык и поступление в вуз. Сам конкурс с тремя турами занимает ещё несколько месяцев. Приложение считает для вас ориентировочный остаток, но это наша оценка, а не официальный срок.',
      kk: 'Алғашқы тексеруден құжат тапсыруға дейін әдетте бірнеше айдан бір жылға дейін кетеді — ең ұзағы тіл мен ЖОО-ға түсу. Үш турлы конкурстың өзі тағы бірнеше ай алады. Қолданба сізге болжамды қалдықты санайды, бірақ бұл — біздің бағамыз, ресми мерзім емес.',
      en: 'From the first check to submitting documents usually takes a few months to a year — language and university admission take the longest. The three-round competition adds a few more months. The app estimates what is left for you, but that is our estimate, not an official term.',
    },
  },
  {
    num: '09',
    title: { ru: 'Чего это приложение не делает', kk: 'Бұл қолданба не істемейді', en: 'What this app does not do' },
    body: {
      ru: 'Оно не подаёт документы за вас, не связано с Центром международных программ и не принимает решений. Это справочник: он собирает официальные требования в понятный порядок и помогает не потерять шаг. Все цифры здесь взяты из документов, ссылки на которые стоят рядом, а на каждом этапе можно раскрыть дословную цитату.',
      kk: 'Ол сіздің орныңызға құжат тапсырмайды, Халықаралық бағдарламалар орталығына қатысы жоқ және шешім қабылдамайды. Бұл — анықтамалық: ресми талаптарды түсінікті ретке жинап, қадамды жоғалтпауға көмектеседі. Мұндағы барлық сан құжаттардан алынған, сілтемелері қасында тұр, ал әр кезеңде дәйексөзді ашуға болады.',
      en: 'It does not file anything for you, has no connection to the Center for International Programs and makes no decisions. It is a reference: it puts the official requirements in a clear order and helps you not lose your place. Every figure here comes from a document, the links sit next to it, and on each stage you can open the exact quote.',
    },
    points: [
      {
        ru: 'Требования меняются каждый конкурсный год. Перед подачей сверяйтесь с bolashak.gov.kz и личным кабинетом.',
        kk: 'Талаптар жыл сайын өзгереді. Тапсырар алдында bolashak.gov.kz және жеке кабинетпен салыстырыңыз.',
        en: 'The requirements change every competition year. Before applying, check bolashak.gov.kz and your account.',
      },
    ],
    sources: ['pravila', 'cabinet'],
  },
]
