import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './u-users.component.html',
  styleUrls: ['./u-users.component.css']
})
export class UUsersComponent {
  fieldsConfig = [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    { name: 'email', type: 'email', label: 'Adresse Email', required: true },
    { name: 'password', type: 'password', label: 'Mot de passe', required: false },
    { name: 'role', type: 'select', label: 'Rôle', required: true, options: [
        { value: 'admin', label: 'Administrateur' },
        { value: 'user', label: 'Utilisateur' }
      ]
    }
  ];

  selectedUser: any = null; // Utilisateur sélectionné pour modification

  users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'user' },
    { id: 2, name: 'Bob', email: 'bob@example.com', role: 'admin' }
  ];

  // Appelé lors de la sélection d'un utilisateur pour modification
  editUser(user: any) {
    this.selectedUser = { ...user }; // Crée une copie de l'utilisateur
  }

  // Appelé lors de la soumission des modifications
  updateUser(data: any) {
    console.log('Utilisateur mis à jour :', data);
    // Logique backend pour mettre à jour l'utilisateur
    this.selectedUser = null; // Réinitialiser après mise à jour
  }

  // Annuler la modification
  cancelEdit() {
    console.log('Modification annulée');
    this.selectedUser = null;
  }
}
