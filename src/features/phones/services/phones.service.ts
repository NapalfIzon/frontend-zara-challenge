import { httpGet } from '@src/services/http/httpClient';
import type { GetPhonesResponse } from '../types/phones.api.types';
import type { PhoneDetailApi } from '../types/phone-detail.api.types';

export const phonesService = {
  getPhones: () => {
    return httpGet<GetPhonesResponse>('/products');
  },

  getPhoneById: (id: string) => {
    return httpGet<PhoneDetailApi>(`/products/${id}`);
  },
};
