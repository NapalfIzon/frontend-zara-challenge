'use client';

import { useEffect, useState } from 'react';

const CART_STORAGE_KEY = 'cartItems';

export const readCartItems = (): number => {
  if (globalThis.window === undefined) return 0;

  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return 0;

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
};

export const useCartCount = (): number => {
  const [itemsCounter, setItemsCounter] = useState<number>(() => readCartItems());

  useEffect(() => {
    const update = () => {
      setItemsCounter(readCartItems());
    };

    update();

    globalThis.addEventListener('storage', update);

    return () => {
      globalThis.removeEventListener('storage', update);
    };
  }, []);

  return itemsCounter;
};
