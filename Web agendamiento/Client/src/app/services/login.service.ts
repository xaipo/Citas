import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
   endpoint = 'http://localhost:3000/users/';
   httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
  constructor (private http: HttpClient){ }


  login(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.endpoint + 'login', user, { headers });
  }

}
