// ============ FESTIVALS PAGE ============
const festivalCategories = [
  { id: 'all', label: '✨ सभी' },
  { id: 'Major', label: '🏵️ प्रमुख पर्व' },
  { id: 'Vaishnava', label: '🦚 वैष्णव' },
  { id: 'Shaiva', label: '🔱 शैव' },
  { id: 'Ganapatya', label: '🐘 गणपति' },
  { id: 'Family', label: '👪 परिवार' },
  { id: 'Seasonal', label: '🌾 मौसमी' },
  { id: 'Surya', label: '☀️ सूर्य उपासना' },
];
let activeFestivalFilter = 'all';
const FESTIVAL_BATCH_SIZE = 30;
let festivalFilteredList = [];
let renderedFestivalCount = 0;

function buildFestivalsPage() {
  const filtersEl = document.getElementById('festivalFilters');
  if (!filtersEl || filtersEl.innerHTML !== '') return;

  filtersEl.innerHTML = festivalCategories
    .map(
      (cat) => `
    <button
      class="temple-filter-btn ${cat.id === 'all' ? 'active' : ''}"
      onclick="filterFestivals('${cat.id}', this)"
      data-category="${cat.id}"
    >${cat.label}</button>
  `,
    )
    .join('');

  renderFestivals('all');
}

function getFilteredFestivals(filter) {
  return filter === 'all'
    ? festivalsData
    : festivalsData.filter((festival) => festival.type === filter);
}

function getFestivalCardHtml(festival, idx) {
  const animationDelay = Math.min(idx, 7) * 0.06;
  return `
    <div class="temple-card" onclick="showFestivalDetailsPage('${festival.id}')" style="animation-delay:${animationDelay}s; --card-accent-gradient:${festival.gradient}; --temple-color:${festival.color};">
      <div class="temple-card-top">
        <div class="temple-emoji-badge">${festival.emoji}</div>
        <div class="temple-type-badge">${festival.type}</div>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-name">${festival.name}</h3>
        <p class="temple-name-en">${festival.nameEn}</p>
        <div class="temple-location-row">
          <span class="temple-location-pin">📅</span>
          <span class="temple-state">${festival.month}</span>
        </div>
        <p class="temple-desc">${festival.desc}</p>
        <div class="temple-deity-badge">
          <span>🌍 ${festival.regions}</span>
        </div>
      </div>
      <div class="temple-card-footer">
        <span class="temple-map-cta">ℹ️ विवरण देखें</span>
        <span class="temple-arrow">→</span>
      </div>
    </div>
  `;
}

function renderFestivals(filter, options = {}) {
  const { reset = true } = options;
  activeFestivalFilter = filter;
  const grid = document.getElementById('festivalsGrid');
  if (!grid) return;

  if (reset) {
    festivalFilteredList = getFilteredFestivals(filter);
    renderedFestivalCount = 0;
    grid.innerHTML = '';
  }

  const nextBatch = festivalFilteredList.slice(
    renderedFestivalCount,
    renderedFestivalCount + FESTIVAL_BATCH_SIZE,
  );
  if (!nextBatch.length) return;

  const html = nextBatch
    .map((festival, idx) => getFestivalCardHtml(festival, idx))
    .join('');
  grid.insertAdjacentHTML('beforeend', html);
  renderedFestivalCount += nextBatch.length;

  if (reset) fillFestivalsViewportIfNeeded();
}

function fillFestivalsViewportIfNeeded() {
  let guard = 0;
  while (
    renderedFestivalCount < festivalFilteredList.length &&
    isDocumentShort() &&
    guard < 8
  ) {
    renderFestivals(activeFestivalFilter, { reset: false });
    guard += 1;
  }
}

function maybeLoadMoreFestivalsOnScroll() {
  const festivalsPage = document.getElementById('page-festivals');
  if (!festivalsPage || !festivalsPage.classList.contains('active')) return;
  if (renderedFestivalCount >= festivalFilteredList.length) return;
  if (!isNearDocumentBottom()) return;
  renderFestivals(activeFestivalFilter, { reset: false });
  window.requestAnimationFrame(maybeLoadMoreFestivalsOnScroll);
}

function filterFestivals(category, btn) {
  document
    .querySelectorAll('#festivalFilters .temple-filter-btn')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('festivalsGrid');
  if (!grid) return;
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';
  setTimeout(() => {
    renderFestivals(category, { reset: true });
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

function getFestivalDetailHeaderHtml(festival) {
  return `
    <div class="temple-modal-hero" style="--temple-color:${festival.color}">
      <div class="temple-modal-hero-main">
        <div class="temple-modal-emoji">${festival.emoji}</div>
        <div>
          <h2>${festival.name}</h2>
          <p>${festival.nameEn}</p>
          <div class="temple-modal-meta">
            <span class="temple-modal-type">${festival.type}</span>
            <span class="temple-modal-type">📅 ${festival.month}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function getFestivalDetailInfoHtml(festival) {
  return `
    <div class="temple-info-grid">
      <div class="temple-info-card">
        <div class="temple-info-icon">📅</div>
        <div>
          <div class="temple-info-label">समय</div>
          <div class="temple-info-val">${festival.month}</div>
        </div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">🏵️</div>
        <div>
          <div class="temple-info-label">पर्व प्रकार</div>
          <div class="temple-info-val">${festival.type}</div>
        </div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">🌍</div>
        <div>
          <div class="temple-info-label">मुख्य क्षेत्र</div>
          <div class="temple-info-val">${festival.regions}</div>
        </div>
      </div>
    </div>
    <div class="temple-history">
      <div class="temple-history-title">✨ महत्व</div>
      <p>${festival.significance}</p>
    </div>
    <div class="temple-history">
      <div class="temple-history-title">🪔 प्रमुख अनुष्ठान</div>
      <p>${festival.rituals}</p>
    </div>`;
}

function showFestivalDetailsPage(festivalId, options = {}) {
  const { skipUrl = false } = options;
  const festival = festivalsData.find((f) => f.id === festivalId);
  if (!festival) {
    showFestivalsMenuPage({ skipUrl });
    return;
  }
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = festival.id;
  activeScriptureDetailId = '';
  const headerEl = document.getElementById('festivalDetailHeader');
  const infoEl = document.getElementById('festivalDetailInfo');
  if (!headerEl || !infoEl) return;
  headerEl.innerHTML = getFestivalDetailHeaderHtml(festival);
  infoEl.innerHTML = getFestivalDetailInfoHtml(festival);
  showPage('festival-detail', 'festivals');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'festival-detail',
      festivalId: festival.id,
    });
  }
}
