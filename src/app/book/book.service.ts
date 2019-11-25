import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { Book } from './book';

@Injectable()
export class BookService {
  private token: string;

  constructor(private http: HttpClient,
              private authService: AuthService) {
    this.authService.token.subscribe(res => this.token = res);
  }

  getBooks(): Observable<Book[]> {
    const url = `${environment.API_URL}/book`;
    return this.http.get<Book[]>(url, {
      headers: new HttpHeaders({Authorization: 'Bearer ' + this.token})
    });
  }

}
