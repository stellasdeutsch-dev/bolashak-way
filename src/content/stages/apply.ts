import type { Stage } from '../types'

export const APPLY_STAGES: Stage[] = [
  {
    id: 'documents',
    chapter: 'apply',
    icon: 'FolderCheck',
    kicker: { ru: 'Пакет', kk: 'Топтама', en: 'The package' },
    title: { ru: 'Соберите пакет документов', kk: 'Құжаттар топтамасын жинаңыз', en: 'Assemble the document package' },
    summary: {
      ru: 'Состав зависит от категории. Недостающее можно донести, пока идёт приём.',
      kk: 'Құрамы санатқа байланысты. Жетпейтінін қабылдау жүріп жатқанда толықтыруға болады.',
      en: 'The contents depend on your category. Anything missing can be added while the intake is open.',
    },
    why: {
      ru: 'Нотариальные переводы, справки, выписки и мотивационное письмо готовят неделями. Начинайте до объявления сроков приёма.',
      kk: 'Нотариалды аударма, анықтама, үзінді көшірме және мотивациялық хатты апталап дайындайды. Қабылдау мерзімі жарияланғанға дейін бастаңыз.',
      en: 'Notarised translations, certificates, statements and the motivation letter take weeks. Start before the intake dates are announced.',
    },
    inShort: {
      what: { ru: 'Сбор документов: переводы, справки, выписки и мотивационное письмо.', kk: 'Құжат жинау: аудармалар, анықтамалар, үзінді көшірмелер және мотивациялық хат.', en: 'Gathering documents: translations, certificates, statements and the motivation letter.' },
      you: { ru: 'Собрать пакет своей категории по списку ниже.', kk: 'Төмендегі тізім бойынша өз санатыңыздың топтамасын жинау.', en: 'Assemble your category\'s package from the list below.' },
      result: { ru: 'Полный пакет документов для подачи.', kk: 'Тапсыруға дайын толық құжаттар топтамасы.', en: 'A complete package, ready to submit.' },
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
          ru: 'Готовы удостоверение личности и паспорт.',
          kk: 'Жеке куәлік пен паспорт дайын.',
          en: 'Your ID card and passport are ready.',
        },
      },
      {
        id: 'diploma',
        text: {
          ru: 'Диплом с приложением; если учились за рубежом – также удостоверение о признании или нострификации.',
          kk: 'Диплом қосымшасымен; шетелде оқыған болсаңыз – тану не нострификация куәлігі де.',
          en: 'Your diploma with the transcript; if you studied abroad, also a recognition or nostrification certificate.',
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
          ru: 'Мотивационное письмо: эссе до 500 слов на казахском или русском, в конце – дата и подпись.',
          kk: 'Мотивациялық хат: қазақ не орыс тілінде 500 сөзге дейінгі эссе, соңында – күні мен қолы.',
          en: 'A motivation letter: an essay of up to 500 words in Kazakh or Russian, dated and signed at the end.',
        },
        appliesTo: { not: { category: ['residency', 'phd_self', 'phd_nuclear', 'science_internship'] } },
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
          ru: 'Заявка работодателя по утверждённой форме с сохранением места работы.',
          kk: 'Жұмыс орны сақталатын, бекітілген нысандағы жұмыс беруші өтінімі.',
          en: 'Your employer\'s request on the approved form, with your job kept.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'lang_certs',
        text: {
          ru: 'Сертификаты по казахскому и иностранному языкам не ниже минимальных баллов.',
          kk: 'Қазақ және шет тілі сертификаттары – ең төменгі балдардан төмен емес.',
          en: 'Kazakh and foreign language certificates – at or above the minimum scores.',
        },
        link: 'prikaz318',
        // The packages that list a foreign certificate: ПП 573 п. 10 пп. 5 (preferential master's),
        // п. 14 пп. 5 (internship), приказ МНВО № 422 п. 9 пп. 8 (scientific internship). The
        // doctoral package (п. 12) and the self-admitted master's one have none.
        appliesTo: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear', 'internship', 'science_internship'] },
      },
      {
        id: 'lang_kazakh',
        text: {
          ru: 'Сертификат по казахскому языку не ниже B1. Сертификата по иностранному языку в списке документов вашей категории нет.',
          kk: 'B1-ден төмен емес қазақ тілі сертификаты. Сіздің санатыңыздың құжаттар тізімінде шет тілі сертификаты жоқ.',
          en: 'A Kazakh certificate at B1 or above. Your category\'s document list has no foreign-language certificate.',
        },
        link: 'pravila',
        appliesTo: { category: ['bachelor', 'master_self', 'phd_self', 'phd_nuclear', 'residency'] },
      },
      {
        id: 'offer_docs',
        text: {
          ru: 'Приглашение или документ о зачислении с нотариально заверенным переводом на казахский или русский.',
          kk: 'Қазақ не орыс тіліне нотариалды куәландырылған аудармасы бар шақыру не қабылдау туралы құжат.',
          en: 'The offer or admission document with a notarised Kazakh or Russian translation.',
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
        // ПП 573 п. 12 пп. 8 – for PhD, professional doctorate and residency alike.
        appliesTo: { category: ['phd_self', 'phd_nuclear', 'residency'] },
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
          ru: 'Список научных результатов (статьи, обзоры, заявки Derwent Innovations Index), утверждённый работодателем, и копия действительного свидетельства об аккредитации.',
          kk: 'Жұмыс беруші бекіткен ғылыми нәтижелер тізімі (мақалалар, шолулар, Derwent Innovations Index өтінімдері) және жарамды аккредиттеу куәлігінің көшірмесі.',
          en: 'A list of your research results (articles, reviews, Derwent Innovations Index applications) approved by your employer, plus a copy of a valid accreditation certificate.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_rules422',
      },
      {
        id: 'transcript_current',
        text: {
          ru: 'Если вы уже учитесь за рубежом – официальная справка вуза об успеваемости с нотариальным переводом.',
          kk: 'Шетелде оқып жүрсеңіз – ЖОО-дан үлгерім туралы ресми анықтама, нотариалды аудармасымен.',
          en: 'If you already study abroad – an official academic record from the university, notarially translated.',
        },
        required: false,
        appliesTo: { category: ['master_self', 'phd_self', 'phd_nuclear', 'residency'] },
      },
    ],
    mistakes: [
      {
        ru: 'Оставлять нотариальные переводы на последний день.',
        kk: 'Нотариалды аударманы соңғы күнге қалдыру.',
        en: 'Leaving notarised translations to the last day.',
      },
      {
        ru: 'Превысить 500 слов в мотивационном письме или не поставить дату и подпись.',
        kk: 'Мотивациялық хатта 500 сөзден асыру не күні мен қолын қоймау.',
        en: 'Going over 500 words in the motivation letter, or leaving out the date and signature.',
      },
      {
        ru: 'Оформить справку 072/у слишком рано: к подаче её срок может истечь.',
        kk: '072/у анықтамасын тым ерте алу: тапсыру кезінде оның мерзімі өтіп кетуі мүмкін.',
        en: 'Getting form 072/u too early: it may have expired by the time you apply.',
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
      ru: 'Через портал egov.kz, внутри срока приёма.',
      kk: 'egov.kz порталы арқылы, қабылдау мерзімі ішінде.',
      en: 'Through egov.kz, within the intake period.',
    },
    why: {
      ru: 'Если пропустить срок приёма, подать документы можно только в следующем конкурсном году.',
      kk: 'Қабылдау мерзімін өткізіп алсаңыз, құжатты тек келесі конкурс жылында тапсыра аласыз.',
      en: 'If you miss the intake period, you can apply only in the next competition year.',
    },
    inShort: {
      what: { ru: 'Подача документов на конкурс через портал egov.kz.', kk: 'Конкурсқа құжатты egov.kz порталы арқылы тапсыру.', en: 'Applying to the competition through the egov.kz portal.' },
      you: { ru: 'Узнать сроки приёма этого года и подать пакет в эти сроки.', kk: 'Биылғы қабылдау мерзімін біліп, топтаманы сол мерзімде тапсыру.', en: 'Find this year\'s intake dates and submit within them.' },
      result: { ru: 'Уведомление в личном кабинете о допуске к конкурсу или об отказе с указанием причины.', kk: 'Жеке кабинетте конкурсқа жіберу не себебі көрсетілген бас тарту туралы хабарлама.', en: 'A notice in your account: admission to the competition, or a refusal with the reason.' },
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
          ru: 'Подали документы через egov.kz и (или) на бумаге – правила допускают оба способа. Нарочно Центр принимает бумажный пакет со сканом на флешке или диске: Астана, ул. Сыганак 70, БЦ «Сыганак», 5 этаж, каб. 508.',
          kk: 'Құжатты egov.kz арқылы және (немесе) қағаз түрінде тапсырдыңыз – қағида екі тәсілді де рұқсат етеді. Орталық қолма-қол қағаз топтаманы флешкадағы не дискідегі сканер көшірмесімен қабылдайды: Астана, Сығанақ к-сі 70, «Сығанақ» БО, 5-қабат, 508-кабинет.',
          en: 'You submitted through egov.kz and/or on paper – the rules allow both. In person, the Center takes the paper package with a scan on a flash drive or disc: Astana, Syganak street 70, Syganak business centre, floor 5, room 508.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'poa',
        text: {
          ru: 'Если документы подаёт другое лицо – оформили нотариальную доверенность.',
          kk: 'Құжатты басқа адам тапсырса – нотариалды сенімхат рәсімдедіңіз.',
          en: 'If someone else submits for you – you arranged a notarised power of attorney.',
        },
        required: false,
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'notice',
        text: {
          ru: 'Получили в личном кабинете уведомление о допуске к конкурсу или об отказе с указанием причины.',
          kk: 'Жеке кабинетте конкурсқа жіберу не себебі көрсетілген бас тарту туралы хабарлама алдыңыз.',
          en: 'You received a notice in your account: admission to the competition, or a refusal with the reason.',
        },
        link: 'cabinet',
      },
      {
        id: 'fix',
        text: {
          ru: 'Если чего-то не хватало – исправили и подали заново до окончания приёма.',
          kk: 'Бірдеңе жетпесе – түзетіп, қабылдау аяқталғанға дейін қайта тапсырдыңыз.',
          en: 'If something was missing – you fixed it and re-submitted before the intake closed.',
        },
        required: false,
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Сроки приёма документов и конкурса утверждают ежегодно и публикуют не позднее чем за 10 календарных дней до начала приёма.',
          kk: 'Құжат қабылдау және конкурс мерзімін жыл сайын бекітіп, қабылдау басталуға кемінде 10 күнтізбелік күн бұрын жариялайды.',
          en: 'The dates for the intake and the competition are set each year and published at least 10 calendar days before the intake opens.',
        },
        source: 'pp573',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        text: {
          ru: 'Научная стажировка: документы рассматривают и принимают или отказывают в приёме в течение 2 рабочих дней.',
          kk: 'Ғылыми тағылымдама: құжатты 2 жұмыс күні ішінде қарап, қабылдайды не қабылдаудан бас тартады.',
          en: 'Scientific internship: documents are reviewed and accepted or refused within 2 working days.',
        },
        source: 'ns_rules422',
        appliesTo: { track: ['science_internship'] },
      },
    ],
    mistakes: [
      {
        ru: 'Указать почту, которую вы не проверяете: на неё приходят логин и пароль для тестирования.',
        kk: 'Тексермейтін поштаны көрсету: тестілеу логині мен құпиясөзі соған келеді.',
        en: 'Giving an email you do not check: the testing login and password are sent there.',
      },
      {
        ru: 'Подавать недостоверные документы или сведения: претендент исключается из конкурса и не допускается к нему в текущем году.',
        kk: 'Жалған құжат не мәлімет тапсыру: үміткер конкурстан шығарылып, ағымдағы жылы жіберілмейді.',
        en: 'Submitting false documents or data: the applicant is excluded from the competition for the current year.',
      },
      {
        ru: 'Ждать мгновенного ответа: заявки рассматривают в порядке очереди со дня подачи.',
        kk: 'Жауапты бірден күту: өтінімдер тапсырылған күннен бастап кезекпен қаралады.',
        en: 'Expecting an instant answer: applications are handled in order of submission.',
      },
    ],
    sources: ['pravila', 'pp573', 'egov_bolashak', 'egov_ns', 'ns_documents', 'cabinet', 'booking'],
    estimateWeeks: [1, 3],
  },
]
