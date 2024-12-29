import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
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
        const response = await axios.post(
          'http://localhost:8000/api/users/login/',
          loginPayload,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        document.cookie = `auth_token=${response.data.token}; path=/; max-age=3600; secure; SameSite=None`;
        console.log('Login Successful:', response.data);
        await this.authService.loadUser();
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
