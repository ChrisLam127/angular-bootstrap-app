import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private serverUrl: string = `http://localhost:9000`;

  constructor(private HttpClient: HttpClient) {}

  // GET All Products

  public getAllProducts(): Observable<IProduct[]> {
    let dataUrl: string = `${this.serverUrl}/products`;
    return this.HttpClient.get<IProduct[]>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // GET Single Product

  public getProduct(id: string): Observable<IProduct> {
    let dataUrl: string = `${this.serverUrl}/products/${id}`;
    return this.HttpClient.get<IProduct>(dataUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Error Handling

  public handleError(error: HttpErrorResponse) {
    let errorMessage: string = '';
    if (error.error instanceof ErrorEvent) {
      // client Error
      errorMessage = `Error : ${error.error.message}`;
    } else {
      // server error
      errorMessage = `Status : ${error.status} \n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
