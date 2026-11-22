window.HISTORY294 = {"version":"V294","files":["optimized-v243a/revolution-1917-v294-0.js","optimized-v243a/revolution-1917-v294-1.js","optimized-v243a/revolution-1917-v294-2.js","optimized-v243a/revolution-1917-v294-3.js"],"regionsTask":"author-1917-march-regions","crimea":{"item":"crimea-source-turkish-war","note":"Сверка дат. На с. 2 Навигатора ФИПИ-2026 в обзорном абзаце для русско-турецкой войны указаны 1827–1828 годы. Хронологический перечень того же документа на с. 5 даёт 1828–1829 годы. Последняя датировка совпадает с документами об объявлении войны и заключении Адрианопольского мира. Наваринское сражение 1827 года рассматривается как предшествующее событие.","links":[{"url":"https://doc.fipi.ru/navigator-podgotovki/navigator-ege/2026/is-4-istorija-rossii-do-1914.pdf","title":"ФИПИ. Навигатор подготовки по истории России до 1914 года. Описание на с. 2 и хронология на с. 5"},{"url":"https://www.prlib.ru/section/2212562","title":"Президентская библиотека. Документы войны 1828–1829 годов и Адрианопольского договора"},{"url":"https://www.prlib.ru/node/619539","title":"Президентская библиотека. Подписание Адрианопольского договора 2 (14) сентября 1829 года"}]}};
(() => {
  const revision = window.HISTORY294;
  const previous = window.HISTORY293;
  previous.files = revision.files;
  const summary = previous.summary.CARD_DATA;
  summary.items.regions.taskIds.push(revision.regionsTask);
  summary.tasks[revision.regionsTask] = null;
  const applyPrevious = previous.apply;
  previous.apply = (pack, answers) => {
    applyPrevious(pack, answers);
    if (pack.CARD_DATA.topic.id !== 'nicholas-crimean') return;
    const patch = revision.crimea;
    const material = pack.CARD_LEARNING[patch.item];
    if (material.paragraphs.includes(patch.note)) return;
    material.paragraphs.push(patch.note);
    material.sections.push({heading: 'Даты в Навигаторе ФИПИ', text: patch.note});
    material.supplementalSources.push(...patch.links);
  };
})();
