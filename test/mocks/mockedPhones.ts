import { PhoneDetailApi } from '@src/features/phones/types/phone-detail.api.types';
import { PhoneListItemApi } from '@src/features/phones/types/phones.api.types';

export const mockedPhones: PhoneListItemApi[] = [
  { id: '1', brand: 'Apple', name: 'iPhone 15', basePrice: 999, imageUrl: '' },
  { id: '2', brand: 'Samsung', name: 'Galaxy S24', basePrice: 1099, imageUrl: '' },
];

export const duplicatedPhones: PhoneListItemApi[] = [
  { id: '1', brand: 'Apple', name: 'iPhone', basePrice: 1000, imageUrl: '' },
  { id: '1', brand: 'Apple', name: 'iPhone', basePrice: 1000, imageUrl: '' },
  { id: '2', brand: 'Samsung', name: 'Galaxy', basePrice: 900, imageUrl: '' },
];

export const mockedStorageOptions = [
  { capacity: '128 GB', price: 0 },
  { capacity: '256 GB', price: 100 },
];

export const mockedColorOptions = [
  { name: 'Black', hexCode: '#000', imageUrl: 'img1' },
  { name: 'White', hexCode: '#fff', imageUrl: 'img2' },
];

export const mockedPhoneDetail: PhoneDetailApi = {
  id: '1',
  brand: 'Apple',
  name: 'iPhone',
  basePrice: 1000,
  description: 'Test phone',
  rating: 10,
  specs: {
    screen: '6.1 inch',
    resolution: '1170 x 2532',
    processor: 'A14 Bionic',
    mainCamera: '12 MP',
    selfieCamera: '12 MP',
    battery: '2815 mAh',
    os: 'iOS',
    screenRefreshRate: '60 Hz',
  },
  storageOptions: mockedStorageOptions,
  colorOptions: mockedColorOptions,
  similarProducts: [],
};
