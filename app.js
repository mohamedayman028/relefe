/* ============================================================
   RELIEF CAFE — Premium Digital Menu Script v2
   ============================================================ */

'use strict';

/* ── Loader ───────────────────────────────────────────────── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 1000);
    }
  }, 2800);
});

/* ── Custom Cursor ────────────────────────────────────────── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  }
});

// Smooth ring follow animation
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
  }
  requestAnimationFrame(animateRing);
}
animateRing();

// Show/hide cursor when mouse enters/leaves the window
document.addEventListener('mouseenter', () => {
  if (cursor) cursor.style.opacity = '1';
  if (cursorRing) cursorRing.style.opacity = '1';
});
document.addEventListener('mouseleave', () => {
  if (cursor) cursor.style.opacity = '0';
  if (cursorRing) cursorRing.style.opacity = '0';
});

// Cursor expand hover effect on interactive elements via event delegation
document.addEventListener('mouseover', e => {
  const target = e.target.closest('a, button, .cat-pill, .menu-card, .sig-card, .offer-card, .g-item, .review-card, .soc-btn, .menu-tab-btn, .rv-btn');
  if (target) {
    document.body.classList.add('cursor-expand');
  } else {
    document.body.classList.remove('cursor-expand');
  }
});

/* ── Navbar Scroll Style ──────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });

/* ── Mobile Menu ──────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger?.addEventListener('click', () => {
  if (mobileMenu) {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

mobileClose?.addEventListener('click', closeMobile);

function closeMobile() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }
}
window.closeMobile = closeMobile; // Make globally accessible

/* ── Scroll Reveal ────────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('vis');
      }, parseInt(delay));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── Animated Counters ────────────────────────────────────── */
const counters = document.querySelectorAll('[data-target]');

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = target >= 1000
      ? Math.floor(current).toLocaleString() + '+'
      : Math.floor(current) + (target === 99 ? '%' : '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

/* ── Category Pills — Dynamic Lighting ────────────────────── */
document.querySelectorAll('.cat-pill').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
    const my = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
    card.style.setProperty('--mx', mx + '%');
    card.style.setProperty('--my', my + '%');
  });
});

/* ── Interactive Story Timeline ───────────────────────────── */
function activateTL(el) {
  document.querySelectorAll('.tl-item').forEach(item => item.classList.remove('active'));
  el.classList.add('active');
}
window.activateTL = activateTL; // Make globally accessible

/* ── 3D Ring / Coverflow Carousel Physics & Interaction ─────── */
let catCarouselState = {
  activeIndex: 0,
  isDragging: false,
  startX: 0,
  dragDx: 0,
  cards: [],
  container: null,
  ringTrack: null
};

function initCatCarousel3D() {
  const container = document.getElementById('catCarousel3D');
  const ringTrack = document.getElementById('catRingTrack');
  if (!container || !ringTrack) return;

  const cards = Array.from(ringTrack.querySelectorAll('.cat-ring-card'));
  if (!cards.length) return;

  catCarouselState.container = container;
  catCarouselState.ringTrack = ringTrack;
  catCarouselState.cards = cards;

  // Position cards initially
  updateCatCarouselTransforms(0);

  // Prev & Next Nav Buttons
  const prevBtn = document.getElementById('catNavPrev');
  const nextBtn = document.getElementById('catNavNext');

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCatCarousel(-1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigateCatCarousel(1);
    });
  }

  // Click card to center
  cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
      if (Math.abs(catCarouselState.dragDx) > 10) return; // ignore click if drag active
      setCatCarouselIndex(index);
    });
  });

  // Mouse & Touch Drag Interaction
  setupCatCarouselEvents(ringTrack);
}

function updateCatCarouselTransforms(dragOffset = 0) {
  const { cards, activeIndex } = catCarouselState;
  const count = cards.length;
  if (!count) return;

  const isMobile = window.innerWidth <= 768;
  const spacing = isMobile ? 130 : 185;

  cards.forEach((card, index) => {
    let rawOffset = index - activeIndex;
    
    // Circular ring offset wrapping
    if (rawOffset > count / 2) rawOffset -= count;
    if (rawOffset < -count / 2) rawOffset += count;

    const effectiveOffset = rawOffset + dragOffset;
    const absOffset = Math.abs(effectiveOffset);

    if (absOffset < 0.08) {
      // Active center category
      card.className = 'cat-ring-card active';
      card.style.transform = `perspective(1000px) translate3d(0, 0, 50px) scale(1.1)`;
      card.style.opacity = '1';
      card.style.filter = 'blur(0px)';
      card.style.zIndex = '20';
    } else {
      // Non-active categories: Rotate dynamically back into 3D space
      card.className = 'cat-ring-card';
      const dir = effectiveOffset > 0 ? 1 : -1;
      const rotY = dir * -35; // rotateY(-35deg)
      const posX = effectiveOffset * spacing;
      const posZ = -180 - Math.min(absOffset * 40, 100);
      const scale = Math.max(0.8 - (absOffset - 1) * 0.1, 0.65);
      const opacity = Math.max(0.65 - (absOffset - 1) * 0.25, 0.2);
      const blur = Math.min(1 + (absOffset - 1) * 1.5, 3);

      card.style.transform = `perspective(1000px) translate3d(${posX.toFixed(1)}px, 0, ${posZ.toFixed(1)}px) rotateY(${rotY}deg) scale(${scale.toFixed(2)})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.filter = `blur(${blur.toFixed(1)}px)`;
      card.style.zIndex = Math.max(10 - Math.round(absOffset * 2), 1).toString();
    }
  });
}

function setCatCarouselIndex(targetIndex) {
  const count = catCarouselState.cards.length;
  if (!count) return;

  catCarouselState.activeIndex = (targetIndex + count) % count;
  catCarouselState.dragDx = 0;
  updateCatCarouselTransforms(0);

  const activeCard = catCarouselState.cards[catCarouselState.activeIndex];
  if (activeCard) {
    const tabId = activeCard.dataset.tab;
    if (tabId) switchMenuPanelOnly(tabId, activeCard);
  }
}

function navigateCatCarousel(direction) {
  setCatCarouselIndex(catCarouselState.activeIndex + direction);
}

function switchMenuPanelOnly(tabId, activeCard) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cat-ring-card').forEach(c => c.classList.remove('active'));

  const panel = document.getElementById('panel-' + tabId);
  if (panel) {
    panel.classList.add('active');
    
    panel.querySelectorAll('.menu-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s ease, box-shadow 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 80);
    });
  }

  if (activeCard) activeCard.classList.add('active');
}

function switchMenu(tabId, btn) {
  const cardIndex = catCarouselState.cards.findIndex(c => c.dataset.tab === tabId);
  if (cardIndex !== -1) {
    setCatCarouselIndex(cardIndex);
  } else {
    switchMenuPanelOnly(tabId, btn);
  }
}
window.switchMenu = switchMenu;

function scrollToMenuTab(tabId) {
  const menuSec = document.getElementById('menu');
  if (menuSec) {
    menuSec.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      switchMenu(tabId, null);
    }, 600);
  }
}
window.scrollToMenuTab = scrollToMenuTab;

function setupCatCarouselEvents(el) {
  let isDown = false;
  let startX = 0;

  const onStart = (clientX) => {
    isDown = true;
    startX = clientX;
    catCarouselState.dragDx = 0;
    catCarouselState.cards.forEach(c => c.style.transition = 'none');
  };

  const onMove = (clientX) => {
    if (!isDown) return;
    const dx = clientX - startX;
    catCarouselState.dragDx = dx;
    const isMobile = window.innerWidth <= 768;
    const spacing = isMobile ? 130 : 185;
    const dragOffset = dx / spacing;
    updateCatCarouselTransforms(dragOffset);
  };

  const onEnd = () => {
    if (!isDown) return;
    isDown = false;
    catCarouselState.cards.forEach(c => {
      c.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.6s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, border-color 0.4s ease';
    });

    const isMobile = window.innerWidth <= 768;
    const threshold = isMobile ? 30 : 45;

    if (catCarouselState.dragDx < -threshold) {
      navigateCatCarousel(1);
    } else if (catCarouselState.dragDx > threshold) {
      navigateCatCarousel(-1);
    } else {
      updateCatCarouselTransforms(0);
    }
    
    setTimeout(() => { catCarouselState.dragDx = 0; }, 100);
  };

  el.addEventListener('mousedown', e => onStart(e.clientX));
  window.addEventListener('mousemove', e => onMove(e.clientX));
  window.addEventListener('mouseup', () => onEnd());

  el.addEventListener('touchstart', e => {
    if (e.touches.length) onStart(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches.length) onMove(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => onEnd());

  window.addEventListener('resize', () => {
    updateCatCarouselTransforms(0);
  });
}

function initCategorySwiper() {
  initCatCarousel3D();
}
window.initCategorySwiper = initCategorySwiper;


/* ── Category Modal Data & Interaction ───────────────────────── */
const categoryData = {
  coffee: {
    title: 'Hot Coffee',
    eyebrow: 'Hot Beverages',
    items: [
      { name: 'Espresso (Single)', subtitle: 'Single Shot · Ethiopian Beans', desc: 'Concentrated & rich single shot espresso brewed from fine arabica beans.', price: '55 EGP', tags: ['Single Shot', 'Arabica', 'Rich Crema'], img: 'espresso.png', badge: 'Classic' },
      { name: 'Espresso (Double)', subtitle: 'Double Shot · Intense & Bold', desc: 'Double strength espresso shot delivering a full-bodied aromatic kick.', price: '65 EGP', tags: ['Double Shot', 'Bold', 'Single Origin'], img: 'espresso.png', badge: 'Signature' },
      { name: 'Macchiato (Single)', subtitle: 'Single Shot · Touch of Foam', desc: 'Espresso marked with a delicate dollop of warm milk microfoam.', price: '65 EGP', tags: ['Single Shot', 'Microfoam', 'Balanced'], emoji: '☕' },
      { name: 'Macchiato (Double)', subtitle: 'Double Shot · Touch of Foam', desc: 'Double espresso shot balanced with a light layer of velvety foam.', price: '70 EGP', tags: ['Double Shot', 'Velvety Foam', 'Intense'], emoji: '☕' },
      { name: 'Hot Mocha', subtitle: 'Belgian Chocolate · Espresso · Steamed Milk', desc: 'Rich Belgian chocolate blended with espresso and silky steamed milk.', price: '85 EGP', tags: ['Belgian Chocolate', 'Indulgent', 'Steamed Milk'], emoji: '🍫' },
      { name: 'Hot White Mocha', subtitle: 'White Chocolate · Espresso · Creamy Milk', desc: 'Smooth white chocolate combined with dark espresso and steamed milk.', price: '90 EGP', tags: ['White Chocolate', 'Sweet & Creamy', 'Rich'], emoji: '🤍', badge: 'Popular' },
      { name: 'Hot Latte', subtitle: 'Steamed Milk · Smooth Espresso Shot', desc: 'Classic espresso poured over generous silky steamed milk.', price: '73 EGP', tags: ['Steamed Milk', 'Smooth', 'Comforting'], img: 'hero_coffee.png' },
      { name: 'Hot Spanish Latte', subtitle: 'Condensed Milk · Double Espresso Shot', desc: 'Rich espresso layered with sweet condensed milk & velvety foam.', price: '95 EGP', tags: ['Condensed Milk', 'Sweet', 'Layered'], emoji: '🥛', badge: 'Best Seller' },
      { name: 'Hot Caramel Macchiato', subtitle: 'Vanilla · Steamed Milk · Caramel Drizzle', desc: 'Freshly steamed milk with vanilla syrup, marked with espresso & caramel.', price: '84 EGP', tags: ['Vanilla Syrup', 'Caramel Drizzle', 'Sweet'], emoji: '🍯' },
      { name: 'Cappuccino', subtitle: 'Equal Parts Espresso · Milk · Thick Foam', desc: 'Rich espresso topped with equal layers of steamed milk and fluffy foam.', price: '75 EGP', tags: ['Micro Foam', 'Latte Art', 'Classic'], img: 'hero_coffee.png' },
      { name: 'Flat White', subtitle: 'Double Ristretto · Micro-Foam', desc: 'Smooth double ristretto shot topped with dense micro-textured milk.', price: '75 EGP', tags: ['Double Ristretto', 'Velvety', 'Intense'], emoji: '🤍' },
      { name: 'Cortado', subtitle: 'Equal Parts Espresso & Steamed Milk', desc: 'Harmonious balance of 1:1 espresso and warm steamed milk.', price: '70 EGP', tags: ['Equal Parts', 'Espresso & Milk', 'Balanced'], emoji: '🤎' },
      { name: 'Hot Americano', subtitle: 'Espresso · Hot Water Dilution', desc: 'Espresso diluted with hot water for a smooth, deep coffee flavor.', price: '75 EGP', tags: ['Smooth', 'Clean', 'Classic'], emoji: '☕' },
      { name: 'Nescafé', subtitle: 'Classic Instant Coffee · Milk', desc: 'Comforting mug of classic rich coffee prepared with warm milk.', price: '70 EGP', tags: ['Classic', 'Creamy', 'Comforting'], emoji: '☕' },
      { name: 'Black Nescafé', subtitle: 'Pure Black Coffee · Bold Brew', desc: 'Simple, bold black coffee brewed for a pure caffeine kick.', price: '55 EGP', tags: ['Pure Black', 'Bold', 'Quick Kick'], emoji: '☕' },
      { name: 'Turkish Coffee', subtitle: 'Finely Ground · Traditional Roast', desc: 'Traditional authentic Turkish coffee brewed to perfection with thick foam.', price: '50 EGP', tags: ['Traditional', 'Thick Foam', 'Aromatic'], emoji: '☕', badge: 'Traditional' },
      { name: 'Special Turkish Coffee', subtitle: 'Premium Spiced Turkish Roast', desc: 'Special custom-roasted Turkish coffee infused with aromatic cardamom.', price: '70 EGP', tags: ['Cardamom', 'Custom Roast', 'Premium'], emoji: '☕', badge: 'Chef Special' },
      { name: 'Nutella Coffee', subtitle: 'Real Nutella Spread · Espresso · Milk', desc: 'Warm coffee infused with creamy Nutella hazelnut cocoa spread.', price: '69 EGP', tags: ['Nutella', 'Hazelnut', 'Decadent'], emoji: '🌰', badge: 'Must Try' }
    ]
  },
  iced: {
    title: 'Iced Drinks',
    eyebrow: 'Cold Refreshment',
    items: [
      { name: 'Iced Latte', subtitle: 'Chilled Milk · Double Shot Espresso', desc: 'Espresso poured over chilled milk and crystal-clear ice cubes.', price: '22 - 26 EGP', tags: ['Cold Milk', 'Double Shot', 'Refreshing'], img: 'iced_latte.png', badge: 'Popular' },
      { name: 'Iced Spanish Latte', subtitle: 'Sweet Condensed Milk · Layered Espresso', desc: 'Espresso with sweetened condensed milk served over ice.', price: '25 - 30 EGP', tags: ['Condensed Milk', 'Sweet', 'Layered'], emoji: '🥛', badge: 'Signature' },
      { name: 'Iced Mocha', subtitle: 'Dark Chocolate Sauce · Cold Milk & Ice', desc: 'Cold espresso, dark chocolate sauce, cold milk and ice.', price: '25 - 30 EGP', tags: ['Dark Chocolate', 'Iced', 'Intense'], emoji: '🍫' },
      { name: 'Cold Brew Coffee', subtitle: '18-Hour Slow Steeped · Single Origin', desc: 'Slow-steeped for 18 hours for an exceptionally smooth, sweet brew.', price: '28 EGP', tags: ['18h Steeped', 'Smooth', 'Zero Acidity'], emoji: '🧊', badge: 'Artisan' },
      { name: 'Iced V60', subtitle: 'Flash-Chilled Filter Coffee', desc: 'Pour-over coffee brewed directly over ice for crisp, vibrant clarity.', price: '40 EGP', tags: ['Flash Chilled', 'Vibrant', 'Clean'], emoji: '☕' },
      { name: 'Iced Matcha Latte', subtitle: 'Ceremonial Grade Japanese Matcha', desc: 'Ceremonial grade Japanese matcha whisked with cold milk.', price: '32 EGP', tags: ['Ceremonial Matcha', 'Antioxidants', 'Creamy'], emoji: '🍵' }
    ]
  },
  cheesecake: {
    title: 'Handcrafted Cheesecake',
    eyebrow: 'Artisan Desserts',
    items: [
      { name: 'Lotus Cheesecake', subtitle: 'Biscoff Crust · Caramelized Drizzle', desc: 'Creamy cheesecake on a crunch Biscoff crust topped with Lotus drizzle.', price: '35 EGP', tags: ['Biscoff Crust', 'Caramel Drizzle', 'Creamy'], img: 'lotus_cheesecake.png', badge: 'Fan Favourite' },
      { name: 'San Sebastian', subtitle: 'Spanish Burnt Basque · Molten Center', desc: 'Crustless Spanish burnt cheesecake with a silky, molten center.', price: '38 EGP', tags: ['Burnt Basque', 'Caramelized Top', 'Silky'], emoji: '🔥', badge: "Chef's Pick" },
      { name: 'Chocolate Cheesecake', subtitle: 'Belgian Chocolate Ganache Glaze', desc: 'Rich Belgian dark chocolate cheesecake with chocolate ganache.', price: '36 EGP', tags: ['Dark Chocolate', 'Ganache Glaze', 'Decadent'], emoji: '🍫' },
      { name: 'Strawberry Cheesecake', subtitle: 'New York Style · Fresh Berry Compote', desc: 'Classic New York style cheesecake topped with fresh strawberry compote.', price: '34 EGP', tags: ['NY Style', 'Fresh Strawberries', 'Fruity'], emoji: '🍓' },
      { name: 'Pistachio Cheesecake', subtitle: 'Italian Pistachio Paste · Crushed Nuts', desc: 'Infused with roasted Italian pistachio paste & topped with crushed nuts.', price: '39 EGP', tags: ['Italian Pistachio', 'Nutty', 'Rich'], emoji: '🥑', badge: 'New' }
    ]
  },
  waffles: {
    title: 'Artisan Waffles',
    eyebrow: 'Freshly Baked',
    items: [
      { name: 'Nutella Waffle', subtitle: 'Crisp Belgian Waffle · Warm Nutella', desc: 'Crisp Belgian waffle drizzled with warm Nutella & fresh strawberries.', price: '28 EGP', tags: ['Belgian Crisp', 'Fresh Strawberries', 'Powdered Sugar'], img: 'waffle.png', badge: 'Best Seller' },
      { name: 'Lotus Waffle', subtitle: 'Lotus Biscoff Spread · Biscuit Crunch', desc: 'Topped with Lotus Biscoff spread, crushed biscuits & caramel drizzle.', price: '30 EGP', tags: ['Biscoff Spread', 'Caramel Drizzle', 'Crunchy'], emoji: '🍪', badge: 'New' },
      { name: 'Mixed Fruits Waffle', subtitle: 'Seasonal Berries · Honey Drizzle', desc: 'Topped with fresh berries, banana, honey drizzle & whipped cream.', price: '28 EGP', tags: ['Seasonal Fruits', 'Honey Drizzle', 'Whipped Cream'], emoji: '🍓' },
      { name: 'Kinder Waffle', subtitle: 'Melted Kinder Chocolate · Milk Drops', desc: 'Smothered in melted Kinder chocolate with milk chocolate drops.', price: '32 EGP', tags: ['Kinder Chocolate', 'Melting', 'Sweet'], emoji: '🍫' }
    ]
  },
  desserts: {
    title: 'Signature Desserts',
    eyebrow: 'Sweet Moments',
    items: [
      { name: 'Red Velvet Cake', subtitle: 'Smooth Cream Cheese Frosting', desc: 'Layers of moist red velvet cake with smooth cream cheese frosting.', price: '34 EGP', tags: ['Cream Cheese Frosting', 'Moist', 'Elegant'], emoji: '❤️' },
      { name: 'Russian Honey Cake', subtitle: 'Medovik · Caramelized Honey Layers', desc: 'Traditional Medovik with thin caramelized honey layers & light cream.', price: '40 EGP', tags: ['Medovik', 'Caramelized Honey', 'Layered'], emoji: '🍯', badge: 'Signature' },
      { name: 'Tiramisu', subtitle: 'Espresso Soaked Savoiardi · Mascarpone', desc: 'Italian classic soaked in espresso and layered with mascarpone cream.', price: '36 EGP', tags: ['Espresso Soaked', 'Mascarpone', 'Cocoa Dust'], emoji: '☕' },
      { name: 'Chocolate Fondant', subtitle: 'Warm Molten Lava · Vanilla Gelato', desc: 'Warm chocolate lava cake with a molten center, served with vanilla ice cream.', price: '38 EGP', tags: ['Molten Lava', 'Vanilla Scoop', 'Warm'], emoji: '🌋', badge: 'Must Try' },
      { name: 'Fudge Brownies & Ice Cream', subtitle: 'Warm Chocolate Fudge · Vanilla Bean', desc: 'Decadent chocolate fudge brownie served warm with vanilla bean gelato.', price: '32 EGP', tags: ['Warm Fudge', 'Vanilla Gelato', 'Rich'], emoji: '🍨' }
    ]
  },
  bakery: {
    title: 'Fresh Bakery',
    eyebrow: 'Daily Oven',
    items: [
      { name: 'Butter Croissant', subtitle: 'French Butter · Baked Fresh Daily', desc: 'Flaky, golden French croissant baked fresh every morning.', price: '16 EGP', tags: ['French Butter', 'Flaky', 'Fresh Daily'], emoji: '🥐', badge: 'Fresh Daily' },
      { name: 'Almond Croissant', subtitle: 'Almond Frangipane · Toasted Almonds', desc: 'Filled with rich almond frangipane cream and topped with toasted almonds.', price: '22 EGP', tags: ['Almond Cream', 'Toasted Almonds', 'Sweet'], emoji: '🥐' },
      { name: 'Pain au Chocolat', subtitle: 'Dark Chocolate Bars · Flaky Layers', desc: 'Classic French pastry filled with two bars of dark chocolate.', price: '20 EGP', tags: ['Dark Chocolate', 'Flaky Layers', 'Classic'], emoji: '🍫' },
      { name: 'Cheese Danish', subtitle: 'Savory Cream Cheese · Herb Crust', desc: 'Puff pastry filled with savory cream cheese and herbs.', price: '18 EGP', tags: ['Savory Cheese', 'Puff Pastry', 'Warm'], emoji: '🧀' },
      { name: 'Cinnamon Roll', subtitle: 'Soft Bun · Cream Cheese Glaze', desc: 'Soft baked bun rolled with cinnamon sugar and cream cheese glaze.', price: '24 EGP', tags: ['Cinnamon Sugar', 'Cream Cheese Glaze', 'Soft'], emoji: '🌀', badge: 'Best Seller' }
    ]
  }
};

const catModalOverlay = document.getElementById('catModalOverlay');
const catModalClose   = document.getElementById('catModalClose');
const catModalTitle   = document.getElementById('catModalTitle');
const catModalEyebrow = document.getElementById('catModalEyebrow');
const catModalBody    = document.getElementById('catModalBody');
let currentCategoryKey = 'coffee';

function renderModalCategoryContent(catKey) {
  const data = categoryData[catKey];
  if (!data) return;

  currentCategoryKey = catKey;

  if (catModalEyebrow) catModalEyebrow.textContent = data.eyebrow || 'Menu Category';
  if (catModalTitle) catModalTitle.textContent = data.title || 'Category';

  // Highlight active modal tab
  document.querySelectorAll('.cat-modal-tab-btn').forEach(btn => {
    if (btn.dataset.cat === catKey) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (catModalBody) {
    let html = '<div class="modal-grid">';
    data.items.forEach((item, index) => {
      const badgeHtml = item.badge ? `<div class="modal-card-badge">${item.badge}</div>` : '';
      
      let visualHtml = '';
      if (item.img) {
        visualHtml = `<img src="${item.img}" alt="${item.name}" class="modal-card-img" loading="lazy" />`;
      } else {
        visualHtml = `<div class="modal-card-placeholder">${item.emoji || '☕'}</div>`;
      }

      const subtitleText = item.subtitle || (item.tags ? item.tags.join(' · ') : '');
      const tagsHtml = item.tags ? item.tags.map(t => `<span class="modal-card-tag">${t}</span>`).join('') : '';

      html += `
        <div class="modal-card" style="--card-index: ${index};">
          <div class="modal-card-img-wrap">
            ${visualHtml}
            ${badgeHtml}
          </div>
          <div class="modal-card-content">
            <h3 class="modal-card-title">${item.name}</h3>
            ${subtitleText ? `<p class="modal-card-subtitle">${subtitleText}</p>` : ''}
            <p class="modal-card-desc">${item.desc}</p>
            <div class="modal-card-tags">${tagsHtml}</div>
            <div class="modal-card-footer">
              <span class="modal-card-price-label">PRICE</span>
              <span class="modal-card-price">${item.price}</span>
            </div>
          </div>
        </div>
      `;
    });
    html += '</div>';
    catModalBody.innerHTML = html;
    catModalBody.scrollTop = 0;
  }
}

function openCategoryModal(catKey) {
  if (!catModalOverlay) return;
  renderModalCategoryContent(catKey || 'coffee');
  
  catModalOverlay.classList.remove('closing');
  catModalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.openCategoryModal = openCategoryModal;

function switchModalCategory(catKey) {
  renderModalCategoryContent(catKey);
}
window.switchModalCategory = switchModalCategory;

function closeCategoryModal() {
  if (!catModalOverlay) return;
  catModalOverlay.classList.add('closing');
  catModalOverlay.classList.remove('open');
  setTimeout(() => {
    catModalOverlay.classList.remove('closing');
    document.body.style.overflow = '';
  }, 350);
}
window.closeCategoryModal = closeCategoryModal;

catModalClose?.addEventListener('click', closeCategoryModal);

catModalOverlay?.addEventListener('click', (e) => {
  if (e.target === catModalOverlay) {
    closeCategoryModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && catModalOverlay?.classList.contains('open')) {
    closeCategoryModal();
  }
});

/* ── Parallax Effects ─────────────────────────────────────── */
const heroBg = document.querySelector('.hero-img-bg');
const pbBg = document.getElementById('pbBg');
const parallaxBanner = document.getElementById('parallaxBanner');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;

  // Hero Parallax
  if (heroBg && scrolled < window.innerHeight) {
    heroBg.style.transform = `scale(1.06) translateY(${scrolled * 0.3}px)`;
  }

  // Banner Parallax
  if (pbBg && parallaxBanner) {
    const rect = parallaxBanner.getBoundingClientRect();
    const winHeight = window.innerHeight;
    if (rect.top < winHeight && rect.bottom > 0) {
      const relativeScroll = (winHeight - rect.top) / (winHeight + rect.height);
      const yOffset = (relativeScroll - 0.5) * 80;
      pbBg.style.transform = `translateY(${yOffset}px) scale(1.15)`;
    }
  }
}, { passive: true });

/* ── Back to Top Button ───────────────────────────────────── */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (backTop) {
    backTop.classList.toggle('vis', window.scrollY > 400);
  }
}, { passive: true });

backTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Card Tilt Effect — subtle for light theme ───────────── */
document.querySelectorAll('.menu-card, .sig-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) rotateX(${(-dy * 3).toFixed(1)}deg) rotateY(${(dx * 3).toFixed(1)}deg)`;
  });
  card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ── Newsletter Feedback ──────────────────────────────────── */
document.querySelector('.nl-btn')?.addEventListener('click', function() {
  const input = document.querySelector('.nl-input');
  if (input?.value) {
    this.textContent = '✓';
    this.style.background = 'linear-gradient(135deg, #2d6b30, #3a8b40)';
    input.value = '';
    input.placeholder = 'Thank you! You\'re subscribed.';
    setTimeout(() => {
      this.textContent = '→';
      this.style.background = '';
      input.placeholder = 'Your email address';
    }, 3000);
  }
});

/* ── Smooth Navigation Scroll ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      closeMobile();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* ── Smooth Active Nav Link Highlight ─────────────────────── */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--caramel)';
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ── Init Page State ──────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  initCatCarousel3D();
});

/* ── Menu Card Event Delegation (open modal on card click) ── */
document.addEventListener('click', (e) => {
  // Cards with data-action attribute
  const card = e.target.closest('[data-action="open-category"]');
  if (card) {
    const catKey = card.dataset.cat;
    if (catKey) openCategoryModal(catKey);
    return;
  }
  // Legacy inline-onclick fallback already handled by function scope
});

/* ── Cat Modal Tabs Event Delegation ───────────────────────── */
const catModalTabs = document.getElementById('catModalTabs');
if (catModalTabs) {
  catModalTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-modal-tab-btn');
    if (!btn) return;
    const catKey = btn.dataset.cat;
    if (catKey) switchModalCategory(catKey);
  }, { passive: true });
}

console.log('%cRELIEF Cafe 🍵', 'font-size:24px; font-weight:bold; color:#d4a853;');
console.log('%cCoffee · Desserts · Moments', 'font-size:12px; color:#9a9080;');
