import { CartItem } from "@src/features/cart/types/cart.types";

export const mockedCartItem: CartItem = {
  id: 'SMG-S24U',
  name: 'Galaxy S24 Ultra',
  brand: 'Samsung',
  imageUrl: 'image.jpg',
  storage: '256 GB',
  color: {
    name: 'Black',
    hexCode: '#000000',
  },
  price: 1329,
  quantity: 1,
};
