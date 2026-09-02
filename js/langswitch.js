document.addEventListener('DOMContentLoaded', function () {
  var mount = document.getElementById('langSwitchMount');
  if (!mount) return;

  var currentLang = mount.getAttribute('data-lang') || 'en';
  var slug = mount.getAttribute('data-page') || 'index';
  var base = mount.getAttribute('data-base') || ''; // '' at root, '../' inside a language subfolder

  // Which page slugs actually exist for each language. Update this list as more pages are translated.
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
  var NAMES = { en:'English', es:'Español', de:'Deutsch', fr:'Français', pt:'Português', zh:'中文', hi:'हिन्दी', ar:'العربية', id:'Bahasa Indonesia' };
  var FLAGS = { en:'🌐 EN', es:'🌐 ES', de:'🌐 DE', fr:'🌐 FR', pt:'🌐 PT', zh:'🌐 中文', hi:'🌐 हिन्दी', ar:'🌐 عربي', id:'🌐 ID' };
  var ORDER = ['en','es','fr','de','pt','zh','hi','ar','id'];

  function pathFor(lang, targetSlug){
    var file = targetSlug + '.html';
    if (lang === currentLang) return file;
    if (lang === 'en') return base + file;
    if (currentLang === 'en') return lang + '/' + file;
    return base + lang + '/' + file;
  }

  var html = '<details class="lang-switch"><summary>' + (FLAGS[currentLang] || FLAGS.en) + '</summary><div class="lang-menu">';
  ORDER.forEach(function (lang) {
    var avail = MANIFEST[lang] || ['index'];
    var targetSlug = avail.indexOf(slug) !== -1 ? slug : 'index';
    var href = pathFor(lang, targetSlug);
    var cls = lang === currentLang ? ' class="current"' : '';
    html += '<a href="' + href + '"' + cls + '>' + NAMES[lang] + '</a>';
  });
  html += '</div></details>';

  mount.outerHTML = html;
});
