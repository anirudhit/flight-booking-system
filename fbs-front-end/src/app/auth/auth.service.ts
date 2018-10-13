import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user: User) {
    if (user.userName !== '' && user.password !== '' ) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', user.userName);
      this.setLoginHeader();
      this.router.navigate(['/home']);
    }
  }

  setLoginHeader(){
    this.loggedIn.next(true);
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.setItem('isLoggedIn', "false");
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}