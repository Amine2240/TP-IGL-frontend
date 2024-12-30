import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public pageToRedirect: string = 'pageMedecin'; // Valeur par défaut (pageMedecin , pageAdministratiff , pageRadiologue , pageLaboratin)
  constructor() {}
}
