export class Question {
    id: number;
    quizId: number;
    title: string;
    questionType: 'multiple_choice' | 'one_choice';
    choicesList: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(
      id: number,
      quizId: number,
      title: string,
      questionType: 'multiple_choice' | 'one_choice',
      choicesList: string[],
      order: number,
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this.id = id;
      this.quizId = quizId;
      this.title = title;
      this.questionType = questionType;
      this.choicesList = choicesList;
      this.order = order;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  