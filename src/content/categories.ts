import type { Category, CategoryId, L, Track, WorkerGroup } from './types'

/**
 * All applicant categories, per п.4 and п.9–14 of the selection rules (pp573),
 * the requirements page (pravila) and, for scientific internships, pp791 / ns_requirements.
 */

const WORKBACK_ACADEMIC: L = {
  ru: 'Отработка после обучения: не менее 5 лет в Астане, Алматы или Шымкенте либо не менее 3 лет в регионах. Срок сокращается на 1 год, если весь период обучения был бесплатным от вуза и успеваемость по договору соблюдена.',
  kk: 'Оқудан кейінгі өтеу: Астанада, Алматыда немесе Шымкентте кемінде 5 жыл не өңірлерде кемінде 3 жыл. Оқу тегін болып, шарттағы үлгерім сақталса, мерзім 1 жылға қысқарады.',
  en: 'Work-back after study: at least 5 years in Astana, Almaty or Shymkent, or at least 3 years in the regions. Reduced by one year if the whole programme was free of charge and the contractual academic performance was met.',
}

const WORKBACK_CIVIL: L = {
  ru: 'Отработка: не менее 3 лет на государственной службе или в органах дипломатической службы, причём первый год — непосредственно в направившем государственном органе.',
  kk: 'Өтеу: мемлекеттік қызметте немесе дипломатиялық қызмет органдарында кемінде 3 жыл, оның бірінші жылы — жіберген мемлекеттік органда.',
  en: 'Work-back: at least 3 years in public service or the diplomatic service, with the first year in the state body that sent you.',
}

const WORKBACK_EMPLOYER: L = {
  ru: 'Отработка: не менее 3 лет в организации, по заявке которой вас направили (либо в её филиале, представительстве, а с согласия работодателя — в иной организации в Казахстане).',
  kk: 'Өтеу: сізді жіберген ұйымда кемінде 3 жыл (не оның филиалында, өкілдігінде, жұмыс беруші келіскенде — Қазақстандағы өзге ұйымда).',
  en: 'Work-back: at least 3 years at the organisation whose request sent you (or its branch; with the employer\'s consent, another organisation in Kazakhstan).',
}

const WORKBACK_SCIENCE: L = {
  ru: 'Отработка: не менее 3 лет непрерывно у работодателя, по заявке которого вы поехали. Смена работодателя — только при его ликвидации или реорганизации.',
  kk: 'Өтеу: өтінімі бойынша барған жұмыс берушіде үздіксіз кемінде 3 жыл. Жұмыс берушіні ауыстыру — тек таратылған немесе қайта ұйымдастырылған жағдайда.',
  en: 'Work-back: at least 3 continuous years with the employer that requested your internship. Changing employer is possible only if it is liquidated or reorganised.',
}

const KAZ_B1 = {
  text: {
    ru: 'Действительный сертификат КАЗТЕСТ или Qazaq Resmi Test по казахскому языку с результатом не ниже уровня B1.',
    kk: 'Қазақ тілінен B1 деңгейінен төмен емес жарамды ҚАЗТЕСТ немесе Qazaq Resmi Test сертификаты.',
    en: 'A valid KAZTEST or Qazaq Resmi Test certificate in Kazakh at level B1 or higher.',
  },
  source: 'pravila',
} as const

const UNCONDITIONAL = {
  text: {
    ru: 'Безусловное зачисление (за исключением финансовых условий) в зарубежный вуз из Списка ведущих вузов.',
    kk: 'Жетекші ЖОО тізіміндегі шетелдік ЖОО-ға сөзсіз қабылдану (қаржылық шарттарды қоспағанда).',
    en: 'Unconditional admission (financial conditions excepted) to a foreign university from the official list.',
  },
  source: 'pravila',
} as const

const GPA = {
  text: {
    ru: 'Средний балл диплома бакалавра или специалиста — не ниже GPA 3.00 (из 4.00/4.33) либо 4.00 из 5.00.',
    kk: 'Бакалавр немесе маман дипломының орташа балы — GPA 3.00-ден (4.00/4.33-тен) немесе 5.00-ден 4.00-ден төмен емес.',
    en: 'Bachelor/specialist diploma GPA of at least 3.00 out of 4.00/4.33, or 4.00 out of 5.00.',
  },
  source: 'pravila',
} as const

const RELATED_SPEC = {
  text: {
    ru: 'Специальность по диплому должна соответствовать выбранной специальности по перечню родственных специальностей.',
    kk: 'Диплом бойынша мамандық туыстас мамандықтар тізбесі бойынша таңдалған мамандыққа сәйкес келуі керек.',
    en: 'Your diploma specialty must match the chosen specialty according to the related-specialties list.',
  },
  source: 'related2026',
} as const

const FOREIGN_LANG = {
  text: {
    ru: 'Знание иностранного языка на уровне установленных минимальных требований (таблица пороговых уровней приказа № 318).',
    kk: 'Шет тілін белгіленген ең төменгі талаптар деңгейінде білу (№ 318 бұйрықтың шекті деңгейлер кестесі).',
    en: 'Foreign-language proficiency meeting the established minimum thresholds (threshold table of Order No. 318).',
  },
  source: 'prikaz318',
} as const

const EMPLOYER_REQUEST = {
  text: {
    ru: 'Заявка работодателя на подготовку специалиста с условием сохранения места работы по утверждённой форме.',
    kk: 'Жұмыс орнын сақтау шартымен маман даярлауға жұмыс берушінің бекітілген нысандағы өтінімі.',
    en: 'An employer request to train the specialist with the job retained, on the approved form.',
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
          ru: 'Диплом первой, второй или третьей степени международной олимпиады по общеобразовательным предметам, международного конкурса научных проектов или конкурса исполнителей, полученный за последние 3 года, при совпадении специальности с предметом олимпиады.',
          kk: 'Соңғы 3 жылда алынған халықаралық олимпиаданың, ғылыми жобалар не орындаушылар конкурсының бірінші, екінші немесе үшінші дәрежелі дипломы, мамандық олимпиада пәніне сәйкес болса.',
          en: 'A first, second or third degree diploma from an international subject olympiad, research-project or performers competition obtained in the last 3 years, with the specialty matching the olympiad subject.',
        },
        source: 'olympiads',
      },
      {
        text: {
          ru: 'Для несовершеннолетних — нотариальное согласие законного представителя на обучение за рубежом.',
          kk: 'Кәмелетке толмағандар үшін — заңды өкілдің шетелде оқуға нотариалды келісімі.',
          en: 'For applicants under 18 — a notarised consent of the legal representative to study abroad.',
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
      ru: 'Регистрация по месту жительства и работа в сельском населённом пункте Казахстана последние 2 года.',
      kk: 'Соңғы 2 жыл Қазақстанның ауылдық елді мекенінде тұрғылықты тіркеу және жұмыс.',
      en: 'Registered residence and employment in a rural settlement of Kazakhstan for the last 2 years.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Регистрация по месту жительства и трудовая деятельность в сельском населённом пункте Республики Казахстан последние 2 года.',
          kk: 'Соңғы 2 жылда Қазақстан Республикасының ауылдық елді мекенінде тұрғылықты тіркеу және еңбек қызметі.',
          en: 'Registered residence and employment in a rural settlement of Kazakhstan over the last 2 years.',
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
      ru: 'Организуете и руководите производственным процессом, высшее техническое образование (в том числе ИКТ), стаж в выбранной области от 1 года.',
      kk: 'Өндірістік процесті ұйымдастырасыз және басқарасыз, жоғары техникалық білім (оның ішінде АКТ), таңдалған салада 1 жылдан астам өтіл.',
      en: 'You organise and manage a production process, hold higher technical education (including ICT) and have at least 1 year in the chosen field.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Организация и руководство производственным процессом (производство, заготовка, хранение, транспортировка, обработка), высшее техническое образование, в том числе в отрасли ИКТ, и общий стаж в выбранной области специализации не менее 1 года — для технических специальностей.',
          kk: 'Өндірістік процесті ұйымдастыру және басқару, жоғары техникалық білім (АКТ саласын қоса) және таңдалған мамандану саласында кемінде 1 жыл жалпы өтіл — техникалық мамандықтар үшін.',
          en: 'Organising and managing a production process, higher technical education (including ICT) and at least 1 year of experience in the chosen field of specialisation — for technical specialties.',
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
          ru: 'Трудовая деятельность с оказанием непосредственной медицинской помощи в медицинских организациях, высшее медицинское образование, общий медицинский стаж не менее 1 года. Обучение — по специальностям медицинского направления.',
          kk: 'Медициналық ұйымдарда тікелей медициналық көмек көрсету, жоғары медициналық білім, жалпы медициналық өтіл кемінде 1 жыл. Оқу — медицина бағытындағы мамандықтар бойынша.',
          en: 'Employment providing direct medical care in medical organisations, higher medical education and at least 1 year of medical experience. Study is in medical specialties.',
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
          ru: 'На момент подачи — государственный служащий (за исключением политических государственных служащих) с общим стажем на государственной службе не менее 3 лет, включая последние 12 месяцев в направляющем государственном органе.',
          kk: 'Құжат тапсыру кезінде — мемлекеттік қызметші (саяси қызметшілерден басқа), мемлекеттік қызметте кемінде 3 жыл өтіл, оның ішінде соңғы 12 ай жіберуші мемлекеттік органда.',
          en: 'At the time of application — a civil servant (excluding political appointees) with at least 3 years of public service, including the last 12 months in the sending state body.',
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
      ru: 'Работа в организациях атомной энергетики, урановой добычи, радиационных технологий: общий стаж от 3 лет, из них последние 6 месяцев в выбранной области.',
      kk: 'Атом энергетикасы, уран өндіру, радиациялық технологиялар ұйымдарындағы жұмыс: жалпы өтіл 3 жылдан астам, оның соңғы 6 айы таңдалған салада.',
      en: 'Employment in nuclear energy, uranium mining or radiation technology organisations: 3+ years total, the last 6 months in the chosen field.',
    },
    preferential: true,
    requiresInvitationAtApplication: false,
    requiresForeignCert: true,
    languageGroup: 'preferential',
    requirements: [
      {
        text: {
          ru: 'Трудовая деятельность в организациях государственного регулирования атомной энергии, недропользования (разведка и добыча урана), атомной промышленности, инженерных изысканий и научных исследований в атомной энергетике, производства радиофармпрепаратов и радиационных технологий: общий стаж не менее 3 лет и фактическая работа в выбранной области последние 6 месяцев.',
          kk: 'Атом энергиясын мемлекеттік реттеу, жер қойнауын пайдалану (уран барлау және өндіру), атом өнеркәсібі, инженерлік ізденістер мен ғылыми зерттеулер, радиофармпрепараттар өндірісі ұйымдарындағы жұмыс: жалпы өтіл кемінде 3 жыл және таңдалған салада соңғы 6 ай нақты жұмыс.',
          en: 'Employment in nuclear energy regulation, subsoil use (uranium exploration and mining), nuclear industry, engineering surveys and research, or radiopharmaceutical and radiation technology organisations: at least 3 years total and 6 months of actual work in the chosen field.',
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
          ru: 'Индивидуальный учебный план, согласованный с зарубежным вузом и не превышающий установленные им сроки, с нотариальным переводом.',
          kk: 'Шетелдік ЖОО-мен келісілген және оның мерзімінен аспайтын жеке оқу жоспары, нотариалды аудармасымен.',
          en: 'An individual study plan agreed with the foreign university, not exceeding its stated duration, with a notarised translation.',
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
          ru: 'Общий стаж работы в атомной отрасли не менее 3 лет, в том числе фактическая работа в выбранной области специализации последние 6 месяцев.',
          kk: 'Атом саласындағы жалпы жұмыс өтілі кемінде 3 жыл, оның ішінде таңдалған салада соңғы 6 ай нақты жұмыс.',
          en: 'At least 3 years of total experience in the nuclear industry, including 6 months of actual work in the chosen field.',
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
