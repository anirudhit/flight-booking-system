import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './../app.service';
import { FlightHistoryService } from './services/flight-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DeleteScheduleData {
  schedule: any
}

export interface UpdateScheduleData {
  id: number,
  departure_terminal: string,
  arrival_terminal: string,
  departure_time: string,
  arrival_time: string,
  fare: number
}

@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.css']
})
export class FlightHistoryComponent implements OnInit {
  flightSchedules : any;
  flightSchedulesLoading : boolean = true;
  constructor(
    private flightHistoryService:  FlightHistoryService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadFlightSchedulesList();
  }

  loadFlightSchedulesList(){
    this.flightSchedulesLoading = true;
    this.flightHistoryService.getFlightSchedulesList()
    .subscribe(schedules => {
        this.flightSchedules = schedules;
        this.flightSchedulesLoading = false;
    });
  }

  updateSchedule(schedule){
    console.log(schedule);
  }

  openUpdateScheduleDialog(schedule): void {
    const dialogRef = this.dialog.open(UpdateScheduleDialog, {
      width: '550px',
      data: schedule
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.loadFlightSchedulesList();
        this.scheduledHistoryToast(result.message,"Ok");
      }
    });
  }

  deleteSchedule(schedule){
    this.flightHistoryService.deleteFlightSchedule(schedule.id)
    .subscribe(scheduleResponse => {
      if(scheduleResponse){
        let scheduleObj : any = scheduleResponse;
        this.scheduledHistoryToast(scheduleObj.message,"Ok");
        this.loadFlightSchedulesList();
      }else{
        this.scheduledHistoryToast("Sorry. Some error occured","Ok");
      }
    });
  }

  openDeleteScheduleDialog(schedule): void {
    const dialogRef = this.dialog.open(DeleteScheduleDialog, {
      width: '250px',
      data: schedule
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteSchedule(result);
      }
    });
  }

  scheduledHistoryToast(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}

@Component({
  selector: 'delete-schedule-dialog',
  templateUrl: 'dialog/delete-schedule-dialog.html',
})
export class DeleteScheduleDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteScheduleData
  ) { }

  
  onDeleteClick(): void {
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'update-schedule-dialog',
  templateUrl: 'dialog/update-schedule-dialog.html',
})
export class UpdateScheduleDialog {

  updateFlightScheduleForm : FormGroup;

  constructor(
    private fb      : FormBuilder,
    public dialogRef: MatDialogRef<UpdateScheduleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: UpdateScheduleData,
    private appService:  AppService,
    private flightHistoryService:  FlightHistoryService,
    private snackBar: MatSnackBar
  ) {
    this.createAdminFlightScheduleForm();
  }

  createAdminFlightScheduleForm() {
    this.updateFlightScheduleForm  = this.fb.group({
      departure_time     : [this.data.departure_time, Validators.required],
      arrival_time       : [this.data.arrival_time, Validators.required],
      departure_terminal : [this.data.departure_terminal, Validators.required],
      arrival_terminal   : [this.data.arrival_terminal, Validators.required],
      fare               : [this.data.fare, Validators.required]
    });
  }
  
  onUpdateClick(): void {
    let scheduleObj = {
      id: this.data.id,
      value: this.updateFlightScheduleForm.value
    };
    let d_time = this.updateFlightScheduleForm.value.departure_time;
    let a_time = this.updateFlightScheduleForm.value.arrival_time;
    scheduleObj.value.duration = this.appService.getTimeDuration(d_time,a_time);
    if(this.updateFlightScheduleForm.valid){
      this.flightHistoryService.updateFlightSchedule(scheduleObj)
        .subscribe(scheduleResponse => {
          this.dialogRef.close(scheduleResponse);
        });
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
