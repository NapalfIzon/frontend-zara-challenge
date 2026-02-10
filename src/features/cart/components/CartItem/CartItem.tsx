'use client';

import Image from 'next/image';
import { CartItem as Item } from '@src/features/cart/types/cart.types';
import { useCart } from '@src/features/cart/hooks/useCart';

import styles from './CartItem.module.scss';

type Props = {
  item: Item;
};

const CartItem = ({ item }: Props) => {
  const { removeItem } = useCart();

  return (
    <li className={styles['cart-item']}>
      <div className={styles['cart-item__image']}>
        <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
      </div>

      <div className={styles['cart-item__info']}>
        <div className={styles['cart-item__specs']}>
          <span className={styles['cart-item__name']}>{item.name}</span>
          <span className={styles['cart-item__meta']}>
            {item.storage} | {item.color.name}
          </span>
          <span className={styles['cart-item__price']}>{item.price} EUR</span>
        </div>

        <button
          type="button"
          className={styles['cart-item__remove']}
          onClick={() => removeItem(item)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default CartItem;
