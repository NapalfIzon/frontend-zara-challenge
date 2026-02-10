'use client';

import { useEffect, useState } from 'react';
import { CartItem } from '@src/features/cart/types/cart.types';
import { cartService } from '@src/features/cart/services/cart.service';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>(cartService.getItems());

  useEffect(() => {
    const updateCartItems = () => {
      setItems(cartService.getItems());
    };

    globalThis.addEventListener('storage', updateCartItems);
    return () => globalThis.removeEventListener('storage', updateCartItems);
  }, []);

  const removeItem = (item: CartItem) => {
    cartService.removeItem(item);
    setItems(cartService.getItems());
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return {
    items,
    total,
    removeItem,
  };
};
