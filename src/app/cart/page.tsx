'use client';

import TopNav from '@src/features/phones/components/TopNav/TopNav';
import { useCart } from '@src/features/cart/hooks/useCart';
import CartList from '@src/features/cart/components/CartList/CartList';
import CartEmpty from '@src/features/cart/components/CartEmpty/CartEmpty';

const CartPage = () => {
  const { items } = useCart();

  return (
    <>
      <TopNav />
      {items.length === 0 ? <CartEmpty /> : <CartList />}
    </>
  );
};

export default CartPage;
