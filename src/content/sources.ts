import type { Source, SourceId } from './types'

const B = 'https://bolashak.gov.kz'

/**
 * Registry of official sources. Every fact in content points here by id, so
 * updating a link for a new competition year is a one-line change.
 */
export const SOURCES: Record<SourceId, Source> = {
  pravila: {
    id: 'pravila',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu/pravila`,
    title: { ru: 'Требования к претенденту и необходимые документы', kk: 'Үміткерге қойылатын талаптар және қажетті құжаттар', en: 'Applicant requirements and required documents' },
  },
  pp573: {
    id: 'pp573',
    org: 'adilet.zan.kz',
    url: 'https://adilet.zan.kz/rus/docs/P080000573_',
    title: { ru: 'Правила отбора претендентов (ПП РК от 11.06.2008 № 573, ред. 20.05.2026)', kk: 'Үміткерлерді іріктеу қағидалары (ҚР ҮҚ 11.06.2008 № 573)', en: 'Applicant selection rules (Gov. Decree No. 573, as amended 20.05.2026)' },
  },
  prikaz318: {
    id: 'prikaz318',
    org: 'adilet.zan.kz',
    url: 'https://adilet.zan.kz/rus/docs/V1500011258',
    title: { ru: 'Приказ № 318: минимальный уровень знания языков, формы анкеты и заявки работодателя (ред. 18.04.2025)', kk: '№ 318 бұйрық: тілдерді білудің ең төменгі деңгейі (18.04.2025 ред.)', en: 'Order No. 318: minimum language levels, application forms (as amended 18.04.2025)' },
  },
  pp791: {
    id: 'pp791',
    org: 'adilet.zan.kz',
    url: 'https://adilet.zan.kz/rus/docs/P2200000791',
    title: { ru: 'Правила отбора претендентов и прохождения научных стажировок (ПП РК от 05.10.2022 № 791)', kk: 'Ғылыми тағылымдамадан өту қағидалары (ҚР ҮҚ 05.10.2022 № 791)', en: 'Rules for scientific internships (Gov. Decree No. 791 of 05.10.2022)' },
  },
  ns_requirements: {
    id: 'ns_requirements',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu-po-ns/trebovaniya-k-pretendentam-na-prohozhdenie-nauchnoj-stazhirovki`,
    title: { ru: 'Требования к претендентам на научную стажировку', kk: 'Ғылыми тағылымдамаға үміткерлерге қойылатын талаптар', en: 'Requirements for scientific internship applicants' },
  },
  ns_documents: {
    id: 'ns_documents',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu-po-ns/kak-podat-dokumenty-po-ns`,
    title: { ru: 'Научные стажировки: как подать документы', kk: 'Ғылыми тағылымдама: құжаттарды қалай тапсыру керек', en: 'Scientific internships: how to submit documents' },
  },
  ns_contest: {
    id: 'ns_contest',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu-po-ns/konkursnyj-otbor`,
    title: { ru: 'Научные стажировки: конкурсный отбор', kk: 'Ғылыми тағылымдама: конкурстық іріктеу', en: 'Scientific internships: competitive selection' },
  },
  ns_winner: {
    id: 'ns_winner',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pobediteli-konkursa-po-ns`,
    title: { ru: 'Победителю конкурса на научную стажировку: договор и гарантия', kk: 'Ғылыми тағылымдама конкурсының жеңімпазына: шарт және кепілдік', en: 'Scientific internship winners: contract and guarantee' },
  },
  ns_alumni: {
    id: 'ns_alumni',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/vypuskniku-po-ns`,
    title: { ru: 'Научные стажировки: трудовая отработка', kk: 'Ғылыми тағылымдама: еңбек өтеу', en: 'Scientific internships: work-back obligation' },
  },
  ns_orgs: {
    id: 'ns_orgs',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu-po-ns/vuzy-nauchnye-centry-organizaciya`,
    title: { ru: 'Список организаций для научных стажировок на 2026 год', kk: '2026 жылғы ғылыми тағылымдама ұйымдарының тізімі', en: 'List of host organisations for scientific internships, 2026' },
  },
  ns_priorities: {
    id: 'ns_priorities',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu-po-ns/prioritetnye-napravleniya`,
    title: { ru: 'Приоритетные направления научных исследований на 2026 год', kk: '2026 жылғы ғылыми зерттеулердің басым бағыттары', en: 'Priority research areas, 2026' },
  },
  ns_minscore: {
    id: 'ns_minscore',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/500%20uchennye/dokumenty/min%20ball%20rus.docx`,
    title: { ru: 'Минимальные языковые баллы для научной стажировки (docx)', kk: 'Ғылыми тағылымдамаға тілдік ең төменгі балдар (docx)', en: 'Minimum language scores for scientific internships (docx)' },
  },
  vuzy2026: {
    id: 'vuzy2026',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/pretendentu--vuzy/vuzy_bolashak_2026_rus.pdf`,
    title: { ru: 'Список ведущих зарубежных вузов на 2026 год (PDF)', kk: '2026 жылғы жетекші шетелдік ЖОО тізімі (PDF)', en: 'List of leading foreign universities, 2026 (PDF)' },
  },
  vuzy_page: {
    id: 'vuzy_page',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu/vuzy`,
    title: { ru: 'Вузы (страница со списками)', kk: 'ЖОО (тізімдер беті)', en: 'Universities (lists page)' },
  },
  pps2026: {
    id: 'pps2026',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu/specialnosti`,
    title: { ru: 'Перечень приоритетных специальностей для академического обучения на 2026 год', kk: '2026 жылғы академиялық оқуға арналған басым мамандықтар тізбесі', en: 'Priority specialties for academic study, 2026' },
  },
  pps_internship2026: {
    id: 'pps_internship2026',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu/specialnosti-dlya-stazhirovok`,
    title: { ru: 'Перечень приоритетных специальностей для стажировок на 2026 год', kk: '2026 жылғы тағылымдамаға арналған басым мамандықтар тізбесі', en: 'Priority specialties for internships, 2026' },
  },
  related2026: {
    id: 'related2026',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/pretendentu/rodstvennye-specialnosti`,
    title: { ru: 'Перечень родственных специальностей на 2026 год', kk: '2026 жылғы туыстас мамандықтар тізбесі', en: 'Related specialties list, 2026' },
  },
  distribution2026: {
    id: 'distribution2026',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/raspredelenie-stipendij/2026/raspredelenie-2026-rus.pdf`,
    title: { ru: 'Распределение стипендий по направлениям на 2026 год (PDF)', kk: '2026 жылғы стипендияларды бағыттар бойынша бөлу (PDF)', en: 'Scholarship distribution by field, 2026 (PDF)' },
  },
  admission_guide: {
    id: 'admission_guide',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/%D0%9A%D0%B0%D0%BA%20%D0%BF%D0%BE%D0%B4%D0%B0%D1%82%D1%8C%20%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D1%8B/%20%D0%B2%20%D0%B7%D0%B0%D1%80%D1%83%D0%B1%D0%B5%D0%B6%D0%BD%D1%8B%D0%B5%20%D0%B2%D1%83%D0%B7%D1%8B.pdf`,
    title: { ru: 'Памятка ЦМП «Поступление в зарубежные вузы» (PDF)', kk: 'ХБО жадынамасы «Шетелдік ЖОО-ға түсу» (PDF)', en: 'CIP guide "Admission to foreign universities" (PDF)' },
  },
  egov_bolashak: {
    id: 'egov_bolashak',
    org: 'egov.kz',
    url: 'https://egov.kz/cms/ru/services/higher_education/184pass_mon',
    title: { ru: 'Госуслуга: приём документов на конкурс «Болашак» (egov.kz)', kk: 'Мемлекеттік қызмет: «Болашақ» конкурсына құжат қабылдау (egov.kz)', en: 'Public service: Bolashak application intake (egov.kz)' },
  },
  egov_ns: {
    id: 'egov_ns',
    org: 'egov.kz',
    url: 'https://egov.kz/ru/services/presale/higher_education_pass474_mon',
    title: { ru: 'Госуслуга: приём документов на научные стажировки (egov.kz)', kk: 'Мемлекеттік қызмет: ғылыми тағылымдамаға құжат қабылдау (egov.kz)', en: 'Public service: scientific internship intake (egov.kz)' },
  },
  cabinet: {
    id: 'cabinet',
    org: 'konkurs.bolashak.gov.kz',
    url: 'https://konkurs.bolashak.gov.kz/',
    title: { ru: 'Личный кабинет претендента', kk: 'Үміткердің жеке кабинеті', en: 'Applicant personal account' },
  },
  booking: {
    id: 'booking',
    org: 'booking.bolashak.gov.kz',
    url: 'https://booking.bolashak.gov.kz/',
    title: { ru: 'Бронирование очереди в ЦМП', kk: 'ХБО-ға кезекке жазылу', en: 'Queue booking at CIP' },
  },
  test_numeric: {
    id: 'test_numeric',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/blog/pravila-uchastiya/1.%20%D0%A7%D0%B8%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%D0%B9_%D1%80%D1%83%D1%81_.pdf`,
    title: { ru: 'Образец числового теста (PDF)', kk: 'Сандық тест үлгісі (PDF)', en: 'Numerical test sample (PDF)' },
  },
  test_verbal: {
    id: 'test_verbal',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/blog/pravila-uchastiya/2.%20%D0%92%D0%B5%D1%80%D0%B1%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B9_%D1%80%D1%83%D1%81_.pdf`,
    title: { ru: 'Образец вербального теста (PDF)', kk: 'Вербалды тест үлгісі (PDF)', en: 'Verbal test sample (PDF)' },
  },
  test_personality: {
    id: 'test_personality',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/blog/pravila-uchastiya/3.%20%D0%9B%D0%B8%D1%87%D0%BD.%20%D0%BE%D0%BF%D1%80%D0%BE%D1%81%D0%BD%D0%B8%D0%BA_%D1%80%D1%83%D1%81_.pdf`,
    title: { ru: 'Образец личностного опросника (PDF)', kk: 'Тұлғалық сауалнама үлгісі (PDF)', en: 'Personality questionnaire sample (PDF)' },
  },
  employer_form: {
    id: 'employer_form',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/2026/utverzhdenie/utverzhdennaya-12.docx`,
    title: { ru: 'Форма заявки работодателя (docx)', kk: 'Жұмыс берушінің өтінім нысаны (docx)', en: 'Employer request form (docx)' },
  },
  internship_program: {
    id: 'internship_program',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/uokp/%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B0%20%D1%81%D1%82%D0%B0%D0%B6.pdf`,
    title: { ru: 'Требования к программе стажировки (PDF)', kk: 'Тағылымдама бағдарламасына қойылатын талаптар (PDF)', en: 'Internship programme requirements (PDF)' },
  },
  ns_anketa: {
    id: 'ns_anketa',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/500%20uchennye/dokumenty/Anketa%20rus-qaz.docx`,
    title: { ru: 'Анкета претендента на научную стажировку (docx)', kk: 'Ғылыми тағылымдамаға үміткердің сауалнамасы (docx)', en: 'Scientific internship applicant form (docx)' },
  },
  ns_program: {
    id: 'ns_program',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/500%20uchennye/dokumenty/programma%20stazh%20rus.docx`,
    title: { ru: 'Программа научной стажировки — шаблон (docx)', kk: 'Ғылыми тағылымдама бағдарламасы — үлгі (docx)', en: 'Scientific internship programme template (docx)' },
  },
  olympiads: {
    id: 'olympiads',
    org: 'bolashak.gov.kz',
    url: `${B}/storage/app/media/pretendentu--pravila/%D0%9F%D1%80%D0%B8%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_%D1%80%D1%83%D1%81.docx`,
    title: { ru: 'Перечень международных олимпиад и конкурсов для бакалавриата (docx)', kk: 'Бакалавриатқа арналған халықаралық олимпиадалар тізбесі (docx)', en: 'List of international olympiads for bachelor applicants (docx)' },
  },
  stipendiat_master: {
    id: 'stipendiat_master',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/stipendiatu/magistratura`,
    title: { ru: 'Стипендиату: магистратура/докторантура — действия после присуждения', kk: 'Стипендиатқа: магистратура/докторантура — тағайындалғаннан кейінгі әрекеттер', en: 'For awardees: master\'s/PhD — steps after the award' },
  },
  stipendiat_internship: {
    id: 'stipendiat_internship',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/stipendiatu/stazhirovka`,
    title: { ru: 'Стипендиату: стажировка — действия после присуждения', kk: 'Стипендиатқа: тағылымдама — тағайындалғаннан кейінгі әрекеттер', en: 'For awardees: internship — steps after the award' },
  },
  dogovory: {
    id: 'dogovory',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/dogovory`,
    title: { ru: 'Договоры: инструкции по заключению, замене залога, снятию обременения', kk: 'Шарттар: жасасу, кепілді ауыстыру нұсқаулықтары', en: 'Contracts: instructions on signing, collateral replacement, lien release' },
  },
  zamena_zaloga: {
    id: 'zamena_zaloga',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/vypuskniku/zamena-zaloga`,
    title: { ru: 'Процедура замены предмета залога', kk: 'Кепіл затын ауыстыру рәсімі', en: 'Collateral replacement procedure' },
  },
  obrazcy: {
    id: 'obrazcy',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/obrazcy-dokumentov`,
    title: { ru: 'Образцы документов и заявлений', kk: 'Құжаттар мен өтініштер үлгілері', en: 'Document and application templates' },
  },
  viza: {
    id: 'viza',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/viza`,
    title: { ru: 'Визы: ссылки на правила получения по странам', kk: 'Визалар: елдер бойынша алу ережелеріне сілтемелер', en: 'Visas: links to country rules' },
  },
  guide: {
    id: 'guide',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/stipendiatu/bolashaq-guide`,
    title: { ru: 'Bolashak guide: памятки для получения визы, мониторинг стипендиатов', kk: 'Bolashak guide: виза алу жадынамалары', en: 'Bolashak guide: visa memos, monitoring of awardees' },
  },
  finance: {
    id: 'finance',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/stipendiatu/finansirovanii`,
    title: { ru: 'Всё о финансировании: нормы расходов, формы заявлений', kk: 'Қаржыландыру туралы: шығыс нормалары, өтініш нысандары', en: 'Financing: expense norms, application forms' },
  },
  otrabotka: {
    id: 'otrabotka',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/vypuskniku/trudovaya-otrabotka`,
    title: { ru: 'Выпускнику: трудовая отработка', kk: 'Түлекке: еңбек өтеу', en: 'For alumni: work-back obligation' },
  },
  formy_vypusknika: {
    id: 'formy_vypusknika',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/vypuskniku/formy-zayavlenij`,
    title: { ru: 'Выпускнику: формы заявлений', kk: 'Түлекке: өтініш нысандары', en: 'For alumni: application forms' },
  },
  contacts: {
    id: 'contacts',
    org: 'bolashak.gov.kz',
    url: `${B}/ru/contacts`,
    title: { ru: 'Контакты АО «Центр международных программ»', kk: '«Халықаралық бағдарламалар орталығы» АҚ байланыстары', en: 'Contacts of JSC "Center for International Programs"' },
  },
  qrt: {
    id: 'qrt',
    org: 'qrt.kz',
    url: 'https://www.qrt.kz',
    title: { ru: 'Qazaq Resmi Test — онлайн-тестирование по казахскому языку', kk: 'Qazaq Resmi Test — қазақ тілінен онлайн тестілеу', en: 'Qazaq Resmi Test — online Kazakh language test' },
  },
  kaztest: {
    id: 'kaztest',
    org: 'testcenter.kz',
    url: 'https://testcenter.kz/',
    title: { ru: 'Национальный центр тестирования — КАЗТЕСТ', kk: 'Ұлттық тестілеу орталығы — ҚАЗТЕСТ', en: 'National Testing Center — KAZTEST' },
  },
  'chat-faq': {
    id: 'chat-faq',
    org: 'Чаты претендентов',
    url: 'mailto:info@bolashak.gov.kz',
    title: { ru: 'Ответы администрации в чатах претендентов (май–август 2026)', kk: 'Әкімшіліктің үміткерлер чаттарындағы жауаптары (2026 ж. мамыр–тамыз)', en: 'Administration answers in applicant chats (May–Aug 2026)' },
  },
}

export const getSource = (id: SourceId): Source => {
  const s = SOURCES[id]
  if (!s) throw new Error(`Unknown source id: ${id}`)
  return s
}
