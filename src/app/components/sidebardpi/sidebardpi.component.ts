import { Component } from '@angular/core';
import { NavigationEnd, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebardpi',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './sidebardpi.component.html',
  styleUrl: './sidebardpi.component.scss'
})
export class SidebardpiComponent {

  public navigationLinks = [
    {id : 0, path: 'informations-patient', label: 'Informations Patient' },
    {id : 1, path: 'historique-medicale', label: 'Historique Médicale' },
    {id : 2, path: 'consultations-medicales', label: 'Consultations Médicales' },
    {id : 3, path: 'ordonnance', label: 'Ordonnance' },
    {id : 4, path: 'certificat', label: 'Certificat Médicale' },
    {id : 5, path: 'decompte-frais', label: 'Décompte des Frais' },
  ];
  // currentPath:string = 'informations-patient';
  // constructor(private router:Router){
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.currentPath = event.urlAfterRedirects; // Update currentPath on route change
  //     }
  //   });
    
  // }

}
