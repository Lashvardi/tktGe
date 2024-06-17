import { Component, ViewChild } from '@angular/core';
import { TopEventsService } from '../../../services/top-events.service';
import { IDatum } from '../../../interfaces/tktTopEvents.model';

@Component({
  selector: 'app-popular-events-swiper',
  templateUrl: './popular-events-swiper.component.html',
  styleUrl: './popular-events-swiper.component.scss',
})
export class PopularEventsSwiperComponent {
  @ViewChild('swiper') swiper: any;
  slidesPerView: number = 3;
  tktTopEvents: IDatum[] = [];

  constructor(private _topEventService: TopEventsService) {
    this._topEventService.getTopEvents().subscribe((data) => {
      this.tktTopEvents = data.data;
    });
  }

  updateSlidesPerView(value: number) {
    this.slidesPerView = value;
    this.swiper.swiperRef.update(); // Re-initialize Swiper
  }
}
