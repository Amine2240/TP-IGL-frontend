import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bilan-biologique-page',
  imports: [CommonModule, FormsModule, HttpClientModule],
  standalone: true,
  templateUrl: './bilan-biologique-page-vis.component.html',
  styleUrls: ['./bilan-biologique-page-vis.component.scss'],
})
export class BilanBiologiquePageVisComponent implements OnInit {
  tableData: { parametre: string; valeur: string; unite: string }[] = [];
  newParametre: string = '';
  newValeur: string = '';
  newUnite: string = '';
  bilanId: string = '4'; // Set to 3
  errorMessage: string = '';

  private baseUrl = 'http://localhost:8000/';

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.loadUser(); 
    this.recuperer(); 
  }

  recuperer() {
    const token = this.authService.getToken(); 
    console.log(token);
    if (!token) {
      this.errorMessage = 'Token not found, please log in.';
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    this.http
      .get(`${this.baseUrl}api/dpi/bilans/biologique/${this.bilanId}/graph-values/`, {
        headers,
      })
      .subscribe(
        (response: any) => {
          this.tableData = response.map((item:any) => ({
            parametre: item.parametre_name,
            valeur: item.value,
            unite: 'mg'
          }));
          console.log(this.tableData);
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = `Erreur : ${error.error.message || error.message}`;
          this.tableData = [];
        }
      );
  }

  genererGraph() {
    const labels = this.tableData.map((item) => item.parametre || 'Unknown');
    const data = this.tableData.map((item) =>
      parseFloat(item.valeur) || 0
    );

    this.router.navigate(['/graphe'], {
      state: { labels, data },
    });
  }
}
