import { Component } from '@angular/core';
import { GlobalService } from '../../global.service';
import { Router, RouterOutlet } from '@angular/router'; // Importer Router depuis '@angular/router' au lieu de 'express'

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './landing-page.component.html',
 // styleUrls: ['./landing-page.component.scss'], // corriger le nom du fichier des styles (styleUrls au lieu de styleUrl)
})
export class LandingPageComponent {
  constructor(private globalService: GlobalService, private router: Router) {}

  onButtonClick() {
    const targetPage = this.globalService.pageToRedirect; // Récupère la valeur de la variable globale
    console.log('Redirecting to:', targetPage); // Log de la page cible
    this.router.navigate([targetPage]).catch((err) => {
      console.error('Navigation error:', err); // Log d'erreur en cas de problème
    });
  }
}
