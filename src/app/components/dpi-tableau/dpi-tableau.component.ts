import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DataRow {
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
  imports: [CommonModule],
  templateUrl: './dpi-tableau.component.html',
  styleUrls: ['./dpi-tableau.component.css'],
})
export class DpiTableauComponent implements OnInit {
  toggleFilterDropdown: boolean = false; // Dropdown visibility
  selectedFilter: string = 'Nom'; // Default filter label
  filterBy: keyof DataRow = 'nom'; // Default filter key
  filterableKeys: { key: keyof DataRow; label: string }[] = [
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nss', label: 'NSS' },
  ]; 

  columns: Column[] = [
    { key: 'qrCode', label: 'QrCode' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nss', label: 'NSS' },
    { key: 'photo', label: 'Photo' },
  ];

  data: DataRow[] = [
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'Lorem ',
      prenom: 'Ipsum',
      nss: '123456789012',
      photo: '../../../assets/account.svg',
    },
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'Dolor Sit',
      prenom: 'eeeeeeeeeeeeeeeeAmet',
      nss: '987654321098',
      photo: '../../../assets/account.svg',
    },
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'Consectetur',
      prenom: 'zzzzzzzzzzzzzAdipiscing',
      nss: '567890123456',
      photo: '../../../assets/account.svg',
    },
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'Lorem ddddddddddddddderrahmane',
      prenom: 'Ipsum',
      nss: '123456789012',
      photo: '../../../assets/account.svg',
    },
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'aaConsectetur',
      prenom: 'zzzzzzzzzzzAdipiscing',
      nss: '567890123456',
      photo: '../../../assets/account.svg',
    },
    {
      qrCode: '../../../assets/qrCode.svg',
      nom: 'Consectetur',
      prenom: 'zzzzAdipiscing',
      nss: '567890123456',
      photo: '../../../assets/account.svg',
    },
  ];

  filteredData: DataRow[] = []; // Filtered data

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.applyFilter(); // Apply default filter

    // Close dropdown when clicking outside
    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.toggleFilterDropdown = false;
      }
    });
  }

  applyFilter(): void {
    this.filteredData = [...this.data].sort((a, b) =>
      a[this.filterBy].localeCompare(b[this.filterBy])
    );
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
}
