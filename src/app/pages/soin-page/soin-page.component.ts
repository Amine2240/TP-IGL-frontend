import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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
  constructor(private router : Router){};
  onClick()
  {  console.log('confirmed');
    this.router.navigate(['/pageInfermier']);
   
  }

  onLogoClick()
  {  console.log('confirmed');
    this.router.navigate(['/pageInfermier']);
   
  }
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

  // Sauvegarder les entrées
  saveEntries() {
    console.log('Sauvegarde des données:', this.tableData);
  }

}
