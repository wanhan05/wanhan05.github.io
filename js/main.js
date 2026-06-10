/* js/main.js */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Render all sections
  renderNav();
  renderHero();
  renderExperience();
  renderProjects();
  renderWriting();
  renderAbout();

  // 2. Init behaviours
  initSlider();
  initReveal();
  initNavSpy();

  // 3. Hero graph — visible immediately on load
  initHeroGraph();

});
