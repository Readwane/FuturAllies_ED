import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.css']
})
export class DynamicMenuComponent {
  @Input() menuItems: any[] = [];
}