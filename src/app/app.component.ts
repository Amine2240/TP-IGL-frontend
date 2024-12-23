import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DpiTableauComponent  } from './components/dpi-tableau/dpi-tableau.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',  // Nom du sélecteur de ce composant
  standalone: true,
  imports: [RouterOutlet , DpiTableauComponent ],
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css'],
  
})
export class AppComponent {
  title = 'app-root';
}
