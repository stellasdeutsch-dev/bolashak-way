import type { Stage } from '../types'

export const APPLY_STAGES: Stage[] = [
  {
    id: 'documents',
    chapter: 'apply',
    icon: 'FolderCheck',
    kicker: { ru: 'Пакет', kk: 'Топтама', en: 'The package' },
    title: { ru: 'Соберите пакет документов', kk: 'Құжаттар топтамасын жинаңыз', en: 'Assemble the document package' },
    summary: {
      ru: 'Полный список зависит от категории. Неполный пакет можно донести, но только в срок приёма.',
      kk: 'Толық тізім санатқа байланысты. Толық емес топтаманы қабылдау мерзімінде толықтыруға болады.',
      en: 'The list depends on your category. An incomplete package can be topped up, but only within the intake window.',
    },
    why: {
      ru: 'Это самый трудоёмкий этап: нотариальные переводы, справки, выписки и мотивационное письмо занимают недели. Начинайте, как только объявили сроки приёма, — а лучше раньше.',
      kk: 'Бұл ең еңбекті кезең: нотариалды аудармалар, анықтамалар, үзінді көшірмелер мен мотивациялық хат апталар алады. Қабылдау мерзімі жарияланған бойда бастаңыз.',
      en: 'This is the most laborious stage: notarised translations, certificates, statements and the motivation letter take weeks. Start as soon as the intake dates are announced — earlier if you can.',
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
          ru: 'Готовы удостоверение личности и паспорт (для научной стажировки — оригиналы и копии, оригиналы вернут после сверки).',
          kk: 'Жеке куәлік пен паспорт дайын (ғылыми тағылымдамаға — түпнұсқа мен көшірме, түпнұсқа салыстырудан кейін қайтарылады).',
          en: 'Your ID card and passport are ready (for scientific internships — originals and copies; originals are returned after verification).',
        },
      },
      {
        id: 'diploma',
        text: {
          ru: 'Диплом с приложением. Если учились за рубежом — удостоверение о признании или нострификации документа об образовании.',
          kk: 'Диплом қосымшасымен. Шетелде оқыған болсаңыз — білім туралы құжатты тану не нострификациялау куәлігі.',
          en: 'Your diploma with its transcript. If you studied abroad — a recognition or nostrification certificate.',
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
          ru: 'Мотивационное письмо — эссе не более 500 слов на казахском или русском, с датой и подписью в конце.',
          kk: 'Мотивациялық хат — қазақ не орыс тілінде 500 сөзден аспайтын эссе, соңында күні мен қолы қойылған.',
          en: 'Motivation letter — an essay of at most 500 words in Kazakh or Russian, dated and signed at the end.',
        },
        appliesTo: { not: { category: ['residency', 'phd_self', 'science_internship'] } },
        link: 'pravila',
      },
      {
        id: 'employment',
        text: {
          ru: 'Документы о трудовой деятельности и выписка о перечисленных обязательных пенсионных взносах за требуемый период.',
          kk: 'Еңбек қызметі туралы құжаттар және талап етілетін кезеңдегі міндетті зейнетақы жарналары туралы үзінді көшірме.',
          en: 'Employment documents and a statement of mandatory pension contributions for the required period.',
        },
        appliesTo: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
      },
      {
        id: 'employer_request',
        text: {
          ru: 'Заявка работодателя на подготовку специалиста с условием сохранения места работы по утверждённой форме.',
          kk: 'Жұмыс орнын сақтау шартымен маман даярлауға жұмыс берушінің бекітілген нысандағы өтінімі.',
          en: 'Employer request to train the specialist with the job retained, on the approved form.',
        },
        appliesTo: { category: ['master_civil', 'master_nuclear', 'phd_nuclear', 'internship', 'science_internship'] },
        link: 'employer_form',
      },
      {
        id: 'lang_certs',
        text: {
          ru: 'Сертификаты по казахскому и иностранному языкам с результатами не ниже минимальных требований.',
          kk: 'Қазақ және шет тілдері бойынша ең төменгі талаптардан төмен емес сертификаттар.',
          en: 'Kazakh and foreign language certificates meeting at least the minimum requirements.',
        },
        link: 'prikaz318',
      },
      {
        id: 'offer_docs',
        text: {
          ru: 'Документы о безусловном зачислении или приглашении с нотариальным переводом на казахский или русский.',
          kk: 'Сөзсіз қабылдау не шақыру туралы құжаттар, қазақ не орыс тіліне нотариалды аудармасымен.',
          en: 'Unconditional admission or invitation documents with a notarised Kazakh or Russian translation.',
        },
        appliesTo: { not: { category: ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'] } },
      },
      {
        id: 'study_plan',
        text: {
          ru: 'Индивидуальный учебный план, согласованный с зарубежным вузом, с нотариальным переводом.',
          kk: 'Шетелдік ЖОО-мен келісілген жеке оқу жоспары, нотариалды аудармасымен.',
          en: 'An individual study plan agreed with the foreign university, notarially translated.',
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
          ru: 'Список научных результатов, утверждённый работодателем, и копия свидетельства об аккредитации организации.',
          kk: 'Жұмыс беруші бекіткен ғылыми нәтижелер тізімі және ұйымның аккредиттеу куәлігінің көшірмесі.',
          en: 'A list of research results approved by your employer and a copy of the organisation\'s accreditation certificate.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'transcript_current',
        text: {
          ru: 'Официальный документ об успеваемости от зарубежного вуза (если вы уже там учитесь) с нотариальным переводом.',
          kk: 'Шетелдік ЖОО-дан үлгерім туралы ресми құжат (онда оқып жүрсеңіз) нотариалды аудармасымен.',
          en: 'An official academic-performance document from your foreign university (if you already study there), notarially translated.',
        },
        required: false,
        appliesTo: { category: ['master_self', 'phd_self', 'residency'] },
      },
    ],
    mistakes: [
      {
        ru: 'Оставлять нотариальный перевод на последний день: переводы приглашения, программы стажировки и других документов делаются заранее.',
        kk: 'Нотариалды аударманы соңғы күнге қалдыру: аудармалар алдын ала жасалады.',
        en: 'Leaving notarised translations to the last day: translations of the offer, programme and other documents take time.',
      },
      {
        ru: 'Мотивационное письмо длиннее 500 слов или без даты и подписи в конце.',
        kk: 'Мотивациялық хаттың 500 сөзден ұзын болуы не соңында күні мен қолының болмауы.',
        en: 'A motivation letter longer than 500 words or missing the date and signature at the end.',
      },
      {
        ru: 'Просроченная справка 072/у: оформляйте её ближе к подаче, а не за полгода.',
        kk: 'Мерзімі өткен 072/у анықтамасы: оны тапсыруға жақын рәсімдеңіз.',
        en: 'An expired form 072/u certificate: get it close to the application date, not half a year ahead.',
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
      ru: 'Через портал электронного правительства; научная стажировка — нарочно в ЦМП в Астане.',
      kk: 'Электрондық үкімет порталы арқылы; ғылыми тағылымдама — Астанадағы ХБО-ға қолма-қол.',
      en: 'Via the e-government portal; scientific internships — in person at the CIP in Astana.',
    },
    why: {
      ru: 'Сроки приёма документов утверждаются ежегодно и публикуются не позднее чем за 10 календарных дней до начала приёма. Пропустить окно — значит ждать следующий конкурсный год.',
      kk: 'Құжат қабылдау мерзімдері жыл сайын бекітіліп, қабылдау басталуға 10 күнтізбелік күн қалғанда жарияланады. Терезені өткізіп алу — келесі жылды күту.',
      en: 'Intake dates are approved annually and published no later than 10 calendar days before the intake opens. Missing the window means waiting a year.',
    },
    checklist: [
      {
        id: 'dates',
        text: {
          ru: 'Узнали сроки приёма документов текущего конкурсного года.',
          kk: 'Ағымдағы конкурс жылының құжат қабылдау мерзімін білдіңіз.',
          en: 'You checked this year\'s intake dates.',
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
          ru: 'Подали документы нарочно: бумажный пакет и сканированная версия на электронном носителе, Астана, ул. Сыганак 70, БЦ «Сыганак», 5 этаж, каб. 508.',
          kk: 'Құжаттарды қолма-қол тапсырдыңыз: қағаз топтама және электрондық тасымалдағыштағы сканерленген нұсқа, Астана, Сығанақ к-сі 70, 5-қабат, 508-кабинет.',
          en: 'You submitted in person: the paper package plus a scanned copy on a storage device — Astana, Syganak st. 70, 5th floor, room 508.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'poa',
        text: {
          ru: 'Если подаёт представитель — оформили нотариально заверенную доверенность.',
          kk: 'Өкіл тапсырса — нотариалды куәландырылған сенімхат рәсімдедіңіз.',
          en: 'If a representative submits for you — a notarised power of attorney is prepared.',
        },
        required: false,
        appliesTo: { track: ['science_internship'] },
        link: 'ns_documents',
      },
      {
        id: 'notice',
        text: {
          ru: 'Получили уведомление о приёме документов и допуске к конкурсу (или мотивированный отказ) в личный кабинет.',
          kk: 'Құжаттардың қабылданғаны және конкурсқа жіберілгені туралы хабарламаны (не дәлелді бас тартуды) жеке кабинетке алдыңыз.',
          en: 'You received the notice of acceptance and admission to the competition (or a reasoned refusal) in your account.',
        },
        link: 'cabinet',
      },
      {
        id: 'fix',
        text: {
          ru: 'Если пакет неполный — устранили замечания и подали повторно в пределах срока приёма.',
          kk: 'Топтама толық болмаса — ескертулерді жойып, қабылдау мерзімінде қайта тапсырдыңыз.',
          en: 'If the package was incomplete — you fixed the issues and re-submitted within the intake window.',
        },
        required: false,
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Сроки приёма документов и проведения конкурсного отбора утверждаются ежегодно и публикуются не позднее чем за 10 календарных дней до начала приёма.',
          kk: 'Құжат қабылдау және конкурстық іріктеу мерзімдері жыл сайын бекітіліп, қабылдау басталуға 10 күнтізбелік күн қалғанда жарияланады.',
          en: 'Intake and selection dates are approved annually and published at least 10 calendar days before the intake starts.',
        },
        source: 'pp573',
      },
      {
        text: {
          ru: 'Научная стажировка: срок рассмотрения и приёма документов либо отказа в приёме — 3 рабочих дня.',
          kk: 'Ғылыми тағылымдама: құжаттарды қарау және қабылдау не қабылдаудан бас тарту мерзімі — 3 жұмыс күні.',
          en: 'Scientific internship: documents are reviewed and accepted or refused within 3 working days.',
        },
        source: 'pp791',
      },
    ],
    mistakes: [
      {
        ru: 'Указать при подаче неактуальную почту: на неё приходят логин и пароль для тестирования, а письма отправляются партиями.',
        kk: 'Тапсыру кезінде өзекті емес поштаны көрсету: тестілеу логині мен құпиясөзі соған келеді.',
        en: 'Giving an outdated email at submission: the testing login and password go there, and letters are sent in batches.',
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
