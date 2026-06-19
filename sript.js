/* ===================================================================
   FY RIAH — SCRIPT.JS
   Logique complète du site : catalogue, panier, recherche, filtres,
   formulaires, menu mobile, animations au défilement.
   =================================================================== */

(function () {
  'use strict';

  /* =================================================================
     1. DONNÉES PRODUITS (démo — 14 articles)
     ================================================================= */
  const products = [
    { id: 1,  name: "Robe Soirée Améthyste",      category: "mode",        categoryLabel: "Mode",        price: 89000,  oldPrice: 120000, rating: 4.8, reviews: 124, badge: "promo",      popular: true,  icon: "fa-solid fa-person-dress",      description: "Robe longue fluide en satin violet, idéale pour vos soirées élégantes." },
    { id: 2,  name: "Sac à Main Cuir Violet",      category: "accessoires", categoryLabel: "Accessoires", price: 150000, oldPrice: null,   rating: 4.9, reviews: 98,  badge: "new",        popular: true,  icon: "fa-solid fa-bag-shopping",      description: "Sac en cuir véritable, finitions soignées et compartiment intérieur zippé." },
    { id: 3,  name: "Montre Élégance Noire",       category: "accessoires", categoryLabel: "Accessoires", price: 185000, oldPrice: 230000, rating: 4.7, reviews: 76,  badge: "promo",      popular: true,  icon: "fa-solid fa-clock",             description: "Montre au boîtier noir mat et bracelet acier, pour un style intemporel." },
    { id: 4,  name: "Parfum Améthyste Intense",    category: "beaute",      categoryLabel: "Beauté",      price: 65000,  oldPrice: null,   rating: 4.9, reviews: 210, badge: "bestseller", popular: true,  icon: "fa-solid fa-spray-can-sparkles",description: "Eau de parfum boisée et florale, sillage longue durée." },
    { id: 5,  name: "Chemise Lin Blanche Premium", category: "mode",        categoryLabel: "Mode",        price: 55000,  oldPrice: null,   rating: 4.5, reviews: 61,  badge: null,         popular: false, icon: "fa-solid fa-shirt",             description: "Chemise en lin respirant, coupe ajustée pour toutes les occasions." },
    { id: 6,  name: "Collier Pendentif Violine",   category: "accessoires", categoryLabel: "Accessoires", price: 45000,  oldPrice: 58000,  rating: 4.8, reviews: 143, badge: "promo",      popular: true,  icon: "fa-solid fa-gem",               description: "Collier fin avec pendentif serti d'une pierre violette facettée." },
    { id: 7,  name: "Crème Hydratante Éclat",      category: "beaute",      categoryLabel: "Beauté",      price: 38000,  oldPrice: null,   rating: 4.6, reviews: 87,  badge: null,         popular: false, icon: "fa-solid fa-droplet",           description: "Soin visage hydratant à l'acide hyaluronique, pour une peau repulpée." },
    { id: 8,  name: "Blazer Tailleur Premium",     category: "mode",        categoryLabel: "Mode",        price: 175000, oldPrice: null,   rating: 4.7, reviews: 54,  badge: "new",        popular: false, icon: "fa-solid fa-vest",              description: "Blazer structuré à la coupe impeccable, parfait du bureau aux soirées." },
    { id: 9,  name: "Lunettes de Soleil Glam",     category: "accessoires", categoryLabel: "Accessoires", price: 60000,  oldPrice: null,   rating: 4.4, reviews: 39,  badge: null,         popular: false, icon: "fa-solid fa-glasses",           description: "Monture tendance avec verres polarisés anti-UV." },
    { id: 10, name: "Coussin Velours Royal",       category: "maison",      categoryLabel: "Maison",      price: 32000,  oldPrice: 42000,  rating: 4.5, reviews: 28,  badge: "promo",      popular: false, icon: "fa-solid fa-couch",             description: "Coussin en velours doux, parfait pour sublimer votre salon." },
    { id: 11, name: "Bougie Parfumée Lavande",     category: "maison",      categoryLabel: "Maison",      price: 28000,  oldPrice: null,   rating: 4.6, reviews: 45,  badge: null,         popular: false, icon: "fa-solid fa-fire",              description: "Bougie artisanale à la cire végétale, notes apaisantes de lavande." },
    { id: 12, name: "Écharpe Soie Imprimée",       category: "mode",        categoryLabel: "Mode",        price: 47000,  oldPrice: null,   rating: 4.3, reviews: 22,  badge: null,         popular: false, icon: "fa-solid fa-ribbon",            description: "Écharpe en soie douce à motifs exclusifs, légère en toute saison." },
    { id: 13, name: "Bracelet Manchette Violet",   category: "accessoires", categoryLabel: "Accessoires", price: 52000,  oldPrice: 65000,  rating: 4.7, reviews: 66,  badge: "promo",      popular: true,  icon: "fa-solid fa-ring",              description: "Bracelet manchette doré orné de touches violettes raffinées." },
    { id: 14, name: "Trousse Maquillage Premium",  category: "beaute",      categoryLabel: "Beauté",      price: 42000,  oldPrice: null,   rating: 4.5, reviews: 33,  badge: "new",        popular: false, icon: "fa-solid fa-paintbrush",        description: "Trousse complète : palette, pinceaux et accessoires essentiels." }
  ];

  /* Avis clients (démo) */
  const reviews = [
    { name: "Hary R.",      role: "Antananarivo", rating: 5, text: "Le sac en cuir est encore plus beau en vrai. Livraison rapide et emballage très soigné !" },
    { name: "Mialy F.",     role: "Fianarantsoa",  rating: 5, text: "J'adore la robe Améthyste, la coupe est parfaite. Fy Riah est devenue ma boutique préférée." },
    { name: "Tojo N.",      role: "Toamasina",     rating: 4, text: "Très bon rapport qualité-prix sur la montre. Le service client a répondu très vite à mes questions." },
    { name: "Sitraka A.",   role: "Antsirabe",     rating: 5, text: "Le parfum Améthyste tient toute la journée. Je recommande à 100%, ça sent vraiment le premium." },
    { name: "Voahangy L.",  role: "Mahajanga",     rating: 5, text: "Commande reçue en parfait état, le collier est magnifique. Je repasserai commande très vite." },
    { name: "Andry M.",     role: "Antananarivo",  rating: 4, text: "Site facile à utiliser, panier clair, et le blazer est superbement coupé. Très satisfait." }
  ];

  /* =================================================================
     2. UTILITAIRES
     ================================================================= */
  const $  = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  function formatPrice(value) {
    return value.toLocaleString('fr-FR').replace(/,/g, ' ') + ' Ar';
  }

  function gradientClass(id) {
    return 'g' + (((id - 1) % 6) + 1);
  }

  function badgeLabel(badge) {
    if (badge === 'promo') return 'Promo';
    if (badge === 'new') return 'Nouveau';
    if (badge === 'bestseller') return 'Bestseller';
    return '';
  }

  function starsHTML(rating) {
    const full = Math.round(rating);
    let html = '';
    for (let i = 1; i <= 5; i++) {
      html += `<i class="fa-${i <= full ? 'solid' : 'regular'} fa-star"></i>`;
    }
    return html;
  }

  function initials(name) {
    return name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  /* =================================================================
     3. PANIER (avec persistance localStorage)
     ================================================================= */
  let cart = [];
  try {
    const saved = localStorage.getItem('fyriah_cart');
    cart = saved ? JSON.parse(saved) : [];
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    try { localStorage.setItem('fyriah_cart', JSON.stringify(cart)); } catch (e) { /* stockage indisponible */ }
  }

  function findProduct(id) {
    return products.find(p => p.id === id);
  }

  function addToCart(id, qty) {
    qty = qty || 1;
    const item = cart.find(c => c.id === id);
    if (item) { item.qty += qty; } else { cart.push({ id: id, qty: qty }); }
    saveCart();
    renderCart();
  }

  function changeQty(id, delta) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(c => c.id !== id);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveCart();
    renderCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
    renderCart();
  }

  function cartCount() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
  }

  function cartTotal() {
    return cart.reduce((sum, c) => {
      const p = findProduct(c.id);
      return p ? sum + p.price * c.qty : sum;
    }, 0);
  }

  function renderCart() {
    const itemsEl = $('#cart-items');
    const drawer = $('#cart-drawer');
    const countEl = $('#cart-count');

    const count = cartCount();
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);
    drawer.classList.toggle('is-empty', cart.length === 0);

    itemsEl.innerHTML = cart.map(c => {
      const p = findProduct(c.id);
      if (!p) return '';
      return `
        <div class="cart-item" data-id="${p.id}">
          <div class="cart-item-visual ${gradientClass(p.id)}"><i class="${p.icon}"></i></div>
          <div class="cart-item-info">
            <h5>${p.name}</h5>
            <span class="unit-price">${formatPrice(p.price)} / unité</span>
            <div class="qty-control">
              <button class="qty-minus" aria-label="Diminuer la quantité"><i class="fa-solid fa-minus"></i></button>
              <span>${c.qty}</span>
              <button class="qty-plus" aria-label="Augmenter la quantité"><i class="fa-solid fa-plus"></i></button>
            </div>
          </div>
          <div class="cart-item-right">
            <span class="cart-item-subtotal">${formatPrice(p.price * c.qty)}</span>
            <button class="remove-btn" aria-label="Retirer du panier"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    }).join('');

    $('#cart-total').textContent = formatPrice(cartTotal());
  }

  /* Délégation des clics dans le panier (quantité / suppression) */
  $('#cart-items').addEventListener('click', function (e) {
    const itemEl = e.target.closest('.cart-item');
    if (!itemEl) return;
    const id = parseInt(itemEl.dataset.id, 10);
    if (e.target.closest('.qty-plus')) changeQty(id, 1);
    else if (e.target.closest('.qty-minus')) changeQty(id, -1);
    else if (e.target.closest('.remove-btn')) {
      removeFromCart(id);
      showToast('Produit retiré du panier', 'info');
    }
  });

  /* =================================================================
     4. RENDU DES PRODUITS (catalogue + populaires)
     ================================================================= */
  function productCardHTML(p) {
    const badge = p.badge ? `<span class="badge badge-${p.badge}">${badgeLabel(p.badge)}</span>` : '';
    const oldPrice = p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : '';
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-visual ${gradientClass(p.id)}">
          ${badge}
          <i class="${p.icon}"></i>
        </div>
        <div class="product-info">
          <span class="product-category">${p.categoryLabel}</span>
          <h3 class="product-name">${p.name}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-rating">${starsHTML(p.rating)} <span>(${p.reviews})</span></div>
          <div class="product-price-row">
            <span class="price-current">${formatPrice(p.price)}</span>
            ${oldPrice}
          </div>
          <button class="btn-add-cart" data-id="${p.id}"><i class="fa-solid fa-bag-shopping"></i> Ajouter au panier</button>
        </div>
      </article>`;
  }

  function renderProducts(list) {
    const grid = $('#product-grid');
    const noResults = $('#no-results');
    if (list.length === 0) {
      grid.innerHTML = '';
      noResults.classList.add('show');
      return;
    }
    noResults.classList.remove('show');
    grid.innerHTML = list.map(productCardHTML).join('');
  }

  function renderPopular() {
    const track = $('#popular-track');
    const popular = products.filter(p => p.popular);
    track.innerHTML = popular.map(productCardHTML).join('');
  }

  /* Délégation : bouton "Ajouter au panier" sur toutes les grilles produits */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-add-cart');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    const product = findProduct(id);
    if (!product) return;

    addToCart(id, 1);
    showToast(`${product.name} ajouté au panier`, 'success');

    const cartBtn = $('#cart-toggle');
    cartBtn.classList.remove('bump');
    requestAnimationFrame(() => cartBtn.classList.add('bump'));

    const originalHTML = btn.innerHTML;
    btn.classList.add('added');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Ajouté';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = originalHTML;
    }, 1300);
  });

  /* =================================================================
     5. RECHERCHE & FILTRES PAR CATÉGORIE
     ================================================================= */
  let activeCategory = 'tous';
  let searchTerm = '';

  function applyFilters() {
    const term = searchTerm.trim().toLowerCase();
    const filtered = products.filter(p => {
      const matchCategory = activeCategory === 'tous' || p.category === activeCategory;
      const matchSearch = !term ||
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term);
      return matchCategory && matchSearch;
    });
    renderProducts(filtered);
  }

  $('#search-input').addEventListener('input', function (e) {
    searchTerm = e.target.value;
    applyFilters();
  });

  $$('.chip').forEach(chip => {
    chip.addEventListener('click', function () {
      $$('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.dataset.category;
      applyFilters();
    });
  });

  /* Icône loupe de la navbar : va à la boutique et place le focus sur la recherche */
  $('#search-toggle').addEventListener('click', function () {
    document.getElementById('boutique').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => $('#search-input').focus(), 450);
  });

  /* =================================================================
     6. AVIS CLIENTS
     ================================================================= */
  function renderReviews() {
    const track = $('#reviews-track');
    track.innerHTML = reviews.map(r => `
      <div class="review-card">
        <div class="review-stars">${starsHTML(r.rating)}</div>
        <p class="review-text">${r.text}</p>
        <div class="review-author">
          <div class="avatar-circle">${initials(r.name)}</div>
          <div>
            <strong>${r.name}</strong>
            <span>${r.role}</span>
          </div>
        </div>
      </div>`).join('');
  }

  $('#reviews-prev').addEventListener('click', () => $('#reviews-track').scrollBy({ left: -320, behavior: 'smooth' }));
  $('#reviews-next').addEventListener('click', () => $('#reviews-track').scrollBy({ left: 320, behavior: 'smooth' }));

  /* =================================================================
     7. PANIER LATÉRAL — OUVERTURE / FERMETURE
     ================================================================= */
  const overlay = $('#overlay');
  const cartDrawer = $('#cart-drawer');
  const navMenu = $('#nav-menu');
  const hamburger = $('#hamburger-btn');
  const orderModal = $('#order-modal');

  function closeAllPanels() {
    cartDrawer.classList.remove('open');
    navMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    orderModal.classList.remove('open');
    overlay.classList.remove('active');
  }

  function openCart() {
    closeAllPanels();
    renderCart();
    cartDrawer.classList.add('open');
    overlay.classList.add('active');
  }

  $('#cart-toggle').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeAllPanels);
  $('#continue-shopping').addEventListener('click', closeAllPanels);

  $('#checkout-btn').addEventListener('click', function () {
    if (cart.length === 0) return;
    const total = formatPrice(cartTotal());
    const count = cartCount();
    $('#order-modal-text').textContent =
      `Votre commande de ${count} article${count > 1 ? 's' : ''} (${total}) a été enregistrée. Notre équipe vous contactera très bientôt.`;
    clearCart();
    closeAllPanels();
    orderModal.classList.add('open');
    overlay.classList.add('active');
  });

  $('#modal-close').addEventListener('click', closeAllPanels);

  /* =================================================================
     8. MENU MOBILE (hamburger)
     ================================================================= */
  hamburger.addEventListener('click', function () {
    const isOpen = navMenu.classList.contains('open');
    closeAllPanels();
    if (!isOpen) {
      navMenu.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
    }
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', closeAllPanels);
  });

  overlay.addEventListener('click', closeAllPanels);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllPanels();
  });

  /* =================================================================
     9. NAVIGATION : fond au scroll + lien actif
     ================================================================= */
  const navbar = $('#navbar');

  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    $('#back-to-top').classList.toggle('show', window.scrollY > 420);
    updateActiveLink();
  });

  function updateActiveLink() {
    const scrollPos = window.scrollY + 140;
    let currentId = '';
    $$('section[id]').forEach(sec => {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    $$('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  $('#back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =================================================================
     10. BARRE D'ANNONCE — messages tournants
     ================================================================= */
  const announcements = [
    "✨ Livraison offerte à partir de 100 000 Ar",
    "🎉 Jusqu'à -25% sur une sélection de produits",
    "💜 Nouvelle collection disponible dès maintenant"
  ];
  let annIndex = 0;
  const annText = $('#announcement-text');
  setInterval(() => {
    annIndex = (annIndex + 1) % announcements.length;
    annText.style.opacity = 0;
    setTimeout(() => {
      annText.textContent = announcements[annIndex];
      annText.style.opacity = 1;
    }, 250);
  }, 4500);

  $('#announcement-close').addEventListener('click', () => {
    $('#announcement-bar').classList.add('hidden');
  });

  /* =================================================================
     11. TOASTS
     ================================================================= */
  function showToast(message, type) {
    type = type || 'info';
    const icons = { success: 'fa-circle-check', error: 'fa-circle-exclamation', info: 'fa-circle-info' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fa-solid ${icons[type]}"></i><span>${message}</span>`;
    $('#toast-container').appendChild(toast);
    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  /* =================================================================
     12. FORMULAIRE DE CONTACT — validation JavaScript
     ================================================================= */
  const contactForm = $('#contact-form');
  const fields = {
    name: { input: $('#cf-name'), error: $('#err-name') },
    email: { input: $('#cf-email'), error: $('#err-email') },
    subject: { input: $('#cf-subject'), error: $('#err-subject') },
    message: { input: $('#cf-message'), error: $('#err-message') }
  };

  function setError(field, message) {
    field.input.closest('.form-group').classList.toggle('error', !!message);
    field.error.textContent = message || '';
  }

  function validateField(key) {
    const value = fields[key].input.value.trim();
    if (key === 'name') {
      if (value.length < 2) { setError(fields.name, 'Veuillez indiquer votre nom (2 caractères minimum).'); return false; }
    }
    if (key === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(value)) { setError(fields.email, 'Veuillez saisir une adresse e-mail valide.'); return false; }
    }
    if (key === 'subject') {
      if (!value) { setError(fields.subject, 'Veuillez choisir un sujet.'); return false; }
    }
    if (key === 'message') {
      if (value.length < 10) { setError(fields.message, 'Votre message doit contenir au moins 10 caractères.'); return false; }
    }
    setError(fields[key], '');
    return true;
  }

  Object.keys(fields).forEach(key => {
    fields[key].input.addEventListener('blur', () => validateField(key));
    fields[key].input.addEventListener('input', () => {
      if (fields[key].input.closest('.form-group').classList.contains('error')) validateField(key);
    });
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const results = Object.keys(fields).map(validateField);
    const allValid = results.every(Boolean);
    if (!allValid) {
      showToast('Merci de corriger les champs en rouge.', 'error');
      return;
    }

    const submitBtn = $('#cf-submit');
    submitBtn.classList.add('is-loading');

    setTimeout(() => {
      submitBtn.classList.remove('is-loading');
      $('#form-success').classList.add('show');
      showToast('Message envoyé avec succès !', 'success');
      contactForm.reset();
      Object.keys(fields).forEach(key => setError(fields[key], ''));
      setTimeout(() => $('#form-success').classList.remove('show'), 4500);
    }, 1100);
  });

  /* Newsletter (pied de page) */
  $('#newsletter-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = $('#newsletter-email');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(input.value.trim())) {
      showToast('Veuillez saisir une adresse e-mail valide.', 'error');
      return;
    }
    showToast('Merci pour votre inscription à la newsletter !', 'success');
    input.value = '';
  });

  /* =================================================================
     13. ANIMATIONS AU DÉFILEMENT (IntersectionObserver)
     ================================================================= */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  $$('.reveal').forEach(el => revealObserver.observe(el));

  /* Compteur animé des statistiques (section À propos) */
  let statsAnimated = false;
  const statsSection = $('.about-stats');
  function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;
    $$('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target, 10);
      const duration = 1200;
      const start = performance.now();
      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }
      requestAnimationFrame(step);
    });
  }
  if (statsSection) {
    new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { animateStats(); obs.disconnect(); }
      });
    }, { threshold: 0.4 }).observe(statsSection);
  }

  /* =================================================================
     14. INITIALISATION
     ================================================================= */
  renderProducts(products);
  renderPopular();
  renderReviews();
  renderCart();
  updateActiveLink();

})();
