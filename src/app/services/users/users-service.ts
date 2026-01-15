import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
     private api = 'http://localhost:3000/api/users';

  HttpClient = inject(HttpClient);

  getAllUsers() {
    return this.HttpClient.get<any>('http://localhost:3000/api/users');
  }

}
