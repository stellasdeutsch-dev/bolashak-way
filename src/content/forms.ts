import type { DocId, L, Rule, SourceId, StageId } from './types'

/**
 * Real files published by the Center for International Programmes. Every entry was
 * fetched before being listed: the URL, byte size and publication date below come from
 * the server's own response, not from the page that links to them. Titles are the
 * labels the official pages use — nothing here is described from memory.
 *
 * `form` means a blank you fill in; `sample` means something to look at. PDFs open in a
 * viewer inside the app (bolashak.gov.kz sends no frame-blocking headers); Word files
 * can only be downloaded, because no browser renders .docx on its own.
 */
export interface OfficialForm {
  id: string
  stage: StageId
  /** Document in DOCUMENTS this file belongs to, when there is one. */
  doc?: DocId
  title: L
  /** What to do with it, in one line. */
  note?: L
  url: string
  kind: 'form' | 'sample'
  fileType: 'pdf' | 'docx'
  /** Byte size as served, used for the size hint next to the link. */
  bytes: number
  /** Publication date the server reports, so an old blank is visibly old. */
  published: string
  /** Page the file is published on. */
  source: SourceId
  appliesTo?: Rule
}

const NOT_SCIENCE: Rule = { not: { track: ['science_internship'] } }
const SCIENCE: Rule = { track: ['science_internship'] }
const B = 'https://bolashak.gov.kz/storage/app/media'

export const FORMS: OfficialForm[] = [
  /* ── choosing a category ── */
  {
    id: 'olympiads_list',
    stage: 'category',
    kind: 'sample',
    fileType: 'docx',
    appliesTo: { track: ['bachelor'] },
    title: {
      ru: 'Перечень международных олимпиад и конкурсов',
      kk: 'Халықаралық олимпиадалар мен конкурстар тізбесі',
      en: 'List of international olympiads and competitions',
    },
    note: {
      ru: 'Бакалавриат открыт победителям из этого перечня — проверьте, есть ли в нём ваша олимпиада.',
      kk: 'Бакалавриат осы тізбедегі жеңімпаздарға ашық — өз олимпиадаңызды тексеріңіз.',
      en: 'The bachelor track is open to winners from this list — check whether your olympiad is on it.',
    },
    url: `${B}/pretendentu--pravila/%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D1%81.docx`,
    bytes: 20324,
    published: '2026-07-13',
    source: 'pravila',
  },

  /* ── the application package ── */
  {
    id: 'employer_request',
    stage: 'documents',
    doc: 'employer_request_doc',
    kind: 'form',
    fileType: 'docx',
    appliesTo: NOT_SCIENCE,
    title: {
      ru: 'Заявка работодателя на подготовку специалиста',
      kk: 'Жұмыс берушінің маман даярлауға өтінімі',
      en: 'Employer request to train a specialist',
    },
    note: {
      ru: 'С условием сохранения места работы. Заполняет работодатель — отдайте бланк заранее.',
      kk: 'Жұмыс орнын сақтау шартымен. Жұмыс беруші толтырады — бланкіні алдын ала беріңіз.',
      en: 'With your job kept open. The employer fills it in, so hand over the blank early.',
    },
    url: `${B}/2026/utverzhdenie/utverzhdennaya-12.docx`,
    bytes: 18816,
    published: '2026-08-07',
    source: 'pravila',
  },
  {
    id: 'ns_anketa_form',
    stage: 'documents',
    kind: 'form',
    fileType: 'docx',
    appliesTo: SCIENCE,
    title: {
      ru: 'Анкета претендента на научную стажировку',
      kk: 'Ғылыми тағылымдамаға үміткердің сауалнамасы',
      en: 'Applicant questionnaire for a scientific internship',
    },
    note: {
      ru: 'Форма на двух языках, утверждена рабочим органом.',
      kk: 'Екі тілдегі нысан, жұмыс органы бекіткен.',
      en: 'A bilingual form approved by the working body.',
    },
    url: `${B}/500%20uchennye/dokumenty/Anketa%20rus-qaz.docx`,
    bytes: 81079,
    published: '2022-12-19',
    source: 'ns_documents',
  },
  {
    id: 'ns_employer_request',
    stage: 'documents',
    kind: 'form',
    fileType: 'docx',
    appliesTo: SCIENCE,
    title: {
      ru: 'Заявка работодателя на научную стажировку',
      kk: 'Жұмыс берушінің ғылыми тағылымдамаға өтінімі',
      en: 'Employer request for a scientific internship',
    },
    note: {
      ru: 'С условием сохранения места работы.',
      kk: 'Жұмыс орнын сақтау шартымен.',
      en: 'With your job kept open.',
    },
    url: `${B}/500%20uchennye/dokumenty/%D0%97%D0%B0%D1%8F%D0%B2%D0%BA%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BE%D0%B4%D0%B0%D1%82%D0%B5%D0%BB%D1%8F%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%20%D0%BD%D0%BE%D0%B2%D0%B0%D1%8F%202022.docx`,
    bytes: 40818,
    published: '2022-12-29',
    source: 'ns_documents',
  },
  {
    id: 'ns_program',
    stage: 'documents',
    kind: 'form',
    fileType: 'docx',
    appliesTo: SCIENCE,
    title: {
      ru: 'Программа прохождения научной стажировки',
      kk: 'Ғылыми тағылымдамадан өту бағдарламасы',
      en: 'Scientific internship programme',
    },
    note: {
      ru: 'Утверждает работодатель, согласовывает принимающая зарубежная организация.',
      kk: 'Жұмыс беруші бекітеді, қабылдаушы шетелдік ұйым келіседі.',
      en: 'Approved by your employer and agreed with the host organisation abroad.',
    },
    url: `${B}/500%20uchennye/dokumenty/programma%20stazh%20rus.docx`,
    bytes: 39803,
    published: '2022-12-19',
    source: 'ns_documents',
  },

  /* ── language ── */
  {
    id: 'ns_min_scores',
    stage: 'foreign',
    kind: 'sample',
    fileType: 'docx',
    appliesTo: SCIENCE,
    title: {
      ru: 'Минимальные требования по иностранному языку',
      kk: 'Шет тілі бойынша ең төменгі талаптар',
      en: 'Minimum foreign language requirements',
    },
    url: `${B}/500%20uchennye/dokumenty/min%20ball%20rus.docx`,
    bytes: 21686,
    published: '2022-12-19',
    source: 'ns_documents',
  },

  /* ── first round: what the test actually looks like ── */
  {
    id: 'test_numerical',
    stage: 'testing',
    kind: 'sample',
    fileType: 'pdf',
    title: { ru: 'Числовой тест — примеры заданий', kk: 'Сандық тест — тапсырма үлгілері', en: 'Numerical test — sample questions' },
    note: {
      ru: 'Официальный образец первого тура. Прорешайте до тестирования, а не в день его.',
      kk: 'Бірінші турдың ресми үлгісі. Тестілеу күні емес, оған дейін шығарып көріңіз.',
      en: 'The official sample for round one. Work through it before the day, not on it.',
    },
    url: `${B}/blog/pravila-uchastiya/1.%20%D0%A7%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%D0%B9_%D1%80%D1%83%D1%81_.pdf`,
    bytes: 489761,
    published: '2025-04-11',
    source: 'pravila',
  },
  {
    id: 'test_verbal',
    stage: 'testing',
    kind: 'sample',
    fileType: 'pdf',
    title: { ru: 'Вербальный тест — примеры заданий', kk: 'Вербалды тест — тапсырма үлгілері', en: 'Verbal test — sample questions' },
    url: `${B}/blog/pravila-uchastiya/2.%20%D0%92%D0%B5%D1%80%D0%B1%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D1%80%D1%83%D1%81_.pdf`,
    bytes: 469199,
    published: '2025-04-11',
    source: 'pravila',
  },
  {
    id: 'test_personality',
    stage: 'testing',
    kind: 'sample',
    fileType: 'pdf',
    title: { ru: 'Личностный опросник — образец', kk: 'Тұлғалық сауалнама — үлгі', en: 'Personality questionnaire — sample' },
    url: `${B}/blog/pravila-uchastiya/3.%20%D0%9B%D0%B8%D1%87%D0%BD.%20%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%BD%D0%B8%D0%BA_%D1%80%D1%83%D1%81_.pdf`,
    bytes: 79856,
    published: '2025-04-11',
    source: 'pravila',
  },

  /* ── contract, pledge and guarantee ── */
  {
    id: 'pledge_poa',
    stage: 'contract',
    kind: 'form',
    fileType: 'pdf',
    appliesTo: NOT_SCIENCE,
    title: {
      ru: 'Доверенность на заключение договора залога',
      kk: 'Кепіл шартын жасауға сенімхат',
      en: 'Power of attorney to sign the pledge agreement',
    },
    note: {
      ru: 'Нужна, если подписывать договор в Астане поедете не вы сами.',
      kk: 'Астанаға шартқа қол қоюға өзіңіз бармасаңыз қажет.',
      en: 'Needed if someone else goes to Astana to sign for you.',
    },
    url: `${B}/dopdog/1%20%D0%94%D0%BE%D0%B2%D0%B5%D1%80%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D1%8C%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%20%D0%94%D0%BE%D0%B3%D0%BE%D0%B2%D0%BE%D1%80%D0%B0%20%D0%B7%D0%B0%D0%BB%D0%BE%D0%B3%D0%B0.pdf`,
    bytes: 204753,
    published: '2022-09-01',
    source: 'obrazcy',
  },
  {
    id: 'guarantor_consent',
    stage: 'contract',
    kind: 'form',
    fileType: 'pdf',
    appliesTo: NOT_SCIENCE,
    title: { ru: 'Заявление-согласие гаранта', kk: 'Кепілгердің келісім-өтініші', en: 'Guarantor consent statement' },
    url: `${B}/dopdog/8%20%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%93%D0%B0%D1%80%D0%B0%D0%BD%D1%82%D0%B0.pdf`,
    bytes: 9172,
    published: '2022-09-01',
    source: 'obrazcy',
  },
  {
    id: 'owner_consent',
    stage: 'contract',
    kind: 'form',
    fileType: 'pdf',
    appliesTo: NOT_SCIENCE,
    title: {
      ru: 'Согласие собственника на залог',
      kk: 'Меншік иесінің кепілге келісімі',
      en: 'Property owner consent to the pledge',
    },
    note: {
      ru: 'И на внесудебную реализацию. Подписывает владелец закладываемой недвижимости.',
      kk: 'Сотсыз өткізуге де. Кепілге қойылатын жылжымайтын мүлік иесі қол қояды.',
      en: 'Including out-of-court sale. Signed by the owner of the property being pledged.',
    },
    url: `${B}/dopdog/9%20%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%BE%D1%82%20%D1%81%D0%BE%D0%B1%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D0%B8%D0%BA%D0%B0.pdf`,
    bytes: 201268,
    published: '2024-07-23',
    source: 'obrazcy',
  },
  {
    id: 'spouse_consent',
    stage: 'contract',
    kind: 'form',
    fileType: 'pdf',
    appliesTo: NOT_SCIENCE,
    title: { ru: 'Согласие супруга на залог', kk: 'Жұбайдың кепілге келісімі', en: 'Spouse consent to the pledge' },
    url: `${B}/dopdog/10%20%D0%97%D0%B0%D1%8F%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%81%D0%B8%D0%B5%20%D1%81%D1%83%D0%BF%D1%80%D1%83%D0%B3%D0%B0%20%D0%BD%D0%B0%20%D0%B7%D0%B0%D0%BB%D0%BE%D0%B3.pdf`,
    bytes: 32561,
    published: '2025-08-20',
    source: 'obrazcy',
  },

  /* ── getting out ── */
  {
    id: 'guarantee_letter_request',
    stage: 'departure',
    kind: 'form',
    fileType: 'docx',
    title: {
      ru: 'Заявление на письмо о финансовой гарантии',
      kk: 'Қаржылық кепілдік хатына өтініш',
      en: 'Request for the financial guarantee letter',
    },
    note: {
      ru: 'Письмо отправляют в вуз или принимающую организацию — с него начинается визовый пакет.',
      kk: 'Хат ЖОО-ға не қабылдаушы ұйымға жіберіледі — виза топтамасы содан басталады.',
      en: 'The letter goes to the university or host — the visa package starts with it.',
    },
    url: `${B}/obrazcy-dokumentov/ru/2%20Zayav%20na%20gar.pismo.docx`,
    bytes: 17858,
    published: '2023-11-08',
    source: 'obrazcy',
  },
  {
    id: 'ticket_request',
    stage: 'departure',
    kind: 'form',
    fileType: 'docx',
    title: {
      ru: 'Заявление на приобретение авиабилета',
      kk: 'Авиабилет сатып алуға өтініш',
      en: 'Flight ticket request',
    },
    url: `${B}/obrazcy-dokumentov/ru/1%20Zayav%20na%20aviabilet.docx`,
    bytes: 15854,
    published: '2023-11-08',
    source: 'obrazcy',
  },
  {
    id: 'card_details',
    stage: 'departure',
    kind: 'form',
    fileType: 'pdf',
    title: {
      ru: 'Бланк сведений по карт-счёту',
      kk: 'Карт-шот бойынша мәліметтер бланкісі',
      en: 'Card account details form',
    },
    note: {
      ru: 'Данные карт-счёта уходят в Управление финансового обеспечения — без них деньги не переведут.',
      kk: 'Карт-шот деректері Қаржымен қамтамасыз ету басқармасына жіберіледі — онсыз ақша аударылмайды.',
      en: 'The card details go to the finance department — no money moves without them.',
    },
    url: `${B}/finzayavlenie1.pdf`,
    bytes: 1001447,
    published: '2022-02-28',
    source: 'finance',
  },

  /* ── while studying ── */
  {
    id: 'iup_request',
    stage: 'studying',
    kind: 'form',
    fileType: 'docx',
    title: { ru: 'Заявление на утверждение ИУП', kk: 'ЖОЖ бекітуге өтініш', en: 'Request to approve the study plan' },
    url: `${B}/obrazcy-dokumentov/ru/5%20Zayav%20utverd%20IUP.docx`,
    bytes: 16232,
    published: '2023-11-08',
    source: 'obrazcy',
  },
  {
    id: 'iup_sample',
    stage: 'studying',
    kind: 'sample',
    fileType: 'pdf',
    title: { ru: 'Образец заполненного ИУП', kk: 'Толтырылған ЖОЖ үлгісі', en: 'A filled-in study plan, as an example' },
    note: {
      ru: 'Посмотрите, как выглядит принятый план, прежде чем составлять свой.',
      kk: 'Өз жоспарыңызды жасар алдында қабылданған жоспар қалай көрінетінін қараңыз.',
      en: 'See what an accepted plan looks like before you write your own.',
    },
    url: `${B}/obrazcy-dokumentov/ru/6%20Obrazec%20IUP.pdf`,
    bytes: 58909,
    published: '2023-11-08',
    source: 'obrazcy',
  },
  {
    id: 'advance_request',
    stage: 'studying',
    kind: 'form',
    fileType: 'pdf',
    title: { ru: 'Заявление на получение аванса', kk: 'Аванс алуға өтініш', en: 'Advance payment request' },
    url: `${B}/fin-kz/All%20about%20fin/main/ru/Avans%20ru.pdf`,
    bytes: 174726,
    published: '2023-07-19',
    source: 'finance',
  },
  {
    id: 'reimbursement_request',
    stage: 'studying',
    kind: 'form',
    fileType: 'pdf',
    title: { ru: 'Заявление на возмещение расходов', kk: 'Шығынды өтеуге өтініш', en: 'Expense reimbursement request' },
    url: `${B}/fin-kz/All%20about%20fin/main/ru/Vozmeshenie%20ru.pdf`,
    bytes: 239981,
    published: '2023-07-19',
    source: 'finance',
  },
  {
    id: 'academic_leave',
    stage: 'studying',
    kind: 'form',
    fileType: 'docx',
    title: {
      ru: 'Заявление на академический отпуск',
      kk: 'Академиялық демалысқа өтініш',
      en: 'Academic leave request',
    },
    url: `${B}/obrazcy-dokumentov/ru/11%20Forma-zayavleniya-dlya-predostavleniya-akademicheskogo-otpuska.docx`,
    bytes: 12966,
    published: '2023-11-08',
    source: 'obrazcy',
  },

  /* ── coming home ── */
  {
    id: 'study_completed',
    stage: 'return',
    kind: 'form',
    fileType: 'docx',
    appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
    title: { ru: 'Заявление о завершении обучения', kk: 'Оқуды аяқтау туралы өтініш', en: 'Statement that the studies are finished' },
    url: `${B}/obrazcy-dokumentov/ru/3%20Zayav%20o%20zaver%20obuch.docx`,
    bytes: 18981,
    published: '2023-11-08',
    source: 'obrazcy',
  },
  {
    id: 'internship_completed',
    stage: 'return',
    kind: 'form',
    fileType: 'docx',
    appliesTo: { track: ['internship', 'science_internship'] },
    title: { ru: 'Заявление о завершении стажировки', kk: 'Тағылымдаманы аяқтау туралы өтініш', en: 'Statement that the internship is finished' },
    url: `${B}/obrazcy-dokumentov/ru/4%20Zayav%20o%20zav%20stazhir.docx`,
    bytes: 18828,
    published: '2023-11-08',
    source: 'obrazcy',
  },

  /* ── closing the obligation ── */
  {
    id: 'lift_encumbrance',
    stage: 'workback',
    kind: 'form',
    fileType: 'docx',
    appliesTo: NOT_SCIENCE,
    title: { ru: 'Заявление на снятие обременения', kk: 'Ауыртпалықты алып тастауға өтініш', en: 'Request to lift the encumbrance' },
    note: {
      ru: 'Последний документ пути: им закрывают залог после отработки.',
      kk: 'Жолдың соңғы құжаты: өтеуден кейін кепілді осымен жабады.',
      en: 'The last document of the path: it releases the pledge once the work-back is done.',
    },
    url: `${B}/obrazcy-dokumentov/ru/uzipir/Zayavleniye%20o%20snyatii%20obremeneniya.docx`,
    bytes: 14601,
    published: '2024-12-02',
    source: 'obrazcy',
  },
]

export const formsForStage = (stage: StageId): OfficialForm[] => FORMS.filter((f) => f.stage === stage)
