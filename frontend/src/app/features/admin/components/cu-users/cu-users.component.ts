import { Component } from '@angular/core';

@Component({
  selector: 'app-cu-users',
  // standalone: true,
  // imports: [],
  templateUrl: './cu-users.component.html',
  styleUrl: './cu-users.component.css'
})
export class CuUsersComponent {
  selectedUser = { name: 'John Doe', email: 'john@example.com', role: 'admin' }; // Exemple de données
  mode: 'create' | 'update' = 'update'; // Exemple de mode

  fieldsConfig = [
    { name: 'name', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'role', label: 'Rôle', type: 'select', required: true, options: [
      { value: 'admin', label: 'Administrateur' },
      { value: 'user', label: 'Utilisateur' }
    ] }
  ];

  handleFormSubmit(data: any) {
    console.log('Données soumises :', data);
  }
}


