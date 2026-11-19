// Проверенные ответы и материалы по внешней политике Петра I.
(() => {
  'use strict';
  const topicId = 'nicholas-crimean';
  const release = {
  "version": "V282",
  "topic": "nicholas-crimean",
  "scope": "Сверка вспомогательных отпечатков материалов по сохранённым выдержкам",
  "updates": {
    "answers": {
      "N04-U07|crimea-source-map-skills": {
        "source_learning_sha256_by_item": {
          "crimea-source-map-skills": "77952674aa9ba86888f360bb5ba99170c2cdb26c6d0a531d917d1988f8a1aace",
          "crimea-source-directions": "e8d11580ec039121ada08d6cb352810fdfd2e8531c8b1b1e889a0747f0bb255d",
          "crimea-source-turkmanchai": "be10fdacfad0bf0f7f999824e5eb9794118d30ee7cadf94304683f91f8988ea5",
          "crimea-source-adrianople": "f6c3fe27668e09610524f7ed199047abeb1f59623c38575c3b7a798f10074eed"
        }
      }
    },
    "materials": {}
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
    if (!answer?.reviewedSourceLinks?.length || !host || host.querySelector('.reviewed-source-links')) return;

    const row = document.createElement('p');
    row.className = 'reviewed-source-pages reviewed-source-links';
    const label = document.createElement('strong');
    label.textContent = 'Проверенные источники: ';
    row.append(label);
    answer.reviewedSourceLinks.forEach((source, index) => {
      if (index > 0) row.append(document.createTextNode(' · '));
      const link = document.createElement('a');
      link.className = 'source-page-link';
      link.href = source.href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = source.label;
      row.append(link);
    });
    host.append(row);
  }

  // Совместимая версия уже отрисовывает эти ссылки в app.js.
  if (!previous && typeof document !== 'undefined' && typeof MutationObserver === 'function') {
    const content = document.getElementById('content');
    if (content) new MutationObserver(renderSources).observe(content, {childList: true, subtree: true});
  }
})();
