'use client';

import Link from 'next/link';
import { useCart } from '@src/features/cart/hooks/useCart';

import styles from './CartSummary.module.scss';

const CartSummary = () => {
  const { total } = useCart();

  return (
    <div className={styles['cart-summary']}>
      <div className={styles['cart-summary__total']}>
        <span>TOTAL</span>
        <span>{total} EUR</span>
      </div>
      <div className={styles['cart-summary__continue']}>
        <Link href="/" className={styles['cart-summary__continue--link']}>
          CONTINUE SHOPPING
        </Link>
      </div>
      <div className={styles['cart-summary__pay']}>
        <button className={styles['cart-summary__pay--button']}>PAY</button>
      </div>
    </div>
  );
};

export default CartSummary;
