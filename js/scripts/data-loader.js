// ============ ON-DEMAND DATA LOADER ============

// ─────────────────────────────────────────────────────────────────────────────
// DATA SOURCE MODE
// Supported values:
//   - 'cdn': load from jsDelivr
//   - 'local': load from localhost
//   - 'cdn-no-cache': load from jsDelivr with cache-busting
//
// Set window.BHAKTI_AMRIT_DATA_SOURCE before this file loads if you want to
// override the default.
// ─────────────────────────────────────────────────────────────────────────────
const DATA_SOURCE_MODE = String(window.BHAKTI_AMRIT_DATA_SOURCE || 'cdn')
  .trim()
  .toLowerCase();
const DATA_SOURCE_MODES = new Set(['cdn', 'local', 'cdn-no-cache']);
const LOCAL_DATA_PORT = 51584; // Change if you use a different port
const DATA_CACHE_BUST =
  window.BHAKTI_AMRIT_DATA_CACHE_BUST || String(Date.now());

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main';
const LOCAL_BASE = `http://localhost:${LOCAL_DATA_PORT}`;
const SUPPORTED_DATA_LANGS = new Set(['hi', 'mr', 'ta', 'te', 'kn', 'bn']);

const DATA_MODULE_FILES = {
  about: 'about.js',
  aarti: 'aarti.js',
  chalisa: 'chalisa.js',
  mantra: 'mantra.js',
  katha: 'katha.js',
  bhajan: 'bhajan.js',
  geeta: 'geeta.js',
  extra: 'extra-content.js',
  temples: 'temples.js',
  festivals: 'festivals.js',
  scriptures: 'scriptures.js',
};

function getActiveDataSourceMode() {
  return DATA_SOURCE_MODES.has(DATA_SOURCE_MODE) ? DATA_SOURCE_MODE : 'cdn';
}

function appendCacheBust(url) {
  if (getActiveDataSourceMode() !== 'cdn-no-cache') {
    return url;
  }
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${encodeURIComponent(DATA_CACHE_BUST)}`;
}

if (getActiveDataSourceMode() === 'local') {
  console.warn(`[DEV] 🟡 DATA_SOURCE_MODE is LOCAL — loading data from ${LOCAL_BASE}`);
} else if (getActiveDataSourceMode() === 'cdn-no-cache') {
  console.warn('[DEV] 🟡 DATA_SOURCE_MODE is CDN-NO-CACHE — loading fresh assets from jsDelivr');
}

function getCurrentDataLang() {
  const i18n = window.BhaktiI18n;
  const rawLang =
    i18n && typeof i18n.getCurrentLang === 'function'
      ? i18n.getCurrentLang()
      : document.documentElement.getAttribute('lang') || 'hi';
  const normalized = String(rawLang || 'hi').trim().toLowerCase();
  return SUPPORTED_DATA_LANGS.has(normalized) ? normalized : 'hi';
}

function getDataBaseUrl(lang = getCurrentDataLang()) {
  const safeLang = SUPPORTED_DATA_LANGS.has(lang) ? lang : 'hi';
  const mode = getActiveDataSourceMode();
  const base = mode === 'local' ? LOCAL_BASE : CDN_BASE;
  return `${base}/${safeLang}`;
}

function getDataModuleUrl(moduleName, lang = getCurrentDataLang()) {
  const fileName = DATA_MODULE_FILES[moduleName];
  if (!fileName) return '';
  return appendCacheBust(`${getDataBaseUrl(lang)}/${fileName}`);
}

// Compact manifest to enable instant homepage badges & tab discovery without downloading full content
const DEITY_CONTENT_MANIFEST = {
  ganesh: { aarti: true, chalisa: true, mantra: true, extra: true, extraTag: 'सुखकर्ता दुःखहर्ता', },
  shiva: {
    aarti: true,
    chalisa: true,
    mantra: true,
    katha: true,
    kathaCount: 1,
    bhajan: true,
    bhajanCount: 1,
    extra: true,
    extraTag: 'शिवताण्डवस्तोत्र',
  },
  durga: { aarti: true, chalisa: true, mantra: true },
  lakshmi: { aarti: true, chalisa: true, mantra: true },
  saraswati: { aarti: true, chalisa: true, mantra: true },
  vishnu: { aarti: true, chalisa: true, mantra: true },
  ram: {
    aarti: true,
    chalisa: true,
    mantra: true,
    extra: true,
    extraTag: 'स्तुति',
  },
  krishna: { aarti: true, chalisa: true, mantra: true, geeta: true },
  hanuman: {
    aarti: true,
    chalisa: true,
    mantra: true,
    extra: true,
    extraTag: 'अतिरिक्त',
    extraEntries: [
      { title: '॥ श्री बजरंग बाण ॥', tag: 'बजरंग बाण' },
      { title: '॥ संकटमोचन हनुमान अष्टक ॥', tag: 'संकटमोचन' },
    ],
  },
  surya: { aarti: true, chalisa: true, mantra: true },
  kali: { aarti: true, chalisa: true, mantra: true },
  khatu_shyam: {
    aarti: true,
    chalisa: true,
    mantra: true,
    extra: true,
    extraTag: 'स्तुति',
  },
  shani: {
    aarti: true,
    chalisa: true,
    mantra: true,
    extra: true,
    extraTag: 'अतिरिक्त',
    extraEntries: [
      { title: '॥ ⚖️ श्री शनिदेव जी की आरती ⚖️ ॥', tag: 'आरती (2)' },
      { title: '॥ ⚖️ श्री शनि चालीसा ⚖️ ॥', tag: 'चालीसा (2)' },
    ],
  },
  brihaspati: { aarti: true, mantra: true, katha: true, kathaCount: 1 },
  tirupati_balaji: {
    aarti: true,
    chalisa: true,
    mantra: true,
    katha: true,
    kathaCount: 1,
  },
  giriraj: { aarti: true, chalisa: true, mantra: true },
  gopal: { aarti: true, chalisa: true, mantra: true },
  sheetla: { aarti: true, chalisa: true, mantra: true, katha: true, kathaCount: 1 },
  parvati: { aarti: true, chalisa: true, mantra: true },
  balaji: { aarti: true, chalisa: true, mantra: true },
  pretraj_sarkar: { aarti: true, chalisa: true, mantra: true },
  brahma: { aarti: true, chalisa: true, mantra: true },
  bhairav: { aarti: true, mantra: true },
  batuk_bhairav: { aarti: true, mantra: true },
  parshuram: { aarti: true, mantra: true },
  ravidas: { aarti: true, mantra: true },
  gorakh_nath: { aarti: true, mantra: true },
  jaharveer: { aarti: true, mantra: true },
  sai: { aarti: true, mantra: true },
  mahavir: { aarti: true, mantra: true },
  ramdev: { aarti: true, mantra: true },
  pitar: { aarti: true, mantra: true },
  baba_gangaram: { aarti: true, mantra: true },
  narmada: { aarti: true, mantra: true },
  ganga: { aarti: true, mantra: true },
  baglamukhi: { aarti: true, mantra: true },
  annapurna: { aarti: true, mantra: true },
  santoshi_maa: { aarti: true, mantra: true },
  vaishno_devi: { aarti: true, mantra: true },
  tulsi: { aarti: true, mantra: true },
  radha: { aarti: true, mantra: true },
  mahakali: { aarti: true, mantra: true },
  gayatri: { aarti: true, mantra: true },
  mahalakshmi: { aarti: true, mantra: true },
  vindhyeshwari: { aarti: true, mantra: true },
  sharda: { aarti: true, mantra: true },
  shakambhari: { aarti: true, mantra: true },
  lalita_shakambhari: { aarti: true, mantra: true },
  rani_sati: { aarti: true, mantra: true },
  navgrah: { mantra: true },
  vishwakarma: { mantra: true },
};

const loadedDataModules = {};
const loadingDataPromises = {};
const loadingBaseDataPromises = {};
let dataLoadGeneration = 0;
let currentBaseDataLang = 'hi';

function isDataModuleLoaded(moduleName) {
  return Boolean(loadedDataModules[`${getCurrentDataLang()}:${moduleName}`]);
}

function getDataModuleCacheKey(moduleName, lang = getCurrentDataLang()) {
  return `${lang}:${moduleName}`;
}

function markDataLoadGeneration() {
  dataLoadGeneration += 1;
}

function resetLanguageDataCaches() {
  Object.keys(loadedDataModules).forEach((key) => {
    delete loadedDataModules[key];
  });
  Object.keys(loadingDataPromises).forEach((key) => {
    delete loadingDataPromises[key];
  });
  Object.keys(loadingBaseDataPromises).forEach((key) => {
    delete loadingBaseDataPromises[key];
  });
  currentBaseDataLang = '';
  markDataLoadGeneration();
}

function getBaseDataUrl(lang = getCurrentDataLang()) {
  return appendCacheBust(`${getDataBaseUrl(lang)}/data.js`);
}

function ensureLanguageData(lang = getCurrentDataLang()) {
  const safeLang = SUPPORTED_DATA_LANGS.has(lang) ? lang : 'hi';
  if (currentBaseDataLang === safeLang) {
    return Promise.resolve();
  }
  if (loadingBaseDataPromises[safeLang]) {
    return loadingBaseDataPromises[safeLang];
  }

  const url = getBaseDataUrl(safeLang);
  const requestGeneration = dataLoadGeneration;

  loadingBaseDataPromises[safeLang] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      try {
        delete loadingBaseDataPromises[safeLang];
        if (
          requestGeneration !== dataLoadGeneration ||
          getCurrentDataLang() !== safeLang
        ) {
          resolve();
          return;
        }
        currentBaseDataLang = safeLang;
        resolve();
      } catch (err) {
        delete loadingBaseDataPromises[safeLang];
        reject(err);
      }
    };

    script.onerror = (err) => {
      delete loadingBaseDataPromises[safeLang];
      console.error(`Failed to load base data for lang: ${safeLang}`, err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadingBaseDataPromises[safeLang];
}

function applyModuleData(moduleName) {
  if (typeof deities === 'undefined') return;

  switch (moduleName) {
    case 'aarti':
      if (typeof aartiData !== 'undefined') {
        for (const key in aartiData) {
          if (deities[key]) deities[key].aarti = aartiData[key];
        }
      }
      break;

    case 'about':
      if (typeof aboutData !== 'undefined') {
        window.aboutData = aboutData;
      }
      break;

    case 'chalisa':
      if (typeof chalisaData !== 'undefined') {
        for (const key in chalisaData) {
          if (deities[key]) deities[key].chalisa = chalisaData[key];
        }
      }
      break;

    case 'mantra':
      if (typeof mantraData !== 'undefined') {
        for (const key in mantraData) {
          if (deities[key]) deities[key].mantras = mantraData[key];
        }
      }
      break;

    case 'katha':
      if (typeof kathaData !== 'undefined') {
        for (const key in kathaData) {
          if (deities[key]) deities[key].katha = kathaData[key];
        }
      }
      break;

    case 'bhajan':
      if (typeof bhajanData !== 'undefined') {
        for (const key in bhajanData) {
          if (deities[key]) deities[key].bhajan = bhajanData[key];
        }
      }
      break;

    case 'geeta':
      if (typeof geetaData !== 'undefined' && deities.krishna) {
        deities.krishna.geeta = geetaData.krishna;
      }
      break;

    case 'extra':
      if (typeof extraContent !== 'undefined') {
        window.extraContent = extraContent;
      } else if (typeof extraContentData !== 'undefined') {
        window.extraContent = extraContentData;
      }
      break;

    case 'temples':
      if (typeof templesData !== 'undefined') {
        window.templesData = templesData;
      }
      break;

    case 'festivals':
      if (typeof festivalsData !== 'undefined') {
        window.festivalsData = festivalsData;
      }
      break;

    case 'scriptures':
      if (typeof scripturesData !== 'undefined') {
        window.scripturesData = scripturesData;
      }
      break;
  }
}

function ensureDataModule(moduleName) {
  const lang = getCurrentDataLang();
  const cacheKey = getDataModuleCacheKey(moduleName, lang);

  if (loadedDataModules[cacheKey]) {
    return Promise.resolve();
  }
  if (loadingDataPromises[cacheKey]) {
    return loadingDataPromises[cacheKey];
  }

  const url = getDataModuleUrl(moduleName, lang);
  if (!url) {
    return Promise.reject(new Error(`Unknown data module: ${moduleName}`));
  }

  const requestGeneration = dataLoadGeneration;
  loadingDataPromises[cacheKey] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      try {
        delete loadingDataPromises[cacheKey];
        if (
          requestGeneration !== dataLoadGeneration ||
          getCurrentDataLang() !== lang
        ) {
          resolve();
          return;
        }
        applyModuleData(moduleName);
        loadedDataModules[cacheKey] = true;
        resolve();
      } catch (err) {
        delete loadingDataPromises[cacheKey];
        reject(err);
      }
    };

    script.onerror = (err) => {
      delete loadingDataPromises[cacheKey];
      console.error(`Failed to load data module: ${moduleName}`, err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadingDataPromises[cacheKey];
}

window.addEventListener('bhakti-lang-change', resetLanguageDataCaches);
window.ensureLanguageData = ensureLanguageData;

function getContentLoadingHtml(message = 'लोड हो रहा है...') {
  return `
    <div class="content-loading-box">
      <div class="content-loading-om">🕉️</div>
      <div class="content-loading-text">${message}</div>
    </div>
  `;
}
