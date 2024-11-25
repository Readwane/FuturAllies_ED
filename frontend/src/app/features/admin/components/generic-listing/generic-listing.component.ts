import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-generic-listing',
  templateUrl: './generic-listing.component.html',
  styleUrls: ['./generic-listing.component.css'],
})
export class GenericListingComponent implements OnInit, OnDestroy {
  @Input() fieldsConfig: { name: string; label: string; type: string }[] = [];
  @Input() data: any[] = [];
  @Input() actions: { name: string; label: string; icon: string; callback: (item: any) => void }[] = [];
  @Input() bulkActions: { label: string; callback: (selectedItems: any[]) => void }[] = [];
  @Input() paginationConfig = { pageSize: 10, pageSizeOptions: [5, 10, 20], currentPage: 1 };
  @Input() searchable = false;
  @Input() selectable = true;
  @Input() displayedColumns: string[] = [];
  @Output() searchEvent = new EventEmitter<string>();
  @Output() addEvent = new EventEmitter<void>();

  searchQuery = '';
  paginatedData: any[] = [];
  selectedItems: any[] = [];
  allColumns: string[] = [];

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.updatePaginatedData();
    this.allColumns = this.selectable ? ['select', ...this.displayedColumns] : [...this.displayedColumns];
  }

  ngOnDestroy(): void {
    // Supprime tous les tooltips au moment de la destruction
    const tooltips = document.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip) => tooltip.remove());
  }

  updatePaginatedData(): void {
    const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;
    const filteredData = this.searchQuery
      ? this.data.filter((item) =>
          Object.values(item).some((value) => value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
        )
      : this.data;
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }

  onSearchChange(): void {
    this.paginationConfig.currentPage = 1;
    this.searchEvent.emit(this.searchQuery);
    this.updatePaginatedData();
  }

  onPageChange(event: any): void {
    this.paginationConfig.pageSize = event.pageSize;
    this.paginationConfig.currentPage = event.pageIndex + 1;
    this.updatePaginatedData();
  }

  isAllSelected(): boolean {
    return this.paginatedData.every((item) => item.selected);
  }

  toggleAllRows(isChecked: boolean): void {
    this.paginatedData.forEach((item) => (item.selected = isChecked));
    this.updateSelectedItems();
  }

  updateSelectedItems(): void {
    this.selectedItems = this.paginatedData.filter((item) => item.selected);
  }

  hasSelectedRows(): boolean {
    return this.selectedItems.length > 0;
  }

  executeBulkAction(action: any): void {
    if (this.hasSelectedRows()) {
      action.callback(this.selectedItems);
      this.updateSelectedItems();
    }
  }

  executeAction(action: any, item: any): void {
    if (action.callback) {
      action.callback(item);
    } else {
      console.warn(`Aucune fonction de rappel définie pour l'action : ${action.name}`);
    }
  }

  onAddClick(): void {
    this.addEvent.emit();
  }
}
