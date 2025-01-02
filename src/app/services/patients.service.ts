import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

export interface Patient {
  patientId: number;
  nom: string;
  prenom: string;
  email: string;
  photoProfil: string;
  telephone: string;
  dateDeNaissance: string;
  adresse: string;
  NSS: string;
  dpiId: number;
  qrCode: string;
}

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private apiUrl = 'http://localhost:8000/api/users/patients/';

  constructor() {}

  async getPatients(): Promise<Patient[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }
}
