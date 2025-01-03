import { Component, ElementRef, HostListener } from '@angular/core';
import { DpiTableauComponent } from '../../components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';
import { BilanRadioTableauComponent } from '../../components/bilan-radio-tableau/bilan-radio-tableau.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../services/auth.service';
import { UserComponent } from '../../components/user/user.component';

@Component({
  selector: 'app-page-radiologue',
  standalone: true,
  imports: [CommonModule, RouterModule, DpiTableauComponent, UserComponent],
  templateUrl: './page-radiologue.component.html',
})
export class PageRadiologueComponent {
  isMenuOpen = false;

  isRadiologueVisible: boolean = false;
  // Médecin connecté
  radiologueConnecte: any = {};

  toggleRadiologueInfo() {
    this.isRadiologueVisible = !this.isRadiologueVisible;
  }

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  id: string | null = null;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.id);

    const user = this.authService.getUser();
    console.log(user);
    if (user) {
      this.radiologueConnecte = user;
      console.log('User info:', this.radiologueConnecte);
    } else {
      console.warn('No user is currently logged in.');
      this.router.navigate(['/login']);
    }
    // Utilisez cet ID pour charger les données ou effectuer des actions
  }

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
