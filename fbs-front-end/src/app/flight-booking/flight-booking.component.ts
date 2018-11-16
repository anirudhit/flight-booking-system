import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FlightBookingService } from './services/flight-booking.service';
import { formatDate } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUserModel } from '../auth-fb/user.model';

declare let paypal: any;

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit,AfterViewChecked {
  isLinear = true;
  user: FirebaseUserModel   = new FirebaseUserModel();

  planTravelFormGroup       : FormGroup;
  flightSelectionFormGroup  : FormGroup;
  passengerFormGroup        : FormGroup;

  arrivalAirportList        : any;
  departureAirportList      : any;
  passengers                : any[] = [1,2,3,4,5,6];
  passengerTitle            : any[] = ["Mr","Ms","Mrs"];
  passengerGender           : any[] = ["Female", "Male", "Other"];
  departMinDate             : Date = new Date();
  departMaxDate             : Date;
  dateOfBirthMinDate        : Date = new Date(1910,0,1);
  dateOfBirthMaxDate        : Date = new Date();
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

  //Variable for the tickect capture
  payment_id                : string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private flightBookingService: FlightBookingService
  ) {}

  ngOnInit() {
    this.initUserDetails();
    this.initFlightBookingForm();
    this.initFlightSelectionForm();
    this.loadAirportsDepartureList();
    this.initPassengerForm();
  }

  initUserDetails(){
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
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
      passengers: this.fb.array([]),
      email:  ['',[Validators.required,Validators.email]],
      cell_number: ['',Validators.required]
    });
    this.passengerFormGroup.patchValue({
      email: this.user.email
    });
  }

  initPassenger() {
    return this.fb.group({
      first_name    : ['',Validators.required],
      last_name     : ['',Validators.required],
      middle_name   : [''],
      date_of_birth : [null, Validators.required],
      gender        : ['',Validators.required]
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
    const control = <FormArray>this.passengerFormGroup.controls['passengers'];
    if(control.controls.length >= 1){
      let j, pjCount = 0;
      for(j = control.controls.length -1; j>=pjCount; j--){
        control.removeAt(j);
      }

      let k=0, pkCount = passengerCount-1;
      for(k = 0; k<=pkCount; k++){
        this.addPassenger();
      }
    }else{
      let i=0, pCount = passengerCount-1;
      for(i = 0; i<=pCount; i++){
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

  addPassengers(){
    if(!this.passengerFormGroup.valid){
      this.snackBar.open("Please fill passenger details","Ok",{
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

  addScript: boolean = false;
  paypalLoad: boolean = true;

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production: '<your-production-key here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.subTotalFare.toFixed(2), currency: 'USD' } }
            //{ amount: { total: 1, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        if(payment.state === "approved"){
          console.log("payment");
          console.log(payment);
          this.payment_id = payment.id;
          this.confirmBooking();
        }
      })
    }
  };

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }

  confirmBooking(){
    let dateOfJourney = formatDate(this.planTravelFormGroup.value.departDate, 'yyyy-MM-dd', 'en');
    let passengers = [];
    let seatSeries = Math.floor(Math.random() * 16) + 1;
    let seatSequence = ['A','B','C','D','E','F','G'];
    this.passengerFormGroup.value.passengers.forEach((passenger, passengerIndex) => {
      passenger.date_of_birth = formatDate(passenger.date_of_birth, 'yyyy-MM-dd', 'en');
      passenger.seat_number = seatSeries + seatSequence[passengerIndex];
      passengers.push(passenger);
    });
    let req = {
      flight_schedule_id: this.flightSelectionFormGroup.value.selectFlight,
      user_id: this.user.id,
      date_of_journey: dateOfJourney,
      payment_id: this.payment_id,
      email: this.passengerFormGroup.value.email,
      cell_number: this.passengerFormGroup.value.cell_number,
      passengers: passengers
    };
    this.flightBookingService.confirmBooking(req)
    .subscribe(bookingResponse => {
      let bookingResponseObj : any = bookingResponse;
        if(bookingResponse){
          console.log(bookingResponse);
          this.snackBar.open("Your booking is confirmed","Ok",{
            duration: 2000,
          });
          //let ticketUrl = "ticket/"+ bookingResponseObj.flightBooking.id;
          this.router.navigate(['trips']);
        }else{
          this.snackBar.open("Sorry. Some error occured","Ok",{
            duration: 2000,
          });
        }
    });
  }

}
