import { Component } from '@angular/core';
import { SidebardpiComponent } from "../../components/sidebardpi-medecin/sidebardpi.component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [RouterOutlet, SidebardpiComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.scss'
})
export class DpiComponent {

}
