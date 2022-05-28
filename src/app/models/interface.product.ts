export interface IProduct {
  id?: number;
  title?: string;
  description?: string;
  price: number;
  image?: string;
  readonly link?: string;
  category?: string;
}
