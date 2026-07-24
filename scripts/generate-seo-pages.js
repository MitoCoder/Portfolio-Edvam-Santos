/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const catalog = require('../src/seo/seoCatalog');

const buildDir = path.resolve(__dirname, '..', 'build');
const templatePath = path.join(buildDir, 'index.html');
const today = new Date().toISOString().slice(0, 10);
const siteUrl = (process.env.SEO_SITE_URL || catalog.SITE_URL).replace(/\/$/, '');
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
