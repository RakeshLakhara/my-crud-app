import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiURL = "http://localhost:8080/api/products";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(params:any): Observable<any> {
    return this.httpClient.get(this.apiURL,{ params })
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(product): Observable<Product> {
    return this.httpClient.post<Product>(this.apiURL , JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id:any): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiURL}/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id, product): Observable<any> {
    return this.httpClient.put<any>(this.apiURL + '/' + id, JSON.stringify(product), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Product>(`${this.apiURL}/${id}`, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
