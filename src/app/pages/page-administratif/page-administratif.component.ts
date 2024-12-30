import { Component } from '@angular/core';
import { SidebarAdministratifComponent } from "../../components/sidebar-administratif/sidebar-administratif.component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-administratif',
  imports: [RouterOutlet, SidebarAdministratifComponent ],
  templateUrl: './page-administratif.component.html',
  styleUrl: './page-administratif.component.scss'
})
export class PageAdministratifComponent {

}
