import { Component, ElementRef, HostListener, NgModule } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../../components/user/user.component';

import { RouterModule, Router } from '@angular/router';

import { GlobalService } from '../../global.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-page-medecin',
  standalone: true,
  imports: [CommonModule, RouterModule, UserComponent, DpiTableauComponent],
  templateUrl: './page-medecin.component.html',
})
export class PageMedecinComponent {
  isMenuOpen = false;
  isMedecinVisible: boolean = false;
  // Médecin connecté
  medecinConnecte: any = {};

  toggleMedecinInfo() {
    this.isMedecinVisible = !this.isMedecinVisible;
  }

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private globalService: GlobalService,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    const user = this.authService.getUser();
    console.log(user);
    if (user) {
      this.medecinConnecte = user;
      console.log('User info:', this.medecinConnecte);
    } else {
      console.warn('No user is currently logged in.');
      this.router.navigate(['/login']);
    }
  }
  onRowClick(): void {
    const pageType = this.globalService.pageToRedirect; // Par exemple, 'pageMedecin' ou 'pageAdministratif'

    if (pageType) {
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
