import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { AuthService } from './auth.service';

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
  private apiUrl = '/users/patients/';

  constructor(private authService: AuthService) {}

  async getPatients(): Promise<Patient[]> {
    this.authService.getUser();
    try {
      const response = await this.authService.axiosInstance.get(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  }
}
