import { RouterLink , RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule  } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule ,  RouterLink , RouterModule , RouterOutlet],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent {

}
