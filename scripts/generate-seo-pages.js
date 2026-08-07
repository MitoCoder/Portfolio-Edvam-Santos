/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const catalog = require('../src/seo/seoCatalog');

const buildDir = path.resolve(__dirname, '..', 'build');
const templatePath = path.join(buildDir, 'index.html');
const today = new Date().toISOString().slice(0, 10);
const siteUrl = (process.env.SEO_SITE_URL || catalog.SITE_URL).replace(/\/$/, '');
const privacyPolicyPath = '/politica-de-privacidade/';
const privacyPolicyTitle = "Política de Privacidade | Ed's Plugin WhatsApp";
const privacyPolicyDescription =
  "Política de Privacidade da extensão Ed's Plugin | WhatsApp, com informações sobre dados locais, licença, permissões e contato.";
const template = fs
  .readFileSync(templatePath, 'utf8')
  .replace(/https:\/\/portfolio-edvam-santos\.vercel\.app/g, siteUrl);

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const absoluteUrl = (pathname) => `${siteUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;

function breadcrumbsFor(page, cluster) {
  const items = [
    { name: 'Início', path: '/' },
    { name: 'Mapa do Site e SEO', path: '/mapa-do-site-e-seo/' },
  ];

  if (page.path !== `/conteudos/${cluster.slug}/`) {
    items.push({ name: cluster.title, path: `/conteudos/${cluster.slug}/` });
  }

  items.push({ name: page.h1, path: page.path });
  return items;
}

function schemaForPage(page, cluster) {
  const breadcrumbs = breadcrumbsFor(page, cluster);
  const mainEntity =
    page.type === 'service'
      ? {
          '@type': 'Service',
          name: page.h1,
          description: page.description,
          serviceType: cluster.title,
          provider: {
            '@type': 'ProfessionalService',
            name: catalog.AUTHOR.name,
            url: siteUrl,
            areaServed: { '@type': 'Country', name: 'Brasil' },
          },
        }
      : {
          '@type': 'Article',
          headline: page.h1,
          description: page.description,
          mainEntityOfPage: absoluteUrl(page.path),
          dateModified: today,
          inLanguage: 'pt-BR',
          author: {
            '@type': 'Person',
            name: catalog.AUTHOR.name,
            url: siteUrl,
            sameAs: [catalog.AUTHOR.linkedin, catalog.AUTHOR.github],
          },
        };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': absoluteUrl(page.path),
        url: absoluteUrl(page.path),
        name: page.title,
        description: page.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@type': 'Thing', name: page.keyword },
      },
      mainEntity,
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

function staticHeader() {
  return `
    <header class="seo-header">
      <a class="seo-brand" href="/" aria-label="Edvam Santos, página inicial"><strong>E/S</strong><span>Edvam Santos</span></a>
      <nav class="seo-nav" aria-label="Navegação SEO">
        <a href="/">Portfólio</a>
        <a href="/mapa-do-site-e-seo/">Mapa do Site e SEO</a>
        <a class="seo-nav-cta" href="https://wa.me/5511957207168">Conversar</a>
      </nav>
    </header>`;
}

function staticFooter() {
  return `
    <footer class="seo-footer">
      <div><strong>E/S</strong><p>Estratégia, produto e engenharia para soluções digitais que precisam funcionar no mundo real.</p></div>
      <nav aria-label="Links do rodapé"><a href="/">Portfólio</a><a href="/mapa-do-site-e-seo/">Mapa do Site e SEO</a><a href="${catalog.AUTHOR.linkedin}">LinkedIn</a></nav>
      <span>© ${new Date().getFullYear()} Edvam Santos</span>
    </footer>`;
}

function staticContentPage(page) {
  const cluster = catalog.getCluster(page.clusterSlug);
  const breadcrumbs = breadcrumbsFor(page, cluster);

  return `
    <div class="seo-experience">
      ${staticHeader()}
      <main>
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb"><ol>
          ${breadcrumbs.map((item, index) => `<li${index === breadcrumbs.length - 1 ? ' aria-current="page"' : ''}>${index === breadcrumbs.length - 1 ? escapeHtml(item.name) : `<a href="${item.path}">${escapeHtml(item.name)}</a>`}</li>`).join('')}
        </ol></nav>
        <article class="seo-article">
          <header class="seo-hero">
            <div class="seo-hero-copy">
              <span class="seo-eyebrow">${escapeHtml(page.typeLabel)} · Edvam Santos</span>
              <h1>${escapeHtml(page.h1)}</h1>
              <p>${escapeHtml(page.description)}</p>
            </div>
            <aside class="seo-hero-index" aria-label="Resumo do conteúdo">
              <span>CLUSTER</span><strong>${escapeHtml(cluster.title)}</strong>
              <span>INTENÇÃO PRINCIPAL</span><strong>${escapeHtml(page.keyword)}</strong>
              <span>ATUALIZAÇÃO</span><strong>${new Date().getFullYear()}</strong>
            </aside>
          </header>
          <div class="seo-reading-layout">
            <div class="seo-reading">
              <section class="seo-intro" aria-label="Introdução">${page.intro.map((item) => `<p>${escapeHtml(item)}</p>`).join('')}</section>
              <section class="seo-checklist">
                <span>VISÃO PRÁTICA</span><h2>O que uma boa entrega precisa cobrir</h2>
                <ul>${page.bullets.map((item) => `<li><span>✓</span><span>${escapeHtml(item)}</span></li>`).join('')}</ul>
              </section>
              ${page.sections.map((section, index) => `
                <section class="seo-copy-section">
                  <span>${String(index + 1).padStart(2, '0')}</span>
                  <h2>${escapeHtml(section.title)}</h2>
                  ${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}
                </section>`).join('')}
              <section class="seo-faq">
                <span>DÚVIDAS RELACIONADAS</span><h2>Perguntas frequentes</h2>
                ${page.faq.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}
              </section>
            </div>
            <aside class="seo-sidebar">
              <div class="seo-side-block"><span>NESTE CLUSTER</span><a href="/conteudos/${cluster.slug}/">${escapeHtml(cluster.title)}</a><a href="/mapa-do-site-e-seo/">Ver estrutura completa</a></div>
              <div class="seo-side-block"><span>TEMAS ASSOCIADOS</span><div class="seo-keywords">${page.secondaryKeywords.slice(0, 6).map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}</div></div>
              <a class="seo-side-cta" href="https://wa.me/5511957207168"><small>PRECISA APLICAR ISSO?</small><strong>Converse sobre seu projeto</strong></a>
            </aside>
          </div>
          <section class="seo-related">
            <span>CONTINUE EXPLORANDO</span><h2>Conteúdos relacionados</h2>
            <div>${page.related.map((item) => `<a href="${item.path}"><small>${escapeHtml(item.typeLabel)}</small><strong>${escapeHtml(item.title)}</strong><span>→</span></a>`).join('')}</div>
          </section>
          <section class="seo-contact-band"><div><span>DO CONTEÚDO PARA A PRÁTICA</span><h2>Seu projeto precisa de uma direção clara?</h2></div><a href="https://wa.me/5511957207168">Iniciar conversa</a></section>
        </article>
      </main>
      ${staticFooter()}
    </div>`;
}

function staticMapPage() {
  return `
    <div class="seo-experience seo-map-page">
      ${staticHeader()}
      <main>
        <nav class="seo-breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="/">Início</a></li><li aria-current="page">Mapa do Site e SEO</li></ol></nav>
        <section class="map-hero">
          <div><span class="seo-eyebrow">ARQUITETURA DE CONTEÚDO</span><h1>Mapa do Site<br>e SEO</h1></div>
          <p>Uma biblioteca organizada por intenção de busca. Cada conteúdo se conecta a um tema principal, responde uma necessidade específica e indica o próximo caminho útil.</p>
          <strong>${catalog.pages.length}<small>páginas interligadas</small></strong>
        </section>
        <section class="map-principles">
          <article><span>01</span><h2>Clusters semânticos</h2><p>Doze temas principais organizam serviços, guias, dúvidas, comparativos e estudos aplicados.</p></article>
          <article><span>02</span><h2>Intenção clara</h2><p>Cada URL atende uma pergunta ou decisão específica, sem competir com páginas irmãs.</p></article>
          <article><span>03</span><h2>Malha interna</h2><p>Breadcrumbs, páginas pilar e recomendações contextuais distribuem relevância e facilitam o rastreamento.</p></article>
          <article><span>04</span><h2>Base técnica</h2><p>HTML estático, metadados, Schema.org, sitemap e semântica tornam o conteúdo acessível.</p></article>
        </section>
        <section class="map-architecture">
          <div><span class="seo-eyebrow">COMO A RELEVÂNCIA CIRCULA</span><h2>Uma estrutura que conecta contexto, intenção e próximo passo.</h2></div>
          <ol>
            <li><strong>Portfólio</strong><span>apresenta experiência, serviços e provas de execução</span></li>
            <li><strong>Mapa central</strong><span>distribui acesso para todos os clusters e intenções</span></li>
            <li><strong>12 páginas pilar</strong><span>concentram o contexto principal de cada solução</span></li>
            <li><strong>492 páginas de apoio</strong><span>aprofundam setores, dúvidas, guias, escolhas e aplicações</span></li>
            <li><strong>Links contextuais</strong><span>reconectam cada conteúdo à página pilar e a temas complementares</span></li>
          </ol>
          <div class="map-technical-list"><span>HTML estático indexável</span><span>URLs descritivas</span><span>Canonical individual</span><span>Metadados sociais</span><span>BreadcrumbList</span><span>Service, Article e FAQPage</span><span>Sitemap XML</span><span>Robots.txt</span><span>Conteúdo semântico</span><span>Navegação acessível</span></div>
        </section>
        <section class="map-browser">
          <header><div><span>ÍNDICE COMPLETO</span><h2>Explore os temas</h2></div></header>
          <div class="map-clusters">
            ${catalog.clusters.map((cluster, clusterIndex) => `
              <section class="map-cluster${clusterIndex === 0 ? ' expanded' : ''}">
                <header><span>${String(clusterIndex + 1).padStart(2, '0')}</span><div><h3>${escapeHtml(cluster.title)}</h3><p>${escapeHtml(cluster.solution)}. Foco em ${escapeHtml(cluster.result)}.</p><div class="map-cluster-keywords"><span>${escapeHtml(cluster.keyword)}</span>${cluster.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join('')}</div></div><strong>${catalog.pagesByCluster[cluster.slug].length}</strong></header>
                <div class="map-groups">
                  ${Object.entries(catalog.pagesByCluster[cluster.slug].reduce((groups, page) => {
                    groups[page.typeLabel] = groups[page.typeLabel] || [];
                    groups[page.typeLabel].push(page);
                    return groups;
                  }, {})).map(([label, groupPages]) => `
                    <div class="map-group"><h4>${escapeHtml(label)}</h4>${groupPages.map((page) => `<a href="${page.path}"><span>${escapeHtml(page.h1)}</span><span>→</span></a>`).join('')}</div>
                  `).join('')}
                </div>
              </section>`).join('')}
          </div>
        </section>
      </main>
      ${staticFooter()}
    </div>`;
}

function staticPrivacyPolicyPage() {
  const storedData = [
    'Identificadores da instalação e da licença, como installId e clientKey.',
    'Datas de instalação, período de teste e status de ativação.',
    'Configurações criadas pelo usuário, como atendentes, frases prontas, etiquetas, ficha de cliente, follow-ups, modo privado, wallpaper e preferências do menu.',
    'Dados exportados ou importados pelo próprio usuário para backup de configurações.',
  ];
  const permissions = [
    'storage: salvar localmente as configurações e dados de uso da extensão no navegador.',
    'tabs: identificar a aba do WhatsApp Web e aplicar a interface da extensão no contexto correto.',
    'alarms: executar verificações e rotinas internas relacionadas à ativação e funcionamento.',
    'https://web.whatsapp.com/*: inserir a interface e os recursos da extensão no WhatsApp Web.',
    'https://api-licencas-phi.vercel.app/*: registrar instalação e consultar status de licença.',
  ];

  return `
    <div class="seo-experience privacy-policy-page">
      <header class="privacy-header">
        <a class="seo-brand" href="/" aria-label="Edvam Santos, página inicial"><strong>E/S</strong><span>Edvam Santos</span></a>
        <span class="privacy-header-label">Documento público da extensão</span>
      </header>
      <main>
        <article class="privacy-document">
          <nav class="privacy-breadcrumb" aria-label="Breadcrumb"><a href="/">← Portfólio</a><span>/</span><span aria-current="page">Política de Privacidade</span></nav>
          <header class="privacy-hero">
            <span class="seo-eyebrow">ED'S PLUGIN | WHATSAPP</span>
            <h1>Política de Privacidade</h1>
            <p>Esta política descreve como a extensão Ed's Plugin | WhatsApp lida com informações, permissões do navegador, armazenamento local e consulta de licença.</p>
            <div class="privacy-summary" aria-label="Resumo da política">
              <span>Dados operacionais salvos localmente</span>
              <span>Licença verificada por API própria</span>
              <span>Sem venda de dados pessoais</span>
            </div>
          </header>
          <div class="privacy-content">
            <section><h2>1. Identificação</h2><p>A extensão Ed's Plugin | WhatsApp foi desenvolvida por Edvam Santos para transformar o WhatsApp Web em uma central de atendimento com recursos de organização, produtividade, identificação de atendente, frases prontas, etiquetas, follow-ups, propostas rápidas e ferramentas auxiliares.</p><p>Esta política se aplica somente ao uso da extensão no navegador Google Chrome ou em navegadores compatíveis com extensões Manifest V3.</p></section>
            <section><h2>2. Informações armazenadas pela extensão</h2><p>A extensão utiliza o armazenamento local do navegador chrome.storage.local para manter dados necessários ao seu funcionamento. Esses dados ficam no dispositivo do usuário, salvo quando uma ação específica de licença exigir comunicação com a API de ativação.</p><ul>${storedData.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
            <section><h2>3. Verificação de licença</h2><p>Para registrar a instalação e verificar o status da licença, a extensão se comunica com a API:</p><code>https://api-licencas-phi.vercel.app/api</code><p>Nessa comunicação podem ser enviados identificadores técnicos da instalação, chave do cliente, versão da extensão, datas de teste e informações básicas do navegador necessárias para controle de ativação, prevenção de uso indevido e suporte ao funcionamento da licença.</p></section>
            <section><h2>4. Permissões usadas</h2><p>A extensão solicita apenas permissões relacionadas ao seu propósito de funcionar dentro do WhatsApp Web e manter configurações locais:</p><ul>${permissions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>
            <section><h2>5. Conteúdo do WhatsApp Web</h2><p>A extensão roda dentro do WhatsApp Web para adicionar recursos de atendimento. Ela pode interagir com elementos da página para aplicar identificadores, etiquetas, textos prontos e recursos visuais solicitados pelo usuário.</p><p>A extensão não tem como objetivo vender, compartilhar ou monetizar mensagens, conversas, contatos ou conteúdo do WhatsApp. O usuário é responsável pelo uso da ferramenta de acordo com as regras do WhatsApp, leis aplicáveis e políticas internas do seu atendimento.</p></section>
            <section><h2>6. Compartilhamento de dados</h2><p>Os dados não são vendidos. O compartilhamento externo é limitado à API de licenças usada para registrar instalação, consultar ativação e manter o controle de acesso ao produto. A API pode registrar essas informações em infraestrutura própria para fins operacionais, suporte, segurança e gestão de licença.</p><p>O uso das informações pela extensão observa a Política de Dados do Usuário da Chrome Web Store, incluindo os requisitos de Limited Use: os dados são usados somente para fornecer ou melhorar a finalidade declarada da extensão e não são usados para publicidade personalizada, venda de dados ou determinação de crédito.</p></section>
            <section><h2>7. Segurança e retenção</h2><p>As configurações ficam armazenadas localmente no navegador e podem ser removidas ao limpar os dados do Chrome, desinstalar a extensão ou usar recursos de backup/exportação/importação disponíveis na própria ferramenta.</p><p>Nenhum sistema é completamente imune a falhas. Por isso, o usuário deve evitar inserir segredos, senhas, dados bancários ou informações excessivamente sensíveis em campos livres da extensão.</p></section>
            <section><h2>8. Direitos do usuário</h2><p>O usuário pode remover a extensão a qualquer momento, limpar os dados locais no navegador e solicitar informações sobre registros de licença vinculados à sua instalação. Solicitações podem ser feitas pelo canal de contato informado nesta política.</p></section>
            <section><h2>9. Alterações nesta política</h2><p>Esta política pode ser atualizada para refletir mudanças na extensão, na API de licenciamento, nas permissões usadas ou em requisitos legais e de plataforma. A versão publicada nesta URL será considerada a versão vigente.</p></section>
            <section><h2>10. Contato</h2><p>Para dúvidas sobre esta política ou sobre o tratamento de dados relacionado à extensão, entre em contato com Edvam Santos pelo portfólio oficial:</p><a class="privacy-contact-link" href="/">portfolio-edvam-santos.vercel.app</a></section>
          </div>
          <footer class="privacy-document-footer"><span>Última atualização: 7 de agosto de 2026</span><span>Ed's Sistemas e Sites - CNPJ 60.604.470/0001-96</span></footer>
        </article>
      </main>
    </div>`;
}

function withMetadata({ body, title, description, canonical, schema }) {
  let html = template;
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const safeCanonical = escapeHtml(canonical);
  const schemaJson = JSON.stringify(schema).replace(/</g, '\\u003c');

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${safeDescription}" />`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${safeTitle}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${safeDescription}" />`
  );
  html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/gi, '');
  html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/gi, '');
  html = html.replace(
    '</head>',
    `<meta property="og:url" content="${safeCanonical}" />
    <meta property="og:locale" content="pt_BR" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDescription}" />
    <link rel="canonical" href="${safeCanonical}" />
    <script id="page-structured-data" type="application/ld+json">${schemaJson}</script>
  </head>`
  );
  html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function writeRoute(pathname, html) {
  const routeDir = path.join(buildDir, ...pathname.split('/').filter(Boolean));
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(path.join(routeDir, 'index.html'), html);
}

catalog.pages.forEach((page) => {
  const cluster = catalog.getCluster(page.clusterSlug);
  writeRoute(
    page.path,
    withMetadata({
      body: staticContentPage(page),
      title: `${page.title} | Edvam Santos`,
      description: page.description,
      canonical: absoluteUrl(page.path),
      schema: schemaForPage(page, cluster),
    })
  );
});

const mapSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Mapa do Site e SEO',
  description: `Índice de ${catalog.pages.length} conteúdos sobre desenvolvimento web, sistemas, automação e tecnologia.`,
  url: absoluteUrl('/mapa-do-site-e-seo/'),
  inLanguage: 'pt-BR',
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: catalog.pages.length,
    itemListElement: catalog.clusters.map((cluster, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: absoluteUrl(`/conteudos/${cluster.slug}/`),
      name: cluster.title,
    })),
  },
};

writeRoute(
  '/mapa-do-site-e-seo/',
  withMetadata({
    body: staticMapPage(),
    title: 'Mapa do Site e SEO | Edvam Santos',
    description: `Explore ${catalog.pages.length} páginas sobre sites, sistemas, automações, integrações, performance e arquitetura de software.`,
    canonical: absoluteUrl('/mapa-do-site-e-seo/'),
    schema: mapSchema,
  })
);

const privacyPolicyHtml = withMetadata({
  body: staticPrivacyPolicyPage(),
  title: privacyPolicyTitle,
  description: privacyPolicyDescription,
  canonical: absoluteUrl(privacyPolicyPath),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'PrivacyPolicy',
    name: privacyPolicyTitle,
    url: absoluteUrl(privacyPolicyPath),
    inLanguage: 'pt-BR',
    about: {
      '@type': 'SoftwareApplication',
      name: "Ed's Plugin | WhatsApp",
      applicationCategory: 'BrowserApplication',
    },
  },
}).replace('</head>', '<meta name="robots" content="noindex, follow" /></head>');

writeRoute(privacyPolicyPath, privacyPolicyHtml);

const notFoundBody = `
  <div class="seo-experience">
    ${staticHeader()}
    <main>
      <section class="map-hero">
        <div><span class="seo-eyebrow">ERRO 404</span><h1>Página não<br>encontrada</h1></div>
        <p>Este endereço não existe ou foi alterado. Use o mapa para encontrar serviços, guias, dúvidas e estudos relacionados.</p>
        <a class="map-error-link" href="/mapa-do-site-e-seo/">Explorar Mapa do Site e SEO</a>
      </section>
    </main>
    ${staticFooter()}
  </div>`;
const notFoundHtml = withMetadata({
  body: notFoundBody,
  title: 'Página não encontrada | Edvam Santos',
  description: 'O endereço solicitado não existe. Explore o mapa do site para encontrar serviços, guias e conteúdos de tecnologia.',
  canonical: absoluteUrl('/404/'),
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Página não encontrada',
    url: absoluteUrl('/404/'),
  },
}).replace('</head>', '<meta name="robots" content="noindex, follow" /></head>');
fs.writeFileSync(path.join(buildDir, '404.html'), notFoundHtml);

const sitemapEntries = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/mapa-do-site-e-seo/', priority: '0.8', changefreq: 'weekly' },
  ...catalog.pages.map((page) => ({
    path: page.path,
    priority: page.type === 'service' ? '0.8' : '0.65',
    changefreq: page.type === 'service' ? 'monthly' : 'quarterly',
  })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map((entry) => `  <url>
    <loc>${escapeHtml(absoluteUrl(entry.path))}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(
  path.join(buildDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
);
fs.writeFileSync(
  path.join(buildDir, 'llms.txt'),
  `# Edvam Santos\n\nDesenvolvedor Full Stack em São Paulo, Brasil.\n\n## Conteúdo principal\n\n- [Portfólio](${absoluteUrl('/')})\n- [Mapa do Site e SEO](${absoluteUrl('/mapa-do-site-e-seo/')})\n${catalog.clusters.map((cluster) => `- [${cluster.title}](${absoluteUrl(`/conteudos/${cluster.slug}/`)})`).join('\n')}\n`
);

console.log(
  `SEO: ${catalog.pages.length} páginas estáticas, ${sitemapEntries.length} URLs no sitemap e mapa completo gerados para ${siteUrl}.`
);
