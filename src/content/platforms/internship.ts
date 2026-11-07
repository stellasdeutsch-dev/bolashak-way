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
        ru: 'У вас есть высшее образование: к заявке прикладывают диплом бакалавра или специалиста.',
        kk: 'Сізде жоғары білім бар – өтінімге бакалавр не маман дипломы қоса беріледі.',
        en: "You hold higher education – your bachelor's or specialist diploma goes with the application.",
      },
      pension_age: {
        ru: 'Стажировка и отработка после неё укладываются до пенсионного возраста. Считают на день подачи документов.',
        kk: 'Тағылымдама мен одан кейінгі өтеу зейнеткерлік жасқа дейін сыяды. Есеп құжат тапсырған күнге жүргізіледі.',
        en: 'The internship and the work-back after it fit before retirement age, counted as of the day you apply.',
      },
      once: {
        ru: 'Стипендию на стажировку дают один раз. Повторно – только если прошлую не использовали, к стажировке не приступили и долгов нет.',
        kk: 'Тағылымдамаға стипендия бір рет беріледі. Қайта – тек бұрынғысын пайдаланбаған, тағылымдамаға кіріспеген және берешек болмаса.',
        en: 'The internship scholarship is given once. Again only if you never used the earlier award, never started and owe nothing.',
      },
    },
  },

  category: {
    title: { ru: 'Категория работника и стаж', kk: 'Қызметкер санаты және өтіл', en: 'Worker category and experience' },
    summary: {
      ru: 'Девять категорий работников. Стаж – 3 года, из них последние 12 месяцев подряд в своей области.',
      kk: 'Тоғыз қызметкер санаты. Өтіл – 3 жыл, оның соңғы 12 айы қатарынан өз саласында.',
      en: 'Nine worker categories. Experience: 3 years, the last 12 months in a row in your own field.',
    },
    why: {
      ru: 'Категории работников определяет Республиканская комиссия: инженерно-технические работники и работники сферы агропромышленного комплекса, педагоги и работники организаций образования, медицинские работники, государственные служащие, работники средств массовой информации, работники сферы культуры, туризма и спорта, судьи и работники судов, пользователи системы искусственного интеллекта, работники атомной отрасли. Требования к стажу – в списке ниже.',
      kk: 'Қызметкер санаттарын Республикалық комиссия айқындайды: инженерлік-техникалық қызметкерлер мен агроөнеркәсіптік кешен саласының қызметкерлері, білім беру ұйымдарының педагогтері мен қызметкерлері, медицина қызметкерлері, мемлекеттік қызметшілер, бұқаралық ақпарат құралдарының қызметкерлері, мәдениет, туризм және спорт саласының қызметкерлері, судьялар мен сот қызметкерлері, жасанды интеллект жүйесін пайдаланушылар, атом саласының қызметкерлері. Өтілге қойылатын талаптар – төмендегі тізімде.',
      en: 'The Republican Commission sets the worker categories: engineering and technical workers and agro-industrial workers, teachers and staff of education organisations, medical workers, civil servants, mass media workers, culture, tourism and sport workers, judges and court staff, AI-system users, nuclear-industry workers. The experience requirements are listed below.',
    },
    inShort: {
      what: { ru: 'Проверка категории работника и стажа.', kk: 'Қызметкер санаты мен өтілді тексеру.', en: 'A check of your worker category and experience.' },
      you: { ru: 'Найти свою категорию и посчитать общий и непрерывный стаж по выписке о пенсионных отчислениях.', kk: 'Санатыңызды тауып, жалпы және үздіксіз өтілді зейнетақы аударымдары үзінді көшірмесі бойынша есептеу.', en: 'Find your category and count total and continuous experience from your pension-contribution statement.' },
      result: { ru: 'Вы знаете, подходит ли ваш стаж, и от кого нужна заявка работодателя.', kk: 'Өтіліңіз сай келе ме және жұмыс беруші өтінімін кімнен алу керегін білесіз.', en: 'You know whether your experience qualifies and who files the employer request.' },
    },
    mistakes: [
      {
        ru: 'Путать «3 года общего стажа» и «12 месяцев подряд в выбранной области». Нужно и то и другое.',
        kk: '«3 жыл жалпы өтіл» мен «таңдаған салада қатарынан 12 ай» дегенді шатастыру. Екеуі де керек.',
        en: 'Mixing up "3 years in total" and "12 months in a row in your field". You need both.',
      },
      {
        ru: 'Считать стаж по трудовой книжке. Проверяют выписку из ЕНПФ за весь период, включая оплачиваемый отпуск.',
        kk: 'Өтілді еңбек кітапшасы бойынша есептеу. Бүкіл кезеңдегі БЖЗҚ үзінді көшірмесін тексереді, ақылы демалысты қоса.',
        en: 'Counting experience from your work record book. The pension-fund statement for the whole period is checked, paid leave included.',
      },
    ],
  },

  specialty: {
    title: { ru: 'Специальность из перечня для стажировок', kk: 'Тағылымдамаға арналған тізбедегі мамандық', en: 'A specialty from the internship list' },
    summary: {
      ru: 'Для стажировок утверждён отдельный перечень специальностей.',
      kk: 'Тағылымдамаға жеке мамандықтар тізбесі бекітілген.',
      en: 'Internships have a separate approved specialty list.',
    },
    why: {
      ru: 'Специальность из этого перечня указывают в приглашении принимающей организации вместе со сроками и стоимостью. Без неё приглашение не пройдёт проверку.',
      kk: 'Осы тізбедегі мамандық қабылдаушы ұйымның шақыруында мерзім мен құнмен бірге көрсетіледі. Онсыз шақыру тексеруден өтпейді.',
      en: "The specialty from this list goes into the host's invitation together with the dates and the cost. Without it the invitation fails the check.",
    },
    inShort: {
      what: { ru: 'Проверка, что ваше направление есть в перечне для стажировок.', kk: 'Бағытыңыз тағылымдама тізбесінде барын тексеру.', en: 'A check that your field is on the internship list.' },
      you: { ru: 'Найти специальность в перечне (поиск ниже) и записать её название и код для приглашения.', kk: 'Тізбеден мамандықты тауып (іздеу төменде), атауы мен кодын шақыру үшін жазып алу.', en: 'Find the specialty (search below) and note its name and code for the invitation.' },
      result: { ru: 'Специальность из перечня, которую укажут в приглашении.', kk: 'Шақыруда көрсетілетін тізбедегі мамандық.', en: 'A listed specialty to be stated in the invitation.' },
    },
    mistakes: [
      {
        ru: 'Искать специальность в перечне для академического обучения.',
        kk: 'Мамандықты академиялық оқу тізбесінен іздеу.',
        en: 'Looking for the specialty in the degree list.',
      },
      {
        ru: 'Получить приглашение без специальности из перечня.',
        kk: 'Тізбедегі мамандықсыз шақыру алу.',
        en: 'Getting an invitation without a listed specialty.',
      },
    ],
    sources: ['pps_internship2026', 'pps_internship_pdf', 'pp573'],
  },

  university: {
    icon: 'Briefcase',
    links: { programme: 'pp573' },
    title: { ru: 'Принимающая организация', kk: 'Қабылдаушы ұйым', en: 'The host organisation' },
    summary: {
      ru: 'Отдельного списка нет, но правила ограничивают место стажировки. Срок – до 12 месяцев.',
      kk: 'Жеке тізім жоқ, бірақ тағылымдама орнын қағида шектейді. Мерзімі – 12 айға дейін.',
      en: 'There is no separate list, but the rules limit where you can go. Up to 12 months.',
    },
    why: {
      ru: 'Стажироваться можно до 12 месяцев в зарубежной организации на базе вуза из Списка, в признанном мировом научно-исследовательском центре, в научной организации, отраслевой организации или на производстве (ПП 573, п. 3). Нужно безусловное приглашение принимающей стороны.',
      kk: 'Тағылымдамадан 12 айға дейін Тізімдегі ЖОО базасындағы шетелдік ұйымда, танылған әлемдік ғылыми-зерттеу орталығында, ғылыми ұйымда, салалық ұйымда не өндірісте өтуге болады (ҚР ҮҚ 573, 3-тармақ). Қабылдаушы тараптың сөзсіз шақыруы керек.',
      en: 'You can intern for up to 12 months at a foreign organisation based at a listed university, a recognised world research centre, a research organisation, an industry organisation or a production site (Decree 573, cl. 3). You need the host\'s unconditional invitation.',
    },
    inShort: {
      what: { ru: 'Выбор зарубежной организации для стажировки.', kk: 'Тағылымдамаға шетелдік ұйым таңдау.', en: 'Choosing a foreign host for the internship.' },
      you: { ru: 'Согласовать с подходящей по правилам организацией содержание, сроки и стоимость.', kk: 'Қағидаға сай ұйыммен мазмұнын, мерзімі мен құнын келісу.', en: 'Settle the content, dates and cost with a host that fits the rules.' },
      result: { ru: 'Организация, готовая выдать безусловное приглашение.', kk: 'Сөзсіз шақыру беруге дайын ұйым.', en: 'A host ready to issue an unconditional invitation.' },
    },
    checklist: {
      invite_internship: {
        ru: 'Договорились с зарубежной организацией, подходящей по правилам: на базе вуза из Списка, научный центр, научная или отраслевая организация, производство.',
        kk: 'Қағидаға сай шетелдік ұйыммен келістіңіз: Тізімдегі ЖОО базасындағы ұйым, ғылыми орталық, ғылыми не салалық ұйым немесе өндіріс.',
        en: 'You agreed with a foreign host that fits the rules: based at a listed university, a research centre, a research or industry organisation, or a production site.',
      },
      programme: {
        ru: 'Согласовали с принимающей организацией содержание, сроки и стоимость стажировки.',
        kk: 'Қабылдаушы ұйыммен тағылымдаманың мазмұнын, мерзімі мен құнын келістіңіз.',
        en: 'You settled the content, dates and cost of the internship with the host.',
      },
      duration_internship: {
        ru: 'Срок стажировки – не больше 12 месяцев.',
        kk: 'Тағылымдама мерзімі – 12 айдан аспайды.',
        en: 'The internship lasts no more than 12 months.',
      },
    },
    mistakes: [
      {
        ru: 'Считать, что подойдёт любая организация. Правила ограничивают место стажировки.',
        kk: 'Кез келген ұйым жарайды деп ойлау. Тағылымдама орнын қағида шектейді.',
        en: 'Assuming any host will do. The rules limit where you can go.',
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
    links: { validity: null },
    summary: {
      ru: 'Один порог без курсов: IELTS 5.0 или эквивалент при подаче.',
      kk: 'Курссыз бір шек: тапсыру кезінде IELTS 5.0 не баламасы.',
      en: 'One threshold, no courses: IELTS 5.0 or equivalent when you apply.',
    },
    why: {
      ru: 'Для стажировки в таблице приказа № 318 указан только третий порог – уровень прямого направления; языковая подготовка после конкурса не предусмотрена. Сертификат входит в пакет документов.',
      kk: '№ 318 бұйрық кестесінде тағылымдамаға тек үшінші шек – тікелей жіберу деңгейі – көрсетілген; конкурстан кейін тіл даярлығы көзделмеген. Сертификат құжаттар топтамасына кіреді.',
      en: 'Order No. 318 sets only level III for internships – the level for going straight out; no language training after the competition is provided. The certificate is part of the package.',
    },
    inShort: {
      what: { ru: 'Проверка языка: один порог, без курсов.', kk: 'Тілді тексеру: бір шек, курссыз.', en: 'A language check: one threshold, no courses.' },
      you: { ru: 'Сравнить балл с порогом в таблице и с требованием принимающей организации.', kk: 'Балды кестедегі шекпен және қабылдаушы ұйымның талабымен салыстыру.', en: "Compare your score with the table and with the host's requirement." },
      result: { ru: 'Сертификат, который войдёт в пакет.', kk: 'Топтамаға кіретін сертификат.', en: 'A certificate that goes into the package.' },
    },
    checklist: {
      uni_requirement: {
        ru: 'Сверили балл с требованием принимающей организации: оно бывает выше.',
        kk: 'Балды қабылдаушы ұйымның талабымен салыстырдыңыз – ол жоғары болуы мүмкін.',
        en: "You compared your score with the host's requirement – it can be higher.",
      },
    },
    mistakes: [
      {
        ru: 'Подавать с баллом ниже порога: подтянуть язык после конкурса нельзя.',
        kk: 'Шектен төмен балмен тапсыру: конкурстан кейін тілді жетілдіру көзделмеген.',
        en: 'Applying below the threshold: there is no catching up on the language after the competition.',
      },
      {
        ru: 'Подать просроченный сертификат: IELTS и TOEFL действуют 2 года.',
        kk: 'Мерзімі өткен сертификат тапсыру: IELTS пен TOEFL 2 жыл жарамды.',
        en: 'Submitting an expired certificate: IELTS and TOEFL are valid for 2 years.',
      },
    ],
  },

  admission: {
    kicker: { ru: 'Приглашение', kk: 'Шақыру', en: 'The invitation' },
    title: { ru: 'Приглашение и программа стажировки', kk: 'Шақыру және тағылымдама бағдарламасы', en: 'The invitation and the internship programme' },
    summary: {
      ru: 'Безусловное приглашение принимающей организации и программа, утверждённая обеими сторонами.',
      kk: 'Қабылдаушы ұйымның сөзсіз шақыруы және екі тарап бекіткен бағдарлама.',
      en: "The host's unconditional invitation and a programme both sides have approved.",
    },
    why: {
      ru: 'Программу стажировки составляют по требованиям рабочего органа; её утверждают направляющая и принимающая организации.',
      kk: 'Тағылымдама бағдарламасы жұмыс органының талаптарына сай жасалады; оны жіберуші және қабылдаушы ұйымдар бекітеді.',
      en: 'The programme is drawn up to the working body\'s requirements and approved by both the sending organisation and the host.',
    },
    inShort: {
      what: { ru: 'Два обязательных документа: приглашение и программа стажировки.', kk: 'Екі міндетті құжат: шақыру және тағылымдама бағдарламасы.', en: 'Two required documents: the invitation and the internship programme.' },
      you: { ru: 'Получить безусловное приглашение, утвердить программу у обеих сторон и нотариально заверить переводы.', kk: 'Сөзсіз шақыру алып, бағдарламаны екі тарапқа бекітіп, аудармаларды нотариалды куәландыру.', en: 'Get the unconditional invitation, have both sides approve the programme and notarise the translations.' },
      result: { ru: 'Приглашение и программа, готовые к подаче.', kk: 'Тапсыруға дайын шақыру мен бағдарлама.', en: 'An invitation and a programme ready to submit.' },
    },
    checklist: {
      offer: {
        ru: 'Получили безусловное приглашение принимающей организации: допустимо только условие об оплате.',
        kk: 'Қабылдаушы ұйымның сөзсіз шақыруын алдыңыз: тек төлем туралы шарт болуы мүмкін.',
        en: "You received the host's unconditional invitation – the only condition allowed is about payment.",
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
        ru: 'Получить приглашение без расшифровки стоимости.',
        kk: 'Құнның есеп-қисабы жоқ шақыру алу.',
        en: 'Getting an invitation without the cost breakdown.',
      },
      {
        ru: 'Утвердить программу только у принимающей стороны: нужны обе организации.',
        kk: 'Бағдарламаны тек қабылдаушы тарапқа бекіту: екі ұйым да керек.',
        en: 'Having the programme approved by the host alone: both organisations must approve it.',
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
      ru: 'Кроме диплома и языковых сертификатов, в пакет входят заявка работодателя, выписка о пенсионных взносах, приглашение, программа стажировки и мотивационное письмо.',
      kk: 'Диплом мен тіл сертификаттарынан басқа топтамаға жұмыс беруші өтінімі, зейнетақы жарналары үзінді көшірмесі, шақыру, тағылымдама бағдарламасы және мотивациялық хат кіреді.',
      en: "Besides the diploma and language certificates, the package includes the employer request, the pension statement, the invitation, the internship programme and a motivation letter.",
    },
    mistakes: [
      {
        ru: 'Откладывать нотариальные переводы приглашения и программы на последний день.',
        kk: 'Шақыру мен бағдарламаның нотариалды аудармасын соңғы күнге қалдыру.',
        en: 'Leaving the notarised translations of the invitation and programme to the last day.',
      },
      {
        ru: 'Подать выписку ЕНПФ не за весь требуемый период.',
        kk: 'БЖЗҚ үзінді көшірмесін талап етілген кезеңнің бәріне тапсырмау.',
        en: 'Submitting a pension statement that does not cover the whole required period.',
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
      ru: 'Беседа с независимой экспертной комиссией о профессиональной подготовке и программе стажировки.',
      kk: 'Тәуелсіз сараптама комиссиясымен кәсіби дайындығыңыз және тағылымдама бағдарламасы туралы әңгіме.',
      en: 'A conversation with the independent expert commission about your professional background and internship programme.',
    },
    why: {
      ru: 'Во втором туре определяют уровень профессиональной подготовки, теоретических знаний и профессиональных компетенций в выбранной области. Опорой служат программа стажировки и мотивационное письмо.',
      kk: 'Екінші турда таңдаған саладағы кәсіби дайындық, теориялық білім және кәсіби құзыреттер деңгейі анықталады. Тағылымдама бағдарламасы мен мотивациялық хат тірек болады.',
      en: 'Round two assesses your professional training, theory and competencies in your chosen field. It draws on your internship programme and motivation letter.',
    },
    inShort: {
      what: { ru: 'Второй тур – анонимное собеседование о вашей профессии и программе стажировки.', kk: 'Екінші тур – кәсібіңіз және тағылымдама бағдарламасы туралы анонимді әңгімелесу.', en: 'Round two – an anonymous interview about your profession and your internship programme.' },
      you: { ru: 'Записаться на слот в личном кабинете и подготовить рассказ о программе и организации.', kk: 'Жеке кабинетте слотқа жазылып, бағдарлама мен ұйым туралы айтуға дайындалу.', en: 'Book a slot in your account and prepare to talk about the programme and the host.' },
      result: { ru: 'Рекомендация комиссии, которая вместе с баллом передаётся в третий тур.', kk: 'Балмен бірге үшінші турға берілетін комиссия ұсынымы.', en: "The commission's recommendation, passed to round three with your score." },
    },
    checklist: {
      prepare_uni: {
        ru: 'Изучили принимающую организацию и программу: что, у кого и зачем вы будете делать.',
        kk: 'Қабылдаушы ұйымды және бағдарламаңызды зерттедіңіз: не істейсіз, кімде және не үшін.',
        en: 'You studied the host and your programme: what you will do, with whom and why.',
      },
    },
    mistakes: [
      {
        ru: 'Ждать, что слот назначат за вас: записываться нужно самому.',
        kk: 'Слотты сізге тағайындайды деп күту: өзіңіз жазылуыңыз керек.',
        en: 'Waiting for a slot to be assigned: you book it yourself.',
      },
      {
        ru: 'Не суметь объяснить, зачем вашей работе эта программа и эта организация.',
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
    links: { curator: 'stipendiat_internship', visa_copy: 'stipendiat_internship' },
    summary: {
      ru: 'Финансовая гарантия, банковская карта, консульский сбор, виза, авиабилет.',
      kk: 'Қаржылық кепілдік, банк картасы, консулдық алым, виза, авиабилет.',
      en: 'Financial guarantee letter, bank card, consular fee, visa, flight ticket.',
    },
    why: {
      ru: 'Порядок: письмо о финансовой гарантии для посольства и принимающей организации, карта за месяц до отъезда, консульский сбор и виза, скан визы куратору, затем заявление на авиабилет.',
      kk: 'Реті: елшілік пен қабылдаушы ұйымға қаржылық кепілдік хаты, кетуге бір ай қалғанда карта, консулдық алым мен виза, виза сканы кураторға, содан кейін авиабилетке өтініш.',
      en: 'The order: the financial guarantee letter for the embassy and the host, the card a month before leaving, the consular fee and visa, a visa scan to your curator, then the ticket request.',
    },
    inShort: {
      what: { ru: 'Подготовка к отъезду на стажировку в установленном порядке.', kk: 'Тағылымдамаға кетуге белгіленген ретпен дайындалу.', en: 'Getting ready to leave for the internship in the set order.' },
      you: { ru: 'Получить письмо о финансовой гарантии, оформить карту, оплатить консульский сбор и получить визу.', kk: 'Қаржылық кепілдік хатын алып, карта рәсімдеп, консулдық алымды төлеп, виза алу.', en: 'Get the financial guarantee letter, a bank card, pay the consular fee and get the visa.' },
      result: { ru: 'Виза, карта и авиабилет на руках.', kk: 'Виза, карта және авиабилет қолыңызда.', en: 'A visa, a card and a ticket in hand.' },
    },
    checklist: {
      guarantee_letter: {
        ru: 'Подали заявление на письмо о финансовой гарантии для посольства и принимающей организации и отправили скан в организацию.',
        kk: 'Елшілік пен қабылдаушы ұйымға арналған қаржылық кепілдік хатына өтініш беріп, сканын ұйымға жібердіңіз.',
        en: 'You requested the financial guarantee letter – for the embassy and the host – and sent a scan to the host.',
      },
    },
  },

  studying: {
    links: { police: 'stipendiat_internship', insurance: 'stipendiat_internship', contact: 'stipendiat_internship' },
    title: { ru: 'Стажировка и отчётность', kk: 'Тағылымдама және есептілік', en: 'The internship and reporting' },
    summary: {
      ru: 'Учёт, страховка, программа без изменений; промежуточный отчёт, если стажировка длиннее 6 месяцев.',
      kk: 'Есепке тұру, сақтандыру, бағдарлама өзгеріссіз; тағылымдама 6 айдан ұзақ болса, аралық есеп.',
      en: 'Registration and insurance, the programme unchanged, an interim report if the internship runs past 6 months.',
    },
    why: {
      ru: 'Стажировку проходят по программе и в сроки из приглашения; изменения и дополнения в программу не допускаются. Если стажировка длиннее шести месяцев, нужны промежуточный отчёт и отзыв руководителя.',
      kk: 'Тағылымдамадан бағдарлама бойынша және шақырудағы мерзімде өтеді; бағдарламаға өзгеріс пен толықтыру енгізілмейді. Тағылымдама алты айдан ұзақ болса, аралық есеп пен жетекшінің пікірі керек.',
      en: 'You intern by the programme and on the dates from the invitation; no changes or additions to the programme are allowed. If it runs past six months, an interim report and your supervisor\'s feedback are due.',
    },
    inShort: {
      what: { ru: 'Прохождение стажировки за рубежом.', kk: 'Шетелде тағылымдамадан өту.', en: 'Doing the internship abroad.' },
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
        ru: 'Вносить изменения в программу стажировки: это не допускается.',
        kk: 'Тағылымдама бағдарламасына өзгеріс енгізу: бұған жол берілмейді.',
        en: 'Changing the internship programme: this is not allowed.',
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
      ru: 'Пакет о завершении: заявление, копия паспорта с отметкой о въезде, документ о завершении с переводом на казахский или русский, итоговый отзыв руководителя и отчёт о результатах.',
      kk: 'Аяқтау топтамасы: өтініш, кіру белгісі бар паспорт көшірмесі, қазақ не орыс тіліне аударылған аяқталу құжаты, жетекшінің қорытынды пікірі және нәтиже есебі.',
      en: 'The closing package: the application, a passport copy with the entry stamp, the completion document translated into Kazakh or Russian, your supervisor\'s final feedback and the results report.',
    },
    inShort: {
      what: { ru: 'Возвращение и закрытие стажировки.', kk: 'Оралу және тағылымдаманы жабу.', en: 'Coming back and closing the internship.' },
      you: { ru: 'Вернуться и сдать куратору пакет о завершении.', kk: 'Оралып, кураторға аяқтау топтамасын тапсыру.', en: 'Come back and hand your curator the closing package.' },
      result: { ru: 'Стажировка завершена, начинается отработка у работодателя.', kk: 'Тағылымдама аяқталды, жұмыс берушіде өтеу басталады.', en: 'The internship is complete; the work-back with your employer begins.' },
    },
    checklist: {
      application: {
        ru: 'Подали заявление о завершении стажировки.',
        kk: 'Тағылымдаманы аяқтау туралы өтініш бердіңіз.',
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
      ru: 'Отработка – не менее трёх лет в организации, подавшей на вас заявку, её филиале или представительстве в Казахстане. В другой организации – только с согласия работодателя, а работникам атомной отрасли – по его направлению.',
      kk: 'Өтеу – сізге өтінім берген ұйымда, оның Қазақстандағы филиалында не өкілдігінде кемінде үш жыл. Басқа ұйымда – тек жұмыс берушінің келісімімен, ал атом саласының қызметкерлеріне – оның жолдамасымен.',
      en: 'The work-back is at least three years at the organisation that requested you, or its branch or office in Kazakhstan. Elsewhere only with your employer\'s consent – and for nuclear-industry workers, only where the employer sends you.',
    },
    mistakes: [
      {
        ru: 'Уйти к другому работодателю без согласия того, кто направил.',
        kk: 'Жіберген жұмыс берушінің келісімінсіз басқасына кету.',
        en: 'Moving to another employer without the consent of the one who sent you.',
      },
      {
        ru: 'Не присылать справки каждые 6 месяцев: отработку не засчитают.',
        kk: 'Әр 6 айда анықтама жібермеу – өтеу есептелмейді.',
        en: 'Skipping the six-monthly certificates – the work-back will not be counted.',
      },
    ],
  },
}

export const INTERNSHIP_HOME: PlatformHome = {
  intro: {
    ru: 'Стажировка до 12 месяцев в зарубежной организации для работников девяти категорий со стажем. Степень не присваивается. Стажировка идёт по программе, утверждённой вашей и принимающей организациями; после неё – не менее трёх лет работы у своего работодателя.',
    kk: 'Өтілі бар тоғыз санаттағы қызметкерлерге шетелдік ұйымда 12 айға дейінгі тағылымдама. Дәреже берілмейді. Тағылымдама өз ұйымыңыз бен қабылдаушы ұйым бекіткен бағдарлама бойынша өтеді; одан кейін өз жұмыс берушіңізде кемінде үш жыл жұмыс.',
    en: 'An internship of up to 12 months at a foreign host for experienced workers in nine categories. No degree is awarded. You follow a programme approved by your organisation and the host, then work for your employer for at least three years.',
  },
  facts: [
    { value: '12', caption: { ru: 'месяцев – максимальный срок стажировки', kk: 'ай – тағылымдаманың ең ұзақ мерзімі', en: 'months – the longest an internship can run' }, source: 'pp573' },
    { value: '9', caption: { ru: 'категорий работников', kk: 'қызметкер санаты', en: 'worker categories' }, source: 'pravila' },
    { value: '3 · 12', caption: { ru: 'года общего стажа · месяцев подряд в своей области', kk: 'жыл жалпы өтіл · ай өз саласында қатарынан', en: 'years in total · months in a row in your field' }, source: 'pp573' },
    { value: '3', caption: { ru: 'года отработки у своего работодателя', kk: 'жыл өз жұмыс берушіңізде өтеу', en: 'years of work-back with your employer' }, source: 'pp573' },
  ],
  fitYes: [
    { ru: 'Вы работаете в одной из девяти категорий: инженерно-технические работники и работники сферы АПК, педагоги и работники организаций образования, медицинские работники, государственные служащие, работники средств массовой информации, работники сферы культуры, туризма и спорта, судьи и работники судов, пользователи системы искусственного интеллекта, работники атомной отрасли.', kk: 'Тоғыз санаттың бірінде жұмыс істейсіз: инженерлік-техникалық қызметкерлер және АӨК саласының қызметкерлері, білім беру ұйымдарының педагогтері мен қызметкерлері, медицина қызметкерлері, мемлекеттік қызметшілер, бұқаралық ақпарат құралдарының қызметкерлері, мәдениет, туризм және спорт саласының қызметкерлері, судьялар мен сот қызметкерлері, жасанды интеллект жүйесін пайдаланушылар, атом саласының қызметкерлері.', en: 'You work in one of nine categories: engineering and technical or agro-industrial workers, teachers and staff of education organisations, medical workers, civil servants, mass media workers, culture, tourism and sport workers, judges and court staff, AI-system users, nuclear-industry workers.' },
    { ru: 'У вас 3 года общего стажа и 12 месяцев подряд в выбранной области (для ИИ и атомной отрасли – 6).', kk: 'Сізде 3 жыл жалпы өтіл және таңдаған салада қатарынан 12 ай (ЖИ мен атом саласына – 6).', en: 'You have 3 years in total and 12 months in a row in your chosen field (6 for AI users and nuclear workers).' },
    { ru: 'Работодатель готов дать заявку и сохранить за вами место.', kk: 'Жұмыс беруші өтінім беріп, орныңызды сақтауға дайын.', en: 'Your employer will file a request and keep your job open.' },
  ],
  fitNo: [
    { text: { ru: 'Вы учёный со степенью и публикациями и едете в научную организацию по своему исследованию – для этого есть отдельная программа.', kk: 'Сіз дәрежесі мен жарияланымдары бар ғалымсыз және зерттеуіңіз бойынша ғылыми ұйымға барасыз – оған бөлек бағдарлама бар.', en: 'You are a researcher with a degree and publications going to a research host for your own study – there is a separate programme for that.' }, go: 'science' },
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
    ru: 'По примечанию к перечню специальностей стажировки проходят в странах, для которых утверждены нормы расходов.',
    kk: 'Мамандықтар тізбесінің ескертпесіне сәйкес тағылымдама шығыс нормалары бекітілген елдерде өтеді.',
    en: 'Under a note to the specialty list, internships take place in countries with approved spending norms.',
  },
  coverageNoteSource: 'pps_internship_pdf',
}
