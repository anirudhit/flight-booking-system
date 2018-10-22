import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMenu();
  }

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number = 40;
  color: string;

  menuOptions : any[] = [];

  initMenu(){
    this.menuOptions.push({
      name: "Book a ticket",
      page: "/profile"
    });
    this.menuOptions.push({
      name: "Booking history",
      page: "/profile"
    });
    this.menuOptions.push({
      name: "Profile",
      page: "/profile"
    });
    this.menuOptions.push({
      name: "Schedule flight",
      page: "/flightschedule"
    });
    this.menuOptions.push({
      name: "Flight history",
      page: "/flightshistory"
    });
  }

}
