'use strict';
let D=window.CARD_DATA;
let L=window.CARD_LEARNING;
let P=window.CARD_PROVENANCE || {};
// Порядок и цвета оснований задаются интерфейсом; отсутствие записи не является отрицательным результатом проверки.
const ORIGIN_TYPES={fipi:{label:'ФИПИ: прямо названо',color:'#fde8e7'},exam:{label:'Задания и банк',color:'#e6f5e9'},reference:{label:'Справочники',color:'#fff6d9'},logic:{label:'Анализ учебника',color:'#f3ebfa'}};
const ORIGIN_ORDER=Object.keys(ORIGIN_TYPES);
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let topicPath=`#/topic/${D.topic.id}`;
function activateTopic(id){const pack=window.CARD_TOPICS?.[id];if(!pack)return false;for(const key of window.CARD_TOPIC_KEYS)window[key]=pack[key];D=window.CARD_DATA;L=window.CARD_LEARNING;P=window.CARD_PROVENANCE;topicPath=`#/topic/${D.topic.id}`;return true;}
function pageSrc(n){return D.book.pageImages?.[n]||(D.topic.id==='peter-foreign-policy'?`assets/peter-v24/page-${n}.webp`:D.topic.id==='nicholas-crimean'?`assets/crimea-v24/textbook-p${n}.webp`:`assets/page-${n}.webp`);}
const categoryPath=id=>`${topicPath}/category/${id}`;
const itemPath=(cat,id)=>`${categoryPath(cat)}/item/${id}`;
const practicePath=(cat,id)=>`${itemPath(cat,id)}/practice`;
const blockClass=c=>c.block==='ЗНАТЬ'?'know':'skill';
const plural=(n,a,b,c)=>n%10===1&&n%100!==11?a:n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?b:c;
const countLabel=n=>`${n} ${plural(n,'элемент','элемента','элементов')}`;
const badge=c=>`<span class="badge ${blockClass(c)}">${c.block}</span>`;
// Списки знаний показывают атомарные записи; старые адреса остаются действующими.
function visibleItems(cat){const ids=[...new Set(window.CARD_CATEGORY_REVIEW?.categories[cat.id]||cat.items)];return window.CARD_UI?window.CARD_UI.sort(ids,cat,D,origins):ids;}
function oldContext(cat,it){if(!it.pilot)return '';const original=window.CARD_PILOT.items.find(x=>x.id===it.id)?.old_id||(it.id==='pilot-serf:redemption-payments-term'?'redemption':null);if(!original)return '';const candidates=D.topic.categories.filter(c=>c.items.includes(original));const source=candidates.find(c=>c.block==='УМЕТЬ')||candidates[0];return source?`<p class="legacy-context">Дополнительный материал: <a href="${itemPath(source.id,original)}">открыть прежний разбор и связанные задания →</a></p>`:'';}
function route(){const p=location.hash.replace(/^#\/?/,'').split('/');if(p[0]==='topic')activateTopic(p[1]);if(p[0]!=='topic'||p[1]!==D.topic.id)return {level:1};const cat=D.topic.categories.find(c=>c.id===p[3]);if(!cat||p[2]!=='category')return {level:2};const it=D.items[p[5]];if(p[4]==='item'&&it&&cat.items.includes(it.id))return {level:p[6]==='practice'?5:4,cat,item:it};return {level:3,cat};}
function go(path){window.CARD_UI?.capture();if(location.hash===path)render();else location.hash=path;}
function breadcrumbs(r){let links=[['Темы','#/themes']];if(r.level>1)links.push([D.topic.name,topicPath]);if(r.cat)links.push([r.cat.name,categoryPath(r.cat.id)]);if(r.item)links.push([r.item.title,itemPath(r.cat.id,r.item.id)]);if(r.level===5)links.push(['Задания',practicePath(r.cat.id,r.item.id)]);$('#breadcrumbs').innerHTML=links.map(([label,path],i)=>`${i?'<span class="crumb-separator" aria-hidden="true">/</span>':''}${i===links.length-1?`<span class="current" aria-current="page">${esc(label)}</span>`:`<a href="${path}">${esc(label)}</a>`}`).join('');$('#steps').innerHTML=['Тема','Категория','Элемент','Материал','Задания'].map((name,i)=>{const completed=r.level>i+1;const path=i===0?'#/themes':i===1?topicPath:i===2&&r.cat?categoryPath(r.cat.id):i===3&&r.item?itemPath(r.cat.id,r.item.id):null;const body=`<span class="step-num">${completed?'✓':i+1}</span><span class="step-name">${name}</span>`;return `<div class="step ${r.level===i+1?'active':completed?'done':''}" ${r.level===i+1?'aria-current="step"':''}>${completed&&path?`<a href="${path}">${body}</a>`:body}</div>`;}).join('');}
function back(path,label){return `<button class="back-button" data-go="${path}"><span aria-hidden="true">←</span> ${label}</button>`;}
function official(cat){return `<details class="official-details"><summary>Категория ФИПИ: формулировка и источник</summary><p>${esc(cat.official)}</p>${window.CARD_CATEGORY_SOURCE_NOTES?.[cat.id]?`<p class="task-scope-note">${esc(window.CARD_CATEGORY_SOURCE_NOTES[cat.id])}</p>`:''}<div class="official-criteria"><b>Как применяется в этой карточке</b><p>${esc(window.CARD_CATEGORY_RULES[cat.id])}</p><small>Правила отнесения составлены редакторски по официальной формулировке.</small></div><a href="${esc(typeof cat.fipiSource==='string'?cat.fipiSource:cat.fipiSource?.url||'')}" target="_blank" rel="noopener noreferrer">Навигатор ФИПИ, 2026 <span aria-hidden="true">↗</span></a></details>`;}
function releaseMenu238() {
  const seen = new Set(), links = [];
  for (const target of window.HISTORY238?.targets || []) {
    if (seen.has(target.number)) continue;
    const pack = window.CARD_TOPICS[target.topic];
    const item = Object.values(pack.CARD_DATA.items).find(item =>
      item.taskIds.includes(target.task) && pack.CARD_DATA.topic.categories.some(cat => cat.items.includes(item.id)));
    if (!item) continue;
    const cat = pack.CARD_DATA.topic.categories.find(cat => cat.items.includes(item.id));
    const url = `#/topic/${target.topic}/category/${cat.id}/item/${item.id}/practice/${target.task}`;
    const task = pack.CARD_DATA.tasks[target.task];
    links.push(`<li><a href="${esc(url)}">${esc(task.title)} · ${esc(pack.CARD_DATA.topic.name)}</a></li>`);
    seen.add(target.number);
  }
  return `<details class="release237"><summary>Проверка V238 · ${links.length} заданий</summary><p>Проверено соответствие ответов условиям. К заданию о Разине добавлен разбор всех шести суждений; исправлено объяснение даты на жетоне. Авторский разбор и официальный ключ различаются в карточке задания.</p><ul>${links.join('')}</ul></details>`;
}
function releaseMenu239() {
  const seen = new Set(), links = [];
  for (const target of window.HISTORY239?.targets || []) {
    if (seen.has(target.number)) continue;
    const pack = window.CARD_TOPICS[target.topic];
    const item = Object.values(pack.CARD_DATA.items).find(item =>
      item.taskIds.includes(target.task) && pack.CARD_DATA.topic.categories.some(cat => cat.items.includes(item.id)));
    if (!item) continue;
    const cat = pack.CARD_DATA.topic.categories.find(cat => cat.items.includes(item.id));
    const url = `#/topic/${target.topic}/category/${cat.id}/item/${item.id}/practice/${target.task}`;
    const task = pack.CARD_DATA.tasks[target.task];
    links.push(`<li><a href="${esc(url)}">${esc(task.title)} · ${esc(pack.CARD_DATA.topic.name)}</a></li>`);
    seen.add(target.number);
  }
  return `<details class="release237"><summary>Новая проверка V239 · ${links.length} заданий</summary><p>Сверены оригиналы и исторические основания следующих 15 номеров очереди. Для сочинений разобраны требования выбранного варианта. Авторский разбор и официальный ключ различаются в карточке задания.</p><ul>${links.join('')}</ul></details>`;
}
function releaseMenu240() {
  const seen = new Set(), links = [];
  for (const target of window.HISTORY240?.targets || []) {
    if (seen.has(target.number)) continue;
    const pack = window.CARD_TOPICS[target.topic];
    const item = Object.values(pack.CARD_DATA.items).find(item =>
      item.taskIds.includes(target.task) && pack.CARD_DATA.topic.categories.some(cat => cat.items.includes(item.id)));
    if (!item) continue;
    const cat = pack.CARD_DATA.topic.categories.find(cat => cat.items.includes(item.id));
    const url = `#/topic/${target.topic}/category/${cat.id}/item/${item.id}/practice/${target.task}`;
    const task = pack.CARD_DATA.tasks[target.task];
    links.push(`<li><a href="${esc(url)}">${esc(task.title)} · ${esc(pack.CARD_DATA.topic.name)}</a></li>`);
    seen.add(target.number);
  }
  return `<details class="release237"><summary>Новая проверка V240 · ${links.length} заданий</summary><p>Сверены оригиналы и исторические основания следующих 9 номеров очереди. Для сочинений разобраны требования выбранного варианта. Авторский разбор и официальный ключ различаются в карточке задания.</p><ul>${links.join('')}</ul></details>`;
}
function releaseMenu241() {
  const seen = new Set(), links = [];
  for (const target of window.HISTORY241?.targets || []) {
    if (seen.has(target.number)) continue;
    const pack = window.CARD_TOPICS[target.topic];
    const item = Object.values(pack.CARD_DATA.items).find(item =>
      item.taskIds.includes(target.task) && pack.CARD_DATA.topic.categories.some(cat => cat.items.includes(item.id)));
    if (!item) continue;
    const cat = pack.CARD_DATA.topic.categories.find(cat => cat.items.includes(item.id));
    const url = `#/topic/${target.topic}/category/${cat.id}/item/${item.id}/practice/${target.task}`;
    const task = pack.CARD_DATA.tasks[target.task];
    links.push(`<li><a href="${esc(url)}">${esc(task.title)} · ${esc(pack.CARD_DATA.topic.name)}</a></li>`);
    seen.add(target.number);
  }
  return `<details class="release237"><summary>Новая проверка V241 · ${links.length} задание</summary><p>Задание 584020: разобраны все пять суждений о марке с Нахимовым. Современный статус Севастополя пояснён отдельно; официальный ключ не получен.</p><ul>${links.join('')}</ul></details>`;
}
function releaseMenu237() {
  const pack = window.HISTORY237;
  const seen = new Set();
  const links = [];
  for (const targets of Object.values(pack.targets)) {
    for (const target of Object.values(targets)) {
      if (seen.has(target.number)) continue;
      seen.add(target.number);
      links.push('<li><a href="'+esc(target.url)+'">'+esc(pack.records[target.number].title)+
        ' · '+esc(target.number)+'</a></li>');
    }
  }
  return '<details class="release237"><summary>Обновлённые задания · '+links.length+
    '</summary><ul>'+links.join('')+'</ul></details>';
}
function focusExercise237(route) {
  if (route.level !== 5) return;
  const id = location.hash.split('/')[8];
  if (!id || !route.item.taskIds.includes(id)) return;
  const section = document.getElementById('exercise-'+id);
  if (section && typeof section.scrollIntoView === 'function') {
    section.focus({preventScroll:true});
    section.scrollIntoView({block:'start'});
  }
}
// WebKit restores the previous document scroll position after the initial render.
// Reposition explicit exercise addresses once that document transition finishes.
window.addEventListener('pageshow', () => {
  if (!location.hash.includes('/practice/')) return;
  const expected = location.hash;
  const position = () => { if (location.hash === expected) focusExercise237(route()); };
  requestAnimationFrame(() => requestAnimationFrame(position));
});
if (location.hash.includes('/practice/') && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
function practice237(task) {
  const target = window.HISTORY237.targets[D.topic.id]?.[task.id];
  if (!target) return '';
  const record = window.HISTORY237.records[target.number];
  if (record.short) {
    return '<details class="official-details proof236 response237"><summary>Ввести краткий ответ</summary>'+
      '<form data-short237="'+esc(task.id)+'"><label>'+esc(record.short.label)+
      '<br><input type="text" autocomplete="off"></label><button class="primary-button" type="submit">Проверить ответ</button>'+
      '<div role="status" aria-live="polite"></div></form></details>';
  }
  if (!record.rubric) return '';
  return '<details class="official-details proof236 response237" data-rubric237="'+esc(task.id)+'">'+
    '<summary>Самопроверка развёрнутого ответа</summary><p>Сначала сформулируйте ответ самостоятельно. Затем раскройте пункты и сравните объяснения.</p>'+
    record.rubric.map(row=>'<details class="rubric-row"><summary>'+esc(row.label)+'</summary><p>'+
      esc(row.explanation)+'</p></details>').join('')+'</details>';
}
document.addEventListener('submit', event => {
  const form = event.target.closest('form[data-short237]');
  if (!form) return;
  event.preventDefault();
  const input = form.querySelector('input');
  const status = form.querySelector('[role="status"]');
  const normal = s=>s.trim().toLocaleLowerCase('ru').replaceAll('ё','е').replace(/\s+/g,' ');
  const value = normal(input.value);
  if (!value) { status.textContent='Введите ответ.';input.focus();return; }
  const target = window.HISTORY237.targets[D.topic.id][form.dataset.short237];
  const quiz = window.HISTORY237.records[target.number].short;
  status.textContent = quiz.answers.some(ans=>normal(ans)===value) ? 'Верно. '+quiz.explanation :
    'Пока неверно. Проверьте ответ по условию и попробуйте ещё раз.';
});
document.addEventListener('input', event => {
  const form=event.target.closest('form[data-short237]');
  if (form) form.querySelector('[role="status"]').textContent='';
});
function syllabus237() {
  const section = window.HISTORY237.syllabus[D.topic.id];
  const groups = section.groups.map(group=>'<li><strong>'+esc(group.label)+'</strong><ul>'+
    group.items.map(item=>'<li><a href="'+esc(item.route)+'">'+esc(item.title)+'</a></li>').join('')+'</ul></li>').join('');
  const refs = [...new Set(section.pages.map(p=>p.url.split('#')[0]))];
  const note = section.note ? '<p><strong>'+esc(section.note.title)+'.</strong> '+esc(section.note.text)+
    ' <a href="'+esc(section.note.link)+'" target="_blank" rel="noopener noreferrer">'+esc(section.note.linkTitle)+' ↗</a></p>' : '';
  return '<details class="official-details proof236 syllabus237" data-syllabus237="'+esc(D.topic.id)+'">'+
    '<summary>Что входит в тему по ФИПИ · пункт '+esc(section.code)+'</summary><p>'+esc(section.scope)+'</p>'+
    '<p>'+sourcePages236(section.pages)+'</p>'+note+'<ul class="syllabus-groups">'+groups+'</ul>'+
    '<p>'+refs.map((url,i)=>'<a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+
      (i===0?'Кодификатор ЕГЭ-2027':'Тематический навигатор ФИПИ')+' ↗</a>').join(' · ')+'</p></details>';
}

function releaseMenu245(){if(!window.HISTORY245)return '';return '<details class="release237"><summary>Новая проверка V245 · 1 задание</summary><p>Подбор обложек в 5C8425 сверен по оригиналам журналов и каталогу марки. Авторское решение и ограничения транскрипции указаны отдельно.</p><ul><li><a href="#/topic/nicholas-crimean/category/N04-U11/item/crimea-source-art-memory/practice/5C8425">5C8425 · обложки журналов и марка · авторский разбор 34</a></li></ul></details>';}
function topics(){const packs=Object.values(window.CARD_TOPICS||{base:{CARD_DATA:D}});return `<section class="intro"><span class="eyebrow blue">ИСТОРИЯ · ПОДГОТОВКА К ЕГЭ</span><h1>Выберите тему</h1><p class="lead">Тема → категория → элемент → материал → задания. Карты и произведения культуры открываются внутри материала; каждый цвет показывает отдельное подтверждённое основание.</p></section>${releaseMenu245()}${releaseMenu241()}${releaseMenu240()}${releaseMenu239()}${releaseMenu238()}${releaseMenu237()}<div class="topics-list">${packs.map((pack,i)=>{const d=pack.CARD_DATA;return `<a class="topic-card" href="#/topic/${esc(d.topic.id)}"><span class="topic-index">${String(i+1).padStart(2,'0')}</span><div class="topic-content"><span class="period">${esc(d.topic.period)} · Тема ${esc(d.topic.parentCode)}</span><h2>${esc(d.topic.name)}</h2><p>${esc(d.topic.summary)}</p><div class="topic-meta">${new Set(d.topic.categories.flatMap(c=>pack.CARD_CATEGORY_REVIEW?.categories?.[c.id]??c.items)).size} элементов · ${d.topic.categories.length} категорий · ${Object.keys(d.tasks).length} заданий</div><span class="topic-enter">Выбрать тему <span aria-hidden="true">→</span></span></div>${d.topic.previewImage?`<div class="topic-art" aria-hidden="true"><img src="${esc(d.topic.previewImage)}" alt=""></div>`:''}</a>`;}).join('')}</div><div class="demo-note"><span class="note-mark">i</span><p>Основания источников и область проверки задания указаны у каждого элемента. <a href="index-review-v21.html">Матрица тем и источников ↗</a></p></div>`;}

function pilotCount(block){const ids=new Set(D.topic.categories.filter(c=>c.block===block).flatMap(c=>visibleItems(c)));return window.CARD_PILOT.items.filter(it=>ids.has(it.id)).length;}
function categoryOrigins(cat){
 const ids=visibleItems(cat),names={fipi:'ФИПИ',exam:'Задания',reference:'Справочники',logic:'Учебник'};
 return `<span class="category-counters"><span class="category-total" title="Всего уникальных элементов: ${ids.length}" aria-label="Всего уникальных элементов: ${ids.length}">${ids.length}</span><span class="category-origins" aria-label="Происхождение элементов">${ORIGIN_ORDER.map(type=>{const count=ids.filter(id=>origins(D.items[id]).includes(type)).length;return `<span class="category-origin origin-${type}" title="${names[type]}: ${count}" aria-label="${names[type]}: ${count}">${count}</span>`;}).join('')}</span></span>`;
}
function categoryLegend(){return `<section class="category-legend" aria-label="Общая легенда источников"><h2>Источники элементов</h2><div class="origin-key">${ORIGIN_ORDER.map(t=>`<span class="legend-chip origin-${t}"><i class="origin-dot origin-${t}" aria-hidden="true"></i>${esc(ORIGIN_TYPES[t].label)}</span>`).join('')}</div><p>Большой квадрат с чёрной рамкой — число уникальных элементов: совпадения источников учтены без повторного подсчёта. Справа 2×2: сверху ФИПИ и задания, снизу справочники и учебник. Сумма цветных чисел может быть больше общего числа.</p></section>`;}
function topicScopeNote(topic){
 const notes={'peter-foreign-policy':'Здесь представлена внешняя политика Петра I в1695–1725годах, а не все разделы родительской позиции3.2.','nicholas-crimean':'Здесь представлена внешняя политика Николая I и Крымская война1825–1856, а не вся позиция4.4. Завершение войны и мир1856 относятся к Александру II.','serfdom-1861':'Здесь представлена Крестьянская реформа1861года, её подготовка и последствия, а не вся родительская позиция4.6.'};
 return notes[topic.id]||topic.scopeNote||'';
}
function topicProgress(){
 const ids=[...new Set(D.topic.categories.flatMap(category=>visibleItems(category)))];
 const answers=window.CARD_REVIEWED_APPLICATIONS?.answers||{};
 const reviewed=D.topic.categories.reduce((total,category)=>
  total+visibleItems(category).filter(id=>answers[category.id+'|'+id]).length,0);
 const tasks=Object.values(D.tasks);
 return {
  items:ids.length,
  reviewed,
  practiced:ids.filter(id=>D.items[id].taskIds.some(taskId=>D.tasks[taskId])).length,
  tasks:tasks.length,
  bank:tasks.filter(task=>task.sourceType==='bank').length,
  authored:tasks.filter(task=>task.exerciseOrigin==='author').length
 };
}
function categories(){const progress=topicProgress();return `${back('#/themes','Все темы')}<section class="intro"><span class="eyebrow blue">СЛОЙ 2 · КАТЕГОРИИ</span><h1>${D.topic.name}</h1><p class="lead">Все категории доступны на одном экране. Знания и умения сгруппированы отдельно. Выберите, какой материал открыть.</p>${syllabus237()}<p class="pilot-count">В карточке <strong>${progress.items} элементов</strong> и <strong>${progress.reviewed} разборов по категориям</strong>. Практика доступна у <strong>${progress.practiced} из ${progress.items} элементов</strong>. В составе практики <strong>${progress.tasks} заданий</strong>, включая ${progress.bank} заданий сохранённого банка${progress.authored?` и ${progress.authored} авторских упражнений этой сборки`:''}. Один элемент может встречаться в нескольких категориях.</p><p class="topic-meta">Короткие названия используются для навигации. Отнесение отдельных элементов к категориям выполнено редакторски. Категория ФИПИ: формулировка и источник доступна внутри каждой категории. Цветные счётчики показывают основания происхождения. Один элемент может учитываться в нескольких цветах, поэтому их сумма может превышать число элементов. ${esc(D.topic.sourceScope||'Справочный слой включён. У каждого основания указаны источник и границы подтверждения. Копии одной публикации не считаются независимыми источниками.')} <a href="index-review-v21.html">Общий индекс по 89 темам ↗</a></p>${categoryLegend()}<details class="coverage-note"><summary>Что проверено и что ещё не покрыто</summary><p>${esc(window.CARD_CATEGORY_REVIEW.scope)}</p><ul>${Object.entries(window.CARD_CATEGORY_REVIEW.gaps).map(([id,text])=>`<li><b>${esc(D.topic.categories.find(c=>c.id===id).name)}:</b> ${esc(text)}</li>`).join('')}</ul></details></section><div class="category-layout"><div>${['ЗНАТЬ','УМЕТЬ'].map((block,bi)=>`<section class="block-section block-${bi?'skill':'know'}"><div class="block-heading"><h2>${block}</h2><small>${D.topic.categories.filter(c=>c.block===block).length} категорий</small></div><div class="category-grid">${D.topic.categories.filter(c=>c.block===block).map(c=>`<button class="category-card" data-category="${c.id}" data-go="${categoryPath(c.id)}"><span class="category-name"><span>${esc(c.name)}</span>${categoryOrigins(c)}<span class="arrow" aria-hidden="true">→</span></span></button>`).join('')}</div></section>`).join('')}</div><aside class="context-panel"><span class="eyebrow">ВЫБРАННАЯ ТЕМА</span><p>${D.topic.summary}</p><button class="context-preview" data-reference-image="${esc(D.topic.previewImage||pageSrc(127))}" data-reference-label="${esc(D.topic.previewLabel||D.book.title)}" aria-label="Открыть изображение темы"><img src="${esc(D.topic.previewImage||pageSrc(127))}" alt="${esc(D.topic.previewLabel||D.book.title)}"><span>Увеличить <span aria-hidden="true">⤢</span></span></button><p><b>Источник</b><br>${esc(D.book.title)}<br>${esc(D.book.authors)}<br>${esc(D.book.grade)} класс · ${esc(D.book.year)} год</p><p>Родительская позиция кодификатора: ${esc(D.topic.parentCode)}. ${esc(topicScopeNote(D.topic))}</p></aside></div>`;}

function evidence(it){const entries=P.items?.[it.id];return Array.isArray(entries)?entries.filter(e=>e && typeof e==='object'):[];}
function origins(it){const found=new Set(evidence(it).filter(e=>e.eligible_for_item_origin!==false).map(e=>e.type));return ORIGIN_ORDER.filter(t=>found.has(t));}
function originBackground(types){const n=types.length;if(!n)return '#f1f3f5';return n===1?ORIGIN_TYPES[types[0]].color:`linear-gradient(110deg,${types.map((t,i)=>`${ORIGIN_TYPES[t].color} ${i/n*100}%,${ORIGIN_TYPES[t].color} ${(i+1)/n*100}%`).join(',')})`;}
function originBadges(it){const types=origins(it);return `<span class="origin-tags">${types.length?types.map(t=>`<span class="origin-tag origin-${t}">${esc(ORIGIN_TYPES[t].label)}</span>`).join(''):'<span class="origin-tag origin-missing">Основание не указано</span>'}</span>`;}
function originScope(it){let notes=[];if(it.id==='freedom' || it.id==='pilot-serf:freedom')notes.push('Задание ЕГЭ подтверждает событие отмены крепостного права, но не каждое гражданское право в этом элементе.');if(it.discrepancy)notes.push(it.discrepancy);if(it.bankTask)notes.push('Задание № 725400 — снимок банка, предоставленный пользователем: условие и ID сверены; официальный URL, ключ и год не подтверждены. Задание относится к термину, а не к финансированию 80%.');return notes.map(n=>`<span class="origin-scope">${esc(n)}</span>`).join('');}
function originLegend(){return `<section class="origin-legend" aria-label="Происхождение элементов"><h2>Почему элемент включён</h2><div class="origin-key">${ORIGIN_ORDER.map(t=>`<span class="legend-chip origin-${t}"><i class="origin-dot origin-${t}" aria-hidden="true"></i>${esc(ORIGIN_TYPES[t].label)}</span>`).join('')}</div><p>Цвета показывают указанные основания включения элемента, а не оценку достоверности факта. Несколько оснований показаны несколькими цветами. Серый цвет означает, что основание не указано.</p><p class="origin-review">Проверка заданий продолжается. Метка включает и пользовательский снимок банка с отдельным пояснением. Отсутствие отметки не означает отсутствия подходящих заданий. Жёлтый цвет — проверенная связь со справочником. Границы подтверждения и неточности источника указаны у элемента. Проверка всего корпуса справочников продолжается.</p></section>`;}
function originDetails(it){const entries=evidence(it);const recognized=entries.filter(e=>ORIGIN_TYPES[e.type]);const hidden=entries.length-recognized.length;const body=recognized.map(e=>{const label=ORIGIN_TYPES[e.type].label;const location=e.task?` · задание № ${esc(e.task)}`:e.page?` · с. ${esc(e.page)}`:Array.isArray(e.pages)&&e.pages.length?` · с. ${e.pages.map(esc).join(', ')}`:'';const source=esc(e.source || 'Источник не указан');const link=typeof e.url==='string' && /^https?:\/\//i.test(e.url)?`<a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${source}${location} ↗</a>`:`<span class="evidence-pages">${source}${location}</span>`;const contextOnly=e.eligible_for_item_origin===false;const sourceKinds={fipi:"ФИПИ",exam:"Задание или банк",reference:"Справочник",logic:"Учебник"};const evidenceTag=contextOnly?`<span class="origin-tag origin-missing" data-origin-role="context">Контекст · ${esc(sourceKinds[e.type])}</span><p class="task-scope-note">Не является основанием цветовой маркировки этого элемента.</p>`:`<span class="origin-tag origin-${e.type}">${esc(label)}</span>`;return `<article>${evidenceTag}<p>${esc(e.note || 'Пояснение к основанию не указано.')}</p>${link}${e.imageUrl?`<button class="page-chip" data-reference-image="${esc(e.imageUrl)}" data-reference-label="${source}${location}">Оригинал страницы ⤢</button>`:""}</article>`;}).join('');return `<details class="origin-details"><summary>Основания включения элемента ${originBadges(it)}</summary>${originScope(it)}<div class="origin-evidence">${body || '<p>Сведения об основаниях включения пока не указаны.</p>'}${hidden?'<p>Часть сведений об основаниях недоступна для отображения.</p>':''}</div></details>`;}
function categoryTitle(cat,it){const reviewed=window.CARD_REVIEWED_APPLICATIONS?.answers?.[cat.id+'|'+it.id];return reviewed?.title||(window.CARD_PENDING_APPLICATIONS?.includes(it.id)?it.title:window.CARD_CATEGORY_ANSWERS?.[cat.id+'|'+it.id]?.title||it.title);}
function pendingMainApplication(cat,it){const old=window.CARD_CATEGORY_ANSWERS?.[cat.id+'|'+it.id];const history=old?`<details class="official-details"><summary>Прежний редакторский разбор (история)</summary><h3>${esc(old.question||'')}</h3>${old.sections?.length?old.sections.map(x=>`<section><h3>${esc(x.heading||'')}</h3><p>${esc(x.text||'')}</p></section>`).join(''):`<p>${esc(old.text||'')}</p>`}${old.gap?`<p class="task-scope-note">${esc(old.gap)}</p>`:''}</details>`:'';return `<section class="category-application" data-category-review="pending-current-cycle"><p>Применение в этой категории ещё не подтверждено в текущем цикле независимой приёмки. Ранее подготовленный материал сохранён ниже.</p>${history}</section>`;}
function categoryApplication(cat,it){if(D.topic.id==='serfdom-1861'&&window.CARD_PENDING_APPLICATIONS?.includes(it.id)&&!window.CARD_REVIEWED_APPLICATIONS?.answers?.[cat.id+'|'+it.id])return pendingMainApplication(cat,it);if(window.CARD_PENDING_APPLICATIONS?.includes(it.id)&&!window.CARD_REVIEWED_APPLICATIONS?.answers?.[cat.id+'|'+it.id])return `<section class="category-application"><p>${cat.block==='УМЕТЬ'?'Разбор применения этого умения ещё не проверен.':'Разбор применения этой категории ещё не проверен.'}</p></section>`;const a=window.CARD_REVIEWED_APPLICATIONS?.answers?.[cat.id+'|'+it.id]||window.CARD_CATEGORY_ANSWERS?.[cat.id+'|'+it.id];return a?`<section class="category-application"><span class="eyebrow">ПРИМЕНЕНИЕ В КАТЕГОРИИ</span><h2>${esc(a.question)}</h2>${a.sections?.length?a.sections.map(s=>`<section><h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p></section>`).join(''):`<p>${esc(a.text)}</p>`}${a.gap?`<p class="task-scope-note">${esc(a.gap)}</p>`:''}</section>`:'';}
function sortControls(cat){const mode=window.CARD_UI?.mode(cat)||'sources';return `<div class="sort-controls" role="group" aria-label="Сортировка элементов"><span>Порядок:</span><button data-sort="sources" data-sort-category="${cat.id}" aria-pressed="${mode==='sources'}">По совпадению источников</button><button data-sort="dates" data-sort-category="${cat.id}" aria-pressed="${mode==='dates'}">По датам</button><p>При равенстве: ФИПИ → задания → справочники → учебник. Несколько справочников считаются одним типом источника. Периоды — по году начала. Внутри года точные даты показаны раньше записей без месяца или дня; это порядок отображения, а не утверждение об их последовательности. Записи без года идут последними.</p></div>`;}
function elements(cat){const shown=visibleItems(cat),n=shown.length;return `${back(topicPath,'Все категории')}<section class="category-intro"><div class="eyebrow">СЛОЙ 3 · ЭЛЕМЕНТЫ ${badge(cat)}</div><h1>${esc(cat.name)}</h1><p class="lead">${D.topic.name}${n?` · ${countLabel(n)} в демонстрации`:''}</p></section>${official(cat)}${originLegend()}${sortControls(cat)}${n?`<div class="elements-list">${shown.map(id=>{const it=D.items[id];const isDate=/^\d/.test(it.tag);const rowTag=it.dateLabel||(cat.block==='УМЕТЬ'&&!it.pilot?'Разбор / упражнение':it.tag);return `<button class="element-row has-origins" style="--origin-bg:${originBackground(origins(it))}" data-origins="${origins(it).join(' ')}" data-item="${id}" data-go="${itemPath(cat.id,id)}"><span class="element-tag ${isDate?'':'label'}">${esc(rowTag)}</span><span class="element-copy"><strong>${esc(categoryTitle(cat,it))}</strong>${originBadges(it)}${originScope(it)}<p>${esc(L[it.id].overview)}</p><span class="element-question">${esc(L[it.id].question)}</span></span><span class="arrow" aria-hidden="true">→</span></button>`;}).join('')}</div><div class="demo-note"><span class="note-mark">i</span><p>Выберите элемент, чтобы открыть фрагменты источников и отдельный пересказ. При наличии задания откроются следующим шагом.</p></div>`:`<div class="empty-state"><h2>Категория включена в шаблон</h2><p>${esc(window.CARD_CATEGORY_REVIEW?.gaps[cat.id]||'Проверенные элементы пока не добавлены.')}</p><button class="primary-button" data-go="${categoryPath('N04-K02')}">Открыть даты <span aria-hidden="true">→</span></button></div>`}`;}
function fragmentPages(f){return [...new Set((f.pages||[f.page]).filter(Number.isFinite))];}
function demoSourcePreviews(f){return (f.sourceImages||[]).map(x=>`<button class="page-preview" data-reference-image="${esc(x.imageUrl)}" data-reference-label="${esc(f.sourceTitle)} · ${esc(x.label)}"><img src="${esc(x.imageUrl)}" alt="${esc(x.label)}"><span class="preview-caption">${esc(x.label)} ⤢</span></button>`).join('')+`<p><a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Официальный архив ФИПИ ↗</a></p><p><a href="${esc(f.driveUrl)}" target="_blank" rel="noopener noreferrer">Копия исходного PDF ↗</a></p>`;}
function demoExcerpt(f,index){return `<article class="excerpt exercise-card"><div class="excerpt-bar"><span>ЗАДАНИЕ ${index+1} · ОФИЦИАЛЬНАЯ ДЕМОВЕРСИЯ</span><a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(f.sourceTitle)} ↗</a></div><h2 class="exercise-title">${esc(f.title)}</h2><div class="book-text">${esc(f.quote)}</div><p class="task-scope-note">${esc(f.linkScope)}</p><details class="task-solution"><summary>Официальный ключ и критерии ФИПИ</summary><div class="task-solution-body book-text">${esc(f.official_answer)}</div><p>PDF: ${esc(f.answerLocator)}. Ключ проверен по оригиналу.</p></details><div class="excerpt-note">Демонстрационный вариант ${f.publication_year} года. Это образец экзаменационного формата, а не утверждение об использовании задания на реальной экзаменационной сессии. Переносы строк нормализованы; оригинальные страницы доступны справа.</div></article>`;}
function imageDimensions(src){ const size=window.CARD_PRACTICE_IMAGE_SIZES?.[src]; return size?` width="${size[0]}" height="${size[1]}"`:""; }
function sourceAside(fragments){fragments=fragments.map(fragmentView);if(!fragments.length)return '<aside class="source-side"><p>Источник пока не указан.</p></aside>';const first=fragments[0],book=fragments.filter(f=>(!f.sourceType||f.sourceType==='textbook')&&!f.sourcePageImage),otherBooks=fragments.filter(f=>f.sourcePageImage),pages=[...new Set(book.flatMap(fragmentPages))].sort((a,b)=>a-b),records=[...new Set(fragments.flatMap(f=>f.sourceRecords||[]))];return `<aside class="source-side">${otherBooks.map(f=>`<button class="page-preview" data-reference-image="${esc(f.sourcePageImage)}" data-reference-label="${esc(f.sourcePageLabel||f.sourceTitle+" · с. "+f.page)}"><img${imageDimensions(f.sourcePageImage)} src="${esc(f.sourcePageImage)}" alt="${esc(f.sourcePageLabel||f.sourceTitle+" · с. "+f.page)}"><span class="preview-caption">${esc(f.sourcePageLabel||f.sourceTitle+" · с. "+f.page)} ⤢</span></button>`).join("")}${pages.map(n=>`<button class="page-preview" data-page="${n}" aria-label="Открыть оригинал страницы ${n}"><img src="${esc(pageSrc(n))}" alt="Оригинальная страница ${n} учебника"><span class="preview-caption">Оригинал учебника · с. ${n} ⤢</span></button>`).join('')}<div class="source-citation">${book.length?`<b>${esc(D.book.title)}</b><br>${esc(D.book.authors)}<br>${D.book.grade} класс · ${D.book.year} год<br>Печатные страницы: ${pages.join(', ')}<br><a href="${esc(D.book.url)}" target="_blank" rel="noopener noreferrer">Открыть учебник PDF ↗</a><div class="page-links">${pages.map(n=>`<button class="page-chip" data-page="${n}">с. ${n} ⤢</button>`).join('')}</div>`:''}${fragments.filter(f=>f.sourceType==='official_fipi').map(f=>`<p><a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">ФИПИ · открытый вариант 2026 ↗</a><br><a href="${esc(f.driveUrl)}" target="_blank" rel="noopener noreferrer">Копия исходного варианта ↗</a></p>`).join('')}${fragments.filter(f=>f.sourceType==='bank').map(f=>`<p><a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Снимок задания № ${esc(f.taskNumber||'725400')} ↗</a></p>`).join('')}${fragments.filter(f=>f.sourceType==='fipi').map(f=>`<p><a href="${esc(f.sourceUrl)}#page=${f.page}" target="_blank" rel="noopener noreferrer">Навигатор ФИПИ · с. ${f.page} ↗</a></p>`).join('')}</div>${fragments.filter(f=>f.sourceType==='reference').map(f=>`<button class="page-preview" data-reference-image="${esc(f.imageUrl)}" data-reference-label="${esc(f.sourceTitle)} · с. ${f.page}"><img src="${esc(f.imageUrl)}" alt="Оригинал справочника, страница ${f.page}"><span class="preview-caption">Справочник · с. ${f.page} ⤢</span></button><p><a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(f.sourceTitle)} ↗</a></p>`).join('')}${fragments.filter(f=>f.sourceType==='official_demo').map(demoSourcePreviews).join('')}${fragments.filter(f=>f.sourceType==='external'&&f.sourceUrl).map(f=>`<p><a href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(f.sourceTitle||f.section)} ↗</a></p>`).join('')}${records.length?`<details class="source-records"><summary>Связь с исходным массивом</summary><p>${records.map(esc).join('<br>')}</p></details>`:''}</aside>`;}
function taskSolution(f){
 if(f.id!=='bank-725400'||!f.author_solution)return '';
 const basis=f.author_solution_source==='assistant_solution_supported_by_textbook128_and_N04p7'?'Основание авторского решения: учебник, с. 128; Навигатор ФИПИ N04, с. 7.':'Основание авторского решения: '+String(f.author_solution_source||'не указано')+'.';
 return `<details class="task-solution"><summary>Авторское решение — не официальный ключ</summary><div class="task-solution-body"><p>${esc(f.author_solution)}</p>${f.author_solution_explanation?`<p>${esc(f.author_solution_explanation)}</p>`:''}<p class="task-solution-source">${esc(basis)}</p><p class="task-solution-source">${f.official_answer==null?'Официальный ключ не подтверждён.':'Это авторское решение показано отдельно от официального ключа.'}</p></div></details>`;
}
// Таблица остаётся тем же условием: меняется только HTML-представление строк.
function quoteMarkup(f){
 if(f.id!=='bank-FA0AED' && !f.tableCondition)return esc(f.quote);
 const lines=f.quote.split('\n'),first=lines.findIndex(x=>x.includes(' | '));
 if(first<0)return esc(f.quote);
 let end=first;while(end<lines.length&&lines[end].includes(' | '))end++;
 const rows=lines.slice(first,end).map(line=>line.split(' | '));
 return `${esc(lines.slice(0,first).join('\n'))}<div class="task-table-wrap" role="region" aria-label="Таблица условия задания ${esc(f.taskNumber||f.id.slice(5))}" tabindex="0"><table class="task-table"><thead><tr>${rows[0].map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.slice(1).map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${esc(lines.slice(end).join('\n'))}`;
}
// Адаптер только представления: канонические записи и статусы не изменяются.
function fragmentView(fragment){
 const f={...fragment};
 f.quote=typeof f.displayQuote==='string'?f.displayQuote:f.quote;
 f.kind=f.kind||'Фрагмент источника';
 f.section=f.section||f.sourceTitle||'Фрагмент источника';
 f.sourceUrl=f.sourceUrl||f.url;
 if(f.sourceType==='bank'){const task=D.tasks[f.id]||Object.values(D.tasks).find(t=>t.taskNumber===f.taskNumber);if(task){f.id=task.id;f.imageUrl=f.imageUrl||task.imageUrl;f.sourceUrl=f.sourceUrl||task.sourceUrl;}}
 if(f.imageUrl){const visual=Object.values(window.CARD_MEDIA?.assets||{}).find(m=>m.src===f.imageUrl);if(visual){f.imageSourcePage=visual.page;f.imageSourceTitle=visual.sourceTitle;}}
 if(f.sourceType&&!['textbook','reference','bank','fipi','official_fipi','official_demo','external','author'].includes(f.sourceType))f.sourceType='external';
 return f;
}
function savedPageLink(f){
 const label=f.sourcePageLabel||`${f.sourceTitle} · с. ${f.page}`;
 return `<button class="source-page-link" data-reference-image="${esc(f.sourcePageImage)}" data-reference-label="${esc(label)}">${esc(label)} ⤢</button> <a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Открыть издание ↗</a>`;
}
function excerpt(f,exercise=false,index=0){f=fragmentView(f);if(f.sourceType==='official_demo')return demoExcerpt(f,index);const isAuthor=f.sourceType==='author',isExternal=f.sourceType==='external',isReference=f.sourceType==='reference',isFipi=f.sourceType==='fipi',isBank=f.sourceType==='bank',isOfficial=f.sourceType==='official_fipi';const source=f.sourcePageImage?savedPageLink(f):isAuthor?`<a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Основания упражнения ↗</a>`:isExternal?`<a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(f.sourceTitle)}${f.page?` · с. ${esc(f.page)}`:''} ↗</a>`:isReference?`<button class="source-page-link" data-reference-image="${esc(f.imageUrl)}" data-reference-label="${esc(f.sourceTitle)} · с. ${f.page}">${esc(f.sourceTitle)} · с. ${f.page} ⤢</button>`:isOfficial?`<a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">ФИПИ · открытый вариант ↗</a>`:isBank?`<a class="source-page-link" href="${esc(f.sourceUrl)}" target="_blank" rel="noopener noreferrer">Снимок задания ↗</a>`:isFipi?`<a class="source-page-link" href="${esc(f.sourceUrl)}#page=${f.page}" target="_blank" rel="noopener noreferrer">ФИПИ · с. ${f.page} ↗</a>`:fragmentPages(f).map(n=>`<button class="source-page-link" data-page="${n}" aria-label="Открыть оригинал страницы ${n}">${esc(f.section)} · с. ${n} ⤢</button>`).join(' ');return `<article class="excerpt ${exercise?'exercise-card':'material-card'}"><div class="excerpt-bar"><span>${exercise?`ЗАДАНИЕ ${index+1} · `:''}${esc(f.kind).toUpperCase()}</span>${source}</div>${exercise?`<h2 class="exercise-title">${esc(f.title)}</h2>`:''}<div class="book-text ${String(f.kind||'').startsWith('Таблица')?'table-text':''}">${quoteMarkup(f)}</div>${exercise&&isOfficial?`<p class="task-scope-note">Межтематическое задание. Материал пилота раскрывает только соответствие «внутренняя политика Александра II — отмена крепостного права». Для остальных соответствий нужны другие темы.${f.official_answer==null?' Официальный ключ пока не подтверждён; полный ответ здесь не приводится.':''}</p>`:''}${f.transcriptionNote?`<p class="task-scope-note">${esc(f.transcriptionNote)}</p>`:''}${exercise&&f.linkScope?`<p class="task-scope-note">${esc(f.linkScope)}</p>`:''}${exercise&&f.answerSourcePages?.length?`<div class="supplemental-sources"><h3>Страницы к разбору</h3>${f.answerSourcePages.map(m=>`<button class="page-chip" data-reference-image="${esc(m.src)}" data-reference-label="${esc(m.label)}">${esc(m.label)} ⤢</button>`).join(" ")}</div>`:""}${exercise?taskSolution(f):''}${exercise&&!isBank&&f.imageUrl?`<figure class="task-visual"><button class="media-image-button" data-reference-image="${esc(f.imageUrl)}" data-reference-label="${esc(f.imageAlt||f.title)}" aria-label="Увеличить изображение задания"><img${imageDimensions(f.imageUrl)} src="${esc(f.imageUrl)}" alt="${esc(f.imageAlt||f.title)}" loading="lazy"><span>Увеличить ⤢</span></button><figcaption>${esc(f.imageCaption||'')} · ${esc(f.imageSourceTitle||f.sourceTitle||'Учебник')} · с. ${esc(f.imageSourcePage||f.page)}</figcaption></figure>`:''}${isBank&&f.imageUrl?`<button class="bank-image-button" data-bank-image="${esc(f.id)}" aria-label="Увеличить снимок задания ${esc(f.taskNumber||'725400')}"><img${imageDimensions(f.imageUrl)} src="${esc(f.imageUrl||'')}" alt="Снимок условия и номера задания ${esc(f.taskNumber||'725400')}"><span>Увеличить снимок ⤢</span></button>`:''}<div class="excerpt-note">${isAuthor?'Упражнение проекта «История». Источники материала указаны рядом.':isExternal?'Фрагмент дополнительного источника; оригинал открывается по ссылке в заголовке.':isReference?'Фрагмент справочника; оригинал открывается по номеру страницы.':isOfficial?'Открытый вариант ФИПИ опубликован в 2026 году; год конкретной экзаменационной сессии не установлен. Связь с карточкой о личной свободе относится только к событию отмены крепостного права, не к полному перечню прав.':isBank?(f.studyRevision && ['bank-B3C861','B3C861','bank-C7A1C8','C7A1C8'].includes(f.id)?'Снимок банка. Соответствующее условие найдено в публикации ФИПИ. Страницы и границы сверки приведены в разборе.':'Пользовательский снимок банка. Статус сверки текста и ID указан у задания; официальный источник, ключ и год не подтверждены.'):isFipi?'Фрагмент Навигатора ФИПИ.':'Фрагмент учебника; оригинальная страница доступна по номеру страницы.'}</div></article>`;}
function materialBundle(it){
 const related=L[it.id].related.flatMap(id=>D.items[id].materials);
 const seen=new Set();
 return [...it.materials,...related,...(L[it.id].extraQuotes||[])].filter(f=>{const key=[f.sourceType||'textbook',f.sourceUrl||D.book.url,fragmentPages(f).join(','),f.quote].join('|');if(seen.has(key))return false;seen.add(key);return true;}).sort((a,b)=>a.page-b.page);
}
// Изображение — часть материала; оно остаётся видимым в обоих режимах чтения.
function sourcePages236(pages) {
  return pages.map(page => '<button class="page-chip" data-reference-image="' + esc(page.src) +
    '" data-reference-label="' + esc(page.title) + '">' + esc(page.title) + ' ⤢</button>').join(' ');
}
function publisherCredit236(asset) {
  const credit = window.HISTORY236.credits[D.topic.id]?.[asset.id];
  if (!credit) return '';
  const buttons = [{src: credit.image, title: 'Перечень издателя · с. ' + credit.page}];
  if (credit.extraImage) buttons.push({src:credit.extraImage, title:credit.extraImageTitle});
  const extra = credit.extraUrl ? '<a href="' + esc(credit.extraUrl) + '" target="_blank" rel="noopener noreferrer">' +
    esc(credit.extraTitle) + ' ↗</a>' : '';
  return '<details class="official-details proof236" data-credit-for="' + esc(asset.id) +
    '"><summary>Источник атрибуции</summary><p>' + esc(credit.text) + '</p><p>' +
    sourcePages236(buttons) + '</p><p><a href="' + esc(credit.url) +
    '" target="_blank" rel="noopener noreferrer">Издание «Просвещения» ↗</a> ' + extra + '</p></details>';
}
function taskImageCredit236(task) {
  const key=window.HISTORY236.taskCredits[D.topic.id]?.[task.id];
  if(!key)return '';
  return publisherCredit236(window.CARD_TOPICS[D.topic.id].CARD_MEDIA.assets[key]);
}
function examEvidence236(task) {
  const entry = window.HISTORY236.exams[D.topic.id]?.[task.id];
  if (!entry) return '';
  const labels = {criteria:'Критерии ФИПИ',remapped_key:'Ключ демоверсии и порядок в карточке',
    reordered:'Сверка двух вариантов',single_part:'Комментарий ФИПИ к части ответа', published_key:'Опубликованный ответ ФИПИ', expert_examples:'Разбор ответа в рекомендациях ФИПИ', official_condition:'Условие открытого варианта ФИПИ', source_comparison:'Сверка с источником ФИПИ', map_reference:'Сравнить карты банка и ФИПИ'};
  const links = [...new Set(entry.pages.map(p => p.url.split('#')[0]))];
  return '<details class="official-details proof236" data-exam-evidence="' + esc(task.id) +
    '"><summary>' + esc(labels[entry.type]) + '</summary><h3>' + esc(entry.title) + '</h3>' +
    entry.paragraphs.map(t => '<p>' + esc(t) + '</p>').join('') +
    '<p>' + sourcePages236(entry.pages) + '</p>' + links.map(link =>
      '<p><a href="' + esc(link) + '" target="_blank" rel="noopener noreferrer">Документ на сайте ФИПИ ↗</a></p>').join('') + '</details>';
}
function matchingPractice236(task) {
  const drill = window.HISTORY236.drills[D.topic.id]?.[task.id];
  if (!drill) return '';
  const options = drill.options.map((t,i)=>'<option value="'+(i+1)+'">'+(i+1)+'. '+esc(t)+'</option>').join('');
  return '<details class="official-details proof236 matching236"><summary>Решить задание на соответствие</summary>' +
    '<details class="choices237"><summary>Все варианты ответа</summary><ol>'+drill.options.map(text=>'<li>'+esc(text)+'</li>').join('')+'</ol></details>'+
    '<form data-match236="'+esc(task.id)+'"><fieldset><legend>Выберите ответ для каждой строки</legend>' +
    drill.stems.map((stem,i)=>'<label><span>'+['А','Б','В','Г','Д','Е'][i]+'. '+esc(stem)+'</span><select aria-label="'+
      esc(['А','Б','В','Г','Д','Е'][i]+'. '+stem)+'"><option value="">Выберите вариант</option>'+options+
      '</select></label>').join('')+'</fieldset><button class="primary-button" type="submit">Проверить ответ</button>'+
    '<div role="status" aria-live="polite"></div></form></details>';
}
document.addEventListener('submit', event => {
  const form = event.target.closest('form[data-match236]');
  if (!form) return;
  event.preventDefault();
  const drill = window.HISTORY236.drills[D.topic.id][form.dataset.match236];
  const selects = [...form.querySelectorAll('select')];
  const result = form.querySelector('[role="status"]');
  const missed = selects.find(s=>!s.value);
  if (missed) {
    result.textContent = 'Выберите ответы во всех строках ('+selects.length+').';
    missed.focus();
    return;
  }
  const wrong = selects.map((s,i)=>Number(s.value)!==drill.correct[i]);
  const score = wrong.filter(v=>!v).length;
  if (score===selects.length) {
    result.innerHTML = '<p><strong>Верно. Ответ '+drill.correct.join('')+'.</strong></p><ul>'+
      drill.why.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ul>';
  } else {
    const letters=['А','Б','В','Г','Д','Е'].filter((_,i)=>wrong[i]);
    result.textContent = 'Правильно '+score+' из '+selects.length+'. Проверьте '+(letters.length===1?'строку ':'строки ')+letters.join(', ')+'.';
  }
});
document.addEventListener('change',event => {
  const form = event.target.closest('form[data-match236]');
  if (form) form.querySelector('[role="status"]').textContent='';
});
function historicalFormat236(task) {
  if(!window.HISTORY236.essays[D.topic.id]?.includes(task.id))return '';
  return '<p class="task-scope-note old236"><strong>Историческое сочинение · прежний формат.</strong> Здесь можно тренировать подбор фактов, раскрытие роли личности и причинные связи. В модели ЕГЭ-2027 отдельного сочинения нет. '+
    '<button class="page-chip" data-reference-image="'+esc(window.HISTORY236.formatPage)+'" data-reference-label="ФИПИ · структура экзамена 2027 года">Спецификация ⤢</button></p>';
}

function mediaGallery(it){
 const ids=window.CARD_MEDIA?.items?.[it.id]||[];
 if(!ids.length)return '';
 return `<section class="material-media" aria-label="Карты и произведения культуры"><header><span class="eyebrow">ВИЗУАЛЬНЫЙ МАТЕРИАЛ</span><h2>Рассмотрите изображение</h2><p>Нажмите на изображение, чтобы увеличить его. Подпись и источник приведены под ним.</p></header><div class="media-gallery">${ids.map(id=>{const m=window.CARD_MEDIA.assets[id];const sourceLabel=(m.sourceTitle||'См. подпись к изображению')+(m.page!=null?' · с. '+m.page:'');return `<figure class="media-figure media-${esc(m.kind)}" data-media-id="${esc(id)}"><button class="media-image-button" data-reference-image="${esc(m.src)}" data-reference-label="${esc(m.title)}" aria-label="Увеличить: ${esc(m.title)}"><img src="${esc(m.src)}" alt="${esc(m.alt||m.title)}" ${Number.isFinite(m.width)&&Number.isFinite(m.height)?`width="${m.width}" height="${m.height}"`:""} loading="lazy"><span>Увеличить ⤢</span></button><figcaption><h3>${esc(m.title)}</h3>${m.caption?`<p>${esc(m.caption)}</p>`:''}${m.scope?`<p class="media-scope">${esc(m.scope)}</p>`:''}<p class="media-source">${esc(sourceLabel)}${m.originalPage?` <button class="page-chip" data-page="${m.originalPage}">Страница целиком ⤢</button>`:` <button class="page-chip" data-reference-image="${esc(m.sourcePageSrc||m.src)}" data-reference-label="${esc(sourceLabel)}">Страница целиком ⤢</button>`}</p>${publisherCredit236(m)}</figcaption></figure>`;}).join('')}</div></section>`;
}
function readingVariants(it,fragments){const learning=L[it.id];const tasks=it.taskIds.map(id=>D.tasks[id]);return `<section class="material-focus"><span class="eyebrow">ВОПРОС К МАТЕРИАЛУ</span><h2>${esc(learning.question)}</h2><p>Два способа изучить материал.${tasks.length?` На следующем шаге: ${tasks.map(t=>esc(t.title)).join('; ')}.`: ' Задания для этого элемента пока не добавлены.'}</p></section><div class="reading-switch" role="group" aria-label="Вариант материала"><button class="reading-choice choice-retelling" data-reading="retelling" aria-pressed="true">1 · Пересказ и объяснение</button><button class="reading-choice choice-quote" data-reading="quote" aria-pressed="false">2 · Дословно из источника</button></div><section class="reading-variant variant-quote" aria-labelledby="quote-heading" hidden><header class="variant-heading"><span class="variant-label">ВАРИАНТ 2 · ЗЕЛЁНЫЙ</span><h2 id="quote-heading">Дословно из источника</h2><p>Исходные фрагменты сохранены без редактирования. Связанные фрагменты добавлены для контекста вопроса и заданий.</p></header><div class="variant-content">${fragments.map(f=>excerpt(f)).join('')}</div></section><section class="reading-variant variant-retelling" aria-labelledby="retelling-heading"><header class="variant-heading"><span class="variant-label">ВАРИАНТ 1 · СИНИЙ</span><h2 id="retelling-heading">Пересказ и объяснение</h2><p>Авторский пересказ по приведённым фрагментам. Это отдельное изложение, а не цитата учебника.</p></header><div class="retelling-text">${learning.sections?.length?learning.sections.map(s=>`<section class="explanation-section"><h3>${esc(s.heading)}</h3><p>${esc(s.text)}</p></section>`).join(''):learning.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="retelling-sources">Источники и страницы: ${[...new Set([...fragments.filter(f=>(!f.sourceType||f.sourceType==='textbook')).flatMap(fragmentPages),...(learning.sourcePages||[]),...(learning.additionalSourcePages||[])])].sort((a,b)=>a-b).map(n=>`<button class="page-chip" data-page="${n}">с. ${n} ⤢</button>`).join('')}</div>${learning.normativeImages?.length?`<div class="supplemental-sources"><h3>Проверенные страницы источников</h3>${learning.normativeImages.map(m=>`<button class="page-chip" data-reference-image="${esc(m.src)}" data-reference-label="${esc(m.title)}">${esc(m.title)} ⤢</button>`).join(" ")}</div>`:""}${learningSources(learning).length?`<div class="supplemental-sources"><h3>Дополнительная проверка</h3>${learningSources(learning).map(x=>`<p><a href="${esc(x.url)}" target="_blank" rel="noopener noreferrer">${esc(x.title||x.label)} ↗</a></p>`).join('')}</div>`:''}</section>`;}
function practiceLink(cat,it){const n=it.taskIds.length;if(!n)return `<section class="practice-bridge"><div><h2>Задания пока не добавлены</h2><p>Для этого элемента учебные задания ещё не связаны с карточкой.</p></div></section>`;return `<section class="practice-bridge"><div><span class="eyebrow">СЛЕДУЮЩИЙ СЛОЙ · 5</span><h2>Перейти к заданиям</h2><p>После изучения материала — ${n} ${plural(n,'задание','задания','заданий')} по элементу и связанному с ним материалу; источник указан у каждого задания.</p></div><button class="primary-button" data-go="${practicePath(cat.id,it.id)}">Открыть задания <span aria-hidden="true">→</span></button></section>`;}
function detail(cat,it){const fragments=materialBundle(it);const shown=visibleItems(cat),pos=shown.indexOf(it.id);const prev=pos>0?D.items[shown[pos-1]]:null;const next=pos>=0&&pos<shown.length-1?D.items[shown[pos+1]]:null;return `${back(categoryPath(cat.id),`К списку: ${esc(cat.name.toLowerCase())}`)}<section class="detail-heading"><div class="eyebrow">СЛОЙ 4 · МАТЕРИАЛ ${badge(cat)}</div><h1>${esc(categoryTitle(cat,it))}</h1><p class="lead">${esc(it.summary)}</p><div class="reading-note"><span class="reading-dot" aria-hidden="true"></span>Сначала изучите материал.${it.taskIds.length?` Задания открываются отдельно на пятом слое.<button class="text-button" data-go="${practicePath(cat.id,it.id)}">К заданиям →</button>`:' Задания пока не добавлены.'}</div></section>${originDetails(it)}${oldContext(cat,it)}<div class="source-grid"><div class="excerpt-stack">${categoryApplication(cat,it)}${mediaGallery(it)}${readingVariants(it,fragments)}${practiceLink(cat,it)}</div>${sourceAside(fragments)}</div><div class="item-navigation">${prev?`<button data-go="${itemPath(cat.id,prev.id)}"><small>← Предыдущий элемент</small>${esc(prev.title)}</button>`:'<span></span>'}${next?`<button data-go="${itemPath(cat.id,next.id)}"><small>Следующий элемент →</small>${esc(next.title)}</button>`:''}</div>`;}
// Все дополнительные источники читаются из текущей карточки, а не старого зеркала PILOT.
function learningSources(learning){
 const seen=new Set();return [...(learning.supplementalSources||[]),...(learning.externalSources||[])].filter(x=>{const url=typeof x==='string'?x:x.url;if(!url||seen.has(url))return false;seen.add(url);return true;}).map(x=>typeof x==='string'?{url:x,title:x}:{...x,title:x.title||x.label||x.url});
}
function authorValue(value){
 if(value==null)return '';
 if(Array.isArray(value))return `<ul>${value.map(x=>`<li>${authorValue(x)}</li>`).join('')}</ul>`;
 if(typeof value==='object'){
  const names={installed_year:'Год установки',commemoration:'Посвящение',symbols:'Символика',source:'Источник',meaning:'Значение',map:'Карта',question:'Вопрос',answer:'Ответ'};
  return Object.entries(value).map(([key,x])=>`<p><b>${esc(names[key]||key)}:</b> ${authorValue(x)}</p>`).join('');
 }
 return esc(value);
}
function revisedPracticeAnswer(task) {
 const review = task.studyRevision;
 if (!review) return '';
 const pages = review.sources.map(page =>
   `<button class="source-page-link" data-reference-image="${esc(page.src)}" data-reference-label="${esc(page.label)}">${esc(page.label)} ⤢</button>`
 ).join(' ');
 const links = review.links.map(link =>
   `<p><a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.title)} ↗</a></p>`
 ).join('');
 const limit = review.limitation
   ? `<p class="task-scope-note"><strong>Ограничение источника.</strong> ${esc(review.limitation)}</p>` : '';
 const body = review.paragraphs.map(p => `<p class="book-text">${esc(p)}</p>`).join('');
 return `<details class="task-solution reviewed-answer revision-235" data-revision-task="${esc(task.id)}"><summary>${esc(review.label)}</summary><div class="task-solution-body">${body}${limit}${pages}${links}</div></details>`;
}

function sourcePractice(task) {
 const ex = task.studyRevision?.exercise;
 if (!ex) return '';
 const choices = ex.options.map((option, index) =>
  `<label class="source-choice"><input type="radio" name="review-235-${esc(task.id)}" value="${index}" required> <span>${esc(option)}</span></label>`
 ).join('');
 return `<details class="task-solution source-practice" data-author-practice="${esc(task.id)}"><summary>Проверить себя по источнику</summary><form class="task-solution-body" data-practice-id="${esc(task.id)}"><fieldset><legend>${esc(ex.question)}</legend>${choices}</fieldset><button type="submit" class="primary-button">Проверить ответ</button><p class="book-text" role="status" aria-live="polite"></p></form></details>`;
}

document.addEventListener('submit', event => {
 const form = event.target.closest('form[data-practice-id]');
 if (!form) return;
 event.preventDefault();
 const task = Object.values(D.tasks).find(t => t.id === form.dataset.practiceId);
 const exercise = task?.studyRevision?.exercise;
 const choice = form.querySelector('input:checked');
 if (!exercise || !choice) return;
 const output = form.querySelector('[role="status"]');
 output.textContent = Number(choice.value) === exercise.correct
  ? 'Верно. ' + exercise.why
  : 'Попробуйте ещё раз. Сверьтесь с источником в разборе.';
});

function reviewedExerciseAnswer(task) {
 if(task.studyRevision) return revisedPracticeAnswer(task);
 const review=task.reviewedExerciseAnswer;
 if(!review)return '';
 const pages=review.sources.map(page=>`<button class="source-page-link" data-reference-image="${esc(page.src)}" data-reference-label="${esc(page.label)}">${esc(page.label)} ⤢</button>`).join(' ');
 const links=review.links.map(link=>`<p><a href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.title)} ↗</a></p>`).join('');
 const title=review.partial?'Авторский разбор · часть задания':'Решение упражнения · авторский разбор';
 return `<details class="task-solution reviewed-answer"><summary>${title}</summary><div class="task-solution-body"><p class="book-text">${esc(review.answer)}</p>${pages}${links}</div></details>`;
}
function authoredAnswer(item,task){
 if(task.studyRevision) return '';
 const target=(L[item.id]?.practiceTargets||[]).find(x=>x.taskId===task.id||x.taskId==='bank-'+task.id||'bank-'+x.taskId===task.id);
 if(!target || (task.reviewedExerciseAnswer && target.answer===task.reviewedExerciseAnswer.answer))return '';
 const labels={chosenPeriod:'Выбранный период',scope:'Область ответа',thesis:'Тезис',justifications:'Обоснования',answer:'Ответ',answers:'Ответ',answerParagraphs:'Разбор',answer_parts:'Части ответа',accepted_pair:'Проверенная пара',reasons:'Причины',part1:'Первая часть',part2:'Вторая часть',part1Answer:'Первая часть',part2AnswerParagraphs:'Вторая часть',part3Paragraphs:'Дополнительное объяснение',russian_places:'Территории России',ottoman_places:'Османские территории',mapLimitation:'Ограничение карты'};
 const body=Object.entries(labels).filter(([key])=>target[key]!=null).map(([key,label])=>`<section><h3>${label}</h3>${authorValue(target[key])}</section>`).join('');
 return `<details class="task-solution"><summary>${task.exerciseOrigin==='author'?'Ответ и объяснение':'Авторский разбор — не официальный ключ'}</summary><div class="task-solution-body">${body}${target.full_answer_not_claimed?'<p>Разбор охватывает указанную часть задания.</p>':''}${target.part2Status==='not_verified'?'<p>Вторая часть вопроса ещё не проверена.</p>':''}${task.exerciseOrigin==='author'?'<p class="task-solution-source">Ответ подготовлен к авторскому упражнению по материалу карточки.</p>':'<p class="task-solution-source">Область разбора ограничена выбранным материалом. Экзаменационный ключ ФИПИ для этого разбора не подтверждён.</p>'}${task.educationalPublisherKey?`<p>Ключ образовательного издания: ${esc(task.educationalPublisherKey)}</p>`:""}${(task.answerEvidence||[]).map(e=>`<p><a href="${esc(e.url)}" target="_blank" rel="noopener noreferrer">${esc(e.title)} ↗</a></p>`).join("")}</div></details>`;
}
function practice(cat,it){const tasks=it.taskIds.map(id=>D.tasks[id]?{...D.tasks[id],linkScope:(D.tasks[id].semanticReview238&&D.tasks[id].linkScope)||L[it.id]?.effectiveTaskScopes?.[id]||it.taskScopes?.[id]||D.tasks[id].linkScope}:null).filter(Boolean);if(!tasks.length)return `${back(itemPath(cat.id,it.id),'К материалу')}<section class="empty-state"><h1>Задания пока не добавлены</h1><p>Для этого элемента задания ещё не связаны с карточкой.</p></section>`;return `${back(itemPath(cat.id,it.id),'К материалу')}<section class="detail-heading"><div class="eyebrow">СЛОЙ 5 · ЗАДАНИЯ ${badge(cat)}</div><h1>Проверьте себя</h1><p class="lead">${esc(it.title)} · задания по элементу</p><div class="reading-note"><span class="reading-dot amber" aria-hidden="true"></span>Материал четвёртого слоя помогает выполнить часть задания, связанную с выбранным элементом. Межтематические задания могут требовать знаний из других тем.<button class="text-button" data-go="${itemPath(cat.id,it.id)}">Открыть материал →</button></div></section><div class="source-grid"><div class="excerpt-stack">${tasks.map((t,i)=>'<section class="exercise237" id="exercise-'+esc(t.id)+'" tabindex="-1">'+excerpt(t,true,i)+historicalFormat236(t)+taskImageCredit236(t)+matchingPractice236(t)+practice237(t)+reviewedExerciseAnswer(t)+examEvidence236(t)+authoredAnswer(it,t)+sourcePractice(t)+'</section>').join('')}<div class="practice-end"><button class="primary-button" data-go="${itemPath(cat.id,it.id)}">Вернуться к материалу <span aria-hidden="true">←</span></button><button class="text-button" data-go="${categoryPath(cat.id)}">К списку элементов →</button></div></div>${sourceAside(tasks)}</div>`;}
// Общий просмотр оригинала: состояние загрузки и сброс масштаба при каждом открытии.
function showImage(src,alt,label){
 const img=$('#page-image'),dialog=$('#page-dialog'),status=$('#image-status'),zoom=$('#zoom-button');
 dialog.classList.remove('zoomed');zoom.textContent='Увеличить';zoom.setAttribute('aria-pressed','false');zoom.disabled=true;
 status.hidden=false;status.textContent='Загрузка изображения…';img.hidden=true;img.alt=alt;$('#page-label').textContent=label;
 img.onload=()=>{status.hidden=true;img.hidden=false;zoom.disabled=false;};
 img.onerror=()=>{status.hidden=false;status.textContent='Не удалось загрузить изображение. Закройте окно и попробуйте открыть его ещё раз.';img.hidden=true;zoom.disabled=true;};
 img.src=src;dialog.showModal();$('.page-image-wrap').scrollTo(0,0);
}
function showBankImage(id){const task=D.tasks[id];if(!task?.imageUrl)return;const n=task.taskNumber||id;showImage(task.imageUrl,`Снимок условия и номера задания ${n}`,`Снимок задания № ${n}`);}
function showPage(n){showImage(pageSrc(n),`Оригинал страницы ${n}: ${D.book.title}`,`${D.book.title} · страница ${n}`);}
function render(){const r=route();const hb=$('#header-back');hb.disabled=r.level===1;hb.setAttribute('data-go',r.level===5?itemPath(r.cat.id,r.item.id):r.level===4?categoryPath(r.cat.id):r.level===3?topicPath:'#/themes');breadcrumbs(r);$('#content').innerHTML=r.level===1?topics():r.level===2?categories():r.level===3?elements(r.cat):r.level===4?detail(r.cat,r.item):practice(r.cat,r.item);document.title=`${r.level===5?'Задания: ':''}${r.item?r.item.title:r.cat?r.cat.name:r.level===2?D.topic.name:'Темы'} — История`;if(window.CARD_UI)window.CARD_UI.restoreView();else window.scrollTo(0,0);$('#content').focus({preventScroll:true});focusExercise237(r);$('#announcement').textContent=`${r.level===1?'Выбор темы':r.level===2?'Категории':r.level===3?r.cat.name:r.level===4?r.item.title:'Задания'}. Слой ${r.level} из пяти.`;}
document.addEventListener('click',e=>{const sorting=e.target.closest('[data-sort]');if(sorting){window.CARD_UI.setMode(sorting.dataset.sortCategory,sorting.dataset.sort);render();return;}const mode=e.target.closest('[data-reading]');if(mode){document.querySelectorAll('[data-reading]').forEach(b=>b.setAttribute('aria-pressed',String(b===mode)));document.querySelectorAll('.reading-variant').forEach(el=>el.hidden=!el.classList.contains('variant-'+mode.dataset.reading));window.CARD_UI?.capture();return;}const nav=e.target.closest('[data-go]');if(nav){go(nav.dataset.go);return;}const bank=e.target.closest('[data-bank-image]');if(bank){showBankImage(bank.dataset.bankImage);return;}const ref=e.target.closest('[data-reference-image]');if(ref){showImage(ref.dataset.referenceImage,ref.dataset.referenceLabel,ref.dataset.referenceLabel);return;}const page=e.target.closest('[data-page]');if(page){showPage(page.dataset.page);return;}const close=e.target.closest('[data-close]');if(close)document.getElementById(close.dataset.close).close();});
$('#help-button').addEventListener('click',()=>$('#help-dialog').showModal());
$('#zoom-button').addEventListener('click',()=>{const on=$('#page-dialog').classList.toggle('zoomed');$('#zoom-button').textContent=on?'По ширине':'Увеличить';$('#zoom-button').setAttribute('aria-pressed',String(on));});
for(const dialog of document.querySelectorAll('dialog'))dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
$('#array-link').href=D.arrayUrl;
window.addEventListener('hashchange',render);
if(window.CARD_UI)window.CARD_UI.restoreRoute();else if(!location.hash)history.replaceState(null,'','#/themes');
render();

