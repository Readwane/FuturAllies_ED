// shared/models/dropdown-link.model.ts
import { Link } from './link.model';

export class DropdownLink extends Link {
  constructor(
    public override label: string,
    public override url: string,
    public override icon_url: string,
    public options: string[]  // Liste des options dans le dropdown
  ) {
    super(label, url, icon_url);
  }
}
