import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas'
import { SidebarComponent } from "../../components/sidebar/sidebar.component"; // Correct import

@Component({
  selector: 'app-dpi-page',
  standalone: true,
  imports: [CommonModule, SidebarComponent],  // Add CommonModule here
  templateUrl: './dpi-page.component.html',
  styleUrls: ['./dpi-page.component.scss']
})
export class DpiPageComponent {
  // Define isMedecinVisible to toggle visibility of médecin's info
  isMedecinVisible: boolean = false;

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
  
}
