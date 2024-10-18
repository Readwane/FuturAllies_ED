export class CorrectAnswer {
  _id: string;
  questionId: string;
  answersList: string;
  createdAt: Date;

  constructor(
    _id: string,
    questionId: string,
    answersList: string,
    createdAt: Date = new Date()
  ) {
    this._id = _id;
    this.questionId = questionId;
    this.answersList = answersList;
    this.createdAt = createdAt;
  }
}
