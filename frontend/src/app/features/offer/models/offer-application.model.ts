import { Doc } from "../../user/models/doc.model";  

export class OfferApplication {
  offerId: string; 
  candidatId: string;
  applicationDate: Date; 
  status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review';
  message: string; // Message de motivation, initialisé avec un message par défaut
  lastUpdated: Date;
  submittedDocuments: Doc[];

  constructor(
    offerId: string,  
    candidatId: string,  
    submittedDocuments: Doc[], 
    applicationDate: Date = new Date(),  
    status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review' = 'Pending',  
    lastUpdated: Date = new Date(),  
    message: string = "Je suis très intéressé(e) par cette offre et je suis convaincu(e) que mes compétences et mon expérience correspondent aux attentes de votre entreprise. J'aimerais avoir l'opportunité de discuter de cette offre plus en détail et de contribuer au succès de votre équipe."
  ) {  
    this.offerId = offerId;  
    this.candidatId = candidatId;  
    this.submittedDocuments = submittedDocuments; 
    this.applicationDate = applicationDate;  
    this.status = status;  
    this.lastUpdated = lastUpdated;  
    this.message = message; // Utilisation du message de motivation par défaut
  }

  // Méthode pour mettre à jour le statut de la candidature  
  updateStatus(newStatus: 'Pending' | 'Accepted' | 'Rejected' | 'In Review'): void {  
    this.status = newStatus;  
    this.lastUpdated = new Date();
  }

  // Méthode pour ajouter des documents soumis  
  addSubmittedDocument(document: Doc): void {   
    this.submittedDocuments.push(document);
    this.lastUpdated = new Date();
  }  
}
