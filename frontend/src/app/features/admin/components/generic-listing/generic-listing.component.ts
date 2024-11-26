import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { OverlayContainer } from '@angular/cdk/overlay';

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

  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  searchQuery = '';
  paginatedData: any[] = [];
  selectedItems: any[] = [];
  showBulkDeleteButton = false;
  allColumns: string[] = [];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.updatePaginatedData();
    this.updateDisplayedColumns();
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

  updatePaginatedData(): void {
    const startIndex = (this.paginationConfig.currentPage - 1) * this.paginationConfig.pageSize;
    const endIndex = startIndex + this.paginationConfig.pageSize;
    const filteredData = this.searchQuery
      ? this.data.filter((item) =>
          Object.values(item).some((value) =>
            value?.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
          )
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

  toggleAllRows(isChecked: boolean): void {
    this.paginatedData.forEach((item) => (item.selected = isChecked));
    this.updateSelectedItems();
  }

  updateSelectedItems(): void {
    this.selectedItems = this.data.filter((item) => item.selected);
    this.showBulkDeleteButton = this.selectedItems.length > 0;
    this.updateDisplayedColumns();
  }

  executeBulkDelete(): void {
    if (this.selectedItems.length > 0) {
      const selectedIds = this.selectedItems.map((item) => item._id); // ou utiliser un autre identifiant
      const bulkDeleteAction = this.bulkActions.find(action => action.label === 'Supprimer tout');
      if (bulkDeleteAction && bulkDeleteAction.callback) {
        bulkDeleteAction.callback(this.selectedItems);
      }
    } else {
      console.warn('Aucun élément sélectionné pour la suppression en masse.');
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

  updateDisplayedColumns(): void {
    if (this.showBulkDeleteButton) {
      this.allColumns = this.selectable ? ['select', ...this.displayedColumns.filter(col => col !== 'actions')] : [...this.displayedColumns];
    } else {
      this.allColumns = this.selectable ? ['select', ...this.displayedColumns] : [...this.displayedColumns];
    }
  }
}
