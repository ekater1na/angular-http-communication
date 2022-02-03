import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    console.log(`AddHeaderInterceptor = ${req.url}`);

    const jsomReq: HttpRequest<any> = req.clone({
      setHeaders: {'Content-Type': 'application/json'}
    });

    return next.handle(jsomReq);
  }
}
