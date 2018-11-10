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
}
