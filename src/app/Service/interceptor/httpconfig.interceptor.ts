import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ErrorDialogService } from 'src/app/error-dialog/error-dialog.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const API_KEY = '560bb2c57ded87f1a11a3957a9f5aab8';
    request = request.clone({ setHeaders: { API_KEY } });

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Origin', '*'),
    });
    request = request.clone({
      headers: request.headers.set(
        'Access-Control-Allow-Headers',
        'X-Requested-With'
      ),
    });
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Credentials', 'true'),
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
          reason:
            error && error.error && error.error.reason
              ? error.error.reason
              : '',
          status: error.status,
        };
        this.errorDialogService.openDialog(data);
        return throwError(error);
      })
    );
  }

  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   const req = request.clone({
  //     headers: request.headers
  //       .set('Content-Type', 'application/json')
  //       .set('Access-Control-Allow-Origin', '*')
  //       .set('Access-Control-Allow-Headers', 'X-Requested-With')
  //       .set('Access-Control-Allow-Credentials', 'true')
  //       .set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE,OPTIONS'),
  //   });
  //   const startTime = Date.now();
  //   return next.handle(req).pipe(
  //     finalize(() => {
  //       const elapse = Date.now() - startTime;
  //       console.log(
  //         `URL:${req.url}  Method:${req.method} Time took: ${elapse} ms`
  //       );
  //       catchError((error: HttpErrorResponse) => {
  //         let errorMessage: Error;
  //         if (error.error instanceof ErrorEvent) {
  //           // front end
  //           errorMessage = new Error(error.message);
  //         } else {
  //           // server side
  //           errorMessage = new Error(
  //             error.error.message,
  //           );
  //         }
  //         return throwError(errorMessage);
  //       });
  //     })
  //   );
  // }
}
