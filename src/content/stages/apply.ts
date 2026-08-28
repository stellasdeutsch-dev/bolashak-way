import type { Stage } from '../types'

export const APPLY_STAGES: Stage[] = [
  {
    id: 'documents',
    chapter: 'apply',
    icon: 'FolderCheck',
    kicker: { ru: 'Пакет', kk: 'Топтама', en: 'The package' },
    title: { ru: 'Соберите пакет документов', kk: 'Құжаттар топтамасын жинаңыз', en: 'Assemble the document package' },
    summary: {
      ru: 'Что именно нужно — зависит от категории. Если чего-то не хватит, донести можно, но только пока идёт приём.',
      kk: 'Не керегі санатқа байланысты. Бірдеңе жетпесе, толықтыруға болады, бірақ тек қабылдау жүріп жатқанда.',
      en: 'What exactly you need depends on your category. If something is missing you can bring it later, but only while the intake is open.',
    },
    why: {
      ru: 'Самый долгий этап. Нотариальные переводы, справки, выписки и мотивационное письмо занимают недели. Начинайте, как только объявили сроки приёма, а лучше раньше.',
      kk: 'Ең ұзақ кезең. Нотариалды аударма, анықтама, үзінді көшірме және мотивациялық хат апталар алады. Қабылдау мерзімі жарияланған бойда бастаңыз, одан ерте болса — жақсы.',
      en: 'The longest stage. Notarised translations, certificates, statements and the motivation letter take weeks. Start as soon as the dates are announced — earlier if you can.',
    },
    inShort: {
      what: { ru: 'Сбор бумаг. Самый долгий и муторный этап: переводы, справки, выписки и мотивационное письмо.', kk: 'Қағаз жинау. Ең ұзақ әрі әуре кезең: аудармалар, анықтамалар, үзінді көшірмелер және мотивациялық хат.', en: 'Paperwork. The longest and most tedious stage: translations, certificates, statements and the motivation letter.' },
      you: { ru: 'Собрать пакет именно своей категории. Список ниже уже подстроен под ваши ответы.', kk: 'Дәл өз санатыңыздың топтамасын жинау. Төмендегі тізім жауаптарыңызға жиналған.', en: 'Assemble the package for your category. The list below is already built from your answers.' },
      result: { ru: 'Готовый комплект документов, с которым можно идти на подачу.', kk: 'Тапсыруға баруға болатын дайын құжаттар жинағы.', en: 'A complete set of documents, ready to submit.' },
    },
    checklist: [
      {
        id: 'anketa',
        text: {
          ru: 'Заполнили анкету претендента по утверждённой форме.',
          kk: 'Үміткер сауалнамасын бекітілген нысан бойынша толтырдыңыз.',
          en: 'You filled in the applicant questionnaire on the approved form.',
        },
        link: 'prikaz318',
      },
      {
        id: 'id',
        text: {
          ru: 'Готовы удостоверение личности и паспорт. На научную стажировку нужны оригиналы и копии — оригиналы вернут после сверки.',
          kk: 'Жеке куәлік пен паспорт дайын. Ғылыми тағылымдамаға түпнұсқа мен көшірме керек — түпнұсқаны салыстырғаннан кейін қайтарады.',
          en: 'Your ID card and passport are ready. For a scientific internship you need originals and copies — the originals come back after checking.',
        },
      },
      {
        id: 'diploma',
        text: {
          ru: 'Диплом с приложением. Если учились за границей — ещё удостоверение о признании или нострификации.',
          kk: 'Диплом қосымшасымен. Шетелде оқыған болсаңыз — тану не нострификация куәлігі де керек.',
          en: 'Your diploma with the transcript. If you studied abroad, add a recognition or nostrification certificate.',
        },
        appliesTo: { not: { track: ['bachelor'] } },
      },
      {
        id: 'school',
        text: {
          ru: 'Документ об общем среднем, техническом и профессиональном или послесреднем образовании с приложением.',
          kk: 'Жалпы орта, техникалық және кәсіптік не орта білімнен кейінгі білім туралы құжат қосымшасымен.',
          en: 'Your secondary, technical-vocational or post-secondary education document with its annex.',
        },
        appliesTo: { track: ['bachelor'] },
      },
      {
        id: 'science_degree',
        text: {
          ru: 'Документ об учёной степени (доктор наук, кандидат наук, PhD, доктор по профилю или магистр) с приложением.',
          kk: 'Ғылыми дәреже туралы құжат (ғылым докторы, кандидат, PhD, бейіні бойынша доктор не магистр) қосымшасымен.',
          en: 'Your academic degree document (Doctor of Sciences, Candidate, PhD, professional doctor or master) with its annex.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'medical',
        text: {
          ru: 'Медицинская справка для выезжающего за границу по форме 072/у.',
          kk: 'Шетелге шығушыға арналған 072/у нысанындағы медициналық анықтама.',
          en: 'Medical certificate for travellers abroad, form 072/u.',
        },
        link: 'pravila',
      },
      {
        id: 'motivation',
        text: {
          ru: 'Мотивационное письмо: эссе до 500 слов на казахском или русском. В конце обязательно дата и подпись.',
          kk: 'Мотивациялық хат: қазақ не орыс тілінде 500 сөзге дейінгі эссе. Соңында күні мен қолы міндетті.',
          en: 'A motivation letter: an essay of up to 500 words in Kazakh or Russian. It must be dated and signed at the end.',
        },
        appliesTo: { not: { category: ['residency', 'phd_self', 'science_internship'] } },
        link: 'pravila',
      },
      {
        id: 'employment',
        text: {
          ru: 'Справки о работе и выписка о пенсионных отчислениях за нужный период.',
          kk: 'Жұмыс туралы анықтамалар және қажетті кезеңдегі зейнетақы аударымдары туралы үзінді көшірме.',
          en: 'Employment papers and a pension-contribution statement for the required period.',
        },
        appliesTo: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
      },
      {
        id: 'employer_request',
        text: {
          ru: 'Заявка от работодателя на вашу учёбу — по утверждённой форме, с сохранением места работы.',
          kk: 'Жұмыс берушінің оқуыңызға өтінімі — бекітілген нысан бойынша, жұмыс орны сақталады.',
          en: 'Your employer\'s request to train you, on the approved form, with your job kept.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'lang_certs',
        text: {
          ru: 'Сертификаты по казахскому и иностранному языкам — не ниже минимальных баллов.',
          kk: 'Қазақ және шет тілі сертификаттары — ең төменгі балдардан төмен емес.',
          en: 'Kazakh and foreign language certificates — at or above the minimum scores.',
        },
        link: 'prikaz318',
      },
      {
        id: 'offer_docs',
        text: {
          ru: 'Приглашение или документ о зачислении, переведённый на казахский или русский и заверенный нотариусом.',
          kk: 'Шақыру не қабылдау туралы құжат, қазақ не орыс тіліне аударылып, нотариуста куәландырылған.',
          en: 'The offer or admission document, translated into Kazakh or Russian and notarised.',
        },
        appliesTo: { not: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'] } },
      },
      {
        id: 'study_plan',
        text: {
          ru: 'Индивидуальный учебный план, согласованный с зарубежным вузом, с нотариальным переводом.',
          kk: 'Шетелдік ЖОО-мен келісілген жеке оқу жоспары, нотариалды аудармасымен.',
          en: 'An individual study plan agreed with the foreign university, with a notarised translation.',
        },
        appliesTo: { category: ['phd_self', 'phd_nuclear'] },
      },
      {
        id: 'parent_consent',
        text: {
          ru: 'Нотариальное согласие законного представителя (для лиц младше 18 лет).',
          kk: 'Заңды өкілдің нотариалды келісімі (18 жасқа толмағандарға).',
          en: 'Notarised consent of a legal representative (for applicants under 18).',
        },
        required: false,
        appliesTo: { track: ['bachelor'] },
      },
      {
        id: 'publications_list',
        text: {
          ru: 'Список научных публикаций, утверждённый работодателем, и копия свидетельства об аккредитации вашей организации.',
          kk: 'Жұмыс беруші бекіткен ғылыми жарияланымдар тізімі және ұйымыңыздың аккредиттеу куәлігінің көшірмесі.',
          en: 'A list of your publications approved by your employer, plus a copy of your organisation\'s accreditation certificate.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'transcript_current',
        text: {
          ru: 'Если вы уже учитесь за рубежом — официальная справка об успеваемости от вуза с нотариальным переводом.',
          kk: 'Шетелде оқып жүрсеңіз — ЖОО-дан үлгерім туралы ресми анықтама, нотариалды аудармасымен.',
          en: 'If you already study abroad — an official academic record from the university, notarially translated.',
        },
        required: false,
        appliesTo: { category: ['master_self', 'phd_self', 'residency'] },
      },
    ],
    mistakes: [
      {
        ru: 'Оставить нотариальные переводы на последний день. Приглашение, программу стажировки и остальное переводят заранее — это не делается за час.',
        kk: 'Нотариалды аударманы соңғы күнге қалдыру. Шақыруды, тағылымдама бағдарламасын және қалғанын алдын ала аударады — бұл бір сағатта бітпейді.',
        en: 'Leaving notarised translations to the last day. The offer, the internship programme and the rest are translated in advance — it is not an hour\'s work.',
      },
      {
        ru: 'Написать мотивационное письмо длиннее 500 слов или забыть поставить дату и подпись в конце.',
        kk: 'Мотивациялық хатты 500 сөзден ұзын жазу не соңында күні мен қолын қоюды ұмыту.',
        en: 'Writing a motivation letter over 500 words, or forgetting the date and signature at the end.',
      },
      {
        ru: 'Оформить справку 072/у слишком рано — к подаче она уже просрочена. Делайте её ближе к сроку.',
        kk: '072/у анықтамасын тым ерте алу — тапсыруға оның мерзімі өтіп кетеді. Мерзімге жақын жасатыңыз.',
        en: 'Getting form 072/u too early — by the time you apply it has expired. Do it close to the deadline.',
      },
    ],
    sources: ['pravila', 'pp573', 'ns_documents', 'obrazcy'],
    estimateWeeks: [3, 8],
  },

  {
    id: 'apply',
    chapter: 'apply',
    icon: 'Send',
    kicker: { ru: 'Подача', kk: 'Тапсыру', en: 'Submission' },
    title: { ru: 'Подайте заявку на конкурс', kk: 'Конкурсқа өтініш беріңіз', en: 'Submit your application' },
    summary: {
      ru: 'Через портал egov.kz. На научную стажировку документы несут лично в ЦМП в Астане.',
      kk: 'egov.kz порталы арқылы. Ғылыми тағылымдамаға құжатты Астанадағы ХБО-ға өзі апарады.',
      en: 'Through egov.kz. For a scientific internship you bring the documents to the CIP office in Astana yourself.',
    },
    why: {
      ru: 'Сроки приёма объявляют каждый год и публикуют не позднее чем за 10 календарных дней до начала. Пропустили окно — ждать до следующего конкурсного года.',
      kk: 'Қабылдау мерзімін жыл сайын жариялайды, басталуға 10 күнтізбелік күн қалғанда хабарлайды. Терезені өткізіп алсаңыз — келесі конкурс жылын күтесіз.',
      en: 'The intake dates are announced each year, at least 10 calendar days before they open. Miss the window and you wait for the next competition year.',
    },
    inShort: {
      what: { ru: 'Собственно подача. Через портал egov.kz, а для научной стажировки — лично в Центр международных программ в Астане.', kk: 'Тапсырудың өзі. egov.kz порталы арқылы, ал ғылыми тағылымдамаға — Астанадағы Халықаралық бағдарламалар орталығына өзі.', en: 'The submission itself. Through egov.kz — or, for a scientific internship, in person at the Center for International Programs in Astana.' },
      you: { ru: 'Узнать сроки приёма и подать пакет внутри этого окна. Оно открывается раз в год.', kk: 'Қабылдау мерзімін біліп, топтаманы сол терезе ішінде тапсыру. Ол жылына бір рет ашылады.', en: 'Find the intake dates and submit inside that window. It opens once a year.' },
      result: { ru: 'Уведомление в личном кабинете: документы приняли и допустили к конкурсу — или отказали с указанием причины.', kk: 'Жеке кабинеттегі хабарлама: құжат қабылданып, конкурсқа жіберілді — не себебі көрсетіліп, бас тартылды.', en: 'A notice in your account: your documents were accepted and admitted — or refused with the reason given.' },
    },
    checklist: [
      {
        id: 'dates',
        text: {
          ru: 'Узнали, когда в этом году принимают документы.',
          kk: 'Биыл құжатты қашан қабылдайтынын білдіңіз.',
          en: 'You found out when documents are accepted this year.',
        },
        link: 'pravila',
      },
      {
        id: 'egov',
        text: {
          ru: 'Подали пакет через веб-портал электронного правительства egov.kz.',
          kk: 'Топтаманы egov.kz электрондық үкімет порталы арқылы тапсырдыңыз.',
          en: 'You submitted the package through the e-government portal egov.kz.',
        },
        appliesTo: { not: { track: ['science_internship'] } },
        link: 'egov_bolashak',
      },
      {
        id: 'in_person',
        text: {
          ru: 'Отнесли документы лично: бумажный пакет плюс скан на флешке или диске. Астана, ул. Сыганак 70, БЦ «Сыганак», 5 этаж, каб. 508.',
          kk: 'Құжатты өзіңіз апардыңыз: қағаз топтама және флешкадағы не дискідегі сканер көшірмесі. Астана, Сығанақ к-сі 70, «Сығанақ» БО, 5-қабат, 508-кабинет.',
          en: 'You delivered the documents yourself: the paper package plus a scan on a flash drive or disc. Astana, Syganak street 70, Syganak business centre, floor 5, room 508.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'poa',
        text: {
          ru: 'Если документы подаёт кто-то за вас — оформили нотариальную доверенность.',
          kk: 'Құжатты сіздің орныңызға біреу тапсырса — нотариалды сенімхат рәсімдедіңіз.',
          en: 'If someone submits on your behalf — you arranged a notarised power of attorney.',
        },
        required: false,
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'notice',
        text: {
          ru: 'В личный кабинет пришло уведомление: документы приняли и допустили к конкурсу — либо отказали с объяснением причины.',
          kk: 'Жеке кабинетке хабарлама келді: құжат қабылданып, конкурсқа жіберілді — не себебі көрсетіліп, бас тартылды.',
          en: 'A notice arrived in your account: your documents were accepted and admitted — or refused with the reason stated.',
        },
        link: 'cabinet',
      },
      {
        id: 'fix',
        text: {
          ru: 'Если чего-то не хватало — исправили и подали заново, пока приём ещё идёт.',
          kk: 'Бірдеңе жетпесе — түзетіп, қабылдау жүріп жатқанда қайта тапсырдыңыз.',
          en: 'If something was missing — you fixed it and re-submitted while the intake was still open.',
        },
        required: false,
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Сроки приёма документов и самого конкурса утверждают каждый год и публикуют не позднее чем за 10 календарных дней до начала приёма.',
          kk: 'Құжат қабылдау және конкурс мерзімін жыл сайын бекітіп, қабылдау басталуға 10 күнтізбелік күн қалғанда жариялайды.',
          en: 'The dates for the intake and the competition are set each year and published at least 10 calendar days before the intake opens.',
        },
        source: 'pp573',
      },
      {
        text: {
          ru: 'Научная стажировка: документы рассматривают и принимают — или отказывают — за 3 рабочих дня.',
          kk: 'Ғылыми тағылымдама: құжатты 3 жұмыс күнінде қарап, қабылдайды не бас тартады.',
          en: 'Scientific internship: documents are reviewed and either accepted or refused within 3 working days.',
        },
        source: 'pp791',
      },
    ],
    mistakes: [
      {
        ru: 'Указать почту, которой вы не пользуетесь. На неё придут логин и пароль для тестирования, а рассылают их партиями — письмо можно и не заметить.',
        kk: 'Пайдаланбайтын поштаны көрсету. Тестілеу логині мен құпиясөзі соған келеді, әрі оларды топтап жібереді — хатты байқамай қалуыңыз мүмкін.',
        en: 'Giving an email you do not check. The testing login and password go there, and they are sent out in batches — the letter is easy to miss.',
      },
      {
        ru: 'Подавать недостоверные документы или сведения: претендент исключается из конкурса и не допускается к нему в текущем году.',
        kk: 'Жалған құжат не мәлімет тапсыру: үміткер конкурстан шығарылып, ағымдағы жылы жіберілмейді.',
        en: 'Submitting false documents or data: the applicant is excluded from the competition for the current year.',
      },
      {
        ru: 'Считать, что заявка обработается мгновенно: заявки рассматриваются в порядке очереди со дня подачи.',
        kk: 'Өтінім бірден өңделеді деп ойлау: өтінімдер тапсырылған күннен бастап кезекпен қаралады.',
        en: 'Expecting instant processing: applications are handled in order of submission.',
      },
    ],
    sources: ['pravila', 'pp573', 'egov_bolashak', 'egov_ns', 'ns_documents', 'cabinet', 'booking'],
    estimateWeeks: [1, 3],
  },
]
