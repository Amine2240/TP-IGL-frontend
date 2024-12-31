import { Component } from '@angular/core';
<<<<<<< HEAD
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
  
=======
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';  
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { DpiPageComponent } from "./pages/dpi-page/dpi-page.component";
import { HistoriqueMedicalePageComponent } from "./pages/historique-medicale-page/historique-medicale-page.component";
import { TopRightSectionComponent } from './components/top-right-section/top-right-section.component';
import { BilanRadiologiquePageComponent } from './pages/bilan-radiologique-page/bilan-radiologique-page.component';
import { CommonModule } from '@angular/common'; 
import { HttpClientModule } from '@angular/common/http';
@Component({
    selector: 'app-root',
    imports: [HttpClientModule,CommonModule, RouterOutlet, RouterLink, SidebarComponent, LoginPageComponent, DpiPageComponent, HistoriqueMedicalePageComponent, TopRightSectionComponent], // Correctly include SidebarComponent
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
>>>>>>> nazim
})
export class AppComponent {
  title = 'app-root';
}
