// shared/models/link.model.ts
export class Link {
    constructor(
      public label: string,  // Texte visible du lien ou bouton
      public url: string,     // URL ou action associée
      public icon_url: string,
    ) {}
  }
  