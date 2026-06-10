/* js/writing.js
   ─────────────────────────────────────────────────────
   DATA for writing pieces and reading list.
   To add an essay: push to WRITING array.
   To add a book:  push to READING array.
   ───────────────────────────────────────────────────── */

const WRITING = [
    {
    title: 'A Model of Change',
    type: 'Research Note · Draft',
    body: 'A legal and regulatory proposal to navigate AI bias and mitigate liability in high impact industries',
    tags: ['AI bias', 'ip law', 'policy'],
    link: 'writing/a-model-of-change.html',
  },
   {
    title: 'AI bias as IP liability — a framework',
    type: 'Essay',
    body: 'When an AI system performs worse on certain populations because of training data composition, who bears legal responsibility? Mapping the gap between existing tort doctrine and the realities of model deployment.',
    tags: ['AI bias', 'healthcare', 'tort'],
    link: 'writing/ai-bias-ip-liability.html',
  },
  {
    title: 'Computational Protein Encoding — From Sequences to Structure',
    type: 'Research Note',
    body: 'How AI models encode protein structure: from one-hot representations through protein language models like ESM-2 and ProtTrans to AlphaFold\'s Evoformer — and what the computational cost of this research means for who gets to do it.',
    tags: ['biotech', 'ML', 'AlphaFold', 'drug discovery'],
    link: 'writing/computational-protein-encoding.html',
  },
  {
    title: 'Computing Infrastructure — Accelerators, Optimization & Scale',
    type: 'Research Note',
    body: 'GPU, TPU, and LPU architectures, the memory wall, Flash Attention, operator fusion, and the real cost of frontier model training — from 314 zettaFLOPs to $23M clusters.',
    tags: ['systems', 'ML', 'GPU/TPU/LPU', 'optimization'],
    link: 'writing/computing-infrastructure.html',
  },
  {
    title: 'The accountability gap in AI handoffs',
    type: 'Essay · Draft',
    body: 'Every technical project ends with a transfer — a shipped model, a deployed system, a delivered recommendation. What rights and risks travel with the thing when it changes hands, and why existing frameworks are not built for this.',
    tags: ['IP law', 'AI liability', 'corporate'],
    link: null,
  },
  {
    title: 'RAG systems and FDA\'s SaMD framework',
    type: 'Research Note · Draft',
    body: 'When a retrieval-augmented generation system analyzes a clinical document and influences a physician\'s decision, does it qualify as a Software as a Medical Device? What the current regulatory framework does and does not cover.',
    tags: ['biotech AI', 'regulation', 'FDA'],
    link: null,
  },
  
  // ── ADD NEW PIECES BELOW ────────────────────────────
  // {
  //   title: 'Your Essay Title',
  //   type: 'Essay' | 'Research Note' | 'IMRaD',
  //   body: 'Two sentence summary.',
  //   tags: ['tag1', 'tag2'],
  //   link: 'writing/your-file.html' or null,
  // },
];

const READING = [
   {
    title: 'Sway : the irresistible pull of irrational behaviour',
    author: 'Ori Brafman',
    note: null,
    badge: 'Decision making · Rationalization (Psychology) · Irrationalism',
  },
   {
    title: 'Foundation',
    author: 'Isaac Asimov',
    note: null,
    badge: 'Science Fiction · Politics',
  },
  {
    title: 'Weapons of Math Destruction',
    author: 'Cathy O\'Neil',
    note: 'Statistical rigor and social critique in plain language — the model for AI bias writing.',
    badge: 'AI · Policy',
  },
  {
    title: 'The Alignment Problem',
    author: 'Brian Christian',
    note: 'ML ethics structured like a research narrative. How to write about AI for non-AI readers.',
    badge: 'AI Ethics',
  },
  {
    title: 'The Code Breaker',
    author: 'Walter Isaacson',
    note: 'CRISPR, biotech, and IP at the frontier — biography meets science meets law.',
    badge: 'Biotech · IP',
  },
  
  // ── ADD BOOKS BELOW ─────────────────────────────────
];

function renderWritingItem(w) {
  const titleEl = w.link
    ? `<a href="${w.link}" class="writing-item-title" style="color:var(--text);text-decoration:none;" onmouseover="this.style.color='var(--blue-bright)'" onmouseout="this.style.color='var(--text)'">${w.title} <span style="color:var(--blue-bright);font-size:11px;">↗</span></a>`
    : `<div class="writing-item-title">${w.title}</div>`;

  return `
    <div class="writing-item">
      <div class="writing-item-top">
        ${titleEl}
        <span class="writing-item-type">${w.type}</span>
      </div>
      <p class="writing-item-body">${w.body}</p>
      <div class="writing-item-footer">
        ${w.tags.map(t => `<span class="writing-item-tag">${t}</span>`).join('')}
      </div>
    </div>`;
}

function renderReadingItem(r) {
  return `
    <div class="reading-item">
      <div class="reading-book">${r.title}</div>
      <div class="reading-author">${r.author}</div>
      <p class="reading-note">${r.note}</p>
      <span class="reading-badge">${r.badge}</span>
    </div>`;
}

function renderWriting() {
  const html = `
    <section id="writing">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-label">Writing &amp; Interests</p>
          <h2 class="section-title">What I'm <em>thinking about</em></h2>
        </div>
        <div class="writing-layout reveal">
          <div class="writing-list">
            ${WRITING.map(renderWritingItem).join('')}
          </div>
          <div class="reading-sidebar">
            <div class="reading-title">Current reading list</div>
            <div class="reading-list">
              ${READING.map(renderReadingItem).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>`;
  mount('writing-root', html);
}
