import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ImageSliderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
