import { vi } from 'vitest';
import type { MockedFunction } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '@/components/App';
import { useCounter, useTheme } from './logic';

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
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/Vite \+ React/)).toBeInTheDocument();
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
      screen.getByText((content) =>
        content.includes('Click on the Vite and React logos to learn more')
      )
    ).toBeInTheDocument();
  });
});

describe('useCounter', () => {
  it('initializes with default value 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  it('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('increments count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.setCount(1);
    });

    expect(result.current.count).toBe(1);
  });
});

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    (
      window.matchMedia as MockedFunction<typeof window.matchMedia>
    ).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
  });

  it('initializes with standard-light when no saved theme and light preference', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('standard-light');
  });

  it('initializes with standard-dark when dark preference', () => {
    (
      window.matchMedia as MockedFunction<typeof window.matchMedia>
    ).mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('standard-dark');
  });

  it('loads saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('nature-dark');

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('nature-dark');
  });

  it('saves theme to localStorage on change', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.handleThemeChange({
        target: { value: 'sunset-medium' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'app-theme',
      'sunset-medium'
    );
  });
});

describe('useTheme', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    (
      window.matchMedia as MockedFunction<typeof window.matchMedia>
    ).mockReturnValue({
      matches: false,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
  });

  it('initializes with standard-light when no saved theme and light preference', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('standard-light');
  });

  it('initializes with standard-dark when dark preference', () => {
    (
      window.matchMedia as MockedFunction<typeof window.matchMedia>
    ).mockReturnValue({
      matches: true,
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('standard-dark');
  });

  it('loads saved theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('nature-dark');

    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe('nature-dark');
  });

  it('saves theme to localStorage on change', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
      result.current.handleThemeChange({
        target: { value: 'sunset-medium' },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'app-theme',
      'sunset-medium'
    );
  });

  it('sets data-theme attribute on documentElement', () => {
    renderHook(() => useTheme());

    expect(document.documentElement.getAttribute('data-theme')).toBe(
      'standard-light'
    );
  });
});
