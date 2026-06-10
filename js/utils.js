/* js/utils.js
   ─────────────────────────────────────────────────────
   Shared utilities. Loaded first.
   ───────────────────────────────────────────────────── */

/**
 * Inject an HTML string into a root element by ID.
 * @param {string} rootId
 * @param {string} html
 */
function mount(rootId, html) {
  const el = document.getElementById(rootId);
  if (el) el.innerHTML = html;
}

/**
 * Set up IntersectionObserver for .reveal elements.
 * Called once in main.js after all sections are mounted.
 */
function initReveal() {
  const obs = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/**
 * Highlight active nav link based on scroll position.
 */
function initNavSpy() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}
