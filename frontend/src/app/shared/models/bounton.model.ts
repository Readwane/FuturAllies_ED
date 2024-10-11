export class Bounton {
    constructor(
      public label: string,
      public icon_url: string,
      public action: string // Par exemple, l'URL ou la méthode déclenchée
    ) {}
  }
  

  // shared/models/bouton.model.ts
import { Link } from './link.model';

export class Bouton extends Link {
  constructor(
    public override label: string,
    public override icon_url: string,
    public action: string  // Action spécifique au bouton
  ) {
    super(label, icon_url, '#');  // L'URL n'est pas forcément utilisée pour un bouton
  }
}
