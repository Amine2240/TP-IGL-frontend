import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { TopRightSectionComponent } from '../../components/top-right-section/top-right-section.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AuthService } from '../../services/auth.service';
interface Antecedent {
  id: number;
  nom: string;
  type: string;
}
@Component({
  selector: 'app-historique-medicale',
  imports: [CommonModule, TopRightSectionComponent],
  templateUrl: './historique-medicale.component.html',
  styleUrl: './historique-medicale.component.scss',
})
export class HistoriqueMedicalePageComponent implements OnInit {
  patientId: string = '';
  historiqueData: any = {};
  isMedecinVisible: boolean = false;
  // Médecin connecté
  medecinConnecte = {
    nom: 'hmar',
    prenom: 'Alice',
    specialite: 'Cardiologie',
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('idPatient') || '';
    this.loadHistorique();
  }

  loadHistorique(): void {
    this.authService.axiosInstance
      .get(`/users/patients/${this.patientId}/antecedants/`)
      .then((response) => {
        const data = response.data;

        this.historiqueData = {
          historiques: data
            .filter((item: Antecedent) => item.type === 'Maladie')
            .map((item: Antecedent) => item.nom),
          interventionsChirurgicales: [],
          antecedentsFamiliaux: data
            .filter((item: Antecedent) => item.type === 'Antécédent')
            .map((item: Antecedent) => item.nom),
          allergies: data
            .filter((item: Antecedent) => item.type === 'Allergie')
            .map((item: Antecedent) => item.nom),
          vaccinations: [],
          qrCode: '../../../assets/qrCode.svg',
        };
      })
      .catch((error) => {
        console.error('Error fetching patient history:', error);
      });
  }

  // Function to toggle visibility of médecin's information
  toggleMedecinInfo() {
    this.isMedecinVisible = !this.isMedecinVisible;
  }

  // Download PDF with patient history
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

  // Add item to any section (checking for array type)
  addItem(section: keyof typeof this.historiqueData): void {
    if (Array.isArray(this.historiqueData[section])) {
    } else {
      console.error();
    }
  }

  // Logout functionality
  logout(): void {
    console.log('Médecin déconnecté');
    this.authService.logout();
    // Clear any session data here and redirect if necessary
    this.isMedecinVisible = false;
  }
}
