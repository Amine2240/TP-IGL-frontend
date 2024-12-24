import { Component } from '@angular/core';

@Component({
  selector: 'app-bilan-radiologique-page',
  templateUrl: './bilan-radiologique-page.component.html',
  styleUrls: ['./bilan-radiologique-page.component.scss']
})
export class BilanRadiologiquePageComponent {
  uploadedImages: string[] = []; // Holds the uploaded image data (URLs)

  // Method to handle image upload
  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result); // Add the uploaded image to the array
        };
        fileReader.readAsDataURL(files[i]); // Convert the file to a data URL
      }
    }
  }
}
