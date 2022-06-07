import { ICartItem } from './interface.cartItems';
export class CartItemModel implements ICartItem {
  id?: number;
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
    this.id = payload.id;
  }

  get total() {
    return Math.round(this.quantity * this.price);
  }
}
