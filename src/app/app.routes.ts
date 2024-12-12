import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'dpi', 
    loadComponent: () => import('./pages/dpi/dpi.component').then(m => m.DpiComponent),
    children : [
      // {
      //   path: 'informations-patient',
      //   loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
      // },
      {
        path: 'ordonnance',
        loadComponent: () => import('./components/ordonnance/ordonnance.component').then(m => m.OrdonnanceComponent)
      },
      {
        path: 'certificat',
        loadComponent: () => import('./components/certificat/certificat.component').then(m => m.CertificatComponent)
      },

    ] 
  },
  
];
