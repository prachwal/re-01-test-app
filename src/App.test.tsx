import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText('Vite + React')).toBeInTheDocument();
  });

  it('renders button and increments count', () => {
    render(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('count is 0');

    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');
  });

  it('renders read the docs text', () => {
    render(<App />);
    expect(
      screen.getByText('Click on the Vite and React logos to learn more')
    ).toBeInTheDocument();
  });
});
