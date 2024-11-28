import { Component, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  @ViewChild('sidenav') sidenav: any;
  tooltips: any[] = [];  // Liste des tooltips à gérer

  user = {
    isLoggedIn: true,
    avatarUrl: '',
    name: 'Tegawende',
    notifications: 5,
    messages: 3
  };

  constructor(private overlayContainer: OverlayContainer, private el: ElementRef) {}

  ngAfterViewInit(): void {
    // Vous pouvez ajouter ici des tooltips ou autres fonctionnalités interactives si nécessaire.
  }

  ngOnDestroy(): void {
    // Masquer et nettoyer les tooltips
    this.tooltips.forEach(tooltip => tooltip.hide(0));

    // Nettoyer les overlays s'ils existent
    const overlayContainerElement = this.overlayContainer.getContainerElement();
    overlayContainerElement.innerHTML = '';

    // Nettoyer le DOM des tooltips (si nécessaire)
    const tooltips = this.el.nativeElement.querySelectorAll('.mat-tooltip');
    tooltips.forEach((tooltip: HTMLElement) => {
      this.el.nativeElement.removeChild(tooltip);
    });
  }
}