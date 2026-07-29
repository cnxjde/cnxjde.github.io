(function () {
  const supported = ['zh', 'en', 'de'];
  function setLanguage(lang) {
    if (!supported.includes(lang)) lang = 'de';
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : lang;
    document.querySelectorAll('.lang').forEach(el => el.classList.toggle('active', el.dataset.lang === lang));
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      const on = btn.dataset.setLang === lang;
      btn.classList.toggle('active', on); btn.setAttribute('aria-pressed', String(on));
    });
    try { localStorage.setItem('fcxd-language', lang); } catch (_) {}
  }
  document.addEventListener('DOMContentLoaded', () => {
    let saved = ''; try { saved = localStorage.getItem('fcxd-language') || ''; } catch (_) {}
    const browser = (navigator.language || 'de').slice(0, 2);
    setLanguage(supported.includes(saved) ? saved : (supported.includes(browser) ? browser : 'de'));
    document.querySelectorAll('[data-set-lang]').forEach(btn => btn.addEventListener('click', () => setLanguage(btn.dataset.setLang)));
  });
}());
