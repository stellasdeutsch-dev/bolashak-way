import type { Category, CategoryId, L, Track, WorkerGroup } from './types'

/**
 * All applicant categories, per п.4 and п.9–14 of the selection rules (pp573),
 * the requirements page (pravila) and, for scientific internships, pp791 / ns_requirements.
 */

const WORKBACK_ACADEMIC: L = {
  ru: 'После учёбы отработать не меньше 5 лет в Астане, Алматы или Шымкенте — либо не меньше 3 лет в регионах. Год снимут, если весь период вас учили бесплатно, а успеваемость по договору вы держали.',
  kk: 'Оқудан кейін Астанада, Алматыда не Шымкентте кемінде 5 жыл — не өңірлерде кемінде 3 жыл өтеу керек. Бүкіл кезеңде тегін оқысаңыз және шарттағы үлгерімді ұстасаңыз, бір жыл алынады.',
  en: 'After your studies you owe at least 5 years in Astana, Almaty or Shymkent, or at least 3 years in the regions. One year comes off if your whole programme was free and you kept the grades your contract required.',
}

const WORKBACK_CIVIL: L = {
  ru: 'Отработать не меньше 3 лет на госслужбе или в органах дипломатической службы. Первый год — обязательно в том государственном органе, который вас отправил.',
  kk: 'Мемлекеттік қызметте не дипломатиялық қызмет органдарында кемінде 3 жыл өтеу керек. Бірінші жыл — міндетті түрде сізді жіберген мемлекеттік органда.',
  en: 'You owe at least 3 years in public service or the diplomatic service. The first year has to be at the state body that sent you.',
}

const WORKBACK_EMPLOYER: L = {
  ru: 'Отработать не меньше 3 лет в организации, которая давала на вас заявку, либо в её филиале или представительстве. С согласия работодателя — в другой организации в Казахстане.',
  kk: 'Сізге өтінім берген ұйымда не оның филиалында, өкілдігінде кемінде 3 жыл өтеу керек. Жұмыс беруші келіссе — Қазақстандағы басқа ұйымда.',
  en: 'You owe at least 3 years at the organisation that requested your training, or at its branch. With your employer\'s consent — at another organisation in Kazakhstan.',
}

const WORKBACK_SCIENCE: L = {
  ru: 'Отработать не меньше 3 лет подряд у того работодателя, по заявке которого вы поехали. Сменить его можно, только если организацию ликвидировали или реорганизовали.',
  kk: 'Өтінімі бойынша барған жұмыс берушіде қатарынан кемінде 3 жыл өтеу керек. Оны ауыстыруға тек ұйым таратылса не қайта ұйымдастырылса болады.',
  en: 'You owe at least 3 continuous years with the employer that sent you. You can change it only if the organisation is liquidated or reorganised.',
}

const KAZ_B1 = {
  text: {
    ru: 'Действующий сертификат КАЗТЕСТ или Qazaq Resmi Test по казахскому языку — не ниже B1.',
    kk: 'Қазақ тілінен қолданыстағы ҚАЗТЕСТ не Qazaq Resmi Test сертификаты — B1-ден төмен емес.',
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
    ru: 'Средний балл диплома — не ниже GPA 3.00 из 4.00/4.33 или 4.00 из 5.00.',
    kk: 'Диплом орташа балы — 4.00/4.33-тен GPA 3.00 не 5.00-ден 4.00-ден төмен емес.',
    en: 'Diploma GPA of at least 3.00 out of 4.00/4.33, or 4.00 out of 5.00.',
  },
  source: 'pravila',
} as const

const RELATED_SPEC = {
  text: {
    ru: 'Специальность в дипломе подходит к выбранной — по перечню родственных специальностей.',
    kk: 'Дипломдағы мамандық таңдағаныңызға келеді — туыстас мамандықтар тізбесі бойынша.',
    en: 'Your diploma specialty fits the one you chose, under the related-specialties list.',
  },
  source: 'related2026',
} as const

const FOREIGN_LANG = {
  text: {
    ru: 'Иностранный язык на уровне не ниже минимального — пороги в таблице приказа № 318.',
    kk: 'Шет тілі ең төменгі деңгейден кем емес — шектер № 318 бұйрық кестесінде.',
    en: 'Foreign language at or above the minimum — the thresholds are in the table of Order No. 318.',
  },
  source: 'prikaz318',
} as const

const EMPLOYER_REQUEST = {
  text: {
    ru: 'Заявка от работодателя на вашу учёбу по утверждённой форме, с сохранением места работы.',
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
      ru: 'Для призёров международных олимпиад и конкурсов научных проектов, поступивших в ведущий зарубежный вуз.',
      kk: 'Жетекші шетелдік ЖОО-ға түскен халықаралық олимпиада және ғылыми жоба конкурстарының жүлдегерлеріне.',
      en: 'For winners of international olympiads and research competitions admitted to a leading foreign university.',
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
          ru: 'Если вам ещё нет 18 — нотариальное согласие родителей или опекуна на учёбу за границей.',
          kk: '18 жасқа толмасаңыз — ата-ананың не қамқоршының шетелде оқуға нотариалды келісімі.',
          en: 'If you are under 18 — a notarised consent from a parent or guardian for studying abroad.',
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
    title: { ru: 'Магистратура — самостоятельно поступивший', kk: 'Магистратура — өз бетінше түскен', en: "Master's — self-admitted" },
    short: { ru: 'Самостоятельно поступаю', kk: 'Өз бетінше түсемін', en: 'Self-admitted' },
    desc: {
      ru: 'Вы сами поступаете в зарубежный вуз из Списка (или уже там учитесь) и подаёте на стипендию с приглашением на руках.',
      kk: 'Тізімдегі шетелдік ЖОО-ға өзіңіз түсесіз (немесе онда оқып жатырсыз) және шақыруыңызбен стипендияға өтініш бересіз.',
      en: 'You get admitted to a listed foreign university yourself (or already study there) and apply with the offer in hand.',
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
    title: { ru: 'Магистратура — из сельского населённого пункта', kk: 'Магистратура — ауылдық елді мекеннен', en: "Master's — rural applicant" },
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
    title: { ru: 'Магистратура — инженерно-технический работник', kk: 'Магистратура — инженерлік-техникалық қызметкер', en: "Master's — engineering worker" },
    short: { ru: 'Инженерно-технический работник', kk: 'Инженерлік-техникалық қызметкер', en: 'Engineering worker' },
    desc: {
      ru: 'Вы организуете и ведёте производственный процесс, у вас высшее техническое образование (в том числе в ИКТ) и не меньше года стажа в своей области.',
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
    title: { ru: 'Магистратура — медицинский работник', kk: 'Магистратура — медицина қызметкері', en: "Master's — medical worker" },
    short: { ru: 'Медицинский работник', kk: 'Медицина қызметкері', en: 'Medical worker' },
    desc: {
      ru: 'Работаете в медицинской организации и оказываете медицинскую помощь, высшее медицинское образование, общий медицинский стаж от 1 года.',
      kk: 'Медициналық ұйымда жұмыс істеп, медициналық көмек көрсетесіз, жоғары медициналық білім, жалпы медициналық өтіл 1 жылдан кем емес.',
      en: 'You work in a medical organisation providing care, hold higher medical education and have at least 1 year of medical experience.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Вы работаете в медицинской организации и лечите людей, у вас высшее медицинское образование и не меньше года медицинского стажа. Учиться можно по медицинским специальностям.',
          kk: 'Медициналық ұйымда жұмыс істеп, адамдарды емдейсіз, жоғары медициналық біліміңіз және бір жылдан кем емес медициналық өтіліңіз бар. Медицина мамандықтары бойынша оқуға болады.',
          en: 'You work in a medical organisation treating patients, hold a medical degree and have at least a year of medical experience. You can study medical specialties.',
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
    title: { ru: 'Магистратура — государственный служащий', kk: 'Магистратура — мемлекеттік қызметші', en: "Master's — civil servant" },
    short: { ru: 'Государственный служащий', kk: 'Мемлекеттік қызметші', en: 'Civil servant' },
    desc: {
      ru: 'Действующий государственный служащий (кроме политических), стаж на госслужбе от 3 лет, из них последние 12 месяцев в направляющем органе.',
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
          ru: 'На день подачи вы госслужащий — кроме политических служащих. Стаж на госслужбе не меньше 3 лет, из них последние 12 месяцев в том органе, который вас направляет.',
          kk: 'Тапсыру күні сіз мемлекеттік қызметшісіз — саяси қызметшілерден басқа. Мемлекеттік қызметтегі өтіл 3 жылдан кем емес, оның соңғы 12 айы сізді жіберетін органда.',
          en: 'On the day you apply you are a civil servant — political appointees aside. At least 3 years in public service, the last 12 months of them at the body sending you.',
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
    title: { ru: 'Магистратура — работник атомной отрасли', kk: 'Магистратура — атом саласының қызметкері', en: "Master's — nuclear industry worker" },
    short: { ru: 'Работник атомной отрасли', kk: 'Атом саласының қызметкері', en: 'Nuclear industry' },
    desc: {
      ru: 'Вы работаете в атомной энергетике, добыче урана или радиационных технологиях. Общий стаж от 3 лет, из них последние 6 месяцев — в своей области.',
      kk: 'Атом энергетикасында, уран өндіруде не радиациялық технологияларда жұмыс істейсіз. Жалпы өтіл 3 жылдан, оның соңғы 6 айы — өз саласында.',
      en: 'You work in nuclear energy, uranium mining or radiation technology. At least 3 years in total, the last 6 months of them in your field.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Вы работаете в атомной отрасли: госрегулирование атомной энергии, разведка и добыча урана, атомная промышленность, инженерные изыскания и научные исследования, производство радиофармпрепаратов и радиационные технологии. Общий стаж не меньше 3 лет, а последние 6 месяцев вы фактически работаете в своей области.',
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
    workBack: WORKBACK_EMPLOYER,
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
    title: { ru: 'Докторантура — работник атомной отрасли', kk: 'Докторантура — атом саласының қызметкері', en: 'Doctorate — nuclear industry worker' },
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
          ru: 'Стаж в атомной отрасли не меньше 3 лет, из них последние 6 месяцев вы работаете именно в своей области.',
          kk: 'Атом саласындағы өтіл 3 жылдан кем емес, оның соңғы 6 айында дәл өз саласында жұмыс істейсіз.',
          en: 'At least 3 years in the nuclear sector, and for the last 6 months you have worked specifically in your field.',
        },
        source: 'pravila',
      },
      EMPLOYER_REQUEST,
    ],
    experience: { years: 3, continuousMonths: 6 },
    workBack: WORKBACK_EMPLOYER,
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
          ru: 'Общий стаж работы не менее 3 лет, в том числе в выбранной области специализации — непрерывно последние 12 месяцев. Для категорий «пользователи системы искусственного интеллекта» и «работники атомной отрасли» — последние 6 месяцев.',
          kk: 'Жалпы жұмыс өтілі кемінде 3 жыл, оның ішінде таңдалған салада — үздіксіз соңғы 12 ай. «Жасанды интеллект жүйесін пайдаланушылар» және «атом саласының қызметкерлері» санаттары үшін — соңғы 6 ай.',
          en: 'At least 3 years of total experience, including 12 continuous months in the chosen field. For "AI system users" and "nuclear industry workers" — the last 6 months.',
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
      ru: 'Отдельная программа для учёных: 3–12 месяцев в зарубежном научном центре или вузе. Правила утверждены ПП РК № 791, приём документов — нарочно в ЦМП.',
      kk: 'Ғалымдарға арналған жеке бағдарлама: шетелдік ғылыми орталықта немесе ЖОО-да 3–12 ай. Қағидалар ҚР ҮҚ № 791-мен бекітілген, құжаттар ХБО-ға қолма-қол тапсырылады.',
      en: 'A separate programme for scientists: 3–12 months at a foreign research centre or university. Rules approved by Decree No. 791; documents are submitted in person at the CIP.',
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
          ru: 'Стаж непрерывной фактической работы последние 12 месяцев в выбранной области научного исследования в аккредитованных субъектах научной или научно-технической деятельности (юридических лицах).',
          kk: 'Аккредиттелген ғылыми немесе ғылыми-техникалық қызмет субъектілерінде таңдалған ғылыми зерттеу саласында соңғы 12 ай үздіксіз нақты жұмыс өтілі.',
          en: 'Twelve months of continuous actual work in the chosen research field at accredited scientific or research organisations (legal entities).',
        },
        source: 'ns_requirements',
      },
      {
        text: {
          ru: 'Безусловное приглашение зарубежной организации из Списка, принимающей на научную стажировку по проводимому исследованию.',
          kk: 'Жүргізіліп жатқан зерттеу бойынша ғылыми тағылымдамаға қабылдайтын тізімдегі шетелдік ұйымның сөзсіз шақыруы.',
          en: 'An unconditional invitation from a listed foreign organisation hosting the internship for your research.',
        },
        source: 'ns_orgs',
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
          ru: 'Знание государственного и иностранного языков на уровне требований рабочего органа (файл с минимальными баллами публикуется на сайте).',
          kk: 'Мемлекеттік және шет тілдерін жұмыс органының талаптары деңгейінде білу (ең төменгі балдар файлы сайтта жарияланады).',
          en: 'Command of the state and a foreign language at the level required by the working body (the minimum-score file is published on the website).',
        },
        source: 'ns_minscore',
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
    sources: ['ns_requirements', 'pp791'],
  },
}

export const CATEGORIES_BY_TRACK: Record<Track, CategoryId[]> = {
  bachelor: ['bachelor'],
  master: ['master_self', 'master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'],
  phd_residency: ['phd_self', 'phd_nuclear', 'residency'],
  internship: ['internship'],
  science_internship: ['science_internship'],
}

/** Worker categories for Bolashak internships (bolashak.gov.kz/ru/pretendentu/pravila). */
export const WORKER_GROUPS: { id: WorkerGroup; title: L; shortMonths?: number }[] = [
  { id: 'engineer_agro', title: { ru: 'Инженерно-технические работники, АПК, специалисты по ИИ', kk: 'Инженерлік-техникалық қызметкерлер, АӨК, ЖИ мамандары', en: 'Engineering, agro-industrial and AI specialists' } },
  { id: 'teacher', title: { ru: 'Педагоги и работники образования', kk: 'Педагогтер және білім беру қызметкерлері', en: 'Teachers and education staff' } },
  { id: 'medical', title: { ru: 'Медицинские работники', kk: 'Медицина қызметкерлері', en: 'Medical workers' } },
  { id: 'civil', title: { ru: 'Государственные служащие', kk: 'Мемлекеттік қызметшілер', en: 'Civil servants' } },
  { id: 'media', title: { ru: 'Работники СМИ', kk: 'БАҚ қызметкерлері', en: 'Media workers' } },
  { id: 'culture', title: { ru: 'Работники культуры, туризма и спорта', kk: 'Мәдениет, туризм және спорт қызметкерлері', en: 'Culture, tourism and sport workers' } },
  { id: 'judge', title: { ru: 'Судьи и работники судов', kk: 'Судьялар және сот қызметкерлері', en: 'Judges and court staff' } },
  { id: 'ai_user', title: { ru: 'Пользователи системы искусственного интеллекта', kk: 'Жасанды интеллект жүйесін пайдаланушылар', en: 'AI system users' }, shortMonths: 6 },
  { id: 'nuclear', title: { ru: 'Работники атомной отрасли', kk: 'Атом саласының қызметкерлері', en: 'Nuclear industry workers' }, shortMonths: 6 },
]

export const getCategory = (id: CategoryId): Category => CATEGORIES[id]
