import { Quiz } from "./quiz.model";

export class CourseProgress {
    constructor(
      public courseId: string,  // Identifiant du cours
      public userId: string,  // Identifiant de l'utilisateur
      public completedChapters: number,  // Nombre de modules complétés
      public totalChapters: number,  // Nombre total de modules
      public progressPercentage: number,  // Pourcentage de progression
      public lastAccessedDate: Date, // Dernière date d'accès au cours
      public quizzesPassed: Quiz[]  // Résultats des quiz ou évaluations

    ) {}
  }
  