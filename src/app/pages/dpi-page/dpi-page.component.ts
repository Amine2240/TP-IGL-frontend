import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dpi-page',
  imports: [FormsModule, CommonModule], // Add CommonModule here
  templateUrl: './dpi-page.component.html',
  styleUrls: ['./dpi-page.component.scss'],
})
export class DpiPageComponent {
  // Define isMedecinVisible to toggle visibility of médecin's info
  isUserVisible: boolean = false;
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
  userConnecte: any = {};
  dpiId: string | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    const user = this.authService.getUser();
    console.log(user);
    if (user) {
      this.userConnecte = user;
      console.log('User info:', this.userConnecte);
    } else {
      console.warn('No user is currently logged in.');
    }
  }
  // Function to toggle visibility of médecin's information
  toggleUserInfo() {
    this.isUserVisible = !this.isUserVisible;
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
    this.isUserVisible = false;
  }

  toggleEditMode(): void {
    if (this.isEditMode) {
      // Ici, vous pouvez ajouter une logique pour sauvegarder les modifications, comme envoyer les données à un backend.
      console.log('Données sauvegardées :', this.dpiData);
    }
    this.isEditMode = !this.isEditMode;
  }

  // Fonction pour changer l'image
  onImageChange(event: any): void {
    const file = event.target.files[0]; // Récupère le fichier sélectionné
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.dpiData.photo = e.target.result; // Met à jour l'image avec le fichier choisi
      };
      reader.readAsDataURL(file); // Lis le fichier comme une URL de données
    }
  }
}
