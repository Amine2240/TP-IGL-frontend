import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';  
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { DpiPageComponent } from "./pages/dpi-page/dpi-page.component";
import { HistoriqueMedicalePageComponent } from "./pages/historique-medicale-page/historique-medicale-page.component";
import { TopRightSectionComponent } from './components/top-right-section/top-right-section.component';
import { BilanRadiologiquePageComponent } from './pages/bilan-radiologique-page/bilan-radiologique-page.component';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterLink, SidebarComponent, LoginPageComponent,DpiPageComponent,HistoriqueMedicalePageComponent ,TopRightSectionComponent ],  // Correctly include SidebarComponent
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front-end';
}
