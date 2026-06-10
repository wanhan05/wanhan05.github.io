/* js/slider.js
   ─────────────────────────────────────────────────────
   Reusable slider logic.
   Called by main.js after projects are mounted.
   ───────────────────────────────────────────────────── */

const CARD_W = 360; // card width (340px) + gap (20px)
let current = 0;
let isDragging = false;
let startX = 0;
let dragDelta = 0;

function initSlider() {
  const viewport = document.getElementById('sliderViewport');
  const track    = document.getElementById('sliderTrack');
  if (!viewport || !track) return;

  buildDots();
  goTo(0);

  // Mouse drag
  viewport.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    dragDelta = 0;
    track.style.transition = 'none';
  });

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    dragDelta = e.clientX - startX;
    const base = current * CARD_W;
    track.style.transform = `translateX(${-base + dragDelta}px)`;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    track.style.transition = `transform 0.4s var(--ease-out, cubic-bezier(0.25,0.46,0.45,0.94))`;
    if (dragDelta < -60) goTo(current + 1);
    else if (dragDelta > 60) goTo(current - 1);
    else goTo(current);
  });

  // Touch swipe
  viewport.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    dragDelta = 0;
    track.style.transition = 'none';
  }, { passive: true });

  viewport.addEventListener('touchmove', e => {
    dragDelta = e.touches[0].clientX - startX;
    const base = current * CARD_W;
    track.style.transform = `translateX(${-base + dragDelta}px)`;
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    track.style.transition = `transform 0.4s var(--ease-out, cubic-bezier(0.25,0.46,0.45,0.94))`;
    if (dragDelta < -60) goTo(current + 1);
    else if (dragDelta > 60) goTo(current - 1);
    else goTo(current);
  });

  // Rebuild dots on resize
  window.addEventListener('resize', () => {
    buildDots();
    goTo(Math.min(current, maxIndex()));
  });
}

function getCards() {
  return [...document.querySelectorAll('.proj-card')];
}

function getVisible() {
  const viewport = document.getElementById('sliderViewport');
  return viewport ? Math.max(1, Math.floor(viewport.clientWidth / CARD_W)) : 1;
}

function maxIndex() {
  return Math.max(0, getCards().length - getVisible());
}

function buildDots() {
  const dotsContainer = document.getElementById('sliderDots');
  if (!dotsContainer) return;
  const total = maxIndex() + 1;
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === current ? ' active' : '');
    d.setAttribute('aria-label', `Slide ${i + 1}`);
    d.onclick = () => goTo(i);
    dotsContainer.appendChild(d);
  }
}

function goTo(idx) {
  const track    = document.getElementById('sliderTrack');
  const prevBtn  = document.getElementById('prevBtn');
  const nextBtn  = document.getElementById('nextBtn');
  const countEl  = document.getElementById('sliderCount');
  if (!track) return;

  current = Math.max(0, Math.min(idx, maxIndex()));
  track.style.transform = `translateX(-${current * CARD_W}px)`;

  if (prevBtn) prevBtn.disabled = current === 0;
  if (nextBtn) nextBtn.disabled = current >= maxIndex();
  if (countEl) countEl.textContent = `${current + 1} / ${maxIndex() + 1}`;

  document.querySelectorAll('.slider-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function slide(dir) {
  goTo(current + dir);
}
