import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Outil } from '../../models/dpi.model';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-formconsultation',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, RouterModule, RouterOutlet],
    templateUrl: './formconsultation.component.html',
    styleUrl: './formconsultation.component.scss'
})
export class FormconsultationComponent {
  public outils : Outil[] = [
    {
      id : 0,
      nom : "Stéthoscope",    
    },
    {
      id : 1,
      nom : "Tensiomètre",    
    },
    {
      id : 2,
      nom : "Thermomètre",    
    }
    ]
  public bilans : any[] = [ 

    {
      id : 0,
      checked: true,
      nom : "Bilan Radiologique",    
    },
    {
      id : 1,
      checked : false,
      nom : "Bilan Biologique",    
    },
  ]
  consultationForm: FormGroup;
    // we use constructor instead of formcontrol for clean code 
    constructor(private fb: FormBuilder) {
      this.consultationForm = this.fb.group({
        // Date input
        date: ['', Validators.required],
        heure : ['', Validators.required],
  
        // Radio buttons
        bilanBool : ['', Validators.required],
        bilanChoisi: ['radiologique', Validators.required],

        // Checkboxes
        outils: this.fb.array([] , Validators.required), // Dynamically track selected items

      });

      this.consultationForm.get('bilanBool')?.valueChanges.subscribe((value: boolean) => {
        if (value) {
          this.consultationForm.get('bilanChoisi')?.setValue('radiologique');
        } else {
          this.consultationForm.get('bilanChoisi')?.setValue('biologique');
        }
      });
    }

    onCheckboxChange(event: Event, formArrayName: string, value: Outil): void {
        const formArray = this.consultationForm.get(formArrayName) as FormArray;
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
    this.consultationForm.get(formControlName)?.setValue(selectedValue);
  }

      public submitForm(): void {
        if (this.consultationForm.valid) {
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
