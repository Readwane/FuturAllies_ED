import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/admin/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.f['username'].value, this.f['password'].value).subscribe({
      next: (response) => {
        this.authService.loginSuccess(response.token);
        this.router.navigate(['home']);
        this.snackBar.open('Connexion réussie', '', { duration: 3000 });
      },
      error: (error) => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.isSubmitting = false;
        this.snackBar.open(this.errorMessage, '', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}
