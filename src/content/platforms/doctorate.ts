import type { PlatformHome, StagePatches } from '../types'
import { ACADEMIC_COVERAGE, ACADEMIC_WORKBACK_MISTAKES, FREE_TUITION_NOTE } from './shared'

/**
 * Doctorate platform: PhD, professional doctorate and residency. All three are
 * self-admission (ПП 573 п. 4 пп. 1, п. 11–12): the unconditional offer is needed at
 * application, all three add an individual study plan (п. 12 пп. 8), and nuclear-industry
 * workers add experience and an employer request (п. 4 пп. 8). Neither the conditions
 * (п. 11) nor the package (п. 12) include a foreign-language certificate.
 */

export const DOCTORATE_STAGES: StagePatches = {
  eligibility: {
    checklist: {
      education: {
        ru: 'У вас есть высшее образование: к заявке прикладывают диплом бакалавра или специалиста с приложением.',
        kk: 'Сізде жоғары білім бар: өтінімге қосымшасы бар бакалавр не маман дипломы қоса беріледі.',
        en: "You hold higher education: the application includes your bachelor's or specialist diploma with its transcript.",
      },
      pension_age: {
        ru: 'Учёба и отработка укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Оқу мен өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Study and the work-back fit before retirement age, counted as of the day you apply.',
      },
      once: {
        ru: 'Стипендию дают один раз на каждую степень (PhD, доктор по профилю) и один раз на резидентуру.',
        kk: 'Стипендия әр дәрежеге (PhD, бейіні бойынша доктор) бір рет және резидентураға бір рет беріледі.',
        en: 'The scholarship is given once per degree (PhD, professional doctorate) and once for residency.',
      },
    },
  },

  category: {
    title: { ru: 'PhD, доктор по профилю или резидентура', kk: 'PhD, бейіні бойынша доктор не резидентура', en: 'PhD, professional doctorate or residency' },
    summary: {
      ru: 'Три формата, все – через самостоятельное поступление в вуз из Списка.',
      kk: 'Үш формат, бәрі – Тізімдегі ЖОО-ға өз бетінше түсу арқылы.',
      en: 'Three formats, all through getting into a listed university on your own.',
    },
    why: {
      ru: 'Безусловное приглашение из вуза Списка нужно уже при подаче. Во всех трёх форматах к пакету прикладывают индивидуальный учебный план, согласованный с вузом. Работникам атомной отрасли также нужны общий стаж не менее 3 лет (последние 6 месяцев – фактическая работа в выбранной области) и заявка работодателя.',
      kk: 'Тізімдегі ЖОО-ның сөзсіз шақыруы тапсыру кезінде-ақ керек. Үш форматтың бәрінде топтамаға ЖОО-мен келісілген жеке оқу жоспары қоса беріледі. Атом саласының қызметкерлеріне кемінде 3 жыл жалпы өтіл (соңғы 6 айы – таңдаған саладағы нақты жұмыс) және жұмыс беруші өтінімі де керек.',
      en: "You need the unconditional offer from a listed university when you apply. All three formats add an individual study plan agreed with the university. Nuclear-industry workers also need at least 3 years of total experience (the last 6 months actually working in the chosen field) and their employer's request.",
    },
    inShort: {
      what: { ru: 'Выбор формата: PhD, доктор по профилю или резидентура.', kk: 'Форматты таңдау: PhD, бейіні бойынша доктор не резидентура.', en: 'Choosing the format: PhD, professional doctorate or residency.' },
      you: { ru: 'Определить формат и проверить условия: приглашение, индивидуальный план; для атомной отрасли – стаж и заявка работодателя.', kk: 'Форматты анықтап, шарттарын тексеру: шақыру, жеке жоспар; атом саласына – өтіл мен жұмыс беруші өтінімі.', en: 'Settle the format and check its conditions: the offer, the individual plan; for the nuclear industry, experience and an employer request.' },
      result: { ru: 'Этапы в приложении подобраны под ваш формат.', kk: 'Қолданбадағы кезеңдер форматыңызға қарай іріктелген.', en: 'The stages in the app are matched to your format.' },
    },
    mistakes: [
      {
        ru: 'Подать документы без индивидуального учебного плана: он входит в пакет вместе с нотариальным переводом.',
        kk: 'Жеке оқу жоспарынсыз құжат тапсыру: ол нотариалды аудармасымен бірге топтамаға кіреді.',
        en: 'Applying without the individual study plan: it is part of the package, with a notarised translation.',
      },
      {
        ru: 'Заложить в план больше времени, чем даёт вуз: индивидуальный план не может быть длиннее установленных вузом сроков.',
        kk: 'Жоспарға ЖОО берген мерзімнен көп уақыт салу: жеке жоспар ЖОО белгілеген мерзімнен ұзақ бола алмайды.',
        en: 'Planning more time than the university allows: the individual plan cannot run longer than the university\'s own terms.',
      },
    ],
  },

  specialty: {
    inShort: {
      what: { ru: 'Проверка, финансируется ли ваше направление на уровне докторантуры.', kk: 'Бағытыңыз докторантура деңгейінде қаржыландырыла ма – соны тексеру.', en: 'A check that your field is funded at doctoral level.' },
      you: { ru: 'Найти направление в перечне на уровне «Докторантура».', kk: 'Тізбеден «Докторантура» деңгейіндегі бағытты табу.', en: 'Find your field in the list at the doctoral level.' },
      result: { ru: 'Код специальности с буквой «Д» из перечня текущего года.', kk: 'Ағымдағы жыл тізбесіндегі «Д» әрпі бар мамандық коды.', en: 'A specialty code ending in "Д" from this year\'s list.' },
    },
  },

  foreign: {
    summary: {
      ru: 'Правила не делают иностранный язык условием участия: язык проверяет вуз при безусловном зачислении.',
      kk: 'Қағида шет тілін қатысу шарты етпейді: тілді ЖОО сөзсіз қабылдау кезінде тексереді.',
      en: 'The Rules do not make a foreign language a condition of taking part: the university checks it when it admits you unconditionally.',
    },
    why: {
      ru: 'Иностранного языка нет ни в условиях участия (ПП № 573, п. 11), ни в списке документов (п. 12). В первую очередь ориентируйтесь на требование вуза.',
      kk: 'Шет тілі қатысу шарттарында да (№ 573 ҮҚ, 11-тармақ), құжаттар тізімінде де (12-тармақ) жоқ. Ең алдымен ЖОО талабына сүйеніңіз.',
      en: 'A foreign language is in neither the conditions (Decree No. 573, п. 11) nor the document list (п. 12). Go by the university\'s requirement first.',
    },
    inShort: {
      what: { ru: 'Язык обучения – по требованиям вуза.', kk: 'Оқу тілі – ЖОО талаптары бойынша.', en: "The language of study – by the university's requirements." },
      you: { ru: 'Сдать экзамен на балл, который требует вуз, и уточнить в Центре, нужен ли порог приказа № 318.', kk: 'Емтиханды ЖОО талап ететін балға тапсырып, № 318 бұйрық шегі керек пе, Орталықтан нақтылау.', en: 'Sit the exam at the score the university asks for and check with the Center whether the Order No. 318 threshold applies.' },
      result: { ru: 'Безусловное зачисление без языкового условия.', kk: 'Тілдік шартсыз сөзсіз қабылдану.', en: 'Unconditional admission with no language condition.' },
    },
    checklist: {
      know_threshold: {
        ru: 'Знаете, какой экзамен и балл требует вуз; порог приказа № 318 – в таблице ниже, для сведения.',
        kk: 'ЖОО қандай емтихан мен балл талап ететінін білесіз; № 318 бұйрық шегі – төмендегі кестеде, мәлімет үшін.',
        en: 'You know which exam and score your university requires; the Order No. 318 threshold is in the table below, for reference.',
      },
    },
  },

  admission: {
    why: {
      ru: 'Приглашение должно быть безусловным – без учебных условий; условие об оплате допустимо, оплату берёт на себя стипендия. К приглашению прилагается индивидуальный учебный план, согласованный с вузом и не длиннее его сроков, – тоже с нотариальным переводом.',
      kk: 'Шақыру сөзсіз болуы керек – оқу шарттарынсыз; төлем туралы шарт болуы мүмкін, оны стипендия төлейді. Шақыруға ЖОО-мен келісілген, оның мерзімінен ұзақ емес жеке оқу жоспары қоса беріледі – ол да нотариалды аудармамен.',
      en: 'The offer has to be unconditional – no study conditions; a payment condition is acceptable, the scholarship pays. It comes with an individual study plan agreed with the university and no longer than its terms – also with a notarised translation.',
    },
  },

  workback: {
    summary: {
      ru: '5 лет в Астане, Алматы или Шымкенте либо 3 года в регионах; работникам атомной отрасли – 3 года у работодателя.',
      kk: 'Астанада, Алматыда не Шымкентте 5 жыл не өңірлерде 3 жыл; атом саласының қызметкерлеріне – жұмыс берушіде 3 жыл.',
      en: 'Five years in Astana, Almaty or Shymkent, or three in the regions; nuclear-industry workers owe three years to their employer.',
    },
    mistakes: [
      ...ACADEMIC_WORKBACK_MISTAKES,
      {
        ru: 'Работникам атомной отрасли – перейти в другую организацию без направления работодателя: отработка проходит у него, в его филиале или там, куда он направит.',
        kk: 'Атом саласының қызметкерлеріне – жұмыс берушінің жолдамасынсыз басқа ұйымға ауысу: өтеу соның өзінде, филиалында не ол жіберген жерде өтеді.',
        en: 'Nuclear-industry workers: moving to another organisation without the employer sending you: the work-back is served with them, at their branch or where they send you.',
      },
    ],
  },
}

export const DOCTORATE_HOME: PlatformHome = {
  intro: {
    ru: 'PhD, доктор по профилю или резидентура за рубежом за счёт государства. Путь один – самостоятельное поступление: при подаче нужны безусловное приглашение из вуза Списка и согласованный с вузом индивидуальный учебный план. Иностранный язык проверяет вуз; сертификата в пакете нет.',
    kk: 'Шетелде мемлекет есебінен PhD, бейіні бойынша доктор не резидентура. Жол біреу – өз бетінше түсу: тапсыру кезінде Тізімдегі ЖОО-ның сөзсіз шақыруы және ЖОО-мен келісілген жеке оқу жоспары керек. Шет тілін ЖОО тексереді; топтамада сертификат жоқ.',
    en: 'A PhD, professional doctorate or residency abroad paid by the state. There is one road – getting in on your own: when you apply you need the unconditional offer from a listed university and an individual study plan agreed with it. The university checks your foreign language; there is no certificate in the package.',
  },
  facts: [
    { value: '3', caption: { ru: 'формата: PhD, доктор по профилю, резидентура', kk: 'формат: PhD, бейіні бойынша доктор, резидентура', en: 'formats: PhD, professional doctorate, residency' }, source: 'pp573' },
    { value: '90', caption: { ru: 'календарных дней на договор после решения комиссии', kk: 'күнтізбелік күн комиссия шешімінен кейін шартқа', en: 'calendar days to sign the contract after the commission decides' }, source: 'pp573' },
    { value: 'B1', caption: { ru: 'казахский язык', kk: 'қазақ тілі', en: 'Kazakh' }, source: 'pravila' },
    { value: '5 / 3', caption: { ru: 'лет отработки в столице и городах республиканского значения / в регионах; работникам атомной отрасли – 3 года', kk: 'жыл өтеу: астанада және республикалық маңызы бар қалаларда / өңірлерде; атом саласы қызметкерлеріне – 3 жыл', en: 'years of work-back in the capital and cities of national status / in the regions; nuclear-industry workers owe 3' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'Вы поступили или поступаете без условий на PhD, доктора по профилю или в резидентуру вуза из Списка.', kk: 'Тізімдегі ЖОО-ның PhD, бейіні бойынша доктор не резидентурасына шартсыз түстіңіз не түсіп жатырсыз.', en: 'You have got or are getting an unconditional place for a PhD, professional doctorate or residency at a listed university.' },
    { ru: 'Вуз согласовал с вами индивидуальный учебный план, не длиннее своих сроков.', kk: 'ЖОО сізбен өз мерзімінен ұзақ емес жеке оқу жоспарын келісті.', en: 'The university has agreed an individual study plan with you, no longer than its own terms.' },
    { ru: 'Для работников атомной отрасли: общий стаж не менее 3 лет, из них последние 6 месяцев – в выбранной области, и заявка работодателя.', kk: 'Атом саласының қызметкерлеріне: кемінде 3 жыл жалпы өтіл, оның соңғы 6 айы – таңдаған салада, және жұмыс беруші өтінімі.', en: 'For nuclear-industry workers: at least 3 years of total experience, the last 6 months in the chosen field, and an employer request.' },
  ],
  fitNo: [
    { text: { ru: 'Вам нужна исследовательская стажировка на 3–12 месяцев, а не степень.', kk: 'Сізге дәреже емес, 3–12 айлық зерттеу тағылымдамасы керек.', en: 'You want a 3–12 month research placement, not a degree.' }, go: 'science' },
    { text: { ru: 'Вы хотите получить степень магистра.', kk: 'Магистр дәрежесін алғыңыз келеді.', en: "You want a master's degree." }, go: 'master' },
  ],
  fitSources: ['pp573', 'pravila'],
  coverage: ACADEMIC_COVERAGE,
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
