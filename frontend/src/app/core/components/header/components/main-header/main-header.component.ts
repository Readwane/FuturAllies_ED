// shared/components/main-header/main-header.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MainHeader } from 'src/app/shared/models/main-header.model';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent {
  @Input() headerData!: MainHeader;
  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();

  // Méthode pour émettre l'action du bouton
  onButtonClick(action: string) {
    this.buttonClick.emit(action);
  }
}
