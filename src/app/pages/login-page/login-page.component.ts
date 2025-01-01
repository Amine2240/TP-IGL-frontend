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
import { GlobalService } from '../../global.service';
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
    private globalService: GlobalService,
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
  redirectToHome() {
    this.router.navigate(['pageLanding']);
  }
  async ngOnInit(): Promise<void> {
    await this.authService.loadUser();
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      const targetRoute = this.globalService.roleRouteMap[user.role];

      if (targetRoute) {
        this.router.navigate([targetRoute]);
      } else {
        console.error(`No route defined for role: ${user.role}`);
      }
    }
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
        const response = await this.authService.login(
          loginPayload.username,
          loginPayload.password,
        );
        console.log('Login Successful:', response);
        await this.authService.loadUser();
        const userRole = this.authService.getUser().role;
        const targetRoute = this.globalService.roleRouteMap[userRole];

        // redirecting to the appropriate dashboard (based on user role)
        if (targetRoute) {
          this.router.navigate([targetRoute]);
        } else {
          console.error(`No route defined for role: ${userRole}`);
        }
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
