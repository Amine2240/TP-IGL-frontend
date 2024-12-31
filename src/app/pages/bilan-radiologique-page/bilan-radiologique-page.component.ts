import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-bilan-radiologique-page',
    imports: [CommonModule],
    templateUrl: './bilan-radiologique-page.component.html',
    styleUrls: ['./bilan-radiologique-page.component.scss']
})
export class BilanRadiologiquePageComponent {
  uploadedImages: string[] = []; 

  constructor(private router: Router,private route: ActivatedRoute) {}
    id: string | null = null; 
    
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
      console.log('ID reçu :', this.id);
      // Utilisez cet ID pour charger les données ou effectuer des actions
    }
    saveEntries() {
      
      this.router.navigate(['pageRadiologue/bilan-radio-tableau', this.id]);
    }
    

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
