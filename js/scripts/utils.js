function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function handleContentImageError(img) {
  if (!img || typeof img !== 'object') return;

  const figure =
    typeof img.closest === 'function' ? img.closest('.katha-figure') : null;
  const media =
    typeof img.closest === 'function' ? img.closest('.katha-media') : null;
  const mediaBlock =
    typeof img.closest === 'function'
      ? img.closest('.lyrics-block-media')
      : null;

  if (figure && typeof figure.remove === 'function') {
    figure.remove();
  } else if (typeof img.remove === 'function') {
    img.remove();
  }

  if (
    media &&
    !media.querySelector('img') &&
    typeof media.remove === 'function'
  ) {
    media.remove();
  }

  if (
    mediaBlock &&
    !mediaBlock.querySelector('img') &&
    typeof mediaBlock.remove === 'function'
  ) {
    mediaBlock.remove();
  }
}

function isDocumentShort(extraSpace = 120) {
  return (
    document.documentElement.scrollHeight <= window.innerHeight + extraSpace
  );
}

function isNearDocumentBottom(offset = 600) {
  return (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - offset
  );
}

function decorateContentHtml(value = '') {
  return String(value || '').replace(/<img\b([^>]*?)\/?>/gi, (match, attrs) => {
    let nextAttrs = attrs || '';

    if (!/\bloading\s*=/.test(nextAttrs)) nextAttrs += ' loading="lazy"';
    if (!/\bdecoding\s*=/.test(nextAttrs)) nextAttrs += ' decoding="async"';

    if (/\bonerror\s*=/.test(nextAttrs)) {
      nextAttrs = nextAttrs.replace(
        /\bonerror\s*=\s*(['"])(.*?)\1/i,
        (fullMatch, quote) =>
          ` onerror=${quote}handleContentImageError(this)${quote}`,
      );
    } else {
      nextAttrs += ' onerror="handleContentImageError(this)"';
    }

    return `<img${nextAttrs}>`;
  });
}

const HINDI_READING_WORDS_PER_MINUTE = 140;
const hindiNumberFormatter =
  typeof Intl !== 'undefined' && typeof Intl.NumberFormat === 'function'
    ? new Intl.NumberFormat('hi-IN-u-nu-deva')
    : null;

function formatHindiNumber(value) {
  if (hindiNumberFormatter) return hindiNumberFormatter.format(value);
  return String(value);
}

function normalizeHindiDigits(value = '') {
  return String(value || '').replace(/[०-९]/g, (digit) =>
    String(digit.charCodeAt(0) - 2406),
  );
}

function parseMantraCountValue(value = '') {
  const normalized = normalizeHindiDigits(value);
  const match = normalized.match(/\d+/);
  if (!match) return 0;
  const parsed = Number.parseInt(match[0], 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function loadMantraProgressStore() {
  try {
    const raw = localStorage.getItem(MANTRA_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (error) {
    return {};
  }
}

function persistMantraProgressStore() {
  try {
    localStorage.setItem(
      MANTRA_PROGRESS_STORAGE_KEY,
      JSON.stringify(mantraProgressStore),
    );
  } catch (error) {
    // Ignore storage failures so chanting interaction still works in-session.
  }
}

function getMantraProgressStorageKey(deityKey, mantraIndex) {
  return `${deityKey}:${mantraIndex}`;
}

function getMantraProgress(deityKey, mantraIndex, totalCount) {
  const storageKey = getMantraProgressStorageKey(deityKey, mantraIndex);
  const savedValue = Number(mantraProgressStore[storageKey]);
  if (!Number.isInteger(savedValue)) return 0;
  return Math.max(0, Math.min(savedValue, totalCount));
}

function setMantraProgress(deityKey, mantraIndex, totalCount, progress) {
  const storageKey = getMantraProgressStorageKey(deityKey, mantraIndex);
  const safeProgress = Math.max(0, Math.min(progress, totalCount));

  if (safeProgress === 0) {
    delete mantraProgressStore[storageKey];
  } else {
    mantraProgressStore[storageKey] = safeProgress;
  }

  persistMantraProgressStore();
  return safeProgress;
}

function stripHtmlToPlainText(value = '') {
  return String(value || '')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6])>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function getWordCountFromText(value = '') {
  const plainText = stripHtmlToPlainText(value);
  if (!plainText) return 0;
  const words = plainText.match(/[\p{L}\p{N}]+/gu);
  return Array.isArray(words) ? words.length : 0;
}

function getHindiReadTimeLabelFromText(value = '') {
  const wordCount = getWordCountFromText(value);
  if (!wordCount) return '';
  const minutes = Math.max(
    1,
    Math.ceil(wordCount / HINDI_READING_WORDS_PER_MINUTE),
  );
  return `${formatHindiNumber(minutes)} मिनट में पढ़ें`;
}

function normalizeLyricsMedia(media) {
  if (!media) return [];
  const items = Array.isArray(media) ? media : [media];
  return items.filter(
    (item) =>
      item &&
      typeof item === 'object' &&
      typeof item.src === 'string' &&
      item.src.trim().length > 0,
  );
}

function getLyricsBlocks(data) {
  if (!data || typeof data !== 'object') return [];
  const blocks = Array.isArray(data.blocks)
    ? data.blocks
    : Array.isArray(data.content)
      ? data.content
      : [];
  return blocks.filter((block) => {
    if (!block || typeof block !== 'object') return false;
    if (block.type === 'image') return normalizeLyricsMedia(block).length > 0;
    if (normalizeLyricsMedia(block.mediaBefore).length > 0) return true;
    if (normalizeLyricsMedia(block.mediaAfter).length > 0) return true;
    if (typeof block.html === 'string' && block.html.trim().length > 0)
      return true;
    if (typeof block.text === 'string' && block.text.trim().length > 0)
      return true;
    return typeof block.content === 'string' && block.content.trim().length > 0;
  });
}

function hasRenderableLyricsBody(data) {
  if (typeof data === 'string') return data.trim().length > 0;
  if (!data || typeof data !== 'object') return false;
  if (typeof data.content === 'string' && data.content.trim().length > 0)
    return true;
  if (Array.isArray(data.lines) && data.lines.length > 0) return true;
  return getLyricsBlocks(data).length > 0;
}

function getLyricsReadableText(data) {
  if (typeof data === 'string') return data;
  if (!data || typeof data !== 'object') return '';

  const parts = [];
  if (typeof data.title === 'string') parts.push(data.title);
  if (typeof data.content === 'string') parts.push(data.content);

  getLyricsBlocks(data).forEach((block) => {
    if (!block || typeof block !== 'object') return;

    if (typeof block.text === 'string') parts.push(block.text);
    if (typeof block.content === 'string') parts.push(block.content);
    if (typeof block.html === 'string') parts.push(block.html);

    normalizeLyricsMedia(block.type === 'image' ? block : block.mediaBefore)
      .concat(normalizeLyricsMedia(block.mediaAfter))
      .forEach((mediaItem) => {
        if (typeof mediaItem.alt === 'string') parts.push(mediaItem.alt);
        if (typeof mediaItem.caption === 'string')
          parts.push(mediaItem.caption);
      });
  });

  if (Array.isArray(data.lines)) {
    data.lines.forEach((line) => {
      if (typeof line === 'string') {
        parts.push(line);
        return;
      }
      if (!line || typeof line !== 'object') return;
      if (typeof line.text === 'string') parts.push(line.text);
      if (typeof line.refrain === 'string') parts.push(line.refrain);
      const hindiText = getLyricsLineHindiText(line);
      if (hindiText) parts.push(hindiText);
    });
  }

  return parts.join(' ');
}

function getAboutReadableText(data) {
  if (typeof data === 'string') return data;
  if (!Array.isArray(data)) return '';

  return data
    .map((section) => {
      if (!section || typeof section !== 'object') return '';
      const parts = [];
      if (typeof section.title === 'string') parts.push(section.title);
      if (typeof section.content === 'string') parts.push(section.content);
      if (Array.isArray(section.items)) {
        section.items.forEach((item) => {
          if (!item || typeof item !== 'object') return;
          if (typeof item.label === 'string') parts.push(item.label);
          if (typeof item.text === 'string') parts.push(item.text);
        });
      }
      return parts.join(' ');
    })
    .filter(Boolean)
    .join(' ');
}

function getMantrasReadableText(mantras) {
  if (!Array.isArray(mantras)) return '';
  return mantras
    .map((mantra) => {
      if (!mantra || typeof mantra !== 'object') return '';
      return [mantra.type, mantra.text, mantra.meaning]
        .filter((part) => typeof part === 'string' && part.trim().length > 0)
        .join(' ');
    })
    .filter(Boolean)
    .join(' ');
}

function hasLyricsContent(data) {
  if (Array.isArray(data?.items) && data.items.length > 0) return true;
  if (Array.isArray(data?.extraKathas) && data.extraKathas.length > 0)
    return true;
  return hasRenderableLyricsBody(data);
}

function hasMantrasContent(data) {
  return Array.isArray(data) && data.length > 0;
}

function getExtraContentData(deityKey = '') {
  if (!deityKey) return null;
  const store =
    typeof extraContent !== 'undefined'
      ? extraContent
      : typeof window !== 'undefined'
        ? window.extraContent
        : null;
  const data = store?.[deityKey];
  return data && typeof data === 'object' ? data : null;
}

function getExtraEntries(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data.filter(Boolean);
  if (Array.isArray(data.items)) return data.items.filter(Boolean);
  return [data];
}

function getExtraEntryLabel(entry, idx = 0) {
  if (typeof entry?.tag === 'string' && entry.tag.trim().length > 0) {
    return entry.tag;
  }
  if (typeof entry?.title === 'string' && entry.title.trim().length > 0) {
    return entry.title;
  }
  return `अतिरिक्त ${idx + 1}`;
}

function getExtraTabLabel(data) {
  const entries = getExtraEntries(data);
  if (!entries.length) return 'अतिरिक्त';
  if (entries.length === 1) return getExtraEntryLabel(entries[0], 0);
  if (typeof data?.tag === 'string' && data.tag.trim().length > 0) {
    return data.tag;
  }
  return 'अतिरिक्त';
}

function getSafeExtraIndex(data, requestedIndex = 0) {
  const entries = getExtraEntries(data);
  if (!entries.length) return 0;
  const parsed = Number.parseInt(requestedIndex, 10);
  const safeIndex = Number.isNaN(parsed) ? 0 : parsed;
  return Math.max(0, Math.min(safeIndex, entries.length - 1));
}

function getSelectedExtraEntry(data) {
  const entries = getExtraEntries(data);
  if (!entries.length) return null;
  const safeIndex = getSafeExtraIndex(data, activeExtraIndex);
  activeExtraIndex = safeIndex;
  return entries[safeIndex] || null;
}

function getGeetaContentData(deityKey = '') {
  if (!deityKey || !deities[deityKey]) return null;
  const geeta = deities[deityKey].geeta;
  return geeta && typeof geeta === 'object' ? geeta : null;
}

function getGeetaEntries(data = null) {
  if (!data || typeof data !== 'object') return [];
  if (Array.isArray(data.chapters)) return data.chapters.filter(Boolean);
  if (Array.isArray(data.items)) return data.items.filter(Boolean);
  if (Array.isArray(data)) return data.filter(Boolean);
  return [];
}

function getGeetaEntrySlug(entry, idx = 0) {
  if (typeof entry?.slug === 'string' && entry.slug.trim().length > 0) {
    return entry.slug.trim().toLowerCase();
  }
  if (Number.isInteger(entry?.chapter) && entry.chapter > 0) {
    return `chapter-${entry.chapter}`;
  }
  return idx === 0 ? 'chapter-1' : `chapter-${idx + 1}`;
}

function getGeetaEntryLabel(entry, idx = 0) {
  if (!entry || typeof entry !== 'object') {
    return `अध्याय ${formatHindiNumber(idx + 1)}`;
  }
  if (typeof entry.title === 'string' && entry.title.trim().length > 0) {
    return entry.title;
  }
  if (
    typeof entry.chapterTitle === 'string' &&
    entry.chapterTitle.trim().length > 0
  ) {
    const chapterLabel =
      Number.isInteger(entry.chapter) && entry.chapter > 0
        ? `अध्याय ${formatHindiNumber(entry.chapter)}`
        : `अध्याय ${formatHindiNumber(idx + 1)}`;
    return `${chapterLabel} - ${entry.chapterTitle}`;
  }
  if (Number.isInteger(entry.chapter) && entry.chapter > 0) {
    return `अध्याय ${formatHindiNumber(entry.chapter)}`;
  }
  return `अध्याय ${formatHindiNumber(idx + 1)}`;
}

function getGeetaTabLabel(data = null) {
  if (typeof data?.tag === 'string' && data.tag.trim().length > 0) {
    return data.tag;
  }
  return 'गीता';
}

function getGeetaReadableText(data = null) {
  if (typeof data === 'string') return data;
  if (!data || typeof data !== 'object') return '';

  const parts = [];
  if (typeof data.title === 'string') parts.push(data.title);
  if (typeof data.chapterTitle === 'string') parts.push(data.chapterTitle);
  if (typeof data.subtitle === 'string') parts.push(data.subtitle);
  if (typeof data.notes === 'string') parts.push(data.notes);
  if (typeof data.content === 'string') parts.push(data.content);

  const verses = Array.isArray(data.verses) ? data.verses : [];
  verses.forEach((verse) => {
    if (!verse || typeof verse !== 'object') return;
    if (typeof verse.title === 'string') parts.push(verse.title);
    if (typeof verse.content === 'string') parts.push(verse.content);
    if (typeof verse.text === 'string') parts.push(verse.text);
    if (typeof verse.hindiMeaning === 'string') parts.push(verse.hindiMeaning);
    if (typeof verse.explanation === 'string') parts.push(verse.explanation);
    if (Array.isArray(verse.lines)) {
      verse.lines.forEach((line) => {
        if (!line || typeof line !== 'object') return;
        const hindiText = getLyricsLineHindiText(line);
        if (hindiText) parts.push(hindiText);
        if (typeof line.text === 'string') parts.push(line.text);
        if (typeof line.hindiMeaning === 'string')
          parts.push(line.hindiMeaning);
        if (typeof line.englishMeaning === 'string')
          parts.push(line.englishMeaning);
        if (typeof line.explanation === 'string') parts.push(line.explanation);
      });
    }
  });

  return parts.join(' ');
}

function hasGeetaContent(data) {
  return getGeetaEntries(data).length > 0;
}

function getSafeGeetaSlug(deityKey = '', requestedSlug = '') {
  const entries = getGeetaEntries(getGeetaContentData(deityKey));
  if (!entries.length) return '';
  const raw = String(requestedSlug || '')
    .trim()
    .toLowerCase();
  const selectedIndex = entries.findIndex(
    (item, idx) => getGeetaEntrySlug(item, idx) === raw,
  );
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  return getGeetaEntrySlug(entries[safeIndex], safeIndex);
}

function getSelectedGeetaEntry(deityKey, data) {
  const entries = getGeetaEntries(data);
  if (!entries.length) return null;
  const safeSlug = getSafeGeetaSlug(deityKey, activeGeetaSlug);
  const selectedIndex = entries.findIndex(
    (item, idx) => getGeetaEntrySlug(item, idx) === safeSlug,
  );
  const safeIndex = selectedIndex >= 0 ? selectedIndex : 0;
  activeGeetaSlug = getGeetaEntrySlug(entries[safeIndex], safeIndex);
  return entries[safeIndex] || null;
}

function getAvailableDeityTabs(key) {
  const deity = deities[key];
  if (!deity) return ['about', 'temples'];

  const extraData = getExtraContentData(key);
  const tabs = ['about'];
  if (hasLyricsContent(deity.aarti)) tabs.push('aarti');
  if (hasLyricsContent(deity.chalisa)) tabs.push('chalisa');
  if (hasGeetaContent(deity.geeta)) tabs.push('geeta');
  if (hasLyricsContent(deity.katha)) tabs.push('katha');
  if (hasLyricsContent(deity.bhajan)) tabs.push('bhajan');
  if (hasMantrasContent(deity.mantras)) tabs.push('mantra');
  if (hasLyricsContent(extraData)) tabs.push('extra');
  tabs.push('temples');
  return tabs;
}
