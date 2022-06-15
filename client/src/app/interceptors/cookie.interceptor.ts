import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CookieInterceptor implements HttpInterceptor {
  private origin = environment.origin;
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const id = sessionStorage.getItem('id');

    const cloned = request.clone({
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': this.origin,
        'Content-Type': 'application/json',
        uid: String(id),
      }),
      withCredentials: true,
    });

    return next.handle(cloned);
  }
}
