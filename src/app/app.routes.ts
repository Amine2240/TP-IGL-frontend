import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    
    path: 'dpi',  
    loadComponent: () => import('./pages/dpi/dpi.component').then(m => m.DpiComponent),
    // I opted for this approach (children array of dpi) because the sidebar is a child of dpi not app 
    children : [
      // {
      //   path: 'informations-patient',
      //   // loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
      // },
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
      }

    ] 
  },
  {
    path: 'formpatient',
    loadComponent : () => import('./pages/formpatient/formpatient.component').then(m => m.FormpatientComponent)
  },
  
];
