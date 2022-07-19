import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IFileDetailsResult } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  sendParsedContent(record: any): Observable<any> {
    return this.http.post<any>(`${environment.ExternalService.FileService.baseUrl}api/FileUpload`, record)
        .pipe(
            tap(c => console.log(c)),
            catchError(this.handleError)
        );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
        const errMessage = error.error.message;
        return throwError(() => new Error(errMessage));
    }
    return throwError(() => new Error('server error'));
}
}
