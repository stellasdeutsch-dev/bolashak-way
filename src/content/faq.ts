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
  {
    id: 'off-08',
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
    stage: 'category',
    status: 'official',
    q: { ru: 'Чем подтверждается трудовой стаж?', kk: 'Еңбек өтілі немен расталады?', en: 'How is work experience proven?' },
    a: {
      ru: 'Документами о трудовой деятельности и выпиской о перечисленных обязательных пенсионных взносах за требуемый период — они подтягиваются из государственных информационных систем через портал. Для стажировок период считается с учётом оплачиваемого ежегодного трудового отпуска. Освобождённые от уплаты взносов по пункту 3 статьи 248 Социального кодекса — исключение.',
      kk: 'Еңбек қызметін растайтын құжаттармен және талап етілетін кезеңдегі міндетті зейнетақы жарналары туралы үзінді көшірмемен — олар портал арқылы мемлекеттік ақпараттық жүйелерден алынады. Тағылымдамалар үшін кезең жыл сайынғы ақылы еңбек демалысы ескеріле есептеледі.',
      en: 'By employment documents and a statement of mandatory pension contributions for the required period — both pulled from state information systems through the portal. For internships the period counts paid annual leave in. Those exempt from contributions under article 248(3) of the Social Code are an exception.',
    },
    source: 'pp573',
  },
  {
    id: 'off-10',
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
    stage: 'university',
    status: 'official',
    q: { ru: 'Что если нужный вуз или организация не входит в Список?', kk: 'Қажетті ЖОО не ұйым Тізімде болмаса ше?', en: 'What if the university or organisation is not on the list?' },
    a: {
      ru: 'Для академического обучения и стажировок по стипендии «Болашак» приглашение должно быть из организации, входящей в Список, утверждаемый рабочим органом. Отдельный порядок есть только у научных стажировок: если зарубежной организации нет в списке, рабочий орган рассматривает материалы претендента в индивидуальном порядке в течение 10 рабочих дней со дня приёма документов.',
      kk: 'Академиялық оқу мен тағылымдамалар үшін шақыру жұмыс органы бекіткен Тізімге кіретін ұйымнан болуы тиіс. Жеке тәртіп тек ғылыми тағылымдамаларда: ұйым тізімде болмаса, жұмыс органы материалдарды 10 жұмыс күні ішінде жеке қарайды.',
      en: 'For Bolashak study and internships the invitation must come from an organisation on the list approved by the working body. Only scientific internships have a separate route: if the foreign organisation is not listed, the working body reviews the case individually within 10 working days of the documents being accepted.',
    },
    source: 'pp791',
  },
  {
    id: 'off-12',
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
    stage: 'kazakh',
    status: 'official',
    q: { ru: 'Нужен ли сертификат по казахскому языку, если я подаю на англоязычную программу?', kk: 'Ағылшын тілді бағдарламаға тапсырсам, қазақ тілі сертификаты керек пе?', en: 'Do I need a Kazakh certificate for an English-taught programme?' },
    a: {
      ru: 'Да. Уровень знания государственного языка входит в условия участия для всех категорий — и для магистратуры, и для докторантуры и резидентуры, и для стажировок, независимо от языка обучения за рубежом. Минимальный уровень утверждается рабочим органом, сертификат должен быть действительным на момент подачи.',
      kk: 'Иә. Мемлекеттік тілді білу деңгейі барлық санаттар үшін қатысу шарттарына кіреді — шетелдегі оқу тіліне қарамастан. Ең төменгі деңгейді жұмыс органы бекітеді, сертификат тапсыру сәтінде жарамды болуы тиіс.',
      en: 'Yes. The state-language level is part of the participation conditions for every category — master\'s, doctoral, residency and internships — whatever the language of instruction abroad. The minimum level is set by the working body and the certificate must be valid when you apply.',
    },
    source: 'pp573',
  },
  {
    id: 'off-16',
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
    stage: 'return',
    status: 'official',
    q: { ru: 'Что делать сразу после завершения обучения?', kk: 'Оқуды аяқтағаннан кейін бірден не істеу керек?', en: 'What do I do right after finishing my studies?' },
    a: {
      ru: 'В течение 30 дней со дня завершения обучения вернуться в Казахстан для трудовой отработки. Затем направить куратору заявление о завершении обучения, предоставить нотариально заверенные переводы диплома и транскрипта за весь период обучения на казахский или русский язык и показать отметку в паспорте о возвращении. Стипендиаты стажировок дополнительно сдают отчёт о результатах и итоговый отзыв руководителя.',
      kk: 'Оқу аяқталған күннен бастап 30 күн ішінде Қазақстанға оралу қажет. Содан соң кураторға оқудың аяқталғаны туралы өтініш, диплом мен транскрипттің нотариат куәландырған аудармаларын беру және паспорттағы оралу белгісін көрсету керек. Тағылымдамадан өткендер қосымша есеп пен жетекшінің пікірін тапсырады.',
      en: 'Return to Kazakhstan within 30 days of finishing, to begin the work-back. Then send your curator the completion application, notarised translations of the diploma and full transcript into Kazakh or Russian, and show the re-entry stamp in your passport. Internship holders additionally submit a results report and their supervisor\'s final review.',
    },
    source: 'stipendiat_master',
  },
  {
    id: 'off-20',
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
  return tr ? { ...item, q: { ...item.q, ...tr.q }, a: { ...item.a, ...tr.a } } : item
})

export const FAQ: FaqItem[] = [...OFFICIAL_FAQ, ...TRANSLATED_FAQ]

export const faqForStage = (stage: string): FaqItem[] =>
  FAQ.filter((f) => f.stage === stage).sort((a, b) => {
    if (a.status === 'official' && b.status !== 'official') return -1
    if (b.status === 'official' && a.status !== 'official') return 1
    return (b.frequency ?? 0) - (a.frequency ?? 0)
  })
