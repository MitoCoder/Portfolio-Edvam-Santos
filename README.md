# Portfólio Edvam Santos

Portfólio profissional de Edvam Santos, Desenvolvedor Full Stack em São Paulo.
O projeto apresenta serviços, experiência, projetos selecionados, processo de
trabalho e uma arquitetura de conteúdo voltada a SEO orgânico.

## Recursos principais

- layout responsivo para desktop e mobile;
- navegação principal e menu lateral por seções;
- apresentação de serviços com detalhes e resultados esperados;
- oito estudos de projetos e sistemas desenvolvidos;
- contato direto por WhatsApp e links profissionais;
- central navegável em `/mapa-do-site-e-seo/`;
- geração estática de 504 páginas de conteúdo;
- metadados, Schema.org, breadcrumbs, sitemap e robots;
- suporte a acessibilidade e preferência por movimento reduzido.

## Tecnologias

- React 18;
- Create React App;
- Framer Motion;
- Ant Design Icons;
- CSS responsivo;
- Node.js para geração estática das páginas de SEO;
- Jest e Testing Library.

## Executando localmente

Requisitos:

- Node.js 18 ou superior;
- npm.

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm start
```

Por padrão, o site estará disponível em `http://localhost:3000`.

## Scripts

```bash
npm start
npm run build
npm test -- --watchAll=false
```

O comando `npm run build` também executa automaticamente o `postbuild`,
responsável por criar as páginas estáticas e os arquivos técnicos de SEO.

## Configuração do domínio

Crie o arquivo de ambiente usado na publicação a partir de `.env.example`:

```env
REACT_APP_SITE_URL=https://seu-dominio.com.br
SEO_SITE_URL=https://seu-dominio.com.br
```

As duas variáveis devem apontar para o mesmo domínio, sem barra no final.
Elas são usadas em canonical, Open Graph, dados estruturados, sitemap e links
absolutos.

## Arquitetura SEO

O catálogo em `src/seo/seoCatalog.js` organiza 504 páginas em 12 clusters
semânticos. Cada cluster possui 42 páginas:

| Tipo de página | Quantidade por cluster |
| --- | ---: |
| Página pilar do serviço | 1 |
| Soluções por segmento | 12 |
| Guias práticos | 12 |
| Perguntas frequentes | 12 |
| Comparativos | 3 |
| Estudos aplicados | 2 |
| **Total** | **42** |

Os clusters cobrem:

- desenvolvimento de sites profissionais;
- criação de landing pages;
- desenvolvimento de sistemas web;
- software sob medida;
- automação de processos;
- integração de APIs;
- dashboards e indicadores;
- modernização de sistemas legados;
- e-commerce e funis de vendas;
- aplicativos web e PWA;
- SEO técnico e performance;
- consultoria e arquitetura de software.

Cada página possui:

- URL descritiva e canonical individual;
- título e descrição próprios;
- HTML estático indexável;
- hierarquia semântica de headings;
- breadcrumbs;
- palavras-chave principais e relacionadas;
- perguntas frequentes;
- links para a página pilar e conteúdos relacionados;
- Schema.org adequado ao tipo de conteúdo.

## Arquivos gerados

Após o build, a pasta `build` contém:

- 504 páginas estáticas de conteúdo;
- página central em `/mapa-do-site-e-seo/`;
- `sitemap.xml` com 506 URLs;
- `robots.txt`;
- `llms.txt`;
- `404.html` com orientação `noindex`;
- arquivos otimizados de JavaScript e CSS.

## Estrutura principal

```text
src/
├── pages/
│   ├── Home.js
│   ├── Home.css
│   ├── SeoExperience.js
│   └── SeoExperience.css
└── seo/
    ├── seoCatalog.js
    └── seoCatalog.test.js
scripts/
└── generate-seo-pages.js
public/
├── index.html
└── robots.txt
```

## Validação

Execute antes da publicação:

```bash
npm test -- --watchAll=false
npm run build
```

Depois do deploy, envie o endereço de `sitemap.xml` ao Google Search Console e
acompanhe cobertura, indexação, Core Web Vitals e consultas orgânicas. A
arquitetura técnica cria a base para descoberta e autoridade, mas posições nas
buscas também dependem da qualidade editorial contínua, concorrência, menções e
links externos legítimos.
