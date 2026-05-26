import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Project Information heading', () => {
  render(<App />);
  const heading = screen.getByText(/Project Information/i);
  expect(heading).toBeInTheDocument();
});

test('renders loading state initially', () => {
  render(<App />);
  const loading = screen.getByText(/Loading.../i);
  expect(loading).toBeInTheDocument();
});
