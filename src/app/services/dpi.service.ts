import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { Dpi } from '../models/dpi.model';


@Injectable({
  providedIn: 'root'
})
export class DpiService {
  
  constructor(private authService: AuthService,) {
    
   }
   async postDpi(params:any) {
    try {
      const token = this.authService.getToken();
      console.log('fetching user , token : ', token);
      if (!token) {
        throw new Error('Authentication token is missing.');
      }
      console.log('Payload being sent:', JSON.stringify(params, null, 2));
      const response = await this.authService.axiosInstance.post('/dpi/creer-dpi', params ,{
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Token ${token}`,
        },
      }  );
      console.log('response fetching user dpi serviiicic:', response);
      return response.data;
      
    } catch (error) {
      console.log("error :" , error);
      
      
    }
    
   }
   async getConsultations(){
    try {
       this.authService.loadUser();
      const user = this.authService.getUser();
      if (user.role == 'patient') {
        // const response = await this.authService.axiosInstance.get(`/dpi/consultations/${user.id}`);
        const response = await this.authService.axiosInstance.get(`/dpi/consultations/`);
      return response.data;
        
      }
      const response = await this.authService.axiosInstance.get(`/dpi/consultations/`);
      return response.data;
      
    } catch (error) {
      console.log("error :" , error);
      
      
    }
   }
   async ajouterConsultation(params:any) {
    try {
      const response = await this.authService.axiosInstance.post('/dpi/consultations/create/', params );
      return response.data
      
    } catch (error) {
      console.log("error ajouter consultation :" , error);
      
      
    }
   }
   async getOutils(){
    try {
      const response = await  this.authService.axiosInstance.get('/dpi/outils/');
      return response.data
      
    } catch (error) {
      console.log("error getoutils :" , error);
      
      
    }
   }
   async getDpi(params : any){
    try {
      this.authService.loadUser();
      const user = this.authService.getUser();
      if (user.role == 'patient') {
        const response = await this.authService.axiosInstance.get(`/dpi/${user.id}/`);
      return response.data;
        
      }
      
      const response  = await this.authService.axiosInstance.get(`/dpi/${params}`);// if the user is a patient get that id from loaduser, if the user is a medecin get that id from patiens page
      return response.data;
      
    } catch (error) {
      console.log("error getdpi :" , error);
      
      
    }
   }
   async getPatient(patientId : any){
    try {
      const response = await this.authService.axiosInstance.get(`/users/patients`);
      response.data.filter((item: { patientId: any; })=> item.patientId == patientId);
      console.log('response getPatient:', response.data);
      
      return response.data[0];
      
    } catch (error) {
      console.log("error getpatient :" , error);
      
      
    }
   }
}
