import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public pageToRedirect: string = 'pageMedecin';//read the next comment dans pageAdministratiff il y a double f 
   // Valeur par défaut (pageMedecin , pageInfermier ,pageAdministratiff , pageRadiologue , pageLaboratin,pagePatient)
  constructor() {}
}
