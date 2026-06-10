/* js/about.js */

const ABOUT_STATS = [
  {
    num: '5',
    label: 'Professional engagements',
    sub: 'Biotech AI, fintech, autonomous robotics, government, and university operations',
  },
  {
    num: '1000+',
    label: 'Outreach contacts',
    sub: '10+ in-depth interviews with Fortune 500 professionals across biotech, policy, and engineering',
  }, 
  {
    num: 'IBM',
    label: 'Watson integration team',
    sub: 'Summer 2026 — enterprise AI accountability and reliability frameworks',
  },
  {
    num: 'IP',
    label: 'Law school trajectory',
    sub: 'IP and corporate law at the frontier of AI, biotech, and autonomous systems',
  },
];

function renderAbout() {
  const html = `
    <section id="about">
      <div class="section-inner">
        <div class="section-header reveal">
          <p class="section-label">About</p>
          <h2 class="section-title">Where I'm Headed <em></em></h2>
        </div>
        <div class="about-grid reveal">
          <div class="about-body">
            <p>
              I'm a Data Science student at UC San Diego with experience across
              biomedical AI, autonomous robotics, financial machine learning, and
              government operations. I serve as a Project Manager at
              <b>Triton Consulting Group</b> — UCSD's largest student consulting
              organization — where I pitch, acquire, and manage full client engagements.
              Additionally, I serve as the VP of Internal Development, monitoring recruitment 
              cycles of 350+ applicants and spearheading weekly analyst sessions on technical and
              professional development.
            </p>
            <p>
              This summer I'm joining <b>IBM's Watson integration team</b>, working on
              the accountability, reliability, and security frameworks that large
              enterprise AI deployments require.
            </p>
            <p>
              Every project I've worked on ends with a handoff — a shipped model,
              a deployed system, a delivered recommendation. What I've consistently
              noticed is that the technical work gets done, and the accountability
              structure around it doesn't. That gap — between what a technology does
              and what framework governs what happens when it's transferred, deployed,
              or fails — is the problem I want to spend my career working on.
            </p>
            <p>
              I'm pursuing <b>IP and corporate law</b> because I've been standing
              inside that gap long enough to understand how to build the structure that fills it.
            </p>
          </div>
          <div>
            <div class="about-stats">
              ${ABOUT_STATS.map(s => `
                <div class="about-stat">
                  <div class="about-stat-num">${s.num}</div>
                  <div class="about-stat-label">${s.label}</div>
                  <div class="about-stat-sub">${s.sub}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>`;
  mount('about-root', html);
}
