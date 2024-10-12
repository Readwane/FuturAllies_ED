export class UserActivityLog {
    constructor(
      public userId: string,  // Identifiant de l'utilisateur
      public activityType: string,  // Type d'activité (ex : "login", "quiz", "message")
      public date: Date,  // Date de l'activité
      public description?: string  // Description additionnelle
    ) {}
  }
  