// Message : Modèle pour les messages échangés entre utilisateurs, comme des étudiants ou instructeurs.
export class Message {
    _id: string;
    senderId: string; // ID de l'expéditeur
    receiverId: string; // ID du destinataire
    content: string; // Contenu du message
    sentAt: Date; // Date et heure d'envoi
    isRead: boolean; // Statut de lecture
  
    constructor(
      _id: string,
      senderId: string,
      receiverId: string,
      content: string,
      sentAt: Date = new Date(),
      isRead: boolean = false
    ) {
      this._id = _id;
      this.senderId = senderId;
      this.receiverId = receiverId;
      this.content = content;
      this.sentAt = sentAt;
      this.isRead = isRead;
    }
  }
  