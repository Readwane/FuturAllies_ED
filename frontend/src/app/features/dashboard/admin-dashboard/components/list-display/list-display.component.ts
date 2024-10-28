// list-display.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent {

resourceType: any|string;
resourceId: any|string;


  constructor(private router: Router) {}
  
  @Input() title: string = '';
  @Input() headers: string[] = [];
  @Input() items: any[] = [];

  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  editItem(item: any) {
    // this.edit.emit(item);
    console.log(`Modification de l'element ${item}`)
  }

  deleteItem(item: any) {
    // this.delete.emit(item);
    console.log(`Suppression de l'element ${item}`)
  }

  goToDetails(item: any)  {
    // Remplacez 'details' par la route vers laquelle vous souhaitez naviguer
    this.router.navigate(['/details', item, item.id]); // Assurez-vous que 'item.id' correspond à l'identifiant unique de l'item
  }
}
