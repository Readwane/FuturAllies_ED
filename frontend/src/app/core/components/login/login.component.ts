import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
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
  returnUrl: string = ''; // Store the return URL

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Get the return URL from the query parameters
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
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
        console.log('Login successful, response for login component:', response); // Debugging
  
        // Redirect to the return URL or default route after successful login
        const returnUrl = this.returnUrl || '/'; // Default to '/dashboard' if no returnUrl
        this.router.navigateByUrl(returnUrl).then(success => {
          if (success) {
            console.log('At loginComponent Redirected to:', returnUrl); // Debugging
          } else {
            console.error('At loginComponent Failed to redirect to:', returnUrl); // Debugging
          }
        });
  
        this.snackBar.open('Connexion réussie', '', { duration: 3000 });
      },
      error: (error) => {
        console.error('Login error:', error); // Debugging
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
        this.isSubmitting = false;
        this.snackBar.open(this.errorMessage, '', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }
}