/**
 * Main application logic
 */

// ===== Theme Toggle =====
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);

  // Update highlight.js theme
  const hljsLink = document.getElementById('hljs-theme');
  if (hljsLink) {
    hljsLink.href = next === 'dark'
      ? 'css/github-dark.min.css'
      : 'css/github.min.css';
  }
}

// ===== Mobile Nav =====
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== Back to Top =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== Article Filter =====
function initFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      document.querySelectorAll('.article-card').forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          // Re-trigger animation
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s, transform 0.4s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== Load Articles on Index =====
async function initArticles() {
  const grid = document.getElementById('articlesGrid');
  if (!grid || typeof loadAllArticles !== 'function') return;

  try {
    const articles = await loadAllArticles();

    if (articles.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-secondary);">
          <p style="font-size:1.2rem;margin-bottom:0.5rem;">还没有文章</p>
          <p>在 <code>content/</code> 目录下添加 Markdown 文件即可显示。</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = articles.map((article, i) =>
      renderArticleCard(article, i === 0)
    ).join('');

    initScrollAnimations();
    initFilter();
  } catch (e) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-secondary);">
        <p>文章加载失败，请确保通过 HTTP 服务器访问（不能直接打开 HTML 文件）。</p>
        <p style="margin-top:0.5rem;font-size:0.9rem;">运行 <code>python -m http.server 8080</code> 或 <code>npx serve</code> 启动本地服务器。</p>
      </div>
    `;
  }
}

// ===== Navbar Scroll Effect =====
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 100) {
      navbar.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
      navbar.style.boxShadow = 'none';
    }
    lastScroll = current;
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initHamburger();
  initScrollAnimations();
  initBackToTop();
  initNavScroll();
  initArticles();

  // Theme toggle click
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
});
