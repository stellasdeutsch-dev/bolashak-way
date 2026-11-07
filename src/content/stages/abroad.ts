import type { Stage } from '../types'

export const ABROAD_STAGES: Stage[] = [
  {
    id: 'studying',
    chapter: 'abroad',
    icon: 'BookOpenCheck',
    kicker: { ru: 'За рубежом', kk: 'Шетелде', en: 'Abroad' },
    title: { ru: 'Обучение и отчётность', kk: 'Оқу және есептілік', en: 'Study and reporting' },
    summary: {
      ru: 'Регистрация, страховка, консульский учёт, учебный план и отчёты куратору.',
      kk: 'Тіркеу, сақтандыру, консулдық есеп, оқу жоспары және кураторға есептер.',
      en: 'Registration, insurance, consular registration, the study plan and reports to your curator.',
    },
    why: {
      ru: 'По договору нужно соблюдать успеваемость, вовремя присылать транскрипты и быть на связи с куратором. При нарушении условий финансирование могут приостановить.',
      kk: 'Шарт бойынша үлгерімді сақтау, транскриптті уақытында жіберу және куратормен байланыста болу керек. Шарт талаптары бұзылса, қаржыландыру тоқтатыла тұруы мүмкін.',
      en: 'The contract requires you to meet academic standards, send transcripts on time and stay in touch with your curator. If the terms are broken, funding may be suspended.',
    },
    inShort: {
      what: { ru: 'Учёба за рубежом с отчётностью перед Центром по договору.', kk: 'Шарт бойынша Орталыққа есеп беретін шетелдегі оқу.', en: 'Studying abroad, reporting to the Center under the contract.' },
      you: { ru: 'Встать на учёт, оформить страховку, сдать куратору учебный план и присылать транскрипты.', kk: 'Есепке тұру, сақтандыру рәсімдеу, кураторға оқу жоспарын тапсыру және транскрипт жіберу.', en: 'Register locally, arrange insurance, give your curator the study plan and send transcripts.' },
      result: { ru: 'Программа завершена без нарушений договора.', kk: 'Бағдарлама шарт бұзылмай аяқталды.', en: 'The programme completed with no breach of contract.' },
    },
    checklist: [
      {
        id: 'police',
        text: {
          ru: 'Зарегистрировались в полиции, если этого требуют правила страны.',
          kk: 'Ел ережелері талап етсе, полицияда тіркелдіңіз.',
          en: 'You registered with the police if the country requires it.',
        },
        link: 'stipendiat_master',
      },
      {
        id: 'insurance',
        text: {
          ru: 'Оформили медицинскую страховку по требованиям страны обучения.',
          kk: 'Оқу еліндегі талаптарға сай медициналық сақтандыру рәсімдедіңіз.',
          en: 'You arranged medical insurance as required by the host country.',
        },
        link: 'stipendiat_master',
      },
      {
        id: 'consular',
        text: {
          ru: 'Встали на консульский учёт в посольстве Казахстана и отправили подтверждение куратору.',
          kk: 'Қазақстан елшілігінде консулдық есепке тұрып, растауды кураторға жібердіңіз.',
          en: 'You registered with the Kazakhstan embassy and sent the confirmation to your curator.',
        },
        link: 'stipendiat_internship',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'plan',
        text: {
          ru: 'В первые 60 дней учёбы отправили куратору учебный план по академическому календарю вуза.',
          kk: 'Оқудың алғашқы 60 күнінде кураторға ЖОО академиялық күнтізбесі бойынша оқу жоспарын жібердіңіз.',
          en: 'In the first 60 days of study you sent your curator the study plan, built on the university\'s academic calendar.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'stipendiat_master',
      },
      {
        id: 'transcripts',
        text: {
          ru: 'После каждого семестра или учебного года направляли куратору оценки и транскрипт.',
          kk: 'Әр семестр не оқу жылынан кейін кураторға бағалар мен транскриптті жібердіңіз.',
          en: 'After each semester or academic year you sent grades and the transcript to your curator.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'stipendiat_master',
      },
      {
        id: 'interim_report',
        text: {
          ru: 'Если стажировка длится более 6 месяцев – сдали промежуточный отчёт и отзыв руководителя.',
          kk: 'Тағылымдама 6 айдан асса – аралық есеп пен жетекшінің пікірін тапсырдыңыз.',
          en: 'If the internship runs longer than 6 months, you handed in the interim report and your supervisor\'s feedback.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'no_changes',
        text: {
          ru: 'Не меняли программу стажировки и выполнили всё, что в ней записано.',
          kk: 'Тағылымдама бағдарламасын өзгертпедіңіз және онда жазылғанның бәрін орындадыңыз.',
          en: 'You did not change the internship programme and did everything it lists.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'contact',
        text: {
          ru: 'Поддерживали связь с куратором и сообщали обо всех изменениях.',
          kk: 'Куратормен байланыс ұстап, барлық өзгерістерді хабарладыңыз.',
          en: 'You kept in touch with your curator and reported any changes.',
        },
        required: false,
        link: 'stipendiat_master',
      },
    ],
    mistakes: [
      {
        ru: 'Менять вуз, специальность или сроки без согласования: для этого подают заявление по форме, решение принимает Комиссия.',
        kk: 'ЖОО-ны, мамандықты не мерзімді келіспей өзгерту: бұл үшін нысан бойынша өтініш беріледі, шешімді Комиссия қабылдайды.',
        en: 'Changing university, specialty or dates without approval: this takes an application on the form and a Commission decision.',
      },
      {
        ru: 'Не сдавать отчётность: невыполнение договора – основание приостановить финансирование.',
        kk: 'Есептілікті тапсырмау: шартты орындамау қаржыландыруды тоқтата тұруға негіз.',
        en: 'Skipping the reporting: not meeting the contract is grounds to suspend funding.',
      },
    ],
    sources: ['stipendiat_master', 'stipendiat_internship', 'obrazcy', 'guide'],
    estimateWeeks: [52, 156],
  },

  {
    id: 'return',
    chapter: 'abroad',
    icon: 'PlaneLanding',
    kicker: { ru: 'Возвращение', kk: 'Оралу', en: 'Coming back' },
    title: { ru: 'Завершение и возвращение в Казахстан', kk: 'Аяқтау және Қазақстанға оралу', en: 'Completion and return to Kazakhstan' },
    summary: {
      ru: '30 дней на возвращение, заявление о завершении и нотариальные переводы документов.',
      kk: 'Оралуға 30 күн, аяқтау туралы өтініш және құжаттардың нотариалды аудармалары.',
      en: '30 days to return, a completion application and notarised translations of your documents.',
    },
    why: {
      ru: 'Без заявления, переводов диплома и транскрипта и отметки о въезде дело не передадут в Управление по работе с выпускниками.',
      kk: 'Өтінішсіз, диплом мен транскрипт аудармасынсыз және кіру белгісінсіз ісіңізді Түлектермен жұмыс басқармасына бермейді.',
      en: 'Without the application, the translated diploma and transcript and the entry stamp, your file is not handed to the alumni department.',
    },
    inShort: {
      what: { ru: 'Возвращение в Казахстан и документы о завершении обучения.', kk: 'Қазақстанға оралу және оқуды аяқтау туралы құжаттар.', en: 'Returning to Kazakhstan and the completion documents.' },
      you: { ru: 'Вернуться в течение 30 дней, подать заявление о завершении, сдать нотариальные переводы диплома и транскрипта.', kk: '30 күн ішінде оралу, аяқтау туралы өтініш беру және диплом мен транскрипттің нотариалды аудармасын тапсыру.', en: 'Return within 30 days, file the completion application and hand in notarised translations of the diploma and transcript.' },
      result: { ru: 'Дело передано в Управление по работе с выпускниками; дальше – трудовая отработка.', kk: 'Ісіңіз Түлектермен жұмыс басқармасына берілді; әрі қарай – еңбек өтеу.', en: 'Your file is with the alumni department; next comes the work-back.' },
    },
    checklist: [
      {
        id: 'return30',
        text: {
          ru: 'Вернулись в Казахстан в течение 30 дней после окончания учёбы.',
          kk: 'Оқу біткеннен кейін 30 күн ішінде Қазақстанға оралдыңыз.',
          en: 'You came back to Kazakhstan within 30 days of finishing your studies.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'stipendiat_master',
      },
      {
        id: 'application',
        text: {
          ru: 'Отправили куратору заявление о завершении учёбы или стажировки по установленной форме.',
          kk: 'Кураторға оқуды не тағылымдаманы аяқтау туралы өтінішті белгіленген нысанда жібердіңіз.',
          en: 'You sent your curator the completion application on the standard form.',
        },
        link: 'obrazcy',
      },
      {
        id: 'translations',
        text: {
          ru: 'Сдали нотариальные переводы диплома и транскрипта за весь период учёбы на казахский или русский.',
          kk: 'Диплом мен бүкіл оқу кезеңіндегі транскрипттің қазақ не орыс тіліне нотариалды аудармасын тапсырдыңыз.',
          en: 'You handed over notarised translations of the diploma and the full transcript, in Kazakh or Russian.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'otrabotka',
      },
      {
        id: 'stamp',
        text: {
          ru: 'Сдали копию паспорта с отметкой о въезде в Казахстан.',
          kk: 'Қазақстанға кіру белгісі бар паспорт көшірмесін бердіңіз.',
          en: 'You handed in a passport copy with the Kazakhstan entry stamp.',
        },
        link: 'otrabotka',
      },
      {
        id: 'final_report',
        text: {
          ru: 'Сдали документ о завершении стажировки, итоговый отзыв руководителя и отчёт о результатах.',
          kk: 'Тағылымдаманың аяқталғаны туралы құжатты, жетекшінің қорытынды пікірін және нәтиже есебін әкелдіңіз.',
          en: 'You brought the internship completion document, your supervisor\'s final feedback and the results report.',
        },
        appliesTo: { track: ['internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'ns_report',
        text: {
          ru: 'Сдали итоговый отчёт в течение месяца после возвращения; работодатель его утверждает и размещает на своём сайте.',
          kk: 'Оралғаннан кейін бір ай ішінде қорытынды есепті тапсырдыңыз; оны жұмыс беруші бекітіп, өз сайтында орналастырады.',
          en: 'You filed the final report within a month of coming back; your employer approves it and posts it on its website.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_rules422',
      },
      {
        id: 'ns_completion',
        text: {
          ru: 'Сдали нотариально заверенные переводы документов о завершении стажировки на казахский или русский язык.',
          kk: 'Тағылымдаманың аяқталғаны туралы құжаттардың қазақ не орыс тіліне нотариалды куәландырылған аудармасын тапсырдыңыз.',
          en: 'You handed in notarised Kazakh or Russian translations of the documents confirming the internship was completed.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_alumni',
      },
      {
        id: 'no_diploma',
        text: {
          ru: 'Если диплом ещё не выдан – сдали официальное подтверждение вуза о дате вручения и присвоенной степени.',
          kk: 'Диплом әлі берілмесе – ЖОО-ның тапсыру күні мен берілген дәреже туралы ресми растамасын тапсырдыңыз.',
          en: 'If the diploma is not issued yet – you handed in the university\'s official confirmation of the issue date and the degree awarded.',
        },
        required: false,
        link: 'otrabotka',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Научная стажировка: итоговый отчёт сдают в течение месяца после возвращения; иначе поднимается вопрос о возврате бюджетных средств.',
          kk: 'Ғылыми тағылымдама: қорытынды есепті оралғаннан кейін бір ай ішінде тапсырады; әйтпесе бюджет қаражатын қайтару мәселесі көтеріледі.',
          en: 'Scientific internship: the final report is due within a month of your return; otherwise repayment of budget funds is raised.',
        },
        source: 'ns_rules422',
        appliesTo: { track: ['science_internship'] },
      },
    ],
    mistakes: [
      {
        ru: 'Задерживаться за рубежом после окончания учёбы: срок возвращения установлен договором.',
        kk: 'Оқу біткен соң шетелде кідіру: оралу мерзімі шартта белгіленген.',
        en: 'Staying abroad after graduating: the return deadline is set by your contract.',
      },
    ],
    sources: ['stipendiat_master', 'stipendiat_internship', 'otrabotka', 'ns_rules422', 'obrazcy'],
    estimateWeeks: [2, 8],
  },

  {
    id: 'workback',
    chapter: 'abroad',
    icon: 'Briefcase',
    kicker: { ru: 'Обязательства', kk: 'Міндеттемелер', en: 'Obligations' },
    title: { ru: 'Трудовая отработка и снятие обременения', kk: 'Еңбек өтеу және ауыртпалықты алу', en: 'Work-back and lifting the lien' },
    summary: {
      ru: 'От 3 до 5 лет работы в Казахстане, справки каждые 6 месяцев, затем закрытие договорных обязательств.',
      kk: 'Қазақстанда 3-тен 5 жылға дейін жұмыс, әр 6 айда анықтама, содан кейін шарттық міндеттемелерді жабу.',
      en: 'Three to five years of work in Kazakhstan, certificates every 6 months, then closing out the contract.',
    },
    why: {
      ru: 'Срок отработки зависит от категории и региона; подтверждать его нужно документами каждые полгода. Пока обязательства не исполнены, залог остаётся под обременением.',
      kk: 'Өтеу мерзімі санат пен өңірге байланысты; оны әр жарты жылда құжатпен растау керек. Міндеттемелер орындалмайынша, кепіл ауыртпалықта қалады.',
      en: 'The work-back term depends on your category and region; you confirm it with documents every six months. Until the obligations are met, the pledged property stays encumbered.',
    },
    inShort: {
      what: { ru: 'Работа в Казахстане по полученной специальности в течение срока по договору.', kk: 'Шартта белгіленген мерзім бойы Қазақстанда алған мамандық бойынша жұмыс.', en: 'Working in Kazakhstan in the field you studied for the term set by the contract.' },
      you: { ru: 'Работать по специальности и каждые полгода подтверждать это справками.', kk: 'Мамандық бойынша жұмыс істеп, әр жарты жылда оны анықтамамен растау.', en: 'Work in your field and confirm it with certificates every six months.' },
      result: { ru: 'Исполненные обязательства и снятое обременение с залоговой недвижимости.', kk: 'Орындалған міндеттемелер және кепілдегі мүліктен алынған ауыртпалық.', en: 'Obligations discharged and the encumbrance lifted from the pledged property.' },
    },
    checklist: [
      {
        id: 'employment',
        text: {
          ru: 'Устроились на работу по полученной специальности, как предусмотрено договором.',
          kk: 'Шартта көзделгендей, алған мамандығыңыз бойынша жұмысқа орналастыңыз.',
          en: 'You took a job in the specialty you earned, as your contract requires.',
        },
        link: 'otrabotka',
      },
      {
        id: 'employer_workback',
        text: {
          ru: 'Работаете в организации, которая давала на вас заявку, – или в её филиале либо представительстве.',
          kk: 'Сізге өтінім берген ұйымда – не оның филиалында, өкілдігінде жұмыс істейсіз.',
          en: 'You work at the organisation that requested your training – or at its branch or representative office.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'pp573',
      },
      {
        id: 'reports',
        text: {
          ru: 'Каждые 6 месяцев направляете куратору Управления по работе с выпускниками справку с места работы или трудовой договор в PDF.',
          kk: 'Әр 6 айда Түлектермен жұмыс басқармасының кураторына жұмыс орнынан анықтаманы не еңбек шартын PDF түрінде жібересіз.',
          en: 'Every 6 months you send the alumni department curator an employment certificate or contract as a PDF.',
        },
        link: 'otrabotka',
      },
      {
        id: 'attributes',
        text: {
          ru: 'В справках есть дата регистрации, регистрационный номер, подпись уполномоченного лица и печать.',
          kk: 'Анықтамаларда тіркеу күні, тіркеу нөмірі, уәкілетті адамның қолы мен мөрі бар.',
          en: 'Your certificates show the registration date and number, an authorised signature and the seal.',
        },
        required: false,
        link: 'otrabotka',
      },
      {
        id: 'closing',
        text: {
          ru: 'По окончании срока подали заявление об исполнении договорных обязательств с документами: копия трудовой книжки, выписка о пенсионных отчислениях, характеристика работодателя, копии удостоверений.',
          kk: 'Мерзім аяқталғанда шарттық міндеттемелердің орындалуы туралы өтінішті құжаттармен тапсырдыңыз: еңбек кітапшасының көшірмесі, зейнетақы аударымдары туралы үзінді көшірме, жұмыс берушінің мінездемесі, куәліктердің көшірмелері.',
          en: 'At the end of the term you filed the application confirming fulfilment of contractual obligations with documents: a copy of the work record book, a pension-contribution statement, an employer\'s reference and copies of IDs.',
        },
        link: 'formy_vypusknika',
      },
      {
        id: 'lien',
        text: {
          ru: 'После подтверждения исполнения обязательств сняли обременение с залоговой недвижимости.',
          kk: 'Міндеттемелердің орындалуы расталғаннан кейін кепіл мүлкінен ауыртпалықты алдыңыз.',
          en: 'You had the lien on the pledged property lifted after fulfilment was confirmed.',
        },
        link: 'zamena_zaloga',
        appliesTo: { not: { track: ['science_internship'] } },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Заявление на замену предмета залога рассматривают 15 рабочих дней.',
          kk: 'Кепіл затын ауыстыру туралы өтініш 15 жұмыс күнінде қаралады.',
          en: 'A request to replace the collateral is reviewed within 15 working days.',
        },
        source: 'zamena_zaloga',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        text: {
          ru: 'Заявление на исполнение договорных обязательств рассматривают 15 рабочих дней.',
          kk: 'Шарттық міндеттемелерді орындау туралы өтініш 15 жұмыс күнінде қаралады.',
          en: 'The application confirming fulfilment of your obligations is reviewed within 15 working days.',
        },
        source: 'ns_alumni',
        appliesTo: { track: ['science_internship'] },
      },
      {
        text: {
          ru: 'Отработка засчитывается с даты присуждения степени, а при более позднем трудоустройстве – с даты трудоустройства. Непрерывная отработка засчитывается отдельно по каждому региону при отсутствии параллельных пенсионных отчислений.',
          kk: 'Өтеу дәреже берілген күннен, ал жұмысқа кейінірек орналасса – жұмысқа орналасқан күннен есептеледі. Қатар зейнетақы аударымдары болмаса, үздіксіз өтеу әр өңір бойынша жеке есептеледі.',
          en: 'The work-back counts from the degree award date or, if employment starts later, from the employment date. Continuous service is counted per region when there are no parallel pension contributions.',
        },
        source: 'otrabotka',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
    ],
    notes: [
      {
        tone: 'info',
        appliesTo: { not: { track: ['science_internship'] } },
        text: {
          ru: 'Отсрочку исполнения обязательств можно запросить при: лечении заболевания, препятствующего работе; беременности или ребёнке до трёх лет; сопровождении супруга – госслужащего или обучающегося за рубежом; продолжении обучения в докторантуре; производственной стажировке в компании из рейтингов Fortune Global 500, Forbes Global 2000 или Forbes Top 100 Digital Companies – не более 12 месяцев.',
          kk: 'Міндеттемелерді орындауды кейінге қалдыруды мына жағдайларда сұрауға болады: жұмысқа кедергі келтіретін аурудан емделу; жүктілік не үш жасқа дейінгі бала; мемлекеттік қызметші не шетелде оқитын жұбайын алып жүру; докторантурада оқуды жалғастыру; Fortune Global 500, Forbes Global 2000 не Forbes Top 100 Digital Companies рейтингтеріндегі компанияда өндірістік тағылымдама – 12 айдан аспайды.',
          en: 'A deferral can be requested for: treatment of an illness preventing work; pregnancy or a child under three; accompanying a spouse in public service or studying abroad; continuing doctoral studies; an industrial placement at a Fortune Global 500, Forbes Global 2000 or Forbes Top 100 Digital company – up to 12 months.',
        },
        source: 'otrabotka',
      },
    ],
    mistakes: [
      {
        ru: 'Работать в двух местах сразу: при параллельных пенсионных отчислениях отработка засчитывается только там, где предусмотрен наибольший срок.',
        kk: 'Бір мезгілде екі жерде жұмыс істеу: қатар зейнетақы аударымдары болса, өтеу ең ұзақ мерзім көзделген жерде ғана есептеледі.',
        en: 'Working two jobs at once: with parallel pension contributions, only the position with the longest required term counts.',
      },
      {
        ru: 'Менять работодателя без согласования: после стажировки и научной стажировки смена возможна лишь при ликвидации или реорганизации либо с согласия работодателя.',
        kk: 'Жұмыс берушіні келіспей ауыстыру: тағылымдама мен ғылыми тағылымдамадан кейін бұл тек тарату не қайта ұйымдастыру кезінде не жұмыс берушінің келісімімен мүмкін.',
        en: 'Changing employer without approval: after an internship or scientific internship this is possible only on liquidation or reorganisation, or with the employer\'s consent.',
      },
      {
        ru: 'Не учесть сокращение срока на год: оно предусмотрено при полностью бесплатном обучении от вуза и соблюдении успеваемости по договору.',
        kk: 'Мерзімнің бір жылға қысқаруын ескермеу: ол ЖОО толық тегін оқытқанда және шарттағы үлгерім сақталғанда көзделген.',
        en: 'Overlooking the one-year reduction: it applies when the university taught you fully free of charge and the contractual academic standards were met.',
      },
    ],
    sources: ['otrabotka', 'pp573', 'ns_alumni', 'zamena_zaloga', 'formy_vypusknika'],
    estimateWeeks: [156, 260],
  },
]
