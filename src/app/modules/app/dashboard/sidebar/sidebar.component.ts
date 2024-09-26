import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { SidebarService } from '@services/sidebar.service';
import { faSignOut, faClose, faBars } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';

import { MENU_ROUTES } from '@constants/routes.const';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  readonly MENU_ROUTES = MENU_ROUTES
  readonly faSignOut = faSignOut


  readonly menuIcon$
  readonly userImgClass$
  readonly menuContentClasses$
  readonly menuItemClasses$
  readonly photoURL
  readonly displayName
  readonly email

  constructor(
    public sidebarService: SidebarService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.menuIcon$ = this.sidebarService.isSideBarOpen$.pipe(map(res => (res) ? faClose : faBars))
    this.userImgClass$ = this.sidebarService.isSideBarOpen$.pipe(map(res => (res) ? 'min-w-[45px] w-[45px] h-[45px]' : 'min-w-[25px] w-[25px] h-[25px]'))
    this.menuContentClasses$ = this.sidebarService.isSideBarOpen$.pipe(map(res => (res) ? 'grid-cols-[min-content_1fr]' : 'grid-cols-min justify-center'))
    this.menuItemClasses$ = this.sidebarService.isSideBarOpen$.pipe(map(res => (res) ? 'grid-cols-[min-content_1fr]' : 'grid-cols-min'))

    this.photoURL = this._authService.user?.photoURL || 'defaultUser.svg'
    this.displayName = this._authService.user?.displayName || 'Anonimo'
    this.email = this._authService.user?.email || ''
  }

  toogleSideBar() {
    this.sidebarService.toggleSideBar();
  }

  signOut() {
    this._authService.signOut().subscribe({
      next: () => {
        this._router.navigate(['auth'])
      }
    })
  }

}
