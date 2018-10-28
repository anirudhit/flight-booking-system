import { Component, OnInit, Inject } from '@angular/core';
import { FlightHistoryService } from './services/flight-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DeleteScheduleData {
  schedule: any
}

@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.css']
})
export class FlightHistoryComponent implements OnInit {
  flightSchedules : any;
  constructor(
    private flightHistoryService:  FlightHistoryService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadFlightSchedulesList();
  }

  loadFlightSchedulesList(){
    this.flightHistoryService.getFlightSchedulesList()
    .subscribe(schedules => {
        this.flightSchedules = schedules;
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

  openDialog(schedule): void {
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
    @Inject(MAT_DIALOG_DATA) public data: DeleteScheduleData) {}

  
  onDeleteClick(): void {
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
