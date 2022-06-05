export interface ICartItem {
  id?: number;
  productId?: number;
  title?: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
  readonly total?: number;
}
