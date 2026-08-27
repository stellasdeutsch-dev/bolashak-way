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
      ru: 'Первый тур отсеивает: не набравший установленный пороговый балл ко второму туру не допускается, а повторное прохождение тестирования не предусмотрено. Половина проблем на этом этапе — техническая, поэтому подготовьте компьютер и связь заранее.',
      kk: 'Бірінші тур іріктейді: шекті балды жинамаған екінші турға жіберілмейді, қайта тапсыру көзделмеген. Мәселелердің жартысы — техникалық.',
      en: 'Round I is a filter: anyone below the cut-off is not admitted to round II, and retaking is not provided for. Half the trouble here is technical, so prepare your computer and connection in advance.',
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
          ru: 'Прорешали образцы: числовой тест, вербальный тест и личностный опросник.',
          kk: 'Үлгілерді шығардыңыз: сандық тест, вербалды тест және тұлғалық сауалнама.',
          en: 'You worked through the samples: numerical test, verbal test and personality questionnaire.',
        },
        link: 'test_numeric',
      },
      {
        id: 'tech',
        text: {
          ru: 'Подготовили технику: только компьютер, Chrome последней версии, рабочая веб-камера и микрофон, устойчивый интернет без VPN, один монитор, закрыты программы записи экрана.',
          kk: 'Техниканы дайындадыңыз: тек компьютер, соңғы Chrome, жұмыс істейтін камера мен микрофон, VPN-сіз тұрақты интернет, бір монитор.',
          en: 'Your setup is ready: desktop only, latest Chrome, working webcam and microphone, stable connection without VPN, a single monitor, screen recorders closed.',
        },
        link: 'ns_contest',
      },
      {
        id: 'rules',
        text: {
          ru: 'Прочитали правила: можно обычный калькулятор, ручку и бумагу; калькулятор на смартфоне и других устройствах связи запрещён.',
          kk: 'Ережелерді оқыдыңыз: қарапайым калькулятор, қалам мен қағаз рұқсат; смартфондағы калькулятор тыйым салынған.',
          en: 'You read the rules: a plain calculator, pen and paper are allowed; calculators on phones and other communication devices are not.',
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
          ru: 'Увидели результаты в личном кабинете (итоговый файл открывается по кнопке в кабинете).',
          kk: 'Нәтижелерді жеке кабинеттен көрдіңіз (қорытынды файл кабинеттегі батырмамен ашылады).',
          en: 'You saw the results in your personal account (the summary file opens via the button there).',
        },
        link: 'cabinet',
      },
    ],
    deadlines: [
      {
        text: {
          ru: 'О месте и времени первого и второго туров претендента извещают на портале, а также по электронной и телефонной связи не позднее чем за 10 календарных дней (для научных стажировок — за 5 календарных дней).',
          kk: 'Бірінші және екінші тур орны мен уақыты туралы порталда, электрондық және телефон байланысы арқылы 10 күнтізбелік күн бұрын хабарланады (ғылыми тағылымдамада — 5 күн).',
          en: 'Applicants are notified of the time and place of rounds I and II on the portal, by email and phone at least 10 calendar days in advance (5 days for scientific internships).',
        },
        source: 'pp573',
      },
    ],
    mistakes: [
      {
        ru: 'Закрыть окно или вкладку сайта во время теста — результаты этапа автоматически аннулируются. Начатый тест нужно пройти до конца.',
        kk: 'Тест кезінде терезені не қойындыны жабу — кезең нәтижелері автоматты түрде жойылады.',
        en: 'Closing the browser window or tab during the test automatically voids the round\'s results. A started test must be finished.',
      },
      {
        ru: 'Сдавать через общий роутер провайдера: ошибка «сервер не отвечает» чаще всего решается переходом на мобильный интернет LTE или другую сеть.',
        kk: 'Провайдердің ортақ роутері арқылы тапсыру: «сервер жауап бермейді» қатесі көбіне LTE-ге ауысқанда шешіледі.',
        en: 'Testing through a shared provider router: the "server not responding" error is usually fixed by switching to mobile LTE or another network.',
      },
      {
        ru: 'Писать о техническом сбое через несколько дней: обращение на info@bolashak.gov.kz нужно отправить в тот же день, с ФИО, типом теста, точным временем сбоя и скриншотом с видимым временем.',
        kk: 'Техникалық ақау туралы бірнеше күннен кейін жазу: info@bolashak.gov.kz-ке сол күні жазу керек.',
        en: 'Reporting a technical failure days later: write to info@bolashak.gov.kz the same day with your name, the test type, the exact time and a screenshot showing the clock.',
      },
      {
        ru: 'Паниковать из-за кнопки «Завершить тест»: ответы сохраняются при нажатии «Далее» на каждом вопросе, а не в момент завершения.',
        kk: '«Тестті аяқтау» батырмасынан қорқу: жауаптар әр сұрақта «Келесі» басылғанда сақталады.',
        en: 'Panicking about the "Finish test" button: answers are saved when you press "Next" on each question, not at the end.',
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
      ru: 'Комиссия проверяет уровень профессиональной подготовки, теоретических знаний и осознанность выбора вуза и страны — с учётом того, что вы написали в мотивационном письме. К этим вопросам можно и нужно готовиться.',
      kk: 'Комиссия кәсіби дайындықты, теориялық білімді және ЖОО мен ел таңдаудың саналылығын тексереді — мотивациялық хатыңызды ескере отырып.',
      en: 'The commission assesses your professional background, theoretical knowledge and how deliberate your choice of university and country is — in light of your motivation letter.',
    },
    checklist: [
      {
        id: 'slot',
        text: {
          ru: 'Записались на слот в личном кабинете после завершения тестирования.',
          kk: 'Тестілеу аяқталған соң жеке кабинетте слотқа жазылдыңыз.',
          en: 'You booked a slot in your personal account after finishing the testing.',
        },
        link: 'cabinet',
      },
      {
        id: 'prepare_uni',
        text: {
          ru: 'Изучили выбранную программу и вуз на официальном сайте: содержание, требования к кандидатам, научно-преподавательский состав.',
          kk: 'Таңдалған бағдарлама мен ЖОО-ны ресми сайтта зерттедіңіз: мазмұны, талаптары, ғылыми-педагогикалық құрам.',
          en: 'You studied the chosen programme and university on their official site: content, applicant requirements, faculty.',
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
          ru: 'Подготовились к четырём блокам: научно-исследовательская подготовка, теоретические знания, осознанность выбора исследования и организации, логическое мышление.',
          kk: 'Төрт блокқа дайындалдыңыз: ғылыми-зерттеу дайындығы, теориялық білім, таңдаудың саналылығы, логикалық ойлау.',
          en: 'You prepared for the four blocks: research background, theoretical knowledge, the rationale of your research and host choice, logical reasoning.',
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
          ru: 'Ссылка на собеседование приходит на электронную почту за день до назначенной даты; слоты выгружаются волнами по направлениям, обычно на две недели вперёд.',
          kk: 'Әңгімелесу сілтемесі белгіленген күннен бір күн бұрын поштаға келеді; слоттар бағыттар бойынша толқынмен шығады.',
          en: 'The interview link arrives by email the day before; slots are released in waves by field, usually two weeks ahead.',
        },
        source: 'chat-faq',
      },
    ],
    mistakes: [
      {
        ru: 'Ждать, что слот назначат за вас: записаться нужно самостоятельно, а список дат обновляется волнами — обновляйте страницу через CTRL + SHIFT + R.',
        kk: 'Слотты сізге тағайындайды деп күту: өзіңіз жазылуыңыз керек, күндер толқынмен жаңарады.',
        en: 'Waiting for a slot to be assigned: you book it yourself, and dates appear in waves — refresh with CTRL + SHIFT + R.',
      },
      {
        ru: 'Готовиться только по своей специальности: у льготных категорий тоже спрашивают про программу обучения, вуз и страну.',
        kk: 'Тек өз мамандығы бойынша дайындалу: жеңілдікті санаттардан да бағдарлама, ЖОО және ел туралы сұралады.',
        en: 'Preparing only your subject: preferential categories are also asked about the programme, university and country.',
      },
      {
        ru: 'Не сообщить заранее о невозможности прийти в назначенный день: писать нужно на info@bolashak.gov.kz с ФИО, датой слота и причиной.',
        kk: 'Белгіленген күні келе алмайтынын алдын ала хабарламау: info@bolashak.gov.kz-ке жазу қажет.',
        en: 'Not reporting in advance that you cannot attend: write to info@bolashak.gov.kz with your name, slot date and reason.',
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
      ru: 'Это финальная точка конкурса: рабочий орган вносит материалы с результатами тестирования, рекомендациями экспертной комиссии и ранжированием, а Республиканская комиссия присуждает стипендию либо отказывает. Результат публикуется на официальном сайте администратора.',
      kk: 'Бұл конкурстың соңғы нүктесі: жұмыс органы материалдарды енгізеді, Республикалық комиссия стипендия тағайындайды не бас тартады. Нәтиже әкімшінің ресми сайтында жарияланады.',
      en: 'The final point of the competition: the working body submits the test results, expert recommendations and ranking; the Republican Commission awards or refuses the scholarship. The outcome is published on the administrator\'s website.',
    },
    checklist: [
      {
        id: 'wait',
        text: {
          ru: 'Дождались публикации результатов на официальном сайте администратора.',
          kk: 'Әкімшінің ресми сайтында нәтижелердің жариялануын күттіңіз.',
          en: 'You waited for the results to be published on the administrator\'s website.',
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
          ru: 'Администратор вносит материалы в рабочий орган не позднее чем за 15 календарных дней до третьего тура. О решении претендента извещают размещением информации на сайте администратора в течение 3 рабочих дней.',
          kk: 'Әкімші материалдарды үшінші турға 15 күнтізбелік күн қалғанда енгізеді. Шешім туралы 3 жұмыс күні ішінде сайтта хабарланады.',
          en: 'The administrator submits materials at least 15 calendar days before round III. The decision is published on the administrator\'s website within 3 working days.',
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
