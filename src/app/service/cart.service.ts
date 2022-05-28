import { CartItemModel } from './../models/cartItem.model';
import { ICartItem } from './../models/interface.cartItems';
import { IProduct } from '../models/interface.product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: BehaviorSubject<Array<ICartItem>> = new BehaviorSubject<
    Array<ICartItem>
  >([]);

  public search = new BehaviorSubject<string>('');

  constructor() {}

  getCartItems() {
    return this.cartItemList.asObservable();
  }

  addToCart(product: IProduct) {
    const alreadyExist: ICartItem | undefined = this.cartItemList
      .getValue()
      .find((item: ICartItem) => item.productId === product.id);
    if (alreadyExist) {
      alreadyExist.quantity = alreadyExist.quantity + 1;
    } else {
      const newCartItem = new CartItemModel({
        price: product.price,
        description: product.description,
        title: product.title,
        quantity: 1,
        productId: product.id,
        image: product.image,
      });
      this.cartItemList.getValue().push(newCartItem);
    }
    this.cartItemList.next(this.cartItemList.getValue());
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.getValue().map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }
  removeCartItem(product: IProduct) {
    this.cartItemList.getValue().map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.getValue().splice(index, 1);
      }
    });
    this.cartItemList.next(this.cartItemList.getValue());
  }

  removeAll() {
    this.cartItemList = new BehaviorSubject<Array<ICartItem>>([]);
    this.cartItemList.next(this.cartItemList.getValue());
  }
}
