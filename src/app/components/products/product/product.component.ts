import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../service/api.service';
import { CartService } from './../../../service/cart.service';
import { IProduct } from './../../../models/interface.product';
import { ProductModel } from '../../../models/product.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  apiUnsubscribe: any;

  product!: IProduct;
  searchKey: string = '';
  public productList!: Array<IProduct>;

  constructor(
    private toastr: ToastrService,

    private router: Router,
    private api: ApiService,
    private cartService: CartService
  ) {
    let nav: Navigation | null = this.router.getCurrentNavigation();
    if (nav && nav.extras && nav.extras.state && nav.extras.state['product']) {
      this.product = nav.extras.state['product'] as ProductModel;
    }
  }

  ngOnInit(): void {
    this.apiUnsubscribe = this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addToCart(item: IProduct) {
    this.cartService.addToCart(item);
  }
  showToatr() {
    this.toastr.success(this.product.title, 'Product added');
  }
  ngOnDestroy(): void {
    this.apiUnsubscribe.unsubscribe();
  }
}
