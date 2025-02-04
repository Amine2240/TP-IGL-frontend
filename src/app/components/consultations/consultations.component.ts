import { GlobalService } from './../../global.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DpiService } from './../../services/dpi.service';
import { TopRightSectionComponent } from '../top-right-section/top-right-section.component';
import { AuthService } from '../../services/auth.service';
interface DataRow {
  date: Date;
  heure: String;
  // ordonnance: string;
  // diagnostic: string;
  // resume: string;
  medecinPrincipalEmail: String;
  medecinPrincipalTelephone: String;
  hoptialNom: String;
}

interface Column {
  key: keyof DataRow;
  label: string;
}
@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
    TopRightSectionComponent,
  ],
  templateUrl: './consultations.component.html',
  styleUrl: './consultations.component.scss',
})
export class ConsultationsComponent implements OnInit {
  isMedecinVisible = true;
  medecinConnecte: any = {};
  constructor(
    private dpiService: DpiService,
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  consultations = [];
  patientId: string | null = null;
  async ngOnInit(): Promise<void> {
    this.patientId = this.route.snapshot.paramMap.get('idPatient'); // Récupérer l'ID

    try {
      this.consultations = await this.dpiService.getConsultations();
      (this.rows = this.consultations.map((consultation: any) => {
        return {
          date: consultation.date_de_consultation,
          heure: consultation.heure,
          medecinPrincipalEmail: consultation.medecin_principal.user.email,
          medecinPrincipalTelephone:
            consultation.medecin_principal.user.telephone,
          hoptialNom: consultation.hopital.nom,
        };
      })),
        console.log('consultations from component :', this.consultations);
      // this.rows = consultations; // Assuming consultations is an array of DataRow
    } catch (error) {
      console.error('Error fetching consultations:', error);
    }

    const user = this.authService.getUser();
    console.log(user);
    if (user) {
      this.medecinConnecte = user;
      console.log('User info:', this.medecinConnecte);
    } else {
      console.warn('No user is currently logged in.');
      this.router.navigate(['/login']);
    }
  }

  columns: Column[] = [
    { key: 'date', label: 'Date' },
    { key: 'heure', label: 'Heure' },
    { key: 'medecinPrincipalEmail', label: 'email medecin' },
    { key: 'medecinPrincipalTelephone', label: 'telephone medecin' },
    { key: 'hoptialNom', label: 'nom hopital' },
  ];

  rows: DataRow[] = [];

  patientData = {
    qrCode: 'assets/qrcode.png',
  };
  // Médecin connecté

  toggleMedecinInfo() {
    this.isMedecinVisible = !this.isMedecinVisible;
  }
  ajouterConsultation() {
    // this.globalService.setRedirectingPage();
    // if (this.globalService.pageToRedirect === 'pageMedecin') {
    //   // Naviguer vers '/dpi' avec l'ID en paramètre
    //   this.router.navigate(['/dpi', this.patientId]);
    // } else if (this.globalService.pageToRedirect === 'pageAdministratiff') {
    //   // Naviguer vers '/pageadminnistratif' avec l'ID en paramètre
    //   this.router.navigate(['/pageadminnistratif', this.patientId]);
    // } else if (this.globalService.pageToRedirect === 'pageInfermier') {
    //   // Naviguer vers '/ajouterSoin' sans inclure l'ID
    //   this.router.navigate(['/ajouterSoin', this.patientId]);
    // } else if (this.globalService.pageToRedirect === 'pageLaboratin') {
    //   // Naviguer vers '/ajouterSoin' sans inclure l'ID
    //   this.router.navigate(['pageLaboratin/bilan-bio-tableau', this.patientId]);
    // } else if (this.globalService.pageToRedirect === 'pageRadiologue') {
    //   // Naviguer vers '/ajouterSoin' sans inclure l'ID
    //   this.router.navigate(['pageRadiologue/bilan-radio-tableau', this.patientId]);
    // }
  }
  logout(): void {
    console.log('Médecin déconnecté');

    this.authService.logout();
    this.isMedecinVisible = false;
  }
}
