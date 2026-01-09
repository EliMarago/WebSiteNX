document.addEventListener('DOMContentLoaded', () => {
  const contactModal = document.getElementById('contactModal');
  const openModalBtn = document.getElementById('openContactModal');
  const closeModalBtn = document.getElementById('closeContactModal');
  const form = document.querySelector('.contact-form-modal');
  const blurOverlay =  document.querySelector(".modal-overlay")
  const successBox = document.getElementById('successMessageContainer');
  const modalHeader = document.querySelector('.modal-header'); // ✅ AGGIUNGI QUESTO

  if (!form || !successBox || !contactModal) return;

  // Apri modal
  if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
      contactModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      blurOverlay.classList.add('active');
      blurOverlay.classList.remove('no-blur');
    });
  }

  // Chiudi modal
  function chiudiModal() {
    contactModal.classList.remove('active');
    blurOverlay.classList.remove('active', 'no-blur');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      form.style.display = 'block';
      modalHeader.style.display = 'block'; 
      successBox.classList.remove('show');
      form.reset();
    }, 300);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', chiudiModal);
  }

  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) chiudiModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
      chiudiModal();
    }
  });

  // Invio form
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> Invio...';
    submitBtn.disabled = true;

    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (response.ok) {
        // ✅ Nascondi form E header
        form.style.display = 'none';
        blurOverlay.classList.add('no-blur');
        modalHeader.style.display = 'none'; // ✅ NASCONDI L'HEADER
        
        // Mostra messaggio
        successBox.classList.add('show');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Chiudi dopo 3 secondi
        setTimeout(() => chiudiModal(), 3000);

      } else {
        throw new Error('Errore invio: ' + response.status);
      }
    } catch (error) {
      console.error(error);
      alert('Si è verificato un errore. Riprova più tardi.');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
});