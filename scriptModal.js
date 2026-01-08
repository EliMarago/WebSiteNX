document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form-modal');
    const successBox = document.getElementById('formSuccess');
  
    if (!form || !successBox) return;
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData(form);
  
      try {
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });
  
        // Nasconde il form
        form.style.display = 'none';
        
  
        // Mostra il messaggio di successo
        successBox.style.display = 'flex';
  
        // Scroll verso il messaggio
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
        // ⏳ Aspetta 2 secondi e ricarica la pagina
        setTimeout(() => {
          window.location.reload();
        }, 2000);
  
      } catch (error) {
        console.error("Errore nell'invio del form:", error);
      }
    });
  });
  