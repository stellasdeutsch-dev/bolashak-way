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
      ru: 'Это самый жёсткий срок всей процедуры: если договор не заключён вовремя, рабочий орган инициирует лишение стипендии. Договор залога недвижимости или гарантии — способ обеспечения возврата расходов, если обязательства не будут исполнены.',
      kk: 'Бұл — бүкіл рәсімнің ең қатаң мерзімі: шарт уақытында жасалмаса, жұмыс органы стипендиядан айыруды бастайды.',
      en: 'This is the hardest deadline in the whole process: if the contract is not signed in time, the working body initiates withdrawal of the scholarship.',
    },
    checklist: [
      {
        id: 'legal_dept',
        text: {
          ru: 'Обратились в Департамент юридической службы АО «Центр международных программ» для заключения договора.',
          kk: '«Халықаралық бағдарламалар орталығы» АҚ заң қызметі департаментіне шарт жасасуға жүгіндіңіз.',
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
          ru: 'Оформили обеспечение обязательств: договор залога недвижимости и (или) договор гарантии.',
          kk: 'Міндеттемелерді қамтамасыз етуді рәсімдедіңіз: жылжымайтын мүлік кепілі және (немесе) кепілдік шарты.',
          en: 'You arranged the security: a real-estate pledge agreement and/or a guarantee agreement.',
        },
        link: 'pp573',
      },
      {
        id: 'guarantor_docs',
        text: {
          ru: 'Гарант собрал документы: нотариально заверенная копия удостоверения, справка с места работы с должностью, датой приёма и доходами за последние 12 месяцев, документы о пенсионных отчислениях за тот же период.',
          kk: 'Кепілгер құжаттарды жинады: жеке куәліктің нотариалды көшірмесі, лауазымы, қабылданған күні және соңғы 12 айдағы табысы көрсетілген анықтама, зейнетақы аударымдары.',
          en: 'The guarantor collected documents: a notarised ID copy, an employment certificate with position, hire date and income for the last 12 months, and pension-contribution records for the same period.',
        },
        link: 'ns_winner',
      },
      {
        id: 'notary_consents',
        text: {
          ru: 'Собственник залоговой недвижимости оформил нотариальные согласия: супруга (или заявление о семейном положении), согласие на внесудебную реализацию, при необходимости — согласие органов опеки.',
          kk: 'Кепіл мүлкінің иесі нотариалды келісімдерді рәсімдеді: жұбайының келісімі не отбасылық жағдай туралы өтініш, соттан тыс өткізуге келісім.',
          en: 'The property owner arranged notarised consents: spouse consent (or a marital-status statement), consent to out-of-court sale, and guardianship consent if needed.',
        },
        required: false,
        link: 'zamena_zaloga',
      },
      {
        id: 'register',
        text: {
          ru: 'Договор залога подписан в Астане и зарегистрирован в ЦОН по месту нахождения недвижимости; один экземпляр возвращён в Центр со справкой о зарегистрированных правах (форма 2).',
          kk: 'Кепіл шарты Астанада қол қойылып, мүлік орналасқан жердегі ХҚКО-да тіркелді; бір данасы Орталыққа қайтарылды.',
          en: 'The pledge agreement is signed in Astana and registered at the public service centre where the property is located; one copy is returned to the Center with the title certificate (form 2).',
        },
        required: false,
        link: 'zamena_zaloga',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Победитель конкурсного отбора заключает договор в течение 90 календарных дней со дня решения Республиканской комиссии. При незаключении в срок инициируется вопрос о лишении стипендии.',
          kk: 'Жеңімпаз Республикалық комиссия шешімінен бастап 90 күнтізбелік күн ішінде шарт жасасады. Мерзімінде жасалмаса, стипендиядан айыру мәселесі қозғалады.',
          en: 'The winner signs the contract within 90 calendar days of the Republican Commission decision. Failing that, withdrawal of the scholarship is initiated.',
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
          ru: 'Стипендиат не может выступать доверенным лицом при заключении договоров залога или гарантии, заключаемых в его интересах (пункт 3 статьи 163 Гражданского кодекса РК).',
          kk: 'Стипендиат өз мүддесінде жасалатын кепіл не кепілдік шарттарында сенім білдірілген адам бола алмайды (ҚР АК 163-бабының 3-тармағы).',
          en: 'An awardee cannot act as attorney-in-fact for pledge or guarantee agreements concluded in their own interest (Art. 163(3) of the Civil Code).',
        },
        source: 'zamena_zaloga',
      },
    ],
    mistakes: [
      {
        ru: 'Начинать сбор документов гаранта в последнюю неделю: справки о доходах и пенсионных отчислениях за 12 месяцев готовятся не мгновенно.',
        kk: 'Кепілгер құжаттарын соңғы аптада жинай бастау: 12 айлық анықтамалар бірден дайындалмайды.',
        en: 'Starting the guarantor paperwork in the last week: 12-month income and pension statements take time.',
      },
      {
        ru: 'Планировать подписание залога дистанционно: договор залога подписывается сторонами только в Астане.',
        kk: 'Кепілге қашықтан қол қоюды жоспарлау: кепіл шарты тек Астанада қол қойылады.',
        en: 'Planning to sign the pledge remotely: the pledge agreement is signed only in Astana.',
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
      ru: 'Для льготных категорий магистратуры язык добирается уже после присуждения. Республиканская комиссия указывает необходимость курсов в своём решении, а сроки определяются таблицей продолжительности языковых курсов.',
      kk: 'Магистратураның жеңілдікті санаттары үшін тіл тағайындалғаннан кейін толықтырылады. Комиссия шешімінде курс қажеттілігі көрсетіледі.',
      en: 'For preferential master\'s categories the language is topped up after the award. The commission states the need for courses in its decision, with durations set by the approved table.',
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
          ru: 'Сдали промежуточный контрольный тест на определение уровня иностранного языка.',
          kk: 'Шет тілі деңгейін анықтайтын аралық бақылау тестін тапсырдыңыз.',
          en: 'You passed the interim control test on your foreign-language level.',
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
          ru: 'Сдали итоговый контрольный тест — либо получили безусловное зачисление в вуз из Списка и освобождены от него.',
          kk: 'Қорытынды бақылау тестін тапсырдыңыз — не тізімдегі ЖОО-ға сөзсіз қабылданып, одан босатылдыңыз.',
          en: 'You passed the final control test — or received an unconditional offer from a listed university and were exempted.',
        },
        link: 'pp573',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Если необходимый уровень не достигнут, предоставляется однократная возможность пересдачи теста в течение 6 месяцев со дня непрохождения — за счёт собственных средств.',
          kk: 'Қажетті деңгейге жетпесе, тапсырмаған күннен бастап 6 ай ішінде өз есебінен бір рет қайта тапсыру мүмкіндігі беріледі.',
          en: 'If the required level is not reached, one retake is allowed within 6 months of the failure, at your own expense.',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Недооценить последствия: при непрохождении пересдачи Республиканская комиссия лишает права на дальнейшие курсы и обучение, а расходы со дня присуждения подлежат возмещению.',
        kk: 'Салдарын бағаламау: қайта тапсырудан өтпесе, комиссия одан әрі оқу құқығынан айырады, шығыстар өтеледі.',
        en: 'Underestimating the stakes: failing the retake means the commission withdraws further courses and study, and costs since the award must be repaid.',
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
      ru: 'Для льготных категорий этот шаг идёт после конкурса и языковой подготовки. По направлениям расходования стипендия оплачивает оформление и подачу не более 5 аппликационных форм.',
      kk: 'Жеңілдікті санаттар үшін бұл қадам конкурс пен тілдік дайындықтан кейін жүреді. Стипендия 5-тен аспайтын өтінім нысанын төлейді.',
      en: 'For preferential categories this step follows the competition and language training. The scholarship pays for preparing and filing up to 5 application forms.',
    },
    checklist: [
      {
        id: 'apply_after',
        text: {
          ru: 'Подали аппликационные формы в вузы из Списка (оплачивается до 5 форм).',
          kk: 'Тізімдегі ЖОО-ларға өтінім нысандарын тапсырдыңыз (5 нысанға дейін төленеді).',
          en: 'You submitted applications to listed universities (up to 5 forms are covered).',
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
          ru: 'Передали приглашение куратору обучения в Центре международных программ.',
          kk: 'Шақыруды Халықаралық бағдарламалар орталығындағы куратордың атына жібердіңіз.',
          en: 'You forwarded the offer to your study curator at the Center for International Programs.',
        },
        link: 'stipendiat_master',
      },
    ],
    mistakes: [
      {
        ru: 'Забыть про соответствие программы перечню приоритетных специальностей: оно проверяется и на этом этапе.',
        kk: 'Бағдарламаның басым мамандықтар тізбесіне сәйкестігін ұмыту: ол осы кезеңде де тексеріледі.',
        en: 'Forgetting the programme must still match the priority-specialty list: it is checked at this stage too.',
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
      ru: 'Порядок здесь важен: сначала письмо о финансовой гарантии от Центра — оно нужно и посольству, и вузу; затем визовые документы от вуза; затем виза, которую вы оформляете самостоятельно; и только потом заявление на авиабилет.',
      kk: 'Мұнда рет маңызды: алдымен Орталықтан қаржылық кепілдік хаты, содан кейін ЖОО-дан виза құжаттары, содан соң виза, ең соңында авиабилетке өтініш.',
      en: 'Order matters here: first the financial guarantee letter from the Center (needed by both the embassy and the university), then the university\'s visa documents, then the visa you obtain yourself, and only then the ticket request.',
    },
    checklist: [
      {
        id: 'curator',
        text: {
          ru: 'После заключения договора связались со своим куратором (Управление Америки, СНГ и Океании либо Управление Европы и Азии).',
          kk: 'Шарт жасалғаннан кейін кураторыңызбен байланыстыңыз.',
          en: 'After signing the contract you contacted your curator (Americas/CIS/Oceania or Europe/Asia department).',
        },
        link: 'stipendiat_master',
      },
      {
        id: 'guarantee_letter',
        text: {
          ru: 'Написали заявление и получили письмо о финансовой гарантии, отправили его скан в вуз или принимающую организацию.',
          kk: 'Өтініш жазып, қаржылық кепілдік хатын алдыңыз, сканын ЖОО-ға не қабылдаушы ұйымға жібердіңіз.',
          en: 'You requested and received the financial guarantee letter and sent a scan to the university or host organisation.',
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
          ru: 'За месяц до выезда оформили платёжную банковскую карту и направили сведения по карт-счёту в Управление финансового обеспечения.',
          kk: 'Шығуға бір ай қалғанда төлем картасын рәсімдеп, карт-шот мәліметтерін қаржы қамтамасыз ету басқармасына жібердіңіз.',
          en: 'A month before departure you opened a payment card and sent the card-account details to the finance department.',
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
