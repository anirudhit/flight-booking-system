import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FlightHistoryService {
  private flightSchedulesUrl = '/api/flights/schedule';
  constructor(
    private http: HttpClient
  ) { }

  getFlightSchedulesList(){
    let url = this.flightSchedulesUrl + '/list?offset=0&limit=10';
    return this.http.get(url);
  }

  deleteFlightSchedule(scheduleId){
    let url = this.flightSchedulesUrl + '/' + scheduleId;
    return this.http.delete(url);
  }

  updateFlightSchedule(schedule){
    let url = this.flightSchedulesUrl;
    return this.http.put(url, schedule, httpOptions);
  }
}
