import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilan-radiologique-vis-page',
  templateUrl: './bilan-radiologique-vis-page.component.html',
  styleUrls: ['./bilan-radiologique-vis-page.component.scss'],
standalone: true,
  imports: [CommonModule], 
})
export class BilanRadiologiqueVisPageComponent {
  images: string[] = [
    '../../assets/icons/user.png', 
   '../../assets/icons/user.png',
    '../../assets/icons/user.png'
  ];
  selectedImage: string | null = null;
// agrandir l'image
  openImage(image: string): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
 

}
