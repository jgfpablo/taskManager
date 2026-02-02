import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

private authService = inject(Auth);
private fb = inject(FormBuilder);
private router = inject(Router);

loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
});



public login() {

  const {email, password} = this.loginForm.value;
  this.authService.login(email!, password!).subscribe({
    next: (response) => {
      console.log('Login successful', response.user);
      this.authService.saveToken(response.token);
      
      this.router.navigate(['/projects']);

    },
    error: (error) => {
      console.error('Login failed', error);
    }
  });
}

}
