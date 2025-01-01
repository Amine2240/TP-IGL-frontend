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
import { ActivatedRoute, Router } from '@angular/router';


interface DataRow {
  idBilan:number;
  date: string;
  type: string;
  statut: string;
  actions: string;
  graphique: string;
}

interface Column {
  key: keyof DataRow;
  label: string;
}

@Component({
  selector: 'app-visualisation-bilan-patient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './visualisation-bilan-patient.component.html',
})
export class VisualisationBilanPatientComponent implements OnInit {
  toggleFilterDropdown: boolean = false;
  selectedFilter: string = 'Date';
  filterBy: keyof DataRow = 'date';
  filteredData: DataRow[] = [];
  searchText: string = '';

  columns: Column[] = [
  
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type de Bilan' },
    { key: 'statut', label: 'Statut' },
    { key: 'actions', label: 'Actions' },
    { key: 'graphique', label: 'Graphique' },
  ];

  data: DataRow[] = [
    {
      idBilan: 1, // Identifiant unique
      date: '25/12/2024',
      type: 'Biologique',
      statut: 'Traité',
      actions: '',
      graphique: '',
    },
    {
      idBilan: 2, // Identifiant unique
      date: '20/12/2024',
      type: 'Radiologique',
      statut: 'Traité',
      actions: '',
      graphique: '',
    },
    {
      idBilan: 3, // Identifiant unique
      date: '18/12/2024',
      type: 'Biologique',
      statut: 'En attente',
      actions: '',
      graphique: '',
    },
    {
      idBilan: 4, // Identifiant unique
      date: '15/12/2024',
      type: 'Radiologique',
      statut: 'En attente',
      actions: '',
      graphique: '',
    },
  ];
  
  onDownload(row: DataRow): void {
    console.log('Download clicked for:', row);
    // Implement the download functionality here
  }

  onViewResults(row: DataRow): void {
    console.log('View Results clicked for:', row);
    if(row.type.toLocaleLowerCase() =='biologique'){
      this.router.navigate(['/visualiserBilanBiologique',row.idBilan])
    }
    else {
     
        this.router.navigate(['/visualiserBilanRadiologique',row.idBilan])
      }
    }
  

  onViewGraph(row: DataRow): void {
    console.log('View Graph clicked for:', row);
   this.router.navigate(['/pageGraphics',row.idBilan])
  }
  

  filterableKeys: { key: keyof DataRow; label: string }[] = [
    { key: 'date', label: 'Date' },
    { key: 'type', label: 'Type' },
    { key: 'statut', label: 'Statut' },
  ];

  @ViewChild('fileInput') fileInput: any;
  elementRef: any;

  constructor(private renderer: Renderer2, private el: ElementRef,private route: ActivatedRoute,private router :Router) {
    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.toggleFilterDropdown = false;
      }
    });
    
  }
  
  idPatient: string | null = null;
  
 
  ngOnInit(): void {
    this.applySearchFilter(); // Apply the search filter first
    this.applyFilter(); 

    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedInside = this.el.nativeElement.contains(event.target);
      if (!clickedInside) {
        this.toggleFilterDropdown = false;
      }
    });
    this.idPatient = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID
  console.log('ID reçu dans sideBar :', this.idPatient);
  }
  isMenuOpen = false;
  
   
  
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
      // Add logout logic here
    }
  
    // Close the menu if clicked outside of the menu and button
    
    
    onRowClick(row: any): void {
      console.log('ID de la ligne sélectionnée :', row.id); // Affiche l'ID dans la console pour debug
    
      if (row.type.toLowerCase.equals("biologique")) {
        // Naviguer vers '/dpi' avec l'ID en paramètre
        this.router.navigate(['/visualiserBilanBiologique', row.id]);
      } else  
      {this.router.navigate(['/visualiserBilanBiologique', row.id]);
      }
    }

    applyFilter(): void {
      this.filteredData = [...this.data].sort((a, b) => {
        // Exclude 'idBilan' from sorting
       
    
        if (this.filterBy === 'date') {
          const dateA = new Date(a[this.filterBy]);
          const dateB = new Date(b[this.filterBy]);
          return dateB.getTime() - dateA.getTime(); // Tri décroissant
        }
    
        // Exclure 'idBilan' du tri
        if (this.filterBy === 'idBilan') {
          return 0;
        }
    
        const valueA = a[this.filterBy];
        const valueB = b[this.filterBy];
    
        // Si les valeurs sont des nombres, trier numériquement
        if (typeof valueA === 'number' && typeof valueB === 'number') {
          return valueB - valueA; // Tri décroissant pour les nombres
        }
    
        // Sinon, trier par chaîne de caractères
        return String(valueB).localeCompare(String(valueA)); // Tri décroissant pour les chaînes
      });
    }
    

  toggleDropdown(): void {
    this.toggleFilterDropdown = !this.toggleFilterDropdown;
  }

  onFilterSelect(selected: { key: keyof DataRow; label: string }): void {
    this.filterBy = selected.key;
    this.selectedFilter = selected.label;
    this.applyFilter();
    this.toggleFilterDropdown = false;
  }

  applySearchFilter(): void {
    this.filteredData = this.data.filter((row) => {
      const searchTextLower = this.searchText.toLowerCase();
      return (
        row.date.toLowerCase().includes(searchTextLower) ||
        row.type.toLowerCase().includes(searchTextLower) ||
        row.statut.toLowerCase().includes(searchTextLower)
      );
    });
  }

  getCellClass(key: string): string {
    if (key === 'actions' || key === 'graphique') {
      return 'px-4 py-2 border-[1px] border-dark-blue text-center break-words max-w-[150px] truncate whitespace-normal';
    } else {
      return 'px-3 py-2 border-[1px] border-dark-blue text-center';
    }
  }
}
