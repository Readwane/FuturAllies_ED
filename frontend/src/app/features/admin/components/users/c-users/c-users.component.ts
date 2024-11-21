import { Component } from '@angular/core';

@Component({
  selector: 'app-c-users',
  templateUrl: './c-users.component.html',
  styleUrls: ['./c-users.component.css']
})
export class CUsersComponent {
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
  submitButtonLabel = 'Crééer un utilisateur';

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
    console.log('Nouvel utilisateur créé :', formData);
    // Vous pouvez ici appeler un service pour envoyer les données au backend.
  }
}
