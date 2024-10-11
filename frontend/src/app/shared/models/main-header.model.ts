// shared/models/main-header.model.ts
import { SimpleLink } from './simple-link.model';
import { DropdownLink } from './dropdwon-link.model';
import { Bouton } from './bounton.model';
export class MainHeader {
  constructor(
    public title: string,  // Titre du header
    public simpleLinks: SimpleLink[],  // Liste des liens simples
    public dropdownLinks: DropdownLink[],  // Liste des liens dropdown
    public boutons: Bouton[]  // Liste des boutons
  ) {}
}
