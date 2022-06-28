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

  constructor() {
    const cartItemsJson = JSON.parse(localStorage.getItem('cart')!);
    if (cartItemsJson && Array.isArray(cartItemsJson)) {
      const cartItems: Array<ICartItem> = cartItemsJson.map(
        (item: ICartItem) => {
          return new CartItemModel({
            price: item.price,
            id: item.id,
            description: item.description,
            title: item.title,
            quantity: item.quantity,
            productId: item.id,
            image: item.image,
          });
        }
      );
      this.cartItemList.next(cartItems);
    }
  }

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
        id: product.id,
        description: product.description,
        title: product.title,
        quantity: 1,
        productId: product.id,
        image: product.image,
      });
      this.cartItemList.getValue().push(newCartItem);
    }
    const cartItems: Array<ICartItem> = this.cartItemList.getValue();
    this.cartItemList.next(cartItems);
    this.saveToStorage();
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.getValue().map((a: any) => {
      grandTotal += a.total;
    });
    return Math.round(grandTotal);
  }

  removeCartItem(product: IProduct) {
    this.cartItemList.getValue().map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItemList.getValue().splice(index, 1);
      }
    });
    this.cartItemList.next(this.cartItemList.getValue());
    this.saveToStorage();
  }

  removeAll() {
    this.cartItemList = new BehaviorSubject<Array<ICartItem>>([]);
    this.cartItemList.next(this.cartItemList.getValue());
    this.saveToStorage();
  }

  subToCart(product: IProduct) {
    const alreadyExist: ICartItem | undefined = this.cartItemList
      .getValue()
      .find((item: ICartItem) => item.productId === product.id);
    if (alreadyExist && alreadyExist.quantity >= 2) {
      alreadyExist.quantity = alreadyExist.quantity - 1;
    }
    const cartItems: Array<ICartItem> = this.cartItemList.getValue();
    this.cartItemList.next(cartItems);
    this.saveToStorage();
  }

  saveToStorage = () => {
    const cartItems: Array<ICartItem> = this.cartItemList.getValue();
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };
}
