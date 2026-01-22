import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  authServices = inject(Auth);

}
