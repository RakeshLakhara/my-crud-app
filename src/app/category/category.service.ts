import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
   
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Category } from './category';
   
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   
  private apiURL = "http://localhost:8080/api/categories";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }
   
  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiURL)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(category): Observable<Category> {
    return this.httpClient.post<Category>(this.apiURL , JSON.stringify(category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Category> {
    return this.httpClient.get<Category>(this.apiURL + '/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id, category): Observable<Category> {
    return this.httpClient.put<Category>(this.apiURL + '/' + id, JSON.stringify(category), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.httpClient.delete<Category>(`${this.apiURL}/${id}`, this.httpOptions)
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