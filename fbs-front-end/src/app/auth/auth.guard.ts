import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;  
    return this.verifyLogin(url);
  }
  verifyLogin(url) : boolean{
    if(!this.isLoggedIn()){
        this.router.navigate(['/login']);
        return false;
    }
    else if(this.isLoggedIn()){
      this.authService.setLoginHeader();
      return true;
    }
  }
  public isLoggedIn(): boolean {
      let status = false;
      if( localStorage.getItem('isLoggedIn') == "true"){
        status = true;
      }
      else{
        status = false;
      }
      return status;
  }

}