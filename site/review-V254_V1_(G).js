// V254. Проверка связей и первичных источников ответа о Симодском трактате.
(() => {
  'use strict';
  const KEY = 'N04-U10|crimea-source-shimoda';
  const updates = {
    [KEY]: {
      text: 'Разделим пространственную и временную связь. В пространстве статья II Симодского трактата 1855 г. проводила границу между Итурупом и Урупом: Итуруп относился к Японии, Уруп и острова к северу — к России; Сахалин оставался неразделённым. Открытие Симоды, Хакодате и Нагасаки для ремонта и снабжения создавало отдельную систему портовых отношений; обмен товарами предусматривался в первых двух портах. Следовательно, территориальное разграничение, обслуживание судов и торговые права — разные результаты одного договора. Во времени исследование Невельским Сахалина в 1849 г. и основание Николаевского поста в 1850 г. предшествуют договору 1855 г. и относятся к тому же царствованию Николая I. Российский полномочный при подписании — Е. В. Путятин. Само соседство этих событий в хронологии не доказывает, что экспедиция непосредственно вызвала каждое договорное решение. Договор подписан 26 января (7 февраля) 1855 г. при Николае I. Его заключительная формула указывала обязательную силу статей со дня подписи; обмен ратификациями состоялся 25 ноября (7 декабря) 1856 г., уже при Александре II. Поэтому подписание, действие статей по тексту договора и обмен ратификациями нужно различать. Договоры 1858, 1860 и 1875 гг. относятся к Александру II и не выдаются за результаты правления Николая I.',
      source_learning_sha256: '686e11c54491dea418b28d4d5a448e4b762f63f6564b276e3fff653223c2babc',
      source_item_sha256: 'bec4e2f197dfaa80d2726d77fe40f7ef3aced11096c09b870c0b5413b43e7a30',
      source_learning_shas: {
        'crimea-source-shimoda': '686e11c54491dea418b28d4d5a448e4b762f63f6564b276e3fff653223c2babc',
        'crimea-source-directions': 'e8d11580ec039121ada08d6cb352810fdfd2e8531c8b1b1e889a0747f0bb255d'
      },
      source_learning_sha256_by_item: {
        'crimea-source-shimoda': '686e11c54491dea418b28d4d5a448e4b762f63f6564b276e3fff653223c2babc',
        'crimea-source-directions': 'e8d11580ec039121ada08d6cb352810fdfd2e8531c8b1b1e889a0747f0bb255d'
      },
      connection_reviewed_in: 'V254',
      reviewedSourceLinks: [
        {label: 'Архивный экземпляр АВПРИ', href: 'https://www.prlib.ru/node/375717'},
        {label: 'Публикация договора 1857 г.', href: 'https://dspace.nplg.gov.ge/bitstream/1234/219937/1/Kavkaz_1857_N35.pdf'},
        {label: 'Японский текст и даты', href: 'https://worldjpn.net/documents/texts/pw/18550207.T1J.html'},
        {label: 'Справка МИД Японии', href: 'https://www.mofa.go.jp/mofaj/annai/honsho/shiryo/qa/bakumatsu_01.html'}
      ]
    }
  };
  function apply(pack, answers) {
    if (!answers) return;
    for (const [key, changes] of Object.entries(updates)) {
      if (Object.hasOwn(answers, key)) Object.assign(answers[key], structuredClone(changes));
    }
  }
  window.HISTORY254 = {version: 'V254', apply};
  function installAfterV253() {
    if (!window.HISTORY253 || window.HISTORY253.v254Installed) return false;
    const previousApply = window.HISTORY253.apply;
    window.HISTORY253.apply = (pack, answers) => {
      previousApply(pack, answers);
      apply(pack, answers);
    };
    window.HISTORY253.v254Installed = true;
    apply(null, window.CARD_REVIEWED_APPLICATIONS?.answers);
    return true;
  }
  function installReviewedSourceLinks() {
    if (typeof document === 'undefined' || typeof MutationObserver === 'undefined') return;
    const render = () => {
      if (!location.hash.includes('/category/N04-U10/item/crimea-source-shimoda')) return;
      const host = document.querySelector('.category-application');
      if (!host || host.querySelector('.reviewed-source-links')) return;
      const answer = window.CARD_REVIEWED_APPLICATIONS?.answers?.[KEY];
      if (!answer?.reviewedSourceLinks?.length) return;
      const row = document.createElement('p');
      row.className = 'reviewed-source-pages reviewed-source-links';
      const label = document.createElement('strong');
      label.textContent = 'Проверенные источники: ';
      row.append(label);
      answer.reviewedSourceLinks.forEach((source, index) => {
        if (index) row.append(document.createTextNode(' · '));
        const link = document.createElement('a');
        link.className = 'source-page-link';
        link.href = source.href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = source.label;
        row.append(link);
      });
      host.append(row);
    };
    new MutationObserver(render).observe(document.documentElement, {childList: true, subtree: true});
    addEventListener('hashchange', render);
    render();
  }
  installReviewedSourceLinks();
  if (typeof setInterval === 'function') {
    const installTimer = setInterval(() => {
      if (installAfterV253()) clearInterval(installTimer);
    }, 100);
    if (typeof setTimeout === 'function') setTimeout(() => clearInterval(installTimer), 60000);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installAfterV253, {once: true});
  } else {
    installAfterV253();
  }
  apply(null, window.CARD_REVIEWED_APPLICATIONS?.answers);
})();
