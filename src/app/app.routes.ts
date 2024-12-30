import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMedecinComponent } from './pages/page-medecin/page-medecin.component';
import { PageAdministratiffComponent } from './pages/page-administratiff/page-administratiff.component';
import { PageRadiologueComponent } from './pages/page-radiologue/page-radiologue.component';
import { PageLaboratinComponent } from './pages/page-laboratin/page-laboratin.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  { path: 'pageAdministratiff', component: PageAdministratiffComponent },
  { path: 'pageMedecin', component: PageMedecinComponent },
  { path: 'pageRadiologue', component: PageRadiologueComponent },
  { path: 'pageLaboratin', component: PageLaboratinComponent },
  { path: '', component: LandingPageComponent },

  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];
