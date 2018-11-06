import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth-fb/auth.service';
import { FirebaseUserModel } from '../auth-fb/user.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header-fb',
  templateUrl: './header-fb.component.html',
  styleUrls: ['./header-fb.component.css']
})
export class HeaderFbComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  isLoggedIn$: Observable<boolean>;
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        console.log(this.user);
      }
    })
  }

  onLogout() {
    this.authService.doLogout()
    .then((res) => {
      this.location.back();
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
