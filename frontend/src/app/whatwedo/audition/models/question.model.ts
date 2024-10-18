export class Question {
    _id: string;
    quizId: string;
    title: string;
    questionType: 'multiple_choice' | 'one_choice';
    choicesList: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      _id: string,
      quizId: string,
      title: string,
      questionType: 'multiple_choice' | 'one_choice',
      choicesList: string[],
      order: number,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = _id;
      this.quizId = quizId;
      this.title = title;
      this.questionType = questionType;
      this.choicesList = choicesList;
      this.order = order;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  