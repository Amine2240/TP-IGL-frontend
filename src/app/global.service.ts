import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public pageToRedirect: string = 'pageInfermier'; // Valeur par défaut (pageMedecin , pageAdministratiff , pageRadiologue , pageLaboratin)
  constructor() {}
}
