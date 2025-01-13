// certification.model.ts

export class Certification {
    _id: string;
    title: string;
    description: string;
    path: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    requirements: string;
    assessmentsMethod: 'Quiz' | 'Project' | 'Exam' | 'Other';
    certificate?: string;
    status: 'Active' | 'Expired' | 'Pending' | 'Revoked';
    recipientId: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        title: string,
        description: string,
        path: string,
        level: 'beginner' | 'intermediate' | 'advanced',
        requirements: string,
        assessmentsMethod: 'Quiz' | 'Project' | 'Exam' | 'Other',
        recipientId: string,
        status: 'Active' | 'Expired' | 'Pending' | 'Revoked',
        language: string,
        createdAt: Date,
        updatedAt: Date,
        certificate?: string
    ) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.path = path;
        this.level = level;
        this.requirements = requirements;
        this.assessmentsMethod = assessmentsMethod;
        this.recipientId = recipientId;
        this.status = status;
        this.language = language;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.certificate = certificate;
    }
}


// certificationGiven.model.ts

export class CertificationGiven {
    _id: string;
    userId: string;
    certificationId: string;
    certificationDate: Date;
    score?: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        userId: string,
        certificationId: string,
        certificationDate: Date,
        createdAt: Date,
        updatedAt: Date,
        score?: number
    ) {
        this._id = _id;
        this.userId = userId;
        this.certificationId = certificationId;
        this.certificationDate = certificationDate;
        this.score = score;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}


// certificationEvaluation.model.ts
export class CertificationEvaluation {
    _id: string;
    certificationId: string;
    title: string;
    description: string;
    type: 'quiz' | 'project' | 'exam';
    passingScore: number;
    maxAttempts: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        certificationId: string,
        title: string,
        description: string,
        type: 'quiz' | 'project' | 'exam',
        passingScore: number,
        maxAttempts: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this._id = _id;
        this.certificationId = certificationId;
        this.title = title;
        this.description = description;
        this.type = type;
        this.passingScore = passingScore;
        this.maxAttempts = maxAttempts;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
