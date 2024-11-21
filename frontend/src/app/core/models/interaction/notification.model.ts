
// Notification : Modèle pour gérer les notifications liées aux activités de la plateforme.
export class Notification {
    _id: string;
    userId: string; // ID de l'utilisateur concerné
    type: string; // Type de notification (ex : "assignment_due", "new_message", etc.)
    message: string; // Message de la notification
    createdAt: Date; // Date de création
    isRead: boolean; // Statut de lecture
  
    constructor(
      _id: string,
      userId: string,
      type: string,
      message: string,
      createdAt: Date = new Date(),
      isRead: boolean = false
    ) {
      this._id = _id;
      this.userId = userId;
      this.type = type;
      this.message = message;
      this.createdAt = createdAt;
      this.isRead = isRead;
    }
  }
  