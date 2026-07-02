// ============ SCRIPTURES PAGE ============
function getScriptureById(scriptureId = '') {
  return scripturesData.find((item) => item.id === scriptureId);
}

function getScriptureParent(scripture) {
  if (!scripture || !scripture.parentId) return null;
  return getScriptureById(scripture.parentId);
}

function getScriptureHighlightLabel(item) {
  if (!item) return '';
  if (typeof item === 'string') return item;
  if (typeof item === 'object') return item.label || item.name || '';
  return '';
}

function getScriptureHighlightId(item) {
  if (!item || typeof item !== 'object') return '';
  return item.id || '';
}

function getScriptureHighlightItems(scripture) {
  if (!scripture || !Array.isArray(scripture.highlights)) return [];
  return scripture.highlights
    .map((item) => {
      const label = getScriptureHighlightLabel(item);
      if (!label) return null;
      const id = getScriptureHighlightId(item);
      return { label, id };
    })
    .filter(Boolean);
}

function getScriptureThemeValue(scripture, parent, key, fallback = '') {
  if (scripture && scripture[key]) return scripture[key];
  if (parent && parent[key]) return parent[key];
  return fallback;
}

function buildScripturesPage() {
  const grid = document.getElementById('scripturesGrid');
  if (!grid || grid.dataset.ready === 'true') return;

  const rootScriptures = scripturesData.filter((item) => !item.parentId);
  grid.innerHTML = rootScriptures
    .map((scripture, idx) => getScriptureCardHtml(scripture, idx))
    .join('');
  grid.dataset.ready = 'true';
}

function getScriptureCardHtml(scripture, idx) {
  const highlights = getScriptureHighlightItems(scripture)
    .slice(0, 3)
    .map((item) => escapeHtml(item.label))
    .join(' • ');
  const themeColor = scripture.color || '#d4af37';
  const themeGradient =
    scripture.gradient ||
    'linear-gradient(135deg, rgba(212,175,55,0.16), rgba(168,128,42,0.08))';

  return `
    <div class="temple-card" onclick="showScriptureDetailsPage('${scripture.id}')" style="animation-delay:${idx * 0.06}s; --card-accent-gradient:${themeGradient}; --temple-color:${themeColor};">
      <div class="temple-card-top">
        <div class="temple-emoji-badge">${scripture.emoji || '📜'}</div>
        <div class="temple-type-badge">${escapeHtml(scripture.category || '')}</div>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-name">${escapeHtml(scripture.name || '')}</h3>
        <p class="temple-name-en">${escapeHtml(scripture.nameEn || '')}</p>
        <div class="temple-location-row">
          <span class="temple-location-pin">📚</span>
          <span class="temple-state">${escapeHtml(scripture.count || '')}</span>
        </div>
        <p class="temple-desc">${escapeHtml(scripture.desc || '')}</p>
        <div class="temple-deity-badge">
          <span>${highlights}</span>
        </div>
      </div>
      <div class="temple-card-footer">
        <span class="temple-map-cta">ℹ️ विवरण देखें</span>
        <span class="temple-arrow">→</span>
      </div>
    </div>
  `;
}

function getScriptureDetailHeaderHtml(scripture) {
  const parent = getScriptureParent(scripture);
  const themeColor = getScriptureThemeValue(
    scripture,
    parent,
    'color',
    '#d4af37',
  );
  const themeEmoji = getScriptureThemeValue(scripture, parent, 'emoji', '📜');
  const category = getScriptureThemeValue(scripture, parent, 'category', '');
  const count = getScriptureThemeValue(scripture, parent, 'count', '');
  const metaItems = [
    category
      ? `<span class="temple-modal-type">${escapeHtml(category)}</span>`
      : '',
    count ? `<span class="temple-modal-type">${escapeHtml(count)}</span>` : '',
  ].filter(Boolean);
  const metaHtml = metaItems.length
    ? `<div class="temple-modal-meta">${metaItems.join('')}</div>`
    : '';

  return `
    <div class="temple-modal-hero" style="--temple-color:${themeColor}">
      <div class="temple-modal-hero-main">
        <div class="temple-modal-emoji">${themeEmoji}</div>
        <div>
          <h2>${escapeHtml(scripture.name || '')}</h2>
          <p>${escapeHtml(scripture.nameEn || '')}</p>
          ${metaHtml}
        </div>
      </div>
    </div>`;
}

function getScriptureDetailInfoHtml(scripture) {
  const parent = getScriptureParent(scripture);
  const category = getScriptureThemeValue(scripture, parent, 'category', '');
  const count = getScriptureThemeValue(scripture, parent, 'count', '');
  const period = getScriptureThemeValue(scripture, parent, 'period', '');
  const focus = getScriptureThemeValue(scripture, parent, 'focus', '');
  const overview =
    scripture.overview || scripture.desc || parent?.overview || '';
  const topics = scripture.topics || parent?.topics || '';
  const highlightItems = getScriptureHighlightItems(scripture);
  const highlightHtml = highlightItems
    .map((item) => {
      const target = item.id ? getScriptureById(item.id) : null;
      if (target) {
        return `<button class="temple-info-deity-link" type="button" onclick="showScriptureDetailsPage('${target.id}')">${escapeHtml(item.label)}</button>`;
      }
      return escapeHtml(item.label);
    })
    .join('<br/>');

  const infoCards = [];
  if (parent) {
    infoCards.push(`
      <div class="temple-info-card">
        <div class="temple-info-icon">🧭</div>
        <div>
          <div class="temple-info-label">मूल ग्रंथ</div>
          <div class="temple-info-val">
            <button class="temple-info-deity-link" type="button" onclick="showScriptureDetailsPage('${parent.id}')">${escapeHtml(parent.name || '')}</button>
          </div>
        </div>
      </div>
    `);
  }
  if (category) {
    infoCards.push(`
      <div class="temple-info-card">
        <div class="temple-info-icon">🏷️</div>
        <div>
          <div class="temple-info-label">श्रेणी</div>
          <div class="temple-info-val">${escapeHtml(category)}</div>
        </div>
      </div>
    `);
  }
  if (count) {
    infoCards.push(`
      <div class="temple-info-card">
        <div class="temple-info-icon">📚</div>
        <div>
          <div class="temple-info-label">संरचना</div>
          <div class="temple-info-val">${escapeHtml(count)}</div>
        </div>
      </div>
    `);
  }
  if (period) {
    infoCards.push(`
      <div class="temple-info-card">
        <div class="temple-info-icon">🕰️</div>
        <div>
          <div class="temple-info-label">परंपरा</div>
          <div class="temple-info-val">${escapeHtml(period)}</div>
        </div>
      </div>
    `);
  }
  if (focus) {
    infoCards.push(`
      <div class="temple-info-card">
        <div class="temple-info-icon">🧭</div>
        <div>
          <div class="temple-info-label">मुख्य केंद्र</div>
          <div class="temple-info-val">${escapeHtml(focus)}</div>
        </div>
      </div>
    `);
  }

  const overviewSection = overview
    ? `
    <div class="temple-history">
      <div class="temple-history-title">📜 परिचय</div>
      <p>${escapeHtml(overview)}</p>
    </div>`
    : '';
  const topicsSection = topics
    ? `
    <div class="temple-history">
      <div class="temple-history-title">✨ मुख्य विषय</div>
      <p>${escapeHtml(topics)}</p>
    </div>`
    : '';
  const highlightSection = highlightItems.length
    ? `
    <div class="temple-history">
      <div class="temple-history-title">🪔 प्रमुख ग्रंथ</div>
      <p>${highlightHtml}</p>
    </div>`
    : '';

  return `
    <div class="temple-info-grid">
      ${infoCards.join('')}
    </div>
    ${overviewSection}
    ${topicsSection}
    ${highlightSection}`;
}

function showScriptureDetailsPage(scriptureId, options = {}) {
  const { skipUrl = false } = options;
  const scripture = scripturesData.find((item) => item.id === scriptureId);
  if (!scripture) {
    showScripturesMenuPage({ skipUrl });
    return;
  }
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = scripture.id;
  const headerEl = document.getElementById('scriptureDetailHeader');
  const infoEl = document.getElementById('scriptureDetailInfo');
  if (!headerEl || !infoEl) return;
  headerEl.innerHTML = getScriptureDetailHeaderHtml(scripture);
  infoEl.innerHTML = getScriptureDetailInfoHtml(scripture);
  showPage('scripture-detail', 'scriptures');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'scripture-detail',
      scriptureId: scripture.id,
    });
  }
}

for (const key in aartiData) {
  if (deities[key]) deities[key].aarti = aartiData[key];
}
for (const key in chalisaData) {
  if (deities[key]) deities[key].chalisa = chalisaData[key];
}
for (const key in mantraData) {
  if (deities[key]) deities[key].mantras = mantraData[key];
}
for (const key in kathaData) {
  if (deities[key]) deities[key].katha = kathaData[key];
}
for (const key in bhajanData) {
  if (deities[key]) deities[key].bhajan = bhajanData[key];
}

