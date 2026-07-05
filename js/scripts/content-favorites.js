function showUnifiedFavoritesPage(searchQuery = '') {
  const grid = document.getElementById('homeGrid');
  if (!grid) return;

  grid.classList.add('favorites-page-grid');

  const favoriteDeities = getFavoriteDeities();
  const favoriteContent = getFavoriteContent();
  const query = searchQuery.trim().toLowerCase();
  const hasSearchQuery = query.length > 0;

  const filteredFavoriteDeities = hasSearchQuery
    ? favoriteDeities.filter((key) => {
        const deity = deities[key];
        if (!deity) return false;
        const searchableText = [
          key,
          deity.name,
          deity.english,
          deity.desc,
          getDeityType(key),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchableText.includes(query);
      })
    : favoriteDeities;

  const filteredFavoriteContent = hasSearchQuery
    ? favoriteContent.filter((fav) => {
        const deity = deities[fav.deityKey];
        if (!deity) return false;
        const contentTypeLabels = {
          aarti: 'आरती',
          chalisa: 'चालीसा',
          katha: 'कथा',
          bhajan: 'भजन',
          extra: 'अतिरिक्त',
        };
        const searchableText = [
          fav.deityKey,
          fav.contentType,
          fav.contentSlug,
          fav.title,
          contentTypeLabels[fav.contentType],
          deity.name,
          deity.english,
          deity.desc,
          getDeityType(fav.deityKey),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return searchableText.includes(query);
      })
    : favoriteContent;

  if (!filteredFavoriteDeities.length && !filteredFavoriteContent.length) {
    const emptyTitle = hasSearchQuery
      ? 'कोई परिणाम नहीं मिला'
      : 'कोई पसंदीदा नहीं';
    const emptySubtitle = hasSearchQuery
      ? 'दूसरा नाम, देव-देवी, या सामग्री का नाम लिखकर देखें'
      : 'देव-देवी या उनकी सामग्री पर ❤️ बटन दबाकर पसंदीदा में जोड़ें';
    grid.innerHTML = `
      <div class="home-empty-state">
        <div class="home-empty-icon">❤️</div>
        <div class="home-empty-title">${emptyTitle}</div>
        <div class="home-empty-subtitle">${emptySubtitle}</div>
      </div>
    `;
    showPage('home', 'favorites');
    syncNav('favorites');
    return;
  }

  let html = '';

  // Add favorite deities section
  if (filteredFavoriteDeities.length) {
    html += `
      <div class="favorites-section">
        <div class="favorites-section-title">पसंदीदा देव-देवी</div>
        <div class="favorites-section-grid">
    `;

    filteredFavoriteDeities.forEach((key) => {
      const deity = deities[key];
      if (!deity) return;

      const deityType = getDeityType(key);
      const imgSrc = getValidDeityImage(deity.img);
      const safeName = escapeHtml(deity?.name || 'श्री देव');
      const safeDesc = escapeHtml(deity?.desc || 'भक्ति सामग्री उपलब्ध');
      const safeEmoji = escapeHtml(deity?.emoji || '🪔');

      const imgHtml = imgSrc
        ? `<img class="deity-img" src="${imgSrc}" alt="${safeName}" loading="lazy" width="240" height="240" decoding="async" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none';">
         <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>`
        : `<div class="deity-img-fallback">${safeEmoji}</div>`;

      html += `
        <div class="deity-card" onclick="showDeityPage('${key}')">
          ${imgHtml}
          <div class="deity-info">
            <div class="deity-title-row">
              <span class="deity-name">${safeName}</span>
              <span class="deity-type-badge">${deityType}</span>
            </div>
            <span class="deity-meta">${safeDesc}</span>
          </div>
          <button class="deity-favorite-btn" type="button" onclick="event.stopPropagation(); toggleFavorite('${key}')" aria-label="पसंदीदा से हटाएं" title="पसंदीदा से हटाएं">
            ❤️
          </button>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  // Add favorite content section
  if (filteredFavoriteContent.length) {
    const contentTypeLabels = {
      aarti: 'आरती',
      chalisa: 'चालीसा',
      katha: 'कथा',
      bhajan: 'भजन',
      extra: 'अतिरिक्त',
    };

    // Sort by most recently added
    const sortedContent = [...filteredFavoriteContent].sort(
      (a, b) => b.addedAt - a.addedAt,
    );

    html += `
      <div class="favorites-section">
        <div class="favorites-section-title">पसंदीदा सामग्री</div>
        <div class="favorites-section-grid">
    `;

    sortedContent.forEach((fav) => {
      const deity = deities[fav.deityKey];
      if (!deity) return;

      const contentTypeLabel =
        contentTypeLabels[fav.contentType] || fav.contentType;
      const safeTitle = escapeHtml(fav.title || contentTypeLabel);
      const safeDeityName = escapeHtml(deity.name);
      const safeDeityDesc = escapeHtml(deity.desc || 'भक्ति सामग्री');
      const imgSrc = getValidDeityImage(deity.img);
      const safeEmoji = escapeHtml(deity.emoji || '🪔');

      const imgHtml = imgSrc
        ? `<img class="deity-img" src="${imgSrc}" alt="${safeDeityName}" loading="lazy" width="240" height="240" decoding="async" onerror="this.parentNode.querySelector('.deity-img-fallback').style.display='flex'; this.style.display='none';">
         <div class="deity-img-fallback" style="display:none">${safeEmoji}</div>`
        : `<div class="deity-img-fallback">${safeEmoji}</div>`;

      // Determine the tab and slug for navigation
      let tabId = fav.contentType;
      let slugValue = fav.contentSlug;

      if (fav.contentType === 'katha' && fav.contentSlug) {
        tabId = 'katha';
        slugValue = fav.contentSlug;
      } else if (fav.contentType === 'bhajan' && fav.contentSlug) {
        tabId = 'bhajan';
        slugValue = fav.contentSlug;
      } else if (fav.contentType === 'extra' && fav.contentSlug) {
        tabId = 'extra';
        slugValue = fav.contentSlug;
      }

      const onClickParams = slugValue
        ? `'${fav.deityKey}', { initialTab: '${tabId}', initial${tabId.charAt(0).toUpperCase() + tabId.slice(1)}Slug: '${slugValue}' }`
        : `'${fav.deityKey}', { initialTab: '${tabId}' }`;

      html += `
        <div class="deity-card" onclick="showDeityPage(${onClickParams})">
          ${imgHtml}
          <div class="deity-info">
            <div class="deity-title-row">
              <span class="deity-name">${safeTitle}</span>
              <span class="deity-type-badge">${contentTypeLabel}</span>
            </div>
            <span class="deity-meta">${safeDeityName} - ${safeDeityDesc}</span>
          </div>
          <button class="deity-favorite-btn" type="button" onclick="event.stopPropagation(); handleToggleContentFavorite('${fav.deityKey}', '${fav.contentType}', '${fav.contentSlug}', '${escapeHtml(fav.title)}', this)" aria-label="पसंदीदा से हटाएं" title="पसंदीदा से हटाएं">
            ❤️
          </button>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;
  }

  grid.innerHTML = html;

  // Update section header
  const iconEl = document.getElementById('homeSectionIcon');
  const titleText = document.getElementById('homeSectionTitleText');
  const subtitleText = document.getElementById('homeSectionSubtitle');
  if (iconEl) iconEl.textContent = '❤️';
  if (titleText) titleText.textContent = 'पसंदीदा';
  if (subtitleText)
    subtitleText.textContent = 'आपके पसंदीदा देव-देवी और सामग्री';

  showPage('home', 'favorites');
  syncNav('favorites');
}

if (typeof window !== 'undefined') {
  window.showUnifiedFavoritesPage = showUnifiedFavoritesPage;
}
