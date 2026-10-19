import type { PlatformHome, StagePatches } from '../types'
import { ACADEMIC_COVERAGE, ACADEMIC_WORKBACK_MISTAKES, FREE_TUITION_NOTE } from './shared'

/**
 * Doctorate platform: PhD, professional doctorate and residency. All three are
 * self-admission (ПП 573 п. 4 пп. 1, п. 11–12): the unconditional offer is needed at
 * application, PhD and professional doctorate add an individual study plan, and
 * nuclear-industry workers add experience and an employer request (п. 4 пп. 8).
 */

export const DOCTORATE_STAGES: StagePatches = {
  eligibility: {
    checklist: {
      education: {
        ru: 'У вас есть высшее образование — к заявке прикладывают диплом бакалавра или специалиста с приложением.',
        kk: 'Сізде жоғары білім бар — өтінімге қосымшасы бар бакалавр не маман дипломы қоса беріледі.',
        en: "You hold higher education — the application includes your bachelor's or specialist diploma with its transcript.",
      },
      pension_age: {
        ru: 'Учёба и отработка вместе укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Оқу мен өтеу бірге зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Study and the work-back together fit before retirement age. It is counted as of the day you apply.',
      },
      once: {
        ru: 'Вы знаете, что стипендию дают один раз на каждую степень — PhD, доктора по профилю — и один раз на резидентуру.',
        kk: 'Стипендия әр дәрежеге — PhD, бейіні бойынша доктор — бір рет және резидентураға бір рет берілетінін білесіз.',
        en: 'You know the scholarship is given once per degree — PhD, professional doctorate — and once for residency.',
      },
    },
  },

  category: {
    title: { ru: 'PhD, доктор по профилю или резидентура', kk: 'PhD, бейіні бойынша доктор не резидентура', en: 'PhD, professional doctorate or residency' },
    summary: {
      ru: 'Три формата, все — через самостоятельное поступление в вуз из Списка.',
      kk: 'Үш формат, бәрі — Тізімдегі ЖОО-ға өз бетінше түсу арқылы.',
      en: 'Three formats, all through getting into a listed university on your own.',
    },
    why: {
      ru: 'PhD, доктор по профилю и резидентура — это самостоятельное поступление: безусловное приглашение из вуза Списка нужно уже при подаче. Для PhD и доктора по профилю вуз согласует с вами индивидуальный учебный план. Работникам атомной отрасли дополнительно нужны стаж — 3 года, из них последние 6 месяцев по своей области — и заявка работодателя.',
      kk: 'PhD, бейіні бойынша доктор және резидентура — өз бетінше түсу: Тізімдегі ЖОО-ның сөзсіз шақыруы тапсыру кезінде-ақ керек. PhD мен бейіні бойынша докторға ЖОО сізбен жеке оқу жоспарын келіседі. Атом саласының қызметкерлеріне қосымша өтіл — 3 жыл, оның соңғы 6 айы өз саласында — және жұмыс беруші өтінімі керек.',
      en: "PhD, the professional doctorate and residency are all self-admission: you need the unconditional offer from a listed university when you apply. For a PhD or professional doctorate the university agrees an individual study plan with you. Nuclear-industry workers also need experience — 3 years, the last 6 months in their own field — and their employer's request.",
    },
    inShort: {
      what: { ru: 'Выбор формата: PhD, доктор по профилю или резидентура.', kk: 'Форматты таңдау: PhD, бейіні бойынша доктор не резидентура.', en: 'Choosing the format: PhD, professional doctorate or residency.' },
      you: { ru: 'Определить формат и проверить его условия: приглашение, индивидуальный план, для атомной отрасли — стаж и заявка работодателя.', kk: 'Форматты анықтап, шарттарын тексеру: шақыру, жеке жоспар, атом саласына — өтіл мен жұмыс беруші өтінімі.', en: 'Settle the format and check its conditions: the offer, the individual plan and, for the nuclear industry, experience and an employer request.' },
      result: { ru: 'Роадмап собран под ваш формат: лишнее скрыто, нужное осталось.', kk: 'Жол картасы форматыңызға жиналған: артығы жасырылды, керегі қалды.', en: 'Your roadmap is built for your format: what does not apply is hidden.' },
    },
    mistakes: [
      {
        ru: 'Подавать на PhD без индивидуального учебного плана: он входит в пакет вместе с нотариальным переводом.',
        kk: 'PhD-ге жеке оқу жоспарынсыз тапсыру: ол нотариалды аудармасымен бірге топтамаға кіреді.',
        en: 'Applying for a PhD without the individual study plan: it is part of the package, with a notarised translation.',
      },
      {
        ru: 'Закладывать в план больше времени, чем даёт вуз. Индивидуальный план не может быть длиннее сроков, которые установил вуз.',
        kk: 'Жоспарға ЖОО берген мерзімнен көп уақыт салу. Жеке жоспар ЖОО белгілеген мерзімнен ұзақ бола алмайды.',
        en: 'Planning for more time than the university allows. The individual plan cannot run longer than the university\'s own terms.',
      },
    ],
  },

  specialty: {
    inShort: {
      what: { ru: 'Проверка, что ваше направление финансируют на уровне докторантуры.', kk: 'Бағытыңыз докторантура деңгейінде қаржыландырылатынын тексеру.', en: 'A check that your field is funded at doctoral level.' },
      you: { ru: 'Найти направление в перечне — уровень «Докторантура».', kk: 'Тізбеден бағытты табу — «Докторантура» деңгейі.', en: 'Find your field in the list at the doctoral level.' },
      result: { ru: 'Код специальности с буквой «Д» — и уверенность, что программа попадает в финансирование.', kk: '«Д» әрпі бар мамандық коды — және бағдарлама қаржыландыруға кіретініне сенім.', en: 'A specialty code ending in "Д" — and confidence the programme is funded.' },
    },
  },

  foreign: {
    summary: {
      ru: 'Нужен третий порог приказа № 318 — уровень прямого зачисления на учёбу.',
      kk: '№ 318 бұйрықтың үшінші шегі керек — оқуға тікелей қабылдау деңгейі.',
      en: 'You need level III of Order No. 318 — the level for direct admission.',
    },
    why: {
      ru: 'Для вашей категории в таблице приказа № 318 стоит только третий порог — например, IELTS 6.0: язык нужен сразу, подтягивать его после конкурса не предусмотрено. Для PhD и доктора по профилю сертификат входит в пакет документов; в резидентуре язык подтверждает вуз своим безусловным зачислением.',
      kk: '№ 318 бұйрық кестесінде санатыңызға тек үшінші шек көрсетілген — мысалы, IELTS 6.0: тіл бірден керек, конкурстан кейін жетілдіру көзделмеген. PhD мен бейіні бойынша докторға сертификат құжаттар топтамасына кіреді; резидентурада тілді ЖОО сөзсіз қабылдауымен растайды.',
      en: 'Order No. 318 sets only level III for your category — IELTS 6.0, for example: the language is needed straight away, with no catching up after the competition. For a PhD or professional doctorate the certificate goes in the package; for residency the university vouches for your language with its unconditional admission.',
    },
    inShort: {
      what: { ru: 'Проверка языка по третьему порогу — уровню прямого зачисления.', kk: 'Тілді үшінші шек — тікелей қабылдау деңгейі бойынша тексеру.', en: 'A language check against level III — the level for direct admission.' },
      you: { ru: 'Сравнить свой балл с порогом в таблице и с требованием вуза.', kk: 'Балыңызды кестедегі шекпен және ЖОО талабымен салыстыру.', en: "Compare your score with the threshold in the table and with the university's requirement." },
      result: { ru: 'Понимание, проходит ли ваш балл.', kk: 'Балыңыз өте ме, соны түсіну.', en: 'You know whether your score passes.' },
    },
  },

  admission: {
    why: {
      ru: 'Приглашение должно быть безусловным — без учебных условий; оговорка про оплату допустима, её берёт на себя стипендия. В документе — ваши данные, специальность, сроки и стоимость. Для PhD и доктора по профилю к нему добавляется индивидуальный учебный план, согласованный с вузом и не длиннее его сроков, — тоже с нотариальным переводом.',
      kk: 'Шақыру сөзсіз болуы керек — оқу шарттарынсыз; төлем туралы ескертпеге болады, оны стипендия өтейді. Құжатта — деректеріңіз, мамандық, мерзім және құн. PhD мен бейіні бойынша докторға оған ЖОО-мен келісілген, оның мерзімінен ұзақ емес жеке оқу жоспары қосылады — ол да нотариалды аудармамен.',
      en: 'The offer has to be unconditional — no study conditions; a payment condition is fine, the scholarship pays. It shows your details, specialty, dates and cost. For a PhD or professional doctorate it comes with an individual study plan agreed with the university and no longer than its terms — also with a notarised translation.',
    },
  },

  workback: {
    summary: {
      ru: '5 лет в Астане, Алматы или Шымкенте либо 3 года в регионах; работникам атомной отрасли — 3 года у работодателя.',
      kk: 'Астанада, Алматыда не Шымкентте 5 жыл не өңірлерде 3 жыл; атом саласының қызметкерлеріне — жұмыс берушіде 3 жыл.',
      en: 'Five years in Astana, Almaty or Shymkent, or three in the regions; nuclear-industry workers owe three years to their employer.',
    },
    mistakes: [
      ...ACADEMIC_WORKBACK_MISTAKES,
      {
        ru: 'Работникам атомной отрасли — уйти в другую организацию без направления работодателя. Отработка идёт у него, в его филиале или там, куда он направит.',
        kk: 'Атом саласының қызметкерлеріне — жұмыс берушінің жолдамасынсыз басқа ұйымға кету. Өтеу соның өзінде, филиалында не ол жіберген жерде өтеді.',
        en: 'Nuclear-industry workers: moving to another organisation without the employer sending you. The work-back is served with them, at their branch, or where they send you.',
      },
    ],
  },
}

export const DOCTORATE_HOME: PlatformHome = {
  intro: {
    ru: 'PhD, доктор по профилю или резидентура за рубежом за счёт государства. Путь один — самостоятельное поступление: безусловное приглашение из вуза Списка нужно уже при подаче, а для PhD и доктора по профилю — ещё и индивидуальный учебный план, согласованный с вузом. Язык нужен сразу — на уровне прямого зачисления.',
    kk: 'Шетелде мемлекет есебінен PhD, бейіні бойынша доктор не резидентура. Жол біреу — өз бетінше түсу: Тізімдегі ЖОО-ның сөзсіз шақыруы тапсыру кезінде-ақ керек, ал PhD мен бейіні бойынша докторға — ЖОО-мен келісілген жеке оқу жоспары да. Тіл бірден — тікелей қабылдау деңгейінде керек.',
    en: 'A PhD, professional doctorate or residency abroad paid by the state. There is one road — getting in on your own: the unconditional offer from a listed university is needed when you apply, and for a PhD or professional doctorate an individual study plan agreed with the university as well. The language is needed from day one, at the direct-admission level.',
  },
  facts: [
    { value: '3', caption: { ru: 'формата: PhD, доктор по профилю, резидентура', kk: 'формат: PhD, бейіні бойынша доктор, резидентура', en: 'formats: PhD, professional doctorate, residency' }, source: 'pp573' },
    { value: 'III', caption: { ru: 'порог иностранного языка — уровень прямого зачисления', kk: 'шет тілі шегі — тікелей қабылдау деңгейі', en: 'foreign-language threshold — the direct-admission level' }, source: 'prikaz318' },
    { value: 'B1', caption: { ru: 'казахский язык', kk: 'қазақ тілі', en: 'Kazakh' }, source: 'pravila' },
    { value: '5 / 3', caption: { ru: 'лет отработки в больших городах / в регионах', kk: 'жыл өтеу: ірі қалаларда / өңірлерде', en: 'years of work-back in the big cities / in the regions' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'Вы поступили или поступаете на PhD, доктора по профилю или в резидентуру вуза из Списка — без условий.', kk: 'Тізімдегі ЖОО-ның PhD, бейіні бойынша доктор не резидентурасына шартсыз түстіңіз не түсіп жатырсыз.', en: 'You have got or are getting an unconditional place for a PhD, professional doctorate or residency at a listed university.' },
    { ru: 'Ваш иностранный язык уже на уровне прямого зачисления.', kk: 'Шет тіліңіз тікелей қабылдау деңгейінде.', en: 'Your foreign language is already at the direct-admission level.' },
    { ru: 'Работники атомной отрасли: у вас 3 года стажа в отрасли и заявка работодателя.', kk: 'Атом саласының қызметкерлері: сізде саладағы 3 жылдық өтіл және жұмыс беруші өтінімі бар.', en: 'Nuclear-industry workers: you have 3 years in the industry and an employer request.' },
  ],
  fitNo: [
    { text: { ru: 'Вам нужна исследовательская стажировка на 3–12 месяцев, а не степень.', kk: 'Сізге дәреже емес, 3–12 айлық зерттеу тағылымдамасы керек.', en: 'You want a 3–12 month research placement, not a degree.' }, go: 'science' },
    { text: { ru: 'Вы хотите получить степень магистра.', kk: 'Магистр дәрежесін алғыңыз келеді.', en: "You want a master's degree." }, go: 'master' },
  ],
  fitSources: ['pp573', 'pravila', 'prikaz318'],
  coverage: ACADEMIC_COVERAGE,
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
