export class Notification {
    constructor(
      public id: string,  // Identifiant unique de la notification
      public message: string,  // Contenu de la notification
      public isRead: boolean,  // Statut de lecture
      public date: Date  // Date d'envoi
    ) {}
  }
  