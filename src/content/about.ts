import type { L, SourceId } from './types'

/**
 * The "how this works" page: the whole programme explained in plain language for
 * someone who has never heard of it. Every figure carries the source it came from.
 */
export interface AboutBlock {
  /** Short label above the block, e.g. "01". */
  num: string
  title: L
  body: L
  /** Optional short list under the body. */
  points?: L[]
  sources?: SourceId[]
}

export const ABOUT_INTRO: L = {
  ru: 'Болашак — государственная стипендия: Казахстан оплачивает вам учёбу или стажировку за границей, а вы после возвращения несколько лет работаете дома по полученной специальности. Ниже — весь путь в одном тексте, без юридических формулировок.',
  kk: 'Болашақ — мемлекеттік стипендия: Қазақстан шетелдегі оқуыңызды не тағылымдамаңызды төлейді, ал сіз оралғаннан кейін бірнеше жыл елде өз мамандығыңыз бойынша жұмыс істейсіз. Төменде — бүкіл жол бір мәтінде, заң тіліңсіз.',
  en: 'Bolashak is a state scholarship: Kazakhstan pays for your studies or internship abroad, and after you come back you work at home in that field for several years. Below is the whole path in one text, without the legal wording.',
}

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    num: '01',
    title: { ru: 'Что оплачивает стипендия', kk: 'Стипендия нені төлейді', en: 'What the scholarship pays for' },
    body: {
      ru: 'Не только само обучение. Государство берёт на себя дорогу, визу, проживание, питание, учебники, медстраховку и обязательное медобследование, а при необходимости — языковые курсы и подачу заявок в вузы.',
      kk: 'Тек оқудың өзін емес. Мемлекет жол, виза, тұру, тамақ, оқулық, медсақтандыру мен міндетті медтексеруді өзіне алады, қажет болса — тіл курстары мен ЖОО-ға өтінім беруді де.',
      en: 'Not just tuition. The state covers travel, the visa, accommodation, food, books, medical insurance and the mandatory health check — and, if needed, language courses and university applications.',
    },
    points: [
      {
        ru: 'Оформление и подача не более 5 заявок в зарубежные вузы.',
        kk: 'Шетелдік ЖОО-ға 5-тен аспайтын өтінімді рәсімдеу және беру.',
        en: 'Preparing and filing up to 5 applications to foreign universities.',
      },
      {
        ru: 'Проезд туда и обратно, а при учёбе дольше года — ещё и к началу каждого учебного года.',
        kk: 'Барып-қайту жолы, ал оқу бір жылдан ұзақ болса — әр оқу жылының басына да.',
        en: 'Travel there and back, and for programmes over a year, to the start of each academic year too.',
      },
      {
        ru: 'Ежемесячные деньги на проживание, питание и учебную литературу — суммы утверждены отдельно по странам.',
        kk: 'Тұру, тамақ және оқу әдебиетіне ай сайынғы қаражат — сомалар елдер бойынша бөлек бекітілген.',
        en: 'A monthly allowance for living, food and study materials — the amounts are set per country.',
      },
    ],
    sources: ['pp573', 'finance'],
  },
  {
    num: '02',
    title: { ru: 'Что вы обязаны взамен', kk: 'Сіз орнына не міндеттісіз', en: 'What you owe in return' },
    body: {
      ru: 'Вернуться в Казахстан и отработать. Сколько именно — зависит от вашей категории и от того, где вы будете работать. Пока обязательства не закрыты, залог или гарантия остаются в силе.',
      kk: 'Қазақстанға оралып, өтеу. Қанша — санатыңызға және қай жерде жұмыс істейтініңізге байланысты. Міндеттеме жабылмайынша кепіл не кепілдік күшінде қалады.',
      en: 'Come back to Kazakhstan and work it off. How long depends on your category and where you work. Until the obligation is closed, the pledge or guarantee stays in force.',
    },
    points: [
      {
        ru: '5 лет в Астане, Алматы или Шымкенте — либо 3 года в регионах, если вы учились на степень.',
        kk: 'Астанада, Алматыда не Шымкентте 5 жыл — не өңірлерде 3 жыл, дәрежеге оқысаңыз.',
        en: '5 years in Astana, Almaty or Shymkent — or 3 years in the regions, if you studied for a degree.',
      },
      {
        ru: '3 года на госслужбе для госслужащих, причём первый год — в том же органе, который вас направил.',
        kk: 'Мемлекеттік қызметшілерге мемлекеттік қызметте 3 жыл, оның бірінші жылы — жіберген органда.',
        en: '3 years in public service for civil servants, the first of them at the body that sent you.',
      },
      {
        ru: '3 года у своего работодателя — для стажировок и научных стажировок.',
        kk: 'Тағылымдама мен ғылыми тағылымдамаға — өз жұмыс берушіңізде 3 жыл.',
        en: '3 years with your own employer — for internships and scientific internships.',
      },
      {
        ru: 'Год снимают, если весь период вас учили бесплатно, а успеваемость по договору вы держали.',
        kk: 'Бүкіл кезеңде тегін оқысаңыз және шарттағы үлгерімді ұстасаңыз, бір жыл алынады.',
        en: 'One year comes off if your whole programme was free and you kept the grades your contract required.',
      },
    ],
    sources: ['pp573', 'pp791'],
  },
  {
    num: '03',
    title: { ru: 'Кто может подать', kk: 'Кім тапсыра алады', en: 'Who can apply' },
    body: {
      ru: 'Гражданин Казахстана с нужным уровнем образования, без долгов и незакрытых обязательств по прошлым программам. Отдельного возрастного потолка нет, но есть условие: курсы, учёба и отработка вместе должны уложиться до пенсионного возраста — и считают это уже на день подачи.',
      kk: 'Қажетті білім деңгейі бар, өткен бағдарламалар бойынша берешегі мен жабылмаған міндеттемесі жоқ Қазақстан азаматы. Жеке жас шегі жоқ, бірақ шарт бар: курс, оқу және өтеу бірге зейнеткерлік жасқа дейін сыюы керек — оны тапсыру күні есептейді.',
      en: 'A citizen of Kazakhstan with the right level of education, no debts and no unfinished obligations from earlier programmes. There is no separate age cap, but courses, study and work-back together must fit before retirement age — counted as of the day you apply.',
    },
    points: [
      {
        ru: 'Категорий много: бакалавриат для олимпиадников, магистратура (самостоятельно или по льготной категории), докторантура, резидентура, стажировки и отдельно — научные стажировки для учёных.',
        kk: 'Санат көп: олимпиадашыларға бакалавриат, магистратура (өз бетінше не жеңілдікті санат бойынша), докторантура, резидентура, тағылымдама және бөлек — ғалымдарға ғылыми тағылымдама.',
        en: 'There are many categories: bachelor for olympiad winners, master (on your own or under a preferential category), doctoral, residency, internships — and separately, scientific internships for researchers.',
      },
      {
        ru: 'От категории зависит всё: требования к стажу и GPA, список документов и даже порядок этапов.',
        kk: 'Санаттан бәрі тәуелді: өтіл мен GPA талаптары, құжаттар тізімі, тіпті кезеңдер реті де.',
        en: 'Your category decides everything: experience and GPA requirements, the document list, even the order of the stages.',
      },
    ],
    sources: ['pp573', 'pravila'],
  },
  {
    num: '04',
    title: { ru: 'Как устроен путь', kk: 'Жол қалай құрылған', en: 'How the path is laid out' },
    body: {
      ru: 'Пять глав. Сначала вы проверяете, подходите ли вообще, и собираете основу: специальность, вуз, языки. Потом собираете документы и подаёте. Дальше три тура конкурса. Если выиграли — договор и подготовка к выезду. И наконец учёба, возвращение и отработка.',
      kk: 'Бес тарау. Алдымен жарайсыз ба, соны тексеріп, негізді жинайсыз: мамандық, ЖОО, тілдер. Содан кейін құжат жинап, тапсырасыз. Әрі қарай конкурстың үш туры. Жеңсеңіз — шарт және шығуға дайындық. Соңында оқу, оралу және өтеу.',
      en: 'Five chapters. First you check whether you qualify at all and put the basics in place: specialty, university, languages. Then you gather documents and apply. Next come three rounds of the competition. If you win — the contract and getting ready to leave. Finally, study, return and work-back.',
    },
    points: [
      {
        ru: 'Порядок не у всех одинаковый. Если вы поступаете сами — приглашение от вуза нужно уже при подаче. Если идёте по льготной категории — сначала конкурс и языковые курсы, а вуз ищете после присуждения.',
        kk: 'Рет бәрінде бірдей емес. Өз бетінше түссеңіз — шақыру тапсыру кезінде керек. Жеңілдікті санат бойынша барсаңыз — алдымен конкурс пен тіл курстары, ЖОО-ны тағайындалғаннан кейін іздейсіз.',
        en: 'The order is not the same for everyone. If you get in on your own, you need the offer when you apply. Under a preferential category, the competition and language courses come first, and you look for a university after the award.',
      },
    ],
    sources: ['pp573'],
  },
  {
    num: '05',
    title: { ru: 'Как подавать', kk: 'Қалай тапсыру керек', en: 'How to apply' },
    body: {
      ru: 'Документы подают через портал электронного правительства egov.kz. Исключение — научные стажировки: там пакет несут лично в Центр международных программ в Астане. Сроки приёма объявляют каждый год и публикуют не позднее чем за 10 календарных дней до начала.',
      kk: 'Құжаттарды egov.kz электрондық үкімет порталы арқылы тапсырады. Ерекшелік — ғылыми тағылымдама: онда топтаманы Астанадағы Халықаралық бағдарламалар орталығына өзі апарады. Қабылдау мерзімін жыл сайын жариялап, басталуға 10 күнтізбелік күн қалғанда хабарлайды.',
      en: 'Documents go through the e-government portal egov.kz. The exception is scientific internships: there you bring the package to the Center for International Programs in Astana yourself. Intake dates are announced each year, at least 10 calendar days before they open.',
    },
    points: [
      {
        ru: 'Неполный пакет можно донести — но только пока приём ещё идёт.',
        kk: 'Толық емес топтаманы толықтыруға болады — бірақ қабылдау жүріп жатқанда ғана.',
        en: 'An incomplete package can be topped up — but only while the intake is still open.',
      },
      {
        ru: 'За недостоверные документы исключают из конкурса и не допускают к нему в текущем году.',
        kk: 'Жалған құжат үшін конкурстан шығарады және ағымдағы жылы жібермейді.',
        en: 'False documents get you excluded from the competition and barred from it for the current year.',
      },
    ],
    sources: ['pp573', 'egov_bolashak', 'ns_documents'],
  },
  {
    num: '06',
    title: { ru: 'Как проходит конкурс', kk: 'Конкурс қалай өтеді', en: 'How the competition runs' },
    body: {
      ru: 'Три тура. Первый — комплексное тестирование: числовой и вербальный тесты плюс личностный опросник. Не набрали пороговый балл — второго тура не будет, пересдачи не предусмотрены. Второй тур — анонимное собеседование с экспертной комиссией. Третий — заседание Республиканской комиссии, которая и присуждает стипендию.',
      kk: 'Үш тур. Бірінші — кешенді тестілеу: сандық және вербалды тест, тұлғалық сауалнама. Шекті балды жинамасаңыз — екінші тур болмайды, қайта тапсыру көзделмеген. Екінші тур — сараптама комиссиясымен анонимді әңгімелесу. Үшінші — стипендияны тағайындайтын Республикалық комиссия отырысы.',
      en: 'Three rounds. First, aptitude testing: numerical and verbal tests plus a personality questionnaire. Miss the cut-off and there is no second round, and no retakes. Second, an anonymous interview with the expert commission. Third, the Republican Commission meeting, which awards the scholarship.',
    },
    points: [
      {
        ru: 'О месте и времени первых двух туров сообщают не позднее чем за 10 календарных дней (для научных стажировок — за 5).',
        kk: 'Алғашқы екі тур орны мен уақытын 10 күнтізбелік күннен кешіктірмей хабарлайды (ғылыми тағылымдамада — 5).',
        en: 'You are told the time and place of the first two rounds at least 10 calendar days ahead (5 for scientific internships).',
      },
      {
        ru: 'Решение публикуют на официальном сайте в течение 3 рабочих дней. Персонального письма не будет.',
        kk: 'Шешімді 3 жұмыс күні ішінде ресми сайтта жариялайды. Жеке хат келмейді.',
        en: 'The decision is published on the official site within 3 working days. There will be no personal letter.',
      },
    ],
    sources: ['pp573', 'pravila'],
  },
  {
    num: '07',
    title: { ru: 'Что будет после победы', kk: 'Жеңгеннен кейін не болады', en: 'What happens after you win' },
    body: {
      ru: 'Самый жёсткий срок всей процедуры: 90 календарных дней на договор — и на обеспечение обязательств, то есть залог недвижимости или гарантию. Для научной стажировки срок короче: 60 дней. Не успели — рабочий орган начинает процедуру лишения стипендии.',
      kk: 'Бүкіл рәсімдегі ең қатаң мерзім: шартқа және міндеттемені қамтамасыз етуге, яғни кепілге не кепілдікке — 90 күнтізбелік күн. Ғылыми тағылымдамаға мерзім қысқа: 60 күн. Үлгермесеңіз — жұмыс органы стипендиядан айыру рәсімін бастайды.',
      en: 'The tightest deadline in the whole process: 90 calendar days for the contract and the security — a property pledge or a guarantee. For a scientific internship it is shorter: 60 days. Miss it and the working body starts withdrawing the scholarship.',
    },
    points: [
      {
        ru: 'Договор залога подписывают только в Астане, поэтому поездку планируйте заранее.',
        kk: 'Кепіл шартына тек Астанада қол қояды, сондықтан сапарды алдын ала жоспарлаңыз.',
        en: 'The pledge agreement is signed only in Astana, so plan the trip in advance.',
      },
      {
        ru: 'Дальше — письмо о финансовой гарантии, визовые документы от вуза, виза, банковская карта и авиабилет. Порядок именно такой.',
        kk: 'Әрі қарай — қаржылық кепілдік хаты, ЖОО-дан виза құжаттары, виза, банк картасы және авиабилет. Рет дәл осылай.',
        en: 'Then: the financial guarantee letter, visa papers from the university, the visa, a bank card and the ticket. In that order.',
      },
    ],
    sources: ['pp573', 'pp791', 'stipendiat_master'],
  },
  {
    num: '08',
    title: { ru: 'Сколько времени это занимает', kk: 'Бұл қанша уақыт алады', en: 'How long it takes' },
    body: {
      ru: 'От первой проверки до подачи документов обычно уходит от нескольких месяцев до года — дольше всего готовят язык и поступление в вуз. Сам конкурс с тремя турами занимает ещё несколько месяцев. Приложение считает для вас ориентировочный остаток, но это наша оценка, а не официальный срок.',
      kk: 'Алғашқы тексеруден құжат тапсыруға дейін әдетте бірнеше айдан бір жылға дейін кетеді — ең ұзағы тіл мен ЖОО-ға түсу. Үш турлы конкурстың өзі тағы бірнеше ай алады. Қолданба сізге болжамды қалдықты санайды, бірақ бұл — біздің бағамыз, ресми мерзім емес.',
      en: 'From the first check to submitting documents usually takes a few months to a year — language and university admission take the longest. The three-round competition adds a few more months. The app estimates what is left for you, but that is our estimate, not an official term.',
    },
  },
  {
    num: '09',
    title: { ru: 'Чего это приложение не делает', kk: 'Бұл қолданба не істемейді', en: 'What this app does not do' },
    body: {
      ru: 'Оно не подаёт документы за вас, не связано с Центром международных программ и не принимает решений. Это справочник: он собирает официальные требования в понятный порядок и помогает не потерять шаг. Все цифры здесь взяты из документов, ссылки на которые стоят рядом, а на каждом этапе можно раскрыть дословную цитату.',
      kk: 'Ол сіздің орныңызға құжат тапсырмайды, Халықаралық бағдарламалар орталығына қатысы жоқ және шешім қабылдамайды. Бұл — анықтамалық: ресми талаптарды түсінікті ретке жинап, қадамды жоғалтпауға көмектеседі. Мұндағы барлық сан құжаттардан алынған, сілтемелері қасында тұр, ал әр кезеңде дәйексөзді ашуға болады.',
      en: 'It does not file anything for you, has no connection to the Center for International Programs and makes no decisions. It is a reference: it puts the official requirements in a clear order and helps you not lose your place. Every figure here comes from a document, the links sit next to it, and on each stage you can open the exact quote.',
    },
    points: [
      {
        ru: 'Требования меняются каждый конкурсный год. Перед подачей сверяйтесь с bolashak.gov.kz и личным кабинетом.',
        kk: 'Талаптар жыл сайын өзгереді. Тапсырар алдында bolashak.gov.kz және жеке кабинетпен салыстырыңыз.',
        en: 'The requirements change every competition year. Before applying, check bolashak.gov.kz and your account.',
      },
    ],
    sources: ['pravila', 'cabinet'],
  },
]
