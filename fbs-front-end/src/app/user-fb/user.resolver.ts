import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../auth-fb/user.service';
import { FirebaseUserModel } from '../auth-fb/user.model';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        if(res.providerData[0].providerId == 'password'){
          user.id = res.uid;
          user.image = 'http://dsi-vd.github.io/patternlab-vd/images/fpo_avatar.png';
          user.name = res.displayName;
          user.email = res.email;
          user.provider = res.providerData[0].providerId;
          user.isAdmin = true;
          return resolve(user);
        }
        else{
          user.id = res.uid;
          user.image = res.photoURL;
          user.name = res.displayName;
          user.email = res.email;
          user.provider = res.providerData[0].providerId;
          user.isAdmin = false;
          return resolve(user);
        }
      }, err => {
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
