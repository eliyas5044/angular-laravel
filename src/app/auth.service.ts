import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
  private url = 'http://laravel-api.dev';
  isLoggedIn = false;
  // store the URL so we can redirect after logging in
  redirectUrl = 'admin';
  item = JSON.parse(localStorage.getItem('tokens'));
  userId = '';

  constructor(private http: HttpClient) {
    if (this.item != null) {
      if (this.item.token) {
        this.isLoggedIn = true;
      }
      this.userId = this.item.user.id;
    }
  }

  login(data: any): Observable<boolean> {
    localStorage.clear();
    const url = `${this.url}/api/login`;
    return this.http.post(url, data)
      .do(res => {
        this.isLoggedIn = true;
        localStorage.setItem('tokens', JSON.stringify(res));
      });
  }

  register(data: any): Observable<boolean> {
    localStorage.clear();
    const url = `${this.url}/api/register`;
    return this.http.post(url, data)
      .do(res => {
        this.isLoggedIn = true;
        localStorage.setItem('tokens', JSON.stringify(res));
      });
  }

  logout(): void {
    const url = `${this.url}/api/logout`;
    this.http.post(url, {
      id: this.userId
    }).subscribe(res => {
      this.isLoggedIn = false;
      localStorage.clear();
      console.log(res);
    });
  }

}
