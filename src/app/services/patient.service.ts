// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/patients';

  constructor(private http: HttpClient) {}

  // Récupérer les données DPI simulées ou depuis JSON Server
  getDpi(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${patientId}/dpi`);
  }

  // Récupérer l'historique médical simulé ou depuis JSON Server
  getHistorique(patientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${patientId}/historique`);
  }
}
