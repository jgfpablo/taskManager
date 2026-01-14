import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth/auth';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

private authService = inject(Auth);
private fb = inject(FormBuilder);

loginForm = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', Validators.required]
});



public login() {

  const {email, password} = this.loginForm.value;
  this.authService.login(email!, password!).subscribe({
    next: (response) => {
      this.authService.saveToken(response.token);
      console.log('Login successful');
      // Redirect to projects or another page after successful login
    },
    error: (error) => {
      console.error('Login failed', error);
      // Handle login error (e.g., show error message)
    }
  });
}

}
