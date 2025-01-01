import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DpiComponent } from "./pages/dpi/dpi.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
//import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { DpiPageComponent } from "./pages/dpi-page/dpi-page.component";
//import { HistoriqueMedicalePageComponent } from "./pages/historique-medicale-page/historique-medicale-page.component";
import { TopRightSectionComponent } from './components/top-right-section/top-right-section.component';
import { BilanRadiologiquePageComponent } from './pages/bilan-radiologique-page/bilan-radiologique-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
   
    FormsModule,
    NavbarComponent,
   // SidebarComponent,
   
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-root';
}
