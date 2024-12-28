import { Component , OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { TopRightSectionComponent } from '../../components/top-right-section/top-right-section.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'

@Component({
    selector: 'app-historique-medicale-page',
    imports: [CommonModule, TopRightSectionComponent],
    templateUrl: './historique-medicale-page.component.html',
    styleUrl: './historique-medicale-page.component.scss'
})
/*export class HistoriqueMedicalePageComponent implements OnInit {
  patientId: string = '';
  historiqueData: any = {};

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id') || '';
    this.loadHistorique();
  }

  loadHistorique(): void {
    this.patientService.getHistorique(this.patientId).subscribe(
      (data) => {
        this.historiqueData = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération de l’historique médical', error);
      }
    );
  }
}*/

export class HistoriqueMedicalePageComponent { 
  isMedecinVisible: boolean = false;
  historiqueData = {
    historiques: ['Diabète', 'Hypertension artérielle', 'Asthme'],
    interventionsChirurgicales: [
      'Appendicectomie (2010)',
      'Prothèse de hanche (2015)',
    ],
    antecedentsFamiliaux: [
      'Antécédents de cancer (parent proche)',
      'Diabète héréditaire',
    ],
    allergies: ['Allergie aux antibiotiques', 'Allergie au lactose'],
    vaccinations: [
      'Dernier vaccin contre la grippe (2023)',
      'Vaccin contre la COVID-19 (2021)',
    ],
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

  downloadPdf() {
    const doc = new jsPDF();

    // Capture the entire content (including QR Code and patient info)
    const content = document.getElementById('historique-page-content');

    html2canvas(content!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF document
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      doc.save('historique-info.pdf');
    });
  }
  downloadSimplePdf() {
    const doc = new jsPDF();
    doc.text('Hello, World!', 10, 10);
    doc.save('simple-test.pdf');
  }
  
  addItem(section: keyof typeof this.historiqueData): void {
    // Ensure the section corresponds to a modifiable array
    if (Array.isArray(this.historiqueData[section])) {
      const newItem = prompt(`Ajouter un nouvel élément à la section ${section}:`);
      if (newItem) {
        (this.historiqueData[section] as string[]).push(newItem);
      }
    } else {
      console.error(`Section "${section}" is not an array and cannot accept new items.`);
    }
  }
  
  logout(): void {
    console.log('Médecin déconnecté');
    // Add logout logic here
    this.isMedecinVisible = false;}
}