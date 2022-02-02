import {Injectable} from '@angular/core';

import {allBooks, allReaders} from 'app/data';
import {Reader} from 'app/models/reader';
import {Book} from 'app/models/book';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OldBook} from '../models/old-book';
import {map, tap} from 'rxjs/operators';

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

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: ({
        Accept: 'application/json',
        Authorisation: 'my-token'
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
      .pipe(
        map(b => ({
          bookTitle: b.title,
          year: b.publicationYear
        }) as OldBook),
        tap(classicBook => console.log(classicBook))
      );
  }

}
