import { describe, it, expect, vi, afterEach } from 'vitest';

import { phonesService } from '@src/features/phones/services/phones.service';
import { httpGet } from '@src/services/http/httpClient';
import { serverHttpClient } from '@src/services/http/serverHttpClient';

import { duplicatedPhones, mockedPhoneDetail } from '@test/mocks/mockedPhones';

vi.mock('@src/services/http/httpClient');
vi.mock('@src/services/http/serverHttpClient');

describe('phonesService', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getPhones', () => {
    it('should call the correct endpoint', async () => {
      vi.mocked(httpGet).mockResolvedValue([]);

      await phonesService.getPhones();

      expect(httpGet).toHaveBeenCalledWith('/phones');
    });

    it('should return a deduplicated list of phones by id', async () => {
      vi.mocked(httpGet).mockResolvedValue(duplicatedPhones);

      const result = await phonesService.getPhones();

      expect(result).toHaveLength(2);
      expect(result.map((p) => p.id)).toEqual(['1', '2']);
    });
  });

  describe('getPhoneById', () => {
    it('should call the correct endpoint with phone id', async () => {
      vi.mocked(serverHttpClient.get).mockResolvedValue({
        data: mockedPhoneDetail,
      });

      const result = await phonesService.getPhoneById('1');

      expect(serverHttpClient.get).toHaveBeenCalledWith('/phones/1');
      expect(result).toEqual(mockedPhoneDetail);
    });
  });
});
