import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bilan-radiologique-page',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bilan-radiologique-page.component.html',
  styleUrls: ['./bilan-radiologique-page.component.scss']
})
export class BilanRadiologiquePageComponent {
  uploadedImages: File[] = []; 
  examenResultats: string = '';  // notes ou resultats

  constructor(private http: HttpClient) {}

  // gestion des radios (front)
  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.uploadedImages = Array.from(files); 
    }
  }

  // sauvegarde des donnes du form
  onSubmit() {
    const formData = new FormData();

   // notes ou resultats
    formData.append('examen[resultats]', this.examenResultats);

    for (let i = 0; i < this.uploadedImages.length; i++) {
      formData.append('images_radio', this.uploadedImages[i], this.uploadedImages[i].name);
    }
    this.http.post('http://your-backend-url/api/dpi/bilans/radiologique/', formData)
      .subscribe(
        (response: any) => {
          console.log('Bilan radiologique ajouté avec succès', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du bilan radiologique', error);
        }
      );
  }
}
