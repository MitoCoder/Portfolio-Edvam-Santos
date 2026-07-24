import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders portfolio hero message', () => {
  render(<App />);
  expect(screen.getByText(/eu projeto e construo/i)).toBeInTheDocument();
  expect(screen.getByText('2008')).toBeInTheDocument();
  expect(screen.getByText('Sistema Control Tower')).toBeInTheDocument();
  expect(screen.getByText('Sistema Less Gráfica')).toBeInTheDocument();
  expect(screen.getByText('Sistema de PCP')).toBeInTheDocument();
});

test('opens and closes service details', async () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole('button', {
      name: /ver detalhes sobre experiências digitais/i,
    })
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(
    screen.getByText(/uma presença digital que transmite confiança/i)
  ).toBeInTheDocument();

  fireEvent.keyDown(window, { key: 'Escape' });
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
