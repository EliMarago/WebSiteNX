// ====================================
// HERO SLIDER AUTO-SCROLL
// ====================================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const maxSlide = slides.length;
let autoSlideInterval;

// Funzione per andare a una slide specifica
const goToSlide = function(slide) {
  slides.forEach((s, i) => {
    s.classList.remove('active', 'prev');
    
    if (i === slide) {
      s.classList.add('active');
    } else if (i < slide) {
      s.classList.add('prev');
    }
  });

  // Aggiorna dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === slide);
  });
};

// Slide successiva
const nextSlide = function() {
  currentSlide++;
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  }
  goToSlide(currentSlide);
};

// Auto slide ogni 5 secondi
const startAutoSlide = function() {
  autoSlideInterval = setInterval(nextSlide, 5000);
};

const stopAutoSlide = function() {
  clearInterval(autoSlideInterval);
};

// Dots navigation (opzionale - per permettere navigazione manuale)
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    goToSlide(currentSlide);
    stopAutoSlide();
    startAutoSlide(); // Riavvia dopo click
  });
});

// Pausa auto-slide quando l'utente passa sopra lo slider
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  heroSlider.addEventListener('mouseenter', stopAutoSlide);
  heroSlider.addEventListener('mouseleave', startAutoSlide);
}

// Avvia lo slider
if (slides.length > 0) {
  goToSlide(0);
  startAutoSlide();
}