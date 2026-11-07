import type { Chapter, ChapterId, L, Track } from '../types'
import { CHAPTERS } from '../stages'

/**
 * The five chapters in each programme's own words. The shared subtitles named things only
 * some programmes have – language courses, a university, a degree – so every platform
 * says what its own chapter holds.
 */
const SAME_APPLY: L = {
  ru: 'Пакет документов и подача через egov.kz в срок приёма',
  kk: 'Құжаттар топтамасы және қабылдау мерзімінде egov.kz арқылы тапсыру',
  en: 'The document package and applying through egov.kz within the intake window',
}
const SAME_CONTEST: L = {
  ru: 'Три тура: тестирование, собеседование и решение комиссии',
  kk: 'Үш тур: тестілеу, әңгімелесу және комиссия шешімі',
  en: 'Three rounds: testing, an interview and the commission decision',
}
const STUDY_TITLE: L = { ru: 'Учёба и отработка', kk: 'Оқу және өтеу', en: 'Study and work-back' }
const INTERN_TITLE: L = { ru: 'Стажировка и отработка', kk: 'Тағылымдама және өтеу', en: 'Internship and work-back' }
const AWARD_TITLE: L = { ru: 'После присуждения', kk: 'Тағайындалғаннан кейін', en: 'After the award' }

type Words = Partial<Record<ChapterId, { title?: L; subtitle: L }>>

const WORDS: Record<Track, Words> = {
  bachelor: {
    prepare: {
      subtitle: {
        ru: 'Три условия, специальность по предмету олимпиады, вуз и казахский язык',
        kk: 'Үш шарт, олимпиада пәні бойынша мамандық, ЖОО және қазақ тілі',
        en: 'Three conditions, a specialty in your olympiad subject, a university and Kazakh',
      },
    },
    apply: { subtitle: SAME_APPLY },
    contest: { subtitle: SAME_CONTEST },
    awarded: {
      title: AWARD_TITLE,
      subtitle: { ru: 'Договор за 90 дней, обеспечение и выезд на учёбу', kk: '90 күнде шарт, қамтамасыз ету және оқуға шығу', en: 'The contract within 90 days, the security and leaving to study' },
    },
    abroad: {
      title: STUDY_TITLE,
      subtitle: { ru: 'Учёба, возвращение и 5 или 3 года работы в Казахстане', kk: 'Оқу, оралу және Қазақстанда 5 не 3 жыл жұмыс', en: 'Study, return and 5 or 3 years of work in Kazakhstan' },
    },
  },
  master: {
    prepare: {
      subtitle: { ru: 'Категория, специальность, вуз и языки', kk: 'Санат, мамандық, ЖОО және тілдер', en: 'Category, specialty, university and languages' },
    },
    apply: { subtitle: SAME_APPLY },
    contest: { subtitle: SAME_CONTEST },
    awarded: {
      title: AWARD_TITLE,
      subtitle: {
        ru: 'Договор за 90 дней; льготным категориям – языковые курсы и поступление; затем выезд',
        kk: '90 күнде шарт; жеңілдікті санаттарға – тіл курстары және түсу; содан кейін шығу',
        en: 'The contract within 90 days; preferential categories take language courses and apply; then departure',
      },
    },
    abroad: {
      title: STUDY_TITLE,
      subtitle: { ru: 'Учёба, возвращение и отработка – от 3 до 5 лет', kk: 'Оқу, оралу және өтеу – 3-тен 5 жылға дейін', en: 'Study, return and the work-back – three to five years' },
    },
  },
  phd_residency: {
    prepare: {
      subtitle: {
        ru: 'Формат, специальность, вуз, приглашение и учебный план',
        kk: 'Формат, мамандық, ЖОО, шақыру және оқу жоспары',
        en: 'Format, specialty, university, offer and study plan',
      },
    },
    apply: { subtitle: SAME_APPLY },
    contest: { subtitle: SAME_CONTEST },
    awarded: {
      title: AWARD_TITLE,
      subtitle: { ru: 'Договор за 90 дней, обеспечение и выезд', kk: '90 күнде шарт, қамтамасыз ету және шығу', en: 'The contract within 90 days, the security and departure' },
    },
    abroad: {
      title: STUDY_TITLE,
      subtitle: { ru: 'Учёба, возвращение и отработка – 5 или 3 года', kk: 'Оқу, оралу және өтеу – 5 не 3 жыл', en: 'Study, return and the work-back – five or three years' },
    },
  },
  internship: {
    prepare: {
      subtitle: {
        ru: 'Категория и стаж, принимающая организация, приглашение и программа стажировки',
        kk: 'Санат пен өтіл, қабылдаушы ұйым, шақыру және тағылымдама бағдарламасы',
        en: 'Category and experience, the host, the invitation and the internship programme',
      },
    },
    apply: { subtitle: SAME_APPLY },
    contest: { subtitle: SAME_CONTEST },
    awarded: {
      title: AWARD_TITLE,
      subtitle: { ru: 'Договор за 90 дней, обеспечение и выезд на стажировку', kk: '90 күнде шарт, қамтамасыз ету және тағылымдамаға шығу', en: 'The contract within 90 days, the security and leaving for the internship' },
    },
    abroad: {
      title: INTERN_TITLE,
      subtitle: { ru: 'Стажировка по программе, возвращение и 3 года у своего работодателя', kk: 'Бағдарлама бойынша тағылымдама, оралу және өз жұмыс берушіде 3 жыл', en: 'The internship to programme, return and 3 years with your employer' },
    },
  },
  science_internship: {
    prepare: {
      subtitle: {
        ru: 'Степень, стаж и публикации, направление и организация',
        kk: 'Дәреже, өтіл мен жарияланымдар, бағыт және ұйым',
        en: 'Degree, experience and publications, research area and host',
      },
    },
    apply: {
      subtitle: { ru: 'Пакет документов – оригиналы и копии – и сдача в Центр', kk: 'Құжаттар топтамасы – түпнұсқа мен көшірмелер – және Орталыққа тапсыру', en: 'The package – originals and copies – handed in at the Center' },
    },
    contest: {
      subtitle: { ru: 'Три тура: тестирование, собеседование с экспертами и решение комиссии', kk: 'Үш тур: тестілеу, сарапшылармен әңгімелесу және комиссия шешімі', en: 'Three rounds: testing, an interview with experts and the commission decision' },
    },
    awarded: {
      title: AWARD_TITLE,
      subtitle: { ru: 'Договор за 90 дней, два гаранта, аванс и виза', kk: '90 күнде шарт, екі кепілгер, аванс және виза', en: 'The contract within 90 days, two guarantors, the advance and the visa' },
    },
    abroad: {
      title: INTERN_TITLE,
      subtitle: { ru: 'Научная стажировка, отчёт за месяц и 3 года у своего работодателя', kk: 'Ғылыми тағылымдама, бір айда есеп және өз жұмыс берушіде 3 жыл', en: 'The placement, a report within a month and 3 years with your employer' },
    },
  },
}

export function chapterFor(ch: Chapter, track: Track): Chapter {
  const w = WORDS[track][ch.id]
  return w ? { ...ch, title: w.title ?? ch.title, subtitle: w.subtitle } : ch
}

export const chaptersFor = (track: Track): Chapter[] => CHAPTERS.map((ch) => chapterFor(ch, track))
