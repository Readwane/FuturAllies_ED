export class Message {
    constructor(
      public fromUserId: string,  // Identifiant de l'expéditeur
      public toUserId: string,  // Identifiant du destinataire
      public content: string,  // Contenu du message
      public sentDate: Date,  // Date d'envoi
      public isRead: boolean  // Statut de lecture du message
    ) {}
  }
  