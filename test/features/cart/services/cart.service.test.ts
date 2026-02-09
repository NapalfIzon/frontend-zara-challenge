import { describe, it, expect, vi, afterEach, afterAll } from 'vitest';
import { cartService } from '@src/features/cart/services/cart.service';
import { mockedCartItem } from '@test/mocks/mockedCart';

const STORAGE_KEY = 'cartItems';

describe('cartService', () => {
  afterEach(() => {
    localStorage.clear();
    vi.spyOn(globalThis, 'dispatchEvent');
  });

  afterAll(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('getItems', () => {
    it('should return an empty array when localStorage is empty', () => {
      const items = cartService.getItems();
      expect(items).toEqual([]);
    });

    it('should return parsed items from localStorage', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mockedCartItem]));

      const items = cartService.getItems();

      expect(items).toHaveLength(1);
      expect(items[0].id).toBe(mockedCartItem.id);
    });

    it('should return an empty array if localStorage contains invalid JSON', () => {
      localStorage.setItem(STORAGE_KEY, '{invalid json');

      const items = cartService.getItems();

      expect(items).toEqual([]);
    });
  });

  describe('addItem', () => {
    it('should add a new item with quantity 1 if it does not exist', () => {
      cartService.addItem(mockedCartItem);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

      expect(stored).toHaveLength(1);
      expect(stored[0].quantity).toBe(1);
      expect(globalThis.dispatchEvent).toHaveBeenCalled();
    });

    it('should increment quantity if item with same id, storage and color exists', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mockedCartItem]));

      cartService.addItem(mockedCartItem);

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

      expect(stored).toHaveLength(1);
      expect(stored[0].quantity).toBe(2);
      expect(globalThis.dispatchEvent).toHaveBeenCalled();
    });

    it('should treat items with different storage as different items', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mockedCartItem]));

      cartService.addItem({
        ...mockedCartItem,
        storage: '512 GB',
      });

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

      expect(stored).toHaveLength(2);
    });

    it('treats items with different color as different items', () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([mockedCartItem]));

      cartService.addItem({
        ...mockedCartItem,
        color: { name: 'Silver', hexCode: '#ccc' },
      });

      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);

      expect(stored).toHaveLength(2);
    });
  });
});
