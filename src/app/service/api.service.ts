import { IProduct } from '../models/interface.product';
import { ProductModel } from '../models/product.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { data } from './data';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}
  getProduct() {
    return new Observable((observer) => {
      observer.next(data.map((product: IProduct) => new ProductModel(product)));
      return {
        unsubscribe() {},
      };
    });
  }
}
