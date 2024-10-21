
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './service-connexion/service-connexion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit  {
  loginForm!: FormGroup;
nom:any
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({ 
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Stocker les tokens et les informations de l'utilisateur
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          
          // Mettre à jour le service avec le nom et le prénom
          this.authService.updateUserInfo(response.nom, response.prenom);
          
          // Rediriger en fonction du rôle
          if (response.role === 'etudiant') {
            this.router.navigate(['/page-etudiant']);
          } else if (response.role === 'employeur') {
            this.router.navigate(['/page-employeur']);
          } else {
            this.router.navigate(['/acceuil']);
          }
        },
        error: (error) => {
          console.error('Error logging in:', error);
        }
      });
    }
  }}
