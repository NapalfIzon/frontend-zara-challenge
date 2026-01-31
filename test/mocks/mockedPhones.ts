import type { PhoneListItemApi } from '../../src/features/phones/types/phones.api.types';

export const mockedPhones: PhoneListItemApi[] = [
  {
    id: 'anId-1',
    brand: 'Xiaomi',
    name: 'Xiaomi mocked Phone',
    basePrice: 123,
    imageUrl: 'https://xiaomi.com/mocked.webp',
  },
  {
    id: 'anId-2',
    brand: 'Apple',
    name: 'Apple mocked Phone',
    basePrice: 456,
    imageUrl: 'https://apple.com/mocked.webp',
  },
  {
    id: 'anId-3',
    brand: 'Samsung',
    name: 'Samsung mocked Phone',
    basePrice: 789,
    imageUrl: 'https://samsung.com/mocked.webp',
  },
];
