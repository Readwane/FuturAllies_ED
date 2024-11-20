import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './cu-users.component.html',
  styleUrls: ['./cu-users.component.css']
})
export class CuUsersComponent {
  fieldsConfig = [
    { name: 'name', type: 'text', label: 'Nom', required: true },
    { name: 'email', type: 'email', label: 'Adresse Email', required: true },
    { name: 'password', type: 'password', label: 'Mot de passe', required: true },
    { name: 'role', type: 'select', label: 'Rôle', required: true, options: [
        { value: 'admin', label: 'Administrateur' },
        { value: 'user', label: 'Utilisateur' }
      ]
    }
  ];

  createUser(data: any) {
    console.log('Utilisateur créé :', data);
    // Ajoutez ici un appel à un service backend pour créer l'utilisateur
  }

  cancelCreate() {
    console.log('Création annulée');
  }
}
