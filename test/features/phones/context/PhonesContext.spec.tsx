import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, afterAll } from 'vitest';

import { PhonesProvider, usePhones } from '../../../../src/features/phones/context/PhonesContext';
import { phonesService } from '../../../../src/features/phones/services/phones.service';
import { mockedPhones } from '../../../mocks/mockedPhones';

const spyGetPhones = vi.spyOn(phonesService, 'getPhones');

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <PhonesProvider>{children}</PhonesProvider>
);

describe('PhonesContext', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  afterAll(() => {
    vi.resetAllMocks();
  });

  it('Should fetch phones when Provider is mounted', async () => {
    spyGetPhones.mockResolvedValue(mockedPhones);

    const { result } = renderHook(() => usePhones(), { wrapper });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(spyGetPhones).toHaveBeenCalledTimes(1);
    expect(result.current.phones).toEqual(mockedPhones);
    expect(result.current.error).toBeNull();
  });

  it('Should resets phones list when search with empty query', async () => {
    spyGetPhones.mockResolvedValue(mockedPhones);

    const { result } = renderHook(() => usePhones(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.search('');
    });

    expect(result.current.phones).toEqual(mockedPhones);
  });

  it('Should returns empty list when search with less than 3 characters', async () => {
    spyGetPhones.mockResolvedValue(mockedPhones);

    const { result } = renderHook(() => usePhones(), { wrapper });
    await waitFor(() => expect(result.current.loading).toBe(false));
    await act(async () => {
      await result.current.search('sa');
    });

    expect(result.current.phones).toEqual([]);
  });

  it('Should search filters phones by name or brand', async () => {
    spyGetPhones.mockResolvedValue(mockedPhones);

    const { result } = renderHook(() => usePhones(), { wrapper });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.search('Apple');
    });

    expect(spyGetPhones).toHaveBeenCalledTimes(2);
    expect(result.current.phones).toEqual([mockedPhones[1]]);
  });

  it('Should sets an error when API call fails', async () => {
    vi.mocked(phonesService.getPhones).mockRejectedValueOnce(new Error('Random error'));

    const { result } = renderHook(() => usePhones(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to load phones');
    });
  });
});
