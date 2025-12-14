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
      console.log("IsIntersecting:", ent.isIntersecting);

      if (!ent.isIntersecting) {
        document.body.classList.add("sticky");
        console.log("Added sticky class");
      } else {
        document.body.classList.remove("sticky");
        console.log("Removed sticky class");
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

if (btnNav && header) {
  btnNav.addEventListener("click", () => {
    header.classList.toggle("nav-open");
    if (header.classList.contains("nav-open")) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  });
}

// Chiudi cliccando sui link
document.querySelectorAll(".main-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    if (header) {
      header.classList.remove("nav-open");
      body.style.overflow = "auto";
    }
  });
});

// Chiudi cliccando sull'overlay
if (navOverlay && header) {
  navOverlay.addEventListener("click", () => {
    header.classList.remove("nav-open");
    body.style.overflow = "auto";
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