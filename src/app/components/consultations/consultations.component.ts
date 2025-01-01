import { RouterLink , RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, Time  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DpiService } from './../../services/dpi.service';
import { TopRightSectionComponent } from '../top-right-section/top-right-section.component';
interface DataRow {
  date: Date;
  heure: String;
  // ordonnance: string;
  // diagnostic: string;
  // resume: string;
  medecinPrincipalEmail : String;
  medecinPrincipalTelephone : String;
  hoptialNom : String; 
}


interface Column {
  key: keyof DataRow;
  label: string;
}
@Component({
    selector: 'app-consultations',
    standalone: true,
    imports: [CommonModule, RouterLink, RouterModule, RouterOutlet,TopRightSectionComponent],
    templateUrl: './consultations.component.html',
    styleUrl: './consultations.component.scss'
})
export class ConsultationsComponent implements OnInit {
  isMedecinVisible =true;
  constructor(private dpiService: DpiService,) {
  }
  consultations = [];
  async ngOnInit(): Promise<void> {
    console.log("hiiiiii");
  
    try {
      
       this.consultations = await this.dpiService.getConsultations();
       this.rows = this.consultations.map((consultation: any) => {
        return {
          date: consultation.date_de_consultation,
          heure: consultation.heure,
          medecinPrincipalEmail: consultation.medecin_principal.user.email,
          medecinPrincipalTelephone: consultation.medecin_principal.user.telephone,
          hoptialNom: consultation.hopital.nom,
        };
      }),
      console.log('consultations from component :', this.consultations);
      // this.rows = consultations; // Assuming consultations is an array of DataRow
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  }
  
  columns: Column[] = [
    { key: 'date', label: 'Date' },
    { key: 'heure', label: 'Heure' },
    { key: 'medecinPrincipalEmail', label: 'email medecin' },
    { key: 'medecinPrincipalTelephone', label: 'telephone medecin' },
    { key: 'hoptialNom', label: 'nom hopital' },
  ];

  rows: DataRow[] = [];

  patientData = {
    qrCode: 'assets/qrcode.png',
  };
  // Médecin connecté
  medecinConnecte = {
    nom: 'Dupont',
    prenom: 'Alice',
    specialite: 'Cardiologie',
  };
  

  
  toggleMedecinInfo() {
    this.isMedecinVisible = !this.isMedecinVisible;
  }

  logout(): void {
    console.log('Médecin déconnecté');
    // Add logout logic here
  this.isMedecinVisible = false;}

}
