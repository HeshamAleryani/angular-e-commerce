import { ToastrService } from 'ngx-toastr';
import { IFilters } from './../../models/interface.filters';
import { IProduct } from '../../models/interface.product';
import { CartService } from './../../service/cart.service';
import { ApiService } from './../../service/api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  apiUnsubscribe: any;
  filters: IFilters = {
    priceMax: 0,
    priceMin: 0,
    category: '',
  };
  p: number = 1;
  searchKey: string = '';
  public productList!: Array<IProduct>;
  public filteredProducts!: Array<IProduct>;
  loading: boolean = false;
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    $('.ui.accordion').accordion();
    this.loading = true;
    this.apiUnsubscribe = this.api.getProduct().subscribe((res: any) => {
      this.productList = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
      });

      this.loading = false;
      this.filteredProducts = this.productList;
      this.filterProducts();
    });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  addToCart(item: IProduct) {
    this.cartService.addToCart(item);
  }
  filterCategory(category: string) {
    this.filters.category = category;
    this.filterProducts();
  }
  filterPrice = (maxMin: { min: number; max: number }) => {
    this.filters.priceMax = maxMin.max;
    this.filters.priceMin = maxMin.min;
    this.filterProducts();
  };
  filterProducts() {
    this.filteredProducts = this.productList
      .filter((item: IProduct) => {
        if (this.filters.category) {
          if (item.category === this.filters.category) {
            return true;
          }
          return false;
        }
        return true;
      })
      .filter((item: IProduct) => {
        if (this.filters.priceMax) {
          if (item.price <= this.filters.priceMax) {
            return true;
          }
          return false;
        }
        return true;
      })
      .filter((item: IProduct) => {
        if (this.filters.priceMin) {
          if (item.price >= this.filters.priceMin) {
            return true;
          }
          return false;
        }
        return true;
      });
  }
  showToatr() {
    this.toastr.success('added', 'Product been added');
  }

  ngOnDestroy(): void {
    this.apiUnsubscribe.unsubscribe();
    $('#diacriticsexample').dropdown({
      ignoreDiacritics: true,
      sortSelect: true,
      fullTextSearch: 'exact',
    });
  }
}
