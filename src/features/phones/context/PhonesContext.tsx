'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { PhoneListItemApi } from '@phoneTypes/phones.api.types';
import { phonesService } from '@phoneServices/phones.service';

interface PhonesContextValue {
  phones: PhoneListItemApi[];
  loading: boolean;
  error: string | null;
  search: (query: string) => Promise<void>;
}

const PhonesContext = createContext<PhonesContextValue | undefined>(undefined);

export const PhonesProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [allPhones, setAllPhones] = useState<PhoneListItemApi[]>([]);
  const [phones, setPhones] = useState<PhoneListItemApi[]>([]);
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

  const search = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      if (query.length === 0) {
        setPhones(allPhones);
        setLoading(false);
        return;
      }

      const data = await phonesService.getPhones();

      if (query.length < 3) {
        setPhones([]);
        setLoading(false);
        return;
      }

      const filtered = data.filter(
        (phone) =>
          phone.name.toLowerCase().includes(query.toLowerCase()) ||
          phone.brand.toLowerCase().includes(query.toLowerCase()),
      );
      setPhones(filtered);
    } catch {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  }, [allPhones]);

  const value = useMemo(
    () => ({ phones, loading, error, search }),
    [phones, loading, error, search],
  );

  return <PhonesContext.Provider value={value}>{children}</PhonesContext.Provider>;
};

export const usePhones = () => {
  const phoneContext = useContext(PhonesContext);

  if (!phoneContext) {
    throw new Error('🛑 usePhones must be used within PhonesProvider');
  }

  return phoneContext;
};
