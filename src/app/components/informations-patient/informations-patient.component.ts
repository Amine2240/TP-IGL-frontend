import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DpiService } from '../../services/dpi.service';
import { AuthService } from '../../services/auth.service';

interface ContactUrgence {
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
}

interface infosPatient {
  dpiId: number;
  dateCreation: string;
  nom: string;
  prenom: string;
  dateDeNaissance: string;
  adresse: string;
  NSS: string;
  telephone: string;
  mutuelle: string;
  // numeroIdentification: string;
  contact_urgence: ContactUrgence;
  // qrCode: string;
  // photo: string;
}
@Component({
  selector: 'app-informations-patient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './informations-patient.component.html',
  styleUrl: './informations-patient.component.scss',
})
// si le patient qui accede à informations patient, utilise lid de
// // this.authService.loadUser();
//  this.user = this.authService.getUser();
// si le medecin accede utilise lid du patient qui eu à partir de la liste des patients (dans la page patients)

// there is no put method in the dpi backend so for now the component renders the infos of the patient
export class InformationsPatientComponent implements OnInit {
  // Données du patient
  infosPatient: any = {};
  patientId: string | null = null;
  constructor(
    private dpiService: DpiService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}
  async ngOnInit(): Promise<void> {
    this.patientId = this.route.snapshot.paramMap.get('idPatient'); // Récupérer l'ID

    try {
      this.authService.loadUser();
      const user = this.authService.getUser();
      // this.infosPatient = await this.dpiService.getDpi(); does not contain the all information like photo..
      if (user.role === 'patient') {
        console.log('user.roleId', user.roleId);

        this.infosPatient = await this.dpiService.getPatient(user.roleId);
        console.log('infosPatient', this.infosPatient);

        const infosAajouter = await this.dpiService.getDpi(user.roleId); // contact urgence et mutuelle
        this.infosPatient = {
          ...this.infosPatient,
          contact_urgence: infosAajouter.contact_urgence,
          mutuelle: infosAajouter.mutuelle,
        };
      }
      if (user.role != 'patient') {
        // get the id from list patients (roleId), 15 is just an example
        this.infosPatient = await this.dpiService.getPatient(this.patientId);
        const infosAajouter = await this.dpiService.getDpi(this.patientId); // contact urgence et mutuelle
        this.infosPatient = {
          ...this.infosPatient,
          contact_urgence: infosAajouter.contact_urgence,
          mutuelle: infosAajouter.mutuelle,
        };
      }

      console.log('informationsPatient from component :', this.infosPatient);
      // this.rows = consultations; // Assuming consultations is an array of DataRow
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }
  }

  // Define isMedecinVisible to toggle visibility of médecin's info
  isMedecinVisible: boolean = false;
  isEditMode = false;

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
    const content = document.getElementById('dpi-page-content');

    html2canvas(content!).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add the image to the PDF document
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      doc.save('patient-info.pdf');
    });
  }
  downloadSimplePdf() {
    const doc = new jsPDF();
    doc.text('Hello, World!', 10, 10);
    doc.save('simple-test.pdf');
  }

  logout(): void {
    console.log('Médecin déconnecté');
    this.authService.logout();
    this.isMedecinVisible = false;
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      // Ici, vous pouvez ajouter une logique pour sauvegarder les modifications, comme envoyer les données à un backend.
      console.log('Données sauvegardées :', this.infosPatient);
    }
    this.isEditMode = !this.isEditMode;
  }

  // Fonction pour changer l'image
  onImageChange(event: any): void {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        //  this.infosPatient.photo = e.target.result; // Met à jour l'image avec le fichier choisi
      };
      reader.readAsDataURL(file); // Lis le fichier comme une URL de données
    }
  }
}
