import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  ViewChild,
  input,
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
}

interface Column {
  key: keyof DataRow;
  label: string;
}

@Component({
  selector: 'app-bilan-bio-tableau',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './bilan-bio-tableau.component.html',
  //styleUrls: ['./dpi-tableau.component.css'],
})
export class BilanBioTableauComponent implements OnInit {
  searchText: string = '';
  toggleFilterDropdown: boolean = false;
  selectedFilter: string = 'Date';
  filterBy: keyof DataRow = 'date';
  filteredData: DataRow[] = [];
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    // Combine all dependencies into one constructor
  ) {}

  id: string | null = null;

  filterableKeys: { key: keyof DataRow; label: string }[] = [
    { key: 'id', label: 'Bilan_Id' },
    { key: 'date', label: 'Date' },
  ];

  columns: Column[] = [
    { key: 'id', label: 'Bilan_Id' },
    { key: 'date', label: 'Date' },
  ];

  data: DataRow[] = [];
  /*  data: DataRow[] = [
    {
      id: '1001',
      date: '25/12/2024',
    },
    {
      id: '1002',
      date: '20/12/2024',
    },
    {
      id: '1003',
      date: '18/12/2024',
    },
    {
      id: '1004',
      date: '15/12/2024',
    },
    {
      id: '1005',
      date: '10/12/2024',
    },
    {
      id: '1006',
      date: '05/12/2024',
    },
  ];*/

  ngOnInit(): void {
    this.applySearchFilter();
    this.applyFilter();

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
    if (this.id) {
      this.fetchBilansBiologique(this.id);
    }
  }
  async fetchBilansBiologique(patientId: string): Promise<void> {
    try {
      const response = await this.authService.axiosInstance.get(
        `/dpi/examens-patient/?patient_id=${patientId}&type=biologique&traite=false`,
      );
      console.log('Response data:', response.data);

      if (response.data.length > 0) {
        this.data = response.data.map((exam: any) => ({
          id: exam.id,
          date: new Date(exam.date).toLocaleDateString(),
        }));
      } else {
        console.warn('No bilans found for the given patient.');
        this.data = [];
      }

      this.applySearchFilter();
    } catch (error) {
      console.error('Error fetching bilans:', error);
      this.data = [];
    }
  }

  onRowClick(row: any): void {
    this.router.navigate(['/visualiserBilanBiologique', row.id]);
  }

  applyFilter(): void {
    this.filteredData = [...this.data].sort((a, b) => {
      // Conversion des dates au format "jj/mm/aaaa" en objets Date pour comparer les dates
      const dateA = new Date(a.date.split('/').reverse().join('-')); // "25/12/2024" -> "2024-12-25"
      const dateB = new Date(b.date.split('/').reverse().join('-')); // "20/12/2024" -> "2024-12-20"

      // Trier par date décroissante
      return dateB.getTime() - dateA.getTime(); // Décroissant (dateB - dateA)
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
    // General classes for other columns
    return 'px-3 py-2 border-[1px] border-dark-blue text-center w-[80px] min-h-[4px]';
  }

  applySearchFilter(): void {
    this.filteredData = this.data.filter(
      (row) =>
        row.date.toLowerCase().includes(this.searchText.toLowerCase()) ||
        row.id.toLowerCase().startsWith(this.searchText.toLowerCase()), //beh nkoun sur yebda de droite a gauche
    );
  }

  isMenuOpen = false;

  onButtonClick(): void {
    console.log('am here ');
    this.router.navigate(['ajouterBilanBiologique', this.id]);
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
