/* ===========================
   LUXE SHOP — script.js
   =========================== */

"use strict";

// ==========================================
// DONNÉES PRODUITS
// ==========================================
const produits = {
  1: { nom: "Robe Élégante Dorée", prix: 89000, cat: "mode", emoji: "👗", desc: "Robe longue en soie dorée, coupe élégante pour toutes occasions. Disponible en S, M, L, XL." },
  2: { nom: "Sérum Éclat Naturel", prix: 45000, cat: "beaute", emoji: "✨", desc: "Formule avancée à base de vitamine C et d'acide hyaluronique pour une peau lumineuse en 7 jours." },
  3: { nom: "Vase Céramique Artisan", prix: 62000, cat: "maison", emoji: "🏡", desc: "Vase en céramique fait main par des artisans locaux. Hauteur 35cm, idéal pour les fleurs sèches." },
  4: { nom: "Casque Audio Premium", prix: 185000, cat: "tech", emoji: "🎧", desc: "Son haute fidélité, réduction de bruit active, 30h d'autonomie. Compatible Bluetooth 5.2." },
  5: { nom: "Sac à Main Luxe", prix: 135000, cat: "mode", emoji: "👜", desc: "Sac en cuir véritable, doublure en velours, fermeture magnétique. Dimensions : 30×20×12 cm." },
  6: { nom: "Montre Connectée Or", prix: 250000, cat: "tech", emoji: "⌚", desc: "Montre smartwatch dorée, suivi santé avancé, GPS intégré, étanche IP68. Compatible iOS & Android." },
};

// ==========================================
// PANIER
// ==========================================
let panier = JSON.parse(localStorage.getItem("luxeshop_panier") || "{}");

function sauvegarderPanier() {
  localStorage.setItem("luxeshop_panier", JSON.stringify(panier));
}

function getTotalItems() {
  return Object.values(panier).reduce((s, item) => s + item.qte, 0);
}

function getTotalPrix() {
  return Object.values(panier).reduce((s, item) => s + item.qte * item.prix, 0);
}

function ajouterAuPanier(id, nom, prix) {
  id = String(id);
  if (panier[id]) {
    panier[id].qte += 1;
  } else {
    panier[id] = { nom, prix: parseInt(prix), qte: 1, emoji: produits[id]?.emoji || "📦" };
  }
  sauvegarderPanier();
  majCartCount();
  afficherPanier();
  afficherToast(`✓ ${nom} ajouté au panier`);
}

function changerQuantite(id, delta) {
  id = String(id);
  if (!panier[id]) return;
  panier[id].qte += delta;
  if (panier[id].qte <= 0) delete panier[id];
  sauvegarderPanier();
  majCartCount();
  afficherPanier();
}

function majCartCount() {
  const count = getTotalItems();
  document.getElementById("cartCount").textContent = count;
}

function afficherPanier() {
  const body = document.getElementById("cartBody");
  const total = document.getElementById("cartTotal");
  const items = Object.entries(panier);

  if (items.length === 0) {
    body.innerHTML = '<p class="cart-vide">Votre panier est vide.</p>';
    total.textContent = "0 Ar";
    return;
  }

  body.innerHTML = items.map(([id, item]) => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <h4>${item.nom}</h4>
        <p>${formatPrix(item.prix * item.qte)}</p>
      </div>
      <div class="cart-item-qty">
        <button onclick="changerQuantite(${id}, -1)">−</button>
        <span>${item.qte}</span>
        <button onclick="changerQuantite(${id}, +1)">+</button>
      </div>
    </div>
  `).join("");

  total.textContent = formatPrix(getTotalPrix());
}

function formatPrix(prix) {
  return prix.toLocaleString("fr-FR") + " Ar";
}

// ==========================================
// NAVBAR SCROLL
// ==========================================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});

// ==========================================
// HAMBURGER / MENU MOBILE
// ==========================================
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
});

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  });
});

// ==========================================
// BARRE DE RECHERCHE
// ==========================================
const searchBtn = document.getElementById("searchBtn");
const searchBar = document.getElementById("searchBar");
const searchClose = document.getElementById("searchClose");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
  searchBar.classList.add("open");
  searchInput.focus();
});
searchClose.addEventListener("click", () => {
  searchBar.classList.remove("open");
  searchInput.value = "";
  filtrerParRecherche("");
});

searchInput.addEventListener("input", () => {
  filtrerParRecherche(searchInput.value.trim().toLowerCase());
});

function filtrerParRecherche(terme) {
  const cards = document.querySelectorAll(".produit-card");
  cards.forEach(card => {
    const nom = card.querySelector("h3").textContent.toLowerCase();
    card.classList.toggle("hidden", terme !== "" && !nom.includes(terme));
  });
}

// ==========================================
// FILTRES CATÉGORIES
// ==========================================
const filtresBtns = document.querySelectorAll(".filtre-btn");
filtresBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filtresBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filtre = btn.dataset.filtre;
    filtrerProduits(filtre);
  });
});

function filtrerProduits(filtre) {
  const cards = document.querySelectorAll(".produit-card");
  cards.forEach(card => {
    const cat = card.dataset.categorie;
    if (filtre === "tous" || cat === filtre) {
      card.classList.remove("hidden");
      card.style.animation = "fadeUp 0.4s ease both";
      setTimeout(() => { card.style.animation = ""; }, 400);
    } else {
      card.classList.add("hidden");
    }
  });
}

// Filtrer depuis les catégories
document.querySelectorAll(".cat-card").forEach(catCard => {
  catCard.addEventListener("click", () => {
    const filtre = catCard.dataset.filter;
    document.getElementById("produits").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      filtresBtns.forEach(b => b.classList.remove("active"));
      const targetBtn = document.querySelector(`.filtre-btn[data-filtre="${filtre}"]`);
      if (targetBtn) targetBtn.classList.add("active");
      filtrerProduits(filtre);
    }, 600);
  });
});

// ==========================================
// BOUTONS AJOUTER AU PANIER
// ==========================================
document.querySelectorAll(".btn-panier").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const id = e.currentTarget.dataset.id;
    const nom = e.currentTarget.dataset.nom;
    const prix = e.currentTarget.dataset.prix;
    ajouterAuPanier(id, nom, prix);

    // Animation bouton
    btn.textContent = "✓ Ajouté !";
    btn.style.background = "#2e7d32";
    btn.style.color = "#fff";
    setTimeout(() => {
      btn.textContent = "Ajouter au Panier";
      btn.style.background = "";
      btn.style.color = "";
    }, 1600);
  });
});

// ==========================================
// MODAL DÉTAIL PRODUIT
// ==========================================
document.querySelectorAll(".btn-detail").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id;
    const prod = produits[id];
    if (!prod) return;
    ouvrirModalDetail(id, prod);
  });
});

function ouvrirModalDetail(id, prod) {
  // Supprimer ancien modal s'il existe
  const existing = document.getElementById("detailModal");
  if (existing) existing.remove();

  const modal = document.createElement("div");
  modal.id = "detailModal";
  modal.style.cssText = `
    position:fixed;inset:0;z-index:2500;
    background:rgba(0,0,0,0.6);
    display:flex;align-items:center;justify-content:center;
    padding:24px;backdrop-filter:blur(6px);
  `;
  modal.innerHTML = `
    <div style="
      background:#fff;border-radius:20px;
      max-width:500px;width:100%;
      padding:40px;position:relative;
      animation:fadeUp 0.35s ease;
      box-shadow:0 30px 80px rgba(0,0,0,0.2);
    ">
      <button onclick="document.getElementById('detailModal').remove()" style="
        position:absolute;top:16px;right:16px;
        background:none;border:none;font-size:1.4rem;
        cursor:pointer;color:#7a6040;
      ">✕</button>
      <div style="font-size:5rem;text-align:center;margin-bottom:24px;">${prod.emoji}</div>
      <p style="color:#c9a84c;font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;margin-bottom:8px;">${prod.cat}</p>
      <h2 style="font-family:'Playfair Display',serif;font-size:1.8rem;color:#1a1208;margin-bottom:16px;">${prod.nom}</h2>
      <p style="color:#5c3d1e;line-height:1.7;margin-bottom:24px;">${prod.desc}</p>
      <p style="font-size:1.4rem;font-weight:700;color:#1a1208;margin-bottom:24px;">${formatPrix(prod.prix)}</p>
      <button onclick="ajouterAuPanier(${id},'${prod.nom}',${prod.prix});document.getElementById('detailModal').remove();" style="
        width:100%;background:#1a1208;color:#e8d49a;
        border:none;font-size:1rem;font-weight:500;
        padding:16px;border-radius:10px;cursor:pointer;
        font-family:'DM Sans',sans-serif;
        transition:background 0.3s;
      " onmouseover="this.style.background='#c9a84c';this.style.color='#1a1208';"
         onmouseout="this.style.background='#1a1208';this.style.color='#e8d49a';">
        Ajouter au Panier
      </button>
    </div>
  `;
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
  document.body.appendChild(modal);
}

// ==========================================
// PANIER MODAL
// ==========================================
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const cartClose = document.getElementById("cartClose");

cartBtn.addEventListener("click", () => {
  afficherPanier();
  cartModal.classList.add("open");
  document.body.style.overflow = "hidden";
});
cartClose.addEventListener("click", fermerPanier);
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal) fermerPanier();
});

function fermerPanier() {
  cartModal.classList.remove("open");
  document.body.style.overflow = "";
}

// Commande
document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (getTotalItems() === 0) {
    afficherToast("⚠️ Votre panier est vide !");
    return;
  }
  panier = {};
  sauvegarderPanier();
  majCartCount();
  afficherPanier();
  fermerPanier();
  afficherToast("🎉 Commande passée avec succès ! Merci !");
});

// ==========================================
// FORMULAIRE CONTACT
// ==========================================
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = document.getElementById("nomInput").value.trim();
  const email = document.getElementById("emailInput").value.trim();
  const msg = document.getElementById("msgInput").value.trim();

  if (!nom || !email || !msg) {
    afficherToast("⚠️ Veuillez remplir tous les champs.");
    return;
  }

  // Simulation envoi
  const submitBtn = e.currentTarget.querySelector("button[type=submit]");
  submitBtn.textContent = "Envoi en cours...";
  submitBtn.disabled = true;

  setTimeout(() => {
    document.getElementById("formSuccess").classList.add("show");
    e.target.reset();
    submitBtn.textContent = "Envoyer le Message";
    submitBtn.disabled = false;
    afficherToast("✓ Message envoyé !");
    setTimeout(() => {
      document.getElementById("formSuccess").classList.remove("show");
    }, 4000);
  }, 1200);
});

// ==========================================
// TOAST NOTIFICATION
// ==========================================
let toastTimeout;
function afficherToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}

// ==========================================
// ANIMATIONS AU SCROLL (Intersection Observer)
// ==========================================
const observerOptions = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("visible");
      }, i * 80);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Appliquer fade-up aux éléments clés
const elementsAnimer = [
  ".produit-card",
  ".cat-card",
  ".apropos-texte",
  ".apropos-visuel",
  ".contact-infos",
  ".contact-form",
  ".stat",
  ".section-header",
];
elementsAnimer.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add("fade-up");
    observer.observe(el);
  });
});

// ==========================================
// INITIALISATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  majCartCount();

  // Fermer menu mobile au clic extérieur
  document.addEventListener("click", (e) => {
    if (mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)) {
      mobileMenu.classList.remove("open");
      document.body.style.overflow = "";
    }
  });

  // Fermer recherche avec Echap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchBar.classList.remove("open");
      cartModal.classList.remove("open");
      document.body.style.overflow = "";
      const detailModal = document.getElementById("detailModal");
      if (detailModal) detailModal.remove();
    }
  });

  // Smooth scroll pour les liens
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  console.log("✅ LUXE SHOP chargé avec succès !");
});