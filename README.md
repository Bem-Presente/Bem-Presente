# Bem Presente — Blog + Loja

Site estático pronto para uso e publicação gratuita.

## Como visualizar localmente
1. Abra a pasta do projeto no VS Code.
2. Inicie um servidor simples com:
   python3 -m http.server 8000
3. Acesse http://localhost:8000

## Como personalizar
- Troque os produtos, preços e textos no arquivo `index.html`.
- Ajuste o número do WhatsApp nos links `wa.me`.
- Na loja, o cliente pode montar um pedido com vários produtos e quantidades e enviá-lo pelo WhatsApp; disponibilidade, preço final e entrega são confirmados no atendimento.
- O catálogo tem busca e filtros por categoria. As 30 ideias, imagens e faixas de preço são ilustrativas; confirme os produtos reais e os preços antes de divulgar a oferta.
- A área **Seu espaço Bem Presente** sugere produtos no próprio navegador conforme categoria, ocasião e faixa ilustrativa. As escolhas não são salvas nem enviadas automaticamente.
- O link de novidades abre uma conversa voluntária no WhatsApp; não há cadastro, lista de contatos nem disparo automático nesta versão. Descontos só podem ser anunciados depois de confirmar produtos participantes, preço, período, disponibilidade e condições. Nenhum percentual promocional foi definido neste site.
- O SEO básico informa a marca `Bem Presente`, inclui URLs canônicas nas páginas principais e lista as páginas públicas em `sitemap.xml`, referenciado por `robots.txt`. Para pedir a indexação ao Google, adicione o domínio `lojabempresente.com.br` no Google Search Console, conclua a verificação de propriedade, envie `https://lojabempresente.com.br/sitemap.xml` e solicite a indexação da página inicial. A indexação e a posição nos resultados dependem do Google e não são imediatas nem garantidas.
- O layout se adapta a celulares, tablets e computadores, incluindo navegação, catálogo e artigos.
- As imagens do catálogo usam tamanhos ajustados para telas comuns e carregamento adiado; as coleções viram cartões horizontais em celulares. Controles de teclado exibem foco visível, e o menu móvel pode ser fechado com Escape.
- As páginas usam uma Content Security Policy (CSP) para limitar scripts, imagens e conexões, além de política de referência restrita. O site é estático e não processa pagamentos nem armazena pedidos; o carrinho só monta uma mensagem para o WhatsApp.
- A loja pode ser instalada como app web (PWA) pelo menu do navegador. Após abrir o site conectado, páginas e arquivos principais ficam disponíveis offline; fotos externas e o atendimento do WhatsApp continuam dependendo da internet.
- Para instalar: abra `https://lojabempresente.com.br` no Chrome/Edge e escolha **Instalar aplicativo** no botão da página ou menu do navegador. No iPhone/iPad, use **Compartilhar → Adicionar à Tela de Início** no Safari. A loja não precisa ser enviada a uma loja de aplicativos para funcionar como PWA.
- No GitHub Pages, cabeçalhos HTTP como `Strict-Transport-Security`, `X-Content-Type-Options`, `Permissions-Policy` e `frame-ancestors` não podem ser configurados por este repositório. Para controle desses cabeçalhos, use um proxy/CDN compatível ou uma hospedagem que permita configurá-los. Nenhum site pode ser considerado totalmente invulnerável.
- Edite os artigos do blog em `artigo-*.html`.
- Configure a identidade visual em `style.css`.

## Publicação
O projeto não usa framework nem etapa de build. Publique os arquivos da raiz como site estático:

- **GitHub Pages:** em Settings → Pages, escolha `Deploy from a branch`, a branch `Bem-Presente` e a pasta raiz (`/`). O domínio `lojabempresente.com.br` está definido no arquivo `CNAME`. No Registro.br, mantenha os servidores DNS atuais e adicione estes registros à zona:

  | Tipo | Nome | Valor |
  |---|---|---|
  | A | `@` | `185.199.108.153` |
  | A | `@` | `185.199.109.153` |
  | A | `@` | `185.199.110.153` |
  | A | `@` | `185.199.111.153` |
  | CNAME | `www` | `bem-presente.github.io` |

  Não remova registros de e-mail. Após a propagação do DNS, confirme o domínio em Settings → Pages e habilite HTTPS quando estiver disponível.
- **Netlify:** conecte o repositório, deixe o comando de build vazio e use `.` como diretório de publicação.
- **Cloudflare Pages:** escolha framework `None`, deixe o comando de build vazio e use `.` como diretório de saída.

Antes de publicar, confira o número do WhatsApp, os produtos, os preços e os artigos. As imagens são carregadas do Unsplash e precisam de internet. Ative HTTPS nas configurações da plataforma quando o domínio estiver verificado.

## Estrutura
- `index.html` — página inicial, loja e blog
- `style.css` — visual do site
- `script.js` — menu, catálogo, pedidos pelo WhatsApp e instalação do app
- `artigo-*.html` — artigos do blog
- `favicon.svg` — ícone da loja
- `manifest.webmanifest`, `sw.js`, `offline.html` e `app-icon-*.png` — instalação e modo offline do app
- `robots.txt` — orientação para mecanismos de busca
- `404.html` — página de endereço não encontrado
