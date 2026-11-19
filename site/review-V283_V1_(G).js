// Проверенные ответы и материалы по внешней политике Петра I.
(() => {
  'use strict';
  const topicId = 'serfdom-1861';
  const release = {
  "version": "V283",
  "topic": "serfdom-1861",
  "scope": "Сверка вспомогательных отпечатков материалов по сохранённым выдержкам",
  "updates": {
    "answers": {
      "N04-U05|pilot-serf:crimean-defeat": {
        "source_learning_shas": {
          "pilot-serf:crimean-defeat": "d9dbcd295c00e7ab360faaed52b2c96dfce6139722c75a0f56d9e15b30a4e49b"
        }
      },
      "N04-U08|pilot-serf:kiselev-reform": {
        "source_learning_shas": {
          "pilot-serf:kiselev-reform": "8bdbd2d80a22084799f3e2650c917c53ac07915dff6fda0bc046126e1953ec46",
          "pilot-serf:manifest-1861": "ad55a1be086eaa54e281e351e5687d7c178e20eaa24ae30b107a1bb8dcb85697",
          "pilot-serf:freedom": "bebcce29af54440582dd9b3a5731689df265d051abe4f42bccabc0265d35f75a"
        }
      },
      "N04-U04|pilot-serf:russia-world-emancipation": {
        "source_learning_shas": {
          "pilot-serf:russia-world-emancipation": "933761b744b742895be49135e432b79a94dd385cb03c4cd05b5c997b0b58c1ea",
          "pilot-serf:usa-abolition-1865": "36fbf32b9743c62dfa8425424f8b0dd8b6686f15e1efa7ab328e8514bfecf90a",
          "pilot-serf:labour-market": "40ca55680f1da8ba2ce701fb42b478eb547869d8a06c8add18f7a80a2da56091"
        }
      },
      "N04-U05|pilot-serf:manifest-1861": {
        "source_learning_shas": {
          "pilot-serf:manifest-1861": "ad55a1be086eaa54e281e351e5687d7c178e20eaa24ae30b107a1bb8dcb85697",
          "pilot-serf:regulations": "910b005157be5ecce3c647225c41bd37039c55559247530d01fa573eb6349112",
          "pilot-serf:land-redemption": "b870106c77dcaad386b6d699f173b6141efaef99ba004555eb33eb0f4789dd2c"
        }
      },
      "N04-U05|pilot-serf:secret-committee": {
        "source_learning_shas": {
          "pilot-serf:secret-committee": "7ef3cdfd511b15910208e8eb848fa0b4e72437d564b97ebe4e83d8626a0887dc"
        }
      },
      "N04-U05|pilot-serf:regulations": {
        "source_learning_shas": {
          "pilot-serf:regulations": "910b005157be5ecce3c647225c41bd37039c55559247530d01fa573eb6349112"
        }
      },
      "N04-U05|pilot-serf:commune": {
        "source_learning_shas": {
          "pilot-serf:commune": "f0f1c658f6c04573e6f4f0409f1183bb1e558fff7f743a234f0a8ece620defd3"
        }
      },
      "N04-U05|pilot-serf:approval-chain": {
        "source_learning_shas": {
          "pilot-serf:approval-chain": "7303e2c14bd97b7f8b205a6bba093bbc1c49f9743f80a5285444d5c181c5dd90"
        }
      },
      "N04-U06|pilot-serf:public-opinion": {
        "source_learning_shas": {
          "pilot-serf:public-opinion": "93a89ff793192ea3f834973c4a55903a9bea751ebffb69506a7331260305434a",
          "pilot-serf:commissions": "0268f9458a78e2cafde1889382f4e50fba90b0a69df31a154b322029201d6c3d",
          "pilot-serf:manifest-1861": "ad55a1be086eaa54e281e351e5687d7c178e20eaa24ae30b107a1bb8dcb85697"
        }
      },
      "N04-U14|pilot-serf:preparation-plan": {
        "source_learning_shas": {
          "pilot-serf:preparation-plan": "65bd9f9055c1ff885753ab5b14cb8be85540b9a4f6e2b7e3404b4c68c598c626",
          "pilot-serf:commissions": "0268f9458a78e2cafde1889382f4e50fba90b0a69df31a154b322029201d6c3d",
          "pilot-serf:approval-chain": "7303e2c14bd97b7f8b205a6bba093bbc1c49f9743f80a5285444d5c181c5dd90",
          "pilot-serf:manifest-1861": "ad55a1be086eaa54e281e351e5687d7c178e20eaa24ae30b107a1bb8dcb85697",
          "pilot-serf:kornilov-source": "1114ad395b3f7e89b4255e368701ef26a62ac634b361dd96662d83150de68115"
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
