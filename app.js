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
  const target = e.target.closest('a, button, .cat-pill, .sig-card, .offer-card, .g-item, .review-card, .soc-btn, .menu-tab-btn, .rv-btn, .menu-card, .extra-item, .cat-modal-tab-btn, .nav-lang-toggle, .relief-social-glass__link, .relief-social-box__btn');
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

function isExtrasCategoryKey(key) {
  const k = (key || '').toLowerCase();
  return k === 'extras' || k === 'extra';
}

function animatePanelItems(panel, tabId) {
  const isExtras = isExtrasCategoryKey(tabId);
  const selector = isExtras ? '.extra-item' : '.menu-card';
  panel.querySelectorAll(selector).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = isExtras ? 'translateX(-16px)' : 'translateY(30px)';
    setTimeout(() => {
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s ease, box-shadow 0.5s ease, background 0.35s ease';
      el.style.opacity = '1';
      el.style.transform = isExtras ? 'translateX(0)' : 'translateY(0)';
    }, i * 60);
  });
}

function switchMenuPanelOnly(tabId, activeCard) {
  document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.cat-ring-card').forEach(c => c.classList.remove('active'));

  const panel = document.getElementById('panel-' + tabId);
  if (panel) {
    panel.classList.add('active');
    if (typeof activeMenuTabId !== 'undefined') activeMenuTabId = tabId;
    animatePanelItems(panel, tabId);
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


const LANG_STORAGE_KEY = 'lang';
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';
let activeMenuTabId = 'coffee';

const CATEGORY_DEFS = [
  { tab: 'coffee', icon: '☕', badge: 'badge-amber' },
  { tab: 'hot', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'milkshakes', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'frappes', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'frappuccino', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'matcha', icon: '🍵', badge: 'badge-cyan' },
  { tab: 'boba', icon: '🧋', badge: 'badge-cyan' },
  { tab: 'mojitos', icon: '🍹', badge: 'badge-cyan' },
  { tab: 'fresh-juices', icon: '🍊', badge: 'badge-cyan' },
  { tab: 'ice-drinks', icon: '🧊', badge: 'badge-cyan' },
  { tab: 'smoothies', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'soft-drinks', icon: '🥤', badge: 'badge-cyan' },
  { tab: 'desserts', icon: '🍰', badge: 'badge-rose' },
  { tab: 'specialty-coffee', icon: '☕', badge: 'badge-cyan' },
  { tab: 'extra', icon: '🧁', badge: 'badge-cyan' }
];

const EXTRA_DESC_I18N = {
  'Add extra tapioca pearls': 'أضف pearls tapioca إضافية',
  'Add an extra shot of espresso': 'أضف جرعة إسبريسو إضافية',
  'Add a scoop of ice cream': 'أضف scoop آis cream',
  'Add natural honey': 'أضف عسل طبيعي',
  'Add your favorite syrup flavor': 'أضف نكهة الشراب المفضلة',
  'Add creamy whipped topping': 'أضف كريمة مخفوقة',
  'Add a crunchy mixed nuts topping': 'أضف topping مكسرات مقرمشة'
};

const translations = {
  en: {
    itemCount: '{n} ITEMS',
    nav: { home: 'Home', story: 'Our Story', signature: 'Signature', menu: 'Menu', hours: 'Open daily' },
    brand: { tagline: 'Coffee · Desserts · Moments' },
    hero: {
      est: 'Est. 2020 — Premium Cafe Experience',
      sub: 'Coffee · Desserts · Moments',
      cta: 'Explore Menu',
      scroll: 'Scroll'
    },
    menu: { eyebrow: 'Our Menu' },
    footer: { quote: '"Crafted with passion, poured with care."' },
    modal: { price: 'PRICE', categoryEyebrow: 'Menu Category' },
    categories: {
      coffee: 'Hot Coffee', hot: 'Hot Drinks', milkshakes: 'Milkshakes', frappes: 'Frappes',
      frappuccino: 'Frappuccino', matcha: 'Matcha', boba: 'Boba', mojitos: 'Mojitos',
      'fresh-juices': 'Fresh Juices', 'ice-drinks': 'Ice Drinks', smoothies: 'Smoothies',
      'soft-drinks': 'Soft Drinks', desserts: 'Desserts', 'specialty-coffee': 'Specialty Coffee',
      extra: 'Extras', extras: 'Extras', iced: 'Iced Drinks', cheesecake: 'Cheesecake',
      waffles: 'Waffles', bakery: 'Bakery'
    },
    panels: {
      coffee: { label: 'Hot Beverages', title: 'Hot Coffee' },
      hot: { label: 'Warm & Cozy', title: 'Hot Drinks' },
      milkshakes: { label: 'Thick & Creamy', title: 'Milkshakes' },
      frappes: { label: 'Blended Ice', title: 'Frappes' },
      frappuccino: { label: 'Blended Coffee', title: 'Frappuccino' },
      matcha: { label: 'Green Tea', title: 'Matcha' },
      boba: { label: 'Bubble Tea', title: 'Boba' },
      mojitos: { label: 'Refreshers', title: 'Mojitos' },
      'fresh-juices': { label: 'Freshly Squeezed', title: 'Fresh Juices' },
      'ice-drinks': { label: 'Iced Selection', title: 'Ice Drinks' },
      smoothies: { label: 'Fruit Blends', title: 'Smoothies' },
      'soft-drinks': { label: 'Chilled Classics', title: 'Soft Drinks' },
      desserts: { label: 'Sweet Moments', title: 'Desserts' },
      'specialty-coffee': { label: 'Premium Coffee', title: 'Specialty Coffee' },
      extra: { label: 'Add Something Extra', title: 'Extras' },
      extras: { label: 'Add Something Extra', title: 'Extras' }
    }
  },
  ar: {
    itemCount: '{n} عنصر',
    nav: { home: 'الرئيسية', story: 'قصتنا', signature: 'المميز', menu: 'القائمة', hours: 'مفتوح يومياً' },
    brand: { tagline: 'قهوة · حلويات · لحظات' },
    hero: {
      est: 'تأسس 2020 — تجربة مقهى فاخرة',
      sub: 'قهوة · حلويات · لحظات',
      cta: 'استكشف القائمة',
      scroll: 'مرّر'
    },
    menu: { eyebrow: 'قائمتنا' },
    footer: { quote: '"صنع بشغف، يُقدّم بعناية."' },
    modal: { price: 'السعر', categoryEyebrow: 'فئة القائمة' },
    categories: {
      coffee: 'قهوة ساخنة', hot: 'مشروبات ساخنة', milkshakes: 'ميلك شيك', frappes: 'فرابيه',
      frappuccino: 'فرابتشينo', matcha: 'ماتشا', boba: 'شاي الفقاعات', mojitos: 'موهيتo',
      'fresh-juices': 'عصائر طازجة', 'ice-drinks': 'مشروبات مثلجة', smoothies: 'سموذي',
      'soft-drinks': 'مشروبات غازية', desserts: 'حلويات', 'specialty-coffee': 'قهوة مختصة',
      extra: 'إضافات', extras: 'إضافات', iced: 'مشروبات مثلجة', cheesecake: 'تشيز كيك',
      waffles: 'وافل', bakery: 'مخبوزات'
    },
    panels: {
      coffee: { label: 'مشروبات ساخنة', title: 'قهوة ساخنة' },
      hot: { label: 'دافئ ومريح', title: 'مشروبات ساخنة' },
      milkshakes: { label: 'كثيف وكريمي', title: 'ميلك شيك' },
      frappes: { label: 'ثلج مخfوق', title: 'فرابيه' },
      frappuccino: { label: 'قهوة مخfوقة', title: 'فرابتشينo' },
      matcha: { label: 'شاي أخضr', title: 'ماتشا' },
      boba: { label: 'شاي الفقاعات', title: 'شاي الفقاعات' },
      mojitos: { label: 'منعشات', title: 'موهيتo' },
      'fresh-juices': { label: 'عصر طازج', title: 'عصائر طازجة' },
      'ice-drinks': { label: 'تشكيلة مثلجة', title: 'مشروبات مثلجة' },
      smoothies: { label: 'خلطات فواكه', title: 'سموذي' },
      'soft-drinks': { label: 'كلاسيكيات باردة', title: 'مشروبات غازية' },
      desserts: { label: 'لحظات حلوة', title: 'حلويات' },
      'specialty-coffee': { label: 'قهوة مميزة', title: 'قهوة مختصة' },
      extra: { label: 'أضف شيئاً إضافياً', title: 'إضافات' },
      extras: { label: 'أضف شيئاً إضافياً', title: 'إضافات' }
    }
  }
};

/** @type {Record<string, { titleEn:string, titleAr:string, eyebrowEn:string, eyebrowAr:string, items: object[] }>} */
let categoryData = {};

function normalizeCategoryKey(catKey) {
  const key = (catKey || '').trim().toLowerCase();
  if (key === 'extra') return 'extras';
  return key;
}

function productAr(nameEn) {
  const map = window.RELIEF_PRODUCT_I18N || {};
  if (map[nameEn]) return map[nameEn];
  console.warn('[i18n] Missing Arabic translation for:', nameEn);
  return nameEn;
}

function bi(nameEn, extra = {}) {
  return { nameEn, nameAr: productAr(nameEn), ...extra };
}

function itemDisplayName(item, lang = currentLang) {
  return lang === 'ar' ? (item.nameAr || item.nameEn) : (item.nameEn || item.nameAr);
}

function itemExtraDesc(item, lang = currentLang) {
  if (lang === 'ar') {
    return item.descAr || EXTRA_DESC_I18N[item.descEn || ''] || item.descEn || item.desc || '';
  }
  return item.descEn || item.desc || '';
}

function t(path, lang = currentLang) {
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), translations[lang]) ?? path;
}

function formatItemCount(count, lang = currentLang) {
  return String(t('itemCount', lang)).replace('{n}', String(count));
}

function getCategoryLabel(catKey, lang = currentLang) {
  const key = normalizeCategoryKey(catKey);
  return translations[lang].categories?.[key] || categoryData[key]?.titleEn || key;
}

function buildModalCategoryItems() {
  return {
    coffee: {
      titleEn: 'Hot Coffee', titleAr: translations.ar.categories.coffee,
      eyebrowEn: 'Hot Beverages', eyebrowAr: translations.ar.panels.coffee.label,
      items: [
        bi('Espresso (Single)', { subtitle: 'Single Shot · Ethiopian Beans', desc: 'Concentrated & rich single shot espresso brewed from fine arabica beans.', price: '55 EGP', tags: ['Single Shot', 'Arabica', 'Rich Crema'], img: 'espresso.png', badge: 'Classic' }),
        bi('Espresso (Double)', { subtitle: 'Double Shot · Intense & Bold', desc: 'Double strength espresso shot delivering a full-bodied aromatic kick.', price: '65 EGP', tags: ['Double Shot', 'Bold', 'Single Origin'], img: 'espresso.png', badge: 'Signature' }),
        bi('Macchiato (Single)', { subtitle: 'Single Shot · Touch of Foam', desc: 'Espresso marked with a delicate dollop of warm milk microfoam.', price: '65 EGP', tags: ['Single Shot', 'Microfoam', 'Balanced'], emoji: '☕' }),
        bi('Macchiato (Double)', { subtitle: 'Double Shot · Touch of Foam', desc: 'Double espresso shot balanced with a light layer of velvety foam.', price: '70 EGP', tags: ['Double Shot', 'Velvety Foam', 'Intense'], emoji: '☕' }),
        bi('Hot Mocha', { subtitle: 'Belgian Chocolate · Espresso · Steamed Milk', desc: 'Rich Belgian chocolate blended with espresso and silky steamed milk.', price: '85 EGP', tags: ['Belgian Chocolate', 'Indulgent', 'Steamed Milk'], emoji: '🍫' }),
        bi('Hot White Mocha', { subtitle: 'White Chocolate · Espresso · Creamy Milk', desc: 'Smooth white chocolate combined with dark espresso and steamed milk.', price: '90 EGP', tags: ['White Chocolate', 'Sweet & Creamy', 'Rich'], emoji: '🤍', badge: 'Popular' }),
        bi('Hot Latte', { subtitle: 'Steamed Milk · Smooth Espresso Shot', desc: 'Classic espresso poured over generous silky steamed milk.', price: '73 EGP', tags: ['Steamed Milk', 'Smooth', 'Comforting'], img: 'hero_coffee.png' }),
        bi('Hot Spanish Latte', { subtitle: 'Condensed Milk · Double Espresso Shot', desc: 'Rich espresso layered with sweet condensed milk & velvety foam.', price: '95 EGP', tags: ['Condensed Milk', 'Sweet', 'Layered'], emoji: '🥛', badge: 'Best Seller' }),
        bi('Hot Caramel Macchiato', { subtitle: 'Vanilla · Steamed Milk · Caramel Drizzle', desc: 'Freshly steamed milk with vanilla syrup, marked with espresso & caramel.', price: '84 EGP', tags: ['Vanilla Syrup', 'Caramel Drizzle', 'Sweet'], emoji: '🍯' }),
        bi('Cappuccino', { subtitle: 'Equal Parts Espresso · Milk · Thick Foam', desc: 'Rich espresso topped with equal layers of steamed milk and fluffy foam.', price: '75 EGP', tags: ['Micro Foam', 'Latte Art', 'Classic'], img: 'hero_coffee.png' }),
        bi('Flat White', { subtitle: 'Double Ristretto · Micro-Foam', desc: 'Smooth double ristretto shot topped with dense micro-textured milk.', price: '75 EGP', tags: ['Double Ristretto', 'Velvety', 'Intense'], emoji: '🤍' }),
        bi('Cortado', { subtitle: 'Equal Parts Espresso & Steamed Milk', desc: 'Harmonious balance of 1:1 espresso and warm steamed milk.', price: '70 EGP', tags: ['Equal Parts', 'Espresso & Milk', 'Balanced'], emoji: '🤎' }),
        bi('Hot Americano', { subtitle: 'Espresso · Hot Water Dilution', desc: 'Espresso diluted with hot water for a smooth, deep coffee flavor.', price: '75 EGP', tags: ['Smooth', 'Clean', 'Classic'], emoji: '☕' }),
        bi('Nescafé', { subtitle: 'Classic Instant Coffee · Milk', desc: 'Comforting mug of classic rich coffee prepared with warm milk.', price: '70 EGP', tags: ['Classic', 'Creamy', 'Comforting'], emoji: '☕' }),
        bi('Black Nescafé', { subtitle: 'Pure Black Coffee · Bold Brew', desc: 'Simple, bold black coffee brewed for a pure caffeine kick.', price: '55 EGP', tags: ['Pure Black', 'Bold', 'Quick Kick'], emoji: '☕' }),
        bi('Turkish Coffee', { subtitle: 'Finely Ground · Traditional Roast', desc: 'Traditional authentic Turkish coffee brewed to perfection with thick foam.', price: '50 EGP', tags: ['Traditional', 'Thick Foam', 'Aromatic'], emoji: '☕', badge: 'Traditional' }),
        bi('Special Turkish Coffee', { subtitle: 'Premium Spiced Turkish Roast', desc: 'Special custom-roasted Turkish coffee infused with aromatic cardamom.', price: '70 EGP', tags: ['Cardamom', 'Custom Roast', 'Premium'], emoji: '☕', badge: 'Chef Special' }),
        bi('Nutella Coffee', { subtitle: 'Real Nutella Spread · Espresso · Milk', desc: 'Warm coffee infused with creamy Nutella hazelnut cocoa spread.', price: '69 EGP', tags: ['Nutella', 'Hazelnut', 'Decadent'], emoji: '🌰', badge: 'Must Try' })
      ]
    },
    iced: {
      titleEn: 'Iced Drinks', titleAr: translations.ar.categories.iced,
      eyebrowEn: 'Cold Refreshment', eyebrowAr: 'منعش وبارد',
      items: [
        bi('Iced Latte', { subtitle: 'Chilled Milk · Double Shot Espresso', desc: 'Espresso poured over chilled milk and crystal-clear ice cubes.', price: '22 - 26 EGP', tags: ['Cold Milk', 'Double Shot', 'Refreshing'], img: 'iced_latte.png', badge: 'Popular' }),
        bi('Iced Spanish Latte', { subtitle: 'Sweet Condensed Milk · Layered Espresso', desc: 'Espresso with sweetened condensed milk served over ice.', price: '25 - 30 EGP', tags: ['Condensed Milk', 'Sweet', 'Layered'], emoji: '🥛', badge: 'Signature' }),
        bi('Iced Mocha', { subtitle: 'Dark Chocolate Sauce · Cold Milk & Ice', desc: 'Cold espresso, dark chocolate sauce, cold milk and ice.', price: '25 - 30 EGP', tags: ['Dark Chocolate', 'Iced', 'Intense'], emoji: '🍫' }),
        bi('Cold Brew Coffee', { subtitle: '18-Hour Slow Steeped · Single Origin', desc: 'Slow-steeped for 18 hours for an exceptionally smooth, sweet brew.', price: '28 EGP', tags: ['18h Steeped', 'Smooth', 'Zero Acidity'], emoji: '🧊', badge: 'Artisan' }),
        bi('Iced V60', { subtitle: 'Flash-Chilled Filter Coffee', desc: 'Pour-over coffee brewed directly over ice for crisp, vibrant clarity.', price: '40 EGP', tags: ['Flash Chilled', 'Vibrant', 'Clean'], emoji: '☕' }),
        bi('Iced Matcha Latte', { subtitle: 'Ceremonial Grade Japanese Matcha', desc: 'Ceremonial grade Japanese matcha whisked with cold milk.', price: '32 EGP', tags: ['Ceremonial Matcha', 'Antioxidants', 'Creamy'], emoji: '🍵' })
      ]
    },
    cheesecake: {
      titleEn: 'Handcrafted Cheesecake', titleAr: translations.ar.categories.cheesecake,
      eyebrowEn: 'Artisan Desserts', eyebrowAr: 'حلويات حرفية',
      items: [
        bi('Lotus Cheesecake', { subtitle: 'Biscoff Crust · Caramelized Drizzle', desc: 'Creamy cheesecake on a crunch Biscoff crust topped with Lotus drizzle.', price: '35 EGP', tags: ['Biscoff Crust', 'Caramel Drizzle', 'Creamy'], img: 'lotus_cheesecake.png', badge: 'Fan Favourite' }),
        bi('San Sebastian', { subtitle: 'Spanish Burnt Basque · Molten Center', desc: 'Crustless Spanish burnt cheesecake with a silky, molten center.', price: '38 EGP', tags: ['Burnt Basque', 'Caramelized Top', 'Silky'], emoji: '🔥', badge: "Chef's Pick" }),
        bi('Chocolate Cheesecake', { subtitle: 'Belgian Chocolate Ganache Glaze', desc: 'Rich Belgian dark chocolate cheesecake with chocolate ganache.', price: '36 EGP', tags: ['Dark Chocolate', 'Ganache Glaze', 'Decadent'], emoji: '🍫' }),
        bi('Strawberry Cheesecake', { subtitle: 'New York Style · Fresh Berry Compote', desc: 'Classic New York style cheesecake topped with fresh strawberry compote.', price: '34 EGP', tags: ['NY Style', 'Fresh Strawberries', 'Fruity'], emoji: '🍓' }),
        bi('Pistachio Cheesecake', { subtitle: 'Italian Pistachio Paste · Crushed Nuts', desc: 'Infused with roasted Italian pistachio paste & topped with crushed nuts.', price: '39 EGP', tags: ['Italian Pistachio', 'Nutty', 'Rich'], emoji: '🥑', badge: 'New' })
      ]
    },
    waffles: {
      titleEn: 'Artisan Waffles', titleAr: translations.ar.categories.waffles,
      eyebrowEn: 'Freshly Baked', eyebrowAr: 'مخبوز طازج',
      items: [
        bi('Nutella Waffle', { subtitle: 'Crisp Belgian Waffle · Warm Nutella', desc: 'Crisp Belgian waffle drizzled with warm Nutella & fresh strawberries.', price: '28 EGP', tags: ['Belgian Crisp', 'Fresh Strawberries', 'Powdered Sugar'], img: 'waffle.png', badge: 'Best Seller' }),
        bi('Lotus Waffle', { subtitle: 'Lotus Biscoff Spread · Biscuit Crunch', desc: 'Topped with Lotus Biscoff spread, crushed biscuits & caramel drizzle.', price: '30 EGP', tags: ['Biscoff Spread', 'Caramel Drizzle', 'Crunchy'], emoji: '🍪', badge: 'New' }),
        bi('Mixed Fruits Waffle', { subtitle: 'Seasonal Berries · Honey Drizzle', desc: 'Topped with fresh berries, banana, honey drizzle & whipped cream.', price: '28 EGP', tags: ['Seasonal Fruits', 'Honey Drizzle', 'Whipped Cream'], emoji: '🍓' }),
        bi('Kinder Waffle', { subtitle: 'Melted Kinder Chocolate · Milk Drops', desc: 'Smothered in melted Kinder chocolate with milk chocolate drops.', price: '32 EGP', tags: ['Kinder Chocolate', 'Melting', 'Sweet'], emoji: '🍫' })
      ]
    },
    desserts: {
      titleEn: 'Signature Desserts', titleAr: translations.ar.categories.desserts,
      eyebrowEn: 'Sweet Moments', eyebrowAr: translations.ar.panels.desserts.label,
      items: [
        bi('Red Velvet Cake', { subtitle: 'Smooth Cream Cheese Frosting', desc: 'Layers of moist red velvet cake with smooth cream cheese frosting.', price: '34 EGP', tags: ['Cream Cheese Frosting', 'Moist', 'Elegant'], emoji: '❤️' }),
        bi('Russian Honey Cake', { subtitle: 'Medovik · Caramelized Honey Layers', desc: 'Traditional Medovik with thin caramelized honey layers & light cream.', price: '40 EGP', tags: ['Medovik', 'Caramelized Honey', 'Layered'], emoji: '🍯', badge: 'Signature' }),
        bi('Tiramisu', { subtitle: 'Espresso Soaked Savoiardi · Mascarpone', desc: 'Italian classic soaked in espresso and layered with mascarpone cream.', price: '36 EGP', tags: ['Espresso Soaked', 'Mascarpone', 'Cocoa Dust'], emoji: '☕' }),
        bi('Chocolate Fondant', { subtitle: 'Warm Molten Lava · Vanilla Gelato', desc: 'Warm chocolate lava cake with a molten center, served with vanilla ice cream.', price: '38 EGP', tags: ['Molten Lava', 'Vanilla Scoop', 'Warm'], emoji: '🌋', badge: 'Must Try' }),
        bi('Fudge Brownies & Ice Cream', { subtitle: 'Warm Chocolate Fudge · Vanilla Bean', desc: 'Decadent chocolate fudge brownie served warm with vanilla bean gelato.', price: '32 EGP', tags: ['Warm Fudge', 'Vanilla Gelato', 'Rich'], emoji: '🍨' })
      ]
    },
    bakery: {
      titleEn: 'Fresh Bakery', titleAr: translations.ar.categories.bakery,
      eyebrowEn: 'Daily Oven', eyebrowAr: 'فرن يومي',
      items: [
        bi('Butter Croissant', { subtitle: 'French Butter · Baked Fresh Daily', desc: 'Flaky, golden French croissant baked fresh every morning.', price: '16 EGP', tags: ['French Butter', 'Flaky', 'Fresh Daily'], emoji: '🥐', badge: 'Fresh Daily' }),
        bi('Almond Croissant', { subtitle: 'Almond Frangipane · Toasted Almonds', desc: 'Filled with rich almond frangipane cream and topped with toasted almonds.', price: '22 EGP', tags: ['Almond Cream', 'Toasted Almonds', 'Sweet'], emoji: '🥐' }),
        bi('Pain au Chocolat', { subtitle: 'Dark Chocolate Bars · Flaky Layers', desc: 'Classic French pastry filled with two bars of dark chocolate.', price: '20 EGP', tags: ['Dark Chocolate', 'Flaky Layers', 'Classic'], emoji: '🍫' }),
        bi('Cheese Danish', { subtitle: 'Savory Cream Cheese · Herb Crust', desc: 'Puff pastry filled with savory cream cheese and herbs.', price: '18 EGP', tags: ['Savory Cheese', 'Puff Pastry', 'Warm'], emoji: '🧀' }),
        bi('Cinnamon Roll', { subtitle: 'Soft Bun · Cream Cheese Glaze', desc: 'Soft baked bun rolled with cinnamon sugar and cream cheese glaze.', price: '24 EGP', tags: ['Cinnamon Sugar', 'Cream Cheese Glaze', 'Soft'], emoji: '🌀', badge: 'Best Seller' })
      ]
    },
    extras: {
      titleEn: 'Extras', titleAr: translations.ar.categories.extras,
      eyebrowEn: 'Add Something Extra', eyebrowAr: translations.ar.panels.extras.label,
      items: [
        bi('Boba Pearls', { descEn: 'Add extra tapioca pearls', price: '35 EGP' }),
        bi('Extra Espresso', { descEn: 'Add an extra shot of espresso', price: '45 EGP' }),
        bi('Ice Cream Scoop', { descEn: 'Add a scoop of ice cream', price: '30 EGP' }),
        bi('Honey', { descEn: 'Add natural honey', price: '25 EGP' }),
        bi('Flavor Syrup', { descEn: 'Add your favorite syrup flavor', price: '35 EGP' }),
        bi('Whipped Cream', { descEn: 'Add creamy whipped topping', price: '35 EGP' }),
        bi('Mixed Nuts', { descEn: 'Add a crunchy mixed nuts topping', price: '35 EGP' })
      ].map(it => ({ ...it, descAr: EXTRA_DESC_I18N[it.descEn] || it.descEn }))
    }
  };
}

function scrapeMenuCard(card) {
  const nameEn = card.dataset.nameEn || card.querySelector('.card-name')?.textContent?.trim() || 'Item';
  return bi(nameEn, {
    tags: [...card.querySelectorAll('.card-tag')].map(el => el.textContent.trim()),
    priceCols: [...card.querySelectorAll('.price-col')].map(col => ({
      size: col.querySelector('.price-size')?.textContent?.trim() || '',
      valHtml: col.querySelector('.price-val')?.innerHTML?.trim() || ''
    })),
    imgSrc: card.querySelector('.card-img-wrap img')?.getAttribute('src') || '',
    imgAlt: card.querySelector('.card-img-wrap img')?.getAttribute('alt') || nameEn,
    badge: card.querySelector('.card-badge')?.textContent?.trim() || '',
    dataCat: card.getAttribute('data-cat') || ''
  });
}

function scrapeExtraRow(row) {
  const nameEn = row.dataset.nameEn || row.querySelector('.extra-name')?.textContent?.trim() || 'Extra';
  const descEn = row.querySelector('.extra-description')?.textContent?.trim() || '';
  const priceText = row.querySelector('.extra-price')?.innerHTML?.trim() || '';
  return bi(nameEn, {
    descEn,
    descAr: EXTRA_DESC_I18N[descEn] || descEn,
    price: priceText
  });
}

function syncPanelsIntoCategoryData() {
  document.querySelectorAll('.menu-panel[id^="panel-"]').forEach(panel => {
    const tabId = panel.id.replace(/^panel-/, '');
    const key = normalizeCategoryKey(tabId);
    const panelMeta = translations.en.panels[key] || { label: '', title: tabId };
    const panelMetaAr = translations.ar.panels[key] || { label: '', title: tabId };
    const cards = [...panel.querySelectorAll('.menu-card')].map(scrapeMenuCard);
    const extras = [...panel.querySelectorAll('.extra-item')].map(scrapeExtraRow);
    const items = extras.length ? extras : cards;
    if (!items.length) return;
    categoryData[key] = {
      titleEn: panelMeta.title,
      titleAr: panelMetaAr.title,
      eyebrowEn: panelMeta.label,
      eyebrowAr: panelMetaAr.label,
      items
    };
  });
}

function buildFullCategoryData() {
  categoryData = buildModalCategoryItems();
  syncPanelsIntoCategoryData();
  window.categoryData = categoryData;
}

function buildMenuCardHtml(item, lang, catKey) {
  const name = itemDisplayName(item, lang);
  const tags = (item.tags || []).map(tag => `<span class="card-tag">${tag}</span>`).join('');
  const badge = item.badge ? `<div class="card-badge">${item.badge}</div>` : '';
  const imgBlock = item.imgSrc
    ? `<img src="${item.imgSrc}" alt="${name}" loading="lazy" width="400" height="300" />`
    : `<div class="card-placeholder ph-coffee">☕</div>`;
  const priceCols = (item.priceCols || []).map(col => `
    <div class="price-col">
      ${col.size ? `<span class="price-size">${col.size}</span>` : '<span class="price-size"></span>'}
      <span class="price-val">${col.valHtml || ''}</span>
    </div>`).join('');
  const dataCat = item.dataCat || catKey;
  return `
    <div class="menu-card" data-action="open-category" data-cat="${dataCat}" data-name-en="${item.nameEn}">
      <div class="card-img-wrap">
        ${imgBlock}
        <div class="card-img-overlay"></div>
        ${badge}
      </div>
      <div class="card-body">
        <div class="card-name">${name}</div>
        ${tags ? `<div class="card-tags">${tags}</div>` : ''}
        ${priceCols ? `<div class="card-prices">${priceCols}</div>` : ''}
      </div>
    </div>`;
}

function buildExtrasListHtml(items, lang = currentLang) {
  let html = '<div class="extras-list" role="list">';
  items.forEach((item, index) => {
    const num = String(index + 1).padStart(2, '0');
    const description = itemExtraDesc(item, lang);
    html += `
      <div class="extra-item" role="listitem" style="--item-index: ${index};" data-name-en="${item.nameEn}">
        <div class="extra-number" aria-hidden="true">${num}</div>
        <div class="extra-info">
          <div class="extra-name">${itemDisplayName(item, lang)}</div>
          ${description ? `<div class="extra-description">${description}</div>` : ''}
        </div>
        <div class="extra-price">${formatExtraPrice(item.price)}</div>
      </div>`;
  });
  html += '</div>';
  return html;
}

function formatExtraPrice(price) {
  if (price == null || price === '') return '';
  const str = String(price).trim();
  if (str.includes('<')) return str;
  const match = str.match(/(\d+(?:\.\d+)?)/);
  if (!match) return str;
  return `<span class="price-unit">EGP </span>${match[1]}`;
}

function buildModalGridHtml(items, lang = currentLang) {
  let html = '<div class="modal-grid">';
  items.forEach((item, index) => {
    const name = itemDisplayName(item, lang);
    const badgeHtml = item.badge ? `<div class="modal-card-badge">${item.badge}</div>` : '';
    let visualHtml = item.img
      ? `<img src="${item.img}" alt="${name}" class="modal-card-img" loading="lazy" />`
      : `<div class="modal-card-placeholder">${item.emoji || '☕'}</div>`;
    const subtitleText = item.subtitle || (item.tags ? item.tags.join(' · ') : '');
    const tagsHtml = item.tags ? item.tags.map(tag => `<span class="modal-card-tag">${tag}</span>`).join('') : '';
    html += `
      <div class="modal-card" style="--card-index: ${index};">
        <div class="modal-card-img-wrap">${visualHtml}${badgeHtml}</div>
        <div class="modal-card-content">
          <h3 class="modal-card-title">${name}</h3>
          ${subtitleText ? `<p class="modal-card-subtitle">${subtitleText}</p>` : ''}
          ${item.desc ? `<p class="modal-card-desc">${item.desc}</p>` : ''}
          <div class="modal-card-tags">${tagsHtml}</div>
          <div class="modal-card-footer">
            <span class="modal-card-price-label">${t('modal.price', lang)}</span>
            <span class="modal-card-price">${item.price || ''}</span>
          </div>
        </div>
      </div>`;
  });
  html += '</div>';
  return html;
}

function renderCategoryCarousel(lang = currentLang) {
  const track = document.getElementById('catRingTrack');
  if (!track) return;
  const prevActive = catCarouselState.cards[catCarouselState.activeIndex]?.dataset?.tab || activeMenuTabId;
  track.innerHTML = CATEGORY_DEFS.map((def, index) => {
    const key = normalizeCategoryKey(def.tab);
    const title = getCategoryLabel(def.tab, lang);
    const count = categoryData[key]?.items?.length ?? 0;
    const activeClass = def.tab === prevActive ? ' active' : '';
    return `
      <div class="cat-ring-card${activeClass}" id="tab-${def.tab}" data-tab="${def.tab}" data-index="${index}">
        <div class="cat-glass-badge ${def.badge}">
          <span class="cat-icon">${def.icon}</span>
        </div>
        <div class="cat-card-content">
          <span class="cat-card-title">${title}</span>
          <span class="cat-card-count">${formatItemCount(count, lang)}</span>
        </div>
      </div>`;
  }).join('');
  const newIndex = CATEGORY_DEFS.findIndex(c => c.tab === prevActive);
  catCarouselState.activeIndex = newIndex >= 0 ? newIndex : 0;
  initCatCarousel3D();
}

function renderMenuPanel(tabId, lang = currentLang) {
  const key = normalizeCategoryKey(tabId);
  const data = categoryData[key];
  const panel = document.getElementById(`panel-${tabId}`);
  if (!panel || !data) return;

  const meta = translations[lang].panels?.[key];
  const labelEl = panel.querySelector('.panel-head-label');
  const titleEl = panel.querySelector('.panel-head-title em') || panel.querySelector('.panel-head-title');
  if (labelEl && meta?.label) labelEl.textContent = meta.label;
  if (titleEl && meta?.title) titleEl.textContent = meta.title;

  if (key === 'extras') {
    let list = panel.querySelector('.extras-list');
    if (!list) {
      list = document.createElement('div');
      panel.querySelector('.container')?.appendChild(list);
    }
    list.outerHTML = buildExtrasListHtml(data.items, lang);
  } else {
    const grid = panel.querySelector('.menu-v-grid');
    if (grid) {
      grid.innerHTML = data.items.map(item => buildMenuCardHtml(item, lang, key)).join('');
    }
  }
}

function renderAllMenuPanels(lang = currentLang) {
  CATEGORY_DEFS.forEach(def => renderMenuPanel(def.tab, lang));
}

function updateCategoryCounts(lang = currentLang) {
  document.querySelectorAll('.cat-ring-card[data-tab]').forEach(card => {
    const key = normalizeCategoryKey(card.dataset.tab);
    const count = categoryData[key]?.items?.length ?? 0;
    const countEl = card.querySelector('.cat-card-count');
    if (countEl) countEl.textContent = formatItemCount(count, lang);
  });
}

function applyStaticTranslations(lang = currentLang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = t(key, lang);
    if (typeof value === 'string') el.textContent = value;
  });
}

function applyTranslations(lang) {
  const next = lang === 'ar' ? 'ar' : 'en';
  currentLang = next;
  localStorage.setItem(LANG_STORAGE_KEY, currentLang);

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.classList.add('lang-switching');

  applyStaticTranslations(currentLang);
  renderCategoryCarousel(currentLang);
  renderAllMenuPanels(currentLang);
  updateCategoryCounts(currentLang);

  const activePanel = document.querySelector('.menu-panel.active');
  if (activePanel) {
    activeMenuTabId = activePanel.id.replace(/^panel-/, '');
    animatePanelItems(activePanel, activeMenuTabId);
  }

  if (typeof catModalOverlay !== 'undefined' && catModalOverlay?.classList.contains('open')) {
    const activeTab = document.querySelector('.cat-modal-tab-btn.active');
    renderModalCategoryContent(activeTab?.dataset.cat || 'coffee');
  }

  updateLangToggleUI();

  requestAnimationFrame(() => {
    document.documentElement.classList.remove('lang-switching');
  });
}

function setLanguage(lang) {
  if ((lang === 'ar' ? 'ar' : 'en') === currentLang) return;
  applyTranslations(lang);
}
window.setLanguage = setLanguage;

function toggleLanguage() {
  setLanguage(currentLang === 'en' ? 'ar' : 'en');
}
window.toggleLanguage = toggleLanguage;

function updateLangToggleUI() {
  const codeEl = document.getElementById('langToggleCode');
  const toggle = document.getElementById('langToggle');
  if (codeEl) codeEl.textContent = currentLang === 'en' ? 'AR' : 'EN';
  if (toggle) {
    toggle.classList.toggle('is-ar-active', currentLang === 'ar');
    toggle.setAttribute('aria-label', currentLang === 'en' ? 'Switch to Arabic' : 'Switch to English');
  }
}

const catModalOverlay = document.getElementById('catModalOverlay');
const catModalClose   = document.getElementById('catModalClose');
const catModalTitle   = document.getElementById('catModalTitle');
const catModalEyebrow = document.getElementById('catModalEyebrow');
const catModalBody    = document.getElementById('catModalBody');

function renderModalCategoryContent(catKey) {
  const categoryKey = normalizeCategoryKey(catKey);
  const data = categoryData[categoryKey];
  if (!data) return;

  const panelCopy = translations[currentLang].panels?.[categoryKey];
  if (catModalEyebrow) {
    catModalEyebrow.textContent = panelCopy?.label || data.eyebrowEn || t('modal.categoryEyebrow');
  }
  if (catModalTitle) catModalTitle.textContent = getCategoryLabel(categoryKey);

  document.querySelectorAll('.cat-modal-tab-btn').forEach(btn => {
    btn.classList.toggle('active', normalizeCategoryKey(btn.dataset.cat) === categoryKey);
  });

  if (catModalBody) {
    catModalBody.classList.toggle('extras-layout', categoryKey === 'extras');
    catModalBody.innerHTML = categoryKey === 'extras'
      ? buildExtrasListHtml(data.items, currentLang)
      : buildModalGridHtml(data.items, currentLang);
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

function closeCategoryModal() {
  if (!catModalOverlay) return;
  catModalOverlay.classList.add('closing');
  catModalOverlay.classList.remove('open');
  setTimeout(() => {
    catModalOverlay.classList.remove('closing');
    document.body.style.overflow = '';
  }, 350);
}

let reliefI18nEventsBound = false;

function initReliefI18n() {
  buildFullCategoryData();
  applyTranslations(localStorage.getItem(LANG_STORAGE_KEY) || 'en');

  if (reliefI18nEventsBound) return;
  reliefI18nEventsBound = true;

  document.getElementById('langToggle')?.addEventListener('click', toggleLanguage);

  catModalClose?.addEventListener('click', closeCategoryModal);
  catModalOverlay?.addEventListener('click', (e) => {
    if (e.target === catModalOverlay) closeCategoryModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && catModalOverlay?.classList.contains('open')) closeCategoryModal();
  });
  document.querySelectorAll('.cat-modal-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => renderModalCategoryContent(btn.dataset.cat));
  });
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-action="open-category"]');
    if (trigger?.dataset.cat) openCategoryModal(trigger.dataset.cat);
  });
}

window.initReliefI18n = initReliefI18n;
window.updateCategoryCounts = updateCategoryCounts;
window.renderModalCategoryContent = renderModalCategoryContent;
window.openCategoryModal = openCategoryModal;
window.closeCategoryModal = closeCategoryModal;
window.buildFullCategoryData = buildFullCategoryData;
window.getCategoryLabel = getCategoryLabel;
window.categoryData = categoryData;

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

/* ── Card Tilt Effect — event delegation (works after i18n re-render) ── */
document.addEventListener('mousemove', e => {
  const card = e.target.closest('.menu-card, .sig-card');
  if (!card || !card.closest('#menu, #signature')) return;
  const rect = card.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) / (rect.width / 2);
  const dy = (e.clientY - cy) / (rect.height / 2);
  card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  card.style.transform = `translateY(-6px) rotateX(${(-dy * 3).toFixed(1)}deg) rotateY(${(dx * 3).toFixed(1)}deg)`;
});
document.addEventListener('mouseout', e => {
  const card = e.target.closest('.menu-card, .sig-card');
  if (card && !card.contains(e.relatedTarget)) card.style.transform = '';
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
  if (typeof initReliefI18n === 'function') {
    initReliefI18n();
  } else {
    initCatCarousel3D();
  }
});

console.log('%cRELIEF Cafe 🍵', 'font-size:24px; font-weight:bold; color:#d4a853;');
console.log('%cCoffee · Desserts · Moments', 'font-size:12px; color:#9a9080;');