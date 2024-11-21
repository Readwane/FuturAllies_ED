import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = []; // Liste des utilisateurs chargés depuis le service
  isLoading: boolean = true; // Indique si les données sont en cours de chargement
  error: string | null = null; // Stocke les erreurs éventuelles

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
      callback: (user: User) => this.viewDetails(user),
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

  // Pagination Config
  paginationConfig = { pageSize: 10, pageSizeOptions: [5, 10, 20], currentPage: 1 };

  // Recherche activée
  searchable = true;

  constructor(
    private router: Router,
    private act_router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  /** Charge les utilisateurs via le service */
  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des utilisateurs.';
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  viewDetails(user: User): void {
    console.log('Afficher les détails de l’utilisateur:', user);
    this.router.navigate(['/admin/users/details', user._id]); 
  }

  editUser(user: User): void {
    console.log('Modifier utilisateur:', user);
    this.router.navigate(['/admin/users/edit', user._id]);
  }

  deleteUser(user: User): void {
    console.log('Supprimer utilisateur:', user);
    // Supprimer l'utilisateur côté serveur
    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== user._id); // Supprimer localement
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l’utilisateur:', err);
      },
    });
  }

  deleteSelectedUsers(): void {
    console.log('Supprimer les utilisateurs sélectionnés');
    // Supprimer les utilisateurs sélectionnés
  }

  // Méthode déclenchée lors d'un clic sur une ligne
  rowClickable = (user: User) => this.viewDetails(user);

  // Gestion de l'événement de recherche
  handleSearch(query: string): void {
    console.log('Recherche:', query);
    // Rechercher côté serveur ou filtrer localement
  }

  addUser(): void {
    console.log('Ajouter un utilisateur');
    this.router.navigate(['/admin/users/create']);
  }
}
