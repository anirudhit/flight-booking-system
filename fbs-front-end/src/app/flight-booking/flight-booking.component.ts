import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  passengerFormGroup        : FormGroup;
  arrivalAirportList        : any;
  departureAirportList      : any;
  passengers                : any[] = [1,2,3,4,5,6];
  passengerTitle            : any[] = ["Mr","Ms","Mrs"];
  departMinDate             : Date = new Date();
  departMaxDate             : Date;
  dateOfBirthMinDate        : Date = new Date(1910,0,1);
  dateOfBirthMaxDate        : Date = new Date(2018,31,4);
  departureId               : number;
  arrivalId                 : number;
  scheduleList              : any;
  flightSelectionLoading    : boolean = false;
  seletedFlightSchedule     : any = null;
  baseFare                  : number = 0;
  passengerFacilityCharge   : number = 0;
  segmentTax                : number = 0;
  transportaionTax          : number = 0;
  securityFee               : number = 0;
  subTotalFare              : number = 0;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private flightBookingService: FlightBookingService
  ) {}

  ngOnInit() {
    this.initFlightBookingForm();
    this.initFlightSelectionForm();
    this.loadAirportsDepartureList();
    this.initPassengerForm();
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
      passengers        : ['', Validators.required],
      departDate        : [null, Validators.required]
    });
  }

  initFlightSelectionForm(){
    this.flightSelectionFormGroup = this.fb.group({
      selectFlight: ['', Validators.required]
    });
  }

  initPassengerForm(){
    this.passengerFormGroup = this.fb.group({
      passengers: this.fb.array([
          this.initPassenger(),
      ])
      // first_name          : ['',Validators.required],
      // last_name           : ['',Validators.required],
      // middle_name         : [''],
      // date_of_birth       : [null, Validators.required]
    });
  }

  initPassenger() {
    return this.fb.group({
      first_name          : ['',Validators.required],
      last_name           : ['',Validators.required],
      middle_name         : [''],
      date_of_birth       : [null, Validators.required]
    });
  }

  addPassenger() {
    const control = <FormArray>this.passengerFormGroup.controls['passengers'];
    control.push(this.initPassenger());
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

  selectPassenger(passengerCount){
    if(passengerCount > 1){
      let i=0, pCount = passengerCount-1;
      for(i = 0; i<pCount; i++){
        this.addPassenger();
      }
    }
  }

  searchFlights(){
    if(this.planTravelFormGroup.valid){
      let scheduleObj = {
        departureId : this.departureId,
        arrivalId   : this.arrivalId
      };
      this.flightSelectionLoading = true;
      this.flightBookingService.getFlightSchedules(scheduleObj)
      .subscribe(schedules =>{
        this.flightSelectionLoading = false;
        this.scheduleList = schedules;
      });
    }
  }

  selectFlight(){
    if(!this.flightSelectionFormGroup.valid){
      this.snackBar.open("Please select a flight to continue","Ok",{
        duration: 2000,
      });   
    }
  }

  selectFlightFare(schedule){
    if(schedule){
      this.seletedFlightSchedule = schedule;
      this.flightSelectionFormGroup.patchValue({
        selectFlight : schedule.id
      });
      this.baseFare         = this.planTravelFormGroup.value.passengers * this.seletedFlightSchedule.fare;
      this.passengerFacilityCharge = (4.50) * this.planTravelFormGroup.value.passengers;
      this.segmentTax       = (4.10) * this.planTravelFormGroup.value.passengers;
      this.transportaionTax = (27.63) * this.planTravelFormGroup.value.passengers;
      this.securityFee      = (5.60) * this.planTravelFormGroup.value.passengers;
      this.subTotalFare     = this.baseFare + this.passengerFacilityCharge + this.segmentTax + this.transportaionTax + this.securityFee;
    }
  }

}
