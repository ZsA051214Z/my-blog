const { readdir, readFile, writeFile } = require('fs/promises');
const { join, extname } = require('path');

const CONTENT_DIR = join(__dirname, 'content');
const OUTPUT = join(CONTENT_DIR, 'index.json');

async function build() {
  const files = (await readdir(CONTENT_DIR)).filter(f => extname(f) === '.md');
  const articles = [];

  for (const file of files) {
    const text = await readFile(join(CONTENT_DIR, file), 'utf-8');
    const meta = {};
    let body = text;
    if (text.startsWith('---')) {
      const end = text.indexOf('---', 3);
      if (end !== -1) {
        const yaml = text.substring(3, end).trim();
        body = text.substring(end + 3).trim();
        yaml.split('\n').forEach(line => {
          const i = line.indexOf(':');
          if (i !== -1) {
            const key = line.substring(0, i).trim();
            let val = line.substring(i + 1).trim();
            if (val.startsWith('[') && val.endsWith(']')) val = val.slice(1, -1).split(',').map(s => s.trim());
            meta[key] = val;
          }
        });
      }
    }
    const excerpt = body.replace(/[#*`\[\]()]/g, '').substring(0, 200).trim() + '...';
    articles.push({ file, ...meta, excerpt });
  }

  articles.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  await writeFile(OUTPUT, JSON.stringify(articles, null, 2));
  console.log(`已扫描 ${articles.length} 篇文章，索引已更新`);
}

build();
