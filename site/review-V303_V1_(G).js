(() => {
  'use strict';

  const source = (url, title) => ({url, title});
  const nystad = source('https://www.prlib.ru/item/441841', 'РГБ и Президентская библиотека. Ништадтский договор в издании 1721 года');
  const nystadText = source('https://www.vostlit.info/Texts/Dokumenty/Skandinav/Sweden/Nystad_friede/text.phtml?id=8269', 'Ништадтский договор. Текст артикулов 4–6');
  const poltava = source('https://www.prlib.ru/section/1336546', 'Президентская библиотека. Документы и карты Северной войны');
  const paris = source('https://ru.wikisource.org/wiki/Парижский_мирный_договор_(1856)', 'Парижский трактат 1856 года. Статьи XI–XIV и XIX');
  const london = source('https://en.wikisource.org/wiki/The_European_Concert_in_the_Eastern_Question/Chapter_6', 'Лондонский договор 13 марта 1871 года. Статьи I–III по сборнику Э. Холланда');
  const berlin = source('https://upload.wikimedia.org/wikipedia/commons/c/c9/The_history_of_the_war_against_Russia_%28IA_historyofwaragai01nola%29.pdf', 'Австро-прусский договор 20 апреля 1854 года и дополнительная статья. Публикация текста в переводе Э. Нолана');
  const manifesto = source('https://www.prlib.ru/item/802981', 'Манифест 19 февраля 1861 года. Экземпляр Президентской библиотеки');
  const statute = source('https://www.prlib.ru/item/690053', 'Общее положение о крестьянах 19 февраля 1861 года. Экземпляр Президентской библиотеки');
  const statuteText = source('https://ru.djvu.online/file/PfZpzmrLoLkip', 'Общее положение, статьи 1–7 и 11–12. «Российское законодательство X–XX веков», т. 7, с. 37–40');
  const exhibition = source('https://www.shpl.ru/events/exhibition/kak_otmenyali_krepostnoe_pravo/index.html', 'ГПИБ. Выставка о подготовке и осуществлении Крестьянской реформы');
  const julyLetter = source('https://e-history.kz/upload/iblock/125/125e076ccb384f67c663e5f400e3c2be.pdf', 'Письмо ЦК РСДРП(б) от 15 июля 1917 года, документ № 8, с. 36');
  const julyChronicle = source('https://www.prlib.ru/history/619390', 'Президентская библиотека. Хроника июльского политического кризиса в Петрограде');
  const julyDates = 'Июльские дни в Петрограде датируют 3–5 июля (16–18 июля) 1917 года. Массовые демонстрации пришлись на 3–4 июля. В партийном письме от 15 июля решение прекратить демонстрацию отнесено к ночи с 4 на 5 июля. К вечеру 5 июля правительственные войска контролировали центр города. Разоружение и уход из особняка Кшесинской продолжились 6 июля (19 июля).';
  const territorial = 'Артикул 4 Ништадтского договора перечисляет уступленные Швецией Лифляндию, Эстляндию, Ингерманландию и часть Карелии, в том числе Выборг. По артикулу 5 Россия обязалась вернуть занятые земли Финляндии за исключением части, оставленной ей по установленной границе, и выплатить Швеции два миллиона ефимков. Уступка территории и вывод войск после мира — разные условия договора.';
  const research = 'Возьмите два документа из коллекции Северной войны: карту Полтавской битвы для установления места и хода сражения и Ништадтский договор для определения того, когда и на каких условиях окончилась война. Карта относится к событию 1709 года, договор подписан в 1721 году. Сопоставление подтверждает, что победа и заключение мира разделены двенадцатью годами. Для объяснения причин продолжения войны дополнительно сопоставьте учебниковое изложение с документами о состоянии флота и дипломатии.';
  const londonRegime = 'Статья I Лондонского договора 1871 года отменила статьи XI, XIII и XIV Парижского мира и приложенную русско-османскую конвенцию. Статья II сохранила принцип закрытия проливов для военных кораблей с оговорённым правом султана открыть их в мирное время для кораблей дружественных и союзных держав. По статье III Чёрное море оставалось открытым для торговли. В 1870 году Россия заявила об отказе исполнять ограничения, в 1871 году их отменили многосторонним договором.';
  const berlinDate = 'Австрия и Пруссия подписали в Берлине союзный договор 20 апреля 1854 года. Статьи I–II устанавливали взаимные гарантии, а дополнительная статья связывала возможное совместное наступление с оговорёнными действиями России. Само соглашение не было объявлением войны России. В перечне участников его следует учитывать в отдельной графе дипломатических обязательств.';
  const serfRights = 'Статьи 1–2 Общего положения отменяют крепостное право и предоставляют освобождённым права свободных сельских обывателей в установленном порядке. Статьи 3–4 оставляют землю собственностью помещика и устанавливают пользование отведённым наделом за работу или денежный платёж. Статьи 11–12 отдельно регулируют выкуп усадьбы и приобретение полевого надела. Приобретение надела или предусмотренной его части прекращало обязательные поземельные отношения между этими крестьянами и помещиком.';
  const manifestAnalysis = 'Манифест 19 февраля объявляет реформу и объясняет происхождение зависимости прежними законами и обычаем. Для определения конкретного правового положения используйте одновременно изданное Общее положение: начальные статьи различают личные и имущественные права, пользование наделом и приобретение земли в собственность. Оба документа устанавливают нормы. Реальное исполнение в отдельном имении проверяется по уставной грамоте и документам выкупа.';
  const publicHistory = 'На выставке Государственной публичной исторической библиотеки официальные журналы и Манифест помогают исследовать подготовку решений, донесения — их исполнение, а публикации к 50-летию 1911 года — память о реформе. Сопоставление документов выполняет научную задачу, а доступная выставка передаёт проверяемое знание читателю и показывает, как формировалась общественная память.';

  const edits = {
    'peter-foreign-policy': {
      materials: {
        'peter-nystad': {paragraph: territorial, links: [nystad, nystadText]},
        'peter-research': {paragraph: research, links: [poltava, nystad, nystadText]},
      },
      answers: {
        'N03-U12|peter-research': [research, 'Показано исследование двух документов о Северной войне. Для второй части вопроса о Балканах нужен отдельный комплект источников.'],
      },
      practice: ['peter-nystad', 'author-v303-nystad', 'Условия Ништадтского мира',
        'По артикулам 4 и 5 назовите две уступленные Швецией территории и два обязательства России. Укажите, почему вывод войск из Финляндии нельзя записать в список приобретений.', territorial, [nystad, nystadText]],
    },
    'nicholas-crimean': {
      materials: {
        'crimea-source-neutralization': {paragraph: londonRegime, replacePrefix: 'В суждении 3 задания', links: [paris, london]},
        'crimea-source-paris': {paragraph: londonRegime, links: [paris, london]},
        'crimea-source-coalition': {paragraph: berlinDate, links: [berlin]},
      },
      answers: {
        'N04-K04|crimea-source-neutralization': [londonRegime, 'Сопоставлены положения о Чёрном море и проливах.'],
        'N04-U07|crimea-source-coalition': [berlinDate, 'Систематизация дана по действиям и обязательствам государств в ходе войны.'],
      },
      practice: ['crimea-source-neutralization', 'author-v303-black-sea', 'Черноморский режим 1856 и 1871 годов',
        'По статьям двух договоров укажите два ограничения 1856 года, объясните, какой акт отменил их, и назовите условие о торговом мореплавании, которое сохранилось.',
        'Статьи XI и XIII Парижского мира ограничивали присутствие военных кораблей и содержание военно-морских арсеналов. Статья I Лондонского договора 1871 года отменила обе статьи вместе со статьёй XIV и приложенной конвенцией. Статья III оставляла Чёрное море открытым для торгового флота всех наций.', [paris, london]],
    },
    'serfdom-1861': {
      materials: {
        'pilot-serf:freedom': {paragraph: serfRights, links: [statute, statuteText]},
        'pilot-serf:manifest-source': {paragraph: manifestAnalysis, links: [manifesto, statute, statuteText]},
        'pilot-serf:land-redemption': {paragraph: serfRights, links: [statute, statuteText]},
        'pilot-serf:preparation-plan': {paragraph: publicHistory, links: [exhibition]},
      },
      answers: {
        'N04-U11|pilot-serf:manifest-source': [manifestAnalysis, 'Сопоставлены два акта об устройстве реформы. Исполнение в отдельном имении требует местных документов.'],
        'N04-U06|pilot-serf:freedom': [serfRights, 'Фактическое основание оценки — различие личного статуса, пользования землёй и права собственности.'],
        'N04-U08|pilot-serf:freedom': [serfRights, 'Сравнение опирается на перечисленные статьи Общего положения.'],
        'N04-U05|pilot-serf:freedom': [serfRights, 'Показаны главные правовые признаки реформы для помещичьих крестьян.'],
        'N04-U14|pilot-serf:preparation-plan': [publicHistory, 'Пример научной и социальной функций взят из выставки ГПИБ.'],
      },
      practice: ['pilot-serf:manifest-source', 'author-v303-emancipation-law', 'Свобода, пользование наделом и выкуп',
        'По статьям 1–4 и 11–12 Общего положения укажите, что изменилось в личном статусе крестьянина, кому до выкупа принадлежала земля и что прекращалось при приобретении надела в собственность.', serfRights, [manifesto, statute, statuteText]],
    },
    'revolution-1917': {
      materials: {july: {paragraph: julyDates, links: [julyLetter, julyChronicle]}},
      practice: ['july', 'author-v303-july-days', 'Июльские дни и датировка документов',
        'Массовые демонстрации датированы 3–4 июля, а в учебной хронологии Июльские дни — 3–5 июля. Объясните, какое решение относится к ночи на 5 июля, что произошло к вечеру и почему события 6 июля выделены отдельно.', julyDates, [julyLetter, julyChronicle]],
    },
  };

  function appendLinks(existing, links) {
    const seen = new Set(existing.map(entry => entry.url));
    for (const link of links) {
      if (seen.has(link.url)) continue;
      existing.push(link);
      seen.add(link.url);
    }
  }

  function apply(pack, answers) {
    const card = pack.CARD_DATA;
    const review = pack.CARD_CATEGORY_REVIEW;
    const edit = edits[card.topic.id];
    const [itemId, id, title, prompt, answer, links] = edit.practice;
    const item = card.items[itemId];
    if (card.tasks[id]) return;
    item.taskIds.push(id);
    card.tasks[id] = pack.CARD_LEARNING ? {
      id, title: 'Практика · ' + title, kind: 'Авторское упражнение', sourceType: 'author', exerciseOrigin: 'author',
      quote: prompt, sourceUrl: links[0].url, linkScope: title,
      reviewedExerciseAnswer: {answer, sources: [], links, partial: false},
    } : null;

    if (card.topic.id === 'revolution-1917') {
      const category = 'N05-U01';
      const group = card.topic.categories.find(entry => entry.id === category);
      if (!group.items.includes('july')) group.items.push('july');
      if (!review.categories[category].includes('july')) review.categories[category].push('july');
      review.gaps['N05-U11'] = 'Открытый банк подтвердил 37 кратких ответов. Точные федеральные таблицы баллов найдены для 6 из 14 развёрнутых заданий. Остальные разборы имеют указанный в карточке источник и статус.';
    }
    if (card.topic.id === 'serfdom-1861') delete review.gaps['N04-U14'];
    if (!pack.CARD_LEARNING) return;

    for (const [key, material] of Object.entries(edit.materials)) {
      const learning = pack.CARD_LEARNING[key];
      const replaced = material.replacePrefix && learning.paragraphs.findIndex(p => p.startsWith(material.replacePrefix));
      if (Number.isInteger(replaced) && replaced >= 0) learning.paragraphs[replaced] = material.paragraph;
      else learning.paragraphs.push(material.paragraph);
      learning.externalSources ??= [];
      appendLinks(learning.externalSources, material.links);
      const evidence = pack.CARD_PROVENANCE.items[key];
      appendLinks(evidence, material.links.map(link => ({...link, type: 'reference', source: link.title, note: 'Документ, использованный для проверки опубликованного пояснения.'})));
    }

    const updateAnswer = (key, text, gap) => {
      const entry = answers[key];
      if (!entry || !review.categories[entry.category_id]?.includes(entry.item_id)) return;
      entry.text += '\n\n' + text;
      entry.gap = gap;
      entry.coverage_status = 'revised_bounded_answer_with_explicit_scope';
      entry.connection_reviewed_in = 'V303';
    };
    for (const [key, [text, gap]] of Object.entries(edit.answers || {})) updateAnswer(key, text, gap);
    if (card.topic.id !== 'revolution-1917') return;

    card.items.july.dateLabel = '3–5 июля 1917';
    Object.assign(answers['N05-K02|july'], {text: julyDates, supporting_span: julyDates, branch: 'russian_period'});
    answers['N05-U01|july'] = {
      category_id: 'N05-U01', item_id: 'july', question: 'Как различить даты демонстраций и весь период Июльских дней?',
      text: julyDates, supporting_span: julyDates, branch: 'events_dates_stages', official_exam_key: false,
    };
    const krasnov = pack.CARD_LEARNING.krasnov.paragraphs;
    answers['N05-K03|krasnov'] = {
      category_id: 'N05-K03', item_id: 'krasnov', question: 'Кем был П. Н. Краснов и какую роль он сыграл в октябре 1917 года?',
      text: krasnov[0], supporting_span: krasnov[0], branch: 'person_activity', official_exam_key: false,
    };
    answers['N05-U02|krasnov'] = {
      category_id: 'N05-U02', item_id: 'krasnov', question: 'Как документы помогают установить роль Краснова и исход похода?',
      text: krasnov.join(' '), supporting_span: krasnov[0], branch: 'person_contribution', official_exam_key: false,
    };
    const exercise = card.tasks['bank-066B06'];
    const scope = 'В открытом банке и в сторонней публикации варианта от 13 июля 2020 года требуется назвать три мероприятия Временного правительства. Текст вопроса сформулирован по-разному. Шкала 0–2 опубликована для стороннего варианта. Для 066B06 федеральная таблица пока не подтверждена.';
    exercise.reviewNote = scope;
    exercise.reviewedExerciseAnswer.answer = exercise.reviewedExerciseAnswer.answer.split('\n\nПроверка источников.')[0] + '\n\nПроверка источников. ' + scope;
    exercise.sourceReview.note = scope;
    appendLinks(exercise.reviewedExerciseAnswer.links, [source('https://hist-ege.sdamgia.ru/problem?id=26056', 'Сторонняя публикация условия и таблицы. ЕГЭ 13 июля 2020 года')]);
    card.version = 303;
  }

  window.HISTORY303 = {apply};
})();
