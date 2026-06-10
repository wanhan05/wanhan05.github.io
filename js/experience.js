/* js/experience.js
   ─────────────────────────────────────────────────────
   DATA + RENDER for the experience timeline.
   To add a new role: add an object to EXPERIENCE array.
   To update a role: edit its object below.
   ───────────────────────────────────────────────────── */

const EXPERIENCE = [
  {
    id: 'biotech',
    domain: 'ai',
    period: ['Mar 2025', 'Jun 2025'],
    org: 'Bay Area AI Startup',
    orgNote: '(stealth)',
    role: 'Market Research & PMF Analyst',
    tag: 'Biotech · LLM',
    context: 'Stealth-stage Bay Area AI startup building a retrieval-augmented generation (RAG) system for biomedical and healthcare workflows — designed to ground LLM outputs in a curated, secure document database to reduce hallucination on clinical and scientific content.',
    deliverables: [
      'Led a structured outreach campaign contacting <b>300+ individuals</b>, converting to <b>7 in-depth interviews with Fortune 500 professionals</b> across biotech, law, and engineering to validate product-market fit',
      'Synthesized findings into a <b>competitive landscape analysis</b> positioning the RAG approach against existing biomedical AI tools',
      'Delivered <b>product-market fit framework</b> with go/no-go criteria grounded in direct stakeholder feedback',
    ],
    skills: ['qualitative research', 'stakeholder interviews', 'PMF analysis', 'competitive analysis', 'biomedical domain'],
    note: 'The lawyers in my interviews asked different questions than everyone else — who is responsible when the system is wrong, what does the company own after deployment, and what framework governs the relationship between the AI and the clinician relying on it.',
  },
  {
    id: 'lionstreet',
    domain: 'ai',
    period: ['Apr 2025', 'Aug 2025'],
    org: 'Lion Street LLC',
    orgNote: '',
    role: 'Project Manager — Data Systems & ML Products',
    tag: 'ML · Fintech · Shipped',
    context: 'Insurance and financial services firm. Full internship — owned the product from architecture through client delivery. Shipped a machine learning recommendation engine to a live insurance client, managing engineering collaboration, database design, and production handoff end-to-end.',
    deliverables: [
      'Built and <b>shipped a ML recommendation engine</b> to a live insurance client — trained on client profile data with engineered features; substantially improved model accuracy through feature weighting, cross-validation, and calibration',
      'Designed <b>scalable database schemas</b> and backend pipelines supporting real-time policy recommendation workflows',
      'Translated requirements into <b>Figma wireframes</b> and API specifications; led cross-functional collaboration through production handoff',
    ],
    skills: ['scikit-learn', 'feature engineering', 'database design', 'Figma', 'API specification', 'client delivery'],
    note: 'The client received a working model with no framework for what they owned, what they were responsible for maintaining, or what recourse they had if it degraded. That accountability gap is the clearest argument I have for why IP and corporate law matters in technical work.',
  },
  {
    id: 'braincorp',
    domain: 'eng',
    period: ['Sep 2025', 'Dec 2025'],
    org: 'Brain Corp',
    orgNote: '',
    role: 'Lead Engineer & Technical Research Analyst',
    tag: 'Robotics · Systems',
    concurrent: true,
    context: 'Autonomous mobile robot company deploying commercial robots in retail and logistics. Led engineering on a distributed multi-agent coordination system while concurrently conducting industry research across the AMR supply chain.',
    deliverables: [
      'Designed a <b>low-latency distributed multi-agent coordination system</b> using MQTT pub-sub to validate and optimize real-time robotics communication across concurrent agents',
      'Built a <b>real-time pathfinding optimization framework</b> achieving full collision avoidance via predictive trajectory modeling and moving-window stationary detection',
      'Conducted <b>industry interviews</b> with AMR controllers and distributors; researched API documentation across the autonomous robotics ecosystem',
    ],
    skills: ['MQTT', 'distributed systems', 'multi-agent pathfinding', 'real-time optimization', 'trajectory modeling', 'industry research'],
    note: 'Autonomous robotics sits at one of the most contested IP frontiers: navigation algorithm ownership, sensor fusion patents, and unresolved liability when a collision avoidance system fails in deployment.',
  },
  {
    id: 'sdcounty',
    domain: 'ops',
    period: ['Sep 2025', 'Dec 2025'],
    org: 'San Diego County — Human Relations Commission',
    orgNote: '',
    role: 'Data & Policy Analyst',
    tag: 'Policy · Gov',
    context: 'Government engagement with San Diego County\'s Human Relations Commission. Cross-jurisdictional benchmarking and financial analysis to evaluate governance models, delivering structured recommendations to senior county leadership.',
    deliverables: [
      'Cross-jurisdictional analysis across <b>15+ municipalities</b>, evaluating financial structures, governance models, and budget frameworks',
      'Translated quantitative findings and <b>stakeholder interviews</b> into decision-ready benchmarks supporting organizational restructuring recommendations to senior leadership',
    ],
    skills: ['cross-jurisdictional analysis', 'financial benchmarking', 'governance research', 'stakeholder interviews', 'policy writing'],
    note: 'Working inside government procurement and policy structures gives direct exposure to how public institutions evaluate and regulate emerging technologies — including how AI tools enter public health frameworks.',
  },
  {
    id: 'omcp',
    domain: 'ops',
    period: ['Jan 2026', 'Present'],
    org: 'UC San Diego — Operations Management & Capital Programs',
    orgNote: '',
    role: 'Project Manager, Triton Consulting Group',
    tag: 'PM · Research',
    context: 'Consulting engagement with UCSD\'s Operations Management & Capital Programs office, acquired through Triton Consulting Group — UCSD\'s largest student consulting organization. Led the full client lifecycle from competitive pitch through weekly delivery.',
    deliverables: [
      '<b>Pitched and acquired the engagement</b> through Triton\'s competitive selection; owned all stakeholder communication with UCSD leadership',
      'Led evaluation of <b>communication effectiveness</b> across student-facing channels; benchmarked across 20+ academic and industry sources',
      'Designed a <b>qualitative research methodology</b> with proposed quantitative measurement frameworks for future data collection',
    ],
    skills: ['client pitching', 'project management', 'literature review', 'research methodology', 'stakeholder communication'],
    note: 'Managing a client relationship from competitive pitch through weekly delivery directly mirrors the structure of client-facing legal practice.',
  },
];

/* ── Render helpers ── */

function renderEntry(e) {
  const concurrentNote = e.concurrent
    ? `<p class="concurrent-note">↓ concurrent — ${e.period[0].split(' ')[1]}</p>` : '';

  return `
    ${concurrentNote}
    <div class="tl-entry" data-domain="${e.domain}" onclick="toggleTL(this)">
      <div class="tl-dot"></div>
      <div class="tl-card">
        <div class="tl-summary">
          <span class="tl-period">${e.period[0]}<br>${e.period[1]}</span>
          <div>
            <div class="tl-org">${e.org}
              ${e.orgNote ? `<span style="font-size:10px;font-weight:400;color:var(--text-dim)">${e.orgNote}</span>` : ''}
            </div>
            <div class="tl-role">${e.role}</div>
          </div>
          <div class="tl-right">
            <span class="tl-tag">${e.tag}</span>
            <i class="ti ti-chevron-down tl-chev" aria-hidden="true"></i>
          </div>
        </div>
        <div class="tl-detail">
          <div class="two-col">
            <div>
              <p class="tl-sec-label">Context</p>
              <p class="tl-context">${e.context}</p>
            </div>
            <div>
              <p class="tl-sec-label">What was delivered</p>
              <div class="tl-items">
                ${e.deliverables.map(d => `
                  <div class="tl-item">
                    <div class="tl-item-dot"></div>
                    <span>${d}</span>
                  </div>`).join('')}
              </div>
            </div>
          </div>
          <p class="tl-sec-label">Skills</p>
          <div class="tl-skills">
            ${e.skills.map(s => `<span class="tl-skill">${s}</span>`).join('')}
          </div>
          <div class="tl-note">
            <span class="tl-note-icon">⚖</span>
            ${e.note}
          </div>
        </div>
      </div>
    </div>`;
}

function renderExperience() {
  const html = `
    <section id="experience">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-label">Experience</p>
          <h2 class="section-title">Where I've <em>worked</em></h2>
        </div>
        <div class="tl-filters reveal">
          <button class="tl-filter active" onclick="filterTL('all',this)">All</button>
          <button class="tl-filter" onclick="filterTL('ai',this)">AI &amp; ML</button>
          <button class="tl-filter" onclick="filterTL('eng',this)">Engineering</button>
          <button class="tl-filter" onclick="filterTL('ops',this)">Operations &amp; Policy</button>
        </div>
        <div class="tl-track reveal">
          ${EXPERIENCE.map(renderEntry).join('')}
        </div>
      </div>
    </section>`;
  mount('experience-root', html);
}

/* ── Interaction ── */

function toggleTL(el) {
  const was = el.classList.contains('open');
  document.querySelectorAll('.tl-entry').forEach(e => e.classList.remove('open'));
  if (!was) el.classList.add('open');
}

function filterTL(domain, btn) {
  document.querySelectorAll('.tl-filter').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.tl-entry').forEach(el => {
    el.dataset.hidden = domain !== 'all' && el.dataset.domain !== domain;
  });
}
