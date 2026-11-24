(() => {
  'use strict';
  const previous = window.HISTORY303.apply;
  const paintingId = 'peter-art-petersburg';
  const pamphletId = 'crimea-source-pushkin-poems';
  const academicEdition = 'https://feb-web.ru/feb/pushkin/texts/push17/vol03/y32-b23-.htm?cmd=p';
  const manuscriptCatalogue = 'https://lib.pushkinskijdom.ru/LinkClick.aspx?fileticket=a5fXmMQ171o%3D&tabid=10183';
  const pamphletHeading = 'Первые публикации и авторская правка';
  const pamphletNote = 'В академическом собрании указаны страницы первого издания: «Клеветникам России» — 7–9, «Бородинская годовщина» — 11–15. Описание Пушкинского Дома фиксирует печатные листы со страницами 7–15 и различает авторские исправления и помету неизвестной рукой. Эти документы позволяют установить место обоих текстов в брошюре и различить печатный текст и рукописную правку. Для сверки каждого листа нужен полный цифровой экземпляр издания 1831 года.';
  const dating = [
    ['создана в 1880 году о сюжете', 'датирована 1880 годом в учебнике и изображает сюжет'],
    ['создана в 1880 году.', 'датирована 1880 годом в учебнике.'],
    ['заложён» 1880 года', 'заложён» (1880 год по учебнику)'],
    ['на картине 1880 года.', 'на картине, датированной учебником 1880 годом.'],
    ['картина Добровольского — 1880 год —', 'картина Добровольского — 1880 год по учебнику —'],
    ['1703, 1833 и 1880 годы', '1703, 1833 и 1880 годы (дата полотна по учебнику)'],
    ['В музейном сборнике на с. 97 основной текст', 'В музейном сборнике на с. 97–98 основной текст'],
    ['В музейном сборнике на с. 97 подпись к репродукции даёт 1883 год, а авторский текст', 'В музейном сборнике подпись на с. 97 даёт 1883 год, а авторский текст на с. 98'],
  ];

  function qualifyDate(text) {
    return dating.reduce((value, [before, after]) => value.replaceAll(before, after), text);
  }

  function qualifyAnswer(answer) {
    answer.text = qualifyDate(answer.text);
    for (const section of answer.sections ?? []) {
      if (section.text) section.text = qualifyDate(section.text);
    }
  }

  function addSource(sources, url, title) {
    if (!sources.some(source => source.url === url)) sources.push({url, title});
  }

  window.HISTORY303.apply = function apply(pack, answers) {
    previous(pack, answers);
    if (!answers || !pack.CARD_LEARNING) return;
    const painting = pack.CARD_LEARNING[paintingId];
    if (painting) {
      const element = pack.CARD_DATA.items[paintingId];
      element.dateLabel = '1880 по учебнику';
      element.tag = element.dateLabel;
      painting.paragraphs = painting.paragraphs.map(qualifyDate);
      for (const section of painting.sections ?? []) {
        if (section.text) section.text = qualifyDate(section.text);
      }
      const artwork = pack.CARD_MEDIA.assets['dobrovolsky-petersburg'];
      artwork.caption = qualifyDate(artwork.caption);
      for (const [key, answer] of Object.entries(answers)) {
        if (key.endsWith('|' + paintingId)) qualifyAnswer(answer);
      }
    }

    const pamphlet = pack.CARD_LEARNING[pamphletId];
    if (!pamphlet || pamphlet.paragraphs.includes(pamphletNote)) return;
    pamphlet.paragraphs.push(pamphletNote);
    pamphlet.sections.push({heading:pamphletHeading, text:pamphletNote});
    pamphlet.externalSources ??= [];
    addSource(pamphlet.externalSources, academicEdition, 'Академическое собрание · страницы первых публикаций');
    addSource(pamphlet.externalSources, manuscriptCatalogue, 'Пушкинский Дом · л. 59–63 рукописного собрания');
    const answer = answers['N04-U11|' + pamphletId];
    if (!answer) return;
    answer.text += '\n\n' + pamphletNote;
    answer.sections?.push({heading:pamphletHeading, text:pamphletNote});
    answer.review_sources ??= [];
    addSource(answer.review_sources, academicEdition, 'Академическое собрание · страницы первых публикаций');
    addSource(answer.review_sources, manuscriptCatalogue, 'Пушкинский Дом · л. 59–63');
    answer.connection_reviewed_in = 'V307';
    answer.gap = 'Открытый полный цифровой экземпляр брошюры 1831 года для полистной сверки не найден.';
  };
})();
