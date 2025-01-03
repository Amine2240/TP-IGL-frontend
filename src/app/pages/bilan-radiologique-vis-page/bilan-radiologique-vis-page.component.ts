import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';  
import { AuthService } from '../../services/auth.service';  
import { HttpClientModule } from '@angular/common/http';
import {  ActivatedRoute, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-bilan-radiologique-vis-page',
  templateUrl: './bilan-radiologique-vis-page.component.html',
  styleUrls: ['./bilan-radiologique-vis-page.component.scss'],
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterOutlet],
})

export class BilanRadiologiqueVisPageComponent implements OnInit {
  images: string[] = []; 
  selectedImage: string | null = null;
  pkExamen: string|null = "6"; 
  private baseUrl = 'http://localhost:8000/';  
  userId: string = ''; 
  constructor(private http: HttpClient, private authService: AuthService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadUser();  
    this.pkExamen = this.route.snapshot.paramMap.get('id');
    this.fetchBilanRadiologique(); 

  }

  loadUser(): void {
    this.authService.loadUser();
    const currentUser = this.authService.getUser();
    this.userId = currentUser.id;
  }


  fetchBilanRadiologique(): void {
    this.http.get(`${this.baseUrl}api/dpi/bilans/radiologique/${this.pkExamen}/`)
      .subscribe(
        (response: any) => {
          console.log('Bilan radiologique retrieved successfully:', response);
         
          this.images = response.images_radio || []; 
        },
        (error) => {
          console.error('Error retrieving bilan radiologique', error);
          alert(' bilan inexistant');
        }
      );
  }


  openImage(image: string): void {
    this.selectedImage = image;
  }

  
  closeModal(): void {
    this.selectedImage = null;
  }
}