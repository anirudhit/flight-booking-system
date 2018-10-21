import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileUrl = '/api/user';
  constructor(
    private http: HttpClient
  ) { }

  getUserProfile(userId){
    let url = this.profileUrl + '?id=' + userId;
    return this.http.get(url);
  }

  updateUserProfile(userObj, userId){
    let url = this.profileUrl + '?id=' + userId;
    return this.http.put(url, userObj, httpOptions);
  }
}
