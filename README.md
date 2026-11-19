# Planejar Viagens — primeira versão

Site institucional responsivo em HTML, CSS e JavaScript, preparado para publicação no Cloudflare Pages.

## Estrutura
- `index.html`: página principal.
- `styles.css`: identidade visual e responsividade.
- `script.js`: formulário de orçamento e renderização das ofertas.
- `ofertas.json`: conteúdo das ofertas demonstrativas.
- `admin/`: ponto de partida para o painel CMS.

## Antes de publicar
1. WhatsApp configurado com o número informado: +55 27 92001-6377 (formato internacional no código: `5527920016377`).
2. Confirmar nome comercial, logotipo oficial, e-mail, telefone, redes sociais e dados legais da empresa.
3. Substituir as ofertas demonstrativas em `ofertas.json` por ofertas reais ou manter apenas chamadas genéricas.
4. Revisar as imagens e obter autorização/licenças apropriadas para uso comercial.
5. Configurar o painel CMS conforme as instruções da próxima etapa. O diretório `admin` ainda não está conectado a um provedor de autenticação e não deve ser tratado como painel pronto.

## Publicação básica no Cloudflare Pages
- Criar um repositório Git no GitHub e enviar o conteúdo desta pasta para a raiz do repositório.
- No Cloudflare, abrir Workers & Pages > Create > Pages > Connect to Git.
- Selecionar o repositório. Para este site estático, deixar o comando de build vazio e definir o diretório de saída como `/` ou `.` conforme a interface aceitar.
- Após o primeiro deploy, adicionar `planejarviagens.com.br` e `www.planejarviagens.com.br` como domínios personalizados no projeto Pages e seguir as instruções DNS apresentadas pela Cloudflare.
- Antes de alterar DNS, registrar/capturar todos os registros atuais, especialmente MX, SPF, DKIM e DMARC do e-mail UOL. Não remover nem substituir os registros de e-mail.

## Atualizar ofertas nesta versão
Editar `ofertas.json`, mantendo os campos `titulo`, `destino`, `descricao`, `imagem`, `etiqueta` e `ativa`. `ativa: false` oculta a oferta. Enviar a alteração ao GitHub provoca novo deploy no Cloudflare Pages.

## Painel administrativo
A pasta `/admin` será configurada numa próxima etapa com CMS e autenticação. Não inserir senhas, tokens ou chaves privadas em arquivos públicos do site.

## Páginas de ofertas e destinos
- `ofertas.html`: lista todas as ofertas com `ativa: true` em `ofertas.json`.
- `destinos/beto-carrero.html`: página de venda da promoção do Beto Carrero World (também acessível pelo card em "Destinos" na página inicial).
- `ofertas.css`: estilos compartilhados pelas páginas internas.
- `assets/`: logotipo (`logo.png`, também usado como favicon) e foto do parque.

### Adicionar uma nova oferta
1. Copiar `destinos/beto-carrero.html` para `destinos/nome-da-oferta.html` e editar título, datas, valores, itens inclusos e a mensagem do WhatsApp (atributo `data-whatsapp`).
2. Incluir um item em `ofertas.json` com `slug`, `titulo`, `destino`, `descricao`, `imagem`, `etiqueta`, `link` (`destinos/nome-da-oferta.html`) e `ativa`.
3. Enviar ao GitHub para novo deploy.

### WhatsApp
O número fica em um único lugar: `WHATSAPP_NUMBER` no `script.js`. Os botões "Contato" e "Garanta agora!" usam esse número.
