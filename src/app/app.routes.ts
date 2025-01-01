import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageMedecinComponent } from './pages/page-medecin/page-medecin.component';
import { PageAdministratiffComponent } from './pages/page-administratiff/page-administratiff.component';
import { PageRadiologueComponent } from './pages/page-radiologue/page-radiologue.component';
import { PageLaboratinComponent } from './pages/page-laboratin/page-laboratin.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormpatientComponent } from './pages/formpatient/formpatient.component';
import { BilanRadiologiquePageComponent } from './pages/bilan-radiologique-page/bilan-radiologique-page.component';
import { BilanBiologiquePageComponent } from './pages/bilan-biologique-page/bilan-biologique-page.component';
import { PagePatientComponent } from './pages/page-patient/page-patient.component';
import { VisualisationBilanPatientComponent } from './pages/visualisation-bilan-patient/visualisation-bilan-patient.component';
import { SoinPageComponent } from './pages/soin-page/soin-page.component';
import { PageInfirmierComponent } from './pages/page-infirmier/page-infirmier.component';
import { BilanBioTableauComponent } from './components/bilan-bio-tableau/bilan-bio-tableau.component';
import { BilanRadioTableauComponent } from './components/bilan-radio-tableau/bilan-radio-tableau.component';

export const routes: Routes = [
  // Routes for pages
  { path: 'pageAdministratiff', component: PageAdministratiffComponent },
 
  { path: 'pageRadiologue', component: PageRadiologueComponent },
  { path: 'pageLaboratin', component: PageLaboratinComponent },
  { path: 'pageInfermier', component: PageInfirmierComponent },
  
  { path: 'ajouterBilanBiologique/:id', component:BilanBiologiquePageComponent },
  { path: 'ajouterBilanRadiologique/:id', component: BilanRadiologiquePageComponent },
  { path: 'ajouterSoin/:id', component: SoinPageComponent },
  { path: 'pageMedecin', component: PageMedecinComponent },
  { path: ':pageType/formPatient', component: FormpatientComponent },
  { path: 'pageLaboratin/bilan-bio-tableau/:id', component: BilanBioTableauComponent },
  { path: 'pageRadiologue/bilan-radio-tableau/:id', component: BilanRadioTableauComponent },
 

 


  
  // DPI related routes with children
  { 
    path: 'dpi/:id',  
    loadComponent: () => import('./pages/dpi/dpi.component').then(m => m.DpiComponent),
    children: [

      
      { path: 'certificat/:idPatient', loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent) },
      { path: 'consultations-medicales/:idPatient', loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent) },
     // { path: 'page-historique/:idPatient', loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent) },
      { path: 'page-dpi/:idPatient', loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent) },
      { path: 'consultations-medicales/form-consultation/:idPatient', loadComponent: () => import('./components/formconsultation/formconsultation.component').then(m => m.FormconsultationComponent) },
      { path: 'consultations-medicales/form-consultation/ordonnance/:idPatient', loadComponent: () => import('./components/ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent) },
    
      
    ]
  },

  // Pagepatient related routes with children
  {
    path: 'pagePatient',  
    loadComponent: () => import('./pages/page-patient/page-patient.component').then(m => m.PagePatientComponent),
    children: [
      { path: 'certificat/:idPatient', loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent) },
      { path: 'consultations-medicales/:idPatient', loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent) },
      //{ path: 'page-historique/:idPatient', loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent) },
      { path: 'page-dpi/:idPatient', loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent) },
      { path: 'consultations-medicales/form-consultation/:idPatient', loadComponent: () => import('./components/formconsultation/formconsultation.component').then(m => m.FormconsultationComponent) },
      { path: 'consultations-medicales/form-consultation/ordonnance/:idPatient', loadComponent: () => import('./components/ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent) },
      { path: 'bilans/:idPatient', loadComponent: () => import('./pages/visualisation-bilan-patient/visualisation-bilan-patient.component').then(m => m.VisualisationBilanPatientComponent) },
    ]
  },

  // Pageadminnistratif related routes with children
  {
    path: 'pageadminnistratif/:id',  
    loadComponent: () => import('./pages/page-administratif/page-administratif.component').then(m => m.PageAdministratifComponent),
    children: [
      { path: 'certificat/:idPatient', loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent) },
      { path: 'consultations-medicales/:idPatient', loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent) },
      //{ path: 'page-historique/:idPatient', loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent) },
      { path: 'page-dpi/:idPatient', loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent) },
      { path: 'consultations-medicales/form-consultation/:idPatient', loadComponent: () => import('./components/formconsultation/formconsultation.component').then(m => m.FormconsultationComponent) },
      { path: 'consultations-medicales/form-consultation/ordonnance/:idPatient', loadComponent: () => import('./components/ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent) }
    ]
  },

  // Formpatient route
  {
    path: 'formpatient',
    loadComponent: () => import('./pages/formpatient/formpatient.component').then(m => m.FormpatientComponent)
  },
  
  // Root route - landing page
  { path: '', component: LandingPageComponent },

  // Redirect to landing page in case of empty path or undefined routes
  { path: '**', redirectTo: '/' },
  { path: 'pageLanding', component: LandingPageComponent },

  
];