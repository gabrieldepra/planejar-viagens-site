// IMPORTANTE: antes de publicar, informe o WhatsApp oficial da agência com DDI e DDD, somente números.
const WHATSAPP_NUMBER = '5527920016377'; // WhatsApp informado pela Planejar Viagens: +55 27 92001-6377.

function escapeHtml(value='') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// Ofertas: renderiza cards (página inicial e ofertas.html). Cada card leva para a página da oferta (campo "link").
const grid = document.getElementById('offer-grid');
if (grid) {
  const limit = Number(grid.dataset.limit) || Infinity;
  fetch('ofertas.json').then(r => r.json()).then(items => {
    const active = items.filter(item => item.ativa).slice(0, limit);
    grid.innerHTML = active.map(item => {
      const style = item.imagem ? ` style="background-image:url('${escapeHtml(item.imagem)}')"` : '';
      const href = escapeHtml(item.link || '#contato');
      const cta = item.link ? 'Ver oferta ↗' : 'Consultar condições ↗';
      return `
    <article class="offer-card">
      <a class="offer-image${item.imagem ? '' : ' no-photo'}"${style} href="${href}" tabindex="-1" aria-hidden="true"><span class="offer-tag">${escapeHtml(item.etiqueta || 'Consulte')}</span></a>
      <div class="offer-body"><span class="location">${escapeHtml(item.destino)}</span><h3>${escapeHtml(item.titulo)}</h3><p>${escapeHtml(item.descricao)}</p><a class="offer-link" href="${href}">${cta}</a></div>
    </article>`;
    }).join('');
  }).catch(() => { grid.innerHTML = '<p class="empty-offer">Em breve, novas oportunidades para viajar. Fale com a nossa equipe e peça uma cotação personalizada.</p>'; });
}

// Formulário de cotação (somente na página inicial)
const form = document.getElementById('quote-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá! Gostaria de solicitar uma cotação pela Planejar Viagens.\n\nNome: ${data.get('nome')}\nDestino: ${data.get('destino')}\nQuando: ${data.get('periodo') || 'A definir'}\nQuantos dias: ${data.get('dias') || 'A definir'}\nPessoas: ${data.get('pessoas') || 'A definir'}\nInteresse: ${data.get('tipo')}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

// Botões de WhatsApp das páginas de oferta: <a data-whatsapp="mensagem">
document.querySelectorAll('[data-whatsapp]').forEach(a => {
  a.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(a.dataset.whatsapp)}`;
  a.target = '_blank'; a.rel = 'noopener';
});

// Menu mobile
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (toggle && menu) {
  toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
