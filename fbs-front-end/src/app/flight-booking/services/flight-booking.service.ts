import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FlightBookingService {
  private airportsUrl = '/api/airports';
  private flightsUrl = '/api/flights';
  constructor(
    private http: HttpClient
  ) { }

  getAirportsDepartureList(){
    let url = this.airportsUrl + '/departure/schedule/list';
    return this.http.get(url);
  }

  getAirportsArrivalList(arrivalId){
    let url = this.airportsUrl + '/arrival/schedule/list';
    return this.http.get(url,{
      params:{
        id: arrivalId
      }
    });
  }

  getFlightSchedules(scheduleObj){
    let url = this.flightsUrl + '/schedule/selected/list';
    return this.http.get(url,{
      params: scheduleObj
    });
  }
}
