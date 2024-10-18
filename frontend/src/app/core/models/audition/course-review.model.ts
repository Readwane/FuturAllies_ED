export class CourseReview {
    constructor(
      public userId: string,  // Identifiant de l'utilisateur
      public courseId: string,  // Identifiant du cours
      public rating: number,  // Note donnée (ex: de 1 à 5)
      public comment: string,  // Commentaire écrit
      public reviewDate: Date  // Date de la soumission de l'avis
    ) {}
  }
  