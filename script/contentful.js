// script/contentful.js

const CONTENTFUL_SPACE_ID = 'vfdwb11odqbi';
const CONTENTFUL_ACCESS_TOKEN = 'nhtk7ACMdrqfJYw2ctu_DF1XM-tG79AoRDZfY4aqH7g';
const CONTENTFUL_ENVIRONMENT = 'master';

// Funzione per parsare il RichText di Contentful in HTML base
function parseRichText(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(parseRichText).join('');
  if (node.nodeType === 'text') {
    // Converti i newline stringa in <br/>
    return node.value.replace(/\n/g, '<br/>');
  }
  if (node.nodeType === 'paragraph') {
    return `<p style="margin-bottom: 1.5rem;">${node.content ? node.content.map(parseRichText).join('') : ''}</p>`;
  }
  if (node.nodeType === 'heading-1') return `<h1>${node.content.map(parseRichText).join('')}</h1>`;
  if (node.nodeType === 'heading-2') return `<h2>${node.content.map(parseRichText).join('')}</h2>`;
  if (node.nodeType === 'heading-3') return `<h3>${node.content.map(parseRichText).join('')}</h3>`;
  if (node.nodeType === 'unordered-list') return `<ul>${node.content.map(parseRichText).join('')}</ul>`;
  if (node.nodeType === 'list-item') return `<li>${node.content.map(parseRichText).join('')}</li>`;
  if (node.content) return node.content.map(parseRichText).join('');
  return '';
}

async function fetchNews() {
  try {
    const response = await fetch(`https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=notizia`);
    if (!response.ok) {
      console.error('Errore Contentful:', response.statusText);
      return [];
    }
    const data = await response.json();

    // Mappa per unificare gli assets
    const assets = new Map();
    if (data.includes && data.includes.Asset) {
      data.includes.Asset.forEach(asset => assets.set(asset.sys.id, asset));
    }

    // Ordina per data di creazione, dalle più recenti (sx) alle più vecchie
    let items = data.items.map(item => {
      if (item.fields.immagine && item.fields.immagine.sys) {
        item.fields.immagine.fields = assets.get(item.fields.immagine.sys.id)?.fields || null;
      }
      return item;
    });

    items.sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt));
    return items;

  } catch (err) {
    console.error('Contentful Fetch Error:', err);
    return [];
  }
}

async function renderHomepageNews() {
  const grid = document.querySelector('.news-grid');
  if (!grid) return; // Siamo in un'altra pagina

  const newsItems = await fetchNews();
  if (newsItems.length === 0) return; // Fallback: se non ci sono notizie, mantieni l'HTML statico originale

  // Rimuovi la pulizia del grid per non cancellare la card HTML statica (es. rt-pos.html)
  // grid.innerHTML = ''; 

  // Essendo le notizie ordinate dalla più recente alla più vecchia, 
  // se facciamo prepend() una per una, l'ordine si inverte. 
  // Quindi le invertiamo di nuovo, così la più recente viene inserita per ultima e risulta prima (a sinistra).
  newsItems.reverse().forEach(item => {
    const fields = item.fields;
    const date = new Date(item.sys.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

    let imageUrl = 'img/rt-pos.jpg';
    if (fields.immagine && fields.immagine.fields) {
      imageUrl = `https:${fields.immagine.fields.file.url}`;
    }

    // Costruiamo la card esattamente uguale a quella base
    const article = document.createElement('article');
    article.className = 'news-card';
    article.innerHTML = `
      <div class="news-image">
        <img src="${imageUrl}" alt="${fields.titolo || 'News'}">
        <span class="news-category">${fields.categoria || 'Notizie'}</span>
        ${fields.isNew ? '<span class="news-new">NEW</span>' : ''}
      </div>
      <div class="news-content">
        <div class="news-date" style="font-size: 1.3rem;">
          <ion-icon name="calendar-outline"></ion-icon>
          <span>${date}</span>
        </div>
        <h3 class="news-title">${fields.titolo || ''}</h3>
        <p class="news-excerpt">${fields.estratto || ''}</p>
        <div class="news-footer">
          <a href="/pages/notizia.html?id=${item.sys.id}" class="news-read-more">
            Leggi di più
            <ion-icon name="arrow-forward"></ion-icon>
          </a>
        </div>
      </div>
    `;
    grid.prepend(article);
  });

  // Logica per le frecce del carousel
  const track = document.getElementById('news-track');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 395; // Larghezza card + gap circa
    
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

async function renderSingleNews() {
  // Solo se c'è un elemento target per la singola notizia
  const titleEl = document.querySelector('#n-title');
  if (!titleEl) return;

  const id = getQueryParam('id');
  if (!id) return; // Non facciamo nulla se non c'è ID, in modo da poter debuggare la grafica

  const newsItems = await fetchNews();
  let newsItem = newsItems.find(item => item.sys.id === id);

  if (!newsItem) return; // Articolo non trovato

  const fields = newsItem.fields;
  const date = new Date(newsItem.sys.createdAt).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });

  let imageUrl = '../img/rt-pos.jpg';
  if (fields.immagine && fields.immagine.fields) {
    imageUrl = `https:${fields.immagine.fields.file.url}`;
  }

  let paragraphText = '';
  if (typeof fields.testoCompleto === 'string') {
    paragraphText = (fields.testoCompleto || '').split('\n').filter(p => p.trim() !== '').map(p => `<p>${p}</p>`).join('');
  } else if (fields.testoCompleto && fields.testoCompleto.nodeType === 'document') {
    paragraphText = parseRichText(fields.testoCompleto);
  }

  // Inject nei tag
  const catEl = document.querySelector('#n-category');
  if (catEl) catEl.textContent = fields.categoria || "Notizie";

  if (titleEl) titleEl.textContent = fields.titolo;

  const dateEl = document.querySelector('#n-date');
  if (dateEl) dateEl.textContent = date;

  const imgEl = document.querySelector('#n-image');
  if (imgEl) imgEl.src = imageUrl;

  const contentEl = document.querySelector('#n-content');
  if (contentEl) contentEl.innerHTML = paragraphText;

  // Modifica per i Tag
  const tagsListEl = document.querySelector('.tags-list');
  const tagsContainerEl = document.querySelector('.article-tags'); // Contenitore globale per poterlo nascondere interamente
  
  if (tagsListEl && tagsContainerEl) {
    if (fields.tags && Array.isArray(fields.tags) && fields.tags.length > 0) {
      // Mostra il contenitore se era nascosto e inserisci i tag
      tagsContainerEl.style.display = 'block';
      tagsListEl.innerHTML = fields.tags.map(tag => `<a href="#" class="tag">#${tag.trim()}</a>`).join('');
    } else {
      // Nascondi tutto il blocco dei tag se non ci sono tag per questa notizia
      tagsContainerEl.style.display = 'none';
      tagsListEl.innerHTML = '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomepageNews();
  renderSingleNews();
});
