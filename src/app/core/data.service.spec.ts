import {DataService} from './data.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Book} from '../models/book';
import {BookTrackerError} from '../models/bookTrackerError';

describe('DataService Tests', () => {

  let dataService: DataService;
  let httpTestingController: HttpTestingController;

  const testBooks: Book[] = [
    {bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953},
    {bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926},
    {bookID: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937},
  ];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    dataService = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should GET all books', () => {
    dataService.getAllBooks()
      .subscribe((data: Book[] | BookTrackerError) => {
        if (!(data instanceof BookTrackerError)) {
          expect(data.length).toBe(3);
        }
      });

    const bookRequest: TestRequest = httpTestingController.expectOne('/api/books');
    expect(bookRequest.request.method).toEqual('GET');

    bookRequest.flush(testBooks);
  });
  it('should return a BookTrackerError', () => {
    dataService.getAllBooks()
      .subscribe(
        () => fail('this should have been an error'),
        (err: BookTrackerError) => {
          expect(err.errorNumber).toEqual(100);
          expect(err.friendlyMessage).toEqual('An error occurred retrieving data');
        }
      );

    const bookRequest: TestRequest = httpTestingController.expectOne('/api/books');

    bookRequest.flush('error', {
      status: 500,
      statusText: 'Server Error'
    });

    httpTestingController.verify();
  });

});
