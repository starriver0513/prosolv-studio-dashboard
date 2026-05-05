// AI経営可視化システム - 静的データロード（オプショナル）
(function() {
  // data.json があれば読み込む（同期スクリプトが生成）
  fetch('assets/data.json')
    .then(r => r.ok ? r.json() : null)
    .then(data => {
      if (!data) return;
      const set = (id, val) => {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.textContent = val;
      };
      set('total-tasks', data.total_tasks);
      set('in-progress', data.in_progress);
      set('p0-tasks', data.p0_tasks);
      set('last-update', data.last_update);

      // 各BUカードに件数を表示
      if (data.business_units) {
        Object.entries(data.business_units).forEach(([name, stats]) => {
          const card = document.querySelector(`[data-bu="${name}"] .stats`);
          if (card) {
            card.innerHTML = `<span>📋 ${stats.tasks||0}件</span><span>📁 ${stats.subfolders||0}フォルダ</span>`;
          }
        });
      }
    })
    .catch(() => {});
})();
