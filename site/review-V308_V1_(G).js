(() => {
  'use strict';
  const previous = window.HISTORY303.apply;
  const openVariant = 'https://100ballnik.com/wp-content/uploads/2024/04/variant1-istoria-ege2024-fipi.pdf#page=9';
  const variantTitle = 'Открытый вариант КИМ ЕГЭ 2024 · задание 20, с. 9 (копия)';
  const variantNote = 'Формулировка дословно совпадает с открытым вариантом КИМ ЕГЭ 2024, задание 20, с. 9. Копия содержит условие. Таблица на 0–3 балла подтверждена для регионального варианта; федеральная таблица к открытому варианту 2024 пока не найдена.';

  window.HISTORY303.apply = function apply(pack, answers) {
    previous(pack, answers);
    if (!answers || pack.CARD_DATA.topic.id !== 'revolution-1917') return;

    const universal = pack.CARD_MEDIA.assets['second-universal'];
    universal.sourceTitle = '«Русская воля», 6 (19) июля 1917, № 158';
    universal.page = 2;

    const task = pack.CARD_DATA.tasks['bank-8FD45A'];
    task.reviewNote = variantNote;
    task.sourceReview.note = variantNote;
    const links = task.reviewedExerciseAnswer.links;
    if (!links.some(link => link.url === openVariant)) {
      links.push({url: openVariant, title: variantTitle});
    }
  };
})();
