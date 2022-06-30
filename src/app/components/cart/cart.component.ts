import { ICartItem } from './../../models/interface.cartItems';
import { CartService } from './../../service/cart.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res) => {
      this.products = res;
      this.total = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  empyCart() {
    this.cartService.removeAll();
  }
  addQuantity(item: ICartItem) {
    this.cartService.addToCart(item);
  }
  subQuntity(item: ICartItem) {
    this.cartService.subToCart(item);
  }
}
