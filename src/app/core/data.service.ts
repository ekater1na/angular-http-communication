import {Injectable} from '@angular/core';

import {allBooks, allReaders} from 'app/data';
import {Reader} from 'app/models/reader';
import {Book} from 'app/models/book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  mostPopularBook: Book = allBooks[0];

  constructor(private http: HttpClient) {
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[]> {
    console.log('Getting all books from a server');
    return this.http.get<Book[]>('/api/books');
  }

  getBookById(id: number): Book {
    return allBooks.find(book => book.bookID === id);
  }
}
