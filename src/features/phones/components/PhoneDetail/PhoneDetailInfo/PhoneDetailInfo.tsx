import {
  PhoneColorOptionApi,
  PhoneDetailApi,
} from '@src/features/phones/types/phone-detail.api.types';
import PhoneDetailStorage from '@src/features/phones/components/PhoneDetail/PhoneDetailStorage/PhoneDetailStorage';
import PhoneDetailColors from '@src/features/phones/components/PhoneDetail/PhoneDetailColors/PhoneDetailColors';
import { cartService } from '@src/features/cart/services/cart.service';

import styles from './PhoneDetailInfo.module.scss';

type Props = {
  phone: PhoneDetailApi;
  finalPrice: number;
  selectedColor: PhoneColorOptionApi | null;
  selectedStorage: string | null;
  onSelectColor: (colorOption: PhoneColorOptionApi) => void;
  onSelectStorage: (storage: string) => void;
  canAddToCart: boolean;
};

const PhoneDetailInfo = ({
  phone,
  finalPrice,
  selectedColor,
  selectedStorage,
  onSelectColor,
  onSelectStorage,
  canAddToCart,
}: Props) => {
  const handleAddToCart = () => {
    if (!selectedColor || !selectedStorage) return;

    cartService.addItem({
      id: phone.id,
      name: phone.name,
      brand: phone.brand,
      imageUrl: selectedColor.imageUrl,
      storage: selectedStorage,
      color: {
        name: selectedColor.name,
        hexCode: selectedColor.hexCode,
      },
      price: finalPrice,
      quantity: 1,
    });
  };

  const handlePriceText = (price: number) => {
    if (!selectedStorage || !selectedColor) {
      return `From ${price} EUR`;
    }

    return `${price} EUR`;
  };

  return (
    <div className={styles['phone-detail__info']}>
      <h1 className={styles['phone-detail__title']}>{phone.name}</h1>
      <p className={styles['phone-detail__price']}>{handlePriceText(finalPrice)}</p>

      <div className={styles['phone-detail__options']}>
        <PhoneDetailStorage
          options={phone.storageOptions}
          selected={selectedStorage}
          onSelect={onSelectStorage}
        />

        <PhoneDetailColors
          options={phone.colorOptions}
          selected={selectedColor}
          onSelect={onSelectColor}
        />

        <button
          type="button"
          className={styles['phone-detail__cta']}
          disabled={!canAddToCart}
          aria-disabled={!canAddToCart}
          aria-live="polite"
          onClick={handleAddToCart}
        >
          AÑADIR
        </button>
      </div>
    </div>
  );
};

export default PhoneDetailInfo;
