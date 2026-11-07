import type { PlatformHome, StagePatches } from '../types'
import { ACADEMIC_COVERAGE, ACADEMIC_WORKBACK_MISTAKES, FREE_TUITION_NOTE } from './shared'

/**
 * Master's platform. Two lanes share it: you either get into a listed university on your
 * own and apply with the offer, or you come through one of five preferential categories and
 * look for the university after the award (ПП 573 п. 4, 9, 23). Everything below names only
 * those two lanes.
 */

export const MASTER_STAGES: StagePatches = {
  eligibility: {
    checklist: {
      education: {
        ru: 'У вас есть диплом бакалавра или специалиста с приложением.',
        kk: 'Сізде қосымшасы бар бакалавр не маман дипломы бар.',
        en: "You hold a bachelor's or specialist diploma with its transcript.",
      },
      pension_age: {
        ru: 'Языковые курсы (для льготных категорий), учёба и отработка укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Тіл курстары (жеңілдікті санаттарға), оқу және өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Language courses (for preferential categories), study and the work-back fit before retirement age, counted as of the day you apply.',
      },
      once: {
        ru: 'Стипендию на магистратуру дают один раз. Повторно – только если прошлую не использовали, к учёбе не приступили и долгов нет.',
        kk: 'Магистратураға стипендия бір рет беріледі. Қайта – тек бұрынғысын пайдаланбаған, оқуға кіріспеген және берешек болмаса.',
        en: "The master's scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.",
      },
    },
  },

  category: {
    title: { ru: 'Категория подачи в магистратуру', kk: 'Магистратураға тапсыру санаты', en: "Your master's category" },
    summary: {
      ru: 'Одна из шести категорий. От неё зависят стаж, GPA, язык и порядок этапов.',
      kk: 'Алты санаттың бірі. Өтіл, GPA, тіл және кезеңдер реті соған байланысты.',
      en: 'One of six categories. It decides your experience, GPA, language and the order of stages.',
    },
    why: {
      ru: 'Поступающим самостоятельно приглашение из вуза Списка нужно при подаче. Льготные категории – из села, инженеры, медики, госслужащие, работники атомной отрасли – сначала проходят конкурс и языковые курсы за счёт стипендии, а вуз выбирают после присуждения. Для льготных категорий есть требования к стажу, GPA и специальности диплома.',
      kk: 'Өз бетінше түсетіндерге Тізімдегі ЖОО шақыруы тапсыру кезінде керек. Жеңілдікті санаттар – ауылдан, инженерлер, медиктер, мемқызметшілер, атом саласы қызметкерлері – алдымен конкурстан және стипендия есебінен тіл курстарынан өтеді, ал ЖОО-ны тағайындалғаннан кейін таңдайды. Жеңілдікті санаттарға өтіл, GPA және диплом мамандығына талап бар.',
      en: 'Self-admitted applicants need the offer from a listed university when they apply. Preferential categories – rural applicants, engineers, medics, civil servants, nuclear-industry workers – first go through the competition and funded language courses, and choose the university after the award. Preferential categories have experience, GPA and diploma-specialty requirements.',
    },
    inShort: {
      what: { ru: 'Два пути: самостоятельное поступление или одна из пяти льготных категорий.', kk: 'Екі жол: өз бетінше түсу не бес жеңілдікті санаттың бірі.', en: 'Two roads: getting in on your own, or one of five preferential categories.' },
      you: { ru: 'Найти свою категорию и проверить её условия: стаж, GPA, родственная специальность, заявка работодателя.', kk: 'Санатыңызды тауып, шарттарын тексеру: өтіл, GPA, туыстас мамандық, жұмыс беруші өтінімі.', en: 'Find your category and check its conditions: experience, GPA, related specialty, employer request.' },
      result: { ru: 'Этапы в приложении подобраны под вашу категорию.', kk: 'Қолданбадағы кезеңдер санатыңызға қарай іріктелген.', en: 'The stages in the app are matched to your category.' },
    },
    mistakes: [
      {
        ru: 'Указать льготную категорию без подтверждающих документов – например, о прописке и работе в селе за 2 года, о медицинском стаже или стаже на госслужбе.',
        kk: 'Жеңілдікті санатты растайтын құжатсыз көрсету – мысалы, ауылда 2 жыл тіркелу мен жұмыс, медициналық өтіл не мемқызметтегі өтіл туралы.',
        en: 'Claiming a preferential category without supporting documents – for example, on two years of registration and work in a village, medical experience or civil-service experience.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Проверяют выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесін тексереді, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. The pension-fund statement for the whole period is checked, paid leave included.',
      },
    ],
  },

  specialty: {
    inShort: {
      what: { ru: 'Проверка, финансируется ли ваше направление в магистратуре в этом году.', kk: 'Бағытыңыз биыл магистратурада қаржыландырыла ма – соны тексеру.', en: "A check that your field is funded at master's level this year." },
      you: { ru: 'Найти направление в перечне на уровне «Магистратура». Льготным категориям – также сверить специальность диплома с перечнем родственных специальностей.', kk: 'Тізбеден «Магистратура» деңгейіндегі бағытты табу. Жеңілдікті санаттарға – диплом мамандығын туыстас мамандықтар тізбесімен де салыстыру.', en: "Find your field in the list at the master's level. Preferential categories also check their diploma specialty against the related-specialties list." },
      result: { ru: 'Код специальности с буквой «М» из перечня текущего года.', kk: 'Ағымдағы жыл тізбесіндегі «М» әрпі бар мамандық коды.', en: 'A specialty code ending in "М" from this year\'s list.' },
    },
  },

  university: {
    why: {
      ru: 'Список ведущих зарубежных вузов утверждают каждый год; приглашение из вуза вне списка права на стипендию не даёт. Поступающим самостоятельно вуз нужен до подачи. Льготные категории выбирают вуз из того же списка после конкурса и языковых курсов.',
      kk: 'Жетекші шетелдік ЖОО тізімі жыл сайын бекітіледі; тізімнен тыс ЖОО шақыруы стипендияға құқық бермейді. Өз бетінше түсетіндерге ЖОО тапсыруға дейін керек. Жеңілдікті санаттар сол тізімнен ЖОО-ны конкурс пен тіл курстарынан кейін таңдайды.',
      en: 'The list of leading foreign universities is approved every year; an offer from outside it gives no right to the scholarship. Self-admitted applicants need the university before applying. Preferential categories choose from the same list after the competition and the language courses.',
    },
  },

  foreign: {
    summary: {
      ru: 'Льготным категориям язык – условие участия: достаточно первого порога приказа № 318, остальное добирают на курсах. Поступающим самостоятельно правила сертификат не требуют – язык проверяет вуз.',
      kk: 'Жеңілдікті санаттарға тіл – қатысу шарты: № 318 бұйрықтың бірінші шегі жеткілікті, қалғанын курста толықтырады. Өз бетінше түсетіндерден қағида сертификат талап етпейді – тілді ЖОО тексереді.',
      en: 'For preferential categories the language is a condition: level I of Order No. 318 is enough, the rest is topped up on courses. The Rules ask self-admitted applicants for no certificate – the university checks the language.',
    },
    why: {
      ru: 'Основание – ПП № 573, п. 9 пп. 3: языковое условие касается только льготных категорий (из села, ИТР, медики, госслужащие, работники атомной отрасли). От их уровня языка зависит, где пройдут языковые курсы. Для «самостоятельно поступивших» в таблице приказа № 318 указан третий порог – применяется ли он к вам, уточните в Центре.',
      kk: 'Негіз – № 573 ҮҚ, 9-тармақтың 3-тармақшасы: тілдік шарт тек жеңілдікті санаттарға (ауылдан, ИТҚ, медиктер, мемқызметшілер, атом саласы қызметкерлері) қатысты. Олардың тіл деңгейіне тіл курстарының қайда өтетіні байланысты. № 318 бұйрық кестесінде «өз бетінше түскендерге» үшінші шек көрсетілген – оның сізге қолданылатынын Орталықтан нақтылаңыз.',
      en: 'The basis is Decree No. 573, п. 9 пп. 3: the language condition applies only to the preferential categories (rural, engineering, medical, civil-service and nuclear-industry applicants). Their level decides where the language courses run. Order No. 318 lists level III for "self-admitted" applicants – ask the Center whether it applies to you.',
    },
    inShort: {
      what: { ru: 'Проверка языка. Льготным категориям от уровня зависит, поедете вы сразу на учёбу или сначала на курсы; поступающим самостоятельно язык нужен для зачисления в вуз.', kk: 'Тілді тексеру. Жеңілдікті санаттарға бірден оқуға барасыз ба, әлде алдымен курсқа ма – деңгейге байланысты; өз бетінше түсетіндерге тіл ЖОО-ға қабылдану үшін керек.', en: 'A language check. For preferential categories your level decides whether you go straight to study or to courses first; self-admitted applicants need the language to get into the university.' },
      you: { ru: 'Льготным – найти порог в таблице, сдать экзамен и сверить балл. Поступающим самостоятельно – сдать экзамен на балл, который требует вуз.', kk: 'Жеңілдіктілерге – кестеден шекті тауып, емтихан тапсырып, балды салыстыру. Өз бетінше түсетіндерге – емтиханды ЖОО талап ететін балға тапсыру.', en: 'Preferential: find the threshold in the table, take the exam and compare the score. Self-admitted: sit the exam at the score the university asks for.' },
      result: { ru: 'Вы знаете, достаточно ли балла и сколько не хватает до порога.', kk: 'Балл жеткілікті ме және шекке дейін қанша жетпейтінін білесіз.', en: 'You know whether your score is enough and, if not, how far off it is.' },
    },
  },

  workback: {
    summary: {
      ru: 'От 3 до 5 лет в зависимости от категории и города. Справки – каждые 6 месяцев.',
      kk: 'Санат пен қалаға қарай 3-тен 5 жылға дейін. Анықтама – әр 6 ай сайын.',
      en: 'Three to five years, depending on your category and city. Certificates every 6 months.',
    },
    mistakes: [
      ACADEMIC_WORKBACK_MISTAKES[0],
      {
        ru: 'Госслужащим – уйти в первый год из органа, который направил на учёбу: первый год отработки проходит в нём.',
        kk: 'Мемқызметшілерге – бірінші жылы оқуға жіберген органнан кету: өтеудің бірінші жылы сол органда өтеді.',
        en: 'Civil servants: leaving the sending body in the first year: the first year of the work-back is served there.',
      },
      ACADEMIC_WORKBACK_MISTAKES[1],
    ],
  },
}

export const MASTER_HOME: PlatformHome = {
  intro: {
    ru: 'Магистратура за рубежом за счёт государства. Можно самостоятельно поступить в вуз из Списка и подать документы с приглашением. Или участвовать по одной из пяти льготных категорий (жители сёл, инженеры, медики, госслужащие, работники атомной отрасли): тогда сначала конкурс и языковые курсы за счёт стипендии, а вуз – потом.',
    kk: 'Шетелде мемлекет есебінен магистратура. Тізімдегі ЖОО-ға өз бетіңізше түсіп, шақырумен құжат тапсыруға болады. Не бес жеңілдікті санаттың бірімен (ауыл тұрғындары, инженерлер, медиктер, мемқызметшілер, атом саласы қызметкерлері) қатысуға болады: онда алдымен конкурс пен стипендия есебінен тіл курстары, ал ЖОО – кейін.',
    en: "A master's abroad paid by the state. You can get into a listed university on your own and apply with the offer. Or you can take part in one of five preferential categories (rural residents, engineers, medics, civil servants, nuclear-industry workers): then the competition and funded language courses come first, and the university after.",
  },
  facts: [
    { value: '6', caption: { ru: 'категорий подачи: одна самостоятельная и пять льготных', kk: 'тапсыру санаты: бір өз бетінше және бес жеңілдікті', en: 'categories: one self-admitted and five preferential' }, source: 'pp573' },
    { value: '3.00', caption: { ru: 'GPA – минимум для льготных категорий', kk: 'GPA – жеңілдікті санаттарға ең төменгісі', en: 'GPA – the minimum for preferential categories' }, source: 'pravila' },
    { value: '5', caption: { ru: 'анкет в вузы оплачивает стипендия', kk: 'ЖОО анкетасын стипендия төлейді', en: 'university applications paid by the scholarship' }, source: 'pp573' },
    { value: '5 / 3', caption: { ru: 'лет отработки в столице и городах республиканского значения / в регионах; госслужащим и работникам атомной отрасли – 3 года', kk: 'жыл өтеу: астанада және республикалық маңызы бар қалаларда / өңірлерде; мемқызметшілер мен атом саласы қызметкерлеріне – 3 жыл', en: 'years of work-back in the capital and cities of national status / in the regions; civil servants and nuclear-industry workers owe 3' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'У вас есть диплом бакалавра или специалиста.', kk: 'Сізде бакалавр не маман дипломы бар.', en: "You hold a bachelor's or specialist diploma." },
    { ru: 'Вы поступили или поступаете в вуз из Списка самостоятельно – либо относитесь к льготной категории: село, инженер, медик, госслужащий, атомная отрасль.', kk: 'Тізімдегі ЖОО-ға өз бетіңізше түстіңіз не түсіп жатырсыз – не жеңілдікті санатқа жатасыз: ауыл, инженер, медик, мемқызметші, атом саласы.', en: 'You have got or are getting into a listed university on your own – or you fit a preferential category: rural, engineer, medic, civil servant, nuclear industry.' },
    { ru: 'У вас есть казахский на B1 или вы готовы его сдать.', kk: 'Сізде B1 деңгейлі қазақ тілі бар не тапсыруға дайынсыз.', en: 'You have Kazakh at B1 or are ready to sit it.' },
  ],
  fitNo: [
    { text: { ru: 'Вы уже магистр и хотите в PhD, доктора по профилю или в резидентуру.', kk: 'Сіз магистрсіз және PhD, бейіні бойынша доктор не резидентураға барғыңыз келеді.', en: "You already have a master's and want a PhD, a professional doctorate or residency." }, go: 'doctorate' },
    { text: { ru: 'Вам нужен не диплом, а опыт работы за рубежом до 12 месяцев.', kk: 'Сізге диплом емес, шетелде 12 айға дейінгі жұмыс тәжірибесі керек.', en: 'You want work experience abroad of up to 12 months, not a degree.' }, go: 'internship' },
    { text: { ru: 'Вы учёный со степенью и публикациями и едете в научную организацию по своему исследованию.', kk: 'Сіз дәрежесі және жарияланымдары бар ғалымсыз, зерттеуіңіз бойынша ғылыми ұйымға барасыз.', en: 'You are a researcher with a degree and publications heading to a research host for your own study.' }, go: 'science' },
  ],
  fitSources: ['pp573', 'pravila'],
  coverage: [
    ACADEMIC_COVERAGE[0],
    { ru: 'Языковые курсы с промежуточным и итоговым тестами – льготным категориям по решению комиссии', kk: 'Аралық және қорытынды тесті бар тіл курстары – жеңілдікті санаттарға комиссия шешімімен', en: "Language courses with interim and final tests – for preferential categories, by the commission's decision" },
    ...ACADEMIC_COVERAGE.slice(1),
  ],
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
