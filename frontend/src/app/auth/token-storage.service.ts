import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const CURRENT_MONTH_KEY='CurrentMonth';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token=sessionStorage.getItem(TOKEN_KEY);
    return token !==null? token :"";
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    let username=sessionStorage.getItem(USERNAME_KEY);
    return username!==null? username :"";
  }

  public saveCurrentMonth(currentMonth:string){
    window.sessionStorage.removeItem(CURRENT_MONTH_KEY);
    window.sessionStorage.setItem(CURRENT_MONTH_KEY,currentMonth);
  }

  public getCurrentMonth():string{
    let currentMonth=sessionStorage.getItem(CURRENT_MONTH_KEY);
    return currentMonth!==null?currentMonth:"";
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }


}
