import { Component, OnInit, Inject} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyTripsService } from './services/my-trips.service';

import { ActivatedRoute } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { formatDate } from '@angular/common';

export interface CancelBookingData {
  trip: any
}

export interface ManageBookingData {
  id: number,
  date_of_journey: string
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

  openManageBookingDialog(trip): void {
    const dialogRef = this.dialog.open(ManageBookingDialog, {
      width: '250px',
      data: trip
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadUpcomingTripsList();
        this.snackBar.open(result.message,"Ok",{
          duration: 2000,
        });
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

@Component({
  selector: 'manage-booking-dialog',
  templateUrl: 'dialog/manage-trip-dialog.html',
})
export class ManageBookingDialog {

  manageBookingForm     : FormGroup;
  dateOfJourneyMinDate  : Date = new Date();
  dateOfJourneyMaxDate  : Date;

  constructor(
    private fb      : FormBuilder,
    public dialogRef: MatDialogRef<ManageBookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ManageBookingData,
    private myTripsService:  MyTripsService,
    private snackBar: MatSnackBar
  ) {
    this.createManageBookingForm();
  }

  createManageBookingForm() {
    let dayMs           : number = 24*60*60*1000;
    let nextThreeMonths : number = dayMs*90;
    let todayTs         : number = new Date().getTime();
    let nextThreeMonthsTs : number = todayTs + nextThreeMonths;
    this.dateOfJourneyMaxDate  = new Date(nextThreeMonthsTs);
    this.manageBookingForm  = this.fb.group({
      date_of_journey : ['', Validators.required]
    });
    this.manageBookingForm.patchValue({
      date_of_journey : new Date(this.data.date_of_journey)
    });
  }
  
  onUpdateClick(): void {
    this.manageBookingForm.value.date_of_journey = formatDate(this.manageBookingForm.value.date_of_journey, 'yyyy-MM-dd', 'en');
    let scheduleObj = {
      id: this.data.id,
      value: this.manageBookingForm.value
    };
    let d_time = this.manageBookingForm.value.departure_time;
    if(this.manageBookingForm.valid){
      this.myTripsService.manageBooking(scheduleObj)
        .subscribe(scheduleResponse => {
          this.dialogRef.close(scheduleResponse);
        });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
