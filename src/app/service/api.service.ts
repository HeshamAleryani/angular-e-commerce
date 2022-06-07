import { IProduct } from '../models/interface.product';
import { ProductModel } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { data } from './data';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  getProduct() {
    return new Observable((observer) => {
      observer.next(data.map((product: IProduct) => new ProductModel(product)));
      return {
        unsubscribe() {},
      };
    });
    // return this.http.get<any>('https://fakestoreapi.com/products/').pipe(
    //   map((res: Array<IProduct>) => {
    //     return res.map((product: IProduct) => new ProductModel(product));
    //   })
    // );
  }
}
