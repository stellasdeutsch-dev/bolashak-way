import type { PlatformHome, StagePatches } from '../types'

/**
 * Scientific internship platform. A separate programme with its own act – the Rules approved
 * by приказ и.о. Министра науки и высшего образования РК от 18.08.2023 № 422 (source
 * ns_rules422; ПП 791 is repealed) – its own list of hosts and research directions,
 * submission through egov.kz and/or on paper, a 90-day contract secured by two guarantors,
 * and a final report within a month of coming back.
 */

export const SCIENCE_STAGES: StagePatches = {
  eligibility: {
    links: { citizen: 'ns_rules422', education: 'ns_rules422', no_debt: 'ns_rules422', pension_age: 'ns_requirements' },
    summary: {
      ru: 'Гражданство, учёная степень, незакрытая отработка и срок до пенсии.',
      kk: 'Азаматтық, ғылыми дәреже, жабылмаған өтеу және зейнетке дейінгі мерзім.',
      en: 'Citizenship, an academic degree, unfinished work-back and time before retirement.',
    },
    inShort: {
      what: { ru: 'Самопроверка по базовым условиям научной стажировки.', kk: 'Ғылыми тағылымдаманың негізгі шарттары бойынша өзін-өзі тексеру.', en: 'A self-check against the basic conditions for a scientific internship.' },
      you: { ru: 'Проверить гражданство, степень, отработку по прошлым стажировкам и срок до пенсии.', kk: 'Азаматтықты, дәрежені, бұрынғы тағылымдамалар бойынша өтеуді және зейнетке дейінгі мерзімді тексеру.', en: 'Check citizenship, degree, work-back from earlier internships and time before retirement.' },
      result: { ru: 'Вы знаете, можно ли подавать документы.', kk: 'Құжат тапсыруға бола ма – соны білесіз.', en: 'You know whether you can apply.' },
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
        ru: 'За вами нет невыполненной отработки после прошлой научной стажировки или стажировки по программе «Болашак»: с ней к конкурсу не допускают.',
        kk: 'Өткен ғылыми тағылымдамадан не «Болашақ» бағдарламасы бойынша тағылымдамадан кейін орындалмаған өтеу жоқ – онымен конкурсқа жібермейді.',
        en: 'You have no unfinished work-back from an earlier scientific internship or a Bolashak-programme internship – with one you are not admitted.',
      },
    },
    mistakes: [
      {
        ru: 'Считать отработку делом далёкого будущего. Её срок проверяют уже при подаче.',
        kk: 'Өтеуді алыс болашақтың ісі деп санау. Оның мерзімін тапсыру кезінде-ақ тексереді.',
        en: 'Treating the work-back as far off. Its length is checked when you apply.',
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
      ru: 'Претендент – научный работник. Требования к нему по Правилам (приказ МНВО № 422) – в списке ниже.',
      kk: 'Үміткер – ғылыми қызметкер. Қағидалар (ҒЖБМ № 422 бұйрығы) бойынша оған қойылатын талаптар – төмендегі тізімде.',
      en: 'The applicant is a research worker. The requirements under the Rules (Ministry Order No. 422) are listed below.',
    },
    inShort: {
      what: { ru: 'Проверка требований к учёному.', kk: 'Ғалымға қойылатын талаптарды тексеру.', en: 'A check of the researcher requirements.' },
      you: { ru: 'Сверить степень, стаж, публикации и договориться с работодателем о заявке.', kk: 'Дәрежені, өтілді, жарияланымдарды салыстырып, жұмыс берушімен өтінім туралы келісу.', en: 'Check your degree, experience and publications and agree the request with your employer.' },
      result: { ru: 'Вы знаете, соответствуете ли всем требованиям.', kk: 'Барлық талапқа сай келетініңізді білесіз.', en: 'You know whether you meet every requirement.' },
    },
    mistakes: [
      {
        ru: 'Считать общий стаж. Нужны 12 месяцев подряд в выбранной области исследований.',
        kk: 'Жалпы өтілді есептеу. Таңдаған зерттеу саласында қатарынан 12 ай керек.',
        en: 'Counting experience overall. It has to be 12 months in a row in the chosen research area.',
      },
      {
        ru: 'Считать стаж в организации без аккредитации: он нужен в аккредитованном субъекте научной деятельности.',
        kk: 'Аккредиттеусіз ұйымдағы өтілді есептеу: ол аккредиттелген ғылыми қызмет субъектісінде керек.',
        en: 'Counting experience at an unaccredited organisation: it has to be at an accredited research body.',
      },
      {
        ru: 'Опираться на статью в журнале, исключённом из Scopus или Web of Science за нарушения: такие статьи не учитываются.',
        kk: 'Бұзушылық үшін Scopus не Web of Science-тен шығарылған журналдағы мақалаға сүйену: ондай мақалалар есептелмейді.',
        en: 'Relying on an article in a journal dropped from Scopus or Web of Science for violations: such articles do not count.',
      },
    ],
    sources: ['ns_requirements', 'ns_rules422', 'ns_documents'],
  },

  specialty: {
    kicker: { ru: 'Что исследовать', kk: 'Нені зерттеу', en: 'What to research' },
    title: { ru: 'Направление исследования', kk: 'Зерттеу бағыты', en: 'Your research direction' },
    summary: {
      ru: 'Стажировка проходит в рамках вашего исследования по перечню приоритетных направлений.',
      kk: 'Тағылымдама зерттеуіңіз аясында – басым бағыттар тізбесі бойынша өтеді.',
      en: 'The internship serves your research – within the list of priority directions.',
    },
    why: {
      ru: 'Перечень приоритетных направлений приложен к Правилам и сформирован по приоритетам развития науки, которые определяет Высшая научно-техническая комиссия. Не менее 60% стажировок приходится на естественно-технический блок, не более 40% – на общественно-гуманитарный. Вузы из списка принимают по указанным для них направлениям, поэтому код направления нужен и при выборе организации.',
      kk: 'Басым бағыттар тізбесі Қағидаларға қоса берілген және Жоғары ғылыми-техникалық комиссия айқындайтын ғылымды дамыту басымдықтары бойынша жасалған. Тағылымдамалардың кемінде 60%-ы жаратылыстану-техникалық блокқа, 40%-дан аспайтыны қоғамдық-гуманитарлық блокқа тиесілі. Тізімдегі ЖОО-лар өздеріне көрсетілген бағыттар бойынша қабылдайды, сондықтан бағыт коды ұйым таңдағанда да керек.',
      en: 'The priority directions are listed in an appendix to the Rules, built on the science priorities set by the Higher Science and Technology Commission. At least 60% of internships go to the natural-science and engineering block and no more than 40% to the social sciences and humanities. Listed universities take the directions shown for them, so you need the direction code when choosing the host too.',
    },
    inShort: {
      what: { ru: 'Проверка, что ваше исследование попадает в приоритетное направление.', kk: 'Зерттеуіңіз басым бағытқа кіретінін тексеру.', en: 'A check that your research falls within a priority direction.' },
      you: { ru: 'Найти своё направление и его код – поиск ниже.', kk: 'Бағытыңызды және оның кодын табу – іздеу төменде.', en: 'Find your direction and its code – search below.' },
      result: { ru: 'Код направления для выбора организации.', kk: 'Ұйым таңдауға арналған бағыт коды.', en: 'A direction code for choosing your host.' },
    },
    mistakes: [
      {
        ru: 'Выбрать вуз, который не принимает по вашему направлению: у вузов в списке указаны свои коды.',
        kk: 'Бағытыңыз бойынша қабылдамайтын ЖОО-ны таңдау: тізімде ЖОО-лардың өз кодтары көрсетілген.',
        en: 'Choosing a university that does not take your direction: the list shows each university\'s codes.',
      },
      {
        ru: 'Смотреть перечень прошлого года: он утверждается заново.',
        kk: 'Өткен жылғы тізбеге қарау – ол қайта бекітіледі.',
        en: "Looking at last year's list – it is re-approved.",
      },
    ],
    sources: ['ns_priorities', 'ns_orgs_pdf', 'ns_rules422'],
  },

  university: {
    links: { programme: 'ns_rules422', duration_internship: 'ns_rules422' },
    icon: 'FlaskConical',
    title: { ru: 'Организация из списка научных стажировок', kk: 'Ғылыми тағылымдама тізіміндегі ұйым', en: 'A host from the scientific-internship list' },
    summary: {
      ru: 'Вузы и научные центры из отдельного списка. Срок – от 3 до 12 месяцев.',
      kk: 'Бөлек тізімдегі ЖОО-лар мен ғылыми орталықтар. Мерзімі – 3-тен 12 айға дейін.',
      en: 'Universities and research centres from a separate list. 3 to 12 months.',
    },
    why: {
      ru: 'Список организаций рабочий орган утверждает на год. Безусловное приглашение должно быть от организации из этого списка: порядка индивидуального допуска организаций вне списка в действующих правилах нет. У вузов в списке указаны направления, по которым они принимают; научные центры и иные организации принимают по всем направлениям.',
      kk: 'Ұйымдар тізімін жұмыс органы бір жылға бекітеді. Сөзсіз шақыру осы тізімдегі ұйымнан болуы керек: тізімнен тыс ұйымдарды жеке тәртіппен жіберу тәртібі қолданыстағы қағидаларда жоқ. Тізімдегі ЖОО-ларда қабылдайтын бағыттары көрсетілген; ғылыми орталықтар мен өзге ұйымдар барлық бағыт бойынша қабылдайды.',
      en: 'The working body approves the host list for one year. The unconditional invitation has to come from a host on that list: the current rules have no procedure for admitting hosts off the list individually. Universities on it list the directions they take; research centres and other organisations take every direction.',
    },
    inShort: {
      what: { ru: 'Выбор принимающей организации из списка.', kk: 'Тізімнен қабылдаушы ұйымды таңдау.', en: 'Choosing a host from the list.' },
      you: { ru: 'Найти организацию по своему направлению (поиск ниже) и договориться о приглашении.', kk: 'Бағытыңыз бойынша ұйымды тауып (іздеу төменде), шақыру туралы келісу.', en: 'Find a host by your direction (search below) and arrange the invitation.' },
      result: { ru: 'Организация, готовая принять вас по вашему исследованию.', kk: 'Зерттеуіңіз бойынша сізді қабылдауға дайын ұйым.', en: 'A host ready to take you for your research.' },
    },
    checklist: {
      programme: {
        ru: 'Согласовали с организацией исследование, сроки и стоимость стажировки с расшифровкой расчётов.',
        kk: 'Ұйыммен зерттеуді, тағылымдама мерзімі мен құнының есеп-қисабын келістіңіз.',
        en: 'You agreed the research, dates and cost with a breakdown with the host.',
      },
      duration_internship: {
        ru: 'Срок научной стажировки – от 3 до 12 месяцев.',
        kk: 'Ғылыми тағылымдама мерзімі – 3-тен 12 айға дейін.',
        en: 'The scientific internship lasts 3 to 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Договориться с организацией не из списка этого года: её приглашение не подойдёт.',
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
      ru: 'Своя таблица минимальных баллов: английский – IELTS 5.0, для русского языка порога нет.',
      kk: 'Ең төменгі балдардың өз кестесі: ағылшын – IELTS 5.0, орыс тіліне шек жоқ.',
      en: 'A table of its own: English – IELTS 5.0; Russian needs no certificate.',
    },
    why: {
      ru: 'Минимальный уровень установлен приложением 4 к Правилам, а не приказом № 318, с учётом требований принимающей организации. Порог зависит от языка стажировки: английский – IELTS 5.0 или эквивалент, немецкий – B1, китайский – HSK 3; для языка, которого нет в таблице, – международный сертификат не ниже B1 по CEFR. На русском стажироваться можно только в странах, где русский – государственный или официальный язык.',
      kk: 'Ең төменгі деңгей № 318 бұйрықпен емес, Қағидалардың 4-қосымшасымен қабылдаушы ұйым талабын ескере отырып белгіленген. Шек тағылымдама тіліне байланысты: ағылшын – IELTS 5.0 не баламасы, неміс – B1, қытай – HSK 3; кестеде жоқ тілге – CEFR бойынша B1-ден төмен емес халықаралық сертификат. Орыс тілінде тек орыс тілі мемлекеттік не ресми тіл болып табылатын елдерде тағылымдамадан өтуге болады.',
      en: "The minimum is set in Appendix 4 to the Rules, not in Order No. 318, taking the host's requirements into account. It depends on the internship language: English – IELTS 5.0 or equivalent, German – B1, Chinese – HSK 3; a language not in the table needs an international certificate of at least CEFR B1. An internship in Russian is allowed only in countries where Russian is a state or official language.",
    },
    inShort: {
      what: { ru: 'Проверка уровня языка стажировки по таблице Правил.', kk: 'Тағылымдама тілінің деңгейін Қағидалар кестесі бойынша тексеру.', en: 'Checking your internship-language level against the Rules\' table.' },
      you: { ru: 'Найти язык стажировки в таблице и сдать экзамен на нужный уровень.', kk: 'Кестеден тағылымдама тілін тауып, емтиханды қажетті деңгейге тапсыру.', en: 'Find the internship language in the table and pass the exam at that level.' },
      result: { ru: 'Сертификат для пакета: оригинал и копия.', kk: 'Топтамаға сертификат: түпнұсқа мен көшірме.', en: 'A certificate for the package: original and copy.' },
    },
    checklist: {
      know_threshold: {
        ru: 'Знаете минимальный уровень для языка своей стажировки – он в таблице ниже.',
        kk: 'Тағылымдама тіліңізге ең төменгі деңгейді білесіз – кесте төменде.',
        en: 'You know the minimum for your internship language – the table is below.',
      },
      uni_requirement: {
        ru: 'Сверили уровень с требованием принимающей организации.',
        kk: 'Деңгейді қабылдаушы ұйымның талабымен салыстырдыңыз.',
        en: "You checked your level against the host's requirement.",
      },
    },
    mistakes: [
      {
        ru: 'Сверяться с таблицей приказа № 318: для научных стажировок действует приложение 4 к Правилам.',
        kk: '№ 318 бұйрық кестесімен салыстыру: ғылыми тағылымдамаға Қағидалардың 4-қосымшасы қолданылады.',
        en: 'Checking against Order No. 318: scientific internships go by Appendix 4 to the Rules.',
      },
      {
        ru: 'Подать только копию: для сверки нужен оригинал.',
        kk: 'Тек көшірме тапсыру: салыстыруға түпнұсқа керек.',
        en: 'Submitting only a copy: the original is needed for checking.',
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
      ru: 'Программу научной стажировки составляют по приложению 5 к Правилам: её утверждает работодатель и согласует принимающая организация из списка. К приглашению и программе прикладывают нотариальный перевод на казахский или русский.',
      kk: 'Ғылыми тағылымдама бағдарламасы Қағидалардың 5-қосымшасы бойынша жасалады: оны жұмыс беруші бекітіп, тізімдегі қабылдаушы ұйым келіседі. Шақыру мен бағдарламаға қазақ не орыс тіліне нотариалды аударма қоса беріледі.',
      en: 'The programme follows Appendix 5 to the Rules: your employer approves it and the listed host agrees it. The invitation and the programme come with a notarised Kazakh or Russian translation.',
    },
    inShort: {
      what: { ru: 'Два обязательных документа: приглашение и программа научной стажировки.', kk: 'Екі міндетті құжат: шақыру және ғылыми тағылымдама бағдарламасы.', en: 'Two required documents: the invitation and the research programme.' },
      you: { ru: 'Получить приглашение, составить программу, утвердить её у работодателя и согласовать с организацией.', kk: 'Шақыру алып, бағдарлама жасап, оны жұмыс берушіге бекітіп, ұйыммен келісу.', en: 'Get the invitation, write the programme, have your employer approve it and the host agree it.' },
      result: { ru: 'Приглашение и программа, готовые к подаче.', kk: 'Тапсыруға дайын шақыру мен бағдарлама.', en: 'An invitation and a programme ready to submit.' },
    },
    checklist: {
      offer: {
        ru: 'Получили безусловное приглашение организации: допустимо только условие об оплате.',
        kk: 'Ұйымның сөзсіз шақыруын алдыңыз: тек төлем туралы шарт болуы мүмкін.',
        en: "You received the host's unconditional invitation – the only condition allowed is about payment.",
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
        ru: 'Получить приглашение без расшифровки стоимости.',
        kk: 'Құнның есеп-қисабы жоқ шақыру алу.',
        en: 'Getting an invitation without the cost breakdown.',
      },
      {
        ru: 'Подать программу, не утверждённую работодателем.',
        kk: 'Жұмыс беруші бекітпеген бағдарламаны тапсыру.',
        en: 'Submitting a programme your employer has not approved.',
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
      ru: 'Большинство документов подают в оригинале и копии; оригиналы возвращают после сверки. Список научных результатов утверждает работодатель, свидетельство об аккредитации прикладывают в копии, медицинская справка – по форме 072/у.',
      kk: 'Құжаттардың көбі түпнұсқа мен көшірме түрінде тапсырылады; түпнұсқалар салыстырылған соң қайтарылады. Ғылыми нәтижелер тізімін жұмыс беруші бекітеді, аккредиттеу куәлігі көшірмемен беріледі, медициналық анықтама – 072/у нысаны бойынша.',
      en: 'Most documents go in as an original plus a copy; originals come back after checking. Your employer approves the list of research results, the accreditation certificate goes in as a copy, and the medical certificate is on form 072/u.',
    },
    inShort: {
      what: { ru: 'Сбор пакета документов для подачи в Центр.', kk: 'Орталыққа тапсыруға құжаттар топтамасын жинау.', en: 'Assembling the document package for the Center.' },
      you: { ru: 'Собрать оригиналы и копии по списку ниже и записать сканы на носитель.', kk: 'Төмендегі тізім бойынша түпнұсқа мен көшірмелерді жинап, сканерлерді тасығышқа жазу.', en: 'Gather the originals and copies on the list below and put the scans on a drive.' },
      result: { ru: 'Пакет, готовый к подаче.', kk: 'Тапсыруға дайын топтама.', en: 'A package ready to submit.' },
    },
    checklist: {
      id: {
        ru: 'Оригиналы и копии удостоверения личности и паспорта; оригиналы возвращают после сверки.',
        kk: 'Жеке куәлік пен паспорттың түпнұсқасы мен көшірмесі; түпнұсқалар салыстырылған соң қайтарылады.',
        en: 'Originals and copies of your ID card and passport – the originals come back after checking.',
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
        ru: 'Заявка работодателя на научную стажировку с сохранением места работы – по форме рабочего органа.',
        kk: 'Жұмыс орнын сақтайтын ғылыми тағылымдамаға жұмыс беруші өтінімі – жұмыс органының нысаны бойынша.',
        en: "Your employer's request for the scientific internship, keeping your job – on the working body's form.",
      },
      lang_certs: {
        ru: 'Оригиналы и копии сертификатов по казахскому (B1) и иностранному языкам.',
        kk: 'Қазақ (B1) және шет тілі сертификаттарының түпнұсқасы мен көшірмесі.',
        en: 'Originals and copies of your Kazakh (B1) and foreign-language certificates.',
      },
      offer_docs: {
        ru: 'Копии документов о безусловном приглашении – исследование, сроки, стоимость с расшифровкой – с нотариальным переводом.',
        kk: 'Сөзсіз шақыру құжаттарының көшірмесі – зерттеу, мерзім, құнның есеп-қисабы – нотариалды аудармасымен.',
        en: 'Copies of the unconditional invitation – research, dates, cost with breakdown – with a notarised translation.',
      },
    },
    mistakes: [
      {
        ru: 'Подать только копии: для сверки нужны оригиналы.',
        kk: 'Тек көшірме тапсыру: түпнұсқалар салыстыруға керек.',
        en: 'Submitting only copies: the originals are needed for checking.',
      },
      {
        ru: 'Подать список научных результатов, не утверждённый работодателем.',
        kk: 'Жұмыс беруші бекітпеген ғылыми нәтижелер тізімін тапсыру.',
        en: 'Submitting a list of results your employer has not approved.',
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
      ru: 'Документы принимает Центр через egov.kz и (или) на бумаге. Ответ – за 2 рабочих дня.',
      kk: 'Құжатты Орталық egov.kz арқылы және (немесе) қағаз түрінде қабылдайды. Жауап – 2 жұмыс күнінде.',
      en: 'The Center takes documents through egov.kz and/or on paper. An answer within 2 working days.',
    },
    why: {
      ru: 'Сроки приёма рабочий орган публикует на своём сайте не позднее чем за 10 календарных дней до начала. На сайте Центра описан приём нарочно в Астане: бумажный пакет и сканы на флешке или диске. Документы рассматривают 2 рабочих дня. Неполный пакет – основание для отказа; пока идёт приём, документы можно подать снова.',
      kk: 'Қабылдау мерзімін жұмыс органы өз сайтында басталуына кемінде 10 күнтізбелік күн қалғанда жариялайды. Орталық сайтында Астанада қолма-қол қабылдау сипатталған: қағаз топтама және флешкадағы не дискідегі сканерлер. Құжатты 2 жұмыс күні қарайды. Толық емес топтама – бас тарту негізі; қабылдау жүріп жатқанда құжатты қайта тапсыруға болады.',
      en: 'The working body posts the intake dates on its site at least 10 calendar days before it opens. The Center\'s site describes in-person delivery in Astana: the paper package plus scans on a flash drive or disc. Documents are reviewed within 2 working days. An incomplete package is grounds for refusal; while the intake is open you can submit again.',
    },
    inShort: {
      what: { ru: 'Подача пакета в Центр международных программ.', kk: 'Топтаманы Халықаралық бағдарламалар орталығына тапсыру.', en: 'Submitting the package to the Center for International Programs.' },
      you: { ru: 'Подать пакет в срок – через egov.kz или на бумаге, лично или через представителя по нотариальной доверенности.', kk: 'Топтаманы мерзімінде тапсыру – egov.kz арқылы не қағаз түрінде, өзіңіз не нотариалды сенімхатпен өкіл арқылы.', en: 'Submit the package on time – through egov.kz or on paper, yourself or through a representative with a notarised power of attorney.' },
      result: { ru: 'Письменное уведомление о приёме документов и допуске – или мотивированный отказ.', kk: 'Құжаттың қабылданып, жіберілгені туралы жазбаша хабарлама – не дәлелді бас тарту.', en: 'A written notice of acceptance and admission – or a reasoned refusal.' },
    },
    checklist: {
      dates: {
        ru: 'Узнали сроки приёма документов на научные стажировки в этом году.',
        kk: 'Биылғы ғылыми тағылымдамаға құжат қабылдау мерзімін білдіңіз.',
        en: "You found this year's intake dates for scientific internships.",
      },
      notice: {
        ru: 'Получили письменное уведомление о приёме документов и допуске – или обоснованный отказ.',
        kk: 'Құжаттың қабылданып, жіберілгені туралы жазбаша хабарлама – не негізделген бас тарту алдыңыз.',
        en: 'You got a written notice of acceptance and admission – or a reasoned refusal.',
      },
    },
    mistakes: [
      {
        ru: 'Подать неполный пакет: это основание для отказа.',
        kk: 'Толық емес топтама тапсыру: бұл бас тарту негізі.',
        en: 'Submitting an incomplete package: that is grounds for refusal.',
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
      ru: 'Тесты на анализ вербальной и числовой информации и личностный опросник – онлайн.',
      kk: 'Вербалды және сандық ақпаратты талдау тесттері және тұлғалық сауалнама – онлайн.',
      en: 'Verbal and numerical reasoning tests and a personality questionnaire – online.',
    },
    why: {
      ru: 'Если не набран пороговый балл из таблицы ранжирования (приложение 9 к Правилам), во второй тур не допускают; пересдача не предусмотрена. В итоговом балле тестирование составляет 30 из 100, собеседование – 70. Все этапы конкурса проходят онлайн, тестирование – с аудио- и видеозаписью.',
      kk: 'Ранжирлеу кестесіндегі (Қағидалардың 9-қосымшасы) шекті балл жиналмаса, екінші турға жіберілмейді; қайта тапсыру көзделмеген. Қорытынды балда тестілеу 100-дің 30-ы, әңгімелесу – 70-і. Конкурстың барлық кезеңі онлайн өтеді, тестілеу – аудио және бейнежазбамен.',
      en: 'Below the cut-off in the ranking table (Appendix 9 to the Rules) you are not admitted to round two; no retake is provided. In the final score testing weighs 30 out of 100 and the interview 70. Every stage is online; the testing is audio- and video-recorded.',
    },
  },

  interview: {
    links: { prepare_uni: 'ns_contest', slot: 'ns_rules422' },
    title: { ru: 'Персональное собеседование', kk: 'Жеке әңгімелесу', en: 'Personal interview' },
    summary: {
      ru: 'Собеседование с экспертной комиссией о вашем исследовании.',
      kk: 'Сараптама комиссиясымен зерттеуіңіз туралы әңгімелесу.',
      en: 'An interview with the expert commission about your research.',
    },
    why: {
      ru: 'Комиссия определяет уровень профессиональной подготовки, теоретических знаний и профессиональных компетенций в выбранной области специализации и даёт рекомендацию по каждому претенденту. Вопросы – четыре блока на казахском, русском или языке стажировки.',
      kk: 'Комиссия таңдалған мамандану саласындағы кәсіби дайындық, теориялық білім және кәсіби құзырет деңгейін анықтап, әр үміткер бойынша ұсыным береді. Сұрақтар – қазақ, орыс не тағылымдама тіліндегі төрт блок.',
      en: 'The commission assesses your professional training, theory and professional competencies in your chosen field and issues a recommendation on each applicant. Questions come in four blocks, in Kazakh, Russian or the internship language.',
    },
    inShort: {
      what: { ru: 'Второй тур – собеседование с экспертной комиссией о вашем исследовании.', kk: 'Екінші тур – сараптама комиссиясымен зерттеуіңіз туралы әңгімелесу.', en: 'Round two – an interview with the expert commission about your research.' },
      you: { ru: 'Подготовиться к четырём блокам вопросов и изучить принимающую организацию.', kk: 'Төрт блок сұраққа дайындалып, қабылдаушы ұйымды зерттеу.', en: 'Prepare for the four blocks of questions and study your host.' },
      result: { ru: 'Рекомендация экспертной комиссии для третьего тура.', kk: 'Үшінші турға сараптама комиссиясының ұсынымы.', en: "The expert commission's recommendation for round three." },
    },
    checklist: {
      slot: {
        ru: 'Получили извещение о месте, дате и времени собеседования: его направляют по почте или телефону не позднее чем за 10 календарных дней.',
        kk: 'Әңгімелесу орны, күні мен уақыты туралы хабарлама алдыңыз: оны пошта не телефон арқылы кемінде 10 күнтізбелік күн бұрын жібереді.',
        en: 'You received the place, date and time of the interview – it is sent by email or phone at least 10 calendar days ahead.',
      },
      prepare_uni: {
        ru: 'Изучили принимающую организацию: её исследования, лаборатории, проекты и ведущих учёных.',
        kk: 'Қабылдаушы ұйымды зерттедіңіз: оның зерттеулері, зертханалары, жобалары және жетекші ғалымдары.',
        en: 'You studied the host: its research, labs, projects and leading scientists.',
      },
    },
    mistakes: [
      {
        ru: 'Не изучить принимающую организацию: о её лабораториях, проектах и учёных спрашивают.',
        kk: 'Қабылдаушы ұйымды зерттемеу: оның зертханалары, жобалары мен ғалымдары туралы сұрайды.',
        en: 'Not studying the host: you are asked about its labs, projects and scientists.',
      },
      {
        ru: 'Не суметь объяснить, зачем вашему исследованию эта стажировка.',
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
      ru: 'Рабочий орган вносит материалы с результатами тестирования, рекомендациями экспертной комиссии и ранжированием. Окончательное решение принимает Республиканская комиссия; его публикуют на официальном сайте администратора. При отказе можно подать документы снова в этом же году, пока идёт приём, с выездом на стажировку в следующем календарном году.',
      kk: 'Жұмыс органы тестілеу нәтижелері, сараптама комиссиясының ұсынымдары және ранжирлеу бар материалдарды енгізеді. Түпкілікті шешімді Республикалық комиссия қабылдайды; ол әкімшінің ресми сайтында жарияланады. Бас тартылса, сол жылы қабылдау жүріп жатқанда құжатты қайта тапсыруға болады, тағылымдамаға келесі күнтізбелік жылы шығу шартымен.',
      en: "The working body submits the file with test results, the expert commission's recommendations and the ranking. The Republican Commission takes the final decision; it is published on the administrator's official site. If refused, you may apply again the same year while the intake is open, leaving for the internship in the next calendar year.",
    },
    inShort: {
      what: { ru: 'Третий тур – решение Республиканской комиссии.', kk: 'Үшінші тур – Республикалық комиссия шешімі.', en: 'Round three – the Republican Commission decides.' },
      you: { ru: 'Дождаться публикации решения на официальном сайте.', kk: 'Шешімнің ресми сайтта жариялануын күту.', en: 'Wait for the decision to be published on the official site.' },
      result: { ru: 'Присуждение стажировки – или отказ, после которого можно подать снова в этом же приёме.', kk: 'Тағылымдама тағайындалады – не бас тарту, одан кейін осы қабылдауда қайта тапсыруға болады.', en: 'The internship is awarded – or refused, after which you may apply again in the same intake.' },
    },
    checklist: {
      awarded: {
        ru: 'Научная стажировка присуждена: вы в списке победителей конкурса.',
        kk: 'Ғылыми тағылымдама тағайындалды – сіз конкурс жеңімпаздары тізіміндесіз.',
        en: 'The internship is awarded – you are on the winners list.',
      },
    },
    mistakes: [
      {
        ru: 'Ждать персонального письма: решение публикуют на официальном сайте администратора.',
        kk: 'Жеке хат күту: шешім әкімшінің ресми сайтында жарияланады.',
        en: "Waiting for a personal letter: the decision is published on the administrator's official site.",
      },
      {
        ru: 'Ждать следующего года после отказа. Пока идёт приём этого года, документы можно подать снова, с выездом в следующем календарном году.',
        kk: 'Бас тартудан кейін келесі жылды күту. Биылғы қабылдау жүріп жатқанда құжатты қайта тапсыруға болады, келесі күнтізбелік жылы шығу шартымен.',
        en: "Waiting for next year after a refusal. While this year's intake is open you can apply again, leaving in the next calendar year.",
      },
    ],
    sources: ['ns_rules422', 'ns_contest'],
  },

  contract: {
    links: { legal_dept: 'ns_winner', main_contract: 'ns_rules422', security: 'ns_rules422' },
    summary: {
      ru: '90 календарных дней на договор, обеспечение – гарантия двух гарантов.',
      kk: 'Шартқа 90 күнтізбелік күн, қамтамасыз ету – екі кепілгердің кепілдігі.',
      en: '90 calendar days for the contract, secured by two guarantors.',
    },
    why: {
      ru: 'Договор о прохождении научной стажировки заключают в течение 90 календарных дней со дня решения Республиканской комиссии. Если мешают болезнь, командировка или другие обстоятельства, до истечения срока обратитесь в Комиссию с подтверждающими документами: продление до 90 дней предоставляют один раз. Обеспечение – гарантия двух гарантов: граждан Казахстана до 50 лет с постоянным заработком за последние 12 месяцев. Пропуск срока – основание для рассмотрения вопроса о лишении стажировки с возмещением расходов.',
      kk: 'Ғылыми тағылымдамадан өту туралы шарт Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде жасалады. Ауру, іссапар не басқа жағдай кедергі болса, мерзім өткенге дейін растайтын құжаттармен Комиссияға жүгініңіз: 90 күнге дейін ұзарту бір рет беріледі. Қамтамасыз ету – екі кепілгердің кепілдігі: соңғы 12 айда тұрақты табысы бар 50 жасқа дейінгі Қазақстан азаматтары. Мерзімді өткізіп алу – шығынды өтей отырып тағылымдамадан айыру мәселесін қарауға негіз.',
      en: 'The scientific-internship contract is signed within 90 calendar days of the Republican Commission\'s decision. If illness, a work trip or other circumstances get in the way, apply to the Commission with supporting documents before the term runs out: an extension of up to 90 days is granted once. It is secured by a guarantee of two guarantors: Kazakhstan citizens under 50 with a steady income for the last 12 months. Missing the deadline is grounds to consider withdrawing the internship with repayment of costs.',
    },
    inShort: {
      what: { ru: 'Договор с Центром и гарантия двух гарантов.', kk: 'Орталықпен шарт және екі кепілгердің кепілдігі.', en: 'The contract with the Center and a guarantee from two guarantors.' },
      you: { ru: 'За 90 дней найти двух гарантов и собрать документы – свои, гарантов и работодателя.', kk: '90 күнде екі кепілгер тауып, құжат жинау – өзіңіздің, кепілгерлердің және жұмыс берушінің.', en: 'Within 90 days, find two guarantors and gather the papers – yours, theirs and your employer\'s.' },
      result: { ru: 'Подписанный договор – основание для финансирования стажировки.', kk: 'Қол қойылған шарт – тағылымдаманы қаржыландыру негізі.', en: 'A signed contract – the basis for funding the internship.' },
    },
    checklist: {
      legal_dept: {
        ru: 'Обратились в Центр, чтобы заключить договор о прохождении научной стажировки.',
        kk: 'Ғылыми тағылымдамадан өту туралы шарт жасау үшін Орталыққа жүгіндіңіз.',
        en: 'You contacted the Center to sign the scientific-internship contract.',
      },
      main_contract: {
        ru: 'Подписали договор о прохождении научной стажировки. От работодателя нужны документы о полномочиях подписанта, копии учредительных документов и банковские реквизиты.',
        kk: 'Ғылыми тағылымдамадан өту туралы шартқа қол қойдыңыз. Жұмыс берушіден қол қоюшының өкілеттігі туралы құжаттар, құрылтай құжаттарының көшірмелері және банк деректемелері керек.',
        en: "You signed the scientific-internship contract. Your employer provides proof of the signatory's authority, copies of the founding documents and bank details.",
      },
      security: {
        ru: 'Нашли двух гарантов – граждан Казахстана до 50 лет с постоянным заработком за последние 12 месяцев.',
        kk: 'Екі кепілгер таптыңыз – соңғы 12 айда тұрақты табысы бар 50 жасқа дейінгі Қазақстан азаматтары.',
        en: 'You found two guarantors – Kazakhstan citizens under 50 with steady income for the last 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Искать гарантов в последнюю неделю: гарантам нужны справки о доходах и пенсионных отчислениях за 12 месяцев.',
        kk: 'Кепілгерлерді соңғы аптада іздеу: кепілгерлерге 12 айлық табыс пен зейнетақы аударымдары туралы анықтама керек.',
        en: 'Looking for guarantors in the last week: they need 12-month income and pension statements.',
      },
      {
        ru: 'Забыть документы работодателя: без них договор не подписывают.',
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
      ru: 'Программа оплачивает визу (консульский сбор), проезд туда и обратно, обязательное медобследование и страховку. Заявление на аванс, сведения по карт-счёту и заявление на возмещение расходов подают по формам со страницы о финансировании.',
      kk: 'Бағдарлама визаны (консулдық алым), барып-қайту жолын, міндетті медициналық тексеру мен сақтандыруды төлейді. Аванс туралы өтініш, карт-шот мәліметтері және шығынды өтеу туралы өтініш қаржыландыру бетіндегі нысандар бойынша беріледі.',
      en: 'The programme pays the visa (consular fee), travel there and back, the mandatory medical checks and insurance. The advance request, card-account details and expense-refund request use the forms on the funding page.',
    },
    inShort: {
      what: { ru: 'Финансовые документы и виза перед отъездом.', kk: 'Кетер алдындағы қаржы құжаттары мен виза.', en: 'Funding papers and the visa before you go.' },
      you: { ru: 'Оформить карту, подать на аванс и получить визу.', kk: 'Карта рәсімдеп, авансқа өтініш беріп, виза алу.', en: 'Open a card, apply for the advance and get the visa.' },
      result: { ru: 'Виза и аванс на счёте.', kk: 'Виза және шоттағы аванс.', en: 'A visa and the advance in your account.' },
    },
    checklist: {
      card: {
        ru: 'Оформили банковскую карту и передали сведения по карт-счёту по форме Центра.',
        kk: 'Банк картасын рәсімдеп, карт-шот мәліметтерін Орталық нысанымен бердіңіз.',
        en: "You opened a bank card and filed your card-account details on the Center's form.",
      },
      visa: {
        ru: 'Оформили визу; консульский сбор покрывает программа.',
        kk: 'Виза рәсімдедіңіз; консулдық алымды бағдарлама жабады.',
        en: 'You got the visa; the programme covers the consular fee.',
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
      ru: 'Работа по программе; промежуточный отчёт через 6 месяцев, если стажировка длиннее.',
      kk: 'Бағдарлама бойынша жұмыс; тағылымдама ұзақ болса, 6 айдан кейін аралық есеп.',
      en: 'Work to the programme; an interim report at 6 months if it runs longer.',
    },
    why: {
      ru: 'Если стажировка длится больше 6 месяцев, по их истечении администратору сдают промежуточный отчёт по форме приложения 8 к Правилам. Сменить организацию, страну или направление можно только через Комиссию; перенос сроков не более чем на год и без дополнительных расходов оформляют заявлением администратору. Невыполнение программы – основание для рассмотрения вопроса о возмещении расходов.',
      kk: 'Тағылымдама 6 айдан ұзақ болса, 6 ай өткен соң әкімшіге Қағидалардың 8-қосымшасындағы нысан бойынша аралық есеп тапсырылады. Ұйымды, елді не бағытты ауыстыру тек Комиссия арқылы мүмкін; мерзімді бір жылдан аспайтын және қосымша шығынсыз шегеру әкімшіге өтінішпен рәсімделеді. Бағдарламаны орындамау – шығынды өтеу мәселесін қарауға негіз.',
      en: 'If the internship runs longer than 6 months, an interim report on the form in Appendix 8 to the Rules is due to the administrator when they pass. Changing the host, country or direction goes only through the Commission; moving the dates by up to a year with no extra cost takes an application to the administrator. Not completing the programme is grounds to consider repayment of costs.',
    },
    inShort: {
      what: { ru: 'Прохождение научной стажировки за рубежом.', kk: 'Шетелде ғылыми тағылымдамадан өту.', en: 'Doing the scientific internship abroad.' },
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
        ru: 'Оформили медицинскую страховку; её покрывает программа.',
        kk: 'Медициналық сақтандыру рәсімдедіңіз; оны бағдарлама жабады.',
        en: 'You arranged medical insurance; the programme covers it.',
      },
      interim_report: {
        ru: 'Если стажировка длиннее 6 месяцев, сдали промежуточный отчёт по форме приложения 8 к Правилам.',
        kk: 'Тағылымдама 6 айдан ұзақ болса, Қағидалардың 8-қосымшасындағы нысан бойынша аралық есеп тапсырдыңыз.',
        en: 'If the internship runs past 6 months, you filed the interim report on the form in Appendix 8 to the Rules.',
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
      ru: 'Возвращение в течение 30 дней, итоговый отчёт – в течение месяца.',
      kk: '30 күн ішінде оралу, қорытынды есеп – бір ай ішінде.',
      en: 'Back within 30 days, the final report within a month.',
    },
    why: {
      ru: 'Вернуться в Казахстан нужно в течение 30 календарных дней после окончания стажировки и сдать администратору копию паспорта с отметкой о въезде, заявление о завершении и нотариальные переводы документа об окончании. В течение месяца после возвращения сдают итоговый отчёт по форме приложения 8 к Правилам; его утверждает работодатель и размещает на своём сайте. Если отчёт не сдан, рассматривают вопрос о возмещении потраченных средств.',
      kk: 'Тағылымдама аяқталғаннан кейін 30 күнтізбелік күн ішінде Қазақстанға оралып, әкімшіге кіру белгісі бар паспорт көшірмесін, аяқтау туралы өтінішті және аяқталу құжатының нотариалды аудармаларын тапсыру керек. Оралғаннан кейін бір ай ішінде Қағидалардың 8-қосымшасындағы нысан бойынша қорытынды есеп тапсырылады; оны жұмыс беруші бекітіп, өз сайтында орналастырады. Есеп тапсырылмаса, жұмсалған қаражатты өтеу мәселесі қаралады.',
      en: 'You return to Kazakhstan within 30 calendar days of the internship ending and give the administrator a passport copy with the entry stamp, a completion application and notarised translations of the completion document. Within a month of coming back you file the final report on the form in Appendix 8 to the Rules; your employer approves it and posts it on its website. If it is not filed, repayment of the money spent is considered.',
    },
    inShort: {
      what: { ru: 'Возвращение и итоговый отчёт.', kk: 'Оралу және қорытынды есеп.', en: 'Coming back and the final report.' },
      you: { ru: 'Сдать куратору заявление, переводы документов о завершении, копию паспорта и итоговый отчёт.', kk: 'Кураторға өтінішті, аяқталу құжаттарының аудармасын, паспорт көшірмесін және қорытынды есепті тапсыру.', en: 'Give your curator the application, translated completion documents, a passport copy and the final report.' },
      result: { ru: 'Стажировка завершена, начинается отработка у работодателя.', kk: 'Тағылымдама аяқталды, жұмыс берушіде өтеу басталады.', en: 'The internship is complete; the work-back with your employer begins.' },
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
        ru: 'Затянуть с отчётом: срок – один месяц.',
        kk: 'Есепті созу: мерзімі – бір ай.',
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
      ru: 'Не менее 3 лет подряд у работодателя, который вас направил. Справки каждые 6 месяцев.',
      kk: 'Сізді жіберген жұмыс берушіде қатарынан кемінде 3 жыл. Әр 6 айда анықтама.',
      en: 'At least 3 years in a row with the employer who sent you. Certificates every 6 months.',
    },
    why: {
      ru: 'Отработка – непрерывная трудовая деятельность не менее 3 лет по выбранному направлению исследования у работодателя, по заявке которого вы проходили стажировку. Сменить работодателя можно при его ликвидации или реорганизации либо по вашему обращению – в другую аккредитованную научную организацию, с сохранением направления, с согласия работодателя и по решению Комиссии. Справки с места работы направляют кураторам каждые 6 месяцев.',
      kk: 'Өтеу – өтінімі бойынша тағылымдамадан өткен жұмыс берушіде таңдаған зерттеу бағыты бойынша кемінде 3 жыл үздіксіз еңбек. Жұмыс берушіні ол таратылса не қайта ұйымдастырылса не өз өтінішіңізбен – басқа аккредиттелген ғылыми ұйымға, бағытты сақтап, жұмыс берушінің келісімімен және Комиссия шешімімен ауыстыруға болады. Жұмыс орнынан анықтама кураторларға әр 6 айда жіберіледі.',
      en: 'The work-back is at least 3 continuous years in your research direction with the employer whose request sent you. You can change employer if it is liquidated or reorganised, or at your request – to another accredited research organisation, keeping your direction, with your employer\'s consent and by the Commission\'s decision. Employment certificates go to the curators every 6 months.',
    },
    inShort: {
      what: { ru: 'Три года работы в своей организации по направлению исследования.', kk: 'Зерттеу бағыты бойынша өз ұйымыңызда үш жыл жұмыс.', en: 'Three years in your own organisation, in your research direction.' },
      you: { ru: 'Работать у своего работодателя и присылать справки каждые 6 месяцев.', kk: 'Өз жұмыс берушіңізде жұмыс істеп, әр 6 айда анықтама жіберу.', en: 'Work for your employer and send certificates every 6 months.' },
      result: { ru: 'Обязательства по договору исполнены.', kk: 'Шарт бойынша міндеттемелер орындалды.', en: 'Your contract obligations are fulfilled.' },
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
        ru: 'По окончании срока подали заявление об исполнении обязательств с копиями документа о стажировке и трудовой книжки, выпиской о пенсионных взносах и характеристикой работодателя.',
        kk: 'Мерзім аяқталған соң міндеттемелердің орындалуы туралы өтініш тапсырдыңыз – тағылымдама құжатының, еңбек кітапшасының көшірмесімен, зейнетақы жарналары үзінді көшірмесімен және жұмыс беруші мінездемесімен.',
        en: 'At the end you filed the fulfilment application – with copies of the internship document and work record, a pension statement and an employer reference.',
      },
    },
    mistakes: [
      {
        ru: 'Сменить работодателя самовольно: кроме случаев ликвидации или реорганизации, это возможно только с согласия работодателя и по решению Комиссии.',
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
    ru: 'Программа для учёных со своими правилами (приказ МНВО № 422) и списком организаций. Стажировка от 3 до 12 месяцев в зарубежном вузе или научном центре по вашему исследованию, затем не менее 3 лет работы у своего работодателя. Документы подают в Центр через egov.kz и (или) на бумаге.',
    kk: 'Өз қағидасы (ҒЖБМ № 422 бұйрығы) мен ұйымдар тізімі бар ғалымдарға арналған бағдарлама. Зерттеуіңіз бойынша шетелдік ЖОО-да не ғылыми орталықта 3-тен 12 айға дейін тағылымдама, содан кейін өз жұмыс берушіңізде кемінде 3 жыл жұмыс. Құжат Орталыққа egov.kz арқылы және (немесе) қағаз түрінде тапсырылады.',
    en: 'A programme for researchers with its own rules (Ministry Order No. 422) and host list. Three to twelve months at a foreign university or research centre for your research, then at least three years with your employer. Documents go to the Center through egov.kz and/or on paper.',
  },
  facts: [
    { value: '3–12', caption: { ru: 'месяцев – срок стажировки', kk: 'ай – тағылымдама мерзімі', en: 'months – the length of the internship' }, source: 'ns_rules422' },
    { value: '500', caption: { ru: 'учёных в год – поручение из Послания Президента', kk: 'ғалым жылына – Президент Жолдауындағы тапсырма', en: "researchers a year – the target set in the President's Address" }, source: 'ns_about' },
    { value: '90', caption: { ru: 'дней на договор после решения комиссии', kk: 'күн комиссия шешімінен кейін шартқа', en: 'days to sign after the commission decides' }, source: 'ns_rules422' },
    { value: '2', caption: { ru: 'гаранта – так обеспечивают обязательства', kk: 'кепілгер – міндеттеме осылай қамтамасыз етіледі', en: 'guarantors secure the obligations' }, source: 'ns_rules422' },
  ],
  fitYes: [
    { ru: 'У вас степень магистра, PhD, доктора по профилю, кандидата или доктора наук.', kk: 'Сізде магистр, PhD, бейіні бойынша доктор, ғылым кандидаты не докторы дәрежесі бар.', en: "You hold a master's, PhD, professional doctorate, Candidate or Doctor of Sciences degree." },
    { ru: 'Последние 12 месяцев вы непрерывно работаете в аккредитованной научной организации по своему направлению.', kk: 'Соңғы 12 ай бойы аккредиттелген ғылыми ұйымда өз бағытыңыз бойынша үздіксіз жұмыс істейсіз.', en: 'For the last 12 months you have worked continuously at an accredited research organisation in your area.' },
    { ru: 'У вас есть статья или обзор в Web of Science или Scopus, статья в издании из Списка 1 или 2 – и (или) международная заявка в Derwent Innovations Index.', kk: 'Сізде Web of Science не Scopus-та мақала не шолу, 1 не 2 Тізімдегі басылымда мақала – және (немесе) Derwent Innovations Index-те халықаралық өтінім бар.', en: 'You have an article or review in Web of Science or Scopus, an article in a List 1 or 2 journal – and/or an international application in the Derwent Innovations Index.' },
    { ru: 'Организация, которая вас приглашает, есть в списке организаций для научных стажировок этого года.', kk: 'Сізді шақыратын ұйым биылғы ғылыми тағылымдама ұйымдарының тізімінде бар.', en: "The host inviting you is on this year's list of scientific-internship organisations." },
  ],
  fitNo: [
    { text: { ru: 'Учёной степени и публикаций нет, но вы работаете в одной из девяти категорий: инженер, педагог, медик, госслужащий и другие.', kk: 'Ғылыми дәреже мен жарияланым жоқ, бірақ тоғыз санаттың бірінде жұмыс істейсіз: инженер, педагог, медик, мемқызметші және басқалар.', en: 'You have no academic degree or publications but work in one of nine categories – engineer, teacher, medic, civil servant and others.' }, go: 'internship' },
    { text: { ru: 'Вам нужна сама степень PhD, а не стажировка.', kk: 'Сізге тағылымдама емес, PhD дәрежесінің өзі керек.', en: 'You want the PhD degree itself, not a placement.' }, go: 'doctorate' },
  ],
  fitSources: ['ns_rules422', 'ns_requirements'],
  coverage: [
    { ru: 'Стоимость научной стажировки', kk: 'Ғылыми тағылымдама құны', en: 'The internship fee' },
    { ru: 'Проживание, питание и научная литература – по нормам приложения 3 к Правилам', kk: 'Тұру, тамақ және ғылыми әдебиет – Қағидалардың 3-қосымшасындағы норма бойынша', en: 'Accommodation, meals and research literature – at the rates in Appendix 3 to the Rules' },
    { ru: 'Виза и её продление (консульский сбор)', kk: 'Виза және оны ұзарту (консулдық алым)', en: 'The visa and its renewal (consular fee)' },
    { ru: 'Проезд от дома до места стажировки и обратно', kk: 'Үйден тағылымдама орнына дейін барып-қайту', en: 'Travel from home to the host and back' },
    { ru: 'Медицинская страховка и обязательное медобследование', kk: 'Медициналық сақтандыру және міндетті медициналық тексеру', en: 'Medical insurance and mandatory medical checks' },
    { ru: 'Обязательные услуги по требованию страны и принимающей организации', kk: 'Ел мен қабылдаушы ұйым талап ететін міндетті қызметтер', en: 'Mandatory services the country or host requires' },
  ],
  coverageSource: 'ns_rules422',
}
