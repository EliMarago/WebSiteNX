'use strict';

/* ===============================
   LOGO CLICK
================================ */
function goHome(e) {
  e.preventDefault();
  window.location.href = `${window.location.origin}/index.html`;
}

document.getElementById("logo")?.addEventListener("click", goHome);
document.querySelector(".logo-box")?.addEventListener("click", goHome);

/* ===============================
   STICKY HEADER
================================ */
const heroSection = document.querySelector(".section-hero");

if (heroSection) {
  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      document.body.classList.toggle("sticky", !entry.isIntersecting);
    },
    {
      root: null,
      threshold: 0,
      rootMargin: "-80px",
    }
  );

  stickyObserver.observe(heroSection);
}

/* ===============================
   MOBILE NAVIGATION (SAFE)
================================ */
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const body = document.body;
const navOverlay = document.querySelector(".nav-overlay");

function toggleMenu() {
  header.classList.toggle("nav-open");
  body.classList.toggle("nav-open");
}

function closeMenu() {
  header.classList.remove("nav-open");
  body.classList.remove("nav-open");
}

btnNav?.addEventListener("click", toggleMenu);
navOverlay?.addEventListener("click", closeMenu);

document.querySelectorAll(".main-nav-link").forEach(link => {
  link.addEventListener("click", closeMenu);
});

/* ===============================
   MODAL
================================ */
const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("demoModal");
const closeBtn = document.querySelector(".close-btn");

openModalBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  closeMenu();
  modal.style.display = "block";
  body.style.overflow = "hidden";
});

closeBtn?.addEventListener("click", () => {
  modal.style.display = "none";
  body.style.overflow = "";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    body.style.overflow = "";
  }
});

/* ===============================
   HERO DYNAMIC TEXT
================================ */
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
      heroDynamic.style.color = "#F9E7B2"
      heroDynamic.style.opacity = 1;
    }, 400);
  }, 3500);
}

/* ===============================
   SMOOTH SCROLL (MOBILE SAFE)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();
    closeMenu();

    setTimeout(() => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  });
});

/* ===============================
   SCROLL ANIMATIONS
================================ */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-visible");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }
);

document
  .querySelectorAll(".feature, .pricing-card, .solution-item ,.solution-item, .suite-card")
  .forEach(el => {
    el.classList.add("fade-in-hidden");
    observer.observe(el);
  });
const scrollObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        scrollObserver.unobserve(entry.target); // una sola volta
      }
    });
  },
  {
    threshold: 0.15
  }
);

document
  .querySelectorAll(".animate-on-scroll")
  .forEach(el => scrollObserver.observe(el));


/* ===============================
   HERO SLIDER
================================ */
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length) {
  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
}

/* ===============================
   TYPING EFFECT
================================ */
const typingText = "Il punto cassa più smart per la tua attività";
const typingTarget = document.getElementById("typing-text");

if (typingTarget) {
  let i = 0;
  typingTarget.textContent = "";
  typingTarget.classList.add("blinking");

  function type() {
    if (i < typingText.length) {
      typingTarget.textContent += typingText.charAt(i++);
      setTimeout(type, 90);
    } else {
      typingTarget.classList.remove("blinking");
      typingTarget.style.borderRight = "none";
    }
  }

  type();
}


window.addEventListener('load', () => {

  const cards = document.querySelectorAll('.prodotto-card');

  cards.forEach(card => {
    card.addEventListener('click', e => {

      // evita che il bottone richiuda la card
      if (e.target.closest('button')) return;

      // chiude le altre
      cards.forEach(c => {
        if (c !== card) c.classList.remove('is-flipped');
      });

      card.classList.toggle('is-flipped');
    });
  });

});

// Rimuove eventuali classi bloccanti rimaste
document.body.classList.remove('nav-open');
document.querySelector('.header')?.classList.remove('nav-open');



// Animazione scroll per timeline
document.addEventListener('DOMContentLoaded', function() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  timelineItems.forEach(item => {
    timelineObserver.observe(item);
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".prodotto-toggle");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".prodotto-card");
      const isOpen = card.classList.contains("active");

      // Chiude tutte le card
      document.querySelectorAll(".prodotto-card").forEach(c => {
        c.classList.remove("active");
        const b = c.querySelector(".prodotto-toggle");
        if (b) b.innerText = "Scopri di più";
      });

      // Apre quella cliccata
      if (!isOpen) {
        card.classList.add("active");
        btn.innerText = "Chiudi";
      }
    });
  });
});

//CAPTCHA
const form = document.querySelector('.contact-form');
if (form) {
  const startTime = Date.now();
  document.getElementById('formStartTime').value = startTime;

  form.addEventListener('submit', e => {
    const honeypot = document.getElementById('company').value;
    const elapsed = Date.now() - startTime;

    if (honeypot !== '' || elapsed < 3000) {
      e.preventDefault();
      console.warn('Invio bloccato (spam)');
    }
  });
}
