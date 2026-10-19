import type { PlatformHome, StagePatches } from '../types'
import { ACADEMIC_COVERAGE, ACADEMIC_WORKBACK_MISTAKES, FREE_TUITION_NOTE } from './shared'

/**
 * Bachelor's platform. One category, three conditions (ПП 573 п. 9-1): an international
 * olympiad or contest diploma from the last three years in the subject you will study,
 * unconditional admission to a listed university, and Kazakh at B1. No experience, no GPA,
 * no foreign-language certificate in the package.
 */

export const BACHELOR_STAGES: StagePatches = {
  eligibility: {
    checklist: {
      education: {
        ru: 'У вас есть документ об общем среднем, техническом и профессиональном или послесреднем образовании.',
        kk: 'Сізде жалпы орта, техникалық және кәсіптік не орта білімнен кейінгі білім туралы құжат бар.',
        en: 'You hold a general secondary, technical-vocational or post-secondary education document.',
      },
      pension_age: {
        ru: 'Учёба и отработка вместе укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Оқу мен өтеу бірге зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Study and the work-back together fit before retirement age. It is counted as of the day you apply.',
      },
      once: {
        ru: 'Вы знаете, что стипендию на бакалавриат дают один раз. Повторно — только если прошлую не использовали, к учёбе не приступили и долгов нет.',
        kk: 'Бакалавриатқа стипендия бір рет берілетінін білесіз. Қайта — тек бұрынғысын пайдаланбаған, оқуға кіріспеген және берешек болмаса.',
        en: "You know the bachelor's scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.",
      },
    },
  },

  category: {
    kicker: { ru: 'Кто может подать', kk: 'Кім тапсыра алады', en: 'Who can apply' },
    title: { ru: 'Три условия бакалавриата', kk: 'Бакалавриаттың үш шарты', en: "The three bachelor's conditions" },
    summary: {
      ru: 'Диплом международной олимпиады или конкурса за 3 года, безусловное зачисление и казахский на B1.',
      kk: 'Соңғы 3 жылдағы халықаралық олимпиада не конкурс дипломы, сөзсіз қабылдану және B1 деңгейлі қазақ тілі.',
      en: 'An international olympiad or contest diploma from the last 3 years, unconditional admission and Kazakh at B1.',
    },
    why: {
      ru: 'У бакалавриата одна категория и три условия. Диплом I, II или III степени за последние 3 года — международной олимпиады по общеобразовательному предмету, международного конкурса научных проектов или конкурса исполнителей, из перечня Республиканской комиссии, и специальность должна совпадать с предметом. Безусловное зачисление в вуз из Списка. Казахский язык на B1. Стажа, GPA и сертификата по иностранному языку правила не требуют.',
      kk: 'Бакалавриатта бір санат және үш шарт бар. Соңғы 3 жылдағы I, II не III дәрежелі диплом — Республикалық комиссия тізбесіндегі жалпы білім беретін пән бойынша халықаралық олимпиаданың, халықаралық ғылыми жобалар конкурсының не орындаушылар конкурсының дипломы, әрі мамандық пәнге сай болуы керек. Тізімдегі ЖОО-ға сөзсіз қабылдану. B1 деңгейлі қазақ тілі. Өтіл, GPA және шет тілі сертификатын қағида талап етпейді.',
      en: "The bachelor's track has one category and three conditions. A 1st, 2nd or 3rd place diploma from the last 3 years — from an international school-subject olympiad, an international research-project contest or a performers competition on the Republican Commission's list — and your specialty has to match its subject. Unconditional admission to a listed university. Kazakh at B1. The rules ask for no work experience, no GPA and no foreign-language certificate.",
    },
    inShort: {
      what: { ru: 'Проверка трёх условий бакалавриата — до того, как тратить время на документы.', kk: 'Бакалавриаттың үш шартын тексеру — құжатқа уақыт жұмсамас бұрын.', en: "A check of the three bachelor's conditions — before you spend time on paperwork." },
      you: { ru: 'Убедиться, что диплом олимпиады получен не раньше чем 3 года назад, что олимпиада есть в перечне и что специальность совпадает с её предметом.', kk: 'Олимпиада дипломы 3 жылдан бұрын алынбағанына, олимпиада тізбеде барына және мамандық оның пәніне сай екеніне көз жеткізу.', en: 'Make sure the olympiad diploma is no older than 3 years, the olympiad is on the list and your specialty matches its subject.' },
      result: { ru: 'Понимание, проходите ли вы по всем трём условиям.', kk: 'Үш шарттың бәріне сай келетініңізді түсіну.', en: 'You know whether you meet all three conditions.' },
    },
    mistakes: [
      {
        ru: 'Брать диплом олимпиады старше 3 лет — он уже не засчитывается.',
        kk: '3 жылдан ескі олимпиада дипломын ұсыну — ол енді есептелмейді.',
        en: 'Using an olympiad diploma older than 3 years — it no longer counts.',
      },
      {
        ru: 'Выбрать специальность не по предмету олимпиады или конкурса. Они должны совпадать.',
        kk: 'Олимпиада не конкурс пәніне сай емес мамандық таңдау. Олар сәйкес келуі керек.',
        en: 'Choosing a specialty unrelated to the olympiad or contest subject. They have to match.',
      },
      {
        ru: 'Считать международной любую олимпиаду. Засчитываются только те, что есть в перечне Республиканской комиссии.',
        kk: 'Кез келген олимпиаданы халықаралық деп санау. Тек Республикалық комиссия тізбесіндегілер ғана есептеледі.',
        en: "Assuming any olympiad counts as international. Only those on the Republican Commission's list do.",
      },
    ],
    sources: ['pravila', 'pp573', 'olympiads'],
  },

  specialty: {
    why: {
      ru: 'Перечень пересобирают каждый год, и он же ограничивает число мест. Для бакалавриата есть ещё одно условие: специальность должна совпадать с предметом вашей олимпиады или конкурса.',
      kk: 'Тізбе жыл сайын қайта жасалады және орын санын да шектейді. Бакалавриатқа тағы бір шарт бар: мамандық олимпиаданың не конкурстың пәніне сай болуы керек.',
      en: "The list is rebuilt every year and also caps the places. The bachelor's track adds one more condition: your specialty has to match the subject of your olympiad or contest.",
    },
    inShort: {
      what: { ru: 'Проверка, что ваше направление финансируют на уровне бакалавриата.', kk: 'Бағытыңыз бакалавриат деңгейінде қаржыландырылатынын тексеру.', en: "A check that your field is funded at the bachelor's level." },
      you: { ru: 'Найти направление в перечне — уровень «Бакалавриат» — и сверить его с предметом олимпиады.', kk: 'Тізбеден бағытты табу — «Бакалавриат» деңгейі — және оны олимпиада пәнімен салыстыру.', en: "Find your field at the bachelor's level and check it against your olympiad subject." },
      result: { ru: 'Код специальности с буквой «Б», который совпадает с предметом олимпиады.', kk: 'Олимпиада пәніне сай келетін «Б» әрпі бар мамандық коды.', en: 'A specialty code ending in "Б" that matches your olympiad subject.' },
    },
  },

  foreign: {
    kicker: { ru: 'Язык обучения', kk: 'Оқу тілі', en: 'Language of study' },
    title: { ru: 'Иностранный язык — по требованию вуза', kk: 'Шет тілі — ЖОО талабы бойынша', en: 'Foreign language — as the university requires' },
    summary: {
      ru: 'Отдельного порога для бакалавриата правила не задают: язык подтверждает безусловное зачисление.',
      kk: 'Бакалавриатқа қағида жеке шек белгілемейді: тілді сөзсіз қабылдану растайды.',
      en: "The rules set no separate threshold for the bachelor's track: unconditional admission vouches for your language.",
    },
    why: {
      ru: 'Среди условий бакалавриата есть только государственный язык. Иностранный язык проверяет сам вуз, когда решает, зачислить ли вас без условий, — поэтому ориентируйтесь на его требование. Сертификат по иностранному языку в пакет документов не входит.',
      kk: 'Бакалавриат шарттарының ішінде тек мемлекеттік тіл бар. Шет тілін сізді шартсыз қабылдау-қабылдамауды шешкенде ЖОО-ның өзі тексереді — сондықтан соның талабына қараңыз. Шет тілі сертификаты құжаттар топтамасына кірмейді.',
      en: "The bachelor's conditions mention only the state language. The university checks your foreign language itself when it decides whether to admit you unconditionally — so go by its requirement. A foreign-language certificate is not part of the package.",
    },
    inShort: {
      what: { ru: 'Язык, на котором вы будете учиться, — по меркам вуза.', kk: 'Оқитын тіліңіз — ЖОО өлшемімен.', en: "The language you will study in — by the university's measure." },
      you: { ru: 'Узнать, какой экзамен и балл требует вуз, и сдать его.', kk: 'ЖОО қандай емтихан мен балл талап ететінін біліп, оны тапсыру.', en: 'Find out which exam and score the university asks for, and sit it.' },
      result: { ru: 'Безусловное зачисление, в котором языкового условия уже нет.', kk: 'Тілдік шарты жоқ сөзсіз қабылдану.', en: 'Unconditional admission with no language condition left in it.' },
    },
    checklist: {
      know_threshold: {
        ru: 'Знаете, какой экзамен и балл требует выбранный вуз.',
        kk: 'Таңдаған ЖОО қандай емтихан мен балл талап ететінін білесіз.',
        en: 'You know which exam and score your university requires.',
      },
      meets: {
        ru: 'Балл закрывает требование вуза — в зачислении нет языкового условия.',
        kk: 'Балл ЖОО талабын жабады — қабылдауда тілдік шарт жоқ.',
        en: "Your score clears the university's requirement — the admission carries no language condition.",
      },
    },
    sources: ['pp573', 'pravila', 'admission_guide'],
  },

  admission: {
    why: {
      ru: 'Зачисление должно быть безусловным — без учебных условий вроде «доучите язык». Условие про оплату допустимо: её берёт на себя стипендия. Подойдёт и бесплатное зачисление — от вуза Списка или другой организации, если оно покрывает учёбу целиком. В документе — ваши данные, специальность, сроки и стоимость обучения.',
      kk: 'Қабылдау сөзсіз болуы керек — «тілді жетілдіріңіз» сияқты оқу шарттарынсыз. Төлем туралы шартқа болады: оны стипендия өтейді. Тегін қабылдау да жарайды — Тізімдегі ЖОО-дан не басқа ұйымнан, егер ол оқуды толық жапса. Құжатта — деректеріңіз, мамандық, оқу мерзімі мен құны.',
      en: 'The admission has to be unconditional — no study conditions like "improve your language". A payment condition is fine: the scholarship pays. Free admission works too — from a listed university or another organisation, as long as it covers the whole course. The document shows your details, specialty, dates and the cost of study.',
    },
  },

  workback: {
    summary: {
      ru: '5 лет в Астане, Алматы или Шымкенте либо 3 года в регионах. Справки каждые 6 месяцев.',
      kk: 'Астанада, Алматыда не Шымкентте 5 жыл не өңірлерде 3 жыл. Әр 6 айда анықтама.',
      en: 'Five years in Astana, Almaty or Shymkent, or three in the regions. Certificates every 6 months.',
    },
    mistakes: ACADEMIC_WORKBACK_MISTAKES,
  },
}

export const BACHELOR_HOME: PlatformHome = {
  intro: {
    ru: 'Бакалавриат за рубежом за счёт государства — для призёров международных олимпиад и конкурсов. Вы сами поступаете в ведущий вуз из Списка без условий, а стипендия оплачивает учёбу, проживание, проезд и визу. После выпуска — работа в Казахстане.',
    kk: 'Шетелде мемлекет есебінен бакалавриат — халықаралық олимпиадалар мен конкурстардың жүлдегерлеріне. Тізімдегі жетекші ЖОО-ға өзіңіз шартсыз түсесіз, ал стипендия оқуды, тұруды, жолды және визаны төлейді. Бітірген соң — Қазақстанда жұмыс.',
    en: "A bachelor's degree abroad paid by the state — for medallists of international olympiads and contests. You get into a leading listed university unconditionally on your own, and the scholarship pays for study, housing, travel and the visa. After graduating you work in Kazakhstan.",
  },
  facts: [
    { value: '3', caption: { ru: 'года — срок давности диплома олимпиады или конкурса', kk: 'жыл — олимпиада не конкурс дипломының ескіру мерзімі', en: 'years — how recent the olympiad or contest diploma must be' }, source: 'pp573' },
    { value: 'B1', caption: { ru: 'казахский — единственный языковой сертификат в пакете', kk: 'қазақ тілі — топтамадағы жалғыз тілдік сертификат', en: 'Kazakh — the only language certificate in the package' }, source: 'pravila' },
    { value: '500', caption: { ru: 'слов — предел мотивационного письма', kk: 'сөз — мотивациялық хаттың шегі', en: 'words — the cap on the motivation letter' }, source: 'pravila' },
    { value: '5 / 3', caption: { ru: 'лет отработки в больших городах / в регионах', kk: 'жыл өтеу: ірі қалаларда / өңірлерде', en: 'years of work-back in the big cities / in the regions' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'За последние 3 года вы стали призёром — I, II или III степень — международной олимпиады по школьному предмету, конкурса научных проектов или конкурса исполнителей.', kk: 'Соңғы 3 жылда мектеп пәні бойынша халықаралық олимпиаданың, ғылыми жобалар не орындаушылар конкурсының жүлдегері — I, II не III дәреже — атандыңыз.', en: 'In the last 3 years you won a 1st, 2nd or 3rd place at an international school-subject olympiad, a research-project contest or a performers competition.' },
    { ru: 'У вас есть аттестат о среднем образовании или диплом колледжа.', kk: 'Сізде орта білім аттестаты не колледж дипломы бар.', en: 'You hold a school-leaving certificate or a college diploma.' },
    { ru: 'Вы готовы поступить в вуз из Списка без условий — на специальность по предмету олимпиады.', kk: 'Тізімдегі ЖОО-ға шартсыз — олимпиада пәні бойынша мамандыққа — түсуге дайынсыз.', en: 'You are ready to get into a listed university unconditionally — in the subject of your olympiad.' },
  ],
  fitNo: [
    { text: { ru: 'Диплом бакалавра у вас уже есть.', kk: 'Сізде бакалавр дипломы бар.', en: "You already have a bachelor's degree." }, go: 'master' },
    { text: { ru: 'Вы работаете и хотите поехать за опытом на срок до 12 месяцев, а не за дипломом.', kk: 'Жұмыс істейсіз және диплом үшін емес, 12 айға дейін тәжірибе үшін барғыңыз келеді.', en: 'You work and want to go abroad for up to 12 months for experience, not a degree.' }, go: 'internship' },
  ],
  fitSources: ['pp573', 'pravila', 'olympiads'],
  coverage: ACADEMIC_COVERAGE,
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
