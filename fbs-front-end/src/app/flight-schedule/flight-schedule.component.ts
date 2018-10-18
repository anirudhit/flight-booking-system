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
    this.loadAirportsList();
    this.loadFlightsList();
  }

  createAdminFlightScheduleForm(){
    this.adminFlightScheduleForm = this.fb.group({
      arrival: [],
      departure: [],
      startTime: [],
      endTime: [],
      flightFare: [],
      flightId: [],
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loadAirportsList(){
    this.flightScheduleService.getAirportsList()
    .subscribe(airports => {
        this.arrivalAirportList = airports;
        this.departureAirportList = airports;
    });
  }

  loadFlightsList(){
    this.flightScheduleService.getFlightsList()
    .subscribe(flights => {
        this.flightsList = flights;
    });
  }

}
