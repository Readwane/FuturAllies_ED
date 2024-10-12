// shared/services/navigation.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainHeader } from 'src/app/shared/models/main-header.model';
import { SimpleLink } from 'src/app/shared/models/simple-link.model';
import { DropdownLink } from 'src/app/shared/models/dropdwon-link.model';
import { Bouton } from 'src/app/shared/models/bounton.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Utilisation d'un BehaviorSubject pour permettre une mise à jour dynamique du header
  private headerSubject = new BehaviorSubject<MainHeader>(this.getInitialHeader());
  
  // Observable auquel les composants peuvent s'abonner
  header$ = this.headerSubject.asObservable();

  // Méthode pour obtenir le header initial
  private getInitialHeader(): MainHeader {
    return new MainHeader(
      '',
      [new SimpleLink('Catalogue', '/catalogue', '')],
      [new DropdownLink('Formations', '#', '', ['Futur-allies', 'Pack-partenaire', 'Pack-entreprise', 'Café des allies', 'Webinaires'])],
      [new Bouton('Connexion', '', 'login')]
    );
  }

  // Méthode pour mettre à jour le header
  updateHeader(newHeader: MainHeader) {
    this.headerSubject.next(newHeader);
  }

  // Exemple d'une méthode pour ajouter un lien dynamique
  addLink(newLink: SimpleLink) {
    const currentHeader = this.headerSubject.value;
    currentHeader.simpleLinks.push(newLink);
    this.headerSubject.next(currentHeader);  // Émettre la nouvelle version du header
  }

  // Méthode pour mettre à jour les boutons (par exemple, quand un utilisateur se connecte)
  updateButton(newButton: Bouton) {
    const currentHeader = this.headerSubject.value;
    currentHeader.boutons = [newButton];
    this.headerSubject.next(currentHeader);
  }
}
