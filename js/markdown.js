/**
 * Markdown file loader with front-matter parsing
 */

function parseFrontMatter(content) {
  const meta = {};
  let body = content;

  if (content.startsWith('---')) {
    const end = content.indexOf('---', 3);
    if (end !== -1) {
      const yaml = content.substring(3, end).trim();
      body = content.substring(end + 3).trim();

      yaml.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();
          // Parse arrays like [tag1, tag2]
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(s => s.trim());
          }
          meta[key] = value;
        }
      });
    }
  }

  return { meta, body };
}

async function loadMarkdownFile(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  const content = await response.text();
  const { meta, body } = parseFrontMatter(content);

  const html = marked.parse(body);

  return { meta, html, body };
}

// Article index - list of available markdown files
const ARTICLE_INDEX = [
  'hello-world.md',
  'web-dev-trends.md',
  'travel-notes.md',
  'javascript-tips.md',
  'reading-list.md',
  'creative-coding.md',
];

async function loadAllArticles() {
  const articles = [];

  for (const file of ARTICLE_INDEX) {
    try {
      const article = await loadMarkdownFile(`content/${file}`);
      articles.push({
        file,
        ...article.meta,
        excerpt: article.body.substring(0, 200).replace(/[#*`\[\]]/g, '').trim() + '...',
      });
    } catch (e) {
      console.warn(`Skipping ${file}:`, e.message);
    }
  }

  // Sort by date descending
  articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return articles;
}

function renderArticleCard(article, featured = false) {
  const tags = Array.isArray(article.tags) ? article.tags : [];
  const categoryMap = { tech: '技术', life: '生活', thoughts: '随想' };
  const categoryLabel = categoryMap[article.category] || article.category || '未分类';

  return `
    <div class="article-card ${featured ? 'featured' : ''}" data-category="${article.category || ''}" onclick="location.href='article.html?file=${article.file}'">
      <div class="card-image"></div>
      <div class="card-body">
        <div class="card-meta">
          <span class="card-category">${categoryLabel}</span>
          <span>${article.date || ''}</span>
        </div>
        <h3>${article.title || '无标题'}</h3>
        <p class="card-excerpt">${article.excerpt || ''}</p>
        <div class="card-tags">
          ${tags.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
  `;
}
