import type { L } from './types'

/** Bump these when the content is re-verified against the official sources. */
export const CONTENT_META = {
  competitionYear: 2026,
  lastVerified: '2026-08-21',
  schemaVersion: 2,
  disclaimer: {
    ru: 'Требования «Болашак» меняются каждый конкурсный год: категории, стаж, языковые пороги, списки вузов и специальностей. Содержание сверено с официальными документами на указанную дату. Перед подачей перепроверяйте на bolashak.gov.kz и в личном кабинете претендента.',
    kk: '«Болашақ» талаптары жыл сайын өзгереді: санаттар, еңбек өтілі, тілдік шекті деңгейлер, ЖОО мен мамандықтар тізімі. Мазмұн көрсетілген күнге ресми құжаттармен салыстырылды. Тапсырар алдында bolashak.gov.kz сайтынан қайта тексеріңіз.',
    en: 'Bolashak requirements change every competition year: categories, work experience, language thresholds, university and specialty lists. This content was verified against official documents on the date shown. Re-check bolashak.gov.kz before applying.',
  } satisfies L,
  estimateNote: {
    ru: 'Ориентировочная оценка приложения, не официальный срок.',
    kk: 'Қолданбаның болжамды бағасы, ресми мерзім емес.',
    en: 'Rough app estimate, not an official term.',
  } satisfies L,
  contacts: {
    email: 'info@bolashak.gov.kz',
    phone: '+7 (717) 276-90-76',
    address: {
      ru: 'г. Астана, ул. Сыганак, 70, БЦ «Сыганак», 5 этаж',
      kk: 'Астана қ., Сығанақ к-сі, 70, «Сығанақ» БО, 5-қабат',
      en: 'Astana, Syganak st. 70, Syganak business centre, 5th floor',
    } satisfies L,
  },
}
