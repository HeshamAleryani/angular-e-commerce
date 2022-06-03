import { IProduct } from '../../models/interface.product';
import { CartService } from './../../service/cart.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  p: number = 1;
  public filterCategory: any;
  searchKey: string = '';
  public productList!: Array<IProduct>;
  loading: boolean = false;
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getProduct().subscribe((res: Array<IProduct>) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
      });
      console.log(this.productList);
      this.loading = false;
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addToCart(item: IProduct) {
    this.cartService.addToCart(item);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}
