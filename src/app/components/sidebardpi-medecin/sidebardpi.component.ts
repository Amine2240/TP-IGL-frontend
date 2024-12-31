import { Component, Input } from '@angular/core';
import {  ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebardpi',
  standalone: true,
  imports: [CommonModule , RouterModule, RouterLink],
  templateUrl: './sidebardpi-medecin.component.html',
  styleUrl: './sidebardpi-medecin.component.scss'
})
export class SidebardpiComponent {

  public navigationLinks = [
    {id : 0, path: 'page-dpi', label: 'Informations Patient' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {id : 1, path: 'page-historique', label: 'Historique Médicale' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {id : 2, path: 'consultations-medicales', label: 'Consultations Médicales',icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    // {id : 3, path: 'ordonnance', label: 'Ordonnance' },
    {id : 3, path: 'certificat', label: 'Certificat Médicale' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {id : 6, path: 'bilans', label: 'Bilan Radiologique' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
    {id : 7, path: 'bilans', label: 'Bilan Biologique' ,icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
  ];
  public sideBarBool = false;
  public toggleSidebar() {
    this.sideBarBool = !this.sideBarBool;
    
  }

  idPatient: string | null = null;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
  this.idPatient = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
  console.log('ID reçu dans sideBar :', this.idPatient);
}
}
