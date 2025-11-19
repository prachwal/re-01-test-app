import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';
import App from './components/App';

const mockRender = vi.fn();
const mockCreateRoot = vi.fn(() => ({
  render: mockRender,
}));

vi.mock('react-dom/client', () => ({
  createRoot: mockCreateRoot,
}));

describe('main.tsx', () => {
  let rootElement: HTMLElement;

  beforeEach(() => {
    rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should create a root and render the App component in StrictMode', async () => {
    await import('./main.tsx');

    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  });
});

// Mock App component to avoid rendering the actual component
vi.mock('./App', () => ({
  default: () => <div>App</div>,
}));
