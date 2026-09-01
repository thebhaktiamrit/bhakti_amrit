(function injectSharedFooter() {
  const mountPoint = document.getElementById('siteFooterMount');
  if (!mountPoint) return;

  const mode = mountPoint.dataset.footerPath || 'root';
  const isSubPage = mode === 'sub';
  const themeApi = window.BhaktiTheme || null;

  const aboutHref = isSubPage ? 'about.html' : 'html/about.html';
  const contactHref = isSubPage ? 'contact.html' : 'html/contact.html';
  const homeHref = isSubPage ? '../index.html' : 'index.html';

  function buildFooter() {
    const i18n = window.BhaktiI18n;
    const dedication = i18n ? i18n.t('footerDedication') : '॥ जय जय श्री हरि ॥ — सभी देवी-देवताओं को समर्पित';
    const aboutLabel = i18n ? i18n.t('footerAbout') : 'हमारे बारे में';
    const contactLabel = i18n ? i18n.t('footerContact') : 'संपर्क';
    const themeLabel = i18n ? i18n.t('footerTheme') : 'थीम';

    const themeButtons = themeApi
      ? Object.entries(themeApi.themes)
          .map(
            ([themeId, meta]) => `
              <button
                class="footer-theme-btn"
                type="button"
                data-theme-option="${themeId}"
                style="--theme-chip: ${meta.accent};"
                aria-pressed="false"
                title="${meta.labelEn}"
              >
                ${meta.label}
              </button>
            `,
          )
          .join('')
      : '';
    const themeControls = themeApi
      ? `
          <div class="footer-theme-switcher">
            <span class="footer-theme-label">${themeLabel}</span>
            <div
              class="footer-theme-options"
              role="group"
              aria-label="${themeLabel}"
            >
              ${themeButtons}
            </div>
          </div>
        `
      : '';

    mountPoint.innerHTML = `
      <footer>
        <div
          class="header-divider"
          style="justify-content: center; margin-bottom: 10px"
        >
          <div class="divider-line" style="width: 60px"></div>
          <div class="divider-dot"></div>
          <div class="divider-line" style="width: 60px"></div>
        </div>
        ${dedication} <br />
        <div class="footer-links">
          <a href="${aboutHref}">${aboutLabel}</a>
          <span aria-hidden="true">•</span>
          <a href="${contactHref}">${contactLabel}</a>
          <span aria-hidden="true">•</span>
          <a href="${homeHref}">Bhakti Amrit © 2026</a>
        </div>
        ${themeControls}
      </footer>
    `;

    if (!themeApi) return;

    const themeButtonsEls = mountPoint.querySelectorAll('[data-theme-option]');

    function syncThemeButtons(nextTheme = themeApi.getCurrentTheme()) {
      themeButtonsEls.forEach((button) => {
        const isActive = button.dataset.themeOption === nextTheme;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    }

    themeButtonsEls.forEach((button) => {
      button.addEventListener('click', () => {
        themeApi.setTheme(button.dataset.themeOption);
      });
    });

    syncThemeButtons();
    window.addEventListener('bhakti-theme-change', (event) => {
      syncThemeButtons(event.detail.theme);
    });
  }

  buildFooter();

  // Rebuild footer text when the user switches language
  window.addEventListener('bhakti-lang-change', buildFooter);
})();
