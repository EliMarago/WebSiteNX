document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form-modal');
    const successBox = document.getElementById('formSuccess');
  
    if (!form || !successBox) return;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // blocca invio reale
  
      // Nasconde il form
      form.style.display = 'none';
  
      // Mostra messaggio di conferma
      successBox.style.display = 'flex';
  
      // Scroll morbido verso il messaggio (mobile friendly)
      successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
  