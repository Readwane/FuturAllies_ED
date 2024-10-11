// header.component.ts
import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../header.service';
import { MainHeader } from 'src/app/shared/models/main-header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  headerData!: MainHeader;

  constructor(private headerService: HeaderService) {}

  ngOnInit() {
    // S'abonner à l'Observable pour obtenir les mises à jour du header
    this.headerService.header$.subscribe((header: MainHeader) => {
      this.headerData = header;
    });
  }

  // Méthode pour gérer les actions des boutons
  onButtonClick(action: string) {
    console.log('Action du bouton:', action);
    // Logique pour traiter l'action, par exemple redirection ou autre
  }
}
