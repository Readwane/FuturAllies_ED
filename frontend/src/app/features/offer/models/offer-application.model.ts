import { Doc } from "../../user/models/doc.model";  

// Classe représentant une candidature à une offre d'emploi  
export class OfferApplication {  
  offerId: string; // Référence à l'offre  
  userId: string;  // Référence à l'utilisateur (candidat)  
  applicationDate: Date; // Date de la candidature  
  status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review'; // Statut de la candidature  
  message?: string; // Message de motivation ou commentaires du candidat  
  lastUpdated: Date; // Dernière mise à jour de la candidature  
  submittedDocuments: Doc[]; // Documents soumis par le candidat  

  constructor(  
    offerId: string,  
    userId: string,  
    submittedDocuments: Doc[], // Ajout des documents soumis  
    applicationDate: Date = new Date(),  
    status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review' = 'Pending',  
    lastUpdated: Date = new Date(),  
    message?: string // Ajout d'un message en paramètre  
  ) {  
    this.offerId = offerId;  
    this.userId = userId;  
    this.submittedDocuments = submittedDocuments; // Assignation des documents soumis  
    this.applicationDate = applicationDate;  
    this.status = status;  
    this.lastUpdated = lastUpdated;  

    if (message) {  
      this.message = message;  
    }  
  }  

  // Méthode pour mettre à jour le statut de la candidature  
  updateStatus(newStatus: 'Pending' | 'Accepted' | 'Rejected' | 'In Review'): void {  
    this.status = newStatus;  
    this.lastUpdated = new Date(); // Met à jour la date de dernière modification  
  }  

  // Méthode pour ajouter des documents soumis  
  addSubmittedDocument(document: Doc): void {   
    this.submittedDocuments.push(document); // Ajouter le document au tableau  
    this.lastUpdated = new Date(); // Met à jour la date de dernière modification  
  }  
}