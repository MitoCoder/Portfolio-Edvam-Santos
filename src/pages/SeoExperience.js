import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  CloseOutlined,
  DownOutlined,
  FileSearchOutlined,
  HomeOutlined,
  MenuOutlined,
  SearchOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons';
import seoCatalog from '../seo/seoCatalog';
import './SeoExperience.css';

const {
  AUTHOR,
  SITE_URL,
  clusters,
  pages,
  pagesByCluster,
  getCluster,
  toUrl,
} = seoCatalog;

const whatsappLink =
  'https://wa.me/5511957207168?text=Ol%C3%A1%2C%20Edvam.%20Encontrei%20seu%20conte%C3%BAdo%20e%20quero%20conversar%20sobre%20um%20projeto.';

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
}

function useSeoMetadata({ title, description, canonical, schema }) {
  useEffect(() => {
    document.title = title;
    ensureMeta('meta[name="description"]', { name: 'description', content: description });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    ensureMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    ensureMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    });
    ensureMeta('meta[name="robots"]', {
      name: 'robots',
      content: 'index, follow, max-image-preview:large',
    });

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;

    let schemaScript = document.getElementById('page-structured-data');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'page-structured-data';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schema);
  }, [canonical, description, schema, title]);
}

function SeoHeader({ searchValue = '', onSearchChange, showSearch = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={showSearch ? 'seo-header has-search' : 'seo-header'}>
      <a className="seo-brand" href="/" aria-label="Edvam Santos, página inicial">
        <strong>E/S</strong>
        <span>Edvam Santos</span>
      </a>
      {showSearch && (
        <label className="seo-header-search">
          <SearchOutlined />
          <span className="sr-only">Pesquisar no mapa do site</span>
          <input
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Pesquisar serviço, dúvida ou tecnologia"
            autoComplete="off"
          />
        </label>
      )}
      <nav className={menuOpen ? 'seo-nav open' : 'seo-nav'} aria-label="Navegação SEO">
        <a href="/">
          <HomeOutlined />
          Portfólio
        </a>
        <a href="/mapa-do-site-e-seo/" aria-current={showSearch ? 'page' : undefined}>
          <FileSearchOutlined />
          Mapa do Site e SEO
        </a>
        <a className="seo-nav-cta" href={whatsappLink} target="_blank" rel="noreferrer">
          <WhatsAppOutlined />
          Conversar
        </a>
      </nav>
      <button
        className="seo-menu-button"
        type="button"
        aria-label={menuOpen ? 'Fechar navegação' : 'Abrir navegação'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </button>
    </header>
  );
}

function SeoFooter() {
  return (
    <footer className="seo-footer">
      <div>
        <strong>E/S</strong>
        <p>Estratégia, produto e engenharia para soluções digitais que precisam funcionar no mundo real.</p>
      </div>
      <nav aria-label="Links do rodapé">
        <a href="/">Portfólio</a>
        <a href="/mapa-do-site-e-seo/">Mapa do Site e SEO</a>
        <a href={AUTHOR.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </nav>
      <span>© {new Date().getFullYear()} Edvam Santos</span>
    </footer>
  );
}

function Breadcrumbs({ page, cluster }) {
  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Início</a></li>
        <li><a href="/mapa-do-site-e-seo/">Conteúdos</a></li>
        {page.path !== `/conteudos/${cluster.slug}/` && (
          <li><a href={`/conteudos/${cluster.slug}/`}>{cluster.title}</a></li>
        )}
        <li aria-current="page">{page.h1}</li>
      </ol>
    </nav>
  );
}

function buildPageSchema(page, cluster) {
  const breadcrumbs = [
    { name: 'Início', item: toUrl('/') },
    { name: 'Mapa do Site e SEO', item: toUrl('/mapa-do-site-e-seo/') },
    { name: cluster.title, item: toUrl(`/conteudos/${cluster.slug}/`) },
    { name: page.h1, item: page.canonical },
  ].filter((item, index, items) => index === 0 || item.item !== items[index - 1].item);

  const mainEntity =
    page.type === 'service'
      ? {
          '@type': 'Service',
          name: page.h1,
          description: page.description,
          serviceType: cluster.title,
          provider: {
            '@type': 'ProfessionalService',
            name: AUTHOR.name,
            url: SITE_URL,
            areaServed: { '@type': 'Country', name: 'Brasil' },
          },
        }
      : {
          '@type': 'Article',
          headline: page.h1,
          description: page.description,
          mainEntityOfPage: page.canonical,
          inLanguage: 'pt-BR',
          author: {
            '@type': 'Person',
            name: AUTHOR.name,
            url: SITE_URL,
            sameAs: [AUTHOR.linkedin, AUTHOR.github],
          },
        };

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': page.canonical,
        url: page.canonical,
        name: page.title,
        description: page.description,
        inLanguage: 'pt-BR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@type': 'Thing', name: page.keyword },
      },
      mainEntity,
      {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.item,
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

function SeoContentPage({ page }) {
  const cluster = getCluster(page.clusterSlug);
  const schema = useMemo(() => buildPageSchema(page, cluster), [cluster, page]);

  useSeoMetadata({
    title: `${page.title} | Edvam Santos`,
    description: page.description,
    canonical: page.canonical,
    schema,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [page.path]);

  return (
    <div className="seo-experience">
      <SeoHeader />
      <main>
        <Breadcrumbs page={page} cluster={cluster} />

        <article className="seo-article">
          <header className="seo-hero">
            <div className="seo-hero-copy">
              <span className="seo-eyebrow">{page.typeLabel} · Edvam Santos</span>
              <h1>{page.h1}</h1>
              <p>{page.description}</p>
            </div>
            <aside className="seo-hero-index" aria-label="Resumo do conteúdo">
              <span>CLUSTER</span>
              <strong>{cluster.title}</strong>
              <span>INTENÇÃO PRINCIPAL</span>
              <strong>{page.keyword}</strong>
              <span>ATUALIZAÇÃO</span>
              <strong>{new Date().getFullYear()}</strong>
            </aside>
          </header>

          <div className="seo-reading-layout">
            <div className="seo-reading">
              <section className="seo-intro" aria-label="Introdução">
                {page.intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>

              <section className="seo-checklist" aria-labelledby="seo-checklist-title">
                <span>VISÃO PRÁTICA</span>
                <h2 id="seo-checklist-title">O que uma boa entrega precisa cobrir</h2>
                <ul>
                  {page.bullets.map((item) => (
                    <li key={item}><CheckOutlined /> <span>{item}</span></li>
                  ))}
                </ul>
              </section>

              {page.sections.map((section, index) => (
                <section className="seo-copy-section" key={section.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </section>
              ))}

              <section className="seo-faq" aria-labelledby="seo-faq-title">
                <span>DÚVIDAS RELACIONADAS</span>
                <h2 id="seo-faq-title">Perguntas frequentes</h2>
                {page.faq.map((item) => (
                  <details key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details>
                ))}
              </section>
            </div>

            <aside className="seo-sidebar">
              <div className="seo-side-block">
                <span>NESTE CLUSTER</span>
                <a href={`/conteudos/${cluster.slug}/`}>{cluster.title}</a>
                <a href="/mapa-do-site-e-seo/">Ver estrutura completa</a>
              </div>
              <div className="seo-side-block">
                <span>TEMAS ASSOCIADOS</span>
                <div className="seo-keywords">
                  {page.secondaryKeywords.slice(0, 6).map((keyword) => (
                    <span key={keyword}>{keyword}</span>
                  ))}
                </div>
              </div>
              <a className="seo-side-cta" href={whatsappLink} target="_blank" rel="noreferrer">
                <small>PRECISA APLICAR ISSO?</small>
                <strong>Converse sobre seu projeto</strong>
                <ArrowRightOutlined />
              </a>
            </aside>
          </div>

          <section className="seo-related" aria-labelledby="related-title">
            <span>CONTINUE EXPLORANDO</span>
            <h2 id="related-title">Conteúdos relacionados</h2>
            <div>
              {page.related.map((item) => (
                <a href={item.path} key={item.path}>
                  <small>{item.typeLabel}</small>
                  <strong>{item.title}</strong>
                  <ArrowRightOutlined />
                </a>
              ))}
            </div>
          </section>

          <section className="seo-contact-band">
            <div>
              <span>DO CONTEÚDO PARA A PRÁTICA</span>
              <h2>Seu projeto precisa de uma direção clara?</h2>
            </div>
            <a href={whatsappLink} target="_blank" rel="noreferrer">
              <WhatsAppOutlined />
              Iniciar conversa
            </a>
          </section>
        </article>
      </main>
      <SeoFooter />
    </div>
  );
}

function buildMapSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mapa do Site e SEO',
    description: `Índice de ${pages.length} conteúdos sobre desenvolvimento web, sistemas, automação e tecnologia.`,
    url: toUrl('/mapa-do-site-e-seo/'),
    inLanguage: 'pt-BR',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: pages.length,
      itemListElement: clusters.map((cluster, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: toUrl(`/conteudos/${cluster.slug}/`),
        name: cluster.title,
      })),
    },
  };
}

function SeoMapPage() {
  const [query, setQuery] = useState('');
  const [activeCluster, setActiveCluster] = useState('todos');
  const [expandedClusters, setExpandedClusters] = useState(
    () => new Set([clusters[0].slug])
  );
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const schema = useMemo(() => buildMapSchema(), []);

  useSeoMetadata({
    title: 'Mapa do Site e SEO | Edvam Santos',
    description: `Explore ${pages.length} páginas organizadas em clusters sobre sites, sistemas, automações, integrações, performance e arquitetura de software.`,
    canonical: toUrl('/mapa-do-site-e-seo/'),
    schema,
  });

  const visibleClusters = clusters.filter(
    (cluster) => activeCluster === 'todos' || cluster.slug === activeCluster
  );
  const filteredClusters = visibleClusters
    .map((cluster) => ({
      cluster,
      pages: pagesByCluster[cluster.slug].filter((page) => {
        if (!normalizedQuery) return true;
        return `${page.h1} ${page.keyword} ${page.description}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedQuery);
      }),
    }))
    .filter((item) => item.pages.length);
  const resultCount = filteredClusters.reduce(
    (total, item) => total + item.pages.length,
    0
  );

  const selectCluster = (slug) => {
    setActiveCluster(slug);
    if (slug !== 'todos') {
      setExpandedClusters((current) => new Set([...current, slug]));
    }
  };

  const toggleCluster = (slug) => {
    setExpandedClusters((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className="seo-experience seo-map-page">
      <SeoHeader
        showSearch
        searchValue={query}
        onSearchChange={setQuery}
      />
      <main>
        <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="/">Início</a></li>
            <li aria-current="page">Mapa do Site e SEO</li>
          </ol>
        </nav>

        <section className="map-hero">
          <div>
            <span className="seo-eyebrow">ARQUITETURA DE CONTEÚDO</span>
            <h1>Mapa do Site<br />e SEO</h1>
          </div>
          <p>
            Uma biblioteca organizada por intenção de busca. Cada conteúdo se conecta
            a um tema principal, responde uma necessidade específica e indica o
            próximo caminho útil.
          </p>
          <strong>{pages.length}<small>páginas interligadas</small></strong>
        </section>

        <section className="map-principles" aria-label="Princípios da arquitetura SEO">
          <article><span>01</span><h2>Clusters semânticos</h2><p>Doze temas principais organizam serviços, guias, dúvidas, comparativos e estudos aplicados.</p></article>
          <article><span>02</span><h2>Intenção clara</h2><p>Cada URL atende uma pergunta ou decisão específica, sem competir desnecessariamente com páginas irmãs.</p></article>
          <article><span>03</span><h2>Malha interna</h2><p>Breadcrumbs, páginas pilar e recomendações contextuais distribuem relevância e facilitam o rastreamento.</p></article>
          <article><span>04</span><h2>Base técnica</h2><p>HTML estático, metadados, Schema.org, sitemap e semântica tornam o conteúdo acessível a usuários e buscadores.</p></article>
        </section>

        <section className="map-architecture" aria-labelledby="map-architecture-title">
          <div>
            <span className="seo-eyebrow">COMO A RELEVÂNCIA CIRCULA</span>
            <h2 id="map-architecture-title">Uma estrutura que conecta contexto, intenção e próximo passo.</h2>
          </div>
          <ol>
            <li><strong>Portfólio</strong><span>apresenta experiência, serviços e provas de execução</span></li>
            <li><strong>Mapa central</strong><span>distribui acesso para todos os clusters e intenções</span></li>
            <li><strong>12 páginas pilar</strong><span>concentram o contexto principal de cada solução</span></li>
            <li><strong>492 páginas de apoio</strong><span>aprofundam setores, dúvidas, guias, escolhas e aplicações</span></li>
            <li><strong>Links contextuais</strong><span>reconectam cada conteúdo à página pilar e a temas complementares</span></li>
          </ol>
          <div className="map-technical-list">
            <span>HTML estático indexável</span>
            <span>URLs descritivas</span>
            <span>Canonical individual</span>
            <span>Metadados sociais</span>
            <span>BreadcrumbList</span>
            <span>Service, Article e FAQPage</span>
            <span>Sitemap XML</span>
            <span>Robots.txt</span>
            <span>Conteúdo semântico</span>
            <span>Navegação acessível</span>
          </div>
        </section>

        <section className="map-browser" aria-labelledby="map-browser-title">
          <header>
            <div>
              <span>ÍNDICE COMPLETO</span>
              <h2 id="map-browser-title">Encontre um tema</h2>
            </div>
            <p className="map-results-count" aria-live="polite">
              <strong>{resultCount}</strong>
              {resultCount === 1 ? ' resultado' : ' resultados'}
            </p>
          </header>

          <div className="map-cluster-tabs" role="group" aria-label="Filtrar por categoria">
            <button
              type="button"
              className={activeCluster === 'todos' ? 'active' : ''}
              onClick={() => selectCluster('todos')}
            >
              Todos
            </button>
            {clusters.map((cluster) => (
              <button
                type="button"
                key={cluster.slug}
                className={activeCluster === cluster.slug ? 'active' : ''}
                onClick={() => selectCluster(cluster.slug)}
              >
                {cluster.title}
              </button>
            ))}
          </div>

          <div className="map-clusters">
            {filteredClusters.map(({ cluster, pages: clusterPages }, clusterIndex) => {
              const groupedPages = Object.entries(
                clusterPages.reduce((groups, page) => {
                  const key = page.typeLabel;
                  groups[key] = groups[key] || [];
                  groups[key].push(page);
                  return groups;
                }, {})
              );
              const isExpanded =
                normalizedQuery.length > 0 || expandedClusters.has(cluster.slug);

              return (
                <section
                  className={isExpanded ? 'map-cluster expanded' : 'map-cluster'}
                  key={cluster.slug}
                >
                  <header>
                    <span>{String(clusterIndex + 1).padStart(2, '0')}</span>
                    <div>
                      <h3>{cluster.title}</h3>
                      <p>{cluster.solution}. Foco em {cluster.result}.</p>
                      <div className="map-cluster-keywords" aria-label={`Temas de ${cluster.title}`}>
                        <span>{cluster.keyword}</span>
                        {cluster.technologies.map((technology) => <span key={technology}>{technology}</span>)}
                      </div>
                    </div>
                    <div className="map-cluster-actions">
                      <strong>{clusterPages.length}</strong>
                      <button
                        type="button"
                        className="map-cluster-toggle"
                        onClick={() => toggleCluster(cluster.slug)}
                        aria-label={`${isExpanded ? 'Recolher' : 'Abrir'} ${cluster.title}`}
                        aria-expanded={isExpanded}
                        disabled={normalizedQuery.length > 0}
                      >
                        <DownOutlined />
                      </button>
                    </div>
                  </header>
                  <div className="map-groups">
                    {groupedPages.map(([label, groupPages]) => (
                      <div className="map-group" key={label}>
                        <h4>{label}</h4>
                        {groupPages.map((page) => (
                          <a href={page.path} key={page.path}>
                            <span>{page.h1}</span>
                            <ArrowRightOutlined />
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
            {!filteredClusters.length && (
              <div className="map-empty-state">
                <SearchOutlined />
                <h3>Nenhum conteúdo encontrado</h3>
                <p>Tente uma palavra mais ampla ou selecione novamente todos os clusters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    selectCluster('todos');
                  }}
                >
                  Limpar pesquisa
                </button>
              </div>
            )}
          </div>
        </section>

        <a className="map-back-home" href="/">
          <ArrowLeftOutlined />
          Voltar ao portfólio
        </a>
      </main>
      <SeoFooter />
    </div>
  );
}

function SeoNotFound() {
  useEffect(() => {
    document.title = 'Página não encontrada | Edvam Santos';
    ensureMeta('meta[name="robots"]', { name: 'robots', content: 'noindex, follow' });
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <div className="seo-experience">
      <SeoHeader />
      <main>
        <section className="map-hero">
          <div>
            <span className="seo-eyebrow">ERRO 404</span>
            <h1>Página não<br />encontrada</h1>
          </div>
          <p>
            Este endereço não existe ou foi alterado. Use o mapa para encontrar
            serviços, guias, dúvidas e estudos relacionados.
          </p>
          <a className="seo-nav-cta map-error-link" href="/mapa-do-site-e-seo/">
            Explorar Mapa do Site e SEO
            <ArrowRightOutlined />
          </a>
        </section>
      </main>
      <SeoFooter />
    </div>
  );
}

export { SeoContentPage, SeoMapPage, SeoNotFound };
