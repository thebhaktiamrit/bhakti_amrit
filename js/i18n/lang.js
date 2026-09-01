// ============ BHAKTI AMRIT — i18n Language System ============
// All UI text strings for supported languages.
// Sacred content (aarti, chalisa, mantra text etc.) remains in its
// original Devanagari script — only the application interface is translated.

(function () {
  'use strict';

  const translations = {

    // ─────────────────────────────────────────────
    //  HINDI  (हिंदी)  — Default / baseline
    // ─────────────────────────────────────────────
    hi: {
      // Site / Header
      siteTitle: 'भक्ति अमृत',
      siteSubtitle: '॥ दैनिक साधना का संपूर्ण साथी ॥',

      // Loader
      loaderWelcome: 'भक्ति अमृत में आपका स्वागत है...',

      // Language menu
      langMenuTitle: 'भाषा चुनें',
      langComingSoon: 'जल्द आएगा',

      // Navigation
      navHome: 'मुख्य पृष्ठ',
      navDev: 'देव',
      navDevi: 'देवी',
      navAvatar: 'अवतार',
      navGrahDev: 'ग्रह देव',
      navLokDev: 'लोक देव',
      navFavorites: 'पसंदीदा',
      navTemples: 'प्रसिद्ध मंदिर',
      navFestivals: 'प्रसिद्ध त्योहार',
      navScriptures: 'प्रसिद्ध धर्मग्रन्थ',
      navBack: 'वापस जाएं',

      // Deity type badges
      typeDev: 'देव',
      typeDevi: 'देवी',
      typeAvatar: 'अवतार',
      typeGrahDev: 'ग्रह देव',
      typeLokDev: 'लोक देव',

      // Home section — all filter types
      homeTitleAll: 'देव-देवी संग्रह',
      homeSubtitleAll: 'किसी भी देव-देवी का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
      homeTitleDev: 'देव संग्रह',
      homeSubtitleDev: 'किसी भी देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
      homeTitleDevi: 'देवी संग्रह',
      homeSubtitleDevi: 'किसी भी देवी का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
      homeTitleAvatar: 'अवतार संग्रह',
      homeSubtitleAvatar: 'किसी भी अवतार का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
      homeTitleGrahDev: 'ग्रह देव संग्रह',
      homeSubtitleGrahDev: 'किसी भी ग्रह देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',
      homeTitleLokDev: 'लोक देव संग्रह',
      homeSubtitleLokDev: 'किसी भी लोक देव का नाम चुनें और उनकी आरती, चालीसा व मंत्र पढ़ें',

      // Search placeholders
      searchPlaceholderAll: 'देव-देवी का नाम लिखें...',
      searchPlaceholderDev: 'देव का नाम लिखें...',
      searchPlaceholderDevi: 'देवी का नाम लिखें...',
      searchPlaceholderAvatar: 'अवतार का नाम लिखें...',
      searchPlaceholderGrahDev: 'ग्रह देव का नाम लिखें...',
      searchPlaceholderLokDev: 'लोक देव का नाम लिखें...',

      // View mode
      viewCard: 'कार्ड',
      viewTable: 'टेबल',

      // Content tags
      tagAarti: 'आरती',
      tagChalisa: 'चालीसा',
      tagMantra: 'मंत्र',
      tagGeeta: 'गीता',
      tagKatha: 'कथा',
      tagBhajan: 'भजन',
      tagTemple: 'मंदिर',
      tagMore: 'और..',
      tagLess: 'कम..',

      // Favorites
      favoritesTitle: 'पसंदीदा देव-देवी',
      favoritesSubtitle: 'आपके पसंदीदा देव-देवी की सूची',

      // Home empty state
      emptyStateTitle: 'कोई परिणाम नहीं मिला',
      emptyStateSubtitle: 'दूसरा नाम लिखें या ऊपर की श्रेणी बदलकर देखें',

      // Deity tabs
      tabAbout: '🚩 परिचय',
      tabAarti: '🪔 आरती',
      tabChalisa: '📖 चालीसा',
      tabGeeta: '📘 गीता',
      tabKatha: '📚 कथा',
      tabBhajan: '🎵 भजन',
      tabMantra: '🕉️ मंत्र',
      tabTemples: '🛕 मंदिर',

      // Section action buttons
      readingMode: 'पठन मोड',
      printLabel: 'प्रिंट',
      addFavorite: 'पसंदीदा में जोड़ें',
      removeFavorite: 'पसंदीदा से हटाएं',
      meaningShow: 'हिंदी में समझें',
      meaningHide: 'हिंदी अर्थ छुपाएं',

      // Loading states
      loadingAarti: 'आरती लोड हो रही है...',
      loadingChalisa: 'चालीसा लोड हो रही है...',
      loadingGeeta: 'गीता लोड हो रही है...',
      loadingKatha: 'कथा लोड हो रही है...',
      loadingBhajan: 'भजन लोड हो रहा है...',
      loadingMantra: 'मंत्र लोड हो रहे हैं...',
      loadingExtra: 'स्तोत्र लोड हो रहा है...',
      loadingTemples: 'मंदिरों की सूची लोड हो रही है...',
      loadingContent: 'सामग्री लोड हो रही है...',
      loadingError: 'सामग्री लोड करने में समस्या आई। कृपया पुनः प्रयास करें।',
      retryLabel: 'पुनः लोड करें 🔄',
      aboutComingSoon: 'विवरण जल्द ही आ रहा है...',

      // Aarti bell
      aartiRingBell: 'घंटी बजाएं',
      aartiRingBellLabel: 'घंटी',

      // Mantra Mala dialog
      mantraMalaKicker: 'जाप साधना',
      mantraMalaTitle: 'जाप माला',
      mantraMalaCenterLabel: 'पूर्ण जाप',
      mantraMalaIncrement: 'एक जाप पूरा करें',

      // Chalisa navigation
      chalisaUp: 'ऊपर',
      chalisaDown: 'नीचे',
      chalisaUpAria: 'ऊपर की पंक्ति',
      chalisaDownAria: 'नीचे की पंक्ति',

      // Accessibility controls
      scrollTop: 'पेज की शुरुआत पर जाएं',
      scrollBottom: 'पेज के अंत में जाएं',
      fontSizeLabel: 'अक्षर आकार',

      // Temples page
      templesPageTitle: 'प्रसिद्ध हिंदू मंदिर',
      templesPageSubtitle: 'भारत के प्रसिद्ध तीर्थ स्थल — मानचित्र पर देखें और जानिए विस्तार से',
      templeSearchPlaceholder: 'मंदिर, देवता, स्थान या प्रकार खोजें...',

      // Festivals page
      festivalsPageTitle: 'प्रसिद्ध हिंदू त्योहार',
      festivalsPageSubtitle: 'प्रमुख पर्व, उनका महत्व और मुख्य अनुष्ठान',

      // Scriptures page
      scripturesPageTitle: 'प्रसिद्ध धर्मग्रन्थ',
      scripturesPageSubtitle: 'वैदिक और सनातन परंपरा के प्रमुख ग्रंथों का संक्षिप्त परिचय',

      // Footer
      footerDedication: '॥ जय जय श्री हरि ॥ — सभी देवी-देवताओं को समर्पित',
      footerAbout: 'हमारे बारे में',
      footerContact: 'संपर्क',
      footerTheme: 'थीम',

      // Reading mode close
      closeReadingMode: 'पठन मोड बंद करें',
      closeMantraMala: 'जाप माला बंद करें',
    },

    // ─────────────────────────────────────────────
    //  MARATHI  (मराठी)
    // ─────────────────────────────────────────────
    mr: {
      siteTitle: 'भक्ती अमृत',
      siteSubtitle: '॥ दैनिक साधनेचा संपूर्ण सोबती ॥',

      loaderWelcome: 'भक्ती अमृतमध्ये आपले स्वागत आहे...',

      langMenuTitle: 'भाषा निवडा',
      langComingSoon: 'लवकरच येणार',

      navHome: 'मुख्य पृष्ठ',
      navDev: 'देव',
      navDevi: 'देवी',
      navAvatar: 'अवतार',
      navGrahDev: 'ग्रह देव',
      navLokDev: 'लोक देव',
      navFavorites: 'आवडते',
      navTemples: 'प्रसिद्ध मंदिरे',
      navFestivals: 'प्रसिद्ध सण',
      navScriptures: 'प्रसिद्ध धर्मग्रंथ',
      navBack: 'मागे जा',

      typeDev: 'देव',
      typeDevi: 'देवी',
      typeAvatar: 'अवतार',
      typeGrahDev: 'ग्रह देव',
      typeLokDev: 'लोक देव',

      homeTitleAll: 'देव-देवी संग्रह',
      homeSubtitleAll: 'कोणत्याही देव-देवीचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',
      homeTitleDev: 'देव संग्रह',
      homeSubtitleDev: 'कोणत्याही देवाचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',
      homeTitleDevi: 'देवी संग्रह',
      homeSubtitleDevi: 'कोणत्याही देवीचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',
      homeTitleAvatar: 'अवतार संग्रह',
      homeSubtitleAvatar: 'कोणत्याही अवताराचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',
      homeTitleGrahDev: 'ग्रह देव संग्रह',
      homeSubtitleGrahDev: 'कोणत्याही ग्रह देवाचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',
      homeTitleLokDev: 'लोक देव संग्रह',
      homeSubtitleLokDev: 'कोणत्याही लोक देवाचे नाव निवडा आणि त्यांची आरती, चाळीसा व मंत्र वाचा',

      searchPlaceholderAll: 'देव-देवीचे नाव लिहा...',
      searchPlaceholderDev: 'देवाचे नाव लिहा...',
      searchPlaceholderDevi: 'देवीचे नाव लिहा...',
      searchPlaceholderAvatar: 'अवताराचे नाव लिहा...',
      searchPlaceholderGrahDev: 'ग्रह देवाचे नाव लिहा...',
      searchPlaceholderLokDev: 'लोक देवाचे नाव लिहा...',

      viewCard: 'कार्ड',
      viewTable: 'तक्ता',

      tagAarti: 'आरती',
      tagChalisa: 'चाळीसा',
      tagMantra: 'मंत्र',
      tagGeeta: 'गीता',
      tagKatha: 'कथा',
      tagBhajan: 'भजन',
      tagTemple: 'मंदिर',
      tagMore: 'अधिक..',
      tagLess: 'कमी..',

      favoritesTitle: 'आवडते देव-देवी',
      favoritesSubtitle: 'तुमच्या आवडत्या देव-देवींची यादी',

      emptyStateTitle: 'कोणताही निकाल सापडला नाही',
      emptyStateSubtitle: 'दुसरे नाव लिहा किंवा वरील श्रेणी बदलून पहा',

      tabAbout: '🚩 परिचय',
      tabAarti: '🪔 आरती',
      tabChalisa: '📖 चाळीसा',
      tabGeeta: '📘 गीता',
      tabKatha: '📚 कथा',
      tabBhajan: '🎵 भजन',
      tabMantra: '🕉️ मंत्र',
      tabTemples: '🛕 मंदिरे',

      readingMode: 'वाचन मोड',
      printLabel: 'मुद्रण',
      addFavorite: 'आवडत्यांमध्ये जोडा',
      removeFavorite: 'आवडत्यांमधून काढा',
      meaningShow: 'मराठीत समजून घ्या',
      meaningHide: 'मराठी अर्थ लपवा',

      loadingAarti: 'आरती लोड होत आहे...',
      loadingChalisa: 'चाळीसा लोड होत आहे...',
      loadingGeeta: 'गीता लोड होत आहे...',
      loadingKatha: 'कथा लोड होत आहे...',
      loadingBhajan: 'भजन लोड होत आहे...',
      loadingMantra: 'मंत्र लोड होत आहेत...',
      loadingExtra: 'स्तोत्र लोड होत आहे...',
      loadingTemples: 'मंदिरांची यादी लोड होत आहे...',
      loadingContent: 'सामग्री लोड होत आहे...',
      loadingError: 'सामग्री लोड करण्यात समस्या आली. कृपया पुन्हा प्रयत्न करा.',
      retryLabel: 'पुन्हा लोड करा 🔄',
      aboutComingSoon: 'माहिती लवकरच येत आहे...',

      aartiRingBell: 'घंटी वाजवा',
      aartiRingBellLabel: 'घंटी',

      mantraMalaKicker: 'जप साधना',
      mantraMalaTitle: 'जप माळ',
      mantraMalaCenterLabel: 'पूर्ण जप',
      mantraMalaIncrement: 'एक जप पूर्ण करा',

      chalisaUp: 'वर',
      chalisaDown: 'खाली',
      chalisaUpAria: 'वरील ओळ',
      chalisaDownAria: 'खालील ओळ',

      scrollTop: 'पृष्ठाच्या सुरुवातीला जा',
      scrollBottom: 'पृष्ठाच्या शेवटी जा',
      fontSizeLabel: 'अक्षर आकार',

      templesPageTitle: 'प्रसिद्ध हिंदू मंदिरे',
      templesPageSubtitle: 'भारतातील प्रसिद्ध तीर्थस्थळे — नकाशावर पहा आणि अधिक जाणून घ्या',
      templeSearchPlaceholder: 'मंदिर, देवता, ठिकाण किंवा प्रकार शोधा...',

      festivalsPageTitle: 'प्रसिद्ध हिंदू सण',
      festivalsPageSubtitle: 'प्रमुख सण, त्यांचे महत्त्व आणि मुख्य विधी',

      scripturesPageTitle: 'प्रसिद्ध धर्मग्रंथ',
      scripturesPageSubtitle: 'वैदिक आणि सनातन परंपरेतील प्रमुख ग्रंथांचा संक्षिप्त परिचय',

      footerDedication: '॥ जय जय श्री हरी ॥ — सर्व देवी-देवतांना समर्पित',
      footerAbout: 'आमच्याबद्दल',
      footerContact: 'संपर्क',
      footerTheme: 'थीम',

      closeReadingMode: 'वाचन मोड बंद करा',
      closeMantraMala: 'जप माळ बंद करा',
    },

    // ─────────────────────────────────────────────
    //  TAMIL  (தமிழ்)
    // ─────────────────────────────────────────────
    ta: {
      siteTitle: 'பக்தி அமிர்தம்',
      siteSubtitle: '॥ தினசரி சாதனையின் முழுமையான துணை ॥',

      loaderWelcome: 'பக்தி அமிர்தத்திற்கு உங்களை வரவேற்கிறோம்...',

      langMenuTitle: 'மொழி தேர்வு',
      langComingSoon: 'விரைவில் வரும்',

      navHome: 'முகப்பு',
      navDev: 'தேவன்',
      navDevi: 'தேவி',
      navAvatar: 'அவதாரம்',
      navGrahDev: 'கிரக தேவன்',
      navLokDev: 'லோக தேவன்',
      navFavorites: 'பிடித்தவை',
      navTemples: 'புகழ்பெற்ற கோயில்கள்',
      navFestivals: 'புகழ்பெற்ற திருவிழாக்கள்',
      navScriptures: 'புகழ்பெற்ற மறைநூல்கள்',
      navBack: 'திரும்பு',

      typeDev: 'தேவன்',
      typeDevi: 'தேவி',
      typeAvatar: 'அவதாரம்',
      typeGrahDev: 'கிரக தேவன்',
      typeLokDev: 'லோக தேவன்',

      homeTitleAll: 'தேவர்கள் தொகுப்பு',
      homeSubtitleAll: 'எந்த தேவரின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி, சாலீசா மற்றும் மந்திரம் படியுங்கள்',
      homeTitleDev: 'தேவன் தொகுப்பு',
      homeSubtitleDev: 'எந்த தேவரின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி, சாலீசா மற்றும் மந்திரம் படியுங்கள்',
      homeTitleDevi: 'தேவி தொகுப்பு',
      homeSubtitleDevi: 'எந்த தேவியின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி, சாலீசா மற்றும் மந்திரம் படியுங்கள்',
      homeTitleAvatar: 'அவதார தொகுப்பு',
      homeSubtitleAvatar: 'எந்த அவதாரத்தின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி, சாலீசா மற்றும் மந்திரம் படியுங்கள்',
      homeTitleGrahDev: 'கிரக தேவன் தொகுப்பு',
      homeSubtitleGrahDev: 'எந்த கிரக தேவரின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி மற்றும் மந்திரம் படியுங்கள்',
      homeTitleLokDev: 'லோக தேவன் தொகுப்பு',
      homeSubtitleLokDev: 'எந்த லோக தேவரின் பெயரையும் தேர்ந்தெடுத்து ஆரத்தி மற்றும் மந்திரம் படியுங்கள்',

      searchPlaceholderAll: 'தேவர் பெயர் தேடுங்கள்...',
      searchPlaceholderDev: 'தேவர் பெயர் தேடுங்கள்...',
      searchPlaceholderDevi: 'தேவி பெயர் தேடுங்கள்...',
      searchPlaceholderAvatar: 'அவதார பெயர் தேடுங்கள்...',
      searchPlaceholderGrahDev: 'கிரக தேவர் பெயர் தேடுங்கள்...',
      searchPlaceholderLokDev: 'லோக தேவர் பெயர் தேடுங்கள்...',

      viewCard: 'அட்டை',
      viewTable: 'அட்டவணை',

      tagAarti: 'ஆரத்தி',
      tagChalisa: 'சாலீசா',
      tagMantra: 'மந்திரம்',
      tagGeeta: 'கீதை',
      tagKatha: 'கதை',
      tagBhajan: 'பஜனை',
      tagTemple: 'கோயில்',
      tagMore: 'மேலும்..',
      tagLess: 'குறைவு..',

      favoritesTitle: 'பிடித்த தேவர்கள்',
      favoritesSubtitle: 'உங்கள் பிடித்த தேவர்களின் பட்டியல்',

      emptyStateTitle: 'எந்த முடிவும் கிடைக்கவில்லை',
      emptyStateSubtitle: 'வேறு பெயர் தேடுங்கள் அல்லது மேலே உள்ள வகையை மாற்றுங்கள்',

      tabAbout: '🚩 அறிமுகம்',
      tabAarti: '🪔 ஆரத்தி',
      tabChalisa: '📖 சாலீசா',
      tabGeeta: '📘 கீதை',
      tabKatha: '📚 கதை',
      tabBhajan: '🎵 பஜனை',
      tabMantra: '🕉️ மந்திரம்',
      tabTemples: '🛕 கோயில்கள்',

      readingMode: 'வாசிப்பு பாணி',
      printLabel: 'அச்சிடு',
      addFavorite: 'பிடித்தவைகளில் சேர்',
      removeFavorite: 'பிடித்தவைகளிலிருந்து நீக்கு',
      meaningShow: 'பொருள் காட்டு',
      meaningHide: 'பொருள் மறைக்கு',

      loadingAarti: 'ஆரத்தி ஏற்றப்படுகிறது...',
      loadingChalisa: 'சாலீசா ஏற்றப்படுகிறது...',
      loadingGeeta: 'கீதை ஏற்றப்படுகிறது...',
      loadingKatha: 'கதை ஏற்றப்படுகிறது...',
      loadingBhajan: 'பஜனை ஏற்றப்படுகிறது...',
      loadingMantra: 'மந்திரங்கள் ஏற்றப்படுகின்றன...',
      loadingExtra: 'ஸ்தோத்திரம் ஏற்றப்படுகிறது...',
      loadingTemples: 'கோயில்களின் பட்டியல் ஏற்றப்படுகிறது...',
      loadingContent: 'உள்ளடக்கம் ஏற்றப்படுகிறது...',
      loadingError: 'உள்ளடக்கத்தை ஏற்றுவதில் சிக்கல். மீண்டும் முயற்சிக்கவும்.',
      retryLabel: 'மீண்டும் ஏற்று 🔄',
      aboutComingSoon: 'விவரங்கள் விரைவில் வரும்...',

      aartiRingBell: 'மணி அடி',
      aartiRingBellLabel: 'மணி',

      mantraMalaKicker: 'ஜப சாதனை',
      mantraMalaTitle: 'ஜப மாலை',
      mantraMalaCenterLabel: 'முழு ஜபம்',
      mantraMalaIncrement: 'ஒரு ஜபம் முடிக்கவும்',

      chalisaUp: 'மேலே',
      chalisaDown: 'கீழே',
      chalisaUpAria: 'மேல் வரி',
      chalisaDownAria: 'கீழ் வரி',

      scrollTop: 'பக்கத்தின் தொடக்கத்திற்கு செல்',
      scrollBottom: 'பக்கத்தின் முடிவிற்கு செல்',
      fontSizeLabel: 'எழுத்து அளவு',

      templesPageTitle: 'புகழ்பெற்ற இந்து கோயில்கள்',
      templesPageSubtitle: 'இந்தியாவின் புகழ்பெற்ற தீர்த்த ஸ்தலங்கள் — வரைபடத்தில் பார்க்கவும்',
      templeSearchPlaceholder: 'கோயில், தேவர், இடம் அல்லது வகை தேடுங்கள்...',

      festivalsPageTitle: 'புகழ்பெற்ற இந்து திருவிழாக்கள்',
      festivalsPageSubtitle: 'முக்கிய பண்டிகைகள், அவற்றின் முக்கியத்துவம் மற்றும் சடங்குகள்',

      scripturesPageTitle: 'புகழ்பெற்ற மறைநூல்கள்',
      scripturesPageSubtitle: 'வேத மற்றும் சனாதன மரபின் முக்கிய நூல்களின் சுருக்கமான அறிமுகம்',

      footerDedication: '॥ ஜய ஜய ஸ்ரீ ஹரி ॥ — அனைத்து தேவர்களுக்கும் சமர்ப்பணம்',
      footerAbout: 'எங்களைப் பற்றி',
      footerContact: 'தொடர்பு',
      footerTheme: 'தீம்',

      closeReadingMode: 'வாசிப்பு பாணி மூடு',
      closeMantraMala: 'ஜப மாலை மூடு',
    },

    // ─────────────────────────────────────────────
    //  TELUGU  (తెలుగు)
    // ─────────────────────────────────────────────
    te: {
      siteTitle: 'భక్తి అమృతం',
      siteSubtitle: '॥ నిత్య సాధన యొక్క సంపూర్ణ సహచరుడు ॥',

      loaderWelcome: 'భక్తి అమృతంలోకి స్వాగతం...',

      langMenuTitle: 'భాష ఎంచుకోండి',
      langComingSoon: 'త్వరలో వస్తుంది',

      navHome: 'హోమ్',
      navDev: 'దేవుడు',
      navDevi: 'దేవి',
      navAvatar: 'అవతారం',
      navGrahDev: 'గ్రహ దేవుడు',
      navLokDev: 'లోక దేవుడు',
      navFavorites: 'ఇష్టమైనవి',
      navTemples: 'ప్రసిద్ధ దేవాలయాలు',
      navFestivals: 'ప్రసిద్ధ పండుగలు',
      navScriptures: 'ప్రసిద్ధ గ్రంథాలు',
      navBack: 'వెనక్కి వెళ్ళు',

      typeDev: 'దేవుడు',
      typeDevi: 'దేవి',
      typeAvatar: 'అవతారం',
      typeGrahDev: 'గ్రహ దేవుడు',
      typeLokDev: 'లోక దేవుడు',

      homeTitleAll: 'దేవతల సంగ్రహం',
      homeSubtitleAll: 'ఏ దేవుని పేరైనా ఎంచుకుని వారి ఆరతి, చాలీసా మరియు మంత్రాలు చదవండి',
      homeTitleDev: 'దేవుని సంగ్రహం',
      homeSubtitleDev: 'ఏ దేవుని పేరైనా ఎంచుకుని వారి ఆరతి, చాలీసా మరియు మంత్రాలు చదవండి',
      homeTitleDevi: 'దేవి సంగ్రహం',
      homeSubtitleDevi: 'ఏ దేవి పేరైనా ఎంచుకుని వారి ఆరతి, చాలీసా మరియు మంత్రాలు చదవండి',
      homeTitleAvatar: 'అవతార సంగ్రహం',
      homeSubtitleAvatar: 'ఏ అవతారం పేరైనా ఎంచుకుని వారి ఆరతి, చాలీసా మరియు మంత్రాలు చదవండి',
      homeTitleGrahDev: 'గ్రహ దేవుల సంగ్రహం',
      homeSubtitleGrahDev: 'ఏ గ్రహ దేవుని పేరైనా ఎంచుకుని వారి ఆరతి మరియు మంత్రాలు చదవండి',
      homeTitleLokDev: 'లోక దేవుల సంగ్రహం',
      homeSubtitleLokDev: 'ఏ లోక దేవుని పేరైనా ఎంచుకుని వారి ఆరతి మరియు మంత్రాలు చదవండి',

      searchPlaceholderAll: 'దేవుని పేరు వెతకండి...',
      searchPlaceholderDev: 'దేవుని పేరు వెతకండి...',
      searchPlaceholderDevi: 'దేవి పేరు వెతకండి...',
      searchPlaceholderAvatar: 'అవతారం పేరు వెతకండి...',
      searchPlaceholderGrahDev: 'గ్రహ దేవుని పేరు వెతకండి...',
      searchPlaceholderLokDev: 'లోక దేవుని పేరు వెతకండి...',

      viewCard: 'కార్డ్',
      viewTable: 'పట్టిక',

      tagAarti: 'ఆరతి',
      tagChalisa: 'చాలీసా',
      tagMantra: 'మంత్రం',
      tagGeeta: 'గీత',
      tagKatha: 'కథ',
      tagBhajan: 'భజన',
      tagTemple: 'దేవాలయం',
      tagMore: 'మరిన్ని..',
      tagLess: 'తక్కువ..',

      favoritesTitle: 'ఇష్టమైన దేవతలు',
      favoritesSubtitle: 'మీ ఇష్టమైన దేవతల జాబితా',

      emptyStateTitle: 'ఫలితాలు కనుగొనబడలేదు',
      emptyStateSubtitle: 'వేరే పేరు వెతకండి లేదా పై వర్గాన్ని మార్చండి',

      tabAbout: '🚩 పరిచయం',
      tabAarti: '🪔 ఆరతి',
      tabChalisa: '📖 చాలీసా',
      tabGeeta: '📘 గీత',
      tabKatha: '📚 కథ',
      tabBhajan: '🎵 భజన',
      tabMantra: '🕉️ మంత్రం',
      tabTemples: '🛕 దేవాలయాలు',

      readingMode: 'చదివే విధానం',
      printLabel: 'ముద్రించు',
      addFavorite: 'ఇష్టమైనవారికి జోడించు',
      removeFavorite: 'ఇష్టమైనవారి నుండి తొలగించు',
      meaningShow: 'అర్థం చూపించు',
      meaningHide: 'అర్థం దాచు',

      loadingAarti: 'ఆరతి లోడ్ అవుతోంది...',
      loadingChalisa: 'చాలీసా లోడ్ అవుతోంది...',
      loadingGeeta: 'గీత లోడ్ అవుతోంది...',
      loadingKatha: 'కథ లోడ్ అవుతోంది...',
      loadingBhajan: 'భజన లోడ్ అవుతోంది...',
      loadingMantra: 'మంత్రాలు లోడ్ అవుతున్నాయి...',
      loadingExtra: 'స్తోత్రం లోడ్ అవుతోంది...',
      loadingTemples: 'దేవాలయాల జాబితా లోడ్ అవుతోంది...',
      loadingContent: 'కంటెంట్ లోడ్ అవుతోంది...',
      loadingError: 'కంటెంట్ లోడ్ చేయడంలో సమస్య. దయచేసి మళ్ళీ ప్రయత్నించండి.',
      retryLabel: 'మళ్ళీ లోడ్ చేయి 🔄',
      aboutComingSoon: 'వివరాలు త్వరలో వస్తాయి...',

      aartiRingBell: 'గంట మోగించు',
      aartiRingBellLabel: 'గంట',

      mantraMalaKicker: 'జప సాధన',
      mantraMalaTitle: 'జప మాల',
      mantraMalaCenterLabel: 'పూర్తి జపం',
      mantraMalaIncrement: 'ఒక జపం పూర్తి చేయండి',

      chalisaUp: 'పైకి',
      chalisaDown: 'కిందకి',
      chalisaUpAria: 'పై వరుస',
      chalisaDownAria: 'కింద వరుస',

      scrollTop: 'పేజీ ప్రారంభానికి వెళ్ళు',
      scrollBottom: 'పేజీ చివరికి వెళ్ళు',
      fontSizeLabel: 'అక్షర పరిమాణం',

      templesPageTitle: 'ప్రసిద్ధ హిందూ దేవాలయాలు',
      templesPageSubtitle: 'భారతదేశంలోని ప్రసిద్ధ తీర్థ స్థలాలు — మ్యాప్‌లో చూడండి',
      templeSearchPlaceholder: 'దేవాలయం, దేవత, ప్రదేశం లేదా రకం వెతకండి...',

      festivalsPageTitle: 'ప్రసిద్ధ హిందూ పండుగలు',
      festivalsPageSubtitle: 'ప్రధాన పండుగలు, వాటి ప్రాముఖ్యత మరియు ముఖ్య ఆచారాలు',

      scripturesPageTitle: 'ప్రసిద్ధ గ్రంథాలు',
      scripturesPageSubtitle: 'వేద మరియు సనాతన సంప్రదాయంలోని ముఖ్య గ్రంథాల సంక్షిప్త పరిచయం',

      footerDedication: '॥ జయ జయ శ్రీ హరి ॥ — అన్ని దేవతలకు అంకితం',
      footerAbout: 'మా గురించి',
      footerContact: 'సంప్రదించండి',
      footerTheme: 'థీమ్',

      closeReadingMode: 'చదివే విధానం మూసివేయి',
      closeMantraMala: 'జప మాల మూసివేయి',
    },

    // ─────────────────────────────────────────────
    //  KANNADA  (ಕನ್ನಡ)
    // ─────────────────────────────────────────────
    kn: {
      siteTitle: 'ಭಕ್ತಿ ಅಮೃತ',
      siteSubtitle: '॥ ದೈನಂದಿನ ಸಾಧನೆಯ ಸಂಪೂರ್ಣ ಸಂಗಾತಿ ॥',

      loaderWelcome: 'ಭಕ್ತಿ ಅಮೃತಕ್ಕೆ ನಿಮಗೆ ಸ್ವಾಗತ...',

      langMenuTitle: 'ಭಾಷೆ ಆಯ್ಕೆ ಮಾಡಿ',
      langComingSoon: 'ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿದೆ',

      navHome: 'ಮುಖಪುಟ',
      navDev: 'ದೇವ',
      navDevi: 'ದೇವಿ',
      navAvatar: 'ಅವತಾರ',
      navGrahDev: 'ಗ್ರಹ ದೇವ',
      navLokDev: 'ಲೋಕ ದೇವ',
      navFavorites: 'ಮೆಚ್ಚಿನವು',
      navTemples: 'ಪ್ರಸಿದ್ಧ ದೇವಾಲಯಗಳು',
      navFestivals: 'ಪ್ರಸಿದ್ಧ ಹಬ್ಬಗಳು',
      navScriptures: 'ಪ್ರಸಿದ್ಧ ಧರ್ಮಗ್ರಂಥಗಳು',
      navBack: 'ಹಿಂತಿರುಗಿ',

      typeDev: 'ದೇವ',
      typeDevi: 'ದೇವಿ',
      typeAvatar: 'ಅವತಾರ',
      typeGrahDev: 'ಗ್ರಹ ದೇವ',
      typeLokDev: 'ಲೋಕ ದೇವ',

      homeTitleAll: 'ದೇವ-ದೇವಿ ಸಂಗ್ರಹ',
      homeSubtitleAll: 'ಯಾವುದೇ ದೇವ-ದೇವಿಯ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ, ಚಾಲೀಸಾ ಮತ್ತು ಮಂತ್ರ ಓದಿ',
      homeTitleDev: 'ದೇವ ಸಂಗ್ರಹ',
      homeSubtitleDev: 'ಯಾವುದೇ ದೇವರ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ, ಚಾಲೀಸಾ ಮತ್ತು ಮಂತ್ರ ಓದಿ',
      homeTitleDevi: 'ದೇವಿ ಸಂಗ್ರಹ',
      homeSubtitleDevi: 'ಯಾವುದೇ ದೇವಿಯ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ, ಚಾಲೀಸಾ ಮತ್ತು ಮಂತ್ರ ಓದಿ',
      homeTitleAvatar: 'ಅವತಾರ ಸಂಗ್ರಹ',
      homeSubtitleAvatar: 'ಯಾವುದೇ ಅವತಾರದ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ, ಚಾಲೀಸಾ ಮತ್ತು ಮಂತ್ರ ಓದಿ',
      homeTitleGrahDev: 'ಗ್ರಹ ದೇವ ಸಂಗ್ರಹ',
      homeSubtitleGrahDev: 'ಯಾವುದೇ ಗ್ರಹ ದೇವರ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ ಮತ್ತು ಮಂತ್ರ ಓದಿ',
      homeTitleLokDev: 'ಲೋಕ ದೇವ ಸಂಗ್ರಹ',
      homeSubtitleLokDev: 'ಯಾವುದೇ ಲೋಕ ದೇವರ ಹೆಸರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ ಮತ್ತು ಅವರ ಆರತಿ ಮತ್ತು ಮಂತ್ರ ಓದಿ',

      searchPlaceholderAll: 'ದೇವ-ದೇವಿ ಹೆಸರು ಹುಡುಕಿ...',
      searchPlaceholderDev: 'ದೇವ ಹೆಸರು ಹುಡುಕಿ...',
      searchPlaceholderDevi: 'ದೇವಿ ಹೆಸರು ಹುಡುಕಿ...',
      searchPlaceholderAvatar: 'ಅವತಾರ ಹೆಸರು ಹುಡುಕಿ...',
      searchPlaceholderGrahDev: 'ಗ್ರಹ ದೇವ ಹೆಸರು ಹುಡುಕಿ...',
      searchPlaceholderLokDev: 'ಲೋಕ ದೇವ ಹೆಸರು ಹುಡುಕಿ...',

      viewCard: 'ಕಾರ್ಡ್',
      viewTable: 'ಕೋಷ್ಟಕ',

      tagAarti: 'ಆರತಿ',
      tagChalisa: 'ಚಾಲೀಸಾ',
      tagMantra: 'ಮಂತ್ರ',
      tagGeeta: 'ಗೀತೆ',
      tagKatha: 'ಕಥೆ',
      tagBhajan: 'ಭಜನೆ',
      tagTemple: 'ದೇವಾಲಯ',
      tagMore: 'ಇನ್ನಷ್ಟು..',
      tagLess: 'ಕಡಿಮೆ..',

      favoritesTitle: 'ಮೆಚ್ಚಿನ ದೇವ-ದೇವಿ',
      favoritesSubtitle: 'ನಿಮ್ಮ ಮೆಚ್ಚಿನ ದೇವ-ದೇವಿಯ ಪಟ್ಟಿ',

      emptyStateTitle: 'ಯಾವುದೇ ಫಲಿತಾಂಶ ಕಂಡುಬಂದಿಲ್ಲ',
      emptyStateSubtitle: 'ಬೇರೆ ಹೆಸರು ಹುಡುಕಿ ಅಥವಾ ಮೇಲಿನ ವರ್ಗ ಬದಲಿಸಿ',

      tabAbout: '🚩 ಪರಿಚಯ',
      tabAarti: '🪔 ಆರತಿ',
      tabChalisa: '📖 ಚಾಲೀಸಾ',
      tabGeeta: '📘 ಗೀತೆ',
      tabKatha: '📚 ಕಥೆ',
      tabBhajan: '🎵 ಭಜನೆ',
      tabMantra: '🕉️ ಮಂತ್ರ',
      tabTemples: '🛕 ದೇವಾಲಯಗಳು',

      readingMode: 'ಓದುವ ವಿಧಾನ',
      printLabel: 'ಮುದ್ರಿಸಿ',
      addFavorite: 'ಮೆಚ್ಚಿನವುಗಳಿಗೆ ಸೇರಿಸಿ',
      removeFavorite: 'ಮೆಚ್ಚಿನವುಗಳಿಂದ ತೆಗೆದುಹಾಕಿ',
      meaningShow: 'ಅರ್ಥ ತೋರಿಸಿ',
      meaningHide: 'ಅರ್ಥ ಮರೆಮಾಡಿ',

      loadingAarti: 'ಆರತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingChalisa: 'ಚಾಲೀಸಾ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingGeeta: 'ಗೀತೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingKatha: 'ಕಥೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingBhajan: 'ಭಜನೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingMantra: 'ಮಂತ್ರಗಳು ಲೋಡ್ ಆಗುತ್ತಿವೆ...',
      loadingExtra: 'ಸ್ತೋತ್ರ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingTemples: 'ದೇವಾಲಯಗಳ ಪಟ್ಟಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingContent: 'ವಿಷಯ ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
      loadingError: 'ವಿಷಯ ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ಸಮಸ್ಯೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
      retryLabel: 'ಮತ್ತೆ ಲೋಡ್ ಮಾಡಿ 🔄',
      aboutComingSoon: 'ವಿವರಗಳು ಶೀಘ್ರದಲ್ಲೇ ಬರಲಿವೆ...',

      aartiRingBell: 'ಗಂಟೆ ಬಾರಿಸಿ',
      aartiRingBellLabel: 'ಗಂಟೆ',

      mantraMalaKicker: 'ಜಪ ಸಾಧನೆ',
      mantraMalaTitle: 'ಜಪ ಮಾಲೆ',
      mantraMalaCenterLabel: 'ಪೂರ್ಣ ಜಪ',
      mantraMalaIncrement: 'ಒಂದು ಜಪ ಪೂರ್ಣ ಮಾಡಿ',

      chalisaUp: 'ಮೇಲೆ',
      chalisaDown: 'ಕೆಳಗೆ',
      chalisaUpAria: 'ಮೇಲಿನ ಸಾಲು',
      chalisaDownAria: 'ಕೆಳಗಿನ ಸಾಲು',

      scrollTop: 'ಪುಟದ ಆರಂಭಕ್ಕೆ ಹೋಗಿ',
      scrollBottom: 'ಪುಟದ ಕೊನೆಗೆ ಹೋಗಿ',
      fontSizeLabel: 'ಅಕ್ಷರ ಗಾತ್ರ',

      templesPageTitle: 'ಪ್ರಸಿದ್ಧ ಹಿಂದೂ ದೇವಾಲಯಗಳು',
      templesPageSubtitle: 'ಭಾರತದ ಪ್ರಸಿದ್ಧ ತೀರ್ಥ ಕ್ಷೇತ್ರಗಳು — ನಕ್ಷೆಯಲ್ಲಿ ನೋಡಿ ಮತ್ತು ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
      templeSearchPlaceholder: 'ದೇವಾಲಯ, ದೇವತೆ, ಸ್ಥಳ ಅಥವಾ ಪ್ರಕಾರ ಹುಡುಕಿ...',

      festivalsPageTitle: 'ಪ್ರಸಿದ್ಧ ಹಿಂದೂ ಹಬ್ಬಗಳು',
      festivalsPageSubtitle: 'ಪ್ರಮುಖ ಹಬ್ಬಗಳು, ಅವುಗಳ ಮಹತ್ವ ಮತ್ತು ಮುಖ್ಯ ಆಚರಣೆಗಳು',

      scripturesPageTitle: 'ಪ್ರಸಿದ್ಧ ಧರ್ಮಗ್ರಂಥಗಳು',
      scripturesPageSubtitle: 'ವೇದ ಮತ್ತು ಸನಾತನ ಪರಂಪರೆಯ ಪ್ರಮುಖ ಗ್ರಂಥಗಳ ಸಂಕ್ಷಿಪ್ತ ಪರಿಚಯ',

      footerDedication: '॥ ಜಯ ಜಯ ಶ್ರೀ ಹರಿ ॥ — ಎಲ್ಲ ದೇವ-ದೇವಿಯರಿಗೆ ಸಮರ್ಪಿತ',
      footerAbout: 'ನಮ್ಮ ಬಗ್ಗೆ',
      footerContact: 'ಸಂಪರ್ಕಿಸಿ',
      footerTheme: 'ಥೀಮ್',

      closeReadingMode: 'ಓದುವ ವಿಧಾನ ಮುಚ್ಚಿ',
      closeMantraMala: 'ಜಪ ಮಾಲೆ ಮುಚ್ಚಿ',
    },

    // ─────────────────────────────────────────────
    //  BENGALI  (বাংলা)
    // ─────────────────────────────────────────────
    bn: {
      siteTitle: 'ভক্তি অমৃত',
      siteSubtitle: '॥ দৈনন্দিন সাধনার সম্পূর্ণ সাথী ॥',

      loaderWelcome: 'ভক্তি অমৃতে আপনাকে স্বাগতম...',

      langMenuTitle: 'ভাষা বেছে নিন',
      langComingSoon: 'শীঘ্রই আসছে',

      navHome: 'মূল পৃষ্ঠা',
      navDev: 'দেব',
      navDevi: 'দেবী',
      navAvatar: 'অবতার',
      navGrahDev: 'গ্রহ দেব',
      navLokDev: 'লোক দেব',
      navFavorites: 'পছন্দের',
      navTemples: 'প্রসিদ্ধ মন্দির',
      navFestivals: 'প্রসিদ্ধ উৎসব',
      navScriptures: 'প্রসিদ্ধ ধর্মগ্রন্থ',
      navBack: 'ফিরে যান',

      typeDev: 'দেব',
      typeDevi: 'দেবী',
      typeAvatar: 'অবতার',
      typeGrahDev: 'গ্রহ দেব',
      typeLokDev: 'লোক দেব',

      homeTitleAll: 'দেব-দেবী সংগ্রহ',
      homeSubtitleAll: 'যেকোনো দেব-দেবীর নাম বেছে নিন এবং তাঁদের আরতি, চালিশা ও মন্ত্র পড়ুন',
      homeTitleDev: 'দেব সংগ্রহ',
      homeSubtitleDev: 'যেকোনো দেবের নাম বেছে নিন এবং তাঁদের আরতি, চালিশা ও মন্ত্র পড়ুন',
      homeTitleDevi: 'দেবী সংগ্রহ',
      homeSubtitleDevi: 'যেকোনো দেবীর নাম বেছে নিন এবং তাঁদের আরতি, চালিশা ও মন্ত্র পড়ুন',
      homeTitleAvatar: 'অবতার সংগ্রহ',
      homeSubtitleAvatar: 'যেকোনো অবতারের নাম বেছে নিন এবং তাঁদের আরতি, চালিশা ও মন্ত্র পড়ুন',
      homeTitleGrahDev: 'গ্রহ দেব সংগ্রহ',
      homeSubtitleGrahDev: 'যেকোনো গ্রহ দেবের নাম বেছে নিন এবং তাঁদের আরতি ও মন্ত্র পড়ুন',
      homeTitleLokDev: 'লোক দেব সংগ্রহ',
      homeSubtitleLokDev: 'যেকোনো লোক দেবের নাম বেছে নিন এবং তাঁদের আরতি ও মন্ত্র পড়ুন',

      searchPlaceholderAll: 'দেব-দেবীর নাম লিখুন...',
      searchPlaceholderDev: 'দেবের নাম লিখুন...',
      searchPlaceholderDevi: 'দেবীর নাম লিখুন...',
      searchPlaceholderAvatar: 'অবতারের নাম লিখুন...',
      searchPlaceholderGrahDev: 'গ্রহ দেবের নাম লিখুন...',
      searchPlaceholderLokDev: 'লোক দেবের নাম লিখুন...',

      viewCard: 'কার্ড',
      viewTable: 'তালিকা',

      tagAarti: 'আরতি',
      tagChalisa: 'চালিশা',
      tagMantra: 'মন্ত্র',
      tagGeeta: 'গীতা',
      tagKatha: 'কথা',
      tagBhajan: 'ভজন',
      tagTemple: 'মন্দির',
      tagMore: 'আরও..',
      tagLess: 'কম..',

      favoritesTitle: 'পছন্দের দেব-দেবী',
      favoritesSubtitle: 'আপনার পছন্দের দেব-দেবীর তালিকা',

      emptyStateTitle: 'কোনো ফলাফল পাওয়া যায়নি',
      emptyStateSubtitle: 'অন্য নাম লিখুন বা উপরের বিভাগ পরিবর্তন করুন',

      tabAbout: '🚩 পরিচয়',
      tabAarti: '🪔 আরতি',
      tabChalisa: '📖 চালিশা',
      tabGeeta: '📘 গীতা',
      tabKatha: '📚 কথা',
      tabBhajan: '🎵 ভজন',
      tabMantra: '🕉️ মন্ত্র',
      tabTemples: '🛕 মন্দির',

      readingMode: 'পড়ার মোড',
      printLabel: 'প্রিন্ট',
      addFavorite: 'পছন্দে যোগ করুন',
      removeFavorite: 'পছন্দ থেকে সরান',
      meaningShow: 'অর্থ দেখুন',
      meaningHide: 'অর্থ লুকান',

      loadingAarti: 'আরতি লোড হচ্ছে...',
      loadingChalisa: 'চালিশা লোড হচ্ছে...',
      loadingGeeta: 'গীতা লোড হচ্ছে...',
      loadingKatha: 'কথা লোড হচ্ছে...',
      loadingBhajan: 'ভজন লোড হচ্ছে...',
      loadingMantra: 'মন্ত্র লোড হচ্ছে...',
      loadingExtra: 'স্তোত্র লোড হচ্ছে...',
      loadingTemples: 'মন্দিরের তালিকা লোড হচ্ছে...',
      loadingContent: 'বিষয়বস্তু লোড হচ্ছে...',
      loadingError: 'বিষয়বস্তু লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
      retryLabel: 'আবার লোড করুন 🔄',
      aboutComingSoon: 'বিবরণ শীঘ্রই আসছে...',

      aartiRingBell: 'ঘণ্টা বাজান',
      aartiRingBellLabel: 'ঘণ্টা',

      mantraMalaKicker: 'জপ সাধনা',
      mantraMalaTitle: 'জপ মালা',
      mantraMalaCenterLabel: 'সম্পূর্ণ জপ',
      mantraMalaIncrement: 'একটি জপ সম্পূর্ণ করুন',

      chalisaUp: 'উপরে',
      chalisaDown: 'নিচে',
      chalisaUpAria: 'উপরের লাইন',
      chalisaDownAria: 'নিচের লাইন',

      scrollTop: 'পৃষ্ঠার শুরুতে যান',
      scrollBottom: 'পৃষ্ঠার শেষে যান',
      fontSizeLabel: 'অক্ষরের আকার',

      templesPageTitle: 'প্রসিদ্ধ হিন্দু মন্দির',
      templesPageSubtitle: 'ভারতের প্রসিদ্ধ তীর্থস্থান — মানচিত্রে দেখুন এবং বিস্তারিত জানুন',
      templeSearchPlaceholder: 'মন্দির, দেবতা, স্থান বা ধরন খুঁজুন...',

      festivalsPageTitle: 'প্রসিদ্ধ হিন্দু উৎসব',
      festivalsPageSubtitle: 'প্রধান পার্বণ, তাদের তাৎপর্য এবং মূল আচার-অনুষ্ঠান',

      scripturesPageTitle: 'প্রসিদ্ধ ধর্মগ্রন্থ',
      scripturesPageSubtitle: 'বৈদিক ও সনাতন পরম্পরার প্রধান গ্রন্থের সংক্ষিপ্ত পরিচয়',

      footerDedication: '॥ জয় জয় শ্রী হরি ॥ — সকল দেবী-দেবতাদের সমর্পিত',
      footerAbout: 'আমাদের সম্পর্কে',
      footerContact: 'যোগাযোগ',
      footerTheme: 'থিম',

      closeReadingMode: 'পড়ার মোড বন্ধ করুন',
      closeMantraMala: 'জপ মালা বন্ধ করুন',
    },
  };

  // Active language (defaults to Hindi)
  let currentLang = 'hi';

  /**
   * Translate a key using the currently active language.
   * Falls back to Hindi if the key is missing in the selected language.
   */
  function t(key) {
    const lang = translations[currentLang] || translations.hi;
    return lang[key] !== undefined ? lang[key] : (translations.hi[key] || key);
  }

  /**
   * Set the active language and fire a custom DOM event so listeners
   * (e.g. dynamic content builders) can react.
   */
  function setI18nLang(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);
    window.dispatchEvent(new CustomEvent('bhakti-lang-change', { detail: { lang } }));
  }

  /**
   * Apply all static translations to the existing DOM.
   * Called after language change.
   */
  function applyI18n({ rerender = false } = {}) {
    const lang = currentLang;

    // ── Loader ──
    const loaderText = document.querySelector('.loader-text');
    if (loaderText) loaderText.textContent = t('loaderWelcome');

    // ── Site header ──
    const siteTitleEl = document.getElementById('siteTitle');
    if (siteTitleEl) siteTitleEl.textContent = t('siteTitle');
    const siteSubtitleEl = document.getElementById('siteSubtitle');
    if (siteSubtitleEl) siteSubtitleEl.textContent = t('siteSubtitle');

    // ── Language menu title ──
    const langMenuTitle = document.querySelector('.nav-lang-menu-title');
    if (langMenuTitle) langMenuTitle.textContent = t('langMenuTitle');

    // ── "Coming soon" badges ──
    document.querySelectorAll('.nav-lang-item-soon-badge').forEach((badge) => {
      badge.textContent = t('langComingSoon');
    });

    // ── Main Home button ──
    const mainHomeBtn = document.getElementById('mainHomeButton');
    if (mainHomeBtn && !mainHomeBtn.innerHTML.includes('↩️')) {
      mainHomeBtn.innerHTML = `<span class="nav-icon-emoji">🏠</span><span class="nav-label">${t('navHome')}</span>`;
    }

    // ── Primary nav buttons (by data-page) ──
    const navMap = {
      'type-dev':    { emoji: '🕉️', key: 'navDev' },
      'type-devi':   { emoji: '🌺', key: 'navDevi' },
      'type-avatar': { emoji: '🏹', key: 'navAvatar' },
      'type-grah-dev': { emoji: '🪐', key: 'navGrahDev' },
      'type-lok-dev':  { emoji: '🎠', key: 'navLokDev' },
      favorites:     { emoji: null, key: 'navFavorites' },
      temples:       { emoji: '🛕', key: 'navTemples' },
      festivals:     { emoji: '🎉', key: 'navFestivals' },
      scriptures:    { emoji: '📚', key: 'navScriptures' },
    };

    document.querySelectorAll('.nav-btn[data-page]').forEach((btn) => {
      const page = btn.dataset.page;
      const meta = navMap[page];
      if (!meta) return;
      const labelEl = btn.querySelector('.nav-label');
      if (labelEl) {
        labelEl.textContent = t(meta.key);
      }
    });

    // ── Chalisa nav controls ──
    const chalisaPrevLabel = document.querySelector('#chalisaPrevBtn .chalisa-nav-label');
    const chalisaNextLabel = document.querySelector('#chalisaNextBtn .chalisa-nav-label');
    if (chalisaPrevLabel) chalisaPrevLabel.textContent = t('chalisaUp');
    if (chalisaNextLabel) chalisaNextLabel.textContent = t('chalisaDown');
    const chalisaPrevBtn = document.getElementById('chalisaPrevBtn');
    const chalisaNextBtn = document.getElementById('chalisaNextBtn');
    if (chalisaPrevBtn) {
      chalisaPrevBtn.setAttribute('aria-label', t('chalisaUpAria'));
      chalisaPrevBtn.setAttribute('title', t('chalisaUpAria'));
    }
    if (chalisaNextBtn) {
      chalisaNextBtn.setAttribute('aria-label', t('chalisaDownAria'));
      chalisaNextBtn.setAttribute('title', t('chalisaDownAria'));
    }

    // ── Accessibility buttons ──
    const scrollTopBtn = document.querySelector('.quick-nav-btn[onclick*="scrollDirectTop"]');
    if (scrollTopBtn) {
      scrollTopBtn.setAttribute('data-tooltip', t('scrollTop'));
      scrollTopBtn.setAttribute('title', t('scrollTop'));
      scrollTopBtn.setAttribute('aria-label', t('scrollTop'));
    }
    const scrollBottomBtn = document.querySelector('.quick-nav-btn[onclick*="scrollDirectBottom"]');
    if (scrollBottomBtn) {
      scrollBottomBtn.setAttribute('data-tooltip', t('scrollBottom'));
      scrollBottomBtn.setAttribute('title', t('scrollBottom'));
      scrollBottomBtn.setAttribute('aria-label', t('scrollBottom'));
    }
    const fontSizeBtn = document.querySelector('.font-size-btn');
    if (fontSizeBtn) {
      fontSizeBtn.setAttribute('title', t('fontSizeLabel'));
      fontSizeBtn.setAttribute('aria-label', t('fontSizeLabel'));
      const fontSizeLabel = fontSizeBtn.querySelector('.label');
      if (fontSizeLabel) fontSizeLabel.textContent = t('fontSizeLabel');
    }

    // ── Mantra Mala dialog static strings ──
    const mantraMalaKicker = document.querySelector('.mantra-mala-kicker');
    if (mantraMalaKicker) mantraMalaKicker.textContent = t('mantraMalaKicker');
    const mantraMalaTitleEl = document.getElementById('mantraMalaTitle');
    if (mantraMalaTitleEl) mantraMalaTitleEl.textContent = t('mantraMalaTitle');
    const mantraMalaCenterLabel = document.querySelector('.mantra-mala-center-label');
    if (mantraMalaCenterLabel) mantraMalaCenterLabel.textContent = t('mantraMalaCenterLabel');
    const mantraMalaIncrementBtn = document.getElementById('mantraMalaIncrementBtn');
    if (mantraMalaIncrementBtn) mantraMalaIncrementBtn.textContent = t('mantraMalaIncrement');

    // ── Reading mode close button ──
    const readingModeClose = document.querySelector('.reading-mode-close');
    if (readingModeClose) {
      readingModeClose.setAttribute('aria-label', t('closeReadingMode'));
      readingModeClose.setAttribute('title', t('closeReadingMode'));
    }

    // ── Mantra mala close button ──
    const mantraMalaClose = document.querySelector('.mantra-mala-close');
    if (mantraMalaClose) {
      mantraMalaClose.setAttribute('aria-label', t('closeMantraMala'));
      mantraMalaClose.setAttribute('title', t('closeMantraMala'));
    }

    // ── Home view toggle buttons ──
    const homeViewCardBtn = document.getElementById('homeViewCardBtn');
    if (homeViewCardBtn) homeViewCardBtn.textContent = t('viewCard');
    const homeViewTableBtn = document.getElementById('homeViewTableBtn');
    if (homeViewTableBtn) homeViewTableBtn.textContent = t('viewTable');

    // ── Temple view toggle buttons ──
    const templeViewCardBtn = document.getElementById('templeViewCardBtn');
    if (templeViewCardBtn) templeViewCardBtn.textContent = t('viewCard');
    const templeViewTableBtn = document.getElementById('templeViewTableBtn');
    if (templeViewTableBtn) templeViewTableBtn.textContent = t('viewTable');

    // ── Temple page static text ──
    const templesHeader = document.querySelector('#page-temples .section-title');
    if (templesHeader) {
      const iconEl = templesHeader.querySelector('.diya');
      const iconHtml = iconEl ? iconEl.outerHTML : '<span class="diya">🛕</span>';
      templesHeader.innerHTML = `${iconHtml} ${t('templesPageTitle')}`;
    }
    const templesSubtitle = document.querySelector('#page-temples .section-subtitle');
    if (templesSubtitle) templesSubtitle.textContent = t('templesPageSubtitle');
    const templeSearchInput = document.getElementById('templeSearchInput');
    if (templeSearchInput) templeSearchInput.placeholder = t('templeSearchPlaceholder');

    // ── Festivals page static text ──
    const festivalsHeader = document.querySelector('#page-festivals .section-title');
    if (festivalsHeader) {
      const iconEl = festivalsHeader.querySelector('.diya');
      const iconHtml = iconEl ? iconEl.outerHTML : '<span class="diya">🎉</span>';
      festivalsHeader.innerHTML = `${iconHtml} ${t('festivalsPageTitle')}`;
    }
    const festivalsSubtitle = document.querySelector('#page-festivals .section-subtitle');
    if (festivalsSubtitle) festivalsSubtitle.textContent = t('festivalsPageSubtitle');

    // ── Scriptures page static text ──
    const scripturesHeader = document.querySelector('#page-scriptures .section-title');
    if (scripturesHeader) {
      const iconEl = scripturesHeader.querySelector('.diya');
      const iconHtml = iconEl ? iconEl.outerHTML : '<span class="diya">📚</span>';
      scripturesHeader.innerHTML = `${iconHtml} ${t('scripturesPageTitle')}`;
    }
    const scripturesSubtitle = document.querySelector('#page-scriptures .section-subtitle');
    if (scripturesSubtitle) scripturesSubtitle.textContent = t('scripturesPageSubtitle');

    // ── Home section header (re-render) ──
    if (typeof updateHomeSectionHeader === 'function') {
      updateHomeSectionHeader(
        typeof activeHomeType !== 'undefined' ? activeHomeType : 'all',
      );
    }

    // ── Home search placeholder ──
    const homeSearchInput = document.getElementById('homeSearchInput');
    if (homeSearchInput && typeof activeHomeType !== 'undefined') {
      homeSearchInput.placeholder = getI18nSearchPlaceholder(activeHomeType);
    }

    // ── Deity back button ──
    const deityBackButton = document.getElementById('deityBackButton');
    if (deityBackButton) deityBackButton.textContent = `← ${t('navBack')}`;

    // ── Deity tabs (if visible) — only re-render on lang switch, not initial load ──
    if (rerender && typeof activeDeityKey !== 'undefined' && activeDeityKey) {
      if (typeof showDeityPage === 'function') {
        showDeityPage(activeDeityKey, {
          initialTab: typeof activeDeityTab !== 'undefined' ? activeDeityTab : 'about',
          skipUrl: true,
        });
      }
    }

    // ── Re-render home grid to update tag labels — only on lang switch ──
    if (rerender && typeof renderHomeGrid === 'function' && typeof activeHomeType !== 'undefined') {
      renderHomeGrid(activeHomeType, typeof activeHomeSearchQuery !== 'undefined' ? activeHomeSearchQuery : '');
    }
  }

  // ── Public helper: map home type to translated search placeholder ──
  function getI18nSearchPlaceholder(typeId = 'all') {
    const map = {
      all: 'searchPlaceholderAll',
      'देव': 'searchPlaceholderDev',
      'देवी': 'searchPlaceholderDevi',
      'अवतार': 'searchPlaceholderAvatar',
      'ग्रह देव': 'searchPlaceholderGrahDev',
      'लोक देव': 'searchPlaceholderLokDev',
    };
    return t(map[typeId] || 'searchPlaceholderAll');
  }

  // ── Public helper: map home type to translated title ──
  function getI18nSectionTitle(typeId = 'all') {
    const map = {
      all: 'homeTitleAll',
      'देव': 'homeTitleDev',
      'देवी': 'homeTitleDevi',
      'अवतार': 'homeTitleAvatar',
      'ग्रह देव': 'homeTitleGrahDev',
      'लोक देव': 'homeTitleLokDev',
    };
    return t(map[typeId] || 'homeTitleAll');
  }

  // ── Public helper: map home type to translated subtitle ──
  function getI18nSectionSubtitle(typeId = 'all') {
    const map = {
      all: 'homeSubtitleAll',
      'देव': 'homeSubtitleDev',
      'देवी': 'homeSubtitleDevi',
      'अवतार': 'homeSubtitleAvatar',
      'ग्रह देव': 'homeSubtitleGrahDev',
      'लोक देव': 'homeSubtitleLokDev',
    };
    return t(map[typeId] || 'homeSubtitleAll');
  }

  // ── Public helper: translate a deity type key ──
  function getI18nDeityType(typeValue = '') {
    const map = {
      'देव': 'typeDev',
      'देवी': 'typeDevi',
      'अवतार': 'typeAvatar',
      'ग्रह देव': 'typeGrahDev',
      'लोक देव': 'typeLokDev',
    };
    return t(map[typeValue] || 'typeDev');
  }

  // ── Expose global API ──
  window.BhaktiI18n = {
    t,
    setI18nLang,
    applyI18n,
    getI18nSearchPlaceholder,
    getI18nSectionTitle,
    getI18nSectionSubtitle,
    getI18nDeityType,
    getCurrentLang: () => currentLang,
    translations,
  };

  // Convenience global shortcut
  window.t = t;

})();
