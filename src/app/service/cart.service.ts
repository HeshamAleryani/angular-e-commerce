import { IProduct } from '../models/interface.product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: Array<IProduct> = [];
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>('');

  constructor() {}
  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: IProduct) {
    this.cartItemList.push(product);
    this.productList.next(product);
  }
  addToCart(product: IProduct) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: IProduct) {
    this.cartItemList.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
  removeAll() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
}
