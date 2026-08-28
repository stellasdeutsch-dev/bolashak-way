import type { Stage } from '../types'

export const ABROAD_STAGES: Stage[] = [
  {
    id: 'studying',
    chapter: 'abroad',
    icon: 'BookOpenCheck',
    kicker: { ru: 'За рубежом', kk: 'Шетелде', en: 'Abroad' },
    title: { ru: 'Обучение или стажировка и отчётность', kk: 'Оқу не тағылымдама және есептілік', en: 'Study or internship and reporting' },
    summary: {
      ru: 'Регистрация, страховка, консульский учёт, учебный план и регулярные отчёты куратору.',
      kk: 'Тіркеу, сақтандыру, консулдық есеп, оқу жоспары және кураторға тұрақты есептер.',
      en: 'Registration, insurance, consular registration, the study plan and regular reports to your curator.',
    },
    why: {
      ru: 'Обязательства не заканчиваются вылетом. По договору нужно держать успеваемость, вовремя присылать транскрипты и оставаться на связи с куратором. Нарушите условия — финансирование могут приостановить.',
      kk: 'Міндеттемелер ұшумен бітпейді. Шарт бойынша үлгерімді ұстау, транскриптті уақытында жіберу және куратормен байланыста болу керек. Шартты бұзсаңыз — қаржыландыруды тоқтатуы мүмкін.',
      en: 'Your obligations do not end when the plane takes off. The contract asks you to keep your grades up, send transcripts on time and stay in touch with your curator. Break the terms and funding can be suspended.',
    },
    inShort: {
      what: { ru: 'Сама учёба или стажировка за границей. Обязательства при этом не заканчиваются: договор требует отчётности.', kk: 'Шетелдегі оқудың не тағылымдаманың өзі. Міндеттеме бітпейді: шарт есептілікті талап етеді.', en: 'The studies or internship abroad themselves. Your obligations do not stop: the contract requires reporting.' },
      you: { ru: 'Встать на учёт, оформить страховку, сдать куратору учебный план и присылать транскрипты после каждого семестра.', kk: 'Есепке тұру, сақтандыру рәсімдеу, кураторға оқу жоспарын тапсыру және әр семестрден кейін транскрипт жіберу.', en: 'Register locally, arrange insurance, give your curator the study plan and send transcripts after each semester.' },
      result: { ru: 'Завершённая программа и диплом — без нарушений договора и приостановки финансирования.', kk: 'Аяқталған бағдарлама және диплом — шартты бұзбай, қаржыландыру тоқтамай.', en: 'A completed programme and a diploma — with no contract breaches and no funding suspension.' },
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
      },
      {
        id: 'plan',
        text: {
          ru: 'В первые 60 дней учёбы отправили куратору учебный план — он строится по академическому календарю вуза.',
          kk: 'Оқудың алғашқы 60 күнінде кураторға оқу жоспарын жібердіңіз — ол ЖОО академиялық күнтізбесі бойынша жасалады.',
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
          ru: 'Если стажировка длиннее 6 месяцев — сдали промежуточный отчёт и отзыв руководителя.',
          kk: 'Тағылымдама 6 айдан ұзақ болса — аралық есеп пен жетекшінің пікірін тапсырдыңыз.',
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
        ru: 'Менять вуз, специальность или сроки, ни с кем не согласовав. Для этого есть готовые формы заявлений и решение Комиссии.',
        kk: 'ЖОО, мамандық не мерзімді ешкіммен келіспей өзгерту. Бұл үшін дайын өтініш нысандары және Комиссия шешімі бар.',
        en: 'Changing university, specialty or dates without asking anyone. There are ready application forms and a commission decision for that.',
      },
      {
        ru: 'Забивать на отчётность. Невыполнение договора — повод приостановить финансирование.',
        kk: 'Есептілікке салғырт қарау. Шартты орындамау қаржыландыруды тоқтатуға себеп.',
        en: 'Letting the reporting slide. Not meeting the contract is a reason to suspend funding.',
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
      ru: 'Отсюда начинается отсчёт отработки, и всё держится на документах. Без заявления, переводов диплома и транскрипта и отметки о въезде ваше дело не передадут в Управление по работе с выпускниками.',
      kk: 'Осы жерден өтеу есептеле бастайды, ал бәрі құжатқа байланысты. Өтінішсіз, диплом мен транскрипт аудармасынсыз және кіру белгісінсіз ісіңізді Түлектермен жұмыс басқармасына бермейді.',
      en: 'This is where the work-back clock starts, and it all rests on paperwork. Without the application, the translated diploma and transcript and the entry stamp, your file is not handed to the alumni department.',
    },
    inShort: {
      what: { ru: 'Возвращение домой и закрытие учебной части. С этого момента начинается отсчёт отработки.', kk: 'Үйге оралу және оқу бөлігін жабу. Осы сәттен өтеу есептеле бастайды.', en: 'Coming home and closing out the study part. From this point the work-back clock starts.' },
      you: { ru: 'Вернуться в течение 30 дней, подать заявление о завершении и сдать нотариальные переводы диплома и транскрипта.', kk: '30 күн ішінде оралу, аяқтау туралы өтініш беру және диплом мен транскрипттің нотариалды аудармасын тапсыру.', en: 'Return within 30 days, file the completion application and hand in notarised translations of the diploma and transcript.' },
      result: { ru: 'Ваше дело переходит в Управление по работе с выпускниками — начинается отработка.', kk: 'Ісіңіз Түлектермен жұмыс басқармасына өтеді — өтеу басталады.', en: 'Your file moves to the alumni department — the work-back begins.' },
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
          ru: 'Отправили куратору заявление о завершении учёбы или стажировки — по установленной форме.',
          kk: 'Кураторға оқуды не тағылымдаманы аяқтау туралы өтінішті белгіленген нысанда жібердіңіз.',
          en: 'You sent your curator the completion application on the standard form.',
        },
        link: 'obrazcy',
      },
      {
        id: 'translations',
        text: {
          ru: 'Отдали нотариальные переводы диплома и транскрипта за весь период учёбы — на казахском или русском.',
          kk: 'Диплом мен бүкіл оқу кезеңіндегі транскрипттің нотариалды аудармасын бердіңіз — қазақ не орыс тілінде.',
          en: 'You handed over notarised translations of the diploma and the full transcript, in Kazakh or Russian.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'otrabotka',
      },
      {
        id: 'stamp',
        text: {
          ru: 'Отдали копию паспорта с отметкой о въезде в Казахстан.',
          kk: 'Қазақстанға кіру белгісі бар паспорт көшірмесін бердіңіз.',
          en: 'You handed in a passport copy with the Kazakhstan entry stamp.',
        },
        link: 'otrabotka',
      },
      {
        id: 'final_report',
        text: {
          ru: 'Принесли документ о завершении стажировки, итоговый отзыв руководителя и отчёт о результатах.',
          kk: 'Тағылымдаманың аяқталғаны туралы құжатты, жетекшінің қорытынды пікірін және нәтиже есебін әкелдіңіз.',
          en: 'You brought the internship completion document, your supervisor\'s final feedback and the results report.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'ns_report',
        text: {
          ru: 'Сдали итоговый отчёт в течение месяца после возвращения. Его утверждает работодатель, а потом отчёт публикуют в открытом доступе.',
          kk: 'Оралғаннан кейін бір ай ішінде қорытынды есепті тапсырдыңыз. Оны жұмыс беруші бекітеді, содан соң есеп ашық жарияланады.',
          en: 'You filed the final report within a month of coming back. Your employer approves it and then it is published openly.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'pp791',
      },
      {
        id: 'no_diploma',
        text: {
          ru: 'Если диплом ещё не выдали — принесли официальное подтверждение вуза: когда его вручат и какую степень присвоили.',
          kk: 'Диплом әлі берілмесе — ЖОО-дан ресми растама әкелдіңіз: оны қашан тапсыратыны және қандай дәреже берілгені.',
          en: 'If the diploma has not been issued yet — you brought the university\'s official confirmation: when it will be handed over and what degree was awarded.',
        },
        required: false,
        link: 'otrabotka',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Научная стажировка: итоговый отчёт сдают в течение месяца после возвращения. Не сдали — поднимут вопрос о возврате бюджетных денег.',
          kk: 'Ғылыми тағылымдама: қорытынды есепті оралғаннан кейін бір ай ішінде тапсырады. Тапсырмасаңыз — бюджет қаражатын қайтару мәселесі көтеріледі.',
          en: 'Scientific internship: the final report is due within a month of your return. Miss it and the question of repaying budget money comes up.',
        },
        source: 'pp791',
      },
    ],
    mistakes: [
      {
        ru: 'Задержаться за границей «ещё на пару месяцев» после выпуска. Срок возвращения записан в договоре.',
        kk: 'Бітіргеннен кейін шетелде «тағы бірер айға» кідіру. Оралу мерзімі шартта жазылған.',
        en: 'Staying abroad "just a couple more months" after graduating. The return deadline is written into your contract.',
      },
    ],
    sources: ['stipendiat_master', 'stipendiat_internship', 'otrabotka', 'pp791', 'obrazcy'],
    estimateWeeks: [2, 8],
  },

  {
    id: 'workback',
    chapter: 'abroad',
    icon: 'Briefcase',
    kicker: { ru: 'Обязательства', kk: 'Міндеттемелер', en: 'Obligations' },
    title: { ru: 'Трудовая отработка и снятие обременения', kk: 'Еңбек өтеу және ауыртпалықты алу', en: 'Work-back and lifting the lien' },
    summary: {
      ru: 'От 3 до 5 лет в Казахстане, справки каждые 6 месяцев, затем исполнение договорных обязательств.',
      kk: 'Қазақстанда 3-тен 5 жылға дейін, әр 6 айда анықтама, содан кейін шарттық міндеттемелерді орындау.',
      en: 'Three to five years in Kazakhstan, certificates every 6 months, then closing out the contract.',
    },
    why: {
      ru: 'Ради отработки стипендия и даётся. Сколько лет работать — зависит от категории и региона, а подтверждать это нужно документами каждые полгода. Пока обязательства не закрыты, залог остаётся под обременением.',
      kk: 'Стипендия өтеу үшін беріледі. Қанша жыл жұмыс істеу — санат пен өңірге байланысты, ал мұны әр жарты жылда құжатпен растау керек. Міндеттеме жабылмайынша, кепіл ауыртпалықта қалады.',
      en: 'The work-back is why the scholarship exists. How many years you owe depends on your category and region, and you confirm it with documents every six months. Until it is closed, the pledged property stays encumbered.',
    },
    inShort: {
      what: { ru: 'То, ради чего давалась стипендия: несколько лет работы в Казахстане по полученной специальности.', kk: 'Стипендия не үшін берілді, соның өзі: Қазақстанда алған мамандық бойынша бірнеше жыл жұмыс.', en: 'The reason the scholarship existed: several years working in Kazakhstan in the field you studied.' },
      you: { ru: 'Работать по специальности и каждые полгода подтверждать это справками.', kk: 'Мамандық бойынша жұмыс істеп, әр жарты жылда оны анықтамамен растау.', en: 'Work in your field and confirm it with certificates every six months.' },
      result: { ru: 'Исполненные обязательства и снятое обременение с залоговой недвижимости.', kk: 'Орындалған міндеттемелер және кепілдегі мүліктен алынған ауыртпалық.', en: 'Obligations discharged and the encumbrance lifted from the pledged property.' },
    },
    checklist: [
      {
        id: 'employment',
        text: {
          ru: 'Устроились на работу по полученной специальности — как записано в договоре.',
          kk: 'Шартта жазылғандай, алған мамандығыңыз бойынша жұмысқа орналастыңыз.',
          en: 'You took a job in the specialty you earned, as your contract requires.',
        },
        link: 'otrabotka',
      },
      {
        id: 'employer_workback',
        text: {
          ru: 'Работаете в организации, которая давала на вас заявку, — или в её филиале либо представительстве.',
          kk: 'Сізге өтінім берген ұйымда — не оның филиалында, өкілдігінде жұмыс істейсіз.',
          en: 'You work at the organisation that requested your training — or at its branch or representative office.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'pp573',
      },
      {
        id: 'reports',
        text: {
          ru: 'Каждые 6 месяцев направляете справку с места работы или трудовой договор в формате PDF на почту куратора Управления по работе с выпускниками.',
          kk: 'Әр 6 айда жұмыс орнынан анықтаманы не еңбек шартын PDF форматында кураторға жібересіз.',
          en: 'Every 6 months you send an employment certificate or contract as PDF to the alumni department curator.',
        },
        link: 'otrabotka',
      },
      {
        id: 'attributes',
        text: {
          ru: 'В справках есть все реквизиты: дата регистрации, регистрационный номер, подпись уполномоченного лица и печать.',
          kk: 'Анықтамаларда барлық деректеме бар: тіркеу күні, нөмірі, уәкілетті адамның қолы мен мөрі.',
          en: 'Your certificates carry all attributes: registration date and number, authorised signature and seal.',
        },
        required: false,
        link: 'otrabotka',
      },
      {
        id: 'closing',
        text: {
          ru: 'По завершении срока подали заявление об исполнении договорных обязательств с приложением документов (копия трудовой книжки, выписка о пенсионных отчислениях, характеристика работодателя, копии удостоверений).',
          kk: 'Мерзім аяқталғанда шарттық міндеттемелердің орындалуы туралы өтінішті құжаттарымен тапсырдыңыз.',
          en: 'After completing the term you filed the application confirming fulfilment of contractual obligations with supporting documents.',
        },
        link: 'formy_vypusknika',
      },
      {
        id: 'lien',
        text: {
          ru: 'Сняли обременение с залоговой недвижимости после подтверждения исполнения обязательств.',
          kk: 'Міндеттемелердің орындалуы расталғаннан кейін кепіл мүлкінен ауыртпалықты алдыңыз.',
          en: 'You had the lien on the pledged property lifted after fulfilment was confirmed.',
        },
        link: 'zamena_zaloga',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Срок рассмотрения заявления на исполнение договорных обязательств — 15 рабочих дней. Столько же занимает рассмотрение заявления на замену предмета залога.',
          kk: 'Шарттық міндеттемелерді орындау туралы өтінішті қарау мерзімі — 15 жұмыс күні.',
          en: 'The application confirming fulfilment is reviewed within 15 working days, as is a request to replace the collateral.',
        },
        source: 'ns_alumni',
      },
      {
        text: {
          ru: 'Отработка засчитывается с даты присуждения степени или, если трудоустройство позже, с момента трудоустройства. Непрерывная отработка засчитывается отдельно по каждому региону при отсутствии параллельных пенсионных отчислений.',
          kk: 'Өтеу дәреже берілген күннен, кейінірек жұмысқа тұрса — жұмысқа тұрған сәттен есептеледі.',
          en: 'The work-back counts from the degree award date or, if employment starts later, from the employment date. Continuous service is counted per region when there are no parallel pension contributions.',
        },
        source: 'otrabotka',
      },
    ],
    notes: [
      {
        tone: 'info',
        text: {
          ru: 'Отсрочку исполнения обязательств можно запросить: лечение заболевания, препятствующего работе; беременность или ребёнок до трёх лет; сопровождение супруга-госслужащего или обучающегося за рубежом; продолжение обучения в докторантуре; производственная стажировка в компаниях из рейтингов Fortune Global 500, Forbes Global 2000 или Forbes Top 100 Digital Companies — не более 12 месяцев.',
          kk: 'Міндеттемелерді орындауды кейінге қалдыруды сұрауға болады: емделу; жүктілік не үш жасқа дейінгі бала; жұбайын алып жүру; докторантурада оқуды жалғастыру; рейтингтегі компанияларда өндірістік тағылымдама — 12 айдан аспайды.',
          en: 'A deferral can be requested: treatment of an illness preventing work; pregnancy or a child under three; accompanying a spouse in public service or studying abroad; continuing doctoral studies; an industrial placement at a Fortune Global 500, Forbes Global 2000 or Forbes Top 100 Digital company — up to 12 months.',
        },
        source: 'otrabotka',
      },
    ],
    mistakes: [
      {
        ru: 'Работать по двум местам сразу: при параллельных пенсионных отчислениях отработка засчитывается только там, где предусмотрен наибольший срок.',
        kk: 'Бір мезгілде екі жерде жұмыс істеу: қатар зейнетақы аударымдары болса, өтеу ең ұзақ мерзім көзделген жерде ғана есептеледі.',
        en: 'Working two jobs at once: with parallel pension contributions, only the position with the longest required term counts.',
      },
      {
        ru: 'Менять работодателя без согласования: для стажировок и научных стажировок смена возможна лишь при ликвидации или реорганизации либо с согласия работодателя.',
        kk: 'Жұмыс берушіні келіспей ауыстыру: тағылымдамаларда бұл тек тарату не қайта ұйымдастыру кезінде мүмкін.',
        en: 'Changing employer without approval: for internships this is possible only on liquidation or reorganisation, or with the employer\'s consent.',
      },
      {
        ru: 'Забыть про сокращение срока на год: оно даётся при полном бесплатном обучении от вуза и соблюдении успеваемости по договору.',
        kk: 'Мерзімнің бір жылға қысқаруын ұмыту: ол толық тегін оқу және шарттағы үлгерім сақталғанда беріледі.',
        en: 'Forgetting the one-year reduction: it applies when the whole programme was free of charge and the contractual performance was met.',
      },
    ],
    sources: ['otrabotka', 'pp573', 'ns_alumni', 'zamena_zaloga', 'formy_vypusknika'],
    estimateWeeks: [156, 260],
  },
]
