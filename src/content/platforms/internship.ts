import type { PlatformHome, StagePatches } from '../types'

/**
 * Bolashak internship platform. Not a degree: up to 12 months at a foreign host for workers
 * of the categories the Republican Commission sets, with experience, an employer request
 * and an internship programme both sides approve (ПП 573 п. 3, 4 пп. 6, 13–14, 24).
 */

export const INTERNSHIP_STAGES: StagePatches = {
  eligibility: {
    checklist: {
      education: {
        ru: 'У вас есть высшее образование — к заявке прикладывают диплом бакалавра или специалиста.',
        kk: 'Сізде жоғары білім бар — өтінімге бакалавр не маман дипломы қоса беріледі.',
        en: "You hold higher education — your bachelor's or specialist diploma goes with the application.",
      },
      pension_age: {
        ru: 'Стажировка и отработка после неё укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Тағылымдама мен одан кейінгі өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'The internship and the work-back after it fit before retirement age. It is counted as of the day you apply.',
      },
      once: {
        ru: 'Вы знаете, что стипендию на стажировку дают один раз. Повторно — только если прошлую не использовали, к стажировке не приступили и долгов нет.',
        kk: 'Тағылымдамаға стипендия бір рет берілетінін білесіз. Қайта — тек бұрынғысын пайдаланбаған, тағылымдамаға кіріспеген және берешек болмаса.',
        en: 'You know the internship scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.',
      },
    },
  },

  category: {
    title: { ru: 'Категория работника и стаж', kk: 'Қызметкер санаты және өтіл', en: 'Worker category and experience' },
    summary: {
      ru: 'Девять категорий работников. Стаж — 3 года, из них последние 12 месяцев подряд в своей области.',
      kk: 'Тоғыз қызметкер санаты. Өтіл — 3 жыл, оның соңғы 12 айы қатарынан өз саласында.',
      en: 'Nine worker categories. Experience: 3 years, the last 12 months in a row in your own field.',
    },
    why: {
      ru: 'Стажировку дают работникам категорий, которые определяет Республиканская комиссия: инженерам и аграриям, педагогам, медикам, госслужащим, журналистам, работникам культуры, туризма и спорта, судьям, пользователям систем ИИ и работникам атомной отрасли. И стаж: 3 года в целом и 12 месяцев подряд в выбранной области на момент подачи. Пользователям ИИ и атомщикам хватит 6 месяцев подряд.',
      kk: 'Тағылымдаманы Республикалық комиссия белгілейтін санаттағы қызметкерлерге береді: инженерлер мен аграршылар, педагогтер, медиктер, мемқызметшілер, журналистер, мәдениет, туризм және спорт қызметкерлері, судьялар, ЖИ жүйелерін пайдаланушылар және атом саласының қызметкерлері. Әрі өтіл: жалпы 3 жыл және тапсыру сәтінде таңдаған салада қатарынан 12 ай. ЖИ пайдаланушылары мен атомшыларға қатарынан 6 ай жетеді.',
      en: 'The internship goes to workers in categories the Republican Commission sets: engineers and agricultural workers, teachers, medics, civil servants, journalists, culture, tourism and sport workers, judges, AI-system users and nuclear-industry workers. Plus experience: 3 years in total and 12 months in a row in your chosen field when you apply. AI users and nuclear workers need 6 months in a row.',
    },
    inShort: {
      what: { ru: 'Проверка, что вы из нужной категории работников и стаж сходится.', kk: 'Қажетті қызметкер санатынан екеніңізді және өтіл сәйкес келетінін тексеру.', en: 'A check that you are in an eligible worker category and the experience adds up.' },
      you: { ru: 'Найти свою категорию, посчитать общий стаж и непрерывный — по выписке о пенсионных отчислениях.', kk: 'Санатыңызды тауып, жалпы және үздіксіз өтілді — зейнетақы аударымдары үзінді көшірмесі бойынша — есептеу.', en: 'Find your category and count total and continuous experience from your pension-contribution statement.' },
      result: { ru: 'Уверенность, что проходите по стажу, — и заявка работодателя на примете.', kk: 'Өтіл бойынша өтетініңізге сенім — және жұмыс беруші өтінімі көз алдыңызда.', en: 'Confidence that your experience qualifies — and an employer request in sight.' },
    },
    mistakes: [
      {
        ru: 'Путать «3 года общего стажа» и «12 месяцев подряд в выбранной области». Нужно и то, и другое.',
        kk: '«3 жыл жалпы өтіл» мен «таңдаған салада қатарынан 12 ай» дегенді шатастыру. Екеуі де керек.',
        en: 'Mixing up "3 years in total" and "12 months in a row in your field". You need both.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Смотрят на выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесіне қарайды, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. What matters is the pension-fund statement for the whole period, paid leave included.',
      },
    ],
  },

  specialty: {
    title: { ru: 'Специальность из перечня для стажировок', kk: 'Тағылымдамаға арналған тізбедегі мамандық', en: 'A specialty from the internship list' },
    summary: {
      ru: 'У стажировок свой перечень специальностей — не тот, что для учёбы.',
      kk: 'Тағылымдаманың өз мамандықтар тізбесі бар — оқуға арналғаны емес.',
      en: 'Internships have a specialty list of their own — not the one for degrees.',
    },
    why: {
      ru: 'Для стажировок утверждают отдельный перечень специальностей. Специальность из него указывают в приглашении принимающей организации — вместе со сроками и стоимостью. Без неё приглашение не пройдёт проверку.',
      kk: 'Тағылымдамаға жеке мамандықтар тізбесі бекітіледі. Одан алынған мамандық қабылдаушы ұйымның шақыруында мерзім мен құнмен бірге көрсетіледі. Онсыз шақыру тексеруден өтпейді.',
      en: "A separate specialty list is approved for internships. The specialty from it is written into the host's invitation, together with the dates and the cost. Without it the invitation fails the check.",
    },
    inShort: {
      what: { ru: 'Проверка, что ваше направление есть в перечне для стажировок.', kk: 'Бағытыңыз тағылымдама тізбесінде барын тексеру.', en: 'A check that your field is on the internship list.' },
      you: { ru: 'Найти специальность в перечне — поиск ниже — и запомнить её название и код: они пойдут в приглашение.', kk: 'Тізбеден мамандықты табу — іздеу төменде — және атауы мен кодын есте сақтау: олар шақыруға жазылады.', en: 'Find the specialty — the search is below — and note its name and code: they go into the invitation.' },
      result: { ru: 'Специальность из перечня, которую впишут в приглашение.', kk: 'Шақыруға жазылатын тізбедегі мамандық.', en: 'A listed specialty to be written into the invitation.' },
    },
    mistakes: [
      {
        ru: 'Искать себя в перечне для академического обучения. У стажировок перечень свой.',
        kk: 'Өзіңізді академиялық оқу тізбесінен іздеу. Тағылымдаманың тізбесі бөлек.',
        en: 'Looking yourself up in the degree list. Internships have their own.',
      },
      {
        ru: 'Получить приглашение без специальности из перечня. Её указывают вместе со сроками и стоимостью.',
        kk: 'Тізбедегі мамандықсыз шақыру алу. Ол мерзім мен құнмен бірге көрсетіледі.',
        en: 'Getting an invitation without a listed specialty. It goes in together with the dates and cost.',
      },
    ],
    sources: ['pps_internship2026', 'pps_internship_pdf', 'pp573'],
  },

  university: {
    icon: 'Briefcase',
    title: { ru: 'Принимающая организация', kk: 'Қабылдаушы ұйым', en: 'The host organisation' },
    summary: {
      ru: 'Отдельного списка нет, но место стажировки правила ограничивают. Срок — до 12 месяцев.',
      kk: 'Жеке тізім жоқ, бірақ тағылымдама орнын қағида шектейді. Мерзімі — 12 айға дейін.',
      en: 'There is no separate list, but the rules limit where you can go. Up to 12 months.',
    },
    why: {
      ru: 'Стажироваться можно в зарубежной организации на базе вуза из Списка, в признанном мировом научно-исследовательском центре, в научной организации, отраслевой организации или на производстве — до 12 месяцев (ПП 573, п. 3). Отдельного перечня организаций для стажировок нет: решает безусловное приглашение принимающей стороны.',
      kk: 'Тағылымдамадан Тізімдегі ЖОО базасындағы шетелдік ұйымда, танылған әлемдік ғылыми-зерттеу орталығында, ғылыми ұйымда, салалық ұйымда не өндірісте — 12 айға дейін өтуге болады (ҚР ҮҚ 573, 3-тармақ). Тағылымдамаға арналған ұйымдардың жеке тізбесі жоқ: қабылдаушы тараптың сөзсіз шақыруы шешеді.',
      en: 'You can intern at a foreign organisation based at a listed university, a recognised world research centre, a research organisation, an industry organisation or a production site — for up to 12 months (Decree 573, cl. 3). There is no separate list of hosts: the host\'s unconditional invitation decides.',
    },
    inShort: {
      what: { ru: 'Поиск места стажировки за рубежом.', kk: 'Шетелде тағылымдама орнын іздеу.', en: 'Finding where to intern abroad.' },
      you: { ru: 'Договориться с организацией, подходящей под правила, и согласовать с ней содержание, сроки и стоимость.', kk: 'Қағидаға сай ұйыммен келісіп, онымен мазмұнын, мерзімі мен құнын келісу.', en: 'Agree with a host that fits the rules and settle the content, dates and cost with them.' },
      result: { ru: 'Организация, готовая выдать безусловное приглашение.', kk: 'Сөзсіз шақыру беруге дайын ұйым.', en: 'A host ready to issue an unconditional invitation.' },
    },
    checklist: {
      invite_internship: {
        ru: 'Договорились с зарубежной организацией, подходящей под правила: на базе вуза из Списка, научным центром, научной или отраслевой организацией либо производством.',
        kk: 'Қағидаға сай шетелдік ұйыммен келістіңіз: Тізімдегі ЖОО базасындағы ұйым, ғылыми орталық, ғылыми не салалық ұйым немесе өндіріс.',
        en: 'You agreed with a foreign host that fits the rules: based at a listed university, a research centre, a research or industry organisation, or a production site.',
      },
      programme: {
        ru: 'Согласовали с принимающей организацией содержание, сроки и стоимость стажировки.',
        kk: 'Қабылдаушы ұйыммен тағылымдаманың мазмұнын, мерзімі мен құнын келістіңіз.',
        en: 'You settled the content, dates and cost of the internship with the host.',
      },
      duration_internship: {
        ru: 'Срок стажировки — не больше 12 месяцев.',
        kk: 'Тағылымдама мерзімі — 12 айдан аспайды.',
        en: 'The internship lasts no more than 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Считать, что подойдёт любая организация. Место ограничено правилами — база вуза из Списка, научный центр, научная или отраслевая организация, производство.',
        kk: 'Кез келген ұйым жарайды деп ойлау. Орын қағидамен шектелген — Тізімдегі ЖОО базасы, ғылыми орталық, ғылыми не салалық ұйым, өндіріс.',
        en: 'Assuming any host will do. The rules limit it — a listed university base, a research centre, a research or industry organisation, a production site.',
      },
      {
        ru: 'Планировать стажировку длиннее 12 месяцев.',
        kk: 'Тағылымдаманы 12 айдан ұзақ жоспарлау.',
        en: 'Planning an internship longer than 12 months.',
      },
    ],
    sources: ['pp573', 'pps_internship_pdf'],
  },

  foreign: {
    summary: {
      ru: 'Один порог, без курсов: IELTS 5.0 или эквивалент — сразу, при подаче.',
      kk: 'Бір шек, курссыз: IELTS 5.0 не баламасы — бірден, тапсыру кезінде.',
      en: 'One threshold, no courses: IELTS 5.0 or equivalent — right away, when you apply.',
    },
    why: {
      ru: 'Для стажировки в таблице приказа № 318 стоит только третий порог — уровень прямого направления: подтягивать язык после конкурса здесь не предусмотрено. Сертификат по иностранному языку входит в пакет документов.',
      kk: '№ 318 бұйрық кестесінде тағылымдамаға тек үшінші шек — тікелей жіберу деңгейі — көрсетілген: конкурстан кейін тілді жетілдіру мұнда көзделмеген. Шет тілі сертификаты құжаттар топтамасына кіреді.',
      en: 'Order No. 318 sets only level III for internships — the level for going straight out: there is no catching up on the language after the competition. The foreign-language certificate is part of the package.',
    },
    inShort: {
      what: { ru: 'Проверка языка: один порог, без курсов.', kk: 'Тілді тексеру: бір шек, курссыз.', en: 'A language check: one threshold, no courses.' },
      you: { ru: 'Сравнить балл с порогом в таблице и с требованием принимающей организации.', kk: 'Балды кестедегі шекпен және қабылдаушы ұйымның талабымен салыстыру.', en: "Compare your score with the table and with the host's requirement." },
      result: { ru: 'Сертификат, который войдёт в пакет.', kk: 'Топтамаға кіретін сертификат.', en: 'A certificate that goes into the package.' },
    },
    checklist: {
      uni_requirement: {
        ru: 'Сверили балл с требованием принимающей организации — оно бывает выше.',
        kk: 'Балды қабылдаушы ұйымның талабымен салыстырдыңыз — ол жоғары болуы мүмкін.',
        en: "You compared your score with the host's requirement — it can be higher.",
      },
    },
    mistakes: [
      {
        ru: 'Подавать с баллом ниже порога в надежде подтянуть язык потом. На стажировку направляют только с нужным уровнем.',
        kk: 'Тілді кейін жетілдірем деп шектен төмен балмен тапсыру. Тағылымдамаға тек қажетті деңгеймен жібереді.',
        en: 'Applying below the threshold hoping to catch up later. You are sent only with the required level.',
      },
      {
        ru: 'Принести просроченный сертификат: IELTS и TOEFL действуют 2 года.',
        kk: 'Мерзімі өткен сертификат әкелу: IELTS пен TOEFL 2 жыл жарамды.',
        en: 'Bringing an expired certificate: IELTS and TOEFL are valid for 2 years.',
      },
    ],
  },

  admission: {
    kicker: { ru: 'Приглашение', kk: 'Шақыру', en: 'The invitation' },
    title: { ru: 'Приглашение и программа стажировки', kk: 'Шақыру және тағылымдама бағдарламасы', en: 'The invitation and the internship programme' },
    summary: {
      ru: 'Безусловное приглашение принимающей организации и программа, которую утвердили обе стороны.',
      kk: 'Қабылдаушы ұйымның сөзсіз шақыруы және екі тарап бекіткен бағдарлама.',
      en: "The host's unconditional invitation and a programme both sides have approved.",
    },
    why: {
      ru: 'В приглашении — специальность из перечня, сроки и стоимость стажировки с расшифровкой расчётов, с нотариальным переводом на казахский или русский. Программу стажировки составляют по требованиям рабочего органа и утверждают обе организации — направляющая и принимающая.',
      kk: 'Шақыруда — тізбедегі мамандық, тағылымдама мерзімі мен құнының есеп-қисабы, қазақ не орыс тіліне нотариалды аудармасымен. Тағылымдама бағдарламасын жұмыс органының талаптарына сай жасап, екі ұйым да — жіберуші де, қабылдаушы да — бекітеді.',
      en: 'The invitation carries the listed specialty, the dates and the cost with a breakdown, translated into Kazakh or Russian and notarised. The programme is drawn up to the working body\'s requirements and approved by both organisations — the one sending you and the host.',
    },
    inShort: {
      what: { ru: 'Два документа, без которых заявку не примут: приглашение и программа стажировки.', kk: 'Онсыз өтінім қабылданбайтын екі құжат: шақыру және тағылымдама бағдарламасы.', en: 'Two documents without which the application is not accepted: the invitation and the programme.' },
      you: { ru: 'Получить безусловное приглашение, согласовать программу с обеими сторонами и заверить переводы у нотариуса.', kk: 'Сөзсіз шақыру алып, бағдарламаны екі тараппен келісіп, аудармаларды нотариуста куәландыру.', en: 'Get the unconditional invitation, agree the programme with both sides and have the translations notarised.' },
      result: { ru: 'Приглашение и программа, готовые к подаче.', kk: 'Тапсыруға дайын шақыру мен бағдарлама.', en: 'An invitation and a programme ready to submit.' },
    },
    checklist: {
      offer: {
        ru: 'Получили безусловное приглашение принимающей организации — оговорка допустима только про оплату.',
        kk: 'Қабылдаушы ұйымның сөзсіз шақыруын алдыңыз — ескертпе тек төлем туралы болуы мүмкін.',
        en: "You received the host's unconditional invitation — the only condition allowed is about payment.",
      },
      offer_content: {
        ru: 'В приглашении указаны специальность из перечня, сроки и стоимость стажировки с расшифровкой расчётов.',
        kk: 'Шақыруда тізбедегі мамандық, тағылымдама мерзімі мен құнының есеп-қисабы көрсетілген.',
        en: 'The invitation states the listed specialty, the dates and the cost with a breakdown.',
      },
      translation: {
        ru: 'Перевели приглашение и программу на казахский или русский и заверили переводы у нотариуса.',
        kk: 'Шақыру мен бағдарламаны қазақ не орыс тіліне аударып, аудармаларды нотариуста куәландырдыңыз.',
        en: 'You had the invitation and the programme translated into Kazakh or Russian and notarised.',
      },
    },
    mistakes: [
      {
        ru: 'Приглашение без расшифровки стоимости — её требуют вместе со сроками.',
        kk: 'Құнның есеп-қисабы жоқ шақыру — оны мерзіммен бірге талап етеді.',
        en: 'An invitation without the cost breakdown — it is required together with the dates.',
      },
      {
        ru: 'Программа, подписанная только принимающей стороной. Её утверждают обе организации.',
        kk: 'Тек қабылдаушы тарап қол қойған бағдарлама. Оны екі ұйым да бекітеді.',
        en: 'A programme signed by the host alone. Both organisations approve it.',
      },
      {
        ru: 'Принять условное приглашение за безусловное: любое условие, кроме оплаты, делает его непригодным.',
        kk: 'Шартты шақыруды сөзсіз деп қабылдау: төлемнен басқа кез келген шарт оны жарамсыз етеді.',
        en: 'Treating a conditional invitation as unconditional: any condition other than payment makes it unusable.',
      },
    ],
    sources: ['pp573', 'pravila', 'internship_program'],
  },

  documents: {
    why: {
      ru: 'Пакет стажёра длиннее студенческого: к диплому и языкам добавляются заявка работодателя, выписка о пенсионных взносах, приглашение, программа стажировки и мотивационное письмо. Переводы и выписки занимают недели — начинайте сразу.',
      kk: 'Тағылымдамашының топтамасы студенттікінен ұзақ: дипломға және тілдерге жұмыс беруші өтінімі, зейнетақы жарналары үзінді көшірмесі, шақыру, тағылымдама бағдарламасы және мотивациялық хат қосылады. Аудармалар мен үзінді көшірмелер апталар алады — бірден бастаңыз.',
      en: "An intern's package is longer than a student's: on top of the diploma and languages come the employer request, the pension statement, the invitation, the internship programme and a motivation letter. Translations and statements take weeks — start at once.",
    },
    mistakes: [
      {
        ru: 'Оставить нотариальные переводы приглашения и программы на последний день.',
        kk: 'Шақыру мен бағдарламаның нотариалды аудармасын соңғы күнге қалдыру.',
        en: 'Leaving the notarised translations of the invitation and programme to the last day.',
      },
      {
        ru: 'Принести выписку ЕНПФ не за весь требуемый период.',
        kk: 'БЖЗҚ үзінді көшірмесін талап етілген кезеңнің бәріне әкелмеу.',
        en: 'Bringing a pension statement that does not cover the whole required period.',
      },
      {
        ru: 'Забыть мотивационное письмо: на стажировку оно тоже нужно.',
        kk: 'Мотивациялық хатты ұмыту: тағылымдамаға да ол керек.',
        en: 'Forgetting the motivation letter: internships need one too.',
      },
    ],
  },

  interview: {
    summary: {
      ru: 'Беседа с независимой экспертной комиссией о вашей профессиональной подготовке и программе стажировки.',
      kk: 'Тәуелсіз сараптама комиссиясымен кәсіби дайындығыңыз және тағылымдама бағдарламасы туралы әңгіме.',
      en: 'A conversation with the independent expert commission about your professional background and internship programme.',
    },
    why: {
      ru: 'Во втором туре определяют уровень профессиональной подготовки, теоретических знаний и профессиональных компетенций в выбранной области. Опорой служат ваша программа стажировки и мотивационное письмо — разберитесь в них лучше всех.',
      kk: 'Екінші турда таңдаған саладағы кәсіби дайындық, теориялық білім және кәсіби құзыреттер деңгейі анықталады. Тағылымдама бағдарламаңыз бен мотивациялық хатыңыз тірек болады — оларды бәрінен жақсы біліңіз.',
      en: 'Round two assesses your professional training, theory and competencies in your chosen field. Your internship programme and motivation letter are the backbone — know them better than anyone.',
    },
    inShort: {
      what: { ru: 'Второй тур — анонимное собеседование о вашей профессии и программе стажировки.', kk: 'Екінші тур — кәсібіңіз және тағылымдама бағдарламасы туралы анонимді әңгімелесу.', en: 'Round two — an anonymous interview about your profession and your internship programme.' },
      you: { ru: 'Записаться на слот в личном кабинете и подготовиться рассказать о программе и организации.', kk: 'Жеке кабинетте слотқа жазылып, бағдарлама мен ұйым туралы айтуға дайындалу.', en: 'Book a slot in your account and be ready to talk about the programme and the host.' },
      result: { ru: 'Рекомендация комиссии, которая уйдёт вместе с вашим баллом на третий тур.', kk: 'Балыңызбен бірге үшінші турға баратын комиссия ұсынымы.', en: "The commission's recommendation, which goes to round three with your score." },
    },
    checklist: {
      prepare_uni: {
        ru: 'Изучили принимающую организацию и свою программу: что вы будете делать, у кого и зачем.',
        kk: 'Қабылдаушы ұйымды және бағдарламаңызды зерттедіңіз: не істейсіз, кімде және не үшін.',
        en: 'You studied the host and your programme: what you will do, with whom and why.',
      },
    },
    mistakes: [
      {
        ru: 'Ждать, что слот назначат за вас. Записываться нужно самому, а даты появляются волнами.',
        kk: 'Слотты сізге тағайындайды деп күту. Өзіңіз жазылуыңыз керек, ал күндер толқынмен шығады.',
        en: 'Waiting for someone to assign you a slot. You book it yourself, and dates appear in waves.',
      },
      {
        ru: 'Не суметь объяснить, зачем вашей работе именно эта программа и эта организация.',
        kk: 'Жұмысыңызға дәл осы бағдарлама мен осы ұйым не үшін керегін түсіндіре алмау.',
        en: 'Not being able to explain why your job needs this very programme and host.',
      },
    ],
  },

  contract: {
    checklist: {
      main_contract: {
        ru: 'Подписали договор о прохождении стажировки по типовой форме.',
        kk: 'Тағылымдамадан өту туралы шартқа үлгі нысан бойынша қол қойдыңыз.',
        en: 'You signed the internship contract on the standard form.',
      },
    },
  },

  departure: {
    summary: {
      ru: 'Финансовая гарантия, банковская карта, консульский сбор, виза, авиабилет.',
      kk: 'Қаржылық кепілдік, банк картасы, консулдық алым, виза, авиабилет.',
      en: 'Financial guarantee letter, bank card, consular fee, visa, flight ticket.',
    },
    why: {
      ru: 'Порядок важен: письмо о финансовой гарантии — для посольства и принимающей организации, карта за месяц до отъезда, консульский сбор и виза, скан визы куратору и только потом заявление на авиабилет.',
      kk: 'Рет маңызды: қаржылық кепілдік хаты — елшілік пен қабылдаушы ұйымға, кетуге бір ай қалғанда карта, консулдық алым мен виза, виза сканы кураторға, содан кейін ғана авиабилетке өтініш.',
      en: 'Order matters: the financial guarantee letter for the embassy and the host, the card a month before leaving, the consular fee and visa, a visa scan to your curator, and only then the ticket request.',
    },
    inShort: {
      what: { ru: 'Подготовка к отъезду на стажировку — по шагам, в строгом порядке.', kk: 'Тағылымдамаға кетуге дайындық — қадаммен, қатаң ретпен.', en: 'Getting ready to leave for the internship — step by step, in a fixed order.' },
      you: { ru: 'Получить письмо о финансовой гарантии, оформить карту, оплатить консульский сбор и получить визу.', kk: 'Қаржылық кепілдік хатын алып, карта рәсімдеп, консулдық алымды төлеп, виза алу.', en: 'Get the financial guarantee letter, a bank card, pay the consular fee and get the visa.' },
      result: { ru: 'Виза, карта и авиабилет — можно лететь.', kk: 'Виза, карта және авиабилет — ұшуға болады.', en: 'A visa, a card and a ticket — you can fly.' },
    },
    checklist: {
      guarantee_letter: {
        ru: 'Написали заявление на письмо о финансовой гарантии — для посольства и принимающей организации — и отправили скан в организацию.',
        kk: 'Қаржылық кепілдік хатына өтініш жаздыңыз — елшілік пен қабылдаушы ұйымға — және сканын ұйымға жібердіңіз.',
        en: 'You requested the financial guarantee letter — for the embassy and the host — and sent a scan to the host.',
      },
    },
  },

  studying: {
    title: { ru: 'Стажировка и отчётность', kk: 'Тағылымдама және есептілік', en: 'The internship and reporting' },
    summary: {
      ru: 'Учёт и страховка, программа без изменений, промежуточный отчёт — если стажировка длиннее 6 месяцев.',
      kk: 'Есепке тұру және сақтандыру, бағдарлама өзгеріссіз, аралық есеп — тағылымдама 6 айдан ұзақ болса.',
      en: 'Registration and insurance, the programme unchanged, an interim report if the internship runs past 6 months.',
    },
    why: {
      ru: 'Стажировку проходят строго по программе и в сроки из приглашения — вносить изменения и дополнения в программу нельзя. Если стажировка длиннее шести месяцев, нужны промежуточный отчёт и отзыв руководителя.',
      kk: 'Тағылымдамадан бағдарлама бойынша және шақырудағы мерзімде қатаң өтеді — бағдарламаға өзгеріс пен толықтыру енгізуге болмайды. Тағылымдама алты айдан ұзақ болса, аралық есеп пен жетекшінің пікірі керек.',
      en: 'You intern strictly by the programme and on the dates from the invitation — no changes or additions to the programme are allowed. If it runs past six months, an interim report and your supervisor\'s feedback are due.',
    },
    inShort: {
      what: { ru: 'Сама стажировка за рубежом.', kk: 'Шетелдегі тағылымдаманың өзі.', en: 'The internship abroad itself.' },
      you: { ru: 'Встать на учёт, оформить страховку, выполнять программу и держать связь с куратором.', kk: 'Есепке тұрып, сақтандыру рәсімдеп, бағдарламаны орындап, куратормен байланыста болу.', en: 'Register, get insured, follow the programme and stay in touch with your curator.' },
      result: { ru: 'Выполненная программа и документ о завершении стажировки.', kk: 'Орындалған бағдарлама және тағылымдаманың аяқталғаны туралы құжат.', en: 'A completed programme and an internship completion document.' },
    },
    checklist: {
      insurance: {
        ru: 'Оформили медицинскую страховку.',
        kk: 'Медициналық сақтандыру рәсімдедіңіз.',
        en: 'You arranged medical insurance.',
      },
    },
    mistakes: [
      {
        ru: 'Вносить изменения в программу стажировки — это прямо запрещено.',
        kk: 'Тағылымдама бағдарламасына өзгеріс енгізу — бұған тікелей тыйым салынған.',
        en: 'Changing the internship programme — it is expressly forbidden.',
      },
      {
        ru: 'Уехать раньше срока из приглашения.',
        kk: 'Шақырудағы мерзімнен бұрын кету.',
        en: 'Leaving before the end date in the invitation.',
      },
    ],
  },

  return: {
    summary: {
      ru: 'Заявление о завершении, отметка о въезде, документ о завершении, отзыв руководителя и отчёт.',
      kk: 'Аяқтау туралы өтініш, кіру белгісі, аяқталғаны туралы құжат, жетекші пікірі және есеп.',
      en: 'Completion application, entry stamp, completion document, supervisor feedback and report.',
    },
    why: {
      ru: 'После стажировки вы возвращаетесь на трёхлетнюю отработку. Пакет закрытия: заявление, копия паспорта с отметкой о въезде, документ о завершении с переводом на казахский или русский, итоговый отзыв руководителя и отчёт о результатах.',
      kk: 'Тағылымдамадан кейін үш жылдық өтеуге ораласыз. Жабу топтамасы: өтініш, кіру белгісі бар паспорт көшірмесі, қазақ не орыс тіліне аударылған аяқталу құжаты, жетекшінің қорытынды пікірі және нәтиже есебі.',
      en: 'After the internship you come home for a three-year work-back. The closing package: the application, a passport copy with the entry stamp, the completion document translated into Kazakh or Russian, your supervisor\'s final feedback and the results report.',
    },
    inShort: {
      what: { ru: 'Возвращение и закрытие стажировки.', kk: 'Оралу және тағылымдаманы жабу.', en: 'Coming back and closing the internship.' },
      you: { ru: 'Вернуться и сдать куратору пакет о завершении.', kk: 'Оралып, кураторға аяқтау топтамасын тапсыру.', en: 'Come back and hand your curator the closing package.' },
      result: { ru: 'Стажировка закрыта — начинается отработка у работодателя.', kk: 'Тағылымдама жабылды — жұмыс берушіде өтеу басталады.', en: 'The internship is closed — the work-back with your employer begins.' },
    },
    checklist: {
      application: {
        ru: 'Написали заявление о завершении стажировки.',
        kk: 'Тағылымдаманы аяқтау туралы өтініш жаздыңыз.',
        en: 'You filed the internship completion application.',
      },
    },
    mistakes: [
      {
        ru: 'Забыть перевод документа о завершении на казахский или русский.',
        kk: 'Аяқталу құжатының қазақ не орыс тіліне аудармасын ұмыту.',
        en: 'Forgetting to translate the completion document into Kazakh or Russian.',
      },
    ],
  },

  workback: {
    summary: {
      ru: 'Не меньше 3 лет в организации, которая вас направила. Справки каждые 6 месяцев.',
      kk: 'Сізді жіберген ұйымда кемінде 3 жыл. Әр 6 айда анықтама.',
      en: 'At least 3 years at the organisation that sent you. Certificates every 6 months.',
    },
    why: {
      ru: 'Отработка — не меньше трёх лет в организации, которая давала на вас заявку, в её филиале или представительстве в Казахстане. В другой организации — только с согласия работодателя, а работникам атомной отрасли — по его направлению.',
      kk: 'Өтеу — сізге өтінім берген ұйымда, оның Қазақстандағы филиалында не өкілдігінде кемінде үш жыл. Басқа ұйымда — тек жұмыс берушінің келісімімен, ал атом саласының қызметкерлеріне — оның жолдамасымен.',
      en: 'The work-back is at least three years at the organisation that requested you, or its branch or office in Kazakhstan. Elsewhere only with your employer\'s consent — and for nuclear-industry workers, only where the employer sends you.',
    },
    mistakes: [
      {
        ru: 'Уйти к другому работодателю без согласия того, кто направил.',
        kk: 'Жіберген жұмыс берушінің келісімінсіз басқасына кету.',
        en: 'Moving to another employer without the consent of the one who sent you.',
      },
      {
        ru: 'Не присылать справки каждые 6 месяцев — так отработку не засчитают.',
        kk: 'Әр 6 айда анықтама жібермеу — өтеу есептелмейді.',
        en: 'Skipping the six-monthly certificates — the work-back will not be counted.',
      },
    ],
  },
}

export const INTERNSHIP_HOME: PlatformHome = {
  intro: {
    ru: 'Стажировка до 12 месяцев в зарубежной организации — для работников девяти категорий со стажем. Это не учёба на степень: вы едете по программе стажировки, которую утвердили ваша организация и принимающая, а потом не меньше трёх лет работаете у своего работодателя.',
    kk: 'Шетелдік ұйымда 12 айға дейінгі тағылымдама — өтілі бар тоғыз санаттағы қызметкерлерге. Бұл дәрежеге оқу емес: өз ұйымыңыз бен қабылдаушы ұйым бекіткен бағдарлама бойынша барасыз, содан кейін өз жұмыс берушіңізде кемінде үш жыл істейсіз.',
    en: 'An internship of up to 12 months at a foreign host — for experienced workers in nine categories. It is not a degree: you go on a programme approved by your organisation and the host, then work for your employer for at least three years.',
  },
  facts: [
    { value: '12', caption: { ru: 'месяцев — максимальный срок стажировки', kk: 'ай — тағылымдаманың ең ұзақ мерзімі', en: 'months — the longest an internship can run' }, source: 'pp573' },
    { value: '9', caption: { ru: 'категорий работников', kk: 'қызметкер санаты', en: 'worker categories' }, source: 'pravila' },
    { value: '3 · 12', caption: { ru: 'года общего стажа · месяцев подряд в своей области', kk: 'жыл жалпы өтіл · ай өз саласында қатарынан', en: 'years in total · months in a row in your field' }, source: 'pp573' },
    { value: '3', caption: { ru: 'года отработки у своего работодателя', kk: 'жыл өз жұмыс берушіңізде өтеу', en: 'years of work-back with your employer' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'Вы работаете в одной из девяти категорий: инженер или аграрий, педагог, медик, госслужащий, журналист, работник культуры, туризма или спорта, судья, пользователь систем ИИ, работник атомной отрасли.', kk: 'Тоғыз санаттың бірінде жұмыс істейсіз: инженер не аграршы, педагог, медик, мемқызметші, журналист, мәдениет, туризм не спорт қызметкері, судья, ЖИ жүйелерін пайдаланушы, атом саласының қызметкері.', en: 'You work in one of nine categories: engineer or agricultural worker, teacher, medic, civil servant, journalist, culture, tourism or sport worker, judge, AI-system user, nuclear-industry worker.' },
    { ru: 'У вас 3 года общего стажа и 12 месяцев подряд в выбранной области (для ИИ и атомной отрасли — 6).', kk: 'Сізде 3 жыл жалпы өтіл және таңдаған салада қатарынан 12 ай (ЖИ мен атом саласына — 6).', en: 'You have 3 years in total and 12 months in a row in your chosen field (6 for AI users and nuclear workers).' },
    { ru: 'Работодатель готов дать заявку и сохранить за вами место.', kk: 'Жұмыс беруші өтінім беріп, орныңызды сақтауға дайын.', en: 'Your employer will file a request and keep your job open.' },
  ],
  fitNo: [
    { text: { ru: 'Вы учёный со степенью и публикациями и едете в научную организацию по своему исследованию — для этого есть отдельная программа.', kk: 'Сіз дәрежесі және жарияланымдары бар ғалымсыз, зерттеуіңіз бойынша ғылыми ұйымға барасыз — оған бөлек бағдарлама бар.', en: 'You are a researcher with a degree and publications going to a research host for your own study — there is a separate programme for that.' }, go: 'science' },
    { text: { ru: 'Вам нужна степень магистра, а не стажировка.', kk: 'Сізге тағылымдама емес, магистр дәрежесі керек.', en: "You want a master's degree, not an internship." }, go: 'master' },
  ],
  fitSources: ['pp573', 'pravila'],
  coverage: [
    { ru: 'Стоимость стажировки', kk: 'Тағылымдама құны', en: 'The internship fee' },
    { ru: 'Проживание и питание', kk: 'Тұру және тамақ', en: 'Accommodation and meals' },
    { ru: 'Виза и её продление (консульский сбор)', kk: 'Виза және оны ұзарту (консулдық алым)', en: 'The visa and its renewal (consular fee)' },
    { ru: 'Проезд к месту стажировки и обратно', kk: 'Тағылымдама орнына барып-қайту', en: 'Travel to the internship and back' },
    { ru: 'Медицинская страховка и обязательное медобследование', kk: 'Медициналық сақтандыру және міндетті медициналық тексеру', en: 'Medical insurance and mandatory medical checks' },
    { ru: 'Регистрация в стране стажировки и банковская карта', kk: 'Тағылымдама елінде тіркелу және банк картасы', en: 'Registration in the host country and a bank card' },
  ],
  coverageSource: 'pp573',
  coverageNote: {
    ru: 'В примечании к перечню специальностей сказано: стажировки проходят в странах, для которых утверждены нормы расходов.',
    kk: 'Мамандықтар тізбесінің ескертпесінде: тағылымдама шығыс нормалары бекітілген елдерде өтеді делінген.',
    en: 'A note to the specialty list says internships take place in countries for which spending norms are approved.',
  },
}
