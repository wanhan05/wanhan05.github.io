/* js/hero.js */

function renderHero() {
  const html = `
    <section id="hero">
      <div class="hero-inner">
        <div class="hero-text">
          <div class="hero-eyebrow">Data Science · IP Law · Machine Learning</div>
          <h1 class="hero-title">
            Building at the<br>
            frontier of <em>AI</em><br>
            and the law.
          </h1>
          <p class="hero-sub">
            Data scientist and engineer with experience across biomedical AI,
            autonomous robotics, financial ML, and government policy — pursuing
            IP and corporate law to govern what these technologies produce.
          </p>
          <div class="hero-tags">
            <span class="hero-tag">UC San Diego</span>
            <span class="hero-tag">Triton Consulting Group</span>
            <span class="hero-tag">IBM Watson</span>
            <span class="hero-tag">IP Law</span>
          </div>
          <div class="scroll-hint">
            <div class="scroll-line"></div>
            Scroll to explore
          </div>
        </div>
        <div class="hero-graph-wrap">
          <div class="hero-graph-label">Knowledge map</div>
          <div class="hero-graph-shell">
            <svg id="hero-graph"></svg>
          </div>
          <div class="hero-graph-hint">hover · double-tap to open</div>
        </div>
      </div>
    </section>`;
  mount('hero-root', html);
}
