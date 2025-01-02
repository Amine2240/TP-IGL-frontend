import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import jsQR from 'jsqr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../global.service';
import { AuthService } from '../../services/auth.service';

interface DataRow {
  id: string;
  date: string;
  observation: string;
}

interface Column {
  key: keyof DataRow;
  label: string;
}

@Component({
  selector: 'app-bilan-radio-tableau',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './bilan-radio-tableau.component.html',
  //styleUrls: ['./dpi-tableau.component.css'],
})
export class BilanRadioTableauComponent implements OnInit {
  toggleFilterDropdown: boolean = false;
  selectedFilter: string = 'Date';
  filterBy: keyof DataRow = 'date';
  filteredData: DataRow[] = [];
  isMenuOpen = false;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute, // Combine all dependencies into one constructor
  ) {}
  filterableKeys: { key: keyof DataRow; label: string }[] = [
    { key: 'id', label: 'Bilan_Id' },
    { key: 'date', label: 'Date' },
  ];
  @ViewChild('fileInput') fileInput: any;
  searchText: string = '';

  columns: Column[] = [
    { key: 'id', label: 'Bilan_Id' },
    { key: 'date', label: 'Date' },
    { key: 'observation', label: 'Observation' },
  ];

  data: DataRow[] = [
    {
      id: '1001',
      date: '25/12/2024',
      observation: 'All parameters are within the normal range.',
    },
    {
      id: '1002',
      date: '20/12/2024',
      observation: 'Slightly elevated levels observed.',
    },
    {
      id: '1003',
      date: '18/12/2024',
      observation: 'Requires further analysis for confirmation.',
    },
    {
      id: '1004',
      date: '15/12/2024',
      observation: 'No significant findings.',
    },
    {
      id: '1005',
      date: '10/12/2024',
      observation: 'Follow-up suggested for specific tests.',
    },
    {
      id: '1006',
      date: '05/12/2024',
      observation: 'Data inconclusive, retesting recommended.',
    },
  ];

  id: string | null = null;

  onButtonClick(): void {
    console.log('am here ');
    this.router.navigate(['ajouterBilanRadiologique', this.id]);
  }

  onRowClick(row: any): void {
    this.router.navigate(['/visualisationBilanRadiologique', row.id]);
  }

  applyFilter(): void {
    this.filteredData = [...this.data].sort((a, b) =>
      a[this.filterBy].localeCompare(b[this.filterBy]),
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
    if (key === 'observation') {
      // Specific classes for 'nom' and 'prenom'
      return 'px-4 py-2 border-[1px] border-dark-blue text-center break-words max-w-[150px] min-h-[4px] truncate whitespace-normal';
    } else {
      // General classes for other columns
      return 'px-3 py-2 border-[1px] border-dark-blue text-center w-[80px] min-h-[4px]';
    }
  }

  ngOnInit(): void {
    this.applySearchFilter();

    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.elementRef.nativeElement.contains(
        event.target,
      );
      if (!clickedInside) {
        this.toggleFilterDropdown = false;
      }
    });
    this.id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
    console.log('ID reçu :', this.id);
  }

  applySearchFilter(): void {
    this.filteredData = this.data.filter(
      (row) =>
        row.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.id.toLowerCase().startsWith(this.searchText.toLowerCase()), //beh nkoun sur yebda de droite a gauche
    );
  }

  toggleMenu(event: MouseEvent) {
    console.log('rami maftoha');
    event.stopPropagation();
    this.isMenuOpen = !this.isMenuOpen;
    console.log('rami ta8la9t');
  }

  profil() {
    console.log('Navigating to profile...');
    // Add profile navigation logic here
  }

  logout() {
    console.log('Logging out...');
    this.authService.logout();
  }

  // Close the menu if clicked outside of the menu and button
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.isMenuOpen = false;
    }
  }
}
