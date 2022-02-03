import {Injectable} from '@angular/core';

import {allBooks, allReaders} from 'app/data';
import {Reader} from 'app/models/reader';
import {Book} from 'app/models/book';
import {HttpClient, HttpContext, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {OldBook} from '../models/old-book';
import {catchError, map, tap} from 'rxjs/operators';
import {BookTrackerError} from '../models/bookTrackerError';
import {CACHEABLE} from './cache.interceptor';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }

  mostPopularBook: Book = allBooks[0];

  private static handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    const dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'An error occurred retrieving data';
    return throwError(dataError);
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

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    console.log('Getting all books from a server');
    return this.http.get<Book[]>('/api/books', {
      context: new HttpContext().set(CACHEABLE, false)
    })
      .pipe(
        catchError(err => DataService.handleHttpError(err))
      );
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

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('/api/books', newBook, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`/api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  deleteBook(bookID: number): Observable<void> {
    return this.http.delete<void>(`/api/books/${bookID}`);
  }

}
