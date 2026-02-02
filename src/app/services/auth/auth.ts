import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../interfaces/project-interface';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  
  user$ = new BehaviorSubject<any>(null);

  private api =  'http://localhost:3000/api/';


 login(email: string, password: string) {
    return this.http.post<{ token: string,user:User }>(
      `${this.api}auth/login`,
      { email, password }
    ).pipe(tap(response => {
      this.user$.next(response.user);
    }));
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  };

  logout():void {
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
