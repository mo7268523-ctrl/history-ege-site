// Проверенные ответы и материалы по внешней политике Петра I.
(() => {
  'use strict';
  const topicId = 'nicholas-crimean';
  const release = {
  "version": "V285",
  "topic": "nicholas-crimean",
  "scope": "Учебная карта обороны Севастополя и независимый исторический план",
  "updates": {
    "answers": {
      "N04-U13|crimea-source-bastion": {
        "reviewedSourceLinks": [
          {
            "label": "Скан учебника, с. 62 — линия укреплений",
            "href": "https://mo7268523-ctrl.github.io/history-ege-site/assets/crimea-v24/textbook-p62.webp"
          },
          {
            "label": "Скан учебника, с. 61 — карта обороны",
            "href": "https://mo7268523-ctrl.github.io/history-ege-site/assets/crimea-v24/textbook-p61.webp"
          },
          {
            "href": "https://commons.wikimedia.org/wiki/File:Sevastopol,_sketch_of_the_Mamelon_and_new_Russian_defences,_with_the_siege_works_of_the_allies_LOC_79693422.jpg",
            "label": "План Вогана от 20 марта 1855 года — цифровая копия Библиотеки Конгресса"
          }
        ],
        "text": "Сопоставьте текст на с. 62 с картой на с. 61. Красным знаком обозначены укрепления защитников, фиолетовыми знаками — позиции и осадные сооружения союзников. На учебной карте найдите Балаклаву и Инкерман по отметкам 1854 года, район Чоргуна на Чёрной — по отметке 1855 года. План Вогана от 20 марта 1855 года детализирует участок осады: на нём подписаны Малахов курган, Корнилов бастион, Мамелон и Редан. В легенде плана отдельно обозначены русские, французские и британские работы. Для сравнения сначала найдите общий ориентир — Малахов курган, затем прочитайте легенду каждой карты. Номера отдельных бастионов и даты боёв определяйте по источникам, где эти сведения явно подписаны."
      }
    },
    "materials": {}
  },
  "source_url_replacements": {
    "https://www.prlib.ru/item/975104": {
      "href": "https://commons.wikimedia.org/wiki/File:Sevastopol,_sketch_of_the_Mamelon_and_new_Russian_defences,_with_the_siege_works_of_the_allies_LOC_79693422.jpg",
      "label": "План Вогана от 20 марта 1855 года — цифровая копия Библиотеки Конгресса"
    }
  }
};
  const tables = release.updates;

  function apply(pack, answers) {
    if (pack?.CARD_DATA?.topic?.id !== topicId || !answers) return;
    for (const [id, material] of Object.entries(tables.materials)) {
      Object.assign(pack.CARD_LEARNING[id], structuredClone(material));
    }
    for (const [key, answer] of Object.entries(tables.answers)) {
      if (Object.hasOwn(answers, key)) Object.assign(answers[key], structuredClone(answer));
    }
  }

  window['HISTORY' + release.version.slice(1)] = {version: release.version, apply};

  function wrapLoader(previous) {
    const previousApply = previous.apply;
    previous.apply = (pack, answers) => {
      previousApply(pack, answers);
      apply(pack, answers);
    };
  }

  const previous = window.HISTORY253;
  if (previous) {
    apply(window.CARD_TOPICS?.[topicId], window.CARD_REVIEWED_APPLICATIONS?.answers);
  } else {
    // При ленивой загрузке загрузчик объявляет V253 до чтения пакетов тем.
    const earlier = Object.getOwnPropertyDescriptor(window, 'HISTORY253');
    Object.defineProperty(window, 'HISTORY253', {
      configurable: true,
      set(loader) {
        if (earlier?.set) {
          earlier.set.call(window, loader);
        } else {
          Object.defineProperty(window, 'HISTORY253', {
            configurable: true, enumerable: true, writable: true, value: loader
          });
        }
        wrapLoader(loader);
      }
    });
  }

  function renderSources() {
    const route = location.hash.split('/');
    if (route[1] !== 'topic' || route[2] !== topicId || route[3] !== 'category' ||
        route[5] !== 'item' || route.length !== 7) return;
    const key = route[4] + '|' + route[6];
    const answer = tables.answers[key];
    const host = document.querySelector('#content .category-application');
    if (!answer || !host) return;
    for (const link of host.querySelectorAll('.reviewed-source-links a')) {
      const replacement = release.source_url_replacements[link.getAttribute('href')];
      if (!replacement) continue;
      link.href = replacement.href;
      link.textContent = replacement.label;
    }
  }

  // Совместимая версия уже отрисовывает эти ссылки в app.js.
  if (!previous && typeof document !== 'undefined' && typeof MutationObserver === 'function') {
    const content = document.getElementById('content');
    if (content) new MutationObserver(renderSources).observe(content, {childList: true, subtree: true});
  }
})();
