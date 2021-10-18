import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const MENU_KEY = 'auth-menu';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveMenu(menu: any): void {
    window.sessionStorage.removeItem(MENU_KEY);
    window.sessionStorage.setItem(MENU_KEY, JSON.stringify(menu));
  }

  public getMenu(): any {
    const menu = window.sessionStorage.getItem(MENU_KEY);
    if (menu) {
      let availableMenu = [];

      JSON.parse(menu).forEach(element => {
        availableMenu.push({
          name: element.menu_name,
          url: element.menu_link,
          icon: element.menu_icon
        })
      });

      return availableMenu;
    }

    return null;
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }
}
