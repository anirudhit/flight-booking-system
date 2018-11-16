import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from './../models/loginUser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = '/api/login';  //URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getLoggedInUser (loginUser: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(this.loginUrl, loginUser, httpOptions);
  }
}
