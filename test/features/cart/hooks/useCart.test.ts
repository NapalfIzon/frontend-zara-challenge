import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCart } from '@src/features/cart/hooks/useCart';
import { cartService } from '@src/features/cart/services/cart.service';
import { CartItem } from '@src/features/cart/types/cart.types';
import { mockedCartItem } from '@test/mocks/mockedCart';

vi.mock('@src/features/cart/services/cart.service', () => ({
  cartService: {
    getItems: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe('useCart', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize items from cartService', () => {
    vi.mocked(cartService.getItems).mockReturnValue([mockedCartItem]);

    const { result } = renderHook(() => useCart());

    expect(cartService.getItems).toHaveBeenCalledTimes(1);
    expect(result.current.items).toEqual([mockedCartItem]);
  });

  it('should calculate total correctly', () => {
    const items: CartItem[] = [
      mockedCartItem,
      { ...mockedCartItem, id: 'SMG-S24', price: 999, quantity: 2 },
    ];

    vi.mocked(cartService.getItems).mockReturnValue(items);

    const { result } = renderHook(() => useCart());

    expect(result.current.total).toBe(3327);
  });

  it('should remove an item and update the cart state', () => {
    const updatedItems: CartItem[] = [];

    vi.mocked(cartService.getItems)
      .mockReturnValueOnce([mockedCartItem])
      .mockReturnValueOnce(updatedItems);

    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.removeItem(mockedCartItem);
    });

    expect(cartService.removeItem).toHaveBeenCalledWith(mockedCartItem);
    expect(result.current.items).toEqual(updatedItems);
  });

  it('should update items when storage event is fired', () => {
    const updatedItems: CartItem[] = [{ ...mockedCartItem, id: 'IPH-15PM', brand: 'Apple' }];

    vi.mocked(cartService.getItems)
      .mockReturnValueOnce([mockedCartItem])
      .mockReturnValueOnce(updatedItems);

    const { result } = renderHook(() => useCart());

    act(() => {
      globalThis.dispatchEvent(new Event('storage'));
    });

    expect(result.current.items).toEqual(updatedItems);
  });
});
