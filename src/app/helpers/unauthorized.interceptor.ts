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
import Swal from 'sweetalert2';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router : Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      if (!!error.status && error.status === 401) { //unauthorized
        this.router.navigate([`/login`]);
        return NEVER;
      } else if (!!error.status && error.status === 403) { // forbidden
        this.router.navigate([`/dashboard`]);
        return NEVER;
      } else if (!!error.status && error.status === 500) { // forbidden
        Swal.fire(
          `Something Happen`,
          `Please Contact Administrator`,
          'error'
        );
        return NEVER;
      }
      return throwError(error);
    }));
  }
}
