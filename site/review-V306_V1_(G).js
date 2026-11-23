(() => {
  'use strict';
  const previous = window.HISTORY303.apply;
  const notes = [
  [
    "peter-art-azov",
    [
      "N03-U03",
      "N03-U11"
    ],
    "Гравюра Шхонебека в учебнике и каталогах",
    "На с. 17 учебника указан Государственный Русский музей. В его каталоге есть экземпляр гравюры 1699 года, инв. Гр.-32261. Экземпляр РНБ с отдельным шифром позволяет сравнить композицию. В англоязычной работе о повести о взятии Азова тот же сюжет Шхонебека рассмотрен на примере рукописи Q.XVII.46 (ил. 1). Это документированный пример научного обращения к изображению.",
    [
      "https://rusmuseumvrm.ru/data/collections/engraving/gr.-32261/index.php",
      "https://www.academia.edu/37067204/The_Tale_of_the_Siege_of_Azov_by_Peter_I_in_1696_Povest_o_vziatii_Azova_Petrom_I_v_1696_"
    ],
    [
      "Русский музей · запись Гр.-32261",
      "Повесть о взятии Азова · ил. 1"
    ]
  ],
  [
    "peter-art-petersburg",
    [
      "N03-U03",
      "N03-U11"
    ],
    "Где воспроизводится картина Добровольского",
    "На с. 35 учебника указаны Центральный военно-морской музей и 1880 год. В английском каталоге художественных репродукций можно узнать ту же композицию по фигуре Петра и пейзажу. Карточка № 1313996 указывает тот же музей и 1880 год. Она подтверждает доступность репродукции зарубежному читателю. В музейном сборнике на с. 97 основной текст даёт 1880 год, подпись к изображению — 1883.",
    [
      "https://www.meisterdrucke.uk/fine-art-prints/Nikolai-Florianovich-Dobrovolsky/1313996/Here%2C-a-City-Will-Be-Built.-Tsar-Peter-the-Great.html",
      "https://pushkinland.ru/2018/lib/mp/mp93.pdf"
    ],
    [
      "Англоязычный каталог репродукций · № 1313996",
      "Музейный сборник · с. 97"
    ]
  ],
  [
    "peter-caspian",
    [
      "N03-U10"
    ],
    "Как сопоставить карту и договор",
    "Масштаб врезки — 1:18 000 000. Оранжевым отмечены территории по Петербургскому договору 1723 года, штриховкой — земли, занятые Османской империей в 1723–1725 годах. Линию разграничения 1724 года проверяем по тексту трактата. Дорогу от Шемахи к морю делили на три части: две прибрежные части отходили к российской стороне, треть со стороны Шемахи — под власть хана при покровительстве Порты. Другой ориентир — слияние Куры и Аракса. Штриховка на карте показывает занятие территории, а не точное прохождение границы.",
    [
      "assets/source-v233/caspian-inset-1723-1725.webp"
    ],
    [
      "Картографическая врезка с масштабом и легендой"
    ]
  ],
  [
    "crimea-source-art-memory",
    [
      "N04-U03",
      "N04-U11",
      "N04-U13"
    ],
    "Проверка ответа 5C8425",
    "В открытом банке ФИПИ по точному номеру 5C8425 введён ответ 34. Банк поставил отметку «ВЕРНО». Вопрос относится к обложкам журналов 1950-х годов. С Крымской войной его связывает общий стимул — юбилейная марка с П. С. Нахимовым.",
    [
      "https://ege.fipi.ru/bank/index.php?proj=068A227D253BA6C04D0C832387FD0D89"
    ],
    [
      "Открытый банк ФИПИ · история, поиск по номеру 5C8425"
    ]
  ]
];
  const proof = {
  "task_number": "5C8425",
  "submitted": "34",
  "status": "ВЕРНО",
  "captured_at": "2026-11-23T10:16:35.899Z",
  "source": "https://ege.fipi.ru/bank/index.php?proj=068A227D253BA6C04D0C832387FD0D89",
  "scope": "Обложки 3 и 4 из того же десятилетия, что юбилейная марка."
};

  const clarify = text => text
    .replace('авторский ответ 34', 'подтверждённый банком ответ 34')
    .replace('Распространение именно этого оттиска за границей отдельно не прослежено.', 'Судьба отдельных физических оттисков различается.')
    .replace('судьба самой картины требует отдельного источника.', 'сама картина также воспроизводится в англоязычном каталоге.');
  window.HISTORY303.apply = function apply(pack, answers) {
    previous(pack, answers);
    if (!answers || !pack.CARD_LEARNING) return;
    const task = pack.CARD_DATA.tasks[proof.task_number];
    if (task && !task.bankVerification) {
      task.bankVerification = proof;
      task.transcriptionNote += ' Открытый банк подтвердил ответ 34.';
      Object.assign(task.semantic_review, {version:'V306',status:'answer_accepted_by_open_bank',bank_verification:proof});
      const review = task.reviewedExerciseAnswer;
      review.reviewed_in = 'V306';
      review.answer = review.answer.replace('Это авторское решение; отдельный официальный ключ ФИПИ не получен.', 'Ответ 34 принят открытым банком ФИПИ. Отметка банка — «ВЕРНО».');
      review.links.push({url:proof.source,title:'Открытый банк ФИПИ · 5C8425'});
    }
    for (const [id, categories, heading, text, urls, titles] of notes) {
      const item = pack.CARD_LEARNING[id];
      if (!item) continue;
      if (!item.paragraphs.includes(text)) {
        item.paragraphs = item.paragraphs.map(clarify);
        item.paragraphs.push(text);
        if (item.sections) {
          for (const part of item.sections) if (part.text) part.text = clarify(part.text);
          item.sections.push({heading,text});
        }
        item.externalSources ??= [];
        urls.forEach((url,i) => {
          if (!item.externalSources.some(s => s.url === url)) item.externalSources.push({url,title:titles[i]});
        });
      }
      for (const category of categories) {
        const a = answers[category+'|'+id];
        if (!a || a.connection_reviewed_in === 'V306') continue;
        a.text = clarify(a.text)+'\n\n'+text;
        if (a.sections?.length) {
          for (const part of a.sections) if (part.text) part.text = clarify(part.text);
          a.sections.push({heading,text});
        }
        a.review_sources ??= [];
        urls.forEach((url,i) => {if (!a.review_sources.some(s => s.url === url)) a.review_sources.push({url,title:titles[i]});});
        const unresolved = id === 'peter-art-petersburg' && category === 'N03-U11';
        a.gap = unresolved ? 'Для разрешения расхождения 1880/1883 нужен инвентарный паспорт картины.' : '';
        a.coverage_status = unresolved ? 'bounded_answer_with_explicit_gap' : 'revised_bounded_answer_with_explicit_scope';
        a.connection_reviewed_in = 'V306';
        if (id === 'crimea-source-art-memory') a.review_scope = 'Сопоставлены оригиналы обложек и отметка открытого банка для ответа 34.';
      }
    }
  };
})();
