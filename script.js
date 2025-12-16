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
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");

    // se è un anchor interno (#)
    if (href && href.startsWith("#")) {
      e.preventDefault();

      // chiudi menu
      header.classList.remove("nav-open");
      body.style.overflow = "auto";

      // aspetta un frame, poi scrolla
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth"
        });
      }, 300);
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


//cambio frase nel titolo
const phrases = [
  "Veloce e intuitivo",
  "Sempre a norma fiscale",
  "Perfetto per negozi e ristoranti",
  "Assistenza rapida e dedicata"
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
      heroDynamic.style.color = "#FAEAB1"
      heroDynamic.style.opacity = 1;
    }, 400);
  }, 3500);
}


//smooth scrolling 
// Aggiungi al tuo script.js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 100; // Offset per header sticky
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

//animazioni scroll
// Animazioni quando elementi entrano nel viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, observerOptions);

// Applica a elementi che vuoi animare
document.querySelectorAll('.feature, .pricing-card, .solution-item').forEach(el => {
  el.classList.add('fade-in-hidden');
  observer.observe(el);
});

