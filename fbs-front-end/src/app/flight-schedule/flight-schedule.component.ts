import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  FlightScheduleService } from './services/flight-schedule.service';
@Component({
  selector: 'app-flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.css']
})
export class FlightScheduleComponent implements OnInit {
  adminFlightScheduleForm : FormGroup;
  arrivalAirportList      : any;
  departureAirportList    : any;
  flightsList             : any;
  departure_id            : number = 0;
  arrival_id              : number = 0;
  duration                : string = "0hr 0min";
  flight_id               : number = 0;

  constructor(
    private fb      : FormBuilder,
    private snackBar: MatSnackBar,
    private flightScheduleService:  FlightScheduleService
  ) { }

  ngOnInit() {
    this.createAdminFlightScheduleForm();
    this.loadAirportsDepartureList();
    this.loadFlightsList();
  }

  createAdminFlightScheduleForm(){
    this.adminFlightScheduleForm  = this.fb.group({
      departure         : ['', Validators.required],
      arrival           : [{ value: '', disabled:true }, Validators.required],
      departureTime     : ['', Validators.required],
      arrivalTime       : ['', Validators.required],
      departureTerminal : ['', Validators.required],
      arrivalTerminal   : ['', Validators.required],
      flightFare        : ['', Validators.required],
      flightId          : ['', Validators.required]
    });
  }

  loadAirportsDepartureList(){
    this.flightScheduleService.getAirportsDepartureList()
    .subscribe(airports => {
        this.departureAirportList = airports;
    });
  }

  loadAirportsArrivalList(arrivalId){
    this.flightScheduleService.getAirportsArrivalList(arrivalId)
    .subscribe(airports => {
        this.arrivalAirportList = airports;
    });
  }

  loadFlightsList(){
    this.flightScheduleService.getFlightsList()
    .subscribe(flights => {
        this.flightsList = flights;
    });
  }

  selectArrival(arrivalObj){
    this.arrival_id = arrivalObj.id;
  }

  selectDeparture(departureObj){
    this.adminFlightScheduleForm.get('arrival').patchValue("");
    this.adminFlightScheduleForm.get('arrival').enable();
    this.departure_id = departureObj.id;
    this.loadAirportsArrivalList(departureObj.id);
  }

  selectFlight(flightObj){
    this.flight_id = flightObj.id;
  }

  parseTime(cTime){
    if (cTime == '') return null;
    var d = new Date();
    var time = cTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
    d.setHours( parseInt(time[1]) + ( ( parseInt(time[1]) < 12 && time[4] ) ? 12 : 0) );
    d.setMinutes( parseInt(time[3]) || 0 );
    d.setSeconds(0, 0);
    return d;
  }

  scheduledFlightToast(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  scheduleFlight(){
    if(this.adminFlightScheduleForm.valid){
      let tStart  : any = this.parseTime(this.adminFlightScheduleForm.value.departureTime);
      let tStop   : any = this.parseTime(this.adminFlightScheduleForm.value.arrivalTime);
      let minutes : any = Math.abs((tStop - tStart)/(1000*60));
      let hrs = Math.floor(minutes/60);
      let min = minutes%60;
      this.duration = hrs + 'Hr ' + min + 'Min';
      let req ={
        departure_id: this.departure_id,
        arrival_id  : this.arrival_id,
        departure_time  : this.adminFlightScheduleForm.value.departureTime,
        arrival_time    : this.adminFlightScheduleForm.value.arrivalTime,
        departure_terminal  : this.adminFlightScheduleForm.value.departureTerminal,
        arrival_terminal    : this.adminFlightScheduleForm.value.arrivalTerminal,
        fare                : Number(this.adminFlightScheduleForm.value.flightFare),
        duration            : this.duration,
        flight_id           : this.flight_id
      };

      this.flightScheduleService.scheduleFlight(req)
      .subscribe(schedule => {
          if(schedule){
            this.adminFlightScheduleForm.reset();
            this.scheduledFlightToast("Flight scheduled","Ok");
          }else{
            this.scheduledFlightToast("Sorry. Some error occured","Ok");
          }
      });
    }
  }
}
