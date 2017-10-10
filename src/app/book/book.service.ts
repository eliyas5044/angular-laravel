import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/map';

import {Book} from './book';

@Injectable()
export class BookService {
  private url = 'http://laravel-api.dev';
  private item = JSON.parse(localStorage.getItem('tokens'));
  private token = '';

  constructor(private http: HttpClient) {
    if (this.item != null) {
      this.token = this.item.token;
    }
  }

  getBooks(): Observable<Book[]> {
    const url = `${this.url}/api/book`;
    return this.http.get(url, {
      headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})
    }).map(res => res as Book[]);
  }

}
