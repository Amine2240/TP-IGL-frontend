import { Component } from '@angular/core';
import { SidebardpiComponent } from "../../components/sidebardpi-medecin/sidebardpi.component";
import {  ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [RouterOutlet, SidebardpiComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.scss'
})
export class DpiComponent {
  id: string | null = null; 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.id);
    // Utilisez cet ID pour charger les données ou effectuer des actions
  }
}
