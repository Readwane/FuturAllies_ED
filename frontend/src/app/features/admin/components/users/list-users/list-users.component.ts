import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { resourcesConfig } from '../../../models/resource.model';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;
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
  ];

  bulkAction = [
    {
      label: 'Supprimer tout',
      callback: (selectedItems: any[]) => this.deleteSelectedUsers(selectedItems),
    },
  ];
  // Charger la configuration dynamique pour les utilisateurs
  resourceConfig = resourcesConfig['user'];
  fieldsConfig = this.resourceConfig.fields;
  displayedColumns = this.resourceConfig.resource.displayableColumns || [];
  actions = this.resourceConfig.resource.actions || [];

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

  handleAction(action: any, user: any): void {
    if (action.handler) {
      action.handler(user);
    }
  }

  onPageChange(event: any): void {
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.paginationConfig.pageSize = event.pageSize;
    this.loadUsers();
  }

  navigateToPreviousPage(): void {
    this.location.back();
  }
}
