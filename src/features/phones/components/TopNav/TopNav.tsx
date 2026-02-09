'use client';

import Link from 'next/link';
import { useCartCount } from '@src/features/cart/hooks/useCartCount';
import BrandIcon from '@src/shared/components/icons/BrandIcon';
import CartEmptyIcon from '@src/shared/components/icons/CartEmptyIcon';
import CartIcon from '@src/shared/components/icons/CartIcon';

import styles from './TopNav.module.scss';

const TopNav = () => {
  const itemsCounter = useCartCount();

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
