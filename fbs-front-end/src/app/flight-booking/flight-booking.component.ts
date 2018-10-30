import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-flight-booking',
  templateUrl: './flight-booking.component.html',
  styleUrls: ['./flight-booking.component.css']
})
export class FlightBookingComponent implements OnInit {
  isLinear = true;
  planTravelFormGroup: FormGroup;
  flightSelectionFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.planTravelFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.flightSelectionFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
