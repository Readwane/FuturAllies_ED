// Mail : Représente les e-mails envoyés ou reçus, utile pour la communication externe (ex : confirmations ou rappels).
export class Mail {
    _id: string;
    senderEmail: string; // Adresse e-mail de l'expéditeur
    receiverEmail: string; // Adresse e-mail du destinataire
    subject: string; // Objet de l'e-mail
    body: string; // Corps de l'e-mail
    sentAt: Date; // Date d'envoi
    status: string; // Statut (ex : "sent", "failed", "pending")
  
    constructor(
      _id: string,
      senderEmail: string,
      receiverEmail: string,
      subject: string,
      body: string,
      sentAt: Date = new Date(),
      status: string = "pending"
    ) {
      this._id = _id;
      this.senderEmail = senderEmail;
      this.receiverEmail = receiverEmail;
      this.subject = subject;
      this.body = body;
      this.sentAt = sentAt;
      this.status = status;
    }
  }
  