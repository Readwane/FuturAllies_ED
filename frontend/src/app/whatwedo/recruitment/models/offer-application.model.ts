import { OfferApplicationStatus } from "./offer-application-status.model";

export class OfferApplication {
    constructor(
      public id: string,  // Identifiant unique de la candidature
      public userId: string,  // Identifiant du candidat
      public offreId: string,  // Identifiant de l'offre
      public cv: string,  // Lien vers le CV
      public coverLetter: string,  // Lettre de motivation
      public applicationDate: Date,  // Date de candidature
      public status: OfferApplicationStatus  // Statut de la candidature
    ) {}
  }
  