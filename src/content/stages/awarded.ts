import type { Stage } from '../types'

const PREFERENTIAL = ['master_rural', 'master_engineer', 'master_medical', 'master_civil', 'master_nuclear'] as const

export const AWARDED_STAGES: Stage[] = [
  {
    id: 'contract',
    chapter: 'awarded',
    icon: 'FileSignature',
    kicker: { ru: 'Обязательства', kk: 'Міндеттемелер', en: 'Obligations' },
    title: { ru: 'Договор и обеспечение обязательств', kk: 'Шарт және міндеттемелерді қамтамасыз ету', en: 'Contract and security of obligations' },
    summary: {
      ru: '90 календарных дней на договор и договор залога или гарантии.',
      kk: 'Шартқа және кепіл не кепілдік шартына 90 күнтізбелік күн.',
      en: '90 calendar days to sign the contract and the pledge or guarantee agreement.',
    },
    why: {
      ru: 'Если договор не подписан в срок, рабочий орган начинает процедуру лишения стипендии. Залог недвижимости или гарантия обеспечивают возврат средств, если обязательства не исполнены.',
      kk: 'Шартқа мерзімінде қол қойылмаса, жұмыс органы стипендиядан айыру рәсімін бастайды. Жылжымайтын мүлік кепілі не кепілдік міндеттемелер орындалмаған жағдайда қаражаттың қайтарылуын қамтамасыз етеді.',
      en: 'If the contract is not signed in time, the working body starts the procedure to withdraw the scholarship. The property pledge or guarantee secures repayment if obligations are not met.',
    },
    inShort: {
      what: { ru: 'Договор на обучение и обеспечение обязательств: залог недвижимости или гарантия.', kk: 'Оқу туралы шарт және міндеттемелерді қамтамасыз ету: жылжымайтын мүлік кепілі не кепілдік.', en: 'The study contract and security for your obligations: a property pledge or a guarantee.' },
      you: { ru: 'За 90 календарных дней собрать документы гаранта или собственника залога и подписать договоры.', kk: '90 күнтізбелік күн ішінде кепілгер не кепіл иесінің құжаттарын жинап, шарттарға қол қою.', en: 'Within 90 calendar days, gather the guarantor\'s or property owner\'s documents and sign the agreements.' },
      result: { ru: 'Подписанный договор и оформленное обеспечение обязательств.', kk: 'Қол қойылған шарт және рәсімделген міндеттемелерді қамтамасыз ету.', en: 'A signed contract and the security in place.' },
    },
    checklist: [
      {
        id: 'legal_dept',
        text: {
          ru: 'Обратились в юридический департамент Центра международных программ для заключения договора.',
          kk: 'Шарт жасасу үшін Халықаралық бағдарламалар орталығының заң департаментіне жүгіндіңіз.',
          en: 'You contacted the legal department of the Center for International Programs to sign the contract.',
        },
        link: 'pravila',
      },
      {
        id: 'main_contract',
        text: {
          ru: 'Подписали договор на организацию обучения (или о прохождении стажировки) по типовой форме.',
          kk: 'Оқуды ұйымдастыру (не тағылымдамадан өту) туралы шартты үлгі нысан бойынша қол қойдыңыз.',
          en: 'You signed the study organisation (or internship) contract on the standard form.',
        },
        link: 'dogovory',
      },
      {
        id: 'security',
        text: {
          ru: 'Оформили обеспечение: договор залога недвижимости и (или) договор гарантии.',
          kk: 'Қамтамасыз етуді рәсімдедіңіз: жылжымайтын мүлік кепілі және (немесе) кепілдік шарты.',
          en: 'You arranged the security: a property pledge and/or a guarantee agreement.',
        },
        link: 'pp573',
      },
      {
        id: 'guarantor_docs',
        text: {
          ru: 'Гарант собрал документы: нотариальную копию удостоверения, справку с работы (должность, дата приёма, доходы за 12 месяцев) и сведения о пенсионных отчислениях за тот же период.',
          kk: 'Кепілгер құжат жинады: жеке куәліктің нотариалды көшірмесі, жұмыс орнынан анықтама (лауазымы, қабылданған күні, 12 айлық табысы) және сол кезеңдегі зейнетақы аударымдары туралы мәлімет.',
          en: 'The guarantor gathered the papers: a notarised ID copy, an employment certificate (position, start date, 12 months\' income) and pension records for the same period.',
        },
        link: 'ns_winner',
        // The guarantor's paper list is published for scientific internships only.
        appliesTo: { track: ['science_internship'] },
      },
      {
        id: 'notary_consents',
        text: {
          ru: 'Владелец залоговой недвижимости оформил нотариальные согласия: супруга или заявление о семейном положении, согласие на внесудебную продажу, при необходимости – согласие органов опеки.',
          kk: 'Кепілдегі мүліктің иесі нотариалды келісім рәсімдеді: жұбайының келісімі не отбасылық жағдай туралы өтініш, соттан тыс сатуға келісім, қажет болса – қорғаншылық органының келісімі.',
          en: 'The property owner arranged the notarised consents: the spouse\'s, or a marital-status statement, consent to an out-of-court sale, and guardianship consent where needed.',
        },
        required: false,
        link: 'zamena_zaloga',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'register',
        text: {
          ru: 'Договор залога подписали в Астане и зарегистрировали в ЦОН по месту нахождения недвижимости. Один экземпляр вернули в Центр со справкой о зарегистрированных правах (форма 2).',
          kk: 'Кепіл шартына Астанада қол қойып, мүлік орналасқан жердегі ХҚКО-да тіркедіңіз. Бір данасын тіркелген құқықтар туралы анықтамамен (2-нысан) Орталыққа қайтардыңыз.',
          en: 'The pledge agreement was signed in Astana and registered at the public service centre where the property is. One copy went back to the Center with the title certificate (form 2).',
        },
        required: false,
        link: 'zamena_zaloga',
        appliesTo: { not: { track: ['science_internship'] } },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Договор подписывают в течение 90 календарных дней со дня решения Республиканской комиссии; иначе поднимается вопрос о лишении стипендии.',
          kk: 'Шартқа Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде қол қояды; әйтпесе стипендиядан айыру мәселесі көтеріледі.',
          en: 'The contract is signed within 90 calendar days of the Republican Commission\'s decision; otherwise withdrawal of the scholarship is raised.',
        },
        source: 'pp573',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        text: {
          ru: 'Научная стажировка: договор заключается в течение 90 календарных дней со дня решения Республиканской комиссии. Если мешают болезнь, командировка или другие обстоятельства, до истечения срока можно обратиться в Комиссию – продление до 90 дней даётся один раз.',
          kk: 'Ғылыми тағылымдама: шарт Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде жасалады. Ауру, іссапар не басқа жағдай кедергі болса, мерзім өткенге дейін Комиссияға жүгінуге болады – 90 күнге дейін ұзарту бір рет беріледі.',
          en: 'Scientific internship: the contract is signed within 90 calendar days of the Republican Commission\'s decision. If illness, a work trip or other circumstances get in the way, apply to the Commission before the term runs out – an extension of up to 90 days is granted once.',
        },
        source: 'ns_rules422',
        appliesTo: { track: ['science_internship'] },
      },
    ],
    notes: [
      {
        tone: 'warn',
        appliesTo: { not: { track: ['science_internship'] } },
        text: {
          ru: 'Подписать договор залога или гарантии за себя по доверенности нельзя: стипендиат не может быть доверенным лицом в сделке, которая заключается в его же интересах (пункт 3 статьи 163 Гражданского кодекса).',
          kk: 'Кепіл не кепілдік шартына сенімхатпен өз атыңыздан қол қоюға болмайды: стипендиат өз мүддесінде жасалатын мәмілеге сенім білдірілген адам бола алмайды (Азаматтық кодекстің 163-бабы, 3-тармақ).',
          en: 'You cannot sign the pledge or guarantee by proxy for yourself: an awardee cannot be the attorney in a deal made in their own interest (Civil Code, article 163(3)).',
        },
        source: 'zamena_zaloga',
      },
    ],
    mistakes: [
      {
        ru: 'Собирать документы гаранта в последнюю неделю: справки о доходах и пенсионных отчислениях за 12 месяцев готовят не один день.',
        kk: 'Кепілгер құжаттарын соңғы аптада жинау: 12 айлық табыс пен зейнетақы аударымдары туралы анықтама бір күнде дайын болмайды.',
        en: 'Leaving the guarantor\'s paperwork to the final week: 12-month income and pension statements take more than a day.',
      },
      {
        ru: 'Рассчитывать подписать залог дистанционно: договор залога стороны подписывают только в Астане.',
        kk: 'Кепілге қашықтан қол қоюды жоспарлау: кепіл шартына тараптар тек Астанада қол қояды.',
        en: 'Counting on signing the pledge remotely: the parties sign the pledge agreement only in Astana.',
      },
    ],
    sources: ['pp573', 'pravila', 'ns_winner', 'dogovory', 'zamena_zaloga', 'obrazcy'],
    estimateWeeks: [4, 12],
  },

  {
    id: 'language_courses',
    chapter: 'awarded',
    icon: 'GraduationCap',
    kicker: { ru: 'Только для льготных категорий', kk: 'Тек жеңілдікті санаттарға', en: 'Preferential categories only' },
    title: { ru: 'Языковые курсы и контрольные тесты', kk: 'Тіл курстары және бақылау тесттері', en: 'Language courses and control tests' },
    summary: {
      ru: 'Курсы в Казахстане, промежуточный тест, курсы за рубежом и итоговый тест – за счёт стипендии.',
      kk: 'Қазақстанда курстар, аралық тест, шетелде курстар, қорытынды тест – стипендия есебінен.',
      en: 'Courses in Kazakhstan, an interim test, courses abroad, a final test – funded by the scholarship.',
    },
    why: {
      ru: 'Необходимость курсов указывает Республиканская комиссия в своём решении; их длительность определяют по утверждённой таблице.',
      kk: 'Курстың қажеттігін Республикалық комиссия шешімінде көрсетеді; ұзақтығы бекітілген кесте бойынша анықталады.',
      en: 'The Republican Commission states in its decision that courses are needed; their length follows the approved table.',
    },
    inShort: {
      what: { ru: 'Языковая подготовка за счёт стипендии для льготных категорий магистратуры после присуждения.', kk: 'Магистратураның жеңілдікті санаттарына тағайындалғаннан кейін стипендия есебінен тілдік дайындық.', en: 'Scholarship-funded language training for preferential master\'s categories after the award.' },
      you: { ru: 'Пройти курсы в Казахстане и промежуточный тест, затем курсы за рубежом и итоговый тест.', kk: 'Қазақстанда курстан өтіп, аралық тест тапсыру, содан кейін шетелдегі курс және қорытынды тест.', en: 'Take the courses in Kazakhstan, pass the interim test, then the courses abroad and the final test.' },
      result: { ru: 'Уровень языка для поступления в вуз. Если не сдана и пересдача, обучение прекращается.', kk: 'ЖОО-ға түсуге қажетті тіл деңгейі. Қайта тапсыру да сәтсіз болса, оқу тоқтатылады.', en: 'The language level needed for university admission. If the retake also fails, the studies are ended.' },
    },
    checklist: [
      {
        id: 'kz_courses',
        text: {
          ru: 'Прошли языковые курсы в Казахстане по решению Республиканской комиссии.',
          kk: 'Республикалық комиссия шешімі бойынша Қазақстанда тіл курстарынан өттіңіз.',
          en: 'You completed the language courses in Kazakhstan as decided by the Republican Commission.',
        },
        link: 'pp573',
      },
      {
        id: 'interim',
        text: {
          ru: 'Сдали промежуточный тест на знание иностранного языка.',
          kk: 'Шет тілін білу бойынша аралық тест тапсырдыңыз.',
          en: 'You passed the interim foreign-language test.',
        },
        link: 'pp573',
      },
      {
        id: 'abroad_courses',
        text: {
          ru: 'Направлены на языковые курсы за рубежом.',
          kk: 'Шетелдегі тіл курстарына жіберілдіңіз.',
          en: 'You were sent to language courses abroad.',
        },
        link: 'pp573',
      },
      {
        id: 'final_test',
        text: {
          ru: 'Сдали итоговый тест или получили безусловное приглашение из вуза Списка – тогда тест не нужен.',
          kk: 'Қорытынды тестті тапсырдыңыз не Тізімдегі ЖОО-дан сөзсіз шақыру алдыңыз – онда тест керек емес.',
          en: 'You passed the final test or got an unconditional offer from a listed university – then the test is not needed.',
        },
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Если нужный уровень не набран, пересдать можно один раз в течение 6 месяцев за свой счёт.',
          kk: 'Қажетті деңгейге жетпесеңіз, 6 ай ішінде бір рет өз есебіңізден қайта тапсыруға болады.',
          en: 'If you fall short, you may retake once within 6 months at your own expense.',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Не учесть последствия: если не сдана и пересдача, Республиканская комиссия прекращает и курсы, и обучение, а все средства, потраченные с момента присуждения, подлежат возврату.',
        kk: 'Салдарын ескермеу: қайта тапсыру да сәтсіз болса, Республикалық комиссия курсты да, оқуды да тоқтатады, ал тағайындалғаннан бергі жұмсалған барлық қаражат қайтарылуға тиіс.',
        en: 'Ignoring the consequences: if the retake also fails, the Republican Commission ends both the courses and the studies, and everything spent since the award must be repaid.',
      },
    ],
    sources: ['pp573', 'prikaz318'],
    estimateWeeks: [12, 40],
    appliesTo: { category: [...PREFERENTIAL] },
  },

  {
    id: 'admission_after_courses',
    chapter: 'awarded',
    icon: 'School',
    kicker: { ru: 'Размещение', kk: 'Орналастыру', en: 'Placement' },
    title: { ru: 'Поступление в вуз после курсов', kk: 'Курстардан кейін ЖОО-ға түсу', en: 'University admission after the courses' },
    summary: {
      ru: 'Подача документов в вуз из Списка и безусловное зачисление.',
      kk: 'Тізімдегі ЖОО-ға құжат тапсыру және сөзсіз қабылдану.',
      en: 'Applying to a listed university and obtaining unconditional admission.',
    },
    why: {
      ru: 'Стипендия оплачивает оформление и подачу не более 5 заявок.',
      kk: 'Стипендия 5-тен аспайтын өтінімді рәсімдеу мен беруді төлейді.',
      en: 'The scholarship pays for preparing and filing up to 5 applications.',
    },
    inShort: {
      what: { ru: 'У льготных категорий поступление в вуз идёт после присуждения стипендии и языковых курсов.', kk: 'Жеңілдікті санаттарда ЖОО-ға түсу стипендия тағайындалып, тіл курстарынан кейін болады.', en: 'For preferential categories, university admission comes after the award and the language courses.' },
      you: { ru: 'Подать заявки в вузы из Списка и получить безусловное зачисление.', kk: 'Тізімдегі ЖОО-ларға өтінім беріп, сөзсіз қабылдану.', en: 'Apply to listed universities and get unconditional admission.' },
      result: { ru: 'Приглашение передано куратору; следующий шаг – подготовка к выезду.', kk: 'Шақыру кураторға берілді; келесі қадам – шығуға дайындық.', en: 'The offer is with your curator; the next step is preparing to leave.' },
    },
    checklist: [
      {
        id: 'apply_after',
        text: {
          ru: 'Подали заявки в вузы из Списка (оплачивается не более 5).',
          kk: 'Тізімдегі ЖОО-ларға өтінім бердіңіз (5-еуінен аспайтыны төленеді).',
          en: 'You applied to listed universities (up to 5 are paid for).',
        },
        link: 'pp573',
      },
      {
        id: 'offer_after',
        text: {
          ru: 'Получили документ о безусловном зачислении на академическое обучение.',
          kk: 'Академиялық оқуға сөзсіз қабылдау туралы құжат алдыңыз.',
          en: 'You received the unconditional admission document.',
        },
        link: 'pravila',
      },
      {
        id: 'curator_after',
        text: {
          ru: 'Передали приглашение своему куратору в Центре международных программ.',
          kk: 'Шақыруды Халықаралық бағдарламалар орталығындағы кураторыңызға бердіңіз.',
          en: 'You passed the offer to your curator at the Center for International Programs.',
        },
        link: 'stipendiat_master',
      },
    ],
    mistakes: [
      {
        ru: 'Забыть, что программа должна относиться к перечню приоритетных специальностей: на этом шаге это проверяют снова.',
        kk: 'Бағдарлама басым мамандықтар тізбесіне кіруі керегін ұмыту: бұл қадамда оны қайта тексереді.',
        en: 'Forgetting that the programme must be on the priority-specialty list: it is checked again at this step.',
      },
    ],
    sources: ['pp573', 'pravila', 'stipendiat_master'],
    estimateWeeks: [8, 24],
    appliesTo: { category: [...PREFERENTIAL] },
  },

  {
    id: 'departure',
    chapter: 'awarded',
    icon: 'PlaneTakeoff',
    kicker: { ru: 'Сборы', kk: 'Дайындық', en: 'Getting ready' },
    title: { ru: 'Виза и подготовка к выезду', kk: 'Виза және шығуға дайындық', en: 'Visa and departure preparation' },
    summary: {
      ru: 'Финансовая гарантия, визовые документы, банковская карта, виза, авиабилет.',
      kk: 'Қаржылық кепілдік, виза құжаттары, банк картасы, виза, авиабилет.',
      en: 'Financial guarantee letter, visa documents, bank card, visa, flight ticket.',
    },
    why: {
      ru: 'Порядок: письмо Центра о финансовой гарантии (нужно посольству и вузу), визовые документы от вуза, виза (оформляете сами), заявление на авиабилет.',
      kk: 'Реті: Орталықтың қаржылық кепілдік хаты (елшілік пен ЖОО-ға керек), ЖОО-дан виза құжаттары, виза (өзіңіз рәсімдейсіз), авиабилетке өтініш.',
      en: 'The order: the Center\'s financial guarantee letter (needed by the embassy and the university), the visa papers from the university, the visa (you arrange it yourself), the ticket request.',
    },
    inShort: {
      what: { ru: 'Подготовка к отъезду: документы, виза, банковская карта и билет.', kk: 'Кетуге дайындық: құжаттар, виза, банк картасы және билет.', en: 'Preparing to leave: documents, visa, bank card and ticket.' },
      you: { ru: 'Получить письмо о финансовой гарантии и визовые документы от вуза, оформить визу и банковскую карту.', kk: 'Қаржылық кепілдік хаты мен ЖОО-дан виза құжаттарын алып, виза мен банк картасын рәсімдеу.', en: 'Get the financial guarantee letter and the visa papers from the university, then the visa and a bank card.' },
      result: { ru: 'Виза, банковская карта и авиабилет.', kk: 'Виза, банк картасы және авиабилет.', en: 'A visa, a bank card and a ticket.' },
    },
    checklist: [
      {
        id: 'curator',
        text: {
          ru: 'После подписания договора связались с куратором: Управление Америки, СНГ и Океании либо Управление Европы и Азии.',
          kk: 'Шартқа қол қойған соң кураторыңызбен байланыстыңыз: Америка, ТМД және Океания басқармасы не Еуропа мен Азия басқармасы.',
          en: 'After signing the contract you got in touch with your curator: the Americas, CIS and Oceania department, or the Europe and Asia one.',
        },
        link: 'stipendiat_master',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'guarantee_letter',
        text: {
          ru: 'Получили по заявлению письмо о финансовой гарантии и отправили скан в вуз или принимающую организацию.',
          kk: 'Өтініш бойынша қаржылық кепілдік хатын алып, сканын ЖОО-ға не қабылдаушы ұйымға жібердіңіз.',
          en: 'You got the financial guarantee letter on request and sent a scan to the university or host organisation.',
        },
        link: 'stipendiat_internship',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'visa_docs',
        text: {
          ru: 'Получили от вуза визовые документы.',
          kk: 'ЖОО-дан виза құжаттарын алдыңыз.',
          en: 'You received the visa documents from the university.',
        },
        link: 'stipendiat_master',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
      {
        id: 'card',
        text: {
          ru: 'За месяц до отъезда оформили банковскую карту и отправили данные карт-счёта в Управление финансового обеспечения.',
          kk: 'Кетуге бір ай қалғанда банк картасын рәсімдеп, карт-шот деректерін қаржы қамтамасыз ету басқармасына жібердіңіз.',
          en: 'A month before leaving you opened a bank card and sent the account details to the finance department.',
        },
        link: 'finance',
      },
      {
        id: 'visa',
        text: {
          ru: 'Самостоятельно оформили визу (консульский сбор оплачивается по направлениям расходования стипендии).',
          kk: 'Визаны өз бетіңізше рәсімдедіңіз (консулдық алым стипендия есебінен төленеді).',
          en: 'You obtained the visa yourself (the consular fee is covered by the scholarship spending directions).',
        },
        link: 'viza',
      },
      {
        id: 'visa_copy',
        text: {
          ru: 'Отправили скан визы куратору.',
          kk: 'Виза сканын кураторға жібердіңіз.',
          en: 'You sent a scan of the visa to your curator.',
        },
        link: 'stipendiat_master',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'ticket',
        text: {
          ru: 'Направили куратору заявление на приобретение авиабилета.',
          kk: 'Кураторға авиабилет сатып алуға өтініш жібердіңіз.',
          en: 'You sent the flight-ticket request to your curator.',
        },
        link: 'obrazcy',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        id: 'ns_advance',
        text: {
          ru: 'Подали заявление на аванс и сведения по карт-счёту – формы на странице о финансировании научных стажировок.',
          kk: 'Аванс алуға өтініш пен карт-шот мәліметтерін тапсырдыңыз – нысандар ғылыми тағылымдаманы қаржыландыру бетінде.',
          en: 'You filed the advance request and your card-account details – the forms are on the scientific-internship funding page.',
        },
        link: 'ns_finance',
        appliesTo: { track: ['science_internship'] },
      },
    ],
    mistakes: [
      {
        ru: 'Откладывать запись в посольство: в некоторых странах визу рассматривают месяцами, и Центр на эти сроки не влияет.',
        kk: 'Елшілікке жазылуды кейінге қалдыру: кейбір елдерде визаны айлап қарайды, бұл мерзімге Орталық әсер етпейді.',
        en: 'Delaying the embassy appointment: in some countries visas take months, and the Center has no say over that.',
      },
      {
        ru: 'Открывать карту в последний момент: без сведений по карт-счёту авансирование задержится.',
        kk: 'Картаны соңғы сәтте ашу: карт-шот мәліметтерінсіз аванс кешігеді.',
        en: 'Opening the bank card at the last moment: without the card-account details the advance is delayed.',
      },
    ],
    sources: ['stipendiat_master', 'stipendiat_internship', 'viza', 'guide', 'finance', 'obrazcy'],
    estimateWeeks: [4, 16],
  },
]
