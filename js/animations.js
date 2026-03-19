import { animate, createTimeline, onScroll, stagger, splitText } from 'animejs';

export function playHeroEntrance() {
  const nameEl = document.querySelector('.hero-name');
  if (nameEl) {
    splitText(nameEl, { type: 'chars' });
    animate(nameEl.querySelectorAll('.char'), { opacity: 0, duration: 1 });
  }

  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    splitText(taglineEl, { type: 'words' });
    animate(taglineEl.querySelectorAll('.word'), { opacity: 0, duration: 1 });
  }

  const tl = createTimeline({ defaults: { ease: 'out(3)' } });

  tl
    .add('#nav', {
      translateY: [-60, 0],
      opacity: [0, 1],
      duration: 700,
    })
    .add('.hero-greeting', {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 600,
    }, '-=300')
    .add('.hero-name .char', {
      opacity: [0, 1],
      translateY: [stagger([60, 10]), 0],
      duration: 600,
      delay: stagger(28),
    }, '-=200')
    .add('.hero-role', {
      opacity: [0, 1],
      translateY: [16, 0],
      duration: 500,
    }, '-=150')
    .add('.hero-tagline .word', {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 380,
      delay: stagger(40),
    }, '-=250')
    .add('.hero-cta > *', {
      opacity: [0, 1],
      scale: [0.85, 1],
      translateY: [10, 0],
      duration: 450,
      delay: stagger(80),
    }, '-=100')
    .add('.hero-scroll-hint', {
      opacity: [0, 1],
      duration: 500,
    }, '-=50');
}

// ─── (onScroll) ─────────────────────────────────

export function registerScrollReveals() {
  animate('.section-label.reveal', {
    opacity: [0, 1],
    translateX: [-20, 0],
    duration: 600,
    ease: 'out(3)',
    autoplay: onScroll({ enter: 'bottom-=80 top', leave: 'top bottom' }),
  });

  animate('.section-title.reveal', {
    opacity: [0, 1],
    translateY: [28, 0],
    duration: 700,
    ease: 'out(3)',
    autoplay: onScroll({ enter: 'bottom-=60 top', leave: 'top bottom' }),
  });

  animate('.section-divider.reveal', {
    opacity: [0, 1],
    scaleX: [0, 1],
    duration: 600,
    ease: 'out(3)',
    transformOrigin: 'left center',
    autoplay: onScroll({ enter: 'bottom-=40 top', leave: 'top bottom' }),
  });

  // ── About paragraphs — 
  animate('.about-body p', {
    opacity: [0, 1],
    translateY: [18, 0],
    duration: 550,
    ease: 'out(3)',
    delay: stagger(90),
    autoplay: onScroll({ enter: 'bottom-=80 top', leave: 'top bottom' }),
  });

  // ── Highlight cards — 
  animate('.highlight-card.reveal', {
    opacity: [0, 1],
    translateY: [stagger([40, 10]), 0],
    scale: [0.92, 1],
    duration: 600,
    ease: 'out(4)',
    delay: stagger(100),
    autoplay: onScroll({ enter: 'bottom-=60 top', leave: 'top bottom' }),
  });

  // ── Experience card ─
  animate('.exp-card.reveal', {
    opacity: [0, 1],
    translateX: [48, 0],
    duration: 700,
    ease: 'out(3)',
    autoplay: onScroll({ enter: 'bottom-=80 top', leave: 'top bottom' }),
  });

  // ── Exp bullets ─
  animate('.exp-bullet', {
    opacity: [0, 1],
    translateX: [stagger([20, 4]), 0],
    duration: 400,
    ease: 'out(3)',
    delay: stagger(55),
    autoplay: onScroll({ enter: 'bottom-=40 top', leave: 'top bottom' }),
  });

  // ── Projects carousel —
  animate('.carousel', {
    opacity: [0, 1],
    translateY: [32, 0],
    duration: 700,
    ease: 'out(3)',
    autoplay: onScroll({ enter: 'bottom-=80 top', leave: 'top bottom' }),
  });
}
