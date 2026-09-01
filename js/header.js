(function injectSharedHeader() {
  const mountPoint = document.getElementById('siteHeaderMount');
  if (!mountPoint) return;

  function buildHeader() {
    const i18n = window.BhaktiI18n;
    const title = i18n ? i18n.t('siteTitle') : 'भक्ति अमृत';
    const subtitle = i18n ? i18n.t('siteSubtitle') : '॥ दैनिक साधना का संपूर्ण साथी ॥';

    mountPoint.innerHTML = `
      <header>
        <span class="om-symbol">🕉️</span>
        <h1
          id="siteTitle"
          data-title-hi="भक्ति अमृत"
          data-title-en="Bhakti Amrit"
        >
          ${title}
        </h1>
        <p
          id="siteSubtitle"
          data-subtitle-hi="॥ दैनिक साधना का संपूर्ण साथी ॥"
          data-subtitle-en="Your complete daily sadhana companion - Aarti, Chalisa, Mantras, deity stories, and temple guidance in one place."
        >
          ${subtitle}
        </p>
        <div class="header-divider">
          <div class="divider-line"></div>
          <div class="divider-dot"></div>
          <div class="divider-dot" style="background: var(--gold)"></div>
          <div class="divider-dot"></div>
          <div class="divider-line"></div>
        </div>
      </header>
    `;
  }

  buildHeader();

  // Rebuild header text when the user switches language
  window.addEventListener('bhakti-lang-change', buildHeader);
})();
