import type { L, SourceId } from './types'

/**
 * Words a first-timer meets on every page and nobody explains. Plain definitions, no
 * figures – the numbers live on the stages, each with its own source.
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
      ru: 'Международная стипендия Казахстана. Государство оплачивает обучение или стажировку за рубежом; после возвращения стипендиат по договору работает в Казахстане.',
      kk: 'Қазақстанның халықаралық стипендиясы. Мемлекет шетелдегі оқуды не тағылымдаманы төлейді; оралған соң стипендиат шарт бойынша Қазақстанда жұмыс істейді.',
      en: 'Kazakhstan’s international scholarship. The state pays for study or an internship abroad; on return the scholar works in Kazakhstan under the contract.',
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
      ru: 'Официальный список ведущих зарубежных вузов для обучения по стипендии. Утверждается каждый год.',
      kk: 'Стипендия бойынша оқуға арналған жетекші шетелдік ЖОО-лардың ресми тізімі. Жыл сайын бекітіледі.',
      en: 'The official list of leading foreign universities for study on the scholarship. Approved every year.',
    },
    source: 'vuzy_page',
  },
  {
    id: 'category',
    term: { ru: 'Категория подачи', kk: 'Тапсыру санаты', en: 'Application category' },
    text: {
      ru: 'Группа, по которой вы участвуете: например, самостоятельно поступившие или одна из льготных категорий (из села, ИТР, медики, госслужащие, работники атомной отрасли). От неё зависят требования, документы и порядок этапов.',
      kk: 'Сіз қатысатын топ: мысалы, өз бетінше түскендер немесе жеңілдікті санаттардың бірі (ауылдан, ИТҚ, медиктер, мемқызметшілер, атом саласы қызметкерлері). Талаптар, құжаттар және кезеңдер реті соған байланысты.',
      en: 'The group you apply under: for example self-admitted applicants or one of the preferential categories (rural, engineering, medical, civil-service, nuclear-industry). It decides the requirements, documents and order of stages.',
    },
    source: 'pp573',
  },
  {
    id: 'offer',
    term: { ru: 'Безусловное приглашение', kk: 'Шартсыз шақыру', en: 'Unconditional offer' },
    text: {
      ru: 'Письмо вуза или принимающей организации без учебных условий вроде «досдайте язык». Условие об оплате допустимо: её берёт на себя стипендия.',
      kk: 'ЖОО-дан не қабылдаушы ұйымнан «тілді тапсырыңыз» сияқты оқу шарттарынсыз хат. Төлем туралы шарт рұқсат – оны стипендия өтейді.',
      en: 'A letter from the university or host with no academic conditions such as “improve your language”. A condition about payment is fine – the scholarship covers it.',
    },
    source: 'pravila',
  },
  {
    id: 'threshold',
    term: { ru: 'Порог иностранного языка', kk: 'Шет тілі шегі', en: 'Language threshold' },
    text: {
      ru: 'Минимальный балл сертификата (IELTS, TOEFL и др.) по приказу № 318. Какой из уровней нужен, зависит от категории.',
      kk: '№ 318 бұйрық бойынша сертификаттың ең төменгі балы (IELTS, TOEFL және т.б.). Қай деңгей керегі санатқа байланысты.',
      en: 'The minimum certificate score (IELTS, TOEFL and others) under Order No. 318. Which level applies depends on the category.',
    },
    source: 'prikaz318',
  },
  {
    id: 'kazakh',
    term: { ru: 'КАЗТЕСТ и Qazaq Resmi Test', kk: 'ҚАЗТЕСТ және Qazaq Resmi Test', en: 'KAZTEST and Qazaq Resmi Test' },
    text: {
      ru: 'Экзамены по казахскому языку. Сертификат одного из них нужного уровня входит в пакет документов.',
      kk: 'Қазақ тілін білуге арналған емтихандар. Солардың біреуінің қажетті деңгейдегі сертификаты құжаттар пакетіне кіреді.',
      en: 'Kazakh language exams. A certificate from one of them at the required level is part of the document package.',
    },
    source: 'kaztest',
  },
  {
    id: 'commission',
    term: { ru: 'Республиканская комиссия', kk: 'Республикалық комиссия', en: 'Republican Commission' },
    text: {
      ru: 'Решает по итогам конкурса, кому присудить стипендию. Со дня её решения отсчитывается срок на заключение договора.',
      kk: 'Конкурс қорытындысы бойынша стипендияны кімге тағайындауды шешеді. Шарт жасау мерзімі оның шешімі күнінен басталады.',
      en: 'Decides after the competition who is awarded the scholarship. The contract deadline counts from the day of its decision.',
    },
    source: 'pp573',
  },
  {
    id: 'contract',
    term: { ru: 'Договор и его обеспечение', kk: 'Шарт және оны қамтамасыз ету', en: 'Contract and its security' },
    text: {
      ru: 'После присуждения стипендиат заключает договор с Центром. Исполнение обязательств обеспечивается залогом имущества или гарантией.',
      kk: 'Тағайындалғаннан кейін стипендиат Орталықпен шарт жасайды. Міндеттемелердің орындалуы мүлік кепілімен не кепілдікпен қамтамасыз етіледі.',
      en: 'After the award the scholar signs a contract with the Center. The obligations are secured by a pledge of property or a guarantee.',
    },
    source: 'dogovory',
  },
  {
    id: 'workback',
    term: { ru: 'Отработка', kk: 'Өтеу жұмысы', en: 'Work-back' },
    text: {
      ru: 'Обязательная работа в Казахстане после возвращения. Срок и место зависят от программы и категории – см. этап «Отработка» в вашем плане.',
      kk: 'Оралғаннан кейін Қазақстанда міндетті жұмыс. Мерзімі мен орны бағдарлама мен санатқа байланысты – жоспарыңыздағы «Өтеу жұмысы» кезеңін қараңыз.',
      en: 'Required work in Kazakhstan after you return. How long and where depends on the programme and category – see the “Work-back” stage of your plan.',
    },
    source: 'otrabotka',
  },
]
