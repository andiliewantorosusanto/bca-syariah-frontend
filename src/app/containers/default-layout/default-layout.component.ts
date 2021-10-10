import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  constructor(
    private tokenStorageService : TokenStorageService,
    private router : Router
  ) {}

  ngOnInit(): void {
    if(this.tokenStorageService.getUser() == null) {
      this.router.navigate([`/login`]);
    }
  }

  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
