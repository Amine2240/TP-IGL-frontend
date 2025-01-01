import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'auth_user';
  private user: any = null;
  axiosInstance: AxiosInstance; // we use it in all servicesn

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api',
      withCredentials: true,
    });
  }

  setToken(token: string): void {
    console.log('Setting token:', token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      console.warn('Token not found in localStorage');
    }
    return token;
  }

  clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.user = null;
  }

  async fetchUser() {
    try {
      const token = this.getToken();
      console.log('fetching user , token : ', token);

      if (!token) {
        throw new Error('Authentication token is missing.');
      }
      const response = await this.axiosInstance.get('/users/user-info/');
      console.log('response fetching user:', response);

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
    console.log('cached user:', cachedUser);

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
  async login(username: string, password: string) {
    const loginPayload = { username, password };
    try {
      const response = await this.axiosInstance.post(
        '/users/login/',
        loginPayload,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );
      this.setToken(response.data.token);
      // Store the auth token in a cookie
      document.cookie = `auth_token=${response.data.token}; path=/; max-age=3600; secure; SameSite=None`;
      console.log('hiiiiii');
      console.log('response datat:', response.data);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  }
}
