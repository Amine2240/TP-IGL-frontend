import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  RouterModule ,Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-bilan-biologique-page',
    imports: [CommonModule,  RouterModule, FormsModule],
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

  

  // generation du graphe

   // creation du router
  constructor(private router: Router,private route: ActivatedRoute) {}
  id: string | null = null; 
  

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.id);
    // Utilisez cet ID pour charger les données ou effectuer des actions
  }
  saveEntries() {
    console.log('sauvegarde', this.tableData);
    this.router.navigate(['pageLaboratin/bilan-bio-tableau', this.id]);
  }
  
  genererGraph() {
    const labels = this.tableData.map((item) => item.parametre);
    const data = this.tableData.map((item) => parseFloat(item.valeur));
    console.log(data);
   // passer les données à la page du graphe
   
    
    this.router.navigate(['/graphe'], {
      state: { labels, data },
    });
  }
}
