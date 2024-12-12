import { Component } from '@angular/core';
import { SidebardpiComponent } from "../../components/sidebardpi/sidebardpi.component";
import { OrdonnanceComponent } from "../../components/ordonnance/ordonnance.component";
import { CertificatComponent } from '../../components/certificat/certificat.component';
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [RouterOutlet, SidebardpiComponent, OrdonnanceComponent , CertificatComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.scss'
})
export class DpiComponent {

}
