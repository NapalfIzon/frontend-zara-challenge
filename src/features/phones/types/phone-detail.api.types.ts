export interface PhoneSpecsApi {
  screen: string;
  resolution: string;
  processor: string;
  mainCamera: string;
  selfieCamera: string;
  battery: string;
  os: string;
  screenRefreshRate: string;
}

export interface PhoneColorOptionApi {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface PhoneStorageOptionApi {
  capacity: string;
  price: number;
}

export interface SimilarPhoneApi {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
  imageUrl: string;
}

export interface PhoneDetailApi {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  rating: number;
  specs: PhoneSpecsApi;
  colorOptions: PhoneColorOptionApi[];
  storageOptions: PhoneStorageOptionApi[];
  similarProducts: SimilarPhoneApi[];
}
