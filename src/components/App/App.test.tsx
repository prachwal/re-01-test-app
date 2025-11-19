import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { store } from '@/store';
import counterSlice from '@/store/slices/counterSlice';
import themeSlice from '@/store/slices/themeSlice';
import App from '@/components/App';
import { useAppState } from './logic';
import { increment } from '@/store/slices/counterSlice';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App', () => {
  const renderWithProvider = (component: React.ReactElement) =>
    render(<Provider store={store}>{component}</Provider>);

  it('renders headline', () => {
    renderWithProvider(<App />);
    expect(screen.getByText(/Vite \+ React/)).toBeInTheDocument();
  });

  it('renders button and increments count', () => {
    renderWithProvider(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('count is 0');

    fireEvent.click(button);
    expect(button).toHaveTextContent('count is 1');
  });

  it('renders read the docs text', () => {
    renderWithProvider(<App />);
    expect(
      screen.getByText((content) =>
        content.includes('Click on the Vite and React logos to learn more')
      )
    ).toBeInTheDocument();
  });
});

describe('useAppState', () => {
  const createStore = () =>
    configureStore({
      reducer: {
        counter: counterSlice,
        theme: themeSlice,
      },
    });

  const renderHookWithProvider = (hook: () => unknown) =>
    renderHook(hook, {
      wrapper: ({ children }: { children: React.ReactNode }) => (
        <Provider store={createStore()}>{children}</Provider>
      ),
    });

  it('returns initial count', () => {
    const { result } = renderHookWithProvider(() => useAppState());
    expect((result.current as ReturnType<typeof useAppState>).count).toBe(0);
  });

  it('returns initial theme', () => {
    const { result } = renderHookWithProvider(() => useAppState());
    expect((result.current as ReturnType<typeof useAppState>).theme).toBe(
      'standard-light'
    );
  });

  it('dispatches increment', () => {
    const { result } = renderHookWithProvider(() => useAppState());
    act(() => {
      (result.current as ReturnType<typeof useAppState>).dispatch(increment());
    });
    expect((result.current as ReturnType<typeof useAppState>).count).toBe(1);
  });

  it('handles theme change', () => {
    const { result } = renderHookWithProvider(() => useAppState());
    act(() => {
      (result.current as ReturnType<typeof useAppState>).handleThemeChange({
        target: { value: 'standard-dark' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });
    expect((result.current as ReturnType<typeof useAppState>).theme).toBe(
      'standard-dark'
    );
  });
});
