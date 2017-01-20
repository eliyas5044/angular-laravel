import { Component, OnInit } from '@angular/core';
import {BookService} from "./book.service";
import {Book} from "./book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[];
  errMesg: any;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(){
    this.bookService.getBooks()
      .subscribe(
        book => this.books = book,
        error => this.errMesg = <any>error
      )
  }

}
