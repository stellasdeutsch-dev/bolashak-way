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
      ru: 'Обязательства не заканчиваются вылетом: договор требует поддерживать успеваемость, вовремя сдавать транскрипты и держать связь с куратором. Нарушение условий договора — основание приостановить финансирование.',
      kk: 'Міндеттемелер ұшумен бітпейді: шарт үлгерімді сақтауды, транскрипттерді уақытында тапсыруды және куратормен байланысты талап етеді.',
      en: 'Obligations do not end at departure: the contract requires maintaining performance, submitting transcripts on time and staying in touch with your curator.',
    },
    checklist: [
      {
        id: 'police',
        text: {
          ru: 'Зарегистрировались в полиции, если этого требуют иммиграционные правила страны.',
          kk: 'Ел иммиграциялық ережелері талап етсе, полицияда тіркелдіңіз.',
          en: 'You registered with the police if the country\'s immigration rules require it.',
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
          ru: 'Встали на консульский учёт в посольстве Республики Казахстан и направили подтверждение куратору.',
          kk: 'Қазақстан елшілігінде консулдық есепке тұрып, растауды кураторға жібердіңіз.',
          en: 'You registered at the Kazakhstan embassy and sent confirmation to your curator.',
        },
        link: 'stipendiat_internship',
      },
      {
        id: 'plan',
        text: {
          ru: 'В течение 60 дней со дня начала обучения передали куратору учебный план по академическому календарю вуза.',
          kk: 'Оқу басталған күннен бастап 60 күн ішінде кураторға оқу жоспарын тапсырдыңыз.',
          en: 'Within 60 days of the study start you gave your curator the study plan following the university calendar.',
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
          ru: 'При стажировке дольше 6 месяцев представили промежуточный отчёт и отзыв руководителя.',
          kk: 'Тағылымдама 6 айдан асса, аралық есеп пен жетекшінің пікірін ұсындыңыз.',
          en: 'For internships longer than 6 months you submitted an interim report and supervisor feedback.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'no_changes',
        text: {
          ru: 'Не вносили изменения в программу стажировки и выполнили все предусмотренные ею мероприятия.',
          kk: 'Тағылымдама бағдарламасына өзгеріс енгізбей, барлық іс-шараны орындадыңыз.',
          en: 'You made no changes to the internship programme and completed everything it prescribes.',
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
        ru: 'Менять вуз, специальность или сроки без согласования: для этого есть отдельные формы заявлений и решение Комиссии.',
        kk: 'ЖОО, мамандық не мерзімді келіспей өзгерту: бұл үшін жеке өтініш нысандары бар.',
        en: 'Changing university, specialty or dates without approval: there are separate application forms and a commission decision for that.',
      },
      {
        ru: 'Пропускать отчётность: неисполнение обязательств по договору — основание приостановить финансирование.',
        kk: 'Есептілікті өткізіп жіберу: шарт міндеттемелерін орындамау қаржыландыруды тоқтатуға негіз.',
        en: 'Skipping reports: failure to meet contract obligations is grounds to suspend funding.',
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
      ru: 'С этого момента начинается отсчёт трудовой отработки, и всё зависит от документов: без заявления, переводов диплома и транскрипта и отметки о въезде дело не передадут в Управление по работе с выпускниками.',
      kk: 'Осы сәттен еңбек өтеу есептеле бастайды және бәрі құжаттарға байланысты.',
      en: 'The work-back count starts here, and it all rests on paperwork: without the application, translated diploma and transcript and the entry stamp your file is not passed to the alumni department.',
    },
    checklist: [
      {
        id: 'return30',
        text: {
          ru: 'Вернулись в Республику Казахстан в течение 30 дней со дня завершения обучения.',
          kk: 'Оқу аяқталған күннен бастап 30 күн ішінде Қазақстанға оралдыңыз.',
          en: 'You returned to Kazakhstan within 30 days of completing your studies.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'stipendiat_master',
      },
      {
        id: 'application',
        text: {
          ru: 'Направили куратору заявление о завершении обучения или стажировки по установленной форме.',
          kk: 'Кураторға оқуды не тағылымдаманы аяқтау туралы өтінішті белгіленген нысанда жібердіңіз.',
          en: 'You sent your curator the completion application on the prescribed form.',
        },
        link: 'obrazcy',
      },
      {
        id: 'translations',
        text: {
          ru: 'Предоставили нотариально заверенные переводы диплома и транскрипта за весь период обучения на казахский или русский язык.',
          kk: 'Диплом мен транскрипттің бүкіл оқу кезеңіне нотариалды аудармаларын ұсындыңыз.',
          en: 'You provided notarised Kazakh or Russian translations of the diploma and the full-period transcript.',
        },
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
        link: 'otrabotka',
      },
      {
        id: 'stamp',
        text: {
          ru: 'Предоставили копию паспорта с отметкой о въезде в Республику Казахстан.',
          kk: 'Қазақстанға кіру белгісі бар паспорт көшірмесін ұсындыңыз.',
          en: 'You provided a passport copy with the Kazakhstan entry stamp.',
        },
        link: 'otrabotka',
      },
      {
        id: 'final_report',
        text: {
          ru: 'Представили документ о завершении стажировки, итоговый отзыв руководителя и отчёт о результатах.',
          kk: 'Тағылымдаманың аяқталғаны туралы құжатты, жетекшінің қорытынды пікірін және нәтижелер есебін ұсындыңыз.',
          en: 'You submitted the internship completion document, the supervisor\'s final feedback and the results report.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'stipendiat_internship',
      },
      {
        id: 'ns_report',
        text: {
          ru: 'Сдали итоговый отчёт администратору в течение 1 месяца по возвращении; отчёт утверждает работодатель и он размещается в открытых источниках.',
          kk: 'Оралғаннан кейін 1 ай ішінде әкімшіге қорытынды есепті тапсырдыңыз; есепті жұмыс беруші бекітеді және ол ашық көздерде орналастырылады.',
          en: 'You filed the final report with the administrator within one month of returning; it is approved by your employer and published openly.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'pp791',
      },
      {
        id: 'no_diploma',
        text: {
          ru: 'Если диплома ещё нет — предоставили официальное подтверждение вуза с планируемой датой вручения и присвоенной степенью.',
          kk: 'Диплом әлі болмаса — ЖОО-дан жоспарланған тапсыру күні мен дәрежесі көрсетілген ресми растама ұсындыңыз.',
          en: 'If the diploma is not issued yet — you provided the university\'s official confirmation with the expected award date and degree.',
        },
        required: false,
        link: 'otrabotka',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Научная стажировка: итоговый отчёт сдаётся администратору в течение 1 месяца по возвращении. При непредставлении отчёта ставится вопрос о возмещении бюджетных средств.',
          kk: 'Ғылыми тағылымдама: қорытынды есеп оралғаннан кейін 1 ай ішінде тапсырылады.',
          en: 'Scientific internship: the final report is due to the administrator within one month of return; failure to file raises the question of repaying budget funds.',
        },
        source: 'pp791',
      },
    ],
    mistakes: [
      {
        ru: 'Задержаться за рубежом «на пару месяцев» после выпуска: срок возвращения зафиксирован договором.',
        kk: 'Бітіргеннен кейін шетелде «бірер айға» кідіру: оралу мерзімі шартта бекітілген.',
        en: 'Staying abroad "for a couple of months" after graduation: the return deadline is fixed by contract.',
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
      ru: 'Отработка — это то, ради чего даётся стипендия. Её срок зависит от категории и региона работы, а подтверждается она документами каждые полгода. Пока обязательства не исполнены, залог остаётся под обременением.',
      kk: 'Өтеу — стипендияның мақсаты. Мерзімі санат пен өңірге байланысты, әр жарты жылда құжатпен расталады.',
      en: 'The work-back is the point of the scholarship. Its length depends on your category and region and is proven with documents every six months. Until it is done, the pledged property stays encumbered.',
    },
    checklist: [
      {
        id: 'employment',
        text: {
          ru: 'Трудоустроились по полученной специальности в соответствии с условиями договора.',
          kk: 'Шарт талаптарына сай алған мамандығыңыз бойынша жұмысқа орналастыңыз.',
          en: 'You took a job in your acquired specialty as required by the contract.',
        },
        link: 'otrabotka',
      },
      {
        id: 'employer_workback',
        text: {
          ru: 'Работаете в организации, по заявке которой вас направили (или в её филиале, представительстве).',
          kk: 'Өтінімі бойынша жіберілген ұйымда (не оның филиалында) жұмыс істейсіз.',
          en: 'You work at the organisation that requested your training (or its branch).',
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
