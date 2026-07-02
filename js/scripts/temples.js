// ============ DEITY TEMPLES TAB ============
// Maps deity page keys → deity field values in templesData
const deityTempleMap = {
  ganesh: ['गणेश'],
  shiva: ['शिव'],
  durga: ['दुर्गा'],
  lakshmi: ['लक्ष्मी'],
  saraswati: ['सरस्वती'],
  vishnu: ['विष्णु'],
  ram: ['राम', 'Ram'],
  krishna: ['कृष्ण', 'Krishna', 'जगन्नाथ', 'भगवान जगन्नाथ'],
  jagannath: ['जगन्नाथ'],
  hanuman: ['हनुमान'],
  surya: ['सूर्य'],
  kali: ['काली'],
  khatu_shyam: ['खाटू श्याम'],
  shani: ['शनि'],
  brihaspati: ['बृहस्पति', 'बृहस्पतेश्वर', 'गुरु भगवान'],
  gopal: ['कृष्ण', 'Krishna'],
  brahma: ['ब्रह्मा'],
  bhairav: ['भैरव'],
  batuk_bhairav: ['भैरव'],
  navgrah: ['सूर्य', 'शनि'],
  vishwakarma: ['विश्वकर्मा'],
  ravidas: ['रविदास'],
  gorakh_nath: ['गोरख'],
  jaharveer: ['जाहरवीर'],
  pretraj_sarkar: ['प्रेतराज'],
  balaji: ['हनुमान', 'बालाजी'],
  tirupati_balaji: ['तिरुपति बालाजी', 'वेंकटेश्वर'],
  sai: ['साईं'],
  giriraj: ['गिरिराज', 'गोवर्धन'],
  mahavir: ['महावीर'],
  parshuram: ['परशुराम'],
  ramdev: ['रामदेव'],
  pitar: ['पितर'],
  baba_gangaram: ['गंगाराम'],
  vindhyeshwari: ['विंध्यवासिनी', 'विन्ध्येश्वरी'],
  mahalakshmi: ['लक्ष्मी'],
  gayatri: ['गायत्री'],
  mahakali: ['काली'],
  sheetla: ['शीतला'],
  radha: ['राधा', 'Radha'],
  tulsi: [],
  vaishno_devi: ['वैष्णो देवी', 'दुर्गा'],
  santoshi_maa: ['संतोषी'],
  annapurna: ['अन्नपूर्णा'],
  parvati: ['शिव'],
  baglamukhi: ['बगलामुखी'],
  ganga: ['गंगा'],
  narmada: ['नर्मदा'],
  sharda: ['सरस्वती', 'शारदा'],
  shakambhari: ['शाकम्भरी'],
  lalita_shakambhari: ['शाकम्भरी', 'ललिता'],
  rani_sati: ['राणी सती', 'रानी सती', 'माता रानी सती'],
};

const deityTempleIdMap = {
  annapurna: ['annapurna-temple'],
  brihaspati: [
    'brihaspati-dham-temple',
    'brihaspateeshwar-temple',
    'alangudi-guru-bhagavan-temple',
  ],
  gayatri: ['gayatri-dham-haridwar', 'panch-gayatri-dham'],
  narmada: ['omkareshwar', 'maheshwar', 'hoshangabad', 'mandla'],
  parshuram: ['parshuram-temple-bihar'],
  pretraj_sarkar: ['mehndipur-balaji'],
  tirupati_balaji: ['tirupati'],
  radha: [
    'iskcon_london',
    'iskcon_usa',
    'radha_radhanath_sa',
    'iskcon_australia',
  ],
};

function getDeityKeyByTempleName(deityName = '') {
  const raw = String(deityName || '')
    .trim()
    .toLowerCase();
  if (!raw) return '';

  let fallbackKey = '';
  for (const [key, aliases] of Object.entries(deityTempleMap)) {
    for (const alias of aliases) {
      const normalizedAlias = String(alias || '')
        .trim()
        .toLowerCase();
      if (!normalizedAlias) continue;
      if (raw === normalizedAlias) return key;
      if (
        !fallbackKey &&
        (raw.includes(normalizedAlias) || normalizedAlias.includes(raw))
      ) {
        fallbackKey = key;
      }
    }
  }

  return fallbackKey;
}

function openTempleDeity(deityName, event) {
  if (event) event.stopPropagation();
  const deityKey = getDeityKeyByTempleName(deityName);
  if (!deityKey || !deities[deityKey]) return;
  closeTempleModal();
  showDeityPage(deityKey, { initialTab: 'temples' });
}

function openTempleDeityByTempleId(templeId, event) {
  if (event) event.stopPropagation();
  const temple = templesData.find((t) => t.id === templeId);
  if (!temple) return;
  openTempleDeity(temple.deity);
}

function getRelatedTemples(deityKey) {
  const deityNames = deityTempleMap[deityKey] || [];
  const deityTempleIds = deityTempleIdMap[deityKey] || [];
  return templesData.filter(
    (t) =>
      deityTempleIds.includes(t.id) ||
      deityNames.some((name) => t.deity.includes(name)),
  );
}

function renderDeityTemples(deityKey) {
  const related = getRelatedTemples(deityKey);

  if (related.length === 0) {
    return `
      <div class="deity-temples-empty">
        <div class="deity-temples-empty-icon">🛕</div>
        <p>इस देवता के विशेष मंदिर अभी सूची में नहीं हैं।</p>
        <button class="deity-temples-all-btn" onclick="showPage('temples')">
          सभी प्रसिद्ध मंदिर देखें →
        </button>
      </div>`;
  }

  const cards = related
    .map(
      (temple, idx) => `
    <div class="temple-card deity-temple-card" onclick="openTempleModal('${temple.id}')"
         style="animation-delay:${idx * 0.08}s; --card-accent-gradient:${temple.gradient}; --temple-color:${temple.color};">
      <div class="temple-card-top">
        <div class="temple-emoji-badge">${temple.emoji}</div>
        <div class="temple-type-badge">${getTempleTypeLabel(temple.type)}</div>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-name">${temple.name}</h3>
        <p class="temple-name-en">${temple.nameEn}</p>
        <div class="temple-location-row">
          <span class="temple-location-pin">📍</span>
          <span class="temple-state">${temple.location}</span>
        </div>
        <p class="temple-desc">${temple.desc}</p>
      </div>
      <div class="temple-card-footer">
        <span class="temple-map-cta">ℹ️ विवरण देखें</span>
        <span class="temple-arrow">→</span>
      </div>
    </div>
  `,
    )
    .join('');

  return `
    <div class="deity-temples-intro">
      <span class="deity-temples-count">${related.length} मंदिर</span> इस देवता से संबंधित प्रसिद्ध तीर्थ स्थल
    </div>
    <div class="temples-grid deity-temples-grid">${cards}</div>
    <button class="deity-temples-all-btn" onclick="showPage('temples')">
      🛕 सभी प्रसिद्ध मंदिर देखें
    </button>`;
}

// ============ TEMPLES PAGE ============
const templeCategories = [
  { id: 'all', label: '✨ सभी', emoji: '🛕' },
  { id: 'india', label: '🇮🇳 भारत', emoji: '🇮🇳' },
  { id: 'outside_india', label: '🌍 विदेश', emoji: '🌍' },
  { id: 'jyotirlinga', label: '🔱 ज्योतिर्लिंग', emoji: '🔱' },
  { id: 'char_dham', label: '🙏 चार धाम', emoji: '🙏' },
  { id: 'shakti_peeth', label: '🌺 शक्ति पीठ', emoji: '🌺' },
  { id: 'vaishnava', label: '🦚 वैष्णव', emoji: '🦚' },
  { id: 'heritage', label: '🏛️ धरोहर', emoji: '🏛️' },
  { id: 'temple', label: '🛕 मंदिर', emoji: '🛕' },
  { id: 'pilgrimage', label: '🙏 तीर्थ', emoji: '🙏' },
  { id: 'peeth_math', label: '📿 पीठ/मठ', emoji: '📿' },
  { id: 'shiv', label: '🕉️ शिव', emoji: '🕉️' },
  { id: 'krishna', label: '🪈 कृष्ण', emoji: '🪈' },
  { id: 'hanuman', label: '🐒 हनुमान', emoji: '🐒' },
  { id: 'ganesh', label: '🐘 गणेश', emoji: '🐘' },
  { id: 'jain', label: '☸️ जैन', emoji: '☸️' },
];
let activeTempleFilter = 'all';
let activeTempleSearchQuery = '';
const TEMPLE_BATCH_SIZE = 30;
const TEMPLE_VISIBLE_FILTER_COUNT = 3;
let templeFilteredList = [];
let renderedTempleCount = 0;
let templeScrollTicking = false;
let templeVisibleFilterCount = TEMPLE_VISIBLE_FILTER_COUNT;

function isOutsideIndiaTemple(temple) {
  const text = `${temple.state || ''} ${temple.location || ''}`.toLowerCase();
  return (
    text.includes('usa') ||
    text.includes('uk') ||
    text.includes('england') ||
    text.includes('australia') ||
    text.includes('south africa') ||
    text.includes('thailand') ||
    text.includes('nepal') ||
    text.includes('pakistan') ||
    text.includes('united kingdom') ||
    text.includes('नेपाल') ||
    text.includes('पाकिस्तान')
  );
}

function includesKeyword(value = '', keyword = '') {
  return String(value || '')
    .toLowerCase()
    .includes(String(keyword || '').toLowerCase());
}

function includesAnyKeyword(value = '', keywords = []) {
  return keywords.some((keyword) => includesKeyword(value, keyword));
}

function matchesTempleFilter(temple, filter) {
  const type = String(temple.type || '').toLowerCase();
  const deity = String(temple.deity || '').toLowerCase();
  const name = String(temple.name || '').toLowerCase();

  if (filter === 'all') return true;
  if (filter === 'india') return !isOutsideIndiaTemple(temple);
  if (filter === 'outside_india') return isOutsideIndiaTemple(temple);

  if (filter === 'jyotirlinga') return includesKeyword(type, 'jyotirlinga');
  if (filter === 'char_dham') return includesKeyword(type, 'char dham');
  if (filter === 'shakti_peeth') return includesKeyword(type, 'shakti peeth');
  if (filter === 'vaishnava') return includesKeyword(type, 'vaishnava');
  if (filter === 'heritage') return includesKeyword(type, 'heritage');
  if (filter === 'shiv')
    return includesAnyKeyword(`${deity} ${name}`, ['shiv', 'शिव']);
  if (filter === 'krishna')
    return includesAnyKeyword(`${deity} ${name}`, [
      'krishna',
      'कृष्ण',
      'जगन्नाथ',
      'radha',
      'राधा',
      'govardhan',
      'गोवर्धन',
    ]);
  if (filter === 'hanuman')
    return includesAnyKeyword(`${deity} ${name}`, [
      'hanuman',
      'हनुमान',
      'balaji',
      'बालाजी',
    ]);
  if (filter === 'ganesh')
    return includesAnyKeyword(`${deity} ${name} ${type}`, ['ganesh', 'गणेश']);
  if (filter === 'jain')
    return includesAnyKeyword(`${deity} ${name} ${type}`, ['jain', 'जैन']);

  if (filter === 'temple')
    return includesKeyword(type, 'temple') || includesKeyword(type, 'mandir');

  if (filter === 'pilgrimage') {
    return (
      includesKeyword(type, 'pilgrimage') ||
      includesKeyword(type, 'dham') ||
      includesKeyword(type, 'teerth') ||
      includesKeyword(type, 'sacred hill') ||
      includesKeyword(type, 'char dham')
    );
  }

  if (filter === 'peeth_math') {
    return (
      includesKeyword(type, 'peeth') ||
      includesKeyword(type, 'peetham') ||
      includesKeyword(type, 'math')
    );
  }

  return type === String(filter || '').toLowerCase();
}

function getTempleTypeLabel(type = '') {
  const normalizedType = String(type || '')
    .trim()
    .toLowerCase();
  const templeTypeLabels = {
    jyotirlinga: 'ज्योतिर्लिंग',
    'shakti peeth': 'शक्ति पीठ',
    'shakti peeth / dham': 'शक्ति पीठ / धाम',
    vaishnava: 'वैष्णव',
    heritage: 'धरोहर',
    'char dham': 'चार धाम',
    'hindu temple': 'हिंदू मंदिर',
    'hindu temple / dham': 'हिंदू मंदिर / धाम',
    'hindu temple / pilgrimage': 'हिंदू मंदिर / तीर्थ',
    'hindu temple / teerth': 'हिंदू मंदिर / तीर्थ',
    'hindu temple / monastery': 'हिंदू मंदिर / मठ',
    'hindu temple / gurudwara': 'हिंदू मंदिर / गुरुद्वारा',
    'ancient peeth / temple': 'प्राचीन पीठ / मंदिर',
    'peetham / math': 'पीठ / मठ',
    'pilgrimage / sacred hill': 'तीर्थ / पवित्र पर्वत',
    'city / pilgrimage': 'नगर / तीर्थ',
    'temple / town': 'मंदिर / नगर',
    'ganesh temple': 'गणेश मंदिर',
    'jain temple': 'जैन मंदिर',
    'saint shrine': 'संत समाधि स्थल',
  };

  return templeTypeLabels[normalizedType] || String(type || '');
}

function buildTemplesPage() {
  // Build filters
  const filtersEl = document.getElementById('templeFilters');
  if (!filtersEl) return;
  if (filtersEl.innerHTML === '') {
    renderTempleFilters();
  }

  setupTempleViewToggle();
  setupTempleSearch();
  renderTemples('all');
}

function getTempleFiltersHtml() {
  const activeIndex = Math.max(
    templeCategories.findIndex((cat) => cat.id === activeTempleFilter),
    0,
  );
  const clampedVisibleCount = Math.min(
    templeVisibleFilterCount,
    templeCategories.length,
  );
  const visibleIndexes = Array.from(
    new Set([
      ...templeCategories.slice(0, clampedVisibleCount).map((_, idx) => idx),
      activeIndex,
    ]),
  ).sort((left, right) => left - right);

  const buttonsHtml = visibleIndexes
    .map((idx) => {
      const cat = templeCategories[idx];
      return `
      <button
        class="temple-filter-btn ${cat.id === activeTempleFilter ? 'active' : ''}"
        onclick="filterTemples('${cat.id}', this)"
        data-category="${cat.id}"
      >${cat.label}</button>
    `;
    })
    .join('');

  const toggleHtml =
    templeCategories.length > TEMPLE_VISIBLE_FILTER_COUNT
      ? `
      <button
        class="temple-filter-btn temple-filter-toggle"
        type="button"
        onclick="toggleTempleFilters(event)"
      >${clampedVisibleCount >= templeCategories.length ? 'कम..' : 'और..'}</button>
    `
      : '';

  return `${buttonsHtml}${toggleHtml}`;
}

function renderTempleFilters() {
  const filtersEl = document.getElementById('templeFilters');
  if (!filtersEl) return;
  filtersEl.innerHTML = getTempleFiltersHtml();
}

function toggleTempleFilters(event) {
  if (event) event.stopPropagation();
  if (templeVisibleFilterCount >= templeCategories.length) {
    templeVisibleFilterCount = TEMPLE_VISIBLE_FILTER_COUNT;
  } else {
    templeVisibleFilterCount = Math.min(
      templeVisibleFilterCount + TEMPLE_VISIBLE_FILTER_COUNT,
      templeCategories.length,
    );
  }
  renderTempleFilters();
}

if (typeof window !== 'undefined') {
  window.toggleTempleFilters = toggleTempleFilters;
}

function getFilteredTemples(filter) {
  const byCategory = templesData.filter((temple) =>
    matchesTempleFilter(temple, filter),
  );
  const normalizedQuery = activeTempleSearchQuery.trim().toLowerCase();
  if (!normalizedQuery) return byCategory;

  return byCategory.filter((temple) =>
    `${temple.name} ${temple.nameEn} ${temple.deity} ${temple.type} ${temple.state} ${temple.location}`
      .toLowerCase()
      .includes(normalizedQuery),
  );
}

function getTempleCardHtml(temple, idx) {
  const animationDelay = Math.min(idx, 7) * 0.06;
  return `
    <div class="temple-card" onclick="showTempleDetailsPage('${temple.id}')" style="animation-delay:${animationDelay}s; --card-accent-gradient:${temple.gradient}; --temple-color:${temple.color};">
      <div class="temple-card-top">
        <div class="temple-emoji-badge">${temple.emoji}</div>
        <div class="temple-type-badge">${getTempleTypeLabel(temple.type)}</div>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-name">${temple.name}</h3>
        <p class="temple-name-en">${temple.nameEn}</p>
        <div class="temple-location-row">
          <span class="temple-location-pin">📍</span>
          <span class="temple-state">${temple.location}</span>
        </div>
        <p class="temple-desc">${temple.desc}</p>
        <div class="temple-deity-badge">
          <button class="temple-deity-link-btn" type="button" onclick="openTempleDeityByTempleId('${temple.id}', event)">🙏 ${temple.deity}</button>
        </div>
      </div>
      <div class="temple-card-footer">
        <span class="temple-map-cta">ℹ️ विवरण देखें</span>
        <span class="temple-arrow">→</span>
      </div>
    </div>
  `;
}

function renderTemples(filter, options = {}) {
  const { reset = true } = options;
  activeTempleFilter = filter;
  const grid = document.getElementById('templesGrid');
  if (!grid) return;
  applyTempleViewMode(activeTempleViewMode);

  if (reset) {
    templeFilteredList = getFilteredTemples(filter);
    renderedTempleCount = 0;
    grid.innerHTML = '';
    if (!templeFilteredList.length) {
      const queryText = activeTempleSearchQuery.trim()
        ? ` "${escapeHtml(activeTempleSearchQuery.trim())}"`
        : '';
      grid.innerHTML = `
        <div class="home-empty-state">
          <div class="home-empty-icon">🔍</div>
          <div class="home-empty-title">कोई मंदिर नहीं मिला${queryText}</div>
          <div class="home-empty-subtitle">दूसरा नाम लिखें या ऊपर का फ़िल्टर बदलकर देखें</div>
        </div>
      `;
      return;
    }
  }

  const nextBatch = templeFilteredList.slice(
    renderedTempleCount,
    renderedTempleCount + TEMPLE_BATCH_SIZE,
  );
  if (!nextBatch.length) return;

  const batchHtml = nextBatch
    .map((temple, idx) => getTempleCardHtml(temple, idx))
    .join('');
  grid.insertAdjacentHTML('beforeend', batchHtml);
  renderedTempleCount += nextBatch.length;

  if (reset) fillTemplesViewportIfNeeded();
}

function fillTemplesViewportIfNeeded() {
  let guard = 0;
  while (
    renderedTempleCount < templeFilteredList.length &&
    isDocumentShort() &&
    guard < 8
  ) {
    renderTemples(activeTempleFilter, { reset: false });
    guard += 1;
  }
}

function maybeLoadMoreTemplesOnScroll() {
  const templesPage = document.getElementById('page-temples');
  if (!templesPage || !templesPage.classList.contains('active')) return;
  if (renderedTempleCount >= templeFilteredList.length) return;
  if (!isNearDocumentBottom()) return;
  renderTemples(activeTempleFilter, { reset: false });
  window.requestAnimationFrame(maybeLoadMoreTemplesOnScroll);
}

function filterTemples(category, btn) {
  activeTempleFilter = category;
  renderTempleFilters();
  btn =
    btn ||
    document.querySelector(
      `#templeFilters .temple-filter-btn[data-category="${category}"]`,
    );
  document
    .querySelectorAll('#templeFilters .temple-filter-btn')
    .forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const grid = document.getElementById('templesGrid');
  if (!grid) return;
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';
  setTimeout(() => {
    renderTemples(category, { reset: true });
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 200);
}

function setupTempleSearch() {
  const searchInput = document.getElementById('templeSearchInput');
  const clearBtn = document.getElementById('templeSearchClear');
  if (!searchInput) return;

  const syncClearButton = () => {
    if (!clearBtn) return;
    clearBtn.classList.toggle('visible', searchInput.value.trim().length > 0);
  };

  searchInput.value = activeTempleSearchQuery;
  syncClearButton();

  if (!searchInput.dataset.bound) {
    searchInput.addEventListener('input', (event) => {
      activeTempleSearchQuery = event.target.value;
      renderTemples(activeTempleFilter, { reset: true });
      syncClearButton();
    });
    searchInput.dataset.bound = 'true';
  }

  if (clearBtn && !clearBtn.dataset.bound) {
    clearBtn.addEventListener('click', () => {
      activeTempleSearchQuery = '';
      searchInput.value = '';
      renderTemples(activeTempleFilter, { reset: true });
      syncClearButton();
      searchInput.focus();
    });
    clearBtn.dataset.bound = 'true';
  }
}

function getTempleDetailHeaderHtml(temple) {
  return `
    <div class="temple-modal-hero" style="--temple-color:${temple.color}">
      <div class="temple-modal-hero-main">
        <div class="temple-modal-emoji">${temple.emoji}</div>
        <div>
          <h2>${temple.name}</h2>
          <p>${temple.nameEn}</p>
          <div class="temple-modal-meta">
            <span class="temple-modal-type">${getTempleTypeLabel(temple.type)}</span>
            <a class="temple-type-link" href="https://www.google.com/maps/search/${temple.mapQuery}" target="_blank" rel="noopener">🗺️ Google Maps</a>
          </div>
        </div>
      </div>
    </div>`;
}

function getTempleDetailInfoHtml(temple) {
  return `
    <div class="temple-info-grid">
      <div class="temple-info-card">
        <div class="temple-info-icon">📍</div>
        <div>
          <div class="temple-info-label">स्थान</div>
          <div class="temple-info-val">${temple.location}</div>
        </div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">🙏</div>
        <div><div class="temple-info-label">देवता</div><div class="temple-info-val"><button class="temple-info-deity-link" type="button" onclick="openTempleDeity('${temple.deity}', event)">${temple.deity}</button></div></div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">🕐</div>
        <div><div class="temple-info-label">दर्शन समय</div><div class="temple-info-val">${temple.timings}</div></div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">📅</div>
        <div><div class="temple-info-label">सर्वश्रेष्ठ समय</div><div class="temple-info-val">${temple.bestTime}</div></div>
      </div>
    </div>
    <div class="temple-history">
      <div class="temple-history-title">📜 इतिहास</div>
      <p>${temple.history}</p>
    </div>`;
}

function showTempleDetailsPage(templeId, options = {}) {
  const { skipUrl = false } = options;
  const temple = templesData.find((t) => t.id === templeId);
  if (!temple) {
    showTemplesMenuPage({ skipUrl });
    return;
  }
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = temple.id;
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  const headerEl = document.getElementById('templeDetailHeader');
  const infoEl = document.getElementById('templeDetailInfo');
  if (!headerEl || !infoEl) return;
  headerEl.innerHTML = getTempleDetailHeaderHtml(temple);
  infoEl.innerHTML = getTempleDetailInfoHtml(temple);
  showPage('temple-detail', 'temples');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'temple-detail',
      templeId: temple.id,
    });
  }
}

function openTempleModal(id) {
  const temple = templesData.find((t) => t.id === id);
  if (!temple) return;
  document.getElementById('templeModalHeader').innerHTML =
    getTempleDetailHeaderHtml(temple);
  document.getElementById('templeModalInfo').innerHTML =
    getTempleDetailInfoHtml(temple);
  const modal = document.getElementById('templeMapModal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeTempleModal(e) {
  if (e && e.target !== document.getElementById('templeMapModal')) return;
  const modal = document.getElementById('templeMapModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}
