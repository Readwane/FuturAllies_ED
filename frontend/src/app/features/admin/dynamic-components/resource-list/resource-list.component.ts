import {Component, OnInit, OnDestroy, AfterViewInit, Renderer2, ElementRef, QueryList, ViewChildren} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceService } from '../../services/resource.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ressources, Resource, Property } from '../../resource-config/dynamic-resource.config';
import { OverlayContainer } from 'ngx-toastr';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.css']
})
export class ResourceListComponent implements OnInit, OnDestroy {
  resourceType: string = '';
  resourceConfig: Resource | undefined;
  data: any[] = [];
  paginatedData: any[] = [];
  selectedItems: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  isDeleting: boolean = false;
  showBulkDeleteButton: boolean = false;
  columns: string[] = [];
  listToDisplay!: Property[];
  actions: { name: string; label: string; icon?: string; callback: (item: any) => void }[] = [];
  pageSizeOptions: number[] = [];
  paginationConfig = { pageSize: 10, pageSizeOptions: this.pageSizeOptions, currentPage: 1 };

  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  constructor(
    private route: ActivatedRoute,
    private resourceService: ResourceService,
    private dialog: MatDialog,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.resourceType = this.route.snapshot.paramMap.get('resourceType') || '';
    this.loadResourceConfig();
    this.loadData();
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    // Nettoyer les tooltips et les overlays
    this.tooltips.forEach((tooltip) => tooltip.hide(0));
    this.overlayContainer.getContainerElement().innerHTML = '';
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.renderer.removeChild(this.el.nativeElement, tooltip);
    });
  }
  

  loadResourceConfig(): void {
    const resourceToLoad = ressources[this.resourceType];
    if (resourceToLoad) {
      this.resourceConfig = resourceToLoad.resource;
      const options = this.resourceConfig.options;
      
      this.listToDisplay = options.properties.showProperties;
      // Ajout de 'select' en première position
      this.columns = ['select', ...options.properties.showProperties.map(p => p.name), 'actions'];
      this.actions = options.actions || [];
      this.pageSizeOptions = options.pageSizeOptions || [5, 10, 20];
    } else {
      console.error('Resource not found');
    }
  }

  loadData(): void {
    if (!this.resourceConfig) return;
    this.loading = true;

    this.resourceService.getResources(this.resourceType).subscribe(
      data => {
        this.data = data.map(item => ({ ...item, selected: false })); // Ajout de `selected` par défaut
        this.updatePaginatedData();
        this.loading = false;
      },
      error => {
        console.error('Error loading data', error);
        this.loading = false;
      }
    );
  }


  updatePaginatedData(): void {
    // Appliquer le filtrage si une recherche est effectuée
    const filteredData = this.searchQuery
      ? this.data.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
        )
      : this.data;
  
    // Calculer l'index des éléments pour la pagination
    const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;
  
    // Affecter les données paginées
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }
  
  

  onSearchChange(): void {
    this.paginationConfig.currentPage = 1;  // Réinitialiser à la première page
    this.updatePaginatedData(); // Mettre à jour les données paginées
  }
  

  toggleAllRows(isChecked: boolean): void {
    this.paginatedData.forEach((item) => {
      item.selected = isChecked;
    });
    this.updateSelectedItems(); // Mettre à jour la sélection
    this.updateDisplayedColumns(); // Mettre à jour les colonnes après sélection
  }
  
  updateSelectedItems(): void {
    this.selectedItems = this.paginatedData.filter((item) => item.selected);
    this.showBulkDeleteButton = this.selectedItems.length > 0;  // Affiche le bouton de suppression si des éléments sont sélectionnés
    this.updateDisplayedColumns(); // Mise à jour des colonnes après modification de la sélection
  }


  updateDisplayedColumns(): void {
    // Vérifie si des éléments sont sélectionnés et met à jour les colonnes en conséquence
    if (this.selectedItems.length > 0) {
      this.columns = this.columns.filter(col => col !== 'actions');  // Retire la colonne 'actions' si des éléments sont sélectionnés
    } else {
      if (!this.columns.includes('actions')) {
        this.columns.push('actions');  // Ajoute la colonne 'actions' si aucune ligne n'est sélectionnée
      }
    }
  }
  

  executeBulkDelete(): void {
    if (this.selectedItems.length > 0) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          title: 'Confirm bulk delete',
          message: `Are you sure you want to delete these ${this.selectedItems.length} items?`
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.isDeleting = true;  // Indique que la suppression est en cours
          this.selectedItems.forEach((item, index) => {
            this.resourceService.deleteResource(this.resourceType, item._id).subscribe({
              next: () => {
                // Supprimer l'élément de la liste
                this.data = this.data.filter(i => i._id !== item._id);
                if (index === this.selectedItems.length - 1) {
                  // Réinitialiser après la suppression de tous les éléments
                  this.loadData(); // Recharger les données
                  this.isDeleting = false;
                  this.updatePaginatedData(); // Mettre à jour les données paginées
                  this.selectedItems = []; // Réinitialiser les éléments sélectionnés
                  this.updateDisplayedColumns(); // Mettre à jour les colonnes
                }
              },
              error: (err) => {
                console.error('Error deleting item:', err);
                this.isDeleting = false;
              }
            });
          });
        }
      });
    }
  }
  
  

  onPageChange(event: any): void {
    // Met à jour la taille de la page et la page actuelle
    this.paginationConfig.pageSize = event.pageSize;
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.updatePaginatedData();
  }
  

  onAddClick(): void {
    this.router.navigate([`admin/create/${this.resourceType}`]);
  }

   // Méthode pour afficher les détails de l'élément
   viewElementDetails(item: any): void {
    console.log('View details for item:', item);
    this.router.navigate([`admin/details/${this.resourceType}/${item._id}`]);
  }

  // Méthode pour éditer l'élément
  editElement(item: any): void {
    console.log('Edit element:', item);
    this.router.navigate([`admin/edit/${this.resourceType}/${item._id}`]);
  }

  isActionsColumnVisible(): boolean {
    return this.selectedItems.length === 0; // La colonne des actions disparait si des éléments sont sélectionnés
  }
  
}
