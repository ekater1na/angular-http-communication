import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Book} from 'app/models/book';
import {DataService} from 'app/core/data.service';
import {OldBook} from '../models/old-book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    const bookID: number = parseInt(this.route.snapshot.params.id, 10);
    this.dataService.getBookById(bookID).subscribe(
      (data) => this.selectedBook = data,
      (err: any) => console.log(err),
    );
    this.dataService.getOldBookById(bookID)
      .subscribe(
        (data: OldBook) => console.log(`Old book title: ${data.bookTitle}`)
      );
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    console.warn('Save changes to book not yet implemented.');
  }
}
