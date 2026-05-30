/**
 * FY RIAH — script.js
 * Tous les boutons 100% fonctionnels
 */

/* =========================================
   DONNÉES PRODUITS
   ========================================= */
const PRODUITS = {
  1: { nom: "Robe Élégante Violette",   prix: 89000,  emoji: "👗", cat: "Mode",   stars: "★★★★☆", avis: 42,  desc: "Robe longue en soie violette, coupe élégante pour toutes occasions. Disponible en S, M, L, XL.", ancien: 110000 },
  2: { nom: "Sérum Éclat Naturel",       prix: 45000,  emoji: "✨", cat: "Beauté", stars: "★★★★★", avis: 89,  desc: "Formule avancée à base de vitamine C et d'acide hyaluronique pour une peau lumineuse en 7 jours.", ancien: 56000 },
  3: { nom: "Vase Céramique Artisan",    prix: 62000,  emoji: "🏺", cat: "Maison", stars: "★★★★☆", avis: 31,  desc: "Vase en céramique fait main par des artisans locaux. Hauteur 35cm, idéal pour les fleurs sèches." },
  4: { nom: "Casque Audio Premium",      prix: 185000, emoji: "🎧", cat: "Tech",   stars: "★★★★★", avis: 156, desc: "Son haute fidélité, réduction de bruit active, 30h d'autonomie. Compatible Bluetooth 5.2.", ancien: 220000 },
  5: { nom: "Sac à Main Luxe",           prix: 135000, emoji: "👜", cat: "Mode",   stars: "★★★★☆", avis: 67,  desc: "Sac en cuir véritable, doublure en velours, fermeture magnétique. Dimensions : 30×20×12 cm." },
  6: { nom: "Montre Connectée Violet",   prix: 250000, emoji: "⌚", cat: "Tech",   stars: "★★★★★", avis: 203, desc: "Montre smartwatch, suivi santé avancé, GPS intégré, étanche IP68. Compatible iOS & Android.", ancien: 300000 },
  7: { nom: "Rouge à Lèvres Premium",    prix: 28000,  emoji: "💄", cat: "Beauté", stars: "★★★★☆", avis: 58,  desc: "Formule longue tenue 12h, couleurs intenses. Collection de 18 teintes exclusives." },
  8: { nom: "Bougie Parfumée Luxe",      prix: 38000,  emoji: "🕯️", cat: "Maison", stars: "★★★★★", avis: 94,  desc: "Cire de soja naturelle, 60h de combustion, parfum floral délicat. Fabriquée à Madagascar.", ancien: 45000 },
};

/* =========================================
   PANIER
   ========================================= */
let panier = {};
try { panier = JSON.parse(localStorage.getItem("fyriah_cart") || "{}"); } catch(e) { panier = {}; }
let favoris = new Set(JSON.parse(localStorage.getItem("fyriah_wish") || "[]"));

function savePanier() { localStorage.setItem("fyriah_cart", JSON.stringify(panier)); }
function saveFavoris() { localStorage.setItem("fyriah_wish", JSON.stringify([...favoris])); }

function totalItems() { return Object.values(panier).reduce((s,i) => s + i.qte, 0); }
function totalPrix()  { return Object.values(panier).reduce((s,i) => s + i.qte * i.prix, 0); }

function ajouterPanier(id) {
  id = String(id);
  const p = PRODUITS[id];
  if (!p) return;
  if (panier[id]) { panier[id].qte++; } else { panier[id] = { nom: p.nom, prix: p.prix, emoji: p.emoji, qte: 1 }; }
  savePanier();
  majCartBadge();
  renderPanier();
  toast("✓ " + p.nom + " ajouté au panier !");
}

function changerQte(id, delta) {
  id = String(id);
  if (!panier[id]) return;
  panier[id].qte += delta;
  if (panier[id].qte <= 0) delete panier[id];
  savePanier();
  majCartBadge();
  renderPanier();
}

function majCartBadge() {
  document.getElementById("cartCount").textContent = totalItems();
}

function renderPanier() {
  const body = document.getElementById("cartBody");
  const footer = document.getElementById("cartFooter");
  const totalEl = document.getElementById("cartTotal");
  const entries = Object.entries(panier);

  if (entries.length === 0) {
    body.innerHTML = `<div class="cart-vide"><div style="font-size:3rem;margin-bottom:12px">🛒</div><p>Votre panier est vide</p><button class="btn-primary" style="margin-top:20px" onclick="fermerPanier();document.getElementById('produits').scrollIntoView({behavior:'smooth'})">Voir les produits</button></div>`;
    footer.classList.remove("show");
    return;
  }

  body.innerHTML = entries.map(([id, item]) => `
    <div class="cart-item">
      <span class="ci-emoji">${item.emoji}</span>
      <div class="ci-info">
        <h4>${item.nom}</h4>
        <p>${fmt(item.prix * item.qte)}</p>
      </div>
      <div class="ci-qty">
        <button onclick="changerQte('${id}',-1)">−</button>
        <span>${item.qte}</span>
        <button onclick="changerQte('${id}',+1)">+</button>
      </div>
    </div>
  `).join("");

  // Barre livraison gratuite
  const SEUIL = 150000;
  const total = totalPrix();
  const reste = SEUIL - total;
  let livraisonHTML = "";
  if (reste > 0) {
    const pct = Math.min(100, (total / SEUIL) * 100);
    livraisonHTML = `<div class="livraison-bar">🚚 Plus que <strong>${fmt(reste)}</strong> pour la livraison gratuite !<div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div></div>`;
  } else {
    livraisonHTML = `<div class="livraison-bar" style="background:#d1fae5;color:#065f46">🎉 Livraison gratuite offerte !</div>`;
  }

  footer.innerHTML = livraisonHTML + `
    <div class="total-row"><span>Sous-total</span><strong>${fmt(total)}</strong></div>
    <button class="btn-primary btn-checkout" id="checkoutBtn">Commander maintenant →</button>
    <p class="secure-msg">🔒 Paiement 100% sécurisé</p>
  `;
  footer.classList.add("show");

  // Rebind checkout
  document.getElementById("checkoutBtn").onclick = passerCommande;
}

function passerCommande() {
  panier = {};
  savePanier();
  majCartBadge();
  renderPanier();
  fermerPanier();
  toast("🎉 Commande passée avec succès ! Merci de votre confiance !");
}

/* =========================================
   OUVERTURE / FERMETURE PANIER
   ========================================= */
function ouvrirPanier() {
  renderPanier();
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerOverlay").classList.add("show");
  document.body.style.overflow = "hidden";
}
function fermerPanier() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("show");
  document.body.style.overflow = "";
}

document.getElementById("cartBtn").onclick = ouvrirPanier;
document.getElementById("cartClose").onclick = fermerPanier;
document.getElementById("drawerOverlay").onclick = fermerPanier;

/* =========================================
   MODAL PRODUIT
   ========================================= */
function ouvrirModal(id) {
  id = String(id);
  const p = PRODUITS[id];
  if (!p) return;
  const ancienHtml = p.ancien ? `<span class="modal-old">${fmt(p.ancien)}</span>` : "";
  document.getElementById("modalContent").innerHTML = `
    <div class="modal-emoji">${p.emoji}</div>
    <p class="modal-cat">${p.cat}</p>
    <h2 class="modal-title">${p.nom}</h2>
    <div class="modal-stars">${p.stars} <small style="color:#6b6b9c;font-size:.82rem">(${p.avis} avis)</small></div>
    <p class="modal-desc">${p.desc}</p>
    <div class="modal-prix">${fmt(p.prix)} ${ancienHtml}</div>
    <button class="btn-primary modal-btn" onclick="ajouterPanier(${id});fermerModal()">
      Ajouter au panier
    </button>
  `;
  document.getElementById("modalOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function fermerModal() {
  document.getElementById("modalOverlay").classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("modalClose").onclick = fermerModal;
document.getElementById("modalOverlay").onclick = function(e) { if(e.target === this) fermerModal(); };

/* =========================================
   FAVORIS (wishlist)
   ========================================= */
function toggleFavori(id, btn) {
  id = String(id);
  if (favoris.has(id)) {
    favoris.delete(id);
    btn.textContent = "♡";
    btn.classList.remove("wished");
    toast("Retiré des favoris");
  } else {
    favoris.add(id);
    btn.textContent = "♥";
    btn.classList.add("wished");
    btn.style.color = "#ef4444";
    toast("❤️ Ajouté aux favoris !");
  }
  saveFavoris();
}

/* =========================================
   FILTRES PRODUITS
   ========================================= */
function filtrerProduits(filtre) {
  document.querySelectorAll(".produit-card").forEach(card => {
    const cat = card.dataset.categorie;
    const visible = filtre === "tous" || cat === filtre;
    card.classList.toggle("hidden", !visible);
    if (visible) {
      card.style.animation = "none";
      requestAnimationFrame(() => { card.style.animation = ""; });
    }
  });
}

document.querySelectorAll(".filtre-btn").forEach(btn => {
  btn.onclick = function() {
    document.querySelectorAll(".filtre-btn").forEach(b => b.classList.remove("active"));
    this.classList.add("active");
    filtrerProduits(this.dataset.filtre);
  };
});

document.querySelectorAll(".cat-card").forEach(card => {
  card.onclick = function() {
    const filtre = this.dataset.filtre;
    document.getElementById("produits").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      document.querySelectorAll(".filtre-btn").forEach(b => b.classList.remove("active"));
      const target = document.querySelector(`.filtre-btn[data-filtre="${filtre}"]`);
      if (target) target.classList.add("active");
      filtrerProduits(filtre);
    }, 600);
  };
});

/* =========================================
   DÉLÉGATION D'ÉVÉNEMENTS — PRODUITS
   ========================================= */
document.getElementById("produitsGrid").addEventListener("click", function(e) {
  const btn = e.target.closest("button");
  if (!btn) return;

  // Bouton ajouter au panier
  if (btn.classList.contains("btn-panier")) {
    const id = btn.dataset.id;
    ajouterPanier(id);
    btn.classList.add("added");
    btn.innerHTML = "✓ Ajouté !";
    setTimeout(() => {
      btn.classList.remove("added");
      btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg> Ajouter au panier`;
    }, 1800);
    return;
  }

  // Bouton détail produit
  if (btn.classList.contains("btn-detail")) {
    ouvrirModal(btn.dataset.id);
    return;
  }

  // Bouton favori
  if (btn.classList.contains("btn-wish")) {
    toggleFavori(btn.dataset.id, btn);
    return;
  }
});

// Restaurer l'état des favoris au chargement
favoris.forEach(id => {
  const btn = document.querySelector(`.btn-wish[data-id="${id}"]`);
  if (btn) { btn.textContent = "♥"; btn.classList.add("wished"); btn.style.color = "#ef4444"; }
});

/* =========================================
   RECHERCHE
   ========================================= */
function ouvrirRecherche() {
  document.getElementById("searchOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("searchInput").focus(), 150);
}
function fermerRecherche() {
  document.getElementById("searchOverlay").classList.remove("open");
  document.body.style.overflow = "";
  document.getElementById("searchInput").value = "";
  document.getElementById("searchResults").innerHTML = "";
}

document.getElementById("searchBtn").onclick = ouvrirRecherche;
document.getElementById("searchClose").onclick = fermerRecherche;
document.getElementById("searchOverlay").onclick = function(e) { if(e.target === this) fermerRecherche(); };

document.getElementById("searchInput").addEventListener("input", function() {
  const q = this.value.trim().toLowerCase();
  const zone = document.getElementById("searchResults");
  if (!q) { zone.innerHTML = ""; return; }

  const results = Object.entries(PRODUITS).filter(([id, p]) =>
    p.nom.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)
  );

  if (results.length === 0) {
    zone.innerHTML = `<div class="search-empty">Aucun résultat pour « ${q} »</div>`;
    return;
  }

  zone.innerHTML = results.map(([id, p]) => `
    <div class="search-result-item" onclick="fermerRecherche();ouvrirModal(${id})">
      <span class="sri-emoji">${p.emoji}</span>
      <div class="sri-info">
        <h4>${p.nom}</h4>
        <p>${fmt(p.prix)}</p>
      </div>
    </div>
  `).join("");
});

/* =========================================
   MENU MOBILE
   ========================================= */
document.getElementById("hamburger").onclick = function() {
  document.getElementById("mobileMenu").classList.add("open");
  document.getElementById("mobileOverlay").classList.add("show");
  document.body.style.overflow = "hidden";
};
function fermerMobile() {
  document.getElementById("mobileMenu").classList.remove("open");
  document.getElementById("mobileOverlay").classList.remove("show");
  document.body.style.overflow = "";
}
document.getElementById("mobileClose").onclick = fermerMobile;
document.getElementById("mobileOverlay").onclick = fermerMobile;
document.querySelectorAll(".mobile-link").forEach(l => {
  l.onclick = fermerMobile;
});

/* =========================================
   NAVBAR SCROLL
   ========================================= */
window.addEventListener("scroll", function() {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
  document.getElementById("btnTop").classList.toggle("show", window.scrollY > 400);
});

/* =========================================
   BACK TO TOP
   ========================================= */
document.getElementById("btnTop").onclick = function() {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/* =========================================
   FORMULAIRE CONTACT
   ========================================= */
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nom   = document.getElementById("nomInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const msg   = document.getElementById("msgInput").value.trim();

  if (!nom || !email || !msg) { toast("⚠️ Veuillez remplir les champs obligatoires."); return; }

  const btn = document.getElementById("submitBtn");
  btn.textContent = "Envoi en cours...";
  btn.disabled = true;

  setTimeout(() => {
    const ok = document.getElementById("formSuccess");
    ok.classList.add("show");
    this.reset();
    btn.innerHTML = 'Envoyer le message <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    btn.disabled = false;
    toast("✓ Message envoyé avec succès !");
    setTimeout(() => ok.classList.remove("show"), 5000);
  }, 1200);
});

/* =========================================
   NEWSLETTER
   ========================================= */
document.getElementById("newsletterForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("nlEmail").value.trim();
  if (!email) return;
  this.reset();
  toast("🎉 Merci ! Vous êtes bien inscrit(e) à notre newsletter.");
});

/* =========================================
   ANIMATIONS AU SCROLL
   ========================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("in"), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

document.querySelectorAll(
  ".produit-card, .cat-card, .section-header, .apropos-text, .contact-infos, .contact-form, .a-stat, .nl-inner, .promo-inner"
).forEach(el => {
  el.classList.add("fade-up");
  observer.observe(el);
});

/* =========================================
   ECHAP — ferme tout
   ========================================= */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    fermerModal();
    fermerPanier();
    fermerRecherche();
    fermerMobile();
  }
});

/* =========================================
   TOAST
   ========================================= */
function toast(msg) {
  const zone = document.getElementById("toastZone");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  zone.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

/* =========================================
   FORMAT PRIX
   ========================================= */
function fmt(n) { return Number(n).toLocaleString("fr-FR") + " Ar"; }

/* =========================================
   INIT
   ========================================= */
majCartBadge();
console.log("✅ Fy Riah — site chargé avec succès !");
