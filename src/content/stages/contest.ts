import type { Stage } from '../types'

export const CONTEST_STAGES: Stage[] = [
  {
    id: 'testing',
    chapter: 'contest',
    icon: 'MonitorCheck',
    kicker: { ru: 'I тур', kk: 'I тур', en: 'Round I' },
    title: { ru: 'Комплексное тестирование', kk: 'Кешенді тестілеу', en: 'Comprehensive testing' },
    summary: {
      ru: 'Числовой и вербальный тесты и личностный опросник. Отборочный тур с пороговым баллом.',
      kk: 'Сандық және вербалды тесттер, тұлғалық сауалнама. Шекті балы бар іріктеу туры.',
      en: 'Numerical and verbal tests plus a personality questionnaire. A qualifying round with a cut-off score.',
    },
    why: {
      ru: 'Без порогового балла во второй тур не допускают; пересдачи нет. Компьютер и интернет проверьте заранее.',
      kk: 'Шекті балсыз екінші турға жібермейді; қайта тапсыру жоқ. Компьютер мен интернетті алдын ала тексеріңіз.',
      en: 'Without the cut-off score you are not admitted to round two; there is no retake. Check your computer and connection in advance.',
    },
    inShort: {
      what: { ru: 'Первый тур конкурса – компьютерное тестирование под наблюдением проктора.', kk: 'Конкурстың бірінші туры – проктор бақылайтын компьютерлік тестілеу.', en: 'Round one of the competition – proctored computer testing.' },
      you: { ru: 'Подготовить технику, прорешать образцы и пройти все три компонента до конца.', kk: 'Техниканы дайындап, үлгілерді шығарып, үш компоненттің бәрін соңына дейін өту.', en: 'Prepare your equipment, work through the samples and complete all three parts.' },
      result: { ru: 'Балл в личном кабинете, от которого зависит допуск ко второму туру.', kk: 'Екінші турға жіберуді шешетін жеке кабинеттегі балл.', en: 'A score in your account that decides admission to round two.' },
    },
    checklist: [
      {
        id: 'credentials',
        text: {
          ru: 'Получили на почту логин и пароль для тестирования (в том числе проверили «Спам»).',
          kk: 'Тестілеуге арналған логин мен құпиясөзді поштаға алдыңыз («Спам» қалтасын да тексердіңіз).',
          en: 'You received the testing login and password by email (spam folder checked too).',
        },
        link: 'chat-faq',
      },
      {
        id: 'samples',
        text: {
          ru: 'Прорешали образцы числового и вербального тестов и личностного опросника.',
          kk: 'Сандық, вербалды тест пен тұлғалық сауалнама үлгілерін шығардыңыз.',
          en: 'You worked through the numerical, verbal and personality samples.',
        },
        link: 'test_numeric',
      },
      {
        id: 'tech',
        text: {
          ru: 'Подготовили технику: компьютер (не телефон), свежий Chrome, камера и микрофон, стабильный интернет без VPN, один монитор, программы записи экрана закрыты.',
          kk: 'Техниканы дайындадыңыз: компьютер (телефон емес), жаңа Chrome, камера мен микрофон, VPN-сіз тұрақты интернет, бір монитор, экран жазатын бағдарламалар жабық.',
          en: 'Your setup is ready: a computer (not a phone), an up-to-date Chrome, camera and microphone, a stable connection without VPN, one monitor, screen recorders closed.',
        },
        link: 'chat-faq',
      },
      {
        id: 'rules',
        text: {
          ru: 'Прочитали правила: обычный калькулятор, ручка и бумага разрешены; калькулятор на телефоне и других устройствах связи – нет.',
          kk: 'Ережелерді оқыдыңыз: қарапайым калькулятор, қалам мен қағазға рұқсат; телефондағы және басқа байланыс құралдарындағы калькуляторға – жоқ.',
          en: 'You read the rules: a plain calculator, pen and paper are allowed; a calculator on a phone or other communication device is not.',
        },
        link: 'pravila',
      },
      {
        id: 'passed',
        text: {
          ru: 'Прошли все три компонента тестирования до конца.',
          kk: 'Тестілеудің үш компонентін де соңына дейін өттіңіз.',
          en: 'You completed all three testing components to the end.',
        },
      },
      {
        id: 'result',
        text: {
          ru: 'Посмотрели результаты в личном кабинете.',
          kk: 'Нәтижені жеке кабинеттен көрдіңіз.',
          en: 'You checked the results in your account.',
        },
        link: 'cabinet',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'О месте и времени первого и второго туров сообщают на портале, по почте и телефону не позднее чем за 10 календарных дней.',
          kk: 'Бірінші және екінші тур орны мен уақытын порталда, пошта мен телефон арқылы кемінде 10 күнтізбелік күн бұрын хабарлайды.',
          en: 'You are told the time and place of rounds one and two on the portal, and by email and phone, at least 10 calendar days ahead.',
        },
        source: 'pp573',
        appliesTo: { not: { track: ['science_internship'] } },
      },
      {
        text: {
          ru: 'О месте, дате и времени первого и второго туров сообщают по электронной почте или телефону не позднее чем за 10 календарных дней.',
          kk: 'Бірінші және екінші турдың орны, күні мен уақытын электрондық пошта не телефон арқылы кемінде 10 күнтізбелік күн бұрын хабарлайды.',
          en: 'You are told the place, date and time of rounds one and two by email or phone at least 10 calendar days ahead.',
        },
        source: 'ns_rules422',
        appliesTo: { track: ['science_internship'] },
      },
    ],
    mistakes: [
      {
        ru: 'Закрыть окно или вкладку во время теста: результаты тура аннулируются автоматически. Начатый тест нужно довести до конца.',
        kk: 'Тест кезінде терезені не қойындыны жабу: тур нәтижесі автоматты түрде жойылады. Басталған тестті соңына дейін өту керек.',
        en: 'Closing the window or tab during the test: the round\'s results are voided automatically. A test you start must be finished.',
      },
      {
        ru: 'Сдавать через общий роутер провайдера. При ошибке «сервер не отвечает» обычно помогает мобильный интернет LTE или другая сеть.',
        kk: 'Провайдердің ортақ роутері арқылы тапсыру. «Сервер жауап бермейді» қатесінде көбіне мобильді LTE не басқа желі көмектеседі.',
        en: 'Sitting the test through a shared provider router. For a "server not responding" error, mobile LTE or another network usually helps.',
      },
      {
        ru: 'Сообщить о сбое через несколько дней. Пишите на info@bolashak.gov.kz в тот же день: ФИО, тип теста, время сбоя и скриншот с видимым временем.',
        kk: 'Ақау туралы бірнеше күннен кейін хабарлау. info@bolashak.gov.kz-ке сол күні жазыңыз: аты-жөні, тест түрі, ақау уақыты және уақыты көрінетін скриншот.',
        en: 'Reporting a failure days later. Write to info@bolashak.gov.kz the same day: your name, the test type, the time of the failure and a screenshot showing the time.',
      },
      {
        ru: 'Бояться кнопки «Завершить тест»: ответы сохраняются при каждом нажатии «Далее».',
        kk: '«Тестті аяқтау» батырмасынан қорқу: жауаптар «Келесі» басылған сайын сақталады.',
        en: 'Worrying about the "Finish test" button: answers are saved each time you press "Next".',
      },
    ],
    sources: ['pravila', 'ns_contest', 'pp573', 'test_numeric', 'test_verbal', 'test_personality', 'cabinet'],
    estimateWeeks: [1, 3],
  },

  {
    id: 'interview',
    chapter: 'contest',
    icon: 'MessagesSquare',
    kicker: { ru: 'II тур', kk: 'II тур', en: 'Round II' },
    title: { ru: 'Анонимное персональное собеседование', kk: 'Анонимді жеке әңгімелесу', en: 'Anonymous personal interview' },
    summary: {
      ru: 'Беседа с независимой экспертной комиссией о профессиональной подготовке и выборе программы.',
      kk: 'Тәуелсіз сараптама комиссиясымен кәсіби дайындығыңыз және бағдарлама таңдауыңыз туралы әңгіме.',
      en: 'A conversation with the independent expert commission about your professional background and programme choice.',
    },
    why: {
      ru: 'Комиссия оценивает знание вашей области и теории и обоснованность выбора вуза и страны, в том числе по мотивационному письму.',
      kk: 'Комиссия салаңыз бен теорияны білуіңізді және ЖОО мен елді таңдау негізділігін, оның ішінде мотивациялық хат бойынша бағалайды.',
      en: 'The commission assesses your knowledge of your field and theory and how well-founded your choice of university and country is, including from your motivation letter.',
    },
    inShort: {
      what: { ru: 'Второй тур – анонимное собеседование с экспертной комиссией о вашей профессии и выборе программы.', kk: 'Екінші тур – сараптама комиссиясымен кәсібіңіз және бағдарлама таңдауыңыз туралы анонимді әңгімелесу.', en: 'Round two – an anonymous interview with the expert commission about your profession and choice of programme.' },
      you: { ru: 'Записаться на слот в личном кабинете и изучить свою программу, вуз и страну.', kk: 'Жеке кабинетте слотқа жазылып, бағдарламаңызды, ЖОО мен елді зерттеу.', en: 'Book a slot in your account and study your programme, university and country.' },
      result: { ru: 'Рекомендация комиссии, которая вместе с баллом передаётся на третий тур.', kk: 'Балыңызбен бірге үшінші турға берілетін комиссия ұсынымы.', en: 'The commission\'s recommendation, passed to round three with your score.' },
    },
    checklist: [
      {
        id: 'slot',
        text: {
          ru: 'Записались на слот в личном кабинете – они открываются после тестирования.',
          kk: 'Жеке кабинетте слотқа жазылдыңыз – олар тестілеуден кейін ашылады.',
          en: 'You booked a slot in your account – they open after the testing.',
        },
        link: 'cabinet',
      },
      {
        id: 'prepare_uni',
        text: {
          ru: 'Изучили на официальном сайте вуза содержание программы, требования к кандидатам и преподавателей.',
          kk: 'ЖОО-ның ресми сайтынан бағдарлама мазмұнын, кандидаттарға талаптарды және оқытушыларды зерттедіңіз.',
          en: 'You studied the programme content, applicant requirements and teaching staff on the university\'s official site.',
        },
        link: 'pravila',
      },
      {
        id: 'rankings2',
        text: {
          ru: 'Посмотрели международные академические, предметные или региональные рейтинги.',
          kk: 'Халықаралық академиялық, пәндік не өңірлік рейтингтерді қарадыңыз.',
          en: 'You looked at international academic, subject or regional rankings.',
        },
        required: false,
        link: 'pravila',
        appliesTo: { track: ['bachelor', 'master', 'phd_residency'] },
      },
      {
        id: 'research_blocks',
        text: {
          ru: 'Подготовились к четырём блокам вопросов: исследовательская подготовка, теория, выбор исследования и организации, логика рассуждений.',
          kk: 'Сұрақтың төрт блогына дайындалдыңыз: зерттеу дайындығы, теория, зерттеу мен ұйымды таңдау, ойлау логикасы.',
          en: 'You prepared for the four blocks of questions: research background, theory, the choice of research and host, and reasoning.',
        },
        appliesTo: { track: ['science_internship'] },
        link: 'ns_contest',
      },
      {
        id: 'done_interview',
        text: {
          ru: 'Прошли собеседование.',
          kk: 'Әңгімелесуден өттіңіз.',
          en: 'You attended the interview.',
        },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Ссылка на собеседование приходит на почту за день до даты. Слоты открывают поэтапно по направлениям, обычно на две недели вперёд.',
          kk: 'Әңгімелесу сілтемесі поштаға бір күн бұрын келеді. Слоттарды бағыттар бойынша кезең-кезеңімен, әдетте екі аптаға алдын ала ашады.',
          en: 'The interview link comes by email the day before. Slots open in stages by field, usually two weeks ahead.',
        },
        source: 'chat-faq',
        appliesTo: { not: { track: ['science_internship'] } },
      },
    ],
    mistakes: [
      {
        ru: 'Ждать, что слот назначат за вас. Записываться нужно самому; новые даты видны после обновления страницы (CTRL + SHIFT + R).',
        kk: 'Слотты сізге тағайындайды деп күту. Өзіңіз жазыласыз; жаңа күндер бетті жаңартқанда көрінеді (CTRL + SHIFT + R).',
        en: 'Waiting for a slot to be assigned. You book it yourself; new dates show after a page refresh (CTRL + SHIFT + R).',
      },
      {
        ru: 'Готовиться только по специальности: о программе, вузе и стране спрашивают всех.',
        kk: 'Тек мамандық бойынша дайындалу: бағдарлама, ЖОО және ел туралы бәрінен сұрайды.',
        en: 'Preparing only your subject: everyone is asked about the programme, university and country.',
      },
      {
        ru: 'Не сообщить, что не можете прийти в назначенный день. Пишите на info@bolashak.gov.kz: ФИО, дата слота и причина.',
        kk: 'Белгіленген күні келе алмайтыныңызды хабарламау. info@bolashak.gov.kz-ке жазыңыз: аты-жөні, слот күні және себебі.',
        en: 'Not reporting that you cannot make your slot. Write to info@bolashak.gov.kz: your name, the slot date and the reason.',
      },
    ],
    sources: ['pravila', 'ns_contest', 'pp573', 'cabinet', 'chat-faq'],
    estimateWeeks: [1, 4],
  },

  {
    id: 'commission',
    chapter: 'contest',
    icon: 'Gavel',
    kicker: { ru: 'III тур', kk: 'III тур', en: 'Round III' },
    title: { ru: 'Решение Республиканской комиссии', kk: 'Республикалық комиссияның шешімі', en: 'Republican Commission decision' },
    summary: {
      ru: 'Комиссия рассматривает итоги двух туров и ранжирование и принимает окончательное решение.',
      kk: 'Комиссия екі тур қорытындысы мен рейтингті қарап, түпкілікті шешім қабылдайды.',
      en: 'The commission reviews both rounds and the ranking and takes the final decision.',
    },
    why: {
      ru: 'Рабочий орган передаёт Республиканской комиссии результаты тестирования, рекомендации экспертной комиссии и ваше место в ранжировании. Комиссия присуждает стипендию или отказывает; решение публикуют на официальном сайте.',
      kk: 'Жұмыс органы Республикалық комиссияға тестілеу нәтижесін, сараптама комиссиясының ұсынымын және рейтингтегі орныңызды береді. Комиссия стипендия тағайындайды не бас тартады; шешім ресми сайтта жарияланады.',
      en: 'The working body passes the Republican Commission your test results, the expert commission\'s recommendation and your place in the ranking. The Commission awards the scholarship or refuses; the decision is published on the official site.',
    },
    inShort: {
      what: { ru: 'Третий тур: Республиканская комиссия решает, кому присудить стипендию.', kk: 'Үшінші тур: Республикалық комиссия стипендияны кімге тағайындауды шешеді.', en: 'Round three: the Republican Commission decides who is awarded the scholarship.' },
      you: { ru: 'Дождаться публикации решения на официальном сайте.', kk: 'Шешімнің ресми сайтта жариялануын күту.', en: 'Wait for the decision to be published on the official site.' },
      result: { ru: 'Присуждение стипендии или отказ; после отказа участвовать можно только в следующем конкурсном году.', kk: 'Стипендия тағайындалады не бас тартылады; бас тартылса, келесі конкурс жылында ғана қатысуға болады.', en: 'The scholarship is awarded or refused; after a refusal you may take part only in the next competition year.' },
    },
    checklist: [
      {
        id: 'wait',
        text: {
          ru: 'Дождались публикации результатов на официальном сайте.',
          kk: 'Ресми сайтта нәтиженің жариялануын күттіңіз.',
          en: 'You waited for the results to appear on the official site.',
        },
        link: 'pravila',
      },
      {
        id: 'awarded',
        text: {
          ru: 'Стипендия присуждена: вы в списке победителей конкурсного отбора.',
          kk: 'Стипендия тағайындалды – сіз конкурс жеңімпаздары тізіміндесіз.',
          en: 'The scholarship is awarded – you are on the winners list.',
        },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Материалы направляют в рабочий орган не позднее чем за 15 календарных дней до третьего тура. Решение публикуют на сайте администратора в течение 3 рабочих дней.',
          kk: 'Материалдар жұмыс органына үшінші турдан кемінде 15 күнтізбелік күн бұрын жіберіледі. Шешім 3 жұмыс күні ішінде әкімші сайтында жарияланады.',
          en: 'The file goes to the working body at least 15 calendar days before round three. The decision is published on the administrator\'s site within 3 working days.',
        },
        source: 'pp573',
        appliesTo: { not: { track: ['science_internship'] } },
      },
    ],
    mistakes: [
      {
        ru: 'Ждать персонального письма: решение публикуют на официальном сайте после подписания протокола заседания.',
        kk: 'Жеке хат күту: шешім отырыс хаттамасына қол қойылғаннан кейін ресми сайтта жарияланады.',
        en: 'Waiting for a personal letter: the decision is published on the official site after the meeting minutes are signed.',
      },
      {
        ru: 'Подать заново после отказа в том же году: претенденты, которым отказано, к повторному участию в конкурсе текущего года не допускаются.',
        kk: 'Бас тартылғаннан кейін сол жылы қайта тапсыру: бас тартылған үміткерлер ағымдағы жылғы конкурсқа қайта жіберілмейді.',
        en: 'Reapplying the same year after a refusal: refused applicants are not admitted to the current year\'s competition again.',
      },
    ],
    sources: ['pravila', 'pp573', 'ns_rules422', 'ns_contest'],
    estimateWeeks: [2, 8],
  },
]
