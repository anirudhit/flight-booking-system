import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private checkUserNameUrl = '/users/';  //URL to web api
  private checkRegisteredUserNameUrl = '/api/';  //URL to web api
  constructor(
    private http: HttpClient
  ) { }

  getRegisterUserDetails(userName) {
    let url = this.checkUserNameUrl + userName;
    return this.http.get(url);
  }

  checkUserRegistrationDetails(userName) {
    let url = this.checkRegisteredUserNameUrl + 'checkregistration';
    return this.http.post(url,{ userName : userName});
  }

  createUserRegistration(userObj){
    let url = this.checkRegisteredUserNameUrl + 'register';
    return this.http.post(url,userObj);
  }

}
