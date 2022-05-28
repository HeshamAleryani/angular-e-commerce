import { IProduct } from './interface.product';
export class ProductModel implements IProduct {
  id?: number;
  title?: string;
  description?: string | undefined;
  price: number = 0;
  image?: string | undefined;
  category?: string;

  constructor(payload: IProduct) {
    this.id = payload.id;
    this.title = payload.title;
    this.description = payload.description;
    this.price = payload.price;
    this.image = payload.image;
    this.category = payload.category;
  }

  get link() {
    return this.title?.replaceAll(' ', '-');
  }
}
