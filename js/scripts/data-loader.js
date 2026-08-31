// ============ ON-DEMAND DATA LOADER ============

// ─────────────────────────────────────────────────────────────────────────────
// LOCAL DEV FLAG
// Set USE_LOCAL_DATA = true to load data files from your local machine instead
// of the CDN. Useful when you want to test changes in bhakti_amrit_data before
// pushing to GitHub.
//
// HOW TO USE:
//   1. Set USE_LOCAL_DATA = true below.
//   2. In a terminal, cd into your local bhakti_amrit_data folder and run:
//        npx serve . --cors --listen 51584
//   3. Open the bhakti_amrit site locally (e.g. via Live Server or npx serve).
//   4. Data will now load from localhost:51584 instead of the CDN.
//
// ⚠️  IMPORTANT: Set USE_LOCAL_DATA = false before committing / deploying.
// ─────────────────────────────────────────────────────────────────────────────
const USE_LOCAL_DATA = false;
const LOCAL_DATA_PORT = 51584; // Change if you use a different port

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/thebhaktiamrit/bhakti_amrit_data@main';
const LOCAL_BASE = `http://localhost:${LOCAL_DATA_PORT}`;
const DATA_BASE = USE_LOCAL_DATA ? LOCAL_BASE : CDN_BASE;

const DATA_MODULE_URLS = {
  aarti: `${DATA_BASE}/aarti.js`,
  chalisa: `${DATA_BASE}/chalisa.js`,
  mantra: `${DATA_BASE}/mantra.js`,
  katha: `${DATA_BASE}/katha.js`,
  bhajan: `${DATA_BASE}/bhajan.js`,
  geeta: `${DATA_BASE}/geeta.js`,
  extra: `${DATA_BASE}/extra-content.js`,
  temples: `${DATA_BASE}/temples.js`,
  festivals: `${DATA_BASE}/festivals.js`,
  scriptures: `${DATA_BASE}/scriptures.js`,
};

if (USE_LOCAL_DATA) {
  console.warn(`[DEV] 🟡 USE_LOCAL_DATA is ON — loading data from ${LOCAL_BASE}`);
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

function isDataModuleLoaded(moduleName) {
  return Boolean(loadedDataModules[moduleName]);
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
  if (loadedDataModules[moduleName]) {
    return Promise.resolve();
  }
  if (loadingDataPromises[moduleName]) {
    return loadingDataPromises[moduleName];
  }

  const url = DATA_MODULE_URLS[moduleName];
  if (!url) {
    return Promise.reject(new Error(`Unknown data module: ${moduleName}`));
  }

  loadingDataPromises[moduleName] = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      try {
        applyModuleData(moduleName);
        loadedDataModules[moduleName] = true;
        delete loadingDataPromises[moduleName];
        resolve();
      } catch (err) {
        delete loadingDataPromises[moduleName];
        reject(err);
      }
    };

    script.onerror = (err) => {
      delete loadingDataPromises[moduleName];
      console.error(`Failed to load data module: ${moduleName}`, err);
      reject(err);
    };

    document.head.appendChild(script);
  });

  return loadingDataPromises[moduleName];
}

function getContentLoadingHtml(message = 'लोड हो रहा है...') {
  return `
    <div class="content-loading-box">
      <div class="content-loading-om">🕉️</div>
      <div class="content-loading-text">${message}</div>
    </div>
  `;
}
