import type { L } from './types'

/**
 * Kazakh and English for the chat-sourced FAQ. Kept apart from faq.generated.ts,
 * which scripts/import-faq.mjs overwrites whenever the CSV is refreshed.
 * Translations are meaning-for-meaning; no fact is added or dropped.
 */
export const FAQ_TRANSLATIONS: Record<string, { q: Omit<L, 'ru'>; a: Omit<L, 'ru'> }> = {
  'faq-01': {
    q: {
      kk: 'Әңгімелесуге слоттар қашан ашылады және қалай жазылуға болады?',
      en: 'When do interview slots open and how do I book one?',
    },
    a: {
      kk: 'Слоттар кешенді тестілеу аяқталған соң жүйеде ашылады, жеке кабинетте өзіңіз жазыласыз. Бетті жаңартып, қолжетімді күн мен уақытты таңдаңыз. Слоттар бағыттар бойынша толқынмен, әдетте екі апта бұрын жүктеледі. Әңгімелесу сілтемесі поштаға бір күн бұрын келеді.',
      en: 'Slots open in the system once the aptitude testing is over; you book one yourself in the personal cabinet. Refresh the page and pick an available date and time. Slots are released in waves by field, usually two weeks ahead. The interview link arrives by email the day before.',
    },
  },
  'faq-02': {
    q: {
      kk: 'Жеке кабинетте барлық күндер белсенді емес немесе слот жоқ. Не істеу керек?',
      en: 'All dates are inactive or there are no slots in my cabinet. What should I do?',
    },
    a: {
      kk: 'Бетті CTRL + SHIFT + R арқылы жаңартыңыз. Слоттар шықпаса, сіздің бағытыңызға әлі жүктелмеген. Жағдай тәулік бойы өзгермесе, аты-жөніңіз бен бағытыңызды чатқа немесе info@bolashak.gov.kz мекенжайына жазыңыз.',
      en: 'Refresh with CTRL + SHIFT + R. If nothing appears, slots for your field have not been released yet. If it does not change within a day, send your full name and field to the chat or to info@bolashak.gov.kz.',
    },
  },
  'faq-03': {
    q: {
      kk: 'Белгіленген күні әңгімелесуге қатыса алмаймын. Ауыстыруға бола ма?',
      en: 'I cannot attend the interview on the assigned day. Can it be moved?',
    },
    a: {
      kk: 'Чаттарда тікелей жауап жоқ. Аты-жөніңізді, слот күнін және себебін көрсетіп info@bolashak.gov.kz мекенжайына жүгініңіз. Ресми регламентті талап етеді.',
      en: 'The chats give no direct answer. Write to info@bolashak.gov.kz with your full name, slot date and reason. This needs an official rule to confirm.',
    },
  },
  'faq-04': {
    q: {
      kk: 'Тест кезінде жүйе ұзақ жүктелді, таймер жүріп тұрды. Уақытты қайтара ма?',
      en: 'The system hung during the test while the timer kept running. Will the time be restored?',
    },
    a: {
      kk: 'Автоматты түрде жоқ. Сол күні info@bolashak.gov.kz мекенжайына жазыңыз: аты-жөні, тест түрі, ақаудың күні мен нақты уақыты, қате скриншоты. Өтініш жеке қаралады.',
      en: 'Not automatically. Write to info@bolashak.gov.kz the same day: full name, test type, the date and exact time of the failure, and a screenshot of the error. Each request is reviewed individually.',
    },
  },
  'faq-05': {
    q: {
      kk: 'Техникалық ақаудан кейін тестті қайта тапсыруға бола ма?',
      en: 'Can I retake the test after a technical failure?',
    },
    a: {
      kk: 'Қайта тапсыру мүмкін, бірақ әдепкі бойынша емес. info@bolashak.gov.kz мекенжайына өтініш бересіз, ол тексеріледі; платформа ақауы расталса, қолжетімділік шектеулі уақытқа ашылады. Ашылғаны туралы жеке немесе тізіммен чатта хабарланады. Хабар келмейінше жүйеге кірудің мәні жоқ.',
      en: 'A retake is possible but not granted by default. You send a request to info@bolashak.gov.kz; if a platform failure is confirmed, access is reopened for a limited time. You are told about it personally or in a list in the chat. Until that message arrives there is no point logging in.',
    },
  },
  'faq-06': {
    q: {
      kk: '«Тестті аяқтау» батырмасын баспай қалдым. Жауаптарым жойыла ма?',
      en: 'I did not manage to press "Finish test". Are my answers voided?',
    },
    a: {
      kk: 'Жоқ. Жауаптар әр сұрақта «Келесі» батырмасын басқанда сақталады, аяқтау сәтінде емес. Уақыт бітсе, тіркелген жауаптар есептеледі.',
      en: 'No. Answers are saved when you press "Next" on each question, not at the moment you finish. If time runs out, the answers already recorded are counted.',
    },
  },
  'faq-07': {
    q: {
      kk: 'Кейбір жауаптар сақталмады. Кімге жүгінемін?',
      en: 'Some answers were not saved. Where do I report it?',
    },
    a: {
      kk: 'info@bolashak.gov.kz мекенжайына аты-жөніңізді, тест күні мен уақытын, тест атауын және қай сұрақтарда жауап тіркелмегенін жазыңыз. Қорытынды экранның скриншотын қоса жіберіңіз.',
      en: 'Write to info@bolashak.gov.kz with your full name, the date and time of the test, its name and which questions were not recorded. Attach a screenshot of the final screen.',
    },
  },
  'faq-08': {
    q: {
      kk: 'Тестті дәл қазір бастай алмай тұрмын. Не істеу керек?',
      en: 'I cannot start the test right now. What should I do?',
    },
    a: {
      kk: 'Ретімен: CTRL + SHIFT + R арқылы бетті жаңарту, Chrome соңғы нұсқасын пайдалану, қойындыны инкогнито режимінде ашу, VPN-ді өшіру, желіні ауыстырып телефоннан LTE арқылы интернет тарату, екінші мониторды және экран жазу бағдарламаларын өшіру. Көмектеспесе, чатқа бір хабармен аты-жөніңізді, тест түрін, басталу уақытын және толық скриншотты жіберіңіз.',
      en: 'In order: refresh with CTRL + SHIFT + R, check you are on the latest Chrome, open the tab in incognito, turn off any VPN, switch networks or tether over LTE, disconnect a second monitor and close screen-recording software. If none of that helps, send one message to the chat with your full name, test type, start time and a full screenshot.',
    },
  },
  'faq-09': {
    q: {
      kk: 'Сұрақтардың орнына ақ экран немесе шексіз жүктелу.',
      en: 'A white screen or endless loading instead of the questions.',
    },
    a: {
      kk: 'CTRL + SHIFT + R арқылы бетті жаңартыңыз, инкогнито режимін байқап көріңіз. Экран ақ күйінде қалса, уақыты көрініп тұрған скриншот түсіріп, аты-жөніңіз бен тест түрін қоса бірден жіберіңіз: уақыты бар скриншот ақауды логтармен салыстырып, қайта тапсыруды ашуға мүмкіндік береді.',
      en: 'Refresh with CTRL + SHIFT + R and try incognito. If the screen stays white, take a screenshot with the clock visible and send it at once with your full name and test type: a timestamped screenshot lets the team match the failure against the logs and open a retake.',
    },
  },
  'faq-10': {
    q: {
      kk: '«Сервер жауап бермейді» қатесі. Бұл платформаның ақауы ма?',
      en: 'A "server is not responding" error. Is the platform down?',
    },
    a: {
      kk: 'Көбіне жоқ. Бұл қате провайдер бірнеше абоненттің трафигін бір ортақ маршрутизатор арқылы жіберген кезде шығады, ал жүйе тұрақты тікелей байланысты талап етеді. Шешімі: мобильді интернет LTE немесе 4G арқылы тапсыру, не басқа желіге, басқа провайдерге қосылу.',
      en: 'Usually not. The error appears when the provider routes several subscribers through one shared router, while the system needs a stable direct connection. The fix: take the test over mobile LTE or 4G, or connect through another network or provider.',
    },
  },
  'faq-11': {
    q: {
      kk: 'Камера қосылмайды немесе шексіз айналып тұр.',
      en: 'The camera does not start or spins forever.',
    },
    a: {
      kk: 'Windows параметрлерінде: Құпиялылық және қорғаныс, Камера — рұқсат берілгенін тексеріңіз. Браузерде: сайт баптаулары, рұқсаттар, камера, рұқсат ету. Алғашқы авторизация кезіндегі қалқымалы терезені бөгемеңіз, бөгелген болса сайт рұқсаттарын қайта орнатыңыз. Камераны webcammictest.com сайтында тексеріңіз. Камераны пайдаланатын басқа бағдарламаларды жабыңыз, екінші мониторды өшіріңіз.',
      en: 'In Windows settings check Privacy & security → Camera and allow access. In the browser: site settings → permissions → camera → allow. Do not dismiss the permission popup on first login; if you did, reset the site permissions. Test the camera at webcammictest.com. Close other apps using the camera and disconnect a second monitor.',
    },
  },
  'faq-12': {
    q: {
      kk: 'Жүйе сәйкестендіруден өткізбейді, бетті танымайды.',
      en: 'The system fails identification and does not recognise my face.',
    },
    a: {
      kk: 'Әдеттегі себеп: тексеру кезіндегі фото тіркелу кезіндегі фотомен сәйкес келмейді. Камераға тура қараңыз, бет толық кадрда әрі біркелкі жарықтандырылған болсын. Крестикті баспаңыз: терезе жабылғанда әрекеттер қалпына келеді. Көзілдірікке рұқсат етіледі, бірақ басты бұрғанда прокторинг бұзушылық деп тіркеуі мүмкін.',
      en: 'The usual cause: the verification photo does not match the one from registration. Look straight into the camera, keep your whole face in frame and evenly lit. Do not click the close button — closing the window resets your attempts. Glasses are allowed, but turning your head may be logged as a violation by the proctoring system.',
    },
  },
  'faq-13': {
    q: {
      kk: 'Техникалық талаптар қандай? Телефоннан немесе Safari-де тапсыруға бола ма?',
      en: 'What are the technical requirements? Can I use a phone or Safari?',
    },
    a: {
      kk: 'Кешенді тестілеу тек компьютерде тапсырылады. Ұсынылатын браузер — Chrome соңғы нұсқасы. Жұмыс істейтін веб-камера, тұрақты тікелей интернет, VPN болмауы, бір монитор және экран жазу бағдарламаларының жабық болуы қажет.',
      en: 'The aptitude testing is taken on a computer only. The recommended browser is the latest Chrome. You need a working webcam, a stable direct internet connection, no VPN, a single monitor and no screen-recording software running.',
    },
  },
  'faq-14': {
    q: {
      kk: 'Логин мен құпиясөз келмей жатыр, тест жақында.',
      en: 'The login and password email has not arrived and the test is soon.',
    },
    a: {
      kk: '«Спам» қалтасын және өтінім беру кезінде көрсетілген мекенжайдың дұрыстығын тексеріңіз. Хат болмаса, чатқа аты-жөніңіз бен электрондық поштаңызды жазыңыз: хаттар топтап жіберіледі, қолжетімділік қолмен де жіберілуі мүмкін. Басқа мекенжай қажет болса, оны бөлек көрсетіңіз.',
      en: 'Check the spam folder and that the address you gave in the application is correct. If there is no email, send your full name and address to the chat: the letters go out in batches and access can be sent manually. If you need a different address, say so separately.',
    },
  },
  'faq-15': {
    q: {
      kk: 'Жеке кабинет ашылмайды, өтінім «өңделуде» күйінде тұр.',
      en: 'The personal cabinet will not open and my application is stuck in processing.',
    },
    a: {
      kk: 'Бетті жаңартып, браузер кэшін тазалаңыз. Өтінімдер берілген күннен бастап кезекпен өңделеді, нақты мерзім аталмаған. Бірнеше күннен асса, алғашқы өтініш күнін көрсетіп өзіңізді еске салыңыз.',
      en: 'Refresh the page and clear the browser cache. Applications are processed in order from the day they are filed; no exact term has been stated. If more than a few days have passed, follow up and mention the date of your first request.',
    },
  },
  'faq-16': {
    q: {
      kk: 'Тесттерді қандай ретпен тапсырамын және қанша уақыт беріледі?',
      en: 'In what order are the tests taken and how much time is given?',
    },
    a: {
      kk: 'Сандық және вербалды тесттердің реті өз қалауыңызша таңдалады. Тұлғалық сауалнамада уақыт шектеуі жоқ. Сауалнаманың әр блогында төрт тұжырымның екеуін таңдау керек: біреуін «Көбірек», екіншісін «Азырақ»; барлық тармаққа жауап беріңіз, әйтпесе «Келесі» батырмасы блокты сақтамайды. Сандық және вербалды тесттердің нақты сұрақ саны мен уақыт шегі чаттарда аталмаған.',
      en: 'You choose the order of the numerical and verbal tests yourself. The personality questionnaire has no time limit. In each block of the questionnaire you pick two of four statements — one as "Most", one as "Least" — and must answer every item, otherwise "Next" will not save the block. The exact number of questions and the time limit for the numerical and verbal tests were never stated in the chats.',
    },
  },
  'faq-17': {
    q: {
      kk: 'Тест кезінде не рұқсат етіледі: көзілдірік, су, жобалау парағы, калькулятор?',
      en: 'What is allowed during the test: glasses, water, scratch paper, a calculator?',
    },
    a: {
      kk: 'Көзілдірікке, соның ішінде сәйкестендіру кезінде де, рұқсат етіледі. Толық тізім тестілеу нұсқаулығында, оны басталар алдында оқып шығыңыз. Прокторинг бастың бұрылуына, кадрдағы бөгде заттарға, екінші мониторға және бөгде бағдарламаларға назар аударады. Калькулятор, су және жобалау парағы туралы тармақтар ресми жауапты қажет етеді.',
      en: 'Glasses are allowed, including during identification. The full list is in the testing instructions — read them before you start. Proctoring reacts to head turns, foreign objects in frame, a second monitor and third-party software. The points about a calculator, water and scratch paper need an official answer.',
    },
  },
  'faq-18': {
    q: {
      kk: 'Нәтижелер мен балдар қашан болады?',
      en: 'When are the results and scores available?',
    },
    a: {
      kk: 'Әр тест бойынша нәтиже ол аяқталған соң жеке кабинетте шығады, қажет болса бетті жаңартыңыз. Қорытынды файл кабинеттегі қызыл батырмамен ашылады, бұл — нәтижелері бар PDF. Тағайындау қорытындысы Республикалық комиссия отырысынан кейін жарияланады, нақты күні аталмайды.',
      en: 'The result of each test appears in the personal cabinet once you finish it; refresh the page if needed. The summary file opens via the red button in the cabinet — a PDF with your results. The award results are published after the Republican Commission meeting; no specific date is given.',
    },
  },
  'faq-19': {
    q: {
      kk: 'Нәтижеге апелляция беруге бола ма?',
      en: 'Can I appeal the result?',
    },
    a: {
      kk: 'Нәтижелер бойынша және прокторингті тексеру бойынша өтініштер info@bolashak.gov.kz мекенжайына аты-жөні, тест күні және жағдайдың сипаттамасы көрсетіліп беріледі. Өтініш жүгінген күннен бастап өңделеді, үміткермен кез келген жағдайда байланысады. Ресми тәртібі мен қарау мерзімдері ресми жариялауды қажет етеді.',
      en: 'Requests about results and about a proctoring review go to info@bolashak.gov.kz with your full name, the test date and a description of the situation. The request is processed from the day it is filed and the applicant is contacted either way. The formal procedure and review terms still need an official publication.',
    },
  },
  'faq-20': {
    q: {
      kk: 'Тест пен әңгімелесуден кейін не болады?',
      en: 'What happens after the test and the interview?',
    },
    a: {
      kk: 'Барлық кезеңнен өткен соң үміткерлерді шетелде кадрлар даярлау жөніндегі Республикалық комиссия қарайды, оның шешімі тағайындауды айқындайды. Отырыс күні алдын ала жарияланбаған. Әңгімелесуге сілтемелер поштаға бір күн бұрын келеді.',
      en: 'Once all stages are complete, candidates are reviewed by the Republican Commission for Training Personnel Abroad, whose decision determines the award. The meeting date was not announced in advance. Interview links arrive by email the day before.',
    },
  },
}
