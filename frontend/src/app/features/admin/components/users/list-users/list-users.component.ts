import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/core/models/user/user.model';
import { UserService } from 'src/app/core/services/user/user.service';
import { ConfirmationDialogComponent } from '../../../dynamic-components/confirmation-dialog/confirmation-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  isDeleting: boolean = false;
  error: string | null = null;

  fieldsConfig = [
    { name: 'username', label: 'Nom d’utilisateur', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'first_name', label: 'Prénom', type: 'text' },
    { name: 'last_name', label: 'Nom', type: 'text' },
    { name: 'phone', label: 'Téléphone', type: 'text' },
    { name: 'actions', label: 'Actions', type: 'actions' },
  ];

  displayedColumns = ['username', 'email', 'first_name', 'last_name', 'phone', 'actions'];

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
    // {
    //   name: 'delete',
    //   label: 'Supprimer',
    //   icon: 'delete',
    //   callback: (user: User) => this.deleteUser(user),
    // }
  ];

  bulkAction = [
    {
      label: 'Supprimer tout',
      callback: (selectedItems: any[]) => this.deleteSelectedUsers(selectedItems),
    },
  ];
  

  paginationConfig = { pageSize: 10, currentPage: 1, totalItems: 0 };

  searchable = true;

  constructor(
    private router: Router,
    private act_router: ActivatedRoute,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private location: Location,
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }



  loadUsers(): void {
    this.isLoading = true;
    const { pageSize, currentPage } = this.paginationConfig;
    this.userService.getUsersPaginated(currentPage, pageSize).subscribe({
      next: (response) => {
        this.users = response.data;
        this.paginationConfig.totalItems = response.totalItems;
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
    this.router.navigate(['/admin/users/details', user._id]);
  }

  editUser(user: User): void {
    this.router.navigate(['/admin/users/edit', user._id]);
  }

  confirmDeleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: `Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.deleteUser(user);
      }
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user._id).subscribe({
      next: () => {
        this.users = this.users.filter((u) => u._id !== user._id);
        this.snackBar.open('Utilisateur supprimé avec succès.', 'Fermer', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Erreur lors de la suppression de l’utilisateur.', 'Fermer', { duration: 3000 });
        console.error('Error deleting user:', err);
      },
    });
  }

  deleteSelectedUsers(selectedItems: any[]): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmer la suppression',
        message: `Êtes-vous sûr de vouloir supprimer ces ${selectedItems.length} utilisateurs ?`,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.isDeleting = true; // Démarre le processus de suppression
        selectedItems.forEach((user, index) => {
          this.userService.deleteUser(user._id).subscribe({
            next: () => {
              this.users = this.users.filter((u) => u._id !== user._id);
              if (index === selectedItems.length - 1) {
                this.isDeleting = false; // Arrête le spinner lorsque tous les utilisateurs sont supprimés
                this.snackBar.open('Utilisateurs supprimés avec succès.', 'Fermer', { duration: 3000 });

                 // Renaviguer vers la même route pour actualiser la page
                this.router.navigate(['/admin/users/students']).then(() => {
                  // Recharger les utilisateurs après la navigation
                  this.loadUsers();
                });
              }

            },
            error: (err) => {
              if (index === selectedItems.length - 1) {
                this.isDeleting = false; // Arrête le spinner en cas d'erreur
                this.snackBar.open('Erreur lors de la suppression de certains utilisateurs.', 'Fermer', { duration: 3000 });
              }
              console.error('Error deleting user:', err);
            },
          });
        });
      }
    });
  }
  

  handleSearch(query: string): void {
    console.log('Search query:', query);
    // TODO: Implémenter la recherche côté serveur
  }

  addUser(): void {
    this.router.navigate(['/admin/users/create']);
  }

  onPageChange(event: any): void {
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.paginationConfig.pageSize = event.pageSize;
    this.loadUsers();
  }

  // Méthode pour gérer le retour
  navigateToPreviousPage(): void {
    console.log('Retour arrière avec Location');
    this.location.back();
  }
}
