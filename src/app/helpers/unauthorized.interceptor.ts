import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { NEVER, Observable, throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router : Router,
    private readonly notifier : NotifierService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      if (!!error.status && error.status === 401) { //unauthorized
        this.router.navigate([`/login`]);
        return NEVER;
      } else if (!!error.status && error.status === 403) { // forbidden
        this.router.navigate([`/dashboard`]);
        return NEVER;
      }
      return throwError(error);
    }));
  }
}
