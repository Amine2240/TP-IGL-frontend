import { Component } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import {
  FormBuilder,
  // FormGroup,
  FormsModule,
  // ReactiveFormsModule,
  // Validators,
} from '@angular/forms';
import { DpiService } from '../../services/dpi.service';

interface DataRow {
  medicament: string;
  duree: number; // decimal
  dose: String;
  nbrPrises: number; //integer
  disabled: boolean;
}

interface Column {
  key: keyof DataRow;
  label: string;
}
@Component({
  selector: 'app-ordonnance',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './ordonnance.component.html',
  styleUrl: './ordonnance.component.scss',
})
export class OrdonnanceComponent {
  user: any;
  // prescriptionForm: FormGroup;
  constructor(
    // private fb: FormBuilder,
    private authService: AuthService,
    private dpiService: DpiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authService.loadUser();
    this.user = this.authService.getUser();
    // this.prescriptionForm = this.fb.group({
    //   medicament: ['', Validators.required],
    //   duree: ['', Validators.required], // decimal
    //   dose: ['', Validators.required],
    //   nbrPrises: ['', Validators.required], //integer
    // });
  }
  downloadSection(): void {
    const section = document.getElementById('sectionToDownload') as HTMLElement;

    // Use html2canvas to capture the section
    html2canvas(section).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Create a PDF instance
      const pdf = new jsPDF();

      // Get page dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Scale image to fit the page
      const imgWidth = canvas.width / 6; // Adjust scale as needed
      const imgHeight = canvas.height / 5;

      const x = (pdfWidth - imgWidth) / 2; // Center horizontally
      const y = 10; // Add top margin

      // Add the image to the PDF
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('section-download.pdf');
    });
  }
  nivagationToFormConsultation() {
    this.dpiService.setlistOfPrescriptions(this.rows);
    alert('Ordonnance enregistrée');
    this.router.navigate(['../../'] , {relativeTo: this.route});
  }

  columns: Column[] = [
    { key: 'medicament', label: 'Médicament' },
    { key: 'duree', label: 'Durée' },
    { key: 'dose', label: 'Dose' },
    { key: 'nbrPrises', label: 'Nombre de prises' },
  ];

  rows: DataRow[] = [
    {
      medicament: '',
      duree: 0,
      dose: '',
      nbrPrises: 0,
      disabled: false,
    },
  ];
  ajouterPrescription() {
    if (
      this.rows.length > 0 &&
      // they all have to be filled
      (this.rows[this.rows.length - 1].medicament === '' ||
        this.rows[this.rows.length - 1].duree === 0 ||
        this.rows[this.rows.length - 1].dose === '' ||
        this.rows[this.rows.length - 1].nbrPrises === 0)
    ) {
      return;
    }
    this.rows.map((row) => {
      row.disabled = true;
    });
    this.rows.push({
      medicament: '',
      duree: 0,
      dose: '',
      nbrPrises: 0,
      disabled: false,
    });

    console.log('rows : ', this.rows);
  }

  saveForm() {}
}
