import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-listing',
  templateUrl: './generic-listing.component.html',
  styleUrls: ['./generic-listing.component.css'],
})
export class GenericListingComponent implements OnInit {

  @Input() fieldsConfig: { name: string; label: string; type: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: { name: string; label: string; icon: string; callback: (item: any) => void }[] = [];
  @Input() bulkActions: { label: string; callback: (selectedItems: any[]) => void }[] = [];
  @Input() paginationConfig = { pageSize: 10, pageSizeOptions: [5, 10, 20], currentPage: 1 };
  @Input() searchable = false;
  @Input() sortable = false;
  @Input() selectable = false;
  @Input() rowClickable: (item: any) => void = () => {};
  @Input() displayedColumns: string[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  @Output() addEvent = new EventEmitter<void>();

  searchQuery = '';
  paginatedData: any[] = [];
  selectedItems: any[] = [];
  allColumns: string[] = []; // Liste complète des colonnes, incluant 'select' si applicable.

  ngOnInit(): void {
    this.updatePaginatedData();
    this.allColumns = this.selectable ? ['select', ...this.displayedColumns] : [...this.displayedColumns];
  }

  /** Met à jour les données paginées */
  updatePaginatedData(): void {
    const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;

    const filteredData = this.searchQuery
      ? this.data.filter((item) =>
          Object.values(item).some((value) => {
            if (typeof value === 'string' || typeof value === 'number') {
              return value.toString().toLowerCase().includes(this.searchQuery.toLowerCase());
            }
            return false;
          })
        )
      : this.data;

    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }

  /** Gère les changements de recherche */
  onSearchChange(): void {
    this.paginationConfig.currentPage = 1; // Réinitialise à la première page
    this.searchEvent.emit(this.searchQuery);
    this.updatePaginatedData();
  }

  /** Gère les changements de pagination */
  onPageChange(event: any): void {
    this.paginationConfig.pageSize = event.pageSize;
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.updatePaginatedData();
  }

  /** Vérifie si toutes les lignes sont sélectionnées */
  isAllSelected(): boolean {
    return this.paginatedData.every((item) => item.selected);
  }

  /** Sélectionne ou désélectionne toutes les lignes */
  toggleAllRows(isChecked: boolean): void {
    this.paginatedData.forEach((item) => (item.selected = isChecked));
    this.updateSelectedItems();
  }

  /** Met à jour les éléments sélectionnés */
  updateSelectedItems(): void {
    this.selectedItems = this.paginatedData.filter((item) => item.selected);
  }

  /** Vérifie s'il y a des lignes sélectionnées */
  hasSelectedRows(): boolean {
    return this.selectedItems.length > 0;
  }

  /** Exécute une action groupée */
  executeBulkAction(action: any): void {
    action.callback(this.selectedItems);
    this.updateSelectedItems();
  }

  /** Gère le clic sur une ligne */
  handleRowClick(item: any): void {
    if (this.rowClickable) {
      this.rowClickable(item);
    }
  }

  /** Gère le clic sur le bouton d'ajout */
  onAddClick(): void {
    this.addEvent.emit();
  }

  executeAction(_t65: { name: string; label: string; icon: string; callback: (item: any) => void; },_t54: any) {
    // throw new Error('Method not implemented.');
    }
}
