'use client';

import type { PhoneStorageOptionApi } from '@src/features/phones/types/phone-detail.api.types';

import styles from './PhoneDetailStorage.module.scss';

type PhoneDetailStorageProps = {
  readonly options: PhoneStorageOptionApi[];
  readonly selected: string | null;
  readonly onSelect: (capacity: string) => void;
};

const PhoneDetailStorage = ({ options, selected, onSelect }: PhoneDetailStorageProps) => {
  return (
    <fieldset className={styles['phone-detail__storage']}>
      <legend>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</legend>

      <div className={styles['phone-detail__storage--options']} role="radiogroup">
        {options.map((opt) => {
          const id = `storage-${opt.capacity.replaceAll(/\s+/g, '-').toLowerCase()}`;

          return (
            <label key={opt.capacity} htmlFor={id}>
              <input
                id={id}
                type="radio"
                name="storage"
                value={opt.capacity}
                checked={selected === opt.capacity}
                onChange={() => onSelect(opt.capacity)}
              />
              <span>{opt.capacity}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
};

export default PhoneDetailStorage;
