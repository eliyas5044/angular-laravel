import {Component, OnInit} from '@angular/core';

import {BookService} from './book.service';
import {Book} from './book';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  dataInvalid = false;
  formErrors = [];
  formSubmitting = false;

  constructor(private bookService: BookService) {
  }

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe(data => {
        this.books = data;
      }, (err: HttpErrorResponse) => {
        this.dataInvalid = true;
        this.formSubmitting = false;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          this.formErrors.push(err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (err.status === 0) {
            this.formErrors.push('please check your backend server.');
          } else {
            const errors = err.error;
            const items = [];
            for (const key in errors) {
              if (errors.hasOwnProperty(key)) {
                items.push(errors[key]);
              }
            }
            for (const k in items[1]) {
              if (items[1].hasOwnProperty(k)) {
                this.formErrors.push(items[1][k][0]);
              }
            }
          }
        }
      });
  }

}
