// ============ INIT ============
let isLoaderHidden = false;

function hideLoader() {
  if (isLoaderHidden) return;
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('hidden');
  isLoaderHidden = true;
}

window.addEventListener('load', () => {
  // Ensure the app is never stuck on the splash if any init task fails.
  setTimeout(hideLoader, 4000);

  try {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isIOS || isMobile) {
      document.body.classList.add('reduced-effects');
    }

    // Load saved font size
    const savedMultiplier = localStorage.getItem('bhaktiFontSizeMultiplier');
    if (savedMultiplier) {
      currentFontSizeMultiplier = parseFloat(savedMultiplier);
      document.documentElement.style.setProperty(
        '--font-size-multiplier',
        currentFontSizeMultiplier,
      );

      // Set active state if scaled
      if (currentFontSizeMultiplier > 1) {
        const btn = document.querySelector('.font-size-btn');
        if (btn) btn.classList.add('active-scaling');
      }
    }

    createParticles();
    loadHomeViewMode();
    loadTempleViewMode();
    setupHomeViewToggle();
    setupHomeSearch();
    setupNavOverflow();
    syncResponsiveNavLayout();
    buildHomeGrid();
    updateSiteTitleByLang();
    syncDefaultSiteHeaderHeight();

    const htmlObserver = new MutationObserver(updateSiteTitleByLang);
    htmlObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    // Dismiss loader smoothly since initialization succeeded
    setTimeout(hideLoader, 150);
  } catch (error) {
    console.error('App initialization failed:', error);
    hideLoader();
  }
});

// Failsafe: hide splash even when `load` is delayed on slow/blocked networks.
window.setTimeout(hideLoader, 5000);

window.addEventListener('scroll', () => {
  if (templeScrollTicking) return;
  templeScrollTicking = true;
  window.requestAnimationFrame(() => {
    templeScrollTicking = false;
    maybeLoadMoreHomeOnScroll();
    maybeLoadMoreFestivalsOnScroll();
    maybeLoadMoreTemplesOnScroll();
  });
});

window.addEventListener('popstate', () => {
  applyUrlState();
});

window.addEventListener('resize', () => {
  syncDefaultSiteHeaderHeight();
  syncResponsiveNavLayout();
});

window.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeMantraMalaDialog();
  closeReadingMode();
  closeNavOverflow();
});

window.addEventListener('DOMContentLoaded', () => {
  setupNavOverflow();
  syncResponsiveNavLayout();
  applyUrlState();
  const activePageEl = document.querySelector('.page.active');
  const activePageId = activePageEl?.id?.replace('page-', '') || '';
  updateUrlState({
    typeId: activeHomeType,
    deityKey: activeDeityKey,
    tabId: activeDeityTab,
    kathaSlug: activeKathaSlug,
    bhajanSlug: activeBhajanSlug,
    pageId: activeDeityKey ? '' : activePageId,
    templeId: activeTempleDetailId,
    festivalId: activeFestivalDetailId,
    scriptureId: activeScriptureDetailId,
    replace: true,
  });
  syncChalisaNavigationControls();
});
