import { Component, ElementRef, HostListener } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import { BilanRadioTableauComponent } from '../../components/bilan-radio-tableau/bilan-radio-tableau.component';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';

@Component({
  selector: 'app-page-radiologue',
  standalone: true,
  imports: [CommonModule, BilanRadioTableauComponent],
  templateUrl: './page-radiologue.component.html',
})
export class PageRadiologueComponent {
  isMenuOpen = false;

  
  constructor(
   
    private elementRef: ElementRef,
    private router: Router,
      // Combine all dependencies into one constructor
  ) {}

  onRowClick(): void {
    
    
    this.router.navigate(['/ajouterBilanRadiologique']);
 
  }

  toggleMenu(event: MouseEvent) {
    console.log('rami maftoha');
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    console.log('rami ta8la9t');
  }

  profil() {
    console.log('Navigating to profile...');
    // Add profile navigation logic here
  }

  logout() {
    console.log('Logging out...');
    // Add logout logic here
  }

  // Close the menu if clicked outside of the menu and button
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }
}
