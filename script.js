/* ═══════════════════════════════════════════════════
   NAVEEN VAYILAPALLI PORTFOLIO — script.js
   ═══════════════════════════════════════════════════ */

/* ─── DATA ─── */
const SKILLS = [
  { name:'Python',        cat:'big-data', icon:'🐍', lvl:92 },
  { name:'PySpark',       cat:'big-data', icon:'⚡', lvl:90 },
  { name:'Spark SQL',     cat:'big-data', icon:'🔥', lvl:88 },
  { name:'Pandas',        cat:'big-data', icon:'🐼', lvl:88 },
  { name:'Databricks',    cat:'big-data', icon:'🧱', lvl:90 },
  { name:'dbt',           cat:'big-data', icon:'🔧', lvl:76 },
  { name:'Structured Streaming', cat:'big-data', icon:'🌊', lvl:80 },
  { name:'AWS',           cat:'cloud',    icon:'☁️', lvl:50 },
  { name:'Azure',         cat:'cloud',    icon:'🔵', lvl:80 },
  { name:'Terraform',     cat:'cloud',    icon:'🏗', lvl:80 },
  { name:'AWS Glue',      cat:'cloud',    icon:'🔗', lvl:78 },
  { name:'ADLS Gen2',     cat:'cloud',    icon:'💾', lvl:80 },
  { name:'PostgreSQL',    cat:'database', icon:'🐘', lvl:90 },
  { name:'MySQL',         cat:'database', icon:'🗄', lvl:83 },
  { name:'MongoDB',       cat:'database', icon:'🍃', lvl:75 },
  { name:'Delta Tables',  cat:'database', icon:'△', lvl:90 },
  { name:'Apache Airflow',cat:'tools',    icon:'🌀', lvl:88 },
  { name:'Power BI',      cat:'tools',    icon:'📊', lvl:80 },
  { name:'FastAPI',       cat:'tools',    icon:'⚡', lvl:60 },
  { name:'Git & GitHub',  cat:'tools',    icon:'🐙', lvl:85 },
  { name:'Data Modelling',cat:'tools',    icon:'📐', lvl:88 },
];

const PROJECTS = [
  {
    id:1, icon:'⚡',
    title:'PySpark-Airflow ETL Pipeline',
    desc:'Production-grade ETL using PySpark, Airflow TaskFlow API, and Delta Lake Bronze→Silver→Gold Medallion Architecture with YAML-driven configurable ingestion.',
    tags:['PySpark','Airflow','Delta Lake','YAML'],
    filter:'pyspark',
    url:'https://github.com/NaveenVayilapalli007/pyspark-airflow-etl-pipeline',
  },
  {
    id:2, icon:'🏗',
    title:'AWS Enterprise Platform (Terraform)',
    desc:'Infrastructure-as-Code project provisioning a scalable, secure AWS enterprise platform including VPC, EC2, S3, IAM roles, and security groups.',
    tags:['Terraform','AWS','IaC','VPC','IAM'],
    filter:'terraform',
    url:'https://github.com/NaveenVayilapalli007/terraform-aws-enterprise-platform',
  },
  {
    id:3, icon:'🧱',
    title:'Enterprise Lakehouse Platform',
    desc:'Production lakehouse using Databricks Asset Bundles (DAB), Terraform & Delta Live Tables. Auto Loader streaming, Unity Catalog governance, multi-env CI/CD (dev/stage/prod).',
    tags:['Databricks','Terraform','Delta Live Tables','PySpark'],
    filter:'databricks',
    url:'https://github.com/NaveenVayilapalli007/enterprise-lakehouse-platform-dab-iac',
  },
];

const TYPEWRITER_LINES = [
  'Building scalable data pipelines...',
  'Designing Medallion Architectures...',
  'Orchestrating with Apache Airflow...',
  'Optimizing Spark workloads...',
  'Automating infra with Terraform...',
  'Turning raw data into insights...',
];

/* ─── STATE ─── */
let blogPosts = [];
let editingPostId = null;
let currentViewId  = null;
let activeTagFilter = null;
let cmdFocusIdx = -1;
let deleteConfirmResolve = null;
let autosaveTimer = null;
const BLOG_KEY = 'nv_blog_posts_v2';

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDatetime();
  initReadingProgress();
  initNavbar();
  initHeroCanvas();
  initTypewriter();
  initStats();
  initFadeIn();
  renderSkills();
  renderProjects();
  loadBlogPosts();
  initBlog();
  initCommandPalette();
  initBackToTop();
  initScrollSpy();
  initMarkdown();
});

/* ═══ THEME ═══ */
function initTheme() {
  const saved = localStorage.getItem('nv_theme') || 'dark';
  setTheme(saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
}
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('nv_theme', t);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '🌙' : '☀️';
  const hlCss = document.getElementById('hljs-css');
  if (hlCss) {
    hlCss.href = t === 'dark'
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
  }
}

/* ═══ DATETIME ═══ */
function initDatetime() {
  const el = document.getElementById('datetime');
  if (!el) return;
  function update() {
    const n = new Date();
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let h = n.getHours(), m = n.getMinutes(), s = n.getSeconds();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const pad = v => String(v).padStart(2,'0');
    el.textContent = `${days[n.getDay()]} ${pad(n.getDate())} ${months[n.getMonth()]} ${n.getFullYear()} · ${pad(h)}:${pad(m)}:${pad(s)} ${ampm}`;
  }
  update(); setInterval(update, 1000);
}

/* ═══ READING PROGRESS ═══ */
function initReadingProgress() {
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
  });
}

/* ═══ NAVBAR ═══ */
function initNavbar() {
  const nav   = document.getElementById('navbar');
  const ham   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobile-menu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });

  ham.addEventListener('click', () => {
    const open = ham.classList.toggle('open');
    ham.setAttribute('aria-expanded', open);
    menu.classList.toggle('hidden', !open);
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mob-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.add('hidden');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded', false);
    });
  });
}

/* ═══ HERO CANVAS ═══ */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  function rand(a, b) { return a + Math.random() * (b - a); }

  function mkDots() {
    dots = [];
    const n = Math.min(80, Math.floor((W * H) / 10000));
    for (let i = 0; i < n; i++) {
      dots.push({ x: rand(0,W), y: rand(0,H), vx: rand(-0.3,0.3), vy: rand(-0.3,0.3), r: rand(1.5,3) });
    }
  }
  mkDots();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const dotColor = isDark ? 'rgba(0,200,255,' : 'rgba(255,255,255,';

    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fillStyle = dotColor + '0.6)';
      ctx.fill();
    });

    // Lines
    for (let i = 0; i < dots.length; i++) {
      for (let j = i+1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = dotColor + (0.15 * (1 - dist/130)) + ')';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══ TYPEWRITER ═══ */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  let li = 0, ci = 0, deleting = false;

  function type() {
    const line = TYPEWRITER_LINES[li];
    if (!deleting) {
      el.textContent = line.slice(0, ++ci);
      if (ci === line.length) { deleting = true; setTimeout(type, 2000); return; }
      setTimeout(type, 55);
    } else {
      el.textContent = line.slice(0, --ci);
      if (ci === 0) { deleting = false; li = (li+1) % TYPEWRITER_LINES.length; setTimeout(type, 400); return; }
      setTimeout(type, 28);
    }
  }
  type();
}

/* ═══ STAT COUNTERS ═══ */
function initStats() {
  const els = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.target);
      const dec    = parseInt(el.dataset.dec) || 0;
      const dur = 1400, start = Date.now();
      const tick = () => {
        const p = Math.min((Date.now()-start)/dur, 1);
        const ease = 1 - Math.pow(1-p, 3);
        el.textContent = (target * ease).toFixed(dec);
        if (p < 1) requestAnimationFrame(tick);
      };
      tick();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

/* ═══ FADE IN ═══ */
function initFadeIn() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

/* ═══ SKILLS ═══ */
function renderSkills(filter='all') {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const list = filter === 'all' ? SKILLS : SKILLS.filter(s => s.cat === filter);
  list.forEach(s => {
    const card = document.createElement('div');
    card.className = 'skill-card fade-in';
    card.innerHTML = `
      <span class="sk-emoji">${s.icon}</span>
      <span class="sk-name">${s.name}</span>
      <div class="sk-bar-wrap"><div class="sk-bar" style="width:0%" data-w="${s.lvl}%"></div></div>
      <div class="sk-level">${s.lvl}%</div>`;
    grid.appendChild(card);
    // animate bar
    setTimeout(() => { const bar = card.querySelector('.sk-bar'); if (bar) bar.style.width = bar.dataset.w; }, 100);
  });
  // re-run fade-in
  setTimeout(() => {
    document.querySelectorAll('.skill-card.fade-in:not(.visible)').forEach(el => el.classList.add('visible'));
  }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.sk-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.sk-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSkills(tab.dataset.tab);
    });
  });
});

/* ═══ PROJECTS ═══ */
function renderProjects(filter='all') {
  const grid = document.getElementById('project-grid');
  if (!grid) return;
  grid.innerHTML = '';
  PROJECTS.forEach(p => {
    const hide = filter !== 'all' && p.filter !== filter;
    const card = document.createElement('div');
    card.className = `proj-card fade-in${hide ? ' filtered-out' : ''}`;
    card.innerHTML = `
      <div class="proj-icon">${p.icon}</div>
      <h3>${p.title}</h3>
      <p class="proj-desc">${p.desc}</p>
      <div class="proj-tags">${p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
      <a href="${p.url}" target="_blank" rel="noopener" class="proj-link">🔗 View on GitHub</a>`;
    grid.appendChild(card);
    setTimeout(() => card.classList.add('visible'), 100);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.flt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.flt-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProjects(btn.dataset.filter);
    });
  });
});

/* ═══ SCROLL SPY ═══ */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => obs.observe(s));
}

/* ═══ BACK TO TOP ═══ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('hidden', window.scrollY < 400));
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ═══ MARKED + HIGHLIGHT ═══ */
function initMarkdown() {
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      highlight: (code, lang) => {
        if (typeof hljs !== 'undefined' && lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return typeof hljs !== 'undefined' ? hljs.highlightAuto(code).value : code;
      },
      breaks: true,
      gfm: true,
    });
  }
}

function parseMarkdown(md) {
  if (typeof marked !== 'undefined') return marked.parse(md || '');
  return `<pre>${md}</pre>`;
}

/* ═══════════════════════════
   BLOG SYSTEM
   ═══════════════════════════ */
function loadBlogPosts() {
  try {
    blogPosts = JSON.parse(localStorage.getItem(BLOG_KEY) || '[]');
  } catch { blogPosts = []; }
}
function saveBlogPosts() {
  localStorage.setItem(BLOG_KEY, JSON.stringify(blogPosts));
}
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function wordCount(text) { return text.trim() ? text.trim().split(/\s+/).length : 0; }
function readTime(words) { return Math.max(1, Math.round(words / 200)); }
function excerpt(md, len=160) {
  return md.replace(/#+\s*/g,'').replace(/[*_`\[\]!]/g,'').slice(0,len).trim() + (md.length > len ? '...' : '');
}
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
}

/* ─── BLOG INIT ─── */
function initBlog() {
  renderBlog();

  document.getElementById('new-post-btn').addEventListener('click', openEditorNew);
  document.getElementById('save-post-btn').addEventListener('click', savePost);
  document.getElementById('close-editor').addEventListener('click', closeEditor);
  document.getElementById('editor-bg').addEventListener('click', closeEditor);

  document.getElementById('close-view').addEventListener('click', closeView);
  document.getElementById('view-bg').addEventListener('click', closeView);
  document.getElementById('view-edit-btn').addEventListener('click', () => { closeView(); openEditorEdit(currentViewId); });

  // Editor view switcher
  document.getElementById('vsw-write').addEventListener('click', () => setViewMode('write'));
  document.getElementById('vsw-split').addEventListener('click', () => setViewMode('split'));
  document.getElementById('vsw-preview').addEventListener('click', () => setViewMode('preview'));

  // Markdown toolbar
  document.querySelectorAll('.tb').forEach(btn => {
    btn.addEventListener('click', () => applyToolbarAction(btn.dataset.a));
  });

  // Live preview + word count
  const ta = document.getElementById('md-textarea');
  if (ta) {
    ta.addEventListener('input', () => {
      updateWordCount();
      updateLivePreview();
      scheduleAutosave();
    });
  }

  // Search + filter
  document.getElementById('blog-search').addEventListener('input', renderBlog);

  // Confirm dialog
  document.getElementById('confirm-bg').addEventListener('click', () => { if (deleteConfirmResolve) deleteConfirmResolve(false); hideConfirm(); });
  document.getElementById('confirm-yes').addEventListener('click', () => { if (deleteConfirmResolve) deleteConfirmResolve(true); hideConfirm(); });
  document.getElementById('confirm-no').addEventListener('click', () => { if (deleteConfirmResolve) deleteConfirmResolve(false); hideConfirm(); });

  // Export/Import
  document.getElementById('export-btn').addEventListener('click', exportPosts);
  document.getElementById('import-file').addEventListener('change', importPosts);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeEditor(); closeView(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && !document.getElementById('editor-modal').classList.contains('hidden')) {
      e.preventDefault(); savePost();
    }
  });
}

/* ─── RENDER BLOG ─── */
function renderBlog() {
  const grid = document.getElementById('blog-grid');
  const search = (document.getElementById('blog-search')?.value || '').toLowerCase();
  let posts = [...blogPosts].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (search)           posts = posts.filter(p => p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search) || p.tags.some(t=>t.toLowerCase().includes(search)));
  if (activeTagFilter)  posts = posts.filter(p => p.tags.map(t=>t.toLowerCase()).includes(activeTagFilter.toLowerCase()));

  renderTagFilter();

  if (!posts.length) {
    grid.innerHTML = blogPosts.length === 0
      ? `<div class="empty-state"><div class="empty-icon">📝</div><h3>No posts yet</h3><p>Click <strong>New Post</strong> to write your first blog post in Markdown!</p></div>`
      : `<div class="empty-state"><div class="empty-icon">🔍</div><h3>No results</h3><p>No posts match your search. Try a different keyword or tag.</p></div>`;
    return;
  }

  grid.innerHTML = posts.map(p => {
    const wc   = wordCount(p.content);
    const tags = p.tags.map(t => `<span class="blog-card-tag">${t}</span>`).join('');
    return `
      <div class="blog-card" data-id="${p.id}" onclick="openView('${p.id}')">
        ${tags ? `<div class="blog-card-tags">${tags}</div>` : ''}
        <h3>${escHtml(p.title)}</h3>
        <p class="blog-excerpt">${escHtml(excerpt(p.content))}</p>
        <div class="blog-meta">
          <span>${fmtDate(p.createdAt)}</span>
          <span>~${readTime(wc)} min read</span>
          <div class="blog-card-actions" onclick="event.stopPropagation()">
            <button class="blog-action-btn" onclick="openEditorEdit('${p.id}')">✏️</button>
            <button class="blog-action-btn del" onclick="deletePost('${p.id}')">🗑</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

function renderTagFilter() {
  const bar = document.getElementById('blog-tags-bar');
  if (!bar) return;
  const all = [...new Set(blogPosts.flatMap(p => p.tags))].sort();
  if (!all.length) { bar.innerHTML = ''; return; }
  bar.innerHTML = `
    <button class="tag-pill${!activeTagFilter?' active':''}" onclick="setTagFilter(null)">All</button>
    ${all.map(t=>`<button class="tag-pill${activeTagFilter===t?' active':''}" onclick="setTagFilter('${t}')">${t}</button>`).join('')}`;
}

window.setTagFilter = function(tag) {
  activeTagFilter = tag;
  renderBlog();
};

/* ─── OPEN / CLOSE EDITOR ─── */
function openEditorNew() {
  editingPostId = null;
  document.getElementById('editor-title').textContent = 'New Post';
  document.getElementById('inp-title').value = '';
  document.getElementById('inp-tags').value = '';
  document.getElementById('md-textarea').value = '';
  document.getElementById('md-preview').innerHTML = '';
  updateWordCount();
  setViewMode('write');
  openModal('editor-modal');
  setTimeout(() => document.getElementById('inp-title').focus(), 100);
}

window.openEditorEdit = function(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) return;
  editingPostId = id;
  document.getElementById('editor-title').textContent = 'Edit Post';
  document.getElementById('inp-title').value = post.title;
  document.getElementById('inp-tags').value  = post.tags.join(', ');
  document.getElementById('md-textarea').value = post.content;
  updateWordCount();
  updateLivePreview();
  setViewMode('write');
  openModal('editor-modal');
};

function closeEditor() {
  closeModal('editor-modal');
  clearAutosave();
}

/* ─── SAVE POST ─── */
function savePost() {
  const title   = document.getElementById('inp-title').value.trim();
  const content = document.getElementById('md-textarea').value.trim();
  const rawTags = document.getElementById('inp-tags').value;
  const tags    = rawTags.split(',').map(t=>t.trim()).filter(Boolean);

  if (!title) { showToast('Please add a title!', 'err'); document.getElementById('inp-title').focus(); return; }
  if (!content) { showToast('Post content cannot be empty!', 'err'); return; }

  if (editingPostId) {
    const idx = blogPosts.findIndex(p => p.id === editingPostId);
    if (idx > -1) {
      blogPosts[idx] = { ...blogPosts[idx], title, content, tags, updatedAt: new Date().toISOString() };
    }
  } else {
    blogPosts.unshift({ id: genId(), title, content, tags, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }

  saveBlogPosts();
  renderBlog();
  closeEditor();
  showToast(editingPostId ? 'Post updated ✓' : 'Post published ✓', 'ok');
}

/* ─── DELETE POST ─── */
window.deletePost = async function(id) {
  const confirmed = await showConfirm('Delete this post permanently?');
  if (!confirmed) return;
  blogPosts = blogPosts.filter(p => p.id !== id);
  saveBlogPosts();
  renderBlog();
  showToast('Post deleted', 'ok');
};

/* ─── VIEW POST ─── */
window.openView = function(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) return;
  currentViewId = id;
  document.getElementById('view-title').textContent = post.title;
  const wc = wordCount(post.content);
  document.getElementById('view-meta').innerHTML = `
    <span>${fmtDate(post.createdAt)}</span>
    <span>~${readTime(wc)} min read</span>
    ${post.tags.map(t=>`<span class="blog-card-tag">${t}</span>`).join('')}`;
  document.getElementById('view-body').innerHTML = parseMarkdown(post.content);
  if (typeof hljs !== 'undefined') {
    document.querySelectorAll('#view-body pre code').forEach(b => hljs.highlightElement(b));
  }
  openModal('view-modal');
};

function closeView() {
  closeModal('view-modal');
  currentViewId = null;
}

/* ─── VIEW MODE (write/split/preview) ─── */
function setViewMode(mode) {
  const writePn = document.getElementById('write-pane');
  const prevPn  = document.getElementById('preview-pane');
  const panes   = document.getElementById('panes');
  document.querySelectorAll('.vsw').forEach(b => b.classList.remove('active'));

  panes.classList.remove('split');
  if (mode === 'write') {
    writePn.classList.remove('hidden'); prevPn.classList.add('hidden');
    document.getElementById('vsw-write').classList.add('active');
  } else if (mode === 'preview') {
    writePn.classList.add('hidden'); prevPn.classList.remove('hidden');
    updateLivePreview();
    document.getElementById('vsw-preview').classList.add('active');
  } else {
    writePn.classList.remove('hidden'); prevPn.classList.remove('hidden');
    panes.classList.add('split');
    updateLivePreview();
    document.getElementById('vsw-split').classList.add('active');
  }
}

function updateLivePreview() {
  const content = document.getElementById('md-textarea')?.value || '';
  const prev = document.getElementById('md-preview');
  if (!prev) return;
  prev.innerHTML = parseMarkdown(content);
  if (typeof hljs !== 'undefined') {
    prev.querySelectorAll('pre code').forEach(b => hljs.highlightElement(b));
  }
}

function updateWordCount() {
  const content = document.getElementById('md-textarea')?.value || '';
  const wc = wordCount(content);
  const rt = readTime(wc);
  const wcEl = document.getElementById('wc-display');
  const rtEl = document.getElementById('rt-display');
  if (wcEl) wcEl.textContent = `${wc} word${wc!==1?'s':''}`;
  if (rtEl) rtEl.textContent = `~${rt} min read`;
}

/* ─── AUTOSAVE DRAFT ─── */
function scheduleAutosave() {
  clearAutosave();
  const ind = document.getElementById('autosave-ind');
  if (ind) { ind.textContent = '· editing'; ind.className = 'as-saving'; }
  autosaveTimer = setTimeout(() => {
    if (ind) { ind.textContent = '✓ Saved'; ind.className = 'as-ok'; }
  }, 1500);
}
function clearAutosave() { if (autosaveTimer) clearTimeout(autosaveTimer); }

/* ─── MARKDOWN TOOLBAR ACTIONS ─── */
function applyToolbarAction(action) {
  const ta = document.getElementById('md-textarea');
  if (!ta) return;
  const start = ta.selectionStart, end = ta.selectionEnd;
  const sel = ta.value.slice(start, end);
  const before = ta.value.slice(0, start);
  const after  = ta.value.slice(end);

  const wrap = (pre, suf='', def='text') => {
    const text = sel || def;
    ta.value = before + pre + text + suf + after;
    const ns = start + pre.length, ne = ns + text.length;
    ta.setSelectionRange(ns, ne); ta.focus();
  };
  const prepend = (ch, def='Text') => {
    const bol = before.lastIndexOf('\n') + 1;
    const lineStart = ta.value.slice(0, bol);
    const restLine  = ta.value.slice(bol);
    ta.value = lineStart + ch + (sel || def) + restLine;
    ta.setSelectionRange(bol + ch.length, bol + ch.length + (sel||def).length);
    ta.focus();
  };

  const actions = {
    h1:        () => prepend('# ', 'Heading 1'),
    h2:        () => prepend('## ', 'Heading 2'),
    h3:        () => prepend('### ', 'Heading 3'),
    bold:      () => wrap('**','**','bold text'),
    italic:    () => wrap('*','*','italic text'),
    strike:    () => wrap('~~','~~','strikethrough'),
    code:      () => wrap('`','`','code'),
    codeblock: () => { const lang = 'python'; ta.value = before + '\n```' + lang + '\n' + (sel||'# code here') + '\n```\n' + after; ta.focus(); },
    link:      () => { const url = prompt('Enter URL:', 'https://'); if(url) ta.value = before + `[${sel||'link text'}](${url})` + after; ta.focus(); },
    image:     () => { const url = prompt('Enter image URL:', 'https://'); if(url) ta.value = before + `![${sel||'alt text'}](${url})` + after; ta.focus(); },
    ul:        () => { const lines = (sel||'Item 1\nItem 2').split('\n').map(l=>'- '+l).join('\n'); ta.value = before + lines + after; ta.focus(); },
    ol:        () => { const lines = (sel||'Item 1\nItem 2').split('\n').map((l,i)=>`${i+1}. `+l).join('\n'); ta.value = before + lines + after; ta.focus(); },
    check:     () => { const lines = (sel||'Task 1\nTask 2').split('\n').map(l=>'- [ ] '+l).join('\n'); ta.value = before + lines + after; ta.focus(); },
    quote:     () => { const lines = (sel||'Blockquote text').split('\n').map(l=>'> '+l).join('\n'); ta.value = before + lines + after; ta.focus(); },
    table:     () => { const t = '\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n'; ta.value = before + t + after; ta.focus(); },
    hr:        () => { ta.value = before + '\n\n---\n\n' + after; ta.focus(); },
  };
  if (actions[action]) actions[action]();
  updateWordCount();
  updateLivePreview();
}

/* ─── EXPORT / IMPORT ─── */
function exportPosts() {
  if (!blogPosts.length) { showToast('No posts to export', 'err'); return; }
  const blob = new Blob([JSON.stringify(blogPosts, null, 2)], { type:'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `nv-blog-posts-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  showToast(`Exported ${blogPosts.length} posts ✓`, 'ok');
}

function importPosts(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async ev => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error();
      const ok = await showConfirm(`Import ${imported.length} posts? Existing posts will be kept.`);
      if (!ok) return;
      const existIds = new Set(blogPosts.map(p=>p.id));
      const newPosts = imported.filter(p => !existIds.has(p.id));
      blogPosts = [...blogPosts, ...newPosts];
      saveBlogPosts(); renderBlog();
      showToast(`Imported ${newPosts.length} new post${newPosts.length!==1?'s':''} ✓`, 'ok');
    } catch { showToast('Invalid JSON file', 'err'); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

/* ═══════════════════════════
   COMMAND PALETTE
   ═══════════════════════════ */
const NAV_ITEMS = [
  { icon:'👤', title:'About',      sub:'section', href:'#about' },
  { icon:'⚡', title:'Skills',     sub:'section', href:'#skills' },
  { icon:'🏢', title:'Experience', sub:'section', href:'#experience' },
  { icon:'🚀', title:'Projects',   sub:'section', href:'#projects' },
  { icon:'📝', title:'Blog',       sub:'section', href:'#blog' },
  { icon:'📧', title:'Contact',    sub:'section', href:'#contact' },
];

function initCommandPalette() {
  const btn  = document.getElementById('cmd-btn');
  const pal  = document.getElementById('cmd-palette');
  const bg   = document.getElementById('cmd-bg');
  const inp  = document.getElementById('cmd-inp');
  const res  = document.getElementById('cmd-results');

  if (btn) btn.addEventListener('click', openCmd);
  if (bg)  bg.addEventListener('click', closeCmd);

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); pal.classList.contains('hidden') ? openCmd() : closeCmd(); }
    if (e.key === 'Escape' && !pal.classList.contains('hidden')) closeCmd();
    if (!pal.classList.contains('hidden')) {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); moveFocus(-1); }
      if (e.key === 'Enter')     { e.preventDefault(); selectFocused(); }
    }
  });

  if (inp) inp.addEventListener('input', () => { cmdFocusIdx = -1; renderCmdResults(inp.value); });

  function openCmd() {
    pal.classList.remove('hidden');
    cmdFocusIdx = -1;
    if (inp) { inp.value = ''; inp.focus(); }
    renderCmdResults('');
  }
  function closeCmd() { pal.classList.add('hidden'); }

  function renderCmdResults(query) {
    const q = query.toLowerCase();
    const navItems = NAV_ITEMS.filter(i => !q || i.title.toLowerCase().includes(q));
    const postItems = blogPosts.filter(p => !q || p.title.toLowerCase().includes(q) || p.tags.some(t=>t.toLowerCase().includes(q)));

    let html = '';
    if (navItems.length) {
      html += `<div class="cmd-group-label">Navigation</div>`;
      html += navItems.map((i,idx) => `
        <div class="cmd-item" data-href="${i.href}" data-idx="${idx}" role="option">
          <span class="cmd-item-icon">${i.icon}</span>
          <span class="cmd-item-title">${i.title}</span>
          <span class="cmd-item-sub">${i.sub}</span>
        </div>`).join('');
    }
    if (postItems.length) {
      html += `<div class="cmd-group-label">Blog Posts</div>`;
      html += postItems.map((p,ii) => `
        <div class="cmd-item" data-post-id="${p.id}" data-idx="${navItems.length + ii}" role="option">
          <span class="cmd-item-icon">📄</span>
          <span class="cmd-item-title">${escHtml(p.title)}</span>
          <span class="cmd-item-sub">${fmtDate(p.createdAt)}</span>
        </div>`).join('');
    }
    if (!html) html = `<div class="cmd-item" style="pointer-events:none;color:var(--dim)"><span class="cmd-item-icon">🔍</span><span>No results for "${escHtml(query)}"</span></div>`;
    if (res) res.innerHTML = html;

    res.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => handleCmdSelect(item));
    });
  }

  function handleCmdSelect(item) {
    closeCmd();
    if (item.dataset.href) {
      document.querySelector(item.dataset.href)?.scrollIntoView({ behavior:'smooth' });
    } else if (item.dataset.postId) {
      document.querySelector('#blog')?.scrollIntoView({ behavior:'smooth' });
      setTimeout(() => openView(item.dataset.postId), 400);
    }
  }

  function moveFocus(dir) {
    const items = res.querySelectorAll('.cmd-item[data-idx]');
    if (!items.length) return;
    items.forEach(i => i.classList.remove('focused'));
    cmdFocusIdx = Math.max(0, Math.min(items.length-1, cmdFocusIdx + dir));
    items[cmdFocusIdx]?.classList.add('focused');
    items[cmdFocusIdx]?.scrollIntoView({ block:'nearest' });
  }

  function selectFocused() {
    const focused = res.querySelector('.cmd-item.focused');
    if (focused) handleCmdSelect(focused);
  }
}

/* ═══ MODALS ═══ */
function openModal(id) {
  document.getElementById(id)?.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id)?.classList.add('hidden');
  // Re-enable scroll only if no other modal is open
  if (!document.querySelector('.modal:not(.hidden)')) document.body.style.overflow = '';
}

/* ═══ CONFIRM DIALOG ═══ */
function showConfirm(msg) {
  document.getElementById('confirm-msg').textContent = msg;
  openModal('confirm-dialog');
  return new Promise(resolve => { deleteConfirmResolve = resolve; });
}
function hideConfirm() { closeModal('confirm-dialog'); deleteConfirmResolve = null; }

/* ═══ TOAST ═══ */
let toastTimer;
function showToast(msg, type='ok') {
  const t = document.getElementById('toast');
  if (!t) return;
  clearTimeout(toastTimer);
  t.textContent = msg;
  t.className = `toast toast-${type}`;
  t.classList.remove('hidden');
  toastTimer = setTimeout(() => t.classList.add('hidden'), 3000);
}

/* ═══ UTILS ═══ */
function escHtml(s) {
  return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
