import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],  // Nom d'utilisateur
      firstName: ['', Validators.required],  // Prénom
      lastName: ['', Validators.required],   // Nom de famille
      email: ['', [Validators.required, Validators.email]],  // Email
      password: ['', [Validators.required, Validators.minLength(6)]],  // Mot de passe
      confirmPassword: ['', Validators.required],  // Confirmer mot de passe
      phone: ['', Validators.required],  // Numéro de téléphone
      accesType: ['Freemium', Validators.required],  // Type d'accès
      biographie: [''],  // Biographie
      address: [''],  // Adresse
      birthDate: [null],  // Date de naissance
      image: ['']  // URL de l'image
    }, this.passwordMatchValidator);
  }

  // Validation du mot de passe
  passwordMatchValidator(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Créer un objet User avec les valeurs du formulaire
      const formValue = this.registrationForm.value;
      const user: User = new User(
        '',  // _id généré côté serveur après enregistrement
        formValue.username,
        formValue.password,
        formValue.email,
        formValue.phone,
        formValue.accesType,
        new Date(),  // Date de création
        new Date(),  // Date de mise à jour
        formValue.firstName,
        formValue.lastName,
        formValue.biographie,
        formValue.address,
        formValue.birthDate,
        formValue.image
      );

      // Appel du service pour enregistrer l'utilisateur
      this.userService.register(user).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
          this.router.navigate([`/login`]);
        },
        error: (error) => {
          console.error('Error registering user:', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
