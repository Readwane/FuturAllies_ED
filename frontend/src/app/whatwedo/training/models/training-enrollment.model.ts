export class TrainingEnrollment {
    id: number;  // Identifiant unique de l'inscription
    trainingId: number;  // Identifiant de la formation
    userId: number;  // Identifiant de l'utilisateur qui s'inscrit
    enrollmentDate: Date;  // Date d'inscription
    status: 'Pending' | 'Confirmed' | 'Cancelled';  // Statut de l'inscription
  
    constructor(
      id: number,
      trainingId: number,
      userId: number,
      enrollmentDate: Date,
      status: 'Pending' | 'Confirmed' | 'Cancelled' = 'Pending',
    ) {
      this.id = id;
      this.trainingId = trainingId;
      this.userId = userId;
      this.enrollmentDate = enrollmentDate;
      this.status = status;
    }
  }
  