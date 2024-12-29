import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private user: any = null;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true,
    });
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user = null;
  }

  async fetchUser(): Promise<any> {
    try {
      const response = await this.axiosInstance.get('/users/user-info/');
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // load the user into  the service wheather it's from the localStorage or the backend
  // --> the user will be always persistant in the app
  async loadUser(): Promise<void> {
    const cachedUser = localStorage.getItem(this.userKey);

    if (cachedUser) {
      this.user = JSON.parse(cachedUser);
    } else {
      try {
        this.user = await this.fetchUser();
        localStorage.setItem(this.userKey, JSON.stringify(this.user)); // Cache the user in local storage
      } catch (error) {
        console.error('Error loading user:', error);
        this.clearAuth();
      }
    }
  }

  // get ther user ( current authenticated)
  getUser(): any {
    return this.user;
  }

  isLoggedIn(): boolean {
    return !!this.user;
  }
}
