export class TrainingApplication {
    trainingId: string;  // Identifiant de la formation
    userId: string;  // Identifiant de l'utilisateur qui s'inscrit
    enrollmentDate: Date;  // Date d'inscription
    status: 'Pending' | 'Confirmed' | 'Cancelled';  // Statut de l'inscription
  
    constructor(
      trainingId: string,
      userId: string,
      enrollmentDate: Date,
      status: 'Pending' | 'Confirmed' | 'Cancelled' = 'Pending',
    ) {
      this.trainingId = trainingId;
      this.userId = userId;
      this.enrollmentDate = enrollmentDate;
      this.status = status;
    }
  }
  