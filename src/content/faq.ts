import type { FaqItem, Track } from './types'
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
    id: 'off-02s',
    tracks: ['science_internship'],
    stage: 'eligibility',
    status: 'official',
    q: { ru: 'Есть ли ограничение по возрасту?', kk: 'Жас шектеуі бар ма?', en: 'Is there an age limit?' },
    a: {
      ru: 'Прямого предельного возраста нет. Требование другое: научная стажировка вместе с последующей отработкой должна укладываться в сроки с учётом статьи 207 Социального кодекса — то есть до пенсионного возраста.',
      kk: 'Тікелей жас шегі жоқ. Талап басқа: ғылыми тағылымдама кейінгі өтеумен бірге Әлеуметтік кодекстің 207-бабын ескере отырып — яғни зейнеткерлік жасқа дейін сыюы керек.',
      en: 'There is no age limit as such. The requirement is different: the internship plus the work-back after it must fit the terms set by article 207 of the Social Code — that is, before retirement age.',
    },
    source: 'ns_requirements',
  },
  {
    id: 'off-15s',
    tracks: ['science_internship'],
    stage: 'kazakh',
    status: 'official',
    q: { ru: 'Нужен ли сертификат по казахскому языку?', kk: 'Қазақ тілі сертификаты керек пе?', en: 'Do I need a Kazakh certificate?' },
    a: {
      ru: 'Да. Минимальный уровень государственного языка для научной стажировки — B1: сертификат КАЗТЕСТ или Qazaq Resmi Test с ID-номером и QR-кодом. В пакет идут оригинал и копия.',
      kk: 'Иә. Ғылыми тағылымдамаға мемлекеттік тілдің ең төменгі деңгейі — B1: ID нөмірі мен QR-коды бар ҚАЗТЕСТ не Qazaq Resmi Test сертификаты. Топтамаға түпнұсқа мен көшірме беріледі.',
      en: 'Yes. The minimum state-language level for a scientific internship is B1: a KAZTEST or Qazaq Resmi Test certificate with an ID number and QR code. The original and a copy go in the package.',
    },
    source: 'ns_minscore',
  },
  {
    id: 'off-05a',
    tracks: ['internship'],
    stage: 'workback',
    status: 'official',
    q: { ru: 'Сколько лет нужно отработать после стажировки?', kk: 'Тағылымдамадан кейін қанша жыл өтеу керек?', en: 'How long is the work-back after an internship?' },
    a: {
      ru: 'Не менее 3 лет в организации, которая направила вас по заявке, — или в её филиале либо представительстве в Казахстане. В другой организации — только с согласия работодателя; работникам атомной отрасли — по его направлению.',
      kk: 'Сізді өтініммен жіберген ұйымда — не оның Қазақстандағы филиалында, өкілдігінде — кемінде 3 жыл. Басқа ұйымда — тек жұмыс берушінің келісімімен; атом саласының қызметкерлеріне — оның жолдамасымен.',
      en: 'At least 3 years at the organisation that sent you — or its branch or office in Kazakhstan. Elsewhere only with your employer\'s consent; nuclear-industry workers only where the employer sends them.',
    },
    source: 'pp573',
  },
  {
    id: 'off-05s',
    tracks: ['science_internship'],
    stage: 'workback',
    status: 'official',
    q: { ru: 'Сколько лет нужно отработать после научной стажировки?', kk: 'Ғылыми тағылымдамадан кейін қанша жыл өтеу керек?', en: 'How long is the work-back after a scientific internship?' },
    a: {
      ru: 'Не менее 3 лет непрерывно у работодателя, по заявке которого вы проходили стажировку, по выбранному направлению исследования. Сменить работодателя можно при его ликвидации или реорганизации — либо по вашему обращению: в другой аккредитованной научной организации, с сохранением направления исследования, с согласия работодателя и по решению Комиссии.',
      kk: 'Өтінімі бойынша тағылымдамадан өткен жұмыс берушіде таңдаған зерттеу бағыты бойынша кемінде 3 жыл үздіксіз. Жұмыс берушіні ол таратылса не қайта ұйымдастырылса ауыстыруға болады — не өз өтінішіңізбен: басқа аккредиттелген ғылыми ұйымда, зерттеу бағытын сақтап, жұмыс берушінің келісімімен және Комиссия шешімімен.',
      en: 'At least 3 continuous years in your research direction with the employer whose request sent you. You can change employer if it is liquidated or reorganised — or at your own request: to another accredited research organisation, keeping your research direction, with your employer\'s consent and by the Commission\'s decision.',
    },
    source: 'ns_rules422',
  },
  {
    id: 'off-06s',
    tracks: ['science_internship'],
    stage: 'commission',
    status: 'official',
    q: { ru: 'Можно ли участвовать повторно, если отказали?', kk: 'Бас тартылса, қайта қатысуға бола ма?', en: 'Can I reapply after a refusal?' },
    a: {
      ru: 'Да, даже в этом году: тем, кому отказала Республиканская комиссия, разрешено снова участвовать в конкурсе текущего года, пока идёт приём документов, — при условии, что на стажировку вы выедете в следующем календарном году. Исключение — заведомо ложные сведения: с ними к конкурсу этого года не допустят.',
      kk: 'Иә, тіпті биыл да: Республикалық комиссия бас тартқандарға құжат қабылдау жүріп жатқанда ағымдағы жылғы конкурсқа қайта қатысуға рұқсат етіледі — тағылымдамаға келесі күнтізбелік жылы шығу шартымен. Ерекшелік — көрінеу жалған мәлімет: онымен биылғы конкурсқа жібермейді.',
      en: 'Yes, even this year: applicants the Republican Commission refused may take part again in the current year\'s competition while the intake is open — provided they leave for the internship in the next calendar year. The exception is knowingly false information: with it you are barred from this year\'s competition.',
    },
    source: 'ns_rules422',
  },
  {
    id: 'off-07a',
    tracks: ['bachelor', 'phd_residency'],
    stage: 'departure',
    status: 'official',
    q: { ru: 'Какие расходы покрывает стипендия?', kk: 'Стипендия қандай шығыстарды жабады?', en: 'Which expenses does the scholarship cover?' },
    a: {
      ru: 'Оформление и продление визы, подача не более 5 анкет в вузы, регистрация в стране обучения, само обучение, обязательные услуги вуза, проживание и питание, учебная литература, медобследование и страховка, банковская карта, транскрипты и проезд к месту учёбы и обратно.',
      kk: 'Визаны рәсімдеу және ұзарту, ЖОО-ға 5-ке дейін анкета беру, оқу елінде тіркелу, оқудың өзі, ЖОО-ның міндетті қызметтері, тұру мен тамақ, оқу әдебиеті, медициналық тексеру мен сақтандыру, банк картасы, транскрипттер және оқу орнына барып-қайту.',
      en: 'Visa and renewals, up to 5 university applications, registration in the host country, tuition itself, mandatory university services, housing and meals, textbooks, medical checks and insurance, a bank card, transcripts and travel to and from the place of study.',
    },
    source: 'pp573',
  },
  {
    id: 'off-07i',
    tracks: ['internship'],
    stage: 'departure',
    status: 'official',
    q: { ru: 'Какие расходы покрывает стипендия на стажировку?', kk: 'Тағылымдамаға стипендия қандай шығыстарды жабады?', en: 'Which expenses does the internship scholarship cover?' },
    a: {
      ru: 'Стоимость стажировки, обязательные услуги принимающей организации, проживание и питание, визу и консульский сбор, регистрацию в стране, медобследование и страховку, банковскую карту, проезд к месту стажировки и обратно.',
      kk: 'Тағылымдама құнын, қабылдаушы ұйымның міндетті қызметтерін, тұру мен тамақты, виза мен консулдық алымды, елде тіркелуді, медициналық тексеру мен сақтандыруды, банк картасын, тағылымдама орнына барып-қайтуды.',
      en: 'The internship fee, mandatory host services, housing and meals, the visa and consular fee, registration in the country, medical checks and insurance, a bank card, and travel to the internship and back.',
    },
    source: 'pp573',
  },
  {
    id: 'off-07s',
    tracks: ['science_internship'],
    stage: 'departure',
    status: 'official',
    q: { ru: 'Что оплачивает программа научных стажировок?', kk: 'Ғылыми тағылымдама бағдарламасы нені төлейді?', en: 'What does the scientific-internship programme pay for?' },
    a: {
      ru: 'Визу и её продление, саму стажировку, обязательные услуги по требованию страны и принимающей организации, проживание, питание и научную литературу по нормам приложения 3 к Правилам, медобследование и страховку, проезд от дома до места стажировки и обратно.',
      kk: 'Виза мен оны ұзартуды, тағылымдаманың өзін, ел мен қабылдаушы ұйым талап ететін міндетті қызметтерді, Қағидалардың 3-қосымшасындағы нормалар бойынша тұру, тамақ және ғылыми әдебиетті, медициналық тексеру мен сақтандыруды, үйден тағылымдама орнына барып-қайтуды.',
      en: 'The visa and renewals, the internship itself, mandatory services the country and host require, housing, meals and research literature at the rates in Appendix 3 to the Rules, medical checks and insurance, and travel from home to the host and back.',
    },
    source: 'ns_rules422',
  },
  {
    id: 'off-11i',
    tracks: ['internship'],
    stage: 'university',
    status: 'official',
    q: { ru: 'Есть ли список организаций для стажировки?', kk: 'Тағылымдамаға ұйымдар тізімі бар ма?', en: 'Is there a list of host organisations for internships?' },
    a: {
      ru: 'Отдельного списка нет. Правила допускают стажировку в зарубежных организациях на базе вузов из Списка, в признанных мировых научно-исследовательских центрах, научных организациях, отраслевых организациях и на производстве — сроком до 12 месяцев.',
      kk: 'Жеке тізім жоқ. Қағида тағылымдаманы Тізімдегі ЖОО базасындағы шетелдік ұйымдарда, танылған әлемдік ғылыми-зерттеу орталықтарында, ғылыми ұйымдарда, салалық ұйымдарда және өндірісте — 12 айға дейін өтуге рұқсат етеді.',
      en: 'There is no separate list. The rules allow internships at foreign organisations based at listed universities, recognised world research centres, research organisations, industry organisations and production sites — for up to 12 months.',
    },
    source: 'pp573',
  },
  {
    id: 'off-11s',
    tracks: ['science_internship'],
    stage: 'university',
    status: 'official',
    q: { ru: 'Что если организации нет в списке научных стажировок?', kk: 'Ұйым ғылыми тағылымдама тізімінде болмаса ше?', en: 'What if my host is not on the scientific-internship list?' },
    a: {
      ru: 'Тогда приглашение не подойдёт. Действующие правила требуют безусловного приглашения именно от организации, входящей в список, — порядка индивидуального рассмотрения организаций вне списка в них нет. Список утверждают на год: вузы из топ-100 QS по предмету, научные центры из первой 1000 SCImago, а также организации, с которыми у министерства есть соглашения или меморандумы; для направления «Национальная безопасность и оборона, биологическая безопасность» эти рейтинговые пороги не применяются.',
      kk: 'Онда шақыру жарамайды. Қолданыстағы қағидалар сөзсіз шақыруды дәл тізімге кіретін ұйымнан талап етеді — тізімнен тыс ұйымдарды жеке қарау тәртібі оларда жоқ. Тізім бір жылға бекітіледі: пән бойынша QS топ-100 ЖОО-лары, SCImago алғашқы 1000-ындағы ғылыми орталықтар сондай-ақ министрлікпен келісімі не меморандумы бар ұйымдар; «Ұлттық қауіпсіздік және қорғаныс, биологиялық қауіпсіздік» бағыты үшін бұл рейтинг шектері қолданылмайды.',
      en: 'Then the invitation will not do. The current rules require an unconditional invitation from an organisation on the list — they have no procedure for considering hosts off the list individually. The list is approved for one year: universities in the QS top 100 by subject, research centres in the SCImago top 1,000, and organisations that have agreements or memoranda with the ministry; for the "National security and defence, biological security" direction the ranking thresholds do not apply.',
    },
    source: 'ns_rules422',
  },
  {
    id: 'off-01',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
    stage: 'eligibility',
    status: 'official',
    q: { ru: 'Можно ли получить стипендию во второй раз?', kk: 'Стипендияны екінші рет алуға бола ма?', en: 'Can the scholarship be awarded twice?' },
    a: {
      ru: 'Стипендию на одну и ту же программу присуждают один раз. Повторная однократная возможность есть только у тех, кто не воспользовался прошлой стипендией, не приступил к ней и не имеет задолженности перед администратором.',
      kk: 'Бір бағдарламаға стипендия бір рет беріледі. Бір рет қайта қатысу мүмкіндігі тек бұрынғы стипендияны пайдаланбаған, оған кіріспеген және әкімші алдында берешегі жоқтарға беріледі.',
      en: 'The scholarship for the same programme is awarded once. A single repeat chance goes only to those who never used the earlier award, never started it and owe the administrator nothing.',
    },
    source: 'pp573',
  },
  {
    id: 'off-02',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
    stage: 'eligibility',
    status: 'official',
    q: { ru: 'Есть ли ограничение по возрасту?', kk: 'Жас шектеуі бар ма?', en: 'Is there an age limit?' },
    a: {
      ru: 'Прямого предельного возраста в правилах нет. Ограничение другое: вся программа вместе с последующей отработкой должна укладываться до пенсионного возраста на момент подачи документов.',
      kk: 'Қағидада тікелей жас шегі жоқ. Шектеу басқа: бүкіл бағдарлама кейінгі өтеумен бірге құжат тапсырған сәттегі зейнеткерлік жасқа дейін сыюы керек.',
      en: 'The rules set no age limit as such. The limit is different: the whole programme plus the work-back after it must fit before retirement age as of the day you apply.',
    },
    source: 'pp573',
  },
  {
    id: 'off-03',
    tracks: ['master'],
    stage: 'foreign',
    status: 'official',
    q: { ru: 'Что значит первый, второй и третий пороговый уровень языка?', kk: 'Бірінші, екінші, үшінші шекті деңгей дегеніміз не?', en: 'What do the first, second and third language thresholds mean?' },
    a: {
      ru: 'Первый пороговый уровень — для направления на языковые курсы в Казахстане либо за рубежом (кроме английского языка). Второй — для направления на языковые курсы за рубежом. Третий — для направления сразу на учёбу.',
      kk: 'Бірінші шек — Қазақстанда не шетелде тіл курстарына жіберу үшін (ағылшыннан басқа). Екінші — шетелдегі тіл курстарына. Үшінші — бірден оқуға.',
      en: 'Level I sends you to language courses in Kazakhstan or abroad (except English), level II to language courses abroad, and level III straight to study.',
    },
    source: 'prikaz318',
  },
  {
    id: 'off-04',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
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
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'workback',
    status: 'official',
    q: { ru: 'Сколько лет нужно отработать?', kk: 'Қанша жыл өтеу керек?', en: 'How many years must be worked back?' },
    a: {
      ru: 'Не менее 5 лет — в Астане, Алматы или Шымкенте; не менее 3 лет — в областных центрах, городах и районах областей. Госслужащим — не менее 3 лет на госслужбе, первый год — в направившем органе; работникам атомной отрасли — не менее 3 лет у работодателя. Срок сокращается на год, если всё обучение было бесплатным, а успеваемость по договору выдержана.',
      kk: 'Астанада, Алматыда не Шымкентте — кемінде 5 жыл; облыс орталықтарында, облыстың қалалары мен аудандарында — кемінде 3 жыл. Мемқызметшілерге — мемқызметте кемінде 3 жыл, бірінші жылы — жіберген органда; атом саласының қызметкерлеріне — жұмыс берушіде кемінде 3 жыл. Бүкіл оқу тегін болып, шарттағы үлгерім сақталса, мерзім бір жылға қысқарады.',
      en: 'At least 5 years in Astana, Almaty or Shymkent; at least 3 in regional centres, towns and districts. Civil servants owe at least 3 years in public service, the first at the sending body; nuclear-industry workers at least 3 years with their employer. The term drops by a year if the whole programme was free and the contractual grades were kept.',
    },
    source: 'pp573',
  },
  {
    id: 'off-06',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
    stage: 'commission',
    status: 'official',
    q: { ru: 'Можно ли участвовать повторно, если отказали?', kk: 'Бас тартылса, қайта қатысуға бола ма?', en: 'Can I reapply after a refusal?' },
    a: {
      ru: 'Претенденты, которым отказано решением Республиканской комиссии, к повторному участию в конкурсе текущего года не допускаются. Участвовать можно в следующем конкурсном году. Кроме того, при выявлении недостоверных документов претендент исключается и не допускается к конкурсу в текущем году.',
      kk: 'Комиссия шешімімен бас тартылған үміткерлер ағымдағы жылы қайта қатыса алмайды. Келесі конкурс жылында қатысуға болады.',
      en: 'Applicants refused by the Republican Commission cannot re-enter the same year\'s competition; they may apply in the next competition year. Submitting false documents also excludes an applicant for the current year.',
    },
    source: 'pp573',
  },
  {
    id: 'off-07',
    tracks: ['master'],
    stage: 'departure',
    status: 'official',
    q: { ru: 'Какие расходы покрывает стипендия?', kk: 'Стипендия қандай шығыстарды жабады?', en: 'Which expenses does the scholarship cover?' },
    a: {
      ru: 'Оформление и продление визы, подача не более 5 анкет в вузы, регистрация в стране обучения, языковые курсы с контрольными тестами — по решению комиссии, само обучение, обязательные услуги вуза, проживание и питание, учебная литература, медобследование и страховка, банковская карта, транскрипты и проезд к месту учёбы и обратно.',
      kk: 'Визаны рәсімдеу және ұзарту, ЖОО-ға 5-ке дейін анкета беру, оқу елінде тіркелу, бақылау тестері бар тіл курстары — комиссия шешімімен, оқудың өзі, ЖОО-ның міндетті қызметтері, тұру мен тамақ, оқу әдебиеті, медициналық тексеру мен сақтандыру, банк картасы, транскрипттер және оқу орнына барып-қайту.',
      en: 'Visa and renewals, up to 5 university applications, registration in the host country, language courses with control tests — by the commission\'s decision, tuition itself, mandatory university services, housing and meals, textbooks, medical checks and insurance, a bank card, transcripts and travel to and from the place of study.',
    },
    source: 'pp573',
  },
  {
    id: 'off-08',
    tracks: ['master', 'phd_residency'],
    stage: 'category',
    // The Rules never forbid this outright; the answer is drawn from how the
    // per-category conditions and document lists are written, so it is not a direct norm.
    status: 'partial',
    q: { ru: 'Можно ли участвовать сразу по двум категориям?', kk: 'Бір мезгілде екі санат бойынша қатысуға бола ма?', en: 'Can I apply under two categories at once?' },
    a: {
      ru: 'Правила описывают участие по одной категории: от неё зависят и условия допуска, и перечень документов, и требования к языку и стажу. Если вы подходите под несколько категорий, выбирайте ту, чьим требованиям соответствуете полностью — по остальным пакет документов будет неполным, а это основание для отказа в приёме.',
      kk: 'Қағидалар бір санат бойынша қатысуды сипаттайды: одан жіберу шарттары да, құжаттар тізімі де, тіл мен өтілге қойылатын талаптар да тәуелді. Бірнеше санатқа сәйкес келсеңіз, талаптарына толық жауап беретінін таңдаңыз.',
      en: 'The rules describe applying under a single category: it determines the admission conditions, the document list and the language and experience requirements. If several fit, pick the one you fully satisfy — under the others your package would be incomplete, which is grounds for rejection.',
    },
    source: 'pp573',
  },
  {
    id: 'off-09',
    tracks: ['master', 'phd_residency', 'internship'],
    stage: 'category',
    status: 'official',
    q: { ru: 'Чем подтверждается трудовой стаж?', kk: 'Еңбек өтілі немен расталады?', en: 'How is work experience proven?' },
    a: {
      ru: 'Документами о трудовой деятельности и выпиской о перечисленных обязательных пенсионных взносах за требуемый период — они подтягиваются из государственных информационных систем через портал. Освобождённые от уплаты взносов по пункту 3 статьи 248 Социального кодекса — исключение.',
      kk: 'Еңбек қызметі туралы құжаттармен және талап етілетін кезеңдегі міндетті зейнетақы жарналары үзінді көшірмесімен — олар портал арқылы мемлекеттік ақпараттық жүйелерден тартылады. Әлеуметтік кодекстің 248-бабының 3-тармағы бойынша жарнадан босатылғандар — ерекшелік.',
      en: 'With employment documents and a statement of the mandatory pension contributions for the required period — pulled from state information systems through the portal. Those exempt from contributions under article 248(3) of the Social Code are the exception.',
    },
    source: 'pp573',
  },
  {
    id: 'off-10',
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'specialty',
    status: 'official',
    q: { ru: 'Что делать, если моей специальности нет в перечне?', kk: 'Мамандығым тізімде болмаса не істеу керек?', en: 'What if my specialty is not on the list?' },
    a: {
      ru: 'Стипендия присуждается в соответствии с перечнем приоритетных специальностей, который ежегодно утверждается рабочим органом на основе заявок государственных органов и прогноза потребности экономики в кадрах. Специальности вне перечня не финансируются. Перечень обновляется каждый конкурсный год — проверяйте актуальную редакцию.',
      kk: 'Стипендия жыл сайын бекітілетін басым мамандықтар тізбесіне сәйкес беріледі. Тізбеден тыс мамандықтар қаржыландырылмайды. Тізбе жыл сайын жаңарады — өзекті редакциясын тексеріңіз.',
      en: 'The scholarship follows the priority specialty list, approved annually by the working body from state bodies\' requests and the forecast demand for skills. Specialties outside the list are not funded. The list is renewed every competition year — check the current edition.',
    },
    source: 'pp573',
  },
  {
    id: 'off-11',
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'university',
    status: 'official',
    q: { ru: 'Что если нужный вуз или организация не входит в Список?', kk: 'Қажетті ЖОО не ұйым Тізімде болмаса ше?', en: 'What if the university or organisation is not on the list?' },
    a: {
      ru: 'Приглашение должно быть из вуза, который входит в Список на текущий год. Приглашение из вуза вне Списка права на стипендию не даёт, а сам Список утверждают заново каждый год.',
      kk: 'Шақыру ағымдағы жылғы Тізімге кіретін ЖОО-дан болуы керек. Тізімнен тыс ЖОО шақыруы стипендияға құқық бермейді, ал Тізімнің өзі жыл сайын қайта бекітіледі.',
      en: 'The offer has to come from a university on this year\'s list. An offer from outside it gives no right to the scholarship, and the list itself is re-approved every year.',
    },
    source: 'vuzy_page',
  },
  {
    id: 'off-12',
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'admission',
    status: 'official',
    q: { ru: 'Оплачивает ли стипендия подачу заявок в зарубежные вузы?', kk: 'Стипендия шетелдік ЖОО-ға өтінім беруді төлей ме?', en: 'Does the scholarship pay for applying to foreign universities?' },
    a: {
      ru: 'Да, но после присуждения: направления расходования стипендии включают оформление и подачу не более 5 анкетных форм в зарубежные высшие учебные заведения, а также оформление визы, регистрацию в уполномоченных органах принимающей страны и обязательные услуги по требованию вуза. Расходы до присуждения стипендия не покрывает.',
      kk: 'Иә, бірақ тағайындалғаннан кейін: жұмсау бағыттарына шетелдік ЖОО-ға 5-тен аспайтын анкеталық форманы ресімдеу мен беру, виза ресімдеу, қабылдаушы елдің органдарында тіркелу кіреді. Тағайындалғанға дейінгі шығыстар өтелмейді.',
      en: 'Yes, but only after the award: the spending directions cover preparing and submitting up to five application forms to foreign universities, visa processing, registration with the host country\'s authorities and services the university requires. Costs incurred before the award are not covered.',
    },
    source: 'pp573',
  },
  {
    id: 'off-13',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
    stage: 'documents',
    status: 'official',
    q: { ru: 'Что будет, если подать неполный пакет документов?', kk: 'Толық емес құжаттар топтамасын тапсырсам не болады?', en: 'What happens if my document package is incomplete?' },
    a: {
      ru: 'При представлении неполного пакета претендент устраняет нарушения и повторно подаёт документы в период срока приёма — то есть шанс исправиться есть, но только пока приём открыт. Отдельно и строже: при выявлении недостоверных документов или сведений на любом этапе претендент исключается из конкурсного отбора и не допускается к нему в текущем году.',
      kk: 'Толық емес топтама берілсе, бұзушылықтарды жойып, құжаттарды қабылдау мерзімі ішінде қайта тапсыруға болады. Ал жалған құжаттар не мәліметтер анықталса, үміткер конкурстан шығарылады және ағымдағы жылы жіберілмейді.',
      en: 'With an incomplete package you fix the gaps and resubmit while the intake window is still open. Far stricter: if false documents or data are found at any stage, the applicant is excluded from the competition and barred from it for the current year.',
    },
    source: 'pp573',
  },
  {
    id: 'off-14',
    tracks: ['bachelor', 'master'],
    stage: 'documents',
    status: 'official',
    q: { ru: 'Каким должно быть мотивационное письмо?', kk: 'Мотивациялық хат қандай болуы керек?', en: 'What should the motivation letter look like?' },
    a: {
      ru: 'Это эссе в свободной форме объёмом не более 500 слов на казахском или русском языке. В нём обосновывают выбранный вуз и его преимущества в данной области, необходимость получения стипендии, ожидаемые результаты обучения и то, как знания будут применяться на практике. В конце обязательны дата и подпись. Мотивационное письмо учитывается членами экспертной комиссии на собеседовании.',
      kk: 'Бұл — 500 сөзден аспайтын, қазақ не орыс тіліндегі еркін нысандағы эссе. Онда таңдалған ЖОО мен оның артықшылықтары, стипендияның қажеттігі, күтілетін нәтижелер және білімді практикада қолдану негізделеді. Соңында күні мен қолы міндетті.',
      en: 'A free-form essay of at most 500 words in Kazakh or Russian. It justifies the chosen university and its strengths in the field, why the scholarship is needed, the expected results and how the knowledge will be applied. A date and signature at the end are mandatory. The expert commission takes the letter into account at the interview.',
    },
    source: 'pravila',
  },
  {
    id: 'off-15',
    tracks: ['bachelor', 'master', 'phd_residency', 'internship'],
    stage: 'kazakh',
    status: 'official',
    q: { ru: 'Нужен ли сертификат по казахскому языку, если я подаю на англоязычную программу?', kk: 'Ағылшын тілді бағдарламаға тапсырсам, қазақ тілі сертификаты керек пе?', en: 'Do I need a Kazakh certificate for an English-taught programme?' },
    a: {
      ru: 'Да. Уровень государственного языка — условие участия для всех, независимо от того, на каком языке пройдёт программа за рубежом. Нужен действующий сертификат КАЗТЕСТ или Qazaq Resmi Test не ниже B1 на момент подачи.',
      kk: 'Иә. Мемлекеттік тіл деңгейі — шетелдегі бағдарлама қай тілде өтетініне қарамастан, барлығына қатысу шарты. Тапсыру сәтінде B1-ден төмен емес жарамды ҚАЗТЕСТ не Qazaq Resmi Test сертификаты керек.',
      en: 'Yes. The state-language level is a condition for everyone, whatever language the programme abroad runs in. You need a valid KAZTEST or Qazaq Resmi Test certificate at B1 or above when you apply.',
    },
    source: 'pp573',
  },
  {
    id: 'off-16',
    tracks: ['master'],
    stage: 'language_courses',
    status: 'official',
    q: { ru: 'Кому положены языковые курсы за счёт стипендии?', kk: 'Стипендия есебінен тіл курстары кімге тиесілі?', en: 'Who gets language courses paid by the scholarship?' },
    a: {
      ru: 'Решение о необходимости языковых курсов принимает Республиканская комиссия — для претендентов из сельских населённых пунктов, инженерно-технических и медицинских работников, государственных служащих и работников атомной отрасли, поступающих на степень магистра. Срок определяется таблицей продолжительности языковых курсов, утверждаемой рабочим органом.',
      kk: 'Тіл курстарының қажеттігі туралы шешімді Республикалық комиссия қабылдайды — ауылдық жерден келген үміткерлер, инженер-техник және медицина қызметкерлері, мемлекеттік қызметшілер мен атом саласы қызметкерлері үшін. Мерзімі жұмыс органы бекіткен кестемен айқындалады.',
      en: 'The Republican Commission decides on language courses for rural applicants, engineering and medical workers, civil servants and nuclear-industry workers heading for a master\'s degree. The duration follows the language-course table approved by the working body.',
    },
    source: 'pp573',
  },
  {
    id: 'off-17',
    tracks: ['master'],
    stage: 'language_courses',
    status: 'official',
    q: { ru: 'Что будет, если не сдать контрольный тест после языковых курсов?', kk: 'Тіл курстарынан кейінгі бақылау тестін тапсыра алмасам не болады?', en: 'What if I fail the control test after the language courses?' },
    a: {
      ru: 'После курсов в Казахстане сдаётся промежуточный тест. Если нужный уровень не достигнут, даётся однократная возможность пересдачи в течение 6 месяцев со дня непрохождения и за собственные средства. Если и промежуточный, и итоговый тест не сданы в установленные сроки, Республиканская комиссия лишает права на дальнейшие курсы и обучение, а расходы со дня присуждения подлежат возмещению. Тот, кто к моменту курсов получил безусловное зачисление в вуз из Списка, от итогового теста освобождается.',
      kk: 'Қазақстандағы курстардан кейін аралық тест тапсырылады. Деңгей жетпесе, 6 ай ішінде өз есебінен бір рет қайта тапсыруға болады. Екеуі де тапсырылмаса, комиссия одан әрі оқу құқығынан айырады, шығыстар өтеледі. Тізімдегі ЖОО-ға сөзсіз қабылданғандар қорытынды тесттен босатылады.',
      en: 'After the courses in Kazakhstan you sit an interim test. If the required level is not reached, you get one retake within six months, at your own expense. If neither the interim nor the final test is passed within the set terms, the Republican Commission withdraws the right to further courses and study, and costs since the award must be repaid. Anyone who already holds an unconditional offer from a listed university is exempt from the final test.',
    },
    source: 'pp573',
  },
  {
    id: 'off-18',
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'studying',
    status: 'official',
    q: { ru: 'Можно ли сменить вуз, специальность или взять академический отпуск?', kk: 'ЖОО-ны, мамандықты ауыстыруға не академиялық демалыс алуға бола ма?', en: 'Can I change university or specialty, or take academic leave?' },
    a: {
      ru: 'Такие изменения оформляются заявлениями по утверждённым формам через куратора: есть отдельные формы для смены вуза и страны с переносом сроков, для смены специальности или программы обучения, для академического отпуска и для продления срока обучения. Самостоятельно менять условия обучения нельзя — они закреплены договором.',
      kk: 'Мұндай өзгерістер куратор арқылы бекітілген нысандағы өтініштермен ресімделеді: ЖОО мен елді ауыстыруға, мамандықты ауыстыруға, академиялық демалысқа және оқу мерзімін ұзартуға жеке нысандар бар. Оқу шарттарын өз бетінше өзгертуге болмайды — олар шартпен бекітілген.',
      en: 'Such changes go through your curator on approved forms: there are separate ones for changing university and country with new dates, changing specialty or programme, academic leave and extending the study period. You cannot change the terms on your own — they are fixed by the contract.',
    },
    source: 'obrazcy',
  },
  {
    id: 'off-19',
    tracks: ['bachelor', 'master', 'phd_residency'],
    stage: 'return',
    status: 'official',
    q: { ru: 'Что делать сразу после завершения обучения?', kk: 'Оқуды аяқтағаннан кейін бірден не істеу керек?', en: 'What do I do right after finishing my studies?' },
    a: {
      ru: 'В течение 30 дней со дня завершения обучения вернуться в Казахстан для трудовой отработки. Затем направить куратору заявление о завершении обучения, нотариально заверенные переводы диплома и транскрипта за весь период обучения на казахский или русский язык и копию паспорта с отметкой о въезде.',
      kk: 'Оқу аяқталған күннен бастап 30 күн ішінде еңбек өтеуге Қазақстанға оралу. Содан кейін кураторға оқуды аяқтау туралы өтінішті, диплом мен бүкіл оқу кезеңіндегі транскрипттің қазақ не орыс тіліне нотариалды аудармасын және кіру белгісі бар паспорт көшірмесін жіберу.',
      en: 'Return to Kazakhstan within 30 days of finishing to start the work-back. Then send your curator the completion application, notarised Kazakh or Russian translations of your diploma and full transcript, and a passport copy with the entry stamp.',
    },
    source: 'stipendiat_master',
  },
  {
    id: 'off-20',
    tracks: ['master'],
    stage: 'admission_after_courses',
    status: 'official',
    q: { ru: 'Что если во время языковых курсов я уже получу приглашение из вуза?', kk: 'Тіл курстары кезінде ЖОО-дан шақыру алсам ше?', en: 'What if I get a university offer while still on the language courses?' },
    a: {
      ru: 'Победитель конкурсного отбора, получивший на момент прохождения языковых курсов документ о безусловном зачислении на академическое обучение в вуз из Списка, освобождается от сдачи итогового контрольного теста по иностранному языку.',
      kk: 'Тіл курстарынан өту кезінде Тізімдегі ЖОО-ға сөзсіз қабылдау туралы құжат алған жеңімпаз қорытынды бақылау тестін тапсырудан босатылады.',
      en: 'A winner who, while on the language courses, obtains an unconditional admission document from a listed university is exempt from the final foreign-language control test.',
    },
    source: 'pp573',
  },
]

/** Chat-sourced entries are Russian-only until the overlay supplies kk/en. */
const TRANSLATED_FAQ: FaqItem[] = GENERATED_FAQ.map((item) => {
  const tr = FAQ_TRANSLATIONS[item.id]
  // Collected in Bolashak applicant chats, so they speak for the four Bolashak programmes only.
  const tracks: Track[] = ['bachelor', 'master', 'phd_residency', 'internship']
  return tr ? { ...item, tracks, q: { ...item.q, ...tr.q }, a: { ...item.a, ...tr.a } } : { ...item, tracks }
})

export const FAQ: FaqItem[] = [...OFFICIAL_FAQ, ...TRANSLATED_FAQ]

/** Answers for one stage that hold on this platform; untagged answers hold everywhere. */
export const faqForStage = (stage: string, track?: Track): FaqItem[] =>
  FAQ.filter((f) => f.stage === stage && (!track || !f.tracks || f.tracks.includes(track))).sort((a, b) => {
    if (a.status === 'official' && b.status !== 'official') return -1
    if (b.status === 'official' && a.status !== 'official') return 1
    return (b.frequency ?? 0) - (a.frequency ?? 0)
  })
