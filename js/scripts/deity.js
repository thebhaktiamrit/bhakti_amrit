function showDeityPage(key, options = {}) {
  const resolvedKey = resolveDeityKey(key);
  const deity = deities[resolvedKey];
  if (!deity) return;
  closeMantraMalaDialog(undefined, { restoreFocus: false });
  const extraData = getExtraContentData(resolvedKey);
  const extraTag = escapeHtml(getExtraTabLabel(extraData));
  const deityAboutData =
    typeof aboutData !== 'undefined' ? aboutData[resolvedKey] : null;

  // Preserve where the user came from for back navigation.
  deityReturnHomeType = getSafeHomeType(activeHomeType);
  deityReturnHomeNavId =
    activeHomeNavId || getNavIdByHomeType(deityReturnHomeType);

  // If a deity is opened directly from "मुख्य पृष्ठ", highlight its type menu.
  if (activeHomeNavId === 'home' || activeHomeType === 'all') {
    const inferredType = getDeityType(resolvedKey);
    activeHomeType = inferredType;
    activeHomeNavId = getNavIdByHomeType(inferredType);
  }

  const availableTabs = getAvailableDeityTabs(resolvedKey);
  activeDeityKey = resolvedKey;
  activeDeityTab = getSafeDeityTab(options.initialTab || 'about');
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  activeKathaSlug = getSafeKathaSlug(
    resolvedKey,
    options.initialKathaSlug || activeKathaSlug,
  );
  activeBhajanSlug = getSafeBhajanSlug(
    resolvedKey,
    options.initialBhajanSlug || activeBhajanSlug,
  );
  activeExtraIndex = getSafeExtraIndex(
    extraData,
    options.initialExtraIndex ?? activeExtraIndex,
  );
  if (!availableTabs.includes(activeDeityTab)) activeDeityTab = 'about';

  const aboutReadTime = getHindiReadTimeLabelFromText(
    getAboutReadableText(deityAboutData),
  );
  const aartiReadTime = getHindiReadTimeLabelFromText(
    getLyricsReadableText(deity.aarti),
  );
  const chalisaReadTime = getHindiReadTimeLabelFromText(
    getLyricsReadableText(deity.chalisa),
  );
  const selectedKatha = getSelectedKathaEntry(resolvedKey, deity.katha);
  const kathaReadTime = getHindiReadTimeLabelFromText(
    getLyricsReadableText(selectedKatha),
  );
  const selectedBhajan = getSelectedBhajanEntry(resolvedKey, deity.bhajan);
  const bhajanReadTime = getHindiReadTimeLabelFromText(
    getLyricsReadableText(selectedBhajan),
  );
  const mantraReadTime = getHindiReadTimeLabelFromText(
    getMantrasReadableText(deity.mantras),
  );
  const selectedExtraEntry = getSelectedExtraEntry(extraData);
  const extraReadTime = getHindiReadTimeLabelFromText(
    getLyricsReadableText(selectedExtraEntry),
  );

  // Build header
  const imgSrc = getValidDeityImage(deity.img);
  const imgHtml = imgSrc
    ? `<img class="deity-portrait" src="${imgSrc}" alt="${deity.name}" loading="eager" fetchpriority="high" width="100" height="100" decoding="async" onerror="this.nextElementSibling.style.display='flex'; this.style.display='none';">
   <div class="deity-portrait-emoji" style="display:none">${deity.emoji}</div>`
    : `<div class="deity-portrait-emoji">${deity.emoji}</div>`;

  document.getElementById('deityHeader').innerHTML = `
  ${imgHtml}
  <div class="content-header-text">
    <h2>${deity.name}</h2>
    <p>${deity.desc}</p>
  </div>`;

  // Build tabs
  const tabs = document.getElementById('deityTabs');
  const tabButtons = [
    `<button class="tab-btn ${activeDeityTab === 'about' ? 'active' : ''}" onclick="showTab('about', this)">🚩 परिचय</button>`,
    hasLyricsContent(deity.aarti)
      ? `<button class="tab-btn ${activeDeityTab === 'aarti' ? 'active' : ''}" onclick="showTab('aarti', this)">🪔 आरती</button>`
      : '',
    hasLyricsContent(deity.chalisa)
      ? `<button class="tab-btn ${activeDeityTab === 'chalisa' ? 'active' : ''}" onclick="showTab('chalisa', this)">📖 चालीसा</button>`
      : '',
    hasLyricsContent(deity.katha)
      ? `<button class="tab-btn ${activeDeityTab === 'katha' ? 'active' : ''}" onclick="showTab('katha', this)">📚 कथा</button>`
      : '',
    hasLyricsContent(deity.bhajan)
      ? `<button class="tab-btn ${activeDeityTab === 'bhajan' ? 'active' : ''}" onclick="showTab('bhajan', this)">🎵 भजन</button>`
      : '',
    hasMantrasContent(deity.mantras)
      ? `<button class="tab-btn ${activeDeityTab === 'mantra' ? 'active' : ''}" onclick="showTab('mantra', this)">🕉️ मंत्र</button>`
      : '',
    hasLyricsContent(extraData)
      ? `<button class="tab-btn ${activeDeityTab === 'extra' ? 'active' : ''}" onclick="showTab('extra', this)">✨ ${extraTag}</button>`
      : '',
    `<button class="tab-btn ${activeDeityTab === 'temples' ? 'active' : ''}" onclick="showTab('temples', this)">🛕 मंदिर</button>`,
  ].join('');
  tabs.innerHTML = `
  ${tabButtons}`;

  // Render contents
  const content = document.getElementById('deityContent');
  if (!content) return;

  content.innerHTML = `
  <div id="tab-about" class="text-content ${activeDeityTab === 'about' ? 'active' : ''}">
    <div class="deity-tab-wrap deity-tab-wrap-no-padding">
      <div class="deity-tab-content">
        <div class="lyrics-box about-content about-content-merged">
          ${getSectionMetaHtml({ readTimeLabel: aboutReadTime })}
          ${renderAbout(deityAboutData)}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-aarti" class="text-content ${activeDeityTab === 'aarti' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({
            readTimeLabel: aartiReadTime,
            showLyricsMeaningToggle: hasLyricsHindiMeanings(deity.aarti),
            showReadingMode: true,
            deityKey: resolvedKey,
            contentType: 'aarti',
            contentSlug: '',
            contentTitle: deity.aarti?.title || `${deity.name} आरती`,
          })}
          <div class="aarti-floating-bell-wrap">
            <button
              class="aarti-bell-btn"
              type="button"
              onclick="playAartiBell(this)"
              aria-label="घंटी बजाएं"
              title="घंटी बजाएं"
            >
              <span class="chalisa-nav-icon aarti-bell-icon" aria-hidden="true">🔔</span>
              <span class="chalisa-nav-label aarti-bell-label">घंटी</span>
            </button>
          </div>
          ${renderLyrics(deity.aarti)}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-chalisa" class="text-content ${activeDeityTab === 'chalisa' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({
            readTimeLabel: chalisaReadTime,
            showLyricsMeaningToggle: hasLyricsHindiMeanings(deity.chalisa),
            showReadingMode: true,
            deityKey: resolvedKey,
            contentType: 'chalisa',
            contentSlug: '',
            contentTitle: deity.chalisa?.title || `${deity.name} चालीसा`,
          })}
          ${renderLyrics(deity.chalisa, { enableStepNavigation: true })}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-katha" class="text-content ${activeDeityTab === 'katha' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({
            readTimeLabel: kathaReadTime,
            showReadingMode: true,
            deityKey: resolvedKey,
            contentType: 'katha',
            contentSlug: activeKathaSlug,
            contentTitle: selectedKatha?.title || `${deity.name} कथा`,
          })}
          ${renderKatha(resolvedKey, deity.katha)}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-bhajan" class="text-content ${activeDeityTab === 'bhajan' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({
            readTimeLabel: bhajanReadTime,
            showReadingMode: true,
            deityKey: resolvedKey,
            contentType: 'bhajan',
            contentSlug: activeBhajanSlug,
            contentTitle: selectedBhajan?.title || `${deity.name} भजन`,
          })}
          ${renderBhajan(resolvedKey, deity.bhajan)}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-mantra" class="text-content ${activeDeityTab === 'mantra' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({ readTimeLabel: mantraReadTime })}
          <div class="mantra-grid">${renderMantras(deity.mantras, resolvedKey)}</div>
        </div>
      </div>
    </div>
  </div>
  <div id="tab-extra" class="text-content ${activeDeityTab === 'extra' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${getSectionMetaHtml({
            readTimeLabel: extraReadTime,
            showLyricsMeaningToggle: hasLyricsHindiMeanings(selectedExtraEntry),
            showReadingMode: true,
            deityKey: resolvedKey,
            contentType: 'extra',
            contentSlug:
              selectedExtraEntry?.slug || `extra-${activeExtraIndex}`,
            contentTitle: selectedExtraEntry?.title || `${deity.name} अतिरिक्त`,
          })}
          ${renderExtraContent(extraData)}
        </div>
      </div>
    </div>
  </div>
  <div id="tab-temples" class="text-content ${activeDeityTab === 'temples' ? 'active' : ''}">
    <div class="deity-tab-wrap">
      <div class="deity-tab-content">
        <div class="lyrics-box">
          ${renderDeityTemples(resolvedKey)}
        </div>
      </div>
    </div>
  </div>`;

  showPage('deity', activeHomeNavId);

  if (!options.skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: resolvedKey,
      tabId: activeDeityTab,
      kathaSlug: activeDeityTab === 'katha' ? activeKathaSlug : '',
      bhajanSlug: activeDeityTab === 'bhajan' ? activeBhajanSlug : '',
      extraIndex: activeDeityTab === 'extra' ? activeExtraIndex : 0,
    });
  }
}

function renderAbout(data) {
  if (typeof data === 'string') return `<p>${data}</p>`;
  if (!Array.isArray(data)) return 'विवरण जल्द ही आ रहा है...';

  return data
    .map((section) => {
      const sectionTitle = section.title ? `<h3>${section.title}</h3>` : '';
      let sectionContent = '';

      if (section.content) {
        sectionContent = `<p>${section.content}</p>`;
      } else if (Array.isArray(section.items) && section.items.length) {
        sectionContent = `<ul>${section.items
          .map(
            (item) => `<li><strong>${item.label}:</strong> ${item.text}</li>`,
          )
          .join('')}</ul>`;
      }

      return `${sectionTitle}${sectionContent}`;
    })
    .filter(Boolean)
    .join('');
}

function getSectionMetaHtml({
  readTimeLabel = '',
  showReadingMode = false,
  showLyricsMeaningToggle = false,
  deityKey = '',
  contentType = '',
  contentSlug = '',
  contentTitle = '',
} = {}) {
  if (
    !readTimeLabel &&
    !showReadingMode &&
    !showLyricsMeaningToggle &&
    !deityKey
  ) {
    return '';
  }

  const isFavorite =
    deityKey && contentType
      ? isContentFavorite(deityKey, contentType, contentSlug)
      : false;
  const favoriteIcon = isFavorite ? '❤️' : '🤍';
  const favoriteLabel = isFavorite ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें';

  const controlItems = [
    readTimeLabel
      ? `<span class="section-read-time" aria-label="${escapeHtml(readTimeLabel)}">
      <span class="section-read-time-icon" aria-hidden="true">⏱️</span>
      <span class="section-read-time-label">${escapeHtml(readTimeLabel)}</span>
    </span>`
      : '',
    showLyricsMeaningToggle
      ? `<button class="section-action-btn section-meaning-btn" type="button" onclick="toggleLyricsMeanings(this)" aria-expanded="false" data-collapsed-label="हिंदी में समझें" data-expanded-label="हिंदी अर्थ छुपाएं" title="हिंदी में समझें" aria-label="हिंदी में समझें">
      <span class="section-meaning-label">हिंदी में समझें</span>
    </button>`
      : '',
    showReadingMode
      ? `<button class="section-action-btn section-reading-btn" type="button" onclick="openReadingModeFromSection(this)" title="पठन मोड" aria-label="पठन मोड">
      <span class="section-reading-icon" aria-hidden="true">📖</span>
      <span class="section-reading-label">पठन मोड</span>
    </button>`
      : '',
    deityKey && contentType
      ? `<button class="section-action-btn section-favorite-btn" type="button" onclick="handleToggleContentFavorite('${deityKey}', '${contentType}', '${contentSlug}', '${escapeHtml(contentTitle)}', this)" title="${favoriteLabel}" aria-label="${favoriteLabel}">
      <span class="section-favorite-icon" aria-hidden="true">${favoriteIcon}</span>
      <span class="section-favorite-label">${favoriteLabel}</span>
    </button>`
      : '',
    `<button class="section-action-btn section-print-btn" type="button" onclick="printDeityContent()" title="प्रिंट करें" aria-label="प्रिंट करें">
      <span class="section-print-icon" aria-hidden="true">🖨️</span>
      <span class="section-print-label">प्रिंट</span>
    </button>`,
  ].filter(Boolean);
  const isSingleControl = controlItems.length === 1;
  const actionsClassName = `deity-tab-actions${
    isSingleControl ? ' deity-tab-actions-single' : ''
  }`;
  const actionGroupClassName = `deity-tab-action-group${
    isSingleControl ? ' deity-tab-action-group-single' : ''
  }`;

  return `<div class="${actionsClassName}">
    <div class="${actionGroupClassName}">${controlItems.join('')}</div>
  </div>`;
}

function getLyricsLineHindiText(line) {
  if (!line || typeof line !== 'object') return '';

  const candidates = [
    line.hindiMeaning,
    line.hindiText,
    line.meaningHindi,
    line.meaning,
    line.hindi,
  ];
  const match = candidates.find(
    (value) => typeof value === 'string' && value.trim().length > 0,
  );

  return match || '';
}

function hasLyricsHindiMeanings(data) {
  if (!data || typeof data !== 'object') return false;

  if (
    Array.isArray(data.lines) &&
    data.lines.some((line) => getLyricsLineHindiText(line))
  ) {
    return true;
  }

  return getLyricsBlocks(data).some((block) => getLyricsLineHindiText(block));
}

function renderLyricsLineMeaning(line) {
  const hindiText = getLyricsLineHindiText(line);
  if (!hindiText) return '';

  return `<div class="lyrics-line-meaning">${decorateContentHtml(hindiText)}</div>`;
}

function getChalisaStepSourceText(line) {
  if (typeof line === 'string') return line;
  if (!line || typeof line !== 'object') return '';

  return line.text || line.content || line.html || '';
}

function isChalisaStepSelectable(line) {
  const rawText = getChalisaStepSourceText(line);
  if (typeof rawText !== 'string' || !rawText.trim()) return false;

  const normalizedText = rawText
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[：:]+$/g, '');

  return (
    normalizedText !== 'दोहा' &&
    normalizedText !== 'चौपाई' &&
    normalizedText !== 'सोरठा' &&
    normalizedText !== 'छन्द'
  );
}

function getChalisaStepAttrs(enableStepNavigation, hasBodyHtml) {
  if (!enableStepNavigation || !hasBodyHtml) return ' class="lyrics-line-item"';
  return ' class="lyrics-line-item chalisa-step" data-chalisa-step="true"';
}

function toggleLyricsMeanings(trigger) {
  const lyricsBox = trigger?.closest('.lyrics-box');
  if (!lyricsBox) return;

  const isExpanded = lyricsBox.classList.toggle('lyrics-meanings-expanded');
  const labelEl = trigger.querySelector('.section-meaning-label');
  const expandedLabel = trigger.dataset.expandedLabel || 'हिंदी अर्थ छुपाएं';
  const collapsedLabel = trigger.dataset.collapsedLabel || 'हिंदी में समझें';

  trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  trigger.setAttribute('title', isExpanded ? expandedLabel : collapsedLabel);
  if (labelEl) {
    labelEl.textContent = isExpanded ? expandedLabel : collapsedLabel;
  }
}

function renderLyricsLine(line, options = {}) {
  const enableStepNavigation =
    options.enableStepNavigation === true && isChalisaStepSelectable(line);

  if (typeof line === 'string') {
    const bodyHtml = enableStepNavigation
      ? `<div class="stanza">${decorateContentHtml(line)}</div>`
      : decorateContentHtml(line);
    return `<div${getChalisaStepAttrs(enableStepNavigation, true)}>${bodyHtml}</div>`;
  }
  if (!line || typeof line !== 'object') return '';

  let bodyHtml = '';
  if (line.type === 'refrain') {
    bodyHtml = `<div class="refrain">${decorateContentHtml(line.text)}</div>`;
  } else if (line.type === 'stanza') {
    const refrainHtml = line.refrain
      ? `<div class="refrain">${decorateContentHtml(line.refrain)}</div>`
      : '';
    bodyHtml = `<div class="stanza">${decorateContentHtml(line.text)}${refrainHtml}</div>`;
  } else {
    bodyHtml =
      typeof line.text === 'string'
        ? decorateContentHtml(line.text)
        : line.text;
  }

  const meaningHtml = renderLyricsLineMeaning(line);
  if (!bodyHtml && !meaningHtml) return '';

  return `<div${getChalisaStepAttrs(enableStepNavigation, !!bodyHtml)}>${bodyHtml}${meaningHtml}</div>`;
}

function renderLyrics(data, options = {}) {
  if (typeof data === 'string') return data;
  if (!data) return 'जल्द ही आ रहा है...';

  const titleHtml = data.title
    ? `<div class="title-line">${data.title}</div>`
    : '';

  const renderLyricsMedia = (mediaItem, placement = '') => {
    const mediaList = normalizeLyricsMedia(mediaItem);
    if (!mediaList.length) return '';

    return mediaList
      .map((item) => {
        const altText = escapeHtml(
          item.alt || item.caption || data.title || 'भक्ति चित्र',
        );
        const captionHtml =
          typeof item.caption === 'string' && item.caption.trim().length > 0
            ? `<figcaption>${escapeHtml(item.caption)}</figcaption>`
            : '';
        const alignClass =
          item.align === 'left' || item.align === 'right'
            ? ` align-${item.align}`
            : '';
        const placementClass = placement ? ` katha-figure-${placement}` : '';

        return `<figure class="katha-figure${placementClass}${alignClass}">
          <img src="${escapeHtml(item.src)}" alt="${altText}" loading="lazy" decoding="async" onerror="handleContentImageError(this)">
          ${captionHtml}
        </figure>`;
      })
      .join('');
  };

  const renderLyricsMediaGroup = (mediaItem, placement = '') => {
    const mediaHtml = renderLyricsMedia(mediaItem, placement);
    if (!mediaHtml) return '';
    const placementClass = placement ? ` katha-media-${placement}` : '';
    return `<div class="katha-media${placementClass}">${mediaHtml}</div>`;
  };

  const blocks = getLyricsBlocks(data);
  if (blocks.length > 0) {
    const blocksHtml = blocks
      .map((block) => {
        if (!block || typeof block !== 'object') return '';

        const beforeMedia = renderLyricsMediaGroup(block.mediaBefore, 'before');
        const afterMedia = renderLyricsMediaGroup(block.mediaAfter, 'after');

        if (block.type === 'image') {
          const mediaHtml = renderLyricsMediaGroup(block, 'standalone');
          return mediaHtml
            ? `<div class="lyrics-block lyrics-block-media">${mediaHtml}</div>`
            : '';
        }

        const rawHtml =
          typeof block.html === 'string' && block.html.trim().length > 0
            ? block.html
            : '';
        const text =
          typeof block.text === 'string'
            ? block.text
            : typeof block.content === 'string'
              ? block.content
              : '';
        const bodyHtml = rawHtml
          ? decorateContentHtml(rawHtml)
          : text
            ? block.type === 'refrain'
              ? `<div class="refrain">${decorateContentHtml(text)}</div>`
              : `<div class="stanza">${decorateContentHtml(text)}</div>`
            : '';
        const meaningHtml = renderLyricsLineMeaning(block);

        if (!beforeMedia && !bodyHtml && !meaningHtml && !afterMedia) return '';

        const enableBlockStepNavigation =
          options.enableStepNavigation &&
          bodyHtml &&
          isChalisaStepSelectable(block);
        const chalisaStepClass = enableBlockStepNavigation
          ? ' chalisa-step'
          : '';
        const chalisaStepAttr = enableBlockStepNavigation
          ? ' data-chalisa-step="true"'
          : '';

        return `<div class="lyrics-block${chalisaStepClass}"${chalisaStepAttr}>${beforeMedia}${bodyHtml}${meaningHtml}${afterMedia}</div>`;
      })
      .filter(Boolean)
      .join('');

    if (blocksHtml) {
      return `${titleHtml}<div class="lyrics-flow">${blocksHtml}</div>`;
    }
  }

  if (typeof data.content === 'string' && data.content.trim().length > 0) {
    return `${titleHtml}<div class="stanza">${decorateContentHtml(data.content)}</div>`;
  }
  if (!Array.isArray(data.lines) || !data.lines.length)
    return 'जल्द ही आ रहा है...';

  const linesHtml = data.lines
    .map((line) => renderLyricsLine(line, options))
    .join('');

  return `${titleHtml}${linesHtml}`;
}

function renderExtraContent(data) {
  const entries = getExtraEntries(data);
  if (!entries.length) return 'जल्द ही आ रहा है...';
  if (entries.length === 1) {
    activeExtraIndex = 0;
    const enableStepNavigation = isExtraEntryStepNavigationEnabled(
      entries[0],
      0,
    );
    return renderLyrics(entries[0], { enableStepNavigation });
  }

  const selected = getSelectedExtraEntry(data);
  if (!selected) return 'जल्द ही आ रहा है...';
  const safeIndex = activeExtraIndex;

  const navHtml = `<div class="katha-list">${entries
    .map((entry, idx) => {
      const activeClass = idx === safeIndex ? ' active' : '';
      const label = escapeHtml(getExtraEntryLabel(entry, idx));
      return `<button class="tab-btn${activeClass}" onclick="openExtraEntry('${activeDeityKey}', ${idx})">${label}</button>`;
    })
    .join('')}</div><br/>`;

  const enableStepNavigation = isExtraEntryStepNavigationEnabled(
    selected,
    safeIndex,
  );
  return `${navHtml}${renderLyrics(selected, { enableStepNavigation })}`;
}

function openExtraEntry(deityKey, index) {
  if (!deities[deityKey]) return;
  showDeityPage(deityKey, { initialTab: 'extra', initialExtraIndex: index });
}

function handleToggleContentFavorite(
  deityKey,
  contentType,
  contentSlug,
  contentTitle,
  button,
) {
  if (!deities[deityKey]) return;
  const isNowFavorite = toggleContentFavorite(
    deityKey,
    contentType,
    contentSlug,
    contentTitle,
  );

  // Update the button state
  const iconEl = button.querySelector('.section-favorite-icon');
  const labelEl = button.querySelector('.section-favorite-label');

  if (iconEl) iconEl.textContent = isNowFavorite ? '❤️' : '🤍';
  if (labelEl) {
    labelEl.textContent = isNowFavorite
      ? 'पसंदीदा से हटाएं'
      : 'पसंदीदा में जोड़ें';
  }

  button.setAttribute(
    'title',
    isNowFavorite ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें',
  );
  button.setAttribute(
    'aria-label',
    isNowFavorite ? 'पसंदीदा से हटाएं' : 'पसंदीदा में जोड़ें',
  );

  if (
    showFavoritesOnly &&
    typeof window !== 'undefined' &&
    window.showUnifiedFavoritesPage
  ) {
    window.showUnifiedFavoritesPage();
  }
}

function renderKatha(deityKey, data) {
  const entries = getKathaEntries(data, deityKey);
  if (!entries.length) return 'जल्द ही आ रहा है...';

  const selected = getSelectedKathaEntry(deityKey, data);
  if (!selected) return 'जल्द ही आ रहा है...';

  const navHtml =
    entries.length > 1
      ? `<div class="katha-list">${entries
          .map((item) => {
            const activeClass = item.slug === selected.slug ? ' active' : '';
            return `<button class="tab-btn${activeClass}" onclick="openKatha('${deityKey}', '${item.slug}')">${item.title || item.slug}</button>`;
          })
          .join('')}</div><br/>`
      : '';

  return `${navHtml}${renderLyrics(selected)}`;
}

function openKatha(deityKey, slug) {
  if (!deities[deityKey]) return;
  showDeityPage(deityKey, { initialTab: 'katha', initialKathaSlug: slug });
}

function renderBhajan(deityKey, data) {
  const entries = getBhajanEntries(data, deityKey);
  if (!entries.length) return 'जल्द ही आ रहा है...';

  const selected = getSelectedBhajanEntry(deityKey, data);
  if (!selected) return 'जल्द ही आ रहा है...';

  const navHtml =
    entries.length > 1
      ? `<div class="katha-list">${entries
          .map((item) => {
            const activeClass = item.slug === selected.slug ? ' active' : '';
            return `<button class="tab-btn${activeClass}" onclick="openBhajan('${deityKey}', '${item.slug}')">${item.title || item.slug}</button>`;
          })
          .join('')}</div><br/>`
      : '';

  return `${navHtml}${renderLyrics(selected)}`;
}

function openBhajan(deityKey, slug) {
  if (!deities[deityKey]) return;
  showDeityPage(deityKey, { initialTab: 'bhajan', initialBhajanSlug: slug });
}

function getMantraEntry(deityKey, mantraIndex) {
  const mantraList = deities[deityKey]?.mantras;
  if (!Array.isArray(mantraList)) return null;
  return mantraList[mantraIndex] || null;
}

function getMantraPreviewLabel(value = '', maxLength = 96) {
  const plainText = stripHtmlToPlainText(value);
  if (plainText.length <= maxLength) return plainText;
  return `${plainText.slice(0, maxLength).trim()}...`;
}

function syncMantraCountChip(deityKey, mantraIndex, totalCount, progress) {
  const storageKey = getMantraProgressStorageKey(deityKey, mantraIndex);
  const progressLabel = `${formatHindiNumber(progress)} / ${formatHindiNumber(totalCount)}`;
  document
    .querySelectorAll(`[data-mantra-progress-key="${storageKey}"]`)
    .forEach((button) => {
      button.classList.toggle(
        'is-complete',
        totalCount > 0 && progress >= totalCount,
      );
      const progressEl = button.querySelector('.mantra-count-progress');
      if (progressEl) progressEl.textContent = progressLabel;
    });
}

function renderMantras(mantras, key) {
  const list = mantras || [];
  if (!list.length) return 'जल्द ही आ रहा है...';

  const items = list
    .map((m, i) => {
      const totalCount = parseMantraCountValue(m.count);
      const progress = getMantraProgress(key, i, totalCount);
      const storageKey = getMantraProgressStorageKey(key, i);
      const openLabel = escapeHtml(
        `${m.type || 'मंत्र'} के लिए जाप माला खोलें`,
      );

      return `
  <div class="mantra-item mantra-card">
    <button class="copy-btn" onclick="copyMantra(this, ${i}, '${key}')">📋 कॉपी</button>
    <div class="mantra-type">${m.type}</div>
    <div class="mantra-text">${m.text}</div>
    <div class="mantra-meaning">${m.meaning}</div>
    <button
      class="mantra-count"
      type="button"
      onclick="openMantraMalaDialog('${key}', ${i}, this)"
      aria-label="${openLabel}"
      title="जाप माला खोलें"
      data-mantra-progress-key="${storageKey}"
    >
      <span class="mantra-count-main">
        <span class="mantra-count-icon" aria-hidden="true">🔢</span>
        <span>जाप संख्या: ${m.count}</span>
      </span>
      <span class="mantra-count-side">
        <span class="mantra-count-progress">${formatHindiNumber(progress)} / ${formatHindiNumber(totalCount)}</span>
        <span class="mantra-count-open">माला खोलें</span>
      </span>
    </button>
  </div>`;
    })
    .join('');

  return `<div class="mantra-merged">${items}</div>`;
}

function renderMantraMalaTrack(totalCount) {
  const track = document.getElementById('mantraMalaTrack');
  if (!track) return;

  const beadsHtml = Array.from({ length: totalCount }, (_, index) => {
    const angle = (index / totalCount) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(angle) * 42;
    const y = 50 + Math.sin(angle) * 35;
    const depth = (Math.sin(angle) + 1) / 2;
    const scale = 0.82 + depth * 0.34;

    return `<span
      class="mantra-mala-bead"
      data-bead-index="${index}"
      style="--bead-x:${x.toFixed(3)}%; --bead-y:${y.toFixed(3)}%; --bead-scale:${scale.toFixed(3)}; --bead-depth:${depth.toFixed(3)};"
      aria-hidden="true"
    ></span>`;
  }).join('');

  track.innerHTML = beadsHtml;
}

function getMantraMalaStatusText(progress, totalCount) {
  if (progress >= totalCount)
    return 'आज की माला पूर्ण हुई। फिर से आरंभ कर सकते हैं।';
  if (progress === 0) return 'पहला मनका प्रकाशित है। जाप आरंभ करें।';

  const remaining = totalCount - progress;
  if (remaining === 1) return 'अंतिम मनका शेष है।';
  return `${formatHindiNumber(remaining)} मनके शेष हैं।`;
}

function updateMantraMalaDialog() {
  if (!activeMantraMalaState) return;

  const { deityKey, mantraIndex, totalCount, progress } = activeMantraMalaState;
  const mantra = getMantraEntry(deityKey, mantraIndex);
  const deityName = deities[deityKey]?.name || '';
  const overlay = document.getElementById('mantraMalaDialog');
  const titleEl = document.getElementById('mantraMalaTitle');
  const subtitleEl = document.getElementById('mantraMalaSubtitle');
  const targetEl = document.getElementById('mantraMalaTarget');
  const progressMetaEl = document.getElementById('mantraMalaProgressMeta');
  const countEl = document.getElementById('mantraMalaCenterCount');
  const percentEl = document.getElementById('mantraMalaPercent');
  const statusEl = document.getElementById('mantraMalaStatus');
  const incrementBtn = document.getElementById('mantraMalaIncrementBtn');
  const track = document.getElementById('mantraMalaTrack');
  if (
    !mantra ||
    !overlay ||
    !titleEl ||
    !subtitleEl ||
    !targetEl ||
    !progressMetaEl ||
    !countEl ||
    !percentEl ||
    !statusEl ||
    !incrementBtn ||
    !track
  ) {
    return;
  }

  const percent =
    totalCount > 0 ? Math.round((progress / totalCount) * 100) : 0;

  titleEl.textContent = `${deityName} ${mantra.type || 'जाप माला'}`
    .trim()
    .replace(/\s+/g, ' ');
  subtitleEl.textContent = getMantraPreviewLabel(mantra.text);
  targetEl.textContent = `लक्ष्य ${formatHindiNumber(totalCount)} जाप`;
  progressMetaEl.textContent =
    progress >= totalCount
      ? 'संकल्प पूर्ण'
      : `अब तक ${formatHindiNumber(progress)} जाप`;
  countEl.textContent = `${formatHindiNumber(progress)} / ${formatHindiNumber(totalCount)}`;
  percentEl.textContent = `${formatHindiNumber(percent)}%`;
  statusEl.textContent = getMantraMalaStatusText(progress, totalCount);
  incrementBtn.textContent =
    progress >= totalCount ? 'फिर से नई माला शुरू करें' : 'एक जाप पूरा करें';
  overlay.classList.toggle(
    'is-complete',
    totalCount > 0 && progress >= totalCount,
  );

  Array.from(track.children).forEach((bead, index) => {
    bead.classList.toggle('is-complete', index < progress);
    bead.classList.toggle(
      'is-current',
      progress < totalCount && index === progress,
    );
  });

  syncMantraCountChip(deityKey, mantraIndex, totalCount, progress);
}

function restartAnimationClass(element, className) {
  if (!element) return;
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

function animateMantraMalaAdvance(previousProgress, nextProgress) {
  const overlay = document.getElementById('mantraMalaDialog');
  const track = document.getElementById('mantraMalaTrack');
  const center = overlay?.querySelector('.mantra-mala-center');
  const incrementBtn = document.getElementById('mantraMalaIncrementBtn');
  if (
    !overlay ||
    !track ||
    !center ||
    !incrementBtn ||
    !activeMantraMalaState
  ) {
    return;
  }

  const completedBead = track.querySelector(
    `[data-bead-index="${previousProgress}"]`,
  );
  const currentBead =
    nextProgress < activeMantraMalaState.totalCount
      ? track.querySelector(`[data-bead-index="${nextProgress}"]`)
      : null;

  restartAnimationClass(track, 'is-advancing');
  restartAnimationClass(center, 'is-bumping');
  restartAnimationClass(incrementBtn, 'is-bumping');
  restartAnimationClass(completedBead, 'is-just-completed');
  restartAnimationClass(currentBead, 'is-just-current');

  if (nextProgress >= activeMantraMalaState.totalCount) {
    restartAnimationClass(overlay, 'is-celebrating');
  }

  window.clearTimeout(mantraMalaAnimationTimer);
  mantraMalaAnimationTimer = window.setTimeout(() => {
    track.classList.remove('is-advancing');
    center.classList.remove('is-bumping');
    incrementBtn.classList.remove('is-bumping');
    completedBead?.classList.remove('is-just-completed');
    currentBead?.classList.remove('is-just-current');
    overlay.classList.remove('is-celebrating');
  }, 620);
}

function openMantraMalaDialog(deityKey, mantraIndex, trigger) {
  const mantra = getMantraEntry(deityKey, mantraIndex);
  const overlay = document.getElementById('mantraMalaDialog');
  if (!mantra || !overlay) return;

  const totalCount = parseMantraCountValue(mantra.count);
  if (!totalCount) return;

  activeMantraMalaTrigger = trigger || document.activeElement;
  activeMantraMalaState = {
    deityKey,
    mantraIndex,
    totalCount,
    progress: getMantraProgress(deityKey, mantraIndex, totalCount),
  };

  renderMantraMalaTrack(totalCount);
  updateMantraMalaDialog();
  overlay.classList.add('active');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('mantra-mala-open');

  window.setTimeout(() => {
    document.getElementById('mantraMalaIncrementBtn')?.focus();
  }, 30);
}

function closeMantraMalaDialog(event, options = {}) {
  const { restoreFocus = true } = options;
  const overlay = document.getElementById('mantraMalaDialog');
  if (!overlay) return;
  if (event && event.target && event.target.id !== 'mantraMalaDialog') return;

  window.clearTimeout(mantraMalaAnimationTimer);
  overlay.classList.remove('active', 'is-complete', 'is-celebrating');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('mantra-mala-open');

  const track = document.getElementById('mantraMalaTrack');
  if (track) {
    track.classList.remove('is-advancing');
    track
      .querySelectorAll('.is-just-completed, .is-just-current')
      .forEach((bead) =>
        bead.classList.remove('is-just-completed', 'is-just-current'),
      );
  }
  overlay
    .querySelectorAll('.is-bumping')
    .forEach((el) => el.classList.remove('is-bumping'));

  if (
    restoreFocus &&
    activeMantraMalaTrigger &&
    typeof activeMantraMalaTrigger.focus === 'function' &&
    document.contains(activeMantraMalaTrigger)
  ) {
    activeMantraMalaTrigger.focus();
  }

  activeMantraMalaState = null;
  activeMantraMalaTrigger = null;
}

if (typeof window !== 'undefined') {
  window.handleToggleContentFavorite = handleToggleContentFavorite;
}

function advanceMantraMalaCount() {
  if (!activeMantraMalaState) return;

  const { deityKey, mantraIndex, totalCount, progress } = activeMantraMalaState;

  if (progress >= totalCount) {
    activeMantraMalaState.progress = setMantraProgress(
      deityKey,
      mantraIndex,
      totalCount,
      0,
    );
    updateMantraMalaDialog();
    const track = document.getElementById('mantraMalaTrack');
    const center = document
      .getElementById('mantraMalaDialog')
      ?.querySelector('.mantra-mala-center');
    restartAnimationClass(track, 'is-advancing');
    restartAnimationClass(center, 'is-bumping');
    restartAnimationClass(
      track?.querySelector('[data-bead-index="0"]'),
      'is-just-current',
    );
    return;
  }

  const previousProgress = progress;
  activeMantraMalaState.progress = setMantraProgress(
    deityKey,
    mantraIndex,
    totalCount,
    progress + 1,
  );
  updateMantraMalaDialog();
  animateMantraMalaAdvance(previousProgress, activeMantraMalaState.progress);
}

function showTab(tabId, btn) {
  const safeTab = getSafeDeityTab(tabId);
  const availableTabs = activeDeityKey
    ? getAvailableDeityTabs(activeDeityKey)
    : validDeityTabs;
  if (!availableTabs.includes(safeTab)) return;
  const content = document.getElementById('deityContent');
  if (!content) return;
  content
    .querySelectorAll('.text-content')
    .forEach((t) => t.classList.remove('active'));
  document
    .querySelectorAll('.tabs .tab-btn')
    .forEach((b) => b.classList.remove('active'));
  const target = document.getElementById('tab-' + safeTab);
  if (target) target.classList.add('active');
  if (btn) btn.classList.add('active');
  activeDeityTab = safeTab;
  if (safeTab !== 'katha') activeKathaSlug = '';
  if (safeTab !== 'bhajan') activeBhajanSlug = '';
  if (safeTab !== 'extra') activeExtraIndex = 0;
  if (activeDeityKey) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: activeDeityKey,
      tabId: safeTab,
      kathaSlug: safeTab === 'katha' ? activeKathaSlug : '',
      bhajanSlug: safeTab === 'bhajan' ? activeBhajanSlug : '',
      extraIndex: safeTab === 'extra' ? activeExtraIndex : 0,
    });
  }
  if (safeTab !== 'mantra') {
    closeMantraMalaDialog(undefined, { restoreFocus: false });
  }
  syncChalisaNavigationControls();
}

function copyMantra(btn, idx, key) {
  const mantra = deities[key].mantras[idx];
  navigator.clipboard
    .writeText(mantra.text)
    .then(() => {
      btn.textContent = '✅ कॉपी हुआ';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 कॉपी';
        btn.classList.remove('copied');
      }, 2000);
    })
    .catch(() => {
      btn.textContent = '✅ कॉपी हुआ';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '📋 कॉपी';
        btn.classList.remove('copied');
      }, 2000);
    });
}

if (typeof window !== 'undefined') {
  window.printDeityContent = printDeityContent;
}

function printDeityContent() {
  document.body.classList.add('printing-deity-content');
  window.print();
  document.body.classList.remove('printing-deity-content');
}
