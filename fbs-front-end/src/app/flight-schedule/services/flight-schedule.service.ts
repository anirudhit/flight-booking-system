import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FlightScheduleService {
  private airportsUrl = '/api/airports';  //URL to web api
  private flightsUrl = '/api/flights';
  constructor(
    private http: HttpClient
  ) { }

  getAirportsList(){
    let url = this.airportsUrl + '/list';
    return this.http.get(url);
  }

  getFlightsList(){
    let url = this.flightsUrl + '/list';
    return this.http.get(url);
  }
}
