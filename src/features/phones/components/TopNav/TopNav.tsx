'use client';

import Link from 'next/link';
import { useCartCount } from '@src/features/cart/hooks/useCartCount';
import BrandLogo from '@src/components/icons/BrandLogo';
import CartEmptyLogo from '@src/components/icons/CartEmptyLogo';
import CartLogo from '@src/components/icons/CartLogo';

import styles from './TopNav.module.scss';

const TopNav = () => {
  const itemsCounter = useCartCount();

  return (
    <header className={styles['top-nav']}>
      <nav className={styles['top-nav__nav']} aria-label="Primary">
        <Link href="/" className={styles['top-nav__brand']} aria-label="Go to homepage">
          <BrandLogo className={styles['top-nav__logo']} />
        </Link>

        <div className={styles['top-nav__actions']}>
          <Link
            href="/cart"
            className={styles['top-nav__action']}
            aria-label={`Shopping cart with ${itemsCounter} items`}
          >
            {itemsCounter > 0 ? <CartLogo /> : <CartEmptyLogo />}
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
