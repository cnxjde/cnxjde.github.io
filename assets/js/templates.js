const FCXD = {
  nav: { zh:['首页','关于我们','章程','活动与项目','加入我们','联系'], en:['Home','About','Statutes','Activities','Join us','Contact'], de:['Start','Über uns','Satzung','Aktivitäten','Mitmachen','Kontakt'] },
  paths:['index.html','about.html','statutes.html','activities.html','join.html','contact.html'],
  header(current) {
    const links = this.paths.map((p,i) => ['zh','en','de'].map(l => `<a class="lang" data-lang="${l}" ${p===current?'aria-current="page"':''} href="${p}">${this.nav[l][i]}</a>`).join('')).join('');
    return `<header><div class="wrap"><div class="brand"><a href="index.html"><strong>德国中国新疆友协</strong><strong>Freundeskreis China-Xinjiang in Deutschland</strong><span>nichteingetragener Verein · 非注册协会 · unregistered association</span></a></div><div class="bar"><nav aria-label="Main navigation">${links}</nav><div class="language" aria-label="Language selection"><button data-set-lang="zh">中文</button><button data-set-lang="en">EN</button><button data-set-lang="de">DE</button></div></div></div></header>`;
  },
  footer() { return `<footer><div class="wrap"><div class="footer-links"><a href="impressum.html">Impressum</a><a href="privacy.html">Datenschutz / Privacy / 隐私</a></div><p class="lang" data-lang="zh">德国中国新疆友协 · 非注册协会 · 文化交流与友谊</p><p class="lang" data-lang="en">Freundeskreis China-Xinjiang in Deutschland · Unregistered association · Cultural exchange and friendship</p><p class="lang" data-lang="de">Freundeskreis China-Xinjiang in Deutschland · Nichteingetragener Verein · Kultureller Austausch und Freundschaft</p><p>© <span id="year"></span> Freundeskreis China-Xinjiang in Deutschland</p></div></footer>`; },
  render(current) { document.querySelector('[data-header]').innerHTML=this.header(current); document.querySelector('[data-footer]').innerHTML=this.footer(); document.getElementById('year').textContent=new Date().getFullYear(); }
};
