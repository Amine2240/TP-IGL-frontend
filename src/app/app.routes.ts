import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: 'dpi',  
    loadComponent: () => import('./pages/dpi/dpi.component').then(m => m.DpiComponent),
    // I opted for this approach (children array of dpi) because the sidebar is a child of dpi not app 
    children : [
      {
        path: '', // when the path is empty (only dpi), it will load the first child component
        loadComponent: () => import('./components/informations-patient/informations-patient.component').then(m => m.InformationsPatientComponent)
      },
      {
        path: 'informations-patient',
        loadComponent: () => import('./components/informations-patient/informations-patient.component').then(m => m.InformationsPatientComponent)
      },
      {
        path : 'historique-medicale',
        loadComponent: () => import('./components/historique-medicale/historique-medicale.component').then(m => m.HistoriqueMedicaleComponent)

      },
      {
        path: 'certificat',
        loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
      },
      {
        path: 'consultations-medicales',
        loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent),
      },
      {
        path : 'consultations-medicales/form-consultation',
        loadComponent: () => import('./components/formconsultation/formconsultation.component').then(m => m.FormconsultationComponent),
      },
      {
        path : 'consultations-medicales/form-consultation/ordonnance',
        loadComponent: () => import('./components/ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent)
      },
      {
        path: 'bilans-patient',
        loadComponent: () => import('./components/bilans-patient/bilans-patient.component').then(m => m.BilansPatientComponent)
      },
      {
        path : 'decompte-frais',
        loadComponent: () => import('./components/decompte-frais/decompte-frais.component').then(m => m.DecompteFraisComponent)
      }

    ] 
  },
  {
    path: 'formpatient',
    loadComponent : () => import('./pages/formpatient/formpatient.component').then(m => m.FormpatientComponent)
  },
  {
    path : 'login',
    loadComponent : () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
  }
  
];
