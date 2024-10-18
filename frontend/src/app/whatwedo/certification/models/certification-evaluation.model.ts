export class CertificationEvaluation {
    _id: string;
    parcoursId: string;
    title: string;
    description: string;
    type: 'quiz' | 'project' | 'exam';  // Limite les types aux valeurs possibles
    passingScore: number;
    maxAttempts: number;

    constructor(
        _id: string,
        parcoursId: string,
        title: string,
        description: string,
        type: 'quiz' | 'project' | 'exam',  // Limite les types aux valeurs possibles
        passingScore: number,
        maxAttempts: number,
    ){
        this._id = _id;
        this.parcoursId = parcoursId,
        this.title = title,
        this.description = description,
        this.type = type,
        this.passingScore = passingScore,
        this.maxAttempts = maxAttempts
    }
  }
  