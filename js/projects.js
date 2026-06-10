/* js/projects.js
   ─────────────────────────────────────────────────────
   DATA for the project slider.
   To add a project: push a new object into PROJECTS.
   ───────────────────────────────────────────────────── */

const PROJECTS = [
  {
    title: 'ChainSense — Blockchain Behavioral Analytics',
    tags: ['ML', 'Ethereum', 'Unsupervised'],
    summary: 'ETL pipeline on 3.9M Ethereum transactions → 50+ engineered behavioral features → K-Means and DBSCAN clustering into 5 distinct wallet archetypes with a 0.72 silhouette score.',
    detail: 'Built using <b>Web3.py, Alchemy API, DuckDB, and Parquet</b> with a bronze-silver-gold data architecture. Applied <b>TF-IDF encoding on event sequences</b>, <b>PCA and UMAP</b> for dimensionality reduction. Proposed GPU-accelerated rewrite using RAPIDS/cuML — DBSCAN 50–500× speedup, UMAP 50–100× speedup.',
   link: 'writing/chainsense-technical-report.html',
  },
  {
    title: 'SFIC — Options Pricing & Volatility Analytics',
    tags: ['Quant', 'Options', 'Volatility'],
    summary: 'Volatility analytics system for UCSD\'s $1.5M student investment fund — IV vs RV spread signals, EWMA realized volatility, and an iron condor backtesting framework across 200+ equities.',
    detail: 'End-to-end pipelines in <b>Python, Pandas, NumPy</b> processing Yahoo Finance options data. Computed IV surfaces, RV via EWMA, vol spreads stored in <b>MongoDB</b>. Backtesting framework tracks PnL, Sharpe ratios, and drawdowns. Implemented <b>iron condor strategy</b> monetizing the volatility risk premium.',
  },
  {
    title: 'AI Under the Lens — Bias, Ethics & Policy',
    tags: ['AI Bias', 'Healthcare', 'Policy', 'Interactive'],
    summary: 'An interactive exploration of algorithmic bias in clinical AI, ethical frameworks, the global policy timeline from NIST through the EU AI Act, and documented cases of healthcare AI inequity.',
    detail: 'Built with HTML, CSS, and JavaScript. Features a <b>live bias amplification simulator</b> across hiring, facial recognition, lending, and medical risk domains — each grounded in published audits. Includes a policy timeline, healthcare case studies, and a knowledge quiz.',
    link: 'https://wanhan05.github.io/CCE3_project3/',
  },
  {
    title: 'SoCalGuessr — Transfer Learning Classifier',
    tags: ['Computer Vision', 'ResNet', 'Transfer Learning'],
    summary: 'Fine-tuned ResNet classifying Google Street View images across six Southern California cities. 88% validation accuracy trained on an M-series MacBook Air.',
    detail: 'CNN project. Froze pretrained convolutional layers, replaced classification head, tuned on a small domain-specific dataset. Demonstrates what modern transfer learning achieves on consumer hardware — relevant context for understanding compute efficiency in constrained environments.',
  },
   {
  title: 'Amazon Reviews — Scalable User Analytics with Dask',
  tags: ['Dask', 'AWS EC2', 'Big Data', 'Python'],
  summary: 'Built a distributed data pipeline processing 28.5GB of Amazon Reviews CSV on AWS EC2, aggregating 16.1M unique users with 100% accuracy against ground truth metrics in ~15 minutes.',
  detail: 'Scalable system programming project. Used Dask for out-of-core computation on a t2.xlarge spot instance, computing per-user statistics including product count, average rating, review tenure, and helpfulness votes. Vectorized string parsing with regex over row-wise Python evaluation for performance. Validated mean, std, min, and max across all 5 columns within 1% of ground truth.',
   },
  {
    title: 'Environmental Impact of Cloud Computing',
    tags: ['Policy', 'Environment', 'Computing'],
    summary: 'Supply chain accounting of AI\'s physical footprint — electricity, water, rare earth minerals, and chip fabrication — and the regulatory disclosure obligations that follow.',
    detail: 'GPT-3 training: ~1,287 MWh, equivalent to 120 US households annually. Google data centers: <b>5.6 billion gallons of water in 2022</b>. Covers <b>rare earth conflict minerals</b> (cobalt, tantalum, gallium), TSMC\'s fabrication water usage, and carbon policy implications of compute geography.',
  },
  // ── ADD NEW PROJECTS BELOW ──────────────────────────
  // {
  //   title: 'Your New Project',
  //   tags: ['Tag1', 'Tag2'],
  //   summary: 'One paragraph visible in the slider card.',
  //   detail: 'Expanded detail shown when the card is clicked.',
  //   link: null, // optional external link
  // },
];

function renderProjectCard(p) {
  return `
    <div class="proj-card">
      <div class="proj-top-accent"></div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-tags">
        ${p.tags.map(t => `<span class="proj-tag-pill">${t}</span>`).join('')}
      </div>
      <p class="proj-body">${p.summary}</p>
      <button class="proj-expand-btn" aria-label="Expand project details">
        Details <i class="ti ti-chevron-down" aria-hidden="true"></i>
      </button>
      <div class="proj-detail">
        <p class="proj-detail-body">${p.detail}</p>
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" style="display:inline-block;margin-top:0.75rem;font-family:var(--mono);font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--blue-bright);">View project →</a>` : ''}
      </div>
    </div>`;
}

function renderProjects() {
  const html = `
    <section id="projects">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-label">Projects</p>
          <h2 class="section-title">What I've <em>built</em></h2>
        </div>
        <div class="reveal">
          <div class="slider-viewport" id="sliderViewport">
            <div class="slider-track" id="sliderTrack">
              ${PROJECTS.map(renderProjectCard).join('')}
            </div>
          </div>
          <div class="slider-controls">
            <button class="slider-btn" id="prevBtn" onclick="slide(-1)" aria-label="Previous">&#8592;</button>
            <button class="slider-btn" id="nextBtn" onclick="slide(1)" aria-label="Next">&#8594;</button>
            <div class="slider-dots" id="sliderDots"></div>
            <span class="slider-count" id="sliderCount"></span>
            <span class="slider-hint">drag or swipe</span>
          </div>
        </div>
      </div>
    </section>`;
  mount('projects-root', html);

  // Wire up expand buttons after mount
  document.querySelectorAll('.proj-expand-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      btn.closest('.proj-card').classList.toggle('open');
    });
  });
}
