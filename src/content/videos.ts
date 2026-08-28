import type { StageId, VideoItem } from './types'

/**
 * Official videos from the Center for International Programmes' own YouTube channel
 * (https://www.youtube.com/@bolashaqpresidentialschola8029). Titles, dates and durations
 * are copied verbatim from the channel — we never summarise what a video says, because
 * a video from an earlier competition year can describe rules that have since changed.
 * The upload date is always shown next to the title for exactly that reason.
 */
export const VIDEOS: VideoItem[] = [
  {
    id: 'rules_overview',
    clips: [
      { lang: 'ru', youtubeId: 'eO7T9k92kto', title: '«Болашақ 2025: новые правила, новые возможности»', published: '2025-04-17', durationSec: 190 },
      { lang: 'kk', youtubeId: 'OIw9Tb7MKec', title: '«Болашақ 2025: жаңа ережелер мен мүмкіндіктер»', published: '2025-04-17', durationSec: 188 },
    ],
  },
  {
    id: 'changes_talk',
    clips: [
      { lang: 'ru', youtubeId: 'qWluTGtQDJQ', title: '"Важная тема LIVE": Главные изменения в программе "Болашак"', published: '2024-04-29', durationSec: 1552 },
    ],
  },
  {
    id: 'ns_rules',
    stage: 'eligibility',
    appliesTo: { track: ['science_internship'] },
    clips: [
      { lang: 'ru', youtubeId: 'aOsQAV4uDKc', title: 'Новые правила научных стажировок - смотрите в нашем видео!', published: '2025-05-02', durationSec: 100 },
      { lang: 'kk', youtubeId: 'NxRkkIkz4NM', title: 'Ғылыми тағылымдамалардың жаңа қағидаларын біздің бейнероликтен көріңіздер!', published: '2025-05-02', durationSec: 99 },
    ],
  },
  {
    id: 'university_admission',
    stage: 'university',
    clips: [
      { lang: 'kk', youtubeId: 'Xa6NBH9IzUE', title: 'Шетелдік ЖОО-ларға түсу', published: '2022-12-02', durationSec: 857 },
    ],
  },
  {
    id: 'foreign_exam',
    stage: 'foreign',
    clips: [
      { lang: 'ru', youtubeId: 'CYkJ6sc8MZQ', title: 'Как сдать экзамен по иностранному языку?', published: '2023-04-18', durationSec: 3200 },
    ],
  },
  {
    id: 'documents_howto',
    stage: 'documents',
    clips: [
      { lang: 'ru', youtubeId: '63vBxsMIkYs', title: 'Видеоинструкция по подаче документов', published: '2023-08-10', durationSec: 238 },
      { lang: 'kk', youtubeId: 'JJcP7CAfwv4', title: 'Құжаттарды тапсыру бойынша бейне нұсқаулық', published: '2023-08-10', durationSec: 127 },
    ],
  },
  {
    id: 'apply_egov',
    stage: 'apply',
    appliesTo: { not: { track: ['science_internship'] } },
    clips: [
      { lang: 'ru', youtubeId: 'uFwdzBv0854', title: 'Как подать документы через портал eGov?', published: '2023-04-25', durationSec: 184 },
      { lang: 'kk', youtubeId: 'Gs3Bz5SpT90', title: 'eGov арқылы құжат қалай тапсыруға болады?', published: '2023-04-25', durationSec: 170 },
    ],
  },
  {
    id: 'apply_walkthrough',
    stage: 'apply',
    appliesTo: { not: { track: ['science_internship'] } },
    clips: [
      { lang: 'ru', youtubeId: 'pQ4kbf_jVPY', title: 'Как подать документы на стипендию «Болашак»?', published: '2023-03-31', durationSec: 1826 },
    ],
  },
  {
    id: 'apply_ns',
    stage: 'apply',
    appliesTo: { track: ['science_internship'] },
    clips: [
      { lang: 'ru', youtubeId: 'tNMk0uePWgk', title: 'Как онлайн подать документы на научные стажировки «500 ученых»?', published: '2024-06-08', durationSec: 351 },
      { lang: 'kk', youtubeId: 'rtDbi8VIA7Q', title: '«500 ғалым» ғылыми тағылымдамадан өтуге онлайн қалай тапсыруға болады?', published: '2024-06-08', durationSec: 499 },
    ],
  },
  {
    id: 'contest_prep',
    stage: 'testing',
    clips: [
      { lang: 'ru', youtubeId: 'YQefL3Zvv9M', title: 'Как подготовиться к конкурсному отбору по программе "Болашак"?', published: '2022-06-13', durationSec: 103 },
    ],
  },
  {
    id: 'curator',
    stage: 'studying',
    clips: [
      { lang: 'ru', youtubeId: '_mTVADIgc0o', title: '5 вопросов куратору', published: '2024-07-31', durationSec: 102 },
      { lang: 'kk', youtubeId: '56kWT5pbGq8', title: 'Кураторға 5 сұрақ', published: '2024-07-31', durationSec: 91 },
    ],
  },
]

export function videosForStage(stage: StageId): VideoItem[] {
  return VIDEOS.filter((v) => v.stage === stage)
}

/** Videos that explain the programme as a whole rather than one stage. */
export const OVERVIEW_VIDEOS: VideoItem[] = VIDEOS.filter((v) => !v.stage)
