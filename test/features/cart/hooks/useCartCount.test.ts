import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import { useCartCount } from '@src/features/cart/hooks/useCartCount';

const CART_STORAGE_KEY = 'cartItems';

describe('useCartCount', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return 0 when localStorage is empty', () => {
    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);
  });

  it('should return the number of items in localStorage', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(['id1', 'id2', 'id3']));

    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(3);
  });

  it('should return 0 when localStorage contains invalid JSON', () => {
    localStorage.setItem(CART_STORAGE_KEY, 'random-value');

    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);
  });

  it('should update when storage event is fired', () => {
    const { result } = renderHook(() => useCartCount());

    expect(result.current).toBe(0);

    act(() => {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(['id1', 'id2']));

      globalThis
      .dispatchEvent(
        new StorageEvent('storage', {
          key: CART_STORAGE_KEY,
        }),
      );
    });

    expect(result.current).toBe(2);
  });
});
