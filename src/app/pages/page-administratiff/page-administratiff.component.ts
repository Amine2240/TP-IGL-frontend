import { Component, ElementRef, HostListener } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../services/auth.service';
import { UserComponent } from '../../components/user/user.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-page-administratiff',
  standalone: true,
  imports: [CommonModule,  UserComponent   ,RouterModule, DpiTableauComponent],
  templateUrl: './page-administratiff.component.html',
})
export class PageAdministratiffComponent {
  isMenuOpen = false;

  isAdministratifVisible: boolean = false;
  // Médecin connecté
  administratifConnecte = {
    nom: 'Dupont',
    prenom: 'Alice',
  };
 

  toggleMedecinInfo() {
    this.isAdministratifVisible = !this.isAdministratifVisible;
  }
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private globalService: GlobalService,
    private authService: AuthService,
  ) {}
  onRowClick(): void {
    const pageType = this.globalService.pageToRedirect; // Par exemple, 'pageMedecin' ou 'pageAdministratif'

    if (pageType === 'pageMedecin' || pageType === 'pageAdministratiff') {
      this.router.navigate([`${pageType}/formPatient`]);
    } else {
      console.error('pageToRedirect is not defined');
    }
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
    this.authService.logout();
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
