'use client';

import type { PhoneColorOptionApi } from '@src/features/phones/types/phone-detail.api.types';

import styles from './PhoneDetailColors.module.scss';

type PhoneDetailColorsProps = {
  readonly options: PhoneColorOptionApi[];
  readonly selected: PhoneColorOptionApi | null;
  readonly onSelect: (color: PhoneColorOptionApi) => void;
};

const PhoneDetailColors = ({ options, selected, onSelect }: PhoneDetailColorsProps) => {
  const colorNameId = 'selected-color-name';

  return (
    <fieldset className={styles['phone-detail__colors']} aria-describedby={colorNameId}>
      <legend>COLOR. PICK YOUR FAVOURITE.</legend>

      <div className={styles['phone-detail__colors--options']} role="radiogroup">
        {options.map((option) => {
          const id = `color-${option.name.replaceAll(/\s+/g, '-').toLowerCase()}`;

          return (
            <label key={option.name} htmlFor={id} aria-label={option.name}>
              <input
                id={id}
                type="radio"
                name="color"
                value={option.name}
                checked={selected?.name === option.name}
                onChange={() => onSelect(option)}
              />
              <span
                className={styles['phone-detail__colors--swatch']}
                style={{ backgroundColor: option.hexCode }}
              />
            </label>
          );
        })}
      </div>

      <p id={colorNameId} className={styles['phone-detail__colors--name']}>
        {selected ? selected.name : '\u00A0'}
      </p>
    </fieldset>
  );
};

export default PhoneDetailColors;
