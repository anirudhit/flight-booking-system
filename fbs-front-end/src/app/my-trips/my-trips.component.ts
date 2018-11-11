import { Component, OnInit, Inject} from '@angular/core';
import { MyTripsService } from './services/my-trips.service';

import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface CancelBookingData {
  trip: any
}

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {

  user: FirebaseUserModel = new FirebaseUserModel();
  tripIndex : number = 0;
  myUpcomingTripsList : any = [];
  myCancelledTripsList : any = [];
  myHistoryTripsList : any = [];
  myTripsLoading : boolean = true;
  upcomingTripsLoading : boolean = true;
  cancelledTripsLoading : boolean = true;
  historyTripsLoading : boolean = true;
  constructor(
    private myTripsService:  MyTripsService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog
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

  loadCancelledTripsList(){
    this.cancelledTripsLoading = true;
    this.myTripsService.getCancelledTripsList(this.user.id)
    .subscribe(cancelledTripsList => {
        this.myCancelledTripsList = cancelledTripsList;
        this.cancelledTripsLoading = false;
    });
    
  }

  loadHistoryTripsList(){
    this.historyTripsLoading = true;
    this.myTripsService.getHistoryTripsList(this.user.id)
    .subscribe(historyTripsList => {
        this.myHistoryTripsList = historyTripsList;
        this.historyTripsLoading = false;
    });
    
  }

  selectedTabIndex(loadingTabIndex){
    if(loadingTabIndex === 0){
      this.loadUpcomingTripsList();
    }else if(loadingTabIndex === 1){
      this.loadCancelledTripsList();
    }else if(loadingTabIndex === 2){
      this.loadHistoryTripsList();
    }
  }

  cancelBooking(trip){
    // this.flightHistoryService.deleteFlightSchedule(schedule.id)
    // .subscribe(scheduleResponse => {
    //   if(scheduleResponse){
    //     let scheduleObj : any = scheduleResponse;
    //     this.scheduledHistoryToast(scheduleObj.message,"Ok");
    //     this.loadFlightSchedulesList();
    //   }else{
    //     this.scheduledHistoryToast("Sorry. Some error occured","Ok");
    //   }
    // });

    this.myTripsService.cancelBooking(trip.id)
    .subscribe(tripResponse => {
        if(tripResponse){
          let tripObj : any = tripResponse;
          this.snackBar.open(tripObj.message,"Ok",{
            duration: 2000,
          });
          this.loadUpcomingTripsList();
        }else{
          this.snackBar.open("Sorry. Some error occured","Ok",{
            duration: 2000,
          });
        }
    });
  }

  openCancelBookingDialog(trip): void {
    const dialogRef = this.dialog.open(CancelBookingDialog, {
      width: '250px',
      data: trip
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.cancelBooking(result);
      }
    });
  }

}


@Component({
  selector: 'cancel-booking-dialog',
  templateUrl: 'dialog/cancel-trip-dialog.html',
})
export class CancelBookingDialog {

  constructor(
    public dialogRef: MatDialogRef<CancelBookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CancelBookingData
  ) { }

  
  onTicketCancel(): void {
    this.dialogRef.close(this.data);
  }

  onTicketClose(): void {
    this.dialogRef.close();
  }

}
