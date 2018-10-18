import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private flightScheduleService: FlightScheduleService
  ) { }

  ngOnInit() {
    this.createAdminFlightScheduleForm();
    this.loadAirportsArrivalList();
    this.loadAirportsDepartureList();
    this.loadFlightsList();
  }

  createAdminFlightScheduleForm(){
    this.adminFlightScheduleForm = this.fb.group({
      arrival: ['', Validators.required],
      departure: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
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

  loadAirportsDepartureList(){
    this.flightScheduleService.getAirportsDepartureList()
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
    console.log(arrivalObj);
    this.adminFlightScheduleForm.get('arrival').patchValue(arrivalObj.id);
  }

  scheduleFlight(){
    if(this.adminFlightScheduleForm.valid){
      console.log(this.adminFlightScheduleForm.value);
      alert("valid");
    }
  }

}
