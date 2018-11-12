import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FlightTicketService {
  private flightTicketUrl = '/api/booking/trips';
  constructor(
    private http: HttpClient
  ) { }

  getFlightTicket(bookingId){
    let url = this.flightTicketUrl+ '/ticket' +'?bookingId='+bookingId;
    return this.http.get(url);
  }
}
