import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-users',
  templateUrl: './c-users.component.html',
  styleUrls: ['./c-users.component.css']
})
export class CUsersComponent {
  isLoading: boolean = false; // Indique si une action est en cours

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  fieldsConfig = [
    { name: 'username', label: 'Nom d’utilisateur', type: 'text', required: true },
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Adresse e-mail', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
    { name: 'confirm_password', label: 'Confirmer le mot de passe', type: 'password', required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' },
  ];

  submitButtonLabel = 'Créer un utilisateur';

  defaultValues = {
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    phone: '',
    first_name: '',
    last_name: ''
  };

  errorMessages = {
    username: { required: 'Le nom d’utilisateur est obligatoire.' },
    email: { required: 'L’adresse e-mail est obligatoire.', email: 'Adresse e-mail invalide.' },
    password: { required: 'Le mot de passe est obligatoire.', minlength: 'Le mot de passe doit contenir au moins 6 caractères.' },
    confirm_password: { required: 'La confirmation du mot de passe est obligatoire.', minlength: 'Il doit correspondre au mot de passe.' },
    first_name: { required: 'Le prénom est obligatoire.' },
    last_name: { required: 'Le nom est obligatoire.' }
  };

  handleCreateUser(formData: any): void {
    this.isLoading = true; // Affiche le spinner

    const user: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      first_name: formData.first_name,
      last_name: formData.last_name,
      _id: '',
      updated_at: new Date(),
      created_at: new Date(),
    };

    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        this.isLoading = false; // Masque le spinner
        this.snackBar.open('Utilisateur créé avec succès!', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-success']
        });
        console.log('Utilisateur créé avec succès:', createdUser);
        this.router.navigate(['/admin/users/students']);
      },
      error: (err) => {
        this.isLoading = false; // Masque le spinner
        this.snackBar.open('Erreur lors de la création de l\'utilisateur.', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-error']
        });
        console.error('Erreur lors de la création de l\'utilisateur:', err);
      }
    });
  }
}
