export class StudentAnswer {
    id: number;
    questionId: number;
    answersList: string[];
    isCorrect: boolean;
    createdAt: Date;
  
    constructor(
      id: number,
      questionId: number,
      answersList: string[],
      isCorrect: boolean = false,
      createdAt: Date = new Date()
    ) {
      this.id = id;
      this.questionId = questionId;
      this.answersList = answersList;
      this.isCorrect = isCorrect;
      this.createdAt = createdAt;
    }
  }
  