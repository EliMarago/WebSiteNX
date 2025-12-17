// ====================================
// MOBILE NAVIGATION - SOLUZIONE CORRETTA
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
// STICKY NAVIGATION
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
// SMOOTH SCROLL
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Chiudi menu se aperto
    closeMenu();
    
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
      
      // Usa setTimeout per assicurarsi che il menu sia chiuso prima di scrollare
      setTimeout(() => {
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }, 300);
    }
  });
});

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

document.querySelectorAll('.feature, .pricing-card, .solution-item').forEach(el => {
  el.classList.add('fade-in-hidden');
  fadeObserver.observe(el);
});

// ====================================
// FORM SUBMIT
// ====================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Grazie per averci contattato! Ti risponderemo al più presto.');
    contactForm.reset();
  });
}

// ====================================
// LOGO CLICK
// ====================================
const logoBox = document.querySelector(".logo-box");
if (logoBox) {
  logoBox.addEventListener("click", function (e) {
    e.preventDefault();
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}