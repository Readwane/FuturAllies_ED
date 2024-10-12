import { OfferContractType } from "./offer-contract-type.enum";
import { OfferStatus } from "./offer-status.enum";

export class Offer {
    constructor(
      public id: string,  // Identifiant unique de l'offre
      public title: string,  // Titre du poste
      public description: string,  // Description détaillée de l'offre
      public company: string,  // Nom de l'entreprise offrant le poste
      public location: string,  // Lieu du travail (physique ou en ligne)
      public salary: number,  // Salaire ou indemnité
      public contractType: OfferContractType,  // Type de contrat (CDI, CDD, stage)
      public startDate: Date,  // Date de début
      public endDate: Date,  // Date de fin (si applicable)
      public requirements: string[],  // Liste des compétences/expériences requises
      public postedBy: string,  // L'utilisateur ou l'entreprise qui a posté l'offre
      public status: OfferStatus  // Statut de l'offre (ouverte, fermée, pourvue)
    ) {}
  }
  