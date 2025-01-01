import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { Dpi } from '../models/dpi.model';

@Injectable({
  providedIn: 'root',
})
export class DpiService {
  constructor(private authService: AuthService) {}
  async postDpi(params: any) {
    try {
      const token = this.authService.getToken();
      console.log('fetching user , token : ', token);
      if (!token) {
        throw new Error('Authentication token is missing.');
      }
      console.log('Payload being sent:', JSON.stringify(params, null, 2));
      const response = await this.authService.axiosInstance.post(
        '/dpi/creer-dpi',
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Token ${token}`,
          },
        }
      );
      console.log('response fetching user dpi serviiicic:', response);
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
  async getConsultations() {
    try {
      this.authService.loadUser();
      const user = this.authService.getUser();
      if (user.role == 'patient') {
        // const response = await this.authService.axiosInstance.get(`/dpi/consultations/${user.id}`);
        const response = await this.authService.axiosInstance.get(
          `/dpi/consultations/`
        );
        return response.data;
      }
      const response = await this.authService.axiosInstance.get(
        `/dpi/consultations/`
      );
      return response.data;
    } catch (error) {
      console.log('error :', error);
    }
  }
  async ajouterConsultation(params: any) {
    try {
      const response = await this.authService.axiosInstance.post(
        '/dpi/consultations/create/',
        params
      );
      return response.data;
    } catch (error) {
      console.log('error ajouter consultation :', error);
    }
  }
  async getOutils() {
    try {
      const response = await this.authService.axiosInstance.get('/dpi/outils/');
      return response.data;
    } catch (error) {
      console.log('error getoutils :', error);
    }
  }
  async getDpi(params: any) {
    try {
      this.authService.loadUser();
      const user = this.authService.getUser();
      if (user.role == 'patient') {
        // const response = await this.authService.axiosInstance.get(
        //   `/dpi/${user.id}/`
        // );
        const response = await this.authService.axiosInstance.get(
          `/dpi/${user.roleId}/`
        );
        return response.data;
      }

      const response = await this.authService.axiosInstance.get(
        `/dpi/${params}/`
      ); // if the user is a patient get that id from loaduser, if the user is a medecin get that id from patiens page
      return response.data;
    } catch (error) {
      console.log('error getdpi :', error);
    }
  }
  async getPatient(patientId: any) {
    try {
        const response = await this.authService.axiosInstance.get(
            `/users/patients`
        );

        // Filter the results and store the filtered list
        const filteredData = response.data.filter(
            (item: { patientId: any }) => item.patientId === patientId
        );

        console.log('response getPatient:', filteredData);

        // Assuming you want to return the first item of the filtered list
        return filteredData[0];
    } catch (error) {
        console.log('error getPatient:', error);
    }
}
  listPrescriptions: any = [];
  setlistOfPrescriptions(list: any) {
    this.removeLastPrescription(list);
    this.listPrescriptions = list;
    console.log(
      'list of prescriptions from dpi service:',
      this.listPrescriptions
    );
  }
  removeLastPrescription(list: []) {
    // se debarasser de la lign dinitialization
    if (list.length > 0) {
      list.pop();
      console.log('Updated rows:', list);
    } else {
      console.log('No items to remove.');
    }
  }
  getlistOfPrescriptions() {
    return this.listPrescriptions;
  }
  // the dpi will be created without a photo and the photo will be added later in the informations-patient component (backend issues)
  // photoPatient : any
  // setPhotoPatient(photo:any){
  //   this.photoPatient = photo
  // }
  // getPhotoPatient(){
  //   return this.photoPatient
  // }
  async ajouterPhotoPatient(patientId: number, file: File) {
    try {
      const formdata = new FormData(); 
      formdata.append('profilePicture', file);
      const response = await this.authService.axiosInstance.post(
        `users/patients/${patientId}/update-profile-picture/`,
        formdata
      );
      return response.data;
    } catch (error) {
      console.log('error ajouter photo patient :', error);
    }
  }
}
