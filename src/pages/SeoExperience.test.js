import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

describe('Mapa do Site e SEO', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/mapa-do-site-e-seo/');
  });

  afterEach(() => {
    window.history.replaceState({}, '', '/');
  });

  test('pesquisa conteúdos e permite limpar um resultado vazio', () => {
    render(<App />);

    const search = screen.getByRole('searchbox', {
      name: /pesquisar no mapa do site/i,
    });

    fireEvent.change(search, { target: { value: 'termo que nao existe 987' } });
    expect(screen.getByText('Nenhum conteúdo encontrado')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /limpar pesquisa/i }));
    expect(search).toHaveValue('');
    expect(document.querySelector('.map-results-count strong')).toHaveTextContent('504');
  });

  test('expande e recolhe clusters pela navegação mobile', () => {
    render(<App />);

    const toggle = screen.getByRole('button', {
      name: /abrir criação de landing pages/i,
    });

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
  });
});
