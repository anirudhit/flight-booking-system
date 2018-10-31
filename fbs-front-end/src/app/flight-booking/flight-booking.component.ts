import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {  FlightBookingService } from './services/flight-booking.service';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  isLinear = true;
  planTravelFormGroup       : FormGroup;
  flightSelectionFormGroup  : FormGroup;
  arrivalAirportList        : any;
  departureAirportList      : any;
  departMinDate             : Date = new Date();
  departMaxDate             : Date;
  departureId               : number;
  arrivalId                 : number;
  scheduleList              : any;
  constructor(
    private fb: FormBuilder,
    private flightBookingService: FlightBookingService
  ) {}

  ngOnInit() {
    this.initFlightBookingForm();
    this.loadAirportsDepartureList();
  }

  initFlightBookingForm(){
    let dayMs           : number = 24*60*60*1000;
    let nextThreeMonths : number = dayMs*90;
    let todayTs         : number = new Date().getTime();
    let nextThreeMonthsTs : number = todayTs + nextThreeMonths;
    this.departMaxDate  = new Date(nextThreeMonthsTs);
    this.planTravelFormGroup = this.fb.group({
      departure         : ['', Validators.required],
      arrival           : [{ value: '', disabled:true }, Validators.required],
      departDate        : [null, Validators.required]
    });
    this.flightSelectionFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

  loadAirportsDepartureList(){
    this.flightBookingService.getAirportsDepartureList()
    .subscribe(airports => {
        this.departureAirportList = airports;
    });
  }

  loadAirportsArrivalList(arrivalId){
    this.flightBookingService.getAirportsArrivalList(arrivalId)
    .subscribe(airports => {
        this.arrivalAirportList = airports;
    });
  }

  selectArrival(arrivalObj){
    this.arrivalId = arrivalObj.id;
  }

  selectDeparture(departureObj){
    this.planTravelFormGroup.get('arrival').patchValue("");
    this.planTravelFormGroup.get('arrival').enable();
    this.departureId = departureObj.id;
    this.loadAirportsArrivalList(departureObj.id);
  }

  searchFlights(){
    if(this.planTravelFormGroup.valid){
      let scheduleObj = {
        departureId : this.departureId,
        arrivalId   : this.arrivalId
      };
      this.flightBookingService.getFlightSchedules(scheduleObj)
      .subscribe(schedules =>{
        this.scheduleList = schedules;
      });
    }
  }

}
