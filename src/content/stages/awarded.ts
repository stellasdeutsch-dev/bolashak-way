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
      ru: '90 календарных дней на договор обучения и договор залога или гарантии (для научной стажировки — 60 дней).',
      kk: 'Оқу шарты мен кепіл не кепілдік шартына 90 күнтізбелік күн (ғылыми тағылымдамаға — 60 күн).',
      en: '90 calendar days to sign the study contract and the pledge or guarantee agreement (60 days for scientific internships).',
    },
    why: {
      ru: 'Самый жёсткий срок за всю процедуру. Не подписали договор вовремя — рабочий орган начинает процедуру лишения стипендии. Залог недвижимости или гарантия нужны на случай, если обязательства не выполнят: так государство возвращает потраченное.',
      kk: 'Бүкіл рәсімдегі ең қатаң мерзім. Шартқа уақытында қол қоймасаңыз — жұмыс органы стипендиядан айыру рәсімін бастайды. Кепіл не кепілдік міндеттеме орындалмаған жағдайға керек: мемлекет жұмсалғанын осылай қайтарады.',
      en: 'The tightest deadline in the whole process. Miss it and the working body starts withdrawing the scholarship. The property pledge or guarantee exists in case obligations are not met: that is how the state gets its money back.',
    },
    checklist: [
      {
        id: 'legal_dept',
        text: {
          ru: 'Обратились в юридический департамент Центра международных программ, чтобы заключить договор.',
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
          ru: 'Гарант собрал документы: нотариальную копию удостоверения, справку с работы с должностью, датой приёма и доходами за 12 месяцев, а также сведения о пенсионных отчислениях за тот же период.',
          kk: 'Кепілгер құжат жинады: жеке куәліктің нотариалды көшірмесі, лауазымы, жұмысқа қабылданған күні және 12 айдағы табысы көрсетілген анықтама, сол кезеңдегі зейнетақы аударымдары.',
          en: 'The guarantor gathered the papers: a notarised ID copy, an employment certificate with position, start date and income for 12 months, and pension records for the same period.',
        },
        link: 'ns_winner',
      },
      {
        id: 'notary_consents',
        text: {
          ru: 'Владелец залоговой недвижимости оформил нотариальные согласия: супруга или заявление о семейном положении, согласие на внесудебную продажу, при необходимости — согласие органов опеки.',
          kk: 'Кепілдегі мүліктің иесі нотариалды келісім рәсімдеді: жұбайының келісімі не отбасылық жағдай туралы өтініш, соттан тыс сатуға келісім, қажет болса — қорғаншылық органының келісімі.',
          en: 'The property owner arranged the notarised consents: the spouse\'s, or a marital-status statement, consent to an out-of-court sale, and guardianship consent where needed.',
        },
        required: false,
        link: 'zamena_zaloga',
      },
      {
        id: 'register',
        text: {
          ru: 'Договор залога подписали в Астане и зарегистрировали в ЦОН по месту, где находится недвижимость. Один экземпляр вернули в Центр вместе со справкой о зарегистрированных правах (форма 2).',
          kk: 'Кепіл шартына Астанада қол қойып, мүлік тұрған жердегі ХҚКО-да тіркедіңіз. Бір данасын тіркелген құқықтар туралы анықтамамен (2-нысан) бірге Орталыққа қайтардыңыз.',
          en: 'The pledge agreement was signed in Astana and registered at the public service centre where the property is. One copy went back to the Center with the title certificate (form 2).',
        },
        required: false,
        link: 'zamena_zaloga',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Договор подписывают в течение 90 календарных дней со дня решения Республиканской комиссии. Не успели — поднимают вопрос о лишении стипендии.',
          kk: 'Шартқа Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде қол қояды. Үлгермесеңіз — стипендиядан айыру мәселесі көтеріледі.',
          en: 'The contract is signed within 90 calendar days of the Republican Commission\'s decision. Miss it and the question of withdrawing the scholarship is raised.',
        },
        source: 'pp573',
      },
      {
        text: {
          ru: 'Научная стажировка: договор заключается в течение 60 календарных дней со дня решения Республиканской комиссии.',
          kk: 'Ғылыми тағылымдама: шарт комиссия шешімінен бастап 60 күнтізбелік күн ішінде жасалады.',
          en: 'Scientific internship: the contract is signed within 60 calendar days of the commission decision.',
        },
        source: 'ns_winner',
      },
    ],
    notes: [
      {
        tone: 'warn',
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
        ru: 'Начать собирать документы гаранта в последнюю неделю. Справки о доходах и пенсионных отчислениях за 12 месяцев готовятся не за день.',
        kk: 'Кепілгер құжаттарын соңғы аптада жинай бастау. 12 айлық табыс пен зейнетақы аударымдары туралы анықтама бір күнде дайын болмайды.',
        en: 'Starting the guarantor\'s paperwork in the final week. Twelve-month income and pension statements are not ready in a day.',
      },
      {
        ru: 'Рассчитывать подписать залог дистанционно. Договор залога стороны подписывают только в Астане.',
        kk: 'Кепілге қашықтан қол қоюды жоспарлау. Кепіл шартына тараптар тек Астанада қол қояды.',
        en: 'Counting on signing the pledge remotely. The parties sign the pledge agreement only in Astana.',
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
      ru: 'Курсы в Казахстане, промежуточный тест, курсы за рубежом, итоговый тест — за счёт стипендии.',
      kk: 'Қазақстанда курстар, аралық тест, шетелде курстар, қорытынды тест — стипендия есебінен.',
      en: 'Courses in Kazakhstan, an interim test, courses abroad, a final test — funded by the scholarship.',
    },
    why: {
      ru: 'Льготные категории магистратуры добирают язык уже после присуждения. О том, что курсы нужны, Республиканская комиссия пишет в своём решении, а их длительность берут из утверждённой таблицы.',
      kk: 'Магистратураның жеңілдікті санаттары тілді тағайындалғаннан кейін толықтырады. Курс қажет екенін Республикалық комиссия шешімінде жазады, ұзақтығын бекітілген кестеден алады.',
      en: 'Preferential master\'s categories top up their language after the award. The Republican Commission states in its decision that courses are needed, and their length comes from the approved table.',
    },
    checklist: [
      {
        id: 'kz_courses',
        text: {
          ru: 'Прошли языковые курсы в Казахстане по решению Республиканской комиссии.',
          kk: 'Республикалық комиссия шешімі бойынша Қазақстанда тіл курстарынан өттіңіз.',
          en: 'You completed the language courses in Kazakhstan as decided by the commission.',
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
          ru: 'Сдали итоговый тест — либо получили безусловное приглашение из вуза Списка, и тогда тест уже не нужен.',
          kk: 'Қорытынды тестті тапсырдыңыз — не Тізімдегі ЖОО-дан сөзсіз шақыру алдыңыз, ондай жағдайда тест керек емес.',
          en: 'You passed the final test — or got an unconditional offer from a listed university, in which case the test is no longer needed.',
        },
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Если нужный уровень не набран, пересдать можно один раз в течение 6 месяцев и уже за свой счёт.',
          kk: 'Қажетті деңгейге жетпесеңіз, 6 ай ішінде бір рет және өз есебіңізден қайта тапсыруға болады.',
          en: 'If you fall short, you get one retake within 6 months, and you pay for it yourself.',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Недооценить последствия. Если и пересдача не удалась, Республиканская комиссия закрывает и курсы, и обучение, а всё потраченное с момента присуждения придётся вернуть.',
        kk: 'Салдарын бағаламау. Қайта тапсыру да сәтсіз болса, Республикалық комиссия курсты да, оқуды да жабады, ал тағайындалғаннан бергі жұмсалғанның бәрін қайтаруға тура келеді.',
        en: 'Underestimating what is at stake. If the retake also fails, the commission ends both the courses and the studies, and everything spent since the award has to be repaid.',
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
      ru: 'Теперь подаёте документы в вуз из Списка и получаете безусловное зачисление.',
      kk: 'Енді тізімдегі ЖОО-ға құжат тапсырып, сөзсіз қабылдауды аласыз.',
      en: 'Now you apply to a listed university and obtain unconditional admission.',
    },
    why: {
      ru: 'У льготных категорий этот шаг идёт уже после конкурса и языковой подготовки. Стипендия оплачивает оформление и подачу не более 5 заявок.',
      kk: 'Жеңілдікті санаттарда бұл қадам конкурс пен тілдік дайындықтан кейін жүреді. Стипендия 5-тен аспайтын өтінімді рәсімдеп, беруді төлейді.',
      en: 'For preferential categories this step comes after the competition and the language training. The scholarship pays for preparing and filing up to 5 applications.',
    },
    checklist: [
      {
        id: 'apply_after',
        text: {
          ru: 'Подали заявки в вузы из Списка — оплачивается до 5 штук.',
          kk: 'Тізімдегі ЖОО-ларға өтінім бердіңіз — 5-еуіне дейін төленеді.',
          en: 'You applied to universities from the list — up to 5 are covered.',
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
        ru: 'Забыть, что программа всё ещё должна попадать в перечень приоритетных специальностей. На этом шаге это проверяют снова.',
        kk: 'Бағдарлама әлі де басым мамандықтар тізбесіне кіруі керегін ұмыту. Бұл қадамда оны қайта тексереді.',
        en: 'Forgetting that the programme still has to be on the priority-specialty list. It is checked again at this step.',
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
      ru: 'Порядок здесь важен. Сначала письмо о финансовой гарантии от Центра — его ждут и посольство, и вуз. Потом визовые документы от вуза. Потом виза, её вы оформляете сами. И только в конце — заявление на авиабилет.',
      kk: 'Мұнда рет маңызды. Алдымен Орталықтан қаржылық кепілдік хаты — оны елшілік те, ЖОО да күтеді. Содан кейін ЖОО-дан виза құжаттары. Сосын виза, оны өзіңіз рәсімдейсіз. Ең соңында — авиабилетке өтініш.',
      en: 'Order matters here. First the financial guarantee letter from the Center — both the embassy and the university want it. Then the visa papers from the university. Then the visa, which you arrange yourself. And only at the end, the ticket request.',
    },
    checklist: [
      {
        id: 'curator',
        text: {
          ru: 'После подписания договора связались со своим куратором: Управление Америки, СНГ и Океании либо Управление Европы и Азии.',
          kk: 'Шартқа қол қойған соң кураторыңызбен байланыстыңыз: Америка, ТМД және Океания басқармасы не Еуропа мен Азия басқармасы.',
          en: 'After signing the contract you got in touch with your curator: the Americas, CIS and Oceania department, or the Europe and Asia one.',
        },
        link: 'stipendiat_master',
      },
      {
        id: 'guarantee_letter',
        text: {
          ru: 'Написали заявление, получили письмо о финансовой гарантии и отправили скан в вуз или принимающую организацию.',
          kk: 'Өтініш жазып, қаржылық кепілдік хатын алдыңыз және сканын ЖОО-ға не қабылдаушы ұйымға жібердіңіз.',
          en: 'You filed the request, got the financial guarantee letter and sent a scan to the university or host organisation.',
        },
        link: 'stipendiat_internship',
      },
      {
        id: 'visa_docs',
        text: {
          ru: 'Получили от вуза визовые документы.',
          kk: 'ЖОО-дан виза құжаттарын алдыңыз.',
          en: 'You received the visa documents from the university.',
        },
        link: 'stipendiat_master',
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
      },
      {
        id: 'ticket',
        text: {
          ru: 'Направили куратору заявление на приобретение авиабилета.',
          kk: 'Кураторға авиабилет сатып алуға өтініш жібердіңіз.',
          en: 'You sent the flight-ticket request to your curator.',
        },
        link: 'obrazcy',
      },
    ],
    mistakes: [
      {
        ru: 'Откладывать запись в посольство: сроки рассмотрения виз в некоторых странах занимают месяцы и не зависят от Центра.',
        kk: 'Елшілікке жазылуды кейінге қалдыру: кейбір елдерде виза мерзімі айларға созылады.',
        en: 'Delaying the embassy appointment: visa processing in some countries takes months and is outside the Center\'s control.',
      },
      {
        ru: 'Открывать карту в последний момент: сведения по карт-счёту нужны финансовой службе заранее, иначе задержится авансирование.',
        kk: 'Картаны соңғы сәтте ашу: карт-шот мәліметтері қаржы қызметіне алдын ала қажет.',
        en: 'Opening the bank card at the last moment: the finance department needs the card details in advance or the advance payment is delayed.',
      },
    ],
    sources: ['stipendiat_master', 'stipendiat_internship', 'viza', 'guide', 'finance', 'obrazcy'],
    estimateWeeks: [4, 16],
  },
]
