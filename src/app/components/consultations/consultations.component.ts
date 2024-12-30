import { RouterLink , RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, Time  } from '@angular/common';
import { Component } from '@angular/core';
import { TopRightSectionComponent } from '../../components/top-right-section/top-right-section.component';
interface DataRow {
  date: Date;
  heure: String;
  ordonnance: string;
  diagnostic: string;
  resume: string;
}

interface Column {
  key: keyof DataRow;
  label: string;
}
@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [CommonModule ,  RouterLink , RouterModule , RouterOutlet ,TopRightSectionComponent],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent {
  isMedecinVisible: boolean = false;
  columns: Column[] = [
    { key: 'date', label: 'Date' },
    { key: 'heure', label: 'Heure' },
    { key: 'ordonnance', label: 'Ordonnance' },
    { key: 'diagnostic', label: 'Diagnostic' },
    { key: 'resume', label: 'Resume' },
  ];

  rows: DataRow[] = [
    { date: new Date(), heure: '10:00', ordonnance: 'ordonnance', diagnostic: 'diagnostic', resume: 'resume' },
    { date: new Date(), heure: '11:00', ordonnance: 'ordonnance', diagnostic: 'diagnostic', resume: 'resume' },
    { date: new Date(), heure: '12:00', ordonnance: 'ordonnance', diagnostic: 'diagnostic', resume: 'resume' },
    { date: new Date(), heure: '13:00', ordonnance: 'ordonnance', diagnostic: 'diagnostic', resume: 'resume' },
    { date: new Date(), heure: '14:00', ordonnance: 'ordonnance', diagnostic: 'diagnostic', resume: 'resume' },
  ];

  patientData = {
    qrCode: 'assets/qrcode.png',
  };
  // Médecin connecté
  medecinConnecte = {
    nom: 'Dupont',
    prenom: 'Alice',
    specialite: 'Cardiologie',
  };
  

  // Function to toggle visibility of médecin's information
  toggleMedecinInfo() {
    this.isMedecinVisible = !this.isMedecinVisible;
  }

  logout(): void {
    console.log('Médecin déconnecté');
    // Add logout logic here
  this.isMedecinVisible = false;}

}
