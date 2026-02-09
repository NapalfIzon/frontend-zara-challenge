'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import TopNav from '@src/features/phones/components/TopNav/TopNav';
import PhoneDetailHero from './PhoneDetailHero/PhoneDetailHero';
import PhoneDetailSpecs from './PhoneDetailSpecs/PhoneDetailSpecs';
import PhoneDetailSimilar from './PhoneDetailSimilar/PhoneDetailSimilar';
import type {
  PhoneColorOptionApi,
  PhoneDetailApi,
} from '@src/features/phones/types/phone-detail.api.types';
import BackIcon from '@src/shared/components/icons/BackIcon';

import styles from './PhoneDetail.module.scss';

type Props = {
  phone: PhoneDetailApi;
};

const PhoneDetail = ({ phone }: Props) => {
  const [selectedColor, setSelectedColor] = useState<PhoneColorOptionApi | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);

  const displayedColor = selectedColor ?? phone.colorOptions[0];

  const selectedStorageOption = useMemo(
    () => phone.storageOptions.find((o) => o.capacity === selectedStorage),
    [phone.storageOptions, selectedStorage],
  );

  const finalPrice = phone.basePrice + (selectedStorageOption?.price ?? 0);
  const canAddToCart = Boolean(selectedColor && selectedStorage);

  return (
    <div className={styles['phone-detail']}>
      <TopNav />

      <Link href="/" className={styles['phone-detail__back']}>
        <BackIcon />
        BACK
      </Link>

      <main className={styles['phone-detail__main']}>
        <PhoneDetailHero
          phone={phone}
          displayedColor={displayedColor}
          finalPrice={finalPrice}
          selectedColor={selectedColor}
          selectedStorage={selectedStorage}
          onSelectColor={setSelectedColor}
          onSelectStorage={setSelectedStorage}
          canAddToCart={canAddToCart}
        />

        <PhoneDetailSpecs specs={phone.specs} />
      </main>

      {phone.similarProducts.length > 0 && <PhoneDetailSimilar phones={phone.similarProducts} />}
    </div>
  );
};

export default PhoneDetail;
