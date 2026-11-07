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
        ru: 'Учёба и отработка укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Оқу мен өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'Study and the work-back fit before retirement age, counted as of the day you apply.',
      },
      once: {
        ru: 'Стипендию на бакалавриат дают один раз. Повторно – только если прошлую не использовали, к учёбе не приступили и долгов нет.',
        kk: 'Бакалавриатқа стипендия бір рет беріледі. Қайта – тек бұрынғысын пайдаланбаған, оқуға кіріспеген және берешек болмаса.',
        en: "The bachelor's scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.",
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
      ru: 'Олимпиада или конкурс должны быть в перечне Республиканской комиссии, а специальность – совпадать с их предметом. Стажа, GPA и сертификата по иностранному языку правила не требуют.',
      kk: 'Олимпиада не конкурс Республикалық комиссия тізбесінде болуы, ал мамандық олардың пәніне сай болуы керек. Өтіл, GPA және шет тілі сертификатын қағида талап етпейді.',
      en: "The olympiad or contest must be on the Republican Commission's list, and your specialty must match its subject. The rules ask for no work experience, no GPA and no foreign-language certificate.",
    },
    inShort: {
      what: { ru: 'Проверка трёх условий бакалавриата до сбора документов.', kk: 'Құжат жинамас бұрын бакалавриаттың үш шартын тексеру.', en: "A check of the three bachelor's conditions before you gather documents." },
      you: { ru: 'Проверить, что диплом олимпиады не старше 3 лет, олимпиада есть в перечне, а специальность совпадает с её предметом.', kk: 'Олимпиада дипломы 3 жылдан ескі емес екенін, олимпиада тізбеде барын және мамандық оның пәніне сай екенін тексеру.', en: 'Check that the olympiad diploma is no older than 3 years, the olympiad is on the list and your specialty matches its subject.' },
      result: { ru: 'Вы знаете, выполняете ли все три условия.', kk: 'Үш шарттың бәрін орындайтыныңызды білесіз.', en: 'You know whether you meet all three conditions.' },
    },
    mistakes: [
      {
        ru: 'Подать диплом олимпиады старше 3 лет: он не засчитывается.',
        kk: '3 жылдан ескі олимпиада дипломын ұсыну: ол есептелмейді.',
        en: 'Submitting an olympiad diploma older than 3 years: it does not count.',
      },
      {
        ru: 'Выбрать специальность не по предмету олимпиады или конкурса: они должны совпадать.',
        kk: 'Олимпиада не конкурс пәніне сай емес мамандық таңдау: олар сәйкес келуі керек.',
        en: 'Choosing a specialty outside the olympiad or contest subject: they must match.',
      },
      {
        ru: 'Считать подходящей любую международную олимпиаду: засчитываются только те, что есть в перечне Республиканской комиссии.',
        kk: 'Кез келген халықаралық олимпиаданы жарамды деп санау: тек Республикалық комиссия тізбесіндегілер ғана есептеледі.',
        en: "Assuming any international olympiad counts: only those on the Republican Commission's list do.",
      },
    ],
    sources: ['pravila', 'pp573', 'olympiads'],
  },

  specialty: {
    why: {
      ru: 'Перечень утверждают каждый год. Для бакалавриата специальность также должна совпадать с предметом вашей олимпиады или конкурса.',
      kk: 'Тізбе жыл сайын бекітіледі. Бакалавриатта мамандық олимпиаданың не конкурстың пәніне де сай болуы керек.',
      en: "The list is approved every year. On the bachelor's track your specialty must also match the subject of your olympiad or contest.",
    },
    inShort: {
      what: { ru: 'Проверка, что ваше направление финансируется на уровне бакалавриата.', kk: 'Бағытыңыз бакалавриат деңгейінде қаржыландырылатынын тексеру.', en: "A check that your field is funded at the bachelor's level." },
      you: { ru: 'Найти направление в перечне на уровне «Бакалавриат» и сверить его с предметом олимпиады.', kk: 'Тізбеден «Бакалавриат» деңгейіндегі бағытты тауып, оны олимпиада пәнімен салыстыру.', en: "Find your field at the bachelor's level and check it against your olympiad subject." },
      result: { ru: 'Код специальности с буквой «Б», совпадающий с предметом олимпиады.', kk: 'Олимпиада пәніне сай келетін «Б» әрпі бар мамандық коды.', en: 'A specialty code ending in "Б" that matches your olympiad subject.' },
    },
  },

  foreign: {
    kicker: { ru: 'Язык обучения', kk: 'Оқу тілі', en: 'Language of study' },
    title: { ru: 'Иностранный язык – по требованию вуза', kk: 'Шет тілі – ЖОО талабы бойынша', en: 'Foreign language – as the university requires' },
    summary: {
      ru: 'Отдельного порога для бакалавриата правила не задают: язык подтверждает безусловное зачисление.',
      kk: 'Бакалавриатқа қағида жеке шек белгілемейді: тілді сөзсіз қабылдану растайды.',
      en: "The rules set no separate threshold for the bachelor's track: unconditional admission vouches for your language.",
    },
    why: {
      ru: 'Из языков условия бакалавриата называют только государственный. Иностранный язык проверяет вуз при безусловном зачислении – ориентируйтесь на его требование. Сертификат по иностранному языку в пакет документов не входит.',
      kk: 'Бакалавриат шарттары тілдерден тек мемлекеттік тілді атайды. Шет тілін ЖОО сөзсіз қабылдау кезінде тексереді – соның талабына сүйеніңіз. Шет тілі сертификаты құжаттар топтамасына кірмейді.',
      en: "Of the languages, the bachelor's conditions name only the state language. The university checks your foreign language when it admits you unconditionally – go by its requirement. A foreign-language certificate is not part of the package.",
    },
    inShort: {
      what: { ru: 'Язык обучения – по требованиям вуза.', kk: 'Оқу тілі – ЖОО талаптары бойынша.', en: "The language of study – by the university's requirements." },
      you: { ru: 'Узнать, какой экзамен и балл требует вуз, и сдать его.', kk: 'ЖОО қандай емтихан мен балл талап ететінін біліп, оны тапсыру.', en: 'Find out which exam and score the university asks for, and sit it.' },
      result: { ru: 'Безусловное зачисление без языкового условия.', kk: 'Тілдік шартсыз сөзсіз қабылдану.', en: 'Unconditional admission with no language condition.' },
    },
    checklist: {
      know_threshold: {
        ru: 'Знаете, какой экзамен и балл требует выбранный вуз.',
        kk: 'Таңдаған ЖОО қандай емтихан мен балл талап ететінін білесіз.',
        en: 'You know which exam and score your university requires.',
      },
      meets: {
        ru: 'Балл соответствует требованию вуза: в зачислении нет языкового условия.',
        kk: 'Балл ЖОО талабына сай: қабылдауда тілдік шарт жоқ.',
        en: "Your score meets the university's requirement: the admission has no language condition.",
      },
    },
    sources: ['pp573', 'pravila', 'admission_guide'],
  },

  admission: {
    why: {
      ru: 'Зачисление должно быть безусловным – без учебных условий вроде «доучите язык». Условие об оплате допустимо: оплату берёт на себя стипендия. Подходит и бесплатное зачисление от вуза Списка или другой организации, если оно покрывает всё обучение.',
      kk: 'Қабылдау сөзсіз болуы керек – «тілді жетілдіріңіз» сияқты оқу шарттарынсыз. Төлем туралы шарт болуы мүмкін: оны стипендия төлейді. Тізімдегі ЖОО-ның не басқа ұйымның тегін қабылдауы да жарайды, егер ол бүкіл оқуды жапса.',
      en: 'The admission has to be unconditional – no study conditions like "improve your language". A payment condition is acceptable: the scholarship pays. Free admission from a listed university or another organisation also qualifies if it covers the whole course.',
    },
  },

  workback: {
    summary: {
      ru: '5 лет в Астане, Алматы или Шымкенте либо 3 года в регионах. Справки – каждые 6 месяцев.',
      kk: 'Астанада, Алматыда не Шымкентте 5 жыл не өңірлерде 3 жыл. Анықтама – әр 6 ай сайын.',
      en: 'Five years in Astana, Almaty or Shymkent, or three in the regions. Certificates every 6 months.',
    },
    mistakes: ACADEMIC_WORKBACK_MISTAKES,
  },
}

export const BACHELOR_HOME: PlatformHome = {
  intro: {
    ru: 'Бакалавриат за рубежом за счёт государства для призёров международных олимпиад и конкурсов. Вы сами поступаете без условий в вуз из Списка; стипендия оплачивает обучение, проживание, проезд и визу. После выпуска – отработка в Казахстане.',
    kk: 'Халықаралық олимпиадалар мен конкурстардың жүлдегерлеріне шетелде мемлекет есебінен бакалавриат. Тізімдегі ЖОО-ға өзіңіз шартсыз түсесіз; стипендия оқуды, тұруды, жолды және визаны төлейді. Бітірген соң – Қазақстанда өтеу.',
    en: "A bachelor's degree abroad paid by the state, for medallists of international olympiads and contests. You get an unconditional place at a listed university on your own; the scholarship pays for tuition, housing, travel and the visa. After graduating you complete the work-back in Kazakhstan.",
  },
  facts: [
    { value: '3', caption: { ru: 'года – срок давности диплома олимпиады или конкурса', kk: 'жыл – олимпиада не конкурс дипломының ескіру мерзімі', en: 'years – how recent the olympiad or contest diploma must be' }, source: 'pp573' },
    { value: 'B1', caption: { ru: 'казахский – единственный языковой сертификат в пакете', kk: 'қазақ тілі – топтамадағы жалғыз тілдік сертификат', en: 'Kazakh – the only language certificate in the package' }, source: 'pravila' },
    { value: '500', caption: { ru: 'слов – предел мотивационного письма', kk: 'сөз – мотивациялық хаттың шегі', en: 'words – the cap on the motivation letter' }, source: 'pravila' },
    { value: '5 / 3', caption: { ru: 'лет отработки в больших городах / в регионах', kk: 'жыл өтеу: ірі қалаларда / өңірлерде', en: 'years of work-back in the big cities / in the regions' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'За последние 3 года вы получили диплом I, II или III степени международной олимпиады по школьному предмету, конкурса научных проектов или конкурса исполнителей.', kk: 'Соңғы 3 жылда мектеп пәні бойынша халықаралық олимпиаданың, ғылыми жобалар не орындаушылар конкурсының I, II не III дәрежелі дипломын алдыңыз.', en: 'In the last 3 years you won a 1st, 2nd or 3rd place diploma at an international school-subject olympiad, a research-project contest or a performers competition.' },
    { ru: 'У вас есть аттестат о среднем образовании или диплом колледжа.', kk: 'Сізде орта білім аттестаты не колледж дипломы бар.', en: 'You hold a school-leaving certificate or a college diploma.' },
    { ru: 'Вы готовы поступить без условий в вуз из Списка на специальность по предмету олимпиады.', kk: 'Тізімдегі ЖОО-ға олимпиада пәні бойынша мамандыққа шартсыз түсуге дайынсыз.', en: 'You are ready to get an unconditional place at a listed university in your olympiad subject.' },
  ],
  fitNo: [
    { text: { ru: 'Диплом бакалавра у вас уже есть.', kk: 'Сізде бакалавр дипломы бар.', en: "You already have a bachelor's degree." }, go: 'master' },
    { text: { ru: 'Вы работаете и хотите поехать на срок до 12 месяцев за опытом, а не за дипломом.', kk: 'Жұмыс істейсіз және диплом үшін емес, тәжірибе үшін 12 айға дейін барғыңыз келеді.', en: 'You work and want to go abroad for up to 12 months for experience, not a degree.' }, go: 'internship' },
  ],
  fitSources: ['pp573', 'pravila', 'olympiads'],
  coverage: ACADEMIC_COVERAGE,
  coverageSource: 'pp573',
  coverageNote: FREE_TUITION_NOTE,
}
