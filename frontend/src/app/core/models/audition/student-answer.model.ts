export class StudentAnswer {
    _id: string;
    questionId: string;
    answersList: string[];
    isCorrect: boolean;
    createdAt: Date;
  
    constructor(
      _id: string,
      questionId: string,
      answersList: string[],
      isCorrect: boolean = false,
      createdAt: Date = new Date()
    ) {
      this._id = _id;
      this.questionId = questionId;
      this.answersList = answersList;
      this.isCorrect = isCorrect;
      this.createdAt = createdAt;
    }
  }
  