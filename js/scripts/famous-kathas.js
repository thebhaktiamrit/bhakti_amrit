// ============ FAMOUS KATHAS PAGE ============
const famousKathasData = [
  {
    id: 'somvar-vrat-katha',
    name: 'सोमवार व्रत कथा',
    nameEn: 'Somvar Vrat Katha',
    deityKey: 'shiva',
    kathaSlug: 'somvar-vrat-katha',
    deity: 'शिव जी',
    category: 'व्रत कथा',
    emoji: '🌙',
    color: '#F5C842',
    gradient:
      'linear-gradient(135deg, rgba(245,200,66,0.22), rgba(212,175,55,0.1))',
    desc: 'शिवजी के सोमवार व्रत की पौराणिक कथा — संतान, सुख और मनोकामना की पूर्ति',
    significance:
      'सोमवार का व्रत शिव भक्ति का प्रमुख साधन माना जाता है। इस कथा में साहूकार की कथा से सिखाया गया है कि श्रद्धा और निष्ठा से व्रत करने पर भगवान शिव भक्तों की सभी मनोकामनाएँ पूर्ण करते हैं।',
  },
  {
    id: 'somya-pradosh-vrat-katha',
    name: 'सौम्य प्रदोष व्रत कथा',
    nameEn: 'Saumya Pradosh Vrat Katha',
    deityKey: 'shiva',
    kathaSlug: 'somya-pradosh-vrat-katha',
    deity: 'शिव जी',
    category: 'व्रत कथा',
    emoji: '🪔',
    color: '#FF9800',
    gradient:
      'linear-gradient(135deg, rgba(255,152,0,0.22), rgba(255,111,0,0.1))',
    desc: 'प्रदोष व्रत की कथा — भक्ति और शिव कृपा का चमत्कार',
    significance:
      'प्रदोष व्रत शिवजी को अत्यंत प्रिय है। इस कथा में विधवा ब्राह्मणी, राजकुमार और बृहस्पति भक्ति के माध्यम से शिव कृपा प्राप्त करते हैं, जिससे यह व्रत लोक प्रसिद्ध हुआ।',
  },
  {
    id: '16-somvar-vrat-katha',
    name: '१६ सोमवार व्रत कथा',
    nameEn: '16 Somvar Vrat Katha',
    deityKey: 'shiva',
    kathaSlug: '16-somvar-vrat-katha',
    deity: 'शिव जी',
    category: 'व्रत कथा',
    emoji: '🔱',
    color: '#FF7043',
    gradient:
      'linear-gradient(135deg, rgba(255,112,67,0.22), rgba(255,87,34,0.1))',
    desc: 'सोलह सोमवार व्रत की कथा — रोग मुक्ति और शिवलोक प्राप्ति',
    significance:
      'सोलह सोमवार का व्रत विशेष फलदायी माना जाता है। पुजारी, पार्वती जी, कार्तिकेय और अन्य भक्तों की कथा से यह सिद्ध होता है कि नियमपूर्वक व्रत करने से रोग, दु:ख दूर होकर शिवलोक की प्राप्ति होती है।',
  },
  {
    id: 'tirupati-balaji-katha',
    name: 'श्री तिरुपति बालाजी की पौराणिक कथा',
    nameEn: 'Tirupati Balaji Pauranik Katha',
    deityKey: 'tirupati_balaji',
    kathaSlug: 'tirupati_balaji-katha',
    deity: 'श्री तिरुपति बालाजी',
    category: 'पौराणिक कथा',
    emoji: '🌟',
    color: '#FFD54F',
    gradient:
      'linear-gradient(135deg, rgba(255,213,79,0.2), rgba(255,179,0,0.08))',
    desc: 'वेंकटेश्वर स्वरूप की पौराणिक कथा — भक्ति, त्याग और दिव्य प्रेम',
    significance:
      'तिरुपति बालाजी भगवान विष्णु के कलियुग अवतार माने जाते हैं। भृगु ऋषि की परीक्षा, लक्ष्मी जी का क्रोध, वेंकटाद्रि पर तपस्या और पद्मावती से विवाह — यह कथा विनम्रता, समर्पण और ईश्वर की करुणा का संदेश देती है।',
  },
  {
    id: 'brihaspati-katha',
    name: 'श्री बृहस्पति देव की व्रत कथा',
    nameEn: 'Brihaspati Dev Vrat Katha',
    deityKey: 'brihaspati',
    kathaSlug: 'brihaspati-katha',
    deity: 'बृहस्पति देव',
    category: 'व्रत कथा',
    emoji: '📜',
    color: '#EF6C00',
    gradient:
      'linear-gradient(135deg, rgba(239,108,0,0.18), rgba(230,81,0,0.08))',
    desc: 'गुरुवार व्रत की कथा — बृहस्पति देव की कृपा और धन-संतान सुख',
    significance:
      'बृहस्पतिवार का व्रत गुरु भगवान बृहस्पति को प्रसन्न करने के लिए किया जाता है। इस कथा में राजा-रानी की कथा से सिखाया गया है कि गुरु की कृपा से धन, संतान और सभी मनोकामनाएँ पूर्ण होती हैं।',
  },
];

function getFamousKathaById(kathaId = '') {
  return famousKathasData.find((item) => item.id === kathaId);
}

function getKathaEntryForFamousKatha(kathaMeta) {
  if (!kathaMeta || !deities[kathaMeta.deityKey]) return null;
  const entries = getKathaEntries(
    deities[kathaMeta.deityKey].katha,
    kathaMeta.deityKey,
  );
  return (
    entries.find((item) => item.slug === kathaMeta.kathaSlug) || entries[0] || null
  );
}

function buildFamousKathasPage() {
  const grid = document.getElementById('kathasGrid');
  if (!grid || grid.dataset.ready === 'true') return;

  grid.innerHTML = famousKathasData
    .map((katha, idx) => getFamousKathaCardHtml(katha, idx))
    .join('');
  grid.dataset.ready = 'true';
}

function getFamousKathaCardHtml(katha, idx) {
  return `
    <div class="temple-card" onclick="showFamousKathaDetailsPage('${katha.id}')" style="animation-delay:${idx * 0.06}s; --card-accent-gradient:${katha.gradient}; --temple-color:${katha.color};">
      <div class="temple-card-top">
        <div class="temple-emoji-badge">${katha.emoji}</div>
        <div class="temple-type-badge">${escapeHtml(katha.category)}</div>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-name">${escapeHtml(katha.name)}</h3>
        <p class="temple-name-en">${escapeHtml(katha.nameEn)}</p>
        <div class="temple-location-row">
          <span class="temple-location-pin">🙏</span>
          <span class="temple-state">${escapeHtml(katha.deity)}</span>
        </div>
        <p class="temple-desc">${escapeHtml(katha.desc)}</p>
      </div>
      <div class="temple-card-footer">
        <span class="temple-map-cta">📖 कथा पढ़ें</span>
        <span class="temple-arrow">→</span>
      </div>
    </div>
  `;
}

function getFamousKathaDetailHeaderHtml(katha) {
  const deity = deities[katha.deityKey];
  const deityEmoji = deity?.emoji || katha.emoji;
  return `
    <div class="temple-modal-hero" style="--temple-color:${katha.color}">
      <div class="temple-modal-hero-main">
        <div class="temple-modal-emoji">${deityEmoji}</div>
        <div>
          <h2>${escapeHtml(katha.name)}</h2>
          <p>${escapeHtml(katha.nameEn)}</p>
          <div class="temple-modal-meta">
            <span class="temple-modal-type">${escapeHtml(katha.category)}</span>
            <span class="temple-modal-type">🙏 ${escapeHtml(katha.deity)}</span>
          </div>
        </div>
      </div>
    </div>`;
}

function getFamousKathaDetailInfoHtml(katha, kathaEntry) {
  const readTimeLabel = getHindiReadTimeLabelFromText(
    getLyricsReadableText(kathaEntry),
  );
  const deityLink = deities[katha.deityKey]
    ? `<button class="temple-info-deity-link" type="button" onclick="showDeityPage('${katha.deityKey}')">${escapeHtml(deities[katha.deityKey].name)}</button>`
    : escapeHtml(katha.deity);

  const infoCards = `
    <div class="temple-info-grid">
      <div class="temple-info-card">
        <div class="temple-info-icon">🙏</div>
        <div>
          <div class="temple-info-label">संबंधित देवता</div>
          <div class="temple-info-val">${deityLink}</div>
        </div>
      </div>
      <div class="temple-info-card">
        <div class="temple-info-icon">📚</div>
        <div>
          <div class="temple-info-label">कथा प्रकार</div>
          <div class="temple-info-val">${escapeHtml(katha.category)}</div>
        </div>
      </div>
    </div>`;

  const significanceSection = katha.significance
    ? `
    <div class="temple-history">
      <div class="temple-history-title">✨ महत्व</div>
      <p>${escapeHtml(katha.significance)}</p>
    </div>`
    : '';

  const kathaContent = `
    <div class="text-content active">
      <div class="deity-tab-wrap">
        <div class="deity-tab-content">
          <div class="lyrics-box">
            ${getSectionMetaHtml({
              readTimeLabel,
              showReadingMode: true,
              deityKey: katha.deityKey,
              contentType: 'katha',
              contentSlug: katha.kathaSlug,
              contentTitle: katha.name,
            })}
            ${renderLyrics(kathaEntry)}
          </div>
        </div>
      </div>
    </div>`;

  return `${infoCards}${significanceSection}${kathaContent}`;
}

function showFamousKathaDetailsPage(kathaId, options = {}) {
  const { skipUrl = false } = options;
  const katha = getFamousKathaById(kathaId);
  if (!katha) {
    showKathasMenuPage({ skipUrl });
    return;
  }

  const renderDetail = () => {
    const kathaEntry = getKathaEntryForFamousKatha(katha);
    if (!kathaEntry) {
      showKathasMenuPage({ skipUrl });
      return;
    }

    activeDeityKey = katha.deityKey;
    activeKathaSlug = katha.kathaSlug;
    activeDeityTab = 'katha';
    activeTempleDetailId = '';
    activeFestivalDetailId = '';
    activeScriptureDetailId = '';
    activeKathaDetailId = katha.id;

    const headerEl = document.getElementById('kathaDetailHeader');
    const infoEl = document.getElementById('kathaDetailInfo');
    if (!headerEl || !infoEl) return;

    headerEl.innerHTML = getFamousKathaDetailHeaderHtml(katha);
    infoEl.innerHTML = getFamousKathaDetailInfoHtml(katha, kathaEntry);
    showPage('katha-detail', 'kathas');

    if (!skipUrl) {
      updateUrlState({
        typeId: activeHomeType,
        deityKey: '',
        pageId: 'katha-detail',
        kathaId: katha.id,
      });
    }
  };

  if (!deities[katha.deityKey]?.katha) {
    ensureDataModule('katha').then(renderDetail);
    return;
  }

  renderDetail();
}
