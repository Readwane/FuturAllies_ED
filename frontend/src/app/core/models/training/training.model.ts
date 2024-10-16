export class Training {
  _id: string;  // Identifiant unique de la formation
  type: 'webinar' | 'in-person';  // Type of the training
  category: 'Talent' | 'Allies-cafe' | 'Commercial-company' | 'Commercial-student';  // Category of the training
  domain: string;
  title: string;  // Titre de la formation
  description: string;  // Description détaillée de la formation
  location: string;  // Lieu de la formation (adresse ou "En ligne" pour les webinaires)
  startDate: Date;  // Date de début de la formation
  endDate: Date;  // Date de fin de la formation
  duration?: number;  // Durée totale de la formation (en heures ou jours)
  maxParticipants: number;  // Nombre maximum de participants
  currentParticipants?: number;  // Nombre actuel de participants (optionnel)
  trainer: string;  // Nom ou référence de l'intervenant principal
  status: 'Open' | 'Closed' | 'Pending';  // Statut de la formation
  price: number;  // Prix de la formation
  organizer: string;  // Organisateur de la formation
  prerequisites?: string;  // Compétences requises avant la formation
  learningObjectives?: string;  // Objectifs pédagogiques de la formation
  assessmentMethod?: string;  // Modalités d'évaluation
  trainingMaterials?: string;  // Supports pédagogiques fournis
  certificateIssued: boolean;  // Indique si un certificat est délivré
  language?: string;  // Langue de la formation

  constructor(
    _id: string,
    type: 'webinar' | 'in-person',  // Type de la formation
    category: 'Talent' | 'Allies-cafe' | 'Commercial-company' | 'Commercial-student',  // Catégorie de la formation
    domain: string,
    title: string,
    description: string,
    location: string,
    startDate: Date,
    endDate: Date,
    maxParticipants: number,
    trainer: string,
    status: 'Open' | 'Closed' | 'Pending' = 'Open',
    price: number,
    organizer: string,
    duration?: number,
    currentParticipants?: number,
    prerequisites?: string,
    learningObjectives?: string,
    assessmentMethod?: string,
    trainingMaterials?: string,
    certificateIssued: boolean = false,
    language?: string,
  ) {
    this._id = _id;
    this.type = type;
    this.category = category;
    this.domain = domain,
    this.title = title;
    this.description = description;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.maxParticipants = maxParticipants;
    this.trainer = trainer;
    this.status = status;
    this.price = price;
    this.organizer = organizer;
    this.duration = duration;
    this.currentParticipants = currentParticipants;
    this.prerequisites = prerequisites;
    this.learningObjectives = learningObjectives;
    this.assessmentMethod = assessmentMethod;
    this.trainingMaterials = trainingMaterials;
    this.certificateIssued = certificateIssued;
    this.language = language;
  }
}
