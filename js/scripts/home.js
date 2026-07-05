function buildHomeGrid() {
  updateHomeSectionHeader(activeHomeType);
  renderHomeGrid(activeHomeType, activeHomeSearchQuery);
}

function getSafeHomeViewMode(mode = 'card') {
  if (mode === 'list') return 'table';
  return mode === 'table' ? 'table' : 'card';
}

function loadHomeViewMode() {
  try {
    const savedMode = localStorage.getItem(HOME_VIEW_MODE_STORAGE_KEY);
    activeHomeViewMode = getSafeHomeViewMode(savedMode || 'card');
  } catch (error) {
    activeHomeViewMode = 'card';
  }
}

function applyHomeViewMode(mode = activeHomeViewMode) {
  const grid = document.getElementById('homeGrid');
  if (!grid) return;
  const safeMode = getSafeHomeViewMode(mode);
  grid.classList.toggle('table-view', safeMode === 'table');
}

function syncHomeViewToggleButtons() {
  const cardBtn = document.getElementById('homeViewCardBtn');
  const tableBtn = document.getElementById('homeViewTableBtn');
  if (!cardBtn || !tableBtn) return;

  const isCard = activeHomeViewMode !== 'table';
  cardBtn.classList.toggle('active', isCard);
  tableBtn.classList.toggle('active', !isCard);
  cardBtn.setAttribute('aria-pressed', isCard ? 'true' : 'false');
  tableBtn.setAttribute('aria-pressed', isCard ? 'false' : 'true');
}

function setHomeViewMode(mode = 'card') {
  const safeMode = getSafeHomeViewMode(mode);
  if (safeMode === activeHomeViewMode) {
    applyHomeViewMode(safeMode);
    syncHomeViewToggleButtons();
    return;
  }

  activeHomeViewMode = safeMode;
  try {
    localStorage.setItem(HOME_VIEW_MODE_STORAGE_KEY, safeMode);
  } catch (error) {
    // Ignore storage errors and keep in-memory preference.
  }

  applyHomeViewMode(safeMode);
  syncHomeViewToggleButtons();
  if (showFavoritesOnly) {
    if (typeof window !== 'undefined' && window.showUnifiedFavoritesPage) {
      window.showUnifiedFavoritesPage(activeHomeSearchQuery);
    } else {
      renderHomeGrid(activeHomeType, activeHomeSearchQuery);
    }
  } else {
    renderHomeGrid(activeHomeType, activeHomeSearchQuery);
  }
}

function setupHomeViewToggle() {
  const cardBtn = document.getElementById('homeViewCardBtn');
  const tableBtn = document.getElementById('homeViewTableBtn');
  if (!cardBtn || !tableBtn) return;

  cardBtn.addEventListener('click', () => setHomeViewMode('card'));
  tableBtn.addEventListener('click', () => setHomeViewMode('table'));
  syncHomeViewToggleButtons();
}

function getSafeTempleViewMode(mode = 'card') {
  if (mode === 'list') return 'table';
  return mode === 'table' ? 'table' : 'card';
}

function loadTempleViewMode() {
  try {
    const savedMode = localStorage.getItem(TEMPLE_VIEW_MODE_STORAGE_KEY);
    activeTempleViewMode = getSafeTempleViewMode(savedMode || 'card');
  } catch (error) {
    activeTempleViewMode = 'card';
  }
}

function applyTempleViewMode(mode = activeTempleViewMode) {
  const grid = document.getElementById('templesGrid');
  if (!grid) return;
  const safeMode = getSafeTempleViewMode(mode);
  grid.classList.toggle('table-view', safeMode === 'table');
}

function syncTempleViewToggleButtons() {
  const cardBtn = document.getElementById('templeViewCardBtn');
  const tableBtn = document.getElementById('templeViewTableBtn');
  if (!cardBtn || !tableBtn) return;

  const isCard = activeTempleViewMode !== 'table';
  cardBtn.classList.toggle('active', isCard);
  tableBtn.classList.toggle('active', !isCard);
  cardBtn.setAttribute('aria-pressed', isCard ? 'true' : 'false');
  tableBtn.setAttribute('aria-pressed', isCard ? 'false' : 'true');
}

function setTempleViewMode(mode = 'card') {
  const safeMode = getSafeTempleViewMode(mode);
  if (safeMode === activeTempleViewMode) {
    applyTempleViewMode(safeMode);
    syncTempleViewToggleButtons();
    return;
  }

  activeTempleViewMode = safeMode;
  try {
    localStorage.setItem(TEMPLE_VIEW_MODE_STORAGE_KEY, safeMode);
  } catch (error) {
    // Ignore storage errors and keep in-memory preference.
  }

  applyTempleViewMode(safeMode);
  syncTempleViewToggleButtons();
  renderTemples(activeTempleFilter, { reset: true });
}

function setupTempleViewToggle() {
  const cardBtn = document.getElementById('templeViewCardBtn');
  const tableBtn = document.getElementById('templeViewTableBtn');
  if (!cardBtn || !tableBtn) return;

  if (!cardBtn.dataset.bound) {
    cardBtn.addEventListener('click', () => setTempleViewMode('card'));
    cardBtn.dataset.bound = 'true';
  }
  if (!tableBtn.dataset.bound) {
    tableBtn.addEventListener('click', () => setTempleViewMode('table'));
    tableBtn.dataset.bound = 'true';
  }

  syncTempleViewToggleButtons();
}

function getFilteredHomeDeities(filter = activeHomeType, searchQuery = '') {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const favorites = getFavoriteDeities();
  return Object.entries(deities).filter(
    ([key, deity]) =>
      (showFavoritesOnly ? favorites.includes(key) : true) &&
      (filter === 'all' ? true : getDeityType(key) === filter) &&
      (!normalizedQuery ||
        `${key} ${deity.name} ${deity.desc} ${getDeityType(key)}`
          .toLowerCase()
          .includes(normalizedQuery)),
  );
}

function getHomeTagsHtml(key, deity) {
  const tags = [];
  if (hasLyricsContent(deity.aarti)) {
    tags.push(
      `<span class="tag tag-aarti" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'aarti' })">आरती</span>`,
    );
  }
  if (hasLyricsContent(deity.chalisa)) {
    tags.push(
      `<span class="tag tag-chalisa" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'chalisa' })">चालीसा</span>`,
    );
  }
  if (hasMantrasContent(deity.mantras)) {
    tags.push(
      `<span class="tag tag-mantra" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'mantra' })">मंत्र</span>`,
    );
  }
  if (hasLyricsContent(deity.katha)) {
    const kathaCount = getKathaEntries(deity.katha, key).length;
    const kathaLabel = kathaCount > 1 ? `कथा (${kathaCount})` : 'कथा';
    tags.push(
      `<span class="tag tag-katha" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'katha' })">${kathaLabel}</span>`,
    );
  }
  if (hasLyricsContent(deity.bhajan)) {
    const bhajanCount = getBhajanEntries(deity.bhajan, key).length;
    const bhajanLabel = bhajanCount > 1 ? `भजन (${bhajanCount})` : 'भजन';
    tags.push(
      `<span class="tag tag-bhajan" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'bhajan' })">${bhajanLabel}</span>`,
    );
  }
  const extraData = getExtraContentData(key);
  if (hasLyricsContent(extraData)) {
    const extraEntries = getExtraEntries(extraData);
    extraEntries.forEach((entry, idx) => {
      const extraTag = escapeHtml(getExtraEntryLabel(entry, idx));
      tags.push(
        `<span class="tag tag-extra" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'extra', initialExtraIndex: ${idx} })">${extraTag}</span>`,
      );
    });
  }
  const templeCount = getHomeTempleCount(key);
  if (templeCount > 0) {
    tags.push(
      `<span class="tag tag-temples" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'temples' })">मंदिर (${templeCount})</span>`,
    );
  }
  if (!tags.length) return '';

  const isExpanded = expandedHomeTags.has(key);
  const hasHiddenTags = tags.length > HOME_VISIBLE_TAG_COUNT;
  const visibleTags =
    hasHiddenTags && !isExpanded ? tags.slice(0, HOME_VISIBLE_TAG_COUNT) : tags;
  const toggleHtml = hasHiddenTags
    ? `<button class="tag tag-toggle" type="button" onclick="toggleHomeTags(event, '${key}')">${isExpanded ? 'कम..' : 'और..'}</button>`
    : '';

  return `<div class="deity-tags${isExpanded ? ' is-expanded' : ''}" data-home-tags-key="${key}">${visibleTags.join('')}${toggleHtml}</div>`;
}

function toggleHomeTags(event, key) {
  event.stopPropagation();
  if (!deities[key]) return;

  if (expandedHomeTags.has(key)) {
    expandedHomeTags.delete(key);
  } else {
    expandedHomeTags.add(key);
  }

  document
    .querySelectorAll(`[data-home-tags-key="${key}"]`)
    .forEach((tagsEl) => {
      tagsEl.outerHTML = getHomeTagsHtml(key, deities[key]);
    });
}

if (typeof window !== 'undefined') {
  window.toggleHomeTags = toggleHomeTags;
  window.toggleFavorite = toggleFavorite;
  window.toggleFavoritesView = toggleFavoritesView;
}

function toggleFavoritesView() {
  showFavoritesOnly = !showFavoritesOnly;
  // Show dedicated favorites page instead of filtering home grid
  if (showFavoritesOnly) {
    showUnifiedFavoritesPage(activeHomeSearchQuery);
  } else {
    showHomeByType('all', 'home');
  }
}

function toggleFavorite(deityKey) {
  if (!deities[deityKey]) return;
  const isNowFavorite = toggleDeityFavorite(deityKey);

  // Update all favorite buttons for this deity
  document
    .querySelectorAll(`.deity-favorite-btn[onclick*="'${deityKey}'"]`)
    .forEach((btn) => {
      btn.textContent = isNowFavorite ? '❤️' : '🤍';
      btn.setAttribute(
        'aria-label',
        isNowFavorite ? 'Remove from favorites' : 'Add to favorites',
      );
      btn.setAttribute(
        'title',
        isNowFavorite ? 'Remove from favorites' : 'Add to favorites',
      );
    });

  // If the favorites view is active, re-render that page immediately.
  if (showFavoritesOnly) {
    if (typeof window !== 'undefined' && window.showUnifiedFavoritesPage) {
      window.showUnifiedFavoritesPage(activeHomeSearchQuery);
    } else {
      renderHomeGrid(activeHomeType, activeHomeSearchQuery);
    }
  } else {
    syncFavoritesToggle();
  }
}

function getHomeCardHtml(key, deity, index) {
  const deityType = getDeityType(key);
  const imgSrc = getValidDeityImage(deity.img);
  const isPriorityImage = index < 6;
  const safeName = escapeHtml(deity?.name || 'श्री देव');
  const safeDesc = escapeHtml(deity?.desc || 'भक्ति सामग्री उपलब्ध');
  const safeEmoji = escapeHtml(deity?.emoji || '🪔');
  const isFavorite = isDeityFavorite(key);
  const favoriteIcon = isFavorite ? '❤️' : '🤍';
  const imgHtml = imgSrc
    ? `<img class="deity-img" src="${imgSrc}" alt="${safeName}" loading="${isPriorityImage ? 'eager' : 'lazy'}" fetchpriority="${isPriorityImage ? 'high' : 'low'}" width="${HOME_CARD_IMG_SIZE}" height="${HOME_CARD_IMG_SIZE}" decoding="async" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none';">
     <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>`
    : `<div class="deity-img-fallback">${safeEmoji}</div>`;
  return `
    <div class="deity-card" onclick="showDeityPage('${key}')">
    ${imgHtml}
    <div class="deity-info">
      <div class="deity-title-row">
        <span class="deity-name">${safeName}</span>
        <span class="deity-type-badge">${deityType}</span>
      </div>
      <span class="deity-meta">${safeDesc}</span>
      ${getHomeTagsHtml(key, deity)}
    </div>
    <button class="deity-favorite-btn" type="button" onclick="event.stopPropagation(); toggleFavorite('${key}')" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
      ${favoriteIcon}
    </button>
    </div>`;
}

function getHomeTableHtml(key, deity, index) {
  const deityType = getDeityType(key);
  const imgSrc = getValidDeityImage(deity.img);
  const isPriorityImage = index < 12;
  const safeName = escapeHtml(deity?.name || 'श्री देव');
  const safeDesc = escapeHtml(deity?.desc || 'भक्ति सामग्री उपलब्ध');
  const safeEmoji = escapeHtml(deity?.emoji || '🪔');
  const isFavorite = isDeityFavorite(key);
  const favoriteIcon = isFavorite ? '❤️' : '🤍';
  const imgHtml = imgSrc
    ? `<img class="deity-img" src="${imgSrc}" alt="${safeName}" loading="${isPriorityImage ? 'eager' : 'lazy'}" fetchpriority="${isPriorityImage ? 'high' : 'low'}" width="${HOME_TABLE_IMG_SIZE}" height="${HOME_TABLE_IMG_SIZE}" decoding="async" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none';">
     <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>`
    : `<div class="deity-img-fallback">${safeEmoji}</div>`;

  return `
    <div class="deity-card deity-card-table" onclick="showDeityPage('${key}')">
    ${imgHtml}
    <div class="deity-info">
      <div class="deity-title-row">
        <span class="deity-name">${safeName}</span>
        <span class="deity-type-badge">${deityType}</span>
      </div>
      <span class="deity-meta">${safeDesc}</span>
      ${getHomeTagsHtml(key, deity)}
    </div>
    <button class="deity-favorite-btn" type="button" onclick="event.stopPropagation(); toggleFavorite('${key}')" aria-label="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}" title="${isFavorite ? 'Remove from favorites' : 'Add to favorites'}">
      ${favoriteIcon}
    </button>
    </div>`;
}

function getHomeTempleCount(deityKey) {
  if (homeTempleCountCache.has(deityKey)) {
    return homeTempleCountCache.get(deityKey);
  }
  const count = getRelatedTemples(deityKey).length;
  homeTempleCountCache.set(deityKey, count);
  return count;
}

function renderHomeGrid(
  filter = activeHomeType,
  searchQuery = activeHomeSearchQuery,
  options = {},
) {
  const { reset = true } = options;
  const grid = document.getElementById('homeGrid');
  if (!grid) return;

  if (reset) {
    homeRenderCycleId += 1;
    expandedHomeTags.clear();
    homeFilteredEntries = getFilteredHomeDeities(filter, searchQuery);
    renderedHomeCount = 0;
    grid.innerHTML = '';

    if (!homeFilteredEntries.length) {
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const queryText = normalizedQuery
        ? ` "${escapeHtml(searchQuery.trim())}"`
        : '';
      grid.innerHTML = `
        <div class="home-empty-state">
          <div class="home-empty-icon">🔍</div>
          <div class="home-empty-title">कोई परिणाम नहीं मिला${queryText}</div>
          <div class="home-empty-subtitle">दूसरा नाम लिखें या ऊपर की श्रेणी बदलकर देखें</div>
        </div>
      `;
      return;
    }
  }

  applyHomeViewMode(activeHomeViewMode);
  const nextBatch = homeFilteredEntries.slice(
    renderedHomeCount,
    renderedHomeCount + HOME_BATCH_SIZE,
  );
  if (!nextBatch.length) return;

  const html = nextBatch
    .map(([key, deity], idx) =>
      activeHomeViewMode === 'table'
        ? getHomeTableHtml(key, deity, idx)
        : getHomeCardHtml(key, deity, idx),
    )
    .join('');
  grid.insertAdjacentHTML('beforeend', html);
  renderedHomeCount += nextBatch.length;

  if (reset) fillHomeViewportIfNeeded();
}

function fillHomeViewportIfNeeded() {
  let guard = 0;
  while (
    renderedHomeCount < homeFilteredEntries.length &&
    isDocumentShort() &&
    guard < 8
  ) {
    renderHomeGrid(activeHomeType, activeHomeSearchQuery, { reset: false });
    guard += 1;
  }
}

function maybeLoadMoreHomeOnScroll() {
  const homePage = document.getElementById('page-home');
  if (!homePage || !homePage.classList.contains('active')) return;
  if (homeRenderTimer) return;
  if (renderedHomeCount >= homeFilteredEntries.length) return;
  if (!isNearDocumentBottom()) return;
  renderHomeGrid(activeHomeType, activeHomeSearchQuery, { reset: false });
  window.requestAnimationFrame(maybeLoadMoreHomeOnScroll);
}

function showHomeByType(typeId = 'all', navId = 'home', options = {}) {
  const safeType = getSafeHomeType(typeId);
  const safeNavId = navId || getNavIdByHomeType(safeType);
  activeHomeType = safeType;
  activeHomeNavId = safeNavId;
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  showFavoritesOnly = false;
  updateHomeSectionHeader(safeType);
  showPage('home', safeNavId);
  const grid = document.getElementById('homeGrid');
  if (grid) {
    grid.classList.remove('favorites-page-grid');
  }
  const searchInput = document.getElementById('homeSearchInput');
  if (searchInput) {
    searchInput.placeholder = getHomeSearchPlaceholder(safeType);
  }
  if (!grid) return;
  applyHomeViewMode(activeHomeViewMode);
  syncFavoritesToggle();
  if (homeRenderTimer) {
    clearTimeout(homeRenderTimer);
    homeRenderTimer = null;
  }
  const cycleId = homeRenderCycleId + 1;
  grid.style.opacity = '0';
  grid.style.transform = 'translateY(12px)';
  homeRenderTimer = setTimeout(() => {
    homeRenderTimer = null;
    if (cycleId < homeRenderCycleId) return;
    renderHomeGrid(safeType, activeHomeSearchQuery);
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
  }, 40);

  if (!options.skipUrl) {
    updateUrlState({ typeId: safeType, deityKey: '' });
  }
}

function setupHomeSearch() {
  const searchInput = document.getElementById('homeSearchInput');
  const clearBtn = document.getElementById('homeSearchClear');
  if (!searchInput) return;

  const syncClearButton = () => {
    if (!clearBtn) return;
    clearBtn.classList.toggle('visible', searchInput.value.trim().length > 0);
  };

  searchInput.value = activeHomeSearchQuery;
  searchInput.placeholder = getHomeSearchPlaceholder(activeHomeType);
  syncClearButton();

  searchInput.addEventListener('input', (event) => {
    if (homeRenderTimer) {
      clearTimeout(homeRenderTimer);
      homeRenderTimer = null;
    }
    activeHomeSearchQuery = event.target.value;
    if (
      showFavoritesOnly &&
      typeof window !== 'undefined' &&
      window.showUnifiedFavoritesPage
    ) {
      window.showUnifiedFavoritesPage(activeHomeSearchQuery);
    } else {
      renderHomeGrid(activeHomeType, activeHomeSearchQuery);
    }
    syncClearButton();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (homeRenderTimer) {
        clearTimeout(homeRenderTimer);
        homeRenderTimer = null;
      }
      activeHomeSearchQuery = '';
      searchInput.value = '';
      if (
        showFavoritesOnly &&
        typeof window !== 'undefined' &&
        window.showUnifiedFavoritesPage
      ) {
        window.showUnifiedFavoritesPage(activeHomeSearchQuery);
      } else {
        renderHomeGrid(activeHomeType, activeHomeSearchQuery);
      }
      syncClearButton();
      searchInput.focus();
    });
  }
}

function syncFavoritesToggle() {
  const navFavoritesBtn = document.getElementById('navFavoritesBtn');
  if (!navFavoritesBtn) return;

  const favoritesIcon = navFavoritesBtn.querySelector('.favorites-nav-icon');
  const favorites = getFavoriteDeities();

  if (showFavoritesOnly) {
    navFavoritesBtn.classList.add('active');
    navFavoritesBtn.setAttribute('aria-label', 'Show all deities');
    navFavoritesBtn.setAttribute('title', 'Show all deities');
    if (favoritesIcon) favoritesIcon.textContent = '❤️';
  } else {
    navFavoritesBtn.classList.remove('active');
    navFavoritesBtn.setAttribute('aria-label', 'Show favorites');
    navFavoritesBtn.setAttribute('title', 'Show favorites');
    if (favoritesIcon)
      favoritesIcon.textContent = favorites.length > 0 ? '❤️' : '🤍';
  }

  // Update section header based on favorites mode
  if (showFavoritesOnly) {
    const iconEl = document.getElementById('homeSectionIcon');
    const titleText = document.getElementById('homeSectionTitleText');
    const subtitleText = document.getElementById('homeSectionSubtitle');
    if (iconEl) iconEl.textContent = '❤️';
    if (titleText) titleText.textContent = 'पसंदीदा देव-देवी';
    if (subtitleText)
      subtitleText.textContent = 'आपके पसंदीदा देव-देवी की सूची';
  } else {
    updateHomeSectionHeader(activeHomeType);
  }
}
