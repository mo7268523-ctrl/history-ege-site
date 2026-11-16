// Только события пользователя/жизненного цикла. Периодических перезагрузок нет.
(()=>{'use strict';
 const KEY='history-ege-view-v1'; let state={route:'',views:{},modes:{}},activeRoute='',pending=false;
 const storage=()=>{try{return window.localStorage;}catch{return null;}};
 try{const saved=JSON.parse(storage()?.getItem(KEY)||'null');if(saved&&typeof saved==='object'){state.route=typeof saved.route==='string'?saved.route:'';state.views=saved.views||{};state.modes=saved.modes||{};}}catch{}
 const save=()=>{try{storage()?.setItem(KEY,JSON.stringify(state));}catch{}};
 const valid=hash=>{const p=String(hash||'').replace(/^#\/?/,'').split('/'),D=window.CARD_TOPICS?.[p[1]]?.CARD_DATA||window.CARD_DATA;if(p.length===1&&p[0]==='themes')return true;if(p[0]!=='topic'||p[1]!==D.topic.id)return false;if(p.length===2)return true;const cat=D.topic.categories.find(c=>c.id===p[3]);if(p[2]!=='category'||!cat)return false;if(p.length===4)return true;return p[4]==='item'&&!!D.items[p[5]]&&cat.items.includes(p[5])&&(p.length===6||(p[6]==='practice'&&(p.length===7||(p.length===8&&D.items[p[5]].taskIds.includes(p[7])))));};
 const frame=fn=>typeof window.requestAnimationFrame==='function'?window.requestAnimationFrame(fn):fn();
 const capture=()=>{if(!activeRoute||!valid(activeRoute))return;const selected=document.querySelector('[data-reading][aria-pressed="true"]');state.views[activeRoute]={scroll:Math.max(0,Number(window.scrollY)||0),reading:selected?.dataset?.reading||'retelling'};state.route=activeRoute;save();};
 const mode=cat=>state.modes[cat.id]||(/-(K02|U01|U09)$/.test(cat.id)?'dates':'sources');
 const dateKey=it=>{const label=it.dateLabel||it.tag||(Number.isFinite(it.sortYear)?String(it.sortYear):'');if(/уточнен|уточнён|проверк/.test(label))return null;const year=label.match(/\b(1\d{3}|20\d{2})\b/);if(!year)return null;const months=['январ','феврал','март','апрел','мая','июн','июл','август','сентябр','октябр','ноябр','декабр'];const mi=months.findIndex(m=>label.toLowerCase().includes(m));const day=mi<0?0:Number(label.match(/^\s*(\d{1,2})\s+[а-я]/i)?.[1]||0);return [Number(year[1]),mi<0?13:mi+1,day||32];};
 const sourceCompare=(a,b,D,origins)=>{const aa=origins(D.items[a]),bb=origins(D.items[b]);if(aa.length!==bb.length)return bb.length-aa.length;for(const t of ['fipi','exam','reference','logic']){const d=Number(bb.includes(t))-Number(aa.includes(t));if(d)return d;}return D.items[a].title.localeCompare(D.items[b].title,'ru')||a.localeCompare(b);};
 window.CARD_UI={mode,capture,dateKey,
  setMode(id,value){if(!['dates','sources'].includes(value))return;state.modes[id]=value;save();},
  sort(ids,cat,D,origins){return ids.sort((a,b)=>{if(mode(cat)==='dates'){const aa=dateKey(D.items[a]),bb=dateKey(D.items[b]);if(aa&&!bb)return -1;if(bb&&!aa)return 1;if(aa&&bb){for(let i=0;i<3;i++)if(aa[i]!==bb[i])return aa[i]-bb[i];}}return sourceCompare(a,b,D,origins);});},
  restoreRoute(){if(!location.hash||location.hash==='#'||!valid(location.hash)){history.replaceState(null,'',valid(state.route)?state.route:'#/themes');}activeRoute=location.hash;},
  restoreView(){activeRoute=location.hash;state.route=activeRoute;const v=state.views[activeRoute]||{};const reading=v.reading==='quote'?'quote':'retelling';document.querySelectorAll('[data-reading]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.reading===reading)));document.querySelectorAll('.reading-variant').forEach(el=>el.hidden=!el.classList.contains('variant-'+reading));save();const routeToRestore=activeRoute;if(!routeToRestore.includes('/practice/'))frame(()=>frame(()=>{if(location.hash===routeToRestore)window.scrollTo(0,Math.max(0,Number(v.scroll)||0));}));}
 };
 window.addEventListener('pagehide',capture);window.addEventListener('beforeunload',capture);
 document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')capture();});
 window.addEventListener('scroll',()=>{if(pending)return;pending=true;frame(()=>{pending=false;capture();});},{passive:true});
})();
