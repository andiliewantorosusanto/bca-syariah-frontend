import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  username: string;
  password: string;
  errors: any = {
    'username' : '',
    'password' : ''
  };

  constructor(
    private authService : AuthService,
    private tokenStorageService : TokenStorageService,
    private router : Router,
    private readonly notifier: NotifierService
  ) {}

  ngAfterViewInit() {
    this.notifier.notify('success', 'You are awesome! I mean it!');
  }

  login() {
    this.authService.login(this.username,this.password)
      .subscribe(
      res => {
        this.tokenStorageService.saveToken(res.data.token);
        this.tokenStorageService.saveUser(res.data.user);
        this.tokenStorageService.saveMenu(res.data.menu);
        this.router.navigate(['/dashboard']);
      },
      err => {
        this.errors = err.error.errors;
      });
  }
}
