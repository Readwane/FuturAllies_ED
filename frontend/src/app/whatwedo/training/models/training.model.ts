import { TrainingOrganizer } from "./training-organizer.model";
import { TrainingStatus } from "./training-status.enum";
import { TrainingType } from "./training-type.enum";

export class Training {
    constructor(
      public id: string,  // Identifiant unique de la formation
      public title: string,  // Titre de la formation
      public description: string,  // Description détaillée de la formation
      public startDate: Date,  // Date de début
      public endDate: Date,  // Date de fin
      public location: string,  // Lieu de la formation (adresse ou "En ligne" pour les webinaires)
      public maxParticipants: number,  // Nombre maximum de participants
      public trainer: string,  // Nom ou référence de l'intervenant principal
      public type: TrainingType,  // Type de la formation (Talent, Pack Entreprise, etc.)
      public status: TrainingStatus,  // Statut de la formation (ouverte, complète, annulée)
      public price: number,  // Prix de la formation
      public isOnline: boolean,  // Indique si la formation est en ligne
      public organizer: TrainingOrganizer // Organisateur (Fidalli, Partenaire, etc.)
    ) {}
  }
  