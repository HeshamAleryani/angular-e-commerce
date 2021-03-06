import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { FilterPipe } from './shared/filter.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductComponent } from './components/products/product/product.component';
import { BlogComponent } from './components/blog/blog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FooterComponent } from './components/footer/footer.component';
import { RangeSliderComponent } from './components/range-slider/range-slider.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { SwiperModule } from 'swiper/angular';
import { NgxHideOnScrollModule } from 'ngx-hide-on-scroll';
import { IssueComponent } from './components/issue/issue.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    FilterPipe,
    NavbarComponent,
    ProductComponent,
    BlogComponent,
    FooterComponent,
    RangeSliderComponent,
    ImageSliderComponent,
    IssueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxSliderModule,
    BrowserAnimationsModule,
    SwiperModule,
    ToastrModule.forRoot({ timeOut: 1000 }),
    NgxHideOnScrollModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
