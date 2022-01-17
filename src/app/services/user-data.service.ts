import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }
  // then i would declare the readonly url to the endpoint
  // and then make the http.get request to this url
  getUserData() {
    return this.http.get('http://localhost:8080/users');
  }
}
