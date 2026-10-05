function buildHomeGrid() {
  syncHomeLandingMode();
  if (isHomeLandingView()) return;
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
      (filter === 'all' ? true : getCanonicalDeityType(key) === filter) &&
      (!normalizedQuery ||
        `${key} ${deity.name} ${deity.desc} ${getCanonicalDeityType(key)} ${getDeityType(key)}`
          .toLowerCase()
          .includes(normalizedQuery)),
  );
}

function getHomeTagsHtml(key, deity) {
  const tags = [];
  const manifest =
    typeof DEITY_CONTENT_MANIFEST !== 'undefined'
      ? DEITY_CONTENT_MANIFEST[key]
      : null;
  const tagName = (key) => (window.BhaktiI18n ? window.BhaktiI18n.t(key) : key);

  if (hasLyricsContent(deity.aarti) || manifest?.aarti) {
    tags.push(
      `<span class="tag tag-aarti" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'aarti' })">${tagName('tagAarti')}</span>`,
    );
  }
  if (hasLyricsContent(deity.chalisa) || manifest?.chalisa) {
    tags.push(
      `<span class="tag tag-chalisa" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'chalisa' })">${tagName('tagChalisa')}</span>`,
    );
  }
  if (hasGeetaContent(deity.geeta) || manifest?.geeta) {
    tags.push(
      `<span class="tag tag-geeta" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'geeta' })">${tagName('tagGeeta')}</span>`,
    );
  }
  if (hasMantrasContent(deity.mantras) || manifest?.mantra) {
    tags.push(
      `<span class="tag tag-mantra" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'mantra' })">${tagName('tagMantra')}</span>`,
    );
  }
  if (hasLyricsContent(deity.katha) || manifest?.katha) {
    const kathaCount = deity.katha
      ? getKathaEntries(deity.katha, key).length
      : manifest?.kathaCount || 1;
    const baseLabel = tagName('tagKatha');
    const kathaLabel =
      kathaCount > 1 ? `${baseLabel} (${kathaCount})` : baseLabel;
    tags.push(
      `<span class="tag tag-katha" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'katha' })">${kathaLabel}</span>`,
    );
  }
  if (hasLyricsContent(deity.bhajan) || manifest?.bhajan) {
    const bhajanCount = deity.bhajan
      ? getBhajanEntries(deity.bhajan, key).length
      : manifest?.bhajanCount || 1;
    const baseLabel = tagName('tagBhajan');
    const bhajanLabel =
      bhajanCount > 1 ? `${baseLabel} (${bhajanCount})` : baseLabel;
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
  } else if (manifest?.extra) {
    if (
      Array.isArray(manifest.extraEntries) &&
      manifest.extraEntries.length > 0
    ) {
      manifest.extraEntries.forEach((entry, idx) => {
        const extraTag = escapeHtml(
          entry.tag || entry.title || `अतिरिक्त ${idx + 1}`,
        );
        tags.push(
          `<span class="tag tag-extra" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'extra', initialExtraIndex: ${idx} })">${extraTag}</span>`,
        );
      });
    } else {
      const extraTag = escapeHtml(manifest.extraTag || 'अतिरिक्त');
      tags.push(
        `<span class="tag tag-extra" onclick="event.stopPropagation(); showDeityPage('${key}', { initialTab: 'extra' })">${extraTag}</span>`,
      );
    }
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
  const moreLabel = window.BhaktiI18n ? window.BhaktiI18n.t('tagMore') : 'और..';
  const lessLabel = window.BhaktiI18n ? window.BhaktiI18n.t('tagLess') : 'कम..';
  const toggleHtml = hasHiddenTags
    ? `<button class="tag tag-toggle" type="button" onclick="toggleHomeTags(event, '${key}')">${isExpanded ? lessLabel : moreLabel}</button>`
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
  window.isHomeLandingView = isHomeLandingView;
  window.syncHomeLandingMode = syncHomeLandingMode;
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
    ? `<div class="deity-img-wrapper">
        <img class="deity-img loading" src="${imgSrc}" alt="${safeName}" loading="${isPriorityImage ? 'eager' : 'lazy'}" fetchpriority="${isPriorityImage ? 'high' : 'low'}" width="${HOME_CARD_IMG_SIZE}" height="${HOME_CARD_IMG_SIZE}" decoding="async" onload="this.classList.remove('loading'); this.classList.add('loaded'); this.parentNode.classList.add('has-image');" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none'; this.parentNode.classList.add('has-image');">
        <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>
       </div>`
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
    ? `<div class="deity-img-wrapper">
        <img class="deity-img loading" src="${imgSrc}" alt="${safeName}" loading="${isPriorityImage ? 'eager' : 'lazy'}" fetchpriority="${isPriorityImage ? 'high' : 'low'}" width="${HOME_TABLE_IMG_SIZE}" height="${HOME_TABLE_IMG_SIZE}" decoding="async" onload="this.classList.remove('loading'); this.classList.add('loaded'); this.parentNode.classList.add('has-image');" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none'; this.parentNode.classList.add('has-image');">
        <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>
       </div>`
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
  if (isHomeLandingView()) return;

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
      const emptyTitle = window.BhaktiI18n
        ? window.BhaktiI18n.t('emptyStateTitle')
        : 'कोई परिणाम नहीं मिला';
      const emptySubtitle = window.BhaktiI18n
        ? window.BhaktiI18n.t('emptyStateSubtitle')
        : 'दूसरा नाम लिखें या ऊपर की श्रेणी बदलकर देखें';
      grid.innerHTML = `
        <div class="home-empty-state">
          <div class="home-empty-icon">🔍</div>
          <div class="home-empty-title">${emptyTitle}${queryText}</div>
          <div class="home-empty-subtitle">${emptySubtitle}</div>
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
  if (isHomeLandingView()) return;
  if (homeRenderTimer) return;
  if (renderedHomeCount >= homeFilteredEntries.length) return;
  if (!isNearDocumentBottom()) return;
  renderHomeGrid(activeHomeType, activeHomeSearchQuery, { reset: false });
  window.requestAnimationFrame(maybeLoadMoreHomeOnScroll);
}

function isHomeLandingView() {
  return !showFavoritesOnly && getSafeHomeType(activeHomeType) === 'all';
}

function syncHomeLandingMode() {
  const homePage = document.getElementById('page-home');
  if (!homePage) return;
  const landingOn = isHomeLandingView();
  homePage.classList.toggle('is-landing', landingOn);
  const landing = document.getElementById('baLanding');
  if (landing) {
    landing.setAttribute('aria-hidden', landingOn ? 'false' : 'true');
  }
  if (landingOn) {
    if (typeof window.initHeroArcGallery === 'function')
      window.initHeroArcGallery();
    if (typeof window.initSlokaCarousel === 'function')
      window.initSlokaCarousel();
    setupLandingComparison();
    setupLandingExperience();
  }
}

function setupLandingComparison() {
  const demo = document.getElementById('baCompareDemo');
  const slider = demo?.querySelector('.ba-compare-range');
  if (!demo || !slider || slider.dataset.bound) return;

  const updatePosition = () => {
    demo.style.setProperty('--compare-position', `${slider.value}%`);
  };

  slider.addEventListener('input', updatePosition);
  slider.dataset.bound = 'true';
  updatePosition();
}

function setupLandingExperience() {
  const section = document.getElementById('baExperienceSection');
  if (!section || section.dataset.bound) return;

  const phone = document.getElementById('baExperiencePhone');
  const verse = section.querySelector('.ba-experience-phone-verse');
  const fontDown = document.getElementById('baExperienceFontDown');
  const fontUp = document.getElementById('baExperienceFontUp');
  const readingToggle = document.getElementById('baExperienceReadingToggle');
  const favoriteToggle = document.getElementById('baExperienceFavorite');
  const japaButton = document.getElementById('baExperienceJapaButton');
  const japaReset = document.getElementById('baExperienceJapaReset');
  const japaTrack = document.getElementById('baExperienceJapaTrack');
  const japaCount = document.getElementById('baExperienceJapaCount');
  const japaPercent = document.getElementById('baExperienceJapaPercent');
  const japaRounds = document.getElementById('baExperienceJapaRounds');
  if (
    !phone ||
    !verse ||
    !fontDown ||
    !fontUp ||
    !readingToggle ||
    !favoriteToggle ||
    !japaButton ||
    !japaReset ||
    !japaTrack ||
    !japaCount ||
    !japaPercent ||
    !japaRounds
  )
    return;

  let fontSize = 1.12;
  let count = 8;
  let rounds = 0;
  renderMantraMalaTrack(108, japaTrack);
  const formatNumber = (value) =>
    new Intl.NumberFormat(document.documentElement.lang || 'hi').format(value);

  const updateJapa = () => {
    const percent = Math.round((count / 108) * 100);
    japaCount.textContent = `${formatNumber(count)} / ${formatNumber(108)}`;
    japaPercent.textContent = `${formatNumber(percent)}%`;
    japaRounds.textContent = formatNumber(rounds);
    Array.from(japaTrack.children).forEach((bead, index) => {
      bead.classList.toggle('is-complete', index < count);
      bead.classList.toggle('is-current', index === count && count < 108);
    });
  };

  fontDown.addEventListener('click', () => {
    fontSize = Math.max(0.88, fontSize - 0.12);
    verse.style.setProperty('--experience-font-size', `${fontSize}rem`);
  });
  fontUp.addEventListener('click', () => {
    fontSize = Math.min(1.6, fontSize + 0.12);
    verse.style.setProperty('--experience-font-size', `${fontSize}rem`);
  });
  readingToggle.addEventListener('click', () => {
    const readingModeOn = readingToggle.getAttribute('aria-pressed') !== 'true';
    phone.classList.toggle('is-reading-mode', readingModeOn);
    readingToggle.setAttribute('aria-pressed', readingModeOn.toString());
  });
  favoriteToggle.addEventListener('click', () => {
    const isFavorite = favoriteToggle.getAttribute('aria-pressed') !== 'true';
    favoriteToggle.setAttribute('aria-pressed', isFavorite.toString());
    favoriteToggle.setAttribute(
      'aria-label',
      isFavorite ? 'नमूना पसंदीदा में है' : 'नमूना पसंदीदा में जोड़ें',
    );
    favoriteToggle.title = isFavorite
      ? 'नमूना पसंदीदा में है'
      : 'नमूना पसंदीदा में जोड़ें';
    favoriteToggle.querySelector('span').textContent = isFavorite ? '♥' : '♡';
  });
  japaButton.addEventListener('click', () => {
    if (count === 108) {
      count = 0;
      rounds += 1;
    } else {
      count += 1;
    }
    updateJapa();
  });
  japaReset.addEventListener('click', () => {
    count = 0;
    rounds = 0;
    updateJapa();
  });

  section.dataset.bound = 'true';
  updateJapa();
}

function openLandingHomeScreenHelp() {
  const faqItem = document.getElementById('landingFaqHomeItem');
  if (!faqItem) return;

  faqItem.open = true;
  faqItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const summary = faqItem.querySelector('summary');
  if (summary) {
    try {
      summary.focus({ preventScroll: true });
    } catch (_error) {
      summary.focus();
    }
  }
}

async function shareLandingPage() {
  const status = document.getElementById('landingShareStatus');
  const translate = (key) =>
    window.BhaktiI18n && typeof window.BhaktiI18n.t === 'function'
      ? window.BhaktiI18n.t(key)
      : key;
  const shareData = {
    title: document.title,
    text: translate('landingShareText'),
    url: window.location.href,
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      if (status) status.textContent = translate('landingShareDone');
      return;
    } catch (error) {
      if (error.name === 'AbortError') return;
    }
  }

  try {
    if (!navigator.clipboard?.writeText)
      throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(shareData.url);
    if (status) status.textContent = translate('landingShareCopied');
  } catch (_error) {
    window.prompt(translate('landingShareCopyPrompt'), shareData.url);
  }
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
  activeKathaDetailId = '';
  showFavoritesOnly = false;
  updateHomeSectionHeader(safeType);
  showPage('home', safeNavId);
  syncHomeLandingMode();
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
  if (isHomeLandingView()) {
    grid.innerHTML = '';
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
    if (!options.skipUrl) {
      updateUrlState({ typeId: safeType, deityKey: '' });
    }
    return;
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
    if (titleText)
      titleText.textContent = window.BhaktiI18n
        ? window.BhaktiI18n.t('favoritesTitle')
        : 'पसंदीदा देव-देवी';
    if (subtitleText)
      subtitleText.textContent = window.BhaktiI18n
        ? window.BhaktiI18n.t('favoritesSubtitle')
        : 'आपके पसंदीदा देव-देवी की सूची';
  } else {
    updateHomeSectionHeader(activeHomeType);
  }
}

// ----------------------------------------------------
// DAILY SLOKA SHOWCASE CAROUSEL
// ----------------------------------------------------
const FEATURED_SLOKAS = [
  {
    deityKey: 'ganesh',
    deityName: 'ॐ श्री गणेशाय नमः',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/ganesh.webp',
    slokaText:
      '"वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br>अविघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"',
    meaning:
      'हे घुमावदार सूंड वाले, विशाल शरीर वाले, करोड़ों सूर्यों के समान तेजस्वी देव! मेरे सभी कार्यों को सदा बाधारहित पूरा करें।',
    actionText: '📿 गणेश मंत्र पढ़ें',
  },
  {
    deityKey: 'shiva',
    deityName: 'ॐ नमः शिवाय',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/shiva.webp',
    slokaText:
      '"कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्।<br>सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥"',
    meaning:
      'जो कर्पूर के समान शुद्ध गौर वर्ण वाले, करुणा के अवतार हैं, उन भगवान शिव एवं माँ भवानी की वंदना करता हूँ।',
    actionText: '📿 शिव मंत्र पढ़ें',
  },
  {
    deityKey: 'durga',
    deityName: 'ॐ श्री दुर्गायै नमः',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/durga.webp',
    slokaText:
      '"सर्वमङ्गलमगल्ये शिवे सर्वार्थसाधिके।<br>शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥"',
    meaning:
      'सब प्रकार का कल्याण करने वाली, कल्याणमयी, सब पुरुषार्थों को सिद्ध करने वाली माँ दुर्गा को प्रणाम है।',
    actionText: '📿 दुर्गा मंत्र पढ़ें',
  },
  {
    deityKey: 'ram',
    deityName: 'जय श्री राम',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/ram.webp',
    slokaText:
      '"रामाय रामभद्राय रामचन्द्राय वेधसे।<br>रघुनाथाय नाथाय सीतायाः पतये नमः॥"',
    meaning:
      'सकल जगत के स्वामी, रघुकुल शिरोमणि, श्री सीतापति भगवान रामचन्द्र जी को हमारा बारंबार प्रणाम है।',
    actionText: '📿 राम मंत्र पढ़ें',
  },
  {
    deityKey: 'hanuman',
    deityName: 'जय श्री हनुमान',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/hanuman.webp',
    slokaText:
      '"मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्।<br>वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये॥"',
    meaning:
      'मन और वायु के समान तीव्र गति वाले, बुद्धिमानों में श्रेष्ठ, श्रीराम के परम दूत श्री हनुमान जी की शरण लेता हूँ।',
    actionText: '📿 हनुमान मंत्र पढ़ें',
  },
  {
    deityKey: 'krishna',
    deityName: 'जय श्री कृष्णा',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/krishna.webp',
    slokaText:
      '"वसुदेवसुतं देवं कंसचाणूरमर्दनम्।<br>देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥"',
    meaning:
      'माता देवकी के परमानंद स्वरूप, कंस और चाणूर का वध करने वाले जगद्गुरु भगवान श्रीकृष्ण की मैं वंदना करता हूँ।',
    actionText: '📿 कृष्ण मंत्र पढ़ें',
  },
  {
    deityKey: 'lakshmi',
    deityName: 'ॐ श्री महालक्ष्म्यै नमः',
    deityIcon:
      'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main/icons/lakshmi.webp',
    slokaText:
      '"नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।<br>शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥"',
    meaning:
      'हे महामाया, देवताओं द्वारा पूजित, शंख, चक्र और गदा धारण करने वाली भगवती महालक्ष्मी को प्रणाम है।',
    actionText: '📿 लक्ष्मी मंत्र पढ़ें',
  },
];

let activeSlokaIndex = 0;
let slokaAutoPlayTimer = null;

function renderSlokaSlide(index = activeSlokaIndex) {
  if (index < 0) index = FEATURED_SLOKAS.length - 1;
  if (index >= FEATURED_SLOKAS.length) index = 0;
  activeSlokaIndex = index;

  const item = FEATURED_SLOKAS[activeSlokaIndex];
  if (!item) return;

  const bgBlur = document.getElementById('slokaBgBlur');
  const thumb = document.getElementById('slokaDeityThumb');
  const deityName = document.getElementById('slokaDeityName');
  const slokaText = document.getElementById('slokaText');
  const slokaMeaning = document.getElementById('slokaMeaning');
  const actionBtn = document.getElementById('slokaActionBtn');
  const actionLabel = document.getElementById('slokaActionLabel');
  const bodyEl = document.getElementById('slokaBody');
  const dotsContainer = document.getElementById('slokaNavDots');

  if (bgBlur) bgBlur.style.backgroundImage = `url('${item.deityIcon}')`;
  if (thumb) {
    thumb.src = item.deityIcon;
    thumb.alt = item.deityName;
  }
  if (deityName) deityName.textContent = item.deityName;
  if (slokaText) slokaText.innerHTML = item.slokaText;
  if (slokaMeaning) slokaMeaning.textContent = item.meaning;
  if (actionLabel) actionLabel.textContent = item.actionText;

  if (actionBtn) {
    actionBtn.onclick = () =>
      showDeityPage(item.deityKey, { initialTab: 'mantra' });
  }

  if (bodyEl) {
    bodyEl.classList.remove('sloka-content-fade');
    void bodyEl.offsetWidth; // trigger reflow
    bodyEl.classList.add('sloka-content-fade');
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = FEATURED_SLOKAS.map(
      (_, i) =>
        `<span class="sloka-dot ${i === activeSlokaIndex ? 'active' : ''}" onclick="goToSlokaSlide(${i})"></span>`,
    ).join('');
  }
}

function nextSlokaSlide() {
  renderSlokaSlide(activeSlokaIndex + 1);
  resetSlokaAutoPlay();
}

function prevSlokaSlide() {
  renderSlokaSlide(activeSlokaIndex - 1);
  resetSlokaAutoPlay();
}

function goToSlokaSlide(index) {
  renderSlokaSlide(index);
  resetSlokaAutoPlay();
}

function startSlokaAutoPlay() {
  stopSlokaAutoPlay();
  slokaAutoPlayTimer = setInterval(() => {
    renderSlokaSlide(activeSlokaIndex + 1);
  }, 6000);
}

function stopSlokaAutoPlay() {
  if (slokaAutoPlayTimer) {
    clearInterval(slokaAutoPlayTimer);
    slokaAutoPlayTimer = null;
  }
}

function resetSlokaAutoPlay() {
  startSlokaAutoPlay();
}

function initSlokaCarousel() {
  const card = document.getElementById('baLandingSlokaCard');
  if (!card) return;
  renderSlokaSlide(0);
  startSlokaAutoPlay();

  if (!card.dataset.bound) {
    card.addEventListener('mouseenter', stopSlokaAutoPlay);
    card.addEventListener('mouseleave', startSlokaAutoPlay);
    card.dataset.bound = 'true';
  }
}

if (typeof window !== 'undefined') {
  window.nextSlokaSlide = nextSlokaSlide;
  window.prevSlokaSlide = prevSlokaSlide;
  window.goToSlokaSlide = goToSlokaSlide;
  window.initSlokaCarousel = initSlokaCarousel;
}

// ----------------------------------------------------
// 3D HERO CURVED GALLERY ARC LOGIC (Infinite Circular Carousel)
// ----------------------------------------------------
const ARC_DEITIES = [
  {
    key: 'ganesh',
    name: 'श्री गणेश',
    mantra:
      '"वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। अविघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"',
  },
  {
    key: 'shiva',
    name: 'भगवान शिव',
    mantra:
      '"कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्। सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि॥"',
  },
  {
    key: 'durga',
    name: 'माँ दुर्गा',
    mantra:
      '"सर्वमङ्गलमगल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥"',
  },
  {
    key: 'ram',
    name: 'भगवान राम',
    mantra:
      '"रामाय रामभद्राय रामचन्द्राय वेधसे। रघुनाथाय नाथाय सीतायाः पतये नमः॥"',
  },
  {
    key: 'krishna',
    name: 'श्री कृष्ण',
    mantra:
      '"वसुदेवसुतं देवं कंसचाणूरमर्दनम्। देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्॥"',
  },
  {
    key: 'hanuman',
    name: 'हनुमान जी',
    mantra:
      '"मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्। श्रीरामदूतं शरणं प्रपद्ये॥"',
  },
  {
    key: 'lakshmi',
    name: 'माँ लक्ष्मी',
    mantra:
      '"नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते। शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥"',
  },
];

let activeArcIndex = 3; // Unbounded integer center index (default 3: Ram)
let prevArcOffsets = []; // Track previous offset per card to handle teleporting seamlessly
let arcAutoRotateTimer = null;
let isArcDragging = false;
let arcDragStartX = 0;
let arcDragStartIndex = 0;

function updateArcCardsLayout(isDragging = false) {
  const cards = document.querySelectorAll('.ba-arc-card');
  if (!cards.length) return;

  const N = cards.length;
  const centerIdx = activeArcIndex;

  cards.forEach((card, i) => {
    let rawOffset = i - centerIdx;
    // Modular offset in range [-N/2, N/2]
    let offset = rawOffset - Math.round(rawOffset / N) * N;
    let absOffset = Math.abs(offset);

    const prevOffset =
      prevArcOffsets[i] !== undefined ? prevArcOffsets[i] : offset;
    const isWrapping = Math.abs(offset - prevOffset) > N / 2 - 0.5;

    if (isDragging || isWrapping) {
      card.style.transition = 'none';
    } else {
      card.style.transition =
        'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, z-index 0.5s ease';
    }

    // 3D Arc layout parameters
    const translateX = offset * 115;
    const translateZ = -absOffset * 85;
    const rotateY = -offset * 14;
    const scale = offset === 0 ? 1.15 : Math.max(0.68, 1 - absOffset * 0.12);
    const opacity = Math.max(0.15, 1 - absOffset * 0.22);
    const zIndex = Math.round(100 - absOffset * 10);

    card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;

    if (Math.abs(offset) < 0.1) {
      card.classList.add('active-center');
    } else {
      card.classList.remove('active-center');
    }

    if (isWrapping) {
      // Force reflow so teleport takes effect without animation
      card.offsetHeight;
      if (!isDragging) {
        requestAnimationFrame(() => {
          card.style.transition =
            'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.5s ease, z-index 0.5s ease';
        });
      }
    }

    prevArcOffsets[i] = offset;
  });

  // Update spotlight for normalized center deity
  const normalizedIdx = ((Math.round(centerIdx) % N) + N) % N;
  const activeDeity = ARC_DEITIES[normalizedIdx];
  if (activeDeity) {
    const mantraText = document.getElementById('spotlightMantraText');
    const spotlightBtn = document.getElementById('spotlightBtn');
    if (mantraText) mantraText.textContent = activeDeity.mantra;
    if (spotlightBtn) {
      spotlightBtn.onclick = () =>
        showDeityPage(activeDeity.key, { initialTab: 'mantra' });
    }
  }
}

function setActiveArcCard(index) {
  activeArcIndex = index;
  updateArcCardsLayout(false);
}

function nextArcCard() {
  setActiveArcCard(activeArcIndex + 1);
}

function prevArcCard() {
  setActiveArcCard(activeArcIndex - 1);
}

function handleArcCardClick(index) {
  if (isArcDragging) return;
  const N = ARC_DEITIES.length;
  const currentNormalized = ((Math.round(activeArcIndex) % N) + N) % N;
  let delta = (index - currentNormalized) % N;
  if (delta > N / 2) delta -= N;
  if (delta < -N / 2) delta += N;

  if (delta === 0) {
    const activeDeity = ARC_DEITIES[index];
    if (activeDeity && typeof showDeityPage === 'function') {
      showDeityPage(activeDeity.key, { initialTab: 'mantra' });
    }
  } else {
    setActiveArcCard(activeArcIndex + delta);
  }
}

function startArcAutoRotate() {
  stopArcAutoRotate();
  arcAutoRotateTimer = setInterval(() => {
    setActiveArcCard(activeArcIndex + 1);
  }, 5000);
}

function stopArcAutoRotate() {
  if (arcAutoRotateTimer) {
    clearInterval(arcAutoRotateTimer);
    arcAutoRotateTimer = null;
  }
}

function initHeroArcGallery() {
  const container = document.getElementById('baHero3dArc');
  const wrapper = container ? container.parentElement : null;
  if (!container) return;

  setActiveArcCard(activeArcIndex);
  startArcAutoRotate();

  if (!container.dataset.bound) {
    container.addEventListener('mouseenter', stopArcAutoRotate);
    container.addEventListener('mouseleave', () => {
      if (!isArcDragging) startArcAutoRotate();
    });

    // Touch and Drag support
    const targetEl = wrapper || container;

    const onPointerDown = (e) => {
      isArcDragging = false;
      stopArcAutoRotate();
      const pageX = e.touches ? e.touches[0].pageX : e.pageX;
      arcDragStartX = pageX;
      arcDragStartIndex = activeArcIndex;

      const onPointerMove = (moveEvt) => {
        const currentX = moveEvt.touches
          ? moveEvt.touches[0].pageX
          : moveEvt.pageX;
        const diffX = currentX - arcDragStartX;
        if (Math.abs(diffX) > 5) {
          isArcDragging = true;
          // Dragging right moves index left (-); dragging left moves index right (+)
          activeArcIndex = arcDragStartIndex - diffX / 120;
          updateArcCardsLayout(true);
        }
      };

      const onPointerUp = () => {
        targetEl.removeEventListener('mousemove', onPointerMove);
        targetEl.removeEventListener('mouseup', onPointerUp);
        targetEl.removeEventListener('touchmove', onPointerMove);
        targetEl.removeEventListener('touchend', onPointerUp);

        if (isArcDragging) {
          setActiveArcCard(Math.round(activeArcIndex));
          setTimeout(() => {
            isArcDragging = false;
          }, 50);
        }
        startArcAutoRotate();
      };

      targetEl.addEventListener('mousemove', onPointerMove);
      targetEl.addEventListener('mouseup', onPointerUp);
      targetEl.addEventListener('touchmove', onPointerMove, { passive: true });
      targetEl.addEventListener('touchend', onPointerUp);
    };

    targetEl.addEventListener('mousedown', onPointerDown);
    targetEl.addEventListener('touchstart', onPointerDown, { passive: true });

    container.dataset.bound = 'true';
  }
}

if (typeof window !== 'undefined') {
  window.setActiveArcCard = setActiveArcCard;
  window.nextArcCard = nextArcCard;
  window.prevArcCard = prevArcCard;
  window.handleArcCardClick = handleArcCardClick;
  window.initHeroArcGallery = initHeroArcGallery;
}
