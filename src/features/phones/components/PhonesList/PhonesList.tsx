'use client';

import { usePhones } from '@src/features/phones/context/PhonesContext';

import TopNav from '@src/features/phones/components/TopNav/TopNav';
import SearchBar from '@src/features/phones/components/SearchBar/SearchBar';
import PhoneCard from '@src/features/phones/components/PhoneCard/PhoneCard';

import styles from '@src/features/phones/components/PhonesList/PhonesList.module.scss';

const RESULTS_PER_PAGE = 20;

const PhonesList = () => {
  const { phones, loading, error, searchTerm, setSearchTerm } = usePhones();

  const paginatedPhones = phones.slice(0, RESULTS_PER_PAGE);

  return (
    <div className={styles['phones-list']}>
      <TopNav />

      <main className={styles['phones-list__main']}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className={styles['phones-list__results']} aria-live="polite" aria-atomic="true">
          <span className={styles['phones-list__results-count']}>
            {paginatedPhones.length} RESULTS
          </span>
        </div>

        {loading && (
          <p className={styles['phones-list__state']} role="status" aria-live="polite">
            Loading…
          </p>
        )}

        {error && (
          <p
            className={`${styles['phones-list__state']} ${styles['phones-list__state--error']}`}
            role="alert"
          >
            {error}
          </p>
        )}

        {!loading && !error && (
          <section
            className={styles['phones-list__grid']}
            aria-label="Smartphones list"
            role="list"
          >
            {paginatedPhones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default PhonesList;
