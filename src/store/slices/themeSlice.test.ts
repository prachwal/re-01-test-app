import { vi } from 'vitest';
import themeSlice, { setTheme, getInitialTheme } from './themeSlice';

describe('themeSlice', () => {
  const reducer = themeSlice;
  let mockGetItem: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock localStorage
    mockGetItem = vi.fn();
    const localStorageMock = {
      getItem: mockGetItem,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });

    // Mock matchMedia
    Object.defineProperty(window, 'matchMedia', {
      value: vi.fn().mockImplementation((query?: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
      writable: true,
    });

    // Mock document
    Object.defineProperty(document, 'documentElement', {
      value: {
        setAttribute: vi.fn(),
        getAttribute: vi.fn(),
      },
      writable: true,
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' } as { type: string })).toEqual({
      currentTheme: 'standard-light',
    });
  });

  it('should handle setTheme', () => {
    const state = { currentTheme: 'standard-light' as const };
    const action = setTheme('standard-dark');
    const result = reducer(state, action);
    expect(result).toEqual({ currentTheme: 'standard-dark' });
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
      'data-theme',
      'standard-dark'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'app-theme',
      'standard-dark'
    );
  });

  describe('getInitialTheme', () => {
    it('should return saved theme from localStorage', () => {
      mockGetItem.mockReturnValue('standard-dark');
      expect(getInitialTheme()).toBe('standard-dark');
    });

    it('should return system preference when no saved theme', () => {
      mockGetItem.mockReturnValue(null);
      // matchMedia mocked to return false (light)
      expect(getInitialTheme()).toBe('standard-light');
    });

    it('should return dark theme when system prefers dark', () => {
      mockGetItem.mockReturnValue(null);
      // Override matchMedia to return true
      Object.defineProperty(window, 'matchMedia', {
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
        writable: true,
      });
      expect(getInitialTheme()).toBe('standard-dark');
    });
  });
});
