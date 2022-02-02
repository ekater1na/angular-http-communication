import {ErrorHandler, Injectable} from '@angular/core';
import {BookTrackerError} from 'app/models/bookTrackerError';

@Injectable()
export class BookTrackerErrorHandlerService implements ErrorHandler {

  constructor() {
  }

  handleError(error: any): void {
    const customError: BookTrackerError = new BookTrackerError();
    customError.errorNumber = 200;
    customError.message = (error as Error).message;
    customError.friendlyMessage = 'An error occurred. Please try again.';

    console.log(customError);
  }

}
