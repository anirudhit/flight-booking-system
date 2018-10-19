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

  login(user: any) {
    if (user) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', user.username);
      localStorage.setItem('id', user.id);
      localStorage.setItem('image_url', user.image_url);
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
    localStorage.removeItem('id');
    localStorage.removeItem('image_url');
    this.router.navigate(['/login']);
  }
}