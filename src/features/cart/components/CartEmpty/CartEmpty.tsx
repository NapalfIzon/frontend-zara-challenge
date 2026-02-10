'use client';

import Link from 'next/link';
import styles from './CartEmpty.module.scss';

const CartEmpty = () => {
  return (
    <main className={styles['cart-empty']}>
      <h1 className={styles['cart-empty__title']}>CART (0)</h1>

      <div className={styles['cart-empty__button']}>
        <Link href="/" className={styles['cart-empty__button--link']}>
          CONTINUE SHOPPING
        </Link>
      </div>
    </main>
  );
};

export default CartEmpty;
