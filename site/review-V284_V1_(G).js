// Проверенные ответы и материалы по внешней политике Петра I.
(() => {
  'use strict';
  const topicId = 'nicholas-crimean';
  const release = {
  "version": "V284",
  "topic": "nicholas-crimean",
  "scope": "Замена недоступной ссылки на подтверждённый каталог",
  "updates": {
    "answers": {
      "N04-U06|crimea-source-memoirs": {
        "reviewedSourceLinks": [
          {
            "href": "https://www.prlib.ru/history/619698",
            "label": "Президентская библиотека — историк Е. В. Тарле"
          },
          {
            "label": "Е. А. Нарышкина — текст воспоминаний",
            "href": "https://litres.com/book/elizaveta-naryshkina/moi-vospominaniya-pod-vlastu-treh-carey-68510713/read/"
          },
          {
            "label": "НЭБ — издание воспоминаний Е. А. Нарышкиной",
            "href": "https://rusneb.ru/catalog/000199_000009_009651194/"
          },
          {
            "label": "РГБ — выпуски газеты «Колокол»",
            "href": "https://search.rsl.ru/ru/record/01005691189"
          },
          {
            "label": "Скан 157CB8 — фрагмент воспоминаний",
            "href": "https://mo7268523-ctrl.github.io/history-ege-site/assets/crimea-v24/bank-157CB8-V2.webp"
          }
        ]
      },
      "N04-U11|crimea-source-memoirs": {
        "reviewedSourceLinks": [
          {
            "label": "Д. А. Милютин — «Воспоминания. 1843–1856»",
            "href": "https://djvu.online/file/aAS5278Mhl6gV"
          },
          {
            "href": "https://www.prlib.ru/history/619698",
            "label": "Президентская библиотека — историк Е. В. Тарле"
          },
          {
            "label": "Е. А. Нарышкина — текст воспоминаний",
            "href": "https://litres.com/book/elizaveta-naryshkina/moi-vospominaniya-pod-vlastu-treh-carey-68510713/read/"
          },
          {
            "label": "НЭБ — издание воспоминаний Е. А. Нарышкиной",
            "href": "https://rusneb.ru/catalog/000199_000009_009651194/"
          },
          {
            "label": "РГБ — выпуски газеты «Колокол»",
            "href": "https://search.rsl.ru/ru/record/01005691189"
          },
          {
            "label": "Скан 157CB8 — фрагмент воспоминаний",
            "href": "https://mo7268523-ctrl.github.io/history-ege-site/assets/crimea-v24/bank-157CB8-V2.webp"
          }
        ]
      }
    },
    "materials": {}
  },
  "source_url_replacements": {
    "https://old.bigenc.ru/world_history/text/4182916": {
      "href": "https://www.prlib.ru/history/619698",
      "label": "Президентская библиотека — историк Е. В. Тарле"
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
