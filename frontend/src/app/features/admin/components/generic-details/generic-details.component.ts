import { Component, Input, Output, EventEmitter, OnDestroy, Renderer2, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';  // Importer Location

@Component({
  selector: 'app-generic-details',
  templateUrl: './generic-details.component.html',
  styleUrls: ['./generic-details.component.css'],
})
export class GenericDetailsComponent implements OnDestroy {
  @Input() data: any;
  @Input() fieldsConfig: { name: string; label: string; type: string; tooltip?: string }[] = [];
  @Input() actions: { name: string; label: string; icon?: string; callback: () => void }[] = [];
  @Input() cssClasses: { container?: string; field?: string; button?: string } = {};

  @Output() actionEvent = new EventEmitter<string>();

  @ViewChildren(MatTooltip) tooltips!: QueryList<MatTooltip>;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private overlayContainer: OverlayContainer,
    private location: Location  // Injecter le service Location
  ) {}

  ngOnDestroy() {
    this.tooltips.forEach((tooltip) => tooltip.hide(0));
    this.overlayContainer.getContainerElement().innerHTML = '';

    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.renderer.removeChild(this.el.nativeElement, tooltip);
    });

    this.cleanUp();
  }

  private cleanUp() {
    console.log('Nettoyage des ressources');
  }

  // Méthode pour revenir à la page précédente
  goBack(): void {
    this.location.back();
  }
}
