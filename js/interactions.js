import { animate } from 'animejs';

export function initNavScroll() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ─── Projects Carousel ────────────────────────────────────────────────────────

export function initCarousel() {
  const wrap  = document.querySelector('.carousel-track-wrap');
  const track = document.getElementById('carousel-track');
  if (!track || !wrap) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const dots   = Array.from(document.querySelectorAll('.carousel-dot'));
  const prev   = document.querySelector('.carousel-prev');
  const next   = document.querySelector('.carousel-next');
  const total  = slides.length;
  let current  = 0;
  let busy     = false;

  // ── Geometry ──────────────────────────────────────────────────────────────
  function w() { return wrap.offsetWidth; }

  function applyWidths() {
    const width = w();
    slides.forEach(s => { s.style.width = width + 'px'; });
    // Snap to current position without animation after resize
    track.style.transform = `translateX(${-current * width}px)`;
  }

  window.addEventListener('resize', applyWidths, { passive: true });
  applyWidths();

  // ── Navigation ────────────────────────────────────────────────────────────
  function goTo(index) {
    if (busy) return;
    if (index < 0) index = total - 1;
    if (index >= total) index = 0;
    if (index === current) return;

    busy = true;

    animate(track, {
      translateX: -index * w(),
      duration: 430,
      ease: 'out(3)',
      onComplete() { busy = false; },
    });

    dots[current].classList.remove('active');
    dots[index].classList.add('active');
    current = index;
  }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot =>
    dot.addEventListener('click', () => goTo(Number(dot.dataset.index)))
  );

  // ── Keyboard  ─────────────────────────────────────────────────────────────
  document.addEventListener('keydown', e => {
    const section = document.getElementById('projects');
    if (!section) return;
    const r = section.getBoundingClientRect();
    if (r.top > window.innerHeight || r.bottom < 0) return;
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  // ── Touch / swipe ─────────────────────────────────────────────────────────
  let touchX = 0;
  wrap.addEventListener('touchstart', e => {
    touchX = e.touches[0].clientX;
  }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
  }, { passive: true });
}
