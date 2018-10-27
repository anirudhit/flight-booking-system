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

  getAirportsDepartureList(){
    let url = this.airportsUrl + '/departure/list';
    return this.http.get(url);
  }

  getAirportsArrivalList(arrivalId){
    let url = this.airportsUrl + '/arrival/list?id='+arrivalId;
    return this.http.get(url);
  }

  getFlightsList(){
    let url = this.flightsUrl + '/list';
    return this.http.get(url);
  }

  scheduleFlight(req){
    let url = this.flightsUrl + '/schedule';
    return this.http.post(url, req, httpOptions);
  }
}
