'use client';

import { useCart } from '@src/features/cart/hooks/useCart';
import CartItem from '@src/features/cart/components/CartItem/CartItem';
import CartSummary from '@src/features/cart/components/CartSummary/CartSummary';

import styles from './CartList.module.scss';

const CartList = () => {
  const { items } = useCart();

  return (
    <div className={styles['cart-page']}>
      <main className={styles['cart-list']}>
        <h1 className={styles['cart-list__title']}>CART ({items.length})</h1>

        <div className={styles['cart-list__content']}>
          <ul className={styles['cart-list__list']}>
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.storage}-${item.color.name}`} item={item} />
            ))}
          </ul>
        </div>
      </main>
      <footer className={styles['cart-list__footer']}>
        <CartSummary />
      </footer>
    </div>
  );
};

export default CartList;
