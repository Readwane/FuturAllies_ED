

  // shared/models/simple-link.model.ts
import { Link } from './link.model';

export class SimpleLink extends Link {
  
  constructor(
    public override label: string,
    public override url: string,
    public override icon_url: string
  ) {
    super(label, url, icon_url);
  }
}
