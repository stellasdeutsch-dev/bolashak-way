import type { L } from './types'

/** Bump these when the content is re-verified against the official sources. */
export const CONTENT_META = {
  competitionYear: 2026,
  lastVerified: '2026-08-21',
  schemaVersion: 2,
  disclaimer: {
    ru: 'Требования «Болашак» меняются каждый год: категории, стаж, языковые пороги, списки вузов и специальностей. Мы сверили всё с официальными документами на указанную дату. Перед подачей перепроверьте на bolashak.gov.kz и в личном кабинете.',
    kk: '«Болашақ» талаптары жыл сайын өзгереді: санаттар, өтіл, тілдік шектер, ЖОО мен мамандықтар тізімі. Біз бәрін көрсетілген күнге ресми құжаттармен салыстырдық. Тапсырар алдында bolashak.gov.kz-тен және жеке кабинеттен тексеріңіз.',
    en: 'Bolashak requirements change every year: categories, experience, language thresholds, university and specialty lists. We checked everything against the official documents on the date shown. Re-check bolashak.gov.kz and your account before you apply.',
  } satisfies L,
  estimateNote: {
    ru: 'Это наша оценка, а не официальный срок.',
    kk: 'Бұл — біздің болжамымыз, ресми мерзім емес.',
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
