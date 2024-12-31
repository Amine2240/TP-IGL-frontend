import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bilan-radiologique-page',
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './bilan-radiologique-page.component.html',
  styleUrls: ['./bilan-radiologique-page.component.scss']
})
export class BilanRadiologiquePageComponent {
  uploadedImages: File[] = []; 
  uploadedImages2: string[] = []; 
  examenResultats: string = '';
  pkExamen: string = "4"; // Example value (you might change this dynamically in routing)
  userId: string = ""; // Initially empty, will be set from AuthService
  private baseUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Handle image file uploads
  onImageUpload(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imageUrl = URL.createObjectURL(file);  
      this.uploadedImages.push(file);  
      this.uploadedImages2.push(imageUrl);  
    }
  }

  // Save form data
  sauvegarder(): void {
    // Load the current user and get their user ID
    this.authService.loadUser();
    const currentUser = this.authService.getUser();
    this.userId = currentUser.id;

    const formData = new FormData();
    formData.append('examen[resultats]', this.examenResultats);
    formData.append('userId', this.userId); // Send userId as part of the form data

    // Append all the image files to the formData object
    for (let i = 0; i < this.uploadedImages.length; i++) {
      formData.append('images_radio', this.uploadedImages[i], this.uploadedImages[i].name);
    }

    // Make the HTTP request to save the form data
    this.http.post(`${this.baseUrl}api/dpi/bilans/radiologique/${this.pkExamen}/`, formData)
      .subscribe(
        (response: any) => {
          console.log('Bilan radiologique ajouté avec succès', response);
          // form data reset if successful
          this.examenResultats = '';
          this.uploadedImages = [];
          this.uploadedImages2 = [];
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du bilan radiologique', error);
        }
      );
  }
}
