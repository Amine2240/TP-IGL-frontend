import { Component } from '@angular/core';
import { SidebarPatientComponent } from "../../components/sidebar-patient/sidebar-patient.component";
import {  ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-patient',
  imports: [RouterOutlet, SidebarPatientComponent ],
  templateUrl: './page-patient.component.html',
  styleUrl: './page-patient.component.scss'
})
export class PagePatientComponent {
    id: string | null = null; 
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
      console.log('ID reçu :', this.id);
      // Utilisez cet ID pour charger les données ou effectuer des actions
    }

}

