import { HttpClientModule } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Sidebar } from "./components/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HttpClientModule, FormsModule, ReactiveFormsModule, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  router = inject(Router);
  protected readonly title = signal('taskManager');
}
