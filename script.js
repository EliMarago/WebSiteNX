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
// MOBILE NAVIGATION - SOLUZIONE CORRETTA
// ====================================
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const navOverlay = document.querySelector(".nav-overlay");

if (btnNav && header) {
  btnNav.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    
    // Gestione scroll del body
    if (header.classList.contains("nav-open")) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed"; // IMPORTANTE: previene lo scroll
      document.body.style.width = "100%"; // Previene il salto del layout
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  });
}

// Chiudi cliccando sui link
const mainNavLinks = document.querySelectorAll(".main-nav-link");
mainNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (header) {
      header.classList.remove("nav-open");
      // Ripristina lo scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  });
});

// Chiudi cliccando sull'overlay
if (navOverlay && header) {
  navOverlay.addEventListener("click", () => {
    header.classList.remove("nav-open");
    // Ripristina lo scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
  });
}

// ====================================
// MODAL
// ====================================
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("demoModal");
const closeBtn = document.querySelector(".close-btn");

if (openModalBtn && modal) {
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "block";
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

// ====================================
// ANIMAZIONI ON SCROLL
// ====================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, observerOptions);

// Applica a elementi che vuoi animare
document.querySelectorAll('.feature, .pricing-card, .solution-item').forEach(el => {
  el.classList.add('fade-in-hidden');
  fadeObserver.observe(el);
});

// ====================================
// SMOOTH SCROLL
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 100;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});