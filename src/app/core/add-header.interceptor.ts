import {Injectable} from '@angular/core';
import {HttpContextToken, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request);
    console.log(`AddHeaderInterceptor = ${req.url}`);

    const jsomReq: HttpRequest<any> = req.clone({
      setHeaders: {'Content-Type': req.context.get(CONTENT_TYPE)}
    });

    return next.handle(jsomReq);
  }
}
