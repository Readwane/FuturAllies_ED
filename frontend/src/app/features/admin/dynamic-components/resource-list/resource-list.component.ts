import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ressources, Resource, Property } from '../../resource-config/dynamic-resource.config';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit, OnDestroy {

  resourceName: string = '';
  resourceConfig: Resource | undefined;
  data: any[] = [];
  paginatedData: any[] = [];
  selectedItems: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  isDeleting: boolean = false;
  showBulkDeleteButton: boolean = false;

  // Configurations liées à la ressource récupérées dynamiquement
  displayedColumns: string[] = [];
  actions: { name: string; label: string; icon?: string; callback: (item: any) => void }[] = [];
  bulkActions: { label: string; callback: (selectedItems: any[]) => void }[] = [];
  searchable: boolean = false;
  selectable: boolean = true;
  pageSizeOptions: number[] = [];
  paginationConfig = { pageSize: 10, pageSizeOptions: [5, 10, 20], currentPage: 1 };
  

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer le nom de la ressource depuis l'URL
    this.resourceName = this.route.snapshot.paramMap.get('resourceType') || '';
    this.loadResourceConfig();
    this.loadData();
  }

  ngOnDestroy(): void {
    // Cleanup si nécessaire
  }

  // Charger la configuration dynamique de la ressource
  loadResourceConfig(): void {
    const resourceToLoad = ressources[this.resourceName];
    if (resourceToLoad) {
      this.resourceConfig = resourceToLoad.resource;
      const options = this.resourceConfig.options;
      
      // Configurations associées à la ressource
      this.displayedColumns = options.properties.showProperties.map(p => p.name);
      this.actions = options.actions || [];
      this.pageSizeOptions = options.pageSizeOptions || [5, 10, 20];
      this.searchable = true;
    } else {
      console.error('Ressource introuvable');
    }
  }

  // Charger les données pour la ressource
  loadData(): void {
    if (!this.resourceConfig) return;
    this.loading = true;

    this.resourceService.getResources(this.resourceName).subscribe(
      data => {
        this.data = data;
        this.updatePaginatedData();
        this.loading = false;
      },
      error => {
        console.error('Erreur lors du chargement des données', error);
        this.loading = false;
      }
    );
  }

  // Mise à jour des données paginées
  updatePaginatedData(): void {
    const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;
    const filteredData = this.searchQuery
      ? this.data.filter(item => Object.values(item).some(value => value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase())))
      : this.data;
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }

  // Méthode de recherche
  onSearchChange(): void {
    this.paginationConfig.currentPage = 1;
    this.updatePaginatedData();
  }

  // Gestion de la sélection de toutes les lignes
  toggleAllRows(isChecked: boolean): void {
    this.paginatedData.forEach(item => (item.selected = isChecked));
    this.updateSelectedItems();
  }

  // Mise à jour des éléments sélectionnés
  updateSelectedItems(): void {
    this.selectedItems = this.paginatedData.filter(item => item.selected);
    this.showBulkDeleteButton = this.selectedItems.length > 0;
  }

  // Action de suppression en masse
  // deleteSelectedUsers(resource: Resource, selectedItems: any[]): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: {
  //       title: 'Confirmer la suppression',
  //       message: `Êtes-vous sûr de vouloir supprimer ces ${selectedItems.length} ${resourceName}s ?`,
  //     },
  //   });
  
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === true) {
  //       this.isDeleting = true; // Démarre le processus de suppression
  //       selectedItems.forEach((user, index) => {
  //         this.resourceService.deleteResource(resourceName, ).subscribe({
  //           next: () => {
  //             this.users = this.users.filter((u) => u._id !== user._id);
  //             if (index === selectedItems.length - 1) {
  //               this.isDeleting = false; // Arrête le spinner lorsque tous les utilisateurs sont supprimés
  //               this.snackBar.open('Utilisateurs supprimés avec succès.', 'Fermer', { duration: 3000 });

  //                // Renaviguer vers la même route pour actualiser la page
  //               this.router.navigate(['/admin/users/students']).then(() => {
  //                 // Recharger les utilisateurs après la navigation
  //                 this.loadUsers();
  //               });
  //             }

  //           },
  //           error: (err) => {
  //             if (index === selectedItems.length - 1) {
  //               this.isDeleting = false; // Arrête le spinner en cas d'erreur
  //               this.snackBar.open('Erreur lors de la suppression de certains utilisateurs.', 'Fermer', { duration: 3000 });
  //             }
  //             console.error('Error deleting user:', err);
  //           },
  //         });
  //       });
  //     }
  //   });
  // }

  // Supprimer un élément spécifique
  // deleteItem(item: any): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: { message: `Êtes-vous sûr de vouloir supprimer cet élément : ${item[this.displayedColumns[0]]} ?` }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loading = true;
  //       this.resourceService.delete(this.resourceName, item._id).subscribe(() => {
  //         this.loading = false;
  //         this.loadData();
  //       });
  //     }
  //   });
  // }

  executeBulkDelete() {
    throw new Error('Method not implemented.');
  }

  // Pagination
  onPageChange(event: any): void {
    this.paginationConfig.pageSize = event.pageSize;
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.updatePaginatedData();
  }

  // Ajouter un nouvel élément
  onAddClick(): void {
    this.router.navigate([`admini/${this.resourceName}/add`]);
  }
}
