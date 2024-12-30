import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../global.service';
import { Router } from '@angular/router';

interface Item {
  id : number;
  checked : boolean;
  label: string;
}

interface Item2 {
  id : number;
  
  label: string;
}

interface Maladie {
  id : number;

  label: string;
}

interface AllergieType {
  id : number;

  label: string;
}

interface Allergie {
  id : number;
  nom: string;
  list: AllergieType[];
}
@Component({
  selector: 'app-formpatient',
  standalone: true,
  imports: [CommonModule , FormsModule , ReactiveFormsModule],
  templateUrl: './formpatient.component.html',
  styleUrl: './formpatient.component.scss'
})


export class FormpatientComponent {
  
  public soustraitementList : Item[] = [
    {
      id :0,
      checked : true,
      label: 'Oui'
    },
    {
      id :1,
      checked : false,
      label: 'Non'
    }
  ]

  public maladiesList : Maladie[] = [
    {
      id :0,
    
      label: 'Diabète'
    },
    {
      id :1,
    
      label: 'Hypertension'
    },
    {
      id :2,
    
      label: 'Asthme'
    },
    {
      id :3,
    
      label: 'Cancer'
    },
    {
      id : 4,
      
    
      label : 'Arthrite'
    },
    {
      id :5,
    
      label: 'Métabolisme'
    },
    {
      id :6,
    
      label: 'Autre'
    }
  ]
  public allergiesList : Allergie[] = [
    {
      id : 0,
      nom : "allergie aux médicaments",
      list : [
        {
          id : 0,
          
        
          label : "Penicilline",

        },
        {
          id : 1,
          
        
          label : "Aspirine",

        },
        {
          id : 2,
          
        
          label : "Penicilline",

        },
        
        
      ]
    },
    {
      id : 1,
      nom : "allergie alimentaire",
      list : [
        {
          id : 0,
          
        
          label : "Fruits de mer",

        },
        {
          id : 1,
          
        
          label : "Noix",

        },
        {
          id : 2,
          
        
          label : "Lait",

        },
        
        
      ] 
    },
    {
      id : 2,
      nom : "allergie environnementale",
      list : [
        {
          id : 0,
          
        
          label : "Pollen",

        },
        {
          id : 1,
          
        
          label : "Poussière",

        },
        {
          id : 2,
          
        
          label : "Moisissure",

        },
      ]
    }
  ]

  public interventionsList :Item2[] = [
    {
      id : 0,
      
    
      label : "Chirurgie cardiaque",
    },
    {
      id : 1,
      
    
      label : "Chirurgie orthopédique",
    },
    {
      id : 2,
      
    
      label : "Chirurgie abdominale",
    },
    {
      id : 3,
      
    
      label : "Autre",
    }
  ]

  public vaccinationsList : Item[] = [
    {
      id : 0,
      
    checked : true,
      label : "Oui",
    },
    {
      id : 1,
      
      checked : false,
      label : "Non",
    }
  ]
public perosonneAcontacter = {
    nom : "",
    prenom : '',
    telephone : 0
  }
  patientForm: FormGroup;
  // we use constructor instead of formcontrol for clean code 
  constructor(private fb: FormBuilder,private router: Router, private globalService: GlobalService  ) {
    this.patientForm = this.fb.group({
      // Text inputs
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],

      // Date input
      dateNaissance: ['', Validators.required],

      // Number inputs
      nss: ['', [Validators.required, Validators.min(1)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      numIdentification: ['', Validators.required],

      mutuelle: ['', Validators.required],

      // Radio buttons
      sousTraitement: ['', Validators.required],
      vaccine: ['', Validators.required],

      // Checkboxes
      maladies: this.fb.array([]), // Dynamically track selected items
      allergies: this.fb.array([]), 
      interventions: this.fb.array([]),
      

      personneAconntacterNom: ['', Validators.required],
      personneAconntacterPrenom: ['', Validators.required],
      personneAconntacterTelephone: ['', Validators.required],
      
      photoPatient : ['', Validators.required],
      // codeqr : ['', Validators.required]
    });
  }

 
  
  public submitForm(): void {
    if (this.patientForm.valid) {
      console.log('Form submitted!', this.patientForm.value);
     
        // Use the global variable from GlobalService to determine the route
        console.log(this.globalService.pageToRedirect);
        if (this.globalService.pageToRedirect === 'pageMedecin') {
          this.router.navigate(['/dpi']);
        } else {
          this.router.navigate(['/pageadminnistratif']);
        }
      }
      // console.log("patient : ", this.patient);
      
    }
  
  public resetForm(): void {
    this.patientForm.reset();
  }

  public saveForm(): void {
    this.submitForm();
    this.resetForm();
  }


  photoPatientPreview: string | ArrayBuffer | null = null; // Holds the image preview URL or data URL
  // photoCodeQrPreview: string | ArrayBuffer | null = null; // Holds the image preview URL or data URL

  // Handle file selection
  onFileSelected(event: Event , type : "patient" | "codeQr") {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files && fileInput.files[0]) {
      const file = fileInput.files[0];

      // Check file type (optional)
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        if (type == 'patient') {
          this.photoPatientPreview = reader.result;
          // this.patient.photo = this.photoPatientPreview;
          this.patientForm.get('photoPatient')?.setValue(this.photoPatientPreview);

          
        }
        // if (type == 'codeQr') {
        //   this.photoCodeQrPreview = reader.result;
        //   // this.patient.codeqr = this.photoCodeQrPreview;
        //   this.patientForm.get('codeqr')?.setValue(this.photoCodeQrPreview);
          
        // }

        
      };
      reader.readAsDataURL(file);
    }
  }

  // public patient = {
  //   id : 0,
  //   nom: '',
  //   prenom: '',
  //   dateNaissance: Date,
  //   nss : 0 , 
  //   adresse : '',
  //   telephone : 0,
  //   mutuelle : "",
  //   numIdentification : 0,
  //   personneAconntacter : this.perosonneAcontacter,
  //   sousTraitement : false,
  //   maladies  : [] as Maladie[],
  //   allergies : [] as AllergieType[],
  //   interventions : [] as Item[],
  //   vaccine : false,
  //   photo : this.photoPatientPreview,
  //   codeqr : this.photoCodeQrPreview
  // } 

  onCheckboxChange(event: Event, formArrayName: string, value: Allergie | Maladie | Item): void {
    const formArray = this.patientForm.get(formArrayName) as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      formArray.push(this.fb.control(value));
    } else {
      const index = formArray.controls.findIndex((control) => control.value === value);
      if (index !== -1) {
        formArray.removeAt(index);
      }
    }
  }

  onRadioboxChange(event: Event, formControlName: string): void {
    const selectedValue = (event.target as HTMLInputElement).value;
    this.patientForm.get(formControlName)?.setValue(selectedValue);
  }

}
