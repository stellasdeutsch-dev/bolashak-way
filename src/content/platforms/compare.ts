import type { L, PlatformSlug, SourceId } from '../types'

/**
 * The one place where all five programmes stand side by side — the chooser, for someone
 * who does not yet know which one is theirs. Every row restates facts the platforms carry
 * themselves, with the same sources.
 */
export interface CompareRow {
  id: string
  label: L
  cells: Record<PlatformSlug, L>
  sources: SourceId[]
}

const same = (l: L, except: Partial<Record<PlatformSlug, L>> = {}): Record<PlatformSlug, L> => ({
  bachelor: except.bachelor ?? l,
  master: except.master ?? l,
  doctorate: except.doctorate ?? l,
  internship: except.internship ?? l,
  science: except.science ?? l,
})

export const COMPARE: CompareRow[] = [
  {
    id: 'what',
    label: { ru: 'Что вы получаете', kk: 'Не аласыз', en: 'What you get' },
    cells: {
      bachelor: { ru: 'Степень бакалавра', kk: 'Бакалавр дәрежесі', en: "A bachelor's degree" },
      master: { ru: 'Степень магистра', kk: 'Магистр дәрежесі', en: "A master's degree" },
      doctorate: { ru: 'PhD, доктор по профилю или резидентура', kk: 'PhD, бейіні бойынша доктор не резидентура', en: 'A PhD, professional doctorate or residency' },
      internship: { ru: 'Стажировку в зарубежной организации', kk: 'Шетелдік ұйымда тағылымдама', en: 'An internship at a foreign host' },
      science: { ru: 'Исследовательскую стажировку', kk: 'Зерттеу тағылымдамасы', en: 'A research placement' },
    },
    sources: ['pp573', 'pp791'],
  },
  {
    id: 'need',
    label: { ru: 'Что нужно иметь', kk: 'Не болуы керек', en: 'What you need to have' },
    cells: {
      bachelor: { ru: 'Аттестат и диплом международной олимпиады или конкурса за 3 года', kk: 'Аттестат және соңғы 3 жылдағы халықаралық олимпиада не конкурс дипломы', en: 'A school certificate and an international olympiad or contest diploma from the last 3 years' },
      master: { ru: 'Диплом бакалавра или специалиста; льготным — ещё стаж и GPA 3.00', kk: 'Бакалавр не маман дипломы; жеңілдіктілерге — өтіл және GPA 3.00', en: "A bachelor's or specialist diploma; preferential categories also need experience and GPA 3.00" },
      doctorate: { ru: 'Высшее образование и приглашение из вуза Списка', kk: 'Жоғары білім және Тізімдегі ЖОО шақыруы', en: 'Higher education and an offer from a listed university' },
      internship: { ru: 'Высшее образование, 3 года стажа, из них 12 месяцев подряд по своей области', kk: 'Жоғары білім, 3 жыл өтіл, оның 12 айы өз саласында қатарынан', en: 'Higher education, 3 years of experience, the last 12 months in a row in your field' },
      science: { ru: 'Учёная степень от магистра, 12 месяцев в науке, публикации', kk: 'Магистрден бастап ғылыми дәреже, ғылымда 12 ай, жарияланымдар', en: "A degree from master's up, 12 months in research, publications" },
    },
    sources: ['pp573', 'pravila', 'pp791'],
  },
  {
    id: 'invite',
    label: { ru: 'Приглашение при подаче', kk: 'Тапсыру кезіндегі шақыру', en: 'Offer needed to apply' },
    cells: same(
      { ru: 'Да — безусловное, из вуза Списка', kk: 'Иә — сөзсіз, Тізімдегі ЖОО-дан', en: 'Yes — unconditional, from a listed university' },
      {
        master: { ru: 'Если поступаете сами — да; льготным — нет, вуз после конкурса', kk: 'Өз бетіңізше түссеңіз — иә; жеңілдіктілерге — жоқ, ЖОО конкурстан кейін', en: 'Yes if self-admitted; preferential categories — no, the university comes after the competition' },
        internship: { ru: 'Да — от принимающей организации', kk: 'Иә — қабылдаушы ұйымнан', en: 'Yes — from the host organisation' },
        science: { ru: 'Да — от организации из списка научных стажировок', kk: 'Иә — ғылыми тағылымдама тізіміндегі ұйымнан', en: 'Yes — from a host on the scientific-internship list' },
      },
    ),
    sources: ['pp573', 'pp791'],
  },
  {
    id: 'length',
    label: { ru: 'Срок за рубежом', kk: 'Шетелдегі мерзім', en: 'Time abroad' },
    cells: same(
      { ru: 'Срок обучения в вузе', kk: 'ЖОО-дағы оқу мерзімі', en: "The university's programme length" },
      {
        internship: { ru: 'До 12 месяцев', kk: '12 айға дейін', en: 'Up to 12 months' },
        science: { ru: 'От 3 до 12 месяцев', kk: '3-тен 12 айға дейін', en: '3 to 12 months' },
      },
    ),
    sources: ['pp573', 'pp791'],
  },
  {
    id: 'language',
    label: { ru: 'Иностранный язык', kk: 'Шет тілі', en: 'Foreign language' },
    cells: {
      bachelor: { ru: 'По требованию вуза — сертификат в пакет не входит', kk: 'ЖОО талабы бойынша — сертификат топтамаға кірмейді', en: "As the university requires — no certificate in the package" },
      master: { ru: 'Льготным — I порог и курсы; поступающим сами — III порог', kk: 'Жеңілдіктілерге — I шек және курстар; өз бетіншелерге — III шек', en: 'Preferential — level I plus courses; self-admitted — level III' },
      doctorate: { ru: 'III порог — уровень прямого зачисления', kk: 'III шек — тікелей қабылдау деңгейі', en: 'Level III — the direct-admission level' },
      internship: { ru: 'III порог, например IELTS 5.0', kk: 'III шек, мысалы IELTS 5.0', en: 'Level III, e.g. IELTS 5.0' },
      science: { ru: 'Своя таблица: английский — IELTS 5.0', kk: 'Өз кестесі: ағылшын — IELTS 5.0', en: 'Its own table: English — IELTS 5.0' },
    },
    sources: ['prikaz318', 'ns_minscore'],
  },
  {
    id: 'submit',
    label: { ru: 'Как подают', kk: 'Қалай тапсырады', en: 'How you apply' },
    cells: same(
      { ru: 'Через egov.kz', kk: 'egov.kz арқылы', en: 'Through egov.kz' },
      { science: { ru: 'В Центр нарочно: бумага и сканы (правила допускают и egov.kz)', kk: 'Орталыққа қолма-қол: қағаз бен сканерлер (қағида egov.kz-ті де рұқсат етеді)', en: 'By hand at the Center: paper and scans (the rules also allow egov.kz)' } },
    ),
    sources: ['pp573', 'ns_documents', 'pp791'],
  },
  {
    id: 'contract',
    label: { ru: 'Договор после присуждения', kk: 'Тағайындалғаннан кейінгі шарт', en: 'Contract after the award' },
    cells: same(
      { ru: '90 дней; залог или гарантия', kk: '90 күн; кепіл не кепілдік', en: '90 days; a pledge or guarantee' },
      { science: { ru: '60 дней; два гаранта', kk: '60 күн; екі кепілгер', en: '60 days; two guarantors' } },
    ),
    sources: ['pp573', 'pp791', 'ns_about'],
  },
  {
    id: 'workback',
    label: { ru: 'Отработка', kk: 'Өтеу', en: 'Work-back' },
    cells: {
      bachelor: { ru: '5 лет в Астане, Алматы, Шымкенте или 3 года в регионах', kk: 'Астана, Алматы, Шымкентте 5 жыл не өңірлерде 3 жыл', en: '5 years in Astana, Almaty, Shymkent or 3 in the regions' },
      master: { ru: '5 или 3 года; госслужащим и атомщикам — 3 года', kk: '5 не 3 жыл; мемқызметшілер мен атомшыларға — 3 жыл', en: '5 or 3 years; civil servants and nuclear workers — 3' },
      doctorate: { ru: '5 или 3 года; атомщикам — 3 года у работодателя', kk: '5 не 3 жыл; атомшыларға — жұмыс берушіде 3 жыл', en: '5 or 3 years; nuclear workers — 3 with the employer' },
      internship: { ru: '3 года у своего работодателя', kk: 'Өз жұмыс берушіде 3 жыл', en: '3 years with your employer' },
      science: { ru: '3 года подряд у своего работодателя', kk: 'Өз жұмыс берушіде қатарынан 3 жыл', en: '3 years in a row with your employer' },
    },
    sources: ['pp573', 'pp791'],
  },
  {
    id: 'act',
    label: { ru: 'Правила', kk: 'Қағида', en: 'Rules' },
    cells: same({ ru: 'ПП РК № 573', kk: 'ҚР ҮҚ № 573', en: 'Decree No. 573' }, { science: { ru: 'ПП РК № 791', kk: 'ҚР ҮҚ № 791', en: 'Decree No. 791' } }),
    sources: ['pp573', 'pp791'],
  },
]

/**
 * Two questions that settle which platform is yours. The answers lead to a slug, never to
 * a verdict on eligibility — that is each platform's own first stage.
 */
export interface FinderOption {
  id: string
  label: L
  hint?: L
  next?: string
  result?: PlatformSlug
}

export interface FinderQuestion {
  id: string
  q: L
  options: FinderOption[]
}

export const FINDER: FinderQuestion[] = [
  {
    id: 'goal',
    q: { ru: 'Что вам нужно за рубежом?', kk: 'Шетелде сізге не керек?', en: 'What do you want abroad?' },
    options: [
      { id: 'degree', label: { ru: 'Степень — учиться в вузе', kk: 'Дәреже — ЖОО-да оқу', en: 'A degree — to study at a university' }, next: 'level' },
      { id: 'placement', label: { ru: 'Опыт — стажировка на срок до года', kk: 'Тәжірибе — бір жылға дейінгі тағылымдама', en: 'Experience — a placement of up to a year' }, next: 'who' },
    ],
  },
  {
    id: 'level',
    q: { ru: 'Какое образование у вас уже есть?', kk: 'Сізде қандай білім бар?', en: 'What education do you already have?' },
    options: [
      { id: 'school', label: { ru: 'Школа или колледж', kk: 'Мектеп не колледж', en: 'School or college' }, hint: { ru: 'и диплом международной олимпиады', kk: 'және халықаралық олимпиада дипломы', en: 'plus an international olympiad diploma' }, result: 'bachelor' },
      { id: 'bachelor', label: { ru: 'Бакалавр или специалист', kk: 'Бакалавр не маман', en: 'Bachelor or specialist' }, result: 'master' },
      { id: 'phd', label: { ru: 'Иду на PhD, доктора по профилю или в резидентуру', kk: 'PhD, бейіні бойынша доктор не резидентураға барамын', en: 'Going for a PhD, professional doctorate or residency' }, result: 'doctorate' },
    ],
  },
  {
    id: 'who',
    q: { ru: 'Кто вы по работе?', kk: 'Жұмыс бойынша кімсіз?', en: 'What is your work?' },
    options: [
      { id: 'worker', label: { ru: 'Специалист в своей отрасли', kk: 'Өз саласының маманы', en: 'A professional in my field' }, hint: { ru: 'инженер, педагог, медик, госслужащий и другие', kk: 'инженер, педагог, медик, мемқызметші және басқалар', en: 'engineer, teacher, medic, civil servant and others' }, result: 'internship' },
      { id: 'scientist', label: { ru: 'Учёный со степенью и публикациями', kk: 'Дәрежесі мен жарияланымы бар ғалым', en: 'A researcher with a degree and publications' }, result: 'science' },
    ],
  },
]
