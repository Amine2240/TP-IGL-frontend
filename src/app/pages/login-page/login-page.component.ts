import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import axios from 'axios';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required], //Validators.email],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          //       Validators
          //        .pattern
          //          '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}',
          //      (),
        ],
      ],
    });
  }
  ngOnInit(): void {
    // console.log(this.authService.getToken());
    
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement;
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const loginPayload = {
          username: this.loginForm.value.email,
          password: this.loginForm.value.password,
        };
        const response = await this.authService.login(loginPayload.username, loginPayload.password);
        console.log('Login Successful:', response);
        await this.authService.loadUser();
        if (this.authService.getUser().role === 'administratif') {
          this.router.navigate(['/formpatient']);
        } else if (this.authService.getUser().role === 'medecin') {
          
          
        }else if (this.authService.getUser().role === 'admin') {
        
        }else if (this.authService.getUser().role === 'pharmacien') {
          
          
        }
        else if (this.authService.getUser().role === 'laboratin') {
    
          
        }
        else if (this.authService.getUser().role === 'radiologue') {
    
          
        }
        else if (this.authService.getUser().role === 'infermier') {
    
          
        }
        else if (this.authService.getUser().role === 'patient') {
          this.router.navigate(['/dpi']);
    
          
        }
        console.log('User Loaded:', this.authService.getUser());
      } catch (error: any) {
        if (error.response && error.response.status == 401) {
          this.errorMessage =
            'Email/username ou mot de passe incorrect. Veuillez réessayer.';
        } else {
          this.errorMessage =
            "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
        }
        console.error('Login Failed:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
