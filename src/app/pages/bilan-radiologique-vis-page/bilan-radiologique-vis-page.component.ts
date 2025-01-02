import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

idBilan: string | null = null; 

  constructor(
   
    private route: ActivatedRoute
  ) {}


 
 

 
  ngOnInit() {
   
    this.idBilan = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.idBilan);
  }



  selectedImage: string | null = null;
// agrandir l'image
  openImage(image: string): void {
    this.selectedImage = image;
  }

  closeModal(): void {
    this.selectedImage = null;
  }
 

}
