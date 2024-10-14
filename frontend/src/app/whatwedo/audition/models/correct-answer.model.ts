export class CorrectAnswer {
  id: number;
  questionId: number;
  answersList: string;
  createdAt: Date;

  constructor(
    id: number,
    questionId: number,
    answersList: string,
    createdAt: Date = new Date()
  ) {
    this.id = id;
    this.questionId = questionId;
    this.answersList = answersList;
    this.createdAt = createdAt;
  }
}
