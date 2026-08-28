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
      ru: 'Гражданство, образование, долги и хватит ли времени до пенсии.',
      kk: 'Азаматтық, білім, берешек және зейнетке дейін уақыт жете ме.',
      en: 'Citizenship, education, debts, and whether you have time before retirement.',
    },
    why: {
      ru: 'Это проверяют первым делом. Не сошлось хоть что-то одно — документы не примут, каким бы ни был балл и приглашение. Пять минут сейчас сэкономят месяцы.',
      kk: 'Мұны ең алдымен тексереді. Біреуі сәйкес келмесе, балл мен шақыруға қарамастан құжат қабылданбайды. Қазір бес минут кетеді, бірақ айларды үнемдейді.',
      en: 'This is checked first. If even one item does not hold, your documents are turned down whatever your score or offer. Five minutes now saves months.',
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
          ru: 'У вас есть нужный диплом или аттестат: для бакалавриата — аттестат о среднем образовании, для остального — высшее образование или степень бакалавра.',
          kk: 'Сізде қажетті диплом не аттестат бар: бакалавриатқа — орта білім аттестаты, қалғанына — жоғары білім не бакалавр дәрежесі.',
          en: 'You have the right diploma or certificate: a school certificate for the bachelor track, higher education or a bachelor degree for everything else.',
        },
        link: 'pp573',
      },
      {
        id: 'pension_age',
        text: {
          ru: 'Курсы, учёба и отработка вместе заканчиваются до пенсионного возраста. Считают на день подачи документов.',
          kk: 'Курс, оқу және өтеу бірге зейнеткерлік жасқа дейін аяқталады. Есеп құжат тапсырған күнге жүргізіледі.',
          en: 'Courses, study and work-back together finish before retirement age. It is counted as of the day you apply.',
        },
        link: 'pp573',
      },
      {
        id: 'no_debt',
        text: {
          ru: 'За вами нет незакрытой отработки и долгов перед Центром международных программ по прошлым программам.',
          kk: 'Өткен бағдарламалар бойынша жабылмаған өтеу де, Халықаралық бағдарламалар орталығы алдында берешек те жоқ.',
          en: 'You have no unfinished work-back and no debt to the Center for International Programs from earlier programmes.',
        },
        link: 'pp573',
      },
      {
        id: 'once',
        text: {
          ru: 'Вы знаете, что стипендию дают один раз на каждую степень и один раз на стажировку.',
          kk: 'Стипендия әр дәрежеге бір рет, тағылымдамаға бір рет берілетінін білесіз.',
          en: 'You know the scholarship is given once per degree and once for an internship.',
        },
        required: false,
        link: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Думать, что отработка — дело далёкого будущего. Её срок считают уже сейчас, при подаче.',
        kk: 'Өтеуді алыс болашақтың ісі деп ойлау. Оның мерзімін дәл қазір, тапсыру кезінде есептейді.',
        en: 'Treating the work-back as something far off. Its length is counted right now, when you apply.',
      },
      {
        ru: 'Подавать документы, не закрыв прошлую стипендию или стажировку. С такими долгами до конкурса не допускают.',
        kk: 'Өткен стипендия не тағылымдаманы жаппай тұрып құжат тапсыру. Мұндай берешекпен конкурсқа жібермейді.',
        en: 'Applying before closing a previous scholarship or internship. With that outstanding you are not admitted.',
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
      ru: 'От неё зависят стаж, GPA, язык, документы и даже порядок этапов.',
      kk: 'Одан өтіл, GPA, тіл, құжаттар және кезеңдер реті тәуелді.',
      en: 'It decides your experience, GPA, language, documents and even the order of stages.',
    },
    why: {
      ru: 'Болашак — это не один путь, а несколько. У льготных категорий сначала конкурс и языковые курсы, а вуз ищут уже после присуждения. У тех, кто поступает сам, всё наоборот. Ниже — требования только вашей категории.',
      kk: 'Болашақ — бір емес, бірнеше жол. Жеңілдікті санаттарда алдымен конкурс пен тіл курстары, ЖОО тағайындалғаннан кейін ізделеді. Өз бетінше түсетіндерде керісінше. Төменде — тек сіздің санатыңыздың талаптары.',
      en: 'Bolashak is not one path but several. Preferential categories go through the competition and language courses first and look for a university afterwards. If you get in on your own, it is the other way round. Below are the requirements for your category only.',
    },
    checklist: [
      {
        id: 'category_known',
        text: {
          ru: 'Вы поняли свою категорию и прочитали её требования — список ниже собран под ваш выбор.',
          kk: 'Санатыңызды түсініп, талаптарын оқыдыңыз — төмендегі тізім таңдауыңызға жиналған.',
          en: 'You have worked out your category and read its requirements — the list below is built from your answers.',
        },
        autoCompleteWhen: { always: true },
      },
      {
        id: 'gpa',
        text: {
          ru: 'Средний балл диплома — не ниже GPA 3.00 из 4.00/4.33 либо 4.00 из 5.00.',
          kk: 'Диплом орташа балы — 4.00/4.33-тен GPA 3.00 не 5.00-ден 4.00-ден төмен емес.',
          en: 'Your diploma GPA is at least 3.00 out of 4.00/4.33 or 4.00 out of 5.00.',
        },
        appliesTo: { category: [...PREFERENTIAL] },
        link: 'pravila',
      },
      {
        id: 'experience',
        text: {
          ru: 'Стаж вы подтверждаете справками с работы и выпиской о пенсионных отчислениях за нужный период.',
          kk: 'Өтілді жұмыстан алған анықтамамен және қажетті кезеңдегі зейнетақы аударымдары туралы үзінді көшірмемен растайсыз.',
          en: 'You prove your experience with employment papers and a pension-contribution statement for the required period.',
        },
        appliesTo: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        autoCompleteWhen: { meetsExperience: true },
        link: 'pravila',
      },
      {
        id: 'related',
        text: {
          ru: 'Специальность в дипломе подходит к выбранной — сверьтесь с перечнем родственных специальностей.',
          kk: 'Дипломдағы мамандық таңдағаныңызға келеді — туыстас мамандықтар тізбесімен салыстырыңыз.',
          en: 'Your diploma specialty fits the one you chose — check it against the related-specialties list.',
        },
        appliesTo: { category: [...PREFERENTIAL] },
        link: 'related2026',
      },
      {
        id: 'employer',
        text: {
          ru: 'Работодатель готов дать заявку на вашу учёбу и сохранить за вами место.',
          kk: 'Жұмыс беруші оқуыңызға өтінім беріп, орныңызды сақтауға дайын.',
          en: 'Your employer is ready to request your training and keep your job open.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'publications',
        text: {
          ru: 'У вас есть хотя бы одна статья или обзор в Web of Science или Scopus — либо статья в издании из Списка 1 или 2 Перечня. Её утверждает работодатель.',
          kk: 'Сізде Web of Science не Scopus-та кемінде бір мақала не шолу бар — не Тізбенің 1 не 2 тізіміндегі басылымда мақала. Оны жұмыс беруші бекітеді.',
          en: 'You have at least one article or review in Web of Science or Scopus — or an article in a List 1 or List 2 journal. Your employer approves it.',
        },
        appliesTo: { category: ['science_internship'] },
        link: 'ns_requirements',
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
          ru: 'У вас есть диплом I, II или III степени международной олимпиады или конкурса за последние 3 года, и он по вашей специальности.',
          kk: 'Сізде соңғы 3 жылда халықаралық олимпиада не конкурстың I, II не III дәрежелі дипломы бар және ол мамандығыңыз бойынша.',
          en: 'You have a 1st, 2nd or 3rd place diploma from an international olympiad or contest in the last 3 years, in your specialty.',
        },
        appliesTo: { category: ['bachelor'] },
        link: 'olympiads',
      },
    ],
    mistakes: [
      {
        ru: 'Путать «3 года общего стажа» и «12 месяцев подряд по своей специальности». Для стажировок нужно и то, и другое.',
        kk: '«3 жыл жалпы өтіл» мен «мамандық бойынша қатарынан 12 ай» дегенді шатастыру. Тағылымдамаға екеуі де керек.',
        en: 'Mixing up "3 years in total" and "12 months in a row in your field". Internships need both.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Смотрят на выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесіне қарайды, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. What matters is the pension-fund statement for the whole period, paid leave included.',
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
      ru: 'Перечень пересобирают каждый год под нужды экономики, и он же ограничивает число мест по направлениям. Отличная программа в сильном вузе не поможет, если вашей специальности в перечне этого года нет.',
      kk: 'Тізбені жыл сайын экономика қажеттілігіне қарай қайта жасайды, әрі ол бағыттар бойынша орын санын шектейді. Күшті ЖОО-дағы тамаша бағдарлама да көмектеспейді, егер мамандығыңыз осы жылғы тізбеде болмаса.',
      en: 'The list is rebuilt every year around what the economy needs, and it also caps the places per field. A great programme at a strong university will not help if your specialty is missing from this year\'s list.',
    },
    checklist: [
      {
        id: 'open_list',
        text: {
          ru: 'Открыли перечень приоритетных специальностей на текущий конкурсный год и нашли в нём своё направление.',
          kk: 'Ағымдағы конкурс жылының басым мамандықтар тізбесін ашып, бағытыңызды таптыңыз.',
          en: 'You opened this year\'s priority-specialty list and found your field in it.',
        },
        link: 'pps2026',
        appliesTo: { not: { track: ['internship', 'science_internship'] } },
      },
      {
        id: 'open_list_internship',
        text: {
          ru: 'Открыли перечень приоритетных специальностей для прохождения стажировок и нашли своё направление.',
          kk: 'Тағылымдамаға арналған басым мамандықтар тізбесін ашып, бағытыңызды таптыңыз.',
          en: 'You opened the priority-specialty list for internships and found your field.',
        },
        link: 'pps_internship2026',
        appliesTo: { track: ['internship'] },
      },
      {
        id: 'open_list_science',
        text: {
          ru: 'Открыли перечень приоритетных направлений научных исследований для научных стажировок и нашли своё направление.',
          kk: 'Ғылыми тағылымдамаға арналған басым ғылыми зерттеу бағыттарының тізбесін ашып, бағытыңызды таптыңыз.',
          en: 'You opened the priority research-areas list for scientific internships and found your area.',
        },
        link: 'ns_priorities',
        appliesTo: { track: ['science_internship'] },
      },
      {
        id: 'related_check',
        text: {
          ru: 'Сверили специальность в дипломе с перечнем родственных специальностей — выбранная программа должна ей подходить.',
          kk: 'Дипломдағы мамандықты туыстас мамандықтар тізбесімен салыстырдыңыз — таңдаған бағдарлама оған келуі керек.',
          en: 'You compared your diploma specialty with the related-specialties list — the programme you picked has to fit it.',
        },
        link: 'related2026',
        appliesTo: { category: [...PREFERENTIAL] },
      },
      {
        id: 'quota',
        text: {
          ru: 'Посмотрели, сколько мест выделили вашему направлению в этом году.',
          kk: 'Биыл бағытыңызға қанша орын бөлінгенін қарадыңыз.',
          en: 'You checked how many places your field got this year.',
        },
        required: false,
        link: 'distribution2026',
      },
    ],
    mistakes: [
      {
        ru: 'Смотреть перечень прошлого года. Списки специальностей и число мест меняются каждый год.',
        kk: 'Өткен жылғы тізбеге қарау. Мамандықтар тізімі мен орын саны жыл сайын өзгереді.',
        en: 'Looking at last year\'s list. Specialties and the number of places change every year.',
      },
      {
        ru: 'Смотреть только на название программы в вузе. Важно, попадает ли она в специальность из перечня и подходит ли к вашему диплому.',
        kk: 'Тек ЖОО бағдарламасының атауына қарау. Маңыздысы — ол тізбедегі мамандыққа кіре ме және дипломыңызға келе ме.',
        en: 'Going by the programme\'s name alone. What matters is whether it falls under a listed specialty and fits your diploma.',
      },
    ],
    sources: ['pps2026', 'pps_internship2026', 'related2026', 'ns_priorities', 'distribution2026'],
    estimateWeeks: [1, 2],
  },

  {
    id: 'university',
    chapter: 'prepare',
    icon: 'Landmark',
    kicker: { ru: 'Куда поедете', kk: 'Қайда барасыз', en: 'Where you will go' },
    title: { ru: 'Вуз или организация из Списка', kk: 'Тізімдегі ЖОО немесе ұйым', en: 'A university or organisation from the list' },
    summary: {
      ru: 'Подойдут только вузы и организации из официального списка на этот год.',
      kk: 'Тек осы жылғы ресми тізімдегі ЖОО мен ұйымдар жарайды.',
      en: 'Only universities and organisations from this year\'s official list will do.',
    },
    why: {
      ru: 'Список ведущих зарубежных вузов утверждают заново каждый год. Приглашение из вуза вне списка права на стипендию не даёт. Для стажировок организация тоже должна быть в своём списке — исключение только у научных стажировок, там рабочий орган может рассмотреть организацию отдельно.',
      kk: 'Жетекші шетелдік ЖОО тізімі жыл сайын қайта бекітіледі. Тізімнен тыс ЖОО шақыруы стипендияға құқық бермейді. Тағылымдамаға да ұйым өз тізімінде болуы керек — тек ғылыми тағылымдамада жұмыс органы ұйымды жеке қарай алады.',
      en: 'The list of leading foreign universities is re-approved every year. An offer from a university outside it gives no right to the scholarship. For internships the organisation must also be listed — the only exception is scientific internships, where the working body can review an organisation separately.',
    },
    checklist: [
      {
        id: 'in_list',
        text: {
          ru: 'Нашли выбранный вуз в списке ведущих зарубежных вузов на текущий год.',
          kk: 'Таңдалған ЖОО-ны ағымдағы жылғы жетекші шетелдік ЖОО тізімінен таптыңыз.',
          en: 'You found your university in this year\'s list of leading foreign universities.',
        },
        link: 'vuzy2026',
        appliesTo: { not: { track: ['science_internship'] } },
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
          ru: 'Разобрались в самой программе: что требуют от иностранцев, сколько длится обучение, когда начало и до какого числа принимают заявки.',
          kk: 'Бағдарламаның өзін түсіндіңіз: шетелдіктерден не талап етеді, оқу қанша уақыт, қашан басталады, өтінімді қай күнге дейін қабылдайды.',
          en: 'You looked into the programme itself: what it asks of international students, how long it runs, when it starts and by when applications close.',
        },
        link: 'admission_guide',
      },
      {
        id: 'rankings',
        text: {
          ru: 'Посмотрели предметные рейтинги вуза (QS, Times Higher Education, ARWU) — про это спрашивают на собеседовании.',
          kk: 'ЖОО-ның пәндік рейтингтерін қарадыңыз (QS, Times Higher Education, ARWU) — әңгімелесуде осы туралы сұрайды.',
          en: 'You looked at the university\'s subject rankings (QS, Times Higher Education, ARWU) — they come up at the interview.',
        },
        required: false,
        link: 'admission_guide',
      },
      {
        id: 'duration_internship',
        text: {
          ru: 'Срок стажировки не превышает 12 месяцев (для научной стажировки — от 3 до 12 месяцев).',
          kk: 'Тағылымдама мерзімі 12 айдан аспайды (ғылыми тағылымдама — 3-тен 12 айға дейін).',
          en: 'The internship lasts no more than 12 months (scientific internships: 3 to 12 months).',
        },
        appliesTo: { track: ['internship', 'science_internship'] },
        link: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Смотреть на общий рейтинг вуза вместо того, чтобы проверить его в списке на этот год.',
        kk: 'Осы жылғы тізімнен тексерудің орнына ЖОО жалпы рейтингіне қарау.',
        en: 'Going by overall ranking instead of checking the university against this year\'s list.',
      },
      {
        ru: 'Не посмотреть дедлайны вуза. В сильные программы заявки открываются почти за год до начала учёбы.',
        kk: 'ЖОО мерзімдерін қарамау. Күшті бағдарламаларға өтінім оқу басталуға бір жылдай қалғанда ашылады.',
        en: 'Not checking the university\'s deadlines. Strong programmes open applications almost a year before classes start.',
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
      ru: 'КАЗТЕСТ или Qazaq Resmi Test не ниже B1 — нужен всем без исключения.',
      kk: 'B1-ден төмен емес ҚАЗТЕСТ не Qazaq Resmi Test — бәріне керек.',
      en: 'KAZTEST or Qazaq Resmi Test at B1 or higher — everyone needs it.',
    },
    why: {
      ru: 'Это единственное языковое требование, одинаковое для всех — от бакалавриата до научной стажировки. Сертификат нужен сразу, вместе с документами, а не потом. Записывайтесь на экзамен заранее: дат немного.',
      kk: 'Бұл — бакалавриаттан ғылыми тағылымдамаға дейін бәріне бірдей жалғыз тілдік талап. Сертификат кейін емес, құжаттармен бірге бірден қажет. Емтиханға алдын ала жазылыңыз: күндер аз.',
      en: 'This is the one language requirement that is the same for everyone, from bachelor to scientific internship. The certificate goes in with your documents, not later. Book the exam early — there are few dates.',
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
          ru: 'Проверили, что в сертификате Qazaq Resmi Test стоит ваш ID-номер и есть QR-код — по нему подлинность сверяют на qrt.kz.',
          kk: 'Qazaq Resmi Test сертификатында ID нөміріңіз бар екенін және QR-код тұрғанын тексердіңіз — түпнұсқалығын qrt.kz-те сол арқылы тексереді.',
          en: 'You checked that your Qazaq Resmi Test certificate carries your ID number and a QR code — authenticity is verified through it at qrt.kz.',
        },
        required: false,
        link: 'qrt',
      },
    ],
    mistakes: [
      {
        ru: 'Оставлять КАЗТЕСТ на последние дни приёма. Дат экзамена немного, а без сертификата пакет неполный.',
        kk: 'ҚАЗТЕСТ-ті қабылдаудың соңғы күндеріне қалдыру. Емтихан күндері аз, ал сертификатсыз топтама толық емес.',
        en: 'Leaving KAZTEST until the last days of the intake. There are few exam dates, and without the certificate your package is incomplete.',
      },
      {
        ru: 'Принести просроченный сертификат. На день подачи он должен быть действующим.',
        kk: 'Мерзімі өткен сертификат әкелу. Тапсыру күні ол жарамды болуы керек.',
        en: 'Bringing an expired certificate. It has to be valid on the day you apply.',
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
      ru: 'Три пороговых уровня приказа № 318. От них зависит, поедете вы сразу учиться или сначала на языковые курсы.',
      kk: '№ 318 бұйрықтың үш шекті деңгейі. Бірден оқуға барасыз ба, әлде алдымен тіл курсына ба — соған байланысты.',
      en: 'Order No. 318 sets three threshold levels. They decide whether you go straight to study or to language courses first.',
    },
    why: {
      ru: 'Порог зависит от вашей категории. Льготным категориям магистратуры для участия хватит первого порога — язык добирают на курсах за счёт стипендии. Тем, кто поступает сам, и стажёрам нужен сразу третий.',
      kk: 'Шек санатыңызға байланысты. Магистратураның жеңілдікті санаттарына қатысу үшін бірінші шек жетеді — тілді курста стипендия есебінен толықтырады. Өз бетінше түсетіндер мен тағылымдамашыларға бірден үшінші керек.',
      en: 'The threshold depends on your category. Preferential master\'s categories need only level I to enter — the language is topped up on funded courses. If you get in on your own, or you are an intern, you need level III straight away.',
    },
    checklist: [
      {
        id: 'know_threshold',
        text: {
          ru: 'Знаете, какой порог нужен вашей категории — он в таблице ниже.',
          kk: 'Санатыңызға қандай шек керегін білесіз — ол төмендегі кестеде.',
          en: 'You know which threshold your category needs — it is in the table below.',
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
      },
      {
        id: 'meets',
        text: {
          ru: 'Результат достигает нужного порога для вашей категории.',
          kk: 'Нәтиже санатыңызға қажетті шекке жетеді.',
          en: 'Your score reaches the threshold required for your category.',
        },
        autoCompleteWhen: { foreignMeets: true },
        link: 'prikaz318',
      },
      {
        id: 'validity',
        text: {
          ru: 'Проверили, когда истекает сертификат: IELTS и TOEFL действуют 2 года.',
          kk: 'Сертификат қашан аяқталатынын тексердіңіз: IELTS пен TOEFL 2 жыл жарамды.',
          en: 'You checked when the certificate expires: IELTS and TOEFL are valid for 2 years.',
        },
        required: false,
        link: 'admission_guide',
      },
      {
        id: 'uni_requirement',
        text: {
          ru: 'Сверили балл с требованием самого вуза — оно бывает выше, чем у стипендии.',
          kk: 'Балды ЖОО-ның өз талабымен салыстырдыңыз — ол стипендия талабынан жоғары болуы мүмкін.',
          en: 'You compared your score with the university\'s own requirement — it is often higher than the scholarship\'s.',
        },
        required: false,
        link: 'admission_guide',
      },
    ],
    notes: [
      {
        appliesTo: { category: ['master_self', 'phd_self', 'residency'] },
        tone: 'info',
        text: {
          ru: 'Если вы поступаете сами, сертификат иностранного языка в список документов на портале не входит: язык за вас подтверждает вуз своим безусловным приглашением. Но в таблице приказа № 318 для этой категории стоит третий порог — IELTS 6.0 или эквивалент. Так что сертификат лучше иметь под рукой.',
          kk: 'Өз бетінше түссеңіз, шет тілі сертификаты порталдағы құжаттар тізіміне кірмейді: тілді сіздің орныңызға ЖОО сөзсіз шақыруымен растайды. Бірақ № 318 бұйрық кестесінде бұл санатқа үшінші шек — IELTS 6.0 не баламасы — көрсетілген. Сондықтан сертификат қолда болғаны жөн.',
          en: 'If you get in on your own, the foreign-language certificate is not on the portal\'s document list: the university vouches for your language with its unconditional offer. But Order No. 318 still puts this category at level III — IELTS 6.0 or equivalent. Keep the certificate at hand.',
        },
        source: 'prikaz318',
      },
      {
        appliesTo: { category: ['science_internship'] },
        tone: 'info',
        text: {
          ru: 'Для научных стажировок минимальные баллы рабочий орган утверждает отдельным файлом — он лежит на странице требований. Сверяйтесь с ним, а не с общей таблицей.',
          kk: 'Ғылыми тағылымдамаға ең төменгі балдарды жұмыс органы жеке файлмен бекітеді — ол талаптар бетінде тұр. Жалпы кестемен емес, сонымен салыстырыңыз.',
          en: 'For scientific internships the working body approves the minimum scores in a separate file on the requirements page. Check that one, not the general table.',
        },
        source: 'ns_minscore',
      },
    ],
    mistakes: [
      {
        ru: 'Сдать General IELTS вместо Academic. Для поступления нужен именно академический модуль.',
        kk: 'Academic орнына General IELTS тапсыру. Оқуға түсуге дәл академиялық модуль керек.',
        en: 'Taking General IELTS instead of Academic. Admission needs the academic module.',
      },
      {
        ru: 'Смотреть только на общий балл. У вузов обычно есть минимум по каждой секции.',
        kk: 'Тек жалпы балға қарау. ЖОО-ларда әдетте әр секция бойынша минимум болады.',
        en: 'Looking only at the overall score. Universities usually set a minimum for each section too.',
      },
      {
        ru: 'Не учесть особые случаи. Например, на медицинские направления в Германии нужен DSH-3, а всем, кто поступает в немецкие вузы, предстоит собеседование с DAAD за свой счёт.',
        kk: 'Ерекше жағдайларды ескермеу. Мысалы, Германиядағы медицина бағыттарына DSH-3 керек, ал неміс ЖОО-ларына түсетіндердің бәрі DAAD-пен әңгімелесуден өз есебінен өтеді.',
        en: 'Missing the special cases. German medical programmes need DSH-3, and anyone applying to a German university sits a DAAD interview at their own expense.',
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
    summary: {
      ru: 'Без безусловного приглашения документы на конкурс не примут.',
      kk: 'Сөзсіз шақырусыз құжаттарды конкурсқа қабылдамайды.',
      en: 'Without an unconditional offer your documents will not be accepted.',
    },
    why: {
      ru: 'Приглашение должно быть безусловным — без учебных условий вроде «доучите язык» или «донесите транскрипт». Условие про оплату оставить можно: её берёт на себя стипендия. В письме должны быть ваши данные, специальность, сроки и стоимость обучения.',
      kk: 'Шақыру сөзсіз болуы керек — «тілді жетілдіріңіз» не «транскрипт әкеліңіз» деген оқу шарттарынсыз. Төлем туралы шартты қалдыруға болады: оны стипендия төлейді. Хатта деректеріңіз, мамандық, мерзім және оқу құны болуы тиіс.',
      en: 'The offer has to be unconditional — no study conditions like "improve your language" or "send a transcript". A condition about payment is fine: the scholarship covers it. The letter must show your details, specialty, dates and the cost of study.',
    },
    checklist: [
      {
        id: 'season',
        text: {
          ru: 'Выбрали, когда начинать: осенью (сентябрь–декабрь) или весной (январь–июнь), и подстроились под сроки вуза.',
          kk: 'Қашан бастайтыныңызды таңдадыңыз: күзде (қыркүйек–желтоқсан) не көктемде (қаңтар–маусым), және ЖОО мерзіміне бейімделдіңіз.',
          en: 'You chose when to start — autumn (September–December) or spring (January–June) — and fitted the university\'s deadlines.',
        },
        link: 'admission_guide',
      },
      {
        id: 'apply_uni',
        text: {
          ru: 'Подали заявки в вузы. Стипендия оплачивает оформление и подачу не более 5 анкет.',
          kk: 'ЖОО-ларға өтінім бердіңіз. Стипендия 5-тен аспайтын анкетаны рәсімдеу мен беруді төлейді.',
          en: 'You applied to universities. The scholarship pays for preparing and filing up to 5 applications.',
        },
        link: 'pp573',
      },
      {
        id: 'offer',
        text: {
          ru: 'Получили безусловное приглашение (unconditional offer) — без академических условий.',
          kk: 'Сөзсіз шақыру (unconditional offer) алдыңыз — академиялық шарттарсыз.',
          en: 'You received an unconditional offer — with no academic conditions.',
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
          ru: 'Составили программу стажировки, её утвердили обе стороны — и ваша организация, и принимающая. Перевод заверили у нотариуса.',
          kk: 'Тағылымдама бағдарламасын жасадыңыз, оны екі тарап та — өз ұйымыңыз да, қабылдаушы да — бекітті. Аударманы нотариуста куәландырдыңыз.',
          en: 'You drew up the internship programme and both sides approved it — your organisation and the host. The translation is notarised.',
        },
        appliesTo: { track: ['internship'] },
        link: 'internship_program',
      },
      {
        id: 'programme_science',
        text: {
          ru: 'Составили программу научной стажировки по требованиям рабочего органа: её утверждает работодатель, а согласовывает зарубежная организация.',
          kk: 'Жұмыс органының талаптарына сай ғылыми тағылымдама бағдарламасын жасадыңыз: оны жұмыс беруші бекітеді, шетелдік ұйым келіседі.',
          en: 'You drew up the scientific internship programme to the working body\'s requirements: your employer approves it and the host organisation agrees it.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_program',
      },
      {
        id: 'free_tuition',
        text: {
          ru: 'Если вуз или другая организация учит вас бесплатно — приложили документы о том, что расходы покрыты на весь срок обучения.',
          kk: 'ЖОО не басқа ұйым сізді тегін оқытса — шығыстардың бүкіл оқу мерзіміне жабылғаны туралы құжаттарды қостыңыз.',
          en: 'If a university or another organisation covers your studies, you attached proof that the costs are covered for the whole period.',
        },
        required: false,
        link: 'pravila',
      },
    ],
    notes: [
      {
        appliesTo: { category: [...PREFERENTIAL] },
        tone: 'warn',
        text: {
          ru: 'Вашей категории приглашение при подаче не нужно: вуз подбирают уже после того, как стипендию присудили и вы прошли языковые курсы. Этап оставлен, чтобы знать, что вас ждёт — вернётесь к нему в главе «После присуждения».',
          kk: 'Сіздің санатыңызға тапсыру кезінде шақыру керек емес: ЖОО стипендия тағайындалып, тіл курстарынан өткеннен кейін таңдалады. Кезең не күтіп тұрғанын білу үшін қалдырылған — оған «Тағайындалғаннан кейін» тарауында ораласыз.',
          en: 'Your category does not need an offer when applying: the university is picked after the award and the language courses. The stage is here so you know what is coming — you will return to it in the "After the award" chapter.',
        },
        source: 'pravila',
      },
    ],
    mistakes: [
      {
        ru: 'Принимать conditional offer за безусловный: условия вроде «доучить язык» или «донести транскрипт» делают приглашение непригодным для конкурса.',
        kk: 'Conditional offer-ді сөзсіз деп қабылдау: «тілді жетілдіру» сияқты шарттар шақыруды конкурсқа жарамсыз етеді.',
        en: 'Treating a conditional offer as unconditional: conditions like "improve your language" make it unusable for the competition.',
      },
      {
        ru: 'Забыть про нотариальный перевод и подать письмо только на английском.',
        kk: 'Нотариалды аударманы ұмытып, хатты тек ағылшынша тапсыру.',
        en: 'Forgetting the notarised translation and submitting the letter in English only.',
      },
      {
        ru: 'Не указать в приглашении стоимость обучения — без неё документ не проходит проверку.',
        kk: 'Шақыруда оқу құнын көрсетпеу — онсыз құжат тексеруден өтпейді.',
        en: 'Omitting the tuition cost from the offer — the document then fails the check.',
      },
    ],
    sources: ['pravila', 'pp573', 'admission_guide', 'internship_program', 'ns_program'],
    estimateWeeks: [8, 24],
    appliesTo: { category: [...SELF_ADMITTED] },
    autoCompleteWhen: { invitation: ['unconditional'] },
  },
]
