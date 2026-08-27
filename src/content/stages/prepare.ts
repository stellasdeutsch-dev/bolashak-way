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
      ru: 'Гражданство, образование, отсутствие долгов и запас времени до пенсионного возраста.',
      kk: 'Азаматтық, білім, берешектің болмауы және зейнеткерлік жасқа дейінгі уақыт қоры.',
      en: 'Citizenship, education, no outstanding debts and enough time before retirement age.',
    },
    why: {
      ru: 'Эти условия проверяются до всего остального: если хотя бы одно не выполняется, документы не примут независимо от баллов и приглашения. Пять минут самопроверки экономят месяцы.',
      kk: 'Бұл шарттар бәрінен бұрын тексеріледі: біреуі орындалмаса, балдар мен шақыруға қарамастан құжаттар қабылданбайды. Бес минуттық өзін-өзі тексеру айларды үнемдейді.',
      en: 'These conditions are checked before anything else: if even one fails, documents are rejected regardless of scores or invitations. Five minutes of self-check saves months.',
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
          ru: 'У вас есть документ об образовании нужного уровня: аттестат о среднем образовании — для бакалавриата, высшее образование или степень бакалавра — для остальных программ.',
          kk: 'Сізде қажетті деңгейдегі білім туралы құжат бар: бакалавриат үшін — орта білім аттестаты, қалған бағдарламалар үшін — жоғары білім не бакалавр дәрежесі.',
          en: 'You hold the right education document: a secondary-school certificate for the bachelor track, higher education or a bachelor degree for the rest.',
        },
        link: 'pp573',
      },
      {
        id: 'pension_age',
        text: {
          ru: 'Совокупные сроки языковых курсов, обучения или стажировки и последующей отработки укладываются в общеустановленный пенсионный возраст на момент подачи документов.',
          kk: 'Тіл курстары, оқу не тағылымдама және кейінгі өтеу мерзімдерінің жиынтығы құжат тапсыру кезіндегі зейнеткерлік жасқа сыяды.',
          en: 'Your language courses, study or internship and the subsequent work-back all fit within the statutory retirement age as of the application date.',
        },
        link: 'pp573',
      },
      {
        id: 'no_debt',
        text: {
          ru: 'У вас нет невыполненных обязательств по отработке и задолженности перед администратором стипендии по ранее полученным программам.',
          kk: 'Бұрынғы бағдарламалар бойынша өтеу міндеттемелері мен әкімші алдындағы берешегіңіз жоқ.',
          en: 'You have no outstanding work-back obligations or debts to the scholarship administrator from earlier programmes.',
        },
        link: 'pp573',
      },
      {
        id: 'once',
        text: {
          ru: 'Вы понимаете, что стипендия присуждается однократно на каждую степень и на стажировку.',
          kk: 'Стипендия әр дәрежеге және тағылымдамаға бір рет берілетінін түсінесіз.',
          en: 'You understand that the scholarship is awarded once per degree and once for an internship.',
        },
        required: false,
        link: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Считать, что «отработка начнётся когда-нибудь потом»: её срок входит в расчёт пенсионного возраста уже на этапе подачи.',
        kk: '«Өтеу кейін басталады» деп ойлау: оның мерзімі құжат тапсыру кезінде зейнеткерлік жас есебіне кіреді.',
        en: 'Assuming the work-back "starts some day later": its duration is counted against retirement age already at application time.',
      },
      {
        ru: 'Подавать документы при незакрытых обязательствах по прошлой стипендии или стажировке — такие претенденты к конкурсу не допускаются.',
        kk: 'Өткен стипендия немесе тағылымдама бойынша міндеттемелер жабылмай құжат тапсыру — мұндай үміткерлер конкурсқа жіберілмейді.',
        en: 'Applying while obligations from a previous scholarship or internship remain open — such applicants are not admitted to the competition.',
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
      ru: 'От категории зависят стаж, GPA, язык, документы и даже порядок этапов.',
      kk: 'Өтіл, GPA, тіл, құжаттар және кезеңдер реті санатқа байланысты.',
      en: 'Experience, GPA, language, documents and even the order of stages depend on your category.',
    },
    why: {
      ru: 'Болашак — это не одна процедура, а несколько параллельных: у льготных категорий сначала конкурс и языковые курсы, а вуз ищут после присуждения; у самостоятельно поступивших наоборот. Проверьте требования именно своей категории — они ниже.',
      kk: 'Болашақ — бір емес, бірнеше қатар рәсім: жеңілдікті санаттарда алдымен конкурс пен тіл курстары, ЖОО тағайындалғаннан кейін ізделеді; өз бетінше түскендерде керісінше.',
      en: 'Bolashak is not one procedure but several parallel ones: preferential categories first pass the competition and language courses and only then find a university; self-admitted applicants do the opposite.',
    },
    checklist: [
      {
        id: 'category_known',
        text: {
          ru: 'Вы определили свою категорию и прочитали её требования (список ниже составлен под ваш выбор).',
          kk: 'Санатыңызды анықтап, оның талаптарын оқыдыңыз (төмендегі тізім таңдауыңызға сай).',
          en: 'You identified your category and read its requirements (the list below matches your choice).',
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
          ru: 'Стаж подтверждается документами о трудовой деятельности и выпиской о пенсионных отчислениях за требуемый период.',
          kk: 'Өтіл еңбек қызметі құжаттарымен және талап етілетін кезеңдегі зейнетақы аударымдары туралы үзінді көшірмемен расталады.',
          en: 'Your experience is confirmed by employment documents and a pension-contribution statement for the required period.',
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
          ru: 'Работодатель готов дать заявку на подготовку специалиста с сохранением места работы.',
          kk: 'Жұмыс беруші жұмыс орнын сақтай отырып маман даярлауға өтінім беруге дайын.',
          en: 'Your employer is ready to issue a request to train you while keeping your job.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'publications',
        text: {
          ru: 'Есть минимум одна статья или обзор в Web of Science / Scopus либо статья в издании из Списка 1 или 2 Перечня, утверждённая работодателем.',
          kk: 'Web of Science / Scopus-та кемінде бір мақала не шолу, не Тізбенің 1 не 2 тізіміндегі басылымдағы мақала бар, жұмыс беруші бекіткен.',
          en: 'You have at least one Web of Science / Scopus article or review, or an article in a List 1 / List 2 journal, approved by your employer.',
        },
        appliesTo: { category: ['science_internship'] },
        link: 'ns_requirements',
      },
      {
        id: 'accreditation',
        text: {
          ru: 'У вашей научной организации есть действующее свидетельство об аккредитации субъекта научной деятельности.',
          kk: 'Ғылыми ұйымыңызда ғылыми қызмет субъектісінің қолданыстағы аккредиттеу куәлігі бар.',
          en: 'Your research organisation holds a valid accreditation certificate as a research entity.',
        },
        appliesTo: { category: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'olympiad',
        text: {
          ru: 'Есть диплом I, II или III степени международной олимпиады или конкурса за последние 3 года, и специальность совпадает с предметом олимпиады.',
          kk: 'Соңғы 3 жылдағы халықаралық олимпиада не конкурстың I, II, III дәрежелі дипломы бар және мамандық олимпиада пәніне сәйкес.',
          en: 'You hold a 1st, 2nd or 3rd degree diploma from an international olympiad or competition in the last 3 years, matching your specialty.',
        },
        appliesTo: { category: ['bachelor'] },
        link: 'olympiads',
      },
    ],
    mistakes: [
      {
        ru: 'Путать «общий стаж 3 года» и «непрерывно последние 12 месяцев в выбранной области» — для стажировок нужны оба условия одновременно.',
        kk: '«Жалпы өтіл 3 жыл» мен «таңдалған салада үздіксіз соңғы 12 ай» шарттарын шатастыру — тағылымдамаға екеуі де қажет.',
        en: 'Confusing "3 years total" with "12 continuous months in the chosen field" — internships require both at once.',
      },
      {
        ru: 'Считать стаж без пенсионных отчислений: подтверждением служит выписка из ЕНПФ за весь требуемый период, включая оплачиваемый трудовой отпуск.',
        kk: 'Зейнетақы аударымдарынсыз өтілді есептеу: растау — БЖЗҚ үзінді көшірмесі, ақылы еңбек демалысын қоса.',
        en: 'Counting experience without pension contributions: the proof is a pension-fund statement for the whole required period, paid leave included.',
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
      ru: 'Стипендия присуждается только по специальностям из утверждённого перечня на конкурсный год.',
      kk: 'Стипендия конкурс жылына бекітілген тізбедегі мамандықтар бойынша ғана беріледі.',
      en: 'The scholarship is awarded only for specialties from the list approved for the competition year.',
    },
    why: {
      ru: 'Перечень приоритетных специальностей формируется каждый год под потребность экономики и ограничивает количество стипендий по направлениям. Программа мечты в отличном вузе не даст ничего, если специальности нет в перечне текущего года.',
      kk: 'Басым мамандықтар тізбесі жыл сайын экономика қажеттілігіне сай жасалады және бағыттар бойынша стипендия санын шектейді. Тізбеде жоқ мамандық ештеңе бермейді.',
      en: 'The priority-specialty list is rebuilt yearly around the economy\'s needs and caps the number of scholarships per field. A dream programme is useless if its specialty is not on this year\'s list.',
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
          ru: 'Сверили специальность диплома с перечнем родственных специальностей — выбранная программа должна ей соответствовать.',
          kk: 'Диплом мамандығын туыстас мамандықтар тізбесімен салыстырдыңыз — таңдалған бағдарлама сәйкес болуы керек.',
          en: 'You checked your diploma specialty against the related-specialties list — the chosen programme must match it.',
        },
        link: 'related2026',
        appliesTo: { category: [...PREFERENTIAL] },
      },
      {
        id: 'quota',
        text: {
          ru: 'Посмотрели распределение стипендий на год: сколько мест выделено на ваше направление.',
          kk: 'Жылдық стипендия бөлінісін қарадыңыз: бағытыңызға қанша орын бөлінген.',
          en: 'You reviewed this year\'s scholarship distribution: how many places your field receives.',
        },
        required: false,
        link: 'distribution2026',
      },
    ],
    mistakes: [
      {
        ru: 'Брать перечень прошлого года: списки специальностей и лимиты по направлениям меняются ежегодно.',
        kk: 'Өткен жылғы тізбені алу: мамандықтар тізімі мен бағыттар бойынша шектеулер жыл сайын өзгереді.',
        en: 'Using last year\'s list: specialty lists and per-field caps change every year.',
      },
      {
        ru: 'Проверять только название программы в вузе, а не её соответствие специальности из перечня и родственным специальностям диплома.',
        kk: 'Тек ЖОО бағдарламасының атауын тексеру, оның тізбедегі мамандыққа сәйкестігін тексермеу.',
        en: 'Checking only the university programme title instead of its match to the listed specialty and your diploma\'s related specialties.',
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
      ru: 'Подходят только вузы и организации из официального списка на текущий год.',
      kk: 'Тек ағымдағы жылғы ресми тізімдегі ЖОО мен ұйымдар жарайды.',
      en: 'Only universities and organisations from the official list for the current year qualify.',
    },
    why: {
      ru: 'Список ведущих зарубежных вузов утверждается рабочим органом и обновляется ежегодно. Приглашение из вуза вне списка не даёт права на стипендию, а для стажировок организация должна входить в соответствующий список (для научных стажировок возможно индивидуальное решение рабочего органа).',
      kk: 'Жетекші шетелдік ЖОО тізімі жұмыс органымен бекітіліп, жыл сайын жаңарады. Тізімнен тыс ЖОО шақыруы стипендияға құқық бермейді.',
      en: 'The list of leading foreign universities is approved by the working body and updated annually. An offer from an unlisted university gives no right to the scholarship.',
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
          ru: 'Изучили саму программу: требования к иностранным абитуриентам, длительность, даты начала и дедлайны подачи.',
          kk: 'Бағдарламаны зерттедіңіз: шетелдік талапкерлерге қойылатын талаптар, ұзақтығы, басталу күні және тапсыру мерзімі.',
          en: 'You studied the programme itself: requirements for international applicants, duration, start dates and application deadlines.',
        },
        link: 'admission_guide',
      },
      {
        id: 'rankings',
        text: {
          ru: 'Посмотрели предметные рейтинги вуза (QS, Times Higher Education, ARWU) — это пригодится на собеседовании.',
          kk: 'ЖОО-ның пәндік рейтингтерін қарадыңыз (QS, THE, ARWU) — бұл әңгімелесуде керек болады.',
          en: 'You checked the university\'s subject rankings (QS, THE, ARWU) — useful at the interview.',
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
        ru: 'Ориентироваться на общий рейтинг вуза, а не на его наличие в утверждённом списке текущего года.',
        kk: 'Бекітілген тізімдегі болуына емес, ЖОО жалпы рейтингіне қарау.',
        en: 'Going by the university\'s overall ranking instead of its presence in the approved list for the year.',
      },
      {
        ru: 'Не проверить дедлайны вуза: в топовые программы подача открывается почти за год до начала обучения.',
        kk: 'ЖОО мерзімдерін тексермеу: үздік бағдарламаларға өтініш оқу басталуға бір жыл қалғанда ашылады.',
        en: 'Ignoring university deadlines: top programmes open applications nearly a year before the start date.',
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
      ru: 'КАЗТЕСТ или Qazaq Resmi Test с результатом не ниже B1 — обязателен для всех категорий.',
      kk: 'B1 деңгейінен төмен емес ҚАЗТЕСТ немесе Qazaq Resmi Test — барлық санаттар үшін міндетті.',
      en: 'KAZTEST or Qazaq Resmi Test at level B1 or above — mandatory for every category.',
    },
    why: {
      ru: 'Это единственное языковое требование, одинаковое для всех: от бакалавриата до научной стажировки. Сертификат нужен уже в пакете документов, а не позже, поэтому запишитесь на экзамен заранее.',
      kk: 'Бұл — бакалавриаттан ғылыми тағылымдамаға дейін бәріне бірдей жалғыз тілдік талап. Сертификат құжаттар топтамасында бірден қажет.',
      en: 'This is the one language requirement identical for everyone, from bachelor to scientific internship. The certificate is needed in the document package itself, so book the exam early.',
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
          kk: 'Qazaq Resmi Test сертификатында ID нөміріңіз және qrt.kz-те тексеруге QR-код бар екенін тексердіңіз.',
          en: 'You verified that your Qazaq Resmi Test certificate shows your ID number and a QR code for authenticity checks at qrt.kz.',
        },
        required: false,
        link: 'qrt',
      },
    ],
    mistakes: [
      {
        ru: 'Откладывать КАЗТЕСТ на последние дни приёма документов: даты экзамена ограничены, а без сертификата пакет неполный.',
        kk: 'ҚАЗТЕСТ-ті құжат қабылдаудың соңғы күндеріне қалдыру: емтихан күндері шектеулі, сертификатсыз топтама толық емес.',
        en: 'Leaving KAZTEST to the last days of the intake: exam dates are limited and the package is incomplete without the certificate.',
      },
      {
        ru: 'Принести сертификат с истёкшим сроком действия — он должен быть действительным на момент подачи.',
        kk: 'Мерзімі өткен сертификат әкелу — ол тапсыру кезінде жарамды болуы керек.',
        en: 'Bringing an expired certificate — it must be valid at the moment of application.',
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
      ru: 'Три пороговых уровня приказа № 318: от них зависит, поедете вы сразу учиться или сначала на языковые курсы.',
      kk: '№ 318 бұйрықтың үш шекті деңгейі: бірден оқуға бару не алдымен тіл курстарына бару соған байланысты.',
      en: 'Three threshold levels of Order No. 318 decide whether you go straight to study or to language courses first.',
    },
    why: {
      ru: 'Порог зависит от категории. Льготным категориям магистратуры хватает первого порога для участия — недостающий язык добирается на курсах за счёт стипендии. Самостоятельно поступившим и стажёрам нужен сразу третий пороговый уровень.',
      kk: 'Шек санатқа байланысты. Магистратураның жеңілдікті санаттарына қатысу үшін бірінші шек жеткілікті — тіл курстарда толықтырылады. Өз бетінше түскендер мен тағылымдамашыларға бірден үшінші деңгей керек.',
      en: 'The threshold depends on your category. Preferential master\'s categories only need level I to compete — the rest is covered by funded language courses. Self-admitted applicants and interns need level III right away.',
    },
    checklist: [
      {
        id: 'know_threshold',
        text: {
          ru: 'Знаете, какой пороговый уровень требуется вашей категории (таблица ниже).',
          kk: 'Санатыңызға қандай шекті деңгей қажет екенін білесіз (төмендегі кесте).',
          en: 'You know which threshold level your category needs (table below).',
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
          ru: 'Проверили срок действия сертификата: IELTS и TOEFL действуют 2 года.',
          kk: 'Сертификат мерзімін тексердіңіз: IELTS пен TOEFL 2 жыл жарамды.',
          en: 'You checked the certificate validity: IELTS and TOEFL last 2 years.',
        },
        required: false,
        link: 'admission_guide',
      },
      {
        id: 'uni_requirement',
        text: {
          ru: 'Сверили балл с требованием самого вуза — оно может быть выше требований стипендии.',
          kk: 'Балды ЖОО талабымен салыстырдыңыз — ол стипендия талабынан жоғары болуы мүмкін.',
          en: 'You compared the score with the university\'s own requirement — it may be higher than the scholarship\'s.',
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
          ru: 'Для самостоятельно поступивших сертификат иностранного языка не входит в перечень документов на портале — язык подтверждает вуз своим безусловным приглашением. При этом в таблице приказа № 318 для этой категории указан третий пороговый уровень (IELTS 6.0 или эквивалент), поэтому держите сертификат наготове.',
          kk: 'Өз бетінше түскендер үшін шет тілі сертификаты порталдағы құжаттар тізбесіне кірмейді — тілді ЖОО өзінің сөзсіз шақыруымен растайды. Дегенмен № 318 бұйрық кестесінде осы санатқа үшінші шекті деңгей көрсетілген.',
          en: 'For self-admitted applicants the foreign-language certificate is not in the portal document list — the university confirms the language with its unconditional offer. Order No. 318 still lists a level-III threshold for this category, so keep the certificate at hand.',
        },
        source: 'prikaz318',
      },
      {
        appliesTo: { category: ['science_internship'] },
        tone: 'info',
        text: {
          ru: 'Для научных стажировок минимальные баллы утверждает рабочий орган отдельным файлом, он опубликован на странице требований. Сверяйтесь именно с ним.',
          kk: 'Ғылыми тағылымдама үшін ең төменгі балдарды жұмыс органы жеке файлмен бекітеді, ол талаптар бетінде жарияланған.',
          en: 'For scientific internships the minimum scores are approved by the working body in a separate file published on the requirements page. Check that file.',
        },
        source: 'ns_minscore',
      },
    ],
    mistakes: [
      {
        ru: 'Сдавать General IELTS вместо Academic: для поступления в вуз нужен академический модуль.',
        kk: 'Academic орнына General IELTS тапсыру: ЖОО-ға түсу үшін академиялық модуль қажет.',
        en: 'Taking General IELTS instead of Academic: university admission requires the academic module.',
      },
      {
        ru: 'Смотреть только общий балл: у вузов часто есть минимум по каждой секции.',
        kk: 'Тек жалпы балға қарау: ЖОО-ларда әр секция бойынша минимум болады.',
        en: 'Looking only at the overall score: universities often set a minimum per section.',
      },
      {
        ru: 'Не учитывать особые случаи: например, по медицинским направлениям в Германии требуется DSH-3, а претенденты в вузы Германии проходят собеседование с DAAD за свой счёт.',
        kk: 'Ерекше жағдайларды ескермеу: мысалы, Германиядағы медицина бағыттарына DSH-3 қажет.',
        en: 'Ignoring special cases: German medical programmes require DSH-3, and applicants to German universities attend a DAAD interview at their own expense.',
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
      ru: 'Без безусловного приглашения документы на конкурс не принимаются.',
      kk: 'Сөзсіз шақырусыз конкурсқа құжаттар қабылданбайды.',
      en: 'Without an unconditional offer your application is not accepted.',
    },
    why: {
      ru: 'Приглашение должно быть безусловным — то есть без академических условий (доучить язык, донести документы). Оговорка допускается только по финансовым условиям, ведь оплату берёт на себя стипендия. В письме должны быть ваши данные, специальность, сроки и стоимость обучения.',
      kk: 'Шақыру сөзсіз болуы керек — академиялық шарттарсыз. Ескертпе тек қаржылық шарттар бойынша рұқсат етіледі. Хатта деректеріңіз, мамандық, мерзім және оқу құны болуы тиіс.',
      en: 'The offer must be unconditional — no academic conditions. Only financial conditions may remain, since the scholarship pays. The letter must state your details, specialty, study period and cost.',
    },
    checklist: [
      {
        id: 'season',
        text: {
          ru: 'Выбрали семестр поступления: осенний (сентябрь–декабрь) или весенний (январь–июнь), и подстроились под дедлайны вуза.',
          kk: 'Түсу семестрін таңдадыңыз: күзгі (қыркүйек–желтоқсан) не көктемгі (қаңтар–маусым) және ЖОО мерзімдеріне бейімделдіңіз.',
          en: 'You picked your intake — autumn (Sept–Dec) or spring (Jan–June) — and aligned with the university deadlines.',
        },
        link: 'admission_guide',
      },
      {
        id: 'apply_uni',
        text: {
          ru: 'Подали аппликационные формы в вузы. По стипендии оплачивается оформление и подача не более 5 анкетных форм.',
          kk: 'ЖОО-ларға өтінім нысандарын тапсырдыңыз. Стипендия бойынша 5-тен аспайтын нысанды рәсімдеу төленеді.',
          en: 'You submitted university applications. The scholarship covers preparing and filing up to 5 application forms.',
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
          ru: 'Сделали нотариально заверенный перевод приглашения на казахский или русский язык.',
          kk: 'Шақырудың қазақ не орыс тіліне нотариалды куәландырылған аудармасын жасадыңыз.',
          en: 'You had the offer notarially translated into Kazakh or Russian.',
        },
        link: 'pravila',
      },
      {
        id: 'programme_internship',
        text: {
          ru: 'Составили программу стажировки, утверждённую направляющей и принимающей организациями, с нотариальным переводом.',
          kk: 'Жіберуші және қабылдаушы ұйымдар бекіткен тағылымдама бағдарламасын нотариалды аудармасымен дайындадыңыз.',
          en: 'You prepared the internship programme approved by both sending and host organisations, with a notarised translation.',
        },
        appliesTo: { track: ['internship'] },
        link: 'internship_program',
      },
      {
        id: 'programme_science',
        text: {
          ru: 'Составили программу научной стажировки по требованиям рабочего органа: утверждает работодатель, согласует зарубежная организация.',
          kk: 'Жұмыс органының талаптарына сай ғылыми тағылымдама бағдарламасын дайындадыңыз: жұмыс беруші бекітеді, шетелдік ұйым келіседі.',
          en: 'You prepared the scientific internship programme per the working body\'s requirements: approved by your employer and agreed with the host organisation.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_program',
      },
      {
        id: 'free_tuition',
        text: {
          ru: 'Если обучение бесплатное от вуза или другой организации — приложили документы о полном покрытии расходов на весь период обучения.',
          kk: 'Оқу ЖОО не басқа ұйым тарапынан тегін болса — бүкіл кезеңге шығыстардың толық жабылуы туралы құжаттарды қостыңыз.',
          en: 'If your studies are free of charge, you attached documents proving full cost coverage for the whole period.',
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
          ru: 'Для вашей категории приглашение на этапе подачи не требуется: вуз подбирается после присуждения стипендии и языковых курсов. Этап оставлен для ознакомления — вернётесь к нему в главе «После присуждения».',
          kk: 'Сіздің санатыңызға тапсыру кезінде шақыру талап етілмейді: ЖОО стипендия тағайындалып, тіл курстарынан кейін таңдалады.',
          en: 'Your category does not need an offer at application time: the university is chosen after the award and language courses. This stage is here for reference — you will return to it later.',
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
