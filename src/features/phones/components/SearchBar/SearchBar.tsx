'use client';

import { useRef } from 'react';
import EraseLogo from '@src/components/icons/EraseLogo';

import styles from './SearchBar.module.scss';

type SearchBarProps = {
  readonly value: string;
  readonly onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles['search-bar']} role="search">
      <label htmlFor="phone-search" className={styles['search-bar__label']}>
        Search for a smartphone...
      </label>
      <input
        ref={inputRef}
        id="phone-search"
        className={styles['search-bar__input']}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search for a smartphone..."
        autoComplete="off"
      />

      {value.length > 0 && (
        <button
          type="button"
          className={styles['search-bar__clear']}
          onClick={handleClear}
          aria-label="Clear search"
        >
          <EraseLogo />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
