# Configurações da loja Bem Presente

Guia de referência para recuperar as configurações atuais da loja. O repositório GitHub é a cópia principal do site; mantenha também uma cópia deste arquivo e dos arquivos originais em um local seguro.

## Site e domínio

- Site: <https://lojabempresente.com.br/>
- Domínio configurado: `lojabempresente.com.br`
- Arquivo do domínio no projeto: `CNAME`
- Plataforma de publicação: GitHub Pages
- Branch de publicação: `Bem-Presente`
- Pasta de publicação: raiz (`/`)
- O site é estático: não requer comando de build.
- HTTPS está habilitado. Não altere os registros DNS que já estão funcionando nem remova registros de e-mail.

Se for necessário reconstruir a zona DNS do GitHub Pages, confirme primeiro as instruções atuais no painel do repositório e do provedor do domínio. A configuração documentada no [README.md](./README.md) usa quatro registros `A` para o domínio raiz e um `CNAME` para `www`; preservar os registros atuais é mais seguro do que recriá-los sem necessidade.

## Atendimento

- WhatsApp da loja: `+55 92 91117-7526`
- Formato usado nos links `wa.me`: `559291117526`
- Os botões do catálogo e o carrinho direcionam para o WhatsApp.
- Confirme disponibilidade, preço final, composição e entrega antes de anunciar uma oferta.
- A área “Seu espaço Bem Presente” faz sugestões localmente no navegador; não coleta nem guarda nome, telefone ou preferências.
- O botão de novidades abre uma mensagem pré-preenchida. Só haverá contato se a pessoa abrir o WhatsApp e enviar a mensagem; não existe CRM, lista de clientes nem envio automático.
- Não há percentual de desconto ativo configurado pelo site. Antes de divulgar um desconto, confirme produtos incluídos, preço normal e promocional, validade, estoque e demais condições. Os valores do catálogo são ilustrativos, não preços de venda.

## Google Search Console e indexação

- URL da propriedade para o método “Prefixo do URL”: `https://lojabempresente.com.br/`
- A verificação por meta tag fica no `<head>` de `index.html`, junto dos metadados da página.
- Não apague a meta tag enquanto a propriedade do Search Console depender dessa verificação.
- Sitemap: <https://lojabempresente.com.br/sitemap.xml>
- Referência ao sitemap: `robots.txt`
- As páginas públicas estão listadas em `sitemap.xml`; a página inicial também tem URL canônica e dados estruturados com o nome **Bem Presente**.
- Depois de uma alteração no domínio ou no site, confira o estado da propriedade e do sitemap no [Google Search Console](https://search.google.com/search-console). A indexação e a posição nos resultados são decididas pelo Google e podem levar tempo.

## Catálogo, desempenho e acessibilidade

- O catálogo tem 30 sugestões, busca, filtros e coleções interativas.
- Produtos, imagens e faixas de preço são ilustrativos; não indicam estoque confirmado.
- O assistente “Seu espaço Bem Presente” combina categoria, ocasião e faixa ilustrativa para sugerir ideias; os dados ficam apenas na página aberta. Ofertas e descontos são confirmados manualmente no WhatsApp, sem cadastro ou campanhas automáticas.
- As imagens usam carregamento adiado onde apropriado e tamanhos ajustados para reduzir dados carregados.
- O menu pode ser usado pelo teclado; `Esc` fecha o menu móvel e devolve o foco ao botão.
- Os estilos incluem foco visível e respeitam a preferência de redução de movimento do dispositivo.
- O catálogo prioriza leitura rápida em computadores e celulares: cartões compactos, fotos exibidas por inteiro ao lado das informações, descrições e preços legíveis, filtros roláveis e botões fáceis de tocar.
- Arquivos principais: `index.html`, `style.css` e `script.js`.

## App instalável e acesso offline

- O site pode ser instalado como PWA pelo menu do navegador; não é um app distribuído pela Play Store ou App Store.
- Chrome/Edge: abra `https://lojabempresente.com.br` e use o botão **Instalar aplicativo** ou o comando de instalação do navegador.
- iPhone/iPad: abra no Safari, toque em Compartilhar e escolha **Adicionar à Tela de Início**.
- Depois de abrir o site conectado, a página inicial e páginas visitadas podem abrir offline. Imagens externas e atendimento pelo WhatsApp precisam de internet.
- Arquivos da PWA: `manifest.webmanifest`, `sw.js`, `offline.html` e `app-icon-192.png`/`app-icon-512.png`.

## Vídeos promocionais

Os vídeos promocionais foram baixados pelo proprietário e não são mais hospedados pelo site. Para disponibilizar novos vídeos, adicione os arquivos e atualize a página de downloads antes de publicar.

## Como preservar e recuperar

1. Não apague `CNAME`, `robots.txt`, `sitemap.xml` ou a meta tag de verificação do Google ao atualizar o site.
2. Antes de alterar o domínio, DNS ou publicação, confira esta página e o [README.md](./README.md).
3. Mantenha o repositório atualizado e guarde uma cópia dos arquivos fora do computador.
4. Para publicar alterações, use a branch `Bem-Presente` e confirme no GitHub Pages que a compilação terminou com sucesso.
5. Depois da publicação, teste o site, o sitemap e os links do WhatsApp.

> Esta documentação não guarda senhas, códigos de recuperação nem credenciais de contas. Não coloque esses dados no repositório.
