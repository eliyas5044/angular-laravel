import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookService } from './book.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BookComponent],
  providers: [BookService]
})
export class BookModule {
}
