import { Component, OnInit } from '@angular/core';
import { FlightHistoryService } from './services/flight-history.service';

@Component({
  selector: 'app-flight-history',
  templateUrl: './flight-history.component.html',
  styleUrls: ['./flight-history.component.css']
})
export class FlightHistoryComponent implements OnInit {
  flightSchedules : any;
  constructor(
    private flightHistoryService:  FlightHistoryService
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

}
