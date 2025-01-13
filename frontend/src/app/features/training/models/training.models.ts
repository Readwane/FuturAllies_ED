// training.model.ts

export class Training {
  _id: string;
  title: string;
  slogan: string;
  description: string;
  domain: string;
  location: string;
  startDate: Date;
  endDate: Date;
  duration: number | null;
  maxParticipants: number;
  currentParticipants: number;
  trainer: string;
  status: 'Open' | 'Closed' | 'Pending';
  price: number;
  organizer: string;
  prerequisites: string;
  learningObjectives: string;
  assessmentMethod: string;
  trainingMaterials: string;
  certificateIssued: boolean;
  language: string;
  type: 'webinar' | 'in-person';
  category: 'Talent' | 'Allies-cafe' | 'Commercial-company' | 'Commercial-student';
  createdAt: Date;
  updatedAt: Date;
  closeddAt?: Date;

  constructor(
      _id: string,
      title: string,
      slogan: string,
      description: string,
      domain: string,
      location: string,
      startDate: Date,
      endDate: Date,
      duration: number | null,
      maxParticipants: number,
      currentParticipants: number,
      trainer: string,
      status: 'Open' | 'Closed' | 'Pending',
      price: number,
      organizer: string,
      prerequisites: string,
      learningObjectives: string,
      assessmentMethod: string,
      trainingMaterials: string,
      certificateIssued: boolean,
      language: string,
      type: 'webinar' | 'in-person',
      category: 'Talent' | 'Allies-cafe' | 'Commercial-company' | 'Commercial-student',
      createdAt: Date,
      updatedAt: Date,
      closeddAt?: Date
  ) {
      this._id = _id;
      this.title = title;
      this.slogan = slogan;
      this.description = description;
      this.domain = domain;
      this.location = location;
      this.startDate = startDate;
      this.endDate = endDate;
      this.duration = duration;
      this.maxParticipants = maxParticipants;
      this.currentParticipants = currentParticipants;
      this.trainer = trainer;
      this.status = status;
      this.price = price;
      this.organizer = organizer;
      this.prerequisites = prerequisites;
      this.learningObjectives = learningObjectives;
      this.assessmentMethod = assessmentMethod;
      this.trainingMaterials = trainingMaterials;
      this.certificateIssued = certificateIssued;
      this.language = language;
      this.type = type;
      this.category = category;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
      this.closeddAt = closeddAt;
  }
}


// training-module.model.ts

export class TrainingModule {
  _id: string;
  trainingId: string;
  title: string;
  description: string;
  duration: number;
  order: number;
  objectives: string[];
  content: string;
  resources: string[];
  assessment: string;
  prerequisites: string[];

  constructor(
      _id: string,
      trainingId: string,
      title: string,
      description: string,
      duration: number,
      order: number,
      objectives: string[],
      content: string,
      resources: string[],
      assessment: string,
      prerequisites: string[]
  ) {
      this._id = _id;
      this.trainingId = trainingId;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.order = order;
      this.objectives = objectives;
      this.content = content;
      this.resources = resources;
      this.assessment = assessment;
      this.prerequisites = prerequisites;
  }
}


// training-session.model.ts

export class TrainingSession {
  _id: string;
  trainingModuleId: string;
  title: string;
  description: string;
  duration: number;
  sessionDate: Date;
  order: number;

  constructor(
      _id: string,
      trainingModuleId: string,
      title: string,
      description: string,
      duration: number,
      sessionDate: Date,
      order: number
  ) {
      this._id = _id;
      this.trainingModuleId = trainingModuleId;
      this.title = title;
      this.description = description;
      this.duration = duration;
      this.sessionDate = sessionDate;
      this.order = order;
  }
}


// training-application.model.ts

export class TrainingApplication {
  _id: string;
  trainingId: string;
  userId: string;
  enrollmentDate: Date;
  status: 'Pending' | 'Confirmed' | 'Cancelled';

  constructor(
      _id: string,
      trainingId: string,
      userId: string,
      enrollmentDate: Date,
      status: 'Pending' | 'Confirmed' | 'Cancelled'
  ) {
      this._id = _id;
      this.trainingId = trainingId;
      this.userId = userId;
      this.enrollmentDate = enrollmentDate;
      this.status = status;
  }
}
