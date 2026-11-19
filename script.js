// IMPORTANTE: antes de publicar, informe o WhatsApp oficial da agência com DDI e DDD, somente números.
const WHATSAPP_NUMBER = '5527920016377'; // WhatsApp informado pela Planejar Viagens: +55 27 92001-6377.

const grid = document.getElementById('offer-grid');
fetch('ofertas.json').then(r => r.json()).then(items => {
  const active = items.filter(item => item.ativa);
  grid.innerHTML = active.map(item => `
    <article class="offer-card">
      <div class="offer-image" style="background-image:url('${escapeHtml(item.imagem)}')"><span class="offer-tag">${escapeHtml(item.etiqueta || 'Consulte')}</span></div>
      <div class="offer-body"><span class="location">${escapeHtml(item.destino)}</span><h3>${escapeHtml(item.titulo)}</h3><p>${escapeHtml(item.descricao)}</p><a class="offer-link" href="#contato">Consultar condições ↗</a></div>
    </article>`).join('');
}).catch(() => { grid.innerHTML = '<p class="empty-offer">Em breve, novas oportunidades para viajar. Fale com a nossa equipe e peça uma cotação personalizada.</p>'; });

function escapeHtml(value='') { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

document.getElementById('quote-form').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = `Olá! Gostaria de solicitar uma cotação pela Planejar Viagens.\n\nNome: ${data.get('nome')}\nDestino: ${data.get('destino')}\nQuando: ${data.get('periodo') || 'A definir'}\nPessoas: ${data.get('pessoas') || 'A definir'}\nInteresse: ${data.get('tipo')}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});

document.querySelector('.menu-toggle').addEventListener('click', () => {
  const menu = document.querySelector('.menu'); const button = document.querySelector('.menu-toggle');
  const open = menu.classList.toggle('open'); button.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => document.querySelector('.menu').classList.remove('open')));
document.getElementById('year').textContent = new Date().getFullYear();
