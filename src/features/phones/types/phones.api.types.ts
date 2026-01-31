export interface PhoneListItemApi {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export type GetPhonesResponse = PhoneListItemApi[];
