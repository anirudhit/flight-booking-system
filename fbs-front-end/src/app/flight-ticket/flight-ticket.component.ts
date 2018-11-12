import { Component, OnInit } from '@angular/core';
import { FlightTicketService } from './services/flight-ticket.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-flight-ticket',
  templateUrl: './flight-ticket.component.html',
  styleUrls: ['./flight-ticket.component.css']
})
export class FlightTicketComponent implements OnInit {
  ticketDetailsLoading : boolean =true;
  bookingId: string = "abcdef";
  ticketDetails: any;

  baseFare                  : number = 0;
  passengerFacilityCharge   : number = 0;
  segmentTax                : number = 0;
  transportaionTax          : number = 0;
  securityFee               : number = 0;
  subTotalFare              : number = 0;
  constructor(
    private flightTicketService:  FlightTicketService,
    private route:  ActivatedRoute
  ) {
    this.bookingId = this.route.snapshot.paramMap.get('bookingId');
  }

  ngOnInit() {
    this.loadTicketDetails();
  }

  loadTicketDetails(){
    this.ticketDetailsLoading = true;
    this.flightTicketService.getFlightTicket(this.bookingId)
    .subscribe(bookingDetails => {
      this.ticketDetails = bookingDetails;
      this.baseFare         = this.ticketDetails.passengers.length * this.ticketDetails.flight_schedule.fare;
      this.passengerFacilityCharge = (4.50) * this.ticketDetails.passengers.length;
      this.segmentTax       = (4.10) * this.ticketDetails.passengers.length;
      this.transportaionTax = (27.63) * this.ticketDetails.passengers.length;
      this.securityFee      = (5.60) * this.ticketDetails.passengers.length;
      this.subTotalFare     = this.baseFare + this.passengerFacilityCharge + this.segmentTax + this.transportaionTax + this.securityFee;
      this.ticketDetailsLoading = false;
    });
    
  }

}
