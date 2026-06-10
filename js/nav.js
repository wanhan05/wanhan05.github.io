/* js/nav.js */

function renderNav() {
  const html = `
    <nav>
      <a class="nav-logo" href="#hero">Wanhan</a>
      <ul class="nav-links">
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#writing">Writing</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>`;
  mount('nav-root', html);
}
