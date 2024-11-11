// Définition de l'énumération pour le statut de l'inscription
export enum ApplicationStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Cancelled = 'Cancelled',
}

// Classe TrainingApplication utilisant l'énumération ApplicationStatus
export class TrainingApplication {
  trainingId: string;        // Identifiant de la formation
  userId: string;            // Identifiant de l'utilisateur qui s'inscrit
  enrollmentDate: Date;      // Date d'inscription
  status: ApplicationStatus; // Statut de l'inscription

  constructor(
    trainingId: string,
    userId: string,
    enrollmentDate: Date,
    status: ApplicationStatus = ApplicationStatus.Pending,
  ) {
    this.trainingId = trainingId;
    this.userId = userId;
    this.enrollmentDate = enrollmentDate;
    this.status = status;
  }
}
