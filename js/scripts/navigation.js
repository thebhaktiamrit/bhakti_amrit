// ============ NAVIGATION ============
function setNavOverflowOpen(isOpen) {
  const navOverflow = document.getElementById('navOverflow');
  const navMoreButton = document.getElementById('navMoreButton');
  if (!navOverflow || !navMoreButton) return;
  navOverflow.classList.toggle('open', Boolean(isOpen));
  navMoreButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function closeNavOverflow() {
  setNavOverflowOpen(false);
}

function toggleNavOverflow(force) {
  const navOverflow = document.getElementById('navOverflow');
  if (!navOverflow) return;
  const shouldOpen =
    typeof force === 'boolean'
      ? force
      : !navOverflow.classList.contains('open');
  setNavOverflowOpen(shouldOpen);
}

function syncNavOverflowState() {
  const navOverflow = document.getElementById('navOverflow');
  const navMoreButton = document.getElementById('navMoreButton');
  const navMoreMenu = document.getElementById('navMoreMenu');
  if (!navOverflow || !navMoreButton || !navMoreMenu) return;
  const hasOverflowItems = Boolean(navMoreMenu.querySelector('.nav-btn'));
  navOverflow.hidden = !hasOverflowItems;
  if (!hasOverflowItems) {
    navMoreButton.classList.remove('active');
    navMoreButton.setAttribute('aria-expanded', 'false');
    navOverflow.classList.remove('open');
    return;
  }
  const hasActiveOverflowItem = Boolean(
    navOverflow.querySelector('.nav-overflow-menu .nav-btn.active'),
  );
  navMoreButton.classList.toggle('active', hasActiveOverflowItem);
}

function getResponsiveNavLayout() {
  if (window.innerWidth <= MOBILE_NAV_BREAKPOINT) return 'mobile';
  if (window.innerWidth <= COMPACT_NAV_BREAKPOINT) return 'tablet';
  return 'desktop';
}

function getResponsivePrimaryNavCount(layout) {
  if (layout === 'mobile') return MOBILE_PRIMARY_NAV_COUNT;
  if (layout === 'tablet') {
    return window.innerWidth >= WIDE_TABLET_NAV_BREAKPOINT
      ? WIDE_TABLET_PRIMARY_NAV_COUNT
      : TABLET_PRIMARY_NAV_COUNT;
  }
  return Number.POSITIVE_INFINITY;
}

function syncResponsiveNavLayout() {
  const mainNav = document.getElementById('mainNav');
  const navPrimary = document.getElementById('navInner');
  const navOverflow = document.getElementById('navOverflow');
  const navMoreMenu = document.getElementById('navMoreMenu');
  if (!mainNav || !navPrimary || !navOverflow || !navMoreMenu) return;

  if (!responsiveNavButtons.length) {
    const primaryButtons = Array.from(navPrimary.children).filter((element) =>
      element.classList?.contains('nav-btn'),
    );
    const overflowButtons = Array.from(navMoreMenu.children).filter((element) =>
      element.classList?.contains('nav-btn'),
    );
    responsiveNavButtons = [...primaryButtons, ...overflowButtons];
  }

  const layout = getResponsiveNavLayout();
  const primaryCount = getResponsivePrimaryNavCount(layout);
  if (activeNavLayout !== layout) {
    closeNavOverflow();
    activeNavLayout = layout;
  }

  mainNav.dataset.navLayout = layout;

  responsiveNavButtons
    .slice(0, primaryCount)
    .forEach((button) => navPrimary.insertBefore(button, navOverflow));
  responsiveNavButtons
    .slice(primaryCount)
    .forEach((button) => navMoreMenu.appendChild(button));

  syncNavOverflowState();
}

function setupNavOverflow() {
  const navOverflow = document.getElementById('navOverflow');
  const navMoreButton = document.getElementById('navMoreButton');
  const navMoreMenu = document.getElementById('navMoreMenu');
  if (!navOverflow || !navMoreButton || !navMoreMenu) return;
  if (navOverflow.dataset.ready === 'true') return;
  navOverflow.dataset.ready = 'true';

  navMoreButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleNavOverflow();
  });

  navMoreMenu.addEventListener('click', (event) => {
    if (event.target.closest?.('.nav-btn')) {
      closeNavOverflow();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navOverflow.contains(event.target)) {
      closeNavOverflow();
    }
  });

  syncResponsiveNavLayout();
}

function updateSiteTitleByLang() {
  const titleEl = document.getElementById('siteTitle');
  const lang = (
    document.documentElement.getAttribute('lang') || ''
  ).toLowerCase();
  const isEnglish = lang.startsWith('en');

  if (titleEl) {
    titleEl.textContent = isEnglish
      ? titleEl.dataset.titleEn || 'Bhakti Amrit'
      : titleEl.dataset.titleHi || 'भक्ति अमृत';
  }

  const subtitleEl = document.getElementById('siteSubtitle');
  if (subtitleEl) {
    subtitleEl.textContent = isEnglish
      ? subtitleEl.dataset.subtitleEn || ''
      : subtitleEl.dataset.subtitleHi || '';
  }
}

function updateTopHomeButton(pageId) {
  const homeBtn = document.getElementById('mainHomeButton');
  if (!homeBtn) return;

  if (pageId === 'deity') {
    homeBtn.innerHTML = '<span class="nav-icon-emoji">↩️</span> वापस जाएं';
    homeBtn.setAttribute(
      'onclick',
      'showHomeByType(deityReturnHomeType, deityReturnHomeNavId)',
    );
    return;
  }

  if (pageId === 'temple-detail') {
    homeBtn.innerHTML = '<span class="nav-icon-emoji">↩️</span> वापस जाएं';
    homeBtn.setAttribute('onclick', 'showTemplesMenuPage()');
    return;
  }

  if (pageId === 'festival-detail') {
    homeBtn.innerHTML = '<span class="nav-icon-emoji">↩️</span> वापस जाएं';
    homeBtn.setAttribute('onclick', 'showFestivalsMenuPage()');
    return;
  }

  if (pageId === 'scripture-detail') {
    homeBtn.innerHTML = '<span class="nav-icon-emoji">↩️</span> वापस जाएं';
    homeBtn.setAttribute('onclick', 'showScripturesMenuPage()');
    return;
  }

  homeBtn.innerHTML = '<span class="nav-icon-emoji">🏠</span> मुख्य पृष्ठ';
  homeBtn.setAttribute('onclick', "showHomeByType('all', 'home')");
}

function updateDeityBackButton(pageId) {
  const deityBackButton = document.getElementById('deityBackButton');
  if (!deityBackButton) return;
  deityBackButton.setAttribute(
    'onclick',
    'showHomeByType(deityReturnHomeType, deityReturnHomeNavId)',
  );
  deityBackButton.style.display = pageId === 'deity' ? 'none' : '';
}

let defaultSiteHeaderMarkup = '';
let defaultSiteHeaderHeight = 0;

function syncDefaultSiteHeaderHeight() {
  const siteHeaderMount = document.getElementById('siteHeaderMount');
  if (!siteHeaderMount) return;
  let measured = 0;
  const siteHeader = siteHeaderMount.querySelector('header');
  if (siteHeader) {
    measured = Math.ceil(siteHeader.getBoundingClientRect().height);
  } else if (defaultSiteHeaderMarkup) {
    const probe = document.createElement('div');
    probe.style.cssText =
      'position:absolute;left:-99999px;top:0;visibility:hidden;width:100%;pointer-events:none;';
    probe.innerHTML = defaultSiteHeaderMarkup;
    document.body.appendChild(probe);
    const probeHeader = probe.querySelector('header');
    if (probeHeader) {
      measured = Math.ceil(probeHeader.getBoundingClientRect().height);
    }
    document.body.removeChild(probe);
  }

  if (!measured) return;
  defaultSiteHeaderHeight = measured;
  document.documentElement.style.setProperty(
    '--site-header-height',
    `${defaultSiteHeaderHeight}px`,
  );
}

function syncSiteHeaderByPage(pageId) {
  const siteHeaderMount = document.getElementById('siteHeaderMount');
  const deityHeader = document.getElementById('deityHeader');
  if (!siteHeaderMount) return;

  if (!defaultSiteHeaderMarkup) {
    defaultSiteHeaderMarkup = siteHeaderMount.innerHTML;
    syncDefaultSiteHeaderHeight();
  }

  const useDeityHeader =
    pageId === 'deity' &&
    deityHeader &&
    deityHeader.innerHTML &&
    deityHeader.innerHTML.trim().length > 0;

  if (useDeityHeader) {
    siteHeaderMount.innerHTML = `<div class="content-header content-header-site">${deityHeader.innerHTML}
      <div class="header-divider">
        <div class="divider-line"></div>
        <div class="divider-dot"></div>
        <div class="divider-dot" style="background: var(--gold)"></div>
        <div class="divider-dot"></div>
        <div class="divider-line"></div>
      </div>
    </div>`;
    deityHeader.style.display = 'none';
    return;
  }

  if (siteHeaderMount.innerHTML !== defaultSiteHeaderMarkup) {
    siteHeaderMount.innerHTML = defaultSiteHeaderMarkup;
    syncDefaultSiteHeaderHeight();
  }
  if (deityHeader) deityHeader.style.display = '';
}

function showPage(pageId, navId) {
  closeNavOverflow();
  if (pageId !== 'deity') {
    closeReadingMode();
    closeMantraMalaDialog(undefined, { restoreFocus: false });
  }
  document
    .querySelectorAll('.page')
    .forEach((p) => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');
  updateTopHomeButton(pageId);
  updateDeityBackButton(pageId);
  syncSiteHeaderByPage(pageId);
  syncNav(navId || pageId);
  syncChalisaNavigationControls();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (pageId === 'temples') buildTemplesPage();
  if (pageId === 'festivals') buildFestivalsPage();
  if (pageId === 'scriptures') buildScripturesPage();
}

function showTemplesMenuPage(options = {}) {
  const { skipUrl = false } = options;
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  showPage('temples', 'temples');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'temples',
    });
  }
}

function showFestivalsMenuPage(options = {}) {
  const { skipUrl = false } = options;
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  showPage('festivals', 'festivals');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'festivals',
    });
  }
}

function showScripturesMenuPage(options = {}) {
  const { skipUrl = false } = options;
  activeDeityKey = '';
  activeDeityTab = 'about';
  activeTempleDetailId = '';
  activeFestivalDetailId = '';
  activeScriptureDetailId = '';
  showPage('scriptures', 'scriptures');
  if (!skipUrl) {
    updateUrlState({
      typeId: activeHomeType,
      deityKey: '',
      pageId: 'scriptures',
    });
  }
}

function syncNav(pageId) {
  document.querySelectorAll('.nav-btn').forEach((b) => {
    const isActive = b.dataset.page === pageId;
    b.classList.toggle('active', isActive);
  });
  syncNavOverflowState();
}

