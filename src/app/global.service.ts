import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public pageToRedirect: string = 'pagePatient'; // Valeur par défaut
  constructor() {}
}