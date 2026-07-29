const FCXD = {
  nav: { 
    zh: ['首页', '关于我们', '章程', '理事会与成员', '活动与项目', '加入我们', '联系'], 
    en: ['Home', 'About', 'Statutes', 'Board & Members', 'Activities', 'Join us', 'Contact'], 
    de: ['Start', 'Über uns', 'Satzung', 'Vorstand & Mitglieder', 'Aktivitäten', 'Mitmachen', 'Kontakt'] 
  },
  
  paths: [
    'index.html', 
    'about.html', 
    'statutes.html', 
    'vorstand.html', 
    'activities.html', 
    'join.html', 
    'contact.html'
  ],

  header(current) {
    // 拆分逻辑，避免多重嵌套模板字符串导致解析异常
    const links = this.paths.map((p, i) => {
      const isCurrent = p === current ? 'aria-current="page"' : '';
      return ['zh', 'en', 'de'].map(l => 
        `<a class="lang" data-lang="${l}" ${isCurrent} href="${p}">${this.nav[l][i]}</a>`
      ).join('');
    }).join('');

    return `
      <header>
        <div class="wrap">
          <div class="brand">
            <a href="index.html">
              <strong>德国中国新疆友协</strong>
              <strong>Freundeskreis China-Xinjiang in Deutschland</strong>
              <span>nichteingetragener Verein · 非注册协会 · unregistered association</span>
            </a>
          </div>
          <div class="bar">
            <nav aria-label="Main navigation">
              ${links}
            </nav>
            <div class="language" aria-label="Language selection">
              <button data-set-lang="zh">中文</button>
              <button data-set-lang="en">EN</button>
              <button data-set-lang="de">DE</button>
            </div>
          </div>
        </div>
      </header>
    `;
  },

  footer() { 
    return `
      <footer>
        <div class="wrap">
          <div class="footer-links">
            <a href="impressum.html">Impressum</a>
            <a href="privacy.html">Datenschutz / Privacy / 隐私</a>
          </div>
          <p class="lang" data-lang="zh">德国中国新疆友协 · 非注册协会 · 文化交流与友谊</p>
          <p class="lang" data-lang="en">Freundeskreis China-Xinjiang in Deutschland · Unregistered association · Cultural exchange and friendship</p>
          <p class="lang" data-lang="de">Freundeskreis China-Xinjiang in Deutschland · Nichteingetragener Verein · Kultureller Austausch und Freundschaft</p>
          <p>© <span id="year"></span> Freundeskreis China-Xinjiang in Deutschland</p>
        </div>
      </footer>
    `; 
  },

  // 语言切换控制函数
  setLanguage(lang) {
    localStorage.setItem('preferred_lang', lang);
    document.querySelectorAll('[data-lang]').forEach(el => {
      if (el.getAttribute('data-lang') === lang) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
  },

  render(current) { 
    const headerEl = document.querySelector('[data-header]');
    const footerEl = document.querySelector('[data-footer]');
    
    if (headerEl) headerEl.innerHTML = this.header(current); 
    if (footerEl) footerEl.innerHTML = this.footer(); 

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 绑定语言切换按钮事件
    document.querySelectorAll('[data-set-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.target.getAttribute('data-set-lang');
        this.setLanguage(lang);
      });
    });

    // 读取已选语言或默认显示中文 ('zh')
    const savedLang = localStorage.getItem('preferred_lang') || 'zh';
    this.setLanguage(savedLang);
  }
};