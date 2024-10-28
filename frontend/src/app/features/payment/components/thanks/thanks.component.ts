import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-thanks',
  // standalone: true,
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent {
  @Output() continueClicked = new EventEmitter<void>();

  onContinue(){
    this.continueClicked.emit();
  }

}
