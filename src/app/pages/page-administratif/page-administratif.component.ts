import { Component } from '@angular/core';
import { SidebarAdministratifComponent } from "../../components/sidebar-administratif/sidebar-administratif.component";
import {  ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-administratif',
  imports: [RouterOutlet, SidebarAdministratifComponent ],
  templateUrl: './page-administratif.component.html',
  styleUrl: './page-administratif.component.scss'
})
export class PageAdministratifComponent {

   id: string | null = null; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.id);
    // Utilisez cet ID pour charger les données ou effectuer des actions
  }
}
