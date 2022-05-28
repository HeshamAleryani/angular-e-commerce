import { ICartItem } from './interface.cartItems';
export class CartItemModel implements ICartItem {
  productId?: number;
  title?: string;
  description?: string;
  price: number = 0;
  quantity: number = 1;
  image?: string;

  constructor(payload: ICartItem) {
    this.productId = payload.productId;
    this.title = payload.title;
    this.description = payload.description;
    this.price = payload.price;
    this.quantity = payload.quantity;
    this.image = payload.image;
  }

  get total() {
    return this.quantity * this.price;
  }
}
