import { Component } from '@angular/core';
import { SidebardpiComponent } from "../../components/sidebardpi-medecin/sidebardpi.component";
import {  ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dpi',
  standalone: true,
  imports: [RouterOutlet, SidebardpiComponent],
  templateUrl: './dpi.component.html',
  styleUrl: './dpi.component.scss'
})
export class DpiComponent {
  nss: string;

  constructor(private route: ActivatedRoute) {
    // Retrieve the 'nss' parameter from the URL
    this.nss = this.route.snapshot.paramMap.get('nss')!;
  }
}
