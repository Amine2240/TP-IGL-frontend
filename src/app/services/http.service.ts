import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:8000/api/dpi/creer-dpi';

  constructor(private http: HttpClient) {}

  createDpi(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload ,{withCredentials: true});
  }
}
