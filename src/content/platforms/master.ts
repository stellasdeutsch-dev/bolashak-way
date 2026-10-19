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
        ru: 'Языковые курсы (если они вам положены), учёба и отработка вместе укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Тіл курстары (егер сізге берілсе), оқу және өтеу бірге зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Language courses (if you get them), study and the work-back together fit before retirement age. It is counted as of the day you apply.',
      },
      once: {
        ru: 'Вы знаете, что стипендию на магистратуру дают один раз. Повторно — только если прошлую не использовали, к учёбе не приступили и долгов нет.',
        kk: 'Магистратураға стипендия бір рет берілетінін білесіз. Қайта — тек бұрынғысын пайдаланбаған, оқуға кіріспеген және берешек болмаса.',
        en: "You know the master's scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.",
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
      ru: 'В магистратуру ведут два пути. Если вы поступаете сами, приглашение из вуза Списка нужно уже при подаче. Если вы из села, инженер, медик, госслужащий или работник атомной отрасли — это льготные категории: сначала конкурс и языковые курсы за счёт стипендии, а вуз вы ищете после присуждения. Зато у льготных есть требования к стажу, GPA и специальности диплома.',
      kk: 'Магистратураға екі жол апарады. Өз бетіңізше түссеңіз, Тізімдегі ЖОО шақыруы тапсыру кезінде-ақ керек. Ауылдан, инженер, медик, мемқызметші не атом саласының қызметкері болсаңыз — бұл жеңілдікті санаттар: алдымен конкурс пен стипендия есебінен тіл курстары, ал ЖОО-ны тағайындалғаннан кейін іздейсіз. Есесіне жеңілдікті санаттарға өтіл, GPA және диплом мамандығына талап бар.',
      en: "Two roads lead to a master's. If you get in on your own, you need the offer from a listed university when you apply. If you are a rural applicant, an engineer, a medic, a civil servant or a nuclear-industry worker, you are in a preferential category: the competition and funded language courses come first, and you look for a university after the award. In return, preferential categories have experience, GPA and diploma-specialty requirements.",
    },
    inShort: {
      what: { ru: 'Развилка магистратуры: самостоятельное поступление или одна из пяти льготных категорий.', kk: 'Магистратураның айырығы: өз бетінше түсу не бес жеңілдікті санаттың бірі.', en: "The master's fork: getting in on your own, or one of five preferential categories." },
      you: { ru: 'Найти свою категорию в таблице и проверить её условия: стаж, GPA, родственная специальность, заявка работодателя.', kk: 'Кестеден санатыңызды тауып, шарттарын тексеру: өтіл, GPA, туыстас мамандық, жұмыс беруші өтінімі.', en: 'Find your category in the table and check its conditions: experience, GPA, related specialty, employer request.' },
      result: { ru: 'Роадмап собран под вашу категорию: у льготных — языковые курсы и поиск вуза после конкурса, у самостоятельных — приглашение до подачи.', kk: 'Жол картасы санатыңызға жиналған: жеңілдіктілерде — тіл курсы және конкурстан кейін ЖОО іздеу, өз бетіншелерде — тапсыруға дейін шақыру.', en: 'Your roadmap is built for your category: preferential applicants get courses and a university search after the competition, self-admitted ones need the offer before applying.' },
    },
    mistakes: [
      {
        ru: 'Выбрать льготную категорию «на всякий случай». Её подтверждают документами: прописку и работу в селе за 2 года, медицинский стаж, стаж на госслужбе.',
        kk: 'Жеңілдікті санатты «әйтеуір» таңдау. Оны құжатпен растайды: ауылдағы 2 жылдық тіркеу мен жұмыс, медициналық өтіл, мемқызметтегі өтіл.',
        en: 'Picking a preferential category "just in case". It is proven with documents: two years of registration and work in a village, medical experience, civil-service experience.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Смотрят на выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесіне қарайды, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. What matters is the pension-fund statement for the whole period, paid leave included.',
      },
    ],
  },

  specialty: {
    inShort: {
      what: { ru: 'Проверка, финансируют ли ваше направление в магистратуре в этом году.', kk: 'Бағытыңыз биыл магистратурада қаржыландырыла ма, соны тексеру.', en: "A check that your field is funded at master's level this year." },
      you: { ru: 'Найти направление в перечне — уровень «Магистратура». Льготным категориям — ещё сверить специальность диплома с перечнем родственных специальностей.', kk: 'Тізбеден бағытты табу — «Магистратура» деңгейі. Жеңілдікті санаттарға — диплом мамандығын туыстас мамандықтар тізбесімен де салыстыру.', en: "Find your field in the list at the master's level. Preferential categories also check their diploma specialty against the related-specialties list." },
      result: { ru: 'Код специальности с буквой «М» — и уверенность, что программа попадает в финансирование.', kk: '«М» әрпі бар мамандық коды — және бағдарлама қаржыландыруға кіретініне сенім.', en: 'A specialty code ending in "М" — and confidence that the programme is funded.' },
    },
  },

  university: {
    why: {
      ru: 'Список ведущих зарубежных вузов утверждают заново каждый год, и приглашение из вуза вне списка права на стипендию не даёт. Если вы поступаете сами, вуз нужен до подачи. Если вы из льготной категории, вуз из того же списка выбираете после конкурса и языковых курсов — но присмотреть его стоит заранее.',
      kk: 'Жетекші шетелдік ЖОО тізімі жыл сайын қайта бекітіледі, тізімнен тыс ЖОО шақыруы стипендияға құқық бермейді. Өз бетіңізше түссеңіз, ЖОО тапсыруға дейін керек. Жеңілдікті санаттан болсаңыз, сол тізімнен ЖОО-ны конкурс пен тіл курсынан кейін таңдайсыз — бірақ алдын ала қарап қойған жөн.',
      en: 'The list of leading foreign universities is re-approved every year, and an offer from outside it gives no right to the scholarship. If you get in on your own, you need the university before applying. In a preferential category you pick from the same list after the competition and the courses — but it is worth looking early.',
    },
  },

  foreign: {
    summary: {
      ru: 'Три порога приказа № 318. Льготным хватит первого — язык добирают на курсах; тем, кто поступает сам, нужен третий.',
      kk: '№ 318 бұйрықтың үш шегі. Жеңілдіктілерге біріншісі жетеді — тілді курста толықтырады; өз бетінше түсетіндерге үшіншісі керек.',
      en: 'Three thresholds in Order No. 318. Preferential applicants need only the first — the rest is topped up on courses; self-admitted applicants need the third.',
    },
    why: {
      ru: 'Порог зависит от категории. Льготным категориям для участия хватит первого порога — язык добирают на курсах за счёт стипендии, а от уровня зависит, где эти курсы пройдут. Тем, кто поступает сам, нужен сразу третий порог — уровень прямого зачисления.',
      kk: 'Шек санатқа байланысты. Жеңілдікті санаттарға қатысу үшін бірінші шек жетеді — тілді стипендия есебінен курста толықтырады, ал курстың қай жерде өтетіні деңгейге байланысты. Өз бетінше түсетіндерге бірден үшінші шек — тікелей қабылдау деңгейі — керек.',
      en: 'The threshold depends on your category. Preferential categories need only level I to take part — the language is topped up on funded courses, and your level decides where those courses run. Self-admitted applicants need level III straight away, the level for direct admission.',
    },
    inShort: {
      what: { ru: 'Проверка языка по трём порогам. От вашего уровня зависит, поедете вы сразу учиться или сначала на курсы.', kk: 'Тілді үш шек бойынша тексеру. Бірден оқуға барасыз ба, әлде алдымен курсқа ма — деңгейге байланысты.', en: 'A language check against three thresholds. Your level decides whether you go straight to study or to courses first.' },
      you: { ru: 'Найти порог своей категории в таблице, сдать экзамен и сверить балл — в том числе с требованием вуза.', kk: 'Кестеден санатыңыздың шегін тауып, емтихан тапсырып, балды салыстыру — ЖОО талабымен де.', en: "Find your category's threshold in the table, take the exam and compare the score — including with the university's own requirement." },
      result: { ru: 'Понимание, хватает ли балла — и если нет, сколько до порога осталось.', kk: 'Балл жете ме, соны түсіну — жетпесе, шекке қанша қалғанын білу.', en: 'You know whether your score is enough — and if not, how far off it is.' },
    },
  },

  workback: {
    summary: {
      ru: 'От 3 до 5 лет — зависит от категории и города. Справки каждые 6 месяцев.',
      kk: '3-тен 5 жылға дейін — санат пен қалаға байланысты. Әр 6 айда анықтама.',
      en: 'Three to five years — depending on your category and city. Certificates every 6 months.',
    },
    mistakes: [
      ACADEMIC_WORKBACK_MISTAKES[0],
      {
        ru: 'Госслужащим — уйти в первый год из органа, который направил на учёбу. Первый год отработки проходит именно в нём.',
        kk: 'Мемқызметшілерге — бірінші жылы оқуға жіберген органнан кету. Өтеудің бірінші жылы дәл сол органда өтеді.',
        en: 'Civil servants: leaving the sending body in the first year. The first year of the work-back is served there.',
      },
      ACADEMIC_WORKBACK_MISTAKES[1],
    ],
  },
}

export const MASTER_HOME: PlatformHome = {
  intro: {
    ru: 'Магистратура за рубежом за счёт государства — двумя путями. Можно поступить в вуз из Списка самому и подать на стипендию с приглашением на руках. А можно пойти по одной из пяти льготных категорий — для жителей сёл, инженеров, медиков, госслужащих и работников атомной отрасли: тогда сначала конкурс и языковые курсы за счёт стипендии, а вуз — потом.',
    kk: 'Шетелде мемлекет есебінен магистратура — екі жолмен. Тізімдегі ЖОО-ға өзіңіз түсіп, шақыру қолыңызда болғанда стипендияға тапсыруға болады. Не бес жеңілдікті санаттың бірімен баруға болады — ауыл тұрғындары, инженерлер, медиктер, мемқызметшілер және атом саласының қызметкерлері үшін: онда алдымен конкурс пен стипендия есебінен тіл курстары, ал ЖОО — кейін.',
    en: "A master's abroad paid by the state — by two roads. You can get into a listed university yourself and apply with the offer in hand. Or you can go through one of five preferential categories — for rural residents, engineers, medics, civil servants and nuclear-industry workers: then the competition and funded language courses come first, and the university after.",
  },
  facts: [
    { value: '6', caption: { ru: 'категорий подачи: одна самостоятельная и пять льготных', kk: 'тапсыру санаты: бір өз бетінше және бес жеңілдікті', en: 'categories: one self-admitted and five preferential' }, source: 'pp573' },
    { value: '3.00', caption: { ru: 'GPA — минимум для льготных категорий', kk: 'GPA — жеңілдікті санаттарға ең төменгісі', en: 'GPA — the minimum for preferential categories' }, source: 'pravila' },
    { value: '5', caption: { ru: 'анкет в вузы оплачивает стипендия', kk: 'ЖОО анкетасын стипендия төлейді', en: 'university applications paid by the scholarship' }, source: 'pp573' },
    { value: '5 / 3', caption: { ru: 'лет отработки в больших городах / в регионах', kk: 'жыл өтеу: ірі қалаларда / өңірлерде', en: 'years of work-back in the big cities / in the regions' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'У вас есть диплом бакалавра или специалиста.', kk: 'Сізде бакалавр не маман дипломы бар.', en: "You hold a bachelor's or specialist diploma." },
    { ru: 'Вы поступили или поступаете в вуз из Списка сами — либо подходите под льготную категорию: село, инженер, медик, госслужащий, атомная отрасль.', kk: 'Тізімдегі ЖОО-ға өзіңіз түстіңіз не түсіп жатырсыз — не жеңілдікті санатқа сай келесіз: ауыл, инженер, медик, мемқызметші, атом саласы.', en: 'You have got or are getting into a listed university on your own — or you fit a preferential category: rural, engineer, medic, civil servant, nuclear industry.' },
    { ru: 'У вас есть казахский на B1 или вы готовы его сдать.', kk: 'Сізде B1 деңгейлі қазақ тілі бар не тапсыруға дайынсыз.', en: 'You have Kazakh at B1 or are ready to sit it.' },
  ],
  fitNo: [
    { text: { ru: 'Вы уже магистр и хотите PhD, доктора по профилю или в резидентуру.', kk: 'Сіз магистрсіз және PhD, бейіні бойынша доктор не резидентураға барғыңыз келеді.', en: "You already have a master's and want a PhD, a professional doctorate or residency." }, go: 'doctorate' },
    { text: { ru: 'Вам нужен не диплом, а опыт работы за рубежом до 12 месяцев.', kk: 'Сізге диплом емес, шетелде 12 айға дейінгі жұмыс тәжірибесі керек.', en: 'You want work experience abroad of up to 12 months, not a degree.' }, go: 'internship' },
    { text: { ru: 'Вы учёный со степенью и публикациями и едете в научную организацию по своему исследованию.', kk: 'Сіз дәрежесі және жарияланымдары бар ғалымсыз, зерттеуіңіз бойынша ғылыми ұйымға барасыз.', en: 'You are a researcher with a degree and publications heading to a research host for your own study.' }, go: 'science' },
  ],
  fitSources: ['pp573', 'pravila'],
  coverage: [
    ACADEMIC_COVERAGE[0],
    { ru: 'Языковые курсы с промежуточным и итоговым тестами — льготным категориям по решению комиссии', kk: 'Аралық және қорытынды тесті бар тіл курстары — жеңілдікті санаттарға комиссия шешімімен', en: "Language courses with interim and final tests — for preferential categories, by the commission's decision" },
    ...ACADEMIC_COVERAGE.slice(1),
  ],
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
