import { Component } from '@angular/core';
import { SidebarPatientComponent } from "../../components/sidebar-patient/sidebar-patient.component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-patient',
  imports: [RouterOutlet, SidebarPatientComponent ],
  templateUrl: './page-patient.component.html',
  styleUrl: './page-patient.component.scss'
})
export class PagePatientComponent {

}

