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
  return document.documentElement.scrollHeight <= window.innerHeight + extraSpace;
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

function getAvailableDeityTabs(key) {
  const deity = deities[key];
  if (!deity) return ['about', 'temples'];

  const extraData = getExtraContentData(key);
  const tabs = ['about'];
  if (hasLyricsContent(deity.aarti)) tabs.push('aarti');
  if (hasLyricsContent(deity.chalisa)) tabs.push('chalisa');
  if (hasLyricsContent(deity.katha)) tabs.push('katha');
  if (hasLyricsContent(deity.bhajan)) tabs.push('bhajan');
  if (hasMantrasContent(deity.mantras)) tabs.push('mantra');
  if (hasLyricsContent(extraData)) tabs.push('extra');
  tabs.push('temples');
  return tabs;
}
