export interface CartItem {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  storage: string;
  color: {
    name: string;
    hexCode: string;
  };
  price: number;
  quantity: number;
}
