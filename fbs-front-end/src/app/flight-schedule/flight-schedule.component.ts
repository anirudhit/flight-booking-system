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
  adminFlightScheduleForm: FormGroup;
  arrivalAirportList: any;
  departureAirportList: any;
  flightsList: any;
  arrival_id: number = 0;
  departure_id: number = 0;
  duration: string = "0hr 0min";
  flight_id: number = 0;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private flightScheduleService: FlightScheduleService
  ) { }

  ngOnInit() {
    this.createAdminFlightScheduleForm();
    this.loadAirportsArrivalList();
    this.loadFlightsList();
  }

  createAdminFlightScheduleForm(){
    this.adminFlightScheduleForm = this.fb.group({
      arrival: ['', Validators.required],
      departure: [{ value: '', disabled:true }, Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: ['', Validators.required],
      flightFare: ['', Validators.required],
      flightId: ['', Validators.required]
    });
  }

  loadAirportsArrivalList(){
    this.flightScheduleService.getAirportsArrivalList()
    .subscribe(airports => {
        this.arrivalAirportList = airports;
    });
  }

  loadAirportsDepartureList(arrivalId){
    this.flightScheduleService.getAirportsDepartureList(arrivalId)
    .subscribe(airports => {
        this.departureAirportList = airports;
    });
  }

  loadFlightsList(){
    this.flightScheduleService.getFlightsList()
    .subscribe(flights => {
        this.flightsList = flights;
    });
  }

  selectArrival(arrivalObj){
    this.adminFlightScheduleForm.get('departure').patchValue("");
    this.adminFlightScheduleForm.get('departure').enable();
    this.arrival_id = arrivalObj.id;
    this.loadAirportsDepartureList(arrivalObj.id);
  }

  selectDeparture(departureObj){
    this.departure_id = departureObj.id;
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

      let tStart: any = this.parseTime(this.adminFlightScheduleForm.value.arrivalTime);
      let tStop: any = this.parseTime(this.adminFlightScheduleForm.value.departureTime);

      let minutes: any = Math.abs((tStop - tStart)/(1000*60));

      let hrs = Math.floor(minutes/60);
      let min = minutes%60;

      this.duration = hrs + 'Hr ' + min + 'Min';
      let req ={
        arrival_id:     this.arrival_id,
        departure_id:   this.departure_id,
        arrival_time:   this.adminFlightScheduleForm.value.arrivalTime,
        departure_time: this.adminFlightScheduleForm.value.departureTime,
        fare:           Number(this.adminFlightScheduleForm.value.flightFare),
        duration:       this.duration,
        flight_id:      this.flight_id
      }
      console.log(req);

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
