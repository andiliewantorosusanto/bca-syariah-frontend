import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    private router : Router
  ) {}

  login() {
    this.authService.login(this.username,this.password)
      .subscribe(
      res => {
        this.tokenStorageService.saveToken(res.data.token);
        this.tokenStorageService.saveUser(res.data.user);
        this.router.navigate(['/dashboard']);
      },
      res => {
        this.errors = res.error.error;
      });
  }
}
