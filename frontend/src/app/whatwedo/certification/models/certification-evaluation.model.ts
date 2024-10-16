export class CertificationEvaluation {
    id: number;
    parcoursId: number;
    title: string;
    description: string;
    type: 'quiz' | 'project' | 'exam';  // Limite les types aux valeurs possibles
    passingScore: number;
    maxAttempts: number;

    constructor(
        id: number,
        parcoursId: number,
        title: string,
        description: string,
        type: 'quiz' | 'project' | 'exam',  // Limite les types aux valeurs possibles
        passingScore: number,
        maxAttempts: number,
    ){
        this.id = id;
        this.parcoursId = parcoursId,
        this.title = title,
        this.description = description,
        this.type = type,
        this.passingScore = passingScore,
        this.maxAttempts = maxAttempts
    }
  }
  