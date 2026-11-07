import type { Stage } from '../types'

const PREFERENTIAL = ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'] as const
const SELF_ADMITTED = ['bachelor', 'master_self', 'phd_self', 'phd_nuclear', 'residency', 'internship', 'science_internship'] as const

export const PREPARE_STAGES: Stage[] = [
  {
    id: 'eligibility',
    chapter: 'prepare',
    icon: 'ShieldCheck',
    kicker: { ru: 'Первый шаг', kk: 'Бірінші қадам', en: 'First step' },
    title: { ru: 'Проверьте базовые условия', kk: 'Негізгі шарттарды тексеріңіз', en: 'Check the basic conditions' },
    summary: {
      ru: 'Гражданство, образование, долги и срок до пенсии.',
      kk: 'Азаматтық, білім, берешек және зейнетке дейінгі мерзім.',
      en: 'Citizenship, education, debts and time before retirement.',
    },
    why: {
      ru: 'Эти условия проверяют первыми. Если не выполнено хотя бы одно, документы не примут.',
      kk: 'Бұл шарттарды ең алдымен тексереді. Біреуі орындалмаса, құжат қабылданбайды.',
      en: 'These conditions are checked first. If even one is not met, your documents are not accepted.',
    },
    inShort: {
      what: { ru: 'Самопроверка. Документы на этом шаге не подаются.', kk: 'Өзін-өзі тексеру. Бұл қадамда құжат тапсырылмайды.', en: 'A self-check. You do not apply at this step.' },
      you: { ru: 'Проверить гражданство, диплом, долги по прошлым программам и срок до пенсии.', kk: 'Азаматтықты, дипломды, бұрынғы бағдарламалар бойынша берешекті және зейнетке дейінгі мерзімді тексеру.', en: 'Check citizenship, diploma, debts from earlier programmes and time left before retirement.' },
      result: { ru: 'Вы знаете, можно ли подавать документы.', kk: 'Құжат тапсыруға бола ма – соны білесіз.', en: 'You know whether you can apply.' },
    },
    checklist: [
      {
        id: 'citizen',
        text: {
          ru: 'Вы гражданин Республики Казахстан.',
          kk: 'Сіз Қазақстан Республикасының азаматысыз.',
          en: 'You are a citizen of the Republic of Kazakhstan.',
        },
        link: 'pp573',
      },
      {
        id: 'education',
        text: {
          ru: 'У вас есть документ об образовании уровня, который требует ваша программа.',
          kk: 'Сізде бағдарламаңыз талап ететін деңгейдегі білім туралы құжат бар.',
          en: 'You hold an education document at the level your programme requires.',
        },
        link: 'pp573',
      },
      {
        id: 'pension_age',
        text: {
          ru: 'Программа и отработка после неё укладываются до пенсионного возраста. Считают на день подачи документов.',
          kk: 'Бағдарлама мен одан кейінгі өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
          en: 'The programme and the work-back after it fit before retirement age, counted as of the day you apply.',
        },
        link: 'pp573',
      },
      {
        id: 'no_debt',
        text: {
          ru: 'У вас нет незакрытой отработки и долгов перед Центром международных программ по прошлым программам.',
          kk: 'Бұрынғы бағдарламалар бойынша жабылмаған өтеуіңіз де, Халықаралық бағдарламалар орталығы алдында берешегіңіз де жоқ.',
          en: 'You have no unfinished work-back and no debt to the Center for International Programs from earlier programmes.',
        },
        link: 'pp573',
      },
      {
        id: 'once',
        text: {
          ru: 'Стипендию на одну и ту же программу дают один раз. Повторно участвовать можно, только если прошлую не использовали, к учёбе не приступили и долгов нет.',
          kk: 'Бір бағдарламаға стипендия бір рет беріледі. Қайта қатысуға бұрынғысын пайдаланбаған, оқуға кіріспеген және берешек болмаған жағдайда ғана болады.',
          en: 'The scholarship for the same programme is given once. You may take part again only if you never used the earlier award, never started and owe nothing.',
        },
        required: false,
        link: 'pp573',
        // ПП 573 п. 7. Scientific internships have their own once-only rule – see once_ns.
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'once_ns',
        text: {
          ru: 'Научную стажировку проходят один раз. Повторно участвовать можно, только если ранее присуждённой стажировкой не воспользовались, к ней не приступили и долгов перед администратором нет. Тех, кто на момент подачи учится по программе «Болашак», к конкурсу не допускают.',
          kk: 'Ғылыми тағылымдамадан бір рет өтеді. Қайта қатысуға бұрын тағайындалған тағылымдаманы пайдаланбаған, оған кіріспеген және әкімші алдында берешек болмаған жағдайда ғана болады. Тапсыру сәтінде «Болашақ» бағдарламасы бойынша оқып жүргендер конкурсқа жіберілмейді.',
          en: 'A scientific internship is granted once. You may take part again only if you never used an earlier award, never started it and owe the administrator nothing. Anyone studying under the Bolashak programme when applying is not admitted.',
        },
        required: false,
        link: 'ns_rules422',
        // Приказ МНВО № 422 п. 8 (closing paragraphs).
        appliesTo: { track: ['science_internship'] },
      },
    ],
    mistakes: [
      {
        ru: 'Считать отработку делом далёкого будущего. Её срок учитывают уже при подаче.',
        kk: 'Өтеуді алыс болашақтың ісі деп санау. Оның мерзімі тапсыру кезінде-ақ ескеріледі.',
        en: 'Treating the work-back as far off. Its length is counted when you apply.',
      },
      {
        ru: 'Подавать документы с незакрытой отработкой или долгом по прошлой программе Центра: к конкурсу не допускают.',
        kk: 'Орталықтың бұрынғы бағдарламасы бойынша жабылмаған өтеу не берешекпен құжат тапсыру: конкурсқа жібермейді.',
        en: 'Applying with unfinished work-back or a debt from an earlier Center programme: you are not admitted.',
      },
    ],
    sources: ['pp573', 'pravila'],
    estimateWeeks: [0, 1],
  },

  {
    id: 'category',
    chapter: 'prepare',
    icon: 'UserRoundCheck',
    kicker: { ru: 'Ваша дорожка', kk: 'Сіздің жолыңыз', en: 'Your track' },
    title: { ru: 'Категория подачи и её требования', kk: 'Тапсыру санаты және оның талаптары', en: 'Your application category' },
    summary: {
      ru: 'От неё зависят стаж, GPA, язык, документы и порядок этапов.',
      kk: 'Одан өтіл, GPA, тіл, құжаттар және кезеңдер реті тәуелді.',
      en: 'It decides your experience, GPA, language, documents and the order of stages.',
    },
    why: {
      ru: 'Ниже – требования только вашей категории.',
      kk: 'Төменде – тек сіздің санатыңыздың талаптары.',
      en: 'Below are the requirements for your category only.',
    },
    inShort: {
      what: { ru: 'Категория, по которой вы участвуете в конкурсе.', kk: 'Конкурсқа қатысатын санатыңыз.', en: 'The category under which you enter the competition.' },
      you: { ru: 'Определить свою категорию и прочитать её требования: стаж, GPA, языки, заявка работодателя.', kk: 'Санатыңызды анықтап, талаптарын оқу: өтіл, GPA, тілдер, жұмыс беруші өтінімі.', en: 'Find your category and read its requirements: experience, GPA, languages, employer request.' },
      result: { ru: 'Этапы в приложении подобраны под вашу категорию.', kk: 'Қолданбадағы кезеңдер санатыңызға қарай іріктеледі.', en: 'The stages in the app are matched to your category.' },
    },
    checklist: [
      {
        id: 'category_known',
        text: {
          ru: 'Вы определили категорию и прочитали её требования ниже.',
          kk: 'Санатыңызды анықтап, төмендегі талаптарын оқыдыңыз.',
          en: 'You know your category and have read its requirements below.',
        },
        autoCompleteWhen: { always: true },
      },
      {
        id: 'gpa',
        text: {
          ru: 'Средний балл диплома – не ниже GPA 3.00 из 4.00/4.33 либо 4.00 из 5.00.',
          kk: 'Диплом орташа балы – 4.00/4.33-тен GPA 3.00 не 5.00-ден 4.00-ден төмен емес.',
          en: 'Your diploma GPA is at least 3.00 out of 4.00/4.33 or 4.00 out of 5.00.',
        },
        appliesTo: { category: [...PREFERENTIAL] },
        link: 'pravila',
      },
      {
        id: 'experience',
        text: {
          ru: 'Стаж подтверждают справки с работы и выписка о пенсионных отчислениях за нужный период.',
          kk: 'Өтілді жұмыс орнынан анықтамалар және қажетті кезеңдегі зейнетақы аударымдары туралы үзінді көшірме растайды.',
          en: 'Experience is proven by employment papers and a pension-contribution statement for the required period.',
        },
        appliesTo: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        autoCompleteWhen: { meetsExperience: true },
        link: 'pravila',
      },
      {
        id: 'related',
        text: {
          ru: 'Специальность диплома соответствует выбранной по перечню родственных специальностей.',
          kk: 'Диплом мамандығы туыстас мамандықтар тізбесі бойынша таңдалғанға сәйкес келеді.',
          en: 'Your diploma specialty matches the chosen one under the related-specialties list.',
        },
        appliesTo: { category: [...PREFERENTIAL] },
        link: 'related2026',
      },
      {
        id: 'employer',
        text: {
          ru: 'Работодатель готов дать заявку на ваше обучение и сохранить за вами место.',
          kk: 'Жұмыс беруші оқуыңызға өтінім беріп, орныңызды сақтауға дайын.',
          en: 'Your employer is ready to request your training and keep your job open.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'publications',
        text: {
          ru: 'У вас есть хотя бы одна статья или обзор в Web of Science или Scopus – либо статья в издании из Списка 1 или 2 Перечня, и (или) международная заявка в Derwent Innovations Index. Список результатов утверждает работодатель.',
          kk: 'Сізде Web of Science не Scopus-та кемінде бір мақала не шолу бар – не Тізбенің 1 не 2 тізіміндегі басылымда мақала және (немесе) Derwent Innovations Index-тегі халықаралық өтінім. Нәтижелер тізімін жұмыс беруші бекітеді.',
          en: 'You have at least one article or review in Web of Science or Scopus – or an article in a List 1 or List 2 journal, and/or an international application in the Derwent Innovations Index. Your employer approves the list of results.',
        },
        appliesTo: { category: ['science_internship'] },
        link: 'ns_rules422',
      },
      {
        id: 'accreditation',
        text: {
          ru: 'У вашей научной организации есть действующая аккредитация.',
          kk: 'Ғылыми ұйымыңыздың қолданыстағы аккредиттеуі бар.',
          en: 'Your research organisation holds a valid accreditation.',
        },
        appliesTo: { category: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'olympiad',
        text: {
          ru: 'У вас есть диплом I, II или III степени международной олимпиады или конкурса по вашей специальности за последние 3 года.',
          kk: 'Сізде соңғы 3 жылдағы мамандығыңыз бойынша халықаралық олимпиада не конкурстың I, II не III дәрежелі дипломы бар.',
          en: 'You have a 1st, 2nd or 3rd place diploma from an international olympiad or contest in your specialty from the last 3 years.',
        },
        appliesTo: { category: ['bachelor'] },
        link: 'olympiads',
      },
    ],
    mistakes: [
      {
        ru: 'Путать общий стаж и непрерывный стаж по специальности. Если требуются оба, проверяют оба.',
        kk: 'Жалпы өтіл мен мамандық бойынша үздіксіз өтілді шатастыру. Екеуі де талап етілсе, екеуі де тексеріледі.',
        en: 'Mixing up total experience and continuous experience in your field. Where both are required, both are checked.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Проверяют выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесін тексереді, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. The pension-fund statement for the whole period is checked, paid leave included.',
      },
    ],
    sources: ['pravila', 'pp573', 'ns_requirements'],
    estimateWeeks: [0, 1],
  },

  {
    id: 'specialty',
    chapter: 'prepare',
    icon: 'ListChecks',
    kicker: { ru: 'Что изучать', kk: 'Нені оқу керек', en: 'What to study' },
    title: { ru: 'Специальность из приоритетного перечня', kk: 'Басым тізбедегі мамандық', en: 'A specialty from the priority list' },
    summary: {
      ru: 'Стипендию дают только по специальностям из перечня на этот конкурсный год.',
      kk: 'Стипендияны осы конкурс жылының тізбесіндегі мамандықтар бойынша ғана береді.',
      en: 'The scholarship covers only specialties on this year\'s list.',
    },
    why: {
      ru: 'Перечень утверждают каждый год. Если вашей специальности в перечне этого года нет, стипендию по ней не дают.',
      kk: 'Тізбе жыл сайын бекітіледі. Мамандығыңыз осы жылғы тізбеде болмаса, ол бойынша стипендия берілмейді.',
      en: 'The list is approved every year. If your specialty is not on this year\'s list, no scholarship is given for it.',
    },
    inShort: {
      what: { ru: 'Проверка, финансируется ли ваше направление в этом году.', kk: 'Бағытыңыз биыл қаржыландырыла ма – соны тексеру.', en: 'A check that your field is funded this year.' },
      you: { ru: 'Найти своё направление в перечне текущего года – поиск ниже.', kk: 'Ағымдағы жылғы тізбеден бағытыңызды табу – іздеу төменде.', en: 'Find your field in this year\'s list – the search is below.' },
      result: { ru: 'Вы знаете, есть ли ваше направление в перечне и сколько на него мест.', kk: 'Бағытыңыз тізбеде бар ма және оған қанша орын бөлінгенін білесіз.', en: 'You know whether your field is listed and how many places it has.' },
    },
    checklist: [
      {
        id: 'open_list',
        text: {
          ru: 'Нашли своё направление в перечне приоритетных специальностей текущего конкурсного года.',
          kk: 'Ағымдағы конкурс жылының басым мамандықтар тізбесінен бағытыңызды таптыңыз.',
          en: 'You found your field in this year\'s priority-specialty list.',
        },
        link: 'pps2026',
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
      },
      {
        id: 'open_list_internship',
        text: {
          ru: 'Нашли своё направление в перечне приоритетных специальностей для прохождения стажировок.',
          kk: 'Тағылымдамаға арналған басым мамандықтар тізбесінен бағытыңызды таптыңыз.',
          en: 'You found your field in the priority-specialty list for internships.',
        },
        link: 'pps_internship2026',
        appliesTo: { track: ['internship'] },
      },
      {
        id: 'open_list_science',
        text: {
          ru: 'Нашли своё направление в перечне приоритетных направлений научных исследований для научных стажировок.',
          kk: 'Ғылыми тағылымдамаға арналған басым ғылыми зерттеу бағыттарының тізбесінен бағытыңызды таптыңыз.',
          en: 'You found your area in the priority research-areas list for scientific internships.',
        },
        link: 'ns_priorities',
        appliesTo: { track: ['science_internship'] },
      },
      {
        id: 'related_check',
        text: {
          ru: 'Сверили специальность диплома с перечнем родственных специальностей: выбранная программа должна ей соответствовать.',
          kk: 'Диплом мамандығын туыстас мамандықтар тізбесімен салыстырдыңыз: таңдалған бағдарлама оған сәйкес болуы керек.',
          en: 'You checked your diploma specialty against the related-specialties list: the chosen programme must match it.',
        },
        link: 'related2026',
        appliesTo: { category: [...PREFERENTIAL] },
      },
      {
        id: 'quota',
        text: {
          ru: 'Посмотрели, сколько мест выделено вашему направлению в этом году.',
          kk: 'Биыл бағытыңызға қанша орын бөлінгенін қарадыңыз.',
          en: 'You checked how many places your field got this year.',
        },
        required: false,
        link: 'distribution2026',
        // The distribution table is the scholarship's; scientific internships have none.
        appliesTo: { not: { track: ['science_internship'] } },
      },
    ],
    mistakes: [
      {
        ru: 'Смотреть перечень прошлого года. Перечень и число мест утверждают на каждый год.',
        kk: 'Өткен жылғы тізбеге қарау. Тізбе мен орын саны әр жылға бекітіледі.',
        en: 'Using last year\'s list. The list and the number of places are approved for each year.',
      },
      {
        ru: 'Судить по названию программы в вузе. Важно, относится ли она к специальности из перечня.',
        kk: 'ЖОО бағдарламасының атауына ғана қарау. Маңыздысы – ол тізбедегі мамандыққа жата ма.',
        en: 'Going by the programme\'s name. What matters is whether it falls under a listed specialty.',
      },
    ],
    notes: [
      {
        // ПП 573 п. 9 пп. 5) ties the related-specialties rule to the categories listed in
        // п. 4 пп. 2)–5), 7) – the preferential ones. A self-admitted candidate is not among them.
        appliesTo: { category: ['phd_self', 'residency'] },
        tone: 'info',
        text: {
          ru: 'Правило о родственных специальностях к вашей категории не относится: соответствие диплома выбранной программе не требуется. Нужны безусловное приглашение из вуза Списка и казахский язык на уровне B1.',
          kk: 'Туыстас мамандықтар қағидасы сіздің санатыңызға қолданылмайды: дипломның таңдалған бағдарламаға сәйкестігі талап етілмейді. Тізімдегі ЖОО-ның сөзсіз шақыруы және B1 деңгейлі қазақ тілі керек.',
          en: 'The related-specialties rule does not apply to your category: your diploma need not match the chosen programme. You need an unconditional offer from a listed university and Kazakh at B1.',
        },
        source: 'pp573',
      },
      {
        // ПП 573 п. 9 пп. 5) ties the related-specialties rule to the preferential categories.
        appliesTo: { category: ['master_self'] },
        tone: 'info',
        text: {
          ru: 'Правило о родственных специальностях действует только для льготных категорий (из села, ИТР, медики, госслужащие, работники атомной отрасли). Соответствие диплома выбранной программе вам не требуется. Нужны безусловное приглашение из вуза Списка и казахский язык на уровне B1.',
          kk: 'Туыстас мамандықтар қағидасы тек жеңілдікті санаттарға (ауылдан, ИТҚ, медиктер, мемқызметшілер, атом саласы қызметкерлері) қолданылады. Дипломның таңдалған бағдарламаға сәйкестігі сізге талап етілмейді. Тізімдегі ЖОО-ның сөзсіз шақыруы және B1 деңгейлі қазақ тілі керек.',
          en: 'The related-specialties rule applies only to the preferential categories (rural, engineering, medical, civil-service and nuclear-industry applicants). Your diploma need not match the chosen programme. You need an unconditional offer from a listed university and Kazakh at B1.',
        },
        source: 'pp573',
      },
      {
        appliesTo: { category: [...PREFERENTIAL] },
        tone: 'warn',
        text: {
          ru: 'Ваша категория льготная: специальность диплома должна соответствовать выбранной по перечню родственных специальностей. Также проверяют GPA и порог по иностранному языку.',
          kk: 'Санатыңыз жеңілдікті: диплом мамандығы туыстас мамандықтар тізбесі бойынша таңдалғанға сәйкес келуі керек. GPA мен шет тілі шегі де тексеріледі.',
          en: 'Yours is a preferential category: your diploma specialty must match the chosen one under the related-specialties list. The GPA and the foreign-language threshold are checked too.',
        },
        source: 'pp573',
      },
    ],
    sources: ['pps2026', 'pps_internship2026', 'related2026', 'ns_priorities', 'distribution2026', 'pp573'],
    estimateWeeks: [1, 2],
  },

  {
    id: 'university',
    chapter: 'prepare',
    icon: 'Landmark',
    kicker: { ru: 'Куда поедете', kk: 'Қайда барасыз', en: 'Where you will go' },
    title: { ru: 'Вуз из Списка', kk: 'Тізімдегі ЖОО', en: 'A university from the list' },
    summary: {
      ru: 'Подходят только вузы из официального списка на этот год.',
      kk: 'Тек осы жылғы ресми тізімдегі ЖОО жарайды.',
      en: 'Only universities on this year\'s official list qualify.',
    },
    why: {
      ru: 'Список ведущих зарубежных вузов утверждают каждый год. Приглашение из вуза вне списка права на стипендию не даёт, каким бы ни был рейтинг вуза.',
      kk: 'Жетекші шетелдік ЖОО тізімі жыл сайын бекітіледі. Тізімнен тыс ЖОО шақыруы, рейтингіне қарамастан, стипендияға құқық бермейді.',
      en: 'The list of leading foreign universities is approved every year. An offer from a university outside it gives no right to the scholarship, whatever its ranking.',
    },
    inShort: {
      what: { ru: 'Выбор вуза из официального списка текущего года.', kk: 'Ағымдағы жылғы ресми тізімнен ЖОО таңдау.', en: 'Choosing a university from this year\'s official list.' },
      you: { ru: 'Найти вуз в списке (поиск ниже), изучить программу, её сроки и предметные рейтинги.', kk: 'ЖОО-ны тізімнен тауып (іздеу төменде), бағдарламасын, мерзімдерін және пәндік рейтингтерін зерттеу.', en: 'Find the university on the list (search below) and study the programme, its deadlines and subject rankings.' },
      result: { ru: 'Короткий список вузов для подачи и их сроки приёма заявок.', kk: 'Тапсыруға арналған ЖОО-лардың қысқа тізімі және өтінім қабылдау мерзімдері.', en: 'A shortlist of universities and their application deadlines.' },
    },
    checklist: [
      {
        id: 'in_list',
        text: {
          ru: 'Нашли вуз в списке ведущих зарубежных вузов на текущий год.',
          kk: 'ЖОО-ны ағымдағы жылғы жетекші шетелдік ЖОО тізімінен таптыңыз.',
          en: 'You found the university in this year\'s list of leading foreign universities.',
        },
        link: 'vuzy2026',
        // ПП 573 п. 13 asks an internship candidate only for an unconditional invitation
        // from the host organisation – no list is involved on that track.
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
      },
      {
        id: 'invite_internship',
        text: {
          ru: 'Договорились о стажировке с зарубежной организацией. Списка организаций для стажировки нет.',
          kk: 'Шетелдік ұйыммен тағылымдама туралы келістіңіз. Тағылымдамаға арналған ұйымдар тізімі жоқ.',
          en: 'You agreed the internship with a foreign organisation. There is no list of host organisations for internships.',
        },
        link: 'pp573',
        appliesTo: { track: ['internship'] },
      },
      {
        id: 'in_list_ns',
        text: {
          ru: 'Нашли принимающую организацию в списке организаций для научных стажировок на текущий год.',
          kk: 'Қабылдаушы ұйымды ағымдағы жылғы ғылыми тағылымдама ұйымдарының тізімінен таптыңыз.',
          en: 'You found the host organisation in this year\'s list for scientific internships.',
        },
        link: 'ns_orgs',
        appliesTo: { track: ['science_internship'] },
      },
      {
        id: 'programme',
        text: {
          ru: 'Изучили программу: требования к иностранцам, срок обучения, дату начала и срок приёма заявок.',
          kk: 'Бағдарламаны зерттедіңіз: шетелдіктерге талаптар, оқу мерзімі, басталу күні және өтінім қабылдау мерзімі.',
          en: 'You studied the programme: requirements for international students, length, start date and application deadline.',
        },
        link: 'admission_guide',
      },
      {
        id: 'rankings',
        text: {
          ru: 'Посмотрели предметные рейтинги вуза (QS, Times Higher Education, ARWU): о них спрашивают на собеседовании.',
          kk: 'ЖОО-ның пәндік рейтингтерін (QS, Times Higher Education, ARWU) қарадыңыз: әңгімелесуде олар туралы сұрайды.',
          en: 'You looked at the university\'s subject rankings (QS, Times Higher Education, ARWU): they come up at the interview.',
        },
        required: false,
        link: 'admission_guide',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
      {
        id: 'duration_internship',
        text: {
          ru: 'Срок стажировки укладывается в рамки правил вашей программы.',
          kk: 'Тағылымдама мерзімі бағдарламаңыз қағидаларының шегіне сыяды.',
          en: 'The internship length is within your programme\'s rules.',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Ориентироваться на общий рейтинг вуза, а не на список текущего года.',
        kk: 'Ағымдағы жылғы тізімге емес, ЖОО-ның жалпы рейтингіне сүйену.',
        en: 'Going by the overall ranking instead of this year\'s list.',
      },
      {
        ru: 'Не проверить сроки вуза: в сильные программы приём заявок открывается почти за год до начала учёбы.',
        kk: 'ЖОО мерзімдерін тексермеу: күшті бағдарламаларға өтінім оқу басталуға бір жылдай қалғанда ашылады.',
        en: 'Not checking the university\'s deadlines: strong programmes open applications almost a year before classes start.',
      },
    ],
    sources: ['vuzy_page', 'vuzy2026', 'ns_orgs', 'admission_guide'],
    estimateWeeks: [2, 6],
  },

  {
    id: 'kazakh',
    chapter: 'prepare',
    icon: 'Languages',
    kicker: { ru: 'Государственный язык', kk: 'Мемлекеттік тіл', en: 'State language' },
    title: { ru: 'Сертификат по казахскому языку', kk: 'Қазақ тілі сертификаты', en: 'Kazakh language certificate' },
    summary: {
      ru: 'КАЗТЕСТ или Qazaq Resmi Test не ниже B1 – нужен всем.',
      kk: 'B1-ден төмен емес ҚАЗТЕСТ не Qazaq Resmi Test – бәріне керек.',
      en: 'KAZTEST or Qazaq Resmi Test at B1 or above – everyone needs it.',
    },
    why: {
      ru: 'B1 нужен каждому претенденту, независимо от категории и балла по иностранному языку. Сертификат подают вместе с документами.',
      kk: 'B1 санат пен шет тілі балына қарамастан әр үміткерге керек. Сертификат құжаттармен бірге тапсырылады.',
      en: 'Every applicant needs B1, whatever the category or foreign-language score. The certificate goes in with your documents.',
    },
    inShort: {
      what: { ru: 'Государственный язык на уровне B1 – требование для всех категорий.', kk: 'Мемлекеттік тіл B1 деңгейінде – барлық санатқа ортақ талап.', en: 'The state language at B1 – a requirement for every category.' },
      you: { ru: 'Сдать КАЗТЕСТ или Qazaq Resmi Test на уровень B1 или выше.', kk: 'ҚАЗТЕСТ не Qazaq Resmi Test-ті B1 не одан жоғары деңгейге тапсыру.', en: 'Pass KAZTEST or Qazaq Resmi Test at B1 or above.' },
      result: { ru: 'Действующий сертификат для пакета документов. Без него пакет неполный.', kk: 'Құжаттар топтамасына жарамды сертификат. Онсыз топтама толық емес.', en: 'A valid certificate for your document package. Without it the package is incomplete.' },
    },
    checklist: [
      {
        id: 'book',
        text: {
          ru: 'Записались на КАЗТЕСТ в Национальном центре тестирования или на онлайн-тест Qazaq Resmi Test.',
          kk: 'Ұлттық тестілеу орталығындағы ҚАЗТЕСТ-ке немесе Qazaq Resmi Test онлайн тестіне жазылдыңыз.',
          en: 'You booked KAZTEST at the National Testing Center or the online Qazaq Resmi Test.',
        },
        link: 'kaztest',
      },
      {
        id: 'passed',
        text: {
          ru: 'Получили сертификат с уровнем B1 или выше.',
          kk: 'B1 немесе одан жоғары деңгейлі сертификат алдыңыз.',
          en: 'You received a certificate at level B1 or higher.',
        },
        autoCompleteWhen: { kazakhCert: true },
        link: 'prikaz318',
      },
      {
        id: 'verify',
        text: {
          ru: 'Проверили, что в сертификате Qazaq Resmi Test указан ваш ID-номер и есть QR-код для проверки подлинности на qrt.kz.',
          kk: 'Qazaq Resmi Test сертификатында ID нөміріңіз және qrt.kz-те түпнұсқалығын тексеруге арналған QR-код бар екенін тексердіңіз.',
          en: 'You checked that your Qazaq Resmi Test certificate shows your ID number and a QR code for verification at qrt.kz.',
        },
        required: false,
        link: 'qrt',
      },
    ],
    mistakes: [
      {
        ru: 'Откладывать КАЗТЕСТ на последние дни приёма: без сертификата пакет неполный.',
        kk: 'ҚАЗТЕСТ-ті қабылдаудың соңғы күндеріне қалдыру: сертификатсыз топтама толық емес.',
        en: 'Leaving KAZTEST to the last days of the intake: without the certificate your package is incomplete.',
      },
      {
        ru: 'Подать просроченный сертификат. На день подачи он должен быть действующим.',
        kk: 'Мерзімі өткен сертификат тапсыру. Тапсыру күні ол жарамды болуы керек.',
        en: 'Submitting an expired certificate. It must be valid on the day you apply.',
      },
    ],
    sources: ['prikaz318', 'pravila', 'qrt', 'kaztest'],
    estimateWeeks: [2, 8],
    autoCompleteWhen: { kazakhCert: true },
  },

  {
    id: 'foreign',
    chapter: 'prepare',
    icon: 'Globe2',
    kicker: { ru: 'Язык обучения', kk: 'Оқу тілі', en: 'Language of study' },
    title: { ru: 'Сертификат по иностранному языку', kk: 'Шет тілі сертификаты', en: 'Foreign language certificate' },
    summary: {
      ru: 'Минимальный балл зависит от вашей программы и категории.',
      kk: 'Ең төменгі балл бағдарлама мен санатыңызға байланысты.',
      en: 'The minimum score depends on your programme and category.',
    },
    why: {
      ru: 'Ниже – таблица порогов для вашей категории и ваш балл на шкале.',
      kk: 'Төменде – санатыңызға арналған шектер кестесі және балыңыз шкалада.',
      en: 'Below is the threshold table for your category, with your score on the scale.',
    },
    inShort: {
      what: { ru: 'Проверка, достигает ли ваш балл порога вашей категории.', kk: 'Балыңыз санатыңыздың шегіне жете ме – соны тексеру.', en: 'A check that your score reaches your category\'s threshold.' },
      you: { ru: 'Узнать порог по таблице, сдать экзамен и сверить балл, в том числе с требованием принимающей стороны.', kk: 'Кестеден шекті біліп, емтихан тапсырып, балды салыстыру, оның ішінде қабылдаушы тараптың талабымен.', en: 'Find the threshold in the table, take the exam and compare your score, including with the host\'s requirement.' },
      result: { ru: 'Вы знаете, достаточно ли балла и сколько не хватает до порога.', kk: 'Балыңыз жеткілікті ме және шекке дейін қанша жетпейтінін білесіз.', en: 'You know whether your score is enough and, if not, how far off it is.' },
    },
    checklist: [
      {
        id: 'know_threshold',
        text: {
          ru: 'Знаете порог для вашей категории – он в таблице ниже.',
          kk: 'Санатыңыздың шегін білесіз – ол төмендегі кестеде.',
          en: 'You know your category\'s threshold – it is in the table below.',
        },
        link: 'prikaz318',
      },
      {
        id: 'has_cert',
        text: {
          ru: 'Сдали экзамен и получили действительный сертификат.',
          kk: 'Емтихан тапсырып, жарамды сертификат алдыңыз.',
          en: 'You took the exam and hold a valid certificate.',
        },
        autoCompleteWhen: { hasForeignCert: true },
        // Self-admitted master's and doctoral applicants: the Rules ask no certificate of them
        // (ПП 573 п. 9 пп. 3, п. 11–12) – they get the optional items below instead.
        appliesTo: { not: { category: ['master_self', 'phd_self', 'phd_nuclear', 'residency'] } },
      },
      {
        id: 'meets',
        text: {
          ru: 'Балл не ниже порога для вашей категории.',
          kk: 'Балл санатыңыздың шегінен төмен емес.',
          en: 'Your score is at or above your category\'s threshold.',
        },
        autoCompleteWhen: { foreignMeets: true },
        link: 'prikaz318',
        appliesTo: { not: { category: ['master_self', 'phd_self', 'phd_nuclear', 'residency'] } },
      },
      {
        id: 'uni_cert',
        text: {
          ru: 'Если вуз требует языковой сертификат для зачисления, вы сдали экзамен на нужный балл. Для конкурса правила сертификат от вас не требуют.',
          kk: 'ЖОО қабылдау үшін тіл сертификатын талап етсе, емтиханды қажетті балға тапсырдыңыз. Конкурс үшін қағидалар сізден сертификат талап етпейді.',
          en: 'If the university requires a language certificate for admission, you have the score it asks for. For the competition the Rules do not require one from you.',
        },
        required: false,
        autoCompleteWhen: { hasForeignCert: true },
        link: 'pp573',
        appliesTo: { category: ['master_self', 'phd_self', 'phd_nuclear', 'residency'] },
      },
      {
        id: 'check_318',
        text: {
          ru: 'Уточнили в Центре, применяется ли к вам порог из таблицы приказа № 318: для «самостоятельно поступивших» там указан третий порог.',
          kk: '№ 318 бұйрық кестесіндегі шек сізге қолданыла ма – Орталықтан нақтыладыңыз: онда «өз бетінше түскендерге» үшінші шек көрсетілген.',
          en: 'You asked the Center whether the Order No. 318 threshold applies to you: its table lists level III for "self-admitted" applicants.',
        },
        required: false,
        link: 'prikaz318',
        appliesTo: { category: ['master_self', 'phd_self', 'phd_nuclear', 'residency'] },
      },
      {
        id: 'validity',
        text: {
          ru: 'Проверили срок действия сертификата: IELTS и TOEFL действуют 2 года.',
          kk: 'Сертификаттың жарамдылық мерзімін тексердіңіз: IELTS пен TOEFL 2 жыл жарамды.',
          en: 'You checked the certificate\'s validity: IELTS and TOEFL are valid for 2 years.',
        },
        required: false,
        link: 'admission_guide',
      },
      {
        id: 'uni_requirement',
        text: {
          ru: 'Сверили балл с требованием вуза: оно бывает выше порога стипендии.',
          kk: 'Балды ЖОО талабымен салыстырдыңыз: ол стипендия шегінен жоғары болуы мүмкін.',
          en: 'You compared your score with the university\'s requirement: it can be higher than the scholarship threshold.',
        },
        required: false,
        link: 'admission_guide',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
    ],
    notes: [
      {
        // ПП 573 п. 9 пп. 3: the foreign-language condition is for п. 4 пп. 2)–5), 7) only.
        appliesTo: { category: ['master_self'] },
        tone: 'info',
        text: {
          ru: 'По ПП № 573 (п. 9 пп. 3) иностранный язык – условие только для категорий из села, ИТР, медиков, госслужащих и работников атомной отрасли. В вашем списке документов сертификата нет; язык проверяет вуз при безусловном зачислении. В таблице приказа № 318 есть строка «самостоятельно поступившие» (третий порог, IELTS 6.0 или эквивалент) – применяется ли она к вам, уточните в Центре.',
          kk: '№ 573 ҮҚ бойынша (9-тармақтың 3-тармақшасы) шет тілі тек ауылдан, ИТҚ, медиктер, мемқызметшілер және атом саласы қызметкерлері санаттары үшін шарт. Сіздің құжаттар тізіміңізде сертификат жоқ; тілді ЖОО сөзсіз қабылдау кезінде тексереді. № 318 бұйрық кестесінде «өз бетінше түскендер» жолы бар (үшінші шек, IELTS 6.0 не баламасы) – оның сізге қолданылатынын Орталықтан нақтылаңыз.',
          en: 'Under Decree No. 573 (п. 9 пп. 3) a foreign language is a condition only for the rural, engineering, medical, civil-service and nuclear-industry categories. Your document list has no certificate; the university checks your language when it admits you unconditionally. Order No. 318 has a "self-admitted" row (level III, IELTS 6.0 or equivalent) – ask the Center whether it applies to you.',
        },
        source: 'pp573',
      },
      {
        // ПП 573 п. 11–12: no foreign-language condition and no certificate in the package.
        appliesTo: { category: ['phd_self', 'phd_nuclear', 'residency'] },
        tone: 'info',
        text: {
          ru: 'Иностранного языка нет ни в условиях, ни в списке документов ПП № 573 (п. 11–12); язык проверяет вуз при безусловном зачислении. В таблице приказа № 318 есть строка «самостоятельно поступившие» (третий порог, IELTS 6.0 или эквивалент) – применяется ли она к вам, уточните в Центре.',
          kk: 'Шет тілі № 573 ҮҚ шарттарында да, құжаттар тізімінде де (11–12-тармақтар) жоқ; тілді ЖОО сөзсіз қабылдау кезінде тексереді. № 318 бұйрық кестесінде «өз бетінше түскендер» жолы бар (үшінші шек, IELTS 6.0 не баламасы) – оның сізге қолданылатынын Орталықтан нақтылаңыз.',
          en: 'Decree No. 573 (п. 11–12) has no foreign language among the conditions or the documents; the university checks it when it admits you unconditionally. Order No. 318 has a "self-admitted" row (level III, IELTS 6.0 or equivalent) – ask the Center whether it applies to you.',
        },
        source: 'pp573',
      },
      {
        appliesTo: { category: ['science_internship'] },
        tone: 'info',
        text: {
          ru: 'Для научных стажировок минимальные баллы установлены приложением 4 к Правилам научных стажировок (приказ МНВО № 422) и зависят от языка стажировки. Ориентируйтесь на эту таблицу, а не на приказ № 318.',
          kk: 'Ғылыми тағылымдамаға ең төменгі балдар Ғылыми тағылымдама қағидаларының 4-қосымшасында (ҒЖБМ № 422 бұйрығы) белгіленген және тағылымдама тіліне байланысты. № 318 бұйрыққа емес, осы кестеге сүйеніңіз.',
          en: 'For scientific internships the minimum scores are set in Appendix 4 to the scientific-internship Rules (Order No. 422) and depend on the internship language. Go by that table, not Order No. 318.',
        },
        source: 'ns_rules422',
      },
    ],
    mistakes: [
      {
        ru: 'Сдать General IELTS вместо Academic: для поступления нужен академический модуль.',
        kk: 'Academic орнына General IELTS тапсыру: оқуға түсу үшін академиялық модуль керек.',
        en: 'Taking General IELTS instead of Academic: admission needs the academic module.',
      },
      {
        ru: 'Смотреть только на общий балл: вузы обычно задают минимум и по каждой секции.',
        kk: 'Тек жалпы балға қарау: ЖОО-лар әдетте әр секцияға да минимум қояды.',
        en: 'Looking only at the overall score: universities usually set a minimum for each section too.',
      },
      {
        ru: 'Не учесть особые случаи: для медицинских направлений в Германии нужен DSH-3, а все, кто поступает в немецкие вузы, проходят собеседование с DAAD за свой счёт.',
        kk: 'Ерекше жағдайларды ескермеу: Германиядағы медицина бағыттарына DSH-3 керек, ал неміс ЖОО-ларына түсетіндердің бәрі DAAD әңгімелесуінен өз есебінен өтеді.',
        en: 'Missing special cases: German medical programmes need DSH-3, and everyone applying to a German university has a DAAD interview at their own expense.',
      },
    ],
    sources: ['prikaz318', 'pravila', 'ns_minscore'],
    estimateWeeks: [4, 20],
    autoCompleteWhen: { foreignMeets: true },
  },

  {
    id: 'admission',
    chapter: 'prepare',
    icon: 'MailCheck',
    kicker: { ru: 'Приглашение', kk: 'Шақыру', en: 'The offer' },
    title: { ru: 'Поступление и безусловное приглашение', kk: 'Түсу және сөзсіз шақыру', en: 'Admission and the unconditional offer' },
    // The academic wording below is the default; the internship platforms replace all of it.
    summary: {
      ru: 'Без безусловного приглашения документы на конкурс не примут.',
      kk: 'Сөзсіз шақырусыз құжаттарды конкурсқа қабылдамайды.',
      en: 'Without an unconditional offer your documents will not be accepted.',
    },
    why: {
      ru: 'Приглашение должно быть безусловным – без учебных условий вроде «доучите язык» или «донесите транскрипт». Условие об оплате допустимо: оплату берёт на себя стипендия.',
      kk: 'Шақыру сөзсіз болуы керек – «тілді жетілдіріңіз» не «транскрипт әкеліңіз» сияқты оқу шарттарынсыз. Төлем туралы шарт болуы мүмкін: оны стипендия төлейді.',
      en: 'The offer has to be unconditional – no study conditions like "improve your language" or "send a transcript". A payment condition is acceptable: the scholarship pays.',
    },
    inShort: {
      what: { ru: 'Самостоятельное поступление в зарубежный вуз. Для большинства категорий без приглашения документы на конкурс не примут.', kk: 'Шетелдік ЖОО-ға өз бетіңізше түсу. Көп санат үшін шақырусыз құжат конкурсқа қабылданбайды.', en: 'Getting into a foreign university on your own. For most categories, documents are not accepted without an offer.' },
      you: { ru: 'Подать заявки, получить безусловное приглашение и нотариально заверить его перевод.', kk: 'Өтінім беріп, сөзсіз шақыру алу және оның аудармасын нотариалды куәландыру.', en: 'Apply, get an unconditional offer and have its translation notarised.' },
      result: { ru: 'Безусловное приглашение с заверенным переводом.', kk: 'Аудармасы куәландырылған сөзсіз шақыру.', en: 'An unconditional offer with a certified translation.' },
    },
    checklist: [
      {
        id: 'season',
        text: {
          ru: 'Выбрали начало учёбы – осень (сентябрь–декабрь) или весна (январь–июнь) – с учётом сроков вуза.',
          kk: 'Оқудың басталуын – күз (қыркүйек–желтоқсан) не көктем (қаңтар–маусым) – ЖОО мерзімін ескеріп таңдадыңыз.',
          en: 'You chose your start – autumn (September–December) or spring (January–June) – in line with the university\'s deadlines.',
        },
        link: 'admission_guide',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
      {
        id: 'apply_uni',
        text: {
          ru: 'Подали заявки в вузы. Стипендия оплачивает оформление и подачу не более 5 анкет.',
          kk: 'ЖОО-ларға өтінім бердіңіз. Стипендия 5-тен аспайтын анкетаны рәсімдеу мен беруді төлейді.',
          en: 'You applied to universities. The scholarship pays for preparing and filing up to 5 applications.',
        },
        link: 'pp573',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
      {
        id: 'offer',
        text: {
          ru: 'Получили безусловное приглашение (unconditional offer) без академических условий.',
          kk: 'Академиялық шарттарсыз сөзсіз шақыру (unconditional offer) алдыңыз.',
          en: 'You received an unconditional offer with no academic conditions.',
        },
        autoCompleteWhen: { invitation: ['unconditional'] },
        link: 'pravila',
      },
      {
        id: 'offer_content',
        text: {
          ru: 'В письме указаны ваши данные, специальность, сроки обучения и стоимость.',
          kk: 'Хатта деректеріңіз, мамандық, оқу мерзімі мен құны көрсетілген.',
          en: 'The letter states your details, specialty, study period and cost.',
        },
        link: 'pravila',
      },
      {
        id: 'translation',
        text: {
          ru: 'Перевели приглашение на казахский или русский и заверили перевод у нотариуса.',
          kk: 'Шақыруды қазақ не орыс тіліне аударып, аударманы нотариуста куәландырдыңыз.',
          en: 'You had the offer translated into Kazakh or Russian and notarised.',
        },
        link: 'pravila',
      },
      {
        id: 'programme_internship',
        text: {
          ru: 'Составили программу стажировки, её утвердили ваша и принимающая организации. Перевод заверен у нотариуса.',
          kk: 'Тағылымдама бағдарламасын жасадыңыз, оны өз ұйымыңыз бен қабылдаушы ұйым бекітті. Аудармасы нотариуста куәландырылған.',
          en: 'You drew up the internship programme and both your organisation and the host approved it. The translation is notarised.',
        },
        appliesTo: { track: ['internship'] },
        link: 'internship_program',
      },
      {
        id: 'programme_science',
        text: {
          ru: 'Составили программу научной стажировки по приложению 5 к Правилам: её утверждает работодатель, а согласовывает зарубежная организация из списка; к ней – нотариальный перевод на казахский или русский.',
          kk: 'Ғылыми тағылымдама бағдарламасын Қағидалардың 5-қосымшасы бойынша жасадыңыз: оны жұмыс беруші бекітеді, тізімдегі шетелдік ұйым келіседі; оған қазақ не орыс тіліне нотариалды аударма қоса беріледі.',
          en: 'You drew up the scientific internship programme on Appendix 5 to the Rules: your employer approves it and the listed host agrees it; it comes with a notarised Kazakh or Russian translation.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_program',
      },
      {
        id: 'free_tuition',
        text: {
          ru: 'Если вуз или другая организация обучает вас бесплатно, приложили документы о покрытии расходов на весь срок обучения.',
          kk: 'ЖОО не басқа ұйым сізді тегін оқытса, бүкіл оқу мерзіміне шығыстардың жабылғаны туралы құжаттарды қостыңыз.',
          en: 'If a university or another organisation teaches you free of charge, you attached proof that the costs are covered for the whole period.',
        },
        required: false,
        link: 'pravila',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
    ],
    notes: [
      {
        // Not in ПП 573 and not on the requirements page, which lists only the applicant's
        // details, specialty, dates and cost. Recorded as practice, marked as such.
        appliesTo: { not: { category: [...PREFERENTIAL] } },
        tone: 'info',
        text: {
          ru: 'Правила требуют, чтобы в приглашении были данные претендента, специальность, сроки и стоимость; подпись в этом перечне не названа. На практике приглашение просят с подписью – официальным источником это не подтверждено. Дата и подпись обязательны в мотивационном письме.',
          kk: 'Қағидалар шақыруда үміткер деректері, мамандық, мерзім және құн болуын талап етеді; қол бұл тізімде аталмаған. Тәжірибеде шақыруды қолы қойылған күйде сұрайды – бұл ресми дереккөзбен расталмаған. Күн мен қол мотивациялық хатта міндетті.',
          en: 'The rules require the offer to show the applicant\'s details, specialty, dates and cost; a signature is not on that list. In practice a signed offer is asked for – this is not confirmed by an official source. A date and signature are required on the motivation letter.',
        },
      },
      {
        appliesTo: { category: [...PREFERENTIAL] },
        tone: 'warn',
        text: {
          ru: 'Вашей категории приглашение при подаче не нужно: вуз выбирают после присуждения стипендии и языковых курсов. Этап показан заранее – вы вернётесь к нему после присуждения.',
          kk: 'Сіздің санатыңызға тапсыру кезінде шақыру керек емес: ЖОО стипендия тағайындалып, тіл курстарынан кейін таңдалады. Кезең алдын ала көрсетілген – оған тағайындалғаннан кейін ораласыз.',
          en: 'Your category needs no offer when applying: the university is chosen after the award and the language courses. The stage is shown in advance – you return to it after the award.',
        },
        source: 'pravila',
      },
    ],
    mistakes: [
      {
        ru: 'Принять conditional offer за безусловный: условия вроде «доучить язык» или «донести транскрипт» делают приглашение непригодным для конкурса.',
        kk: 'Conditional offer-ді сөзсіз деп қабылдау: «тілді жетілдіру» сияқты шарттар шақыруды конкурсқа жарамсыз етеді.',
        en: 'Taking a conditional offer for an unconditional one: conditions like "improve your language" make it unusable for the competition.',
      },
      {
        ru: 'Подать письмо только на английском, без нотариального перевода.',
        kk: 'Хатты нотариалды аудармасыз, тек ағылшынша тапсыру.',
        en: 'Submitting the letter in English only, without a notarised translation.',
      },
      {
        ru: 'Не указать в приглашении стоимость обучения: без неё документ не проходит проверку.',
        kk: 'Шақыруда оқу құнын көрсетпеу: онсыз құжат тексеруден өтпейді.',
        en: 'Leaving the tuition cost out of the offer: without it the document fails the check.',
      },
    ],
    sources: ['pravila', 'pp573', 'admission_guide', 'internship_program', 'ns_program'],
    estimateWeeks: [8, 24],
    appliesTo: { category: [...SELF_ADMITTED] },
    autoCompleteWhen: { invitation: ['unconditional'] },
  },
]
