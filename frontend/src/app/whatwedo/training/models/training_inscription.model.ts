import { InscriptionStatus } from "./training-inscription-status.model";

export class TrainingInscription {
    constructor(
      public id: string,  // Identifiant unique de l'inscription
      public userId: string,  // Identifiant de l'utilisateur
      public formationId: string,  // Identifiant de la formation
      public registrationDate: Date,  // Date d'inscription
      public status: InscriptionStatus,  // Statut de l'inscription (confirmée, en attente, annulée)
      public paymentConfirmed: boolean  // Paiement confirmé ou non
    ) {}
  }