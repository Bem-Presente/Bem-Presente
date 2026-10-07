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
- Edite os artigos do blog em `artigo-*.html`.
- Configure a identidade visual em `style.css`.

## Publicação
O projeto não usa framework nem etapa de build. Publique os arquivos da raiz como site estático:

- **GitHub Pages:** em Settings → Pages, escolha `Deploy from a branch`, a branch `Bem-Presente` e a pasta raiz (`/`). Para usar `lojabempresente.com.br`, cadastre o domínio em **Custom domain** e configure os registros DNS no provedor do domínio.
- **Netlify:** conecte o repositório, deixe o comando de build vazio e use `.` como diretório de publicação.
- **Cloudflare Pages:** escolha framework `None`, deixe o comando de build vazio e use `.` como diretório de saída.

Antes de publicar, confira o número do WhatsApp, os produtos, os preços e os artigos. As imagens são carregadas do Unsplash e precisam de internet. Ative HTTPS nas configurações da plataforma quando o domínio estiver verificado.

## Estrutura
- `index.html` — página inicial, loja e blog
- `style.css` — visual do site
- `script.js` — menu mobile
- `artigo-*.html` — artigos do blog
- `favicon.svg` — ícone da loja
- `robots.txt` — orientação para mecanismos de busca
- `404.html` — página de endereço não encontrado
