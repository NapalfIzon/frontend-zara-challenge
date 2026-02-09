import Image from 'next/image';
import PhoneDetailInfo from '../PhoneDetailInfo/PhoneDetailInfo';
import type {
  PhoneColorOptionApi,
  PhoneDetailApi,
} from '@src/features/phones/types/phone-detail.api.types';

import styles from './PhoneDetailHero.module.scss';

type Props = {
  phone: PhoneDetailApi;
  displayedColor: PhoneColorOptionApi;
  finalPrice: number;
  selectedColor: PhoneColorOptionApi | null;
  selectedStorage: string | null;
  onSelectColor: (color: PhoneColorOptionApi) => void;
  onSelectStorage: (storage: string) => void;
  canAddToCart: boolean;
};

const PhoneDetailHero = ({
  phone,
  displayedColor,
  finalPrice,
  selectedColor,
  selectedStorage,
  onSelectColor,
  onSelectStorage,
  canAddToCart,
}: Props) => {
  return (
    <section className={styles['phone-detail__hero']}>
      <div className={styles['phone-detail__image-wrap']}>
        <div className={styles['phone-detail__image-frame']}>
          <div className={styles['phone-detail__image-inner']}>
            <Image
              src={displayedColor.imageUrl}
              alt={`${phone.name} - ${displayedColor.name}`}
              fill
              sizes="510px"
              priority
              className={styles['phone-detail__image']}
            />
          </div>
        </div>
      </div>

      <PhoneDetailInfo
        phone={phone}
        finalPrice={finalPrice}
        selectedColor={selectedColor}
        selectedStorage={selectedStorage}
        onSelectColor={onSelectColor}
        onSelectStorage={onSelectStorage}
        canAddToCart={canAddToCart}
      />
    </section>
  );
};

export default PhoneDetailHero;
