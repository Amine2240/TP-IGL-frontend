import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Router, RouterOutlet } from '@angular/router'; // Importer Router depuis '@angular/router' au lieu de 'express'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './landing-page.component.html',
  // styleUrls: ['./landing-page.component.scss'], // corriger le nom du fichier des styles (styleUrls au lieu de styleUrl)
})
export class LandingPageComponent {
  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router,
  ) {}
  async ngOnInit(): Promise<void> {
    await this.authService.loadUser();
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      const targetRoute = this.globalService.roleRouteMap[user.role];

      if (targetRoute) {
        this.router.navigate([targetRoute]);
      } else {
        console.error(`No route defined for role: ${user.role}`);
      }
    }
  }

  onButtonClick() {
    //    const targetPage = this.globalService.pageToRedirect; // Récupère la valeur de la variable globale
    console.log('Redirecting to the login page'); // Log de la page cible
    this.router.navigate(['/login']).catch((err) => {
      console.error('Navigation error:', err); // Log d'erreur en cas de problème
    });
  }
}
