// ============ ACCESSIBILITY ============
let currentFontSizeMultiplier = 1;

function cycleFontSize() {
  const btn = document.querySelector('.font-size-btn');

  if (currentFontSizeMultiplier === 1) {
    currentFontSizeMultiplier = 1.2;
    if (btn) btn.classList.add('active-scaling');
  } else if (currentFontSizeMultiplier === 1.2) {
    currentFontSizeMultiplier = 1.4;
    if (btn) btn.classList.add('active-scaling');
  } else {
    currentFontSizeMultiplier = 1;
    if (btn) btn.classList.remove('active-scaling');
  }

  document.documentElement.style.setProperty(
    '--font-size-multiplier',
    currentFontSizeMultiplier,
  );
  localStorage.setItem(
    'bhaktiFontSizeMultiplier',
    currentFontSizeMultiplier.toString(),
  );
}

function scrollDirectTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollDirectBottom() {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth',
  });
}

function isChalisaSection(section) {
  return !!section && section.id === 'tab-chalisa';
}

function isExtraSection(section) {
  return !!section && section.id === 'tab-extra';
}

function isExtraEntryStepNavigationEnabled(entry, idx = 0) {
  if (!entry) return false;
  const slug = getExtraEntrySlug(entry, idx);
  return EXTRA_STEP_NAV_SLUGS.has(slug);
}

function getReadingModeStepNavigationState(section) {
  if (isChalisaSection(section)) {
    return { enabled: true, contentType: 'chalisa' };
  }
  if (isExtraSection(section)) {
    const extraData = getExtraContentData(activeDeityKey);
    const entries = getExtraEntries(extraData);
    if (entries.length) {
      const safeIndex = getSafeExtraIndex(extraData, activeExtraIndex);
      const entry = entries[safeIndex];
      if (isExtraEntryStepNavigationEnabled(entry, safeIndex)) {
        return { enabled: true, contentType: 'extra-step' };
      }
    }
  }
  return { enabled: false, contentType: '' };
}

function getActiveChalisaNavigationRoot() {
  const overlay = document.getElementById('readingModeDialog');
  const body = document.getElementById('readingModeBody');
  if (
    overlay?.classList.contains('active') &&
    body?.dataset.stepNav === 'true'
  ) {
    return body.querySelector('.lyrics-box');
  }
  return null;
}

function getChalisaSteps(root) {
  if (!root) return [];
  return Array.from(root.querySelectorAll(CHALISA_STEP_SELECTOR));
}

function getSelectedChalisaStepIndex(root) {
  if (!root) return -1;

  const steps = getChalisaSteps(root);
  if (!steps.length) return -1;

  const storedIndex = Number.parseInt(
    root.dataset.chalisaSelectedIndex || '',
    10,
  );
  if (
    Number.isInteger(storedIndex) &&
    storedIndex >= 0 &&
    storedIndex < steps.length
  ) {
    return storedIndex;
  }

  return steps.findIndex((step) =>
    step.classList.contains(CHALISA_SELECTED_STEP_CLASS),
  );
}

function clearChalisaSelection(root) {
  if (!root) return;

  getChalisaSteps(root).forEach((step) =>
    step.classList.remove(CHALISA_SELECTED_STEP_CLASS),
  );
  delete root.dataset.chalisaSelectedIndex;
}

function resetChalisaNavigationControls() {
  const controls = document.getElementById('chalisaNavControls');
  const prevBtn = document.getElementById('chalisaPrevBtn');
  const nextBtn = document.getElementById('chalisaNextBtn');
  if (!controls || !prevBtn || !nextBtn) return;

  controls.classList.remove('active');
  controls.setAttribute('aria-hidden', 'true');
  prevBtn.disabled = true;
  nextBtn.disabled = true;
}

function resetReadingModeScrollPosition() {
  const body = document.getElementById('readingModeBody');
  if (!body) return;
  body.scrollTop = 0;
}

function focusReadingModeTop() {
  const overlay = document.getElementById('readingModeDialog');
  const body = document.getElementById('readingModeBody');
  if (!overlay || !body) return;
  const closeBtn = overlay.querySelector('.reading-mode-close');

  const resetScroll = () => {
    body.scrollTop = 0;
  };

  resetScroll();
  window.requestAnimationFrame(() => {
    resetScroll();
    if (closeBtn) {
      try {
        closeBtn.focus({ preventScroll: true });
      } catch (_error) {
        closeBtn.focus();
      }
    }
  });
}

function syncChalisaNavigationControls() {
  const controls = document.getElementById('chalisaNavControls');
  const prevBtn = document.getElementById('chalisaPrevBtn');
  const nextBtn = document.getElementById('chalisaNextBtn');
  if (!controls || !prevBtn || !nextBtn) return;

  const root = getActiveChalisaNavigationRoot();
  const steps = getChalisaSteps(root);
  const shouldShow = !!root && steps.length > 0;

  controls.classList.toggle('active', shouldShow);
  controls.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');

  if (!shouldShow) {
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    return;
  }

  const currentIndex = getSelectedChalisaStepIndex(root);
  if (currentIndex < 0) {
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    return;
  }

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === steps.length - 1;
}

function setChalisaSelection(root, index, options = {}) {
  const steps = getChalisaSteps(root);
  if (!root || !steps.length) return;

  const safeIndex = Math.max(0, Math.min(index, steps.length - 1));
  steps.forEach((step, stepIndex) => {
    step.classList.toggle(CHALISA_SELECTED_STEP_CLASS, stepIndex === safeIndex);
  });
  root.dataset.chalisaSelectedIndex = safeIndex.toString();

  const targetStep = steps[safeIndex];
  if (targetStep) {
    targetStep.scrollIntoView({
      behavior: options.behavior || 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  }

  syncChalisaNavigationControls();
}

function moveChalisaSelection(direction = 1) {
  const root = getActiveChalisaNavigationRoot();
  const steps = getChalisaSteps(root);
  if (!root || !steps.length) return;

  const stepDelta = direction < 0 ? -1 : 1;
  const currentIndex = getSelectedChalisaStepIndex(root);
  const targetIndex =
    currentIndex < 0
      ? stepDelta > 0
        ? 0
        : steps.length - 1
      : Math.max(0, Math.min(currentIndex + stepDelta, steps.length - 1));

  if (targetIndex === currentIndex) {
    syncChalisaNavigationControls();
    return;
  }

  setChalisaSelection(root, targetIndex);
}

function openReadingMode() {
  const page = document.getElementById('page-deity');
  if (!page || !page.classList.contains('active')) return;

  const overlay = document.getElementById('readingModeDialog');
  const body = document.getElementById('readingModeBody');
  if (!overlay || !body) return;

  const activeTab = page.querySelector('.text-content.active');
  const stepNavState = getReadingModeStepNavigationState(activeTab);
  const contentSource = activeTab
    ? activeTab.querySelector('.deity-tab-content') || activeTab
    : null;
  body.dataset.contentType = stepNavState.contentType;
  if (stepNavState.enabled) {
    body.dataset.stepNav = 'true';
  } else {
    delete body.dataset.stepNav;
  }
  if (contentSource) {
    const clone = contentSource.cloneNode(true);
    clone.querySelectorAll('.deity-tab-actions').forEach((el) => el.remove());
    clone.querySelectorAll('.katha-list').forEach((el) => {
      const nextEl = el.nextElementSibling;
      if (nextEl && nextEl.tagName === 'BR') nextEl.remove();
      el.remove();
    });
    body.innerHTML = clone.innerHTML;
  } else {
    body.dataset.contentType = '';
    delete body.dataset.stepNav;
    body.innerHTML = '<div class="lyrics-box">सामग्री उपलब्ध नहीं है।</div>';
  }

  if (stepNavState.enabled) {
    clearChalisaSelection(body.querySelector('.lyrics-box'));
  }

  overlay.classList.add('active');
  document.body.classList.add('reading-mode-open');
  syncChalisaNavigationControls();
  focusReadingModeTop();
}

let aartiBellAudioContext = null;

function getAartiBellAudioContext() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) return null;
  if (!aartiBellAudioContext || aartiBellAudioContext.state === 'closed') {
    aartiBellAudioContext = new AudioContextCtor();
  }
  return aartiBellAudioContext;
}

function animateAartiBellButton(trigger) {
  if (!(trigger instanceof HTMLElement)) return;

  const existingTimeoutId = Number.parseInt(
    trigger.dataset.bellAnimationTimeout || '',
    10,
  );
  if (Number.isInteger(existingTimeoutId)) {
    window.clearTimeout(existingTimeoutId);
  }

  trigger.classList.remove('is-ringing');
  void trigger.offsetWidth;
  trigger.classList.add('is-ringing');

  const timeoutId = window.setTimeout(() => {
    trigger.classList.remove('is-ringing');
    delete trigger.dataset.bellAnimationTimeout;
  }, 820);
  trigger.dataset.bellAnimationTimeout = timeoutId.toString();
}

async function playAartiBell(trigger) {
  animateAartiBellButton(trigger);

  const audioContext = getAartiBellAudioContext();
  if (!audioContext) return;

  try {
    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }
  } catch (_error) {
    return;
  }

  const startTime = audioContext.currentTime;
  const masterGain = audioContext.createGain();
  masterGain.gain.setValueAtTime(0.0001, startTime);
  masterGain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.03);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.6);
  masterGain.connect(audioContext.destination);

  const overtones = [
    { frequency: 587.33, gain: 0.22, decay: 2.4, detune: -4, type: 'sine' },
    { frequency: 783.99, gain: 0.16, decay: 2.1, detune: 5, type: 'triangle' },
    { frequency: 1174.66, gain: 0.11, decay: 2.6, detune: -7, type: 'sine' },
    { frequency: 1567.98, gain: 0.07, decay: 1.8, detune: 4, type: 'triangle' },
  ];

  overtones.forEach(({ frequency, gain, decay, detune, type }) => {
    const oscillator = audioContext.createOscillator();
    const partialGain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.detune.setValueAtTime(detune, startTime);

    partialGain.gain.setValueAtTime(0.0001, startTime);
    partialGain.gain.exponentialRampToValueAtTime(gain, startTime + 0.015);
    partialGain.gain.exponentialRampToValueAtTime(0.0001, startTime + decay);

    oscillator.connect(partialGain);
    partialGain.connect(masterGain);
    oscillator.start(startTime);
    oscillator.stop(startTime + decay + 0.12);
  });
}

function openReadingModeFromSection(trigger) {
  const section = trigger?.closest('.text-content');
  if (!section) return openReadingMode();
  const overlay = document.getElementById('readingModeDialog');
  const body = document.getElementById('readingModeBody');
  if (!overlay || !body) return;
  const contentSource = section.querySelector('.deity-tab-content');
  const stepNavState = getReadingModeStepNavigationState(section);
  body.dataset.contentType = stepNavState.contentType;
  if (stepNavState.enabled) {
    body.dataset.stepNav = 'true';
  } else {
    delete body.dataset.stepNav;
  }
  if (contentSource) {
    const clone = contentSource.cloneNode(true);
    clone.querySelectorAll('.deity-tab-actions').forEach((el) => el.remove());
    clone.querySelectorAll('.katha-list').forEach((el) => {
      const nextEl = el.nextElementSibling;
      if (nextEl && nextEl.tagName === 'BR') nextEl.remove();
      el.remove();
    });
    body.innerHTML = clone.innerHTML;
  } else {
    body.dataset.contentType = '';
    delete body.dataset.stepNav;
    body.innerHTML = '<div class="lyrics-box">सामग्री उपलब्ध नहीं है।</div>';
  }

  if (stepNavState.enabled) {
    clearChalisaSelection(body.querySelector('.lyrics-box'));
  }

  overlay.classList.add('active');
  document.body.classList.add('reading-mode-open');
  syncChalisaNavigationControls();
  focusReadingModeTop();
}

function closeReadingMode(e) {
  const overlay = document.getElementById('readingModeDialog');
  if (!overlay) return;
  if (e && e.target && e.target.id !== 'readingModeDialog') return;
  overlay.classList.remove('active');
  document.body.classList.remove('reading-mode-open');
  const body = document.getElementById('readingModeBody');
  if (body) {
    if (body.dataset.stepNav === 'true') {
      clearChalisaSelection(body.querySelector('.lyrics-box'));
    }
    body.dataset.contentType = '';
    delete body.dataset.stepNav;
  }
  resetChalisaNavigationControls();
  resetReadingModeScrollPosition();
}

