import { TrainingModule } from "./training-module.model";

export enum TrainingType {
  Webinar = 'webinar',
  InPerson = 'in-person',
}

export enum TrainingCategory {
  Talent = 'Talent',
  AlliesCafe = 'Allies-cafe',
  CommercialCompany = 'Commercial-company',
  CommercialStudent = 'Commercial-student',
}

export enum TrainingStatus {
  Open = 'Open',
  Closed = 'Closed',
  Pending = 'Pending',
}

export class Training {
  _id: string;
  type: TrainingType;
  category: TrainingCategory;
  domain: string;
  title: string;
  slogan: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  duration?: number;
  maxParticipants: number;
  currentParticipants: number;
  trainer: string;
  status: TrainingStatus;
  price: number;
  organizer: string;
  prerequisites?: string;
  learningObjectives?: string;
  assessmentMethod?: string;
  trainingMaterials?: string;
  certificateIssued: boolean;
  language?: string;

  constructor(init: Partial<Training>) {
    this._id = init._id || '';
    this.type = init.type || TrainingType.Webinar;
    this.category = init.category || TrainingCategory.Talent;
    this.domain = init.domain || '';
    this.title = init.title || '';
    this.slogan = init.slogan || '';
    this.description = init.description || '';
    this.location = init.location || '';
    this.startDate = init.startDate || new Date();
    this.endDate = init.endDate || new Date();
    this.duration = init.duration;
    this.maxParticipants = init.maxParticipants || 0;
    this.currentParticipants = init.currentParticipants || 0;
    this.trainer = init.trainer || '';
    this.status = init.status || TrainingStatus.Open;
    this.price = init.price || 0;
    this.organizer = init.organizer || '';
    this.prerequisites = init.prerequisites;
    this.learningObjectives = init.learningObjectives;
    this.assessmentMethod = init.assessmentMethod;
    this.trainingMaterials = init.trainingMaterials;
    this.certificateIssued = init.certificateIssued || false;
    this.language = init.language;
  }
}

