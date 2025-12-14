// Mobile menu toggle con hamburger animato
const btnNav = document.querySelector(".btn-mobile-nav");
const header = document.querySelector(".header");
const navOverlay = document.querySelector(".nav-overlay");
const body = document.body;

// Apri/chiudi menu
btnNav.addEventListener("click", () => {
  header.classList.toggle("nav-open");
  if (header.classList.contains("nav-open")) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "auto";
  }
});

// Chiudi cliccando sui link
document.querySelectorAll(".main-nav-link").forEach(link => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    body.style.overflow = "auto";
  });
});

// Chiudi cliccando sull'overlay
navOverlay.addEventListener("click", () => {
  header.classList.remove("nav-open");
  body.style.overflow = "auto";
});



  /*MODAL */
  const openModalBtn = document.getElementById("openModalBtn");
const modal = document.getElementById("demoModal");
const closeBtn = document.querySelector(".close-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
