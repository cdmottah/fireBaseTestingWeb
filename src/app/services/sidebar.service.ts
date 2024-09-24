import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  readonly isSideBarOpen$ = new BehaviorSubject<boolean>(true)

  constructor() { }

  openSideBar() {
    this.isSideBarOpen$.next(true);
  }

  closeSideBar() {
    this.isSideBarOpen$.next(false);
  }

  toggleSideBar() {
    this.isSideBarOpen$.next(!this.isSideBarOpen$.value);
  }

}
