document.addEventListener('DOMContentLoaded', function () {
  var mount = document.getElementById('navLinks');
  if (!mount) return;

  var currentLang = mount.getAttribute('data-lang') || 'en';
  var currentPageSlug = mount.getAttribute('data-page') || 'index';

  // Category order shown in the nav, and which physical page slug represents each category's landing page.
  var CATEGORIES = ['home', 'mouse', 'keyboard', 'controller', 'audio', 'display'];
  var SLUG = { home: 'index', mouse: 'mouse', keyboard: 'keyboard', controller: 'controller-test', audio: 'audio-camera', display: 'display-test' };

  // Which category landing pages actually exist (translated) for each language.
  // 'home' always exists everywhere. Update this as more category hub pages get translated.
  var MANIFEST = {
    en: ['home', 'mouse', 'keyboard', 'controller', 'audio', 'display'],
    es: ['home', 'mouse', 'keyboard', 'controller', 'audio', 'display'],
    de: ['home', 'mouse', 'keyboard', 'controller', 'audio', 'display'],
    fr: ['home', 'mouse', 'keyboard', 'controller', 'audio', 'display'],
    pt: ['home'],
    zh: ['home'],
    hi: ['home', 'mouse'],
    ar: ['home', 'mouse'],
    id: ['home', 'mouse'],
  };

  // Maps every known page slug (across all categories, including sub-tool pages) to the
  // category it belongs to, so the correct nav item gets the "active" state.
  var PAGE_TO_CATEGORY = {
    index: 'home',
    mouse: 'mouse', 'cps-test': 'mouse', 'mouse-test': 'mouse', 'reaction-time-test': 'mouse',
    keyboard: 'keyboard', 'keyboard-test': 'keyboard',
    'controller-test': 'controller',
    'audio-camera': 'audio', 'mic-test': 'audio', 'webcam-test': 'audio',
    'display-test': 'display',
  };

  var LABELS = {
    en: { home: 'Home', mouse: 'Mouse', keyboard: 'Keyboard', controller: 'Controller', audio: 'Audio & Camera', display: 'Display' },
    es: { home: 'Inicio', mouse: 'Ratón', keyboard: 'Teclado', controller: 'Mando', audio: 'Audio y Cámara', display: 'Pantalla' },
    de: { home: 'Start', mouse: 'Maus', keyboard: 'Tastatur', controller: 'Controller', audio: 'Audio & Kamera', display: 'Bildschirm' },
    fr: { home: 'Accueil', mouse: 'Souris', keyboard: 'Clavier', controller: 'Manette', audio: 'Audio et Caméra', display: 'Écran' },
    pt: { home: 'Início', mouse: 'Mouse', keyboard: 'Teclado', controller: 'Controle', audio: 'Áudio e Câmera', display: 'Tela' },
    zh: { home: '首页', mouse: '鼠标', keyboard: '键盘', controller: '手柄', audio: '音频与摄像头', display: '显示器' },
    hi: { home: 'होम', mouse: 'माउस', keyboard: 'कीबोर्ड', controller: 'कंट्रोलर', audio: 'ऑडियो और कैमरा', display: 'डिस्प्ले' },
    ar: { home: 'الرئيسية', mouse: 'الفأرة', keyboard: 'لوحة المفاتيح', controller: 'يد التحكم', audio: 'الصوت والكاميرا', display: 'الشاشة' },
    id: { home: 'Beranda', mouse: 'Mouse', keyboard: 'Keyboard', controller: 'Kontroler', audio: 'Audio & Kamera', display: 'Layar' },
  };

  var UNAVAILABLE_TITLE = {
    en: 'Not translated yet', es: 'Aún no traducido', de: 'Noch nicht übersetzt', fr: 'Pas encore traduit',
    pt: 'Ainda não traduzido', zh: '尚未翻译', hi: 'अभी अनुवादित नहीं है', ar: 'لم تتم ترجمته بعد', id: 'Belum diterjemahkan',
  };

  var labels = LABELS[currentLang] || LABELS.en;
  var avail = MANIFEST[currentLang] || MANIFEST.en;
  var activeCategory = PAGE_TO_CATEGORY[currentPageSlug] || 'home';
  var unavailableTitle = UNAVAILABLE_TITLE[currentLang] || UNAVAILABLE_TITLE.en;

  // IMPORTANT: every href below is a bare filename resolved against the CURRENT folder.
  // At root that's the English page; inside /es/, /de/, etc. it's that language's own file.
  // This is deliberate: a category link never crosses into another language's folder.
  //
  // If a category isn't translated for this language, we do NOT link it to the homepage
  // as a "fallback" — that produces a dead click whenever the user is already on the
  // homepage (href === current URL, so the browser does nothing and the button looks
  // broken). Instead, untranslated categories render as a disabled, non-clickable item.
  var html = '';
  CATEGORIES.forEach(function (cat) {
    var isAvailable = avail.indexOf(cat) !== -1;
    if (isAvailable) {
      var cls = (cat === activeCategory) ? ' class="active"' : '';
      html += '<a href="' + SLUG[cat] + '.html"' + cls + '>' + labels[cat] + '</a>';
    } else {
      html += '<span class="nav-disabled" title="' + unavailableTitle + '" aria-disabled="true">' + labels[cat] + '</span>';
    }
  });

  mount.innerHTML = html;
});
