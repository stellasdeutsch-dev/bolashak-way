import type { Category, CategoryId, L, Track, WorkerGroup } from './types'

/**
 * All applicant categories, per п.4 and п.9–14 of the selection rules (pp573),
 * the requirements page (pravila) and, for scientific internships, the Rules approved by
 * приказ МНВО № 422 (ns_rules422) and ns_requirements.
 */

const WORKBACK_ACADEMIC: L = {
  ru: 'После учёбы – отработка не менее 5 лет в Астане, Алматы или Шымкенте либо не менее 3 лет в регионах. Срок сокращается на год, если всё обучение было бесплатным и успеваемость по договору соблюдена.',
  kk: 'Оқудан кейін – Астанада, Алматыда не Шымкентте кемінде 5 жыл не өңірлерде кемінде 3 жыл өтеу. Бүкіл оқу тегін болса және шарттағы үлгерім сақталса, мерзім бір жылға қысқарады.',
  en: 'After your studies – at least 5 years of work-back in Astana, Almaty or Shymkent, or at least 3 years in the regions. The term is one year shorter if the whole programme was free and the contractual grades were kept.',
}

const WORKBACK_CIVIL: L = {
  ru: 'Отработка не менее 3 лет на госслужбе или в органах дипломатической службы. Первый год – в государственном органе, который вас направил.',
  kk: 'Мемлекеттік қызметте не дипломатиялық қызмет органдарында кемінде 3 жыл өтеу. Бірінші жыл – сізді жіберген мемлекеттік органда.',
  en: 'At least 3 years of work-back in public service or the diplomatic service. The first year is at the state body that sent you.',
}

const WORKBACK_EMPLOYER: L = {
  ru: 'Отработка не менее 3 лет в организации, подавшей на вас заявку, в её филиале или представительстве. С согласия работодателя – в другой организации в Казахстане.',
  kk: 'Сізге өтінім берген ұйымда, оның филиалында не өкілдігінде кемінде 3 жыл өтеу. Жұмыс беруші келіссе – Қазақстандағы басқа ұйымда.',
  en: 'At least 3 years of work-back at the organisation that requested your training, its branch or office. With your employer\'s consent – at another organisation in Kazakhstan.',
}

const WORKBACK_NUCLEAR: L = {
  ru: 'Отработка не менее 3 лет в организации, подавшей на вас заявку, в её филиале или представительстве. В другой организации в Казахстане – только по направлению работодателя.',
  kk: 'Сізге өтінім берген ұйымда, оның филиалында не өкілдігінде кемінде 3 жыл өтеу. Қазақстандағы басқа ұйымда – тек жұмыс берушінің жолдамасымен.',
  en: 'At least 3 years of work-back at the organisation that requested your training, its branch or office. At another organisation in Kazakhstan only where your employer sends you.',
}

const WORKBACK_SCIENCE: L = {
  ru: 'Отработка не менее 3 лет подряд по выбранному направлению исследования у работодателя, подавшего заявку. Сменить его можно при ликвидации или реорганизации либо с согласия работодателя и по решению Комиссии – с переходом в другую аккредитованную научную организацию того же направления.',
  kk: 'Өтінім берген жұмыс берушіде таңдалған зерттеу бағыты бойынша қатарынан кемінде 3 жыл өтеу. Оны ұйым таратылғанда не қайта ұйымдастырылғанда не жұмыс берушінің келісімімен және Комиссия шешімімен – сол бағыттағы басқа аккредиттелген ғылыми ұйымға ауысып ауыстыруға болады.',
  en: 'At least 3 continuous years of work-back in your research direction with the employer that requested you. It can change on liquidation or reorganisation, or with the employer\'s consent and the Commission\'s decision – by moving to another accredited research organisation in the same direction.',
}

const KAZ_B1 = {
  text: {
    ru: 'Действующий сертификат КАЗТЕСТ или Qazaq Resmi Test по казахскому языку – не ниже B1.',
    kk: 'Қазақ тілінен қолданыстағы ҚАЗТЕСТ не Qazaq Resmi Test сертификаты – B1-ден төмен емес.',
    en: 'A valid KAZTEST or Qazaq Resmi Test certificate in Kazakh, at B1 or above.',
  },
  source: 'pravila',
} as const

const UNCONDITIONAL = {
  text: {
    ru: 'Безусловное зачисление в зарубежный вуз из официального Списка. Оговорка допускается только про оплату.',
    kk: 'Ресми Тізімдегі шетелдік ЖОО-ға сөзсіз қабылдану. Ескертпе тек төлем туралы болуы мүмкін.',
    en: 'Unconditional admission to a foreign university from the official list. The only condition allowed is about payment.',
  },
  source: 'pravila',
} as const

const GPA = {
  text: {
    ru: 'Средний балл диплома – не ниже GPA 3.00 из 4.00/4.33 или 4.00 из 5.00.',
    kk: 'Диплом орташа балы – 4.00/4.33-тен GPA 3.00 не 5.00-ден 4.00-ден төмен емес.',
    en: 'Diploma GPA of at least 3.00 out of 4.00/4.33, or 4.00 out of 5.00.',
  },
  source: 'pravila',
} as const

const RELATED_SPEC = {
  text: {
    ru: 'Специальность диплома соответствует выбранной по перечню родственных специальностей.',
    kk: 'Диплом мамандығы туыстас мамандықтар тізбесі бойынша таңдалғанға сәйкес келеді.',
    en: 'Your diploma specialty matches the chosen one under the related-specialties list.',
  },
  source: 'related2026',
} as const

const FOREIGN_LANG = {
  text: {
    ru: 'Иностранный язык на уровне не ниже минимального – пороги в таблице приказа № 318.',
    kk: 'Шет тілі ең төменгі деңгейден кем емес – шектер № 318 бұйрық кестесінде.',
    en: 'Foreign language at or above the minimum – the thresholds are in the table of Order No. 318.',
  },
  source: 'prikaz318',
} as const

const EMPLOYER_REQUEST = {
  text: {
    ru: 'Заявка работодателя на ваше обучение по утверждённой форме с сохранением места работы.',
    kk: 'Жұмыс берушінің оқуыңызға бекітілген нысандағы өтінімі, жұмыс орны сақталады.',
    en: 'Your employer\'s request to train you on the approved form, with your job kept.',
  },
  source: 'employer_form',
} as const

export const CATEGORIES: Record<CategoryId, Category> = {
  bachelor: {
    id: 'bachelor',
    track: 'bachelor',
    title: { ru: 'Бакалавриат', kk: 'Бакалавриат', en: "Bachelor's degree" },
    short: { ru: 'Бакалавриат', kk: 'Бакалавриат', en: "Bachelor's" },
    desc: {
      ru: 'Для призёров международных олимпиад и конкурсов, поступивших в ведущий зарубежный вуз.',
      kk: 'Жетекші шетелдік ЖОО-ға түскен халықаралық олимпиадалар мен конкурстардың жүлдегерлеріне.',
      en: 'For medallists of international olympiads and contests admitted to a leading foreign university.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: false,
    languageGroup: 'none',
    requirements: [
      UNCONDITIONAL,
      KAZ_B1,
      {
        text: {
          ru: 'Диплом I, II или III степени за последние 3 года: международная олимпиада по школьным предметам, конкурс научных проектов или конкурс исполнителей. Специальность должна совпадать с предметом олимпиады.',
          kk: 'Соңғы 3 жылдағы I, II не III дәрежелі диплом: мектеп пәндері бойынша халықаралық олимпиада, ғылыми жобалар не орындаушылар конкурсы. Мамандық олимпиада пәніне сай болуы керек.',
          en: 'A 1st, 2nd or 3rd place diploma from the last 3 years: an international school-subject olympiad, a research-project contest or a performers competition. The specialty has to match the olympiad subject.',
        },
        source: 'olympiads',
      },
      {
        text: {
          ru: 'Если вам ещё нет 18 – нотариальное согласие родителей или опекуна на учёбу за границей.',
          kk: '18 жасқа толмасаңыз – ата-ананың не қамқоршының шетелде оқуға нотариалды келісімі.',
          en: 'If you are under 18 – a notarised consent from a parent or guardian for studying abroad.',
        },
        source: 'pravila',
      },
    ],
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  master_self: {
    id: 'master_self',
    track: 'master',
    title: { ru: 'Магистратура – самостоятельно поступивший', kk: 'Магистратура – өз бетінше түскен', en: "Master's – self-admitted" },
    short: { ru: 'Самостоятельно поступаю', kk: 'Өз бетінше түсемін', en: 'Self-admitted' },
    desc: {
      ru: 'Вы сами поступаете (или уже учитесь) в зарубежный вуз из Списка и подаёте документы с приглашением.',
      kk: 'Тізімдегі шетелдік ЖОО-ға өзіңіз түсесіз (не онда оқып жүрсіз) және шақырумен құжат тапсырасыз.',
      en: 'You get into a listed foreign university yourself (or already study there) and apply with the offer.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: false,
    languageGroup: 'self',
    requirements: [UNCONDITIONAL, KAZ_B1],
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  master_rural: {
    id: 'master_rural',
    track: 'master',
    title: { ru: 'Магистратура – из сельского населённого пункта', kk: 'Магистратура – ауылдық елді мекеннен', en: "Master's – rural applicant" },
    short: { ru: 'Из села', kk: 'Ауылдан', en: 'Rural' },
    desc: {
      ru: 'Последние 2 года вы прописаны и работаете в сельском населённом пункте Казахстана.',
      kk: 'Соңғы 2 жыл Қазақстанның ауылдық елді мекенінде тіркелгенсіз және сонда жұмыс істейсіз.',
      en: 'For the last 2 years you have been registered and working in a rural settlement in Kazakhstan.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Прописка и работа в сельском населённом пункте Казахстана последние 2 года.',
          kk: 'Соңғы 2 жылда Қазақстанның ауылдық елді мекенінде тіркеу және жұмыс.',
          en: 'Registration and work in a rural settlement of Kazakhstan for the last 2 years.',
        },
        source: 'pravila',
      },
      GPA,
      RELATED_SPEC,
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 2 },
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  master_engineer: {
    id: 'master_engineer',
    track: 'master',
    title: { ru: 'Магистратура – инженерно-технический работник', kk: 'Магистратура – инженерлік-техникалық қызметкер', en: "Master's – engineering worker" },
    short: { ru: 'Инженерно-технический работник', kk: 'Инженерлік-техникалық қызметкер', en: 'Engineering worker' },
    desc: {
      ru: 'Вы организуете и ведёте производственный процесс, у вас высшее техническое образование (включая ИКТ) и стаж в своей области не менее года.',
      kk: 'Өндірістік процесті ұйымдастырып, жүргізесіз, жоғары техникалық біліміңіз бар (АКТ саласын қоса) және өз саладағы өтіліңіз бір жылдан кем емес.',
      en: 'You organise and run a production process, hold a technical degree (ICT counts) and have at least a year in your field.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Вы организуете и ведёте производство: изготовление, заготовку, хранение, перевозку или переработку. У вас высшее техническое образование, в том числе в ИКТ, и не меньше года стажа в своей области. Учиться можно по техническим специальностям.',
          kk: 'Өндірісті ұйымдастырып, жүргізесіз: дайындау, сақтау, тасымалдау не өңдеу. Жоғары техникалық біліміңіз бар, АКТ-ны қоса, және өз саладағы өтіліңіз бір жылдан кем емес. Техникалық мамандықтар бойынша оқуға болады.',
          en: 'You organise and run production: making, storing, transporting or processing. You hold a technical degree, ICT included, and at least a year in your field. You can study technical specialties.',
        },
        source: 'pravila',
      },
      GPA,
      RELATED_SPEC,
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 1 },
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  master_medical: {
    id: 'master_medical',
    track: 'master',
    title: { ru: 'Магистратура – медицинский работник', kk: 'Магистратура – медицина қызметкері', en: "Master's – medical worker" },
    short: { ru: 'Медицинский работник', kk: 'Медицина қызметкері', en: 'Medical worker' },
    desc: {
      ru: 'Вы оказываете медицинскую помощь в медицинской организации, у вас высшее медицинское образование и общий медицинский стаж от 1 года.',
      kk: 'Медициналық ұйымда медициналық көмек көрсетесіз, жоғары медициналық біліміңіз бар, жалпы медициналық өтіліңіз 1 жылдан кем емес.',
      en: 'You work in a medical organisation providing care, hold higher medical education and have at least 1 year of medical experience.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Вы оказываете медицинскую помощь в медицинской организации, у вас высшее медицинское образование и медицинский стаж не менее года. Учиться можно по медицинским специальностям.',
          kk: 'Медициналық ұйымда медициналық көмек көрсетесіз, жоғары медициналық біліміңіз және кемінде бір жыл медициналық өтіліңіз бар. Медицина мамандықтары бойынша оқуға болады.',
          en: 'You provide medical care at a medical organisation, hold a medical degree and have at least a year of medical experience. You can study medical specialties.',
        },
        source: 'pravila',
      },
      GPA,
      RELATED_SPEC,
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 1 },
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  master_civil: {
    id: 'master_civil',
    track: 'master',
    title: { ru: 'Магистратура – государственный служащий', kk: 'Магистратура – мемлекеттік қызметші', en: "Master's – civil servant" },
    short: { ru: 'Государственный служащий', kk: 'Мемлекеттік қызметші', en: 'Civil servant' },
    desc: {
      ru: 'Вы действующий государственный служащий (кроме политических), стаж на госслужбе от 3 лет, из них последние 12 месяцев – в направляющем органе.',
      kk: 'Қолданыстағы мемлекеттік қызметші (саясилардан басқа), мемлекеттік қызметте 3 жылдан астам өтіл, оның соңғы 12 айы жіберуші органда.',
      en: 'A current civil servant (excluding political appointees) with 3+ years of public service, the last 12 months in the sending body.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'На день подачи вы госслужащий (кроме политических служащих). Стаж на госслужбе не менее 3 лет, из них последние 12 месяцев – в органе, который вас направляет.',
          kk: 'Тапсыру күні сіз мемлекеттік қызметшісіз – саяси қызметшілерден басқа. Мемлекеттік қызметтегі өтіл 3 жылдан кем емес, оның соңғы 12 айы сізді жіберетін органда.',
          en: 'On the day you apply you are a civil servant – political appointees aside. At least 3 years in public service, the last 12 months of them at the body sending you.',
        },
        source: 'pravila',
      },
      EMPLOYER_REQUEST,
      GPA,
      RELATED_SPEC,
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 3, continuousMonths: 12 },
    workBack: WORKBACK_CIVIL,
    sources: ['pravila', 'pp573'],
  },

  master_nuclear: {
    id: 'master_nuclear',
    track: 'master',
    title: { ru: 'Магистратура – работник атомной отрасли', kk: 'Магистратура – атом саласының қызметкері', en: "Master's – nuclear industry worker" },
    short: { ru: 'Работник атомной отрасли', kk: 'Атом саласының қызметкері', en: 'Nuclear industry' },
    desc: {
      ru: 'Вы работаете в атомной энергетике, добыче урана или радиационных технологиях. Общий стаж от 3 лет, из них последние 6 месяцев – в своей области.',
      kk: 'Атом энергетикасында, уран өндіруде не радиациялық технологияларда жұмыс істейсіз. Жалпы өтіл 3 жылдан, оның соңғы 6 айы – өз саласында.',
      en: 'You work in nuclear energy, uranium mining or radiation technology. At least 3 years in total, the last 6 months of them in your field.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Вы работаете в атомной отрасли: госрегулирование атомной энергии, разведка и добыча урана, атомная промышленность, инженерные изыскания и научные исследования, производство радиофармпрепаратов и радиационные технологии. Общий стаж не менее 3 лет, последние 6 месяцев – фактическая работа в своей области.',
          kk: 'Атом саласында жұмыс істейсіз: атом энергиясын мемлекеттік реттеу, уран барлау мен өндіру, атом өнеркәсібі, инженерлік ізденіс пен ғылыми зерттеу, радиофармпрепараттар өндірісі және радиациялық технологиялар. Жалпы өтіл 3 жылдан кем емес, ал соңғы 6 айда өз саласында нақты жұмыс істейсіз.',
          en: 'You work in the nuclear sector: state regulation of nuclear energy, uranium exploration and mining, nuclear industry, engineering surveys and research, radiopharmaceuticals and radiation technology. At least 3 years in total, and for the last 6 months you have actually worked in your field.',
        },
        source: 'pravila',
      },
      EMPLOYER_REQUEST,
      GPA,
      RELATED_SPEC,
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 3, continuousMonths: 6 },
    workBack: WORKBACK_NUCLEAR,
    sources: ['pravila', 'pp573'],
  },

  phd_self: {
    id: 'phd_self',
    track: 'phd_residency',
    title: { ru: 'Докторантура PhD / доктор по профилю', kk: 'PhD докторантура / бейіні бойынша доктор', en: 'PhD / professional doctorate' },
    short: { ru: 'Докторантура', kk: 'Докторантура', en: 'Doctorate' },
    desc: {
      ru: 'Самостоятельное поступление в зарубежный вуз из Списка на PhD или доктора по профилю с индивидуальным учебным планом.',
      kk: 'Тізімдегі шетелдік ЖОО-ға PhD немесе бейіні бойынша докторға жеке оқу жоспарымен өз бетінше түсу.',
      en: 'Self-admission to a listed foreign university for a PhD or professional doctorate with an individual study plan.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: false,
    languageGroup: 'self',
    requirements: [
      UNCONDITIONAL,
      KAZ_B1,
      {
        text: {
          ru: 'Индивидуальный учебный план, согласованный с вузом и не длиннее сроков, которые он установил. С нотариальным переводом.',
          kk: 'ЖОО-мен келісілген және ол белгілеген мерзімнен ұзақ емес жеке оқу жоспары. Нотариалды аудармасымен.',
          en: 'An individual study plan agreed with the university and no longer than the period it sets. With a notarised translation.',
        },
        source: 'pravila',
      },
    ],
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  phd_nuclear: {
    id: 'phd_nuclear',
    track: 'phd_residency',
    title: { ru: 'Докторантура – работник атомной отрасли', kk: 'Докторантура – атом саласының қызметкері', en: 'Doctorate – nuclear industry worker' },
    short: { ru: 'Докторантура, атомная отрасль', kk: 'Докторантура, атом саласы', en: 'Doctorate, nuclear' },
    desc: {
      ru: 'PhD или доктор по профилю для работников атомной отрасли: дополнительно нужны стаж и заявка работодателя.',
      kk: 'Атом саласы қызметкерлеріне PhD немесе бейіні бойынша доктор: қосымша өтіл және жұмыс берушінің өтінімі қажет.',
      en: 'PhD or professional doctorate for nuclear industry workers: work experience and an employer request are additionally required.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: false,
    languageGroup: 'self',
    requirements: [
      UNCONDITIONAL,
      KAZ_B1,
      {
        text: {
          ru: 'Вы работаете в организации атомной отрасли; общий стаж не менее 3 лет, и на момент подачи последние 6 месяцев вы фактически работаете в выбранной области специализации.',
          kk: 'Атом саласының ұйымында жұмыс істейсіз; жалпы жұмыс өтіліңіз 3 жылдан кем емес, әрі тапсыру сәтінде соңғы 6 айда таңдаған мамандану саласында нақты жұмыс істейсіз.',
          en: 'You work at a nuclear-industry organisation; your total work experience is at least 3 years, and when you apply you have actually worked in your chosen field for the last 6 months.',
        },
        source: 'pp573',
      },
      EMPLOYER_REQUEST,
    ],
    experience: { years: 3, continuousMonths: 6 },
    workBack: WORKBACK_NUCLEAR,
    sources: ['pravila', 'pp573'],
  },

  residency: {
    id: 'residency',
    track: 'phd_residency',
    title: { ru: 'Резидентура', kk: 'Резидентура', en: 'Residency' },
    short: { ru: 'Резидентура', kk: 'Резидентура', en: 'Residency' },
    desc: {
      ru: 'Обучение в резидентуре зарубежного вуза из Списка при безусловном зачислении.',
      kk: 'Сөзсіз қабылданған жағдайда тізімдегі шетелдік ЖОО резидентурасында оқу.',
      en: 'Residency training at a listed foreign university with unconditional admission.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: false,
    languageGroup: 'self',
    requirements: [UNCONDITIONAL, KAZ_B1],
    workBack: WORKBACK_ACADEMIC,
    sources: ['pravila', 'pp573'],
  },

  internship: {
    id: 'internship',
    track: 'internship',
    title: { ru: 'Стажировка «Болашак»', kk: '«Болашақ» тағылымдамасы', en: 'Bolashak internship' },
    short: { ru: 'Стажировка', kk: 'Тағылымдама', en: 'Internship' },
    desc: {
      ru: 'До 12 месяцев в зарубежной организации по программе стажировки. Для работников категорий, определённых Республиканской комиссией.',
      kk: 'Шетелдік ұйымда тағылымдама бағдарламасы бойынша 12 айға дейін. Республикалық комиссия айқындаған санаттағы қызметкерлерге.',
      en: 'Up to 12 months at a foreign organisation under an internship programme, for worker categories defined by the Republican Commission.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: true,
    languageGroup: 'internship',
    requirements: [
      {
        text: {
          ru: 'Безусловное приглашение (за исключением финансовых условий) принимающей на стажировку зарубежной организации.',
          kk: 'Тағылымдамаға қабылдайтын шетелдік ұйымның сөзсіз шақыруы (қаржылық шарттарды қоспағанда).',
          en: 'An unconditional invitation (financial conditions excepted) from the host foreign organisation.',
        },
        source: 'pravila',
      },
      {
        text: {
          ru: 'Общий стаж работы не менее 3 лет, в том числе в выбранной области специализации – непрерывно последние 12 месяцев. Для категорий «пользователи системы искусственного интеллекта» и «работники атомной отрасли» – последние 6 месяцев.',
          kk: 'Жалпы жұмыс өтілі кемінде 3 жыл, оның ішінде таңдалған салада – үздіксіз соңғы 12 ай. «Жасанды интеллект жүйесін пайдаланушылар» және «атом саласының қызметкерлері» санаттары үшін – соңғы 6 ай.',
          en: 'At least 3 years of total experience, including 12 continuous months in the chosen field. For "AI system users" and "nuclear industry workers" – the last 6 months.',
        },
        source: 'pravila',
      },
      EMPLOYER_REQUEST,
      {
        text: {
          ru: 'Программа прохождения стажировки, утверждённая направляющей и принимающей организациями, с нотариальным переводом.',
          kk: 'Жіберуші және қабылдаушы ұйымдар бекіткен тағылымдамадан өту бағдарламасы, нотариалды аудармасымен.',
          en: 'An internship programme approved by both the sending and host organisations, with a notarised translation.',
        },
        source: 'internship_program',
      },
      KAZ_B1,
      FOREIGN_LANG,
    ],
    experience: { years: 3, continuousMonths: 12 },
    workBack: WORKBACK_EMPLOYER,
    sources: ['pravila', 'pp573'],
  },

  science_internship: {
    id: 'science_internship',
    track: 'science_internship',
    title: { ru: 'Научная стажировка', kk: 'Ғылыми тағылымдама', en: 'Scientific internship' },
    short: { ru: 'Научная стажировка', kk: 'Ғылыми тағылымдама', en: 'Scientific internship' },
    desc: {
      ru: 'Отдельная программа для учёных: 3–12 месяцев в зарубежном научном центре или вузе. Правила утверждены приказом МНВО РК № 422; документы подают через egov.kz и (или) на бумаге в ЦМП.',
      kk: 'Ғалымдарға арналған жеке бағдарлама: шетелдік ғылыми орталықта немесе ЖОО-да 3–12 ай. Қағидалар ҚР ҒЖБМ № 422 бұйрығымен бекітілген, құжаттар egov.kz арқылы және (немесе) қағаз түрінде ХБО-ға тапсырылады.',
      en: 'A separate programme for scientists: 3–12 months at a foreign research centre or university. Rules approved by Ministry Order No. 422; documents go in through egov.kz and/or on paper at the CIP.',
    },
    preferential: false,
    requiresInvitationAtApplication: true,
    requiresForeignCert: true,
    languageGroup: 'science',
    requirements: [
      {
        text: {
          ru: 'Наличие учёной степени доктора наук, кандидата наук, доктора философии (PhD), доктора по профилю или магистра.',
          kk: 'Ғылым докторы, ғылым кандидаты, философия докторы (PhD), бейіні бойынша доктор немесе магистр дәрежесінің болуы.',
          en: 'A degree of Doctor of Sciences, Candidate of Sciences, PhD, professional doctor or master.',
        },
        source: 'ns_requirements',
      },
      {
        text: {
          ru: 'Стаж непрерывной фактической работы последние 12 месяцев в выбранной области научного исследования в аккредитованных субъектах научной или научно-технической деятельности (юридических лицах), подтверждённый пенсионными отчислениями за весь период.',
          kk: 'Аккредиттелген ғылыми немесе ғылыми-техникалық қызмет субъектілерінде таңдалған ғылыми зерттеу саласында соңғы 12 ай үздіксіз нақты жұмыс өтілі, бүкіл кезеңге зейнетақы аударымдарымен расталған.',
          en: 'Twelve months of continuous actual work in the chosen research field at accredited scientific or research organisations (legal entities), backed by pension contributions for the whole period.',
        },
        source: 'ns_requirements',
      },
      {
        text: {
          ru: 'Безусловное приглашение (кроме финансовых условий) зарубежной организации из списка научных стажировок, принимающей вас по проводимому исследованию.',
          kk: 'Жүргізіліп жатқан зерттеу бойынша сізді қабылдайтын ғылыми тағылымдама тізіміндегі шетелдік ұйымның сөзсіз шақыруы (қаржылық шарттардан басқа).',
          en: 'An unconditional invitation (financial conditions aside) from a foreign organisation on the scientific-internship list, taking you for your ongoing research.',
        },
        source: 'ns_rules422',
      },
      {
        text: {
          ru: 'Не менее одной статьи или обзора в изданиях Web of Science или Scopus либо не менее 1 статьи в изданиях из Списка 1 или Списка 2 Перечня научных изданий и (или) международная заявка Derwent Innovations Index.',
          kk: 'Web of Science немесе Scopus басылымдарында кемінде бір мақала не шолу, не Ғылыми басылымдар тізбесінің 1 не 2 тізіміндегі басылымда кемінде 1 мақала және (немесе) Derwent Innovations Index халықаралық өтінімі.',
          en: 'At least one article or review indexed in Web of Science or Scopus, or at least one article in a journal from List 1 or List 2 of the approved journal register, and/or a Derwent Innovations Index international application.',
        },
        source: 'ns_requirements',
      },
      {
        text: {
          ru: 'Действительные сертификаты по казахскому (не ниже B1) и иностранному языкам на уровне приложения 4 к Правилам – порог зависит от языка стажировки.',
          kk: 'Қазақ (B1-ден төмен емес) және шет тілдері бойынша Қағидалардың 4-қосымшасындағы деңгейдегі жарамды сертификаттар – шек тағылымдама тіліне байланысты.',
          en: 'Valid certificates in Kazakh (B1 or above) and a foreign language at the level in Appendix 4 to the Rules – the threshold depends on the internship language.',
        },
        source: 'ns_rules422',
      },
      {
        text: {
          ru: 'Заявка работодателя на прохождение научной стажировки с условием сохранения места работы и свидетельство об аккредитации организации.',
          kk: 'Жұмыс орнын сақтау шартымен ғылыми тағылымдамадан өтуге жұмыс берушінің өтінімі және ұйымның аккредиттеу туралы куәлігі.',
          en: 'An employer request for the internship with the job retained, plus the organisation\'s accreditation certificate.',
        },
        source: 'ns_documents',
      },
    ],
    experience: { continuousMonths: 12 },
    workBack: WORKBACK_SCIENCE,
    sources: ['ns_requirements', 'ns_rules422'],
  },
}

export const CATEGORIES_BY_TRACK: Record<Track, CategoryId[]> = {
  bachelor: ['bachelor'],
  master: ['master_self', 'master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'],
  phd_residency: ['phd_self', 'phd_nuclear', 'residency'],
  internship: ['internship'],
  science_internship: ['science_internship'],
}

/**
 * Worker categories for Bolashak internships, named as the requirements page lists them
 * (bolashak.gov.kz/ru/pretendentu/pravila, checked 2026-10-28). ПП 573 itself leaves the
 * list to the Republican Commission (п. 3 пп. 2, п. 4 пп. 6).
 */
export const WORKER_GROUPS: { id: WorkerGroup; title: L; shortMonths?: number }[] = [
  { id: 'engineer_agro', title: { ru: 'Инженерно-технические работники, работники сферы агропромышленного комплекса', kk: 'Инженерлік-техникалық қызметкерлер, агроөнеркәсіптік кешен саласының қызметкерлері', en: 'Engineering and technical workers, agro-industrial workers' } },
  { id: 'teacher', title: { ru: 'Педагоги организаций дошкольного, среднего, технического и профессионального образования, педагоги и работники организаций высшего и (или) послевузовского образования', kk: 'Мектепке дейінгі, орта, техникалық және кәсіптік білім беру ұйымдарының педагогтері, жоғары және (немесе) жоғары оқу орнынан кейінгі білім беру ұйымдарының педагогтері мен қызметкерлері', en: 'Teachers at preschool, secondary and technical-vocational organisations; teachers and staff of higher and postgraduate education organisations' } },
  { id: 'medical', title: { ru: 'Медицинские работники', kk: 'Медицина қызметкерлері', en: 'Medical workers' } },
  { id: 'civil', title: { ru: 'Государственные служащие', kk: 'Мемлекеттік қызметшілер', en: 'Civil servants' } },
  { id: 'media', title: { ru: 'Работники средств массовой информации', kk: 'Бұқаралық ақпарат құралдарының қызметкерлері', en: 'Mass media workers' } },
  { id: 'culture', title: { ru: 'Работники сферы культуры, туризма и спорта', kk: 'Мәдениет, туризм және спорт саласының қызметкерлері', en: 'Culture, tourism and sport workers' } },
  { id: 'judge', title: { ru: 'Судьи и работники судов', kk: 'Судьялар және сот қызметкерлері', en: 'Judges and court staff' } },
  { id: 'ai_user', title: { ru: 'Пользователи системы искусственного интеллекта', kk: 'Жасанды интеллект жүйесін пайдаланушылар', en: 'AI system users' }, shortMonths: 6 },
  { id: 'nuclear', title: { ru: 'Работники атомной отрасли', kk: 'Атом саласының қызметкерлері', en: 'Nuclear industry workers' }, shortMonths: 6 },
]

export const getCategory = (id: CategoryId): Category => CATEGORIES[id]
