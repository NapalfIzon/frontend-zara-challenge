'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PhoneCardInfo } from '@src/features/phones/types/phone-card.types';

import styles from './PhoneCard.module.scss';

type PhoneCardProps = {
  phone: PhoneCardInfo;
};

const PhoneCard = ({ phone }: PhoneCardProps) => {
  return (
    <Link
      href={`/phones/${phone.id}`}
      className={styles['phone-card']}
      aria-label={`${phone.brand} ${phone.name}, price ${phone.basePrice} euros`}
      role="listitem"
    >
      <div className={styles['phone-card__image-wrap']}>
        <div className={styles['phone-card__image-frame']}>
          <Image
            className={styles['phone-card__image']}
            src={phone.imageUrl}
            alt={`${phone.brand} ${phone.name}`}
            width={300}
            height={300}
            sizes="(max-width: 767px) 80vw, (max-width: 1199px) 40vw, 20vw"
          />
        </div>
      </div>

      <div className={styles['phone-card__meta']}>
        <div className={styles['phone-card__info']}>
          <span className={styles['phone-card__brand']}>{phone.brand}</span>
          <span className={styles['phone-card__name']}>{phone.name}</span>
        </div>

        <span className={styles['phone-card__price']}>{phone.basePrice} EUR</span>
      </div>
    </Link>
  );
};

export default PhoneCard;
