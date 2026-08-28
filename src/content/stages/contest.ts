import type { Stage } from '../types'

export const CONTEST_STAGES: Stage[] = [
  {
    id: 'testing',
    chapter: 'contest',
    icon: 'MonitorCheck',
    kicker: { ru: 'I тур', kk: 'I тур', en: 'Round I' },
    title: { ru: 'Комплексное тестирование', kk: 'Кешенді тестілеу', en: 'Comprehensive testing' },
    summary: {
      ru: 'Числовой и вербальный тесты плюс личностный опросник. Отборочный тур с пороговым баллом.',
      kk: 'Сандық және вербалды тесттер, тұлғалық сауалнама. Шекті балы бар іріктеу туры.',
      en: 'Numerical and verbal tests plus a personality questionnaire. A qualifying round with a cut-off score.',
    },
    why: {
      ru: 'Первый тур отсеивает. Не набрали пороговый балл — во второй тур не попадаете, пересдачи не будет. Половина проблем здесь техническая, поэтому компьютер и интернет проверьте заранее.',
      kk: 'Бірінші тур іріктейді. Шекті балды жинамасаңыз — екінші турға өтпейсіз, қайта тапсыру болмайды. Мұндағы қиындықтың жартысы техникалық, сондықтан компьютер мен интернетті алдын ала тексеріңіз.',
      en: 'Round one filters people out. Miss the cut-off and you do not reach round two, and there is no retake. Half the trouble here is technical, so check your computer and connection in advance.',
    },
    checklist: [
      {
        id: 'credentials',
        text: {
          ru: 'Получили на почту логин и пароль для тестирования (проверьте папку «Спам»).',
          kk: 'Тестілеуге арналған логин мен құпиясөзді поштаға алдыңыз («Спам» қалтасын тексеріңіз).',
          en: 'You received the testing login and password by email (check the spam folder).',
        },
        link: 'chat-faq',
      },
      {
        id: 'samples',
        text: {
          ru: 'Прорешали образцы: числовой тест, вербальный и личностный опросник.',
          kk: 'Үлгілерді шығардыңыз: сандық тест, вербалды тест және тұлғалық сауалнама.',
          en: 'You worked through the samples: the numerical test, the verbal one and the personality questionnaire.',
        },
        link: 'test_numeric',
      },
      {
        id: 'tech',
        text: {
          ru: 'Подготовили технику: только компьютер, свежий Chrome, рабочие камера и микрофон, стабильный интернет без VPN, один монитор, программы записи экрана закрыты.',
          kk: 'Техниканы дайындадыңыз: тек компьютер, жаңа Chrome, жұмыс істейтін камера мен микрофон, VPN-сіз тұрақты интернет, бір монитор, экран жазатын бағдарламалар жабық.',
          en: 'Your setup is ready: a computer only, a fresh Chrome, a working camera and microphone, a stable connection without VPN, one monitor, screen recorders closed.',
        },
        link: 'ns_contest',
      },
      {
        id: 'rules',
        text: {
          ru: 'Прочитали правила: обычный калькулятор, ручка и бумага можно; калькулятор на телефоне и других устройствах связи нельзя.',
          kk: 'Ережелерді оқыдыңыз: қарапайым калькулятор, қалам мен қағаз болады; телефондағы және басқа байланыс құралдарындағы калькулятор болмайды.',
          en: 'You read the rules: a plain calculator, pen and paper are fine; a calculator on a phone or any other communication device is not.',
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
          ru: 'Увидели результаты в личном кабинете — итоговый файл открывается там по кнопке.',
          kk: 'Нәтижені жеке кабинеттен көрдіңіз — қорытынды файл сонда батырмамен ашылады.',
          en: 'You saw the results in your account — the summary file opens there with a button.',
        },
        link: 'cabinet',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'О месте и времени первого и второго туров сообщают на портале, а также по почте и телефону — не позднее чем за 10 календарных дней. Для научных стажировок — за 5 дней.',
          kk: 'Бірінші және екінші тур орны мен уақытын порталда, сондай-ақ пошта мен телефон арқылы хабарлайды — 10 күнтізбелік күннен кешіктірмей. Ғылыми тағылымдамада — 5 күн бұрын.',
          en: 'You are told the time and place of rounds one and two on the portal, and by email and phone, at least 10 calendar days ahead. For scientific internships it is 5 days.',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Закрыть окно или вкладку во время теста. Результаты тура аннулируются автоматически, а начатый тест нужно довести до конца.',
        kk: 'Тест кезінде терезені не қойындыны жабу. Тур нәтижесі автоматты түрде жойылады, ал басталған тестті соңына дейін өту керек.',
        en: 'Closing the window or tab during the test. The round\'s results are voided automatically, and a test you started has to be finished.',
      },
      {
        ru: 'Сдавать через общий роутер провайдера. Ошибка «сервер не отвечает» чаще всего лечится переходом на мобильный интернет LTE или другую сеть.',
        kk: 'Провайдердің ортақ роутері арқылы тапсыру. «Сервер жауап бермейді» қатесі көбіне мобильді LTE-ге не басқа желіге ауысқанда шешіледі.',
        en: 'Sitting the test through a shared provider router. The "server not responding" error usually goes away on mobile LTE or another network.',
      },
      {
        ru: 'Написать о сбое через несколько дней. Обращение на info@bolashak.gov.kz отправляют в тот же день: ФИО, тип теста, точное время сбоя и скриншот, где видно время.',
        kk: 'Ақау туралы бірнеше күннен кейін жазу. info@bolashak.gov.kz-ке сол күні жазу керек: аты-жөні, тест түрі, ақаудың нақты уақыты және уақыты көрінетін скриншот.',
        en: 'Reporting a failure days later. Write to info@bolashak.gov.kz the same day: your name, the test type, the exact time and a screenshot with the clock visible.',
      },
      {
        ru: 'Паниковать из-за кнопки «Завершить тест». Ответы сохраняются каждый раз, когда вы жмёте «Далее», а не в конце.',
        kk: '«Тестті аяқтау» батырмасынан қорқу. Жауаптар «Келесі» батырмасын басқан сайын сақталады, соңында емес.',
        en: 'Panicking about the "Finish test" button. Answers are saved every time you press "Next", not at the end.',
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
      ru: 'Беседа с независимой экспертной комиссией о вашей профессиональной подготовке и выборе программы.',
      kk: 'Тәуелсіз сараптама комиссиясымен кәсіби дайындығыңыз және бағдарлама таңдауыңыз туралы әңгіме.',
      en: 'A conversation with the independent expert commission about your professional background and programme choice.',
    },
    why: {
      ru: 'Комиссия смотрит, насколько вы разбираетесь в своей области, что знаете в теории и насколько осознанно выбрали вуз и страну. Опирается она в том числе на ваше мотивационное письмо. К этим вопросам можно подготовиться заранее.',
      kk: 'Комиссия саланы қаншалық білетініңізді, теориядан не білетініңізді және ЖОО мен елді қаншалық саналы таңдағаныңызды қарайды. Мотивациялық хатыңызға да сүйенеді. Бұл сұрақтарға алдын ала дайындалуға болады.',
      en: 'The commission looks at how well you know your field, what you know in theory and how deliberately you chose the university and country. Your motivation letter feeds into this. You can prepare for these questions.',
    },
    checklist: [
      {
        id: 'slot',
        text: {
          ru: 'Записались на слот в личном кабинете — они открываются после тестирования.',
          kk: 'Жеке кабинетте слотқа жазылдыңыз — олар тестілеуден кейін ашылады.',
          en: 'You booked a slot in your account — they open after the testing.',
        },
        link: 'cabinet',
      },
      {
        id: 'prepare_uni',
        text: {
          ru: 'Изучили программу и вуз на официальном сайте: что внутри программы, чего ждут от кандидатов, кто преподаёт.',
          kk: 'Бағдарлама мен ЖОО-ны ресми сайттан зерттедіңіз: бағдарламаның ішінде не бар, кандидаттардан не күтеді, кім сабақ береді.',
          en: 'You studied the programme and the university on their official site: what is inside the programme, what they expect from applicants, who teaches.',
        },
        link: 'pravila',
      },
      {
        id: 'rankings2',
        text: {
          ru: 'Ознакомились с международными рейтингами по академическим, предметным или региональным направлениям.',
          kk: 'Академиялық, пәндік не өңірлік бағыттар бойынша халықаралық рейтингтермен таныстыңыз.',
          en: 'You reviewed international rankings by academic, subject or regional criteria.',
        },
        required: false,
        link: 'pravila',
      },
      {
        id: 'research_blocks',
        text: {
          ru: 'Подготовились к четырём блокам вопросов: ваша исследовательская подготовка, теория, почему именно это исследование и эта организация, логика рассуждений.',
          kk: 'Сұрақтың төрт блогына дайындалдыңыз: зерттеу дайындығыңыз, теория, неге дәл осы зерттеу мен осы ұйым, ойлау логикаңыз.',
          en: 'You prepared for the four blocks of questions: your research background, theory, why this research and this host, and how you reason.',
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
          ru: 'Ссылка на собеседование приходит на почту за день до назначенной даты. Слоты выкладывают волнами по направлениям, обычно на две недели вперёд.',
          kk: 'Әңгімелесу сілтемесі белгіленген күннен бір күн бұрын поштаға келеді. Слоттарды бағыттар бойынша толқынмен, әдетте екі апта бұрын шығарады.',
          en: 'The interview link comes by email the day before. Slots are released in waves by field, usually two weeks ahead.',
        },
        source: 'chat-faq',
      },
    ],
    mistakes: [
      {
        ru: 'Ждать, что слот назначат за вас. Записываться нужно самому, а даты появляются волнами — обновляйте страницу через CTRL + SHIFT + R.',
        kk: 'Слотты сізге тағайындайды деп күту. Өзіңіз жазылуыңыз керек, ал күндер толқынмен шығады — бетті CTRL + SHIFT + R арқылы жаңартыңыз.',
        en: 'Waiting for someone to assign you a slot. You book it yourself, and dates appear in waves — refresh the page with CTRL + SHIFT + R.',
      },
      {
        ru: 'Готовиться только по своей специальности. Про программу, вуз и страну спрашивают всех, включая льготные категории.',
        kk: 'Тек өз мамандығы бойынша дайындалу. Бағдарлама, ЖОО және ел туралы бәрінен сұрайды, жеңілдікті санаттардан да.',
        en: 'Preparing only your subject. Everyone is asked about the programme, the university and the country — preferential categories included.',
      },
      {
        ru: 'Молчать, если не получается прийти в назначенный день. Напишите на info@bolashak.gov.kz: ФИО, дата слота и причина.',
        kk: 'Белгіленген күні келе алмасаңыз, үндемей қалу. info@bolashak.gov.kz-ке жазыңыз: аты-жөні, слот күні және себебі.',
        en: 'Staying silent if you cannot make your slot. Write to info@bolashak.gov.kz: your name, the slot date and the reason.',
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
      ru: 'Финальная точка конкурса. Рабочий орган передаёт ваши материалы: результаты тестирования, рекомендации экспертной комиссии и место в ранжировании. Республиканская комиссия присуждает стипендию или отказывает, а результат публикуют на официальном сайте.',
      kk: 'Конкурстың соңғы нүктесі. Жұмыс органы материалдарыңызды береді: тестілеу нәтижесі, сараптама комиссиясының ұсынымы және рейтингтегі орныңыз. Республикалық комиссия стипендия тағайындайды не бас тартады, нәтиже ресми сайтта жарияланады.',
      en: 'The last step of the competition. The working body hands over your file: test results, the expert commission\'s recommendation and your place in the ranking. The Republican Commission either awards the scholarship or refuses, and the outcome is published on the official site.',
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
          ru: 'Стипендия присуждена — вы в списке победителей конкурсного отбора.',
          kk: 'Стипендия тағайындалды — сіз конкурс жеңімпаздары тізіміндесіз.',
          en: 'The scholarship is awarded — you are on the winners list.',
        },
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'Материалы уходят в рабочий орган не позднее чем за 15 календарных дней до третьего тура. О решении сообщают публикацией на сайте администратора в течение 3 рабочих дней.',
          kk: 'Материалдар үшінші турға 15 күнтізбелік күн қалғанда жұмыс органына жіберіледі. Шешім туралы 3 жұмыс күні ішінде әкімші сайтындағы жариялау арқылы хабарлайды.',
          en: 'The file goes to the working body at least 15 calendar days before round three. The decision is announced on the administrator\'s site within 3 working days.',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Ждать персонального письма: решение объявляется публикацией на официальном сайте после подписания протокола заседания.',
        kk: 'Жеке хат күту: шешім хаттамаға қол қойылғаннан кейін сайтта жарияланады.',
        en: 'Waiting for a personal letter: the decision is announced by publication after the minutes are signed.',
      },
      {
        ru: 'Считать отказ поводом подать заново в этом же году: претенденты, которым отказано, к повторному участию в конкурсе текущего года не допускаются.',
        kk: 'Бас тартуды сол жылы қайта тапсыруға себеп деп санау: бас тартылған үміткерлер ағымдағы жылы қайта қатыса алмайды.',
        en: 'Treating a refusal as a reason to reapply the same year: refused applicants are not admitted to the current year\'s competition again.',
      },
    ],
    sources: ['pravila', 'pp573', 'pp791', 'ns_contest'],
    estimateWeeks: [2, 8],
  },
]
