import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  
  private api =  'http://localhost:3000/api/';


 login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      `${this.api}auth/login`,
      { email, password }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  };

  logout() {
    localStorage.removeItem('auth_token');
  }

  isLogged(): boolean {
    return this.getToken() !== null;
  }
  
  register(name: string, email: string, password: string) {
    return this.http.post<{ message: string }>(
      `${this.api}auth/register`,
      { name, email, password }
    );
  }
}
