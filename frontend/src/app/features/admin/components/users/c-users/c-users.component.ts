import { Component, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user/user.model';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importation de MatSnackBar

@Component({
  selector: 'app-c-users',
  templateUrl: './c-users.component.html',
  styleUrls: ['./c-users.component.css']
})
export class CUsersComponent {
  constructor(
    private renderer: Renderer2, 
    private el: ElementRef,
    private userService: UserService, // Injecter le service User
    private snackBar: MatSnackBar // Injecter MatSnackBar pour afficher les notifications
  ) {}

  // Configuration des champs
  fieldsConfig = [
    { name: 'username', label: 'Nom d’utilisateur', type: 'text', required: true },
    { name: 'email', label: 'Adresse e-mail', type: 'email', required: true },
    { name: 'password', label: 'Mot de passe', type: 'password', required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' },
    { name: 'first_name', label: 'Prénom', type: 'text', required: true },
    { name: 'last_name', label: 'Nom', type: 'text', required: true }
  ];

  // Label du bouton
  submitButtonLabel = 'Créer un utilisateur';

  // Valeurs par défaut
  defaultValues = {
    username: '',
    email: '',
    password: '',
    phone: '',
    first_name: '',
    last_name: ''
  };

  // Messages d'erreur personnalisés
  errorMessages = {
    username: {
      required: 'Le nom d’utilisateur est obligatoire.'
    },
    email: {
      required: 'L’adresse e-mail est obligatoire.',
      email: 'Adresse e-mail invalide.'
    },
    password: {
      required: 'Le mot de passe est obligatoire.',
      minlength: 'Le mot de passe doit contenir au moins 6 caractères.'
    },
    first_name: {
      required: 'Le prénom est obligatoire.'
    },
    last_name: {
      required: 'Le nom est obligatoire.'
    }
  };

  // Gestion de la soumission du formulaire
  handleCreateUser(formData: any): void {
    // Créer un objet utilisateur avec les données du formulaire
    const user: User = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      first_name: formData.first_name,
      last_name: formData.last_name,
      _id: '',
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Appeler la méthode createUser du service pour envoyer les données au backend
    this.userService.createUser(user).subscribe({
      next: (createdUser) => {
        // Afficher une notification de succès
        this.snackBar.open('Utilisateur créé avec succès!', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-success'] // Personnalisez le style si nécessaire
        });
        console.log('Utilisateur créé avec succès:', createdUser);
        // Vous pouvez ajouter des actions supplémentaires, comme rediriger l'utilisateur
      },
      error: (err) => {
        // Afficher une notification d'erreur
        this.snackBar.open('Erreur lors de la création de l\'utilisateur.', 'Fermer', {
          duration: 3000,
          panelClass: ['snack-bar-error'] // Personnalisez le style si nécessaire
        });
        console.error('Erreur lors de la création de l\'utilisateur:', err);
      }
    });
  }
}
