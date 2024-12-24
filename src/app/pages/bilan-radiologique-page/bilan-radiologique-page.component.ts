import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-bilan-radiologique-page',
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './bilan-radiologique-page.component.html',
  styleUrls: ['./bilan-radiologique-page.component.scss']
})
export class BilanRadiologiquePageComponent {
  uploadedImages: string[] = []; 

  onImageUpload(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const fileReader = new FileReader();
        fileReader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result); 
        };
        fileReader.readAsDataURL(files[i]);  // la lecture se fait en base64
      }
    }
  }
}
