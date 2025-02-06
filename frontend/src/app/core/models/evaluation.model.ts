
// quiz.model.ts

export class RecruitmentQuiz {
    _id: string;
    offerId: string;
    title: string;
    difficulty: string;
    duration: number;
    totalQuestions: number;
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;


    constructor(
        _id: string,
        offerId: string,
        title: string,
        difficulty: 'easy' | 'medium' | 'hard',
        duration: number,
        totalQuestions: number,
        totalPoints: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.title = title;
        this.difficulty = difficulty;
        this.duration = duration;
        this.totalQuestions = totalQuestions;
        this.totalPoints = totalPoints;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export class RecruitmentQuizQuestion {
    _id: string;
    recruitmentQuizId: string;
    title: string;
    order: number;
    questionType: 'MCQ' | 'UCQ';
    options: string[];
    correctOptions: string[];
    points: number; 
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
        points: number,
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
        this.points = points;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


// evaluation.model.ts

export class Evaluation {
    _id: string;
    offerId: string;
    topic: string;
    difficulty: 'junior' | 'intermediate' | 'senior';
    duration: number; // Durée en minutes
    totalSections: number;
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        offerId: string,
        topic: string,
        difficulty: 'junior' | 'intermediate' | 'senior',
        duration: number,
        totalSections: number,
        totalPoints: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.topic = topic;
        this.difficulty = difficulty;
        this.duration = duration;
        this.totalSections = totalSections;
        this.totalPoints = totalPoints;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


// section.model.ts

export class Section {
    _id: string;
    EvaluationId: string;
    title: string;
    order: number;
    points: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        EvaluationId: string,
        title: string,
        order: number,
        points: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.EvaluationId = EvaluationId;
        this.title = title;
        this.order = order;
        this.points = points;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
// content.model.ts

export class Content {
    _id: string;
    sectionId: string;
    type: 'coding' | 'qcm' | 'cas_pratique' | 'debugging' | 'architecture' | 'essai';
    content: string[];  
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        sectionId: string,
        type: 'coding' | 'qcm' | 'cas_pratique' | 'debugging' | 'architecture' | 'essai',
        content: string[],
        createdAt: Date,
        updatedAt: Date,
        contentUrl?: string
    ) {
        this._id = _id;
        this.sectionId = sectionId;
        this.type = type;
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

