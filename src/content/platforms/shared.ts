import type { L, StagePatches } from '../types'

/**
 * Wording the three degree platforms share — bachelor, master and doctorate all study at a
 * listed university, sign a study contract and come back with a diploma. Each of them
 * merges this under its own patches, so only what genuinely differs is written twice.
 */
export const ACADEMIC_STAGES: StagePatches = {
  contract: {
    checklist: {
      main_contract: {
        ru: 'Подписали договор на организацию обучения по типовой форме.',
        kk: 'Оқуды ұйымдастыру туралы шартқа үлгі нысан бойынша қол қойдыңыз.',
        en: 'You signed the study organisation contract on the standard form.',
      },
    },
  },
  departure: {
    links: { guarantee_letter: 'stipendiat_master' },
    checklist: {
      guarantee_letter: {
        ru: 'Написали заявление, получили письмо о финансовой гарантии и отправили скан в вуз.',
        kk: 'Өтініш жазып, қаржылық кепілдік хатын алдыңыз және сканын ЖОО-ға жібердіңіз.',
        en: 'You filed the request, got the financial guarantee letter and sent a scan to the university.',
      },
    },
  },
  studying: {
    links: { consular: 'stipendiat_master' },
  },
  return: {
    checklist: {
      application: {
        ru: 'Отправили куратору заявление о завершении учёбы — по установленной форме.',
        kk: 'Кураторға оқуды аяқтау туралы өтінішті белгіленген нысанда жібердіңіз.',
        en: 'You sent your curator the completion-of-study application on the standard form.',
      },
    },
  },
}

/** What ПП 573's spending directions pay for on any degree programme (Appendix, п. 1). */
export const ACADEMIC_COVERAGE: L[] = [
  { ru: 'Обучение в вузе', kk: 'ЖОО-дағы оқу', en: 'Tuition' },
  { ru: 'Проживание, питание и учебная литература', kk: 'Тұру, тамақ және оқу әдебиеті', en: 'Accommodation, meals and textbooks' },
  { ru: 'Подача до 5 анкет в зарубежные вузы', kk: 'Шетелдік ЖОО-ларға 5-ке дейін анкета беру', en: 'Up to 5 applications to foreign universities' },
  { ru: 'Виза и её продление (консульский сбор)', kk: 'Виза және оны ұзарту (консулдық алым)', en: 'The visa and its renewal (consular fee)' },
  { ru: 'Проезд к месту учёбы и обратно, а при учёбе дольше года — к началу и после каждого учебного года', kk: 'Оқу орнына барып-қайту, бір жылдан ұзақ оқығанда — әр оқу жылының басында және соңында', en: 'Travel to the place of study and back — and, for programmes over a year, at the start and end of each year' },
  { ru: 'Медицинская страховка и обязательное медобследование', kk: 'Медициналық сақтандыру және міндетті медициналық тексеру', en: 'Medical insurance and mandatory medical checks' },
  { ru: 'Регистрация в стране обучения, банковская карта, транскрипты от вуза', kk: 'Оқу елінде тіркелу, банк картасы, ЖОО транскрипттері', en: 'Registration in the host country, a bank card, transcripts from the university' },
]

export const FREE_TUITION_NOTE: L = {
  ru: 'Если вуз учит вас бесплатно, стипендия покрывает всё остальное, кроме самого обучения.',
  kk: 'ЖОО сізді тегін оқытса, стипендия оқудың өзінен басқаның бәрін жабады.',
  en: 'If the university teaches you for free, the scholarship covers everything except the tuition itself.',
}

/** The two work-back mistakes every degree platform shares (ПП 573 п. 24, 25). */
export const ACADEMIC_WORKBACK_MISTAKES: L[] = [
  {
    ru: 'Работать по двум местам сразу: при параллельных пенсионных отчислениях отработка засчитывается только там, где предусмотрен наибольший срок.',
    kk: 'Бір мезгілде екі жерде жұмыс істеу: қатар зейнетақы аударымдары болса, өтеу ең ұзақ мерзім көзделген жерде ғана есептеледі.',
    en: 'Working two jobs at once: with parallel pension contributions, only the position with the longest required term counts.',
  },
  {
    ru: 'Забыть про сокращение срока на год: оно даётся, если всё обучение было бесплатным и успеваемость по договору выдержана.',
    kk: 'Мерзімнің бір жылға қысқаруын ұмыту: ол бүкіл оқу тегін болып, шарттағы үлгерім сақталғанда беріледі.',
    en: 'Forgetting the one-year reduction: it applies when the whole programme was free and the contractual grades were kept.',
  },
]
