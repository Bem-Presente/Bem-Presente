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
- O catálogo tem busca e filtros por categoria. Os 14 itens e imagens são sugestões ilustrativas; confirme os produtos reais e os preços antes de divulgar a oferta.
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
- `script.js` — menu mobile
- `artigo-*.html` — artigos do blog
- `favicon.svg` — ícone da loja
- `robots.txt` — orientação para mecanismos de busca
- `404.html` — página de endereço não encontrado
