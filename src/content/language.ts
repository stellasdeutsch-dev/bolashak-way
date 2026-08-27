import type { CategoryId, ExamId, LanguageThreshold, L, SourceId } from './types'

/**
 * English-language thresholds, Appendix 1 of Order No. 318 (as amended by the order of the
 * Minister of Science and Higher Education of 18.04.2025 No. 193). Source id: prikaz318.
 *
 * Threshold levels (per the appendix notes):
 *  I   — referral to language courses in Kazakhstan or abroad (except English);
 *  II  — referral to language courses abroad;
 *  III — referral straight to academic study / internship.
 */
export type LanguageGroup = 'preferential' | 'self' | 'internship' | 'science' | 'none'

export const ENGLISH_THRESHOLDS: Record<Exclude<LanguageGroup, 'none' | 'science'>, LanguageThreshold[]> = {
  preferential: [
    { exam: 'ielts', label: 'IELTS', first: 5.0, second: 6.0, third: 6.5, scale: 'из 9.0' },
    { exam: 'toefl_ibt', label: 'TOEFL iBT', first: 35, second: 60, third: 79, scale: 'из 120' },
    { exam: 'toefl_pbt', label: 'TOEFL PBT / ITP', first: 417, second: 498, third: 548, scale: 'из 677' },
    { exam: 'det', label: 'Duolingo English Test', first: 80, second: null, third: null, scale: 'из 160' },
  ],
  self: [
    { exam: 'ielts', label: 'IELTS', first: null, second: null, third: 6.0, scale: 'из 9.0' },
    { exam: 'toefl_ibt', label: 'TOEFL iBT', first: null, second: null, third: 60, scale: 'из 120' },
    { exam: 'toefl_pbt', label: 'TOEFL PBT / ITP', first: null, second: null, third: 498, scale: 'из 677' },
    { exam: 'det', label: 'Duolingo English Test', first: null, second: null, third: null, scale: 'из 160' },
  ],
  internship: [
    { exam: 'ielts', label: 'IELTS', first: null, second: null, third: 5.0, scale: 'из 9.0' },
    { exam: 'toefl_ibt', label: 'TOEFL iBT', first: null, second: null, third: 35, scale: 'из 120' },
    { exam: 'toefl_pbt', label: 'TOEFL PBT / ITP', first: null, second: null, third: 417, scale: 'из 677' },
    { exam: 'det', label: 'Duolingo English Test', first: null, second: null, third: 80, scale: 'из 160' },
  ],
}

export const LANGUAGE_GROUP_BY_CATEGORY: Record<CategoryId, LanguageGroup> = {
  bachelor: 'none',
  master_self: 'self',
  master_rural: 'preferential',
  master_engineer: 'preferential',
  master_medical: 'preferential',
  master_civil: 'preferential',
  master_nuclear: 'preferential',
  phd_self: 'self',
  phd_nuclear: 'self',
  residency: 'self',
  internship: 'internship',
  science_internship: 'science',
}

/** Score required to be sent straight to study/internship (level III). */
export function requiredScore(group: LanguageGroup, exam: ExamId): number | null {
  if (group === 'none' || group === 'science' || exam === 'other') return null
  const row = ENGLISH_THRESHOLDS[group].find((r) => r.exam === exam)
  return row?.third ?? null
}

/** Lowest score that still allows participation (level I for preferential, else level III). */
export function minimumEntryScore(group: LanguageGroup, exam: ExamId): number | null {
  if (group === 'none' || group === 'science' || exam === 'other') return null
  const row = ENGLISH_THRESHOLDS[group].find((r) => r.exam === exam)
  if (!row) return null
  return row.first ?? row.second ?? row.third
}

export const KAZAKH_REQUIREMENT: { text: L; source: SourceId } = {
  text: {
    ru: 'Минимальный уровень государственного языка — B1: сертификат КАЗТЕСТ Национального центра тестирования либо Qazaq Resmi Test (с ID-номером и QR-кодом для проверки на qrt.kz).',
    kk: 'Мемлекеттік тілдің ең төменгі деңгейі — B1: Ұлттық тестілеу орталығының ҚАЗТЕСТ сертификаты немесе Qazaq Resmi Test (ID нөмірі және QR-коды бар).',
    en: 'The minimum state-language level is B1: a KAZTEST certificate from the National Testing Center or a Qazaq Resmi Test certificate (with an ID number and QR code verifiable at qrt.kz).',
  },
  source: 'prikaz318',
}

export const LANGUAGE_NOTES: { text: L; source: SourceId }[] = [
  {
    text: {
      ru: 'Инженерно-технические и медицинские работники, претенденты из сёл и госслужащие с IELTS 5.5, TOEFL iBT 46–59, PBT/ITP 417–497 или DET 95–104 плюс письмо о безусловном приглашении на обучение, при котором организуются языковые курсы, приравниваются ко второму пороговому уровню.',
      kk: 'IELTS 5.5, TOEFL iBT 46–59, PBT/ITP 417–497 немесе DET 95–104 және тіл курстары ұйымдастырылатын оқуға сөзсіз шақыру хаты бар жеңілдікті санаттар екінші шекті деңгейге теңестіріледі.',
      en: 'Engineering, medical, rural and civil-service applicants holding IELTS 5.5, TOEFL iBT 46–59, PBT/ITP 417–497 or DET 95–104 plus an unconditional offer with language courses attached are treated as meeting the second threshold.',
    },
    source: 'prikaz318',
  },
  {
    text: {
      ru: 'Те же категории, предоставившие письмо о безусловном зачислении на академическое обучение на этапе размещения, освобождаются от требования сертификата третьего порогового уровня.',
      kk: 'Орналастыру кезеңінде академиялық оқуға сөзсіз қабылдау хатын ұсынған осы санаттар үшінші шекті деңгей сертификатын ұсыну талабынан босатылады.',
      en: 'The same categories that submit an unconditional admission letter at the placement stage are exempt from the third-threshold certificate requirement.',
    },
    source: 'prikaz318',
  },
  {
    text: {
      ru: 'Если язык обучения отсутствует в таблице, уровень подтверждается действительным международным сертификатом не ниже B1 по стандарту CEFR.',
      kk: 'Оқу тілі кестеде болмаса, деңгей CEFR бойынша B1-ден төмен емес жарамды халықаралық сертификатпен расталады.',
      en: 'If the language of instruction is not in the table, the level is confirmed by a valid international certificate of at least CEFR B1.',
    },
    source: 'prikaz318',
  },
  {
    text: {
      ru: 'Немецкий: Goethe-Zertifikat B1-B2, TestDaF TDN 3, DSH-1 — первый порог; Goethe C1, TestDaF TDN 4, DSH-2 (по медицинским направлениям — DSH-3) — третий. Претенденты в вузы Германии проходят собеседование с комиссией DAAD за свой счёт.',
      kk: 'Неміс тілі: Goethe-Zertifikat B1-B2, TestDaF TDN 3, DSH-1 — бірінші шек; Goethe C1, TestDaF TDN 4, DSH-2 (медицина бағыттары бойынша — DSH-3) — үшінші. Германия ЖОО-ларына үміткерлер DAAD комиссиясымен әңгімелесуден өз есебінен өтеді.',
      en: 'German: Goethe-Zertifikat B1-B2, TestDaF TDN 3, DSH-1 for level I; Goethe C1, TestDaF TDN 4, DSH-2 (DSH-3 for medical fields) for level III. Applicants to German universities attend a DAAD interview at their own expense.',
    },
    source: 'prikaz318',
  },
  {
    text: {
      ru: 'Другие языки (третий порог): французский — TCF 500 / DALF C1; испанский — DELE C1; итальянский — CILS C1 / CELI 4; чешский — CCE C1; корейский — TOPIK 5; китайский — HSK 5; японский — JLPT N2; финский — YKI 5; норвежский — Bergentest C1; шведский — TISUS; датский — Studieprøven; голландский — CNaVT PTHO (B2).',
      kk: 'Басқа тілдер (үшінші шек): француз — TCF 500 / DALF C1; испан — DELE C1; итальян — CILS C1 / CELI 4; чех — CCE C1; корей — TOPIK 5; қытай — HSK 5; жапон — JLPT N2; фин — YKI 5; норвег — Bergentest C1; швед — TISUS; дат — Studieprøven; голланд — CNaVT PTHO (B2).',
      en: 'Other languages (level III): French — TCF 500 / DALF C1; Spanish — DELE C1; Italian — CILS C1 / CELI 4; Czech — CCE C1; Korean — TOPIK 5; Chinese — HSK 5; Japanese — JLPT N2; Finnish — YKI 5; Norwegian — Bergentest C1; Swedish — TISUS; Danish — Studieprøven; Dutch — CNaVT PTHO (B2).',
    },
    source: 'prikaz318',
  },
]
