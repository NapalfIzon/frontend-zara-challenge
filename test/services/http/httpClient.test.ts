import { describe, it, expect, vi, afterEach } from 'vitest';
import { httpClient, httpGet } from '@src/services/http/httpClient';

describe('httpClient', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('httpGet calls httpClient.get with the correct endpoint', async () => {
    const mockResponse: { data: { success: boolean } } = { data: { success: true } };

    vi.spyOn(httpClient, 'get').mockResolvedValueOnce(mockResponse);

    const result = await httpGet<{ success: boolean }>('/test');

    expect(httpClient.get).toHaveBeenCalledWith('/test');
    expect(result).toEqual({ success: true });
  });
});
