import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Beer Explorer heading', () => {
  render(<App />);
  const heading = screen.getByText(/Beer Explorer/i);
  expect(heading).toBeInTheDocument();
});

test('renders search input', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/search beers/i);
  expect(input).toBeInTheDocument();
});

test('renders header with brand info', () => {
  render(<App />);
  const header = document.querySelector('.app-header');
  expect(header).toBeInTheDocument();
  expect(header.textContent).toContain('HEINEKEN');
});
