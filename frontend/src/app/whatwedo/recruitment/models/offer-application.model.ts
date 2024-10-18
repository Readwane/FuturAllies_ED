export class OfferApplication {
  offerId: string; // Référence à l'offre
  userId: string; // Référence à l'utilisateur (candidat)
  applicationDate: Date; // Date de la candidature
  requiredDocuments?: string; // Liste des documents à fournir (CV, lettre de motivation, etc.)
  status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review'; // Statut de la candidature
  submittedDocuments?: Record<string, string>; // Liste des documents soumis (ex. { "cv": "url_cv.pdf", "coverLetter": "url_letter.pdf" })
  message?: string; // Message de motivation ou commentaires du candidat
  reviewNotes?: string; // Notes ou commentaires de l'examinateur de la candidature
  lastUpdated: Date; // Dernière mise à jour de la candidature

  constructor(
    offerId: string,
    userId: string,
    applicationDate: Date = new Date(),
    status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review' = 'Pending',
    lastUpdated: Date = new Date()
  ) {
    this.offerId = offerId;
    this.userId = userId;
    this.applicationDate = applicationDate;
    this.status = status;
    this.lastUpdated = lastUpdated;
  }
}
