'use client';

import Link from 'next/link';
import BrandIcon from '@src/shared/components/icons/BrandIcon';
import CartEmptyIcon from '@src/shared/components/icons/CartEmptyIcon';
import CartIcon from '@src/shared/components/icons/CartIcon';

import styles from './TopNav.module.scss';
import { useCart } from '@src/features/cart/hooks/useCart';
import { useSyncExternalStore } from 'react';

const TopNav = () => {
  const { items } = useCart();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const itemsCounter = isClient ? items.length : 0;

  return (
    <header className={styles['top-nav']}>
      <nav className={styles['top-nav__nav']} aria-label="Primary">
        <Link href="/" className={styles['top-nav__brand']} aria-label="Go to homepage">
          <BrandIcon className={styles['top-nav__logo']} />
        </Link>

        <div className={styles['top-nav__actions']}>
          <Link
            href="/cart"
            className={styles['top-nav__action']}
            aria-label={`Shopping cart with ${itemsCounter} items`}
          >
            {itemsCounter > 0 ? <CartIcon /> : <CartEmptyIcon />}
            <span className={styles['top-nav__badge']} aria-hidden="true">
              {itemsCounter}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default TopNav;
