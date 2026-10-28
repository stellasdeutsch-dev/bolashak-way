import type { PlatformHome, StagePatches } from '../types'

/**
 * Scientific internship platform. A separate programme with its own act — the Rules approved
 * by приказ и.о. Министра науки и высшего образования РК от 18.08.2023 № 422 (source
 * ns_rules422; ПП 791 is repealed) — its own list of hosts and research directions,
 * submission through egov.kz and/or on paper, a 90-day contract secured by two guarantors,
 * and a final report within a month of coming back.
 */

export const SCIENCE_STAGES: StagePatches = {
  eligibility: {
    links: { citizen: 'ns_rules422', education: 'ns_rules422', no_debt: 'ns_rules422', pension_age: 'ns_requirements' },
    summary: {
      ru: 'Гражданство, учёная степень, незакрытая отработка и запас времени до пенсии.',
      kk: 'Азаматтық, ғылыми дәреже, жабылмаған өтеу және зейнетке дейінгі уақыт.',
      en: 'Citizenship, an academic degree, any unfinished work-back and time left before retirement.',
    },
    inShort: {
      what: { ru: 'Самопроверка перед стартом: проходите ли вы по базовым условиям научной стажировки.', kk: 'Бастар алдындағы өзін-өзі тексеру: ғылыми тағылымдаманың негізгі шарттарына сай келесіз бе.', en: 'A self-check before you start: do you clear the basic conditions for a scientific internship.' },
      you: { ru: 'Пять минут и честные ответы: гражданство, степень, незакрытая отработка по прошлым стажировкам и время до пенсии.', kk: 'Бес минут және шыншыл жауап: азаматтық, дәреже, өткен тағылымдамалар бойынша жабылмаған өтеу және зейнетке дейінгі уақыт.', en: 'Five minutes and honest answers: citizenship, degree, unfinished work-back from earlier internships and time to retirement.' },
      result: { ru: 'Понимание, стоит ли начинать.', kk: 'Бастауға тұра ма, соны түсіну.', en: 'You know whether to start.' },
    },
    checklist: {
      education: {
        ru: 'У вас есть учёная степень: доктор наук, кандидат наук, PhD, доктор по профилю или магистр.',
        kk: 'Сізде ғылыми дәреже бар: ғылым докторы, ғылым кандидаты, PhD, бейіні бойынша доктор не магистр.',
        en: 'You hold an academic degree: Doctor of Sciences, Candidate of Sciences, PhD, professional doctor or master.',
      },
      pension_age: {
        ru: 'Стажировка и отработка после неё укладываются до пенсионного возраста по статье 207 Социального кодекса.',
        kk: 'Тағылымдама мен одан кейінгі өтеу Әлеуметтік кодекстің 207-бабы бойынша зейнеткерлік жасқа дейін сыяды.',
        en: 'The internship and the work-back after it fit before retirement age under article 207 of the Social Code.',
      },
      no_debt: {
        ru: 'За вами нет невыполненной отработки после прошлой научной стажировки или стажировки по программе «Болашак» — с ней к конкурсу не допускают.',
        kk: 'Өткен ғылыми тағылымдамадан не «Болашақ» бағдарламасы бойынша тағылымдамадан кейін орындалмаған өтеу жоқ — онымен конкурсқа жібермейді.',
        en: 'You have no unfinished work-back from an earlier scientific internship or a Bolashak-programme internship — with one you are not admitted.',
      },
    },
    mistakes: [
      {
        ru: 'Думать, что отработка — дело далёкого будущего. Её срок проверяют уже при подаче.',
        kk: 'Өтеуді алыс болашақтың ісі деп ойлау. Оның мерзімін тапсыру кезінде-ақ тексереді.',
        en: 'Treating the work-back as something far off. Its length is checked when you apply.',
      },
    ],
    sources: ['ns_rules422', 'ns_requirements'],
  },

  category: {
    links: { experience: 'ns_requirements', employer: 'ns_employer_form' },
    kicker: { ru: 'Кто может подать', kk: 'Кім тапсыра алады', en: 'Who can apply' },
    title: { ru: 'Требования к учёному', kk: 'Ғалымға қойылатын талаптар', en: 'What a researcher needs' },
    summary: {
      ru: 'Учёная степень, 12 месяцев работы в науке, публикации и заявка работодателя.',
      kk: 'Ғылыми дәреже, ғылымдағы 12 ай жұмыс, жарияланымдар және жұмыс беруші өтінімі.',
      en: 'An academic degree, 12 months in research, publications and an employer request.',
    },
    why: {
      ru: 'Научная стажировка — отдельная программа со своими правилами (приказ МНВО № 422). Претендент — научный работник, у которого есть учёная степень — от магистра до доктора наук; 12 месяцев непрерывной работы в выбранной области исследований в аккредитованной научной организации, подтверждённых пенсионными отчислениями; хотя бы одна статья или обзор в Web of Science или Scopus, статья в издании из Списка 1 или 2 и (или) международная заявка в Derwent Innovations Index; заявка работодателя с сохранением места.',
      kk: 'Ғылыми тағылымдама — өз қағидасы бар бөлек бағдарлама (ҒЖБМ № 422 бұйрығы). Үміткер — ғылыми қызметкер, оның ғылыми дәрежесі — магистрден ғылым докторына дейін; аккредиттелген ғылыми ұйымда таңдаған зерттеу саласында зейнетақы аударымдарымен расталған 12 ай үздіксіз жұмысы; Web of Science не Scopus-та кемінде бір мақаласы не шолуы, 1 не 2 Тізімдегі басылымда мақаласы және (немесе) Derwent Innovations Index-те халықаралық өтінімі; орынды сақтайтын жұмыс беруші өтінімі болуы керек.',
      en: 'The scientific internship is a separate programme with its own rules (Order No. 422 of the Ministry of Science and Higher Education). The applicant is a research worker with an academic degree — from master to Doctor of Sciences; 12 continuous months in the chosen research area at an accredited research organisation, backed by pension contributions; at least one article or review in Web of Science or Scopus, an article in a List 1 or 2 journal, and/or an international application in the Derwent Innovations Index; and an employer request that keeps the job.',
    },
    inShort: {
      what: { ru: 'Проверка требований к учёному.', kk: 'Ғалымға қойылатын талаптарды тексеру.', en: 'A check of the researcher requirements.' },
      you: { ru: 'Сверить степень, стаж, публикации и договориться с работодателем о заявке.', kk: 'Дәрежені, өтілді, жарияланымдарды салыстырып, жұмыс берушімен өтінім туралы келісу.', en: 'Check your degree, experience and publications and agree the request with your employer.' },
      result: { ru: 'Уверенность, что вы проходите по всем требованиям.', kk: 'Барлық талапқа сай келетініңізге сенім.', en: 'Confidence that you meet every requirement.' },
    },
    mistakes: [
      {
        ru: 'Считать стаж в целом. Нужны 12 месяцев подряд именно в выбранной области исследований.',
        kk: 'Өтілді жалпы есептеу. Дәл таңдаған зерттеу саласында қатарынан 12 ай керек.',
        en: 'Counting experience overall. It has to be 12 months in a row in the chosen research area.',
      },
      {
        ru: 'Работать в организации без аккредитации: стаж нужен в аккредитованном субъекте научной деятельности.',
        kk: 'Аккредиттеусіз ұйымда жұмыс істеу: өтіл аккредиттелген ғылыми қызмет субъектісінде керек.',
        en: 'Working at an unaccredited organisation: the experience has to be at an accredited research body.',
      },
      {
        ru: 'Опираться на статью в журнале, который выпал из Scopus или Web of Science за нарушения, — такие статьи не учитываются.',
        kk: 'Бұзушылық үшін Scopus не Web of Science-тен шығарылған журналдағы мақалаға сүйену — ондай мақалалар есептелмейді.',
        en: 'Relying on an article in a journal dropped from Scopus or Web of Science for violations — such articles do not count.',
      },
    ],
    sources: ['ns_requirements', 'ns_rules422', 'ns_documents'],
  },

  specialty: {
    kicker: { ru: 'Что исследовать', kk: 'Нені зерттеу', en: 'What to research' },
    title: { ru: 'Направление исследования', kk: 'Зерттеу бағыты', en: 'Your research direction' },
    summary: {
      ru: 'Стажировка идёт в рамках вашего исследования — по перечню приоритетных направлений.',
      kk: 'Тағылымдама зерттеуіңіз аясында — басым бағыттар тізбесі бойынша өтеді.',
      en: 'The internship serves your research — within the list of priority directions.',
    },
    why: {
      ru: 'Научную стажировку дают в рамках проводимого исследования и только по перечню приоритетных направлений — он приложен к Правилам и сформирован по приоритетам развития науки, которые определяет Высшая научно-техническая комиссия. Не меньше 60% стажировок идёт на естественно-технический блок, не больше 40% — на общественно-гуманитарный. Каждая организация из списка принимает по своим направлениям — поэтому код направления понадобится и при выборе организации.',
      kk: 'Ғылыми тағылымдама жүргізіліп жатқан зерттеу аясында және тек басым бағыттар тізбесі бойынша беріледі — ол Қағидаларға қоса берілген және Жоғары ғылыми-техникалық комиссия айқындайтын ғылымды дамыту басымдықтары бойынша жасалған. Тағылымдамалардың кемінде 60%-ы жаратылыстану-техникалық блокқа, 40%-дан аспайтыны қоғамдық-гуманитарлық блокқа беріледі. Тізімдегі әр ұйым өз бағыттары бойынша қабылдайды — сондықтан бағыт коды ұйым таңдағанда да керек.',
      en: 'A scientific internship is granted within ongoing research and only in the priority directions listed in an appendix to the Rules, built on the science priorities set by the Higher Science and Technology Commission. At least 60% of internships go to the natural-science and engineering block and no more than 40% to the social sciences and humanities. Each listed host takes its own directions — so you will need the direction code when choosing the host too.',
    },
    inShort: {
      what: { ru: 'Проверка, что ваше исследование попадает в приоритетное направление.', kk: 'Зерттеуіңіз басым бағытқа кіретінін тексеру.', en: 'A check that your research falls within a priority direction.' },
      you: { ru: 'Найти своё направление и его код — поиск ниже.', kk: 'Бағытыңызды және оның кодын табу — іздеу төменде.', en: 'Find your direction and its code — the search is below.' },
      result: { ru: 'Код направления, по которому подберёте организацию.', kk: 'Ұйым таңдайтын бағыт коды.', en: 'A direction code to pick your host by.' },
    },
    mistakes: [
      {
        ru: 'Выбрать организацию, которая не принимает по вашему направлению: у каждой в списке свои коды.',
        kk: 'Бағытыңыз бойынша қабылдамайтын ұйымды таңдау: тізімде әрқайсысының өз кодтары бар.',
        en: 'Choosing a host that does not take your direction: each one on the list has its own codes.',
      },
      {
        ru: 'Смотреть перечень прошлого года — он утверждается заново.',
        kk: 'Өткен жылғы тізбеге қарау — ол қайта бекітіледі.',
        en: "Looking at last year's list — it is re-approved.",
      },
    ],
    sources: ['ns_priorities', 'ns_orgs_pdf', 'ns_rules422'],
  },

  university: {
    links: { programme: 'ns_rules422', duration_internship: 'ns_rules422' },
    icon: 'FlaskConical',
    title: { ru: 'Организация из списка научных стажировок', kk: 'Ғылыми тағылымдама тізіміндегі ұйым', en: 'A host from the scientific-internship list' },
    summary: {
      ru: 'Вузы и научные центры из отдельного списка. Срок — от 3 до 12 месяцев.',
      kk: 'Бөлек тізімдегі ЖОО-лар мен ғылыми орталықтар. Мерзімі — 3-тен 12 айға дейін.',
      en: 'Universities and research centres from a separate list. 3 to 12 months.',
    },
    why: {
      ru: 'Стажировка длится от 3 до 12 месяцев в организации из списка, который рабочий орган утверждает на год. Безусловное приглашение должно быть именно от организации из этого списка — порядка индивидуального допуска организаций вне списка в действующих правилах нет. У вузов в списке указаны направления, по которым они принимают; научные центры и иные организации принимают по всем направлениям.',
      kk: 'Тағылымдама жұмыс органы бір жылға бекітетін тізімдегі ұйымда 3-тен 12 айға дейін созылады. Сөзсіз шақыру дәл осы тізімдегі ұйымнан болуы керек — тізімнен тыс ұйымдарды жеке тәртіппен жіберу тәртібі қолданыстағы қағидаларда жоқ. Тізімдегі ЖОО-ларда қабылдайтын бағыттары көрсетілген; ғылыми орталықтар мен өзге ұйымдар барлық бағыт бойынша қабылдайды.',
      en: 'The internship runs 3 to 12 months at a host on the list the working body approves for one year. The unconditional invitation has to come from a host on that list — the current rules have no procedure for admitting hosts off the list individually. Universities on it list the directions they take; research centres and other organisations take every direction.',
    },
    inShort: {
      what: { ru: 'Выбор принимающей организации.', kk: 'Қабылдаушы ұйымды таңдау.', en: 'Choosing the host.' },
      you: { ru: 'Найти организацию по своему направлению — поиск ниже — и договориться о приглашении.', kk: 'Бағытыңыз бойынша ұйымды табу — іздеу төменде — және шақыру туралы келісу.', en: 'Find a host by your direction — the search is below — and arrange the invitation.' },
      result: { ru: 'Организация, которая примет вас по вашему исследованию.', kk: 'Зерттеуіңіз бойынша сізді қабылдайтын ұйым.', en: 'A host that will take you for your research.' },
    },
    checklist: {
      programme: {
        ru: 'Согласовали с организацией исследование, сроки и стоимость стажировки с расшифровкой расчётов.',
        kk: 'Ұйыммен зерттеуді, тағылымдама мерзімі мен құнының есеп-қисабын келістіңіз.',
        en: 'You agreed the research, dates and cost with a breakdown with the host.',
      },
      duration_internship: {
        ru: 'Срок научной стажировки — от 3 до 12 месяцев.',
        kk: 'Ғылыми тағылымдама мерзімі — 3-тен 12 айға дейін.',
        en: 'The scientific internship lasts 3 to 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Договориться с организацией не из списка этого года: приглашение от неё не подойдёт.',
        kk: 'Биылғы тізімде жоқ ұйыммен келісу: оның шақыруы жарамайды.',
        en: "Arranging a host that is not on this year's list: its invitation will not count.",
      },
      {
        ru: 'Планировать меньше 3 или больше 12 месяцев.',
        kk: '3 айдан аз не 12 айдан көп жоспарлау.',
        en: 'Planning fewer than 3 or more than 12 months.',
      },
    ],
    sources: ['ns_orgs', 'ns_orgs_pdf', 'ns_rules422'],
  },

  kazakh: {
    links: { passed: 'ns_minscore' },
    sources: ['ns_minscore', 'ns_rules422', 'qrt', 'kaztest'],
  },

  foreign: {
    links: { know_threshold: 'ns_rules422', meets: 'ns_rules422', validity: null },
    summary: {
      ru: 'Своя таблица минимальных баллов: английский — IELTS 5.0, для русского языка порога нет.',
      kk: 'Ең төменгі балдардың өз кестесі: ағылшын — IELTS 5.0, орыс тіліне шек жоқ.',
      en: 'A table of its own: English — IELTS 5.0; Russian needs no certificate.',
    },
    why: {
      ru: 'Минимальный уровень для научных стажировок установлен приложением 4 к Правилам, а не приказом № 318, и учитывает требования принимающей организации. Порог зависит от языка стажировки: английский — IELTS 5.0 или эквивалент, немецкий — B1, китайский — HSK 3. Если языка нет в таблице — международный сертификат не ниже B1 по CEFR. На русском стажироваться можно только в странах, где русский — государственный или официальный язык.',
      kk: 'Ғылыми тағылымдамаға ең төменгі деңгей № 318 бұйрықпен емес, Қағидалардың 4-қосымшасымен белгіленген және қабылдаушы ұйым талабын ескереді. Шек тағылымдама тіліне байланысты: ағылшын — IELTS 5.0 не баламасы, неміс — B1, қытай — HSK 3. Тіл кестеде болмаса — CEFR бойынша B1-ден төмен емес халықаралық сертификат. Орыс тілінде тек орыс тілі мемлекеттік не ресми тіл болып табылатын елдерде тағылымдамадан өтуге болады.',
      en: "For scientific internships the minimum is set in Appendix 4 to the Rules, not in Order No. 318, and it takes the host's requirements into account. It depends on the language of the internship: English — IELTS 5.0 or equivalent, German — B1, Chinese — HSK 3. A language not in the table needs an international certificate of at least CEFR B1. An internship in Russian is allowed only in countries where Russian is a state or official language.",
    },
    inShort: {
      what: { ru: 'Проверка языка стажировки по таблице для научных стажировок.', kk: 'Тағылымдама тілін ғылыми тағылымдама кестесі бойынша тексеру.', en: 'Checking the internship language against the scientific-internship table.' },
      you: { ru: 'Найти язык стажировки в таблице и сдать экзамен на нужный уровень.', kk: 'Кестеден тағылымдама тілін тауып, емтиханды қажетті деңгейге тапсыру.', en: 'Find the internship language in the table and pass the exam at that level.' },
      result: { ru: 'Сертификат для пакета: оригинал и копия.', kk: 'Топтамаға сертификат: түпнұсқа мен көшірме.', en: 'A certificate for the package: original and copy.' },
    },
    checklist: {
      know_threshold: {
        ru: 'Знаете минимальный уровень для языка своей стажировки — таблица ниже.',
        kk: 'Тағылымдама тіліңізге ең төменгі деңгейді білесіз — кесте төменде.',
        en: 'You know the minimum for your internship language — the table is below.',
      },
      uni_requirement: {
        ru: 'Сверили уровень с требованием принимающей организации.',
        kk: 'Деңгейді қабылдаушы ұйымның талабымен салыстырдыңыз.',
        en: "You checked your level against the host's requirement.",
      },
    },
    mistakes: [
      {
        ru: 'Сверяться с таблицей приказа № 318: у научных стажировок своя — в приложении 4 к Правилам.',
        kk: '№ 318 бұйрық кестесімен салыстыру: ғылыми тағылымдаманың өз кестесі бар — Қағидалардың 4-қосымшасында.',
        en: 'Checking against Order No. 318: scientific internships have their own table, in Appendix 4 to the Rules.',
      },
      {
        ru: 'Принести только копию: на сверку нужен оригинал.',
        kk: 'Тек көшірме әкелу: салыстыруға түпнұсқа керек.',
        en: 'Bringing only a copy: the original is needed for checking.',
      },
    ],
    sources: ['ns_rules422', 'ns_minscore'],
  },

  admission: {
    links: { offer: 'ns_rules422', offer_content: 'ns_rules422', translation: 'ns_rules422' },
    kicker: { ru: 'Приглашение', kk: 'Шақыру', en: 'The invitation' },
    title: { ru: 'Приглашение и программа научной стажировки', kk: 'Шақыру және ғылыми тағылымдама бағдарламасы', en: 'The invitation and the research programme' },
    summary: {
      ru: 'Безусловное приглашение организации и программа, утверждённая работодателем.',
      kk: 'Ұйымның сөзсіз шақыруы және жұмыс беруші бекіткен бағдарлама.',
      en: "The host's unconditional invitation and a programme your employer approves.",
    },
    why: {
      ru: 'В приглашении указывают направления научных исследований, сроки и стоимость стажировки с расшифровкой расчётов — с нотариальным переводом на казахский или русский. Программу научной стажировки составляют по приложению 5 к Правилам: её утверждает ваш работодатель и согласует принимающая организация из списка, тоже с нотариальным переводом.',
      kk: 'Шақыруда ғылыми зерттеу бағыттары, тағылымдама мерзімі мен құнының есеп-қисабы көрсетіледі — қазақ не орыс тіліне нотариалды аудармасымен. Ғылыми тағылымдама бағдарламасын Қағидалардың 5-қосымшасы бойынша жасайды: оны жұмыс берушіңіз бекітіп, тізімдегі қабылдаушы ұйым келіседі, ол да нотариалды аудармасымен.',
      en: 'The invitation names the research directions, the dates and the cost with a breakdown — with a notarised Kazakh or Russian translation. The programme follows Appendix 5 to the Rules: your employer approves it and the listed host agrees it, also with a notarised translation.',
    },
    inShort: {
      what: { ru: 'Два ключевых документа: приглашение и программа научной стажировки.', kk: 'Екі негізгі құжат: шақыру және ғылыми тағылымдама бағдарламасы.', en: 'Two key documents: the invitation and the research programme.' },
      you: { ru: 'Получить приглашение, составить программу, утвердить её у работодателя и согласовать с организацией.', kk: 'Шақыру алып, бағдарлама жасап, оны жұмыс берушіге бекітіп, ұйыммен келісу.', en: 'Get the invitation, write the programme, have your employer approve it and the host agree it.' },
      result: { ru: 'Приглашение и программа, готовые к подаче.', kk: 'Тапсыруға дайын шақыру мен бағдарлама.', en: 'An invitation and a programme ready to submit.' },
    },
    checklist: {
      offer: {
        ru: 'Получили безусловное приглашение организации — оговорка допустима только про оплату.',
        kk: 'Ұйымның сөзсіз шақыруын алдыңыз — ескертпе тек төлем туралы болуы мүмкін.',
        en: "You received the host's unconditional invitation — the only condition allowed is about payment.",
      },
      offer_content: {
        ru: 'В приглашении указаны ваше исследование, сроки и стоимость стажировки с расшифровкой расчётов.',
        kk: 'Шақыруда зерттеуіңіз, тағылымдама мерзімі мен құнының есеп-қисабы көрсетілген.',
        en: 'The invitation names your research, the dates and the cost with a breakdown.',
      },
      translation: {
        ru: 'Перевели приглашение и программу на казахский или русский и заверили переводы у нотариуса.',
        kk: 'Шақыру мен бағдарламаны қазақ не орыс тіліне аударып, нотариуста куәландырдыңыз.',
        en: 'You had the invitation and the programme translated into Kazakh or Russian and notarised.',
      },
    },
    mistakes: [
      {
        ru: 'Приглашение без расшифровки стоимости.',
        kk: 'Құнның есеп-қисабы жоқ шақыру.',
        en: 'An invitation without the cost breakdown.',
      },
      {
        ru: 'Программа без утверждения работодателем.',
        kk: 'Жұмыс беруші бекітпеген бағдарлама.',
        en: 'A programme your employer has not approved.',
      },
      {
        ru: 'Забыть нотариальный перевод.',
        kk: 'Нотариалды аударманы ұмыту.',
        en: 'Forgetting the notarised translation.',
      },
    ],
    sources: ['ns_rules422', 'ns_documents', 'ns_program'],
  },

  documents: {
    links: { anketa: 'ns_anketa', employer_request: 'ns_employer_form', lang_certs: 'ns_rules422', medical: 'ns_rules422' },
    title: { ru: 'Пакет на научную стажировку', kk: 'Ғылыми тағылымдамаға топтама', en: 'The scientific-internship package' },
    summary: {
      ru: 'Оригиналы и копии, анкета, заявка работодателя, программа, список научных результатов, аккредитация.',
      kk: 'Түпнұсқа мен көшірмелер, сауалнама, жұмыс беруші өтінімі, бағдарлама, ғылыми нәтижелер тізімі, аккредиттеу.',
      en: 'Originals and copies, the form, the employer request, the programme, a list of results, accreditation.',
    },
    why: {
      ru: 'Правила перечисляют почти всё как оригинал плюс копия — оригиналы вернут после сверки. Список научных результатов утверждает работодатель, свидетельство об аккредитации прикладывают копией, медицинская справка — по форме 072/у.',
      kk: 'Қағидада бәрі дерлік түпнұсқа мен көшірме ретінде көрсетілген — түпнұсқалар салыстырылған соң қайтарылады. Ғылыми нәтижелер тізімін жұмыс беруші бекітеді, аккредиттеу куәлігі көшірмесімен қоса беріледі, медициналық анықтама — 072/у нысаны бойынша.',
      en: 'The Rules list almost everything as an original plus a copy — originals come back after checking. Your employer approves the list of research results, a copy of the accreditation certificate goes in, and the medical certificate is on form 072/u.',
    },
    inShort: {
      what: { ru: 'Сбор пакета документов для Центра.', kk: 'Орталыққа құжаттар топтамасын жинау.', en: 'Assembling the document package for the Center.' },
      you: { ru: 'Собрать оригиналы и копии по списку ниже и сделать сканы на носитель.', kk: 'Төмендегі тізім бойынша түпнұсқа мен көшірмелерді жинап, сканерлерді тасығышқа жазу.', en: 'Gather the originals and copies on the list below and put the scans on a drive.' },
      result: { ru: 'Пакет, с которым можно идти в Центр.', kk: 'Орталыққа баруға болатын топтама.', en: 'A package ready to take to the Center.' },
    },
    checklist: {
      id: {
        ru: 'Оригиналы и копии удостоверения личности и паспорта — оригиналы вернут после сверки.',
        kk: 'Жеке куәлік пен паспорттың түпнұсқасы мен көшірмесі — түпнұсқалар салыстырылған соң қайтарылады.',
        en: 'Originals and copies of your ID card and passport — the originals come back after checking.',
      },
      anketa: {
        ru: 'Заполнили анкету претендента на научную стажировку по форме рабочего органа.',
        kk: 'Ғылыми тағылымдамаға үміткер сауалнамасын жұмыс органының нысаны бойынша толтырдыңыз.',
        en: "You filled in the scientific-internship applicant form on the working body's template.",
      },
      employment: {
        ru: 'Оригиналы и копии документов о работе и выписка о пенсионных взносах за требуемый период.',
        kk: 'Жұмыс туралы құжаттардың түпнұсқасы мен көшірмесі және талап етілетін кезеңдегі зейнетақы жарналары үзінді көшірмесі.',
        en: 'Originals and copies of your employment papers and a pension-contribution statement for the required period.',
      },
      employer_request: {
        ru: 'Заявка работодателя на научную стажировку с сохранением места работы — по форме рабочего органа.',
        kk: 'Жұмыс орнын сақтайтын ғылыми тағылымдамаға жұмыс беруші өтінімі — жұмыс органының нысаны бойынша.',
        en: "Your employer's request for the scientific internship, keeping your job — on the working body's form.",
      },
      lang_certs: {
        ru: 'Оригиналы и копии сертификатов по казахскому (B1) и иностранному языкам.',
        kk: 'Қазақ (B1) және шет тілі сертификаттарының түпнұсқасы мен көшірмесі.',
        en: 'Originals and copies of your Kazakh (B1) and foreign-language certificates.',
      },
      offer_docs: {
        ru: 'Копии документов о безусловном приглашении — исследование, сроки, стоимость с расшифровкой — с нотариальным переводом.',
        kk: 'Сөзсіз шақыру құжаттарының көшірмесі — зерттеу, мерзім, құнның есеп-қисабы — нотариалды аудармасымен.',
        en: 'Copies of the unconditional invitation — research, dates, cost with breakdown — with a notarised translation.',
      },
    },
    mistakes: [
      {
        ru: 'Принести только копии: оригиналы нужны на сверку.',
        kk: 'Тек көшірме әкелу: түпнұсқалар салыстыруға керек.',
        en: 'Bringing only copies: the originals are needed for checking.',
      },
      {
        ru: 'Список научных результатов без утверждения работодателем.',
        kk: 'Жұмыс беруші бекітпеген ғылыми нәтижелер тізімі.',
        en: 'A list of results your employer has not approved.',
      },
      {
        ru: 'Забыть копию свидетельства об аккредитации организации.',
        kk: 'Ұйымның аккредиттеу куәлігінің көшірмесін ұмыту.',
        en: "Forgetting the copy of your organisation's accreditation certificate.",
      },
    ],
    sources: ['ns_documents', 'ns_rules422', 'ns_anketa', 'ns_employer_form', 'ns_program'],
  },

  apply: {
    links: { dates: 'ns_rules422', fix: 'ns_rules422' },
    title: { ru: 'Подайте документы в Центр', kk: 'Құжатты Орталыққа тапсырыңыз', en: 'Submit your documents to the Center' },
    summary: {
      ru: 'Документы принимает Центр: правила допускают egov.kz и (или) бумагу, на сайте описан приём нарочно в Астане. Ответ — за 2 рабочих дня.',
      kk: 'Құжатты Орталық қабылдайды: қағида egov.kz-ті және (немесе) қағазды рұқсат етеді, сайтта Астанада қолма-қол қабылдау сипатталған. Жауап — 2 жұмыс күнінде.',
      en: 'The Center takes the documents: the rules allow egov.kz and/or paper, and its site describes in-person delivery in Astana. An answer within 2 working days.',
    },
    why: {
      ru: 'Сроки приёма рабочий орган публикует на своём сайте не позднее чем за 10 календарных дней до начала. Подать можно через egov.kz и (или) на бумаге; Центр описывает приём нарочно — бумажный пакет и сканы на флешке или диске. Документы рассматривают 2 рабочих дня. Неполный пакет — основание для отказа, но пока приём идёт, документы можно подать снова.',
      kk: 'Қабылдау мерзімін жұмыс органы өз сайтында басталуына кемінде 10 күнтізбелік күн қалғанда жариялайды. egov.kz арқылы және (немесе) қағаз түрінде тапсыруға болады; Орталық қолма-қол қабылдауды сипаттайды — қағаз топтама және флешкадағы не дискідегі сканерлер. Құжатты 2 жұмыс күні қарайды. Толық емес топтама — бас тарту негізі, бірақ қабылдау жүріп жатқанда құжатты қайта тапсыруға болады.',
      en: 'The working body posts the intake dates on its site at least 10 calendar days before it opens. You can apply through egov.kz and/or on paper; the Center describes in-person delivery — the paper package plus scans on a flash drive or disc. Documents are reviewed within 2 working days. An incomplete package is grounds for refusal, but while the intake is open you can submit again.',
    },
    inShort: {
      what: { ru: 'Подача пакета в Центр международных программ.', kk: 'Топтаманы Халықаралық бағдарламалар орталығына тапсыру.', en: 'Submitting the package to the Center for International Programs.' },
      you: { ru: 'Узнать сроки и подать пакет — через egov.kz или на бумаге, лично или через представителя по нотариальной доверенности.', kk: 'Мерзімді біліп, топтаманы тапсыру — egov.kz арқылы не қағаз түрінде, өзіңіз не нотариалды сенімхатпен өкіл арқылы.', en: 'Find the dates and submit the package — through egov.kz or on paper, yourself or through a representative with a notarised power of attorney.' },
      result: { ru: 'Письменное уведомление: документы приняты и вы допущены — или обоснованный отказ.', kk: 'Жазбаша хабарлама: құжат қабылданып, жіберілдіңіз — не негізделген бас тарту.', en: 'A written notice: documents accepted and you are admitted — or a reasoned refusal.' },
    },
    checklist: {
      dates: {
        ru: 'Узнали сроки приёма документов на научные стажировки в этом году.',
        kk: 'Биылғы ғылыми тағылымдамаға құжат қабылдау мерзімін білдіңіз.',
        en: "You found this year's intake dates for scientific internships.",
      },
      notice: {
        ru: 'Получили письменное уведомление о приёме документов и допуске — или обоснованный отказ.',
        kk: 'Құжаттың қабылданып, жіберілгені туралы жазбаша хабарлама — не негізделген бас тарту алдыңыз.',
        en: 'You got a written notice of acceptance and admission — or a reasoned refusal.',
      },
    },
    mistakes: [
      {
        ru: 'Прийти с неполным пакетом: это основание для отказа.',
        kk: 'Толық емес топтамамен келу: бұл бас тарту негізі.',
        en: 'Coming with an incomplete package: that is grounds for refusal.',
      },
      {
        ru: 'Указать заведомо ложные сведения: к конкурсу этого года не допустят.',
        kk: 'Көрінеу жалған мәлімет беру: биылғы конкурсқа жібермейді.',
        en: 'Giving knowingly false information: you are barred from this year\'s competition.',
      },
    ],
    sources: ['ns_documents', 'ns_rules422', 'egov_ns', 'booking'],
  },

  testing: {
    links: { credentials: null, rules: 'ns_contest', tech: 'ns_contest' },
    sources: ['ns_contest', 'ns_rules422', 'test_numeric', 'test_verbal', 'test_personality', 'cabinet'],
    summary: {
      ru: 'Тесты на анализ вербальной и числовой информации и личностный опросник — онлайн.',
      kk: 'Вербалды және сандық ақпаратты талдау тесттері және тұлғалық сауалнама — онлайн.',
      en: 'Verbal and numerical reasoning tests and a personality questionnaire — online.',
    },
    why: {
      ru: 'Первый тур отсеивает: не набрали пороговый балл из таблицы ранжирования (приложение 9 к Правилам) — второго тура не будет, пересдача не предусмотрена. В итоговом балле тестирование весит 30 из 100, собеседование — 70. Все этапы конкурса проходят онлайн, тестирование — с аудио- и видеозаписью.',
      kk: 'Бірінші тур іріктейді: ранжирлеу кестесіндегі (Қағидалардың 9-қосымшасы) шекті балды жинамасаңыз — екінші тур болмайды, қайта тапсыру көзделмеген. Қорытынды балда тестілеу 100-дің 30-ы, әңгімелесу — 70-і. Конкурстың барлық кезеңі онлайн өтеді, тестілеу — аудио және бейнежазбамен.',
      en: 'Round one filters: miss the cut-off in the ranking table (Appendix 9 to the Rules) and there is no round two, and no retake. In the final score testing weighs 30 out of 100 and the interview 70. Every stage of the competition is online; the testing is audio- and video-recorded.',
    },
  },

  interview: {
    links: { prepare_uni: 'ns_contest', slot: 'ns_rules422' },
    title: { ru: 'Персональное собеседование', kk: 'Жеке әңгімелесу', en: 'Personal interview' },
    summary: {
      ru: 'Персональное собеседование с экспертной комиссией о вашем исследовании.',
      kk: 'Сараптама комиссиясымен зерттеуіңіз туралы жеке әңгімелесу.',
      en: 'A personal interview with the expert commission about your research.',
    },
    why: {
      ru: 'Комиссия определяет уровень профессиональной подготовки, теоретических знаний и профессиональных компетенций в выбранной области специализации и даёт рекомендацию по каждому претенденту. Вопросы задают на казахском, русском или языке стажировки — четырьмя блоками.',
      kk: 'Комиссия таңдалған мамандану саласындағы кәсіби дайындық, теориялық білім және кәсіби құзырет деңгейін анықтап, әр үміткер бойынша ұсыным береді. Сұрақтар қазақ, орыс не тағылымдама тілінде — төрт блокпен қойылады.',
      en: 'The commission assesses your professional training, theory and professional competencies in your chosen field and issues a recommendation on each applicant. Questions come in Kazakh, Russian or the internship language — in four blocks.',
    },
    inShort: {
      what: { ru: 'Второй тур — собеседование с экспертной комиссией о вашем исследовании.', kk: 'Екінші тур — сараптама комиссиясымен зерттеуіңіз туралы әңгімелесу.', en: 'Round two — an interview with the expert commission about your research.' },
      you: { ru: 'Подготовиться к четырём блокам вопросов и знать всё о принимающей организации.', kk: 'Төрт блок сұраққа дайындалып, қабылдаушы ұйым туралы бәрін білу.', en: 'Prepare for the four blocks of questions and know everything about your host.' },
      result: { ru: 'Рекомендация экспертной комиссии для третьего тура.', kk: 'Үшінші турға сараптама комиссиясының ұсынымы.', en: "The expert commission's recommendation for round three." },
    },
    checklist: {
      slot: {
        ru: 'Получили извещение о месте, дате и времени собеседования — его присылают по почте или телефону не позднее чем за 10 календарных дней.',
        kk: 'Әңгімелесу орны, күні мен уақыты туралы хабарлама алдыңыз — оны пошта не телефон арқылы 10 күнтізбелік күн бұрын жібереді.',
        en: 'You received the place, date and time of the interview — it is sent by email or phone at least 10 calendar days ahead.',
      },
      prepare_uni: {
        ru: 'Изучили принимающую организацию: её исследования, лаборатории, проекты и ведущих учёных.',
        kk: 'Қабылдаушы ұйымды зерттедіңіз: оның зерттеулері, зертханалары, жобалары және жетекші ғалымдары.',
        en: 'You studied the host: its research, labs, projects and leading scientists.',
      },
    },
    mistakes: [
      {
        ru: 'Не знать принимающую организацию: про её лаборатории, проекты и учёных спрашивают.',
        kk: 'Қабылдаушы ұйымды білмеу: оның зертханалары, жобалары мен ғалымдары туралы сұрайды.',
        en: 'Not knowing the host: you will be asked about its labs, projects and scientists.',
      },
      {
        ru: 'Не суметь объяснить, зачем вашему исследованию именно эта стажировка.',
        kk: 'Зерттеуіңізге дәл осы тағылымдама не үшін керегін түсіндіре алмау.',
        en: 'Not being able to explain why your research needs this particular internship.',
      },
    ],
    sources: ['ns_contest', 'ns_rules422'],
  },

  commission: {
    links: { wait: 'ns_rules422' },
    summary: {
      ru: 'Республиканская комиссия решает, присудить ли научную стажировку.',
      kk: 'Республикалық комиссия ғылыми тағылымдаманы тағайындау-тағайындамауды шешеді.',
      en: 'The Republican Commission decides whether to award the internship.',
    },
    why: {
      ru: 'Рабочий орган вносит материалы с результатами тестирования, рекомендациями экспертной комиссии и ранжированием. Республиканская комиссия принимает окончательное решение — о нём сообщают на официальном сайте администратора. Если отказали, в этом же году можно подать снова, пока идёт приём, — с выездом на стажировку в следующем календарном году.',
      kk: 'Жұмыс органы тестілеу нәтижелері, сараптама комиссиясының ұсынымдары және ранжирлеу бар материалдарды енгізеді. Республикалық комиссия түпкілікті шешім қабылдайды — ол туралы әкімшінің ресми сайтында хабарлайды. Бас тартылса, сол жылы қабылдау жүріп жатқанда қайта тапсыруға болады — тағылымдамаға келесі күнтізбелік жылы шығу шартымен.',
      en: "The working body submits the file with your test results, the expert commission's recommendations and the ranking. The Republican Commission takes the final decision — it is announced on the administrator's official site. If refused, you may apply again the same year while the intake is open — to leave for the internship in the next calendar year.",
    },
    inShort: {
      what: { ru: 'Третий тур — решение Республиканской комиссии.', kk: 'Үшінші тур — Республикалық комиссия шешімі.', en: 'Round three — the Republican Commission decides.' },
      you: { ru: 'Ничего — вы ждёте публикации на официальном сайте.', kk: 'Ештеңе — ресми сайттағы жарияланымды күтесіз.', en: 'Nothing — you wait for the announcement on the official site.' },
      result: { ru: 'Ваша фамилия в списке — или отказ, после которого можно подать снова в этом же приёме.', kk: 'Тегіңіз тізімде — не бас тарту, одан кейін осы қабылдауда қайта тапсыруға болады.', en: 'Your name on the list — or a refusal, after which you may apply again in the same intake.' },
    },
    checklist: {
      awarded: {
        ru: 'Научная стажировка присуждена — вы в списке победителей конкурса.',
        kk: 'Ғылыми тағылымдама тағайындалды — сіз конкурс жеңімпаздары тізіміндесіз.',
        en: 'The internship is awarded — you are on the winners list.',
      },
    },
    mistakes: [
      {
        ru: 'Ждать персонального письма: о решении извещают публикацией на официальном сайте администратора.',
        kk: 'Жеке хат күту: шешім туралы әкімшінің ресми сайтындағы жарияланыммен хабарлайды.',
        en: "Waiting for a personal letter: the decision is announced on the administrator's official site.",
      },
      {
        ru: 'Считать отказ концом пути до следующего года. Пока приём этого года идёт, документы можно подать снова — но выезжать тогда в следующем календарном году.',
        kk: 'Бас тартуды келесі жылға дейінгі жолдың соңы деп санау. Биылғы қабылдау жүріп жатқанда құжатты қайта тапсыруға болады — бірақ онда келесі күнтізбелік жылы шығасыз.',
        en: "Treating a refusal as the end until next year. While this year's intake is open you can apply again — but then you leave in the next calendar year.",
      },
    ],
    sources: ['ns_rules422', 'ns_contest'],
  },

  contract: {
    links: { legal_dept: 'ns_winner', main_contract: 'ns_rules422', security: 'ns_rules422' },
    summary: {
      ru: '90 календарных дней на договор, обеспечение — гарантия двух гарантов.',
      kk: 'Шартқа 90 күнтізбелік күн, қамтамасыз ету — екі кепілгердің кепілдігі.',
      en: '90 calendar days for the contract, secured by two guarantors.',
    },
    why: {
      ru: 'Договор о прохождении научной стажировки заключают в течение 90 календарных дней со дня решения Республиканской комиссии. Мешают болезнь, командировка или другие обстоятельства — до истечения срока обратитесь в Комиссию с подтверждающими документами: продление до 90 дней дают один раз. Обеспечение — гарантия: два гаранта, граждане Казахстана до 50 лет с постоянным заработком последние 12 месяцев. Не уложились в срок — это основание поднять вопрос о лишении стажировки с возмещением расходов.',
      kk: 'Ғылыми тағылымдамадан өту туралы шарт Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде жасалады. Ауру, іссапар не басқа жағдай кедергі болса — мерзім өткенге дейін растайтын құжаттармен Комиссияға жүгініңіз: 90 күнге дейін ұзарту бір рет беріледі. Қамтамасыз ету — кепілдік: екі кепілгер, соңғы 12 айда тұрақты табысы бар 50 жасқа дейінгі Қазақстан азаматтары. Мерзімге үлгермесеңіз — шығынды өтей отырып тағылымдамадан айыру мәселесін көтеруге негіз.',
      en: 'The scientific-internship contract is signed within 90 calendar days of the Republican Commission\'s decision. If illness, a work trip or other circumstances get in the way, apply to the Commission with supporting documents before the term runs out: an extension of up to 90 days is granted once. It is secured by a guarantee: two guarantors, Kazakhstan citizens under 50 with a steady income for the last 12 months. Miss the deadline and it is grounds to raise withdrawal of the internship with repayment of costs.',
    },
    inShort: {
      what: { ru: 'Оформление победы: договор с Центром и гарантия двух гарантов.', kk: 'Жеңісті рәсімдеу: Орталықпен шарт және екі кепілгердің кепілдігі.', en: 'Making the win official: a contract with the Center and two guarantors.' },
      you: { ru: 'Уложиться в 90 дней, найти двух гарантов и собрать документы — свои, гарантов и работодателя.', kk: '90 күнге сыйып, екі кепілгер тауып, құжат жинау — өзіңіздің, кепілгерлердің және жұмыс берушінің.', en: 'Fit into 90 days, find two guarantors and gather the papers — yours, theirs and your employer\'s.' },
      result: { ru: 'Подписанный договор — основание для финансирования стажировки.', kk: 'Қол қойылған шарт — тағылымдаманы қаржыландыру негізі.', en: 'A signed contract — the basis for funding the internship.' },
    },
    checklist: {
      legal_dept: {
        ru: 'Обратились в Центр, чтобы заключить договор о прохождении научной стажировки.',
        kk: 'Ғылыми тағылымдамадан өту туралы шарт жасау үшін Орталыққа жүгіндіңіз.',
        en: 'You contacted the Center to sign the scientific-internship contract.',
      },
      main_contract: {
        ru: 'Подписали договор о прохождении научной стажировки. От работодателя — документы о полномочиях подписанта, копии учредительных документов и банковские реквизиты.',
        kk: 'Ғылыми тағылымдамадан өту туралы шартқа қол қойдыңыз. Жұмыс берушіден — қол қоюшының өкілеттігі туралы құжаттар, құрылтай құжаттарының көшірмелері және банк деректемелері.',
        en: "You signed the scientific-internship contract. From your employer: proof of the signatory's authority, copies of the founding documents and bank details.",
      },
      security: {
        ru: 'Нашли двух гарантов — граждан Казахстана до 50 лет с постоянным заработком последние 12 месяцев.',
        kk: 'Екі кепілгер таптыңыз — соңғы 12 айда тұрақты табысы бар 50 жасқа дейінгі Қазақстан азаматтары.',
        en: 'You found two guarantors — Kazakhstan citizens under 50 with steady income for the last 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Искать гарантов в последнюю неделю: справки о доходах и пенсионных отчислениях за 12 месяцев готовятся не за день.',
        kk: 'Кепілгерлерді соңғы аптада іздеу: 12 айлық табыс пен зейнетақы аударымдары туралы анықтама бір күнде дайын болмайды.',
        en: 'Looking for guarantors in the last week: 12-month income and pension statements are not ready in a day.',
      },
      {
        ru: 'Забыть документы работодателя: без них договор не подписать.',
        kk: 'Жұмыс беруші құжаттарын ұмыту: оларсыз шартқа қол қою мүмкін емес.',
        en: "Forgetting your employer's documents: the contract cannot be signed without them.",
      },
    ],
    sources: ['ns_rules422', 'ns_winner', 'ns_about'],
  },

  departure: {
    links: { card: 'ns_finance' },
    title: { ru: 'Подготовка к выезду', kk: 'Шығуға дайындық', en: 'Getting ready to leave' },
    summary: {
      ru: 'Банковская карта, аванс и виза. Визу и проезд оплачивает программа.',
      kk: 'Банк картасы, аванс және виза. Виза мен жол ақысын бағдарлама төлейді.',
      en: 'A bank card, the advance and the visa. The programme pays for the visa and travel.',
    },
    why: {
      ru: 'Программа оплачивает оформление визы (консульский сбор), проезд туда и обратно, обязательное медобследование и страховку. Заявление на аванс, сведения по карт-счёту и заявление на возмещение расходов — по формам со страницы о финансировании.',
      kk: 'Бағдарлама визаны рәсімдеуді (консулдық алым), барып-қайту жолын, міндетті медициналық тексеру мен сақтандыруды төлейді. Аванс туралы өтініш, карт-шот мәліметтері және шығынды өтеу туралы өтініш — қаржыландыру бетіндегі нысандар бойынша.',
      en: 'The programme pays the visa (consular fee), travel there and back, the mandatory medical checks and insurance. The advance request, card-account details and expense-refund request use the forms on the funding page.',
    },
    inShort: {
      what: { ru: 'Финансы и документы перед отъездом.', kk: 'Кетер алдындағы қаржы мен құжаттар.', en: 'Money and papers before you go.' },
      you: { ru: 'Оформить карту, подать на аванс и получить визу.', kk: 'Карта рәсімдеп, авансқа өтініш беріп, виза алу.', en: 'Open a card, apply for the advance and get the visa.' },
      result: { ru: 'Виза и деньги на счёте — можно ехать.', kk: 'Виза және шоттағы ақша — баруға болады.', en: 'A visa and money in the account — you can go.' },
    },
    checklist: {
      card: {
        ru: 'Оформили банковскую карту и передали сведения по карт-счёту по форме Центра.',
        kk: 'Банк картасын рәсімдеп, карт-шот мәліметтерін Орталық нысанымен бердіңіз.',
        en: "You opened a bank card and filed your card-account details on the Center's form.",
      },
      visa: {
        ru: 'Оформили визу — консульский сбор покрывает программа.',
        kk: 'Виза рәсімдедіңіз — консулдық алымды бағдарлама жабады.',
        en: 'You got the visa — the programme covers the consular fee.',
      },
    },
    mistakes: [
      {
        ru: 'Откладывать визу: сроки посольств от Центра не зависят.',
        kk: 'Визаны кейінге қалдыру: елшілік мерзімі Орталыққа байланысты емес.',
        en: "Putting off the visa: embassy timelines do not depend on the Center.",
      },
    ],
    sources: ['ns_finance', 'ns_rules422'],
  },

  studying: {
    links: { police: 'ns_finance', insurance: 'ns_rules422', contact: null, interim_report: 'ns_rules422', no_changes: 'ns_rules422' },
    title: { ru: 'Научная стажировка и отчёты', kk: 'Ғылыми тағылымдама және есептер', en: 'The internship and reports' },
    summary: {
      ru: 'Работа строго по программе; промежуточный отчёт через 6 месяцев, если стажировка длиннее.',
      kk: 'Бағдарлама бойынша қатаң жұмыс; тағылымдама ұзақ болса, 6 айдан кейін аралық есеп.',
      en: 'Work strictly to the programme; an interim report at 6 months if it runs longer.',
    },
    why: {
      ru: 'Стажировку проходят по программе научной стажировки. Если она длится больше 6 месяцев, по их истечении сдают администратору промежуточный отчёт по форме приложения 8 к Правилам. Сменить организацию, страну или направление можно только через Комиссию; перенос сроков не больше чем на год и без дополнительных расходов оформляют заявлением администратору. Невыполнение программы — основание для вопроса о возмещении расходов.',
      kk: 'Тағылымдамадан ғылыми тағылымдама бағдарламасы бойынша өтеді. Ол 6 айдан ұзақ болса, 6 ай өткен соң әкімшіге Қағидалардың 8-қосымшасындағы нысан бойынша аралық есеп тапсырылады. Ұйымды, елді не бағытты ауыстыру тек Комиссия арқылы мүмкін; мерзімді бір жылдан аспайтын және қосымша шығынсыз шегеру әкімшіге өтінішпен рәсімделеді. Бағдарламаны орындамау — шығынды өтеу мәселесінің негізі.',
      en: 'You follow the research programme. If it runs longer than 6 months, an interim report on the form in Appendix 8 to the Rules is due to the administrator when they pass. Changing the host, country or direction goes through the Commission; moving the dates by up to a year with no extra cost takes an application to the administrator. Not completing the programme is grounds to raise repayment.',
    },
    inShort: {
      what: { ru: 'Сама научная стажировка за рубежом.', kk: 'Шетелдегі ғылыми тағылымдаманың өзі.', en: 'The research placement abroad itself.' },
      you: { ru: 'Выполнять программу и вовремя сдать промежуточный отчёт.', kk: 'Бағдарламаны орындап, аралық есепті уақытында тапсыру.', en: 'Deliver the programme and file the interim report on time.' },
      result: { ru: 'Выполненная программа и документы о завершении.', kk: 'Орындалған бағдарлама және аяқталу құжаттары.', en: 'A completed programme and completion documents.' },
    },
    checklist: {
      police: {
        ru: 'Зарегистрировались в уполномоченных органах страны, если это требуется.',
        kk: 'Қажет болса, елдің уәкілетті органдарында тіркелдіңіз.',
        en: 'You registered with the host country\'s authorities where required.',
      },
      insurance: {
        ru: 'Оформили медицинскую страховку — её покрывает программа.',
        kk: 'Медициналық сақтандыру рәсімдедіңіз — оны бағдарлама жабады.',
        en: 'You arranged medical insurance — the programme covers it.',
      },
      interim_report: {
        ru: 'Если стажировка длиннее 6 месяцев — сдали промежуточный отчёт по форме приложения 8 к Правилам.',
        kk: 'Тағылымдама 6 айдан ұзақ болса — Қағидалардың 8-қосымшасындағы нысан бойынша аралық есеп тапсырдыңыз.',
        en: 'If the internship runs past 6 months — you filed the interim report on the form in Appendix 8 to the Rules.',
      },
      no_changes: {
        ru: 'Выполняете программу научной стажировки без изменений.',
        kk: 'Ғылыми тағылымдама бағдарламасын өзгеріссіз орындап жатырсыз.',
        en: 'You are carrying out the research programme without changes.',
      },
      contact: {
        ru: 'Держите связь с Центром и сообщаете обо всех изменениях.',
        kk: 'Орталықпен байланыс ұстап, барлық өзгерісті хабарлайсыз.',
        en: 'You stay in touch with the Center and report any changes.',
      },
    },
    mistakes: [
      {
        ru: 'Отступать от программы научной стажировки.',
        kk: 'Ғылыми тағылымдама бағдарламасынан ауытқу.',
        en: 'Departing from the research programme.',
      },
      {
        ru: 'Пропустить промежуточный отчёт.',
        kk: 'Аралық есепті өткізіп алу.',
        en: 'Missing the interim report.',
      },
    ],
    sources: ['ns_rules422', 'ns_finance'],
  },

  return: {
    links: { application: 'ns_alumni', stamp: 'ns_rules422' },
    summary: {
      ru: 'Вернуться за 30 дней, итоговый отчёт — в течение месяца; его утверждает работодатель и размещает на своём сайте.',
      kk: '30 күнде оралу, қорытынды есеп — бір ай ішінде; оны жұмыс беруші бекітіп, өз сайтында орналастырады.',
      en: 'Back within 30 days, the final report within a month; your employer approves it and posts it on its website.',
    },
    why: {
      ru: 'Вернуться в Казахстан нужно в течение 30 календарных дней после окончания стажировки: администратору сдают копию паспорта с отметкой о въезде, заявление о завершении и нотариальные переводы документа об окончании. В течение месяца после возвращения сдают итоговый отчёт по форме приложения 8 к Правилам — его утверждает работодатель и размещает на своём сайте. Не сдали — поднимут вопрос о возмещении потраченных средств.',
      kk: 'Тағылымдама аяқталғаннан кейін 30 күнтізбелік күн ішінде Қазақстанға оралу керек: әкімшіге кіру белгісі бар паспорт көшірмесі, аяқтау туралы өтініш және аяқталу құжатының нотариалды аудармалары тапсырылады. Оралғаннан кейін бір ай ішінде Қағидалардың 8-қосымшасындағы нысан бойынша қорытынды есеп тапсырылады — оны жұмыс беруші бекітіп, өз сайтында орналастырады. Тапсырмасаңыз — жұмсалған қаражатты өтеу мәселесі көтеріледі.',
      en: 'You return to Kazakhstan within 30 calendar days of the internship ending and give the administrator a passport copy with the entry stamp, a completion application and notarised translations of the completion document. Within a month of coming back you file the final report on the form in Appendix 8 to the Rules — your employer approves it and posts it on its website. Miss it and repayment of the money spent is raised.',
    },
    inShort: {
      what: { ru: 'Возвращение и итоговый отчёт.', kk: 'Оралу және қорытынды есеп.', en: 'Coming back and the final report.' },
      you: { ru: 'Сдать куратору заявление об окончании, переводы документов о завершении, копию паспорта и итоговый отчёт.', kk: 'Кураторға аяқтау туралы өтінішті, аяқталу құжаттарының аудармасын, паспорт көшірмесін және қорытынды есепті тапсыру.', en: 'Give your curator the completion application, translated completion documents, a passport copy and the final report.' },
      result: { ru: 'Стажировка закрыта — начинается отработка у работодателя.', kk: 'Тағылымдама жабылды — жұмыс берушіде өтеу басталады.', en: 'The internship is closed — the work-back with your employer begins.' },
    },
    checklist: {
      application: {
        ru: 'Отправили куратору заявление об окончании стажировки по образцу.',
        kk: 'Кураторға тағылымдаманың аяқталғаны туралы өтінішті үлгі бойынша жібердіңіз.',
        en: 'You sent your curator the internship completion application on the template.',
      },
    },
    mistakes: [
      {
        ru: 'Тянуть с отчётом: срок — один месяц.',
        kk: 'Есепті созу: мерзімі — бір ай.',
        en: 'Dragging out the report: the deadline is one month.',
      },
      {
        ru: 'Сдать отчёт без утверждения работодателем.',
        kk: 'Есепті жұмыс беруші бекітпей тапсыру.',
        en: 'Filing the report without your employer\'s approval.',
      },
    ],
    sources: ['ns_rules422', 'ns_alumni'],
  },

  workback: {
    links: { employment: 'ns_alumni', reports: 'ns_alumni', attributes: 'ns_alumni', closing: 'ns_alumni', employer_workback: 'ns_rules422' },
    title: { ru: 'Трудовая отработка', kk: 'Еңбек өтеу', en: 'The work-back' },
    summary: {
      ru: 'Не меньше 3 лет подряд у работодателя, который вас направил. Справки каждые 6 месяцев.',
      kk: 'Сізді жіберген жұмыс берушіде қатарынан кемінде 3 жыл. Әр 6 айда анықтама.',
      en: 'At least 3 years in a row with the employer who sent you. Certificates every 6 months.',
    },
    why: {
      ru: 'После стажировки — непрерывная трудовая деятельность не меньше 3 лет по выбранному направлению исследования у работодателя, по заявке которого вы ездили. Сменить работодателя можно при его ликвидации или реорганизации — либо по вашему обращению в другую аккредитованную научную организацию, с сохранением направления, с согласия работодателя и по решению Комиссии. Справки с места работы — каждые 6 месяцев на почту кураторов.',
      kk: 'Тағылымдамадан кейін — өтінімі бойынша барған жұмыс берушіде таңдаған зерттеу бағыты бойынша кемінде 3 жыл үздіксіз еңбек. Жұмыс берушіні ол таратылса не қайта ұйымдастырылса — не өз өтінішіңізбен басқа аккредиттелген ғылыми ұйымға, бағытты сақтап, жұмыс берушінің келісімімен және Комиссия шешімімен ауыстыруға болады. Жұмыс орнынан анықтама — әр 6 айда кураторлардың поштасына.',
      en: 'After the internship: at least 3 continuous years in your research direction with the employer whose request sent you. You can change employer if it is liquidated or reorganised — or at your request, to another accredited research organisation, keeping your direction, with your employer\'s consent and by the Commission\'s decision. Employment certificates go to the curators every 6 months.',
    },
    inShort: {
      what: { ru: 'Три года работы в своей организации по направлению исследования.', kk: 'Зерттеу бағыты бойынша өз ұйымыңызда үш жыл жұмыс.', en: 'Three years in your own organisation, in your research direction.' },
      you: { ru: 'Работать у своего работодателя и каждые полгода присылать справки.', kk: 'Өз жұмыс берушіңізде жұмыс істеп, әр жарты жылда анықтама жіберу.', en: 'Work for your employer and send certificates every six months.' },
      result: { ru: 'Исполненные обязательства — договор закрыт.', kk: 'Орындалған міндеттеме — шарт жабылды.', en: 'Obligations discharged — the contract is closed.' },
    },
    checklist: {
      employer_workback: {
        ru: 'Работаете в организации, по заявке которой вас направили на стажировку.',
        kk: 'Өтінімі бойынша тағылымдамаға жіберген ұйымда жұмыс істейсіз.',
        en: 'You work at the organisation whose request sent you on the internship.',
      },
      employment: {
        ru: 'Работаете по выбранному направлению исследования у работодателя, который вас направил.',
        kk: 'Сізді жіберген жұмыс берушіде таңдаған зерттеу бағыты бойынша жұмыс істейсіз.',
        en: 'You work in your research direction for the employer who sent you.',
      },
      closing: {
        ru: 'По окончании срока подали заявление об исполнении обязательств — с копией документа о стажировке, трудовой книжки, выпиской о пенсионных взносах и характеристикой работодателя.',
        kk: 'Мерзім аяқталған соң міндеттемелердің орындалуы туралы өтініш тапсырдыңыз — тағылымдама құжатының, еңбек кітапшасының көшірмесімен, зейнетақы жарналары үзінді көшірмесімен және жұмыс беруші мінездемесімен.',
        en: 'At the end you filed the fulfilment application — with copies of the internship document and work record, a pension statement and an employer reference.',
      },
    },
    mistakes: [
      {
        ru: 'Перейти к другому работодателю самовольно: кроме ликвидации или реорганизации, это возможно только с согласия работодателя и по решению Комиссии.',
        kk: 'Басқа жұмыс берушіге өз бетіңізше ауысу: таратудан не қайта ұйымдастырудан басқа жағдайда бұл тек жұмыс берушінің келісімімен және Комиссия шешімімен мүмкін.',
        en: 'Moving to another employer on your own: apart from liquidation or reorganisation it takes your employer\'s consent and the Commission\'s decision.',
      },
      {
        ru: 'Прерывать работу: отработка должна быть непрерывной.',
        kk: 'Жұмысты үзу: өтеу үздіксіз болуы керек.',
        en: 'Breaking off work: the work-back has to be continuous.',
      },
    ],
    sources: ['ns_rules422', 'ns_alumni'],
  },
}

export const SCIENCE_HOME: PlatformHome = {
  intro: {
    ru: 'Научные стажировки — отдельная программа для учёных со своими правилами (приказ МНВО № 422), своим списком организаций и своей подачей: через egov.kz и (или) на бумаге в Центр. От 3 до 12 месяцев в зарубежном вузе или научном центре по вашему исследованию, затем не меньше 3 лет работы у своего работодателя.',
    kk: 'Ғылыми тағылымдамалар — ғалымдарға арналған бөлек бағдарлама: өз қағидасы (ҒЖБМ № 422 бұйрығы), өз ұйымдар тізімі және өз тапсыру тәртібі: egov.kz арқылы және (немесе) қағаз түрінде Орталыққа. Зерттеуіңіз бойынша шетелдік ЖОО-да не ғылыми орталықта 3-тен 12 айға дейін, содан кейін өз жұмыс берушіңізде кемінде 3 жыл жұмыс.',
    en: 'Scientific internships are a separate programme for researchers with their own rules (Ministry Order No. 422), their own host list and their own submission: through egov.kz and/or on paper to the Center. Three to twelve months at a foreign university or research centre for your research, then at least three years with your employer.',
  },
  facts: [
    { value: '3–12', caption: { ru: 'месяцев — срок стажировки', kk: 'ай — тағылымдама мерзімі', en: 'months — the length of the internship' }, source: 'ns_rules422' },
    { value: '500', caption: { ru: 'учёных в год — поручение из Послания Президента', kk: 'ғалым жылына — Президент Жолдауындағы тапсырма', en: "researchers a year — the target set in the President's Address" }, source: 'ns_about' },
    { value: '90', caption: { ru: 'дней на договор после решения комиссии', kk: 'күн комиссия шешімінен кейін шартқа', en: 'days to sign after the commission decides' }, source: 'ns_rules422' },
    { value: '2', caption: { ru: 'гаранта — так обеспечивают обязательства', kk: 'кепілгер — міндеттеме осылай қамтамасыз етіледі', en: 'guarantors secure the obligations' }, source: 'ns_rules422' },
  ],
  fitYes: [
    { ru: 'У вас степень магистра, PhD, доктора по профилю, кандидата или доктора наук.', kk: 'Сізде магистр, PhD, бейіні бойынша доктор, ғылым кандидаты не докторы дәрежесі бар.', en: "You hold a master's, PhD, professional doctorate, Candidate or Doctor of Sciences degree." },
    { ru: 'Последние 12 месяцев вы непрерывно работаете в аккредитованной научной организации по своему направлению.', kk: 'Соңғы 12 ай бойы аккредиттелген ғылыми ұйымда өз бағытыңыз бойынша үздіксіз жұмыс істейсіз.', en: 'For the last 12 months you have worked continuously at an accredited research organisation in your area.' },
    { ru: 'У вас есть статья или обзор в Web of Science или Scopus, статья в издании из Списка 1 или 2 — и (или) международная заявка в Derwent Innovations Index.', kk: 'Сізде Web of Science не Scopus-та мақала не шолу, 1 не 2 Тізімдегі басылымда мақала — және (немесе) Derwent Innovations Index-те халықаралық өтінім бар.', en: 'You have an article or review in Web of Science or Scopus, an article in a List 1 or 2 journal — and/or an international application in the Derwent Innovations Index.' },
    { ru: 'Организация, которая вас приглашает, есть в списке организаций для научных стажировок этого года.', kk: 'Сізді шақыратын ұйым биылғы ғылыми тағылымдама ұйымдарының тізімінде бар.', en: "The host inviting you is on this year's list of scientific-internship organisations." },
  ],
  fitNo: [
    { text: { ru: 'Учёной степени и публикаций нет, но вы работаете в одной из девяти категорий — инженер, педагог, медик, госслужащий и другие.', kk: 'Ғылыми дәреже мен жарияланым жоқ, бірақ тоғыз санаттың бірінде жұмыс істейсіз — инженер, педагог, медик, мемқызметші және басқалар.', en: 'You have no academic degree or publications but work in one of nine categories — engineer, teacher, medic, civil servant and others.' }, go: 'internship' },
    { text: { ru: 'Вам нужна сама степень PhD, а не стажировка.', kk: 'Сізге тағылымдама емес, PhD дәрежесінің өзі керек.', en: 'You want the PhD degree itself, not a placement.' }, go: 'doctorate' },
  ],
  fitSources: ['ns_rules422', 'ns_requirements'],
  coverage: [
    { ru: 'Стоимость научной стажировки', kk: 'Ғылыми тағылымдама құны', en: 'The internship fee' },
    { ru: 'Проживание, питание и научная литература — по нормам приложения 3 к Правилам', kk: 'Тұру, тамақ және ғылыми әдебиет — Қағидалардың 3-қосымшасындағы норма бойынша', en: 'Accommodation, meals and research literature — at the rates in Appendix 3 to the Rules' },
    { ru: 'Виза и её продление (консульский сбор)', kk: 'Виза және оны ұзарту (консулдық алым)', en: 'The visa and its renewal (consular fee)' },
    { ru: 'Проезд от дома до места стажировки и обратно', kk: 'Үйден тағылымдама орнына дейін барып-қайту', en: 'Travel from home to the host and back' },
    { ru: 'Медицинская страховка и обязательное медобследование', kk: 'Медициналық сақтандыру және міндетті медициналық тексеру', en: 'Medical insurance and mandatory medical checks' },
    { ru: 'Обязательные услуги по требованию страны и принимающей организации', kk: 'Ел мен қабылдаушы ұйым талап ететін міндетті қызметтер', en: 'Mandatory services the country or host requires' },
  ],
  coverageSource: 'ns_rules422',
}
