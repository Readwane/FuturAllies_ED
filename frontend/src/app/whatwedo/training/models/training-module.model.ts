import { Course } from "../../audition/models/course.model";
import { Quiz } from "../../audition/models/quiz.model";

export class TrainingModule {
    constructor(
      public id: string,  // Identifiant unique du module
      public title: string,  // Titre du module
      public description: string,  // Brève description
      public courses: Course[],  // Liste des leçons
      public quiz?: Quiz  // Évaluation optionnelle à la fin du module
    ) {}
  }
  