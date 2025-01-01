import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
    selector: 'app-soin-page',
    imports: [CommonModule, FormsModule,RouterModule],
    templateUrl: './soin-page.component.html',
    styleUrls: ['./soin-page.component.scss']
})
export class SoinPageComponent {
  tableData: { soin: string; type: string; observation: string }[] = [];
  newSoin: string = '';
  newType: string = '';
  newObservation: string = '';
  private readonly apiUrl = 'http://localhost:8000/api/dpi/ajouter-soin';
  // Ajouter une entrée à la table
  ajouterEntree() {
    if (this.newSoin && this.newType && this.newObservation) {
      this.tableData.push({
        soin: this.newSoin,
        type: this.newType,
        observation: this.newObservation
      });
      // Réinitialiser les champs
      this.newSoin = '';
      this.newType = '';
      this.newObservation = '';
    }
  }

  constructor(private router: Router,private route: ActivatedRoute) {}
    id: string | null = null; 
    
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
      console.log('ID reçu :', this.id);
      // Utilisez cet ID pour charger les données ou effectuer des actions
    }
  // Sauvegarder les entrées
 async saveEntries() {
    const entriesToSend = this.tableData.map(data => ({
      type: data.type,
      nom: data.soin,
      observation: data.observation,
    }));
    const data = {
      soins: entriesToSend ,
      hopital_id : 1 ,
      dpi_id : 2 
    }
    try {
     
     const response = await axios.post(this.apiUrl, data ,{
        withCredentials: true
      });
      console.log(response.data.message)
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
    this.router.navigate(['/pageInfermier']);  
  }

}
