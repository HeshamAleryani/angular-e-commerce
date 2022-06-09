import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.css'],
})
export class RangeSliderComponent {
  minValue: number = 0;
  maxValue: number = 1000;
  options: Options = {
    floor: 0,
    ceil: 1000,
  };

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  _onChange() {
    this.onChange.emit({
      max: this.maxValue,
      min: this.minValue,
    });
  }
}
