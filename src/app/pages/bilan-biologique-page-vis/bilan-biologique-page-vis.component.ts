import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bilan-biologique-page',
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './bilan-biologique-page.component.html',
  styleUrls: ['./bilan-biologique-page.component.scss'],
})
export class BilanBiologiquePageComponent {
  tableData: { parametre: string; valeur: string; unite: string }[] = [];
  newParametre: string = '';
  newValeur: string = '';
  newUnite: string = '';

  private baseUrl = 'http://localhost:8000/'; // Replace with your base URL

  constructor(private router: Router, private http: HttpClient,private authService: AuthService) {}
  

  // Add an entry to the tableData
  /*ajouterEntree() {
    if (this.newParametre && this.newValeur && this.newUnite) {
      this.tableData.push({
        parametre: this.newParametre,
        valeur: this.newValeur,
        unite: this.newUnite,
      });
      this.newParametre = '';
      this.newValeur = '';
      this.newUnite = '';
    }
  }*/

  // Save data to the database
  // ici j'ai utilisé a dict pour m'arranger avec le back
  recuperer() {
  }
  

  // Generate the graph and pass data to the graph page
  genererGraph() {
    const labels = this.tableData.map((item) => item.parametre);
    const data = this.tableData.map((item) => parseFloat(item.valeur));
    console.log(data);

    this.router.navigate(['/graphe'], {
      state: { labels, data },
    });
  }
}
