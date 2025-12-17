// Logo click - CONTROLLA che esista prima
const logoEl = document.getElementById("logo");
if (logoEl) {
  logoEl.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = window.location.origin + "/index.html";
  });
}

// In alternativa, usa la classe che hai effettivamente nell'HTML
const logoBox = document.querySelector(".logo-box");
if (logoBox) {
  logoBox.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = window.location.origin + "/index.html";
  });
}

// ====================================
// STICKY NAVIGATION con IntersectionObserver
// ====================================
const sectionHeroEl = document.querySelector(".section-hero");

if (sectionHeroEl) {
  const obs = new IntersectionObserver(
    function (entries) {
      const ent = entries[0];


      if (!ent.isIntersecting) {
        document.body.classList.add("sticky");

      } else {
        document.body.classList.remove("sticky");

      }
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );

  obs.observe(sectionHeroEl);
}

// ====================================
// MOBILE NAVIGATION
// ====================================
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const navOverlay = document.querySelector(".nav-overlay");
const body = document.body;
const html = document.documentElement;

// Salva la posizione dello scroll
let scrollPosition = 0;

if (btnNav && header) {
  btnNav.addEventListener("click", () => {
    const isOpen = header.classList.contains("nav-open");
    
    if (!isOpen) {
      // APRI MENU
      scrollPosition = window.pageYOffset;
      header.classList.add("nav-open");
      body.classList.add("nav-open");
      html.classList.add("nav-open");
      body.style.top = `-${scrollPosition}px`;
    } else {
      // CHIUDI MENU
      header.classList.remove("nav-open");
      body.classList.remove("nav-open");
      html.classList.remove("nav-open");
      body.style.top = '';
      window.scrollTo(0, scrollPosition);
    }
  });
}

// Funzione per chiudere il menu
function closeMenu() {
  if (header && header.classList.contains("nav-open")) {
    header.classList.remove("nav-open");
    body.classList.remove("nav-open");
    html.classList.remove("nav-open");
    body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }
}

// Chiudi menu cliccando sui link
const mainNavLinks = document.querySelectorAll(".main-nav-link");
mainNavLinks.forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Chiudi menu cliccando sull'overlay
if (navOverlay) {
  navOverlay.addEventListener("click", closeMenu);
}

// ====================================
// MODAL
// ====================================
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("demoModal");
const closeBtn = document.querySelector(".close-btn");

if (openModalBtn && modal) {
  openModalBtn.addEventListener("click", (e) => {
    e.preventDefault();

    header.classList.remove("nav-open");
    body.style.overflow = "auto";

    setTimeout(() => {
      modal.style.display = "block";
      body.style.overflow = "hidden";
    }, 200);
  });
}

if (closeBtn && modal) {
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

if (modal) {
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

//cambio frase nel titolo
const phrases = [
  "Veloce e intuitivo",
  "Sempre a norma fiscale",
  "Perfetto per negozi e ristoranti",
  "Assistenza rapida e dedicata",
];

const heroDynamic = document.getElementById("heroDynamic");

if (heroDynamic) {
  let index = 0;
  heroDynamic.textContent = phrases[0];

  setInterval(() => {
    heroDynamic.style.opacity = 0;

    setTimeout(() => {
      index = (index + 1) % phrases.length;
      heroDynamic.textContent = phrases[index];
      heroDynamic.style.color = "#FAEAB1";
      heroDynamic.style.opacity = 1;
    }, 400);
  }, 3500);
}

//smooth scrolling
// Aggiungi al tuo script.js
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offset = 100; // Offset per header sticky
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

//animazioni scroll
// Animazioni quando elementi entrano nel viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-visible");
    }
  });
}, observerOptions);

// Applica a elementi che vuoi animare
document
  .querySelectorAll(".feature, .pricing-card, .solution-item")
  .forEach((el) => {
    el.classList.add("fade-in-hidden");
    observer.observe(el);
  });
