import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class MyTripsService {
  private flightBookingUrl = '/api/booking/trips';
  constructor(
    private http: HttpClient
  ) { }

  getUpcomingTripsList(userId){
    let url = this.flightBookingUrl+ '/upcoming' +'?userId='+userId;
    return this.http.get(url);
  }

  getCancelledTripsList(userId){
    let url = this.flightBookingUrl+ '/cancelled' +'?userId='+userId;
    return this.http.get(url);
  }

  getHistoryTripsList(userId){
    let url = this.flightBookingUrl+ '/history' +'?userId='+userId;
    return this.http.get(url);
  }

  cancelBooking(bookingId){
    let url = this.flightBookingUrl+ '/cancel' +'?bookingId='+bookingId;
    return this.http.get(url);
  }

  manageBooking(bookingObj){
    let url = this.flightBookingUrl+ '/manage';
    return this.http.post(url,bookingObj);
  }
}
