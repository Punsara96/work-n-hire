import { Login } from './../models/login.model';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(user: User) {
    return this.http.post(environment.baseUrl + 'register', user);
  }

  signin(login: Login) {
    return this.http.post(environment.baseUrl + 'login', login)
      .pipe(map(response => {
        this.setSession(response);
        return response;
      }));
  }

  isAuthenticated() {
    const token = localStorage.getItem('user');
    if (token !== null) {
      return true;
    }
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  signout() {
    this.removeSession();
  }

  private setSession(data) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  private removeSession() {
    localStorage.removeItem('user');
  }
}
