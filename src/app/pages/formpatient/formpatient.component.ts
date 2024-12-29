import { DpiService } from './../../services/dpi.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder , private dpiservice : DpiService) {
    this.patientForm = this.fb.group({
      // Text inputs
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],

      // Date input
      dateNaissance: ['', Validators.required],

      // Number inputs
      nss: ['', [Validators.required, Validators.min(1)]],
      telephone: ['', [Validators.required]],
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
      personneAconntacterEmail: ['', Validators.required],
      
      photoPatient : [''],
      // codeqr : ['', Validators.required]
    });
  }

  

  public submitForm(): void {
    if (this.patientForm.valid) {
      const dpiPayload = { // so it will matches the dpi patient serializer
        patient: {
          user : {
            nom: this.patientForm.value.nom,
          prenom: this.patientForm.value.prenom,
          date_naissance: this.patientForm.value.dateNaissance,
          email: this.patientForm.value.adresse,
          telephone: this.patientForm.value.telephone,
          photo_profil:"https://example.com/profile.jpg", 
          role : "patient",
          // num_identification: this.patientForm.value.numIdentification, // Add if required
          // vaccine: this.patientForm.value.vaccine, // Add if required
          // sous_traitement: this.patientForm.value.sousTraitement, 

          },
          NSS: this.patientForm.value.nss, 
        },

        contact_urgence: {
          nom: this.patientForm.value.personneAconntacterNom,
          prenom: this.patientForm.value.personneAconntacterPrenom,
          telephone: this.patientForm.value.personneAconntacterTelephone,
          email : this.patientForm.value.personneAconntacterEmail
        },
        hopital_initial_id: 1, // Replace this with the correct hospital ID
        mutuelle: this.patientForm.value.mutuelle,
        antecedants: [
          ...this.patientForm.value.allergies,
          ...this.patientForm.value.interventions,
          ...this.patientForm.value.maladies
        ],
      };
      console.log('dpiPayload' , dpiPayload);
      
      this.dpiservice.postDpi(dpiPayload);

      console.log('Form submitted!', this.patientForm.value);
      // console.log("patient : ", this.patient);
      
    }
  }
  public resetForm(): void {
    this.patientForm.reset();
  }

  public saveForm(): void {
    this.submitForm();
    // this.resetForm();
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

  onCheckboxChange(event: Event, formArrayName: string, value: Item | Allergie | Maladie | Item2): void {
    const formArray = this.patientForm.get(formArrayName) as FormArray;
    const isChecked = (event.target as HTMLInputElement).checked;

    // Prepare the antecedent object structure
    let antecedent = {
        nom: 'label' in value ? value.label : value.nom,  // The label is the 'nom' or 'label'
        type: ''           // The type will be determined below
    };

    // Handle different formArrayNames and map to correct type
    if (formArrayName === 'allergies') {
        // Define the allergy type based on the list
        antecedent.type = 'Allergie';  // allergy's type is its parent name (nom)
    }
    else if (formArrayName === 'maladies') {
        // Define the maladie type
        antecedent.type = 'Maladie';
    }
    else if (formArrayName === 'interventions') {
        // Define the intervention type
        antecedent.type = 'Intervention';
    }

    // If the checkbox is checked, add the antecedent to the formArray, otherwise remove it
    if (isChecked) {
        formArray.push(this.fb.control(antecedent));
    } else {
        const index = formArray.controls.findIndex(control => 
            control.value.nom === antecedent.nom && control.value.type === antecedent.type
        );
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
