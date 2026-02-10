import { CartItem } from '@src/features/cart/types/cart.types';

const CART_KEY = 'cartItems';

export const cartService = {
  getItems(): CartItem[] {
    return getCartItems();
  },

  addItem(cartItem: CartItem) {
    const items = getCartItems();

    const itemIndex = items.findIndex(
      (item) =>
        item.id === cartItem.id &&
        item.storage === cartItem.storage &&
        item.color.name === cartItem.color.name,
    );

    if (itemIndex === -1) {
      items.push({ ...cartItem, quantity: 1 });
    } else {
      items[itemIndex].quantity++;
    }

    saveCartItems(items);
    globalThis.dispatchEvent(new Event('storage'));
  },

  removeItem(target: Pick<CartItem, 'id' | 'storage' | 'color'>) {
    const items = getCartItems();

    const filtered = items.filter(
      (item) =>
        !(
          item.id === target.id &&
          item.storage === target.storage &&
          item.color.name === target.color.name
        ),
    );

    saveCartItems(filtered);
    globalThis.dispatchEvent(new Event('storage'));
  },
};

const getCartItems = (): CartItem[] => {
  if (typeof globalThis === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};
