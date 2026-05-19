import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/resume';

  getResumeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  
updateResumeData(data: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, data).pipe(
    catchError(this.handleError)
  );
}

  // Обробник помилок (якщо сервер впаде або вимкнеться)
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Невідома помилка взаємодії з сервером';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Помилка клієнта: ${error.error.message}`;
    } else {
      errorMessage = `Сервер повернув код ${error.status}. Повідомлення: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}