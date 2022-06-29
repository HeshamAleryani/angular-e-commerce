import { ToastrService } from 'ngx-toastr';
import { ApiService } from './../../../service/api.service';
import { CartService } from './../../../service/cart.service';
import { IProduct } from './../../../models/interface.product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navigation, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  apiUnsubscribe: any;

  product!: IProduct;
  searchKey: string = '';
  public productList!: Array<IProduct>;

  onRouteChange!: Subscription;

  constructor(
    private toastr: ToastrService,

    private router: Router,
    private api: ApiService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.apiUnsubscribe = this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
      this.setCurrentProduct();
    });
    this.onRouteChange = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.setCurrentProduct();
      }
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
    this.onRouteChange.unsubscribe();
  }

  setCurrentProduct() {
    const product: IProduct | undefined = this.productList.find((item) => {
      const productUrl: string = this.router.url.split('/')[2];
      return item.link === productUrl;
    });
    if (product) this.product = product;
    else this.router.navigate(['/products']);
  }
}
