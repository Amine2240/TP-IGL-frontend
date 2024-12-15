import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formpatient',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formpatient.component.html',
  styleUrl: './formpatient.component.scss'
})
export class FormpatientComponent {
  public soustraitementList = [
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
  constructor() {
    this.soustraitementList[1].checked = !this.soustraitementList[0].checked;
  }
  public maladiesList = [
    {
      id :0,
      checked : false,
      label: 'Diabète'
    },
    {
      id :1,
      checked : false,
      label: 'Hypertension'
    },
    {
      id :2,
      checked : false,
      label: 'Asthme'
    },
    {
      id :3,
      checked : false,
      label: 'Cancer'
    },
    {
      id : 4,
      
      checked : false,
      label : 'Arthrite'
    },
    {
      id :5,
      checked : false,
      label: 'Métabolisme'
    },
    {
      id :6,
      checked : false,
      label: 'Autre'
    }
  ]
  public allergiesList = [
    {
      id : 0,
      nom : "alergie aux médicaments",
      list : [
        {
          id : 0,
          
          checked : false,
          label : "Penicilline",

        },
        {
          id : 1,
          
          checked : false,
          label : "Aspirine",

        },
        {
          id : 2,
          
          checked : false,
          label : "Penicilline",

        },
        
        
      ]
    },
    {
      id : 1,
      nom : "alergie alimentaire",
      list : [
        {
          id : 0,
          
          checked : false,
          label : "Fruits de mer",

        },
        {
          id : 1,
          
          checked : false,
          label : "Noix",

        },
        {
          id : 2,
          
          checked : false,
          label : "Lait",

        },
        
        
      ] 
    },
    {
      id : 2,
      nom : "alergie environnementale",
      list : [
        {
          id : 0,
          
          checked : false,
          label : "Pollen",

        },
        {
          id : 1,
          
          checked : false,
          label : "Poussière",

        },
        {
          id : 2,
          
          checked : false,
          label : "Moisissure",

        },
      ]
    }
  ]

  public interventionsList = [
    {
      id : 0,
      
      checked : false,
      label : "Chirurgie cardiaque",
    },
    {
      id : 1,
      
      checked : false,
      label : "Chirurgie orthopédique",
    },
    {
      id : 2,
      
      checked : false,
      label : "Chirurgie abdominale",
    },
    {
      id : 3,
      
      checked : false,
      label : "Autre",
    }
  ]

  public vaccinationsList = [
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
  public patient = {
    nom: '',
    prenom: '',
    dateNaissance: '',
    adresse: '',
    telephone: '',
    email: '',
    soustraitement: '',
    nomMedecin: '',
    prenomMedecin: '',
    adresseMedecin: '',
    telephoneMedecin: '',
    emailMedecin: '',
  }
  public submitForm(): void {
    console.log(this.patient);
  }
  public resetForm(): void {
    this.patient = {
      nom: '',
      prenom: '',
      dateNaissance: '',
      adresse: '',
      telephone: '',
      email: '',
      soustraitement: '',
      nomMedecin: '',
      prenomMedecin: '',
      adresseMedecin: '',
      telephoneMedecin: '',
      emailMedecin: '',
    }
  }
  public cancelForm(): void {
    this.resetForm();
  }
  public saveForm(): void {
    this.submitForm();
    this.resetForm();
  }


  photoPatientPreview: string | ArrayBuffer | null = null; // Holds the image preview URL or data URL
  photoCodeQrPreview: string | ArrayBuffer | null = null; // Holds the image preview URL or data URL

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
          
        }
        if (type == 'codeQr') {
          this.photoCodeQrPreview = reader.result;
          
        }

        
      };
      reader.readAsDataURL(file);
    }
  }


}
