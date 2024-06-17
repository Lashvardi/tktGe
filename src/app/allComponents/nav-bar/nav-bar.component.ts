import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Input,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { TopEventsService } from '../../services/top-events.service';
import { SearchService } from '../../services/search.service';
import { IDatum, IRootTktTop } from '../../interfaces/tktTopEvents.model';
import { IsignIn } from '../../interfaces/signin.model';
import { IitemSearh } from '../../interfaces/search.model';
import { Subscription } from 'rxjs';
import { Output } from '@angular/core';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  authWindow: boolean = false;
  profileData!: IsignIn;
  userMenu: boolean = false;

  popularEvents!: IDatum[];

  eventSearch: string = '';
  searchResults!: IitemSearh[];

  filmsPageActive: boolean = false;
  private routerSubscription!: Subscription;

  @Output() authWindowOpen = new EventEmitter<boolean>();

  authWindowOpens(Open: boolean) {
    this.authWindowOpen.emit(Open);
  }

  constructor(
    private _authService: AuthServiceService,
    public _AuthService: AuthServiceService,
    private _popularService: TopEventsService,
    private _searchService: SearchService,
    private route: Router
  ) {
    this.filmsPageClickActive();

    this._authService.getProfile().subscribe((data) => {
      this.profileData = data;
    });
    this._popularService
      .getTopEvents()
      .subscribe((popularEvents: IRootTktTop) => {
        this.popularEvents =
          popularEvents.data.length >= 4
            ? popularEvents.data.slice(0, 4)
            : popularEvents.data;
      });
    this._searchService.getSearchItems('rag').subscribe((data) => {
      console.log(data);
    });
    this.routerSubscription = this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.filmsPageClickActive();
      }
    });
  }

  search() {
    alert('Search Clcikeddd');
    this._searchService
      .getSearchItems(this.eventSearch)
      .subscribe((searchedItem) => {
        this.searchResults = searchedItem.Data.Items;
      });
  }
  logOut() {
    this._authService.logOut();
  }

  userMenuShow() {
    this.userMenu = !this.userMenu;
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  filmsPageClickActive() {
    this.filmsPageActive = this.route.url === '/moviePage';
  }
}
