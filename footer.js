document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('siteFooter');
  if (!el) return;
  var lang = el.getAttribute('data-lang') || 'en';
  var base = el.getAttribute('data-base') || ''; // '' for root, '../' for language subfolders

  var T = {
    en: { mouse:'Mouse', keyboard:'Keyboard', controller:'Controller', audio:'Audio & Camera', display:'Display', legal:'Legal',
          scroll:'Scroll Test', cps:'CPS Test', mousetest:'Mouse Test', reaction:'Reaction Time Test', keyboardtest:'Keyboard Test',
          controllertest:'Controller Test', mic:'Mic Test', webcam:'Webcam Test', displaytest:'Display Test',
          privacy:'Privacy Policy', cookie:'Cookie Policy', rights:'© 2026 ScrollTester.studio. All rights reserved.' },
    es: { mouse:'Ratón', keyboard:'Teclado', controller:'Mando', audio:'Audio y Cámara', display:'Pantalla', legal:'Legal',
          scroll:'Test de Scroll', cps:'Test de CPS', mousetest:'Test de Ratón', reaction:'Test de Reacción', keyboardtest:'Test de Teclado',
          controllertest:'Test de Mando', mic:'Test de Micrófono', webcam:'Test de Cámara', displaytest:'Test de Pantalla',
          privacy:'Política de Privacidad', cookie:'Política de Cookies', rights:'© 2026 ScrollTester.studio. Todos los derechos reservados.' },
    fr: { mouse:'Souris', keyboard:'Clavier', controller:'Manette', audio:'Audio et Caméra', display:'Écran', legal:'Mentions légales',
          scroll:'Test de Défilement', cps:'Test de CPS', mousetest:'Test de Souris', reaction:'Test de Réaction', keyboardtest:'Test de Clavier',
          controllertest:'Test de Manette', mic:'Test de Micro', webcam:'Test de Webcam', displaytest:'Test d\u2019Écran',
          privacy:'Politique de Confidentialité', cookie:'Politique de Cookies', rights:'© 2026 ScrollTester.studio. Tous droits réservés.' },
    de: { mouse:'Maus', keyboard:'Tastatur', controller:'Controller', audio:'Audio & Kamera', display:'Bildschirm', legal:'Rechtliches',
          scroll:'Scroll-Test', cps:'CPS-Test', mousetest:'Maustest', reaction:'Reaktionstest', keyboardtest:'Tastaturtest',
          controllertest:'Controller-Test', mic:'Mikrofontest', webcam:'Webcam-Test', displaytest:'Bildschirmtest',
          privacy:'Datenschutzerklärung', cookie:'Cookie-Richtlinie', rights:'© 2026 ScrollTester.studio. Alle Rechte vorbehalten.' },
    pt: { mouse:'Mouse', keyboard:'Teclado', controller:'Controle', audio:'Áudio e Câmera', display:'Tela', legal:'Legal',
          scroll:'Teste de Rolagem', cps:'Teste de CPS', mousetest:'Teste de Mouse', reaction:'Teste de Reação', keyboardtest:'Teste de Teclado',
          controllertest:'Teste de Controle', mic:'Teste de Microfone', webcam:'Teste de Webcam', displaytest:'Teste de Tela',
          privacy:'Política de Privacidade', cookie:'Política de Cookies', rights:'© 2026 ScrollTester.studio. Todos os direitos reservados.' },
    zh: { mouse:'鼠标', keyboard:'键盘', controller:'手柄', audio:'音频与摄像头', display:'显示器', legal:'法律信息',
          scroll:'滚轮测试', cps:'CPS 测试', mousetest:'鼠标测试', reaction:'反应时间测试', keyboardtest:'键盘测试',
          controllertest:'手柄测试', mic:'麦克风测试', webcam:'摄像头测试', displaytest:'显示器测试',
          privacy:'隐私政策', cookie:'Cookie 政策', rights:'© 2026 ScrollTester.studio. 保留所有权利。' },
    hi: { mouse:'माउस', keyboard:'कीबोर्ड', controller:'कंट्रोलर', audio:'ऑडियो और कैमरा', display:'डिस्प्ले', legal:'कानूनी जानकारी',
          scroll:'स्क्रॉल टेस्ट', cps:'CPS टेस्ट', mousetest:'माउस टेस्ट', reaction:'रिएक्शन टाइम टेस्ट', keyboardtest:'कीबोर्ड टेस्ट',
          controllertest:'कंट्रोलर टेस्ट', mic:'माइक टेस्ट', webcam:'वेबकैम टेस्ट', displaytest:'डिस्प्ले टेस्ट',
          privacy:'गोपनीयता नीति', cookie:'कुकी नीति', rights:'© 2026 ScrollTester.studio. सर्वाधिकार सुरक्षित।' },
    ar: { mouse:'الفأرة', keyboard:'لوحة المفاتيح', controller:'يد التحكم', audio:'الصوت والكاميرا', display:'الشاشة', legal:'قانوني',
          scroll:'اختبار العجلة', cps:'اختبار CPS', mousetest:'اختبار الفأرة', reaction:'اختبار سرعة الاستجابة', keyboardtest:'اختبار لوحة المفاتيح',
          controllertest:'اختبار يد التحكم', mic:'اختبار الميكروفون', webcam:'اختبار الكاميرا', displaytest:'اختبار الشاشة',
          privacy:'سياسة الخصوصية', cookie:'سياسة ملفات تعريف الارتباط', rights:'© 2026 ScrollTester.studio. جميع الحقوق محفوظة.' },
    id: { mouse:'Mouse', keyboard:'Keyboard', controller:'Kontroler', audio:'Audio & Kamera', display:'Layar', legal:'Legal',
          scroll:'Tes Scroll', cps:'Tes CPS', mousetest:'Tes Mouse', reaction:'Tes Waktu Reaksi', keyboardtest:'Tes Keyboard',
          controllertest:'Tes Kontroler', mic:'Tes Mikrofon', webcam:'Tes Webcam', displaytest:'Tes Layar',
          privacy:'Kebijakan Privasi', cookie:'Kebijakan Cookie', rights:'© 2026 ScrollTester.studio. Semua hak dilindungi.' },
  };
  var t = T[lang] || T.en;

  // Which page slugs actually exist (translated) for each language.
  // Kept in sync with the MANIFEST in js/langswitch.js — update both when a page ships.
  var MANIFEST = {
    en: ['index','mouse','cps-test','mouse-test','reaction-time-test','keyboard','keyboard-test',
         'controller-test','audio-camera','mic-test','webcam-test','display-test','privacy-policy','cookie-policy'],
    es: ['index','mouse','cps-test','mouse-test','reaction-time-test','keyboard','keyboard-test',
         'controller-test','audio-camera','mic-test','webcam-test','display-test','privacy-policy','cookie-policy'],
    de: ['index','mouse','cps-test','mouse-test','reaction-time-test','keyboard','keyboard-test',
         'controller-test','audio-camera','mic-test','webcam-test','display-test','privacy-policy','cookie-policy'],
    fr: ['index','mouse','cps-test','mouse-test','reaction-time-test','keyboard','keyboard-test',
         'controller-test','audio-camera','mic-test','webcam-test','display-test','privacy-policy','cookie-policy'],
    pt: ['index'],
    zh: ['index'],
    hi: ['index','mouse'],
    ar: ['index','mouse'],
    id: ['index','mouse'],
  };
  var UNAVAILABLE_TITLE = {
    en: 'Not translated yet', es: 'Aún no traducido', de: 'Noch nicht übersetzt', fr: 'Pas encore traduit',
    pt: 'Ainda não traduzido', zh: '尚未翻译', hi: 'अभी अनुवादित नहीं है', ar: 'لم تتم ترجمته بعد', id: 'Belum diterjemahkan',
  };
  var avail = MANIFEST[lang] || MANIFEST.en;
  var unavailableTitle = UNAVAILABLE_TITLE[lang] || UNAVAILABLE_TITLE.en;

  // A footer link only ever points into the CURRENT language's own folder (never crosses
  // into English via `base`, which was the bug: it silently sent people to English pages
  // while showing translated text). If a page isn't translated yet, it renders disabled.
  function link(slug, label) {
    if (avail.indexOf(slug) !== -1) {
      return '<a href="' + slug + '.html">' + label + '</a>';
    }
    return '<span class="footer-disabled" title="' + unavailableTitle + '" aria-disabled="true">' + label + '</span>';
  }

  el.innerHTML = `
  <div class="wrap footer-grid">
    <div class="footer-col">
      <h4>${t.mouse}</h4>
      ${link('index', t.scroll)}
      ${link('cps-test', t.cps)}
      ${link('mouse-test', t.mousetest)}
      ${link('reaction-time-test', t.reaction)}
    </div>
    <div class="footer-col">
      <h4>${t.keyboard}</h4>
      ${link('keyboard-test', t.keyboardtest)}
    </div>
    <div class="footer-col">
      <h4>${t.controller}</h4>
      ${link('controller-test', t.controllertest)}
    </div>
    <div class="footer-col">
      <h4>${t.audio}</h4>
      ${link('mic-test', t.mic)}
      ${link('webcam-test', t.webcam)}
    </div>
    <div class="footer-col">
      <h4>${t.display}</h4>
      ${link('display-test', t.displaytest)}
    </div>
    <div class="footer-col">
      <h4>${t.legal}</h4>
      ${link('privacy-policy', t.privacy)}
      ${link('cookie-policy', t.cookie)}
    </div>
  </div>
  <div class="wrap footer-bottom">${t.rights}</div>
  `;
});
