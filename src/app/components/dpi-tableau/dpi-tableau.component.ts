import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsQR from 'jsqr';
import { Router } from '@angular/router';
import { GlobalService } from '../../global.service';
import { PatientsService } from '../../services/patients.service';
import { Patient } from '../../models/users.model';

interface DataRow {
  id: number; // Identifiant unique pour chaque ligne
  qrCode: string;
  nom: string;
  prenom: string;
  nss: string;
  photo: string;
}
interface Column {
  key: keyof DataRow;
  label: string;
}

@Component({
  selector: 'app-dpi-tableau',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dpi-tableau.component.html',
  //styleUrls: ['./dpi-tableau.component.css'],
})
export class DpiTableauComponent implements OnInit {
  [x: string]: any;
  toggleFilterDropdown: boolean = false; // Dropdown visibility
  selectedFilter: string = 'Nom'; // Default filter label
  filterBy: keyof DataRow = 'nom'; // Default filter key
  filterableKeys: { key: keyof DataRow; label: string }[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nss', label: 'NSS' },
  ];
  @ViewChild('fileInput') fileInput: any;
  searchText: string = ''; // Store the search text

  columns: Column[] = [
    { key: 'qrCode', label: 'QrCode' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nss', label: 'NSS' },
    { key: 'photo', label: 'Photo' },
  ];

  data: DataRow[] = [];

  filteredData: DataRow[] = []; // Filtered data
  qrCodeDataset: string[] = ['12345', 'abcdef', '67890'];
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private globalService: GlobalService, // Combine all dependencies into one constructor
    private patientsService: PatientsService,
  ) {}

  onRowClick(row: any): void {
    console.log('ID de la ligne sélectionnée :', row.id); // Affiche l'ID dans la console pour debug
    this.globalService.setRedirectingPage();
    if (this.globalService.pageToRedirect === 'pageMedecin') {
      // Naviguer vers '/dpi' avec l'ID en paramètre
      this.router.navigate(['/dpi', row.id]);
    } else if (this.globalService.pageToRedirect === 'pageAdministratiff') {
      // Naviguer vers '/pageadminnistratif' avec l'ID en paramètre
      this.router.navigate(['/pageadminnistratif', row.id]);
    } else if (this.globalService.pageToRedirect === 'pageInfermier') {
      // Naviguer vers '/ajouterSoin' sans inclure l'ID
      this.router.navigate(['/ajouterSoin', row.id]);
    } else if (this.globalService.pageToRedirect === 'pageLaboratin') {
      // Naviguer vers '/ajouterSoin' sans inclure l'ID
      this.router.navigate(['pageLaboratin/bilan-bio-tableau', row.id]);
    } else if (this.globalService.pageToRedirect === 'pageRadiologue') {
      // Naviguer vers '/ajouterSoin' sans inclure l'ID
      this.router.navigate(['pageRadiologue/bilan-radio-tableau', row.id]);
    }
  }

  applyFilter(): void {
    this.filteredData = [...this.data].sort((a, b) => {
      // Vérifier si le filtre sélectionné est autre que 'id'
      if (this.filterBy === 'id') {
        return 0; // Ne pas trier par 'id'
      }

      // Tri basé sur le champ sélectionné
      return a[this.filterBy].localeCompare(b[this.filterBy]);
    });
  }

  toggleDropdown(): void {
    this.toggleFilterDropdown = !this.toggleFilterDropdown;
  }

  onFilterSelect(selected: { key: keyof DataRow; label: string }): void {
    this.filterBy = selected.key; // Update the filter key
    this.selectedFilter = selected.label; // Update the displayed label
    this.applyFilter(); // Apply the filter
    this.toggleFilterDropdown = false; // Close the dropdown
  }

  getCellClass(key: string): string {
    if (key === 'nom' || key === 'prenom') {
      // Specific classes for 'nom' and 'prenom'
      return 'px-4 py-2 border-[1px] border-dark-blue text-center break-words max-w-[150px] min-h-[4px] truncate whitespace-normal';
    } else {
      // General classes for other columns
      return 'px-3 py-2 border-[1px] border-dark-blue text-center w-[80px] min-h-[4px]';
    }
  }
  async fetchPatients(): Promise<void> {
    try {
      const patients = await this.patientsService.getPatients();
      this.data = patients.map((patient) => ({
        id: patient.patientId,
        qrCode: patient.qrCode,
        nom: patient.nom,
        prenom: patient.prenom,
        nss: patient.NSS,
        photo: patient.photoProfil,
      }));
      this.filteredData = [...this.data];
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }
  ngOnInit(): void {
    this.fetchPatients();
    this.patientsService.getPatients();
    this.applySearchFilter(); // Apply initial filter based on the search text

    // Close dropdown when clicking outside
    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.toggleFilterDropdown = false;
      }
    });
  }

  // Method to apply search filter
  applySearchFilter(): void {
    this.filteredData = this.data.filter(
      (row) =>
        // Check if the search text exists in any of the columns (nom, prenom, or nss)
        row.nom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.prenom.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.nss.toLowerCase().startsWith(this.searchText.toLowerCase()),
    );
  }

  // Method to open file input for QR Code upload
  openFileInput(): void {
    console.log('QR Code button clicked!'); // Debug log to confirm the button click
    this.fileInput.nativeElement.click(); // Programmatically click the hidden file input
  }

  // Method to handle the file selection and image upload
  onImageUpload(event: Event): void {
    console.log('Image upload initiated'); // Debug log to confirm the image upload event

    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // Get the selected file

    if (file) {
      console.log('File selected:', file); // Debug log to check the file object

      // Create a FileReader to read the image
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        this.scanQRCode(imageUrl); // Scan the QR code after loading the image
      };

      reader.readAsDataURL(file); // Read the image file as a data URL
    } else {
      console.log('No file selected'); // Log if no file was selected
    }
  }

  // Method to scan the QR code from the image and compare with the dataset
  // Method to scan the QR code from the image and compare with the dataset
  scanQRCode(imageUrl: string): void {
    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      // Create a canvas to scan the image
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);

        // Get image data from canvas
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        // Scan the QR code using jsQR
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          console.log('QR Code content:', code.data); // Log the QR code data

          // Compare the QR code content with the dataset
          const matchedData = this.data.filter(
            (row) => row.qrCode === code.data,
          );

          if (matchedData.length > 0) {
            console.log('Match found:', code.data); // If a match is found
            this.filteredData = matchedData; // Update filtered data
          } else {
            console.log('No result found'); // If no match is found
            this.filteredData = []; // Clear filtered data to make the table empty
          }
        } else {
          console.log('No QR code detected in the image'); // If no QR code is detected
          this.filteredData = []; // Clear filtered data if no QR code is detected
        }
      }
    };
  }
}
