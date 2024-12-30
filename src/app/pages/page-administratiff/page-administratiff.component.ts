import { Component, ElementRef, HostListener } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import {RouterModule , Router } from '@angular/router';

@Component({
  selector: 'app-page-administratiff',
  standalone: true,
  imports: [CommonModule,RouterModule, DpiTableauComponent],
  templateUrl: './page-administratiff.component.html',
})
export class PageAdministratiffComponent {
  isMenuOpen = false;

  
constructor(private elementRef: ElementRef,private router: Router) {}
  onRowClick(): void {
    // Use the global variable from GlobalService to determine the route
    
      this.router.navigate(['/formPatient']);
    
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
