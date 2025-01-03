import { Component, ElementRef, HostListener } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import { BilanRadioTableauComponent } from '../../components/bilan-radio-tableau/bilan-radio-tableau.component';
import { BilanBioTableauComponent } from '../../components/bilan-bio-tableau/bilan-bio-tableau.component';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-page-infirmier',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DpiTableauComponent,UserComponent],
  templateUrl: './page-infirmier.component.html',
})
export class PageInfirmierComponent {
  isMenuOpen = false;
  isInfermierVisible: boolean = false;
  // Médecin connecté
  infermierConnecte = {
    nom: 'Dupont',
    prenom: 'Alice',
  };


  toggleInfermierInfo() {
    this.isInfermierVisible = !this.isInfermierVisible;
  }
  constructor(
    private elementRef: ElementRef,
    private globalService: GlobalService,
    private router: Router,
    private authService: AuthService,
  ) {}

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
