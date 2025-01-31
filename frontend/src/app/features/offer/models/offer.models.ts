// offer.model.ts

export class Offer {
    _id: string;
    profil: string;
    topic: string;
    company: string;
    companyLocation: string;
    companyWebsite?: string;
    description: string;
    domain: string;
    location: string;
    salary?: number;
    duration?: number;
    type: 'Job' | 'Internship' | 'Other';
    requirements?: string;
    responsibilities?: string;
    educationLevel?: string;
    experienceLevel?: string;
    contractType: 'CDI' | 'CDD';
    benefits?: string;
    contactEmail: string;
    status: 'Open' | 'Closed' | 'Pending';
    isRemoteWorking: boolean;
    applicationMode: 'Online' | 'Physical' | 'Both';
    isCvDocRequired: boolean;
    isMlDocRequired: boolean;
    canAddAdditionalDocs: boolean;
    applicationLink?: string;
    additionalInfo?: string;
    createdBy: string;
    postedDate: Date;
    updatedDate?: Date;
    expirationDate?: Date;
    hasPreselection?: boolean;
    preselectionType?: 'OnApplicationFile' | 'OnQuiz';
    preselectionQuizMode?: 'Online' | 'Physical';
    hasEvaluation?: boolean;
    evaluationMode?: 'Online' | 'Physical';
    hasInterview?: boolean;
    interviewMode?: 'ByPhone' | 'InVisio' | 'Physical';

    constructor(
        _id: string,
        profil: string,
        topic: string,
        company: string,
        companyLocation: string,
        description: string,
        domain: string,
        location: string,
        type: 'Job' | 'Internship' | 'Other',
        contractType: 'CDI' | 'CDD',
        contactEmail: string,
        postedDate: Date,
        status: 'Open' | 'Closed' | 'Pending',
        isRemoteWorking: boolean,
        applicationMode: 'Online' | 'Physical' | 'Both',
        isCvDocRequired: boolean,
        isMlDocRequired: boolean,
        canAddAdditionalDocs: boolean,
        createdBy: string,
        salary?: number,
        duration?: number,
        companyWebsite?: string,
        requirements?: string,
        responsibilities?: string,
        educationLevel?: string,
        experienceLevel?: string,
        benefits?: string,
        expirationDate?: Date,
        applicationLink?: string,
        additionalInfo?: string,
        updatedDate?: Date,
        hasPreselection?: boolean,
        preselectionType?: 'OnApplicationFile' | 'OnQuiz',
        preselectionQuizMode?: 'Online' | 'Physical',
        hasEvaluation?: boolean,
        evaluationMode?: 'Online' | 'Physical',
        hasInterview?: boolean,
        interviewMode?: 'ByPhone' | 'InVisio' | 'Physical',
    ) {
        this._id = _id;
        this.profil = profil;
        this.topic = topic;
        this.company = company;
        this.companyLocation = companyLocation;
        this.description = description;
        this.domain = domain;
        this.location = location;
        this.type = type;
        this.contractType = contractType;
        this.contactEmail = contactEmail;
        this.postedDate = postedDate;
        this.status = status;
        this.isRemoteWorking = isRemoteWorking;
        this.applicationMode = applicationMode;
        this.isCvDocRequired = isCvDocRequired;
        this.isMlDocRequired = isMlDocRequired;
        this.canAddAdditionalDocs = canAddAdditionalDocs;
        this.salary = salary;
        this.duration = duration;
        this.companyWebsite = companyWebsite;
        this.requirements = requirements;
        this.responsibilities = responsibilities;
        this.educationLevel = educationLevel;
        this.experienceLevel = experienceLevel;
        this.benefits = benefits;
        this.expirationDate = expirationDate;
        this.applicationLink = applicationLink;
        this.additionalInfo = additionalInfo;
        this.updatedDate = updatedDate;
        this.createdBy = createdBy;
        this.hasPreselection = hasPreselection;
        this.preselectionType = preselectionType;
        this.preselectionQuizMode = preselectionQuizMode;
        this.hasEvaluation = hasEvaluation;
        this.evaluationMode = evaluationMode;
        this.hasInterview = hasInterview;
        this.interviewMode = interviewMode;
    }
}

// offer-application.model.ts

export class OfferApplication {
    _id: string;
    offerId: string;
    candidatId: string;
    status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review';
    message: string;
    submittedDocumentsIds: string[];
    applicationDate: Date;
    lastUpdated: Date;

    constructor(
        _id: string,
        offerId: string,
        candidatId: string,
        status: 'Pending' | 'Accepted' | 'Rejected' | 'In Review',
        message: string,
        submittedDocumentsIds: string[],
        applicationDate: Date,
        lastUpdated: Date
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.candidatId = candidatId;
        this.status = status;
        this.message = message;
        this.submittedDocumentsIds = submittedDocumentsIds;
        this.applicationDate = applicationDate;
        this.lastUpdated = lastUpdated;
    }
}

// quiz.model.ts

export class RecruitmentQuiz {
    _id: string;
    offerId: string;
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: number; // Durée en minutes
    totalQuestions: number;
    totalPoints: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        _id: string,
        offerId: string,
        topic: string,
        difficulty: 'easy' | 'medium' | 'hard',
        duration: number,
        totalQuestions: number,
        totalPoints: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this._id = _id;
        this.offerId = offerId;
        this.topic = topic;
        this.difficulty = difficulty;
        this.duration = duration;
        this.totalQuestions = totalQuestions;
        this.totalPoints = totalPoints;
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
    points: number; // Points attribués à la question
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

// offer-stats.model.ts

export class OfferStats {
    _id: string;
    name: string;
    stat: number;

    constructor(_id: string, name: string, stat: number) {
        this._id = _id;
        this.name = name;
        this.stat = stat;
    }
}