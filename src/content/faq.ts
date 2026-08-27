import type { FaqItem } from './types'
import { GENERATED_FAQ } from './faq.generated'
import { FAQ_TRANSLATIONS } from './faq.i18n'

/**
 * FAQ shown on stage screens. Two origins:
 *  - OFFICIAL_FAQ — facts taken from official documents;
 *  - GENERATED_FAQ — administration answers collected in applicant chats (see scripts/import-faq.mjs),
 *    each carrying a verification status so unconfirmed practice is never shown as a rule.
 */
export const OFFICIAL_FAQ: FaqItem[] = [
  {
    id: 'off-01',
    stage: 'eligibility',
    status: 'official',
    q: { ru: 'Можно ли получить стипендию во второй раз?', kk: 'Стипендияны екінші рет алуға бола ма?', en: 'Can the scholarship be awarded twice?' },
    a: {
      ru: 'Стипендия присуждается однократно: на прохождение стажировки и на получение каждой степени — бакалавр, магистр, PhD, доктор по профилю, обучение в резидентуре. Исключение — лица, не воспользовавшиеся ранее присуждённой стипендией и не приступившие к обучению или стажировке, при отсутствии задолженности перед администратором: им даётся повторная однократная возможность участия.',
      kk: 'Стипендия бір рет беріледі: тағылымдамаға және әр дәрежеге. Ерекшелік — бұрын берілген стипендияны пайдаланбағандар, берешегі болмаса, бір рет қайта қатыса алады.',
      en: 'The scholarship is awarded once: for an internship and for each degree. The exception is those who never used a previously awarded scholarship and never started, provided they owe the administrator nothing — they get one repeat chance.',
    },
    source: 'pp573',
  },
  {
    id: 'off-02',
    stage: 'eligibility',
    status: 'official',
    q: { ru: 'Есть ли ограничение по возрасту?', kk: 'Жас шектеуі бар ма?', en: 'Is there an age limit?' },
    a: {
      ru: 'Прямого предельного возраста в Правилах нет. Ограничение сформулировано иначе: совокупные сроки языковых курсов, обучения или стажировки и последующей отработки не должны выходить за пределы общеустановленного пенсионного возраста на момент подачи документов.',
      kk: 'Қағидаларда нақты жас шегі жоқ. Шектеу былай: тіл курстары, оқу не тағылымдама және өтеу мерзімдерінің жиынтығы құжат тапсыру кезіндегі зейнеткерлік жастан аспауы керек.',
      en: 'The rules set no explicit age cap. Instead, the combined duration of language courses, study or internship and the subsequent work-back must fit within the statutory retirement age as of the application date.',
    },
    source: 'pp573',
  },
  {
    id: 'off-03',
    stage: 'foreign',
    status: 'official',
    q: { ru: 'Что значит первый, второй и третий пороговый уровень языка?', kk: 'Бірінші, екінші, үшінші шекті деңгей дегеніміз не?', en: 'What do the first, second and third language thresholds mean?' },
    a: {
      ru: 'Первый пороговый уровень — для направления на языковые курсы в Казахстане либо за рубежом (кроме английского языка). Второй — для направления на языковые курсы за рубежом. Третий — для направления сразу на академическое обучение или прохождение стажировки.',
      kk: 'Бірінші шек — Қазақстанда не шетелде тіл курстарына жіберу үшін (ағылшыннан басқа). Екінші — шетелдегі тіл курстарына. Үшінші — бірден академиялық оқуға не тағылымдамаға.',
      en: 'Level I sends you to language courses in Kazakhstan or abroad (except English), level II to language courses abroad, and level III straight to academic study or an internship.',
    },
    source: 'prikaz318',
  },
  {
    id: 'off-04',
    stage: 'contract',
    status: 'official',
    q: { ru: 'Что будет, если не заключить договор в срок?', kk: 'Шартты мерзімінде жасамаса не болады?', en: 'What happens if the contract is not signed in time?' },
    a: {
      ru: 'При незаключении договора в установленный срок рабочий орган инициирует рассмотрение Республиканской комиссией вопроса о лишении победителя стипендии «Болашак». В случае лишения расходы, затраченные со дня присуждения, включая неустойку, подлежат возмещению.',
      kk: 'Шарт мерзімінде жасалмаса, жұмыс органы стипендиядан айыру мәселесін комиссияға енгізеді. Айырылған жағдайда шығыстар өтеледі.',
      en: 'If the contract is not signed in time, the working body asks the Republican Commission to withdraw the scholarship. On withdrawal, costs incurred since the award — penalty included — must be repaid.',
    },
    source: 'pp573',
  },
  {
    id: 'off-05',
    stage: 'workback',
    status: 'official',
    q: { ru: 'Сколько лет нужно отработать?', kk: 'Қанша жыл өтеу керек?', en: 'How many years must be worked back?' },
    a: {
      ru: 'Не менее 5 лет — в столице или городе республиканского значения; не менее 3 лет — в городах (областных центрах), городах областного, районного значения и иных районах областей; не менее 3 лет для государственных служащих (первый год — в направившем органе) и для стажировок — у работодателя, направившего по заявке. Срок сокращается на один календарный год при полном бесплатном обучении и соблюдении успеваемости по договору.',
      kk: 'Кемінде 5 жыл — астанада не республикалық маңызы бар қалада; кемінде 3 жыл — өңірлерде; мемлекеттік қызметшілер мен тағылымдамашыларға — 3 жыл. Толық тегін оқу кезінде мерзім бір жылға қысқарады.',
      en: 'At least 5 years in the capital or a city of republican status; at least 3 years in regional centres and other districts; at least 3 years for civil servants (first year in the sending body) and for internships at the requesting employer. The term shrinks by one calendar year if the entire programme was free of charge.',
    },
    source: 'pp573',
  },
  {
    id: 'off-06',
    stage: 'commission',
    status: 'official',
    q: { ru: 'Можно ли участвовать повторно, если отказали?', kk: 'Бас тартылса, қайта қатысуға бола ма?', en: 'Can I reapply after a refusal?' },
    a: {
      ru: 'Претенденты, которым отказано решением Республиканской комиссии, к повторному участию в конкурсе текущего года не допускаются. Участвовать можно в следующем конкурсном году. Кроме того, при выявлении недостоверных документов претендент исключается и не допускается к конкурсу в текущем году.',
      kk: 'Комиссия шешімімен бас тартылған үміткерлер ағымдағы жылы қайта қатыса алмайды. Келесі конкурс жылында қатысуға болады.',
      en: 'Applicants refused by the Republican Commission cannot re-enter the same year\'s competition; they may apply in the next competition year. Submitting false documents also excludes an applicant for the current year.',
    },
    source: 'pp791',
  },
  {
    id: 'off-07',
    stage: 'departure',
    status: 'official',
    q: { ru: 'Какие расходы покрывает стипендия?', kk: 'Стипендия қандай шығыстарды жабады?', en: 'Which expenses does the scholarship cover?' },
    a: {
      ru: 'Оформление и продление визы, подача не более 5 аппликационных форм, регистрация в уполномоченных органах, языковые курсы по решению комиссии, само обучение или стажировка, обязательные услуги вуза, проживание и питание, учебная литература, обязательное медицинское обследование, медицинская страховка, выпуск и обслуживание банковской карты, транскрипты и проезд к месту обучения и обратно.',
      kk: 'Виза рәсімдеу, 5-ке дейін өтінім нысаны, тіркеу, комиссия шешімі бойынша тіл курстары, оқу не тағылымдама, тұру мен тамақтану, оқу әдебиеті, медициналық тексеру мен сақтандыру, банк картасы, жол жүру.',
      en: 'Visa processing and renewal, up to 5 application forms, registration with host authorities, language courses where the commission decides, the study or internship itself, mandatory university services, accommodation and meals, study literature, medical examination and insurance, bank card issuance, transcripts and travel to and from the place of study.',
    },
    source: 'pp573',
  },
]

/** Chat-sourced entries are Russian-only until the overlay supplies kk/en. */
const TRANSLATED_FAQ: FaqItem[] = GENERATED_FAQ.map((item) => {
  const tr = FAQ_TRANSLATIONS[item.id]
  return tr ? { ...item, q: { ...item.q, ...tr.q }, a: { ...item.a, ...tr.a } } : item
})

export const FAQ: FaqItem[] = [...OFFICIAL_FAQ, ...TRANSLATED_FAQ]

export const faqForStage = (stage: string): FaqItem[] =>
  FAQ.filter((f) => f.stage === stage).sort((a, b) => {
    if (a.status === 'official' && b.status !== 'official') return -1
    if (b.status === 'official' && a.status !== 'official') return 1
    return (b.frequency ?? 0) - (a.frequency ?? 0)
  })
