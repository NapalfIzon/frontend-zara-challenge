'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PhoneListItemApi } from '@src/features/phones/types/phones.api.types';
import { phonesService } from '@src/features/phones/services/phones.service';

interface PhonesContextValue {
  phones: PhoneListItemApi[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const PhonesContext = createContext<PhonesContextValue | undefined>(undefined);

export const PhonesProvider = ({ children }: { children: React.ReactNode }) => {
  const [allPhones, setAllPhones] = useState<PhoneListItemApi[]>([]);
  const [phones, setPhones] = useState<PhoneListItemApi[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await phonesService.getPhones();

      setAllPhones(data);
      setPhones(data);
    } catch {
      setError('Failed to load phones');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const runSearch = async () => {
      if (searchTerm.length === 0) {
        setPhones(allPhones);
        return;
      }

      if (searchTerm.length < 3) {
        setPhones([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await phonesService.getPhones();

        const filtered = data.filter(
          (phone) =>
            phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            phone.brand.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        setPhones(filtered);
      } catch {
        setError('Search failed');
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [searchTerm, allPhones]);

  const value = useMemo(
    () => ({
      phones,
      loading,
      error,
      searchTerm,
      setSearchTerm,
    }),
    [phones, loading, error, searchTerm],
  );

  return <PhonesContext.Provider value={value}>{children}</PhonesContext.Provider>;
};

export const usePhones = () => {
  const context = useContext(PhonesContext);

  if (!context) {
    throw new Error('🛑 usePhones must be used within PhonesProvider');
  }

  return context;
};
