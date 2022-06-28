import { ICartItem } from './../../models/interface.cartItems';
import { ApiService } from './../../service/api.service';
import { IProduct } from './../../models/interface.product';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CartService } from './../../service/cart.service';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  homeSlider = { item: 1, dots: true, nav: true };
  public filterCategory: any;
  public productList!: Array<IProduct>;
  public totalItem: number = 0;
  public searchTerm: string = '';
  isScrolling: boolean = false;

  isSearchOpen: boolean = false;
  @ViewChild('microwaveRef') microwaveElement!: ElementRef;

  constructor(private cartService: CartService, private api: ApiService) {}
  ngOnInit(): void {
    $('.activating.element').popup();
    this.cartService.getCartItems().subscribe((res) => {
      this.totalItem = 0;
      res.forEach((item: ICartItem) => {
        this.totalItem = this.totalItem + item.quantity;
      });
    });
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  showButton(): void {
    $('.ui.modal').modal('show');
  }

  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.microwaveElement.nativeElement.focus();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    this.isScrolling = window.scrollY > 80;
  }
}
// const carousel = $('#carouselExampleIndicators');
// carousel.on('slid.bs.carousel', () => {
//   const sidebar = $('#sidebar');
//   const currentSlide = $('.carousel-item.active');
//   const colored = currentSlide.find('.colored');
//   sidebar.css('background', colored.css('background-color'));
// });
// const mobileBTn = document.getElementById('mobile-cta');
// const nav = document.getElementById('menu-sidebar');
// const mobileBtnExist = document.getElementById('mobile-exist');
// if (mobileBTn) {
//   mobileBTn.addEventListener('click', () => {
//     console.log('test');
//     if (nav) nav.classList.add('menu-btn');
//   });
// }
// if (mobileBtnExist) {
//   mobileBtnExist.addEventListener('click', () => {
//     if (nav) nav.classList.remove('menu-btn');
//   });
// }
