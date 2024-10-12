export class Achievement {
    constructor(
      public id: string,  // Identifiant unique du badge
      public name: string,  // Nom du badge ou récompense
      public description: string,  // Brève description de l'accomplissement
      public earnedDate: Date  // Date à laquelle l'apprenant a obtenu cette récompense
    ) {}
  }
  