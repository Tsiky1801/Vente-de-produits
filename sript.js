V/**
 * FY RIAH — script.js
 * Panier, recherche, filtres, navigation, formulaires, animations
 */

/* ══════════════════════════════════════════
   1. DONNÉES PRODUITS (12 articles)
══════════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1,
    name: "Robe Velours Aubergine",
    category: "robes",
    price: 129,
    oldPrice: 159,
    rating: 4.9,
    reviews: 312,
    badge: "Promo",
    popular: true,
    rank: 1,
    desc: "Velours doux au toucher, col en V élégant, manches longues légèrement évasées.",
    color: "linear-gradient(135deg,#4A0E82,#A855F7,#6B21A8)",
  },
  {
    id: 2,
    name: "Blazer Lilas Structuré",
    category: "hauts",
    price: 185,
    oldPrice: null,
    rating: 4.8,
    reviews: 198,
    badge: "Nouveau",
    popular: true,
    rank: 2,
    desc: "Coupe droite moderne, doublure soie, boutons dorés, poches fonctionnelles.",
    color: "linear-gradient(135deg,#C084FC,#7C3AED,#A855F7)",
  },
  {
    id: 3,
    name: "Sac Cabas Cuir Prune",
    category: "sacs",
    price: 219,
    oldPrice: 249,
    rating: 4.9,
    reviews: 421,
    badge: "Best-seller",
    popular: true,
    rank: 3,
    desc: "Cuir pleine fleur, fermeture magnétique, bandoulière amovible, compartiments intérieurs.",
    color: "linear-gradient(135deg,#581C87,#7C3AED,#EC4899)",
  },
  {
    id: 4,
    name: "Robe Midi Florale Violette",
    category: "robes",
    price: 99,
    oldPrice: 115,
    rating: 4.7,
    reviews: 287,
    badge: "Promo",
    popular: false,
    rank: null,
    desc: "Viscose fluide, imprimé floral exclusif, taille empire, longueur midi parfaite.",
    color: "linear-gradient(135deg,#6B21A8,#EC4899,#A855F7)",
  },
  {
    id: 5,
    name: "Top en Soie Mauve",
    category: "hauts",
    price: 78,
    oldPrice: null,
    rating: 4.6,
    reviews: 143,
    badge: "Nouveau",
    popular: false,
    rank: null,
    desc: "100% soie de mûrier, col bénitier, couleur mauve poudré, coupe légèrement ample.",
    color: "linear-gradient(135deg,#E9D5FF,#C084FC,#A855F7)",
  },
  {
    id: 6,
    name: "Pochette Satin Lavande",
    category: "accessoires",
    price: 65,
    oldPrice: null,
    rating: 4.8,
    reviews: 89,
    badge: null,
    popular: false,
    rank: null,
    desc: "Satin duchesse, fermeture clip dorée, format soirée parfait, livrée en boîte cadeau.",
    color: "linear-gradient(135deg,#C084FC,#E9D5FF,#A855F7)",
  },
  {
    id: 7,
    name: "Robe Longue Wrap Violet",
    category: "robes",
    price: 145,
    oldPrice: 175,
    rating: 4.9,
    reviews: 356,
    badge: "Promo",
    popular: true,
    rank: 4,
    desc: "Style portefeuille réglable, imprimé géométrique violet, parfaite du bureau à la soirée.",
    color: "linear-gradient(135deg,#2D0A50,#7C3AED,#C084FC)",
  },
  {
    id: 8,
    name: "Ceinture Cuir Améthyste",
    category: "accessoires",
    price: 49,
    oldPrice: null,
    rating: 4.5,
    reviews: 67,
    badge: null,
    popular: false,
    rank: null,
    desc: "Cuir véritable, boucle rectangulaire argentée, trois tailles de trou ajustables.",
    color: "linear-gradient(135deg,#4A0E82,#7C3AED,#6B21A8)",
  },
  {
    id: 9,
    name: "Sac à Main Trapèze",
    category: "sacs",
    price: 169,
    oldPrice: null,
    rating: 4.7,
    reviews: 201,
    badge: "Nouveau",
    popular: true,
    rank: 5,
    desc: "Forme trapèze tendance, cuir souple violet nuit, chaîne dorée amovible, poche zippée.",
    color: "linear-gradient(135deg,#1E0733,#6B21A8,#A855F7)",
  },
  {
    id: 10,
    name: "Blouse Mousseline Iris",
    category: "hauts",
    price: 89,
    oldPrice: 105,
    rating: 4.6,
    reviews: 178,
    badge: "Promo",
    popular: false,
    rank: null,
    desc: "Mousseline transparente légère, col lavallière, manches papillon, coloration iris unique.",
    color: "linear-gradient(135deg,#7C3AED,#C084FC,#EC4899)",
  },
  {
    id: 11,
    name: "Foulard en Soie Violette",
    category: "accessoires",
    price: 55,
    oldPrice: null,
    rating: 4.8,
    reviews: 112,
    badge: null,
    popular: false,
    rank: null,
    desc: "Soie twill 90×90 cm, motif cachemire exclusif Fy Riah, ourlets main, livré en coffret.",
    color: "linear-gradient(135deg,#A855F7,#7C3AED,#E9D5FF)",
  },
  {
    id: 12,
    name: "Ensemble Tailleur Violet Nuit",
    category: "hauts",
    price: 245,
    oldPrice: 295,
    rating: 5.0,
    reviews: 94,
    badge: "Promo",
    popular: true,
    rank: 6,
    desc: "Veste croisée + pantalon taille haute, laine mélangée premium, finitions satin sur les revers.",
    color: "linear-gradient(135deg,#1E0733,#4A0E82,#6B21A8)",
  },
];

/* ══════════════════════════════════════════
   2. ÉTAT DE L'APPLICATION
══════════════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem('fyriah_cart') || '[]');
let activeFilter = 'all';

/* ══════════════════════════════════════════
   3. UTILITAIRES
══════════════════════════════════════════ */

/** Persiste le panier */
function saveCart() {
  localStorage.setItem('fyriah_cart', JSON.stringify(cart));
}

/** Affiche un toast de notification */
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = toast ${type} show;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, duration);
}

/** Génère les étoiles HTML */
function renderStars(rating) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/** Formate un prix */
function formatPrice(price) {
  return price.toFixed(2).replace('.', ',') + ' €';
}

/** Génère une image de produit (SVG basé sur dégradé) */
function productThumbHTML(product, size = '100%') {
  return `<div style="width:${size};height:${size};background:${product.color};border-radius:8px;display:flex;align-items:center;justify-content:center;">
    <span style="font-size:2rem;opacity:.18;">✦</span>
  </div>`;
}

/* ══════════════════════════════════════════
   4. RENDU DES PRODUITS
══════════════════════════════════════════ */

/** Crée la carte produit complète */
function createProductCard(product) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.setAttribute('role', 'listitem');
  div.dataset.id = product.id;
  div.dataset.category = product.category;

  const badgeHTML = product.badge
    ? <span class="product-badge product-badge--${product.badge === 'Promo' ? 'promo' : product.badge === 'Best-seller' ? 'pop' : 'new'}">${product.badge}</span>
    : '';

  const oldPriceHTML = product.oldPrice
    ? <span class="product-card__old-price">${formatPrice(product.oldPrice)}</span>
    : '';

  div.innerHTML = `
    <div class="product-card__img-wrap">
      <div class="product-card__img" style="background:${product.color};display:flex;align-items:center;justify-content:center;">
        <span style="font-size:2.5rem;opacity:.18;">✦</span>
      </div>
      <div class="product-card__badges">${badgeHTML}</div>
      <div class="product-card__actions-overlay">
        <button class="product-card__quick-btn" data-action="wishlist" aria-label="Ajouter aux favoris">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        <button class="product-card__quick-btn" data-action="preview" aria-label="Aperçu rapide">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
    </div>
    <div class="product-card__info">
      <p class="product-card__cat">${product.category}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__desc">${product.desc}</p>
      <div class="product-card__rating">
        <span class="product-card__stars" aria-label="${product.rating} étoiles">${renderStars(product.rating)}</span>
        <span class="product-card__rating-count">(${product.reviews})</span>
      </div>
      <div class="product-card__footer">
        <div class="product-card__prices">
          <span class="product-card__price">${formatPrice(product.price)}</span>
          ${oldPriceHTML}
        </div>
        <button class="product-card__add" data-id="${product.id}" aria-label="Ajouter ${product.name} au panier">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          Ajouter
        </button>
      </div>
    </div>`;

  /* Bouton ajouter au panier */
  div.querySelector('.product-card__add').addEventListener('click', () => {
    addToCart(product.id);
  });

  /* Quick actions */
  div.querySelector('[data-action="wishlist"]').addEventListener('click', () => {
    showToast(💜 ${product.name} ajouté aux favoris, 'info');
  });
  div.querySelector('[data-action="preview"]').addEventListener('click', () => {
    showToast(👁 Aperçu de ${product.name}, 'info');
  });

  return div;
}

/** Rendu de la grille avec filtre */
function renderProducts(filter = 'all') {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = '';

  const filtered = filter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);

  filtered.forEach((product, i) => {
    const card = createProductCard(product);
    card.style.animationDelay = ${i * 0.06}s;
    card.classList.add('fade-up');
    grid.appendChild(card);
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--gray-400);padding:3rem;">Aucun produit dans cette catégorie.</p>';
  }
}

/** Rendu des best-sellers */
function renderPopular() {
  const grid = document.getElementById('popularGrid');
  const pops = PRODUCTS.filter(p => p.popular).sort((a, b) => a.rank - b.rank);

  pops.forEach((product, i) => {
    const div = document.createElement('div');
    div.className = 'popular-card fade-up';
    div.setAttribute('role', 'listitem');
    div.style.animationDelay = ${i * 0.08}s;

    div.innerHTML = `
      <div class="popular-card__rank">${product.rank}</div>
      <div class="popular-card__img" style="background:${product.color};display:flex;align-items:center;justify-content:center;border-radius:8px;">
        <span style="font-size:1.5rem;opacity:.2;">✦</span>
      </div>
      <div class="popular-card__info">
        <p class="popular-card__name">${product.name}</p>
        <p class="popular-card__price">${formatPrice(product.price)}</p>
        <button class="popular-card__add" data-id="${product.id}" aria-label="Ajouter ${product.name} au panier">
          + Ajouter au panier
        </button>
      </div>`;

    div.querySelector('.popular-card__add').addEventListener('click', () => {
      addToCart(product.id);
    });

    grid.appendChild(div);
  });
}

/* ══════════════════════════════════════════
   5. PANIER
══════════════════════════════════════════ */

/** Ajoute un produit au panier */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(🛍 ${product.name} ajouté au panier, 'success');

  // Animation badge
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bounce');
  void badge.offsetWidth; // reflow
  badge.classList.add('bounce');
}

/** Met à jour la quantité */
function updateQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  saveCart();
  updateCartUI();
}

/** Supprime un article */
function removeFromCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  if (product) showToast🗑 ${product.name} retiré du panier`, 'error');
}

/** Calcule le total */
function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(p => p.id === item.id);
    return p ? sum + p.price * item.qty : sum;
  }, 0);
}

/** Nombre d'articles total */
function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

/** Met à jour tout l'UI panier */
function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');
  badge.textContent = count;
  badge.setAttribute('aria-label', ${count} article${count !== 1 ? 's' : ''} dans le panier);

  renderCartDrawer();
}

/** Rendu du panier latéral */
function renderCartDrawer() {
  const body   = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Votre panier est vide.<br /><a href="#produits" id="cartToShop">Voir la collection →</a></p>
      </div>`;
    document.getElementById('cartToShop')?.addEventListener('click', closeCart);
    footer.innerHTML = '';
    return;
  }

  body.innerHTML = '';
  cart.forEach(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item__img" style="background:${product.color};border-radius:8px;width:72px;height:72px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span style="font-size:1.2rem;opacity:.2;">✦</span>
      </div>
      <div class="cart-item__info">
        <p class="cart-item__name">${product.name}</p>
        <p class="cart-item__price">${formatPrice(product.price)}</p>
        <div class="cart-item__qty">
          <button aria-label="Diminuer la quantité" data-action="dec" data-id="${product.id}">−</button>
          <span aria-live="polite">${item.qty}</span>
          <button aria-label="Augmenter la quantité" data-action="inc" data-id="${product.id}">+</button>
        </div>
      </div>
      <button class="cart-item__remove" aria-label="Retirer ${product.name}" data-remove="${product.id}">✕</button>`;

    div.querySelector('[data-action="dec"]').addEventListener('click', () => updateQty(product.id, -1));
    div.querySelector('[data-action="inc"]').addEventListener('click', () => updateQty(product.id, 1));
    div.querySelector('[data-remove]').addEventListener('click', () => removeFromCart(product.id));

    body.appendChild(div);
  });

  const total    = getCartTotal();
  const shipping = total >= 80 ? 0 : 5.9;
  const grandTotal = total + shipping;

  footer.innerHTML = `
    <div class="cart-subtotal"><span>Sous-total</span><span>${formatPrice(total)}</span></div>
    <div class="cart-subtotal"><span>Livraison</span><span>${shipping === 0 ? '🎉 Gratuite' : formatPrice(shipping)}</span></div>
    <div class="cart-total"><span>Total</span><span>${formatPrice(grandTotal)}</span></div>
    ${shipping > 0 ? <p class="cart-shipping">Plus que ${formatPrice(80 - total)} pour la livraison gratuite.</p> : ''}
    <button class="btn btn--primary btn--full" id="checkoutBtn">
      Passer commande · ${formatPrice(grandTotal)}
    </button>`;

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    showToast('🎉 Merci pour votre commande ! Vous allez être redirigé.', 'success', 4000);
    setTimeout(() => {
      cart = [];
      saveCart();
      updateCartUI();
      closeCart();
    }, 2500);
  });
}

/* ══════════════════════════════════════════
   6. NAVIGATION & MENUS
══════════════════════════════════════════ */

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
  document.getElementById('overlay').classList.add('open');
  document.getElementById('cartToggle').setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
  document.getElementById('overlay').classList.remove('open');
  document.getElementById('cartToggle').setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function openSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.add('open');
  bar.setAttribute('aria-hidden', 'false');
  document.getElementById('searchToggle').setAttribute('aria-expanded', 'true');
  setTimeout(() => document.getElementById('searchInput').focus(), 100);
}

function closeSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.remove('open');
  bar.setAttribute('aria-hidden', 'true');
  document.getElementById('searchToggle').setAttribute('aria-expanded', 'false');
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResults').innerHTML = '';
}

function toggleMobileMenu() {
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('hamburger');
  const isOpen = links.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
}

/* ══════════════════════════════════════════
   7. RECHERCHE EN TEMPS RÉEL
══════════════════════════════════════════ */

function handleSearch(query) {
  const results = document.getElementById('searchResults');
  const q = query.trim().toLowerCase();

  if (q.length < 2) { results.innerHTML = ''; return; }

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.desc.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  ).slice(0, 6);

  if (matches.length === 0) {
    results.innerHTML = '<p class="search-no-result">Aucun produit trouvé pour cette recherche.</p>';
    return;
  }

  results.innerHTML = matches.map(p => `
    <div class="search-result-item" role="option" tabindex="0" data-id="${p.id}">
      <div class="search-result-thumb" style="background:${p.color};display:flex;align-items:center;justify-content:center;">
        <span style="font-size:1rem;opacity:.2;">✦</span>
      </div>
      <div>
        <strong>${p.name}</strong>
        <span>${formatPrice(p.price)}</span>
      </div>
    </div>`).join('');

  results.querySelectorAll('.search-result-item').forEach(item => {
    const handler = () => {
      const id = Number(item.dataset.id);
      const product = PRODUCTS.find(p => p.id === id);
      if (product) {
        addToCart(id);
        closeSearch();
      }
    };
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => { if (e.key === 'Enter') handler(); });
  });
}

/* ══════════════════════════════════════════
   8. FILTRES PRODUITS
══════════════════════════════════════════ */

function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;