import {Component} from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Event, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  constructor(
    private tokenStorageService : TokenStorageService,
    private router : Router
  ) {

  }

  public sidebarMinimized = false;
  public navItems = this.tokenStorageService.getMenu();

  ngOnInit(): void {
    if(this.tokenStorageService.getUser() == null) {
      this.router.navigate([`/login`]);
    }
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate([`/login`]);
  }
}
