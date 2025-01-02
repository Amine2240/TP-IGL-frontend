import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public readonly roleRouteMap: { [key: string]: string | undefined } = {
    administratif: 'administratiff',
    medecin: 'pageMedecin',
    laborantin: 'pageLaboratin',
    radiologue: 'pageRadiologue',
    infermier: 'pageInfermier',
    patient: 'pagePatient',
  };
  public pageToRedirect: string = ''; //read the next comment dans pageAdministratiff il y a double f
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  async setRedirectingPage() {
    await this.authService.loadUser();
    const user = await this.authService.getUser();
    this.pageToRedirect = this.roleRouteMap[user.role] || '/pageLanding';
  }
}
