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
  ajouterEntree() {
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
  }


  async sauvegarder() {
    try {
      // Load the user and ensure it's completed before proceeding
      await this.authService.loadUser();
      const currentUser = this.authService.getUser();
      console.log(this.authService.getToken());
      console.log(this.authService.getUser());
      if (!currentUser) {
        alert('User not authenticated. Please log in.');
        return;
      }
  
      // Prepare the data for the request
      const examen_id = 3; 
      const resultats = 'Résumé des résultats';
      const resultats_details = this.tableData.map((item) => ({
        parametre: item.parametre,
        valeur: item.valeur,
        unite: item.unite,
      }));
  
      const graph_values = this.tableData.map((item) => ({
        parametre: item.parametre,
        valeur: parseFloat(item.valeur),
      }));
  
      const requestData = {
        examen_id,
        graph_values,
        resultats,
        resultats_details,
        user_id: currentUser.id, // Include the user ID or other details
      };
  
      const headers = {
        Authorization: `Bearer ${this.authService.getToken()}`,
      };
  
      // Make the HTTP POST request
      this.http
        .post(`${this.baseUrl}/api/dpi/bilans/biologique/`, requestData, { headers })
        .subscribe(
          (response) => {
            alert('Sauvegarde avec succès');
          },
          (error) => {
            console.error('Erreur:', error);
            alert('Erreur : ' + (error.message || 'Unknown error occurred.'));
          }
        );
    } catch (error) {
      console.error('Error during sauvegarder:', error);
      alert('Une erreur est survenue lors de la sauvegarde.');
    }
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
