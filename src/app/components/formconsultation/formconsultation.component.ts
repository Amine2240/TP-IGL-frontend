import { DpiService } from './../../services/dpi.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Outil } from '../../models/dpi.model';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-formconsultation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
    RouterOutlet,
  ],
  templateUrl: './formconsultation.component.html',
  styleUrl: './formconsultation.component.scss',
})
export class FormconsultationComponent implements OnInit {
  public outils: Outil[] = []; // will be fetch from the backend
  public bilans: any[] = [
    {
      id: 0,
      checked: true,
      nom: 'Bilan Radiologique',
    },
    {
      id: 1,
      checked: false,
      nom: 'Bilan Biologique',
    },
  ];
  user : any;
  consultationForm: FormGroup;
  // we use constructor instead of formcontrol for clean code
  constructor(private fb: FormBuilder, private dpiService: DpiService , private authService : AuthService) {
    
    this.consultationForm = this.fb.group({
      // Date input
      date: ['', Validators.required],
      heure: ['', Validators.required],

      // Radio buttons
      bilanBool: ['', Validators.required],
      bilanChoisi: ['radiologique', Validators.required],
      resultat: ['', Validators.required],
      resume: ['', Validators.required],

      // Checkboxes
      outils: this.fb.array([], Validators.required), // Dynamically track selected items
    });

    this.consultationForm
      .get('bilanBool')
      ?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          this.consultationForm.get('bilanChoisi')?.setValue('radiologique');
        } else {
          this.consultationForm.get('bilanChoisi')?.setValue('biologique');
        }
      });
      // this.authService.loadUser();
      //  this.user = this.authService.getUser();
  }
  async ngOnInit(): Promise<void> {
    try {
      this.outils = await this.dpiService.getOutils();
      console.log('outils from backnnn', this.outils);
      
    } catch (error) {
      console.error('Error fetching outils:', error);
      
    }
  }

  onCheckboxChange(event: Event, formArrayName: string, value: Outil): void {
    const formArray = this.consultationForm.get(formArrayName) as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      formArray.push(this.fb.control(value));
      
    } else {
      const index = formArray.controls.findIndex(
        (control) => control.value === value
      );
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  onRadioboxChange(event: Event, formControlName: string): void {
    const selectedValue = (event.target as HTMLInputElement).value;
    this.consultationForm.get(formControlName)?.setValue(selectedValue);
  }

  public submitForm(): void {
    if (this.consultationForm.valid) {
      const consultationPayload = {
        dpi: 6, // it will be replaced by the dpi id of the patient that is being consulted (le choisir de la liste des patients)
        hopital: 1,
        ordonnances: [
          // {
          //   date_de_creation: '2024-12-22',
          //   prescriptions: [
          //     {
          //       medicament: {
          //         nom: 'Paracetamol',
          //       },
          //       dose: '500mg',
          //       duree: 7.0,
          //       heure: '08:00:00',
          //       nombre_de_prises: 3,
          //     },
          //   ],
          // },
        ],
        examens: [
          {
            id: 1,
            type: this.consultationForm.value.bilanChoisi,
            date: '2024-12-01',
            resultats: this.consultationForm.value.resultat,
            note: "He's gonna die",
          },
        ],
        medecins: [],
        resumes: [
          {
            symptomes: [{ symptome: 'symp1' }],
            mesures: [{ mesure: this.consultationForm.value.resume }],
          },
        ],
        outils: this.consultationForm.value.outils.map((outil: Outil) => outil.id),
        // outils: [1,2],
      };
      console.log('Payload being sent:', consultationPayload);
      
      this.dpiService.ajouterConsultation(consultationPayload);
      console.log('Form submitted!', this.consultationForm.value);
      // console.log("patient : ", this.patient);
    }
  }
  public resetForm(): void {
    this.consultationForm.reset();
  }

  public saveForm(): void {
    this.submitForm();
    this.resetForm();
  }
}
