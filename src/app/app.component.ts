import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {DpiTableauComponent  } from './components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';

import { PageMedecinComponent } from './pages/page-medecin/page-medecin.component';
import { FormsModule } from '@angular/forms';
import { PageAdministratiffComponent } from "./pages/page-administratiff/page-administratiff.component";
import { VisualisationBilanPatientComponent } from './pages/visualisation-bilan-patient/visualisation-bilan-patient.component';

import { BilanRadioTableauComponent } from "./components/bilan-radio-tableau/bilan-radio-tableau.component";
import { PageRadiologueComponent } from './pages/page-radiologue/page-radiologue.component';
import { PageLaboratinComponent } from './pages/page-laboratin/page-laboratin.component';
import { GlobalService } from './global.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';


@Component({
  selector: 'app-root',  // Nom du sélecteur de ce composant
  standalone: true,
  imports: [CommonModule,LandingPageComponent,RouterModule],
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'app-root';
}
