import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from './user';
import { deleteCookie, getCookie } from './cookie';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  userObject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  // store the URL so we can redirect after logging in
  redirectUrl = 'admin';

  constructor(private http: HttpClient) {
    const token = getCookie('token');
    const user = JSON.parse(getCookie('user'));
    if (token != null) {
      this.isUserLoggedIn.next(true);
      this.token.next(token);
      this.userObject.next(user);
    }
  }

  login(data: any): Observable<any> {
    const url = `${environment.API_URL}/login`;
    return this.http.post(url, data);
  }

  register(data: any): Observable<any> {
    const url = `${environment.API_URL}/register`;
    return this.http.post(url, data);
  }

  logout(token: string): Observable<any> {
    const url = `${environment.API_URL}/logout`;
    return this.http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + token),
    });
  }

}
