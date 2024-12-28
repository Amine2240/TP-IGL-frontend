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
        path: 'page-historique',
        loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent),
      },
      {
        path: 'page-dpi',
        loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent),
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
  path: 'pagepatient',  
  loadComponent: () => import('./pages/page-patient/page-patient.component').then(m => m.PagePatientComponent),
  // I opted for this approach (children array of dpi) because the sidebar is a child of dpi not app 
  children : [
    {
      path: 'certificat',
      loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
    },
    {
      path: 'consultations-medicales',
      loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent),
    },
    {
      path: 'page-historique',
      loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent),
    },
    {
      path: 'page-dpi',
      loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent),
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
    path: 'pageadminnistratif',  
    loadComponent: () => import('./pages/page-administratif/page-administratif.component').then(m => m.PageAdministratifComponent),
    // I opted for this approach (children array of dpi) because the sidebar is a child of dpi not app 
    children : [
      {
        path: 'certificat',
        loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
      },
      {
        path: 'consultations-medicales',
        loadComponent: () => import('./components/consultations/consultations.component').then(m => m.ConsultationsComponent),
      },
      {
        path: 'page-historique',
        loadComponent: () => import('./pages/historique-medicale-page/historique-medicale-page.component').then(m => m.HistoriqueMedicalePageComponent),
      },
      {
        path: 'page-dpi',
        loadComponent: () => import('./pages/dpi-page/dpi-page.component').then(m => m.DpiPageComponent),
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
