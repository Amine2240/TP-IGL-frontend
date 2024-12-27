import { Component } from '@angular/core';
import {  RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebardpi',
  standalone: true,
  imports: [CommonModule , RouterModule, RouterLink],
  templateUrl: './sidebardpi.component.html',
  styleUrl: './sidebardpi.component.scss'
})
export class SidebardpiComponent {

  public navigationLinks = [
    {id : 0, path: 'informations-patient', label: 'Informations Patient' },
    {id : 1, path: 'historique-medicale', label: 'Historique Médicale' },
    {id : 2, path: 'consultations-medicales', label: 'Consultations Médicales' },
    // {id : 3, path: 'ordonnance', label: 'Ordonnance' },
    {id : 3, path: 'certificat', label: 'Certificat Médicale' },
    {id : 4, path: 'decompte-frais', label: 'Décompte des Frais' },
    {id : 5, path: 'bilans', label: 'My bilans' },
  ];
  public sideBarBool = false;
  public toggleSidebar() {
    this.sideBarBool = !this.sideBarBool;
    
  }

}
