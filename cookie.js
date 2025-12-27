/* ===========================
   COOKIE CONSENT MANAGER
================================ */
const CookieConsent = {
    cookieName: 'nempos_cookie_consent',
    cookieExpiry: 365, // giorni
  
    init() {
      // Check if user already gave consent
      const consent = this.getConsent();
      
      if (!consent) {
        this.showBanner();
      } else {
        this.applyConsent(consent);
      }
  
      this.bindEvents();
    },
  
    bindEvents() {
      // Accept all
      document.getElementById('acceptAll')?.addEventListener('click', () => {
        this.saveConsent({
          necessary: true,
          analytics: true,
          marketing: true
        });
        this.hideBanner();
      });
  
      // Accept selected
      document.getElementById('acceptSelected')?.addEventListener('click', () => {
        const consent = this.getCurrentSelection();
        this.saveConsent(consent);
        this.hideBanner();
      });
  
      // Open settings
      document.getElementById('cookieSettings')?.addEventListener('click', () => {
        this.showModal();
      });
  
      // Close modal
      document.getElementById('closeModal')?.addEventListener('click', () => {
        this.hideModal();
      });
  
      // Reject all
      document.getElementById('rejectAll')?.addEventListener('click', () => {
        this.saveConsent({
          necessary: true,
          analytics: false,
          marketing: false
        });
        this.hideModal();
        this.hideBanner();
      });
  
      // Save preferences
      document.getElementById('savePreferences')?.addEventListener('click', () => {
        const consent = this.getCurrentSelection();
        this.saveConsent(consent);
        this.hideModal();
        this.hideBanner();
      });
  
      // Expand/collapse categories
      document.querySelectorAll('.cookie-category-header').forEach(header => {
        header.addEventListener('click', (e) => {
          if (e.target.closest('.cookie-toggle')) return;
          header.closest('.cookie-category').classList.toggle('expanded');
        });
      });
  
      // Close modal on overlay click
      document.querySelector('.cookie-modal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('cookie-modal')) {
          this.hideModal();
        }
      });
    },
  
    getCurrentSelection() {
      return {
        necessary: true, // sempre true
        analytics: document.getElementById('analytics')?.checked || false,
        marketing: document.getElementById('marketing')?.checked || false
      };
    },
  
    showBanner() {
      const banner = document.getElementById('cookieConsent');
      if (banner) {
        setTimeout(() => {
          banner.classList.add('show');
        }, 1000);
      }
    },
  
    hideBanner() {
      const banner = document.getElementById('cookieConsent');
      if (banner) {
        banner.classList.remove('show');
      }
    },
  
    showModal() {
      const modal = document.getElementById('cookieModal');
      if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Load current consent
        const consent = this.getConsent();
        if (consent) {
          document.getElementById('analytics').checked = consent.analytics;
          document.getElementById('marketing').checked = consent.marketing;
        }
      }
    },
  
    hideModal() {
      const modal = document.getElementById('cookieModal');
      if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
      }
    },
  
    saveConsent(consent) {
      const consentData = {
        ...consent,
        timestamp: new Date().toISOString()
      };
      
      // Save to cookie
      this.setCookie(this.cookieName, JSON.stringify(consentData), this.cookieExpiry);
      
      // Apply consent
      this.applyConsent(consent);
      
      console.log('Cookie consent saved:', consent);
    },
  
    getConsent() {
      const cookie = this.getCookie(this.cookieName);
      return cookie ? JSON.parse(cookie) : null;
    },
  
    applyConsent(consent) {
      // Load Google Analytics only if analytics consent is given
      if (consent.analytics) {
        this.loadGoogleAnalytics();
      }
  
      // Load marketing scripts only if marketing consent is given
      if (consent.marketing) {
        this.loadMarketingScripts();
      }
  
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('cookieConsentChanged', { 
        detail: consent 
      }));
    },
  
    loadGoogleAnalytics() {
      // Evita di caricare due volte
      if (window.gaLoaded) return;
      window.gaLoaded = true;
  
      // Carica Google Analytics
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
      document.head.appendChild(script);
  
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX', {
          'anonymize_ip': true,
          'cookie_flags': 'SameSite=None;Secure'
        });
        
        console.log('Google Analytics loaded');
      };
    },
  
    loadMarketingScripts() {
      // Facebook Pixel, Google Ads, etc.
      console.log('Marketing scripts loaded');
      
      // Esempio Facebook Pixel
      /*
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
      */
    },
  
    // Cookie helpers
    setCookie(name, value, days) {
      const expires = new Date();
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    },
  
    getCookie(name) {
      const nameEQ = name + '=';
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
  
    deleteCookie(name) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  };
  
  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    CookieConsent.init();
  });