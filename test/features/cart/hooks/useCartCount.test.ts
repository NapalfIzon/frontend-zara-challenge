import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { readCartItems, useCartCount } from '@src/features/cart/hooks/useCartCount';

const CART_STORAGE_KEY = 'cartItems';

describe('useCartCount', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should return 0 when localStorage is empty', () => {
    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);
  });

  it('should return the number of items stored in localStorage', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ id: '1' }, { id: '2' }]));

    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(2);
  });

  it('should return 0 when localStorage contains invalid JSON', () => {
    localStorage.setItem(CART_STORAGE_KEY, 'invalid-json');

    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);
  });

  it('should update count when storage event is dispatched', () => {
    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);

    act(() => {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify([{ id: '1' }, { id: '2' }, { id: '3' }]),
      );

      globalThis.dispatchEvent(new Event('storage'));
    });

    expect(result.current).toBe(3);
  });

  it('should clean up storage event listener on unmount', () => {
    const addSpy = vi.spyOn(globalThis, 'addEventListener');
    const removeSpy = vi.spyOn(globalThis, 'removeEventListener');

    const { unmount } = renderHook(() => useCartCount());

    expect(addSpy).toHaveBeenCalledWith('storage', expect.any(Function));

    unmount();

    expect(removeSpy).toHaveBeenCalledWith('storage', expect.any(Function));
  });

  it('should return 0 when window is undefined', () => {
    const originalWindow = globalThis.window;

    // @ts-expect-error — simulating SSR
    delete globalThis.window;

    expect(readCartItems()).toBe(0);

    globalThis.window = originalWindow;
  });
});
