import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menuOptions = [];
    this.initUserDetails();
  }

  user: FirebaseUserModel = new FirebaseUserModel();
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number = 40;
  color: string;

  menuOptions : any[] = [];

  initUserDetails(){
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        if(this.user.isAdmin){
          this.initAdminMenu();
        }else{
          this.initUserMenu();
        }
      }
    })
  }

  initUserMenu(){
    this.menuOptions.push({
      name: "Book a ticket",
      page: "/booking"
    });
    this.menuOptions.push({
      name: "My trips",
      page: "/trips"
    });
    this.menuOptions.push({
      name: "Profile",
      page: "/profile"
    });
  }

  initAdminMenu(){
    this.menuOptions.push({
      name: "Book a ticket",
      page: "/booking"
    });
    this.menuOptions.push({
      name: "My trips",
      page: "/trips"
    });
    this.menuOptions.push({
      name: "Profile",
      page: "/profile"
    });
    this.menuOptions.push({
      name: "Schedule a flight",
      page: "/schedule"
    });
    this.menuOptions.push({
      name: "Flight schedules",
      page: "/flightshistory"
    });
  }

}
