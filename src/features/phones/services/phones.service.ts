import { httpGet } from '@src/services/http/httpClient';
import type {
  PhoneListItemApi,
  GetPhonesResponse,
} from '@src/features/phones/types/phones.api.types';
import type { PhoneDetailApi } from '@src/features/phones/types/phone-detail.api.types';

export const phonesService = {
  getPhones: async () => {
    const response = await httpGet<GetPhonesResponse>('/phones');
    const responseMap = new Map<string, PhoneListItemApi>();

    for (const responseItem of response) {
      responseMap.set(responseItem.id, responseItem);
    }

    return Array.from(responseMap.values());
  },

  getPhoneById: (id: string) => {
    return httpGet<PhoneDetailApi>(`/phones/${id}`);
  },
};
