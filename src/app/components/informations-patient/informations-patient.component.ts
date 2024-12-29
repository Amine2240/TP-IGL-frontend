import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
    selector: 'app-informations-patient',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './informations-patient.component.html',
    styleUrl: './informations-patient.component.scss'
})
export class InformationsPatientComponent {
  // Define isMedecinVisible to toggle visibility of médecin's info
  isMedecinVisible: boolean = false;
  isEditMode = false;
  // Données du patient
  dpiData = {
    nom: 'Dupont',
    prenom: 'Jean',
    dateNaissance: '1990-01-01',
    adresse: '123 Rue Exemple',
    nss: '123456789',
    telephone: '0612345678',
    mutuelle: 'Exemple Mutuelle',
    numeroIdentification: 'ABC123',
    contact: {
      nom: 'Contact Nom',
      prenom: 'Contact Prénom',
      telephone: '0612345678',
    },
    qrCode: 'assets/qrcode.png',
    photo: 'assets/photo-patient.png',
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
    // Add logout logic here
    this.isMedecinVisible = false;}

    toggleEditMode(): void {
      if (this.isEditMode) {
        // Ici, vous pouvez ajouter une logique pour sauvegarder les modifications, comme envoyer les données à un backend.
        console.log('Données sauvegardées :', this.dpiData);
      }
      this.isEditMode = !this.isEditMode;
    }

    // Fonction pour changer l'image
  onImageChange(event: any): void {
    const file = event.target.files[0];  // Récupère le fichier sélectionné
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dpiData.photo = e.target.result;  // Met à jour l'image avec le fichier choisi
      };
      reader.readAsDataURL(file);  // Lis le fichier comme une URL de données
    }}


}
