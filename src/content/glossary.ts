import type { L, SourceId } from './types'

/**
 * Words a first-timer meets on every page and nobody explains. Plain definitions, no
 * figures — the numbers live on the stages, each with its own source.
 */
export interface GlossaryTerm {
  id: string
  term: L
  text: L
  source: SourceId
}

export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'bolashak',
    term: { ru: '«Болашак»', kk: '«Болашақ»', en: 'Bolashak' },
    text: {
      ru: 'Международная стипендия Казахстана. Государство оплачивает учёбу или стажировку за рубежом, а стипендиат после возвращения работает в Казахстане — это условие договора.',
      kk: 'Қазақстанның халықаралық стипендиясы. Мемлекет шетелдегі оқуды не тағылымдаманы төлейді, ал стипендиат оралған соң Қазақстанда жұмыс істейді — бұл шарттың талабы.',
      en: 'Kazakhstan’s international scholarship. The state pays for study or an internship abroad; afterwards the scholar comes back and works in Kazakhstan — a condition of the contract.',
    },
    source: 'pp573',
  },
  {
    id: 'center',
    term: { ru: 'Центр международных программ', kk: 'Халықаралық бағдарламалар орталығы', en: 'Center for International Programs' },
    text: {
      ru: 'Администратор стипендии: принимает документы, проводит конкурс, заключает договор и сопровождает стипендиатов.',
      kk: 'Стипендия әкімшісі: құжат қабылдайды, конкурс өткізеді, шарт жасайды және стипендиаттарды сүйемелдейді.',
      en: 'The scholarship administrator: takes the documents, runs the contest, signs the contract and supports scholars.',
    },
    source: 'contacts',
  },
  {
    id: 'list',
    term: { ru: 'Список вузов', kk: 'ЖОО тізімі', en: 'The university list' },
    text: {
      ru: 'Официальный перечень ведущих зарубежных вузов, куда можно поступать по стипендии. Обновляется каждый год — проверяйте свой вуз в актуальном списке.',
      kk: 'Стипендия бойынша түсуге болатын жетекші шетелдік ЖОО-лардың ресми тізбесі. Жыл сайын жаңарады — өз ЖОО-ңызды өзекті тізімнен тексеріңіз.',
      en: 'The official list of leading foreign universities you can study at on the scholarship. It changes every year — check your university in the current list.',
    },
    source: 'vuzy_page',
  },
  {
    id: 'category',
    term: { ru: 'Категория подачи', kk: 'Тапсыру санаты', en: 'Application category' },
    text: {
      ru: 'Группа, по которой вы подаёте: например, «поступил сам» или одна из льготных категорий (жители сёл, инженеры, медики, госслужащие, атомная отрасль). От категории зависят требования, документы и порядок этапов.',
      kk: 'Сіз тапсыратын топ: мысалы, «өзі түскен» немесе жеңілдікті санаттардың бірі (ауыл тұрғындары, инженерлер, медиктер, мемқызметшілер, атом саласы). Талаптар, құжаттар және кезеңдер реті санатқа байланысты.',
      en: 'The group you apply under: for example “admitted on my own” or one of the priority categories (rural residents, engineers, medics, civil servants, nuclear industry). It decides the requirements, documents and order of stages.',
    },
    source: 'pp573',
  },
  {
    id: 'offer',
    term: { ru: 'Безусловное приглашение', kk: 'Шартсыз шақыру', en: 'Unconditional offer' },
    text: {
      ru: 'Письмо из вуза или принимающей организации без учебных условий вроде «досдайте язык». Условие об оплате допустимо — её берёт на себя стипендия.',
      kk: 'ЖОО-дан не қабылдаушы ұйымнан «тілді тапсырыңыз» сияқты оқу шарттарынсыз хат. Төлем туралы шарт рұқсат — оны стипендия өтейді.',
      en: 'A letter from the university or host with no academic conditions such as “improve your language”. A condition about payment is fine — the scholarship covers it.',
    },
    source: 'pravila',
  },
  {
    id: 'threshold',
    term: { ru: 'Порог иностранного языка', kk: 'Шет тілі шегі', en: 'Language threshold' },
    text: {
      ru: 'Минимальный балл по сертификату (IELTS, TOEFL и другим), который утверждает приказ № 318. Уровней несколько; какой нужен, зависит от категории.',
      kk: '№ 318 бұйрық бекітетін сертификат бойынша ең төменгі балл (IELTS, TOEFL және т.б.). Деңгейлері бірнешеу; қайсысы керек — санатқа байланысты.',
      en: 'The minimum certificate score (IELTS, TOEFL and others) set by Order No. 318. There are several levels; which one applies depends on the category.',
    },
    source: 'prikaz318',
  },
  {
    id: 'kazakh',
    term: { ru: 'КАЗТЕСТ и Qazaq Resmi Test', kk: 'ҚАЗТЕСТ және Qazaq Resmi Test', en: 'KAZTEST and Qazaq Resmi Test' },
    text: {
      ru: 'Экзамены на знание казахского языка. Сертификат одного из них нужного уровня входит в пакет документов.',
      kk: 'Қазақ тілін білуге арналған емтихандар. Солардың біреуінің қажетті деңгейдегі сертификаты құжаттар пакетіне кіреді.',
      en: 'Kazakh language exams. A certificate from one of them at the required level is part of the document package.',
    },
    source: 'kaztest',
  },
  {
    id: 'commission',
    term: { ru: 'Республиканская комиссия', kk: 'Республикалық комиссия', en: 'Republican Commission' },
    text: {
      ru: 'Комиссия, которая по итогам конкурса решает, кому присудить стипендию. С даты её решения начинают отсчитываться сроки на договор.',
      kk: 'Конкурс қорытындысы бойынша стипендияны кімге беретінін шешетін комиссия. Шартқа берілетін мерзім оның шешімі күнінен басталады.',
      en: 'The commission that decides, after the contest, who is awarded the scholarship. The contract deadline counts from the date of its decision.',
    },
    source: 'pp573',
  },
  {
    id: 'contract',
    term: { ru: 'Договор и его обеспечение', kk: 'Шарт және оны қамтамасыз ету', en: 'Contract and its security' },
    text: {
      ru: 'После присуждения стипендиат подписывает договор с Центром. Обязательства обеспечивают залогом имущества или гарантией — так государство уверено, что деньги вернутся, если условия не выполнят.',
      kk: 'Стипендия берілгеннен кейін стипендиат Орталықпен шарт жасайды. Міндеттемелер мүлік кепілімен не кепілдікпен қамтамасыз етіледі.',
      en: 'After the award the scholar signs a contract with the Center. The obligations are secured by a pledge of property or a guarantee, so the money comes back if the terms are broken.',
    },
    source: 'dogovory',
  },
  {
    id: 'workback',
    term: { ru: 'Отработка', kk: 'Өтеу жұмысы', en: 'Work-back' },
    text: {
      ru: 'Обязательная работа в Казахстане после возвращения. Срок и место зависят от программы и категории — их называет этап «Отработка» в вашем плане.',
      kk: 'Оралғаннан кейін Қазақстанда міндетті жұмыс. Мерзімі мен орны бағдарлама мен санатқа байланысты — оларды жоспарыңыздағы «Өтеу жұмысы» кезеңі көрсетеді.',
      en: 'Required work in Kazakhstan after you return. How long and where depends on the programme and category — the “Work-back” stage of your plan says.',
    },
    source: 'otrabotka',
  },
]
