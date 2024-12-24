import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bilan-biologique-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bilan-biologique-page.component.html',
  styleUrls: ['./bilan-biologique-page.component.scss']
})
export class BilanBiologiquePageComponent {
  tableData: { parametre: string; valeur: string; unite: string }[] = [];
  newParametre: string = '';
  newValeur: string = '';
  newUnite: string = '';

  ajouterEntree() {
    if (this.newParametre && this.newValeur && this.newUnite) {
      this.tableData.push({
        parametre: this.newParametre,
        valeur: this.newValeur,
        unite: this.newUnite
      });
      this.newParametre = '';
      this.newValeur = '';
      this.newUnite = '';
    }
  }

  saveEntries() {
    console.log('sauvegarde', this.tableData);
  }

  // generation du graphe
  generateGraph() {
    console.log('Generating graph for:', this.tableData);
  }
}
