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
}
