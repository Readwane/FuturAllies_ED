import { Question } from "./question.model";

export class Quiz {
    constructor(
      public id: string,  // Identifiant unique de l'évaluation
      public questions: Question[],  // Liste des questions du quiz
      public passingScore: number  // Score minimum pour réussir l'évaluation
    ) {}
  }
  