import { ICartItem } from './../../models/interface.cartItems';
import { ApiService } from './../../service/api.service';
import { IProduct } from './../../models/interface.product';
import { Component, OnInit } from '@angular/core';
import { CartService } from './../../service/cart.service';
import * as $ from 'jquery';
import 'bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  homeSlider = { item: 1, dots: true, nav: true };
  public filterCategory: any;
  public productList!: Array<IProduct>;
  public totalItem: number = 0;
  public searchTerm: string = '';
  constructor(private cartService: CartService, private api: ApiService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res) => {
      this.totalItem = 0;
      res.forEach((item: ICartItem) => {
        this.totalItem = this.totalItem + item.quantity;
      });
    });

    const carousel = $('#carouselExampleIndicators');
    carousel.on('slid.bs.carousel', () => {
      const sidebar = $('#sidebar');
      const currentSlide = $('.carousel-item.active');
      const colored = currentSlide.find('.colored');
      sidebar.css('background', colored.css('background-color'));
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }
}
