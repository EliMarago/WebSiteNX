const SimpleCookieConsent = {
    init() {
      const consent = localStorage.getItem('nempos_consent');
      
      if (!consent) {
        setTimeout(() => {
          document.getElementById('cookieConsent')?.classList.add('show');
        }, 1000);
      } else if (consent === 'accepted') {
        this.loadAnalytics();
      }
      
      this.bindEvents();
    },
    
    bindEvents() {
      document.getElementById('acceptAll')?.addEventListener('click', () => {
        localStorage.setItem('nempos_consent', 'accepted');
        this.loadAnalytics();
        document.getElementById('cookieConsent')?.classList.remove('show');
      });
      
      document.getElementById('rejectAll')?.addEventListener('click', () => {
        localStorage.setItem('nempos_consent', 'rejected');
        document.getElementById('cookieConsent')?.classList.remove('show');
      });
    },
    
    loadAnalytics() {
      if (window.gaLoaded) return;
      window.gaLoaded = true;
      
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
      };
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    SimpleCookieConsent.init();
  });


  //GESTISCI COOKIE
  document.getElementById('cookieSettings')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('cookieConsent')?.classList.add('show');
  });

  document.addEventListener('DOMContentLoaded', () => {
    const mini = document.getElementById('cookieMini');
    const panel = document.getElementById('cookiePanel');
    const openBtn = document.getElementById('openCookieSettings');
    const saveBtn = document.getElementById('savePreferences');
    const acceptBtn = document.getElementById('acceptAll');
    const analyticsCheckbox = document.getElementById('analyticsConsent');
  
    const consent = localStorage.getItem('nempos_consent');
  
    if (!consent) {
      mini?.classList.add('show');
    } else if (consent === 'analytics') {
      loadAnalytics();
    }
  
    openBtn?.addEventListener('click', () => {
      panel.classList.add('show');
    });
  
    saveBtn?.addEventListener('click', () => {
      const value = analyticsCheckbox.checked ? 'analytics' : 'necessary';
      localStorage.setItem('nempos_consent', value);
      if (value === 'analytics') loadAnalytics();
      closeAll();
    });
  
    acceptBtn?.addEventListener('click', () => {
      localStorage.setItem('nempos_consent', 'analytics');
      loadAnalytics();
      closeAll();
    });
  
    function closeAll() {
      mini?.classList.remove('show');
      panel?.classList.remove('show');
    }
  });
  
  function loadAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;
  
    const script = document.createElement('script');
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
    script.async = true;
    document.head.appendChild(script);
  
    script.onload = () => {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
    };
  }
  