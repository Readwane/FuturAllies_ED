import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { switchMap, retryWhen, mergeMap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentEndpoint = '/api/payment';

  constructor(private http: HttpClient) {}
  
  processPayment(paymentData: any): Observable<any> {
    return this.http.post(this.paymentEndpoint, paymentData).pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, i) => {
            const retryAttempt = i + 1;
            // If there's an error, retry up to 3 times
            if (retryAttempt > 3 || error.status < 500) {
              return throwError(error);
            }
            // Retry after 1s, 2s, then 3s
            return timer(retryAttempt * 1000);
          })
        )
      ),
      catchError(this.handleError)
    );
  }
  private handleError(error: any) {
    // Handle the error
    return throwError(error);
  }
}