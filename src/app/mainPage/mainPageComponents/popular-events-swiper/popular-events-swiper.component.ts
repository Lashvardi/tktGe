import { Component, HostListener, ViewChild } from '@angular/core';
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
      this.updateSlidesPerView(window.innerWidth);
    });
  }

  ngAfterViewInit() {
    this.updateSlidesPerView(window.innerWidth); // Initial check
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const target = event.target as Window;
    this.updateSlidesPerView(target.innerWidth);
  }

  updateSlidesPerView(width: number) {
    if (width >= 1200) {
      this.slidesPerView = 3;
    } else if (width >= 768) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 1;
    }

    if (this.swiper && this.swiper.swiperRef) {
      this.swiper.swiperRef.update(); // Re-initialize Swiper
    }
  }
}
