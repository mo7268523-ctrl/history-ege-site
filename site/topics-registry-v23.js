// Названия, порядок и блоки категорий задаёт первая карточка.
// Элементы, задания, источники и основания остаются в пакетах соответствующих тем.
(()=>{'use strict';
 const keys=['CARD_DATA','CARD_LEARNING','CARD_PROVENANCE','CARD_PILOT','CARD_CATEGORY_REVIEW','CARD_CATEGORY_RULES','CARD_CATEGORY_ANSWERS','CARD_MEDIA'];
 const base=Object.fromEntries(keys.map(key=>[key,window[key]]));
 base.CARD_DATA.topic.previewImage='assets/page-127.webp';
 base.CARD_DATA.topic.previewLabel='Учебник: Крестьянская реформа';
 const categoryTemplate=base.CARD_DATA.topic.categories;
 window.CARD_TOPICS={ [base.CARD_DATA.topic.id]:base };
 for(const pack of window.CARD_TOPIC_PACKAGES||[]){
  if(!pack.CARD_DATA?.topic?.id)throw new Error('У пакета темы нет идентификатора');
  if(window.CARD_TOPICS[pack.CARD_DATA.topic.id])throw new Error('Повторный идентификатор темы');
  for(const key of keys)if(!pack[key])throw new Error('Неполный пакет темы: '+key);
  const categoriesByCode=new Map(pack.CARD_DATA.topic.categories.map(category=>[category.id.split('-').pop(),category]));
  if(categoriesByCode.size!==categoryTemplate.length)throw new Error('Состав категорий темы отличается от первой карточки');
  pack.CARD_DATA.topic.categories=categoryTemplate.map(template=>{
   const category=categoriesByCode.get(template.id.split('-').pop());
   if(!category)throw new Error('В теме отсутствует категория первой карточки: '+template.id);
   category.name=template.name;
   category.block=template.block;
   return category;
  });
  window.CARD_TOPICS[pack.CARD_DATA.topic.id]=pack;
 }
 window.CARD_TOPIC_KEYS=keys;
})();
