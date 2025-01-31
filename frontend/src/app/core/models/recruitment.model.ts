// quiz.model.ts

export class RecuitmentQuiz {
    _id: string;
    offerId: string;
    topic: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        offerId: string,
        topic: string,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.topic = topic;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

// question.model.ts

export class RecruitmentQuizQuestion {
    _id: string;
    recruitmentQuizId: string;
    title: string;
    order: number;
    questionType: 'MCQ' | 'UCQ';
    options: string[];
    correctOptions: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        recruitmentQuizId: string,
        title: string,
        order: number,
        questionType: 'MCQ' | 'UCQ',
        options: string[],
        correctOptions: string[],
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.recruitmentQuizId = recruitmentQuizId;
        this.title = title;
        this.order = order;
        this.questionType = questionType;
        this.options = options;
        this.correctOptions = correctOptions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}