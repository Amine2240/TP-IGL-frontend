import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { DpiComponent } from "./pages/dpi/dpi.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

@Component({
  selector: 'app-root',  // Nom du sélecteur de ce composant
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'app-root';
}
