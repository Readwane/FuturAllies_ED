// domain.model.ts

export class Domain {
    _id: string;
    title: string;
    icon?: string;
    description?: string;
    courses: string[];  // Array of course IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        title: string,
        courses: string[],
        createdAt: Date,
        updatedAt: Date,
        icon?: string,
        description?: string
    ) {
        this._id = _id;
        this.title = title;
        this.courses = courses;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.icon = icon;
        this.description = description;
    }
}

// course.model.ts
export class Course {
    _id: string;
    domainId: string;
    title: string;
    icon?: string;
    description: string;
    isPublished: boolean;
    duration: number;
    createdAt: Date;
    updatedAt: Date;
    parts: string[];  // Array of part IDs

    constructor(
        _id: string,
        domainId: string,
        title: string,
        description: string,
        isPublished: boolean,
        duration: number,
        createdAt: Date,
        updatedAt: Date,
        parts: string[],
        icon?: string
    ) {
        this._id = _id;
        this.domainId = domainId;
        this.title = title;
        this.description = description;
        this.isPublished = isPublished;
        this.duration = duration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.parts = parts;
        this.icon = icon;
    }
}


// part.model.ts

export class Part {
    _id: string;
    courseId: string;
    title: string;
    description?: string;
    order: number;
    chapters: string[];  // Array of chapter IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        courseId: string,
        title: string,
        order: number,
        createdAt: Date,
        updatedAt: Date,
        chapters: string[],
        description?: string
    ) {
        this._id = _id;
        this.courseId = courseId;
        this.title = title;
        this.order = order;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.chapters = chapters;
        this.description = description;
    }
}


// chapter.model.ts

export class Chapter {
    _id: string;
    partId: string;
    title: string;
    description?: string;
    order: number;
    sections: string[];  // Array of section IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        partId: string,
        title: string,
        order: number,
        createdAt: Date,
        updatedAt: Date,
        sections: string[],
        description?: string
    ) {
        this._id = _id;
        this.partId = partId;
        this.title = title;
        this.order = order;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.sections = sections;
        this.description = description;
    }
}


// section.model.ts

export class Section {
    _id: string;
    chapterId: string;
    title: string;
    order: number;
    contents: string[];  // Array of content IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        chapterId: string,
        title: string,
        order: number,
        createdAt: Date,
        updatedAt: Date,
        contents: string[]
    ) {
        this._id = _id;
        this.chapterId = chapterId;
        this.title = title;
        this.order = order;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.contents = contents;
    }
}


// content.model.ts

export class Content {
    _id: string;
    sectionId: string;
    type: 'text' | 'video' | 'image';
    content: any;  // This can be any type depending on the content type (e.g., text, URL, base64 for images)
    contentUrl?: string;  // Optional for content that has a URL (e.g., video link)
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        sectionId: string,
        type: 'text' | 'video' | 'image',
        content: any,
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
        this.contentUrl = contentUrl;
    }
}


// quiz.model.ts

export class Quiz {
    _id: string;
    partId: string;
    title: string;
    competencyAssessed: string[];
    questions: string[];  // Array of question IDs
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        partId: string,
        title: string,
        competencyAssessed: string[],
        createdAt: Date,
        updatedAt: Date,
        questions: string[]
    ) {
        this._id = _id;
        this.partId = partId;
        this.title = title;
        this.competencyAssessed = competencyAssessed;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.questions = questions;
    }
}


// question.model.ts

export class Question {
    _id: string;
    quizId: string;
    title: string;
    order: number;
    questionType: 'MCQ' | 'UCQ';
    options: string[];
    correctOptions: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        quizId: string,
        title: string,
        order: number,
        questionType: 'MCQ' | 'UCQ',
        options: string[],
        correctOptions: string[],
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.quizId = quizId;
        this.title = title;
        this.order = order;
        this.questionType = questionType;
        this.options = options;
        this.correctOptions = correctOptions;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


// courseLearned.model.ts

export class CourseLearned {
    _id: string;
    userId: string;
    courseId: string;
    startedAt: Date;
    completedAt?: Date;
    progress: number;

    constructor(
        _id: string,
        userId: string,
        courseId: string,
        startedAt: Date,
        progress: number,
        createdAt: Date,
        completedAt?: Date
    ) {
        this._id = _id;
        this.userId = userId;
        this.courseId = courseId;
        this.startedAt = startedAt;
        this.completedAt = completedAt;
        this.progress = progress;
    }
}


// courseReview.model.ts

export class CourseReview {
    _id: string;
    userId: string;
    courseId: string;
    rating: number;
    comment?: string;
    reviewDate: Date;

    constructor(
        _id: string,
        userId: string,
        courseId: string,
        rating: number,
        reviewDate: Date,
        comment?: string
    ) {
        this._id = _id;
        this.userId = userId;
        this.courseId = courseId;
        this.rating = rating;
        this.comment = comment;
        this.reviewDate = reviewDate;
    }
}

