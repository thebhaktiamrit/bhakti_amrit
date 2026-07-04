// ============ BUILD HOME GRID ============
const deityTypeMap = {
  ganesh: 'देव',
  shiva: 'देव',
  durga: 'देवी',
  lakshmi: 'देवी',
  saraswati: 'देवी',
  vishnu: 'देव',
  ram: 'अवतार',
  krishna: 'अवतार',
  hanuman: 'देव',
  surya: 'ग्रह देव',
  kali: 'देवी',
  khatu_shyam: 'लोक देव',
  shani: 'ग्रह देव',
  brihaspati: 'ग्रह देव',
  gopal: 'अवतार',
  brahma: 'देव',
  bhairav: 'देव',
  batuk_bhairav: 'देव',
  navgrah: 'ग्रह देव',
  vishwakarma: 'देव',
  ravidas: 'लोक देव',
  gorakh_nath: 'लोक देव',
  jaharveer: 'लोक देव',
  pretraj_sarkar: 'लोक देव',
  balaji: 'लोक देव',
  tirupati_balaji: 'देव',
  sai: 'लोक देव',
  giriraj: 'लोक देव',
  mahavir: 'लोक देव',
  parshuram: 'अवतार',
  ramdev: 'लोक देव',
  pitar: 'लोक देव',
  baba_gangaram: 'लोक देव',
  vindhyeshwari: 'देवी',
  mahalakshmi: 'देवी',
  gayatri: 'देवी',
  mahakali: 'देवी',
  sheetla: 'देवी',
  radha: 'देवी',
  tulsi: 'देवी',
  vaishno_devi: 'देवी',
  santoshi_maa: 'देवी',
  annapurna: 'देवी',
  parvati: 'देवी',
  baglamukhi: 'देवी',
  ganga: 'देवी',
  narmada: 'देवी',
  sharda: 'देवी',
  shakambhari: 'देवी',
  lalita_shakambhari: 'देवी',
  rani_sati: 'देवी',
};

function getDeityType(key) {
  return deityTypeMap[key] || 'देव';
}

function getValidDeityImage(path) {
  if (!path) return '';
  const normalized = String(path)
    .trim()
    .replace(/^\.?\//, '');
  if (!normalized.startsWith('icons/')) return '';
  if (!normalized.toLowerCase().endsWith('.webp')) return '';
  return normalized;
}

let activeHomeType = 'all';
let activeHomeNavId = 'home';
let deityReturnHomeType = 'all';
let deityReturnHomeNavId = 'home';
let activeHomeSearchQuery = '';
let activeDeityKey = '';
let activeDeityTab = 'about';
let activeKathaSlug = '';
let activeBhajanSlug = '';
let activeExtraIndex = 0;
let activeTempleDetailId = '';
let activeFestivalDetailId = '';
let activeScriptureDetailId = '';
let showFavoritesOnly = false;
const HOME_BATCH_SIZE = 60;
const HOME_VISIBLE_TAG_COUNT = 4;
const HOME_CARD_IMG_SIZE = 240;
const HOME_TABLE_IMG_SIZE = 64;
const HOME_VIEW_MODE_STORAGE_KEY = 'bhaktiHomeViewMode';
const TEMPLE_VIEW_MODE_STORAGE_KEY = 'bhaktiTempleViewMode';
const MANTRA_PROGRESS_STORAGE_KEY = 'bhaktiMantraJapProgress';
const FAVORITE_DEITIES_STORAGE_KEY = 'bhaktiFavoriteDeities';
const MOBILE_NAV_BREAKPOINT = 600;
const COMPACT_NAV_BREAKPOINT = 1180;
const WIDE_TABLET_NAV_BREAKPOINT = 768;
const MOBILE_PRIMARY_NAV_COUNT = 3;
const TABLET_PRIMARY_NAV_COUNT = 4;
const WIDE_TABLET_PRIMARY_NAV_COUNT = 5;
const CHALISA_STEP_SELECTOR = '[data-chalisa-step="true"]';
const CHALISA_SELECTED_STEP_CLASS = 'chalisa-step-active';
const EXTRA_STEP_NAV_SLUGS = new Set([
  'shiva-tandava-stotra',
  'stuti',
  'bajrang-baan',
  'sankat-mochan',
]);
let homeFilteredEntries = [];
let renderedHomeCount = 0;
let homeRenderCycleId = 0;
let homeRenderTimer = null;
let activeHomeViewMode = 'card';
let activeTempleViewMode = 'card';
let activeMantraMalaState = null;
let activeMantraMalaTrigger = null;
let mantraMalaAnimationTimer = 0;
let responsiveNavButtons = [];
let activeNavLayout = '';
const homeTempleCountCache = new Map();
const expandedHomeTags = new Set();
let mantraProgressStore = loadMantraProgressStore();
const validDeityTabs = [
  'about',
  'aarti',
  'chalisa',
  'katha',
  'bhajan',
  'mantra',
  'extra',
  'temples',
];

function normalizeAlias(value = '') {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function addAlias(targetMap, alias, deityKey) {
  const normalized = normalizeAlias(alias);
  if (!normalized || !deityKey) return;
  if (!targetMap.has(normalized)) targetMap.set(normalized, deityKey);
  const compact = normalized.replace(/\s+/g, '');
  if (compact && !targetMap.has(compact)) targetMap.set(compact, deityKey);
}

function buildDeityAliasMap() {
  const aliasMap = new Map();

  Object.entries(deities).forEach(([key, deity]) => {
    addAlias(aliasMap, key, key);
    addAlias(aliasMap, key.replace(/_/g, ' '), key);
    addAlias(aliasMap, key.replace(/_/g, ''), key);

    if (deity?.english) {
      addAlias(aliasMap, deity.english, key);
      addAlias(
        aliasMap,
        deity.english.replace(/\b(shri|shree|lord)\b/gi, '').trim(),
        key,
      );
    }

    if (deity?.name) {
      addAlias(aliasMap, deity.name, key);
      addAlias(aliasMap, deity.name.replace(/^श्री\s+/, ''), key);
    }

    if (deity?.desc) {
      deity.desc
        .split(/[,,;|]/)
        .map((part) => part.trim())
        .filter(Boolean)
        .forEach((part) => addAlias(aliasMap, part, key));
    }
  });

  // Load configurable aliases from `js/deity-aliases.js` when present.
  const configuredAliases =
    typeof window !== 'undefined' && window.deityAliases
      ? window.deityAliases
      : {};

  Object.entries(configuredAliases).forEach(([key, aliases]) => {
    if (!deities[key] || !Array.isArray(aliases)) return;
    aliases.forEach((alias) => addAlias(aliasMap, alias, key));
  });

  return aliasMap;
}

const deityAliasMap = buildDeityAliasMap();

function resolveDeityKey(rawDeityKey = '') {
  const raw = String(rawDeityKey || '').trim();
  if (!raw) return '';
  if (deities[raw]) return raw;
  const normalized = normalizeAlias(raw);
  if (!normalized) return '';
  return (
    deityAliasMap.get(normalized) ||
    deityAliasMap.get(normalized.replace(/\s+/g, '')) ||
    ''
  );
}

const homeTypeToNavId = {
  all: 'home',
  देव: 'type-dev',
  देवी: 'type-devi',
  अवतार: 'type-avatar',
  'ग्रह देव': 'type-grah-dev',
  'लोक देव': 'type-lok-dev',
};

function getNavIdByHomeType(typeId = 'all') {
  return homeTypeToNavId[typeId] || 'home';
}

function getSafeHomeType(typeId = 'all') {
  const raw = String(typeId || 'all');
  const decoded = (() => {
    try {
      return decodeURIComponent(raw);
    } catch (error) {
      return raw;
    }
  })();

  const normalized = decoded
    .replace(/\+/g, ' ')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  if (Object.prototype.hasOwnProperty.call(homeTypeToNavId, normalized)) {
    return normalized;
  }

  const aliasMap = {
    grah: 'ग्रह देव',
    'grah dev': 'ग्रह देव',
    'lok dev': 'लोक देव',
    lok: 'लोक देव',
    dev: 'देव',
    devi: 'देवी',
    avatar: 'अवतार',
    ग्रहदेव: 'ग्रह देव',
    लोकदेव: 'लोक देव',
  };

  return aliasMap[normalized.toLowerCase()] || 'all';
}

function getHomeSearchPlaceholder(typeId = activeHomeType) {
  const placeholders = {
    all: 'देव-देवी का नाम लिखें...',
    देव: 'देव का नाम लिखें...',
    देवी: 'देवी का नाम लिखें...',
    अवतार: 'अवतार का नाम लिखें...',
    'ग्रह देव': 'ग्रह देव का नाम लिखें...',
    'लोक देव': 'लोक देव का नाम लिखें...',
  };
  const safeType = getSafeHomeType(typeId);
  return placeholders[safeType] || placeholders.all;
}

function getHomeSectionMeta(typeId = activeHomeType) {
  const sectionMeta = {
    all: {
      icon: '🪔',
      title: 'देव-देवी संग्रह',
      subtitle:
        'किसी भी देव-देवी का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
    देव: {
      icon: '🕉️',
      title: 'देव संग्रह',
      subtitle: 'किसी भी देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
    देवी: {
      icon: '🌺',
      title: 'देवी संग्रह',
      subtitle: 'किसी भी देवी का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
    अवतार: {
      icon: '🏹',
      title: 'अवतार संग्रह',
      subtitle: 'किसी भी अवतार का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
    'ग्रह देव': {
      icon: '🪐',
      title: 'ग्रह देव संग्रह',
      subtitle:
        'किसी भी ग्रह देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
    'लोक देव': {
      icon: '🎠',
      title: 'लोक देव संग्रह',
      subtitle:
        'किसी भी लोक देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
    },
  };
  const safeType = getSafeHomeType(typeId);
  return sectionMeta[safeType] || sectionMeta.all;
}

function updateHomeSectionHeader(typeId = activeHomeType) {
  const sectionMeta = getHomeSectionMeta(typeId);
  const iconEl = document.getElementById('homeSectionIcon');
  const titleText = document.getElementById('homeSectionTitleText');
  const subtitleText = document.getElementById('homeSectionSubtitle');

  if (iconEl) iconEl.textContent = sectionMeta.icon;
  if (titleText) titleText.textContent = sectionMeta.title;
  if (subtitleText) subtitleText.textContent = sectionMeta.subtitle;
}

function getSafeDeityTab(tabId = 'about') {
  return validDeityTabs.includes(tabId) ? tabId : 'about';
}

function getExtraEntrySlug(entry, idx = 0) {
  if (typeof entry?.slug === 'string' && entry.slug.trim().length > 0) {
    return entry.slug.trim().toLowerCase();
  }
  return idx === 0 ? 'extra' : `extra-${idx + 1}`;
}

function getExtraEntryAliases(entry, idx = 0) {
  const aliases = [getExtraEntrySlug(entry, idx)];
  if (Array.isArray(entry?.aliases)) {
    entry.aliases.forEach((alias) => {
      if (typeof alias !== 'string' || !alias.trim()) return;
      aliases.push(alias.trim().toLowerCase());
    });
  }
  return [...new Set(aliases)];
}

function getExtraIndexFromPathSegment(deityKey = '', tabSegment = '') {
  const normalized = String(tabSegment || '')
    .trim()
    .toLowerCase();
  if (!normalized) return -1;

  const extraData = getExtraContentData(deityKey);
  const entries = getExtraEntries(extraData);
  if (!entries.length) return -1;

  return entries.findIndex((entry, idx) =>
    getExtraEntryAliases(entry, idx).includes(normalized),
  );
}

function resolveDeityTabFromPathSegment(deityKey = '', tabSegment = 'about') {
  const normalized = String(tabSegment || '')
    .trim()
    .toLowerCase();
  if (getExtraIndexFromPathSegment(deityKey, normalized) >= 0) return 'extra';
  return getSafeDeityTab(normalized);
}

function isValidDeityTabPathSegment(deityKey = '', tabSegment = '') {
  const normalized = String(tabSegment || '')
    .trim()
    .toLowerCase();
  if (!normalized) return false;
  if (getExtraIndexFromPathSegment(deityKey, normalized) >= 0) return true;
  return validDeityTabs.includes(normalized);
}

function getDeityTabPathSegment(
  deityKey = '',
  tabId = 'about',
  extraIndex = activeExtraIndex,
) {
  const safeTab = getSafeDeityTab(tabId);
  if (safeTab === 'extra') {
    const extraData = getExtraContentData(deityKey);
    const entries = getExtraEntries(extraData);
    if (entries.length) {
      const safeIndex = getSafeExtraIndex(extraData, extraIndex);
      return getExtraEntrySlug(entries[safeIndex], safeIndex);
    }
  }
  return safeTab;
}

function getPathState() {
  const segments = window.location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));

  if (segments.length === 2 && segments[0] === 'temples') {
    return {
      pageId: 'temple-detail',
      templeId: segments[1],
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 2 && segments[0] === 'festivals') {
    return {
      pageId: 'festival-detail',
      festivalId: segments[1],
      templeId: '',
      scriptureId: '',
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 2 && segments[0] === 'scriptures') {
    return {
      pageId: 'scripture-detail',
      scriptureId: segments[1],
      festivalId: '',
      templeId: '',
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 1 && segments[0] === 'temples') {
    return {
      pageId: 'temples',
      templeId: '',
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 1 && segments[0] === 'festivals') {
    return {
      pageId: 'festivals',
      festivalId: '',
      templeId: '',
      scriptureId: '',
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 1 && segments[0] === 'scriptures') {
    return {
      pageId: 'scriptures',
      scriptureId: '',
      festivalId: '',
      templeId: '',
      deityKey: '',
      tabId: 'about',
      kathaSlug: '',
      extraIndex: 0,
    };
  }

  if (segments.length === 3) {
    const [rawDeityKey, tabId, slugValue] = segments;
    const deityKey = resolveDeityKey(rawDeityKey);
    const safeTab = resolveDeityTabFromPathSegment(deityKey, tabId);
    const extraIndex =
      safeTab === 'extra' ? getExtraIndexFromPathSegment(deityKey, tabId) : 0;
    if (
      deities[deityKey] &&
      isValidDeityTabPathSegment(deityKey, tabId) &&
      safeTab === 'katha'
    ) {
      return {
        pageId: '',
        templeId: '',
        deityKey,
        tabId: safeTab,
        kathaSlug: slugValue,
        bhajanSlug: '',
        extraIndex,
      };
    }
    if (
      deities[deityKey] &&
      isValidDeityTabPathSegment(deityKey, tabId) &&
      safeTab === 'bhajan'
    ) {
      return {
        pageId: '',
        templeId: '',
        deityKey,
        tabId: safeTab,
        kathaSlug: '',
        bhajanSlug: slugValue,
        extraIndex,
      };
    }
  }

  if (segments.length === 2) {
    const [rawDeityKey, tabId] = segments;
    const deityKey = resolveDeityKey(rawDeityKey);
    const safeTab = resolveDeityTabFromPathSegment(deityKey, tabId);
    const extraIndex =
      safeTab === 'extra' ? getExtraIndexFromPathSegment(deityKey, tabId) : 0;
    if (deities[deityKey] && isValidDeityTabPathSegment(deityKey, tabId)) {
      return {
        pageId: '',
        templeId: '',
        deityKey,
        tabId: safeTab,
        kathaSlug: '',
        extraIndex,
      };
    }
  }

  return {
    pageId: '',
    festivalId: '',
    templeId: '',
    scriptureId: '',
    deityKey: '',
    tabId: 'about',
    kathaSlug: '',
    extraIndex: 0,
  };
}

function getKathaEntries(data = null, deityKey = '') {
  if (!data) return [];
  if (Array.isArray(data.items)) return data.items.filter(Boolean);
  if (Array.isArray(data)) return data.filter(Boolean);

  if (typeof data === 'object') {
    const entries = [];
    const marker = '<div class="title-line">॥ १६ सोमवार व्रत कथा ॥</div>';
    let primaryContent = data.content || '';
    const primaryBlocks = getLyricsBlocks(data);

    if (
      deityKey === 'shiva' &&
      typeof primaryContent === 'string' &&
      primaryContent.includes(marker)
    ) {
      primaryContent = primaryContent
        .split(marker)[0]
        .replace(/<br\/><br\/>$/, '');
    }

    if (hasRenderableLyricsBody(data)) {
      const primaryEntry = {
        slug: data.slug || 'somvar-vrat-katha',
        title: data.title || '',
      };

      if (
        typeof primaryContent === 'string' &&
        primaryContent.trim().length > 0
      ) {
        primaryEntry.content = primaryContent;
      }

      if (Array.isArray(data.lines) && data.lines.length > 0) {
        primaryEntry.lines = data.lines;
      }

      if (primaryBlocks.length > 0) {
        primaryEntry.blocks = primaryBlocks;
      }

      entries.push(primaryEntry);
    }

    if (Array.isArray(data.extraKathas)) {
      data.extraKathas.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        if (!hasRenderableLyricsBody(item)) return;
        entries.push(item);
      });
    }

    if (entries.length) return entries;
  }

  if (typeof data === 'string' && data.trim().length > 0) {
    return [{ slug: 'katha', title: '', content: data }];
  }

  if (
    data &&
    typeof data === 'object' &&
    typeof data.content === 'string' &&
    data.content.trim().length > 0
  ) {
    return [{ slug: 'katha', title: data.title || '', content: data.content }];
  }

  return [];
}

function getBhajanEntries(data = null, deityKey = '') {
  if (!data) return [];
  if (Array.isArray(data.items)) return data.items.filter(Boolean);
  if (Array.isArray(data)) return data.filter(Boolean);

  if (typeof data === 'object') {
    const entries = [];
    if (hasRenderableLyricsBody(data)) {
      const primaryEntry = { slug: data.slug || 'bhajan', title: data.title || '' };
      if (typeof data.content === 'string' && data.content.trim().length > 0) primaryEntry.content = data.content;
      if (Array.isArray(data.lines) && data.lines.length > 0) primaryEntry.lines = data.lines;
      const primaryBlocks = getLyricsBlocks(data);
      if (primaryBlocks.length > 0) primaryEntry.blocks = primaryBlocks;
      entries.push(primaryEntry);
    }
    if (Array.isArray(data.extraBhajan)) {
      data.extraBhajan.forEach((item) => {
        if (!item || typeof item !== 'object') return;
        if (!hasRenderableLyricsBody(item)) return;
        entries.push(item);
      });
    }
    if (entries.length) return entries;
  }

  if (typeof data === 'string' && data.trim().length > 0) {
    return [{ slug: 'bhajan', title: '', content: data }];
  }
  if (data && typeof data === 'object' && typeof data.content === 'string' && data.content.trim().length > 0) {
    return [{ slug: 'bhajan', title: data.title || '', content: data.content }];
  }
  return [];
}

function getSafeBhajanSlug(deityKey = '', requestedSlug = '') {
  const entries = getBhajanEntries(deities[deityKey]?.bhajan, deityKey);
  if (!entries.length) return '';
  const raw = String(requestedSlug || '').trim();
  const selected = entries.find((item) => item.slug === raw);
  return selected ? selected.slug : entries[0].slug;
}

function getSelectedBhajanEntry(deityKey, data) {
  const entries = getBhajanEntries(data, deityKey);
  if (!entries.length) return null;
  const safeSlug = getSafeBhajanSlug(deityKey, activeBhajanSlug);
  const selected = entries.find((item) => item.slug === safeSlug) || entries[0];
  activeBhajanSlug = selected.slug;
  return selected;
}

function getSafeKathaSlug(deityKey = '', requestedSlug = '') {
  const entries = getKathaEntries(deities[deityKey]?.katha, deityKey);
  if (!entries.length) return '';
  const raw = String(requestedSlug || '').trim();
  const selected = entries.find((item) => item.slug === raw);
  return selected ? selected.slug : entries[0].slug;
}

function getSelectedKathaEntry(deityKey, data) {
  const entries = getKathaEntries(data, deityKey);
  if (!entries.length) return null;
  const safeSlug = getSafeKathaSlug(deityKey, activeKathaSlug);
  const selected = entries.find((item) => item.slug === safeSlug) || entries[0];
  activeKathaSlug = selected.slug;
  return selected;
}

function updateUrlState({
  typeId = activeHomeType,
  deityKey = '',
  tabId = activeDeityTab,
  kathaSlug = activeKathaSlug,
  bhajanSlug = activeBhajanSlug,
  pageId = '',
  templeId = activeTempleDetailId,
  festivalId = activeFestivalDetailId,
  scriptureId = activeScriptureDetailId,
  extraIndex = activeExtraIndex,
  replace = false,
} = {}) {
  const url = new URL(window.location.href);
  const safeType = getSafeHomeType(typeId);
  const resolvedDeity = resolveDeityKey(deityKey);
  const safeDeity =
    resolvedDeity && deities[resolvedDeity] ? resolvedDeity : '';
  const safeTab = getSafeDeityTab(tabId);
  const safeKathaSlug =
    safeDeity && safeTab === 'katha'
      ? getSafeKathaSlug(safeDeity, kathaSlug)
      : '';
  const safeBhajanSlug =
    safeDeity && safeTab === 'bhajan'
      ? getSafeBhajanSlug(safeDeity, bhajanSlug)
      : '';
  const safeExtraIndex =
    safeDeity && safeTab === 'extra'
      ? getSafeExtraIndex(getExtraContentData(safeDeity), extraIndex)
      : 0;
  const safeTabPath = getDeityTabPathSegment(
    safeDeity,
    safeTab,
    safeExtraIndex,
  );

  if (safeDeity) {
    url.pathname =
      safeTab === 'katha' && safeKathaSlug
        ? `/${encodeURIComponent(safeDeity)}/${encodeURIComponent(safeTabPath)}/${encodeURIComponent(safeKathaSlug)}`
        : safeTab === 'bhajan' && safeBhajanSlug
          ? `/${encodeURIComponent(safeDeity)}/${encodeURIComponent(safeTabPath)}/${encodeURIComponent(safeBhajanSlug)}`
          : `/${encodeURIComponent(safeDeity)}/${encodeURIComponent(safeTabPath)}`;
    url.search = '';
  } else if (pageId === 'temple-detail') {
    const safeTempleId = templesData.some((t) => t.id === templeId)
      ? templeId
      : '';
    url.pathname = safeTempleId
      ? `/temples/${encodeURIComponent(safeTempleId)}`
      : '/temples';
    url.search = '';
  } else if (pageId === 'festival-detail') {
    const safeFestivalId = festivalsData.some((f) => f.id === festivalId)
      ? festivalId
      : '';
    url.pathname = safeFestivalId
      ? `/festivals/${encodeURIComponent(safeFestivalId)}`
      : '/festivals';
    url.search = '';
  } else if (pageId === 'scripture-detail') {
    const safeScriptureId = scripturesData.some((s) => s.id === scriptureId)
      ? scriptureId
      : '';
    url.pathname = safeScriptureId
      ? `/scriptures/${encodeURIComponent(safeScriptureId)}`
      : '/scriptures';
    url.search = '';
  } else if (pageId === 'temples') {
    url.pathname = '/temples';
    url.search = '';
  } else if (pageId === 'festivals') {
    url.pathname = '/festivals';
    url.search = '';
  } else if (pageId === 'scriptures') {
    url.pathname = '/scriptures';
    url.search = '';
  } else {
    url.pathname = '/';
    url.search = '';
    if (safeType !== 'all') url.searchParams.set('type', safeType);
  }

  const method = replace ? 'replaceState' : 'pushState';
  history[method](
    {
      typeId: safeType,
      deityKey: safeDeity || null,
      tabId: safeDeity ? safeTab : null,
      kathaSlug: safeDeity && safeTab === 'katha' ? safeKathaSlug : null,
      bhajanSlug: safeDeity && safeTab === 'bhajan' ? safeBhajanSlug : null,
      extraIndex: safeDeity && safeTab === 'extra' ? safeExtraIndex : null,
    },
    '',
    `${url.pathname}${url.search}`,
  );
}

function applyUrlState() {
  const params = new URLSearchParams(window.location.search);
  const pathState = getPathState();
  const pathPageId = pathState.pageId || '';
  const pathFestivalId = pathState.festivalId || '';
  const pathTempleId = pathState.templeId || '';
  const pathScriptureId = pathState.scriptureId || '';
  const pathDeity = pathState.deityKey;
  const pathTab = pathState.tabId;
  const pathKathaSlug = pathState.kathaSlug || '';
  const pathBhajanSlug = pathState.bhajanSlug || '';
  const pathExtraIndex = pathState.extraIndex ?? 0;
  const rawType = params.get('type') || 'all';
  const typeId = getSafeHomeType(rawType);
  const navId = getNavIdByHomeType(typeId);
  const queryDeity = params.get('deity') || '';
  const resolvedQueryDeity = resolveDeityKey(queryDeity);
  const queryTab = resolveDeityTabFromPathSegment(
    resolvedQueryDeity,
    params.get('tab') || 'about',
  );
  const queryKathaSlug = params.get('katha') || '';
  const queryBhajanSlug = params.get('bhajan') || '';
  const deityKey = pathDeity || resolveDeityKey(queryDeity);
  const tabId = pathDeity ? pathTab : queryTab;
  const kathaSlug = pathDeity ? pathKathaSlug : queryKathaSlug;
  const bhajanSlug = pathDeity ? pathBhajanSlug : queryBhajanSlug;

  if (pathPageId === 'temple-detail') {
    showTempleDetailsPage(pathTempleId, { skipUrl: true });
    return;
  }

  if (pathPageId === 'festival-detail') {
    showFestivalDetailsPage(pathFestivalId, { skipUrl: true });
    return;
  }

  if (pathPageId === 'scripture-detail') {
    showScriptureDetailsPage(pathScriptureId, { skipUrl: true });
    return;
  }

  if (pathPageId === 'temples') {
    showTemplesMenuPage({ skipUrl: true });
    return;
  }

  if (pathPageId === 'festivals') {
    showFestivalsMenuPage({ skipUrl: true });
    return;
  }

  if (pathPageId === 'scriptures') {
    showScripturesMenuPage({ skipUrl: true });
    return;
  }

  if (deityKey && deities[deityKey]) {
    activeHomeType = typeId;
    activeHomeNavId = navId;
    showDeityPage(deityKey, {
      skipUrl: true,
      initialTab: tabId,
      initialKathaSlug: kathaSlug,
      initialBhajanSlug: bhajanSlug,
      initialExtraIndex: pathExtraIndex,
    });
    updateUrlState({
      typeId: activeHomeType,
      deityKey,
      tabId,
      kathaSlug,
      bhajanSlug,
      extraIndex: tabId === 'extra' ? pathExtraIndex : 0,
      replace: true,
    });
    return;
  }

  showHomeByType(typeId, navId, { skipUrl: true });
}

function loadFavoriteDeities() {
  try {
    const saved = localStorage.getItem(FAVORITE_DEITIES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
}

function saveFavoriteDeities(favorites) {
  try {
    localStorage.setItem(FAVORITE_DEITIES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    // Ignore storage errors
  }
}

function isDeityFavorite(deityKey) {
  const favorites = loadFavoriteDeities();
  return favorites.includes(deityKey);
}

function toggleDeityFavorite(deityKey) {
  const favorites = loadFavoriteDeities();
  const index = favorites.indexOf(deityKey);
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(deityKey);
  }
  saveFavoriteDeities(favorites);
  return favorites.includes(deityKey);
}

function getFavoriteDeities() {
  return loadFavoriteDeities();
}

