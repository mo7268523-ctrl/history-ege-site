// V295: проверенные примеры работы с документами по теме 7.2.
window.HISTORY295 = {"version":"V295","files":["optimized-v243a/revolution-1917-v295-0.js","optimized-v243a/revolution-1917-v295-1.js","optimized-v243a/revolution-1917-v295-2.js","optimized-v243a/revolution-1917-v295-3.js"],"taskLinks":[{"taskId":"author-1917-april-source-check","itemId":"source-criticism"},{"taskId":"author-1917-letter-and-appeal","itemId":"source-extract"}]};
(() => {
  const revision = window.HISTORY295;
  const history = window.HISTORY293;
  history.files = revision.files;
  const summary = history.summary.CARD_DATA;
  for (const { taskId, itemId } of revision.taskLinks) {
    summary.items[itemId].taskIds.push(taskId);
    summary.tasks[taskId] = null;
  }
})();
