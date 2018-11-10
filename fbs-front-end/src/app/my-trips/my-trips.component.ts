import { Component, OnInit } from '@angular/core';
import { MyTripsService } from './services/my-trips.service';

import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  tripIndex : number = 0;
  myUpcomingTripsList : any;
  myTripsLoading : boolean = true;
  upcomingTripsLoading : boolean = true;
  cancelledTripsLoading : boolean = true;
  historyTripsLoading : boolean = true;
  constructor(
    private myTripsService:  MyTripsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initUserDetails();
  }

  initUserDetails(){
    this.myTripsLoading = true;
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.myTripsLoading = false;
        this.loadUpcomingTripsList();
      }
    })
  }

  loadUpcomingTripsList(){
    this.upcomingTripsLoading = true;
    this.myTripsService.getUpcomingTripsList(this.user.id)
    .subscribe(upcomingTripsList => {
        this.myUpcomingTripsList = upcomingTripsList;
        this.upcomingTripsLoading = false;
    });
    
  }

  selectedTabIndex(loadingTabIndex){
    if(loadingTabIndex === 0){
      this.loadUpcomingTripsList();
    }
  }

}
