import type { Chapter, ChapterId, Stage, StageId } from '../types'
import { PREPARE_STAGES } from './prepare'
import { APPLY_STAGES } from './apply'
import { CONTEST_STAGES } from './contest'
import { AWARDED_STAGES } from './awarded'
import { ABROAD_STAGES } from './abroad'

export const CHAPTERS: Chapter[] = [
  {
    id: 'prepare',
    title: { ru: 'Подготовка', kk: 'Дайындық', en: 'Preparation' },
    subtitle: {
      ru: 'Проверяем соответствие, выбираем специальность, вуз и добираем язык',
      kk: 'Сәйкестікті тексереміз, мамандық пен ЖОО таңдап, тілді жетілдіреміз',
      en: 'Check eligibility, choose a specialty and university, sort out the language',
    },
  },
  {
    id: 'apply',
    title: { ru: 'Подача', kk: 'Тапсыру', en: 'Application' },
    subtitle: {
      ru: 'Собираем пакет документов и подаём заявку в срок приёма',
      kk: 'Құжаттар топтамасын жинап, қабылдау мерзімінде өтініш береміз',
      en: 'Assemble the documents and apply within the intake window',
    },
  },
  {
    id: 'contest',
    title: { ru: 'Конкурс', kk: 'Конкурс', en: 'Competition' },
    subtitle: {
      ru: 'Три тура: тестирование, собеседование и решение комиссии',
      kk: 'Үш тур: тестілеу, әңгімелесу және комиссия шешімі',
      en: 'Three rounds: testing, interview and the commission decision',
    },
  },
  {
    id: 'awarded',
    title: { ru: 'После присуждения', kk: 'Тағайындалғаннан кейін', en: 'After the award' },
    subtitle: {
      ru: 'Договор, обеспечение обязательств, языковые курсы и выезд',
      kk: 'Шарт, міндеттемелерді қамтамасыз ету, тіл курстары және шығу',
      en: 'Contract, security of obligations, language courses and departure',
    },
  },
  {
    id: 'abroad',
    title: { ru: 'Обучение и обязательства', kk: 'Оқу және міндеттемелер', en: 'Study and obligations' },
    subtitle: {
      ru: 'Учёба за рубежом, возвращение и трудовая отработка',
      kk: 'Шетелде оқу, оралу және еңбек өтеу',
      en: 'Studying abroad, returning home and the work-back',
    },
  },
]

export const CHAPTER_ORDER: ChapterId[] = CHAPTERS.map((c) => c.id)

export const STAGES: Stage[] = [...PREPARE_STAGES, ...APPLY_STAGES, ...CONTEST_STAGES, ...AWARDED_STAGES, ...ABROAD_STAGES]

export const STAGE_BY_ID = new Map<StageId, Stage>(STAGES.map((s) => [s.id, s]))

export const getStage = (id: StageId): Stage | undefined => STAGE_BY_ID.get(id)

export const getChapter = (id: ChapterId): Chapter => CHAPTERS.find((c) => c.id === id)!
