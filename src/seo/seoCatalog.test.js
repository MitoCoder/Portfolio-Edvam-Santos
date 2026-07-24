import seoCatalog from './seoCatalog';

describe('catálogo SEO', () => {
  test('gera 504 páginas únicas em 12 clusters equilibrados', () => {
    expect(seoCatalog.pages).toHaveLength(504);
    expect(new Set(seoCatalog.pages.map((page) => page.path)).size).toBe(504);
    expect(new Set(seoCatalog.pages.map((page) => page.title)).size).toBe(504);

    seoCatalog.clusters.forEach((cluster) => {
      expect(seoCatalog.pagesByCluster[cluster.slug]).toHaveLength(42);
    });
  });

  test('mantém metadados e conteúdo em limites úteis', () => {
    seoCatalog.pages.forEach((page) => {
      const body = [
        ...page.intro,
        ...page.sections.flatMap((section) => section.paragraphs),
        ...page.bullets,
        ...page.faq.flatMap((item) => [item.question, item.answer]),
      ].join(' ');

      expect(page.description.length).toBeLessThanOrEqual(160);
      expect(body.split(/\s+/).length).toBeGreaterThan(300);
      expect(page.faq).toHaveLength(3);
    });
  });

  test('não cria páginas órfãs nem links relacionados quebrados', () => {
    const paths = new Set(seoCatalog.pages.map((page) => page.path));

    seoCatalog.pages.forEach((page) => {
      expect(page.related.length).toBeGreaterThanOrEqual(4);
      page.related.forEach((related) => expect(paths.has(related.path)).toBe(true));
    });
  });
});
