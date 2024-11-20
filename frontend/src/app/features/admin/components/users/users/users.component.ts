import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {

  constructor(private router: Router) {}

  // Liste des utilisateurs
  users: User[] = [
    new User(
      '1',
      'johndoe',
      'password123',
      'john@example.com',
      'John',
      'Doe',
      '123-456-7890'
    ),
    new User(
      '2',
      'janedoe',
      'password123',
      'jane@example.com',
      'Jane',
      'Doe',
      '123-456-7890'
    ),
    new User(
      '3',
      'alexsmith',
      'password123',
      'alex@example.com',
      'Alex',
      'Smith',
      '987-654-3210'
    ),
  ];

  // Configuration des champs pour l'affichage
  fieldsConfig = [
    { name: 'username', label: 'Nom d’utilisateur', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'first_name', label: 'Prénom', type: 'text' },
    { name: 'last_name', label: 'Nom', type: 'text' },
    { name: 'phone', label: 'Téléphone', type: 'text' },
    { name: 'actions', label: 'Actions', type: 'actions' },
  ];

  // Configuration des colonnes à afficher
  displayedColumns = ['username', 'email', 'first_name', 'last_name', 'phone', 'actions'];

  // Actions dynamiques
  actions = [
    {
      name: 'details',
      label: 'Détails',
      icon: 'info',
      callback: (item: any) => this.viewDetails(item)
    },
    {
      name: 'edit',
      label: 'Modifier',
      icon: 'edit',
      callback: (user: User) => this.editUser(user),
    },
    {
      name: 'delete',
      label: 'Supprimer',
      icon: 'delete',
      callback: (user: User) => this.deleteUser(user),
    },
  ];

  bulkActions = [
    {
      name: 'deleteSelected',
      label: 'Supprimer tout',
      callback: () => this.deleteSelectedUsers(),
    },
  ];
  
  deleteSelectedUsers(): void {
    // this.users = this.users.filter(user => !user.selected); // Supprime les utilisateurs sélectionnés
  }
  
  // Pagination Config
  paginationConfig = { pageSize: 10, pageSizeOptions: [5, 10, 20], currentPage: 1 };

  // Recherche activée
  searchable = true;

  // Méthode déclenchée lors d'un clic sur une ligne
  rowClickable = (user: User) => this.goToUserDetails(user);

  viewDetails(user: any): void {
    console.log('Détails:', user);
    // Naviguer vers la page de détails
  }

  // Méthodes pour les actions
  editUser(user: User): void {
    console.log('Modifier utilisateur:', user);
  }

  deleteUser(user: User): void {
    console.log('Supprimer utilisateur:', user);
  }

  goToUserDetails(user: User): void {
    console.log('Afficher les détails de l’utilisateur:', user);
  }

  // Gestion de l'événement de recherche
  handleSearch(query: string): void {
    this.users = this.users.filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
  }

  addUser(): void {
    console.log('Ajouter un utilisateur');
    this.router.navigate(['/c-users']);
  }
}
